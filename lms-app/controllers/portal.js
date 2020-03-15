var mongodb = require('../db/mongodb');

exports.getHome = function (req, res, next) {

    // console.log(req.user);

    if (req.user !== undefined) {

        let username = req.user.username;

        mongodb.findTeacherByUsername(username).then(function (teacher) {

            teacherInfo = {
                firstName: teacher.firstName,
                lastName: teacher.lastName,
                semester: teacher.semester,
                year: teacher.year
            }

            res.render('portal/home', {
                user: req.user
            });
    
        });

    } else {

        // return user to login page
		res.redirect('/login')

    }

}

exports.getCourse = function(req, res, next) {

    let url = decodeURI(req.originalUrl);

    if (req.user !== undefined) {

        let username = req.user.username;

        var searchedCourse = urlFilterCourse(url)

        var courseInfo;

        mongodb.findTeacherByUsername(username).then(function (teacher) {

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

            res.render('portal/class', {
                user: req.user,
                course: courseInfo,
                currentURL: url
            });
        });

    } else {

        // return user to login page
		res.redirect('/login')

    }

}

exports.getSyllabus = function (req, res, next) {

    let url = decodeURI(req.originalUrl);

    if (req.user !== undefined) {

        let username = req.user.username;

        var searchedCourse = urlFilterCourse(url)
        
        var syllabusInfo;

        mongodb.findTeacherByUsername(username).then(function (teacher) {

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

            res.render('portal/syllabus', {
                user: req.user,
                syllabus: syllabusInfo,
                currentURL: url
            });
        });

    } else {

        // return user to login page
		res.redirect('/login')

    }

}

exports.getSchedule = function (req, res, next) {

    let url = decodeURI(req.originalUrl);

    if (req.user !== undefined) {

        let username = req.user.username;

        var searchedCourse = urlFilterCourse(url)
        
        var scheduleInfo;

        mongodb.findTeacherByUsername(username).then(function (teacher) {

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

            res.render('portal/schedule', {
                user: req.user,
                schedule: scheduleInfo,
                currentURL: url
            });
        });

    } else {

        // return user to login page
		res.redirect('/login')

    }

}

exports.getAssignments = function (req, res, next) {

    let url = decodeURI(req.originalUrl);

    if (req.user !== undefined) {

        let username = req.user.username;

        var searchedCourse = urlFilterCourse(url)
        
        var assignmentInfo;

        mongodb.findTeacherByUsername(username).then(function (teacher) {

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

            res.render('portal/assignments', {
                user: req.user,
                assignments: assignmentInfo,
                currentURL: url
            });
        });

    } else {

        // return user to login page
		res.redirect('/login')

    }

}

exports.getLectureNotes = function (req, res, next) {

    let url = decodeURI(req.originalUrl);

    if (req.user !== undefined) {

        let username = req.user.username;

        var searchedCourse = urlFilterCourse(url)
        
        var lectureNotesInfo;

        mongodb.findTeacherByUsername(username).then(function (teacher) {

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

            res.render('portal/lectureNotes', {
                user: req.user,
                lectureNotes: lectureNotesInfo,
                currentURL: url
            });

        });

    } else {

        // return user to login page
		res.redirect('/login')

    }

}


exports.getClassNotes = function (req, res, next) {

    let url = decodeURI(req.originalUrl);

    if (req.user !== undefined) {

        let username = req.user.username;

        var searchedCourse = urlFilterCourse(url)
        
        var classNotesInfo;

        mongodb.findTeacherByUsername(username).then(function (teacher) {

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

            res.render('portal/classNotes', {
                user: req.user,
                classNotes: classNotesInfo,
                currentURL: url
            });

        });

    } else {

        // return user to login page
		res.redirect('/login')

    }

}

exports.getOtherNotes = function (req, res, next) {

    let url = decodeURI(req.originalUrl);

    if (req.user !== undefined) {

        let username = req.user.username;

        var searchedCourse = urlFilterCourse(url)
        
        var otherNotesInfo;

        mongodb.findTeacherByUsername(username).then(function (teacher) {

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

            res.render('portal/otherNotes', {
                user: req.user,
                otherNotes: otherNotesInfo,
                currentURL: url
            });

        });

    } else {

        // return user to login page
		res.redirect('/login')

    }

}

function urlFilterCourse(url) {
    
    // /course/ - 8
    var searchedCourse = url.substring();

    let courseSlash = searchedCourse.search('/course/');

    searchedCourse = searchedCourse.substring(courseSlash + 8, searchedCourse.length);

    var tempSlash = searchedCourse.search('/');

    searchedCourse = searchedCourse.substring(0, tempSlash);

    return searchedCourse;
}