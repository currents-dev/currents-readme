---
description: Proactively Detecting Test Performance Regressions
icon: file-chart-column
---

# Automated Reports

Currents **Automated Reports** helps teams to proactively identify regressions in test performance and take action:

* Prevent problems that go unnoticed for weeks.
* Reduce the waste of CI resources caused by failed or flaky tests.
* Avoid your team's frustration from rerunning unreliable and flaky tests again and again.

### Test Performance Blind Spots

An unwanted change in test performance can go unnoticed for a long time, especially for larger teams where multiple contributors change the tests often.&#x20;

When a duration, flakiness, or failure rate change happens, it can often pass days or weeks before the regression in performance can be noticed. Meanwhile, teams waste time waiting for CI test results to appear, dealing with flaky, non-reliable, or often failing results.

### Currents Tracking and Metrics

When you integrate your test suite with Currents, we will start tracking the following metrics:

* The **failure rate** for each spec and test
* Spec files and individual test **duration**
* Spec files and individual tests' **flakiness rate**

With automated reports sent directly to your inbox, you can quickly identify the most expensive tests that waste CI resources and frustrate your team.

* Items with the **highest duration**
* Items with the **highest flakiness rate**
* Items with the **highest failure rate**

In addition, the report includes spec files and tests that showed a decline in performance compared to the previous period (customizable):

* Specs/tests with the most significant increase in duration
* Specs/tests with the most significant increase in failure rate
* Specs/tests with the most significant increase in flakiness rate

### Managing Automated Reports

The Reports page can be accessed from the **Reports** section of the current project.

Click the **New Report** button to create a new report.

<figure><img src="../.gitbook/assets/Screenshot 2025-11-03 at 16.24.35.png" alt=""><figcaption><p>Reports page</p></figcaption></figure>

Configure the settings and enable the automated report:

1. Click “Enable/Disable” to activate the report for the project.
2. **Optionally:** edit the report label. This label will appear in the report title and the email subject line.
3. Add the emails of the report recipients.
4. **Optionally**: add a comma-separated list of tags - only records matching the filter will be included in the report.
5. **Optionally**: add a comma-separated list of author emails - only records matching the filter will be included in the report.
6. **Optionally**: Add a comma-separated list of branches - only records matching the filter will be included in the report.

<figure><img src="../.gitbook/assets/Screenshot 2025-11-25 at 10.42.17.png" alt=""><figcaption><p>Report customization page</p></figcaption></figure>

7. Define the lookback period used to compare the current metrics.

<figure><img src="../.gitbook/assets/image (43).png" alt=""><figcaption><p>Loopback period</p></figcaption></figure>

8. Choose a scheduling frequency: Weekly, Daily, or Every 3 Days. Weekly schedules run on a specific weekday and require a weekday, time, and timezone. Daily and Every 3 Days schedules run at a fixed interval, so only the time and timezone need to be configured.

<figure><img src="../.gitbook/assets/image (44).png" alt=""><figcaption><p>Report schedule</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (28).png" alt=""><figcaption><p>Reporting frequency options</p></figcaption></figure>

9. Use **Preview** to examine and change the report settings.

### Forward automated reports email to Slack

Slack currently allows receiving emails in a Slack channel or private message.

Slack generates an email where the automated reports will be sent and that must be registered in the dashboard. Slack then receives the email and forwards the email to the previously setup channel.

Check the [Slack documentation](https://slack.com/help/articles/206819278-Send-emails-to-Slack) for more information and detailed steps.

### Report Structure

The report structure includes all essential information for understanding test activity within the selected period. It provides high-level summaries of the recorded items, along with dedicated sections for run insights, test insights, and spec insights. An additional section highlights relevant error insights, helping teams quickly identify and analyze recurring issues.

The report also compares metrics from the selected period against a configurable look-back period. This enables clear trend analysis across all tracked items and helps teams evaluate how the test suite behaves and evolves over time.

#### Header

Essential data - the dates, project details, recipients, button for changing the report settings and filters applied (if any).

<figure><img src="../.gitbook/assets/image (29).png" alt="Report header example"><figcaption><p>Report header</p></figcaption></figure>

#### Runs section

Includes the amount of total runs from the reports period and runs from the look back period.

**Success rate**

Shows the percentage of success of the runs, amount of passed runs and the trend of the metric compared to the look back period metrics

* The trend is negative, as the percentage of runs that passed without errors decreased to 23.33%.

**Avg. Run Duration**

Specifies the average duration calculated from fully reported runs only, excluding cancelled and timed-out runs, and displays the total number of runs included in the calculation.

* The trend is negative yet increasing, which reflects a growth in the duration of runs.

<figure><img src="../.gitbook/assets/image (11) (1).png" alt=""><figcaption><p>Runs section summary</p></figcaption></figure>

#### Tests section

Shows relevant insights about tests and includes multiple subsections for specific analytics regarding tests relevant metrics.

**Tests Detected**

The number of unique tests detected, compared to the previous period.

**Tests Recorded**

The number of tests executed, compared to executions in the previous period.

**Success Rate**

Calculated success rate of executed tests, showing the number of passed, failed, and skipped tests.

* A positive trend indicates that more tests are passing without errors.

**Flakiness Rate**

Number of flaky tests detected and the percentage they represent of all test executions.

* The trend is positive and decreasing, as fewer flaky tests indicate a more reliable test suite.

**Avg. Duration**

The average duration recorded for all the tests executions.

* The trend is positive and decreasing, as test execution times are shorter.

**P90 Duration**

Tests with execution times longer than 90% of all other test executions, meaning only 10% of executions take longer.

* The trend is negative and increasing, indicating that 90% of tests have longer execution times.

**Max. Duration**

Maximum duration among all executed tests.

* The trend is negative and increasing, meaning that tests with longer execution times are taking even more time.

<figure><img src="../.gitbook/assets/image (33).png" alt=""><figcaption><p>Tests section summary</p></figcaption></figure>

<figure><img src="../.gitbook/assets/image (34).png" alt=""><figcaption><p>Test flakiness chart</p></figcaption></figure>

This section includes key subsections that provide a clearer view of the test suite's status:

* [Top Flaky Tests](automated-reports.md#top-flaky-tests)
* [Highest Flaky Rate](automated-reports.md#highest-flaky-rate)
* [Trending Flaky Tests](automated-reports.md#trending-flaky-tests)
* [New Flaky Tests](automated-reports.md#new-flaky-tests)
* [Slowest Tests](automated-reports.md#slowest-tests)
* [Highest Average Duration](automated-reports.md#highest-average-duration)
* [Trending Slow Tests](automated-reports.md#trending-slow-tests)
* [Failing Tests](automated-reports.md#failing-tests)
* [Highest Failure Rate](automated-reports.md#highest-failure-rate)
* [Trending Failing Tests](automated-reports.md#trending-failing-tests)
* [New Failing Tests](automated-reports.md#new-failing-tests)



**Top Flaky Tests**

Most impactful sources of instability, weighted by frequency and flakiness rate.

| Property     | Description                                                                       |
| ------------ | --------------------------------------------------------------------------------- |
| Title        | Spec file name and test title                                                     |
| Subtext      | Amount of flaky tests detected                                                    |
| Metric Value | Flakiness rate per test across all its executions                                 |
| Trend        | Flakiness rate per test across all its executions compared to the previous period |

**Highest Flaky Rate**

Displays the tests with the highest flakiness rates during the selected period.

| Property     | Description                                                                       |
| ------------ | --------------------------------------------------------------------------------- |
| Title        | Spec file name and test title                                                     |
| Subtext      | Amount of flaky tests detected and the number of runs affected                    |
| Metric Value | Flakiness rate per test across all its executions                                 |
| Trend        | Flakiness rate per test across all its executions compared to the previous period |

**Trending Flaky Tests**

Highlights the tests whose reliability is declining, even if they were previously stable, helping teams catch regressions early.

| Property     | Description                                                                       |
| ------------ | --------------------------------------------------------------------------------- |
| Title        | Spec file name and test title                                                     |
| Subtext      | Previous and current flakiness rate                                               |
| Metric Value | Flakiness rate per test across all its executions                                 |
| Trend        | Flakiness rate per test across all its executions compared to the previous period |

**New Flaky Tests**

Highlights newly unstable tests that were fully reliable in the previous reporting period.

| Property     | Description                                                    |
| ------------ | -------------------------------------------------------------- |
| Title        | Spec file name and test title                                  |
| Subtext      | Current flakiness rate                                         |
| Metric Value | Flakiness rate per test across all its executions              |
| Trend        | A decreasing trend in flakiness rate during the current period |

**Slowest Tests**

Highlights tests that take the longest to execute and have the greatest impact on overall suite duration and throughput.

| Property     | Description                                                            |
| ------------ | ---------------------------------------------------------------------- |
| Title        | Spec file name and test title                                          |
| Subtext      | Current avg. duration and the number of samples for the current period |
| Metric Value | Average test duration                                                  |
| Trend        | Average duration compared to the previous period                       |

**Highest Average Duration**

Identifies tests with the longest single-run durations, which may be rare but are notable outliers in slowness.

| Property     | Description                                      |
| ------------ | ------------------------------------------------ |
| Title        | Spec file name and test title                    |
| Subtext      | Avg. duration over number of runs                |
| Metric Value | Average test duration                            |
| Trend        | Average duration compared to the previous period |

**Trending Slow Tests**

Highlights tests that have slowed down significantly compared to the previous period, indicating potential performance regressions in the code or environment.

| Property     | Description                                      |
| ------------ | ------------------------------------------------ |
| Title        | Spec file name and test title                    |
| Subtext      | Avg. duration increase from previous period      |
| Metric Value | Average test duration                            |
| Trend        | Average duration compared to the previous period |

**Failing Tests**

Highlights tests that consistently fail, having the greatest negative impact on suite reliability.

| Property     | Description                                     |
| ------------ | ----------------------------------------------- |
| Title        | Spec file name and test title                   |
| Subtext      | Amount of recorded failed samples               |
| Metric Value | Failure rate percentage                         |
| Trend        | Failure rate change compared to previous period |

**Highest Failure Rate**

Identifies tests with the highest failure rates, which may be new or rarely executed tests that fail consistently.

| Property     | Description                                                              |
| ------------ | ------------------------------------------------------------------------ |
| Title        | Spec file name and test title                                            |
| Subtext      | Amount of recorded failed samples, the number of affected and total runs |
| Metric Value | Failure rate percentage                                                  |
| Trend        | Failure rate change compared to previous period                          |

**Trending Failing Tests**

Highlights tests with a significant increase in failure rate compared to the previous period, serving as early indicators of regressions or new breakages.

| Property     | Description                                     |
| ------------ | ----------------------------------------------- |
| Title        | Spec file name and test title                   |
| Subtext      | Failure rate change from the previous period    |
| Metric Value | Failure rate percentage                         |
| Trend        | Failure rate change compared to previous period |

**New Failing Tests**

Highlights tests that began failing in the current reporting period after previously having a 0% failure rate.

| Property     | Description                                      |
| ------------ | ------------------------------------------------ |
| Title        | Spec file name and test title                    |
| Subtext      | Current failure rate                             |
| Metric Value | Failure rate percentage                          |
| Trend        | An increasing negative trend in the failure rate |

{% hint style="info" %}
Each subsection item title links to the detailed performance view for the corresponding test in the dashboard.
{% endhint %}

#### Spec Files section

Provides key insights about specs and includes multiple subsections for detailed analytics on spec-related metrics.

**Total Specs**

The number of unique specs detected, compared to the previous period.

**Total Recordings**

The number of specs executions detected, compared to the previous period.

**Success Rate**

Calculated success rate of executed specs, showing the number of passed and failed specs.

* A positive trend indicates that more specs are passing without errors.

**Flakiness Rate**

Number of flaky executions detected and the percentage they represent of all executions.

* The trend is positive and decreasing, as fewer flaky specs indicate a more reliable test suite.

**Avg. Duration**

The average duration recorded for all the spec executions.

* The trend is positive and decreasing, as spec execution times are shorter.

**P90 Duration**

Specs with execution times longer than 90% of all other spec executions, meaning only 10% of executions take longer.

* The trend is negative and increasing, indicating that 90% of specs have longer execution times.

**Max. Duration**

Maximum duration among all specs.

* The trend is negative and increasing, meaning that specs with longer execution times are taking even more time.

<figure><img src="../.gitbook/assets/image (35).png" alt=""><figcaption><p>Spec Files section summary</p></figcaption></figure>

This section includes key subsections that provide a clearer view of the test suite's status:

**Top Flaky Spec Files**

Highlights spec files that most impact stability, weighted by both frequency and flakiness rate.

The flakiness rate is determined by the formula `Flaky Executions / Overall Executions.` A `Flaky Execution` has at least 1 test detected as flaky, according to the [flaky-tests.md](tests/flaky-tests.md "mention") documentation.

| Property     | Description                                       |
| ------------ | ------------------------------------------------- |
| Title        | Spec path                                         |
| Subtext      | Amount of flaky samples                           |
| Metric Value | Flakiness rate percentage                         |
| Trend        | Flakiness rate change compared to previous period |

**Failing Spec Files**

Highlights spec files that most negatively impact suite reliability, weighted by both frequency and failure rate.

The failure rate is determined by the formula `Failed Executions / Overall Executions.` The `Failed Execution` status is described on the [spec-files-status.md](spec-file-status/spec-files-status.md "mention") documentation.

Spec files with a high failure rate can negatively impact the overall development process, increase the risk of regression, and negatively affect confidence in the codebase.

| Property     | Description                                     |
| ------------ | ----------------------------------------------- |
| Title        | Spec path                                       |
| Subtext      | Amount of failed samples                        |
| Metric Value | Failure rate percentage                         |
| Trend        | Failure rate change compared to previous period |

**Longest Spec Files**

Highlights spec files with the highest time cost, taking into account both execution slowness and frequency.

Break down those tests to reduce the overall duration of your runs with parallelization.

| Property     | Description                                   |
| ------------ | --------------------------------------------- |
| Title        | Spec path                                     |
| Subtext      | Avg. duration and number of samples           |
| Metric Value | Average duration                              |
| Trend        | Change in average duration vs previous period |

**Biggest Spec Files**

Highlights spec files with the largest footprint (most unique tests), which often correlate with higher maintenance and execution costs.

| Property     | Description            |
| ------------ | ---------------------- |
| Title        | Spec path              |
| Metric Value | Number of unique tests |

{% hint style="info" %}
Each subsection item title links to the detailed performance view for the corresponding spec file in the dashboard.
{% endhint %}

#### Errors section

The **Errors** section provides an overview of the errors that are affecting the test suite.

**Error Occurrences**

The number of errors detected, compared to the previous period.

<figure><img src="../.gitbook/assets/image (37).png" alt=""><figcaption><p>Errors section summary</p></figcaption></figure>

**Most Impactful Errors**

Errors that impose the greatest cost on the test suite - those with the highest volume and widest impact.

<figure><img src="../.gitbook/assets/image (39).png" alt=""><figcaption></figcaption></figure>

* **Occurrences** = total number of times this error grouping occurred in the period.
* **AffectedTests** = number of distinct tests (signatures) impacted by this error grouping.
* **AffectedBranches** = number of distinct branches in which this error grouping occurred.
* **log(1 + …)** is a way to moderate the spread factor (so that breadth counts but doesn’t dominate).

<figure><img src="../.gitbook/assets/image (38).png" alt=""><figcaption><p>Most Impactful Errors section</p></figcaption></figure>

**Trending Errors**

Errors with the largest increase in occurrences compared to the previous period.

<figure><img src="../.gitbook/assets/image (40).png" alt=""><figcaption><p>Trending Errors section</p></figcaption></figure>

**New Errors**

Errors that appeared for the first time in this period.

<figure><img src="../.gitbook/assets/image (41).png" alt=""><figcaption><p>New Errors section</p></figcaption></figure>
