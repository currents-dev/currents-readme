---
description: >-
  Overview of tools available for integrating cypress with Currents or Sorry
  Cypress
---

# Integrating with Cypress

{% hint style="warning" %}
**We are suspending our support of Cypress test runner version 13+**

We will continue to support [prior versions](alternative-cypress-binaries.md) of Cypress.

[Read more](https://currents.dev/posts/v13-blocking)
{% endhint %}

Currents and Sorry Cypress provide two ways to integrate with cypress runner using the following npm packages:

* [@currents/cli](currents-cli.md) (and its "community" edition [cy2](https://www.npmjs.com/package/cy2))&#x20;
* [cypress-cloud](cypress-cloud.md)

Both solutions are open-source tools that provide an executable + a programmatic API for integrating cypress with cloud orchestration and recording services like Currents or Sorry Cypress.&#x20;

The tools use cypress behind the scenes and provide the same flags and configuration options as the original cypress runner.

### What is the difference between @currents/cli and cypress-cloud?

**@cypress/cli** works by rerouting orchestration and recording network requests to currents.dev (or sorry-cypress) servers. It uses the original, "native" orchestration protocol defined by the cypress runner. In Feb 2023 Cypress.io team decided to [restrict access](#user-content-fn-1)[^1] to its internal orchestration and recording protocol, preventing the use of @currents/cli (affected versions are 12.6.0+).

**cypress-cloud** implements its own parallelization and recording protocol and runs cypress in "offline" mode, without tinkering with the cypress internals. The package uses the conventional public APIs that are available for every developer and that are being used by hundreds of [plugins and complimentary tools](https://docs.cypress.io/plugins) of Cypress ecosystem. It is compatible with versions 10.0.0+.

### What package should I use?

We recommend using **cypress-cloud** for all new installations.

[^1]: ...by showing "Cypress does not support recording test results to this third party service."
