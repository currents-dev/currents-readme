---
description: Explore historical Playwright and Cypress tests performance with Test History
---

# Test History

### Test History overview

Test History helps you to review the historical performance of individual tests across different runs and branches.

{% embed url="https://www.loom.com/share/fea3d6bfdf654fd8b3db8522f9c2354d?hideEmbedTopBar=true" %}

Each individual bar represents an instance of the test. The bars are arranged in chronological order.\
Hovering over a bar displays the run’s details, and clicking on a bar opens the recorded test instance with full information.

The bars are colored as follows:

* <mark style="color:red;">red</mark> - failed
* <mark style="color:blue;">blue</mark> - passed
* <mark style="color:purple;">purple</mark> - passed but flaky
* grey - test was ignored
* <mark style="color:orange;">orange</mark> - test was skipped due to a failure

### How to access Test History?

You can access the Test History in two ways:

1. Through the **History** tab in the  [test-view.md](test-view.md "mention").&#x20;
2. Through the **History** section of the [tests-explorer.md](../test-suite-performance-explorer/tests-explorer.md "mention").

### Test History Controls

#### Time Range Filter

Filter test executions by a specific time range: 7, 14, 28, or 45 days.

#### Test State

Filter test executions by [test-status.md](test-status.md "mention").

#### Collapse Branches

Toggle "Collapse Branches" to show/collapse timelines for individual branches for more effective troubleshooting.

#### Pin Branch&#x20;

Show timelines only for selected branches.

{% hint style="info" %}
Please note: only branches detected within the fetched test instances will show up.
{% endhint %}

### FAQ

#### What instances represent the same test across different runs?

Instances with the same spec file, project and title will be considered as belonging to the same test - i.e. renaming a test or renaming a spec file will "detach" it from its history.
