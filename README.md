# Canvas LMS / Jenzabar SIS Integration

> Create student users, handle enrollment add/drops.

## Usage

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

## Notes

The Authentication Dance

Option 1. The hard way. Oauth2 flow.

1. Setup a developer key in the system.
2. Use the developer key to obtain a "code" by authenticating.

```
GET https://mcad.instructure.com/login/oauth2/auth?client_id=<id from developer key>&response_type=code&redirect_uri=<from developer key redirect_uri>
```

The redirect URI will have a query param `code` like so: `https://mcad.edu&code=XXXXX`

3. Using the `client_id`, `client_secret`, and `code` as params, you can now obtain a token (good for 1 hour):

```
POST https://mcad.instructure.com/login/oauth2/token
```

4. With the `token`, you can access the Canvas API by including it as a request header: `Authorization: Bearer <token>`.

Option 2. The easier way.

1. Login to Canvas and under your user settings, generate a token.
2. Use the token in request header `Authorization: Bearer <token>`

https://mcad.instructure.com/api/v1/accounts/1/courses

## Resources

- [Canvas API](https://canvas.instructure.com/doc/api/)
- [Canvas APIs: Getting Started, the practical ins and outs,...](https://community.canvaslms.com/docs/DOC-14390-canvas-apis-getting-started-the-practical-ins-and-outs-gotchas-tips-and-tricks)
- [Canvas Oauth2](https://canvas.instructure.com/doc/api/file.oauth.html)
- [The ABCs of Canvas Dev](https://community.canvaslms.com/thread/17419-the-abcs-of-canvas-dev)
