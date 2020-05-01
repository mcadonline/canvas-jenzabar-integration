# Notes

## Authentication

1. Login to Canvas and under your user settings, generate a token.
2. Use the token in request header `Authorization: Bearer <token>`

https://mcad.instructure.com/api/v1/accounts/1/courses

## Creating Courses via CSV Import

When trying to run the CSV import with a small number of courses, I was testing to see what happens when we try to create courses where the SIS Course Id is already set in the system.

The import process seemed to hang. After uploading the file, Canvas just showed the following message:
"The import process has started! This can take awhile if there is a lot to import. You can leave the page and come back.

Refreshing the page had no effect. Waiting about 10minutes. Tried opening a ticket with Canvas support, but I spent a long while waiting for an agent.

### Aborting processes

1. Get the process id from https://mcad.beta.instructure.com/api/v1/accounts/1/sis_imports/
2. Abort the process with a PUT request to: https://mcad.beta.instructure.com/api/v1/accounts/1/sis_imports/10650/abort

### Questions about course creation

1. What happens when you attempt to create a course via SIS import, but one already exists with the same SIS_COURSE_ID?

- Does it update the fields (e.g. name, start date, end date, instructor name)
- Does it just stall out?
