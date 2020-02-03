var mongoose = require('mongoose');
//let config = require('../config/config');
//mongoose.connect(config.development.url + config.development.database, {useNewUrlParser: true});

// import models that will be used
// all models will need their schema to make a query search
const Teacher = require('./models/teacher');

// returns all teacher info
exports.findTeacherById = function(_id) {
    return mongoose.model('teachers', Teacher.schema).findById(_id).then(function(items) {
        return items;
    });
}

// returns emails only
exports.findTeacherByUsername = function(username) {
    return mongoose.model('teachers', Teacher.schema).findOne({username: username}).then(function(items) {
        return items;
    }).catch(function (error) {
        return error;
    });
}

exports.findCourse = function(course) {
    return mongoose.model('teachers', Teacher.schema).findOne(
        {"courses.course": course}
    ).then(function (items) {
        return items;
    }).catch(function (error) {
        return error;
    });
}

exports.addCourse = function(username, course, fullCourseName) {

    let query = {username: username};

    return mongoose.model('teachers', Teacher.schema).findOneAndUpdate(
        query, 
        {$push: { courses: 
            [
                {course: course, 
                fullCourseName: fullCourseName}
            ] 
        }}, 
        {new: true, useFindAndModify: false},
        //callback)
    ).then(function (items) {
        return items;
    }).catch(function(error) {
        return error
    });

}

exports.addSyllabus = function(course, syllabusFileID, filename, uploadDate) {

    return mongoose.model('teachers', Teacher.schema).findOneAndUpdate(
        {"courses.course": course},
        {"courses.$.syllabus": 
            {
                syllabusFile: filename,
                fileID: syllabusFileID,
                uploadDate: uploadDate
            }
        }, 
        {new: true, useFindAndModify: false}
    ).then(function (items) {
        return items;
    }).catch(function (error) {
        return error;
    });
}

exports.addSchedule = function(course, scheduleFileID, filename, uploadDate) {

    return mongoose.model('teachers', Teacher.schema).findOneAndUpdate(
        {"courses.course": course},
        {"courses.$.schedule": 
            {
                scheduleFile: filename,
                fileID: scheduleFileID,
                uploadDate: uploadDate
            }
        }, 
        {new: true, useFindAndModify: false}
    ).then(function (items) {
        return items;
    }).catch(function (error) {
        return error;
    });
}

exports.addAssignment = function(course, assignmentFileID, assignmentName, filename, dueDate) {

    return mongoose.model('teachers', Teacher.schema).findOneAndUpdate(
        {"courses.course": course},
        {$push: {"courses.$.assignments": 
                            [
                                {assignmentName: assignmentName,
                                fileID: assignmentFileID,
                                assignmentFile: filename,
                                dueDate: dueDate}
                            ]
                }
        }, 
        {new: true, useFindAndModify: false},
        //callback)
    ).then(function (items) {
        return items;
    }).catch(function (error) {
        return error;
    });
    
}

exports.removeAssignment = function(course, assignmentID) {

    return mongoose.model('teachers', Teacher.schema).findOneAndUpdate(
        {"courses.course": course},
        {$pull: {"courses.$.assignments": {'_id': assignmentID} }}, 
        {new: true, useFindAndModify: false}
    ).then(function (items) {
        return items;
    }).catch(function (error) {
        return error;
    });
}

exports.addLectureNote = function(course, lectureNoteFileID, lectureNoteName, filename, noteDate) {

    return mongoose.model('teachers', Teacher.schema).findOneAndUpdate(
        {"courses.course": course},
        {$push: {"courses.$.lectureNotes": 
                            [
                                {noteName: lectureNoteName,
                                fileID: lectureNoteFileID,
                                noteFile: filename,
                                noteDate: noteDate}
                            ]
                }
        }, 
        {new: true, useFindAndModify: false}
    ).then(function (items) {
        return items;
    }).catch(function (error) {
        return error;
    });
    
}

exports.removeLectureNote = function(course, lectureNoteID) {

    return mongoose.model('teachers', Teacher.schema).findOneAndUpdate(
        {"courses.course": course},
        {$pull: {"courses.$.lectureNotes": {'_id': lectureNoteID} }},
        {new: true, useFindAndModify: false}
    ).then(function (items) {
        return items;
    }).catch(function (error) {
        return error;
    });
}

exports.addClassNote = function(course, classNoteFileID, classNoteName, filename, noteDate) {

    return mongoose.model('teachers', Teacher.schema).findOneAndUpdate(
        {"courses.course": course},
        {$push: {"courses.$.classNotes": 
                            [
                                {noteName: classNoteName,
                                fileID: classNoteFileID,
                                noteFile: filename,
                                noteDate: noteDate}
                            ]
                }
        }, 
        {new: true, useFindAndModify: false}
    ).then(function (items) {
        return items;
    }).catch(function (error) {
        return error;
    });
    
}

exports.removeClassNote = function(course, classNoteID) {

    return mongoose.model('teachers', Teacher.schema).findOneAndUpdate(
        {"courses.course": course},
        {$pull: {"courses.$.classNotes": {'_id': classNoteID} }},
        {new: true, useFindAndModify: false}
    ).then(function (items) {
        return items;
    }).catch(function (error) {
        return error;
    });

}

exports.addOtherNote = function(course, otherNoteFileID, otherNoteName, filename, noteDate) {

    return mongoose.model('teachers', Teacher.schema).findOneAndUpdate(
        {"courses.course": course},
        {$push: {"courses.$.otherNotes": 
                            [
                                {noteName: otherNoteName,
                                fileID: otherNoteFileID,
                                noteFile: filename,
                                noteDate: noteDate}
                            ]
                }
        }, 
        {new: true, useFindAndModify: false}
    ).then(function (items) {
        return items;
    }).catch(function (error) {
        return error;
    });
    
}

exports.removeOtherNote = function(course, otherNoteID) {

    return mongoose.model('teachers', Teacher.schema).findOneAndUpdate(
        {"courses.course": course},
        {$pull: {"courses.$.otherNotes": {'_id': otherNoteID} }}, 
        {new: true, useFindAndModify: false}
    ).then(function (items) {
        return items;
    }).catch(function (error) {
        return error;
    });

}

// updates settings information 

exports.updateEmail = function(username, newEmail) {
    let query = {username: username};
    return mongoose.model('teachers', Teacher.schema).findOneAndUpdate(
        query,
        {$set: {email: newEmail} }, 
        {new: true, useFindAndModify: false}
    ).then(function (items) {
        return items;
    }).catch(function (error) {
        return error;
    });
}

exports.updateSemester = function(username, semester, year) {
    let query = {username: username};
    return mongoose.model('teachers', Teacher.schema).findOneAndUpdate(
        query,
        {$set: 
            {
                semester: semester,
                year: year
            }
        }, 
        {new: true, useFindAndModify: false}
    ).then(function (items) {
        return items;
    }).catch(function (error) {
        return error;
    });
}

exports.updatePassword = function(username, newHashedPassword) {
    let query = {username: username};
    return mongoose.model('teachers', Teacher.schema).findOneAndUpdate(
        query,
        {$set: 
            {
                password: newHashedPassword
            }
        }, 
        {new: true, useFindAndModify: false}
    ).then(function (items) {
        return items;
    }).catch(function (error) {
        return error;
    });
}

exports.deleteUser = function(password) {
    let query = {password: password};
    return mongoose.model('teachers', Teacher.schema).findOneAndDelete(
        query
    ).then(function (items) {
        return items;
    }).catch(function (error) {
        return error;
    });
}