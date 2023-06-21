---
description: Advanced Execution Analysis through Dynamic Histograms
---

# Executions History - Tests

The Executions History feature displays tests histograms with data for a specific time. Users can interact with the histograms using a brush tool, allowing them to zoom in and focus on a particular period of interest.

## Histogram Types

Users can choose from various histogram types to visualize different aspects of the data. There are six options available, including:

1. **Flakiness Rate:** This histogram type shows the frequency of executions that exhibit flakiness, which refers to inconsistent or unreliable results.
2. **Average Duration:** This histogram type displays the average time taken for executions within the selected period.
3. **Passed Duration:** This histogram type represents the duration of executions that have passed successfully within the chosen timeframe.
4. **Non-Flaky Duration:** This histogram type shows the duration of executions that are not considered flaky, meaning they consistently produce the same result.
5. **Failure Rate:** This histogram type illustrates the frequency of executions that have failed within the specified time range.
6. **Flakiness Rate:** This histogram type provides the frequency of executions that exhibit flakiness.

{% embed url="https://www.loom.com/share/6b1f630932be473ba578f6a1c288f318?hideEmbedTopBar=true.&hide_owner=true&hide_share=true&hide_title=true" %}
Executions History - Tests
{% endembed %}

### Filters and Controls

Users have the option to filter the executions based on their [status](../../../tests/test-status.md), including Failed, Passed, Skipped, Ignored, and Flaky. They can also choose to organize the executions by branch using the "Collapse branch" flag. This allows for a more organized view of the data, grouped by the branches.

Overall, the Executions History feature allows users to analyze and visualize their tests execution data in a customizable way.
