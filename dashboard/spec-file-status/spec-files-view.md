---
description: Structured view of spec file executions, tests, metrics, and history.
---

# Spec Files View

For every run, the Dashboard displays a list of executed spec files. To analyze a specific Spec File:\
**Select the run** → **Choose the “Spec Files” tab** → **Select any spec file from the list**.

When selecting a Spec File, users can view the [run-details.md](run-details.md "mention") and access advanced features such as [spec-files-explorer.md](../test-suite-performance-explorer/spec-files-explorer.md "mention"), the list of [**Tests**](spec-files-view.md#tests), [**Console**](spec-files-view.md#console), [**Metrics**](spec-files-view.md#metrics), and [**History**](spec-files-view.md#history).

{% embed url="https://player.mux.com/QIMhBtUTow3Y3dHtxzLJLulL02n6eYK2nS7DcsvDlvxc?min-resolution=1080p" %}

## Tests

The list of tests in the Spec Files View includes the [test-status.md](../tests/test-status.md "mention") and direct access to the test artifacts such as screenshots, videos, traces, and visual diffs (if you have enabled the [playwright-visual-testing.md](../../guides/playwright-visual-testing.md "mention")).

<div data-with-frame="true"><figure><img src="../../.gitbook/assets/Screenshot 2026-09-15 at 12.34.20.png" alt=""><figcaption></figcaption></figure></div>

#### Filters and Controls

The test list can be sorted by **Status**, **Test Title**, **Duration**, and **Start Time**. It can also be filtered by [playwright-annotations.md](../../guides/playwright-annotations.md "mention") and Tags to help narrow down the results.

{% embed url="https://player.mux.com/TsfaSPYxXnFaDL02eNvn1MIjNALxV43i8ebBLLqoo3t4" %}
Spec Files View - Filters and Controls
{% endembed %}

## **Console**

The Playwright console output displays the result of each test attempt, along with relevant details such as the start and end timestamps, expected status, and the recording URL in Currents.

In case of errors, it provides the error details for each individual attempt. See more details on [#console-output](../tests/test-status.md#console-output "mention").

<div data-with-frame="true"><figure><img src="../../.gitbook/assets/Screenshot 2026-09-15 at 13.35.02.png" alt=""><figcaption><p>Spec Files View - Console </p></figcaption></figure></div>

## **Metrics**

The Metrics tab provides a summary of the six key metrics available in the Spec File Explorer: Average Duration, Overall Executions, Suite Size, Failure Rate, Flakiness Rate, and Timeout Rate.\
For more information on these metrics and how the performance charts work, please check [#spec-files-explorer-metrics](../test-suite-performance-explorer/spec-files-explorer.md#spec-files-explorer-metrics "mention") and [#performance-charts](../test-suite-performance-explorer/reference.md#performance-charts "mention").

<div data-with-frame="true"><figure><img src="../../.gitbook/assets/Screenshot 2026-09-15 at 13.38.42.png" alt="Spec Files View - Metrics"><figcaption><p>Spec Files View - Metrics</p></figcaption></figure></div>

## **History**

The History tab presents a timeline of test executions within the Spec File. For additional details, refer to [#history](../test-suite-performance-explorer/reference.md#history "mention").

<div data-with-frame="true"><figure><img src="../../.gitbook/assets/Screenshot 2026-09-15 at 13.40.51.png" alt=""><figcaption><p>Spec Files View - History</p></figcaption></figure></div>
