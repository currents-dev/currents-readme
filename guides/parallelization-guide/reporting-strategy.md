---
description: How to structure and organize the reporting of CI test results to Currents
---

# Reporting Strategy

This guide aims to help readers understand how to structure and organize the test result reporting in Currents. It covers key concepts such as project, runs and groups hierarchy, test result handling, and integration strategies.

By following this guide, users can optimize their test reporting workflow and gain clearer insights into their test runs.

## Currents Reporting Terms

<figure><img src="../../.gitbook/assets/Topology.png" alt=""><figcaption><p>Reporting entities and their relationship</p></figcaption></figure>

### **Project**

The top-level entity representing reporting destination. Each organization can have multiple projects, there’s no limit on the number of projects.&#x20;

You specify the project when running tests in your CI pipeline using environment variables `CURRENTS_PROJECT_ID` or via reporter configuration. Please refer to reporter documentation for available options.&#x20;

{% hint style="info" %}
Each project maintains separate settings and data, with no crossover
{% endhint %}

#### **Test Results and History**

* Test results from different projects remain separate, even for identical tests.
* Test history displays results only from the same project.
* Performance metrics only include test recordings from the same project.

#### **Integrations**

Each project has its own integrations with 3rd parties (see [integrations](../../resources/integrations/ "mention")). However, multiple projects can be connected to the same destination.

For example, enabling a GitHub integration allows selecting the same GitHub organization and repository for different projects. However, this may result in duplicate PR comments originating from separate projects connected to the same repository.

***

### **Run**

A recording of test results from a CI run, uniquely identified by a [ci-build-id.md](../ci-build-id.md "mention"), git commit information and CI provider execution details.&#x20;

By default each run represents a build (or execution of a CI pipeline), however, you can send results from different stages of a pipeline or even different pipelines to the same run using the same CI Build ID value. See [ci-build-id.md](../ci-build-id.md "mention").

***

### **Group**

A collection of spec files and the corresponding test results. For example:

* in Playwright you can create two Playwright projects that run the same tests for `chrome` and `firefox` - Currents will create a separate group, accordingly.
* in Postman each “collection” corresponds a separate group.

Each group can contain multiple spec files and test results.

***

### **Spec File**

A file containing one or more test cases, identified by its reporter filesystem path. Currents collects certain performance metrics for specs. Spec file can contain zero or more test recordings.

***

### **Test Recording**

A single test execution result, including attempts, attachments (screenshots, videos, traces, arbitrary attachments, visual diff results, annotations, error details. Each test record can have multiple attempts.

***

### **Attempt**

An attempt to run of a test case. Multiple attempts may occur depending on retry strategies.

## Reporting Scenarios

You can implement various reporting scenarios using a combination of Projects, Runs and Groups. Consider the following popular scenarios.

### Single product / repository

<figure><img src="../../.gitbook/assets/single project.png" alt=""><figcaption><p>Reporting scenario: single repository with (optionally) multiple groups</p></figcaption></figure>

You have a single product (and a repository) and a testing suite that runs as part of a CI pipeline, all tests run together, optionally multiple groups (e.g. `chromium` and `firefox` ) will be automatically detected.

It is recommended to have a single project and create a unique run on every invocation of the CI pipeline.

* Create a single project
* Create a unique run for each CI invocation
* Create single or multiple groups within each run

### Multiple standalone products / repositories

<figure><img src="../../.gitbook/assets/standalone-multiple-products (1).png" alt=""><figcaption><p>Reporting scenario: multiple standalone repositories report to different Currents Projects</p></figcaption></figure>

For bigger organizations, each product has its own repository and testing suite that runs as part of a CI pipeline.

* Create a dedicated project for each product / repository
* Create a single run for each CI invocation
* Create a single or multiple groups for each run

### Mixed reporting, multiple environments

A more complicated scenario is when you have a testing suite that runs in different "environments" and you need to decide how to organize the test results. For example:

* running different Playwright projects in separate CI steps
* running the same set of tests in multiple environments, e.g. based on locale (`en-us`, `en-ca` ) or a domain (`com`, `.co.uk`)
* running a subset of tests based on tags or glob pattern, e.g. `playwright test --grep @desktop`
* running a subset of tests from different CI steps (or different pipelines) while separating the results

To implement the variety of possible scenarios you need to use the combination of Project, CI build ID, Groups and Tags, become familiar with the limitations and implications.

### Example

For example, consider testing an e-commerce web app with a slightly different set of Playwright tests for different domains (`.com`, `.co.uk` etc.).&#x20;

You've defined the following [Playwright projects](#user-content-fn-1)[^1]

{% code title="playwright.config.ts" %}
```typescript
export default {
  // ...
  projects: [
    {
      name:"UK",
      testMatch: ["./e2e/shared/*.spec.ts", "./e2e/uk/*.spec"],
      use: {
        baseURL: "example.co.uk" // 🇬🇧
      }
    },
    {
      name: "US",
      testMatch: ["./e2e/shared/*.spec.ts", "./e2e/us/*.spec"],
      use: {
        baseURL: "example.com" // 🇺🇸
      }
    },
  ]
}
```
{% endcode %}

Let's consider various setups and the implications.

#### Single project, single run, multiple groups

<figure><img src="../../.gitbook/assets/mixed-add-group.png" alt=""><figcaption><p>Mixed reporting: CI steps create separate groups in a run</p></figcaption></figure>

<details>

<summary>Example: single project, single run, multiple groups</summary>

This is the default reporting model that uses the same `projectId` (hence sends results to the same project) and the same `ci-build-id` (hence sends the results to the same run) for each command. Assuming Currents reporter is already configured.

* Running `playwright test --project UK` will create a new run with a group `UK`

- Running `playwright test --project US` will update the previosuly created run by adding the new group `US`





<table><thead><tr><th width="297">Item</th><th>Description</th></tr></thead><tbody><tr><td>Project Settings: Timeout</td><td>Each run has its own timeout, both groups will have to finish within the designated time to prevent a timeout</td></tr><tr><td>Project Settings: Default branch</td><td>Same for all runs and groups</td></tr><tr><td>Project Settings: Run title source</td><td>Same for all runs and groups (same project)</td></tr><tr><td>Project Settings: Fail fast</td><td>Each run has its own fail-fast settings</td></tr><tr><td><a data-mention href="../../resources/integrations/">integrations</a></td><td>Integration settings are set on a project level. Each run will activate its own notifications. Depending on integration settings you may receive a separate notification for each group completion or only for the whole run.</td></tr><tr><td><a data-mention href="../currents-actions/">currents-actions</a></td><td>Actions are defined on Project level and apply to each run and both groups.</td></tr><tr><td>Run Results</td><td>Each run contains results for run both group and all the included tests. </td></tr><tr><td>Run Metrics</td><td>Run metrics are based on mixed results from the two groups: aggregated run duration includes both groups, suite size includes test from both groups.</td></tr><tr><td>Test Metrics</td><td>Test metrics are based on both groups, for example if test A runs in group UK and US then both samples of the test will be included in its metrics (duration, flakiness rate, failure rate).  It is possible to include only samples from particular group by using group filter.</td></tr><tr><td>Coverage Reports</td><td>Coverage reports are collected on a group level </td></tr><tr><td>Scheduled Reports</td><td>Scheduled automated reports are defined on project level and will contain results for both groups</td></tr><tr><td>Error Aggregations</td><td>Error aggregations include results from both groups</td></tr><tr><td>Test Explorer and History</td><td>Test results, including history contain results from both groups. It is possible to filter the results only from particular group</td></tr><tr><td><p>Project Taxonomy </p><p>(tags, git info, groups) - filters</p></td><td>Project taxonomy includes items from all runs and groups</td></tr></tbody></table>

</details>

#### Single project, multiple runs, single group

<figure><img src="../../.gitbook/assets/mixed-new-run.png" alt=""><figcaption><p>Mixed reporting: Each CI step create a new run</p></figcaption></figure>

<details>

<summary>Example: Single project, multiple runs, single group</summary>

Instead of sending the results to the same run, you can chose to create a separate run for each playwright group. Run the following commands as part of your CI pipeline (assuming Currents reporter is already configured).&#x20;

* Use the same `projectId` (send results to the same project)&#x20;
* Use a different `ci-build-id` for each group - setting a different value would create a new run:
  * <mark style="color:yellow;">`CURRENTS_BUILD_ID=build-001-uk`</mark>` ``playwright test --project UK` (creates a new run with a single group UK)
  * <mark style="color:yellow;">`CURRENTS_BUILD_ID=build-001-us`</mark>` ``playwright test --project US` (creates a new run with a single group US

In this case, instead of a single run that contains two groups, you will create two separate runs with with 1 group each.

<table><thead><tr><th width="280">Item</th><th>Description</th></tr></thead><tbody><tr><td>Project Settings: Timeout</td><td>Each run has its own timeout</td></tr><tr><td>Project Settings: Default branch</td><td>Same for all runs</td></tr><tr><td>Project Settings: Run title source</td><td>Same for all runs</td></tr><tr><td>Project Settings: Fail fast</td><td>Each run has its own fail-fast settings</td></tr><tr><td><a data-mention href="../../resources/integrations/">integrations</a></td><td>Integration settings are set on a project level. Each run will activate its own notifications</td></tr><tr><td><a data-mention href="../currents-actions/">currents-actions</a></td><td>Actions are defined on Project level and apply to each run</td></tr><tr><td>Run Results</td><td>Each run contains results of a single group</td></tr><tr><td>Run Metrics</td><td>Aggregated run metrics are based on mixed results from the two types of runs. For example, suite size includes test from both groups. It is possible to refine the aggregation metrics to only include runs with particular tags. See <a data-mention href="../playwright-tags.md">playwright-tags.md</a></td></tr><tr><td>Test Metrics</td><td>Test metrics are based on all runs, for example if test A runs in both environments, then both samples of the test will be included in its metrics (duration, flakiness rate, failure rate).  It is possible to include only samples from particular run or group by using tags. See <a data-mention href="../playwright-tags.md">playwright-tags.md</a>.</td></tr><tr><td>Coverage Reports</td><td>Coverage reports are collected on a group level.</td></tr><tr><td>Scheduled Reports</td><td>Scheduled automated reports are defined on project level and will contain results for both types of runs. It possible to refine the reports using <a data-mention href="../playwright-tags.md">playwright-tags.md</a>.</td></tr><tr><td>Error Aggregations</td><td>Error aggregations include results from both types of runs.</td></tr><tr><td>Test Explorer and History</td><td>Test results, including history contain results from all runs.. It is possible to filter the results only from particular run using <a data-mention href="../playwright-tags.md">playwright-tags.md</a>..</td></tr><tr><td><p>Project Taxonomy </p><p>(tags, git info, groups) - filters</p></td><td>Project taxonomy includes items from all runs</td></tr></tbody></table>



</details>

<details>

<summary>Multiple projects, single run, single group</summary>

As an edge case it is possible to use completely different projects. Keep in mind that each project's data is completely separated - each project has into own set of settings, analytics, results and integrations.

Use different `projectId` for each command (assuming projects already exist)

* <mark style="color:yellow;">`CURRENTS_PROJECT_ID=1cVv3a`</mark>` ``playwright test --project UK` (creates a new run with a single group UK)
* <mark style="color:yellow;">`CURRENTS_PROJECT_ID=aXcR4sa`</mark>` ``playwright test --project US` (creates a new run with a single group US

</details>

## Using Tags

Regardless of the reporting strategy we recommend to annotate your tests and executions with tags. Adding tags allows granular access to the data.

* Read more about using [playwright-tags.md](../playwright-tags.md "mention") to dynamically add tags to runs, groups and tests
* Consider using `removeTitleTag`in [currents-playwright](../../resources/reporters/currents-playwright/ "mention") to remove tags from test title and keep test history consistent

[^1]: don't confuse with Currents Projects
