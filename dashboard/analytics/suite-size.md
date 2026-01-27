---
description: Track changes in test suite composition over time
icon: chart-line-up
---

# Suite Size

Suite Size tracks unique tests and spec files discovered in CI runs over time, helping you monitor test suite growth and composition changes. Unlike the [run-size.md](run-size.md "mention") chart which shows the maximum tests per run, Suite Size aggregates unique tests across all runs in each period.

## Key Metrics

The Suite Size view provides three primary metrics:

* **Test Cases**: The count of unique test cases (individual test functions) executed during the selected period
* **Spec Files**: The count of unique spec files executed during the selected period
* **Delta**: Period-over-period change showing growth or reduction in your test suite

## Visualization Components

### Main Chart

A dual-axis area chart displaying:

* **Left Y-axis**: Test Cases count
* **Right Y-axis**: Spec Files count

The chart shows trends over time based on the selected date range and resolution (daily or weekly).

### Delta Chart

A bar chart showing period-over-period changes:

* **Green bars**: Positive delta (tests/specs added)
* **Red bars**: Negative delta (tests/specs removed)

### Summary Statistics

Metric cards at the top display:

* Current period values for tests and specs
* Absolute delta values compared to previous period
* Percentage change indicators

### Metrics Table

A tabular view with expandable rows showing:

* Period-by-period breakdown of test counts
* Expandable details revealing which specific tests were added or removed
* Easy identification of suite composition changes

## Smoothing Options

{% hint style="info" %}
Daily resolution without smoothing may show high variance due to partial runs, branch-specific tests, or selective test execution. Use rolling presence mode for a more stable view of your suite size.
{% endhint %}

### Raw Values Mode

Displays the actual counts of unique tests and spec files per period without any smoothing applied.

### Rolling Presence Mode

Counts unique tests and spec files seen within a rolling window:

* **Window Size**: Configurable from 1 to 14 periods (default: 3)
* **Behavior**: A test is counted if it appeared in any run within the rolling window
* **Use Case**: Provides a stable view that accounts for tests that don't run every day (e.g., scheduled tests, branch-specific tests)

## Grouping Options

Group your suite size data by different dimensions:

* **None (Aggregate)**: Shows overall metrics across all runs
* **By Tag**: Groups by Playwright tags applied to tests
* **By Branch**: Groups by Git branch
* **By Group**: Groups by test group (e.g., browser type like Firefox, Chromium)

When grouping is applied, the chart displays multiple series with a configurable limit:

* Top 3 series
* Top 5 series
* Top 10 series

## Filters

Customize your view using the available filters:

| Filter | Description |
|--------|-------------|
| **Date Range** | Select the time period to analyze |
| **Tag** | Filter by Playwright tags |
| **Git Author** | Filter by commit author |
| **Git Branch** | Filter by branch name |
| **Group** | Filter by test group |
| **Tags Operator** | AND/OR logic when multiple tags are selected |

## Use Cases

Suite Size analytics help you:

* **Monitor test suite growth**: Track how your test coverage expands over sprints or releases
* **Identify test changes**: Pinpoint exactly when tests were added or removed from your suite
* **Track coverage by segment**: Use grouping and filters to monitor test growth by branch, tag, or team
* **Detect anomalies**: Spot unexpected changes in suite composition that might indicate issues with test discovery or configuration

## Related

* [README.md](README.md "mention") - Analytics overview
* [run-size.md](run-size.md "mention") - Maximum tests per run
* [../test-suite-performance-explorer/README.md](../test-suite-performance-explorer/README.md "mention") - Explore individual test and spec file performance
