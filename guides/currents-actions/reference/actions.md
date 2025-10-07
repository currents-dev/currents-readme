---
description: >-
  Reference documentation for actions that apply as part for Currents Actions
  Engine
---

# Actions

### Available Actions

The following actions are supported by Currents Actions Engine

#### Pre-Test Actions

Actions that run in the client immediately **before** test execution.

<table><thead><tr><th width="188">Action</th><th width="434">Description</th><th>Min Version</th></tr></thead><tbody><tr><td>skip</td><td>Do not run the test at all, same as <code>test.skip().</code></td><td>v1.9.0</td></tr></tbody></table>

#### Post-Test Actions

Actions that run in the client **after** test execution, but before reporting the results to Currents.

<table><thead><tr><th width="188">Action</th><th width="434">Description</th><th>Min Version</th></tr></thead><tbody><tr><td>quarantine</td><td>Run the test, but ignore the failures; the results will be sent over to Currents, test status will be <code>skipped</code>.</td><td>v1.9.0</td></tr><tr><td>add tag</td><td>Add tags to the test result. Only affects affects the current test execution attempt.</td><td>v1.15.0</td></tr></tbody></table>

### Limitations

Errors that occur in [Playwright's `beforeAll`](https://playwright.dev/docs/api/class-test#test-before-all)  hook are not supported even if the corresponding test has the `skip` or `quarantine` action, resulting in tests still being reported as failed. Actions fixture runs after the `beforeAll` hook, and skipped by Playwright if the hook fails. We are looking at solutions to resolve this in a future release.\
\
Errors that occur in other [Custom Fixtures](https://playwright.dev/docs/test-fixtures#creating-a-fixture) may prevent the action from being applied if the failure happens before the Currents Action fixture is loaded. To ensure the action is applied in such cases, the Currents fixture should be loaded before other fixtures.  See [#combine-currents-fixtures-with-existing-custom-fixtures](../../../resources/reporters/currents-playwright/playwright-fixtures.md#combine-currents-fixtures-with-existing-custom-fixtures "mention")

