require('dotenv').config()
// Load the SDK and UUID
var AWS = require('aws-sdk')
var mime = require('mime-types')
var fs = require('fs')
var path = require('path')

var bucketName = process.env.BUCKET_NAME

// Create S3 service object
const s3 = new AWS.S3({apiVersion: '2006-03-01'})

const s3Create = function (file, mimetype) {
  const fileStream = fs.createReadStream(file)
  fileStream.on('error', function (err) {
    console.log('File Error', err)
  })
  // call S3 to retrieve photo file to specified bucket
  var photoParams = {
    Bucket: bucketName,
    Key: '',
    Body: '',
    ACL: 'public-read', // makes the file readable
    ContentType: '' // allow the file to be viewable instead of downloaded by default
  }
  // Configure the file stream and obtain the photo parameters
  // the file we want to photo as a readable stream
  photoParams.Body = fileStream
  // url for the file
  // name of the file
  photoParams.Key = path.basename(file)
  // get the file mime type
  photoParams.ContentType = mimetype || mime.lookup(file)

  // call S3 to retrieve photo file to specified bucket
  return s3.upload(photoParams).promise()
}

module.exports = s3Create
