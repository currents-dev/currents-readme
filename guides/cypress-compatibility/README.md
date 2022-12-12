---
description: Integrating Cypress with Currents - compatibility table
---

# Cypress Compatibility

Sometimes Cypress.io team changes the internal architecture of cypress runner, which introduces a breaking change for integration with currents.&#x20;

{% hint style="warning" %}
**Please note 🚧**

Cypress.io team has released a few breaking changes that can trigger `Integrity check failed` error when using sorry cypress (cy2) or Currents (@currents/cli).

The affected cypress versions are 12.0.2+.&#x20;

The versions listed below fix the integration but still can fail for exotic setups. As a temporary workaround, please downgrade cypress version.



👷🏽‍♀️ We have been working on a long-term solution, an announcement will follow soon.
{% endhint %}

Please use the table below for selecting the matching packages version

| Cypress | @currents/cli |         cy2 | @currents/nx |
| ------- | ------------: | ----------: | -----------: |
| 12.0.0+ |        3.1.3+ |      3.4.1+ |       0.2.1+ |
| 11.0.0+ |        3.0.0+ |      3.2.0+ |       0.1.0+ |
| 6.7.0+  |   any version | any version |  any version |

See the detailed breakdown of each major Cypress version in the subsequent sections
