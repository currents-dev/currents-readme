---
description: Playwright and Cypress Test Statuses - detailed guide and explanation
---

# Test Status

Playwright and Cypress test status is mostly straightforward to interpret, however, there are a few confusing concepts that can be tricky to figure out.

### Playwright Test Status

A Playwright test's status is a composition of:

* its [attempts](https://playwright.dev/docs/test-retries#retries) status
* its [expected status](https://playwright.dev/docs/api/class-testcase#test-case-expected-status)

The final state is determined after a test finished all its retries, [test.afterEach()](https://playwright.dev/docs/api/class-test#test-after-each-1) hook and fixtures.&#x20;

#### Playwright Test Retry Status

Each **test retry** can be in one of the following statuses:

* <mark style="color:green;">**Passed**</mark> - means that the test retry didn't encounter any error or exception while executing the test body or the associated `test.beforeEach` or `test.afterEach` hooks
* <mark style="color:red;">**Failed**</mark> - means that the test retry failed due to an assertion error, exception in the test's body or the associated `test.beforeEach` or `test.afterEach` hooks. An exception or failure of  `test.beforeAll` hooks will cause a failure in the first test according to the execution order.
* <mark style="color:orange;">**Interrupted**</mark> - means that the execution of a test retry was halted before it could be completed. This interruption could occur due to a variety of reasons, such as:
  * Uncaught Exception.
  * Unhandled Rejection.
  * User interrupted the test via SIGINT (CTRL + C).
  * [maxFailures](https://playwright.dev/docs/api/class-testconfig#test-config-max-failures) limit reached (the rest of the tests get stats interrupted).
* <mark style="color:orange;">**Timed out**</mark> - indicates that the test retry did not finish within a specified time limit, leading to its automatic termination. Each test's timeout depends on [testConfig.timeout](https://playwright.dev/docs/api/class-testconfig#test-config-timeout), [testProject.timeout](https://playwright.dev/docs/api/class-testproject#test-project-timeout), [test.setTimeout()](https://playwright.dev/docs/api/class-test#test-set-timeout), [test.slow()](https://playwright.dev/docs/api/class-test#test-slow-1) and [testInfo.setTimeout()](https://playwright.dev/docs/api/class-testinfo#test-info-set-timeout).
* **Skipped** - indicates that the test retry was not executed. This can happen for several reasons:
  * If you programmatically skip tests based on certain conditions.
  * If you explicitly skip a test with [test.skip()](https://playwright.dev/docs/api/class-test#test-skip-1) or [test.fixme()](https://playwright.dev/docs/api/class-test#test-fixme-1).
  * If you're using a feature like `.only` to focus on specific test.

#### Playwright Expected Status

Playwright tests have [expected status](https://playwright.dev/docs/api/class-testcase#test-case-expected-status), you can set the expected status as follows:

* Tests marked as [test.skip()](https://playwright.dev/docs/api/class-test#test-skip-1) or [test.fixme()](https://playwright.dev/docs/api/class-test#test-fixme-1) are expected to be `'skipped'`.
* Tests marked as [test.fail()](https://playwright.dev/docs/api/class-test#test-fail-1) are expected to be `'failed'`.
* Other tests are expected to be `'passed'`.

#### Playwright Test Outcome

Combining the expected status with test retries status defines [Playwright test outcome](https://playwright.dev/docs/api/class-testcase#test-case-outcome):

* `skipped` - means a test was marked as [test.skip()](https://playwright.dev/docs/api/class-test#test-skip-1) or [test.fixme()](https://playwright.dev/docs/api/class-test#test-fixme-1) and all the attempts were skipped
* `expected` -&#x20;
* `unexpected` -&#x20;
* `flaky`

`"skipped"|"expected"|"unexpected"|"flaky"`

#### Playwright Test Status in Currents Dashboard



### Cypress Tests Status

Cypress test can be in one of the following states:

* <mark style="color:green;">**Passed**</mark> - a test completed all attempts without any exceptions or errors during its execution, including all `before` and `beforeEach` expressions. During its execution, the test runner didn't encounter any timeouts, exceptions or failed assertions. Please note, for tests with multiple attempts, if the last attempt was successful, the whole test will be marked as "Passed" but "Flaky". See [flaky-tests.md](flaky-tests.md "mention") for details.&#x20;
* <mark style="color:red;">**Failed**</mark> - a test that triggered an exception or one of its assertions failed during the execution of `before`, `beforeEach` or the test body for each of its attempts. A failed test activates capturing a stack trace, a screenshot and a video recording. All of those will be shown in Currents dashboard and are available for exploration of failed test details. In some cases, cypress runner isn't able to capture a screenshot and useful error information - for example, when the spec file associated with the test cannot be parsed, or there's a crash in the runtime environment.&#x20;
* **Ignored / Pending** - a test was excluded by a developer, e.g. `it.skip()` and was excluded by a runner. `Ignored/pending` tests are tests that were:
  * explicitly marked by a developer to be excluded, e.g. `it.skip(),` `describe.skip()` or `xit()`
  * a test that is not implemented - i.e. a test that has no "body". For example, `it('nothing is here')`
  *   a test suite that was filtered out in [test/suite configuration](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Test-Configuration), for example:&#x20;

      `describe('Skip in Chrome', { browser: '!chrome' }, () => {/* ... */})`
* <mark style="color:orange;">**Skipped**</mark> - a test that **was supposed to run but has been skipped** because of a runtime error. This state is exclusive to Cypress executions. One of the most common examples is a situation where there's a crash in `beforeEach.` After unsuccessfully running the first test and recognizing an error in `beforeEach,` Cypress runner "skips" the rest of the tests because they would fail due to the same error. Currents marks spec files and runs with skipped tests as "failed".

In addition to the statuses above, a test can be marked as <mark style="background-color:purple;">**Flaky**</mark> - a test that passed after a few failing attempts. See [flaky-tests.md](flaky-tests.md "mention").
