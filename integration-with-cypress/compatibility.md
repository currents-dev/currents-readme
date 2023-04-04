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

| Cypress Version | @currents/cli | cypress-cloud |
| --------------- | ------------- | ------------- |
| 12.6.0+         | not supported | 1.4.1+        |
| 12.1.0+         | 4.0.3+        | 1.4.1+        |
| 12.0.0+         | 3.1.3+        | 1.4.1+        |
| 11.0.0+         | 3.0.0+        | 1.4.1+        |
| 6.7.0+          | any version   | not supported |

#### Sorry Cypress Users

Sorry Cypress users can use either [cy2](https://github.com/sorry-cypress/cy2) or [cypress-cloud](https://github.com/currents-dev/cypress-cloud) packages.

| Cypress Version | cy2           | cypress-cloud |
| --------------- | ------------- | ------------- |
| 12.6.0+         | not supported | 1.4.1+        |
| 12.1.0+         | 4.0.6+        | 1.4.1+        |
| 11.0.0+         | 4.0.1+        | 1.4.1+        |
| 6.7.0+          | any version   | not supported |

#### **NX Users**

NX users can use [@currents/nx](https://www.npmjs.com/package/@currents/nx) plugin to conveniently integrate Currents or Sorry Cypress with their project&#x20;

| Cypress | @currents/nx |
| ------- | -----------: |
| 12.6.0+ |       2.0.0+ |
| 12.1.0+ |       2.0.0+ |
| 12.0.0+ |       0.2.1+ |
| 11.0.0+ |       0.1.0+ |
| 6.7.0+  |  any version |
