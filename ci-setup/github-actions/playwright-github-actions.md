---
description: Running Playwright in Parallel on GitHub Actions using Matrix Workflow
---

# Playwright - GitHub Actions

{% hint style="info" %}
TL;DR Check out the example repository:

[https://github.com/currents-dev/playwright-gh-actions-demo](https://github.com/currents-dev/playwright-gh-actions-demo)
{% endhint %}

Currents uses the native [Playwright Sharding](https://playwright.dev/docs/test-sharding) to split the tests between multiple containers. Currents will collect the results from distributed runs, together with the generated artifacts for more efficient troubleshooting and providing insights into the test suite performance:

* console output
* screenshots
* videos
* traces

The [example repository](https://github.com/currents-dev/playwright-gh-actions-demo) `https://github.com/currents-dev/playwright-gh-actions-demo` showcases running Playwright tests in parallel using GitHub Actions.

Here's an example configuration file:

{% code overflow="wrap" %}
```yaml
name: demo.playwright.pwc
on:
  workflow_dispatch:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  basicTests:
    strategy:
      fail-fast: false
      matrix:
        # run 3 copies of the current job in parallel
        shard: [1, 2, 3]

    name: "Playwright tests"
    timeout-minutes: 60
    runs-on: ubuntu-22.04
    container: mcr.microsoft.com/playwright:latest
    steps:
      - uses: actions/checkout@v3
        with:
          ref: ${{ github.event.pull_request.head.sha }}

      # https://github.com/actions/runner-images/issues/6775
      - run: |
          echo "$GITHUB_WORKSPACE"
          git config --global --add safe.directory "$GITHUB_WORKSPACE"

      - uses: actions/setup-node@v3
        with:
          node-version: "18.x"

      - name: Install dependencies
        run: |
          npm ci
          npx playwright install msedge
          npx playwright install chrome

      # Grab 
      # - CURRENTS_PROJECT_ID
      # - CURRENTS_RECORD_KEY
      # at https://app.currents.dev 
      #
      # Read more about CI Build ID:
      # https://currents.dev/readme/guides/cypress-ci-build-id
      - name: Run Basic Tests
        continue-on-error: false
        working-directory: ./basic
        env:
          CURRENTS_PROJECT_ID: 3BwCwz
          CURRENTS_RECORD_KEY: ${{ secrets.CURRENTS_RECORD_KEY }}
        run: |
          npx playwright install 
          npx pwc --shard=${{ matrix.shard }}/${{ strategy.job-total }} --ci-build-id "${{ github.repository }}-${{ github.run_id }}-${{ github.run_attempt }}"
```
{% endcode %}

We've included 3 different config files to exemplify the workflows:&#x20;

* The example workflow [test-basic-reporter.yml](https://github.com/currents-dev/playwright-gh-actions-demo/blob/main/.github/workflows/test-basic-reporter.yml) runs 3 containers with Playwright tests in parallel.
* The example workflow [full-parallel-prod.yml](https://github.com/currents-dev/playwright-gh-actions-demo/blob/main/.github/workflows/full-parallel-prod.yml) runs 5 shards in full parallel mode.&#x20;
* The example workflow [test-or8n.yml](https://github.com/currents-dev/playwright-gh-actions-demo/blob/main/.github/workflows/test-or8n.yml) runs orchestrated tests
* Note: create an organization, get your record key on [Currents.dev](https://app.currents.dev) and set [GH secret](https://docs.github.com/en/actions/reference/encrypted-secrets) variable `CURRENTS_RECORD_KEY`

Here's an example of how the first demo workflow appears in Currents dashboard:

![Running Playwright tests in parallel - Currents dashboard](../../.gitbook/assets/playwright-run.gif)
