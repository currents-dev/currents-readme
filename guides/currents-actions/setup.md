# Setup

{% hint style="info" %}
* This feature is in beta
* Check out the [example GitHub repository ](https://github.com/currents-dev/currents-playwright-rules-example)
{% endhint %}

Setting up the rule engine to apply while running your Playwright tests consists of 3 steps:

1. Setting up the project
2. Configuring Playwright Rules fixtures
3. Updating the tests code
4. Creating rules in Currents dashboard&#x20;

### Setting up the Currents Reporter

{% hint style="info" %}
Requires `@currents/playwright` v1.9.0+
{% endhint %}

Install and configure Currents reporter following [Your First Playwright Run](../../getting-started/playwright/you-first-playwright-run.md). Make sure that [@currents/playwright](../../resources/reporters/currents-playwright/) reporter is configured with the right [Record Key](../record-key.md) and **Project ID**.

### Playwright Fixtures for Rules Engine

`@currents/playwright` provides a [Playwright fixture](https://playwright.dev/docs/test-fixtures) for applying the actions from matched rules.

{% hint style="info" %}
It is a good practice to [extend](https://playwright.dev/docs/api/class-test#test-extend) the default Playwright `test` method, for example to enable [Page Object Model](https://playwright.dev/docs/pom), [sharing a state](https://playwright.dev/docs/test-fixtures#worker-scoped-fixtures) between multiple tests etc. See [Currents Playwright fixtures](../../resources/reporters/currents-playwright/currents-playwright-fixtures.md) for more information.
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
   ...fixtures.rulesFixtures,
 });
```
{% endcode %}

### Update Tests to use New Test Method

Import and use the extended `test` for every test case to enable the rules engine for that test.

```typescript
import { expect } from "@playwright/test";
import { test } from "./base.ts";
```

Any rules that match your test will now automatically apply.

### Creating Rules in Currents Dashboard&#x20;

The rules to apply are creating using the Rules page in the Dashboard. See [#creating-rules-in-currents](./#creating-rules-in-currents "mention") for details.

<figure><img src="../../.gitbook/assets/Screenshot 2024-12-10 at 3.22.45 PM (1).png" alt=""><figcaption><p>View, Create, and Edit Rules</p></figcaption></figure>



