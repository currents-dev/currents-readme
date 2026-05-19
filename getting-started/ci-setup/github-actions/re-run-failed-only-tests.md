---
description: How to set up failed test reruns on GitHub Actions
---

# Re-run Only Failed Tests

When a workflow fails in GitHub Actions, the failed jobs can be re-run. However, Playwright needs extra setup to rerun only the failed tests.

For GitHub Actions, Currents provides the [Last Failed GitHub Action](https://github.com/currents-dev/playwright-last-failed) to simplify reruns with Playwright sharding or Currents Orchestration.

{% hint style="info" %}
The `playwright-last-failed` action uses `@currents/cmd` as a dependency. To control which version of `@currents/cmd` is used, install it as a dev dependency in `package.json` and use `npm ci` (or your package manager's equivalent frozen lockfile install) in GitHub Actions. Without this, the action installs `@currents/cmd` globally from npm, which may pull a different version than what's pinned in your lockfile.
{% endhint %}

Select the guide that matches your setup:

* [Sharded runs](re-run-failed-only-tests-sharded.md "mention") — fixed shard count and native Playwright `--shard` parallelism
* [Orchestrated runs (V1)](re-run-failed-only-tests-orchestrated.md "mention") — single-command `pwc-p`
* [Orchestrated runs (V2)](re-run-failed-only-tests-orchestrated-v2.md "mention") — `pwc-p discover` and `pwc-p run`
* [Custom CI build ID for reruns](custom-ci-build-id-for-reruns.md "mention") — for sharded or orchestrated runs with a non-default CI build ID
