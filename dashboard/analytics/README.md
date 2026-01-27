---
description: Test and Run Insights and Analytics Guide
icon: chart-mixed
---

# Analytics

Use Insights to explore the aggregated metrics related to your test suite performance:

* changes and trends in duration and success rate of your builds and tests over time,
* test suite flakiness and stability.

<figure><img src="../../.gitbook/assets/Adobe Express - Screen Recording 2026-01-19 at 19.10.34.gif" alt=""><figcaption></figcaption></figure>

## Customization

Customize the reports by applying various filters for a more focused and meaningful insights.

All charts support filtering by **tag**, **git author**, and **git branch**. In addition:

* **Run Size**, **Test Results**, and **Test Flakiness** charts also support the **group** filter.
* **Test Results** and **Test Flakiness** charts also support the [playwright-annotations.md](../../guides/playwright-annotations.md "mention") filter.
* **Test Results** also supports displaying custom metrics from [#annotation-custom-metrics](../../guides/playwright-annotations.md#annotation-custom-metrics "mention")

The aggregated metrics are based in the samples collected during the selected **Date Range**.

## Analytic Charts

Explore detailed documentation for each chart:

* [run-status.md](run-status.md "mention") - Distribution of run outcomes over time
* [run-duration.md](run-duration.md "mention") - Average duration of fully reported runs
* [run-completion.md](run-completion.md "mention") - Distribution of runs by completion status
* [run-size.md](run-size.md "mention") - Maximum specs/tests per run
* [test-results.md](test-results.md "mention") - Distribution of test outcomes
* [test-flakiness.md](test-flakiness.md "mention") - Flaky test distribution over time
* [suite-size.md](suite-size.md "mention") - Track test suite composition changes
