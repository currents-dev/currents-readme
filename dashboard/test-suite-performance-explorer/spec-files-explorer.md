---
description: >-
  Spec-level Health and Performance Dashboard - Flakiness, Failure Rate,
  Duration, Suite Size
---

# Spec Files Explorer

The Spec Files Explorer allows users to track and analyze spec files performance using various metrics such as:

* Duration
* Failure Rate
* Flakiness Rate
* Timeout Rate
* Suite Size

<figure><img src="../../.gitbook/assets/currents-2025-04-18-12.27.27@2x.png" alt=""><figcaption><p>Spec Files Explorer health and performance dashboard - flakiness, failure rate, duration, suite size.</p></figcaption></figure>

Currents calculates the metrics based on the executions recorded during the provided date range and filters. A typical use case is to monitor the performance of the spec files that cause the degraded performance of the overall test suite - e.g. spec files with the highest flakiness rate, longest duration, etc.&#x20;

## Spec Files Explorer Metrics

### **Average Duration**

The average duration of [fully completed spec files](#user-content-fn-1)[^1], excluding timed-out or cancelled spec files.  You can exclude or include failed executions for calculating the average duration in Settings (see below).

### Overall Executions

How many executions were included during in the selected period and match the filters.

### **Failure Rate**

The failure rate is the percentage of spec file executions that failed. A spec file is failed if it had 1 or more failed tests. See [spec-files-status.md](../spec-file-status/spec-files-status.md "mention").

### **Timeout Rate**

The percentage of spec file executions that timed out.  A spec file is marked as timed out if we didn't report its test results  before exceeding its run's timeout. See [run-timeouts.md](../runs/run-timeouts.md "mention").

### **Flakiness Rate**

The percentage of spec file executions that had 1 or more flaky tests. See [flaky-tests.md](../tests/flaky-tests.md "mention").

### **Suite Size**

The number of tests in a spec file (including skipped tests).

{% hint style="info" %}
Only fully completed executions of a spec file are considered for counting the suite size
{% endhint %}

## Customization

Only test recordings matching the filters will be included for metric calculation.

* **Date Range** - include items recorded within the specified period
* **Tag** - include items with the matching[playwright-tags.md](../../guides/playwright-tags.md "mention")
* **Author** - include items with the matching Git Author (see[commit-information.md](../runs/commit-information.md "mention"))
* **Branch** - include items with the matching Git Branch (see[commit-information.md](../runs/commit-information.md "mention"))
* **Group** - include items recorded for particular group (e.g. `Firefox` or `Chromium`)
* **Search by spec name** - narrow down the results by spec name

## Controls & Settings <a href="#controls-and-settings" id="controls-and-settings"></a>

* Click on a column header to sort the tests by the corresponding column, click again to change the sorting order.
* Click on the **Export**  <img src="https://docs.currents.dev/~gitbook/image?url=https%3A%2F%2F3745692499-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FqmFDEiUa9mr11LUlxDnt%252Fuploads%252FMGPEOSEVRjhkrVBkfEGN%252Fcurrents-2025-04-17-23.49.35%25402x.png%3Falt%3Dmedia%26token%3Dfa1aec07-24a8-4170-b70f-74f32ddc7ef8&#x26;width=38&#x26;dpr=4&#x26;quality=100&#x26;sign=4ddfe919&#x26;sv=2" alt="" data-size="line"> icon to download the data in JSON format
* Click in the **Settings** <img src="https://docs.currents.dev/~gitbook/image?url=https%3A%2F%2F3745692499-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FqmFDEiUa9mr11LUlxDnt%252Fuploads%252FcBllxWGsr1x8HwvWrxbT%252Fcurrents-2025-04-17-23.49.20%25402x.png%3Falt%3Dmedia%26token%3D75a21aec-9740-4765-a0da-a6fd7730b57b&#x26;width=43&#x26;dpr=4&#x26;quality=100&#x26;sign=7bea5ca8&#x26;sv=2" alt="" data-size="line"> icon to customize the view:
  * **Include Failed Executions** - include or exclude the failed execution in calculating the avg. duration

<figure><img src="../../.gitbook/assets/currents-2025-04-18-12.25.21@2x.png" alt="" width="563"><figcaption><p>Spec Explorer Settings</p></figcaption></figure>

## Use Cases

* The flakiest Spec Files from the selected period for a specific branch.
* The Failure Rate trends for specific branches for the past month.
* The most long-running Spec Files and how they changed their duration over time.
* The Spec Files that experienced the most timeouts in the past weeks.

## **Individual Spec File Analysis**&#x20;

Clicking on an individual spec file will reveal a dedicated view of its performance, including detailed execution **History** and performance **Metrics.**

<div data-with-frame="true"><figure><img src="../../.gitbook/assets/Screenshot 2025-05-21 at 17.18.20.png" alt=""><figcaption><p>History - Spec Files Explorer</p></figcaption></figure></div>

<div data-with-frame="true"><figure><img src="../../.gitbook/assets/Screenshot 2025-05-21 at 17.20.37.png" alt=""><figcaption><p>Spec File Performance</p></figcaption></figure></div>

## Next Steps

View [reference.md](reference.md "mention") for detailed information on test **History and** **Performance Charts.**

[^1]: A spec file is considered fully completed if if a test runner reported the results for **all of its tests**
