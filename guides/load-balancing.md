---
description: Review of paralleling strategies for Cypress tests
---

# Load Balancing

Running your cypress tests suite in parallel on multiple machines can greatly reduce the overall duration. You can further optimize the speed of parallel cypress tests by optimally sorting based on their expected duration. In some cases, it's worth prioritizing tests based on a different heuristic - for example, running tests with the highest failure or [flakiness rate](../tests/flaky-tests.md).

Orchestration services like Currents Dashboard use historical data to optimize the execution order of cypress tests and utilize different strategies for ordering the execution.

### Optimal sorting by the expected duration

The default Currents dashboard orchestration strategy orders cypress tests by their expected duration. Consider the example of 2 cypress runners, executing a suite consisting of 5 cypress spec files.

* <mark style="color:red;">Run A</mark> doesn't utilize any kind of sorting - longer spec files can be assigned to the same machine, therefore cypress runner #1 will be idle and the overall duration is longer compared to <mark style="color:blue;">Run B</mark>
* <mark style="color:blue;">Run B</mark> utilizes optimal sorting - longer spec files run first, as the result the tests are getting distributed more equally between the runners and the overall run duration is less compared to <mark style="color:red;">Run A</mark>.

![Optimally sorting parallel cypress tests](../.gitbook/assets/cypress-orchestration.png)

By ordering cypress spec files according to their expected duration and optimizing the distribution of the files between cypress runners (CI machines), we can greatly reduce the overall duration of runs and complete our cypress tests suite faster.

Typically cypress tests are running as part of your CI pipeline, having this kind of optimization reduces the overall duration of cypress runs and saves valuable time, reduces CI machines utilization and allows developers to get feedback faster.

For larger teams with a significant amount of cypress tests, the cumulative gains of reducing the duration of cypress tests can be significant.

### Fail-Fast for Cypress Tests

Intentionally failing your cypress tests suite right after the first failed test is called a "fail-fast strategy".

Using this strategy can be beneficial because:

* it reduces CI resources usage by preventing running additional tests after detecting just a single failure;
* potentially getting faster feedback for runs with a failed test - you don't need to wait for the whole run to finish in order to complete builds and trigger notifications;
* it reduces the number of tests results recorded on the Currents dashboard;
* it prevents [run-timeouts.md](../runs/run-timeouts.md "mention") when an external tool (CI or a script) terminates cypress tests prematurely.

At the same time, utilizing "fail-fast" strategy has some caveats:

* not all the tests will be executed - you will only see the results of a single test - the first test that triggered the "fail-fast" policy;
* tackling one failure at a time can result in more runs than necessary - one can invest more time and resources, compared to running all the tests regardless of their results.

If you are dealing with a stable and predictable suite of cypress tests that rarely fail - "fail-fast" can be a great way to optimize your cypress tests.

Otherwise, please consider the pros and cons of using a "fail-fast" strategy for your situation.
