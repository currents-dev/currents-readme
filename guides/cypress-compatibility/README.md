---
description: Integrating Cypress with Currents - compatibility table
---

# Cypress Compatibility

{% hint style="warning" %}
**Breaking change 🚧**

Cypress.io team has released a breaking change.`Integrity check failed` error appears when using certain versions of sorry cypress (cy2) or Currents (@currents/cli).

The affected cypress versions are 12.1.0
{% endhint %}

Please use the table below to select the version of the compatible package

| Cypress |      @currents/cli |         cy2 | @currents/nx |
| ------- | -----------------: | ----------: | -----------: |
| 12.1.0+ | @currents/cli@beta |    cy2@beta |       🚧 WIP |
| 12.0.0+ |             3.1.3+ |      3.4.1+ |       0.2.1+ |
| 11.0.0+ |             3.0.0+ |      3.2.0+ |       0.1.0+ |
| 6.7.0+  |        any version | any version |  any version |

In addition, we offer publicly available **beta versions** for testing and collecting feedback:

* The new [`cypress-cloud`](https://currents.notion.site/Cypress-12-and-Currents-Sorry-Cypress-3f9f29285f9242c78b0ba63cf9225c6c) integration is compatible with all Cypress versions and is a complete rewrite of integration with cloud orchestration services
* The `beta` channel of `@currents/cli` and `cy2` npm packages restore the compatibility with cypress, including version 12.1.0+, e.g.  `npm i @currents/cli@beta`



See the detailed breakdown of each major Cypress version in the subsequent sections
