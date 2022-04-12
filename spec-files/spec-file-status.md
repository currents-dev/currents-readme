---
description: Cypress Spec files status in Currents Dashboard
---

# Spec File Status

Currents dashboard has the following statuses for spec files:

* `Pending` - the spec file did not start its execution yet
* <mark style="color:yellow;">`Running`</mark> - the spec file started its execution and has been running
* `Idle` - the spec file started its execution but didn't report results to the dashboard for more than 1 hour
* <mark style="color:blue;">`Passed`</mark> - the spec file reported its results to Currents dashboard and no there were no failed tests detected
* <mark style="color:red;">`Failed`</mark> - the spec file reported its results to Currents dashboard and there was 1 or more failed test

