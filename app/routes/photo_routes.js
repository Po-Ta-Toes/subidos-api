'use strict'

// Express docs: http://expressjs.com/en/api.html
const express = require('express')
const multer = require('multer') // set up multer for file photo
const photo = multer({ dest: 'photos/' })
const s3Create = require('../../lib/s3Create')
const Photo = require('../models/photo') // pull in Mongoose model for photos
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404 // for non-existant requests
// removes blank fields from `req.body`
const removeBlanks = require('../../lib/remove_blank_fields')
const router = express.Router() // mini app that only handles routes

// GET (index) request on /photos
router.get('/photos', (req, res, next) => {
  Photo.find()
    .then(photos => { // `photos` is an array of Mongoose documents
      return photos.map(photo => photo.toObject()) // converts each into a POJO
    })
    .then(photos => res.status(200).json({ photos: photos }))
    .catch(next) // if error, pass to handler
})

// GET (show) request on /photos/:id
router.get('/photos/:id', (req, res, next) => {
  Photo.findById(req.params.id) // req.params.id set based on `:id` in route
    .then(handle404)
    .then(photo => res.status(200).json({ photo: photo.toObject() }))
    .catch(next) // if error, pass to handler
})

// POST (create) request on /photos
router.post('/photos', photo.single('avatar'), (req, res, next) => {
  const path = req.file.path
  const mimetype = req.file.mimetype

  s3Create(path, mimetype)
    .then(data => {
      const imageUrl = data.Location
      const name = req.body.name
      const tags = [...]
      return Photo.create({
        name: name,
        imageUrl: imageUrl,
        tags: tags
      })
    })
    .then(photo => res.status(201).json({ photo: photo.toObject() }) )
    .catch(next) // if error, pass to handler
})

// PATCH (update) request on /photos/:id
router.patch('/photos/:id', removeBlanks, (req, res, next) => {
  Photo.findById(req.params.id)
    .then(handle404)
    .then(photo => {
      return photo.updateOne(req.body.photo)
    })
    .then(() => res.sendStatus(204)) // on success return 204 and no JSON
    .catch(next) // if error, pass to handler
})

// DELETE (destroy) request on /photos/:id
router.delete('/photos/:id', (req, res, next) => {
  Photo.findById(req.params.id)
    .then(handle404)
    .then(photo => {
      requireOwnership(req, photo) // not owner? throw error
      photo.deleteOne() // delete the photo ONLY IF the above didn't throw
    })
    .then(() => res.sendStatus(204)) // on success return 204 and no JSON
    .catch(next) // if error, pass to handler
})

module.exports = router
