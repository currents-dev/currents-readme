---
description: Setting up Current Actions for your Playwright Project
---

# Setup Currents Actions

### Requirements

* Only available for Playwright
* Requires `@currents/playwright` v1.9.0+&#x20;

### Overview

Setting up the Currents Actions consists of 3 steps:

1. Setting up the project
2. Configuring Playwright fixtures
3. Updating the tests code

{% hint style="info" %}
Check out the [example GitHub repository](https://github.com/currents-dev/currents-playwright-rules-example).
{% endhint %}

### Setting up the Currents Reporter

Install and configure Currents reporter following [you-first-playwright-run.md](../../getting-started/playwright/you-first-playwright-run.md "mention") guide.&#x20;

### Add Playwright Fixtures

`@currents/playwright` provides a [Playwright fixture](https://playwright.dev/docs/test-fixtures) that must be installed to enable Currents fixtures.

{% hint style="info" %}
It is a good practice to [extend](https://playwright.dev/docs/api/class-test#test-extend) the default Playwright `test` method, for example to enable [Page Object Model](https://playwright.dev/docs/pom), [sharing a state](https://playwright.dev/docs/test-fixtures#worker-scoped-fixtures) between multiple tests etc. See [currents-playwright-fixtures.md](../../resources/reporters/currents-playwright/currents-playwright-fixtures.md "mention") for more information.
{% endhint %}

{% code title="base.ts" %}
```typescript
 import {
   CurrentsFixtures,
   CurrentsWorkerFixtures,
   fixtures,
 } from "@currents/playwright";
 import { test as base } from "@playwright/test";
 
 export const test = base.extend<CurrentsFixtures, CurrentsWorkerFixtures>({
   ...fixtures.baseFixtures,
   ...fixtures.actionFixtures,
 });
```
{% endcode %}

### Update Tests

Import and use the extended `test` for every test case to enable the rules engine for that test.

```typescript
import { expect } from "@playwright/test";
import { test } from "./base.ts";
```

### Optional: conditionally enable fixtures only on CI

After extending the  `test` method, many Currents fixtures are enabled by default. If you wish to only conditionally enable them (such as only in CI) you can use the `currentsFixturesEnabled` property in your `playwright.config.ts` file.

{% code title="playwright.config.ts" %}
```typescript
// ...
use: {
  ...
  currentsFixturesEnabled: !!process.env.CI,
},
```
{% endcode %}
