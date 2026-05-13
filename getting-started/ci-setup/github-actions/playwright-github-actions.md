---
description: Running Playwright tests in Parallel in GitHub Actions using Matrix Workflow
---

# Quick Start

{% hint style="info" %}
Check out the example repository [https://github.com/currents-dev/currents-examples](https://github.com/currents-dev/currents-examples/tree/main/playwright/ci/github-actions)
{% endhint %}

### Quick Start

The example workflow file below shows how to run Playwright tests in GitHub actions.

```yaml
name: demo.playwright.pwc
on:
  workflow_dispatch:
  pull_request:
    branches: [main]
  push:
    branches: [main]
jobs:
  run-tests:
    name: "Playwright Tests"
    timeout-minutes: 60
    runs-on: ubuntu-22.04
    container: mcr.microsoft.com/playwright:v1.59.1-noble

    steps:
      - uses: actions/checkout@v4
        with:
          ref: ${{ github.event.pull_request.head.sha }}

      # https://github.com/actions/runner-images/issues/6775
      - run: |
          echo "$GITHUB_WORKSPACE"
          git config --global --add safe.directory "$GITHUB_WORKSPACE"

      - uses: actions/setup-node@v4
        with:
          node-version: "24.x"

      - name: Install dependencies
        run: | # Add more browsers if needed
          npm ci
          npx playwright install chrome

      - name: Playwright Tests
        continue-on-error: false
        env:
          CURRENTS_PROJECT_ID: bnsqNa # Update to the Currents Project ID
          CURRENTS_RECORD_KEY: ${{ secrets.CURRENTS_RECORD_KEY }}
        run: |
          npx pwc
```

The workflow above is the simplest way to get started. As the test suite grows, parallelization helps keep execution time fast.&#x20;

### Parallelization

The [GitHub Actions matrix execution strategy](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstrategymatrix) can create multiple containers that run Playwright tests in parallel.

Each container receives a unique set of tests. This makes the browser test suite finish faster and gives feedback sooner.

<figure><img src="../../../.gitbook/assets/CI Runners.png" alt="Tests Parallelization with Github Actions"><figcaption><p>Tests Parallelization with Github Actions</p></figcaption></figure>

This can be done with [Playwright Sharding](https://playwright.dev/docs/test-sharding). Playwright can split tests between multiple CI machines using the `--shard` CLI flag. The examples below show how to set up sharding and orchestration.

{% hint style="info" %}
Looking for more ways to speed up CI? Read our [ci-optimization](../../../guides/ci-optimization/ "mention") page.
{% endhint %}

### Examples

The [example repository](https://github.com/currents-dev/currents-examples/tree/main/playwright/ci/github-actions) showcases running Playwright tests in GitHub Actions. We've included several config files to exemplify the workflows:&#x20;

* [test-basic-pwc.yml](https://github.com/currents-dev/currents-examples/blob/main/playwright/ci/github-actions/.github/workflows/test-basic-pwc.yml) - run Playwright tests in parallel using 3 shards of GitHub Actions Matrix and `pwc` command.
* [test-basic-reporter.yml](https://github.com/currents-dev/currents-examples/blob/main/playwright/ci/github-actions/.github/workflows/test-basic-reporter.yml) - run Playwright tests in parallel run using 3 shards of GitHub Actions Matrix and configuring Currents Reporter in `playwright.config.ts`.
* [test-or8n.yml](https://github.com/currents-dev/currents-examples/blob/main/playwright/ci/github-actions/.github/workflows/test-or8n.yml) - run Playwright tests in parallel Playwright using [playwright-orchestration.md](../../../guides/ci-optimization/playwright-orchestration.md "mention") and GitHub Actions Matrix. Currents Orchestration speeds up CI runs by up to 40% (compared to native sharding) by optimally balancing tests between the available machines.
* [argos-example.yml](https://github.com/currents-dev/currents-examples/blob/main/playwright/ci/github-actions/.github/workflows/argos-example.yml) - run Playwright tests in parallel using Currents Orchestration, use Argos CI for visual testing.
