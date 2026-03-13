---
description: Running Playwright tests in parallel on Buildkite with Currents
---

# Buildkite

{% hint style="info" %}
TL;DR Check out the example repository and the public Buildkite pipeline:

* [https://github.com/currents-dev/currents-examples/tree/main/playwright/ci/buildkite](https://github.com/currents-dev/currents-examples/tree/main/playwright/ci/buildkite)
* [https://buildkite.com/andrew-goldis/currents-buildkite](https://buildkite.com/andrew-goldis/currents-buildkite)
{% endhint %}

Run Playwright tests in parallel on [Buildkite](https://buildkite.com) using the native [Playwright Sharding](https://playwright.dev/docs/test-sharding) to split tests between multiple containers. Parallelizing tests helps decrease overall run duration.

Currents collects results from distributed parallel Buildkite builds for efficient troubleshooting. Each container receives a unique set of tests to run, providing faster feedback from your test suite.

## Setup

* Create an organization at [https://app.currents.dev](https://app.currents.dev)
* Create a new project
* Obtain `CURRENTS_RECORD_KEY` [record-key.md](../../guides/record-key.md "mention") and `CURRENTS_PROJECT_ID`
* Store `CURRENTS_RECORD_KEY` as a pipeline-level secret in your Buildkite dashboard or via the [Buildkite Secrets plugin](https://buildkite.com/docs/pipelines/security/secrets/managing)

## Sharding

Buildkite provides `BUILDKITE_PARALLEL_JOB` (0-indexed) and `BUILDKITE_PARALLEL_JOB_COUNT` environment variables for parallel jobs. Since Playwright shards are 1-indexed, compute the shard index as `BUILDKITE_PARALLEL_JOB + 1`:

{% code overflow="wrap" %}
```bash
npx playwright test --shard=$((BUILDKITE_PARALLEL_JOB + 1))/$BUILDKITE_PARALLEL_JOB_COUNT
```
{% endcode %}

## Configuration

Configure the Currents reporter in your `playwright.config.ts`:

{% code title="playwright.config.ts" overflow="wrap" %}
```typescript
import { currentsReporter } from "@currents/playwright";
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  reporter: [currentsReporter()],
  // ... other config
});
```
{% endcode %}

Create a `currents.config.ts` file:

{% code title="currents.config.ts" %}
```typescript
import { CurrentsConfig } from "@currents/playwright";

const currentsConfig: CurrentsConfig = {
  projectId: process.env.CURRENTS_PROJECT_ID ?? "your-project-id",
  recordKey: process.env.CURRENTS_RECORD_KEY ?? "",
};

export default currentsConfig;
```
{% endcode %}

## Example Pipeline

{% code title=".buildkite/pipeline.yml" overflow="wrap" %}
```yaml
steps:
  - label: ":playwright: Playwright Tests"
    command: |
      npm ci
      npx playwright install --with-deps
      npx playwright test --shard=$((BUILDKITE_PARALLEL_JOB + 1))/$BUILDKITE_PARALLEL_JOB_COUNT
    parallelism: 3
    plugins:
      - docker#v5.11.0:
          image: "mcr.microsoft.com/playwright:latest"
    env:
      CURRENTS_PROJECT_ID: "bnsqNa"
      CURRENTS_RECORD_KEY: "${CURRENTS_RECORD_KEY}"
```
{% endcode %}

This pipeline:

* Runs 3 parallel containers using Buildkite's `parallelism` feature
* Uses the official Microsoft Playwright Docker image
* Splits tests using Playwright's native sharding with Buildkite environment variables
* Reports results to Currents via the Playwright Reporter

## Environment Variables

| Variable                       | Description                                           |
| ------------------------------ | ----------------------------------------------------- |
| `CURRENTS_PROJECT_ID`          | Your Currents project ID                              |
| `CURRENTS_RECORD_KEY`          | Your Currents record key (store as secret)            |
| `BUILDKITE_PARALLEL_JOB`       | Current job index (0-indexed, provided by Buildkite)  |
| `BUILDKITE_PARALLEL_JOB_COUNT` | Total number of parallel jobs (provided by Buildkite) |

{% hint style="info" %}
Looking for more ways to speed up CI? Read our [ci-optimization](../../guides/ci-optimization/ "mention") guide.
{% endhint %}
