# lms-app

NodeJS app that allows the creation of dynamic websites for teacher use. Ideally, schools can internally use this application to have their teachers host their own website to store and organize files for students, teachers, and parents to view and download. For more information as to how a teacher can manage their website and features they can take of advantage of, please view the [TEACHER README.md](https://github.com/thomasmendez/lms-app/blob/master/TEACHER%20README.md) file. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. (Deployment for cloud provier services in progress for future version).

### Prerequisites

The following software needs to be installed in order to run the application

* Node.js
* MongoDB

### Installing

A step by step series of examples that tell you how to get a development env running

1. Open a Terminal (Command Prompt) and Download or Clone this Git Repository

```
git clone <https_link>
```

2. Installing Node.js

    a. [Download Node.js](https://nodejs.org/en/download/)

    b. Check if Node.js was installed. By running this in a terminal to check Node.js version
    
    ```
    node -v
    ``` 

3. Installing MongoDB

    a. [Download MongoDB](https://www.mongodb.com/download-center/community) - Community Edition Recommended 

    b. (Optional) [Download MongoDB Compass](https://www.mongodb.com/download-center/compass) - MongoDB GUI for Database Management

    c. (Mac OS X) Create Database Directory

    ```
    mkdir -p /data/db
    ```

    d. (Windows) Create Database Directory

    ```
    cd C:\
    md "\data\db"
    ```

4. Install Node.js Packages

    a. Open terminal where lms-app folder is located

    b. Download required Node.js packages by running in terminal in lms-app folder (you will see a new folder called node_modules)

    ```
    npm install 
    ```

### Setup Development Environment 

1. Run MongoDB Database

    a. (Mac OS X) Open a new terminal shell and run 

    ```
    /<path to intallation>/bin/mongod 
    ```

    b. (Windows) Open a command prompt and run as administrator

    ```
    "C:\Program Files\MongoDB\Server\4.2\bin\mongod.exe" --dbpath="c:\data\db"
    ```

    c. Keep termnial open in order to write and read from database. In order to close database, use control+C

2. Run lms-app Application 

    a. In terminal where lms-app folder is located run

    ```
    npm start
    ```

    b. Open any browser and insert as url

    ```
    localhost:3000
    ```

    c. (Optional) In mobile phone browser, insert as url

    ```
    <ip_address_of_machine>:3000
    ```

3. Test Application

    a. Signup as a teacher and upload, delete, or update files

    b. Logout and view as a guest information that teacher uploaded

    c. Close application by using control+C in terminal that is running application

    d. (Optional) Use MongoDB Compass Community to view information that was stored in the school collection

## Unit Testing

Unit testing is done with the javascript frameworks Mocha and Chai

1. In terminal where lms-app folder is located run

    ```
    npm test
    ```
    
## Features

Currently the web application does not have all of the neccessary features. The following shows current features for the application and future features that would be added in the near future: 

* Teacher Sign Up
    - [x] Strong Password Required
    - [x] Front and Back End Form Verification
    - [ ] Send Email Account Confirmation
* Teacher Login
    - [x] Front and Back End Form Verification
    - [ ] Send Forgot Password Link to Email
* Teacher Page
    * Courses
        - [x] Add Course(s)
    * Syllabus
        - [x] Add Syllabus
        - [x] Update Syllabus
    * Schedule
        - [x] Add Schedule
        - [x] Update Schedule
    * Assignments
        - [x] Add Assignment
        - [x] Remove Assignment
        - [ ] Reorder Assignments
        - [ ] Update Assignment
    * Lecture Notes
        - [x] Add Lecture Note
        - [x] Remove Lecture Note
        - [ ] Reorder Lecture Notes
        - [ ] Update Lecture Note
    * Class Notes
        - [x] Add Class Note
        - [x] Remove Class Note
        - [ ] Reorder Class Notes
        - [ ] Update Class Note
    * Other Files
        - [x] Add Lecture Note
        - [x] Remove Other File
        - [ ] Reorder Other Files
        - [ ] Update Other File
* User Settings
    * Manage Account
        - [x] Update Email
        - [x] Update Semester
        - [x] Update Password
        - [x] Delete Account
    * Archived Course(s)
        - [ ] Archive a Course
    * View Archived Course(s)
        - [ ] View Archived Course(s)

## Built With

Backend

* [Node.JS](http://www.dropwizard.io/1.0.2/docs/) - Back End Scripting Language
* [Express](https://expressjs.com/en/api.html) - Web Application Framework for Node.js
* [Passport](http://www.passportjs.org/) - Authentication Middleware for Node.js.

* [MongoDB](https://maven.apache.org/) - NoSQL Database
* [Mongoose](https://mongoosejs.com/docs/) - Object Data Modeling (ODM) library for MongoDB and Node.js
* [GridFS](https://docs.mongodb.com/manual/core/gridfs/) - Storing and Retriving Files into MongoDB

Frontend

* [PUG](https://pugjs.org/api/getting-started.html) - HTML Templating Engine
* [Bootstrap](https://getbootstrap.com/docs/4.4/getting-started/introduction/) - CSS Framework

Unit Testing

* [Mocha](https://mochajs.org/) - JavaScript Test Framework
* [Chai](https://www.chaijs.com/) -  BDD / TDD Assertion Library

## Authors

* **Thomas Antonio Mendez** - *Initial work* 

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/thomasmendez/lms-app/blob/master/LICENSE) file for details
