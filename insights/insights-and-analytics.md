---
description: Cypress Tests runs and builds - insights and analytics guide
---

# Insights and Analytics

Currents Dashboard Insights allows you to analyze the behaviour and dynamic of your Cypress Tests suite over time. You can use the insights to track the performance of your runs/build and tests over time and to identify the most problematic tests - most flaky and most failing - that are worth fixing.

See the notes below to discover how specific metrics are getting calculated.

### Runs Status

Represents distribution of the outcomes of your builds/runs over time.&#x20;

![Example chart - Runs Status Insights](<../.gitbook/assets/CleanShot 2022-06-24 at 23.36.18@2x.png>)

* Overall runs - overall runs created during the selected period, regardless of their completion or the end state
* Failed runs - runs that have 1 or more failed tests. Failed runs count includes cancelled and timed-out tests.
* Passed runs - runs that have 0 failed tests. Passed runs count includes cancelled and timed-out tests.
* Pass Rate - passed runs / overall runs

### Runs Duration

Runs Duration chart represents the daily/weekly average duration of **fully reported** runs.

![Example chart - Runs Duration Insights](<../.gitbook/assets/CleanShot 2022-06-24 at 23.52.48@2x.png>)

* A fully reported run is a run that wasn't cancelled and didn't time out

### Runs Completion

Runs Completion chart represents the distribution of runs by their completion over time.

![Example chart - Runs Completion](<../.gitbook/assets/CleanShot 2022-06-24 at 23.56.09@2x.png>)

* Overall runs - overall runs created during the selected period, regardless of their completion or the end state
* Fully reported runs -  runs that weren't cancelled and didn't time out
* Cancelled runs - see [cancel-run.md](../runs/cancel-run.md "mention")
* Timed out runs - see [run-timeouts.md](../runs/run-timeouts.md "mention")

### Spec / Tests Size Chart

Specs / Tests size chart represents the **maximum** daily/weekly amount of specs/tests per run

![Example chart - Run Specs / Tests Size](<../.gitbook/assets/CleanShot 2022-06-25 at 00.01.00@2x.png>)

* Spec files - the **maximum** number of spec files detected in a run for the selected period
* Tests - the **maximum** number of tests detected in a run for the selected period

### Test Results Chart

Test Results Chart shows the distribution of tests outcome over time.

![Example chart - Test Results](<../.gitbook/assets/CleanShot 2022-06-25 at 00.02.58@2x.png>)

* Total tests - overall tests recorded for the selected period, regardless of their outcome
* Passed tests - well...
* Failed tests - tests that either failed or were skipped because of an error in `beforeEach/beforeAll`
* Ignored test - tests that weren't run e.g. `it.skip()`
* Success Rate - `passed  / (total - pending)`

### Tests Flakiness Chart

Test Results Chart shows the distribution of flaky tests over time.

![Example chart - Tests Flakiness](<../.gitbook/assets/CleanShot 2022-06-25 at 00.08.26@2x.png>)

* Flaky tests - overall flaky tests detected for the period. See [flaky-tests.md](../tests/flaky-tests.md "mention")
* Flakiness rate - `flaky tests count / passed tests count`

### Top Flaky Tests

Top Flaky Tests Chart shows a list of the flakiest tests.

![An example of a test with a high flakiness rate](<../.gitbook/assets/CleanShot 2022-06-25 at 00.12.10@2x.png>)

Each item in the list represents a test, the list is sorted in descending order by flakiness rate

* Flakiness rate - `# of flaky test samples / # of overall test samples`
* Flaky test sample - a test recording where the test didn't succeed from the first attempt. See [flaky-tests.md](../tests/flaky-tests.md "mention")

### Top Failing Tests

Top Failing Tests Chart shows a list of tests with the highest failure ratios.

![An example of a test with a high failure rate](<../.gitbook/assets/CleanShot 2022-06-25 at 00.21.42@2x.png>)

* Failure rate - `# of failure samples / # of overall samples`
