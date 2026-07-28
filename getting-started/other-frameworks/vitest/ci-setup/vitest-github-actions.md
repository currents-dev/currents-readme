---
description: Running Vitest in Parallel on GitHub Actions using Matrix Workflow
---

# Vitest - GitHub Actions

{% hint style="info" %}
TL;DR Check out the example repository:

[https://github.com/currents-dev/currents-junit-xml-example](https://github.com/currents-dev/currents-junit-xml-example/tree/main/packages/vitest)
{% endhint %}

Currents uses the native [Vitest sharding](https://vitest.dev/guide/cli#shard) to split the tests between multiple containers. Each shard writes its own JUnit XML report, converts it and uploads it under a shared [ci-build-id.md](../../../../guides/parallelization-guide/ci-build-id.md "mention").

Here's an example workflow configuration file:

{% code title=".github/workflows /vitest.yml" overflow="wrap" %}
```yaml
name: Run Vitest

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      fail-fast: false
      matrix:
        shard: [1, 2]

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "24.x"

      - name: Install dependencies
        run: npm install

      - name: Run tests in shard ${{ matrix.shard }}
        run: npx vitest run --shard=${{ matrix.shard }}/2 --reporter=default --reporter=junit --outputFile.junit=./results.xml

      # `vitest run` exits non-zero on test failures - report the results anyway
      - name: Convert test results to Currents format
        if: always()
        run: npx currents convert --input-format=junit --input-file=./results.xml --output-dir=.currents --framework=vitest --framework-version=v3.2.4

      - name: Upload test results to Currents.dev
        if: always()
        # CURRENTS_RECORD_KEY is a secret stored in the repository settings
        env:
          CURRENTS_RECORD_KEY: ${{ secrets.CURRENTS_RECORD_KEY }}
        run: |
          npx currents upload --project-id XXXXXX --ci-build-id ${{ github.repository }}-${{ github.run_id }}-${{ github.run_attempt }}
```
{% endcode %}

* Get your [Record Key](../../../../guides/record-key.md) and set [GH secret](https://docs.github.com/en/actions/reference/encrypted-secrets) variable`CURRENTS_RECORD_KEY`.&#x20;
* Update `npx currents upload` `--project-id` argument to [your project's id](../../../../dashboard/projects/project-settings.md).&#x20;
* Set `--framework-version` to the Vitest version installed in the workflow.

### Explore

<table data-view="cards"><thead><tr><th></th><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td>@currents/cmd</td><td></td><td></td><td><a href="../../../../resources/reporters/currents-cmd/">currents-cmd</a></td></tr><tr><td>CI Build ID</td><td></td><td></td><td><a href="../../../../guides/parallelization-guide/ci-build-id.md">ci-build-id.md</a></td></tr><tr><td>currents convert</td><td></td><td></td><td><a href="../../../../resources/reporters/currents-cmd/currents-convert.md">currents-convert.md</a></td></tr></tbody></table>
