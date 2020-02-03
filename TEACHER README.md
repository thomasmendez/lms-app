# lms-app 

This web application is intented to simplify the creation of teacher websites for a school in order to increase productivity in teaching and learning for both the teacher and the students. This application can hold information for all the teachers for a school and documents that students would need in order to succeed in the course. 

A teacher can create a account with multiple courses (classes). In each course, a teacher can upload the following files relevant for the course: 

* Syllabus
* Schedule
* Assignments
* Lecture Notes 
* Class Notes
* Other Files (Field Trip Forms, Photo Consent Forms, etc)

This web application can be setup in a school with the assistance of a DevOps developer. 

## Creating a Account (Signup)

In order to create an account, a teacher would go to the signup page and fill out the following information: 

* Username
* Password
* Email
* First Name
* Last Name
* Semester
* Year 

![Create Account Image](https://github.com/thomasmendez/lms-app/blob/master/markdown/images/Signup.png)

### Login

A returning user can login and access their account by providing their username and password. 

### Creating A Course

After creating a teacher account, the teacher is able to create courses by clicking on the '+' button and providing the following: 

* Course (with course number) 
* Full Course Name

The teacher can then click the 'add course button' and the teacher will see that the course was added to their homepage. They can then click on it to access and update information for the course. The course will also be publicly available for guest to view (ideally students and parents). 

If a teacher happens to teach multiple courses, they can just click on the '+' button again and add more courses if needed. A guest will be able to see all of the courses that the teacher teaches in their homepage. 

![Create Course Image](https://github.com/thomasmendez/lms-app/blob/master/markdown/images/CreateClass.png)

### Managing a Course

After creating a course, the teacher can upload and update relevant files for the course. The maximum file size that a teacher can upload a file to the database is 16MB. The database can store multiple filetypes such as PDFs (recommended), Microsoft PowerPoint, Images, etc. 

#### Syllabus (Upload / Update)

1. Make sure you are logged in

2. Navigate to the course's syllabus page. (Your homepage -> Course -> Syllabus)

3. Click on the '+' button

4. Click on the 'Choose File' button and choose a file to upload (PDF recommended)

5. Click on the 'add syllabus' to add the syllabus to the course

6. You can click on the newly created link in order to view the file that the students will see when they click on the 'Syllabus' link for the course page 

*Note: If the syllabus ever needs to be updated, click the 'update' button and upload a new syllabus file to replace the old one. The date in which it was uploaded will be shown for personal reference.*

![Add Syllabus Image](https://github.com/thomasmendez/lms-app/blob/master/markdown/images/Syllabus.png)

#### Schedule (Upload / Update)

1. Make sure you are logged in

2. Navigate to the course's schedule page. (Your homepage -> Course -> Schedule)

3. Click on the '+' button

4. Click on the 'Choose File' button and choose a file to upload (PDF recommended)

5. Click on the 'add schedule' to add the Schedule to the course

6. You can click on the newly created link in order to view the file that the students will see when they click on the 'Schedule' link for the course page 

*Note: If the schedule ever needs to be updated, click the 'update' button and upload a new schedule file to replace the old one. The date in which it was uploaded will be shown for personal reference.*

![Add Schedule Image](https://github.com/thomasmendez/lms-app/blob/master/markdown/images/Schedule.png)

#### Assignments (Upload / Delete)

1. Make sure you are logged in

2. Navigate to the course's assignments page. (Your homepage -> Course -> Assignments)

3. Click on the '+' button

4. Give a name for the assignment

5. Add a due date for the assignment 

6. Click on the 'Choose File' button and choose a file to upload (PDF recommended)

5. Click on the 'add assignments' to add the assignments to the course

6. You can click on the newly created link in order to view the file that the students will see when they click on the 'assignments' link for the course page 

*Note: Currently the assignment cannot be updated, but can be deleted and a new assignment can be added again.*

![Add Assignments Image](https://github.com/thomasmendez/lms-app/blob/master/markdown/images/Assignments.png)

#### Lecture Notes (Upload / Delete)

1. Make sure you are logged in

2. Navigate to the course's lecture page. (Your homepage -> Course -> Lecture)

3. Click on the '+' button

4. Give a name for the lecture note

5. Add a due date for the lecture note 

6. Click on the 'Choose File' button and choose a file to upload (PDF recommended)

5. Click on the 'add lecture' to add the lecture to the course

6. You can click on the newly created link in order to view the file that the students will see when they click on the 'Lecture' link for the course page 

*Note: Currently the lecture note cannot be updated, but can be deleted and a new lecture note can be added again.*

![Add Lecture Image](https://github.com/thomasmendez/lms-app/blob/master/markdown/images/Lecture%20Notes.png)

#### Class Notes (Upload / Delete)

1. Make sure you are logged in

2. Navigate to the course's class notes page. (Your homepage -> Course -> Class Notes)

3. Click on the '+' button

4. Give a name for the class note

5. Add a due date for the class note 

6. Click on the 'Choose File' button and choose a file to upload (PDF recommended)

5. Click on the 'add class note' to add the class notes to the course

6. You can click on the newly created link in order to view the file that the students will see when they click on the 'Class Notes' link for the course page 

*Note: Currently the class note cannot be updated, but can be deleted and a new class note can be added again.*

![Add Class Notes Image](https://github.com/thomasmendez/lms-app/blob/master/markdown/images/Class%20Notes.png)

#### Other Files (Upload / Delete)

1. Make sure you are logged in

2. Navigate to the course's other files page. (Your homepage -> Course -> Other Files)

3. Click on the '+' button

4. Give a name for the assignment

5. Add a due date for the assignment 

6. Click on the 'Choose File' button and choose a file to upload (PDF recommended)

5. Click on the 'add class note' to add the other files to the course

6. You can click on the newly created link in order to view the file that the students will see when they click on the 'Other Files' link for the course page 

*Note: Currently the uploaded file cannot be updated, but can be deleted and a new file can be added again.*

![Create Other Files Image](https://github.com/thomasmendez/lms-app/blob/master/markdown/images/Other%20Files.png)
