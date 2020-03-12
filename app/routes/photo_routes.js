'use strict'

// Express docs: http://expressjs.com/en/api.html
const express = require('express')
const passport = require('passport')
const multer = require('multer') // set up multer for file photo
const photo = multer({ dest: 'photos/' })
const s3Create = require('../../lib/s3Create')
const Photo = require('../models/photo') // pull in Mongoose model for photos
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404 // for non-existant requests
const requireOwnership = customErrors.requireOwnership
// removes blank fields from `req.body`
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router() // mini app that only handles routes

// GET (index) request on /photos
router.get('/photos', requireToken, (req, res, next) => {
  Photo.find()
    .then(photos => { // `photos` is an array of Mongoose documents
      return photos.map(photo => photo.toObject()) // converts each into a POJO
    })
    .then(photos => res.status(200).json({ photos: photos }))
    .catch(next) // if error, pass to handler
})

// GET (show) request on /photos/:id
router.get('/photos/:id', requireToken, (req, res, next) => {
  Photo.findById(req.params.id) // req.params.id set based on `:id` in route
    .then(handle404)
    .then(photo => res.status(200).json({ photo: photo.toObject() }))
    .catch(next) // if error, pass to handler
})

// POST (create) request on /photos
router.post('/photos', photo.single('attachment'), requireToken, (req, res, next) => {
  console.log('body', req.body)
  console.log('user', req.user)
  const path = req.file.path
  const mimetype = req.file.mimetype

  s3Create(path, mimetype)
    .then(data => {
      const url = data.Location
      const name = req.body.name
      let tags
      if (req.body.tags) {
        tags = req.body.tags
      } else {
        tags = []
      }
      const owner = req.user._id
      return Photo.create({
        name: name,
        url: url,
        tags: tags,
        owner: owner
      })
    })
    .then(photo => res.status(201).json({ photo: photo.toObject() }))
    .catch(next) // if error, pass to handler
})

// PATCH (update) request on /photos/:id
router.patch('/photos/:id', removeBlanks, requireToken, (req, res, next) => {
  delete req.body.photo.owner
  Photo.findById(req.params.id)
    .then(handle404)
    .then(photo => {
      requireOwnership(req, photo)
      return photo.updateOne(req.body.photo)
    })
    .then(() => res.sendStatus(204)) // on success return 204 and no JSON
    .catch(next) // if error, pass to handler
})

// DELETE (destroy) request on /photos/:id
router.delete('/photos/:id', requireToken, (req, res, next) => {
  Photo.findById(req.params.id)
    .then(handle404)
    .then(photo => {
      requireOwnership(req, photo)
      // not owner? throw error
      photo.deleteOne() // delete the photo ONLY IF the above didn't throw
    })
    .then(() => res.sendStatus(204)) // on success return 204 and no JSON
    .catch(next) // if error, pass to handler
})

module.exports = router
