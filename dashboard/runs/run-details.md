---
description: Run details and metadata - git, environment, status
---

# Run Details

## Run Status

A run can  have the following status:

* <mark style="color:orange;">**Running**</mark> - the default state for newly created runs
* <mark style="color:red;">Failing</mark> - a run still hasn't reported all the results and has 1 or more failed tests
* <mark style="color:red;">**Failed**</mark> - a run has reported all the results and has 1 or more failed tests
* <mark style="color:blue;">**Passed**</mark> - a run has reported all the results and has 0 failed tests.

In addition, an interrupted run can be in one of the following completion states:

* **👤 Cancelled** - a run was cancelled. See [cancel-run.md](cancel-run.md "mention") for details.
* **⚡️ Cancelled** - a run was cancelled due to the [Fail Fast](../../guides/ci-optimization/fail-fast-strategy.md) strategy. See&#x20;
* **Timeout** - a run exceeded the timeout threshold for the project. See [run-timeouts.md](run-timeouts.md "mention")for details.

## Run Title

Currents uses the following data for displayed run title:

* Pull Request title if the run is associated with a PR
* Git Commit Message if `.git` is available
* `No title` placeholder otherwise

You can override Run Title by setting `COMMIT_INFO_MESSAGE` environment variable. See [commit-information.md](commit-information.md "mention").

<figure><img src="../../.gitbook/assets/currents-2024-01-30-14.32.32@2x.png" alt=""><figcaption><p>Run details example</p></figcaption></figure>

Currents collects additional information about the CI environment:

| Field                | Description                                                                   |
| -------------------- | ----------------------------------------------------------------------------- |
| Duration             | Run duration                                                                  |
| Progress             | Completed / overall spec files progress                                       |
| Started at           | Run start timestamp                                                           |
| Branch               | Git branch name (or HEAD for Pull Requests)                                   |
| Commit Message + SHA | Git commit details                                                            |
| Browser / Project    | Cypress tests browser or Playwright Project                                   |
| Author               | Git commit author                                                             |
| CI Build ID          | [ci-build-id.md](../../guides/parallelization-guide/ci-build-id.md "mention") |
