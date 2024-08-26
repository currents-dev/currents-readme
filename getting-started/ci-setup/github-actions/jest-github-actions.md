---
description: Running Jest in Parallel on GitHub Actions using Matrix Workflow
---

# Jest - GitHub Actions

{% hint style="info" %}
TL;DR Check out the example repository:

[https://github.com/currents-dev/currents-jest-github-actions-example](https://github.com/currents-dev/currents-jest-github-actions-example)
{% endhint %}

Currents uses the native [Jest sharding](https://jestjs.io/docs/next/cli#--shard) (Jest v28+) to split the tests between multiple containers.

Here's an example workflow configuration file:

{% code title=".github/workflows /jest.yml" overflow="wrap" %}
```yaml
name: Run Jest

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
      matrix:
        shard: [1, 2]

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: Install dependencies
        run: npm install

      - name: Run tests in shard ${{ matrix.shard }}
        run: |
          npx jest --shard=${{ matrix.shard }}/2

      - name: Upload test results to Currents.dev
        # CURRENTS_RECORD_KEY is a secret stored in the repository settings
        env:
          CURRENTS_RECORD_KEY: ${{ secrets.CURRENTS_RECORD_KEY }}
        run: |
          npx currents upload --project-id mdXsz8 --ci-build-id ${{ github.repository }}-${{ github.run_id }}-${{ github.run_attempt }}
```
{% endcode %}

* Get your [Record Key](../../../guides/record-key.md) and set [GH secret](https://docs.github.com/en/actions/reference/encrypted-secrets) variable`CURRENTS_RECORD_KEY`.&#x20;
* Set the Project ID
  * Option 1: Update `npx currents upload` `--project-id` argument to [your project's id](../../../dashboard/projects/project-settings.md).&#x20;
  * Option 2: Set it up in the [reporter config](https://docs.currents.dev/resources/reporters/currents-jest#configuration) instead.

### Explore

<table data-view="cards"><thead><tr><th></th><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td>@currents/jest</td><td></td><td></td><td><a href="../../../resources/reporters/currents-jest.md">currents-jest.md</a></td></tr><tr><td>CI Build ID</td><td></td><td></td><td><a href="../../../guides/ci-build-id.md">ci-build-id.md</a></td></tr><tr><td></td><td></td><td></td><td></td></tr></tbody></table>
