---
description: Running cypress tests in parallel with Currents for NX projects
---

# NX

{% hint style="info" %}
Please note:

The instructions below apply **@currents/nx@beta**
{% endhint %}

### Running cypress tests in NX project with Currents

[Nx](https://github.com/nrwl/nx) is a next-generation build system with first-class monorepo support and powerful integrations. You can run cypress tests on Currents using [`@currents/nx` plugin](https://www.npmjs.com/package/@currents/nx) and defining a few configuration options.

### How to setup cypress tests in NX project

First, install `@currens/nx` npm package.

```
npm i --save-dev @currents/nx
```

Add `currents` target to your project configuration.

```json
{
  "targets": {
    "currents": {
      "executor": "@currents/nx:currents",
      "options": {
        "record": true,
        "parallel": true,
        "cypressConfig": "apps/app-e2e/cypres.config.ts",
        "devServerTarget": "my-react-app:serve",
        "testingType": "e2e"
      }
    }
  }
}

```

Run cypress tests using Currents dashboard service

```
nx run project:currents --record --key <key> --ci-build-id hello-currents
```

* You can set predefined options in `target` definition
* Update your `cypress.json` file with `projectId` obtained from [https://app.currents.dev](https://app.currents.dev)
* Use the record key obtained from [https://app.currents.dev](https://app.currents.dev)

You can also omit CLI flags and instead provide cypress options within `@nrwl/cypress:cypress` executor's `options`, for example:

```json
{
  "currents": {
    "executor": "@currents/nx:currents",
    "options": {
      "cypressConfig": "apps/frontend-e2e/cypress.json",
      "devServerTarget": "frontend:serve",
      "record": true,
      "parallel": true,
      "key": "currents key"
    }
  }
}
```

See our example repo at [https://github.com/currents-dev/currents-nx-example](https://github.com/currents-dev/currents-nx-example) for integration details.
