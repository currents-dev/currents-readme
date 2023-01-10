---
description: Cypress 12 and Currents Dashboard
---

# Cypress 12

{% hint style="info" %}
**Update Dec 19**

Please try out the new beta versions that are compatible with Cypress 12

* `npm install @currents/cli@beta`
* `npm install cy2@beta`
* [`cypress-cloud`](https://currents.notion.site/Cypress-12-and-Currents-Sorry-Cypress-3f9f29285f9242c78b0ba63cf9225c6c) is compatible with all Cypress versions and is a complete rewrite of  cloud orchestration services integration

``
{% endhint %}

{% hint style="warning" %}
**Breaking change**  **🚧**

Cypress.io team has released a few breaking changes that can trigger `Integrity check failed` error when using sorry cypress (cy2) or Currents (@currents/cli).

The affected cypress versions are 12.1.0+
{% endhint %}

### Cypress 12 Changes

Version [12.0.0](https://www.cypress.io/blog/2022/12/06/announcing-cypress-12/) of Cypress runner was released on Dec 06, 2022. The new release introduced a new packaging method for their package.

Starting from version 12.0.0 cypress is installed with a pre-compiled serialized v8 bytecode file. As [claimed](https://github.com/cypress-io/cypress/pull/24909), using the bytecode file should improve startup and unzip time.&#x20;

The pre-compiled binary file also has a series of embedded integrity checks. The checks would throw an exception after detecting a change in the package.&#x20;

This directly affects Currents and Sorry Cypress integration with cypress runner. Both slightly modify the contents of the package, changing the API endpoint URL - so every developer or company can use their own cloud service.

### Cypress 12 and Currents/Sorry Cypress

The new architecture introduced a breaking change. Please refer to the [reference table](./) to find a compatible version  of `@currents/cli,` `cy2` and `@currents/nx` .

We have been monitoring new cypress releases and working on a long-term solution that is not prone to Integrity check errors.

