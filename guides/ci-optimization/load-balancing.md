---
description: Review of Orchestration strategies for Cypress and Playwright tests
---

# Load Balancing

Running your tests suite in parallel on multiple machines can greatly reduce the overall duration. You can further optimize the speed of parallel tests by optimally balancing based on their expected duration. In some cases, it's worth prioritizing tests based on a different heuristic - for example, running tests with the highest failure or [flakiness rate](../../dashboard/tests/flaky-tests.md).

Orchestration services like Currents Dashboard use historical data to optimize the execution order of cypress tests and utilize different strategies for ordering the execution.

### Optimal sorting by the expected duration

The default Currents dashboard orchestration strategy orders tests by their expected duration. Consider the example of 2 cypress runners, executing a suite consisting of 5  spec files.

Take, for example, a testing suite consisting of 4 spec files with varying durations:

* `spec01`: 10 minutes
* `spec02`: 10 minutes
* `spec03`: 3 minutes
* `spec04`: 2 minutes

With 2 machines, non-optimal balancing might distribute the files as follows, leading to an inefficient total execution time of 20 minutes due to one machine being heavily loaded while the other finishes quickly:

* Shard 1: `spec01`, `spec02` (20 minutes total)
* Shard 2: `spec03`, `spec04` (5 minutes total)

By ordering spec files according to their expected duration and optimizing the distribution of the files between runners (CI machines), we can significantly reduce the overall duration of runs and complete our tests suite faster.

<figure><img src="../../.gitbook/assets/Naive Balancing.png" alt=""><figcaption><p>Non-optimal distribution of spec files leads to under-utilized resources and longer duration</p></figcaption></figure>

An optimal assignment strategy that considers the duration of spec files can significantly improve the efficiency of test execution. By balancing the workload across shards based on test durations, you minimize overall execution time and make better use of resources. For the example provided:

* Shard 1: `spec01` (10 minutes) and `spec03` (3 minutes), totaling 13 minutes.
* Shard 2: `spec02` (10 minutes) and `spec04` (2 minutes), totaling 12 minutes.

<figure><img src="../../.gitbook/assets/Optimal balancing.png" alt=""><figcaption><p>Optimal distribution of spec files is 35% faster and uses the resources in an optimal way</p></figcaption></figure>

Having this kind of optimization reduces the overall duration of runs and saves valuable time, reduces CI machines utilization and allows developers to get feedback faster.

For larger teams with a significant amount of tests, the cumulative gains of reducing the duration of CI tests can be substantial.

### Optimal sorting by the failure rate

Sorting by Failure Rate is another popular parallelization strategy. The spec files with the highest expected failure rate will be prioritized for parallel execution - which allows for getting faster feedback from the CI builds.&#x20;

Enabling this orchestration method and sorting by failure rate can also help to reduce the overall time and effort required for CI runs. By identifying and executing the most critical tests first, developers can quickly identify issues and fix them before moving on to less important tests. This can improve the quality of the code and reduce the likelihood of issues appearing in production.

Enabling this orchestration method and [fail-fast-strategy.md](fail-fast-strategy.md "mention") can greatly reduce the CI resource usage. The tests that are likely to fail will be executed first, and whenever Currents detects a failure, the whole run will be stopped.&#x20;

You can set the orchestration method by modifying individual project settings in Currents Dashboard: **Manage Project > Settings > Parallel Execution Strategy.**

<figure><img src="../../.gitbook/assets/Load Balancing.gif" alt=""><figcaption><p>Setting the orchestration strategy on Currents Dashboard</p></figcaption></figure>
