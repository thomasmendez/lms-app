var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/school', {useNewUrlParser: true});

var conn = mongoose.connection;

var path = require("path");

var Grid = require("gridfs-stream");

var fs = require("fs-extra");

var Grid = require("gridfs-stream");

Grid.mongo = mongoose.mongo;

exports.getFile = function(req, res, next) {

    let url = decodeURI(req.originalUrl);

    var fileIDIndex = url.indexOf("/id/");

    var fileID = url.substring(fileIDIndex + 4, url.length);

    var fileIDSlash = fileID.indexOf("/");

    fileID = fileID.substring(0, fileIDSlash);

    var filesIndex = url.indexOf("/files/");

    var filename = url.substring(filesIndex + 7, url.length);

    
    checkIfFileIsDefined(fileID, filename)
    .then(success => {
        var gfs = Grid(conn.db);
        checkIfFileExist(res, gfs, fileID, filename)
        .then(newPath => {
            removeTempFile(newPath)
        })
        .catch(error => {
            res.status(404).send(error);
        })
    })
    .catch(error => {
        res.status(404).send(error);
    })
    
}

function checkIfFileIsDefined(fileID, filename) {
    
    return new Promise((resolve, reject) => {
        
        if (fileID === 'undefined' || filename === 'undefined') {
            let error = "File Not Found";
            reject(error)
        }

        let message = "File is defined";
        resolve(message)

    })

}

function checkIfFileExist(res, gfs, fileID, filename) {

    return new Promise((resolve, reject) => {

        return gfs.exist({ _id: fileID, filename: filename }, (err, file) => {
        
            if (err || !file) {
                let error = "File Not Found"
                reject(error)
            }
    
            var newPath = path.join(__dirname, '../temp/' + filename);
    
            var fs_write_stream = fs.createWriteStream(newPath);
    
            var readstream = gfs.createReadStream({
                // the name of the file in database
                _id: fileID,
                filename: filename
            });
    
            readstream.pipe(fs_write_stream);
    
            // pipe out the file retrieved from mongoDB and allow user to view 
            readstream.pipe(res);

            // return the new path that has the file
            resolve(newPath)
    
        });

    });

}

function removeTempFile(filepath) {
    try {
        fs.unlinkSync(filepath);
        //console.log("file removed from temp directory");
      } catch(err) {
        console.error("File removal error: " + err);
    }
}