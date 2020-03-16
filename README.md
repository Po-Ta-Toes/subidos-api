
# About: Subidos API
A SPA where users can upload images, browse both their own images and those shared by other users, and edit or delete images that they own. To start, sign up with an email address and a password, then sign in with your credentials. From the main page, you can either browse all the images uploaded by other users, or start uploading your own images.

To see more details about an image uploaded by a user, click on one of them from the index view. The modal that displays for that image will contain information on that image's owner, when the image was created and last updated, tags associated with that image, and (if the image is owned by you) options to delete the image or update the image's metadata- the image's name and tags.

Also see: the [client Repo](https://github.com/Po-Ta-Toes/subidos-client) and the [deployed API](https://mysterious-wave-25390.herokuapp.com/).

## Technologies Used
- **Javascript**: Frontend and backend
- **Express**: Backend RESTful API
- **MongoDB**: Database
- **Mongoose**: Schema and ownership for database
- **Amazon S3**: Persistent storage for images
- **Handlebars**: View rendering
- **jQuery**: Event handling and DOM manipulation
- **AJAX**: API calls for user authentication as well as CRUDing photos
- **Heroku**: API deployment/hosting
- **Grunt**: Frontend deployment to Github pages
- **GitHub**: Version control

## API Routes

| Method   | Path       |
|--------|-------------------|
| POST   | `/sign-up`        |
| POST   | `/sign-in`        |
| DELETE | `/sign-out`       |
| PATCH  | `/change-password`|
| GET    | `/photos`     |
| GET    | `/photos/:id` |
| POST   | `/photos`     |
| PATCH  | `/photos/:id` |
| DELETE | `/photos/:id` |

Routes for photos require a token, and routes which affect data only work for photos owned by the associated user. All data returned from API actions is formatted as JSON.

## Dependencies
* [express-api-template](https://git.generalassemb.ly/ga-wdi-boston/express-api-template)
* `npm install`, nodemon, passport
* `npm run server`, start express server
* `npm install aws-sdk` installs aws-sdk
* `npm install dotenv` installs dotenv
* `npm install multer` installs multer

## Set Up
```
// install dependencies
npm install

// ensure nodemon is installed
npm install -g nodemon

// ensure API is functioning
npm run server
```

## Development Process
Work on the app took place over the course of 3 days. During normal business hours, team members mob programmed app features, rotating driver/primary navigator after each new feature was completed. Individual work on features took place after 5pm or on weekends. Project features that involved design decisions or were technically complex were always completed together via mob programming. Initial planning involved a team review of requirements, completion of user stories, wireframes, and an ERD, and creation of initial issues. Throughout the project, required features received issues on Github, which were claimed by team members if being worked on individually. All team members participated in code review and design decision-making.

As S3 was the least familiar aspect of the project to team members, successful uploading of files to Amazon S3 was the first feature to be completed, followed by needed routes for the photos resource on the API, tested via Postman scripts. After this, most work needed for the API was complete and focus shifted to the client. On the client, user authentication was completed first. Then, needed CRUD actions on photos were implemented, starting with uploading photos via an HTML form, followed by getting an index of photos (since other actions depended upon the resulting view), and finally show, edit, and delete.

Basic templates for both the client and express API were provided by General Assembly.

## How could this be improved?
UX could be improved in a few places:
- In the photos index view, photos owned by the user could be marked somehow
- Error messages could be more informative, rather than alwasys displaying a generic 'failure' message
- Improved styling
- Mobile-friendly views
- A cleaner way of entering tags than manually separating them by commas

There were also several stretch goals that we would have like to complete, with more time:
- Pagination of photos, so that they are not all shown on the page at once
- Comments on photos
- Prompting the user for confirmation before signing out or deleting a photo
- Searching for photos by tag(s)

## Planning
### User Stories
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

### ERD
![ERD](https://user-images.githubusercontent.com/33760827/76448294-85dd2000-63a0-11ea-9a0f-cfcb2b89a64a.png)
