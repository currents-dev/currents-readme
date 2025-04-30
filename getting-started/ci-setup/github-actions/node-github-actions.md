---
description: Running Node.js  on GitHub Actions
---

# Node.js - GitHub Actions

{% hint style="info" %}
TL;DR Check out the example repository:

[https://github.com/currents-dev/currents-nodejs-github-actions-example](https://github.com/currents-dev/currents-nodejs-github-actions-example)
{% endhint %}

Here's an example workflow configuration file:

{% code title=".github/workflows /node.yml" overflow="wrap" %}
```yaml
name: Run Node.JS

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

      - name: install currents
        run: npm install @currents/node-test-reporter @currents/cmd

      - name: Run tests in shard ${{ matrix.shard }}
        run: node --test --test-shard=${{ matrix.shard }}/2 --test-reporter @currents/node-test-reporter --test-reporter-destination=./report.xml tests/**.test.mjs || true && echo '✅ Script executed successfully'

      - name: Convert test results to Currents format
        run: npx currents convert --input-format=junit --input-file=./report.xml --framework=node

      - name: Upload test results to Currents.dev
        # CURRENTS_RECORD_KEY is a secret stored in the repository settings
        env:
          CURRENTS_RECORD_KEY: ${{ secrets.CURRENTS_RECORD_KEY }}
        run: |
          npx currents upload --project-id JOw2i3 --ci-build-id ${{ github.repository }}-${{ github.run_id }}-${{ github.run_attempt }}

```
{% endcode %}

* Get your [Record Key](../../../guides/record-key.md) and set [GH secret](https://docs.github.com/en/actions/reference/encrypted-secrets) variable`CURRENTS_RECORD_KEY`.&#x20;
* Set the Project ID
  * Option 1: Update `npx currents upload` `--project-id` argument to [your project's id](../../../dashboard/projects/project-settings.md).&#x20;
  * Option 2: Set it up in the [reporter config](https://docs.currents.dev/resources/reporters/currents-jest#configuration) instead.

### Explore

<table data-view="cards"><thead><tr><th></th><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td>@currents/node-test-reporter</td><td></td><td></td><td><a href="../../../resources/reporters/currents-jest.md">currents-jest.md</a></td></tr><tr><td>CI Build ID</td><td></td><td></td><td><a href="../../../guides/ci-build-id.md">ci-build-id.md</a></td></tr><tr><td>@currents/cmd</td><td></td><td></td><td></td></tr></tbody></table>
