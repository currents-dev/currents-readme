---
description: >-
  Reference documentation for actions that apply as part for Currents Actions
  Engine
---

# Actions

### Available Actions

The following actions are supported by Currents Actions Engine

<table><thead><tr><th width="188">Action</th><th width="434">Description</th><th>Min Version</th></tr></thead><tbody><tr><td>skip</td><td>do not run the test at all, same as <code>test.skip()</code></td><td>v1.9.0</td></tr><tr><td>quarantine</td><td>run the test, but ignore the failures; the results will be sent over to Currents, test status will be <code>skipped</code></td><td>v1.9.0</td></tr></tbody></table>

### Limitations

* Errors that occur in [Playwright's `beforeAll`](https://playwright.dev/docs/api/class-test#test-before-all)  hook are not suppressed even if the corresponding test has the `skip` or `quarantine` action. Resulting in tests still being reported as failed.
  * Currents Action fixtures run after the `beforeAll` hook, and skipped by Playwright if the hook fails.
  * We are looking at solutions to resolve this in a future release.

