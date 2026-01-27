---
description: Track maximum specs and tests per run
icon: arrow-up-right-dots
---

# Run Size

Represents the **maximum** daily/weekly amount of specs/tests for fully completed runs. A fully reported run is a run that wasn't cancelled and didn't time out.

## Metrics

* **Spec files**: the **maximum** number of spec files detected in a run for the selected period
* **Tests**: the **maximum** number of tests detected in a run for the selected period

{% hint style="info" %}
Cancelled or timed-out runs are excluded from the report.
{% endhint %}

<figure><img src="../../.gitbook/assets/Screenshot 2026-01-19 at 19.21.17.png" alt=""><figcaption><p>Example chart - Run Size</p></figcaption></figure>

## Related

* [suite-size.md](suite-size.md "mention") - Track unique tests across all runs over time
* [test-results.md](test-results.md "mention") - Test outcome distribution
* [README.md](README.md "mention") - Analytics overview
