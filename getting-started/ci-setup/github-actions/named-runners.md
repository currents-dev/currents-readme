---
description: >-
  Github Actions provides the ability to use human-readable runner names, and
  Currents displays these in the dashboard, allowing you to see which runner
  executed each spec file.
---

# Named Runners

The typical method for creating a matrix strategy for runners in Github Actions is as follows:

```yaml
matrix:
    shard: [1/3, 2/3, 3/3]
```

However, there are several ways to achieve this, such as naming the machines with human-readable names like this:

```yaml
matrix:
    include:
        - runner_name: "Runner 1"
	    shard: 1/2
	- runner_name: "Runner 2"
      	    shard: 2/2
```

This creates jobs that looks like this in Github Actions:

<figure><img src="../../../.gitbook/assets/image.png" alt="" width="310"><figcaption><p>Named Runners</p></figcaption></figure>

The final step is to visualize this in the Currents dashboard, which can be done by passing the runner name into the CURRENTS\_MACHINE\_ID environment variable:

```yaml
- name: Run Playwright tests
    env:
        CURRENTS_MACHINE_ID: ${{ matrix.runner_name }}
    run: npx pwc --key ${{secrets.CURRENTS_RECORD_KEY}} --project-id ${{secrets.CURRENTS_PROJECT_ID}} --ci-build-id ${{ github.repository }}-${{ github.run_id }}-${{ github.run_attempt}} --shard ${{ matrix.shard }}
```

The `machineId` will now be visible in the Currents dashboard for each spec file, making it possible to identify which machine or job executed a specific spec file.

<figure><img src="../../../.gitbook/assets/image (2).png" alt="" width="326"><figcaption><p>Spec file details view</p></figcaption></figure>

Here is a complete example of a Github Action yaml file with this setup:

<details>

<summary><code>workflow.yaml</code></summary>

```yaml
name: Playwright Tests
on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]
jobs:
  playwright-tests:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        include:
          - runner_name: "Runner 1"
            shard: 1/2
          - runner_name: "Runner 2"
            shard: 2/2
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Install dependencies
        run: npm install

      - name: Run Playwright tests
        env:
          CURRENTS_MACHINE_ID: ${{ matrix.runner_name }}
        run: npx pwc --key ${{secrets.CURRENTS_RECORD_KEY}} --project-id ${{secrets.CURRENTS_PROJECT_ID}} --ci-build-id ${{ github.repository }}-${{ github.run_id }}-${{ github.run_attempt}} --shard ${{ matrix.shard }}
```

</details>

It is also possible to add a dynamic number of named runners by including an extra job in the workflow:

```yaml
generate-matrix:
    runs-on: ubuntu-latest
    outputs:
      matrix: ${{ steps.set-matrix.outputs.matrix }}
    steps:
      - name: Set number of shards
        id: set-shards
        run: echo "SHARDS=5" >> $GITHUB_ENV

      - name: Generate matrix
        id: set-matrix
        run: |
          SHARDS=${SHARDS:-2}  # Default to 2 if not set
          MATRIX="{\"include\":["
          for i in $(seq 1 $SHARDS); do
            if [ $i -gt 1 ]; then MATRIX="$MATRIX,"; fi
            MATRIX="$MATRIX{\"runner_name\":\"MyRunner $i\",\"shard\":\"$i/$SHARDS\"}"
          done
          MATRIX="$MATRIX]}"
          echo "matrix=$MATRIX" >> "$GITHUB_OUTPUT"
```

It is only needed to update `run: echo "SHARDS=5" >> $GITHUB_ENV` into the shards number is required.

A complete example can be found here:

<details>

<summary><code>dynamic-runners-workflow.yaml</code></summary>

```yaml
name: Playwright Tests
on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]
jobs:
  generate-matrix:
    runs-on: ubuntu-latest
    outputs:
      matrix: ${{ steps.set-matrix.outputs.matrix }}
    steps:
      - name: Set number of shards
        id: set-shards
        run: echo "SHARDS=5" >> $GITHUB_ENV

      - name: Generate matrix
        id: set-matrix
        run: |
          SHARDS=${SHARDS:-2}  # Default to 2 if not set
          MATRIX="{\"include\":["
          for i in $(seq 1 $SHARDS); do
            if [ $i -gt 1 ]; then MATRIX="$MATRIX,"; fi
            MATRIX="$MATRIX{\"runner_name\":\"MyRunner $i\",\"shard\":\"$i/$SHARDS\"}"
          done
          MATRIX="$MATRIX]}"
          echo "matrix=$MATRIX" >> "$GITHUB_OUTPUT"

  playwright-tests:
    needs: generate-matrix 
    timeout-minutes: 60
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix: ${{ fromJson(needs.generate-matrix.outputs.matrix) }}
    steps:
      - name: Log matrix
        run: |
          echo "Running on ${{ matrix.runner_name }} with shard ${{ matrix.shard }}"
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Install dependencies
        run: npm install

      - name: Run Playwright tests
        env:
          CURRENTS_MACHINE_ID: ${{ matrix.runner_name }}
        run: npx pwc --key ${{secrets.CURRENTS_RECORD_KEY}} --project-id ${{secrets.CURRENTS_PROJECT_ID}} --ci-build-id ${{ github.repository }}-${{ github.run_id }}-${{ github.run_attempt}} --shard ${{ matrix.shard }}
```

</details>



