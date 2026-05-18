---
description: How to set up failed test reruns on GitHub Actions
icon: github
---

# Re-run Only Failed Tests

When a workflow fails in GitHub Actions, the failed jobs can be re-run. However, Playwright needs extra setup to rerun only the failed tests.&#x20;

See [re-run-only-failed-tests.md](../../../guides/ci-optimization/re-run-only-failed-tests.md "mention") guide for more details on re-runs.

For GitHub Actions, Currents provides the [Last Failed GitHub Action](https://github.com/currents-dev/playwright-last-failed) to simplify the re-runs.

{% hint style="info" %}
Install [@currents/cmd](../../../resources/reporters/currents-cmd/) as a dev dependency in `package.json`, and use `npm ci` or another package manager's **frozen lockfile** install method in GitHub Actions. Otherwise the [Last Failed GitHub Action](https://github.com/currents-dev/playwright-last-failed) installs a global package. The global package does not use the repository lock files and always pulls the latest `@currents/cmd` and its dependencies.
{% endhint %}

Select the guide that matches the CI setup:

* [Sharded runs](re-run-failed-only-tests-sharded.md "mention") — fixed shard count and native Playwright `--shard` parallelism
* [Orchestrated runs (V1)](re-run-failed-only-tests-orchestrated.md "mention") — single-command `pwc-p`
* [Orchestrated runs (V2)](re-run-failed-only-tests-orchestrated-v2.md "mention") — `pwc-p discover` and `pwc-p run`
* [Custom CI build ID for reruns](custom-ci-build-id-for-reruns.md "mention") — for sharded or orchestrated runs with a non-default CI build ID
