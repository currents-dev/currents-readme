---
description: Cypress Test Statuses - detailed guide and explanation
---

# Test Status

Cypress test status is mostly straightforward and easy to interpret, however, there are a few confusing concepts that can be tricky to figure out.

### Possible Cypress Tests Statuses

A cypress test can be in one of the following states:

* <mark style="color:blue;">**Passed**</mark> - a test successfully completed all attempts without any exceptions or errors during its execution
* <mark style="color:red;">**Failed**</mark> - a test that triggered an exception or one of its assertions failed for all of its attempts
* **Ignored / Pending** - a test was excluded by a developer, e.g. `it.skip()` and was excluded by cypress runner
* <mark style="color:orange;">**Skipped**</mark> - a test was not excluded by a developer, but wasn't run by cypress runner due to an error&#x20;
* <mark style="background-color:purple;">**Flaky**</mark> - a test that passed after a few failing attempts

### Passing Tests

A passed test was successfully executed by cypress runner, including all `before` and `beforeEach` expressions. During its execution, the test runner didn't encounter any timeouts, exceptions or failed assertions.&#x20;

Please note, for tests with multiple attempts, if the last attempt was successful, the whole test will be marked as "Passed" but "Flaky". See [flaky-tests.md](flaky-tests.md "mention") for details.&#x20;

![An example of passing Cypress test ](<../.gitbook/assets/CleanShot 2022-06-28 at 13.32.10@2x.png>)

### Failing Tests

A failing test is a test that has either triggered an exception, failed assertion or a timeout during the execution of `before`, `beforeEach` or the test body for each of its attempts.

A failed test activates capturing a stack trace, a screenshot and a video recording. All of those will be shown in Currents dashboard and are available for exploration of failed test details.

In some cases, cypress runner isn't able to capture a screenshot and useful error information - for example, when the spec file associated with the test cannot be parsed, or there's a crash in the runtime environment.&#x20;

![Example of a failed Cypress test in Currents dashboard](<../.gitbook/assets/CleanShot 2022-06-28 at 13.42.37.gif>)

### **Ignored / Pending Tests**

`Ignored/pending` tests are tests that were:

* explicitly marked by a developer to be excluded, e.g. `it.skip(),` `describe.skip()` or `xit()`
* a test that is not implemented - i.e. a test that has no "body". For example, `it('nothing is here')`
* a test suite that was filtered out in [test/suite configuration](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Test-Configuration), for example:

```javascript
describe('Skip in Chrome', { browser: '!chrome' }, () => {/* ... */})
```

![Example of a pending Cypress test](<../.gitbook/assets/CleanShot 2022-06-28 at 13.48.30@2x.png>)

### Skipped Tests

A skipped test is a test that **was supposed to run but has been skipped** because of a runtime error.

One of the most common examples is a situation where there's a crash in `beforeEach.` After unsuccessfully running the first test and recognizing an error in `beforeEach,` Cypress runner "skips" the rest of the tests because they would obviously fail due to the same error.

Practically, those tests are still failed - were cypress runners to run those tests, they would fail. That's why Currents dashboard marks spec files and runs with skipped tests as "failed"
