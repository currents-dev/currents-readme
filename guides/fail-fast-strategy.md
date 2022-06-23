---
description: Fail-fast or cancelling runs on first failure for Cypress tests
---

# Fail Fast Strategy

Automatically cancelling your cypress tests suite right after the first failed test is called a "fail-fast strategy".

Currents dashboard allows tracking the outcome of your tests and automatically cancel runs whenever the first failed test is detected.

![Example of a run automatically cancelled via "fail-fast" policy](<../.gitbook/assets/CleanShot 2022-06-23 at 00.07.21@2x (1).png>)

Using "fail-fast" strategy can be beneficial because:

* it reduces CI resources usage by preventing running additional tests after detecting just a single failure;
* potentially getting faster feedback for runs with a failed test - you don't need to wait for the run to finish;
* it reduces the number of tests results recorded on the Currents dashboard;
* it prevents [run-timeouts.md](../runs/run-timeouts.md "mention") when an external tool (CI or a script) terminates cypress tests prematurely.

At the same time, utilizing a "fail-fast" strategy has some caveats:

* not all the tests will be executed - you will only see the results of a single test - the first test that triggered the "fail-fast" policy;
* tackling one failure at a time can result in more runs than necessary - one can invest more time and resources, compared to running all the tests regardless of their results.

![Automatically cancelled runs will be marked as failed and cancelled](<../.gitbook/assets/CleanShot 2022-06-23 at 00.16.31@2x.png>)

If you are dealing with a stable and predictable suite of cypress tests that rarely fail - "fail-fast" can be a great way to optimize your cypress tests.&#x20;

{% hint style="info" %}
[Read more](../runs/cancel-run.md) about how cancelling runs affect runs status, analytics and integrations
{% endhint %}

### Enabling fail-fast strategy

To enable the "fail-fast" strategy navigate to the **Manage Project** screen and toggle **Enable Fail Fast Strategy** controller.

