---
description: Migration guide - Cypress 11 and Currents Dashboard
---

# Cypress 11

{% hint style="success" %}
**TL;DR:  Use the following package versions that are compatible with Cypress 11**

* &#x20;`@currents/cli`  version 3.0.0 or later
* `cy2` users, please use version 3.2.0 or later
* `@currents/nx` users, please use version 0.1.0 or later
{% endhint %}

### Cypress 11 and Currents

Version [11.0.0](https://docs.cypress.io/guides/references/changelog#11-0-0) of Cypress runner, released on November 08, 2022 introduced new exciting features and improvements: general availability of Components Testing, bug fixes and also a significant [improvement in startup performance.](https://github.com/cypress-io/cypress/issues/18480)

However, the use of binary snapshot (that allowed a faster startup) introduced a breaking change to the internal structure of the installed package, which broke the integration with `@currents/cli` and `cy2`

We are happy to release an updated version of `@currents/cli,` `cy2` and `@currents/nx` packages, that are [compatible](currents-cli.md#currents-cli-compatibility) with the recent version of cypress runner.

### Cypress 11 and V8 Snapshots

Cypress 11 installation ships with a pre-compiled binary file. The file contains pre-bundled Javascript modules, packaged in a binary format (a snapshot of V8 heap).

During its startup, cypress is loading the binary package with all the modules into memory instead of accessing the filesystem to read the modules. That significantly reduces the startup time (claims are up to 84%).

The new architecture introduced a breaking change - **@currents/cli** versions prior to 3.0.0 (and **cy2** prior to 3.2.0) were designed to work with internal cypress modules, which are gone in Cypress 11.

### Cypress 11 Migration Steps

Please update the **@currents/cli** (or **cy2** and **@currents/nx**) package to the most recent version. It's also recommended to clean your cypress binaries cache and ensure a fresh install to avoid conflicts.

Also, follow the official [Cypress 11 Migration Guide.](https://docs.cypress.io/guides/references/migration-guide#Migrating-to-Cypress-version-11-0)
