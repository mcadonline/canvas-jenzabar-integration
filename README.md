# Canvas LMS / Jenzabar SIS Integration

> Create student users, handle enrollment add/drops.

<p class="alert tip">This is very alpha, as we're currently prepping for a Canvas Pilot</p>

## Usage

```sh
# Create a CSV of students and faculty enrolled in current and future courses
$ canvas-jenzabar --users

"user_id","login_id","first_name","last_name","email","status"
"123","123","Testy","McTesterson","ttesterson@mcad.edu","active"
"456","456","Astudent","VonBauhaus","avonbauhaus@mcad.edu","active"

👍 Saved to: /tmp/ff-users.csv

# Enrollment Adds: Students in SIS, but not enrolled in Canvas
$ canvas-jenzabar --enrollment-add-students

"user_id","course_id","status","role"
"123","ILL-2000-01-F21","active","student"
"456","GWD-7460-20-W22","active","student"

👍 Saved to: /tmp/ff-enrolladdstudents.csv

# Enrollment Drops: Student in Canvas, but not in SIS
$ canvas-jenzabar --enrollment-drop-students

"user_id","course_id","status","role"
"123","ILL-2000-01-F21","active","student"
"456","GWD-7460-20-W22","active","student"

👍 Saved to: /tmp/ff-enrolldropstudents.csv

# will post CSV data to SIS Import endpoint
$ canvas-jenzabar --users --post-to https://mcad.instructure.com

"user_id","login_id","first_name","last_name","email","status"
"123","123","Testy","McTesterson","ttesterson@mcad.edu","active"
"456","456","Astudent","VonBauhaus","avonbauhaus@mcad.edu","active"

✅ Posted to: https://mcad.instructure.com

```

## Installation

TODO

## Resources

- [Canvas API](https://canvas.instructure.com/doc/api/)
- [Canvas APIs: Getting Started, the practical ins and outs,...](https://community.canvaslms.com/docs/DOC-14390-canvas-apis-getting-started-the-practical-ins-and-outs-gotchas-tips-and-tricks)
- [Canvas Oauth2](https://canvas.instructure.com/doc/api/file.oauth.html)
- [The ABCs of Canvas Dev](https://community.canvaslms.com/thread/17419-the-abcs-of-canvas-dev)

## Author

[James Johnson](https://www.jjohnson.me)
