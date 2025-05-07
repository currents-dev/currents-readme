---
description: Fail-fast or cancelling runs on first failure
---

# Fail Fast Strategy

Automatically cancelling your test suite right after the first failure is called a "fail-fast strategy". Currents dashboard allows tracking the outcome of your tests and automatically cancels runs whenever the first failed spec file is detected.&#x20;

After executing a spec file, the runner sends the results to the Currents dashboard. The dashboard receives the results, identifies a failed test, and marks the associated run as "cancelled". Any new requests associated with the run will fail with a warning, as a result, cypress runners will not be able to start executing a new spec file for the run.

Please note, that any spec file that is still in progress will run to completion and its results will still be accepted.

![Example of a run automatically cancelled via "fail-fast" policy](<../../.gitbook/assets/Screenshot 2023-10-12 at 02.23.30.png>)

Using a "fail-fast" strategy can be beneficial because:

* it reduces CI resources usage by preventing running additional tests after detecting just a single failure;
* potentially getting faster feedback for runs with a failed test - you don't need to wait for the run to finish;
* it reduces the number of tests results recorded on the Currents dashboard;
* it prevents [run-timeouts.md](../../dashboard/runs/run-timeouts.md "mention") when an external tool (CI or a script) terminates cypress tests prematurely.

At the same time, utilizing a "fail-fast" strategy has some caveats:

* not all the tests will be executed - you will only see the results of a single test - the first test that triggered the "fail-fast" policy;
* tackling one failure at a time can result in more runs than necessary - one can invest more time and resources, compared to running all the tests regardless of their results.

![Automatically cancelled runs will be marked as failed and cancelled](<../../.gitbook/assets/Screenshot 2023-10-12 at 02.25.10.png>)

If you are dealing with a stable and predictable suite of tests that rarely fail - "fail-fast" can be a great way to optimize your cypress tests.&#x20;

{% hint style="info" %}
[Read more](../../dashboard/runs/cancel-run.md) about how cancelling runs affects runs status, analytics and integrations
{% endhint %}

### Enabling fail-fast strategy

To enable the "fail-fast" strategy navigate to the **Manage Project** screen and toggle **Enable Fail Fast Strategy** controller.

Customers using our [cypress-cloud](../../resources/reporters/cypress-cloud/ "mention") integration can control the "fail-fast" behaviour using the command line CLI flag `--auto-cancel-after-failures <number | false>`.&#x20;

Customers using our [currents-playwright](../../resources/reporters/currents-playwright/ "mention") integration can use `--pwc-cancel-after-failures <number | false>` option.

&#x20;If set, it overrides the project's default fail-fast strategy setting. If not set, use the default project settings:

* `false` prevents fail-fast
* `number` aborts the run across all the participating machines failed + skipped tests detected exceed the provided value

For example

* `npx pwc --key xxx --project-id xxx --ci-build-id id-001 --pwc-cancel-after-failures 1`
* `npx cypress-cloud run --parallel --record --key xxx --ci-build-id id-001 --spec "./cypress/e2e/*.spec.js" --auto-cancel-after-failures`**`false`** will deactivate the fail-fast strategy, regardless of your project settings&#x20;
* `npx cypress-cloud run --parallel --record --key xxx --ci-build-id id-001 --spec "./cypress/e2e/*.spec.js" --auto-cancel-after-failures`**`5`** will stop the run if more than 5 failed tests detected
