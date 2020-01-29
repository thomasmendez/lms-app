$(document).ready(function() {

    // don't let user hit submit button yet
    $("button[type=submit]").prop("disabled", true);

    $('#inputCurrentPassword').change(function() {

        if (allFormValuesValid()) {
            $("button[type=submit]").prop("disabled", false);
        } else {
            $("button[type=submit]").prop("disabled", true);
        }

    });

});

function fieldInput() {
    if (allFormValuesValid()) {
        $("button[type=submit]").prop("disabled", false);
    } else {
        $("button[type=submit]").prop("disabled", true);
    }
}

function turnFieldRed(fieldObject) {

    fieldObject.css('border-color', 'red');

}

function turnTextToDanger(idName) {

    // since we are using bootstrap just change the class name 
    document.getElementById(idName).className = "small text-danger";

}

function turnFieldDefaultColor(fieldObject) {

    fieldObject.css('border-color', '#ced4da');

}

function turnTextToInfo(idName) {

    // since we are using bootstrap just change the class name 
    document.getElementById(idName).className = "small text-info";

}

function allFormValuesValid() {

    let currentPassword = $('#inputCurrentPassword').val();

    if (currentPassword === "") {
        return false;
    }

    return true;

}