---
description: Holistic performance view of your Tests
---

# Tests Explorer

The Tests Explorer feature provides valuable insights into the testing suite performance, allowing users to sort and examine tests to identify and track tests that may require further investigation based on the following metrics:

1. **Duration**: The time taken for a test to execute. Users can identify the longest-running tests, which may need optimization for faster test execution.
2. **Duration x Sample**: It is similar to duration but considers the number of times the test has been run.
3. **Failure Rate:** It measures the percentage of times a test fails when it is executed.&#x20;
4. **Failure Rate x Sample**: Similar to the duration x sample metric, it considers the number of times the test has been run.&#x20;
5. **Flakiness Rate**: It measures the percentage of times a test produces an inconsistent pass/fail results.&#x20;
6. **Flakiness Rate x Sample**: Similar to the other x sample metrics, it considers the number of times the test has been run.&#x20;

The feature helps users identify problematic tests with high flakiness, long duration, or high failure rates. In addition, this feature allows users to sort and filter tests based on various criteria, including tags, author, branch, filename, and test title. This provides a more flexible and customizable approach to test management, enabling users to optimize their testing performance and efforts.

### Duration / Duration x Samples

For the **Duration** and **Duration x Sample** metrics, the tool provides an option to exclude or include failed executions in the list of tests, which can be toggled with a flag at the top right of the list panel.

{% embed url="https://www.loom.com/share/3faec47146884488a414e763a222abae?hideEmbedTopBar=true.&hide_owner=true&hide_share=true&hide_title=true" %}
Tests Explorer
{% endembed %}

After choosing a particular test, users can analyze its behaviour over time to identify issues that may require optimization or investigation based on the following metrics:

1. **Failed Duration vs. Passed Duration**: It compares the total duration of failed tests to the total duration of passed tests.
2. **Flaky Duration vs. Non-Flaky Duration**: It compares the total duration of flaky tests (tests that fail intermittently) to the total duration of non-flaky tests.&#x20;
3. **Executions**: It counts the total number of times each test was executed.&#x20;
4. **Average Duration**: It calculates the average duration of each test over time.
5. **Flakiness Rate**: It calculates the percentage of tests that are flaky (fail intermittently) out of the total number of tests executed over time.
6. **Failure rate**: It calculates the percentage of failed tests from the total number of tests executed over time.

Upon selecting a specific date from the timeline on one of the graphs, all the metrics will be displayed for that date. It allows users to examine the correlation between the metrics and any possible issues they may reveal. The Explorer also presents the top errors encountered and the execution history, where users can zoom into a specific period and analyze various metrics related to their runs.

{% embed url="https://www.loom.com/share/d2541d9d0d3844c3a61ce25503ab0eac?hideEmbedTopBar=true.&hide_owner=true&hide_share=true&hide_title=true" %}
Zoom into one Test metrics
{% endembed %}

By providing these metrics and views, the Tests Explorer feature can help users identify patterns and trends in their test execution history and make data-driven decisions to improve the reliability and efficiency of testing processes.
