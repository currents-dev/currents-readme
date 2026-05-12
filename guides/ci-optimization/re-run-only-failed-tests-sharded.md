---
description: Re-run only failed Playwright tests when using native CI sharding
---

# Re-run Only Failed Tests — Sharded runs

The suggested templates do not require maintaining complex CI configurations and scripts - they are compatible with popular CI providers and can be used even without Currents reporter.

{% hint style="info" %}
For **non-orchestrated** Playwright sharding (`--shard`), `@currents/cmd` is **not required** for reruns to work: `--last-failed` needs the prior run's outputs (for example `.last-run.json`). The [Last Failed GitHub Action](https://github.com/currents-dev/playwright-last-failed) can supply that data without listing `@currents/cmd` in your project—it installs and runs the CLI globally when the package is absent—but we still recommend adding `@currents/cmd` as a dev dependency so the CLI version is pinned by your lockfile (see [re-run-failed-only-tests.md](../../getting-started/ci-setup/github-actions/re-run-failed-only-tests.md "mention")). Pipelines that invoke `currents cache` or other `currents` commands directly should install `@currents/cmd` as shown in those guides.
{% endhint %}

Step-by-step guides and examples:

* **GitHub Actions** — [re-run-failed-only-tests.md](../../getting-started/ci-setup/github-actions/re-run-failed-only-tests.md "mention")
* **GitLab CI** — [re-run-failed-only-tests.md](../../getting-started/ci-setup/gitlab/re-run-failed-only-tests.md#playwright-sharding "mention") (Playwright sharding)
* **Jenkins Pipeline** — [jenkins.md](../../getting-started/ci-setup/jenkins.md#using-last-failed-flag-with-shards-and-orchestration "mention")

See also the overview: [re-run-only-failed-tests.md](re-run-only-failed-tests.md "mention").
