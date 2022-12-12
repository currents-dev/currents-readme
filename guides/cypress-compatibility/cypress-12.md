---
description: Cypress 12 and Currents Dashboard
---

# Cypress 12

{% hint style="warning" %}
**Dec 11 Update**  **🚧**

Cypress.io team has released a few breaking changes that can trigger `Integrity check failed` error when using sorry cypress (cy2) or Currents (@currents/cli).

The affected cypress versions are 12.0.0, 12.0.1 and 12.0.2.&#x20;

The versions listed below fix the integration:

* &#x20;`@currents/cli`  version 3.1.3 or later
* `cy2` version 3.4.1 or later
* `@currents/nx` version 0.2.1 or later



👷🏽‍♀️  **As a temporary workaround, we recommend pinning cypress to version 12.0.2 or below until we release a new integration.** We have been working on a long-term solution, and an announcement will follow soon.


{% endhint %}

### Cypress 12 Changes

Version [12.0.0](https://www.cypress.io/blog/2022/12/06/announcing-cypress-12/) of Cypress runner was released on Dec 06, 2022. The new release introduced a new packaging method for their package.

Starting from version 12.0.0 cypress is installed with a pre-compiled serialized v8 bytecode file. As [claimed](https://github.com/cypress-io/cypress/pull/24909), using the bytecode file should improve startup and unzip time.&#x20;

The pre-compiled binary file also has a series of embedded integrity checks. The checks would throw an exception after detecting a change in the package.&#x20;

This directly affects Currents and Sorry Cypress integration with cypress runner. Both slightly modify the contents of the package, changing the API endpoint URL - so every developer or company can use their own cloud service.

### Cypress 12 and Currents/Sorry Cypress

The new architecture introduced a breaking change. Please refer to the [reference table](./) to find a compatible version  of `@currents/cli,` `cy2` and `@currents/nx` .

We have been monitoring new cypress releases and working on a long-term solution that is not prone to Integrity check errors.

