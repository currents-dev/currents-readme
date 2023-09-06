---
description: Integrating Cypress with Currents - compatibility table
---

# Compatibility

{% hint style="info" %}
**Please note**

Please make sure to use the most recent version of the integration package, If you are seeing the following errors when running cypress:

* `Integrity check failed`&#x20;
* `DecryptionError: JWE Recipients missing or incorrect type`
* `Cypress does not support recording test results to this third party service`
{% endhint %}

We provide several packages to integrate cypress runner with Currents (or Sorry Cypress) orchestration services:

* [cy2](https://github.com/sorry-cypress/cy2) - package for integrating arbitrary cloud orchestration services with cypress
* [@currents/cli](https://www.npmjs.com/package/@currents/cli) - a dedicated package for integrating cypress with Currents cloud service
* ☁️ [cypress-cloud](https://github.com/currents-dev/cypress-cloud) - the latest (Feb 2023) iteration integration, compatible with Sorry Cypress and Currents

Please use the table below to select the version of the compatible package.

#### Currents Customers

Currents customers can use either [@currents/cli](https://www.npmjs.com/package/@currents/cli) or [cypress-cloud](https://github.com/currents-dev/cypress-cloud) packages.

<table><thead><tr><th>Cypress Version</th><th width="242.33333333333331">@currents/cli</th><th>cypress-cloud</th></tr></thead><tbody><tr><td>13.0.0+</td><td>not supported</td><td>1.10.0-beta.1+</td></tr><tr><td>12.6.0+</td><td>not supported</td><td>1.4.1+</td></tr><tr><td>12.1.0+</td><td>4.0.3+</td><td>1.4.1+</td></tr><tr><td>12.0.0+</td><td>3.1.3+</td><td>1.4.1+</td></tr><tr><td>11.0.0+</td><td>3.0.0+</td><td>1.4.1+</td></tr><tr><td>6.7.0+</td><td>any version</td><td>not supported</td></tr></tbody></table>

#### Sorry Cypress Users

Sorry Cypress users can use either [cy2](https://github.com/sorry-cypress/cy2) or [cypress-cloud](https://github.com/currents-dev/cypress-cloud) packages.

<table><thead><tr><th>Cypress Version</th><th width="242.33333333333331">cy2</th><th>cypress-cloud</th></tr></thead><tbody><tr><td>13.0.0+</td><td>not supported</td><td>1.10.0-beta.1+</td></tr><tr><td>12.6.0+</td><td>not supported</td><td>1.4.1+</td></tr><tr><td>12.1.0+</td><td>4.0.6+</td><td>1.4.1+</td></tr><tr><td>11.0.0+</td><td>4.0.1+</td><td>1.4.1+</td></tr><tr><td>6.7.0+</td><td>any version</td><td>not supported</td></tr></tbody></table>

#### **NX Users**

NX users can use [@currents/nx](https://www.npmjs.com/package/@currents/nx) plugin to conveniently integrate Currents or Sorry Cypress with their project&#x20;

<table><thead><tr><th width="152.5">Cypress</th><th align="right">@currents/nx</th></tr></thead><tbody><tr><td>12.6.0+</td><td align="right">2.0.0+</td></tr><tr><td>12.1.0+</td><td align="right">2.0.0+</td></tr><tr><td>12.0.0+</td><td align="right">0.2.1+</td></tr><tr><td>11.0.0+</td><td align="right">0.1.0+</td></tr><tr><td>6.7.0+</td><td align="right">any version</td></tr></tbody></table>
