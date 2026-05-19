---
description: Playwright Orchestration V2 setup instructions
---

# Orchestration Setup V2

Orchestration V2 is a preview implementation for Playwright. The purpose of orchestration is the same as described in [playwright-orchestration.md](playwright-orchestration.md "mention"), but `pwc-p` is split into two subcommands:

1. `pwc-p discover` — runs Playwright test discovery and writes the canonical test list to a file.
2. `pwc-p run` — orchestrates execution of that test list through Currents.

{% hint style="warning" %}
The V2 command shape is a preview and can change before the final release.
{% endhint %}

## Setup V2

Install `@currents/playwright`:

```bash
npm i @currents/playwright
```

Replace `playwright` (or legacy `pwc-p`) with `pwc-p run`:

```bash
npx pwc-p run --key <record-key> --project-id <project-id> --ci-build-id <ci-build-id>
```

{% hint style="success" %}
Read more about [ci-build-id.md](../parallelization-guide/ci-build-id.md "mention") and [reporting-strategy.md](../parallelization-guide/reporting-strategy.md "mention").
{% endhint %}

`pwc-p run` accepts supported Playwright runtime flags (for example workers and timeout):

```bash
npx pwc-p run --key <record-key> --project-id <project-id> --ci-build-id <ci-build-id> -j 4 --timeout 60000
```

## When to run `discover`

`pwc-p discover` is only required when applying **CLI filtering** to the run — for example `--grep`, `--last-failed`, a positional spec path, or `--project`.

If all configured projects and tests should run, switch from `pwc-p` to `pwc-p run` only. No discovery step is needed.

| Scenario | Commands |
| -------- | -------- |
| Run the full suite (no CLI filters) | `pwc-p run ...` |
| Filter tests with Playwright CLI flags | `pwc-p discover ...` then `pwc-p run --pwc-discovery-file ...` |

## Why two commands

In V2, Playwright filter flags (`--grep`, `--last-failed`, spec paths, and similar) are not accepted by `pwc-p run`. They must be applied during discovery so the orchestrator receives a fixed test list.

That separation keeps orchestration predictable: discovery records which tests match the filters, and `run` distributes exactly that list across CI machines.

## Discovery output

Discovery writes a file path you pass to `pwc-p run`:

```bash
npx pwc-p discover -c ./playwright.config.ts --pwc-discovery-file tests.txt
```

Example output:

```bash
Discovery output written to: /path/to/tests.txt

Use it with:
  pwc-p run --pwc-discovery-file tests.txt
```

Pass the file to `run` with `--pwc-discovery-file`, the `CURRENTS_DISCOVERY_OUTPUT_FILE` environment variable, or `orchestration.discoveryOutputFile` in `currents.config.ts`.

## Discovery and runtime flags

Flags are split by phase:

* Playwright discovery flags → `pwc-p discover` (for example `-c`, `--grep`, `--last-failed`, `--project`).
* Supported Playwright runtime flags → `pwc-p run` (for example `-j`, `--timeout`).

Run `discover` only when you pass a **discovery filter flag** (`--grep`, `--last-failed`, `--project`, or a spec path). Then pass the output file to `run`. For an unfiltered full suite, use `pwc-p run` alone.

Filter with grep:

```bash
npx pwc-p discover -c ./playwright.config.ts --pwc-discovery-file tests.txt --grep @smoke
npx pwc-p run --key <record-key> --project-id <project-id> --ci-build-id <ci-build-id> --pwc-discovery-file tests.txt
```

Filter with last-failed:

```bash
npx pwc-p discover -c ./playwright.config.ts --pwc-discovery-file tests.txt --last-failed
npx pwc-p run --key <record-key> --project-id <project-id> --ci-build-id <ci-build-id> --pwc-discovery-file tests.txt
```

Add tags on the recorded run (no discovery step):

```bash
npx pwc-p run --key <record-key> --project-id <project-id> --ci-build-id <ci-build-id> --tag tagA --tag tagB
```

## CI examples

* [re-run-failed-only-tests-orchestrated-v2.md](../../getting-started/ci-setup/github-actions/re-run-failed-only-tests-orchestrated-v2.md "mention") — GitHub Actions workflow with `discover` and `run` for failed-only reruns
* [test-or8n.yml](https://github.com/currents-dev/currents-examples/blob/main/playwright/ci/github-actions/.github/workflows/test-or8n.yml) — adapt the V1 orchestration workflow by replacing `pwc-p` with `pwc-p run` (no discovery step when running the full suite)

_Missing an example?_ [_Let us know_](mailto:support@currents.dev)_._

## Re-running Only Failed Tests

Orchestration V2 reruns use `pwc-p discover` with `--last-failed` (or flags from the [playwright-last-failed](https://github.com/currents-dev/playwright-last-failed) action) to build the filtered test list, then `pwc-p run` with `--pwc-discovery-file`.

See [re-run-only-failed-tests-orchestrated-v2.md](re-run-only-failed-tests-orchestrated-v2.md "mention") for the shared orchestrated rerun behavior and [re-run-failed-only-tests-orchestrated-v2.md](../../getting-started/ci-setup/github-actions/re-run-failed-only-tests-orchestrated-v2.md "mention") for a GitHub Actions workflow.

For Orchestration V1, see [re-run-only-failed-tests-orchestrated.md](re-run-only-failed-tests-orchestrated.md "mention").

## Limitations and Nuances

* Orchestration works on a **file level** — it balances test files (rather than individual tests).
* [Playwright Project dependencies](https://playwright.dev/docs/test-projects#dependencies) is not supported — if projects depend on one another, orchestration will not consider the dependencies. As a workaround, run the dependencies in the desired order explicitly by defining separate CI steps with `--project <name>` [specification.](https://playwright.dev/docs/test-projects#run-projects)
* [Global Setup and Teardown](https://playwright.dev/docs/test-global-setup-teardown). An orchestrated execution runs `playwright` multiple times. Beware that global setup or teardown routines run for each invocation of `playwright`.

## Next Steps

* Review the general [playwright-orchestration.md](playwright-orchestration.md "mention") overview.
* Compare with [playwright-orchestration-v1.md](playwright-orchestration-v1.md "mention").
