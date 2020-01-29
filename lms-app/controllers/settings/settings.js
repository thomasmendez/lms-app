var mongodb = require('../../db/mongodb');

var Grid = require("gridfs-stream");

var mongoose = require('mongoose');

var conn = mongoose.connection;

let bycrypt = require('bcrypt');

const generateHash = function(password) {
	return bycrypt.hashSync(password, bycrypt.genSaltSync(8, "a"), null);
}

exports.getSettings = function (req, res, next) {

    let url = decodeURI(req.originalUrl);
    let startIndex = url.search("/settings");
    let settingsURL = url.substring(0, startIndex + 9);

    if (req.user !== undefined) {
        res.render('portal/settings/account', {
            user: req.user,
            currentURL: url,
            settingsURL: settingsURL
        });
    }
    else {
        // return user to login page
        res.redirect('/login')
    }
}

exports.getSettingsEmail = function (req, res, next) {

    let url = decodeURI(req.originalUrl);
    let startIndex = url.search("/settings");
    let settingsURL = url.substring(0, startIndex + 9);

    if (req.user !== undefined) {
        res.render('portal/settings/email', {
            user: req.user,
            currentURL: url,
            settingsURL: settingsURL
        });
    }
    else {
        // return user to login page
        res.redirect('/login')
    }
}

exports.updateSettingsEmail = function (req, res, next) {

    let url = decodeURI(req.originalUrl);
    let startIndex = url.search("/settings");
    let settingsURL = url.substring(0, startIndex + 9);

    if (req.user !== undefined) {

        // get the information 
        let newEmail = req.body.email;
        let currentPassword = req.body.currentPassword;

        // make sure email is valid 
        email_regex = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;

        if ((email_regex.test(newEmail))) {

            // compare sent password with hashed password 
            if (bycrypt.compareSync(currentPassword, req.user.password)) {

                let message = "Email successfully updated!"

                // send confirmation information 

                let success = {
                    message: message,
                    email: newEmail
                }

                mongodb.updateEmail(req.user.username, newEmail).then(function (result) {
                    console.log("updated email: " + result);
                    res.render('portal/settings/email', {
                        user: req.user,
                        currentURL: url,
                        settingsURL: settingsURL,
                        success: success
                    });

                })

            } else {

                // resend whatever information back
                // send back an error message 
                let message = "Your entered current password was incorrect";
                let errorCurrentPassword = "Current password is incorrect";

                let err = {
                    message: message,
                    currentPassword: errorCurrentPassword
                }

                let formData = {
                    currentPassword: currentPassword,
                    email: newEmail
                }

                res.render('portal/settings/email', {
                    user: req.user,
                    currentURL: url,
                    settingsURL: settingsURL,
                    formData: formData,
                    errors: err
                });
            }

        } else {

            // not a valid email 
            let message = "Please enter a valid email address";
            let errorEmail = "Email is invalid";

            let err = {
                message: message,
                email: errorEmail
            }
            let formData = {
                currentPassword: currentPassword,
                email: newEmail
            }
            res.render('portal/settings/email', {
                user: req.user,
                currentURL: url,
                settingsURL: settingsURL,
                formData: formData,
                errors: err
            });

        }
    }
    else {
        // return user to login page
        res.redirect('/login')
    }
}

exports.getSettingsSemester = function (req, res, next) {

    let url = decodeURI(req.originalUrl);
    let startIndex = url.search("/settings");
    let settingsURL = url.substring(0, startIndex + 9);

    if (req.user !== undefined) {
        res.render('portal/settings/semester', {
            user: req.user,
            currentURL: url,
            settingsURL: settingsURL
        });
    }
    else {
        // return user to login page
        res.redirect('/login')
    }
}

exports.updateSettingsSemester = function (req, res, next) {

    let url = decodeURI(req.originalUrl);
    let startIndex = url.search("/settings");
    let settingsURL = url.substring(0, startIndex + 9);

    if (req.user !== undefined) {

        // get the information 
        let newSemester = req.body.semester;
        let newYear = req.body.year;
        let currentPassword = req.body.currentPassword;

        // validate the information
        if ((newSemester === "Fall") || (newSemester === "Spring") || (newSemester === "Full-Year")) {

            var currentYear = new Date().getFullYear();
            let nextYear = (currentYear + 1).toString();
            currentYear = currentYear.toString();

            if (((newYear === currentYear) || (newYear === nextYear))) {

                // compare sent password with hashed password 

                if (bycrypt.compareSync(currentPassword, req.user.password)) {

                    let message = "Successfully updated current semester!";

                    // send confirmation information 

                    let success = {
                        message: message,
                        semester: newSemester,
                        year: newYear
                    };

                    mongodb.updateSemester(req.user.username, newSemester, newYear).then(function (result) {
                        console.log("updated semester: " + result);
                        res.render('portal/settings/semester', {
                            user: req.user,
                            currentURL: url,
                            settingsURL: settingsURL,
                            success: success
                        });

                    })

                } else {

                    // resend whatever information back
                    // send back an error message 
                    let message = "Your entered current password was incorrect";
                    let errorCurrentPassword = "Current password is incorrect";

                    let err = {
                        message: message,
                        currentPassword: errorCurrentPassword
                    };

                    let formData = {
                        semester: newSemester,
                        year: newYear,
                        currentPassword: currentPassword
                    };

                    res.render('portal/settings/semester', {
                        user: req.user,
                        currentURL: url,
                        settingsURL: settingsURL,
                        formData: formData,
                        errors: err
                    });
                }
                
            } else {
                // not a valid year
                let message = "Please enter a valid semester and year";
                let errorYear = "Year is invalid";

                let err = {
                    message: message,
                    year: errorYear
                };
                let formData = {
                    year: newYear,
                    currentPassword: currentPassword
                };
                res.render('portal/settings/semester', {
                    user: req.user,
                    currentURL: url,
                    settingsURL: settingsURL,
                    formData: formData,
                    errors: err
                });

            }

        } else {

            // not a valid semester 
            let message = "Please enter a valid semester and year";
            let errorSemester = "Semester is invalid";

            let err = {
                message: message,
                semester: errorSemester
            };
            let formData = {
                semester: newSemester,
                currentPassword: currentPassword
            };
            res.render('portal/settings/semester', {
                user: req.user,
                currentURL: url,
                settingsURL: settingsURL,
                formData: formData,
                errors: err
            });

        }
    }
    else {
        // return user to login page
        res.redirect('/login')
    }
}

exports.getSettingsPassword = function (req, res, next) {

    let url = decodeURI(req.originalUrl);
    let startIndex = url.search("/settings");
    let settingsURL = url.substring(0, startIndex + 9);

    if (req.user !== undefined) {
        res.render('portal/settings/password', {
            user: req.user,
            currentURL: url,
            settingsURL: settingsURL
        });
    }
    else {
        // return user to login page
        res.redirect('/login')
    }
}

exports.updateSettingsPassword = function (req, res, next) {

    let url = decodeURI(req.originalUrl);
    let startIndex = url.search("/settings");
    let settingsURL = url.substring(0, startIndex + 9);

    if (req.user !== undefined) {

        // get the information 
        let currentPassword = req.body.currentPassword;
        let newPassword = req.body.newPassword;
        let confirmNewPassword = req.body.confirmNewPassword;

        let pass_regex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,50})/;

        // validate the new password
        if (pass_regex.test(newPassword)) {

            // check to make sure that it is the same as the confirmed new password
            if (newPassword === confirmNewPassword) {

                // compare sent password with hashed password 
                if (bycrypt.compareSync(currentPassword, req.user.password)) {

                    let message = "Successfully updated current password!";

                    // send confirmation information 

                    let success = {
                        message: message
                    };

                    // create a hashed password 
                    let newHashedPassword = generateHash(newPassword);

                    mongodb.updatePassword(req.user.username, newHashedPassword).then(function (result) {
                        console.log("updated password: " + result);
                        res.render('portal/settings/password', {
                            user: req.user,
                            currentURL: url,
                            settingsURL: settingsURL,
                            success: success
                        });
                    });

                } else {

                    // resend whatever information back
                    // send back an error message 
                    let message = "Your entered current password was incorrect";
                    let errorCurrentPassword = "Current password is incorrect";

                    let err = {
                        message: message,
                        currentPassword: errorCurrentPassword
                    };

                    let formData = {
                        password: currentPassword,
                        newPassword: newPassword,
                        confirmNewPassword: confirmNewPassword
                    };

                    res.render('portal/settings/password', {
                        user: req.user,
                        currentURL: url,
                        settingsURL: settingsURL,
                        formData: formData,
                        errors: err
                    });
                }
                
            } else {
                // new password and current password does not match 
                let message = "New password and confirmed new password does not match!";
                let errorConfirmNewPassword = "Confirmed password does not match new password";

                let err = {
                    message: message,
                    confirmNewPassword: errorConfirmNewPassword
                };
                let formData = {
                    password: currentPassword,
                    newPassword: newPassword,
                    confirmNewPassword: confirmNewPassword
                };
                res.render('portal/settings/password', {
                    user: req.user,
                    currentURL: url,
                    settingsURL: settingsURL,
                    formData: formData,
                    errors: err
                });
            }

        } else {

            // not a valid password 
            let message = "Please enter a valid password";
            let errorPassword = "Password is invalid";

            let err = {
                message: message,
                password: errorPassword
            };
            let formData = {
                password: currentPassword,
                newPassword: newPassword,
                confirmNewPassword: confirmNewPassword
            };
            res.render('portal/settings/password', {
                user: req.user,
                currentURL: url,
                settingsURL: settingsURL,
                formData: formData,
                errors: err
            });
        }
    }
    else {
        // return user to login page
        res.redirect('/login')
    }
}

exports.getSettingsDeleteAccount = function (req, res, next) {

    let url = decodeURI(req.originalUrl);
    let startIndex = url.search("/settings");
    let settingsURL = url.substring(0, startIndex + 9);

    if (req.user !== undefined) {
        res.render('portal/settings/deleteAccount', {
            user: req.user,
            currentURL: url,
            settingsURL: settingsURL
        });
    }
    else {
        // return user to login page
        res.redirect('/login')
    }
}

exports.updateSettingsDeleteAccount = function (req, res, next) {

    let url = decodeURI(req.originalUrl);
    let startIndex = url.search("/settings");
    let settingsURL = url.substring(0, startIndex + 9);

    if (req.user !== undefined) {

        // get the information 
        let currentPassword = req.body.currentPassword;
        
        // compare sent password with hashed password 
        if (bycrypt.compareSync(currentPassword, req.user.password)) {

            let message = "Successfully deleted account!";

            // send confirmation information 

            let success = {
                message: message
            };

            // get the all of the file id's 
            // for all of the courses 

            let user = req.user;

            let fileIDs = new Array();

            // iterate though courses
            Object.entries(user.courses).forEach(entry => {
                let key = entry[0];
                let value = entry[1];
                //use key and value here

                if (value.syllabus.fileID !== undefined) {
                    // get syllabus file
                    fileIDs.push(value.syllabus.fileID);
                }
                
                if (value.schedule.fileID !== undefined) {
                    // get schedule file 
                    fileIDs.push(value.schedule.fileID);
                }

                // iterate through assignments 
                Object.entries(value.assignments).forEach(entry => {
                    let key = entry[0];
                    let value = entry[1];
                    //use key and value here
                    let fileID = value.fileID;
                    fileIDs.push(fileID);
                });
                
                // iterate through lectureNotes 
                Object.entries(value.lectureNotes).forEach(entry => {
                    let key = entry[0];
                    let value = entry[1];
                    //use key and value here
                    let fileID = value.fileID;
                    fileIDs.push(fileID);
                });

                // iterate through classNotes 
                Object.entries(value.classNotes).forEach(entry => {
                    let key = entry[0];
                    let value = entry[1];
                    //use key and value here
                    let fileID = value.fileID;
                    fileIDs.push(fileID);
                });

                // iterate through otherNotes 
                Object.entries(value.otherNotes).forEach(entry => {
                    let key = entry[0];
                    let value = entry[1];
                    //use key and value here
                    let fileID = value.fileID;
                    fileIDs.push(fileID);
                });
               
            });

            // remove the files 

            var gfs = Grid(conn.db);

            for (index = 0; index < fileIDs.length; index++) { 
                let fileID = fileIDs[index];
                gfs.remove({_id: fileID}, (err, file) => {
    
                    if (err || !file) {
                        // res.status(404).send('File Not Found');
                        console.log("file does not exist");
                    }
                    
                });
            } 

            // delete the user by finding them by their password
            mongodb.deleteUser(req.user.password).then(function (result) {
                res.render('portal/settings/confirmDeletedAccount', {
                    user: req.user,
                    currentURL: url,
                    settingsURL: settingsURL,
                    success: success
                });
            });

        } else {

            // resend whatever information back
            // send back an error message 
            let message = "Your entered current password was incorrect";
            let errorCurrentPassword = "Current password is incorrect";

            let err = {
                message: message,
                currentPassword: errorCurrentPassword
            };

            let formData = {
                password: currentPassword
            };

            res.render('portal/settings/deleteAccount', {
                user: req.user,
                currentURL: url,
                settingsURL: settingsURL,
                formData: formData,
                errors: err
            });
        }
        
    }
    else {
        // return user to login page
        res.redirect('/login')
    }
}

exports.getSettingsArchiveCourse = function (req, res, next) {

    let url = decodeURI(req.originalUrl);
    let startIndex = url.search("/settings");
    let settingsURL = url.substring(0, startIndex + 9);

    if (req.user !== undefined) {
        res.render('portal/settings/archive', {
            user: req.user,
            currentURL: url,
            settingsURL: settingsURL
        });
    }
    else {
        // return user to login page
        res.redirect('/login')
    }
}