---
description: How to set up failed test reruns on GitHub Actions
---

# Re-run Only Failed Tests

When a workflow fails in GitHub Actions, the failed jobs can be re-run. However, Playwright needs extra setup to rerun only the failed tests.

For GitHub Actions, Currents provides the [Last Failed GitHub Action](https://github.com/currents-dev/playwright-last-failed) to simplify reruns with Playwright sharding or Currents Orchestration.

## Prerequisites

Before starting, ensure you have:

* **Currents project set up** — Create a project in the [Currents Dashboard](https://app.currents.dev) to get your `CURRENTS_PROJECT_ID`
* **Currents API credentials** — Generate a `CURRENTS_RECORD_KEY` (for recording test results) and `CURRENTS_API_KEY` (for orchestration features) from your project settings
* **Understand your test strategy**:
  - **Sharded runs** — You manually define the number of parallel containers (e.g., 3 shards). Playwright's native `--shard` flag distributes tests evenly.
  - **Orchestrated runs** — Currents automatically assigns tests to all available containers, optimizing distribution for speed. No need to predefined shard count.

See [re-run-only-failed-tests.md](../../../guides/ci-optimization/re-run-only-failed-tests.md "mention") for more conceptual details on reruns and test strategies.

{% hint style="info" %}
The `playwright-last-failed` action uses `@currents/cmd` as a dependency. To control which version of `@currents/cmd` is used, install it as a dev dependency in `package.json` and use `npm ci` (or your package manager's equivalent frozen lockfile install) in GitHub Actions. Without this, the action installs `@currents/cmd` globally from npm, which may pull a different version than what's pinned in your lockfile.
{% endhint %}

Select the guide that matches the CI setup:

* [Sharded runs](re-run-failed-only-tests-sharded.md "mention") — fixed shard count and native Playwright `--shard` parallelism
* [Orchestrated runs](re-run-failed-only-tests-orchestrated.md "mention") — Currents assigns tests across runners
* [Custom CI build ID for reruns](custom-ci-build-id-for-reruns.md "mention") — for sharded or orchestrated runs with a non-default CI build ID
