---
description: Migration guide - Cypress 12 and Currents Dashboard
---

# Cypress 12

{% hint style="warning" %}
**Please note 🚧**

Cypress.io team has released a few breaking changes that can trigger `Integrity check failed` error when using sorry cypress (cy2) or Currents (@currents/cli).

The affected cypress versions are 12.0.2+.&#x20;

The versions listed [here](./) fix the integration but still can fail for exotic setups. As a temporary workaround, please downgrade cypress version.



👷🏽‍♀️ We have been working on a long-term solution, an announcement will follow soon.
{% endhint %}

{% hint style="success" %}
**TL;DR:  Use the following package versions that are compatible with Cypress 12**

* &#x20;`@currents/cli`  version 3.1.3 or later
* `cy2` users, please use version 3.4.1 or later
* `@currents/nx` users, please use version 0.2.1 or later
{% endhint %}

### Cypress 12 Changes

Version [12.0.0](https://www.cypress.io/blog/2022/12/06/announcing-cypress-12/) of Cypress runner was released on Dec 06, 2022. The new release introduced a new packaging method for the main entry point to cypress runner.

Starting from version 12.0.0 cypress is installed with a pre-compiled serialized v8 bytecode file. As [claimed](https://github.com/cypress-io/cypress/pull/24909), using the bytecode file should improve startup and unzip time.&#x20;

The pre-compiled binary file also has a series of embedded integrity checks. The checks would throw an exception after detecting a change in the package.&#x20;

This directly affects Currents and Sorry Cypress integration with cypress runner. Both modify the contents of the package, changing the API endpoint URL - so every developer or company can use their own cloud service.

### Cypress 12 and Currents/Sorry Cypress

The new architecture introduced a breaking change - **@currents/cli** versions prior to 3.1.1 (and **cy2** prior to 3.3.0) are incompatible with Cypress 12 and using those will result in an "Integrity check" exception.&#x20;

We are happy to release an updated version of `@currents/cli,` `cy2` and `@currents/nx` packages, that are [compatible](./) with the recent version of cypress runner.

We have been monitoring the new cypress releases and working on various strategies to keep the open-source cypress runner compatible with external cloud services like Sorry Cypress and Currents.

### Cypress 12 Migration Steps

Please update the **@currents/cli** (or **cy2** and **@currents/nx**) package to the most recent version. It's also recommended to clean your cypress binaries cache and ensure a fresh install to avoid conflicts.

Also, follow the official [Cypress 12 Migration Guide](https://docs.cypress.io/guides/references/changelog#12-0-0).
