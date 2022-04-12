---
description: Running cypress tests in parallel with Currents for NX projects
---

# NX

### Running cypress tests in NX project with Currents

[Nx](https://github.com/nrwl/nx) is a next generation build system with first class monorepo support and powerful integrations. You can run cypress tests on Currents using [`@currents/nx` plugin](https://www.npmjs.com/package/@currents/nx) and defining a few configuration options.

### How to setup cypress tests in NX project

First, install `@currens/nx` npm package.

```
npm i --save-dev @currents/nx
```

Add `currents` target to your project configuration.

```json
{
// ...
"targets": {
  "currents": {
    "executor": "@currents/nx:currents",
    "options": {
      "cypressExecutor": "e2e" // target name that runs "@nrwl/cypress:cypress"
    }
  },
 "e2e"
    "executor": "@nrwl/cypress:cypress",
    "options": {
      // record: true,
      // parallel: true,
      // key: "currents dashboard key"
      // ...
    },
    "configurations": {
      // ...
    }
  }
}
// ...
```

Run cypress tests using Currents dashboard service

```
nx run project:currents --record --key <key> --ci-build-id hello-currents-nx -- --parallel
```

{% hint style="info" %}
**Please note** the use of `-- --parallel` flag due to conflicts with existing NX flags. See [#8014](https://github.com/nrwl/nx/issues/8014), [#1604](https://github.com/nrwl/nx/issues/1604)
{% endhint %}

* The plugin requires an already installed `@nrwl/cypress` and a configured target that's running `@nrwl/cypress:cypress`
* `@currents/nx:currents` will run `@nrwl/cypress:cypress` behind the scenes
* You can set predefined options in target definition
* Update your `cypress.json` file with `projectId` obtained from [https://app.currents.dev](https://app.currents.dev)
* Use the record key obtained from [https://app.currents.dev](https://app.currents.dev)

You can also omit CLI flags and instead provide cypress options within `@nrwl/cypress:cypress` executor's `options`, for example:

```json
// ...
"currents": {
  "executor": "@currents/nx:currents",
  "options": {
    "cypressExecutor": "e2e"
  }
},
"e2e": {
  "executor": "@nrwl/cypress:cypress",
  "options": {
    "cypressConfig": "apps/frontend-e2e/cypress.json",
    "devServerTarget": "frontend:serve",
    "record": true,
    "parallel": true,
    "key": "currents key"
  },
  "configurations": {
    "production": {
      "devServerTarget": "frontend:serve:production"
    }
  }
}
// ...
```

See our example repo at [https://github.com/currents-dev/currents-nx-example](https://github.com/currents-dev/currents-nx-example) for integration details.
