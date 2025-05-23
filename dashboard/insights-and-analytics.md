---
description: Test and Run Insights and Analytics Guide
icon: chart-mixed
---

# Insights and Analytics

Use Insights to explore the aggregated metrics related to your test suite performance:

* changes and trends in duration and success rate of your builds and tests over time,
* test suite flakiness and stability.

{% embed url="https://www.loom.com/share/3c3d0e35f21f48af8a04954a056a3d63?hideEmbedTopBar=true" %}
Currents Dashboard Insights
{% endembed %}

## Customization

Customize the reports by applying various filters for a more focused and meaningful insights.

All charts support filtering by **tag**, **git author**, and **git branch**. In addition:

* **Suite Size**, **Test Results**, and **Test Flakiness** charts also support the **group** filter.
* **Test Results** and **Test Flakiness** charts also support the [playwright-annotations.md](../guides/playwright-annotations.md "mention")filter.&#x20;

The aggregated metrics are based in the samples collected during the selected **Date Range**.

## Insight Charts

### Run Status

Represents the distribution of the outcomes of your builds/runs over time.&#x20;

* **Overall runs**: overall runs created during the selected period, regardless of their completion or the end state.
* **Failed runs**: runs that have one or more failed tests. Failed runs count includes cancelled and timed-out tests.
* **Passed runs**: runs that have zero failed tests.
* **Pass Rate**: passed runs / overall runs.

<figure><img src="../.gitbook/assets/Screenshot 2025-05-09 at 12.02.39.png" alt=""><figcaption><p>Example chart - Run Status </p></figcaption></figure>

### Run Duration

Represents the daily/weekly average duration of **fully reported** runs. A fully reported run is a run that wasn't cancelled and didn't time out.

**Please note** that cancelled or timed-out runs are excluded from the report.

<figure><img src="../.gitbook/assets/Screenshot 2025-05-09 at 12.02.56.png" alt=""><figcaption><p>Example chart - Run Duration </p></figcaption></figure>

### Run Completion

Represents the distribution of runs by their completion over time.

* **Overall runs**: overall runs created during the selected period, regardless of their completion or the end state.
* **Fully reported runs**:  runs that weren't cancelled and didn't time out.
* **Cancelled runs**: see [cancel-run.md](runs/cancel-run.md "mention")
* **Timed out runs:** see [run-timeouts.md](runs/run-timeouts.md "mention")

<figure><img src="../.gitbook/assets/Screenshot 2025-05-09 at 12.17.11.png" alt=""><figcaption><p>Example chart - Run Completion</p></figcaption></figure>

### Test Suite Size

Represents the **maximum** daily/weekly amount of specs/tests for fully completed runs. A fully reported run is a run that wasn't cancelled and didn't time out.

* **Spec files**: the **maximum** number of spec files detected in a run for the selected period
* **Tests**: the **maximum** number of tests detected in a run for the selected period

**Please note** that cancelled or timed-out runs are excluded from the report.

<figure><img src="../.gitbook/assets/Screenshot 2025-05-09 at 12.17.37.png" alt=""><figcaption><p>Example chart - Test Suite Size</p></figcaption></figure>

### Test Results

Shows the distribution of test outcomes over time.

* **Total tests:** overall tests recorded for the selected period, regardless of their outcome.
* **Passed tests:** tests that were successfully completed on all attempts without any exceptions or errors during their execution.
* **Failed tests**: tests that either failed or were skipped because of an error in `beforeEach/beforeAll`
* **Ignored test:** tests that weren't run, e.g. `it.skip()`
* **Success Rate:** `passed  / (total - pending)`

<figure><img src="../.gitbook/assets/Screenshot 2025-05-09 at 12.40.52.png" alt=""><figcaption><p>Example chart - Test Results</p></figcaption></figure>

### Test Flakiness

Shows the distribution of flaky tests over time.

* **Flaky tests**: overall flaky tests detected for the period. See [flaky-tests.md](tests/flaky-tests.md "mention")
* **Flakiness rate**: `flaky tests count / passed tests count`

<figure><img src="../.gitbook/assets/Screenshot 2025-05-09 at 12.18.25.png" alt=""><figcaption><p>Example chart - Test Flakiness</p></figcaption></figure>
