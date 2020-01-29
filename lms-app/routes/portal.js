var express = require('express');
var router = express.Router();

let portal = require('../controllers/portal');
let settings = require('../controllers/settings/settings')

let files = require('../controllers/files');

// portal home
router.get('/:teacherUsername/', portal.getHome);

// portal settings
router.get('/:teacherUsername/settings/account', settings.getSettings);
router.get('/:teacherUsername/settings/email', settings.getSettingsEmail);
router.get('/:teacherUsername/settings/semester', settings.getSettingsSemester);
router.get('/:teacherUsername/settings/password', settings.getSettingsPassword);
//router.get('/:teacherUsername/settings/archiveCourses', portal.getSettingsArchiveCourse);
//router.get('/:teacherUsername/settings/viewArchieve', portal.getSettingsViewArchive);
router.get('/:teacherUsername/settings/deleteAccount', settings.getSettingsDeleteAccount);
router.get('/:teacherUsername/settings/confirmDeleteAccount', settings.getSettingsDeleteAccount);

// portal settings update info
router.post('/:teacherUsername/settings/update/email', settings.updateSettingsEmail);
router.post('/:teacherUsername/settings/update/semester', settings.updateSettingsSemester);
router.post('/:teacherUsername/settings/update/password', settings.updateSettingsPassword);
//router.post('/:teacherUsername/settings/update/archiveCourses', portal.updateSettingsArchiveCourse);
//router.post('/:teacherUsername/settings/update/viewArchieve', portal.updateSettingsViewArchive);
router.post('/:teacherUsername/settings/update/deleteAccount', settings.updateSettingsDeleteAccount);

router.get('/:teacherUsername/settings/update/email', settings.getSettingsEmail);
router.get('/:teacherUsername/settings/update/semester', settings.getSettingsSemester);
router.get('/:teacherUsername/settings/update/password', settings.updateSettingsPassword);
//router.post('/:teacherUsername/settings/update/archiveCourses', portal.updateSettingsArchiveCourse);
//router.post('/:teacherUsername/settings/update/viewArchieve', portal.updateSettingsViewArchive);
router.get('/:teacherUsername/settings/update/deleteAccount', settings.getSettingsDeleteAccount);

// course info
router.get('/:teacherUsername/course/:course', portal.getCourse);
router.get('/:teacherUsername/course/:course/syllabus', portal.getSyllabus);
router.get('/:teacherUsername/course/:course/schedule', portal.getSchedule);
router.get('/:teacherUsername/course/:course/assignments', portal.getAssignments);
router.get('/:teacherUsername/course/:course/lectureNotes', portal.getLectureNotes);
router.get('/:teacherUsername/course/:course/classNotes', portal.getClassNotes);
router.get('/:teacherUsername/course/:course/otherNotes', portal.getOtherNotes);

// file retrieval 
router.get('/:teacherUsername/course/:course/syllabus/id/:id/files/:filename', files.getFile);
router.get('/:teacherUsername/course/:course/schedule/id/:id/files/:filename', files.getFile);
router.get('/:teacherUsername/course/:course/assignments/id/:id/files/:filename', files.getFile);
router.get('/:teacherUsername/course/:course/lectureNotes/id/:id/files/:filename', files.getFile);
router.get('/:teacherUsername/course/:course/classNotes/id/:id/files/:filename', files.getFile);
router.get('/:teacherUsername/course/:course/otherNotes/id/:id/files/:filename', files.getFile);

// settings
router.get('/:teacherUsername/settings');

module.exports = router;