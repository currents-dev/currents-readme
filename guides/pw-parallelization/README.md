---
description: >-
  Playwright tests parallelization using shards and reporting the results to
  Currents
---

# Playwright Parallelization

### Playwright Sharding

Running Playwright tests on CI eventually will require splitting the spec files between several CI machines for faster execution. Playwright has the built-in ability to split the tests into shards - each shard will run only a subset of tests.&#x20;

Read more about native [playwright-sharding.md](playwright-sharding.md "mention").



<figure><img src="../../.gitbook/assets/pw-shard-fast-bg (2).png" alt=""><figcaption><p>Sharding vs Orchestration</p></figcaption></figure>

### Playwright Orchestration by Currents

As your testing suite grows, you can discover that the native sharding is not always satisfactory and can be optimized:

* the native split of spec files between machines can be non-optimal, leading to underutilized resources and slow CI runs
* updating the shards amount requires updating CI configuration
* spec files' names affect the distribution of tests between shards
* collecting the reports across multiple machines is cumbersome

Read more about [Playwright Orchestration](playwright-orchestration.md) to discover how Currents improves the native orchestration.
