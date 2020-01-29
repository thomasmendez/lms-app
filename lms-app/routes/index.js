var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

let user = require('../controllers/user');

// import models to use mongoose models made 
var models = require('../models_setup');
models.importModels()

// to make query search import teacher shema
var teacherSchema = require('../db/models/teacher').schema;

/* GET home page. */
router.get('/', function(req, res, next) {
  
  mongoose.model('teachers', teacherSchema).find(function (err, teachers) {

    var teachersInfo = [];

    // teachers is a javascript Object
    Object.entries(teachers).forEach(entry => {
      //let key = entry[0];
      let value = entry[1];
      //use key and value here
      //console.log("key: " + key);
      //console.log("value: " + value);

      //console.log("username: " + value.username);
      teacherInfo = {
        username: value.username,
        firstName: value.firstName,
        lastName: value.lastName
      };

      teachersInfo.push(teacherInfo);
    });

    // pass over teacher username and if the response has a logged in user, send it also 
    res.render('index', {teachers: teachersInfo, user: req.user});

  })
  
});

// login / signup
router.get('/login', user.show_login);
router.post('/login', user.login);
router.get('/signup', user.show_signup);
router.post('/signup', user.signup);
router.post('/logout', user.logout);
router.get('/logout', user.logout);

module.exports = router;