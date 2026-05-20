---
description: Playwright Orchestration Setup Guide for Currents v1
---

# Orchestration (v1)

{% hint style="warning" %}
This page documents orchestration flow for deprecated `v1` version of Currents. See [playwright-orchestration-migration-guide.md](playwright-orchestration-migration-guide.md "mention").
{% endhint %}

Orchestration helps decrease the duration of Playwright tests in CI pipelines. Read our detailed guide on [playwright-parallelization.md](playwright-parallelization.md "mention") that compares native sharding with orchestration.

## How does it work

`@currents/playwright` contains a command-line executable `pwc-p` — a lightweight wrapper that implements Orchestration and runs Playwright behind the scenes.

* it scans the testing suite
* it establishes an orchestration session with Currents servers
* **it** runs Playwright, executing spec files in the optimal order
* the results are recorded to Currents for troubleshooting and analysis

## Setup

Install `@currents/playwright`:

```bash
npm i @currents/playwright
```

Replace `playwright` with `pwc-p`:

```bash
npx pwc-p --key <record-key> --project-id <project-id> --ci-build-id <ci-build-id>
```

`pwc-p` accepts additional Playwright arguments and flags (see [currents-playwright](../../resources/reporters/currents-playwright/ "mention")), for example:

{% code overflow="wrap" %}
```bash
# Add additional playwright arguments and flags:
pwc-p --key <record-key> --project-id <id> --ci-build-id <build-id> -- --workers 2 --timeout 10000
```
{% endcode %}

{% hint style="success" %}
Read more about [ci-build-id.md](../parallelization-guide/ci-build-id.md "mention") and [reporting-strategy.md](../parallelization-guide/reporting-strategy.md "mention").
{% endhint %}

{% hint style="info" %}
There's no need to define shards. Remove the `--shard` flag — Currents uses all available machines automatically.
{% endhint %}

A successfully created orchestration prints an output similar to this:

{% code overflow="wrap" %}
```bash
$ npx pwc-p --key **redacted** --project-id **redacted** --ci-build-id `date +%s` -c ./or8n/playwright.config.ts

🚀 Starting orchestration session...
📦 Currents reporter: 1.1.2 recording CI build 1712134904 for project JJzd65, orchestration id 260264cfa16950ab4dc98d5c54333136
🎭 Playwright: 1.42.1 5 tests in 1 project [chromium]

🌐 Executing orchestrated task: [chromium] spec-or8n-e.spec.ts
🌐 Run URL: https://app.currents.dev/run/9b93659915fe653f
# ...start executing the tests in an optimal order.
```
{% endcode %}
