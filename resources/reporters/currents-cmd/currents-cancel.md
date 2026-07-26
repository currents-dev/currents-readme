---
description: Learn how to cancel a run from CI using the currents cancel CLI command
---

# currents cancel

`currents cancel` cancels a run that is still in progress, for example when the CI job that recorded it is cancelled.

A cancelled CI job stops reporting mid-run, so without an explicit cancellation the run stays in progress until it hits the project's [run-timeouts.md](../../../dashboard/runs/run-timeouts.md "mention").

### Usage

{% hint style="info" %}
The command authenticates with the [record-key.md](../../../guides/record-key.md "mention") the job already uses to report results — no API key is needed. It accepts `--key`, `--project-id`, `--ci-build-id` and `--run-id`, or the `CURRENTS_RECORD_KEY`, `CURRENTS_PROJECT_ID`, `CURRENTS_CI_BUILD_ID` and `CURRENTS_RUN_ID` environment variables.
{% endhint %}

```bash
npx currents cancel --key <record-key> --project-id <project-id> --ci-build-id <ci-build-id>
```

### Identifying the run

Pass either the [ci-build-id.md](../../../guides/parallelization-guide/ci-build-id.md "mention") the run was recorded with, or the run id:

```bash
npx currents cancel --key <record-key> --project-id <project-id> --run-id <run-id>
```

`--run-id` takes precedence when both are set.

Use `--ci-build-id` for cancelling from CI. Set `CURRENTS_CI_BUILD_ID` on the job — for example `${{ github.run_id }}-${{ github.run_attempt }}` — and both the reporting step and the cancelling step read the same variable, so no value has to be passed between them.

Use `--run-id` when you already have the run id: it is the last segment of the run URL, `https://app.currents.dev/run/<run-id>`. This is the option for cancelling a specific run from a script or by hand.

{% hint style="warning" %}
If the job does not set `CURRENTS_CI_BUILD_ID`, Currents generates a CI build id from the CI environment, and the generated value includes the test framework — for example `pw:owner/repo-16873-1`. A cancelling step that rebuilds the CI build id from environment variables will not produce that string and will report that there is no run to cancel. Set `CURRENTS_CI_BUILD_ID` explicitly on any job you want to cancel from CI.
{% endhint %}

### Cancelling from GitHub Actions

A job that already exports the record key, project and CI build id needs no arguments:

```yaml
- name: Run tests
  env:
    CURRENTS_RECORD_KEY: ${{ secrets.CURRENTS_RECORD_KEY }}
    CURRENTS_PROJECT_ID: my-project-id
    CURRENTS_CI_BUILD_ID: ${{ github.run_id }}-${{ github.run_attempt }}
  run: npx playwright test

- name: Cancel the run if the workflow is cancelled
  if: ${{ cancelled() }}
  env:
    CURRENTS_RECORD_KEY: ${{ secrets.CURRENTS_RECORD_KEY }}
    CURRENTS_PROJECT_ID: my-project-id
    CURRENTS_CI_BUILD_ID: ${{ github.run_id }}-${{ github.run_attempt }}
  run: npx currents cancel
```

### Cancelling from other CI providers

The command only needs the record key, the project and the CI build id, so the same step works anywhere. GitLab CI, for example:

```yaml
cancel_currents_run:
  stage: .post
  when: on_failure
  script:
    - npx currents cancel
  variables:
    CURRENTS_CI_BUILD_ID: $CI_PIPELINE_ID
```

### Notes

* Every job of a parallelized run records into the same run. Cancelling a run that is already cancelled succeeds, so it is safe for each job to run the command.
* A run only exists once results have been recorded. Cancelling before the first results were uploaded reports that there is no run to cancel and exits successfully, so the step does not fail on an already cancelled job.
* Cancelled runs are marked in the dashboard and trigger the usual integrations. See [cancel-run.md](../../../dashboard/runs/cancel-run.md "mention") for what cancelling a run affects.
