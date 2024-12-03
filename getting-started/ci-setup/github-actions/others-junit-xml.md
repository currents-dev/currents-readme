---
description: Reporting your JUnit XML tests to Currents in CI
---

# Others (JUnit XML)

Unit tests are usually executed in CI environments and can be reported to Currents by [`currents upload`](../../../resources/reporters/currents-cmd/currents-upload.md) command in [`@currents/cmd`](../../../resources/reporters/currents-cmd/) package.

The process is the same for all the JUnit XML files that will be reported to Currents:

1. Generate test results into JUnit XML file/files
2. Merge all result XML files into a single JUnit XML report file called `currents.results.xml`
3. Generate Instance files from `currents.results.xml`
4. Call `currents upload` command and report the results.

{% hint style="info" %}
We have included [`currents convert`](../../../resources/reporters/currents-cmd/currents-convert.md) command that allows [Postman results](broken-reference).
{% endhint %}

This [example repository](https://github.com/currents-dev/currents-junit-xml-example.git) has a vitest test suite executed in a sharded CI environment.

```yaml
name: Vitest Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:

jobs:
  test:
    runs-on: ubuntu-latest
    environment: test
    strategy:
      matrix:
        shard: [1, 2]
        total-shards: [2]

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm i

      - name: Run Vitest Tests (Shard ${{ matrix.shard }}/${{ matrix.total-shards }})
        continue-on-error: true
        run: npx vitest --run --shard=${{ matrix.shard }}/${{ matrix.total-shards }} vitest-sharded-example/tests/** --reporter=junit --outputFile=./vitest-sharded-example/results-${{ matrix.shard }}.xml

      - name: Combine Vitest Sharded results
        run: node ./scripts/combineResults.js --reports-dir vitest-sharded-example --output-file vitest-sharded-example/currents.results.xml

      - name: Generate Instance files
        run:  node scripts/junitXmlToInstanceJson.js --input vitest-sharded-example/currents.results.xml --output vitest-sharded-example/instances

      - name: Report Vitest Sharded results
        env:
          CURRENTS_KEY: ${{ secrets.CURRENTS_KEY }}
          CURRENTS_PROJECT_ID: ${{ secrets.CURRENTS_PROJECT_ID }}
          CURRENTS_CI_BUILD_ID: ${{ github.run_id }}-${{ github.run_number }}
        run: node scripts/uploadResults.js --report-dir vitest-sharded-example
```

#### CI Build ID

See [CI Build ID](https://docs.currents.dev/guides/ci-build-id) guide for details.

#### Git Information

In a CI environment, some variables are collected by the `currents upload` command. The `ci-build-id` will be [automatically generated using the collected CI data](../../../guides/ci-build-id.md#build-id-for-popular-ci-providers).

The [Git information](commit-data-for-github-actions.md) will also be retrieved from the CI environment
