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

- Node.js 24.22.3 or a newer 24.x patch release (see `.nvmrc`).

```sh
# clone repo
$ git clone git@github.com:mcadonline/canvas-jenzabar-integration.git

# enter the repo and install the patched Node.js runtime with nvm
$ cd canvas-jenzabar-integration
$ nvm install
$ nvm use

# install node deps
$ npm ci

# configure .env file
$ cp .env.example .env
$ nano .env
```

Note that canvas-jenzabar will use `.env` file in repo dir.

## Running:

```sh
$ npm start
```

Or create a link with `npm link` and run using the `canvas-jenzabar` command:

```sh
# link one time
$ npm link

# now you can run using the canvas-jenzabar command
$ canvas-jenzabar users --file
```

## Updating

```sh
$ git pull
$ nvm install
$ nvm use
$ npm ci
```

## Node.js security and deployment

This project requires Node.js 24.22.3 or a newer 24.x patch release. The
[Brotli decoder vulnerability CVE-2026-111497](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases)
was fixed in Node.js 24.22.1. We require 24.22.3 to include the subsequent
[November 2026 security fixes](https://nodejs.org/en/blog/vulnerability/november-2026-security-releases)
as well. Node.js bundles the native Brotli decoder; installing an npm Brotli
package or running `npm audit fix` does not patch that decoder.

`.nvmrc` and `.node-version` select the patched runtime. `.npmrc` rejects
incompatible runtimes during dependency installation, and the CLI checks the
runtime before running a generator. To select a newer patched 24.x release,
update those version files and the minimum in `package.json`, `package-lock.json`,
and `scripts/check-node.js` together.

After upgrading a deployment, reinstall dependencies with `npm ci` and restart
all running integration processes. For cron, systemd, or other schedulers, update
the configured Node executable explicitly: these processes may not load your
interactive shell's nvm configuration. Verify `node --version` using the same
account and executable used by the scheduler. Rebuild and redeploy any container
that runs this integration with a patched Node 24 base image; changing this repo
does not update an already running runtime or third-party container images.

Validate the upgrade with `npm test -- --runInBand` and `npm start -- --help`.
Some existing tests require access to configured Canvas/Jenzabar services; run
those only against an appropriate test environment before resuming production
jobs.

## Testing with Docker

Docker Desktop (or Docker Engine with Compose) must be running. The image uses
Node.js 24.22.3 and installs the locked development dependencies as a non-root
user. Credentials and local `node_modules` are excluded from the image.

```sh
# Build and verify the selected runtime
$ docker compose build --pull
$ docker compose run --rm integration node --version

# Smoke test: display CLI help without accessing external services
$ docker compose run --rm integration

# Run tests that do not require Canvas/Jenzabar credentials
$ docker compose run --rm integration npm run test:unit

# Open a shell for manual testing
$ docker compose run --rm integration sh
```

`npm run test:unit` also works locally after `nvm use`. It sets the test timezone
to `America/Chicago` because existing date assertions expect Minneapolis time,
and excludes the live Jenzabar suites and tests named `integration`. This setting
applies only to the test command. The full suite remains available via `npm test`.
Rebuild the image after changing source files or dependencies.

For a manual test against your configured test services, pass credentials at
runtime (use a `.env` containing test credentials):

```sh
$ docker run --rm --init --env-file .env canvas-jenzabar-integration-integration npm start -- users
```

The command above prints generated users. Add `--upload` only when you intend to
write to the configured Canvas instance. To run the full suite with test service
credentials and its expected timezone:

```sh
$ docker run --rm --init --env-file .env -e TZ=America/Chicago canvas-jenzabar-integration-integration npm test -- --runInBand
```

## Resources

- [Canvas API](https://canvas.instructure.com/doc/api/)
- [Canvas APIs: Getting Started, the practical ins and outs,...](https://community.canvaslms.com/docs/DOC-14390-canvas-apis-getting-started-the-practical-ins-and-outs-gotchas-tips-and-tricks)
- [Canvas Oauth2](https://canvas.instructure.com/doc/api/file.oauth.html)
- [The ABCs of Canvas Dev](https://community.canvaslms.com/thread/17419-the-abcs-of-canvas-dev)

## Author

[James Johnson](https://www.jjohnson.me)<br>
Director, Online Learning<br>
Minneapolis College of Art and Design
