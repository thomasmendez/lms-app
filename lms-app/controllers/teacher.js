var mongodb = require('../db/mongodb');

exports.getHome = function (req, res, next) {

    let url = req.originalUrl;

    // /teacher - 9
    let teacherUsername = url.substring(9, url.length - 1);

    // call database query, search for classes that the teacher teaches
    
    mongodb.findTeacherByUsername(teacherUsername).then(function (teacher) {

        teacherInfo = {
            firstName: teacher.firstName,
            lastName: teacher.lastName,
            semester: teacher.semester,
            year: teacher.year,
            courses: teacher.courses
        };

        let course = teacher.courses;
    
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

    // /teacher - 9
    // url is longer, so remove extra 
    var teacherUsername = url.substring(9, url.length - 1);

    let teacherSlash = teacherUsername.search('/');

    // /course/ - 8
    var searchedCourse = teacherUsername.substring(teacherSlash, teacherUsername.length);

    searchedCourse = searchedCourse.substring(8, searchedCourse.length);

    teacherUsername = teacherUsername.substring(0, teacherSlash);

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

    // /teacher/ - 9
    // url is longer, so remove extra 
    var teacherUsername = url.substring(9, url.length);

    let teacherSlash = teacherUsername.search('/');

    teacherUsername = teacherUsername.substring(0, teacherSlash);

    // /course/ - 8 
    var searchedCourse = url.search('/course/');

    searchedCourse = url.substring(searchedCourse + 8, url.length);

    var seachedCourseSlash = searchedCourse.search('/');

    searchedCourse = searchedCourse.substring(0, seachedCourseSlash);

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

        let syllabusFileID = syllabusInfo.syllabus.syllabusFileID;
        let syllabusFilename = syllabusInfo.syllabus.syllabusFile;

        // create a new url to get the file 
        res.redirect(url + '/id/' + syllabusFileID + '/files/' + syllabusFilename);

    });

}

exports.getSchedule = function (req, res, next) {
    
    let url = decodeURI(req.originalUrl);

    // /teacher/ - 9
    // url is longer, so remove extra 
    var teacherUsername = url.substring(9, url.length);

    let teacherSlash = teacherUsername.search('/');

    teacherUsername = teacherUsername.substring(0, teacherSlash);

    // /course/ - 8 
    var searchedCourse = url.search('/course/');

    searchedCourse = url.substring(searchedCourse + 8, url.length);

    var seachedCourseSlash = searchedCourse.search('/');

    searchedCourse = searchedCourse.substring(0, seachedCourseSlash);

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

        let scheduleFileID = scheduleInfo.schedule.scheduleFileID;
        let scheduleFilename = scheduleInfo.schedule.scheduleFile;

        // create a new url to get the file 
        res.redirect(url + '/id/' + scheduleFileID + '/files/' + scheduleFilename);
        
    });

}

exports.getAssignments = function (req, res, next) {

    let url = decodeURI(req.originalUrl);

    // /teacher/ - 9
    var teacherUsername = url.substring(9, url.length);

    var teacherSlash = teacherUsername.search('/');

    teacherUsername = teacherUsername.substring(0, teacherSlash);

    // /assignments - 12
    var searchedCourseIndex = url.indexOf('/course/');
    var searchedCourse = url.substring(searchedCourseIndex + 8, url.length - 12);

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

    // /teacher/ - 9
    var teacherUsername = url.substring(9, url.length);

    var teacherSlash = teacherUsername.search('/');

    teacherUsername = teacherUsername.substring(0, teacherSlash);

    // /lectureNotes - 13
    var searchedCourseIndex = url.indexOf('/course/');
    var searchedCourse = url.substring(searchedCourseIndex + 8, url.length - 13);

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

    // /teacher/ - 9
    var teacherUsername = url.substring(9, url.length);

    var teacherSlash = teacherUsername.search('/');

    teacherUsername = teacherUsername.substring(0, teacherSlash);

    // /classNotes - 11
    var searchedCourseIndex = url.indexOf('/course/');
    var searchedCourse = url.substring(searchedCourseIndex + 8, url.length - 11);

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

    // /teacher/ - 9
    var teacherUsername = url.substring(9, url.length);

    var teacherSlash = teacherUsername.search('/');

    teacherUsername = teacherUsername.substring(0, teacherSlash);

    // /otherNotes - 11
    var searchedCourseIndex = url.indexOf('/course/');
    var searchedCourse = url.substring(searchedCourseIndex + 8, url.length - 11);

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