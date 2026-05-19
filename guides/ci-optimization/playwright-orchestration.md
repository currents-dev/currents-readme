---
description: Playwright Orchestration setup instructions
---

# Orchestration Setup

Orchestration helps decrease the duration of Playwright tests in CI pipelines. Read our detailed guide on [playwright-parallelization.md](playwright-parallelization.md "mention") that compares native sharding with orchestration.

## How does it work

`@currents/playwright` includes `pwc-p`, a command-line executable that coordinates Playwright test execution with Currents Orchestration.

At a high level, orchestration:

* discovers the test suite
* establishes an orchestration session with Currents servers
* assigns work to available CI machines in an optimal order
* records results to Currents for troubleshooting and analysis

{% hint style="info" %}
Currents uses all available machines automatically, so removing the `--shard` flag from the execution command is required.
{% endhint %}
