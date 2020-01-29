let bycrypt = require('bcrypt');
const passport = require('passport');
const myPassport = require('../passport_setup')(passport);
// flash allows us to display an error message that is going to be rendered
// 1 time message 

let flash = require('connect-flash');

var formidable = require('formidable');

var path = require("path");

var Grid = require("gridfs-stream");

var mongoose = require('mongoose');

var conn = mongoose.connection;

Grid.mongo = mongoose.mongo;

var fs = require('fs-extra');

const Teacher = require('../db/models/teacher');

let mongodb = require('../db/mongodb');

exports.show_login = function(req, res, next) {
	if (req.user !== undefined) {
		res.render('user/login', { 
			formData: {}, 
			errors: {},
			user: req.user
		});
	}
	else {
		res.render('user/login', { 
			formData: {}, 
			errors: {},
		});
	}
}

exports.show_signup = function(req, res, next) {
	if (req.user !== undefined) {
		res.render('user/signup', { 
			formData: {}, 
			errors: {},
			user: req.user
		});
	}
	else {
		res.render('user/signup', { 
			formData: {}, 
			errors: {} 
		});
	}
}

const generateHash = function(password) {
	return bycrypt.hashSync(password, bycrypt.genSaltSync(8, "a"), null);
}

exports.signup = function(req, res, next) {

	// validate incomming form data 

	// if it is wrong

	// redirect to the page again and 
	// pass in the appropriate error information 

	// then save user to database 

	let username = req.body.username;

	let email = req.body.email;

	let password = req.body.password;

	let confirmPassword = req.body.confirmPassword;
	
	let firstName = req.body.firstName;

	let lastName = req.body.lastName;

	let semester = req.body.semester;

	let year = req.body.year;

	validateSignup(username, email, password, confirmPassword, 
		firstName, lastName, semester, year).then((validTeacher) => {

		// validation successfull 
		// check for username in database

		// check against the database to see if it exist already 
		mongodb.findTeacherByUsername(username).then(function (teacher) {

			// returns null if teacher does not exist

			if (teacher===null) {
				
				// inputed username does not exist
				// add to database

				validTeacher.save().then(function (result) {
					passport.authenticate('local', {
						successRedirect: "/portal/" + result.username,
						failureRedirect: "/signup",
						failureFlash: true
					})(req, res, next);
				});

			} else {

				// username exist already 
				// send username taken error
				// and form data back

				errorUsername = "Username is already taken. Please use a different username";

				let err = {
					username: errorUsername
				}

				let formData = {
					username: username,
					password: password,
					confirmPassword: confirmPassword,
					email: email,
					firstName: firstName,
					lastName: lastName,
					semester: semester,
					year: year
				}
		
				res.render('user/signup', {
					errors: err,
					formData: formData
				});
				
			}

		});

	}).catch((err) => {

		// validation falied
		// redirect back 

		// send any submited form data back also

		let formData = {
			username: username,
			password: password,
			confirmPassword: confirmPassword,
			email: email,
			firstName: firstName,
			lastName: lastName,
			semester: semester,
			year: year
		}

		res.render('user/signup', {
			errors: err,
			formData: formData
		});

	});
}

function validateSignup(username, email, password, confirmedPassword, firstName, lastName, semester, year) {

	return new Promise((resolve, reject) => {

		let usernameStartWith = /[a-zA-Z\d]/;
		let usernameRegex = /[a-zA-Z\d][a-zA-Z0-9_]{3,10}$/;
		let emailRegex = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;

		let passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,50})/;

		let firstNameRegex = /^[a-z | A-Z | \. | -]+$/;
    	let last_regex = /^[a-z | A-Z | \. | -]+$/;

		var errorUsername = "";
		var errorPassword = "";
		var errorConfirmPassword = "";
		var errorEmail = "";
		var errorFirstName = "";
		var errorLastName = "";
		var errorSemester = "";
		var errorYear = "";

		var currentYear = new Date().getFullYear();
    	let nextYear = (currentYear + 1).toString();
    	currentYear = currentYear.toString();


		if (!(usernameStartWith.test(username))) {
    	    errorUsername = "Username does not start with letter or digit";
    	} else if (!(usernameRegex.test(username))) {
    	    errorUsername = "Username needs to only include letters, digit, or underscore";
		}
	
    	if (!(emailRegex.test(email))) {
    	    errorEmail = "Please enter a valid email";
		}

    	if (!(passwordRegex.test(password))) {
    	    errorPassword = "Password invalid. Must contain 1 lower, 1 upper, 1 digit, 1 special character and must be at least 6 characters long";
		}

    	if (password !== confirmedPassword) {
    	    errorConfirmPassword = "Password and confirmed password does not match";
		} else if (confirmedPassword === "") {
			errorConfirmPassword = "Please confirm a valid password"
		}

    	if (!(firstNameRegex.test(firstName))) {
			errorFirstName = "Please only use letters and dashes for first name";
		}

    	if (!(last_regex.test(lastName))) {
			errorLastName = "Please only use letters and dashes for last name";
		}

		if (!(semester === "Fall" || semester === "Spring" || semester === "Full-Year")) {
			errorSemester = "Please choose between 'Fall', 'Spring', or 'Full-Year'";
		}

		if (!(year === currentYear || year === nextYear)) {
			errorYear = "Please pick between " + currentYear + " or " + nextYear;
		}

		if (errorUsername === "" && 
			errorPassword === "" &&
			errorConfirmPassword === "" &&
			errorEmail === "" && 
			errorFirstName === "" &&
			errorLastName === "" && 
			errorSemester === "" &&
			errorYear === "") {

			// no errors
			// create a hashed password
			// create a teacher object
			// to add to the database

			let hashedPassword = generateHash(password);

			let teacher = new Teacher.model({
				username: username,
				password: hashedPassword,
				email: email,
				firstName: firstName,
				lastName: lastName,
				semester: semester,
				year: year
			});

			// if form is okay
			resolve(teacher);

		} else {

			// we have an error 
			// redirect back to submit form

			let err = {
				username: errorUsername,
				password: errorPassword,
				confirmPassword: errorConfirmPassword,
				email: errorEmail,
				firstName: errorFirstName,
				lastName: errorLastName,
				semester: errorSemester,
				year: errorYear
			};

			// if form not okay
			reject(err);

		}

	});
}

exports.login = function(req, res, next) {

	/*
	passport.authenticate('local', {
		successRedirect: "/portal/" + req.body.username,
		failureRedirect: "/login",
		failureFlash: true
	})(req, res, next);
	*/
	
	// custom callback
	passport.authenticate('local', function(err, user, info) {
		if (err) {
			return next(err); 
		} else {
			if (!user) {
				// return form 
				// data used 
				if (info != null) {
					let formData = info.formData;
					let errors = info.errors;
					return res.render('user/login', {
						formData: formData,
						errors: errors
					});
				} else {
					return res.render('user/login');
				}
			} else {
				req.logIn(user, function(err) {
					return res.redirect('/portal/' + user.username);
				});
			}
		}
	})(req, res, next);
}

exports.logout = function(req, res, next) {
	req.logout();
	req.session.destroy();
	res.redirect('/');
}


exports.addCourse = function(req, res, next) {

	if (req.user !== undefined) {

		let username = req.user.username;

		let course = req.body.course;

		let courseFullName = req.body.courseFullName;

		mongodb.addCourse(username, course, courseFullName).then(function(result) {

			res.redirect('/portal/' + req.user.username)

		});

	} else {

		// return user to login page
		res.redirect('/login')

	}

}

exports.addSyllabus = function(req, res, next) {

	if (req.user !== undefined) {

		// let username = req.user.username;

    	var form = new formidable.IncomingForm();
    	form.parse(req, function (err, fields, files) {

			/*
    		for (const file of Object.entries(files)) {
    		  console.log(file)
    		}
			*/

			var filename = files.uploadfile.name;

			let course = fields.course;

			// create a timestamp for when it was uploaded
			let uploadDate = new Date().toLocaleDateString();

			var filename = files.uploadfile.name;
			var oldPath = files.uploadfile.path;

			var newPath = path.join(__dirname, '../temp/' + filename);

			// move the file to the temp folder 
			moveUploadedFileToTempFolder(oldPath, newPath).then((filePath) => {

				// we know the file exist in the new path 
				// from that path, make a write stream to upload
				// the file to the database

				writeFileToDatabase(filePath, filename).then((fileID) => {

					console.log("write stream finished. Remove file from temp folder");

					// try to remove the file that was uploaded to the system 
					// we only want it stored in the database
					try {
						
						fs.unlinkSync(filePath);
						console.log("file removed from temp directory");

						// we now add the data
						mongodb.addSyllabus(course, fileID, filename, uploadDate).then(function() {
							// redirect to the page where the form was filled
							res.redirect(req.get('referer'));
						});

					  } catch(err) {

						// file removal error
					  	console.error("File removal error: " + err);
					  	res.status(505).send('Internal Server Error');

					  }

				}).catch((err) => {

					// write stream catch error 
					console.log("write stream catch error" + err);
					res.status(505).send('Internal Server Error');

				});

			}).catch((err) => {

				// error while moving uploaded file to temp folder 
				console.log("renamed file catch error: " + err);
				res.status(505).send('Internal Server Error');

			});
      		
		});

	} else {

		// return user to login page
		res.redirect('/login')

	}

}

exports.updateSyllabus = function(req, res, next) {

	if (req.user !== undefined) {

		// add the new syllabus 

		// let username = req.user.username;

    	var form = new formidable.IncomingForm();
    	form.parse(req, function (err, fields, files) {

			/*
    		for (const file of Object.entries(files)) {
    		  console.log(file)
    		}
			*/

			// remove old syllabus 

			var gfs = Grid(conn.db);

			let oldSyllabusFileID = fields.syllabusFileID;
			
    		gfs.remove({_id: oldSyllabusFileID}, (err, file) => {

    		    if (err || !file) {
					// res.status(404).send('File Not Found');
					console.log("file does not exist");
				}

			});

			// add new syllabus 

			var filename = files.uploadfile.name;

			let course = fields.course;

			// create a timestamp for when it was uploaded
			let uploadDate = new Date().toLocaleDateString(); 

			var filename = files.uploadfile.name;
			var oldPath = files.uploadfile.path;

			var newPath = path.join(__dirname, '../temp/' + filename);

			// move the file to the temp folder 
			moveUploadedFileToTempFolder(oldPath, newPath).then((filePath) => {

				// we know the file exist in the new path 
				// from that path, make a write stream to upload
				// the file to the database

				writeFileToDatabase(filePath, filename).then((fileID) => {

					console.log("write stream finished. Remove file from temp folder");

					// try to remove the file that was uploaded to the system 
					// we only want it stored in the database
					try {
						
						fs.unlinkSync(filePath);
						console.log("file removed from temp directory");

						// we now add the data
						mongodb.addSyllabus(course, fileID, filename, uploadDate).then(function() {
							// redirect to the page where the form was filled
							res.redirect(req.get('referer'));
						});

					  } catch(err) {

						// file removal error
					  	console.error("File removal error: " + err);
					  	res.status(505).send('Internal Server Error');

					  }

				}).catch((err) => {

					// write stream catch error 
					console.log("write stream catch error" + err);
					res.status(505).send('Internal Server Error');

				});

			}).catch((err) => {

				// error while moving uploaded file to temp folder 
				console.log("renamed file catch error: " + err);
				res.status(505).send('Internal Server Error');

			});
			
		});

	} else {

		// return user to login page
		res.redirect('/login')

	}

}


exports.addSchedule = function(req, res, next) {

	if (req.user !== undefined) {

		// let username = req.user.username;

    	var form = new formidable.IncomingForm();
    	form.parse(req, function (err, fields, files) {

			/*
    		for (const file of Object.entries(files)) {
    		  console.log(file)
    		}
			*/

			var filename = files.uploadfile.name;

			let course = fields.course;

			// create a timestamp for when it was uploaded
			let uploadDate = new Date().toLocaleDateString();

			var filename = files.uploadfile.name;
			var oldPath = files.uploadfile.path;

			var newPath = path.join(__dirname, '../temp/' + filename);

			// move the file to the temp folder 
			moveUploadedFileToTempFolder(oldPath, newPath).then((filePath) => {

				// we know the file exist in the new path 
				// from that path, make a write stream to upload
				// the file to the database

				writeFileToDatabase(filePath, filename).then((fileID) => {

					console.log("write stream finished. Remove file from temp folder");

					// try to remove the file that was uploaded to the system 
					// we only want it stored in the database
					try {
						
						fs.unlinkSync(filePath);
						console.log("file removed from temp directory");

						// we now add the data
						mongodb.addSchedule(course, fileID, filename, uploadDate).then(function() {
							// redirect to the page where the form was filled
							res.redirect(req.get('referer'));
						});

					  } catch(err) {

						// file removal error
					  	console.error("File removal error: " + err);
					  	res.status(505).send('Internal Server Error');

					  }

				}).catch((err) => {

					// write stream catch error 
					console.log("write stream catch error" + err);
					res.status(505).send('Internal Server Error');

				});

			}).catch((err) => {

				// error while moving uploaded file to temp folder 
				console.log("renamed file catch error: " + err);
				res.status(505).send('Internal Server Error');

			});
      		
		});

	} else {

		// return user to login page
		res.redirect('/login')

	}

}

exports.updateSchedule = function(req, res, next) {

	if (req.user !== undefined) {

		// add the new Schedule 

		// let username = req.user.username;

    	var form = new formidable.IncomingForm();
    	form.parse(req, function (err, fields, files) {

			/*
    		for (const file of Object.entries(files)) {
    		  console.log(file)
    		}
			*/

			// remove old Schedule 

			var gfs = Grid(conn.db);

			let oldScheduleFileID = fields.scheduleFileID;
			
    		gfs.remove({_id: oldScheduleFileID}, (err, file) => {

    		    if (err || !file) {
					// res.status(404).send('File Not Found');
					console.log("file does not exist");
				}

			});

			// add new Schedule 

			var filename = files.uploadfile.name;

			let course = fields.course;

			// create a timestamp for when it was uploaded
			let uploadDate = new Date().toLocaleDateString(); 

			var filename = files.uploadfile.name;
			var oldPath = files.uploadfile.path;

			var newPath = path.join(__dirname, '../temp/' + filename);

			// move the file to the temp folder 
			moveUploadedFileToTempFolder(oldPath, newPath).then((filePath) => {

				// we know the file exist in the new path 
				// from that path, make a write stream to upload
				// the file to the database

				writeFileToDatabase(filePath, filename).then((fileID) => {

					console.log("write stream finished. Remove file from temp folder");

					// try to remove the file that was uploaded to the system 
					// we only want it stored in the database
					try {
						
						fs.unlinkSync(filePath);
						console.log("file removed from temp directory");

						// we now add the data
						mongodb.addSchedule(course, fileID, filename, uploadDate).then(function() {
							// redirect to the page where the form was filled
							res.redirect(req.get('referer'));
						});

					  } catch(err) {

						// file removal error
					  	console.error("File removal error: " + err);
					  	res.status(505).send('Internal Server Error');

					  }

				}).catch((err) => {

					// write stream catch error 
					console.log("write stream catch error" + err);
					res.status(505).send('Internal Server Error');

				});

			}).catch((err) => {

				// error while moving uploaded file to temp folder 
				console.log("renamed file catch error: " + err);
				res.status(505).send('Internal Server Error');

			});
      		
		});

	} else {

		// return user to login page
		res.redirect('/login')

	}

}

exports.addAssignment = function(req, res, next) {

	if (req.user !== undefined) {

		// let username = req.user.username;

    	var form = new formidable.IncomingForm();
    	form.parse(req, function (err, fields, files) {

			/*
    		for (const file of Object.entries(files)) {
    		  console.log(file)
    		}
			*/

			var filename = files.uploadfile.name;

			let course = fields.course;

			let assignmentName = fields.name;

			let dueDate = fields.date;

			var filename = files.uploadfile.name;
			var oldPath = files.uploadfile.path;

			var newPath = path.join(__dirname, '../temp/' + filename);

			// move the file to the temp folder 
			moveUploadedFileToTempFolder(oldPath, newPath).then((filePath) => {

				// we know the file exist in the new path 
				// from that path, make a write stream to upload
				// the file to the database

				writeFileToDatabase(filePath, filename).then((fileID) => {

					console.log("write stream finished. Remove file from temp folder");

					// try to remove the file that was uploaded to the system 
					// we only want it stored in the database
					try {
						
						fs.unlinkSync(filePath);
						console.log("file removed from temp directory");

						// we now add the data 
						mongodb.addAssignment(course, fileID, assignmentName, filename, dueDate).then(function() {
							// redirect to the page where the form was filled
							res.redirect(req.get('referer'));
						});

					  } catch(err) {

						// file removal error
					  	console.error("File removal error: " + err);
					  	res.status(505).send('Internal Server Error');

					  }

				}).catch((err) => {

					// write stream catch error 
					console.log("write stream catch error" + err);
					res.status(505).send('Internal Server Error');

				});

			}).catch((err) => {

				// error while moving uploaded file to temp folder 
				console.log("renamed file catch error: " + err);
				res.status(505).send('Internal Server Error');

			});
      		
		});

	} else {

		// return user to login page
		res.redirect('/login')

	}

}

exports.removeAssignment = function(req, res, next) {

	if (req.user !== undefined) {

		let course = req.body.course;

		let assignmentID = req.body.assignmentID;

		let assignmentFileID = req.body.assignmentFileID;

		var gfs = Grid(conn.db);
		
    	gfs.remove({_id: assignmentFileID}, (err, file) => {

    	    if (err || !file) {
				// res.status(404).send('File Not Found');
				console.log("file does not exist");
			}
			
		});

		mongodb.removeAssignment(course, assignmentID).then(function() {

			res.redirect(req.get('referer'));

		});

	} else {

		// return user to login page
		res.redirect('/login')

	}

}

exports.addLectureNote = function(req, res, next) {

	if (req.user !== undefined) {

		// let username = req.user.username;

    	var form = new formidable.IncomingForm();
    	form.parse(req, function (err, fields, files) {

			/*
    		for (const file of Object.entries(files)) {
    		  console.log(file)
    		}
			*/

			var filename = files.uploadfile.name;

			let course = fields.course;

			// let courseFullName = fields.courseFullName;

			let lectureNoteName = fields.name;

			let lectureDate = fields.date;

			var filename = files.uploadfile.name;
			var oldPath = files.uploadfile.path;

			var newPath = path.join(__dirname, '../temp/' + filename);

			// move the file to the temp folder 
			moveUploadedFileToTempFolder(oldPath, newPath).then((filePath) => {

				// we know the file exist in the new path 
				// from that path, make a write stream to upload
				// the file to the database

				writeFileToDatabase(filePath, filename).then((fileID) => {

					console.log("write stream finished. Remove file from temp folder");

					// try to remove the file that was uploaded to the system 
					// we only want it stored in the database
					try {
						
						fs.unlinkSync(filePath);
						console.log("file removed from temp directory");

						// we now add the data 
						mongodb.addLectureNote(course, fileID, lectureNoteName, filename, lectureDate).then(function() {
							// redirect to the page where the form was filled
							res.redirect(req.get('referer'));
						});

					  } catch(err) {

						// file removal error
					  	console.error("File removal error: " + err);
					  	res.status(505).send('Internal Server Error');

					  }

				}).catch((err) => {

					// write stream catch error 
					console.log("write stream catch error" + err);
					res.status(505).send('Internal Server Error');

				});

			}).catch((err) => {

				// error while moving uploaded file to temp folder 
				console.log("renamed file catch error: " + err);
				res.status(505).send('Internal Server Error');

			});
      		
		});

	} else {

		// return user to login page
		res.redirect('/login')

	}

}

exports.removeLectureNote = function(req, res, next) {

	if (req.user !== undefined) {

		let course = req.body.course;

		let lectureNoteID = req.body.lectureNoteID;

		let lectureNoteFileID = req.body.lectureNoteFileID;

		var gfs = Grid(conn.db);
		
    	gfs.remove({_id: lectureNoteFileID}, (err, file) => {

    	    if (err || !file) {
				// res.status(404).send('File Not Found');
				console.log("file does not exist");
			}
			
		});

		mongodb.removeLectureNote(course, lectureNoteID).then(function() {

			res.redirect(req.get('referer'));

		});

	} else {

		// return user to login page
		res.redirect('/login')

	}

}

exports.addClassNote = function(req, res, next) {

	if (req.user !== undefined) {

		// let username = req.user.username;

    	var form = new formidable.IncomingForm();
    	form.parse(req, function (err, fields, files) {

			/*
    		for (const file of Object.entries(files)) {
    		  console.log(file)
    		}
			*/

			var filename = files.uploadfile.name;

			let course = fields.course;

			let classNoteName = fields.name;

			let classDate = fields.date;

			var filename = files.uploadfile.name;
			var oldPath = files.uploadfile.path;

			var newPath = path.join(__dirname, '../temp/' + filename);

			// move the file to the temp folder 
			moveUploadedFileToTempFolder(oldPath, newPath).then((filePath) => {

				// we know the file exist in the new path 
				// from that path, make a write stream to upload
				// the file to the database

				writeFileToDatabase(filePath, filename).then((fileID) => {

					console.log("write stream finished. Remove file from temp folder");

					// try to remove the file that was uploaded to the system 
					// we only want it stored in the database
					try {
						
						fs.unlinkSync(filePath);
						console.log("file removed from temp directory");

						// we now add the data
						mongodb.addClassNote(course, fileID, classNoteName, filename, classDate).then(function() {
							// redirect to the page where the form was filled
							res.redirect(req.get('referer'));
						});

					  } catch(err) {

						// file removal error
					  	console.error("File removal error: " + err);
					  	res.status(505).send('Internal Server Error');

					  }

				}).catch((err) => {

					// write stream catch error 
					console.log("write stream catch error" + err);
					res.status(505).send('Internal Server Error');

				});

			}).catch((err) => {

				// error while moving uploaded file to temp folder 
				console.log("renamed file catch error: " + err);
				res.status(505).send('Internal Server Error');

			});

		});

	} else {

		// return user to login page
		res.redirect('/login')

	}

}

exports.removeClassNote = function(req, res, next) {

	if (req.user !== undefined) {

		let course = req.body.course;

		let classNoteID = req.body.classNoteID;

		let classNoteFileID = req.body.classNoteFileID;

		var gfs = Grid(conn.db);
		
    	gfs.remove({_id: classNoteFileID}, (err, file) => {

    	    if (err || !file) {
				// res.status(404).send('File Not Found');
				console.log("file does not exist");
			}
			
		});

		mongodb.removeClassNote(course, classNoteID).then(function() {
			res.redirect(req.get('referer'));
		});

	} else {

		// return user to login page
		res.redirect('/login')

	}

}

exports.addOtherNote = function(req, res, next) {

	if (req.user !== undefined) {

		// let username = req.user.username;

    	var form = new formidable.IncomingForm();
    	form.parse(req, function (err, fields, files) {

			/*
    		for (const file of Object.entries(files)) {
    		  console.log(file)
    		}
			*/

			var filename = files.uploadfile.name;

			let course = fields.course;

			let otherNoteName = fields.name;

			let otherDate = fields.date;

			var filename = files.uploadfile.name;
			var oldPath = files.uploadfile.path;

			var newPath = path.join(__dirname, '../temp/' + filename);

			// move the file to the temp folder 
			moveUploadedFileToTempFolder(oldPath, newPath).then((filePath) => {

				// we know the file exist in the new path 
				// from that path, make a write stream to upload
				// the file to the database

				writeFileToDatabase(filePath, filename).then((fileID) => {

					console.log("write stream finished. Remove file from temp folder");

					// try to remove the file that was uploaded to the system 
					// we only want it stored in the database
					try {
						
						fs.unlinkSync(filePath);
						console.log("file removed from temp directory");

						// we now add the data
						mongodb.addOtherNote(course, fileID, otherNoteName, filename, otherDate).then(function() {
							// redirect to the page where the form was filled
							res.redirect(req.get('referer'));
						});

					  } catch(err) {

						// file removal error
					  	console.error("File removal error: " + err);
					  	res.status(505).send('Internal Server Error');

					  }

				}).catch((err) => {

					// write stream catch error 
					console.log("write stream catch error" + err);
					res.status(505).send('Internal Server Error');

				});

			}).catch((err) => {

				// error while moving uploaded file to temp folder 
				console.log("renamed file catch error: " + err);
				res.status(505).send('Internal Server Error');

			});
      		
		});

	} else {

		// return user to login page
		res.redirect('/login')

	}

}

exports.removeOtherNote = function(req, res, next) {

	if (req.user !== undefined) {

		let course = req.body.course;

		let otherNoteID = req.body.otherNoteID;

		let otherNoteFileID = req.body.otherNoteFileID;

		var gfs = Grid(conn.db);
		
    	gfs.remove({_id: otherNoteFileID}, (err, file) => {

    	    if (err || !file) {
				// res.status(404).send('File Not Found');
				console.log("file does not exist");
			}
			
		});

		mongodb.removeOtherNote(course, otherNoteID).then(function() {
			res.redirect(req.get('referer'));
		});

	} else {

		// return user to login page
		res.redirect('/login')

	}

}


// Promise Functions 

function moveUploadedFileToTempFolder(oldPath, newPath) {

	return new Promise((resolve, reject) => {

		// move file from the default stored path for submitted forms
		// to a path that node.js can access 
		fs.rename(oldPath, newPath, function (err) {
			
			if (err != null) {
				console.log("File rename error: " + err);
				reject(err);
			}

			console.log("File moved to " + newPath);
			resolve(newPath);
		});

	});

}

function writeFileToDatabase(filePath, filename) {

	return new Promise((resolve, reject) => {

		var gfs = Grid(conn.db);

		var writeStream = gfs.createWriteStream({
			filename: filename
		});

		let fileID = writeStream.id;
	
		// call this after full filling promise of renaming 
		fs.createReadStream(filePath).pipe(writeStream);
	
		// write the file to mongoDB using gridFS

		// on 'error' is called when there is a error
		writeStream.on('error', function(err) {
			if (err != null) {
				console.log("Writestream error: " + err);
				reject(err);
			}
		});

		// on finish is when file is finished writing
		writeStream.on('finish', function() {
			console.log("Writestream succcess");
			resolve(fileID);
		});

	});

}