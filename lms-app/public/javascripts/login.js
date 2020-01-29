$(document).ready(function() {

    // don't let user hit submit button yet
    $("button[type=submit]").prop("disabled", true);

    // fieldInput();
    
    $('#inputUsername').change(function(){
    
        if (inputsValid()) {
            $("button[type=submit]").prop("disabled", false);
        } else {
            $("button[type=submit]").prop("disabled", true);
        }

    });

    $('#inputPassword').change(function(){
        if (inputsValid()) {
            $("button[type=submit]").prop("disabled", false);
        } else {
            $("button[type=submit]").prop("disabled", true);
        }
    });

});

function fieldInput() {
    if (inputsValid()) {
        $("button[type=submit]").prop("disabled", false);
    } else {
        $("button[type=submit]").prop("disabled", true);
    }
}

function inputsValid() {

    let usernameVal = $('#inputUsername').val();
    let passwordVal = $('#inputPassword').val();
    let usernameField = $('#inputUsername');
    let passwordField = $('#inputPassword');

    if (usernameVal === "") {
        return false;
    } else {
        turnFieldDefaultColor(usernameField);
    }

    if (passwordVal === "") {
        return false;
    } else {
        turnFieldDefaultColor(passwordField);
    }

    return true;

}

function turnFieldDefaultColor(fieldObject) {

    fieldObject.css('border-color', '#ced4da');

}