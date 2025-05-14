---
description: >-
  Test-Level Health and Performance Dashboard - Flakiness, Failure Rate,
  Duration.
---

# Test Explorer

The Test Explorer displays performance and health metrics for each test, based on data reported to Currents. The metrics are:

* Failure Rate
* Failure Volume
* Flakiness Rate
* Flakiness Volume
* Duration
* Duration Volume

Use it to identify underperforming tests, explore the trends and changes in test behavior.

<figure><img src="../../.gitbook/assets/currents-2025-04-17-23.42.57@2x.png" alt=""><figcaption><p>Test Explorer View - 30-day data with no filters, sorted by duration (longests tests first)</p></figcaption></figure>

Currents calculates the metrics by aggregating the test results. You can fine-tune the aggregations by applying various filters, for example:

* What are the 30-day flakiest tests from the `main` branch?
* What are the 14-fay most failing tests tagged `onboarding` ?
* What are the longest tests for  `mobile`  viewport?

Explore each test details by clicking on a **Test Title.**

{% hint style="success" %}
Enable [automated-reports.md](../automated-reports.md "mention") to automatically deliver the top items from the Test Explorer View to your inbox.&#x20;
{% endhint %}

## Test Explorer Metrics

{% hint style="info" %}
**Volume Metrics vs Value Metrics**

Metrics like **Duration Volume**, **Flakiness Volume** and **Failure Volume** measure the impact of a test on overall suite performance. The scores are calculated by multiplying the corresponding metric by the number of samples. The actual number has no real meaning. See example below.
{% endhint %}

{% hint style="info" %}
Use **Explorer Settings** to exclude or include samples from the aggregations.
{% endhint %}

The Test Explorer metrics help you to evaluate the health and performance of your testing suite.

### Duration&#x20;

The average execution time **for fully completed tests**, excluding cancelled or skipped tests during execution.

### Duration Volume

Duration Volume measures how much total time a test contributes to the overall runtime of the test suite. It’s not just about how long a test takes per run, but also how often it runs.

`Duration Volume = Avg.Duration × Executions`

The raw number isn’t important on its own — it helps prioritize which tests are the biggest time sinks across all runs.

### Failure Rate

It measures the percentage of times a test fails when it is executed and provides insights into its reliability and stability. A higher failure rate may indicate potential issues or bugs within the test or the system under test.

### Failure Volume

Failure Volume measures how much a test contributes to the total number of failures in your test suite — combining how often it runs with how likely it is to fail. It’s calculated as:

`Failure Volume = Failure Rate × Executions`

This metric helps you spot which tests are the most significant contributors to failure noise, even if their failure rate isn’t high.

### Flakiness Rate

It measures the percentage of times a test produces inconsistent pass/fail results. Analyzing the Flakiness Rate metric allows users to focus on improving the reliability and stability of flaky tests, reducing false positives or negatives, and enhancing the overall trustworthiness of the test suite.

### **Flakiness Volume**

Quantify how much a test’s flakiness impacts the overall stability of your test suite. It combines how often a test runs with how flaky it is, giving a sense of how much the test is likely to cause inconsistencies or unreliable results. A test that runs frequently with a low flakiness rate could cause more issues overall than a test that rarely runs but is highly flaky.

`Flakiness Volume = Flakiness Rate × Executions`

### Executions

How many recordings were included for calculating the metrics — i.e. matched the period and the filters.

## Value Metrics vs Volume Metrics

Metrics like **Duration Volume**, **Flakiness Volume** and **Failure Volume** measure the impact of the associated test on overall suite performance. The scores are calculated by multiplying the corresponding metric by the number of samples. The actual number has no real meaning - it's just a numerical expression.

\
For example, consider two tests:

* Test A runs rarely, reported `10` samples, with a `15%` flakiness rate.
* Test B runs often, reported `40` samples, with a  `5%`  flakiness rate.

\
Test A Flakiness Volume is `10 x 0.15 = 1.5`

Test B Flakiness Volume is `50 x 0.05 = 2`

Test B has a higher Flakiness Volume because it affects the overall test suite flakiness more, although its rate is lower.

In short, a test that’s a little flaky but runs a lot can be a bigger problem than a very flaky test that rarely runs. The actual number doesn’t matter on its own — it’s just useful to compare tests and see which ones are dragging down reliability the most.

## Customization

Only test recordings matching the filters are included for metric calculation.

* **Date Range** - include items recorded within the specified period.
* **Tag** - include items with the matching [playwright-tags.md](../../guides/playwright-tags.md "mention").
* **Author** - include items with the matching Git Author (see [commit-information.md](../runs/commit-information.md "mention")).
* **Branch** - include items with the matching Git Branch (see [commit-information.md](../runs/commit-information.md "mention")).
* **Group** - include items recorded for a particular group (e.g. `Firefox` or `Chromium`).
* **Search by spec name** - narrow down the results by test spec name.
* **Search by test title** - narrow down the results by test title.

## Controls & Settings

* Click on a column header to sort the tests by the corresponding column, and then click again to change the sorting order.
* Click on the **Export** <img src="../../.gitbook/assets/currents-2025-04-17-23.49.35@2x.png" alt="" data-size="line"> icon to download the data in JSON format
* Click on the **Settings** <img src="../../.gitbook/assets/currents-2025-04-17-23.49.20@2x.png" alt="" data-size="line"> icon to customize the view:&#x20;
  * **Include Failed Executions** - include or exclude the failed execution in calculating the average duration
  * **Include Skipped Executions** - include or exclude skipped tests from being included in metrics

<figure><img src="../../.gitbook/assets/currents-2025-04-17-23.38.24@2x.png" alt="" width="563"><figcaption><p>Test Explorer Settings</p></figcaption></figure>

## Use Cases

Here are a few examples of what information you can get from the Test Explorer:

* The flakiest tests from the last months for a specific branch.
* The top failing tests in the suite.
* The failure rate change for specific branches for the past months.
* The lowest tests and how they changed their duration over time.

Clicking on an individual test will reveal a comprehensive drill-down of the specific test's performance, including a detailed history of execution, top errors, etc.&#x20;

## Next Steps

* Explore individual test performance analysis in the [Spec & Test Performance](spec-files-performance.md) section.
* Schedule [automated-reports.md](../automated-reports.md "mention") with the top items from the Test Explorer view to automatically arrive to your inbox for proactive monitoring of test suite health.

