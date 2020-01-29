var mongoose = require('mongoose');
let config = require('../../config/config');
mongoose.connect(config.development.url + config.development.database, {useNewUrlParser: true});

let Schema = mongoose.Schema;

const teachersSchema = new Schema({
    username: String,
    password: String,
    email: String,
    firstName: String,
    lastName: String,
    semester: String,
    year: String,
    courses: [{
        course: String,
        fullCourseName: String,
        syllabus: {
            syllabusFile: String,
            fileID: String,
            uploadDate: String,
        },
        schedule: {
            scheduleFile: String,
            fileID: String,
            uploadDate: String
        },
        assignments: [{
            assignmentName: String,
            assignmentFile: String,
            fileID: String,
            dueDate: String,
        }],
        lectureNotes: [{
            noteName: String,
            noteFile: String,
            fileID: String,
            noteDate: String,
        }],
        classNotes: [{
            noteName: String,
            noteFile: String,
            fileID: String,
            noteDate: String,
        }],
        otherNotes: [{
            noteName: String,
            noteFile: String,
            fileID: String,
            noteDate: String,
        }]
    }]
});

exports.model = mongoose.model('teacher', teachersSchema);

exports.schema = teachersSchema;