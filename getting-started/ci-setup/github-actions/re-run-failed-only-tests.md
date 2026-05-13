---
description: How to set up failed test reruns on GitHub Actions
---

# Re-run Only Failed Tests

When a workflow fails in GitHub Actions, the failed jobs can be re-run. However, Playwright needs extra setup to rerun only the failed tests.&#x20;

See [re-run-only-failed-tests.md](../../../guides/ci-optimization/re-run-only-failed-tests.md "mention") guide for more details on re-runs.

For GitHub Actions, Currents provides the [Last Failed GitHub Action](https://github.com/currents-dev/playwright-last-failed) to simplify the re-runs.

Select the guide that matches the CI setup:

* [Sharded runs](re-run-failed-only-tests-sharded.md "mention") — fixed shard count and native Playwright `--shard` parallelism
* [Orchestrated runs](re-run-failed-only-tests-orchestrated.md "mention") — Currents assigns tests across runners
* [Custom CI build ID for reruns](custom-ci-build-id-for-reruns.md "mention") — for sharded or orchestrated runs with a non-default CI build ID
