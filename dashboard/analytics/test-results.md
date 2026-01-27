---
description: Track the distribution of test outcomes over time
icon: list-check
---

# Test Results

Shows the distribution of test outcomes over time.

{% hint style="success" %}
You can send and record custom metrics associated with your tests using [#annotation-custom-metrics](../../guides/playwright-annotations.md#annotation-custom-metrics "mention"). Custom Metrics will show up in Test Results chart.
{% endhint %}

## Metrics

* **Total tests**: overall tests recorded for the selected period, regardless of their outcome.
* **Passed tests**: tests that were successfully completed on all attempts without any exceptions or errors during their execution.
* **Failed tests**: tests that either failed or were skipped because of an error in `beforeEach/beforeAll`
* **Ignored test**: tests that weren't run, e.g. `it.skip()`
* **Success Rate**: `passed / (total - pending)`

<figure><img src="../../.gitbook/assets/Screenshot 2026-01-19 at 19.21.28.png" alt=""><figcaption><p>Example chart - Test Results</p></figcaption></figure>

## Related

* [test-flakiness.md](test-flakiness.md "mention") - Flaky test distribution
* [../tests/flaky-tests.md](../tests/flaky-tests.md "mention") - Understanding flaky tests
* [README.md](README.md "mention") - Analytics overview
