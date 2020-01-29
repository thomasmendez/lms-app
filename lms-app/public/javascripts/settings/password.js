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

    $('#inputNewPassword').change(function(){
        if (validatePassword()) {
            if (allFormValuesValid()) {
                $("button[type=submit]").prop("disabled", false);
            } else {
                $("button[type=submit]").prop("disabled", true);
            }
        } else {
            $("button[type=submit]").prop("disabled", true);
        }
    });

    $('#inputConfirmNewPassword').change(function(){

        if (validateConfirmPassword()) {
            if (allFormValuesValid()) {
                $("button[type=submit]").prop("disabled", false);
            } else {
                $("button[type=submit]").prop("disabled", true);
            }
        } else {
            $("button[type=submit]").prop("disabled", true);
        }
        
    });

});


function validatePassword() {

    let passwordField = $('#inputNewPassword');
    let password = passwordField.val();
    let passwordInfoTextID = "newPasswordError";
    let confirmedPasswordField = $('#inputConfirmNewPassword');
    let confirmedPassword = confirmedPasswordField.val();

    let pass_regex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,50})/;

    if (!(pass_regex.test(password))) {

        let infoText = "Password invalid. Must contain 1 lower, 1 upper, 1 digit, 1 special character, and must be at least 6 characters long";
        turnFieldRed(passwordField);
        turnTextToDanger(passwordInfoTextID);
        $('#newPasswordError').text(infoText);
        return false;

    } else {

        // remove pervious error
        turnFieldDefaultColor(passwordField);
        $('#newPasswordError').text('');

    }

    // we don't have a confirmed password set yet
    // it is safe to return true if their password is valid
    if (confirmedPassword === "") {
        return true;
    }

    // check to see if the password is the same as the confirmed password 

    if (password !== confirmedPassword) {

        let infoText = "Password and confirmed password does not match";
        turnFieldRed(passwordField);
        turnFieldRed(confirmedPasswordField);
        $('#confirmNewPasswordError').text(infoText);
        return false;

    } else {

        // remove pervious error if there
        turnFieldDefaultColor(passwordField);
        turnFieldDefaultColor(confirmedPasswordField);
        $('#newPasswordError').text('');
        $('#confirmNewPasswordError').text('');
        return true;
    }
}

function validateConfirmPassword() {
    let passwordField = $('#inputNewPassword');
    let password = passwordField.val();
    let passwordInfoTextID = "newPasswordError";
    let confirmedPasswordField = $('#inputConfirmNewPassword');
    let confirmedPassword = confirmedPasswordField.val();
    let confirmPasswordInfoTextID = "confirmNewPasswordError";

    let pass_regex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,50})/;

    if (password === "") {
        // if we do not have anything for input password for some reason
        // let user know if this password for confirm password is valid
        if (!(pass_regex.test(confirmedPassword))) {
                let infoText = "Password invalid. Must contain 1 lower, 1 upper, 1 digit, 1 special character, and must be at least 6 characters long";
                turnFieldRed(passwordField);
                turnTextToDanger(passwordInfoTextID);
                $('#newPasswordError').text(infoText);
                return false;
        }
    }
    // check to see if the password is the same as the confirmed password 
    if (password !== confirmedPassword) {
        let passwordErrorText = "Password invalid. Must contain 1 lower, 1 upper, 1 digit, 1 special character, and must be at least 6 characters long";
        let confirmPasswordErrorText = "Password and confirmed password does not match";
        turnFieldRed(passwordField);
        turnTextToDanger(passwordInfoTextID);
        $('#newPasswordError').text(passwordErrorText);
        turnFieldRed(confirmedPasswordField);
        $('#confirmNewPasswordError').text(confirmPasswordErrorText);
        return false;
    } else {
        // passwords match but the password might still be invalid 
        if (!(pass_regex.test(password))) {
                let infoText = "Password invalid. Must contain 1 lower, 1 upper, 1 digit, 1 special character, and must be at least 6 characters long";
                turnFieldRed(passwordField);
                turnFieldRed(confirmedPasswordField);
                turnTextToDanger(passwordInfoTextID);
                $('#newPasswordError').text(infoText);
                return false;
        } else {
            // passwords match and password is still valid
            // remove pervious errors 
            turnFieldDefaultColor(passwordField);
            turnFieldDefaultColor(confirmedPasswordField);
            $('#newPasswordError').text('');
            $('#confirmNewPasswordError').text('');
            return true;
        }
    }
}

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
    let newPassword = $('#inputNewPassword').val();
    let confirmPassword = $('#inputConfirmNewPassword').val();

    let pass_regex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,50})/;

    if (currentPassword === "") {
        return false;
    }

    // password check
    if (!(pass_regex.test(newPassword))) {
        return false;
    }

    if (newPassword !== confirmPassword) {
        return false;
    }

    return true;

}