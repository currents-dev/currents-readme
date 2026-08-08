---
description: Learn how to cancel a run from CI using the currents cancel CLI command
---

# currents cancel

`currents cancel` cancels a run that is still in progress, for example when you stop the associated CI job.

A cancelled CI job stops reporting mid-run, so without an explicit cancellation the run stays in progress until it hits the project's [run-timeouts.md](../../../dashboard/runs/run-timeouts.md "mention").

The command is available from `@currents/cmd` 1.10.0.

## Usage

{% hint style="info" %}
The command authenticates with the [record-key.md](../../../guides/record-key.md "mention") the job already uses to report results — no API key is needed. It accepts `--key`, `--project-id`, `--ci-build-id` and `--run-id`, or the `CURRENTS_RECORD_KEY`, `CURRENTS_PROJECT_ID`, `CURRENTS_CI_BUILD_ID` and `CURRENTS_RUN_ID` environment variables.
{% endhint %}

```bash
npx currents cancel --key <record-key> --project-id <project-id> --ci-build-id <ci-build-id>
```

## Identifying the run

Pass either the [ci-build-id.md](../../../guides/parallelization-guide/ci-build-id.md "mention") the run was recorded with, or the run id:

```bash
npx currents cancel --key <record-key> --project-id <project-id> --run-id <run-id>
```

`--run-id` takes precedence when both are set.

Use `--ci-build-id` for cancelling from CI. Set `CURRENTS_CI_BUILD_ID` on the job — for example `${{ github.repository }}-${{ github.run_id }}-${{ github.run_attempt }}` — and both the reporting step and the cancelling step read the same variable, so no value has to be passed between them.

Use `--run-id` when you already have the run id: it is the last segment of the run URL, `https://app.currents.dev/run/<run-id>`. This is the option for cancelling a specific run from a script or by hand.

{% hint style="warning" %}
If the job does not set `CURRENTS_CI_BUILD_ID`, Currents generates one, and neither of the two forms it can take is reproducible by a separate step. On a CI provider Currents recognises, the value is derived from that provider's environment variables and carries a test framework prefix — for example `pw:owner/repo-16873-1`. On a provider it does not recognise, the value is a random id. Either way a separate `currents cancel` invocation cannot recover the value — it rebuilds the CI build id from the environment, produces a different string, and reports that there is no run to cancel. Set `CURRENTS_CI_BUILD_ID` explicitly on any job you want to cancel from CI.
{% endhint %}

## Cancelling from GitHub Actions

A job that already exports the record key, project and CI build id needs no arguments:

```yaml
jobs:
  run-tests:
    runs-on: ubuntu-latest
    env:
      CURRENTS_RECORD_KEY: ${{ secrets.CURRENTS_RECORD_KEY }}
      CURRENTS_PROJECT_ID: my-project-id
      CURRENTS_CI_BUILD_ID: ${{ github.repository }}-${{ github.run_id }}-${{ github.run_attempt }}
    steps:
      - name: Run tests
        run: npx playwright test

      - name: Cancel the run if the workflow is cancelled
        if: ${{ cancelled() }}
        run: npx currents cancel
```

Declaring them on the job rather than on each step is what makes "no arguments" work: a step's `env` is visible only to that step.

## Cancelling from other CI providers

The command only needs the record key, the project and the CI build id, so the same step works anywhere. Set the CI build id for the whole pipeline, so the reporting job and the cancelling step use the same value. GitLab CI, for example:

```yaml
variables:
  CURRENTS_CI_BUILD_ID: $CI_PIPELINE_ID

playwright_tests:
  script:
    - npx playwright test
  after_script:
    - if [ "$CI_JOB_STATUS" = "canceled" ]; then npx currents cancel; fi
```

`CURRENTS_RECORD_KEY` and `CURRENTS_PROJECT_ID` come from the pipeline's variables, the same ones the reporting job uses. Set `CURRENTS_RECORD_KEY` as a **masked** CI/CD variable, and protected where the pipeline's branch policy allows it, so a job that echoes its environment cannot leak the key. `CURRENTS_PROJECT_ID` is not a secret and needs neither.

GitLab runs `after_script` when a job is cancelled, which is what makes this work; there is no `when:` value that matches cancellation. `when: on_failure` in particular does not fire — it triggers on a failed job, and a cancelled job is not a failed one.

{% hint style="warning" %}
`$CI_PIPELINE_ID` is stable across all jobs in a pipeline, which is what a CI build id needs, but it does not change when an individual job is retried. Currents requires a distinct CI build id per attempt, so a retried job reports against the completed run rather than a new one. Re-run the whole pipeline, or append a value that changes per attempt to `CURRENTS_CI_BUILD_ID`. See [ci-build-id.md](../../../guides/parallelization-guide/ci-build-id.md "mention").
{% endhint %}

{% hint style="info" %}
The example needs GitLab 17.0 with GitLab Runner 16.11.1, which is the combination where `$CI_JOB_STATUS` reads `canceled` while `after_script` runs; it became generally available in GitLab 17.3. GitLab Runner 16.10 already ran `after_script` on cancellation, but reported the status as `failed`, so the guard above would never match. Two cases skip `after_script` on every version: a job cancelled while still pending never starts, and force cancelling terminates the job immediately. Runs cancelled either way end at the [run-timeouts.md](../../../dashboard/runs/run-timeouts.md "mention") instead.
{% endhint %}

## Notes

- Every job of a parallelized run records into the same run. Cancelling a run that is already cancelled succeeds, so it is safe for each job to run the command.
- A run only exists once results have been recorded. Cancelling before the first results were uploaded reports that there is no run to cancel and exits successfully, so the step does not fail on an already cancelled job.
- Cancelled runs are marked in the dashboard and trigger the usual integrations. See [cancel-run.md](../../../dashboard/runs/cancel-run.md "mention") for what cancelling a run affects.
