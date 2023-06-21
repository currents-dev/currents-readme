---
description: Holistic performance view of your Spec Files
---

# Spec Files Explorer

The Spec Files Explorer feature allows users to sort and analyze spec files based on the executions recorded during the provided date range and specific metrics to detect inconsistencies or challenging spec files that may require further examination.&#x20;

By providing detailed descriptions in each of these sections - [Controls Description](./#controls-description), [Metrics Description](./#metrics-description), [List Item Description](./#list-item-description), and [Use Cases](./#use-cases) - users can gain a comprehensive understanding of the feature, its components, and how they can leverage it to perform advanced analysis and gain valuable insights from their spec file executions.

{% embed url="https://www.loom.com/share/4abfc015a38446c3b63b6242986ca967?hideEmbedTopBar=true.&hide_owner=true&hide_share=true&hide_title=true" %}
Spec Files Explorer
{% endembed %}

## Controls Overview

The Explorer feature allows users to sort and filter spec files by dates, tags, author, branch, and filename. Only the Spec File recordings matching the filters will be included in the list and the metrics calculations. The detailed filters and controls are explained below.

### **Dates**

By adjusting the date range, users can narrow their analysis to a particular timeframe, such as a week, a month, or a custom range. As users modify the dates, the spec files will be automatically organized and filtered accordingly. The detailed filters and controls are explained below.

### Show Items

Users can configure the number of spec files displayed per page. They can set up to 100 items; the default setting is 20.

### Order by

The feature provides [five metrics](./#metrics-description) to order the spec files, explained in detail in the following section.

### Tags

If users classify their runs using [Tags](https://currents.dev/readme/runs/run-details#run-tags), they can filter the Spec Files with the tagged runs. This feature lets users quickly focus their analysis on a specific subset of Spec Files that share common characteristics or attributes defined by the tags.

### Author

Users also can filter spec files based on the author of the spec file. This allows test managers to track the performance and results of spec files contributed by different authors, helping to identify any variations in quality, efficiency, or issues introduced by specific authors.

### Branches

Users can filter the spec files based on the branch they belong to. This helps in comparing and evaluating the behavior of different branches, enabling users to identify any specific issues or patterns within each branch.

## Metrics Description

The metrics provided by the Spec Files Explorer offer valuable insights into the performance and characteristics of the spec file executions, enabling users to identify areas that can be optimized and improved. The metrics are analyzed and presented below.

### **Duration**

It determines the average duration of fully completed spec files and excludes spec files that timed out or canceled during execution. Moreover, the feature provides an option to exclude or include failed executions in the list of spec files and duration calculation, which can be toggled with a flag at the top right of the list panel.

### **Failure Rate**

The failure rate represents the percentage of spec file executions that failed during the selected period. It indicates the proportion of spec files that did not pass or encountered issues during execution.&#x20;

### **Timeout Rate**

The timeout rate measures the percentage of spec file executions that timed out during a specific time period. It reveals the frequency at which spec files exceeded their allowed time limit for execution.

### **Flakiness Rate**

The flakiness rate represents the percentage of spec file executions that exhibited flakiness in their tests during the selected period. [Flakiness](./#flakiness-rate) refers to inconsistent or unreliable test results, where the same test may pass or fail under similar conditions.

### **Suite Size**

The suite size refers to the number of tests present in a spec file. It indicates a test suite's overall size or complexity within a spec file.

## List Item Description

The Spec Files Explorer displays a list of spec file names along with the five calculated metrics beneath each spec file. To facilitate sorting and filtering, the Explorer highlights the metric used on the right side. This visual indicator allows users to quickly identify the metric based on which the list is currently organized. As a result, the feature offers users a comprehensive and convenient way to analyze and compare spec files.

## Use Cases

Overall, this feature offers greater flexibility and customization in test management, empowering users to enhance their testing performance and efficiency and facilitating the identification of determined issues on spec files, for example:

* The flakiest Spec Files from the last days for a specific branch.
* The Failure Rate change for specific branches for the past months.
* The lowest Spec Files and how they changed their duration over time.
* The Spec Files that experienced the most timeouts in the past weeks.
