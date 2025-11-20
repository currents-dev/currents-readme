---
description: Structured view of tests executed within each spec file.
---

# Test View

For each spec file, the Dashboard displays a list of executed tests **along with insights into their execution**. To analyze a specific test:

**Select the run → Open the “Spec Files” tab → Choose a spec file from the list → Select any test from the test list.**

When you select a test, you can view the[run-details.md](run-details.md "mention")and access advanced features such as [#attempts](test-view.md#attempts "mention")**,** [#console](test-view.md#console "mention"), [#metrics](test-view.md#metrics "mention"), [#history](test-view.md#history "mention"), [#top-errors](test-view.md#top-errors "mention"), [#annotations](test-view.md#annotations "mention") **and** [#visual-diff](test-view.md#visual-diff "mention").

<div data-with-frame="true"><figure><img src="../../.gitbook/assets/Screenshot 2025-11-18 at 16.57.12.png" alt=""><figcaption><p>Test View</p></figcaption></figure></div>

## Attempts

For every test attempt, the Dashboard provides the following details:

* **Error Details:** For <mark style="color:red;">**Failed tests**</mark>, the details include the error message and the exact line in the source code (Spec File) where the failure occurs.
* **Screenshots:** Images captured during test execution.
* **Videos:** Full test run recordings.
* **Traces:** Available to open directly in the Playwright Trace Viewer or download.
* **Test Steps:** Detailed test-level analysis . See more at [step-level-reporting.md](../../guides/parallelization-guide/step-level-reporting.md "mention").
* **Visual Diff:** Available when enabled the [playwright-visual-testing.md](../../guides/playwright-visual-testing.md "mention").
* **Attachments:** Any additional files associated with the test.

{% embed url="https://www.loom.com/share/c1564ee3c4cb497db4b464143ed9bcfe?hideEmbedTopBar=true" %}
Test View - Attempts
{% endembed %}

For [flaky-tests.md](flaky-tests.md "mention"), there will be at least one <mark style="color:red;">**Failed**</mark>  attempt and one <mark style="color:$success;">**Passed**</mark> attempt. Both show detailed information such as screenshots, videos, traces, test steps, visual diffs, and attachments. **Error details are only shown for failed attempts.** Passed attempts will show the message "**No failures detected**".&#x20;

{% embed url="https://www.loom.com/share/eb16e8d9f28e49fd92b2160aa6c28d9e?hideEmbedTopBar=true" %}
Flaky Tests - Attempts&#x20;
{% endembed %}

## **Console**&#x20;

The Playwright console displays each test attempt’s result, including timestamps, expected status, and Currents recording URL, along with any error details. See more details on [#console-output](test-status.md#console-output "mention").

<div data-with-frame="true"><figure><img src="../../.gitbook/assets/Screenshot 2025-11-19 at 16.27.12.png" alt=""><figcaption><p>Console Output - Test View</p></figcaption></figure></div>

## **Metrics**

The Metrics tab provides a summary of the six key metrics available in the Test Explorer:&#x20;

* **By Flakiness, Status:** Failed Duration vs. Passed Duration and Flaky Duration vs. Non-Flaky Duration.
* **Compared to the Previous Period**: Executions, Avg. Duration, Flakiness Rate and Failure Rate.

For more information on these metrics and how the performance charts work, please check [#test-explorer-metrics](../test-suite-performance-explorer/tests-explorer.md#test-explorer-metrics "mention") and [#performance-charts](../test-suite-performance-explorer/reference.md#performance-charts "mention").

<div data-with-frame="true"><figure><img src="../../.gitbook/assets/Screenshot 2025-11-19 at 16.30.38.png" alt=""><figcaption><p>Test View - Metrics</p></figcaption></figure></div>

## **History**

The History tab displays a timeline of test executions, organized chronologically and filterable by branch, history range, and test status. For additional details, refer to [test-history.md](test-history.md "mention").

<div data-with-frame="true"><figure><img src="../../.gitbook/assets/Screenshot 2025-11-19 at 17.16.34.png" alt=""><figcaption><p>Test View - History</p></figcaption></figure></div>

## **Top Errors**

The top errors display the most frequent issues over the past days, with filters for 7, 14, 28, or 45 days. For every error, the Dashboard displays:

* The error message associated with the test failure.
* The number of previous executions where the failure was encountered.
* Chronologically sorted list of the most recent test executions affected by this error. Affected test executions are those that have failed or flaked because of this error.

The Top Errors view also shows some metrics related to each error:

* **Failures**: The number of failed test executions associated with this error. A failed test can have multiple related errors.
* **Failure Ratio**: Proportion of the test failures associated with this error.
* **Flaky**: The number of flaky test executions associated with this error. A flaky test can have multiple related errors.
* **Flakiness Ratio:** Proportion of flaky test executions associated with this error. A flaky test can have multiple related errors.

{% embed url="https://www.loom.com/share/3fb95ab6d4ab425181ffc915c2eaef6f?hideEmbedTopBar=true" %}



## **Annotations**

Display additional test-related information added through [playwright-annotations.md](../../guides/playwright-annotations.md "mention"), including ownership details, metadata, links to external resources such as Jira tickets or GitHub issues, and any relevant notes.&#x20;

## **Visual Diff**

Display visual testing outputs generated by Playwright’s native visual comparison features or by third-party tools such as Argos, Applitools, or Percy. See more details at [playwright-visual-testing.md](../../guides/playwright-visual-testing.md "mention").

