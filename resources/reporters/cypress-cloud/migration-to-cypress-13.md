---
description: Use cypress-cloud with Cypress@13
---

# Migration to Cypress@13

{% hint style="warning" %}
**We are suspending our support of Cypress test runner version 13+**

We will continue to support [prior versions](../../../getting-started/cypress/integrating-with-cypress/alternative-cypress-binaries.md) of Cypress.

[Read more](https://currents.dev/posts/v13-blocking)
{% endhint %}

Cypress version 13 introduced breaking changes that require upgrading `cypress-cloud` package.

The required steps:

* Install the compatible version of `cypress-cloud` (beta channel as of Sep 06, 2023)

```
npm i cypress-cloud@beta
```

* Add `cypress-cloud/support` to [cypress support](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Support-file) file

```
require("cypress-cloud/support");
```

***

{% hint style="info" %}
If you have existing plugins, please take a minute to review the 🤦🏻‍♂️ [common pitfalls](https://github.com/currents-dev/cypress-cloud#setup-with-existing-plugins) of multi-plugin setup
{% endhint %}

Please let us know if you have troubles with the installation or experience any issues!
