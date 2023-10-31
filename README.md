# Nodejs and ExpressJs

# Environment vars
This project uses the following environment variables:

| Name                          | Description                         | Default Value                                  |
| ----------------------------- | ------------------------------------| -----------------------------------------------|
|CORS           | Cors accepted values            | "*"      |


# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) version 16.0.0


# Getting started
- Clone the repository
```
git clone  git@github.com:YahiaElsayed19/shop-app-api.git
```
- Install dependencies
```
cd shop-app-api
npm install
```
- Build and run the project
```
Replace MongoDB connection with yours in app.js.
Insert data.json into your database in collection with the name "products".
Replace Stripe keys with yours in controllers/orders.js
Replace JWT secret in controllers/auth.js and middleware/is-auth.js.
```
```
npm start
```
  API is listening on `http://localhost:4000`

- API Document endpoints

[Postman Docs](https://documenter.getpostman.com/view/24067778/2s9YXb84zj)







## Project Structure
The folder structure of this app is explained below:

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **controllers**      | Controllers define functions to serve various express routes. 
| **middlewares**      | Express middlewares which process the incoming requests before handling them down to the routes
| **routes**           | Contain all express routes, separated by module/area of application                       
| **models**           | Models define schemas that will be used in storing and retrieving data from Application database  |
| **app.js**        | Entry point to express app                                                               |
| package.json             | Contains npm dependencies as well as [build scripts](#what-if-a-library-isnt-on-definitelytyped)   | tsconfig.json            | Config settings for compiling source code only written in TypeScript                                               |

## Building the project

### Running the build
All the different build steps are orchestrated via [npm scripts](https://docs.npmjs.com/misc/scripts).
Npm scripts basically allow us to call (and chain) terminal commands via npm.

| Npm Script | Description |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| `start`                   | Runs full build and runs node on app.js. Can be invoked with `npm start`                  |
