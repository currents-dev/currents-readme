---
description: A guide on rerunning only failed Playwright tests in CI
---

# Re-run Only Failed Tests

Starting from version [1.44](https://playwright.dev/docs/release-notes?ref=playwrightsolutions.com#version-144) Playwright supports [running only the failed test from the last run](https://playwrightsolutions.com/how-to-run-failures-only-from-the-last-playwright-run/) using `--last-failed` CLI flag. For example:

```
playwright test --last-failed
```

<figure><img src="../../.gitbook/assets/currents-2024-09-30-13.43.44@2x.png" alt=""><figcaption><p>Rerunning Failed Only Playwright Tests</p></figcaption></figure>

While this feature works well for local environments, using it in CI with Playwright shards or Currents Orchestration is not straightforward.&#x20;

We have created a set of tools that simplify rerunning only the failed Playwright tests in CI, including sharded parallel CI runs and runs created by Currents Orchestration.&#x20;

## For sharded runs

The suggested templates do not require maintaining complex CI configurations and scripts - they are compatible with popular CI providers and can be used even without Currents reporter.

{% hint style="info" %}
For **non-orchestrated** Playwright sharding (`--shard`), `@currents/cmd` is **not required** for reruns to work: `--last-failed` needs the prior run's outputs (for example `.last-run.json`). The [Last Failed GitHub Action](https://github.com/currents-dev/playwright-last-failed) can supply that data without listing `@currents/cmd` in your project—it installs and runs the CLI globally when the package is absent—but we still recommend adding `@currents/cmd` as a dev dependency so the CLI version is pinned by your lockfile (see [re-run-failed-only-tests.md](../../getting-started/ci-setup/github-actions/re-run-failed-only-tests.md "mention")). Pipelines that invoke `currents cache` or other `currents` commands directly should install `@currents/cmd` as shown in those guides.
{% endhint %}

Step-by-step guides and examples:

* **GitHub Actions** — [re-run-failed-only-tests.md](../../getting-started/ci-setup/github-actions/re-run-failed-only-tests.md "mention")
* **GitLab CI** — [re-run-failed-only-tests.md](../../getting-started/ci-setup/gitlab/re-run-failed-only-tests.md#playwright-sharding "mention") (Playwright sharding)
* **Jenkins Pipeline** — [jenkins.md](../../getting-started/ci-setup/jenkins.md#using-last-failed-flag-with-shards-and-orchestration "mention")

## For orchestrated runs

{% hint style="info" %}
When rerunning failed orchestrated runs, select "Rerun All Jobs" instead of "Rerun Failed Only"
{% endhint %}

Orchestrated runs are conceptually different from the native playwright sharding. Currents assigns the tests dynamically to **all the available machines -** i.e. the more machines are available, the better (also, there's no need to provide the overall number of CI machines in advance).

<figure><img src="../../.gitbook/assets/currents-2024-09-30-13.59.22@2x.png" alt=""><figcaption><p>Rerunning Failed Only Playwright Tests using Currents Orchestration</p></figcaption></figure>

That's why when rerunning failed orchestrated CI runs, you'd select "Rerun All Jobs" instead of "Rerun Failed Only":

* The CI provider will spin up all the containers
* Currents will dynamically assign the failed tests to all the available containers
* More available containers will run the tests in parallel faster

Step-by-step guides and examples:

* **GitHub Actions** — [re-run-failed-only-tests.md](../../getting-started/ci-setup/github-actions/re-run-failed-only-tests.md "mention")
* **GitLab CI** — [re-run-failed-only-tests.md](../../getting-started/ci-setup/gitlab/re-run-failed-only-tests.md "mention")
* **Jenkins Pipeline** — [jenkins.md](../../getting-started/ci-setup/jenkins.md#using-last-failed-flag-with-shards-and-orchestration "mention")
