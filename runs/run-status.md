---
description: Details about different states that a Currents dashboard run can have
---

# Run Status

Each run represents a build in your CI system. Technically, each runs is associated with a unique [cypress-ci-build-id.md](../concepts/cypress-ci-build-id.md "mention") and represents a collection of

* Cypress spec files
* Cypress tests results
* Machines
* Metadata like git metadata and environment details

During its lifecycle a run can have various states:

* <mark style="color:orange;">**Running**</mark> - a default state for newly created runs
* **Cancelled** - a run was cancelled. See [cancel-run.md](cancel-run.md "mention") for details
* **Timeout** - a run exceeded the timeout threshold for the project. See [run-timeouts.md](run-timeouts.md "mention")for details.
* <mark style="color:red;">**Failed**</mark> - a run reported all the results and has 1 or more failed tests
* <mark style="color:blue;">**Passed**</mark> - a run reported all the results and has 0 failed tests
