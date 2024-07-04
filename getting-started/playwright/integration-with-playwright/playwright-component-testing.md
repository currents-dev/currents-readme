---
description: Using Currents with Playwright Component testing
---

# Playwright Component Testing

Run [Playwright Component testing](https://playwright.dev/docs/test-components) and report the results to [Currents](https://currents.dev/playwright)

{% hint style="info" %}
**Note November 2023:** Playwright support for Component testing is still experimental
{% endhint %}

Please refer to the example integration of Playwright Component testing with Currents:

{% embed url="https://github.com/currents-dev/currents-playwright-component-tests-example" %}

The project contains two simple component tests:

* `src/App.spec.jsx` - a passing test
* `src/AppFailing.spec.jsx` - an intentionally failing test

The results will be sent to Currents for more effective troubleshooting, screenshots, playwright traces and collecting performance metrics:

<figure><img src="../../../.gitbook/assets/280147761-a7b95888-416d-407e-bf00-833f893765a7.gif" alt=""><figcaption><p>Example of collecting Playwright Component test results </p></figcaption></figure>
