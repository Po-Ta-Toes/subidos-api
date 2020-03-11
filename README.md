
# Subidos API
A SPA that serves as a photo application, where users are able to upload images, and view both their own images and those shared by other users.  Users are authenticated and can only edit their own photos.
[Client Repo](https://github.com/Po-Ta-Toes/subidos-client)

## Dependencies
* [express-api-template](https://git.generalassemb.ly/ga-wdi-boston/express-api-template)
* `npm install`, nodemon
* `npm run server` start express server

## Set Up
```
// install dependencies
npm install

// ensure nodemon is installed
npm install -g nodemon

// ensure API is functioning
npm run server
```

## User Stories
* As an unregistered user, I would like to sign up with email and password.
* As a registered user, I would like to sign in with email and password.
* As a signed in user, I would like to change password.
* As a signed in user, I would like to sign out.
* As a signed in user, I would like to upload an image to AWS.
* As a signed in user, I would like to update the meta-data of my image on AWS.
* As a signed in user, I would like to see the name of all images on AWS.
* As a signed in user, I would like to see the thumbnail of all images on AWS.
* As a signed in user, I would like to delete the reference of my image from the database.
* As a signed in user, I would like to see the following meta-data for any image:
  * date created/uploaded
  * date modified
  * owner (user who uploaded the image)
  * tag

## ERD
