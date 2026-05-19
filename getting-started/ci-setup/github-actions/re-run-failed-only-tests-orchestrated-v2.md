---
description: How to set up failed test reruns for Orchestration on GitHub Actions
---

{% hint style="info" %}
Currents Orchestration assigns tests to all available CI runners, so **Re-run all jobs** should be used instead of re-running only failed jobs. Read more at [re-run-only-failed-tests-orchestrated-v2.md](../../../guides/ci-optimization/re-run-only-failed-tests-orchestrated-v2.md "mention").
{% endhint %}

## Prerequisites

* [Orchestration V2](../../../guides/ci-optimization/playwright-orchestration-v2.md "mention") `@currents/playwright` on its latest version.
* `CURRENTS_RECORD_KEY`, `CURRENTS_PROJECT_ID`, and `CURRENTS_API_KEY` configured in GitHub Actions secrets
* [playwright-last-failed@v2](https://github.com/currents-dev/playwright-last-failed) — exposes `extra-discovery-flags` for the discover step

## Step-by-step

### Install `@currents/cmd`

The `playwright-last-failed` action depends on `@currents/cmd`. Pin it in the repository for reproducible installs:

```bash
npm i -D @currents/cmd
```

### Set `CURRENTS_API_KEY`

Create an API key in the Currents Dashboard (see [Authentication](https://app.gitbook.com/s/lcxad7NaXT7D2V6owvHN/get-started/authentication "mention")) in addition to the Record Key. Add it as a [GitHub Actions secret](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions).

```yaml
env:
  CURRENTS_RECORD_KEY: ${{ secrets.CURRENTS_RECORD_KEY }}
  CURRENTS_API_KEY: ${{ secrets.CURRENTS_API_KEY }}
```

### Add the Playwright Last Failed step

```yaml
- name: Playwright Last Failed action
  id: last-failed-action
  uses: currents-dev/playwright-last-failed@v2
  with:
    or8n: true
    pw-output-dir: basic/test-results
```

When `or8n: true`, the action sets `extra-discovery-flags` for `pwc-p discover` (for example `--last-failed` on reruns).

### Discover, then run

Run discovery once per job (or in a dedicated setup job that shares the test list artifact), then orchestrate with `pwc-p run`:

```yaml
- name: Discover tests to run
  working-directory: ./basic
  run: |
    npx pwc-p discover \
      --pwc-discovery-file tests.txt \
      ${{ steps.last-failed-action.outputs.extra-discovery-flags }}

- name: Playwright Tests
  working-directory: ./basic
  run: |
    npx pwc-p run \
      --pwc-discovery-file tests.txt
```

On the first run, `extra-discovery-flags` is empty and discovery records the full suite. On a workflow rerun, it includes `--last-failed` so only previously failed tests are orchestrated.

## Full example

{% code lineNumbers="true" %}
```yaml
name: failed-only-or8n-v2

on:
  push:

jobs:
  test-or8n:
    strategy:
      fail-fast: false
      matrix:
        shard: [1, 2, 3]
    timeout-minutes: 60
    runs-on: ubuntu-latest
    container: mcr.microsoft.com/playwright:v1.60.0-noble
    env:
      CURRENTS_PROJECT_ID: ${{ vars.CURRENTS_PROJECT_ID }}
      CURRENTS_RECORD_KEY: ${{ secrets.CURRENTS_RECORD_KEY }}
      CURRENTS_CI_BUILD_ID: ${{ github.repository }}-${{ github.run_id }}-${{ github.run_attempt }}
      CURRENTS_API_KEY: ${{ secrets.CURRENTS_API_KEY }}
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
          or8n: true
          pw-output-dir: basic/test-results
      - name: Discover tests to run
        working-directory: ./basic
        run: |
          npx pwc-p discover \
            --pwc-discovery-file tests.txt \
            ${{ steps.last-failed-action.outputs.extra-discovery-flags }}
      - name: Playwright Tests
        working-directory: ./basic
        run: |
          npx pwc-p run --pwc-discovery-file tests.txt
```
{% endcode %}

{% hint style="info" %}
For a workflow with a custom CI build ID, see [custom-ci-build-id-for-reruns.md](custom-ci-build-id-for-reruns.md "mention").
{% endhint %}

The full workflow is included above. For V1, see [reruns-or8n.yml](https://github.com/currents-dev/currents-examples/blob/main/playwright/ci/github-actions/.github/workflows/reruns-or8n.yml).
