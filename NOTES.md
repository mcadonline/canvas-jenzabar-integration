# Notes

## The Authentication Dance

### Option 1. The hard way. Oauth2 flow.

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

### Option 2. The easier way.

1. Login to Canvas and under your user settings, generate a token.
2. Use the token in request header `Authorization: Bearer <token>`

https://mcad.instructure.com/api/v1/accounts/1/courses
