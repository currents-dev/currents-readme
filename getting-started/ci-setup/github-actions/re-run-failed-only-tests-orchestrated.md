---
description: How to set up failed test reruns for orchestrated Playwright runs on GitHub Actions
---

# Re-run Only Failed Tests — Orchestrated runs

When using Currents Orchestration, reruns of failed tests require a different approach than native Playwright sharding.

{% hint style="info" %}
**Important**: With Currents Orchestration, use **Rerun all jobs** (not "Rerun failed only") when retrying failed tests. This allows Currents to redistribute all tests across available machines for optimal performance. Learn more in the [CI optimization guide](../../../guides/ci-optimization/re-run-only-failed-tests-orchestrated.md "mention").
{% endhint %}

Step-by-step guide:

<details>

<summary>Install the @currents/cmd package</summary>

```bash
npm i -D @currents/cmd
```

</details>

<details>

<summary>Set <code>CURRENTS_API_KEY</code> CI environment variable</summary>

Create an API key in Currents Dashboard (see [Authentication](https://app.gitbook.com/s/lcxad7NaXT7D2V6owvHN/get-started/authentication "mention")) in addition to the Record Key. Then add it as a [GitHub Actions Secret](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions).

```yaml
env:
  CURRENTS_RECORD_KEY: ${{ secrets.CURRENTS_RECORD_KEY }}
  CURRENTS_API_KEY: ${{ secrets.CURRENTS_API_KEY }}
```

</details>

<details>

<summary>Add the currents-dev/playwright-last-failed step</summary>

Add a step that fetches the last-run information before tests run.

```yaml
- name: Playwright Last Failed action
  id: last-failed-action
  uses: currents-dev/playwright-last-failed@v2
  with:
    or8n: true
    # debug: true
    pw-output-dir: basic/test-results
```

See the [action configuration for details](https://github.com/currents-dev/playwright-last-failed/blob/main/action.yml) on the inputs.

</details>

<details>

<summary>A full example</summary>

{% code lineNumbers="true" %}
```yaml
name: failed-only-or8n

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
    container: mcr.microsoft.com/playwright:latest
    env:
      CURRENTS_PROJECT_ID: bnsqNa
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
      - name: Playwright Tests
        working-directory: ./basic
        run: |
          COMMAND="npx pwc-p ${{ steps.last-failed-action.outputs.extra-pw-flags }}"
          echo "Running command: $COMMAND"
          $COMMAND
```
{% endcode %}

</details>

{% hint style="info" %}
For a workflow with a custom CI build ID, see [custom-ci-build-id-for-reruns.md](custom-ci-build-id-for-reruns.md "mention").
{% endhint %}

Example workflow:

* [reruns-or8n.yml](https://github.com/currents-dev/currents-examples/blob/main/playwright/ci/github-actions/.github/workflows/reruns-or8n.yml) - rerun only the tests that failed in the previous orchestrated run.
