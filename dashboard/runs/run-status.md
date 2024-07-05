---
description: Details about different states that a Currents dashboard run can have
---

# Run Status

Runs represent builds in your CI system. Technically, each runs is associated with a unique [ci-build-id.md](../../guides/ci-build-id.md "mention") and represents a collection of:

* Playwright / Cypress spec files
* Playwright / Cypress tests results
* Machines
* Metadata like git metadata and environment details

During its lifecycle, a run can have various states:

* <mark style="color:orange;">**Running**</mark> - a default state for newly created runs
* Failing - a run still hasn't reported all the results and has 1 or more failed tests
* <mark style="color:red;">**Failed**</mark> - a run has reported all the results and has 1 or more failed tests
* <mark style="color:blue;">**Passed**</mark> - a run has reported all the results and has 0 failed tests.

In addition, an interrupted run can be in one of the following completion states:

* **👤 Cancelled** - a run was cancelled. See [cancel-run.md](cancel-run.md "mention") for details.
* **⚡️ Cancelled** - a run was cancelled due to the [Fail Fast](../../guides/parallelization-guide/fail-fast-strategy.md) strategy. See&#x20;
* **Timeout** - a run exceeded the timeout threshold for the project. See [run-timeouts.md](run-timeouts.md "mention")for details.
