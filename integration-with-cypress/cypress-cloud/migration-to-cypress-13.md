---
description: Use cypress-cloud with Cypress@13
---

# Migration to Cypress@13

{% hint style="info" %}
**We are suspending our support of integration with Cypress starting from version 13**. We will continue to support older versions of Cypress and provide assistance to the affected customers. Please contact our support channels for details.

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
