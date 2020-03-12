'use strict'

const mongoose = require('mongoose')

const photoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  tags: {
    type: Array,
    required: false
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Photo', photoSchema)
