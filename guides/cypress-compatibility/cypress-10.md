---
description: Using Cypress 10 with Currents Dashboard
---

# Cypress 10

{% hint style="success" %}
**TL;DR: Cypress 10 works with Currents Dashboard as-is**

No action required
{% endhint %}

Follow the [official migration](https://docs.cypress.io/guides/references/migration-guide) guidelines from Cypress.io team. No other changes are necessary to connect cypress to Currents Dashboard. Read more about [What's new in Cypress 10?](https://applitools.com/blog/whats-new-cypress-10/)

### Cypress 10 and Currents Dashboard

Cypress.io team released a major update to their open-source cypress runner on June 1 2022. Congratulations and kudos on the great work :tada:!&#x20;

There were no changes to the communication protocol with dashboard services, i.e. everything should work as-is.

### Cypress 10 setup for Currents and Sorry Cypress

Follow the official [Migration Guide from Cypress.io](https://docs.cypress.io/guides/references/migration-guide#Configuration-File-Changes) team to change your configuration.&#x20;

Keep using [`@currents/cli`](https://www.npmjs.com/package/@currents/cli) npm packages and `currents` executable wrapper for connecting cypress with Currents Dashboard.

Analytics and test history depend on spec file names (including full path) and extensions. Changing the file names or files location will cause losing the data.

If you want to keep the test history and flakiness/failure rate analytics, try preserving your spec file names.&#x20;

### Cypress 10 UI and Currents Dashboard?

Currents Dashboard was built to be used in your CI environment and doesn't support Cypress UI.

### I found a problem with Cypress 10, what should I do?

It is a major release of a complex tool - please double check that the issue is not related to cypress runner first, e.g. Cypress.io team has already released 10.0.1.

If you suspect there is a problem with Currents Dashboard and Cypress 10, please contact [support@currents.dev](mailto:support@currents.dev) or use the in-app chat.
