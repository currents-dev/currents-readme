---
description: How to set up failed test reruns for sharded Playwright runs on GitHub Actions
---

# Re-run Only Failed Tests — Sharded runs

With [playwright-sharding.md](../../../guides/parallelization-guide/playwright-sharding.md "mention") for parallel runs, the [Last Failed GitHub Action](https://github.com/currents-dev/playwright-last-failed) can include the data from the last run.

Step-by-step guide:

<details>

<summary>Add the currents-dev/playwright-last-failed step</summary>

Add a step to the workflow before the test step runs.

<pre class="language-yaml"><code class="lang-yaml">- name: Playwright Last Failed action
<strong>  id: last-failed-action
</strong><strong>  uses: currents-dev/playwright-last-failed@v2
</strong>  with:
    pw-output-dir: basic/test-results
    matrix-index: ${{ matrix.shard }}
    matrix-total: ${{ strategy.job-total }}
</code></pre>

See the [action configuration for details](https://github.com/currents-dev/playwright-last-failed/blob/main/action.yml).

</details>

<details>

<summary>A full example</summary>

{% code lineNumbers="true" %}
```yaml
name: failed-only-reruns

on:
  push:

jobs:
  test-reporter:
    strategy:
      fail-fast: false
      matrix:
        shard: [1, 2, 3]
    timeout-minutes: 60
    runs-on: ubuntu-latest
    container: mcr.microsoft.com/playwright:v1.60.0-noble
    env:
      CURRENTS_PROJECT_ID: bnsqNa
      CURRENTS_RECORD_KEY: ${{ secrets.CURRENTS_RECORD_KEY }}
      CURRENTS_CI_BUILD_ID: ${{ github.repository }}-${{ github.run_id }}-${{ github.run_attempt }}
    steps:
      - uses: actions/checkout@v4
        with:
          ref: ${{ github.ref }}
      - run: |
          echo "$GITHUB_WORKSPACE"
          git config --global --add safe.directory "$GITHUB_WORKSPACE"
      - uses: actions/setup-node@v4
        with:
          node-version: "24.x"
      - name: Install dependencies
        run: |
          npm ci
          npx playwright install chrome
      - name: Playwright Last Failed action
        id: last-failed-action
        uses: currents-dev/playwright-last-failed@v2
        with:
          pw-output-dir: basic/test-results
          matrix-index: ${{ matrix.shard }}
          matrix-total: ${{ strategy.job-total }}
      - name: Playwright Tests
        working-directory: ./basic
        run: |
          COMMAND="npx playwright test --config playwright.config.reporter.ts ${{ steps.last-failed-action.outputs.extra-pw-flags }}"
          echo "Running command: $COMMAND"
          $COMMAND
```
{% endcode %}

</details>

{% hint style="info" %}
For a workflow with a custom CI build ID, see [custom-ci-build-id-for-reruns.md](custom-ci-build-id-for-reruns.md "mention").
{% endhint %}

Full examples:

* [rerun-shards-pwc.yml](https://github.com/currents-dev/currents-examples/blob/main/playwright/ci/github-actions/.github/workflows/rerun-shards-pwc.yml) - rerun only the tests that failed in the previous run, using the `pwc` helper command from `@currents/playwright`.
* [rerun-shards-reporter.yml](https://github.com/currents-dev/currents-examples/blob/main/playwright/ci/github-actions/.github/workflows/rerun-shards-reporter.yml) - rerun only the tests that failed in the previous run, using reporter setup in `playwright.config.ts`.
