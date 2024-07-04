---
description: >-
  Explore historical Playwright and Cypress tests performance with Test History
  snipper
---

# Test History

### Test History Snipper overview

Test History helps you to review the historical performance of individual tests across different runs and branches.

![Cypress test history - flaky, passed and failed instances](<../../.gitbook/assets/Kapture 2021-09-16 at 01.26.16.gif>)

Each individual dot is an instance of the test. The dots are arranged in chronological order.

Hovering over a dot will show individual run details. Clicking on a dot will open the recorded test instance and reveal its details.

The dots are coloured as follows:

* <mark style="color:red;">red</mark> - failed
* <mark style="color:blue;">blue</mark> - passed
* <mark style="color:purple;">purple</mark> - passed but flaky
* grey - test was ignored
* <mark style="color:orange;">orange</mark> - test was skipped due to a failure

### How to access Test History Snippet?

* While browsing the tests list, click the "Test History" button, this will open the Test History Snippet in Preview mode:

![Test History Preview snippet in tests list view](<../../.gitbook/assets/CleanShot 2022-02-18 at 00.56.55.png>)

* While browsing Test Details view, the full Test History Snippet is shown at the top of the view.

![Test History Snippet in Test Details view](<../../.gitbook/assets/CleanShot 2022-02-18 at 01.03.20.gif>)

### Test History Snippet Controls

#### Show Items

Set the number of test instances to fetch - that includes past and future runs, we'll try to fetch an equal number of future and past instances.

{% hint style="info" %}
**Please note:** "Show Items" control is hidden for Preview mode and shows only 10 items.
{% endhint %}

#### Collapse Branches

Toggle "Collapse Branches" to show/collapse timelines for individual branches for more effective troubleshooting.

#### Branch Filter

Show timelines only for selected branches.

{% hint style="info" %}
Please note: only branches detected within the fetched test instances will show up.
{% endhint %}

### FAQ

#### What instances represent the same test across different runs?

Instances with the same spec file, project and title will be considered as belonging to the same test - i.e. renaming a test or renaming a spec file will "detach" it from its history.
