---
description: Explore tests, history and performance
---

# Test Explorer

The Tests Explorer feature provides valuable insights into the testing suite performance, allowing users to sort and examine tests to identify and track tests that may require further investigation based on the executions recorded during the provided date range. The feature helps users identify problematic tests with high flakiness, long duration, or high failure rates.&#x20;

{% embed url="https://www.loom.com/share/478652179d1446b68d4b92c09e0f472e?hideEmbedTopBar=true.&hide_owner=true&hide_share=true&hide_title=true" %}
Tests Explorer
{% endembed %}

The [**Controls Overview**](./#controls-overview)**,** [**Metrics Description**](./#metrics-description)**,** [**List Item Description**](./#list-item-description), and [**Use Cases**](./#use-cases) sections offer a comprehensive understanding of the feature, its components, and how to leverage it for advanced analysis and meaningful insights from the test executions.

{% embed url="https://www.loom.com/share/3faec47146884488a414e763a222abae?hideEmbedTopBar=true.&hide_owner=true&hide_share=true&hide_title=true" %}
Tests Explorer
{% endembed %}

## Controls Overview

Test Explorer allows users to sort and filter tests based on various criteria, including [dates](./#dates), [tags](./#tags), [authors](./#author), [branches](./#branches), [filename](./#filename), and [test title](./#test-title). Only test recordings matching the filters will be included in the list and the metrics calculations. The controls available are detailed below.

### **Dates**

Users can narrow their test analysis to a particular timeframe, such as a week, a month, or a custom range by adjusting the date range. As users modify the dates, the tests will be automatically sorted accordingly.

### Show Items

Users can configure the number of tests presented per page. They can set up to 100 items; the default setting is 20.

### Order by

The feature provides [six metrics](./#metrics-description) to order the tests, explained in detail in the following section.

### Tags

If users classify their runs using [Tags](https://currents.dev/readme/runs/run-details#run-tags), they can filter the Tests with the tagged runs. This feature lets users quickly focus their analysis on a specific subset of Tests that share common characteristics or attributes defined by the tags.

### Authors

Users also can filter spec files based on the author of the test. This allows test managers to track the performance and results of tests contributed by different authors, helping to identify any variations in quality, efficiency, or issues introduced by specific authors.

### Branches

Users can filter the tests based on the branch they belong to. This helps in comparing and evaluating the behavior of different branches, enabling users to identify any specific issues or patterns within each branch.

### Filename

Users can enter a keyword or part of a Spec File name in the filter input field, and the feature will update the list to display only the tests that belong to spec files that match the provided criteria.&#x20;

### Test title

It allows users to search specific tests by entering a keyword or a partial test title in the filter input field. As a result, the feature dynamically updates the list, displaying only the tests that match the provided criteria. It eliminates the need for manual scrolling through a lengthy list.

## Metrics description

The Test Explorer metrics offer valuable insights into the test execution process, helping users identify aspects for optimization and improvement. The metrics are detailed below.

### Duration&#x20;

It calculates the average time taken for fully completed tests, excluding any tests that were canceled during execution. Users can identify the longest-running tests, which may need optimization for faster test execution.

### Duration x Samples

It considers not only the duration of a test but also the number of times the test run, providing a more comprehensive view of the test's performance over multiple executions. By combining duration with the number of samples (test runs), users can gain insights into the consistency of test execution times.

{% hint style="info" %}
For the **Duration** and **Duration x Samples** metrics, the tool provides an option to exclude or include failed executions in the list of tests, which can be toggled with a flag at the top right of the list panel.
{% endhint %}

### Failure Rate

It measures the percentage of times a test fails when it is executed and provides insights into the reliability and stability of the test. A higher failure rate may indicate potential issues or bugs within the test or the system under test.

### Failure Rate x Samples

Similar to the Duration x Samples metric, the Failure Rate x Samples metric considers the number of samples together with its failure rate. Tests consistently exhibiting a high failure rate across multiple runs may require further investigation and attention.

### Flakiness Rate

It measures the percentage of times a test produces an inconsistent pass/fail results. Analyzing the Flakiness Rate metric allows users to focus on improving the reliability and stability of flaky tests, reducing false positives or negatives, and enhancing the overall trustworthiness of the test suite.

### **Flakiness Rate x Samples**

Similar to the other "x Samples" metrics, it considers the number of times a test runs along with its flakiness rate. This metric provides a comprehensive view of the test's flakiness behavior over multiple executions.

### Executions

The overall executions metric indicates how many recordings were included in during the selected period and used for calculating the metrics.

## List Item Description

The Tests Explorer presents the list of tests, showcasing their spec file names followed by their file names, along with six calculated [metrics ](./#metrics-description)displayed below each test. The Explorer highlights the currently used metric on the right side to facilitate sorting and filtering. This visual indicator enables users to swiftly identify the metric by which the list is organized, providing users with a convenient and all-encompassing method to analyze and compare tests.

<figure><img src="../../../.gitbook/assets/Screenshot 2023-06-30 at 13.31.42.png" alt=""><figcaption><p>List Item Description</p></figcaption></figure>

## Use Cases

Overall, the Tests Explorer feature presents a seamless experience for users to explore and evaluate their tests, leveraging the power of the calculated metrics and facilitating the identification of determined issues on tests, for instance:

* The flakiest tests from the last months for a specific branch.
* The top failing tests in the suite.
* The failure rate change for specific branches for the past months.
* The lowest tests and how they changed their duration over time.

Clicking on an individual test will reveal a comprehensive drill-down of the specific test's performance, including a detailed history of execution, top errors, etc.&#x20;

This breakdown analysis is described in the [Tests Performance](tests-performance.md) section.

##
