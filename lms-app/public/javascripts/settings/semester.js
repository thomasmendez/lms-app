$(document).ready(function() {

    // don't let user hit submit button yet
    $("button[type=submit]").prop("disabled", true);

    createYearOptions();

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

function allFormValuesValid() {

    let currentPassword = $('inputCurrentPassword').val();
    let radioFall = document.getElementById('fall');
    let radioSpring = document.getElementById('spring');
    let radioFullYear = document.getElementById('full-year');
    let year = $('#yearOptions').val();

    if (currentPassword === "") {
        return false;
    }

    // get the current year that we are in
    var currentYear = new Date().getFullYear();
    let nextYear = (currentYear + 1).toString();
    currentYear = currentYear.toString();

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