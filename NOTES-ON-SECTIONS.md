# About Sections in Canvas

Based on my reading, it seems that in Canvas, content lives in courses, while enrollment always lives in sections.

Even if there "is no section" created, when enrolling students, Canvas will create a default section with a null sis_id and a name that matches the course name.

(I think we want to):
- Automatically create sections for every course.
- If no sis_section_id exists for a section, we should correct that and assign correct section id.
- Make the section_id the same as the course_id.
- Eventually automate the crosslisting of courses. But, that's a problem for another day?


## RESOURCES

- https://community.canvaslms.com/thread/13135-sis-course-enroll-and-cross-listing
- https://community.canvaslms.com/thread/21457-enrolment-via-automated-sis-scriptcross-listing-issue-use-section-rather-than-course
- https://community.canvaslms.com/docs/DOC-12585-4214164118


## Note to Self
To get crosslisted enrollments working:

1. Instead of enrolling courses, you must enroll sections.

2. Get courseId and parentCourseId from jenzabar. Use that to create the sections csv file

course_id: parentCourseId
section_id: childCourseId (or courseId)

3. Try on beta. 

4. What happens when students are already enrolled in a section without an sisId? Hopefully it just updates their section, not tries to double enroll them or something.


## Experiments

## Enrolling a student with section_id, but section_id does not exist

```csv
"user_id","section_id","status","role"
"1262462","GWD-6610-20-F19","active","student"
```

Canvas does NOT try to use the course_id instead. Enrollment fails.

## Enrolling a student with section_id and course_id, where section_id does not exist, but course_id does

```csv
"user_id","course_id","section_id","status","role"
"1262462","GWD-6610-20-F19","GWD-6610-20-F19","active","student"
```

Student is enrolled in course:
- Does canvas create a section_id to match, or just put in the `null` section id with the other students?

Neither. Canvas only imports if BOTH section id and course id match.


### Adding a section

```csv
"section_id","course_id","name","status"
"GWD-6610-20-F19","GWD-6610-20-F19","GWD-6610-20-F19","active"
```

Worked great

### Enrolling a user
```csv
"user_id","section_id","status","role"
"1262462","GWD-6610-20-F19","active","student"
```

Worked great too.

### What happens if you enroll a user from another section within the same course?

e.g. 1265947 is in a default null section. What if I try to enroll her in the new GWD-6610-20-F19 section?

```csv
"user_id","section_id","status","role"
"1265947","GWD-6610-20-F19","active","student"
```

- The student is enrolled in BOTH sections: GWD-6610-20-F19 AND the default null section.
- In People, the instructor can see the student listead as enrolled in both.
- They only show up in the gradebook once, but it shows that they're both sections
- When impersonating the student, there doesn't see to be any affect. The calendar shows up only once. The grades looks as if she's only in one section. 

### What happens if the student submits work, and a grade is assigned? But then is removed from one of the sections?
That is, what if we attempt to move students from one section (null) to another after a course is in progress?

- Via the interface, there seems to be no effect. It's like a tag.

Removing via SIS Integration CSV

- Can't because there's no sis_section_id assigned

Can I assign the same sis_section_id to both sections?

- No. You'll get an error that section is already in use.


## Cross-listing

Cross-listing appears to just move a section into a different course?


## Assumptions for enrollment

- An Active Canvas Section is one which:
  - Is in a course with a sis_course_id set
  - Has a sis_section_id set
  - The course has a end_date in the future (or null) on Canvas
- Canvas is the source of truth for which courses and sections are active and will be offered on Canvas.
  - For every active course, 
- Jenzabar is the source of truth for:
  - which sections are children of an active parent course.
  - which students should be enrolled
  - which users (students AND faculty) need accounts.
- If a course is active on Canvas, these generators will:
  - Create sections CSVs for the parent section and any child sections (based on data in Jenzabar).
  - Create users CSVs for students or faculty who are teaching any parent or child sections.
  - Create enrollment add CSV to enroll students in their corresponding section.
  - Create enrollment drops CSV to drop students who do not belong in the corresponding section.

How to handle special cases:

Courses that aren't officially cross-listed in Jenzabar can still be sync, provided the correct sections are setup. For example, IDM-6611, 6612, 6613 are unofficial children of GWD-6610. To include these enrollments, setup a section with a sis_section_id.

## How to determine which courses are active:

1. Get a list of all courses in Canvas with an sis_course_id set. Note: Include sections using include[]=sections as this data will be used in other functions.
2. Filter list so that it contains only courses with a future or null end_date


## How to determine which sections should be created
1. Get a list of active courses in Canvas (see above).
2. For each active course, get a list of all the courses in Jenzabar which has a parent course id equal to an active course.
3. Also, for each active course, compile a list of sections which already exist in canvas.
4. Compare the Jenzabar Section list to the canvasSectionList. If a section is on the jenzabarList, but not on the canvasSectionList, create the section.


## How to determine which sections are active sections

1. Get a list of active courses.
2. for each course, get a list of sections with an sis_section_id set within it and add it to activeSectionList

## How to determine which users need to be created/updated

1. get a list of active sections
2. For each section, get a list of students enrolled in Jenzabar.
3. For each section, get a list of faculty teaching in Jenzabar.
4. Aggregate faculty and student lists. Filter out any duplicates (in case faculty are both teaching and taking classes)
5. This is the list of users who SHOULD be in Canvas.

7. Get a list of all users in Canvas.
8. Ignore users without sis_user_id set.
  
9. Compare the list of usersFromJex with the list of usersFromCanvas by jexId === sis_user_id
10. If the user is in jex, but not in Canvas, the user should be added to our createOrUpdateList.
11. If user is in both, but the properties in Canvas do not match the properties in Jex, then the user needs an update and should be added to our createOrUpdateList.

The resultant list will be users which need to be created or updated.

## How to determine which enrollments to add?

1. Get a list of active sections in Canvas.
2. For each section, get a list of students enrolled in Jenzabar.
3. Also, for each section, get a list of students enrolled in Canvas.
4. Compare lists. If a student is in a Jenzabar section, but not the corresponding Canvas section they should be added to our addList.

## How to determine which enrollments to drop?

1. Get a list of active sections in Canvas.
2. For each section, get a list of students enrolled in Jenzabar.
3. Also, for each section, get a list of students enrolled in Canvas.
4. If a student is in Canvas, but not on the Jenzabar list (or the Jenzabar section does not exist), they should be added to our dropLIst.

Special case:
1. Faculty member asks for a course to remain open in Canvas. In this case, the course is included in the list of active sections. If the Jenzabar enrollment list filters sections by the end-date in Jenzabar, it's possible for the section list to NOT include the enrollments for the active course. This means that when the Canvas and Jenzabar list are compared, the students in Canvas won't be found in Jenzabar, and thus all students in the open course will be marked as inactive.

For this reason **Jenzabar Enrollment should not be filtered by end date of course in Jenzabar**. Trust that the list of active sections is the source of truth for which sections we want enrollments for. 

Ideally, if a course is to remain open for an incomplete. The student should be added to a new section, e.g. GWD-6610-20-F19-INCOMPLETES. That section should have special end dates set, which will override the course end dates.

Still, we might want to have some sort of constraint on the query so that we don't accidentally get ALL enrollments for all users in Jenzabar? We could limit the number of results, or limit the end date to 1 year?

## What if I mark a student as inactive on one section when they're active in the other?

```
"course_id","section_id","user_id","role","status"
"GWD-6610-20-F19","","1265947","student","inactive"
```

Shows both sections under section, but only says "Student" once under role. (Before it said "student" twice).

What about grades?

Previously entered grades are there.

## What if I delete a student from one section while they're active in the other?

```csv
"course_id","section_id","user_id","role","status"
"GWD-6610-20-F19","","1265947","student","deleted"
```

Now the student is only showing as a member of the active section

What about grades?

Grades remain in the gradebook.


## What if I delete a student from a section, and the activate them later? Will their grades return?

```csv
"course_id","section_id","user_id","role","status"
"GWD-6610-20-F19","GWD-6610-20-F19","1265947","student","deleted"
```

Grades and student gone.

Now:

```csv
"course_id","section_id","user_id","role","status"
"GWD-6610-20-F19","GWD-6610-20-F19","1265947","student","active"
```

Student and grades return!
