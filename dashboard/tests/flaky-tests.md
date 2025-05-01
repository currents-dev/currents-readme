---
description: Guide to Cypress and Playwright Flaky Tests
---

# Flaky Tests

### What is a flaky test?

A flaky test is a test that did not succeed on the first attempt. The build will fail only occasionally: One time it will pass, another time fail, and the next time pass again, without any changes to the build having been made. Flaky tests are marked with a special badge on the run, spec and individual test levels.

![Run Summary with 1 flaky test detected](<../../.gitbook/assets/cypress-flaky-tests (1).png>)

### How to activate flaky test detection?

Flaky tests are automatically activated for all types of tests with retries enabled. When a test has retries enabled and doesn't pass on the first attempt, it will be marked as flaky.&#x20;

### Why are flaky tests bad?

A flaky test like this **can block the continuous deployment pipeline**, making feature delivery slower than it needs to be. Moreover, a flaky test is problematic because it is not deterministic anymore — making it useless. After all, you wouldn’t trust one any more than you would trust a liar.

Flaky tests are **expensive to repair**, often requiring hours or even days to debug.&#x20;

In summary, flaky cypress tests are considered harmful because:

* You cannot trust them - neither system / component under test nor the test itself is reliable
* Even if flaky tests pass, your end users can experience intermittent issues
* Flaky tests increase the duration of your test suite
* Flaky tests are expensive to repair and maintain

### How to get rid of flaky tests?

Your team is arguably the **most important factor**. As a first step, admit that you have a problem with flaky tests. Getting the whole team’s commitment is crucial! Then, as a team, you need to decide how to deal with flaky tests.

#### Identify flaky tests

Use our [#top-flaky-tests](../insights-and-analytics.md#top-flaky-tests "mention") Insights to see the tests with the highest flakiness rate.&#x20;

![Flaky Tests Insights](../../.gitbook/assets/cypress-flaky-tests.png)

#### Eliminate Flaky Tests

Examine the outcomes of your runs to see what tests are flaky and eliminate the source of flakiness.

* Don't use fixed wait times
* Optimize test structure - write smaller tests
* Keep tests isolated - use fresh, clean data before each test
* Give up and use retries 😛

### Fail on Flaky Tests

{% hint style="info" %}
`failOnFlakyTests` property is available in Playwright **v1.52+**, and in `@currents/playwright` starting from **v1.12.3**.
{% endhint %}

Starting with Playwright **v1.52**, the runner can be configured to exit with an error if any test has been marked as flaky [see the official docs](https://playwright.dev/docs/api/class-testconfig#test-config-fail-on-flaky-tests). This is particularly useful on CI systems where the presence of flaky tests should block the pipeline.

#### Configuration

In your `playwright.config.ts`, enable the option by setting `failOnFlakyTests` to `true` (for example, based on the `CI` environment variable):

```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Exit with an error if any test is marked flaky.
  failOnFlakyTests: Boolean(process.env.CI),
});
```

#### Command-Line Option

Alternatively, the same behavior can be enabled via the CLI flag:

```bash
# Using Playwright test command
npx playwright test --fail-on-flaky-tests

# Using the Playwright wrapper
npx pwc --fail-on-flaky-tests

# Using the orchestration
npx pwc-p --fail-on-flaky-tests
```

When this flag is present, the test run will exit with a non-zero status if any tests are detected as flaky, ensuring flaky tests block your CI pipeline.
