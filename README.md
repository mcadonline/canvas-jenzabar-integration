# Canvas LMS / Jenzabar SIS Integration

> Create student users, handle enrollment add/drops.

## Usage (in development)

```sh
# Create a CSV of students and faculty enrolled in current and future courses
$ canvas-jenzabar --users > students.csv

$ canvas-jenzabar --terms

$ canvas-jenzabar --courses --term FA --year 2020

# Create a CSV of student and enrollments for current/future courses
$ canvas-jenzabar --student-enrollments

# faculty enrollments
$ canvas-jenzabar --faculty-enrollments

# will post CSV data to SIS Import endpoint
$ canvas-jenzabar --users --post-to https://mcad.instructure.com
```

## Installation

## Resources

- [Canvas API](https://canvas.instructure.com/doc/api/)
- [Canvas APIs: Getting Started, the practical ins and outs,...](https://community.canvaslms.com/docs/DOC-14390-canvas-apis-getting-started-the-practical-ins-and-outs-gotchas-tips-and-tricks)
- [Canvas Oauth2](https://canvas.instructure.com/doc/api/file.oauth.html)
- [The ABCs of Canvas Dev](https://community.canvaslms.com/thread/17419-the-abcs-of-canvas-dev)

## Author

[James Johnson](https://www.jjohnson.me)
