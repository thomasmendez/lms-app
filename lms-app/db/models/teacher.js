var mongoose = require('mongoose');
// let config = require('../../config/config');
// mongoose.connect(config.development.url + config.development.database, {useNewUrlParser: true});

let Schema = mongoose.Schema;

const teachersSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    semester: { type: String, required: true },
    year: { type: String, required: true },
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