---
description: Tests and Runs insights and analytics guide
---

# Insights and Analytics

Currents Dashboard Insights allows you to analyze the behaviour and dynamics of your Playwright or Cypress test suite over time. You can use the insights to track the performance of your runs/build and tests over time and to identify the most problematic tests - most flaky and most failing - that are worth fixing.

{% embed url="https://www.loom.com/share/5e9729f553674032a5a7ce96c5786010?hideEmbedTopBar=true.&hide_owner=true&hide_share=true&hide_title=true" %}
Currents Analytics&#x20;
{% endembed %}

See the notes below to discover how specific metrics are getting calculated.

### Runs Status

Represents distribution of the outcomes of your builds/runs over time.&#x20;

![Example chart - Runs Status Insights](<../.gitbook/assets/CleanShot 2022-06-24 at 23.36.18@2x.png>)

* Overall runs - overall runs created during the selected period, regardless of their completion or the end state
* Failed runs - runs that have 1 or more failed tests. Failed runs count includes cancelled and timed-out tests.
* Passed runs - runs that have 0 failed tests. Passed runs count includes cancelled and timed-out tests.
* Pass Rate - passed runs / overall runs

### Runs Duration

Runs Duration chart represents the daily/weekly average duration of **fully reported** runs. A fully reported run is a run that wasn't cancelled and didn't time out.

**Please note** that cancelled or timed-out runs are excluded from the report.

![Example chart - Runs Duration Insights](<../.gitbook/assets/CleanShot 2022-06-24 at 23.52.48@2x.png>)

### Runs Completion

Runs Completion chart represents the distribution of runs by their completion over time.

![Example chart - Runs Completion](<../.gitbook/assets/CleanShot 2022-06-24 at 23.56.09@2x.png>)

* Overall runs - overall runs created during the selected period, regardless of their completion or the end state
* Fully reported runs -  runs that weren't cancelled and didn't time out
* Cancelled runs - see [cancel-run.md](../runs/cancel-run.md "mention")
* Timed out runs - see [run-timeouts.md](../runs/run-timeouts.md "mention")

### Spec / Tests Size Chart

Specs / Tests size chart represents the **maximum** daily/weekly amount of specs/tests for fully completed runs. A fully reported run is a run that wasn't cancelled and didn't time out.

**Please note** that cancelled or timed-out runs are excluded from the report.



![Example chart - Run Specs / Tests Size](<../.gitbook/assets/CleanShot 2022-06-25 at 00.01.00@2x.png>)

* Spec files - the **maximum** number of spec files detected in a run for the selected period
* Tests - the **maximum** number of tests detected in a run for the selected period

### Test Results Chart

Test Results Chart shows the distribution of tests outcome over time.

![Example chart - Test Results](<../.gitbook/assets/CleanShot 2022-06-25 at 00.02.58@2x.png>)

* Total tests - overall tests recorded for the selected period, regardless of their outcome
* Passed tests - tests that successfully completed all attempts without any exceptions or errors during its execution
* Failed tests - tests that either failed or were skipped because of an error in `beforeEach/beforeAll`
* Ignored test - tests that weren't run e.g. `it.skip()`
* Success Rate - `passed  / (total - pending)`

### Tests Flakiness Chart

Test Results Chart shows the distribution of flaky tests over time.

<figure><img src="../.gitbook/assets/Screenshot 2023-10-18 at 17.04.26.png" alt=""><figcaption><p>Example chart - Tests Flakiness</p></figcaption></figure>

* Flaky tests - overall flaky tests detected for the period. See [flaky-tests.md](../tests/flaky-tests.md "mention")
* Flakiness rate - `flaky tests count / passed tests count`

