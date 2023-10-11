---
description: Playwright Spec files status in Currents Dashboard
---

# Spec File Status

Currents dashboard has the following statuses for spec files:

* `Pending` - the spec file did not start its execution yet
* <mark style="color:yellow;">`Running`</mark> - the spec file started its execution and has been running
* <mark style="color:purple;background-color:purple;">`Timedout`</mark> - the spec file started its execution but didn't report results to the dashboard before the associated Run's timeout. Read more about [run-timeouts.md](../runs/run-timeouts.md "mention").
* Cancelled - the spec file was running at the time the associated run was cancelled. The system will still accept the spec file's result and it will be marked as <mark style="color:blue;">Passed</mark> or <mark style="color:red;">Failed</mark>. If the spec never reports the result, it will be eventually marked as <mark style="color:purple;">Timedout</mark>.
* <mark style="color:blue;">`Passed`</mark> - the spec file reported its results to Currents dashboard and no there were no failed tests detected
* <mark style="color:red;">`Failed`</mark> - the spec file reported its results to Currents dashboard and there was 1 or more failed or skipped test. Read more about [test-status.md](../tests/test-status.md "mention").

