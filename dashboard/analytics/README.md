---
description: Visualize test suite trends, track performance metrics, and identify patterns over time
icon: chart-mixed
---

# Analytics

Analytics Section provides a comprehensive view of your test suite health through interactive charts and trend analysis. Monitor key metrics to understand how your tests perform over time and make data-driven decisions about your testing strategy.

- **Performance trends** — Track duration and success rates across builds
- **Stability insights** — Identify flaky tests and monitor reliability
- **Growth tracking** — Observe how your test suite evolves over time

## Charts

Explore the avaiable charts:

- [run-status.md](run-status.md "mention") - Distribution of run outcomes over time
- [run-duration.md](run-duration.md "mention") - Average duration of fully reported runs
- [run-completion.md](run-completion.md "mention") - Distribution of runs by completion status
- [run-size.md](run-size.md "mention") - Maximum specs/tests per run
- [test-results.md](test-results.md "mention") - Distribution of test outcomes
- [test-flakiness.md](test-flakiness.md "mention") - Flaky test distribution over time
- [suite-size.md](suite-size.md "mention") - Track test suite composition changes

## Examples

Here are some practical ways to use Analytics to answer common questions about your test suite.

### Investigating a Spike in Test Failures

When you notice an increase in failed tests:

1. Use **Test Results** filtered by the affected **Git Branch**
2. Compare the **Success Rate** before and after the suspected change
3. Cross-reference with **Test Flakiness** to distinguish between genuine failures and flaky tests
4. Filter by **Git Author** to identify if specific commits correlate with the increase

### Tracking Test Suite Growth Over a Quarter

For sprint retrospectives or quarterly reviews:

1. Open **Suite Size** with a 3-month date range
2. Use the **Rolling Presence** smoothing to see stable growth trends
3. Group by **Tag** to see which feature areas are getting more test coverage
4. Export to **CSV** for inclusion in team reports

### Comparing Test Performance Across Browsers

To identify browser-specific performance issues:

1. Open **Run Duration** and filter by **Group** (e.g., Chromium, Firefox, WebKit)
2. Compare average durations to spot slower browsers
3. Check **Test Flakiness** grouped by browser to identify stability differences
4. Use this data to prioritize browser-specific optimizations

## Customization

All charts can be filtered to focus on specific subsets of your data. Use the **Date Range** selector to define the time period for aggregation.

### Common Filters

Available on all charts:

| Filter         | Description               |
| -------------- | ------------------------- |
| **Tag**        | Filter by Playwright tags |
| **Git Author** | Filter by commit author   |
| **Git Branch** | Filter by branch name     |

Some charts support extra filtering options:

| Filter                     | Available On                           |
| -------------------------- | -------------------------------------- |
| **Group**                  | Run Size, Test Results, Test Flakiness |
| **Playwright Annotations** | Test Results, Test Flakiness           |
| **Custom Metrics**         | Test Results                           |

{% hint style="info" %}
Learn more about annotations and custom metrics in the [playwright-annotations.md](../../guides/playwright-annotations.md "mention") guide.
{% endhint %}

## Trend Lines

Enable trend lines to visualize patterns and smooth out day-to-day variations in your data.

| Option             | Description                                                       |
| ------------------ | ----------------------------------------------------------------- |
| **None**           | Display raw data points without trend analysis                    |
| **Linear**         | Fit a straight line showing the overall direction of your metrics |
| **Moving Average** | Smooth fluctuations by averaging values over a rolling window     |

Trend lines help identify long-term patterns that may be obscured by daily noise, making it easier to spot gradual improvements or regressions in your test suite performance.

## Export

Export chart data for further analysis or reporting. Click the export button on any chart to access these options:

| Format   | Description                                        |
| -------- | -------------------------------------------------- |
| **CSV**  | Download raw data as a spreadsheet-compatible file |
| **JSON** | Download structured data for programmatic use      |

Exported data includes all applied filters and the selected date range.
