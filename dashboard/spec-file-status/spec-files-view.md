---
description: Structured view of spec file executions, tests, metrics, and history.
---

# Spec Files View

For every run, the Dashboard displays a list of executed spec files. To analyze a specific run:\
**Select the run** → **Choose the “Spec Files” tab** → **Select any spec file from the list**.

When selecting a Spec File, users can view the [run-details.md](run-details.md "mention") and access advanced features such as [spec-files-explorer.md](../test-suite-performance-explorer/spec-files-explorer.md "mention"), the list of [**Tests**](spec-files-view.md#tests), [**Console**](spec-files-view.md#console), [**Metrics**](spec-files-view.md#metrics), and [**History**](spec-files-view.md#history).

{% embed url="https://www.loom.com/share/ac07a738cc594d56b24323f059e5d2d7?hideEmbedTopBar=true&sid=40358c18-80a6-4f7b-8a11-ba6c890bc07c" %}

## Tests

The list of tests in the Spec Files View includes the [test-status.md](../tests/test-status.md "mention"), the number of attempts, start and end timestamps, duration, number of [playwright-annotations.md](../../guides/playwright-annotations.md "mention"), test owners, and direct access to the test artifacts such as screenshots, videos, traces, and visual diffs (if you have enabled the [playwright-visual-testing.md](../../guides/playwright-visual-testing.md "mention")).

{% embed url="https://www.loom.com/share/db2cc9ac608d4d03852c6bd712238ea7?hideEmbedTopBar=true" %}

#### Filters and Controls

The test list can be sorted by **Status**, **Test Title**, **Duration**, **Start Time**, and **Finish Time**.  It can also be filtered by [playwright-annotations.md](../../guides/playwright-annotations.md "mention") and [test-status.md](../tests/test-status.md "mention") to help narrow down the results.

{% embed url="https://www.loom.com/share/f7f570abd144429299084f355863c977?hideEmbedTopBar=true" %}

## **Console**&#x20;

The Playwright console output displays the result of each test attempt, along with relevant details such as the start and end timestamps, expected status, and the recording URL in Currents.&#x20;

In case of errors, it provides the error details for each individual attempt. See more details on [#console-output](../tests/test-status.md#console-output "mention").

{% embed url="https://www.loom.com/share/155413958bb6438f9b4989e6bbe0ac4a?hideEmbedTopBar=true" %}

### **Metrics**

The Metrics tab provides a summary of the six key metrics available in the Spec File Explorer: Average Duration, Overall Executions, Suite Size, Failure Rate, Flakiness Rate, and Timeout Rate.\
For more information on these metrics and how the performance charts work, please check [#spec-files-explorer-metrics](../test-suite-performance-explorer/spec-files-explorer.md#spec-files-explorer-metrics "mention") and [#performance-charts](../test-suite-performance-explorer/reference.md#performance-charts "mention").

<div data-with-frame="true"><figure><img src="../../.gitbook/assets/Screenshot 2025-10-10 at 17.07.22.png" alt=""><figcaption><p>Spec Files View - Metrics</p></figcaption></figure></div>

### **History**

The History tab presents a timeline of test executions within the Spec File. For additional details, refer to [#history](../test-suite-performance-explorer/reference.md#history "mention").

<div data-with-frame="true"><figure><img src="../../.gitbook/assets/Screenshot 2025-10-10 at 17.07.45.png" alt=""><figcaption><p>Spec Files View - History</p></figcaption></figure></div>
