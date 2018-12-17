<header style="text-align: center; font-size: 3rem;margin: 6rem 0; line-height: 1;">
  Canvas LMS ↔️ Jenzabar SIS<br>
</header>

> Create student users, handle enrollment add/drops in Canvas LMS

# Usage

## `canvas-jenzabar`

Select CSV generating choices

```
$ canvas-jenzabar

? What do you want to do?
❯ Generate Users CSV
  Generate Enrollment Adds CSV
  Generate Enrollment Drops CSV
```

### `--users`

Create a CSV of students and faculty enrolled in current and future courses:

```sh
$ canvas-jenzabar --users

"user_id","login_id","first_name","last_name","email","status"
"123","123","Testy","McTesterson","ttesterson@mcad.edu","active"
"456","456","Astudent","VonBauhaus","avonbauhaus@mcad.edu","active"

👍 Saved to: /tmp/ff-users.csv
```

### `--enrollment-add-students`

Enrollment Adds: Students in SIS, but not enrolled in Canvas

```sh
$ canvas-jenzabar --enrollment-add-students

"user_id","course_id","status","role"
"123","ILL-2000-01-F21","active","student"
"456","GWD-7460-20-W22","active","student"

👍 Saved to: /tmp/ff-enrolladdstudents.csv
```

### `--enrollment-drop-students`

Enrollment Drops: Student in Canvas, but not in SIS

```sh
$ canvas-jenzabar --enrollment-drop-students

"user_id","course_id","status","role"
"123","ILL-2000-01-F21","active","student"
"456","GWD-7460-20-W22","active","student"

👍 Saved to: /tmp/ff-enrolldropstudents.csv
```

### `--post-to`

Post CSV data to SIS Import endpoint. Must be used with another CLI option.

```sh
$ canvas-jenzabar --users --post-to https://mcad.instructure.com

"user_id","login_id","first_name","last_name","email","status"
"123","123","Testy","McTesterson","ttesterson@mcad.edu","active"
"456","456","Astudent","VonBauhaus","avonbauhaus@mcad.edu","active"

✅ Posted to: https://mcad.instructure.com
```

# Installation

TODO

# Resources

- [Canvas API](https://canvas.instructure.com/doc/api/)
- [Canvas APIs: Getting Started, the practical ins and outs,...](https://community.canvaslms.com/docs/DOC-14390-canvas-apis-getting-started-the-practical-ins-and-outs-gotchas-tips-and-tricks)
- [Canvas Oauth2](https://canvas.instructure.com/doc/api/file.oauth.html)
- [The ABCs of Canvas Dev](https://community.canvaslms.com/thread/17419-the-abcs-of-canvas-dev)

# Author

[James Johnson](https://www.jjohnson.me)<br>
Director, Online Learning<br>
Minneapolis College of Art and Design
