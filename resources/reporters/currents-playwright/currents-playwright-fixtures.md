---
description: Enhance Playwright functionality with Currents playwright fixtures
---

# Currents Playwright fixtures

{% hint style="info" %}
Requires `@currents/playwright` 1.7.0+
{% endhint %}

[Playwright custom fixtures](https://playwright.dev/docs/test-fixtures) provide ways to augment and modify tests at runtime. The `@currents/playwright`  package provides some fixtures for integrating with advanced Currents features like:

* [#code-coverage-for-playwright](../../../guides/coverage.md#code-coverage-for-playwright "mention")

### Adding the Currents fixtures

{% stepper %}
{% step %}
#### Create and export a new instance of test for adding fixtures

Create a new file in your repo in a location that can be imported from your tests. (Or if you are already using custom fixtures, follow your existing pattern).

```typescript
import { test as baseTest } from '@playwright/test';
import { 
  CurrentsFixtures,
  CurrentsWorkerFixtures,
  fixtures
} from '@currents/playwright';

export const test = baseTest.extend<CurrentsFixtures, CurrentsWorkerFixtures>({
  ...fixtures.baseFixtures,
});
```


{% endstep %}

{% step %}
#### Add additional Currents feature fixtures

The `baseFixtures` are required for loading the currents config for the other Currents fixtures. You will also want to include any Currents fixture you plan on using. Here is[ Playwright coverage](../../../guides/coverage.md#code-coverage-for-playwright) as an example:

{% code title="currentsTest.ts" %}
```typescript
import { test as baseTest } from '@playwright/test';
import { 
  CurrentsFixtures,
  CurrentsWorkerFixtures,
  fixtures
} from '@currents/playwright';

export const test = baseTest.extend<CurrentsFixtures, CurrentsWorkerFixtures>({
  ...fixtures.baseFixtures,
  ...fixtures.coverageFixtures,
});
```
{% endcode %}


{% endstep %}

{% step %}
#### Optional: set Currents fixture configuration

We pick up the configuration automatically from the `currents.config.js|ts` file - if you created the file you can skip this step. If you explicitly provide config to the Currents reporter in your `playwright.config.ts` you will also need to pass that same config to the fixture like this:

{% code title="playwright.config.ts" %}
```typescript
import {
  currentsReporter,
  CurrentsWorkerFixtures,
  CurrentsFixtures,
} from "@currents/playwright";
import { devices, defineConfig } from "@playwright/test";

const config = defineConfig<CurrentsFixtures, CurrentsWorkerFixtures>({
    use: {
      // add the currents config here to be used in the fixture
      currentsConfigOptions: {
        ... insert your currents config here
      },
    }),
   ... other config
});

export default config;
```
{% endcode %}


{% endstep %}

{% step %}
#### Use the new implementation in your tests

Import the new `test` implementation and use it in your tests where you want to use the features provided by the fixtures (or [#combine-currents-fixtures-with-existing-custom-fixtures](currents-playwright-fixtures.md#combine-currents-fixtures-with-existing-custom-fixtures "mention")).

```typescript
import { test } from './currentsTest';
import { expect } from "@playwight/test"


test('basic test', async ({ page }) => {
  await todoPage.addToDo('something nice');
  await expect(page.getByTestId('todo-title')).toContainText(['something nice']);
});
```

If you want to test that fixtures are loading, you can confirm that the `currentsConfig` is loaded by calling the fixture in one of the tests, and printing it’s result.

```typescript
import { test } from './currentsTest';
import { expect } from "@playwight/test"


test('basic test', async ({ page, currentsConfig }) => {
  console.log(currentsConfig);
  await todoPage.addToDo('something nice');
  await expect(page.getByTestId('todo-title')).toContainText(['something nice']);
});
```


{% endstep %}
{% endstepper %}

### Combine Currents fixtures with existing custom fixtures

If you already have your own custom fixtures, you will wan to use [Playwright's mergeTests helper](https://playwright.dev/docs/test-fixtures#combine-custom-fixtures-from-multiple-modules) to combind fixtures from multiple modules. The merged result should be exported and used in your tests.

{% code title="fixtures.ts" %}
```typescript
import { mergeTests } from '@playwright/test';
import { test as dbTest } from 'databaseTest';
import { test as currentsTest } from 'currentsTest';

export const test = mergeTests(dbTest, currentsTest);
```
{% endcode %}

{% code title="test.spec.ts" %}
```typescript
import { test } from './fixtures';

test('passes', async ({ database, page, currentsConfig }) => {
  // use database and currentsConfig fixtures.
});
```
{% endcode %}

### Available Fixtures

<details>

<summary>baseFixtures</summary>

* `curentsConfigOptions`&#x20;
* `currentsConfig`

Other Currents fixtures depend on these. They are loaded once per worker.&#x20;

</details>

<details>

<summary>coverageFixtures</summary>

* `context`

See [#code-coverage-for-playwright](../../../guides/coverage.md#code-coverage-for-playwright "mention")for details

</details>

