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
Set `CURRENTS_CI_BUILD_ID` on any job you want to cancel from CI. Without it, Currents generates the value from the CI environment, or at random on a provider it does not detect. `currents cancel` cannot reproduce either form, so the command reports that there is no run to cancel.
{% endhint %}

## Cancelling from GitHub Actions

A job that already exports the record key, project and CI Build ID needs no arguments:

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

Declaring them on the job is what lets the cancel step run with no arguments. A step's `env` is visible only to that step.

The snippet above is trimmed to the parts that matter for cancelling. [cancel-runs.md](../../../getting-started/ci-setup/github-actions/cancel-runs.md "mention") holds the complete workflow, including checkout, setup and `concurrency`. Change that page when the workflow itself changes.

## Cancelling from other CI providers

The command only needs the record key, the project and the CI Build ID, so the same step works anywhere. Set the CI Build ID for the whole pipeline, so the reporting job and the cancelling step use the same value. GitLab CI, for example:

```yaml
variables:
  CURRENTS_CI_BUILD_ID: $CI_PIPELINE_ID

playwright_tests:
  script:
    - npx playwright test
  after_script:
    - if [ "$CI_JOB_STATUS" = "canceled" ]; then npx currents cancel; fi
```

`CURRENTS_RECORD_KEY` and `CURRENTS_PROJECT_ID` come from the pipeline's variables, the same ones the reporting job uses. Set `CURRENTS_RECORD_KEY` as a masked CI/CD variable, and protected where your branch policy allows it. Masking keeps the key out of the job log. `CURRENTS_PROJECT_ID` is not a secret and needs neither.

The guard works because GitLab runs `after_script` when a job is cancelled. No `when:` value matches cancellation. `when: on_failure` does not fire either: the trigger is a failed job, and a cancelled job is not a failed one.

The example requires GitLab 17.0 with GitLab Runner 16.11.1, the first combination where `$CI_JOB_STATUS` reads `canceled` while `after_script` runs. GitLab 17.3 made the behavior generally available. Runner 16.10 also runs `after_script` on cancellation, but reports the status as `failed`, so the guard never matches. Two cases skip `after_script` on every version: a job cancelled while still pending never starts, and force cancelling ends the job immediately. Runs cancelled either way end at the [run-timeouts.md](../../../dashboard/runs/run-timeouts.md "mention") instead.

{% hint style="warning" %}
A CI Build ID has to stay the same across every job in a pipeline, and `$CI_PIPELINE_ID` does. Retrying a single job does not change the value. Currents requires a distinct CI Build ID per attempt, so a retried job reports against the completed run instead of a new one.

Whatever value you pick, set it in `variables:` as above. Both `script` and `after_script` read `CURRENTS_CI_BUILD_ID` from the job's environment. Add the discriminator to the reporting command alone and `currents cancel` looks for a different run than the one you recorded.

If a single job reports the whole run, use `$CI_JOB_ID`, which changes on every retry. If the run is split across parallel jobs, no GitLab variable is both per-attempt and shared by all of them. Re-run the pipeline instead, so the jobs get a new `$CI_PIPELINE_ID`. See [ci-build-id.md](../../../guides/parallelization-guide/ci-build-id.md "mention").
{% endhint %}

## Notes

- Every job of a parallelized run records into the same run. Cancelling a run that is already cancelled succeeds, so it is safe for each job to run the command.
- A run only exists once results have been recorded. Cancelling before the first results were uploaded reports that there is no run to cancel and exits successfully, so the step does not fail on an already cancelled job.
- Cancelled runs are marked in the dashboard and trigger the usual integrations. See [cancel-run.md](../../../dashboard/runs/cancel-run.md "mention") for what cancelling a run affects.
