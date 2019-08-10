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




