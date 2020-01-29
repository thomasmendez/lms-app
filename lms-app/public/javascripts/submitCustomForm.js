var deleteAssignment = function(assignmentID, assignmentFileID, assignmentFilename) {

    // add a hidden variable to our form with the database id of the document selected
    let hiddenAssignmentID = "<input type='hidden' name='assignmentID' value='" + assignmentID + "' id='assignmentID' />";

    let hiddenAssignmentFileID = "<input type='hidden' name='assignmentFileID' value='" + assignmentFileID + "' id='assignmentFileID' />";
    
    let hiddenFilename = "<input type='hidden' name='assignmentFilename' value='" + assignmentFilename + "'id='assignmentFilename' />";

    document.getElementById("assignmentIDPlaceholder").innerHTML = hiddenAssignmentID;

    document.getElementById("assignmentFileIDPlaceholder").innerHTML = hiddenAssignmentFileID;

    document.getElementById("assignmentFilenamePlaceholder").innerHTML = hiddenFilename;

    // submit the form to delete
    document.getElementById("deleteAssignmentForm").submit(); 

}

var deleteLectureNote = function(lectureNoteID, lectureNoteFileID, lectureNoteFilename) {

    // add a hidden variable to our form with the database id of the document selected
    let hiddenLectureNoteID = "<input type='hidden' name='lectureNoteID' value='" + lectureNoteID + "' id='lectureNoteID' />";

    let hiddenLectureNoteFileID = "<input type='hidden' name='lectureNoteFileID' value='" + lectureNoteFileID + "' id='lectureNoteFileID' />";
    
    let hiddenFilename = "<input type='hidden' name='lectureNoteFilename' value='" + lectureNoteFilename + "'id='lectureNoteFilename' />";

    document.getElementById("lectureNoteIDPlaceholder").innerHTML = hiddenLectureNoteID;

    document.getElementById("lectureNoteFileIDPlaceholder").innerHTML = hiddenLectureNoteFileID;

    document.getElementById("lectureNoteFilenamePlaceholder").innerHTML = hiddenFilename;

    // submit the form to delete
    document.getElementById("deleteLectureNoteForm").submit(); 

}

var deleteClassNote = function(classNoteID, classNoteFileID, classNoteFilename) {

    // add a hidden variable to our form with the database id of the document selected
    let hiddenClassNoteID = "<input type='hidden' name='classNoteID' value='" + classNoteID + "' id='classNoteID' />";

    let hiddenClassNoteFileID = "<input type='hidden' name='classNoteFileID' value='" + classNoteFileID + "' id='classNoteFileID' />";
    
    let hiddenFilename = "<input type='hidden' name='classNoteFilename' value='" + classNoteFilename + "'id='classNoteFilename' />";

    document.getElementById("classNoteIDPlaceholder").innerHTML = hiddenClassNoteID;

    document.getElementById("classNoteFileIDPlaceholder").innerHTML = hiddenClassNoteFileID;

    document.getElementById("classNoteFilenamePlaceholder").innerHTML = hiddenFilename;

    // submit the form to delete
    document.getElementById("deleteClassNoteForm").submit(); 

}