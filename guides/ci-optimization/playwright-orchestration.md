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

There's no need to define shards. Make sure to remove the `--shard` flag — Currents uses all available machines automatically.

## Choose an implementation version

Currents Orchestration has two implementation flows for Playwright.

| Version | Use this when | Setup guide | Failed-test reruns |
| ------- | ------------- | ----------- | ------------------- |
| V1 | Projects using the single-command `pwc-p` orchestration flow. | [playwright-orchestration-v1.md](playwright-orchestration-v1.md "mention") | [re-run-only-failed-tests-orchestrated.md](re-run-only-failed-tests-orchestrated.md "mention") |
| V2 | Projects using `pwc-p discover` and `pwc-p run` (preview). Discovery is required only when applying CLI filters. | [playwright-orchestration-v2.md](playwright-orchestration-v2.md "mention") | [re-run-only-failed-tests-orchestrated-v2.md](re-run-only-failed-tests-orchestrated-v2.md "mention") |

{% hint style="info" %}
The purpose of orchestration has not changed between V1 and V2. V1 discovers and runs tests from one command; V2 separates discovery from execution when CLI filters are used.
{% endhint %}

## Related guides

* [playwright-orchestration-v1.md](playwright-orchestration-v1.md "mention")
* [playwright-orchestration-v2.md](playwright-orchestration-v2.md "mention")
* [re-run-only-failed-tests.md](re-run-only-failed-tests.md "mention")
* [ci-tests-on-spot-instances.md](ci-tests-on-spot-instances.md "mention")
