---
description: Use cypress-cloud with Cypress@13
---

# Migration to Cypress@13

Cypress version 13 introduced breaking changes that require upgrading `cypress-cloud` package.

The required steps:

* Install the compatible version of `cypress-cloud` (as of Sep 06 it's `1.10.0-beta.1+`)

```
npm i cypress-cloud@beta
```

* Add `cypress-cloud/support` to [cypress support](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Support-file) file

```
require("cypress-cloud/support");
```

That's it! Please let us know if you have troubles with the installation or experience any issues
