---
description: Cancel the Currents run when a GitHub Actions workflow is cancelled
---

# Cancel Runs on Workflow Cancellation

A cancelled workflow stops reporting mid-run. Currents has no way to tell that apart from a job that is still working, so the run stays in progress until it hits the project's [run-timeouts.md](../../../dashboard/runs/run-timeouts.md "mention") — up to an hour of a run sitting in the feed as if it were live.

Add a step that cancels the run when the job is cancelled:

```yaml
- name: Cancel the Currents run
  if: ${{ cancelled() }}
  run: npx currents cancel
```

`if: cancelled()` runs the step only when the workflow was cancelled, so it costs nothing on a normal run.

## Which credential to use

[`currents cancel`](../../../resources/reporters/currents-cmd/currents-cancel.md) authenticates with the [record-key.md](../../../guides/record-key.md "mention") the job already uses to report results, so no additional secret is needed. It identifies the run by its [ci-build-id.md](../../../guides/parallelization-guide/ci-build-id.md "mention"), which means the same step works on any CI provider.

The [cancel-run-gh-action](https://github.com/currents-dev/cancel-run-gh-action) does the same as a GitHub action and accepts either a record key or an [api-keys.md](../../../dashboard/administration/api-keys.md "mention"):

```yaml
- name: Cancel the Currents run
  if: ${{ cancelled() }}
  uses: currents-dev/cancel-run-gh-action@v1
```

With no inputs it reads `CURRENTS_RECORD_KEY`, `CURRENTS_PROJECT_ID` and `CURRENTS_CI_BUILD_ID` from the environment the reporting step already sets. See [cancel-run.md](../../../dashboard/runs/cancel-run.md "mention") for the full list of inputs.

## Full example

```yaml
name: Run Playwright Tests
on:
  pull_request:
    branches: [main]

# Cancel the previous run when a new commit is pushed to the same branch.
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  run-tests:
    runs-on: ubuntu-latest
    env:
      CURRENTS_PROJECT_ID: ${{ vars.CURRENTS_PROJECT_ID }}
      CURRENTS_RECORD_KEY: ${{ secrets.CURRENTS_RECORD_KEY }}
      CURRENTS_CI_BUILD_ID: ${{ github.repository }}-${{ github.run_id }}-${{ github.run_attempt }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "24.x"
      - run: npm ci

      - name: Playwright Tests
        run: npx playwright test

      - name: Cancel the Currents run
        if: ${{ cancelled() }}
        run: npx currents cancel
```

`concurrency` with `cancel-in-progress: true` is what makes this worth setting up: every push to a branch cancels the workflow still running for the previous commit, and each of those leaves a run behind.

## Notes

* **Parallel jobs.** Every job of a parallelized run records into the same run, and every one of them can run the cancellation step. Cancelling a run that is already cancelled succeeds.
* **Nothing recorded yet.** A workflow cancelled before the first results reached Currents has no run to cancel. The step reports that and succeeds, so it does not add a failed step to an already cancelled workflow.
* **Hard cancellations.** A job killed without running its remaining steps — a cancelled job that does not honour `if: cancelled()`, or a runner that disappears — never reaches the step. Those runs still end at the inactivity timeout.

See [cancel-run.md](../../../dashboard/runs/cancel-run.md "mention") for what cancelling a run affects: test statuses, plan usage, analytics and integrations.
