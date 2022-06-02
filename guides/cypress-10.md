---
description: Using Cypress 10 with Currents Dashboard
---

# Cypress 10

TL;DR

**Cypress 10 works with Currents Dashboard as-is.**

Follow the [official migration](https://docs.cypress.io/guides/references/migration-guide) guidelines from Cypress.io team. No other changes are necessary to connect cypress to Currents Dashboard. Read more about [What's new in Cypress 10?](https://applitools.com/blog/whats-new-cypress-10/)

### Cypress 10 and Currents Dashboard

Cypress.io team has released a major update to their open source cypress runner on June 1 2022. Congratulations and kudos on the great work :tada:!&#x20;

There were no changes to the communication protocol with dashboard services, i.e. everything should work as-is.

### Does Cypress 10 work with Currents and Sorry Cypress?

**Yes!**&#x20;

Follow the official [Migration Guide from Cypress.io](https://docs.cypress.io/guides/references/migration-guide#Configuration-File-Changes) team to change your configuration.&#x20;

Keep using [`@currents/cli`](https://www.npmjs.com/package/@currents/cli) npm packages and `currents` executable wrapper for connecting cypress with Currents Dashboard.

### What does change in Currents Dashboard when using Cypress 10?

Analytics and tests history depend on spec files names (including full path) and extensions. Changing the file names or files location will cause losing the data.

If you want to keep the tests history and flakiness / failure rate analytics, try preserving your spec file names.&#x20;

### Can I use the new Cypress 10 UI with Currents Dashboard?

No. Currents Dashboard was built to be used in your CI environment and doesn't support Cypress UI.

### I found a problem with Cypress 10, what should I do?

It is a major release of a complex tool - please double check that the issue is not related to cypress runner first, e.g. Cypress.io team has already released 10.0.1.

If you suspect there is a problem with Currents Dashboard and Cypress 10, please contact [support@currents.dev](mailto:support@currents.dev) or use the in-app chat.
