---
description: Review of paralleling strategies for Cypress tests
---

# Load Balancing

Running your cypress tests suite in parallel on multiple machines can greatly reduce the overall duration. You can further optimize the speed of parallel cypress tests by optimally sorting based on their expected duration. In some cases, it's worth prioritizing tests based on a different heuristic - for example, running tests with the highest failure or [flakiness rate](../tests/flaky-tests.md).

Orchestration services like Currents Dashboard use historical data to optimize the execution order of cypress tests and utilize different strategies for ordering the execution.

### Optimal sorting by the expected duration

The default Currents dashboard orchestration strategy orders cypress tests by their expected duration. Consider the example of 2 cypress runners, executing a suite consisting of 5 cypress spec files.

* <mark style="color:red;">Run A</mark> doesn't utilize any sorting - longer spec files can be assigned to the same machine, therefore cypress runner #1 will be idle and the overall duration is longer compared to <mark style="color:blue;">Run B</mark>
* <mark style="color:blue;">Run B</mark> utilizes optimal sorting - longer spec files run first, as a result the tests are getting distributed more equally between the runners and the overall run duration is less compared to <mark style="color:red;">Run A</mark>.

![Optimally sorting parallel cypress tests](../.gitbook/assets/cypress-orchestration.png)

By ordering cypress spec files according to their expected duration and optimizing the distribution of the files between cypress runners (CI machines), we can significantly reduce the overall duration of runs and complete our cypress tests suite faster.

Typically cypress tests are running as part of your CI pipeline, having this kind of optimization reduces the overall duration of cypress runs and saves valuable time, reduces CI machines utilization and allows developers to get feedback faster.

For larger teams with a significant amount of cypress tests, the cumulative gains of reducing the duration of cypress tests can be substantial.

### Sorting by the failure rate

Sorting by Failure Rate is another popular parallelization strategy. The spec files with the highest expected failure rate will be prioritized for parallel execution - which allows for getting faster feedback from the CI builds.&#x20;

Enabling this orchestration method and sorting by failure rate can also help to reduce the overall time and effort required for CI runs. By identifying and executing the most critical tests first, developers can quickly identify issues and fix them before moving on to less important tests. This can improve the quality of the code and reduce the likelihood of issues appearing in production.

Enabling this orchestration method and [fail-fast-strategy.md](fail-fast-strategy.md "mention") can greatly reduce the CI resource usage. The tests that are likely to fail will be executed first, and whenever Currents detects a failure, the whole run will be stopped.&#x20;

You can set the orchestration method by modifying individual project settings in Currents Dashboard:

<figure><img src="../.gitbook/assets/currents-2023-02-19-23.47.03.gif" alt=""><figcaption></figcaption></figure>



###
