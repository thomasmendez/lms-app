var mongodb = require('../db/mongodb');

exports.getHome = function (req, res, next) {

    let url = req.originalUrl;

    let teacherUsername = urlFilterUsername(url);

    // call database query, search for classes that the teacher teaches
    
    mongodb.findTeacherByUsername(teacherUsername).then(function (teacher) {

        teacherInfo = {
            firstName: teacher.firstName,
            lastName: teacher.lastName,
            semester: teacher.semester,
            year: teacher.year,
            courses: teacher.courses
        };
    
        // pass over teacher username and if the response has a logged in user, send it also 
        res.render('teacher/home', {
            teacher: teacherInfo, 
            user: req.user, 
            currentURL: url
        });

    });

}

exports.getCourse = function(req, res, next) {

    let url = decodeURI(req.originalUrl);

    let teacherUsername = urlFilterUsername(url);

    let searchedCourse = urlFilterCourse(url);
    
    // call database query teacher and class 
    // call database query, search for classes that the teacher teaches

    mongodb.findTeacherByUsername(teacherUsername).then(function (teacher) {

        var courseInfo;

        // teachers is a javascript Object
        Object.entries(teacher.courses).forEach(entry => {
            //let key = entry[0];
            let value = entry[1];
            //use key and value here
            //console.log("key: " + key);
            //console.log("value: " + value);

            if (value.course === searchedCourse) {
                courseInfo = {
                    course: value.course,
                    fullCourseName: value.fullCourseName
                };
            }

        });

        res.render('teacher/class', {
            course: courseInfo, 
            user: req.user, 
            currentURL: url,
            searchedCourse: searchedCourse
        });

    });
    

}

exports.getSyllabus = function (req, res, next) {

    let url = decodeURI(req.originalUrl);

    let teacherUsername = urlFilterUsername(url);

    let searchedCourse = urlFilterCourse(url);

    var syllabusInfo;

    mongodb.findTeacherByUsername(teacherUsername).then(function (teacher) {
        // teachers is a javascript Object
        Object.entries(teacher.courses).forEach(entry => {
            //let key = entry[0];
            let value = entry[1];
            //use key and value here
            //console.log("key: " + key);
            //console.log("value: " + value);
            if (value.course === searchedCourse) {
                syllabusInfo = {
                    course: value.course,
                    fullCourseName: value.fullCourseName,
                    syllabus: value.syllabus
                };
            }
        });

        let syllabusFileID = syllabusInfo.syllabus.fileID;
        let syllabusFilename = syllabusInfo.syllabus.syllabusFile;

        // create a new url to get the file 
        res.redirect(url + '/id/' + syllabusFileID + '/files/' + syllabusFilename);

    });

}

exports.getSchedule = function (req, res, next) {
    
    let url = decodeURI(req.originalUrl);

    let teacherUsername = urlFilterUsername(url);

    let searchedCourse = urlFilterCourse(url);

    var scheduleInfo;

    mongodb.findTeacherByUsername(teacherUsername).then(function (teacher) {
        // teachers is a javascript Object
        Object.entries(teacher.courses).forEach(entry => {
            //let key = entry[0];
            let value = entry[1];
            //use key and value here
            //console.log("key: " + key);
            //console.log("value: " + value);
            if (value.course === searchedCourse) {
                scheduleInfo = {
                    course: value.course,
                    fullCourseName: value.fullCourseName,
                    schedule: value.schedule
                };
            }
        });

        let scheduleFileID = scheduleInfo.schedule.fileID;
        let scheduleFilename = scheduleInfo.schedule.scheduleFile;

        // create a new url to get the file 
        res.redirect(url + '/id/' + scheduleFileID + '/files/' + scheduleFilename);
        
    });

}

exports.getAssignments = function (req, res, next) {

    let url = decodeURI(req.originalUrl);

    let teacherUsername = urlFilterUsername(url);

    let searchedCourse = urlFilterCourse(url);
    
    var assignmentInfo;

    mongodb.findTeacherByUsername(teacherUsername).then(function (teacher) {
        // teachers is a javascript Object
        Object.entries(teacher.courses).forEach(entry => {
            //let key = entry[0];
            let value = entry[1];
            //use key and value here
            //console.log("key: " + key);
            //console.log("value: " + value);
            if (value.course === searchedCourse) {
                assignmentInfo = {
                    course: value.course,
                    fullCourseName: value.fullCourseName,
                    assignments: value.assignments
                };
            }
        });
        res.render('teacher/assignments', {
            assignments: assignmentInfo,
            currentURL: url
        });
    });
}

exports.getLectureNotes = function (req, res, next) {

    let url = decodeURI(req.originalUrl);

    let teacherUsername = urlFilterUsername(url);

    let searchedCourse = urlFilterCourse(url);
    
    var lectureNotesInfo;

    mongodb.findTeacherByUsername(teacherUsername).then(function (teacher) {
        // teachers is a javascript Object
        Object.entries(teacher.courses).forEach(entry => {
            //let key = entry[0];
            let value = entry[1];
            //use key and value here
            //console.log("key: " + key);
            //console.log("value: " + value);
            if (value.course === searchedCourse) {
                lectureNotesInfo = {
                    course: value.course,
                    fullCourseName: value.fullCourseName,
                    lectureNotes: value.lectureNotes
                };
            }
        });
        res.render('teacher/lectureNotes', {
            lectureNotes: lectureNotesInfo,
            currentURL: url
        });
    });
}

exports.getClassNotes = function (req, res, next) {

    let url = decodeURI(req.originalUrl);

    let teacherUsername = urlFilterUsername(url);

    let searchedCourse = urlFilterCourse(url);
    
    var classNotesInfo;

    mongodb.findTeacherByUsername(teacherUsername).then(function (teacher) {
        // teachers is a javascript Object
        Object.entries(teacher.courses).forEach(entry => {
            //let key = entry[0];
            let value = entry[1];
            //use key and value here
            //console.log("key: " + key);
            //console.log("value: " + value);
            if (value.course === searchedCourse) {
                classNotesInfo = {
                    course: value.course,
                    fullCourseName: value.fullCourseName,
                    classNotes: value.classNotes
                };
            }
        });
        res.render('teacher/classNotes', {
            classNotes: classNotesInfo,
            currentURL: url
        });
    });

}

exports.getOtherNotes = function (req, res, next) {
    
    let url = decodeURI(req.originalUrl);

    let teacherUsername = urlFilterUsername(url);

    let searchedCourse = urlFilterCourse(url);
    
    var otherNotesInfo;

    mongodb.findTeacherByUsername(teacherUsername).then(function (teacher) {
        // teachers is a javascript Object
        Object.entries(teacher.courses).forEach(entry => {
            //let key = entry[0];
            let value = entry[1];
            //use key and value here
            //console.log("key: " + key);
            //console.log("value: " + value);
            if (value.course === searchedCourse) {
                otherNotesInfo = {
                    course: value.course,
                    fullCourseName: value.fullCourseName,
                    otherNotes: value.otherNotes
                };
            }
        });
        res.render('teacher/otherNotes', {
            otherNotes: otherNotesInfo,
            currentURL: url
        });
    });

}

function urlFilterUsername(url) {
    
    // /teacher/ - 9
    var searchedUsername = url.substring();

    let teacherSlash = searchedUsername.search('/teacher/');

    searchedUsername = searchedUsername.substring(teacherSlash + 9, searchedUsername.length);

    var tempSlash = searchedUsername.search('/');

    searchedUsername = searchedUsername.substring(0, tempSlash);

    return searchedUsername;
}

function urlFilterCourse(url) {
    
    // /course/ - 8
    let searchedCourse = url.substring();

    let courseSlash = searchedCourse.search('/course/');

    searchedCourse = searchedCourse.substring(courseSlash + 8, searchedCourse.length);

    var tempSlash = searchedCourse.search('/');

    searchedCourse = searchedCourse.substring(0, tempSlash);

    return searchedCourse;
}