# Canvas LMS ↔️ Jenzabar SIS

> Create student users, handle enrollment add/drops in Canvas LMS


## Usage

```sh
$ canvas-jenzabar <generator> <options>
```

Or, if you'd like to be prompted for choices:

```
$ canvas-jenzabar

? What do you want to generate?
❯ users
  enrollment-adds
  enrollment-drops

? Destinations (in addition to stdout)
❯◉ file
 ◯ upload

  🌕  CANVAS HOST:       canvas.instructure.com
  🔵  JENZABAR HOST:     jenzabar.school.edu

"user_id","login_id","first_name","last_name","email","status"
⋮
```

## Generators

- `users` – CSV of users to update
- `enrollment-adds` – students to add to Canvas course enrollment
- `enrollment-drops` – students to drop (make inactive) in Canvas course enrollment

## Options

- `--file` – saves the output to a file in `./tmp`
- `--upload` – uploads the file to canvas instance

## Installation

Prerequisites:

- NodeJS LTS

```sh
# clone repo
$ git clone git@github.com:mcadonline/canvas-jenzabar-integration.git

# install node deps
$ npm ci

# configure .env file
$ cd canvas-jenzabar-integration
$ cp .env.example .env
$ nano .env

# run
$ npm link
$ canvas-jenzabar users --file
```

Note that canvas-jenzabar will use `.env` file in repo dir.

## Resources

- [Canvas API](https://canvas.instructure.com/doc/api/)
- [Canvas APIs: Getting Started, the practical ins and outs,...](https://community.canvaslms.com/docs/DOC-14390-canvas-apis-getting-started-the-practical-ins-and-outs-gotchas-tips-and-tricks)
- [Canvas Oauth2](https://canvas.instructure.com/doc/api/file.oauth.html)
- [The ABCs of Canvas Dev](https://community.canvaslms.com/thread/17419-the-abcs-of-canvas-dev)

## Author

[James Johnson](https://www.jjohnson.me)<br>
Director, Online Learning<br>
Minneapolis College of Art and Design
