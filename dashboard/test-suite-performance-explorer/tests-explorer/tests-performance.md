---
description: Advanced Analysis for Individual Tests
---

# Tests Performance

## Individual Test View

After choosing a particular test, users can analyze its behaviour over time to identify issues that may require optimization or investigation. These [**metrics**](./#metrics-description) include [**Average Duration**](./#duration), [**Duration x Samples**](./#duration-x-samples), [**Failure Rate**](./#failure-rate)**,** [**Failure Rate x Samples**](./#failure-rate-x-samples), [**Flakiness Rate**](./#flakiness-rate), [**Flakiness Rate x Samples**](./#flakiness-rate-x-samples).

By providing these metrics, the Tests Explorer feature can help users identify patterns and trends in their test execution history and make data-driven decisions to improve the reliability and efficiency of testing processes.

{% embed url="https://www.loom.com/share/d2541d9d0d3844c3a61ce25503ab0eac?hideEmbedTopBar=true.&hide_owner=true&hide_share=true&hide_title=true" %}
Zoom into one Test metrics
{% endembed %}

## Controls Overview

The Individual Test view allows users to sort and filter tests by [**dates**](./#dates)**,** [**tags**](./#tags)**,** [**authors**](./#authors), and [**branches**](./#branches). Only test recordings matching the filters will be included in the graphs and the metrics calculations.&#x20;

## Charts Overview

Upon selecting a specific date from the timeline on one of the graphs, all the metrics will be displayed for that date. It allows users to examine the correlation between the metrics and any possible issues they may reveal.&#x20;

For example, let's examine the test analyzed in the video above. During the analysis, it is observed a notable peak in the [**Average Duration**](./#duration) of this test, which coincided with the highest  [**Failure Rate**](./#failure-rate) recorded on the same day. This situation suggests a potential relationship between the duration of the test executions and the occurrence of failures.

Furthermore, the [**Passed Duration**](tests-performance.md#passed-duration) and [**Non-flaky Duration**](tests-performance.md#non-flaky-duration) executions primarily influenced the increased average duration. Although these executions were classified as successful and non-flaky, they contributed to a more prolonged test duration.

## Executions History

The Executions History feature displays tests histograms with data for a specific time. Users can interact with the histograms using a brush tool, allowing them to zoom in and focus on a particular period of interest.

### Histograms

Users can choose from various histogram types to visualize different aspects of the data. There are six options available, providing users with a comprehensive set of [**metrics**](./#metrics-description): [**Overall Executions**](./#executions)**,** [**Average Duration**](./#duration), [**Passed Duration**](tests-performance.md#passed-duration)**,** [**Non Flaky Duration**](tests-performance.md#non-flaky-duration)**,** [**Failure Rate**](./#failure-rate)**,** [**Flakiness Rate**](./#flakiness-rate)**.**

Users can also choose to organize the executions by branch using the "Collapse branch" flag. This allows for a more organized view of the data, grouped by the branches.

#### **Passed Duration**

The Passed Duration histogram displays the distribution of durations for the test executions that have passed. It provides insights into the time taken for successful test runs. This information can be valuable in understanding the typical duration for successful tests and identifying any outliers or patterns that may require further investigation.

#### Non-Flaky Duration

The Non-Flaky Duration histogram represents the durations of test executions that do not exhibit flakiness. This histogram focuses on the durations of executions that consistently yield reliable and consistent results. It helps understand the average time taken for non-flaky test executions and provides a baseline for comparison with the overall duration histogram.

### Executions Timeline

The Tests Execution History feature organizes every test execution in a timeline format, where colors represent their respective execution status (<mark style="color:red;">**Failed**</mark>, <mark style="color:blue;">**Passed**</mark>**,** and <mark style="color:purple;">**Flaky**</mark>) that the users can filter. Each test execution entry provides users with essential information such as the date, time, duration, branch, commit message, and author. Additionally, for failed tests, the feature presents an error preview.

Moreover, the feature presents the **top errors** and the **top flaky errors** encountered, which shows a detailed view of the most frequently occurring errors from failed and flaky tests. Also, the Explorer has the Executions History, where users can zoom into a specific period and analyze various metrics related to their runs.&#x20;

Within the Execution History, you can **'Pin' branches** by clicking on the currently displayed branches or entering a custom name. This action allows you to freeze a specific branch while navigating the execution history.

{% embed url="https://www.loom.com/share/6b1f630932be473ba578f6a1c288f318?hideEmbedTopBar=true.&hide_owner=true&hide_share=true&hide_title=true" %}
Executions History - Tests
{% endembed %}

In general, the Tests Execution History feature empowers users with a timely analysis of the metrics and executions linked to each test to enhance the troubleshooting process.
