var addCourse = function() {
    document.getElementById("addCourseButton").innerHTML 
    = "<form action='/user/addCourse' method='POST'><div class='row'><div class='col-sm-4'><label class='small mb-1 mt-3'>Course (With ID):<input class='form-control' placeholder='MATH-340-00300' required='required' name='course' type='text' value=''/></label></div><div class='col-sm-3'><label class='small mb-1 mt-3'>Course Name:<input class='form-control' placeholder='Algebra I' required='required' name='courseFullName' type='text' value=''/></label></div><div class='col-sm-3 text-center'><button class='btn-primary btn-sm' type='submit'>add course</button></div></div></form>"
}

var addSyllabus = function(course, fullCourseName) {
    document.getElementById("addSyllabusButton").innerHTML =
    "<div class='row'><form action='/user/addSyllabus' method='POST' enctype='multipart/form-data'><div class='row'><div class='col-sm-6'><label class='small mb-1 mt-3'>Upload File:<input required='required' name='uploadfile' type='file'/></label></div><input type='hidden' name='course' value='" + course + "' /><input type='hidden' name='courseFullName' value='" + fullCourseName + "'/><div class='col-sm-6 text-center'><button class='btn-primary btn-sm' type='submit'>add syllabus</button></div></div></form></div>"
}

var updateSyllabus = function(course, fullCourseName, syllabusFileID) {
    document.getElementById("updateSyllabusButton").innerHTML =
    "<div class='row'><form action='/user/updateSyllabus' method='POST' enctype='multipart/form-data'><div class='row'><div class='col-sm-6'><label class='small mb-1 mt-3'>Upload File:<input required='required' name='uploadfile' type='file'/></label></div><input type='hidden' name='course' value='" + course + "' /><input type='hidden' name='courseFullName' value='" + fullCourseName + "'/><input type='hidden' name='syllabusFileID' value='" + syllabusFileID + "' /><div class='col-sm-6 text-center'><button class='btn-primary btn-sm' type='submit'>update syllabus</button></div></div></form></div>"
}

var addSchedule = function(course, fullCourseName) {
    document.getElementById("addScheduleButton").innerHTML =
    "<div class='row'><form action='/user/addSchedule' method='POST' enctype='multipart/form-data'><div class='row'><div class='col-sm-6'><label class='small mb-1 mt-3'>Upload File:<input required='required' name='uploadfile' type='file'/></label></div><input type='hidden' name='course' value='" + course + "' /><input type='hidden' name='courseFullName' value='" + fullCourseName + "'/><div class='col-sm-6 text-center'><button class='btn-primary btn-sm' type='submit'>add schedule</button></div></div></form></div>"
}

var updateSchedule = function(course, fullCourseName, scheduleFileID) {
    document.getElementById("updateScheduleButton").innerHTML =
    "<div class='row'><form action='/user/updateSchedule' method='POST' enctype='multipart/form-data'><div class='row'><div class='col-sm-6'><label class='small mb-1 mt-3'>Upload File:<input required='required' name='uploadfile' type='file'/></label></div><input type='hidden' name='course' value='" + course + "' /><input type='hidden' name='courseFullName' value='" + fullCourseName + "'/><input type='hidden' name='scheduleFileID' value='" + scheduleFileID + "' /><div class='col-sm-6 text-center'><button class='btn-primary btn-sm' type='submit'>update schedule</button></div></div></form></div>"
}

var addAssignment = function(course, fullCourseName) {
    document.getElementById("addAssignmentButton").innerHTML =
    "<div class='row'><form action='/user/addAssignment' method='POST' enctype='multipart/form-data'><div class='row'><div class='col-sm-3'><label class='small mb-1 mt-3'>Assignment Name:<input class='form-control' placeholder='Assignment 1' required='required' name='name' type='text' value=''/></label></div><div class='col-sm-3'><label class='small mb-1 mt-3'>Due Date:<input class='form-control' placeholder='01/20/2020' required='required' name='date' type='text' value=''/></label></div><div class='col-sm-3'><label class='small mb-1 mt-3'>Upload File:<input required='required' name='uploadfile' type='file'/></label></div><input type='hidden' name='course' value='" + course + "' /><input type='hidden' name='courseFullName' value='" + fullCourseName + "'/><div class='col-sm-3 text-center'><button class='btn-primary btn-sm' type='submit'>add assignment</button></div></div></form></div>"
}

var addLectureNote = function(course, fullCourseName) {
    document.getElementById("addLectureNoteButton").innerHTML =
    "<div class='row'><form action='/user/addLectureNote' method='POST' enctype='multipart/form-data'><div class='row'><div class='col-sm-3'><label class='small mb-1 mt-3'>Lecture Name:<input class='form-control' placeholder='Lecture 1' required='required' name='name' type='text' value=''/></label></div><div class='col-sm-3'><label class='small mb-1 mt-3'>Lecture Date:<input class='form-control' placeholder='01/20/2020' required='required' name='date' type='text' value=''/></label></div><div class='col-sm-3'><label class='small mb-1 mt-3'>Upload File:<input required='required' name='uploadfile' type='file'/></label></div><input type='hidden' name='course' value='" + course + "' /><input type='hidden' name='courseFullName' value='" + fullCourseName + "'/><div class='col-sm-3 text-center'><button class='btn-primary btn-sm' type='submit'>add lecture Note</button></div></div></form></div>"
}

var addClassNote = function(course, fullCourseName) {
    document.getElementById("addClassNoteButton").innerHTML =
    "<div class='row'><form action='/user/addClassNote' method='POST' enctype='multipart/form-data'><div class='row'><div class='col-sm-3'><label class='small mb-1 mt-3'>Class Note Name:<input class='form-control' placeholder='Class Day 1' required='required' name='name' type='text' value=''/></label></div><div class='col-sm-3'><label class='small mb-1 mt-3'>Class Note Date:<input class='form-control' placeholder='01/20/2020' required='required' name='date' type='text' value=''/></label></div><div class='col-sm-3'><label class='small mb-1 mt-3'>Upload File:<input required='required' name='uploadfile' type='file'/></label></div><input type='hidden' name='course' value='" + course + "' /><input type='hidden' name='courseFullName' value='" + fullCourseName + "'/><div class='col-sm-3 text-center'><button class='btn-primary btn-sm' type='submit'>add class note</button></div></div></form></div>"
}

var addOtherNote = function(course, fullCourseName) {
    document.getElementById("addOtherNoteButton").innerHTML =
    "<div class='row'><form action='/user/addOtherNote' method='POST' enctype='multipart/form-data'><div class='row'><div class='col-sm-3'><label class='small mb-1 mt-3'>Name:<input class='form-control' placeholder='Field Trip Form' required='required' name='name' type='text' value=''/></label></div><div class='col-sm-3'><label class='small mb-1 mt-3'>Date (Optional):<input class='form-control' placeholder='Date (Optional)' name='date' type='text' value=''/></label></div><div class='col-sm-3'><label class='small mb-1 mt-3'>Upload File:<input required='required' name='uploadfile' type='file'/></label></div><input type='hidden' name='course' value='" + course + "' /><input type='hidden' name='courseFullName' value='" + fullCourseName + "'/><div class='col-sm-3 text-center'><button class='btn-primary btn-sm' type='submit'>add other file</button></div></div></form></div>"
}