const fs = require('fs');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/school', {useNewUrlParser: true});

// load all files in models dir
exports.importModels = function () {
    fs.readdirSync(__dirname + '/db/models/').forEach(function(filename) {
        //console.log("filename: " + filename);
        if (~filename.indexOf('.js')) require(__dirname + '/db/models/' + filename)
    });
}