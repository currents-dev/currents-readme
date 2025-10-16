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

### Enabling Automated Reports

The reports configuration is available in the **Reports** section of the current project.

1. Click “Enable/Disable” to activate the report for the project.
2. Add the emails of the report recipients.
3. **Optionally**: add a comma-separated list of tags - only records matching the filter will be included in the report.
4. **Optionally**: add a comma-separated list of author emails - only records matching the filter will be included in the report.
5. **Optionally**: Add a comma-separated list of branches - only records matching the filter will be included in the report.
6. Select the preferred timezone, day and time for sending the report.&#x20;
7. Customize the date range: 7-day, 14-day or 28-day.

<figure><img src="../.gitbook/assets/Screenshot 2025-10-01 at 16.02.26.png" alt=""><figcaption><p>Currents Automated Report Settings</p></figcaption></figure>

Use **Preview** to examine and change the report settings.

### Forward automated reports email to Slack

Slack currently allows receiving emails in a Slack channel or private message.

Slack generates an email where the automated reports will be sent and that must be registered in the dashboard. Slack then receives the email and forwards the email to the previously setup channel.

Check the [Slack documentation](https://slack.com/help/articles/206819278-Send-emails-to-Slack) for more information and detailed steps.

### Report Structure

The report structure includes essential data about the report, summaries of overall items recorded during the period, a section focused on individual spec files, and another section focused on individual tests. The report also shows items with the most significant changes in metrics during the reported period compared to the previous period.

#### Header

Essential data - the dates, organization, project details, and filters applied (if any).

#### Summary

Review of overall items recorded during the current and previous period: runs and tests.

**Run Performance**

Both metrics contain a changing trend, indicating how the metrics changed compared to the previous period.

* The Average Run Duration of **-7.2s** means that the duration of the average runs decreased.
* The Success Rate of -**13%** means the success rate also decreased.

<figure><img src="../.gitbook/assets/Screenshot 2025-05-12 at 14.29.00.png" alt=""><figcaption><p>Report example: Header and Summary</p></figcaption></figure>

#### Spec Files Performance

Spec Files Performance section focuses on individual cypress spec files, detecting the worst-performing spec files in your suite based on the executions recorded during the reporting period.

Each line item has the following format:

| Spec File                                                                     | Metric                                              |
| ----------------------------------------------------------------------------- | --------------------------------------------------- |
| \<Spec file name> - a link to the detailed performance view for the spec file | The metric value calculated for the reported period |

*   **Top 5 Failing Spec Files**

    It presents the files with the highest failure rate. The failure rate is determined by the formula `Failed Executions / Overall Executions.` The `Failed Execution` status is described on the [spec-file-status](spec-file-status/ "mention") documentation.

    Spec files with a high failure rate can negatively impact the overall development process, increase the risk of regression, and negatively affect confidence in the codebase.
*   **Top 5 Slowest Spec Files**

    It presents the files with the longest duration. Break down those tests to reduce the overall duration of your runs with parallelization.
*   **Top 5 Flaky Spec Files**

    It presents the files with the highest flakiness rate. The flakiness rate is determined by the formula `Flaky Executions / Overall Executions.` A `Flaky Execution` has at least 1 test detected as flaky, according to the [flaky-tests.md](tests/flaky-tests.md "mention") documentation.

<figure><img src="../.gitbook/assets/image.avif" alt=""><figcaption><p>Spec Files Performance Report Example</p></figcaption></figure>

#### Test Performance

Test Performance section focuses on **individual tests** and shows the worst performers based on the executions reported within the period.

Each line item has the following format:

<table><thead><tr><th width="373.5">Test Title</th><th>Metric</th></tr></thead><tbody><tr><td>&#x3C;Test Title> - a link to the detailed performance view for the test</td><td>The metric value calculated for the reported period</td></tr></tbody></table>

*   **Top 5 Failing Tests**

    It presents he tests with the highest failure rate. The failure rate is determined by the formula `Failed Executions + Skipped / Overall Executions.` The `Failed` and `Skipped` statuses are determined according to the [test-status.md](tests/test-status.md "mention")documentation.
*   **Top 5 Slowest Tests**

    It presents the tests with the longest average duration. Break down those tests to reduce the overall duration of your runs with parallelization.
*   **Top 5 Flaky Tests**

    It presents the tests with the highest flakiness rate. The flakiness rate is determined by the formula `Flaky Executions / Overall Executions.` A `Flaky` execution has at least 1 test detected as flaky, according to the [flaky-tests.md](tests/flaky-tests.md "mention") documentation.

<figure><img src="../.gitbook/assets/Screenshot 2025-05-12 at 16.16.45.png" alt=""><figcaption><p>Tests Performance Report Example</p></figcaption></figure>

#### Trends Section

The “Trends” section shows the items with the most significant changes in metrics during the reported period compared with the previous period. Currents will detect the items with the highest negative change and list them in the report. For example, when a test’s duration, flakiness rate, or failure drastically increases during the reported week, it will appear in the “Trends” section.

<figure><img src="../.gitbook/assets/Screenshot 2025-05-12 at 16.17.11.png" alt=""><figcaption><p>Test Suite Trends</p></figcaption></figure>

Each line item has the following format:

| Spec File / Test Title                                                             | Metric                                              | Change                                                           |
| ---------------------------------------------------------------------------------- | --------------------------------------------------- | ---------------------------------------------------------------- |
| Spec name / Test title - a link to the detailed performance view for the spec file | The metric value calculated for the reported period | The change in the metric’s value compared to the previous period |

Clicking on the item (spec file name or test title) will open the Currents dashboard with a detailed performance view for further investigation.

*   **Spec File / Test Failures Trends**

    Lists the spec files with the most significant increase in their **failure rate**. For example:

    | Spec File / Test Title | Failure Rate | Change |
    | ---------------------- | ------------ | ------ |
    | item                   | 29%          | +23%   |

    It means: the _item_ had a failure rate of **29%** during the reported period (usually a week), which is a **23%** increase in its failure rate compared to the previous week.
*   **Spec File / Test Duration Trends**

    Lists the spec files with the most significant increase in their **average duration**. For example:

    | Spec File / Test Title | Avg. Duration | Change |
    | ---------------------- | ------------- | ------ |
    | item                   | 20.4s         | +16.7s |

    It means: the _item_ had an average duration of **20.4 seconds** during the reported period, which is a **+16.7s** increase compared to the previous week.
*   **Spec File / Test Flakiness Trends**

    Lists the spec files with the most significant increase in their **flakiness rate**. For example:

    | Spec File / Test Title | Flakiness Rate | Change |
    | ---------------------- | -------------- | ------ |
    | item                   | 61%            | +57%   |

    It means: the _item_ had a flakiness rate of 61% during the reported period and is a **+57%** increase, i.e., the flakiness rate increased from 4% to 61% compared to the previous week.

