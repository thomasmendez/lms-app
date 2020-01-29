$(document).ready(function() {

    // don't let user hit submit button yet
    $("button[type=submit]").prop("disabled", true);

    createYearOptions();

    $('#inputUsername').change(function(){

        if (validateUsername()) {
            if (allFormValuesValid()) {
                $("button[type=submit]").prop("disabled", false);
            } else {
                $("button[type=submit]").prop("disabled", true);
            }
        } else {
            $("button[type=submit]").prop("disabled", true);
        }

    });

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

    $('#inputPassword').change(function(){
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

    $('#inputConfirmPassword').change(function(){

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

    $('#inputFirstName').change(function(){

        if (validateFirstName()) {
            if (allFormValuesValid()) {
                $("button[type=submit]").prop("disabled", false);
            } else {
                $("button[type=submit]").prop("disabled", true);
            }
        } else {
            $("button[type=submit]").prop("disabled", true);
        }

    });

    $('#inputLastName').change(function(){

        if (validateLastName()) {
            if (allFormValuesValid()) {
                $("button[type=submit]").prop("disabled", false);
            } else {
                $("button[type=submit]").prop("disabled", true);
            }
        } else {
            $("button[type=submit]").prop("disabled", true);
        }

    });

    $('input[type=radio]').change(function() {
        if (validateSemester()) {
            if (allFormValuesValid()) {
                $("button[type=submit]").prop("disabled", false);
            } else {
                $("button[type=submit]").prop("disabled", true);
            }
        } else {
            $("button[type=submit]").prop("disabled", true);
        }
    });

    $('#yearOptions').change(function() {
        if (validateYear()) {
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

function createYearOptions() {

    // get the current year that we are in
    let currentYear = new Date().getFullYear();

    // get the year options 
    let selectYearOptions = document.getElementById("yearOptions").options;

    // does not work using jQuery
    // let selectYearOptions = $('#yearOptions').options;

    // set the option as the current year or the next year
    var yearFuture = currentYear;
    var yearCount = 0; 

    for (i = 0; i < selectYearOptions.length; i++) {

        selectYearOptions[i].value = yearFuture + yearCount;

        selectYearOptions[i].text = yearFuture + yearCount;

        yearCount++;

    }
    
}

function validateUsername() {

    let usernameField = $('#inputUsername')
    let usernameInfoTextID = "usernameError"
    let username = usernameField.val();
    // must start with character a-Z or digit followed by a-Z or digit or undrscore 
    let startWith = /^[a-zA-Z0-9]/;
    // and ends with 3 or more 
    let user_regex = /^[a-zA-Z0-9][a-zA-Z0-9_]{3,10}$/;
    if (!(startWith.test(username))) {
        let infoText = "Username does not start with letter or digit";
        turnFieldRed(usernameField);
        turnTextToDanger(usernameInfoTextID);
        $('#usernameError').text(infoText);
        return false;
    } else if (!(user_regex.test(username))) {
        let infoText = "Username needs to be 4 characters or longer and can only contain letters, digit, or underscore";
        turnFieldRed(usernameField);
        turnTextToDanger(usernameInfoTextID);
        $('#usernameError').text(infoText);
        return false;
    } else {
        // remove red color and info text 
        // change color of field and text to default 
        turnFieldDefaultColor(usernameField);
        turnTextToInfo(usernameInfoTextID);
        $('#usernameError').text('');
        return true;
    }

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

function validatePassword() {

    let passwordField = $('#inputPassword');
    let password = passwordField.val();
    let passwordInfoTextID = "passwordError";
    let confirmedPasswordField = $('#inputConfirmPassword');
    let confirmedPassword = confirmedPasswordField.val();

    let pass_regex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,50})/;

    if (!(pass_regex.test(password))) {

        let infoText = "Password invalid. Must contain 1 lower, 1 upper, 1 digit, 1 special character and must be at least 6 characters long";
        turnFieldRed(passwordField);
        turnTextToDanger(passwordInfoTextID);
        $('#passwordError').text(infoText);
        return false;

    } else {

        // remove pervious error
        turnFieldDefaultColor(passwordField);
        $('#passwordError').text('');

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
        $('#confirmPasswordError').text(infoText);
        return false;

    } else {

        // remove pervious error if there
        turnFieldDefaultColor(passwordField);
        turnFieldDefaultColor(confirmedPasswordField);
        $('#passwordError').text('');
        $('#confirmPasswordError').text('');
        return true;
    }
}

function validateConfirmPassword() {

    let passwordField = $('#inputPassword');
    let password = passwordField.val();
    let passwordInfoTextID = "passwordError";
    let confirmedPasswordField = $('#inputConfirmPassword');
    let confirmedPassword = confirmedPasswordField.val();
    let confirmPasswordInfoTextID = "confirmPasswordError";

    let pass_regex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,50})/;

    if (password === "") {
        // if we do not have anything for input password for some reason
        // let user know if this password for confirm password is valid
        if (!(pass_regex.test(confirmedPassword))) {
                let infoText = "Password invalid. Must contain 1 lower, 1 upper, 1 digit, 1 special character, and must be at least 6 characters long";
                turnFieldRed(passwordField);
                turnTextToDanger(passwordInfoTextID);
                $('#passwordError').text(infoText);
                return false;
        }
    }
    // check to see if the password is the same as the confirmed password 
    if (password !== confirmedPassword) {
        let passwordErrorText = "Password invalid. Must contain 1 lower, 1 upper, 1 digit, 1 special character, and must be at least 6 characters long";
        let confirmPasswordErrorText = "Password and confirmed password does not match";
        turnFieldRed(passwordField);
        $('#passwordError').text(passwordErrorText);
        turnFieldRed(confirmedPasswordField);
        $('#confirmPasswordError').text(confirmPasswordErrorText);
        return false;
    } else {
        // passwords match but the password might still be invalid 
        if (!(pass_regex.test(password))) {
                let infoText = "Password invalid. Must contain 1 lower, 1 upper, 1 digit, 1 special character, and must be at least 6 characters long";
                turnFieldRed(passwordField);
                turnFieldRed(confirmedPasswordField);
                turnTextToDanger(passwordInfoTextID);
                $('#passwordError').text(infoText);
                return false;
        } else {
            // passwords match and password is still valid
            // remove pervious errors 
            turnFieldDefaultColor(passwordField);
            turnFieldDefaultColor(confirmedPasswordField);
            $('#passwordError').text('');
            $('#confirmPasswordError').text('');
            return true;
        }
    }

}

function validateFirstName() {

    let firstNameField = $('#inputFirstName');
    let firstName = firstNameField.val();
    let firstNameInfoTextID = "firstNameError";
    let infoText = "Please only use letters and dashes for first name"
    first_regex = /^[a-z | A-Z | \. | -]+$/;
    if (!(first_regex.test(firstName))) {
        turnFieldRed(firstNameField);
        turnTextToDanger(firstNameInfoTextID);
        $('#firstNameError').text(infoText);
        return false;
    } else {
        turnFieldDefaultColor(firstNameField);
        $('#firstNameError').text('');
        return true;
    }

}

function validateLastName() {

    let lastNameField = $('#inputLastName');
    let lastName = $('#inputLastName').val();
    let lastNameInfoTextID = "lastNameError";
    let infoText = "Please only use letters and dashes for last name"
    last_regex = /^[a-z | A-Z | \. | -]+$/;
    if (!(last_regex.test(lastName))) {
        turnFieldRed(lastNameField);
        turnTextToDanger(lastNameInfoTextID);
        $('#lastNameError').text(infoText);
        return false;
    } else {
        turnFieldDefaultColor(lastNameField);
        $('#lastNameError').text('');
        return true;
    }

}

function validateSemester() {
    let radioFall = document.getElementById('fall');
    let radioSpring = document.getElementById('spring');
    let radioFullYear = document.getElementById('full-year');

    // radio buttons check 
    var isOneChecked = false;
    if (radioFall.checked) {
        isOneChecked = true;
    } 
    
    if (radioSpring.checked) {
        isOneChecked = true;
    } 

    if (radioFullYear.checked) {
        isOneChecked = true;
    }

    if (!isOneChecked) {
        return false;
    }

    return true;
}

function validateYear() {
    let year = $('#yearOptions').val();

    var currentYear = new Date().getFullYear();
    let nextYear = (currentYear + 1).toString();
    currentYear = currentYear.toString();

    if (!((year === currentYear) || (year === nextYear))) {
        return false;
    } 

    return true;
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

function fieldInput() {
    if (allFormValuesValid()) {
        $("button[type=submit]").prop("disabled", false);
    } else {
        $("button[type=submit]").prop("disabled", true);
    }
}

function allFormValuesValid() {

    let username = $('#inputUsername').val();
    let email = $('#inputEmail').val();
    let password = $('#inputPassword').val();
    let confirmedPassword = $('#inputConfirmPassword').val();
    let firstName = $('#inputFirstName').val();
    let lastName = $('#inputLastName').val();
    let radioFall = document.getElementById('fall');
    let radioSpring = document.getElementById('spring');
    let radioFullYear = document.getElementById('full-year');
    let year = $('#yearOptions').val();

    // get the current year that we are in
    var currentYear = new Date().getFullYear();
    let nextYear = (currentYear + 1).toString();
    currentYear = currentYear.toString();

    let user_regex = /[a-zA-Z\d][a-zA-Z0-9_]{3,10}$/;
    let email_regex = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;

    let pass_regex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,50})/;

    let first_regex = /^[a-z | A-Z | \. | -]+$/;
    let last_regex = /^[a-z | A-Z | \. | -]+$/;

    // username check
    if (!(user_regex.test(username))) {
        return false;
    }

    // email check
    if (!(email_regex.test(email))) {
        return false;
    }

    // password check
    if (!(pass_regex.test(password))) {
        return false;
    }

    if (password !== confirmedPassword) {
        return false;
    }

    // name check 
    if (!(first_regex.test(firstName))) {
        return false;
    }

    if (!(last_regex.test(lastName))) {
        return false;
    }

    // radio buttons check 
    var isOneChecked = false;
    if (radioFall.checked) {
        isOneChecked = true;
    } 
    
    if (radioSpring.checked) {
        isOneChecked = true;
    } 

    if (radioFullYear.checked) {
        isOneChecked = true;
    }

    if (!isOneChecked) {
        return false;
    }

    // year check 
    if (!((year === currentYear) || (year === nextYear))) {
        return false;
    }

    return true;

}