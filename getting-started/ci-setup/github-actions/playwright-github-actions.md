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

We've included several different config files to exemplify the workflows:&#x20;

* The example workflow [test-basic-reporter.yml](https://github.com/currents-dev/playwright-gh-actions-demo/blob/main/.github/workflows/test-basic-reporter.yml) runs 3 containers with Playwright tests in parallel.
* The example workflow [full-parallel-prod.yml](https://github.com/currents-dev/playwright-gh-actions-demo/blob/main/.github/workflows/full-parallel-prod.yml) runs 5 shards in full parallel mode.&#x20;
* The example workflow [test-or8n.yml](https://github.com/currents-dev/playwright-gh-actions-demo/blob/main/.github/workflows/test-or8n.yml) runs orchestrated tests
* Note: create an organization, get your record key on [Currents.dev](https://app.currents.dev) and set [GH secret](https://docs.github.com/en/actions/reference/encrypted-secrets) variable `CURRENTS_RECORD_KEY`

Here's an example of how the first demo workflow appears in Currents dashboard:

![Running Playwright tests in parallel - Currents dashboard](../../../.gitbook/assets/playwright-run.gif)

### Setup Re-running of failed tests

{% hint style="info" %}
See the [Re-run Only Failed Tests guide](../../../guides/re-run-only-failed-tests.md) for for information on this feature
{% endhint %}

When a workflow fails in GitHub, you have the option to re-run the failed jobs. Using the `currents` cli tool, you can choose to run only the previously failed test when re-running failed workflows. Playwright test has a `--last-failed` flag that you can pass to only run failed jobs, but it relies on you having stored information about the last run. The following commands are available for populating the last-run information for Playwright sharding and Currents orchestration.

#### Playwright Sharding

The `currents cache` command can be used to store the last run and simplify re-run workflows.

1. Install the `@currents/cmd` package to your `package.json` to access the `cache` command
2. Add a step to the end of your workflow that uploads run information to the cache
3. Add a step that downloads the cache prior to running tests
4. Use the cache helpers to automatically detect reruns  run just the last-failed tests&#x20;

{% hint style="info" %}
Example workflows are available in our GitHub repositories:



Rerun only failed tests on GitHub Actions using Playwright Shards + Currents `pwc` command.

* [https://github.com/currents-dev/playwright-gh-actions-demo/blob/main/.github/workflows/rerun-shards-pwc.yml](https://github.com/currents-dev/playwright-gh-actions-demo/blob/main/.github/workflows/rerun-shards-pwc.yml)

Rerun only failed tests on GitHub Actions using Playwright Shards + Currents reporter in `playwright.config.ts`.

* [https://github.com/currents-dev/playwright-gh-actions-demo/blob/main/.github/workflows/rerun-shards-reporter.yml](https://github.com/currents-dev/playwright-gh-actions-demo/blob/main/.github/workflows/rerun-shards-reporter.yml)
{% endhint %}

<details>

<summary>Install the @currents/cmd package</summary>

```bash
npm i -D @currents/cmd
```

</details>

<details>

<summary>Add an upload cache step</summary>

Add a step to your workflow that always runs after you run your tests

```yaml
- name: Cache the last run results
  if: ${{ always() }}
  run: |
    npx currents cache set \
      --preset last-run \
      --pw-output-dir test-results \
      --matrix-index ${{ matrix.shard }} \
      --matrix-total ${{ strategy.job-total }}
```

See the [configuration for details](../../../resources/reporters/currents-cmd/#cache-test-artifacts) on the flags.

</details>

<details>

<summary>Add a download cache step</summary>

Add a step to your workflow before you run your tests

```yaml
- name: Run Tests
  run: |
    npx currents cache get \
      --preset last-run \
      --preset-output .preset_output \
      --matrix-index ${{ matrix.shard }} \
      --matrix-total ${{ strategy.job-total }}
    npx playwright test $(cat .preset_output)
```

See the [configuration for details](../../../resources/reporters/currents-cmd/#cache-test-artifacts) on the flags.

</details>

<details>

<summary>A full example</summary>

{% code lineNumbers="true" %}
```yaml
name: failed-only-reporter

on:
  push:
  workflow_dispatch:

jobs:
  test-reporter:
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
    steps:
      - uses: actions/checkout@v4
        with:
          ref: ${{ github.ref }}

      - uses: actions/setup-node@v4
        with:
          node-version: "18.x"

      - name: Install dependencies
        run: |
          npm ci
          npx playwright install chrome
    
      - name: Run Tests
        run: |
          npx currents cache get \
            --preset last-run \
            --preset-output .preset_output \
            --matrix-index ${{ matrix.shard }} \
            --matrix-total ${{ strategy.job-total }}
          npx playwright test $(cat .preset_output)
  
      - name: Cache the last run results
        if: ${{ always() }}
        run: |
          npx currents cache set \
            --preset last-run \
            --pw-output-dir test-results \
            --matrix-index ${{ matrix.shard }} \
            --matrix-total ${{ strategy.job-total }}
```
{% endcode %}

</details>

#### Currents Orchestration

The `currents api get-run` command can be used to retreive the last run from the Currents api.

1. Install the `@currents/cmd` package to your `package.json` to access the `api` command
2. Detect if you are in a re-run situation
   1. Add a step that fetches the last information prior to running tests
3. Use the cache helpers to automatically detect reruns  run just the last-failed tests&#x20;

{% hint style="info" %}
Example workflows for setting up re-runs for GitHub Actions can be found at&#x20;

* [https://github.com/currents-dev/playwright-gh-actions-demo/blob/main/.github/workflows/reruns-or8n.yml](https://github.com/currents-dev/playwright-gh-actions-demo/blob/main/.github/workflows/reruns-or8n.yml)
{% endhint %}

<details>

<summary>Install the @currents/cmd package</summary>

```bash
npm i -D @currents/cmd
```

</details>

<details>

<summary>Fetch last-run information</summary>

Add a step that fetches the last-run information prior to running tests

```yaml
- name: Resolve Playwright options
  # --output basic/test-results/.last-run.json should point to the directory where the test results are stored
  run: |
    PREVIOUS_CI_BUILD_ID="${GITHUB_REPOSITORY}-${GITHUB_RUN_ID}-$((GITHUB_RUN_ATTEMPT - 1))"
    EXTRA_PW_FLAGS=""
    if [ ${{ github.run_attempt }} -gt 1 ]; then
      if npx currents api get-run --pw-last-run --ci-build-id $PREVIOUS_CI_BUILD_ID --output basic/test-results/.last-run.json; then
       EXTRA_PW_FLAGS="--last-failed"
      fi
    fi
    echo "EXTRA_PW_FLAGS=$EXTRA_PW_FLAGS" >> $GITHUB_ENV
```

See the [configuration for details ](../../../resources/reporters/currents-cmd/#use-currents-api)on the flags.

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

      # https://github.com/actions/runner-images/issues/6775
      - run: |
          echo "$GITHUB_WORKSPACE"
          git config --global --add safe.directory "$GITHUB_WORKSPACE"
      - uses: actions/setup-node@v4
        with:
          node-version: "20.x"

      - name: Install dependencies
        run: |
          npm ci
          npx playwright install chrome
          npm install -g @currents/cmd@beta
      - name: Resolve Playwright options
        # --output basic/test-results/.last-run.json should point to the directory where the test results are stored
        run: |
          PREVIOUS_CI_BUILD_ID="${GITHUB_REPOSITORY}-${GITHUB_RUN_ID}-$((GITHUB_RUN_ATTEMPT - 1))"
          EXTRA_PW_FLAGS=""
          if [ ${{ github.run_attempt }} -gt 1 ]; then
            if npx currents api get-run --pw-last-run --ci-build-id 
            $PREVIOUS_CI_BUILD_ID --output basic/test-results/.last-run.json; then
              EXTRA_PW_FLAGS="--last-failed"
            fi
          fi
          echo "EXTRA_PW_FLAGS=$EXTRA_PW_FLAGS" >> $GITHUB_ENV

      - name: Playwright Tests
        working-directory: ./basic
        run: |
          COMMAND="npx pwc-p ${{ env.EXTRA_PW_FLAGS }}"
          echo "Running command: $COMMAND"
          eval $COMMAND
```
{% endcode %}

</details>
