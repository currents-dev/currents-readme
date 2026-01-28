---
description: Test Health and Performance Dashboard - Flakiness, Failure Rate, Duration.
---

# Test Explorer

Test Explorer displays performance and health metrics for test cases. The metrics are:

- **Failure Rate** — Percentage of test executions that ended in failure.
- **Failure Impact** — Impact of the test failures (failure rate × executions).
- **% Failure Trend** — Change in failure rate compared to the previous period (up/down).
- **Flakiness Rate** — Percentage of executions with non-deterministic outcome.
- **Flakiness Impact** — Impact of the test flakiness (flakiness rate × executions).
- **% Flaky Trend** — Change in flakiness rate compared to the previous period.
- **Duration** — Average runtime of the test case.
- **Duration Impact** — Cumulative time spent running this test (duration × executions).
- **Duration Trend** — Change in average duration compared to previous period.
- **% Ignored** — Percentage of test executions where this test was skipped, ignored, or marked as muted.

Use Test Explorer to identify flaky, failing or long-running tests, explore the trends and changes in test behavior.

{% hint style="info" %}
You can fetch the Test Explorer data programmatically. See [API](https://app.gitbook.com/o/-MT4mUcrnbXWgd1xvl_x/s/lcxad7NaXT7D2V6owvHN/ "mention").
{% endhint %}

<figure><img src="../../.gitbook/assets/Screenshot 2026-01-16 at 16.39.24.png" alt=""><figcaption><p>Test Explorer displays test performance and health data</p></figcaption></figure>

## Use Cases

Here are a few examples of how you can use the Test Explorer:

- The flakiest tests from the last months for a specific branch.
- The top failing tests in the suite.
- The failure rate trend for specific branches for the past months.
- The lowest tests and how they changed their duration over time.
- What are the 30-day flakiest tests from the `main` branch?
- What are the 14-day most failing tests tagged `onboarding`?
- What are the longest tests for `mobile` viewport?
- What test cases started to flake recently?
- What test case started to run slower during the last 2 months?

- Schedule [automated-reports.md](../automated-reports.md "mention") with the top items from the Test Explorer view to automatically arrive to your inbox for proactive monitoring of test suite health.
- View [reference.md](reference.md "mention") for detailed information on test **History and** **Performance Charts.**

## Test Explorer Presets

The Test Explorer provides preset filters to help you quickly identify bottlenecks in your test suite. You can spot failing, flaky, slow, or frequently ignored tests, as well as track trends over time. Results can be filtered to show only the main branch. You can set the default branch in the [project-settings.md](../projects/project-settings.md "mention").

<figure><img src="../../.gitbook/assets/currents-2026-01-27-23.20.06@2x.png" alt=""><figcaption><p>Test Explorer Presets</p></figcaption></figure>

The presets are organized into four categories:

#### Failures

- **Top Failing** — Tests with highest failure rate
- **Currently Failing** — Tests with most recent execution failed
- **Getting Worse** — Tests with increasing failure rate
- **High Impact** — Tests that run frequently and often fail (failure rate × executions)

#### Flakiness

- **Top Flaky** — Tests with highest flakiness rate
- **Currently Flaky** — Tests with the most recent flaky execution
- **Trending Flaky** — Tests with increasing flakiness rate
- **High Impact** — Tests that run frequently and often flake (flakiness rate × executions)

#### Duration

- **Slowest** — Tests with highest average duration
- **Slowing Down** — Tests with increasing average duration

#### Ignored

- **Currently Ignored** — Tests with most recent execution skipped
- **Mostly Ignored** — Tests with highest skipped rate

## Test Explorer Metrics

{% hint style="info" %}
Use **Explorer Settings** to exclude or include certain samples from the metric calculations.
{% endhint %}

{% hint style="info" %}
You can choose the visible columns and sorting by tweaking **Table Settings.**
{% endhint %}

### Value Metrics vs Impact Metrics

Metrics like **Duration Impact**, **Flakiness Impact** and **Failure Impact** measure the impact of the associated test on overall suite performance. The scores are calculated by multiplying the corresponding metric by the number of samples.

\
For example, consider two tests:

- Test A runs rarely, reported `10` samples, with a `15%` flakiness rate.
- Test B runs often, reported `40` samples, with a `5%` flakiness rate.

\
Test A Flakiness Impact is `10 x 0.15 = 1.5`

Test B Flakiness Impact is `40 x 0.05 = 2`

Test B has a higher Flakiness Impact because it affects the overall test suite flakiness more, although its rate is lower.

In short, a test that’s a little flaky but runs a lot can be a bigger problem than a very flaky test that rarely runs. The actual number doesn’t matter on its own — it’s just useful to compare tests and see which ones are dragging down reliability the most.

### Duration

The average execution time **for fully completed tests**, excluding cancelled or skipped tests executions.

### Duration Impact

Duration Impact measures how much total time a test contributes to the overall runtime of the test suite. It’s not just about how long a test takes per run, but also how often it runs.

`Duration Impact = Avg.Duration × Executions`

The raw number isn’t important on its own — it helps prioritize which tests are the biggest time sinks across all runs.

### Duration Trend

Duration Trend shows how a test's average duration has changed between two equal time periods — for example, the last 30 days compared to the previous 30 days.

A positive value means the test is taking longer to run than before; a negative value means it's running faster. This metric helps identify tests whose performance is improving or degrading over time.

### Failure Rate

It measures the percentage of times a test fails when it is executed and provides insights into its reliability and stability. A higher failure rate may indicate potential issues or bugs within the test or the system under test.

### Failure Impact

Failure Impact measures how much a test contributes to the total number of failures in your test suite — combining how often it runs with how likely it is to fail. It’s calculated as:

`Failure Impact = Failure Rate × Executions`

This metric helps you spot which tests are the most significant contributors to failure noise, even if their failure rate isn’t high.

### % Failure Trend

% Failure Trend shows how a test’s failure rate has shifted between two periods — the current period (e.g., last 30 days) and the previous period of the same length.

\
A positive value means the test is failing more often than before; a negative value means it’s failing less often. This metric helps identify tests whose reliability is improving or degrading over time.

The trend is displayed only if it exceeds 1%, to filter out insignificant fluctuations.

### Flakiness Rate

It measures the percentage of times a test produces inconsistent pass/fail results. Analyzing the Flakiness Rate metric allows users to focus on improving the reliability and stability of flaky tests, reducing false positives or negatives, and enhancing the overall trustworthiness of the test suite.

### **Flakiness Impact**

Quantifies how much a test’s flakiness impacts the overall stability of your test suite. It combines how often a test runs with how flaky it is, giving a sense of how much the test is likely to cause inconsistencies or unreliable results. A test that runs frequently with a low flakiness rate could cause more issues overall than a test that rarely runs but is highly flaky.

`Flakiness Impact = Flakiness Rate × Executions`

### % Flaky Trend

% Flaky Trend shows how a test’s flakiness has changed between two equal time periods — for example, the last 30 days compared to the previous 30 days.

A positive value means the test is becoming more flaky (less reliable), while a negative value means its stability has improved.

The trend is displayed only if it exceeds 1%, to ignore minor, statistically insignificant variations.

### % Ignored

Measures the percentage of times a test was skipped or ignored (e.g., using `test.skip()` in Playwright). This metric helps identify tests that are frequently being skipped and may need attention — either to fix underlying issues or to clean up obsolete test cases.

### Executions

How many recordings were included for calculating the metrics — i.e. matched the period and the filters.

### Recent Runs

A visual sparkline showing the outcomes of the most recent test executions. Each bar represents a single execution, color-coded by outcome (passed, failed, flaky). This provides a quick visual overview of the test's recent stability without needing to examine detailed metrics.

### Recent Status

Displays the outcome of the most recent test execution along with a timestamp showing when it was last seen. This helps quickly identify tests that are currently failing or have become flaky in recent runs.

## Customization

Only test recordings that match the active filters are included in the metric calculations.

- **Date Range** - include items recorded within the specified period.
- **Tag** - include items with the matching [playwright-tags.md](../../guides/playwright-tags.md "mention").
- **Author** - include items with the matching Git Author (see [commit-information.md](../runs/commit-information.md "mention")).
- **Branch** - include items with the matching Git Branch (see [commit-information.md](../runs/commit-information.md "mention")).
- **Group** - include items recorded for a particular group (e.g. `Firefox` or `Chromium`).
- **Search by spec name** - narrow down the results by test spec name.
- **Search by test title** - narrow down the results by test title.

### Outcome Filters

Use the outcome filter buttons to filter the test list by the most recent test status:

- **All** — Show all tests regardless of their current status
- **Passing** — Show only tests that are currently passing
- **Failing** — Show only tests that are currently failing
- **Flaky** — Show only tests that have exhibited flaky behavior
- **Ignored** — Show only tests that are currently being skipped or ignored

These filters work in combination with the other filters and presets to help you focus on specific subsets of your test suite.

## Controls & Settings

- Click on a column header to sort the tests by the corresponding column, and then click again to change the sorting order.
- Click on the **Export** <img src="../../.gitbook/assets/currents-2025-04-17-23.49.35@2x.png" alt="" data-size="line"> icon to download the data in JSON format

#### Table Settings

The Table Settings panel controls how data is presented in the Test Explorer view. Use these options to customize visible columns, sorting order, and the number of test cases displayed per page

- Columns — choose which metrics or data fields are shown in the Test Explorer table
- Sorting — select the metric or column used to sort test results. Click the sort direction icon to toggle between ascending and descending order.
- Page Size — set how many test cases are displayed per page in the Test Explorer view.

#### Metrics Settings&#x20;

Click on the **Settings** <img src="../../.gitbook/assets/currents-2025-04-17-23.49.20@2x.png" alt="" data-size="line"> icon to customize how the metrics are calculated.

<figure><img src="../../.gitbook/assets/Screenshot 2026-01-19 at 18.17.59.png" alt="Customize Test Metrics"><figcaption><p>Customize Test Metrics</p></figcaption></figure>

The Customize Test Metrics view lets you define which test outcomes are included when calculating performance and reliability metrics such as Executions, Duration, Flakiness Rate, and Failure Rate.\
These settings control how Currents interprets test results and determine which runs contribute to aggregated statistics in Test Explorer and other analytics views.

- Executions — specifies which test outcomes are counted toward total execution numbers. This affects all metrics that depend on the execution count.
- Duration — defines which outcomes are included when calculating the average test duration.\
  For example, you can choose whether to include failed or skipped tests when computing the average runtime.
- Flakiness Rate — determines which outcomes are used when calculating flakiness: Flakiness Rate = (Number of flaky results) ÷ (Selected results). Adjusting the filter changes which test results are considered “eligible” for flakiness detection.
- Failure Rate — controls which outcomes are used when calculating failure rate: Failure Rate = (Number of failed results) ÷ (Selected results). By refining the selection, you can exclude irrelevant outcomes (e.g., skipped runs) from reliability calculations.

## **Individual Test Analysis**&#x20;

Clicking on a test title reveals a dedicated view of the specific test's performance, including a detailed **History of Executions**, **Performance Metrics** and **Top Errors** analysis.

<figure><img src="../../.gitbook/assets/Screenshot 2026-01-19 at 18.20.43.png" alt=""><figcaption><p>History - Test Explorer</p></figcaption></figure>

Use Metrics tab to analyze the test health trends.

<figure><img src="../../.gitbook/assets/Screenshot 2026-01-19 at 18.22.36.png" alt=""><figcaption><p>Test Performance Overview</p></figcaption></figure>

See the [reference.md](reference.md "mention") section for more details on the **Performance Charts and History** of the tests.
