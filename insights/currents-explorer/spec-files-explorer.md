---
description: Holistic performance view of your Spec Files
---

# Spec Files Explorer

The Spec Files Explorer feature allows users to sort and analyze tests based on specific metrics to detect inconsistencies or challenging spec files that may require further examination. These metrics include:

1. **Duration**: The time taken for spec files to execute.&#x20;
2. **Failure Rate**: The percentage of spec file executions that failed during the selected time.
3. **Timeout Rate**: The percentage of spec files timed out during a specific time.&#x20;
4. **Flakiness Rate**: The percentage of spec file executions that exhibited flakiness during the selected time.
5. **Suite Size:** The number of tests in the spec files.

This feature helps identify the most problematic spec files, such as those with high flakiness, long duration, or high failure rates, during a specific period. In addition to the metrics previously mentioned, the Explorer feature allows users to sort spec files by tags, author, branch, and filename.&#x20;

For the **Duration** metric, the tool provides an option to exclude or include failed executions in the list of spec files, which can be toggled with a flag at the top right of the list panel.

{% embed url="https://www.loom.com/share/4abfc015a38446c3b63b6242986ca967?hideEmbedTopBar=true.&hide_owner=true&hide_share=true&hide_title=true" %}
Spec Files Explorer
{% endembed %}

After choosing a particular spec file, users can analyze its behavior over time through six graphs that display the following metrics:

1. **Average Duration:** The average time executing a spec file.&#x20;
2. **Overall duration:** The total time it takes to run a suite of tests from start to finish.&#x20;
3. **Suite size:** The number of tests in the spec files.
4. **Failure rate:** The percentage of spec file executions that failed during the selected time.
5. **Flakiness rate:** The percentage of spec file executions that exhibited flakiness during the selected time.
6. **Timeout Rate:** The percentage of spec files timed out during a specific time.&#x20;

Upon selecting a specific date from the timeline on one of the graphs, all the metrics will be displayed for that date. It allows users to examine the correlation between the metrics and any possible issues they may reveal. The Explorer also presents the execution history, where users can zoom into a specific period and analyze metrics related to test runs.

{% embed url="https://www.loom.com/share/df81020abcce4de499cf9b70c4afcd01?hideEmbedTopBar=true.&hide_owner=true&hide_share=true&hide_title=true" %}
Zoom into one Spec File metrics
{% endembed %}

By providing these metrics and views, the Spec Files Explorer feature can help users identify patterns and trends in their execution history and make data-driven decisions to improve the reliability and efficiency of testing processes.\
