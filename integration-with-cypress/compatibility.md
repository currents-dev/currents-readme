---
description: Integrating Cypress with Currents - compatibility table
---

# Compatibility

{% hint style="info" %}
**We are suspending our support of integration with Cypress starting from version 13**. We will continue to support older versions of Cypress and provide assistance to the affected customers. Please contact our support channels for details.

[Read more](https://currents.dev/posts/v13-blocking)
{% endhint %}

We provide several packages to integrate cypress runner with Currents (or Sorry Cypress) orchestration services:

* ☁️ [cypress-cloud](https://github.com/currents-dev/cypress-cloud) - standalone runner for Sorry Cypress and Currents
* \[deprecated] [cy2](https://github.com/sorry-cypress/cy2) -  package for integrating arbitrary cloud orchestration services with cypress
* \[deprecated] [@currents/cli](https://www.npmjs.com/package/@currents/cli) - a dedicated package for integrating cypress with Currents cloud service

Please use the table below to select the version of the compatible package.

#### Currents Customers

<table><thead><tr><th>Cypress Version</th><th width="242.33333333333331">@currents/cli [deprecated]</th><th>cypress-cloud</th></tr></thead><tbody><tr><td>13.2.0+</td><td>not supported</td><td>not supported</td></tr><tr><td>13.1.0 (<a href="cypress-cloud/migration-to-cypress-13.md">migration guide</a>)</td><td>not supported</td><td>2.0.0-beta.1+</td></tr><tr><td>12.6.0+</td><td>not supported</td><td>1.4.1+</td></tr><tr><td>12.1.0+</td><td>4.0.3+</td><td>1.4.1+</td></tr><tr><td>12.0.0+</td><td>3.1.3+</td><td>1.4.1+</td></tr><tr><td>11.0.0+</td><td>3.0.0+</td><td>1.4.1+</td></tr><tr><td>6.7.0+</td><td>any version</td><td>not supported</td></tr></tbody></table>

#### Sorry Cypress Users

<table><thead><tr><th>Cypress Version</th><th width="242.33333333333331">cy2 [deprecated]</th><th>cypress-cloud</th></tr></thead><tbody><tr><td>13.0.0+  (<a href="cypress-cloud/migration-to-cypress-13.md">migration guide</a>)</td><td>not supported</td><td>1.10.0-beta.1+</td></tr><tr><td>12.6.0+</td><td>not supported</td><td>1.4.1+</td></tr><tr><td>12.1.0+</td><td>4.0.6+</td><td>1.4.1+</td></tr><tr><td>11.0.0+</td><td>4.0.1+</td><td>1.4.1+</td></tr><tr><td>6.7.0+</td><td>any version</td><td>not supported</td></tr></tbody></table>

#### **NX Users**

NX users can use [@currents/nx](https://www.npmjs.com/package/@currents/nx) plugin to conveniently integrate Currents or Sorry Cypress with their project&#x20;

<table><thead><tr><th width="152.5">Cypress</th><th align="right">@currents/nx</th></tr></thead><tbody><tr><td>12.6.0+</td><td align="right">2.0.0+</td></tr><tr><td>12.1.0+</td><td align="right">2.0.0+</td></tr><tr><td>12.0.0+</td><td align="right">0.2.1+</td></tr><tr><td>11.0.0+</td><td align="right">0.1.0+</td></tr><tr><td>6.7.0+</td><td align="right">any version</td></tr></tbody></table>
