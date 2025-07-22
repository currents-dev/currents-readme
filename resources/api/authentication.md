---
description: API Reference - Authentication
---

# Authentication

The Currents API uses [API keys](api-keys.md) to authenticate requests. You can view and manage your API keys in [the Currents Dashboard](https://app.currents.dev).

Your API keys carry many privileges, so be sure to keep them secure! Do not share your secret API keys in publicly accessible areas such as GitHub, client-side code, and so forth.

Authentication to the API is performed by specifying the `Authorization` HTTP header with a bearer authentication token, for example:

```bash
curl https://api.currents.dev/v1/projects \
-H "Authorization: Bearer 51ILO7fDhR8P...wC7oFLl7nEiDT"
```

All API requests must be made over [HTTPS](http://en.wikipedia.org/wiki/HTTP\_Secure). Calls made over plain HTTP will fail. API requests without authentication will also fail.
