---
description: Playwright and Cypress Test Status - detailed guide and explanation
---

# Test Status

Playwright and Cypress test status is mostly straightforward to interpret, however, there are a few confusing concepts that can be tricky to figure out.

## Playwright Test Status

Playwright test status is a composition of:

* the status of its [attempts](https://playwright.dev/docs/test-retries#retries)
* its [expected status](https://playwright.dev/docs/api/class-testcase#test-case-expected-status)

The final status is determined after a test has finished all its retries, [test.afterEach()](https://playwright.dev/docs/api/class-test#test-after-each-1) hook and fixtures and depends on the **expected status** and the **status of all the retries.**&#x20;

See [#playwright-test-status-summary-table](test-status.md#playwright-test-status-summary-table "mention") for reference of how Playwright statuses appear in Currents.&#x20;

## Playwright Test Attempt Status

Each **test attempt** can be in one of the following statuses:

* <mark style="color:green;">**passed**</mark> - means that the test attempt didn't encounter any error or exception while executing the test body or the associated `test.beforeEach` or `test.afterEach` hooks
* <mark style="color:red;">**failed**</mark> - means that the test attempt failed due to an assertion error, exception in the test's body or the associated `test.beforeEach` or `test.afterEach` hooks. An exception or failure of  `test.beforeAll` hooks will cause a `failed` status in the first test attempt according to the execution order.
* <mark style="color:orange;">**interrupted**</mark> - means that the execution of a test attempt was halted before it could be completed. This interruption could occur due to a variety of reasons, such as:
  * Uncaught Exception.
  * Unhandled Rejection.
  * Interrupted by a system signal like SIGINT (CTRL / CMD + C).
  * [maxFailures](https://playwright.dev/docs/api/class-testconfig#test-config-max-failures) limit reached (the rest of the tests get stats interrupted).
* <mark style="color:orange;">**timedOut**</mark> - indicates that the test attempt did not finish within a specified time limit, leading to its automatic termination. Each test's timeout depends on [testConfig.timeout](https://playwright.dev/docs/api/class-testconfig#test-config-timeout), [testProject.timeout](https://playwright.dev/docs/api/class-testproject#test-project-timeout), [test.setTimeout()](https://playwright.dev/docs/api/class-test#test-set-timeout), [test.slow()](https://playwright.dev/docs/api/class-test#test-slow-1) and [testInfo.setTimeout()](https://playwright.dev/docs/api/class-testinfo#test-info-set-timeout).
* **ignored** - indicates that the test retry was not executed. This can happen for several reasons:
  * If you programmatically skip tests based on certain conditions.
  * If you explicitly skip a test with [test.skip()](https://playwright.dev/docs/api/class-test#test-skip-1) or [test.fixme()](https://playwright.dev/docs/api/class-test#test-fixme-1).
  * If you're using a feature like `.only` to focus on specific test.
  * If a previous test in a test group failed or timed out (see below).

## Playwright Expected Status

Playwright tests have [expected status](https://playwright.dev/docs/api/class-testcase#test-case-expected-status), you can set the expected status as follows:

* Tests marked as [test.skip()](https://playwright.dev/docs/api/class-test#test-skip-1) or [test.fixme()](https://playwright.dev/docs/api/class-test#test-fixme-1) are expected to be `ignored`.
* Tests marked as [test. fail()](https://playwright.dev/docs/api/class-test#test-fail-1) are expected to be `failed`.
* Other tests are expected to be `passed`.

## Playwright Test Outcome

Combining the expected status with test retries status defines [Playwright test outcome](https://playwright.dev/docs/api/class-testcase#test-case-outcome):

* `ignored` - means all the attempts were skipped (because the test was marked as [test.skip()](https://playwright.dev/docs/api/class-test#test-skip-1) or [test.fixme()](https://playwright.dev/docs/api/class-test#test-fixme-1))&#x20;
* `expected` - means all the attempts' status matches the `expectedStatus`
  * a test has `expectedStatus=failed` all attempts were `failed` (but not `timedOut` )
  * a test has `expectedStatus=passed` and all attempts have a status `passed`
* `unexpected` - all attempts' status does not match the `expectedStatus`
* `flaky` - some attempts' status matches the expected status, and some do not. See below.

## Playwright Flaky Tests

Playwright marks a test as flaky if some attempts match the expected status and some don't. For example:

* there are multiple test attempts **and**
* there is at least one `passed` attempt **and**
* there's at least one `failed` or `timedOut` attempt

It can be tricky to interpret the result depending on the expected status. For example, all the tests below will be considered flaky:

```typescript

import { expect, test } from "@playwright/test";

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
test.describe.configure({ timeout: 500 });

test("expectedStatus=passed; failed, passed", async ({ page }, { retry }) => {
  if (retry === 0) {
    throw new Error("oh!");
  }

  expect(true).toBe(true);
});

test("expectedStatus=failed; timedOut, passed", async ({ page }, { retry }) => {
  if (retry === 0) {
    await wait(1000);
  }
  expect(true).toBe(true);
});

test("expectedStatus=failed; passed, failed", async ({ page }, { retry }) => {
  test.fail();
  if (retry === 0) {
    expect(true).toBe(true);
  }
  if (retry === 1) {
    expect(true).toBe(false);
  }
});

test("expectedStatus=failed; timedOut, failed", async ({ page }, { retry }) => {
  test.fail();
  if (retry === 0) {
    await wait(1000);
  }
  if (retry === 1) {
    expect(true).toBe(false);
  }
});
```

See [flaky-tests.md](flaky-tests.md "mention")for more details about learning how to use Currents Dashboard when dealing with flaky tests.

#### Serial Mode and Playwright Test Status

{% hint style="info" %}
It is recommended to avoid dependencies between tests and ensure that every test is isolated for more efficient retries and parallelization
{% endhint %}

Enabling [Serial Mode](https://playwright.dev/docs/test-retries#serial-mode) for Playwright Tests changes the default behaviour: a group of tests designated to run serially always run together, one after another. A failure or a timeout in a test causes all the subsequent tests in the group to become `skipped`. Depending on the number of retries left, all the tests will run again until completion.

> Use [test.describe.serial()](https://playwright.dev/docs/api/class-test#test-describe-serial) to group dependent tests to ensure they will always run together and in order. If one of the tests fails, all subsequent tests are skipped. All tests in the group are retried together.

Determining test status for serial tests follows the same principles as for other tests, however, you should be aware of that behaviour and interpret the results accordingly.

## Console Output

The Playwright Console Output has a precise and accurate presentation of the execution workflow.

* Each attempt has its start and end timestamps, status details, detected errors, stdout and stderr output.
* Clear separation between tests flakiness and outcome status - [determining](https://currents.dev/readme/tests/test-status#playwright-test-status) a test's "status" and flakiness requires considering the outcome of all the attempts, the expected status and the execution mode (e.g. ["serial" mode](https://playwright.dev/docs/test-parallel#serial-mode) can generate extra attempts).

<figure><img src="../../.gitbook/assets/Screenshot 2024-06-17 at 01.10.46.png" alt=""><figcaption><p>Example - Console output of the Playwright reporter</p></figcaption></figure>

Moreover, inline links to individual test results is part of console output:

<figure><img src="../../.gitbook/assets/Screenshot 2024-06-17 at 01.10.57.png" alt=""><figcaption><p>Example - Console output of the Playwright reporter</p></figcaption></figure>

#### Playwright Test Status - Summary Table

Refer to the table below to determine how a certain combination of `expectedStatus` and  `outcome` affects the status reported to Currents Dashboard.

| PW Expected Status | PW Actual Status | PW Outcome | Currents Status |
| ------------------ | ---------------- | ---------- | --------------- |
| failed             | passed           | unexpected | failed          |
| failed             | timedOut         | unexpected | failed          |
| failed             | failed           | expected   | passed          |
| passed             | passed           | expected   | passed          |
| passed             | timedOut         | unexpected | failed          |
| passed             | failed           | unexpected | failed          |
| skipped            | skipped          | expected   | ignored         |
