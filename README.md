[![Build Status](https://www.travis-ci.com/ashley-breunich/lab-12.svg?branch=master)](https://www.travis-ci.com/ashley-breunich/lab-12)

![CF](http://i.imgur.com/7v5ASc8.png) LAB - ORM: Advanced Modeling
=================================================

## Before you begin
* You will be continuing to work on your API server
* Provided for you is a working server, which you may use as a starter

## Assignment
###### API Requirements
* Create a new `Model` class/interface to serve as the base for all models
* Convert the Category and Product interfaces to extend from the Model class
* Link the category and product monglo models, with the products being virtually populated into the categories
* Add a validate hook to both models and return an error if the model fails a validation rule
* Add a pre-save hook to both models to convert some element of the data (or to add content to a field) based on some condition.
  * Use your imagination, but make a few logical decisions for your store
  * e.g. Every price must end in .99 or Convert all product names to Title Case, etc.

###### Stretch Goal
* Add a sub-document to the `products` model called `social`
  * This should have 2 fields: `shares` and `likes`, both Numeric
  * On the UI, add a share and a like link that would update this sub-document on each product when clicked.


###### Testing
* test the full CRUD operations of your server and both models
* use supertest for your route testing so you don't spin up a web server
* use `mongodb-memory-server` as a stand-in for `mogngod` so you don't have to spin up a mongo database to test


##  Documentation
[Heroku Server Link](https://lab-12-breunich.herokuapp.com/api/v1/categories)

###### APP.JS MODULE:
Airty: 2

Expected Data: The data will be the PORT number so the program can run and the server itself. 

Behavior: If the server isn't running, the program will run on the given port. If the server is already running, it will throw a console log alerting the user that the server is already running. 

###### MODELS/TEAMS.JS MODULE:
Behavior: This module holds the TEAMS class, which extends from the Model class, and all of the functions associated with it. These functions are called from the API - v1.js. It calls the teams.js schema in the mongo folder.  

###### MODELS/PRODUCTS.JS MODULE:
Behavior: This module holds the PRODUCTS class, which extends from the Model class, and all of the functions associated with it. These functions are called from the API - v1.js. It calls the products.js schema in the mongo folder. 

###### MODELS/CATEGORIES.JS MODULE:
Behavior: This module holds the CATEGORIES class, which extends from the Model class, and all of the functions associated with it. These functions are called from the API - v1.js. It calls the categories.js schema in the mongo folder. 

###### MODELS/MODEL.JS MODULE:
Behavior: This module is what creates the schema for each class that is extended from Model. It contains all of the functions - find, save, delete, put and patch - which call the storage functions associated with each one. 

###### MONGO/TEAMS.JS MODULE:
Behavior: This is where the schema for the team class is located. It exports that schema. 

###### MONGO/CATEGORIES.JS MODULE:
Behavior: This is where the schema for the categories class is located. It exports that schema.

###### MONGO/PRODUCTS.JS MODULE:
Behavior: This is where the schema for the products class is located. It exports that schema.

###### MODEL-FINDER MODULE:
Airty: 3
Expected Data: Request, Response, Next
Behavior: This module tells the program which model to use. When a model is found, it will set the req.model. When a model is not found, it will throw 'Invalid Model.' 

###### ERROR MODULE:
Airty: 4
Expected Data: Error, Request, Response, Next
Behavior: If there is a server error, it will go through this function and explain what the error is.  

###### 404 MODULE:
Airty: 3
Expected Data: Request, Response, Next
Behavior: If a page cannot be found, it will go through this function and throw a 404 error.

###### STORAGE/STORAGE MODULE:
Airty: 1
Expected Data: process.env.STORAGE
Behavior: This function takes in the process.env.STORAGE variable and uses a switch case to let the program know what kind of storage to use.  

###### STORAGE/MEMORY MODULE:
Airty: 1
Expected Data: Each funtion in this page takes in 1 paramater - either a query, ID or data
Behavior: Depending on which function is called, memory is accessed to either send data, resave data or delete data. 

###### STORAGE/FILE MODULE:
Airty: 1
Expected Data: Each funtion in this page takes in 1 paramater - either a query, ID or data
Behavior: Depending on which function is called, code runs that then saves the changes to the db.json file. 

###### STORAGE/MONGO MODULE:
Airty: 1
Expected Data: Each funtion in this page takes in 1 paramater - either a schema, query, ID or data
Behavior: Depending on which function is called, code runs that then saves the changes to the Mongo database. 

###### V1 MODULE:
Airty: 3
Expected Data: Each funtion in this page takes in 3 parameters - Request, Response, Next
Behavior: This file interacts with the API. It makes API calls depending on which HTTP method is used (get, put, patch, delete, post). The JSON that is sent through the front end is stringified and then sent to whichever function is related. Then the appropriate save functions are called to accurately update the db.json file. 

#### Collaborations
I want to note that I rewatched the video from lecture and followed along to get the schemas set up! 



