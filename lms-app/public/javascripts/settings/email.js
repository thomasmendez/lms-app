$(document).ready(function() {

    // don't let user hit submit button yet
    $("button[type=submit]").prop("disabled", true);

    $('#inputEmail').change(function() {

        if (validateEmail()) {
            if (allFormValuesValid()) {
                $("button[type=submit]").prop("disabled", false);
            } else {
                $("button[type=submit]").prop("disabled", true);
            }
        } else {
            $("button[type=submit]").prop("disabled", true);
        }

    })

    $('#inputCurrentPassword').change(function() {

        if (validateEmail()) {
            if (allFormValuesValid()) {
                $("button[type=submit]").prop("disabled", false);
            } else {
                $("button[type=submit]").prop("disabled", true);
            }
        } else {
            $("button[type=submit]").prop("disabled", true);
        }

    })

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

function validateEmail() {
    let emailField = $('#inputEmail');
    let emailInfoTextID = "emailError";
    let email = emailField.val();
    email_regex = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
    if (!(email_regex.test(email))) {
        let infoText = "Email is invalid";
        turnFieldRed(emailField);
        turnTextToDanger(emailInfoTextID);
        $('#emailError').text(infoText);
        return false;
    } else {
        turnFieldDefaultColor(emailField);
        turnTextToInfo(emailInfoTextID);
        $('#emailError').text('');
        return true;
    }
}

function allFormValuesValid() {

    let email = $('#inputEmail').val();
    let password = $('#inputCurrentPassword').val();

    let email_regex = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;

    // email check
    if (!(email_regex.test(email))) {
        return false;
    }

    if (password === "") {
        return false;
    }

    return true;

}