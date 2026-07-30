---
description: Running tests with Currents in GitHub Actions
---

# GitHub Actions

Start with [playwright-github-actions.md](playwright-github-actions.md "mention") for a workflow that records to Currents, then add what your setup needs from the articles below.

## Setup

* [playwright-github-actions.md](playwright-github-actions.md "mention") — a workflow that records tests to Currents, and how to parallelize it.
* [commit-data-for-github-actions.md](commit-data-for-github-actions.md "mention") — get the correct commit, branch and pull request on a run.
* [custom-docker-runners.md](custom-docker-runners.md "mention") — the environment variables to pass when the job runs in your own container.
* [named-runners.md](named-runners.md "mention") — show which runner executed each spec file.

## Reruns

* [re-run-failed-only-tests.md](re-run-failed-only-tests.md "mention") — re-run only the tests that failed, for [sharded](re-run-failed-only-tests-sharded.md) and [orchestrated](re-run-failed-only-tests-orchestrated-v2.md) runs.
* [custom-ci-build-id-for-reruns.md](custom-ci-build-id-for-reruns.md "mention") — when your workflow sets its own CI build ID.

## Cancellation

* [cancel-runs.md](cancel-runs.md "mention") — cancel the Currents run when the workflow is cancelled, so it does not sit in progress until the run timeout.

## Examples

The [currents-examples](https://github.com/currents-dev/currents-examples/tree/main/playwright/ci/github-actions) repository has complete workflows for sharding, orchestration, reruns and visual testing.
