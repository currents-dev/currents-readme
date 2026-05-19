---
description: Playwright Orchestration v2 setup instructions
---

# Orchestration setup v2

{% hint style="warning" %}
When using **Playwright 1.60.0+**, update all `@currents/playwright` packages to **2.0.0+**. Playwright 1.60.0 introduced breaking changes that are addressed in the latest Currents packages.
{% endhint %}

Orchestration v2 introduces a separation of `pwc-p` into two different commands:
1. `pwc-p discover` — runs Playwright test discovery and writes the canonical test list to a file.
2. `pwc-p run` — initiates the orchestration execution.

Install `@currents/playwright`:

```bash
npm i @currents/playwright@latest
```

Execute the whole test suite:

```bash
npx pwc-p run --key <record-key> --project-id <project-id> --ci-build-id <ci-build-id>
```

`pwc-p run` accepts supported Playwright runtime flags (for example workers and timeout):

```bash
npx pwc-p run --key <record-key> --project-id <project-id> --ci-build-id <ci-build-id> -j 4 --timeout 60000
```

{% hint style="success" %}
Read more about [ci-build-id.md](../parallelization-guide/ci-build-id.md "mention") and [reporting-strategy.md](../parallelization-guide/reporting-strategy.md "mention").
{% endhint %}



## When to use `discover`?

`pwc-p discover` is only required when applying **filtering** to the run — for example by using commands like `--grep / -g`, `--last-failed`, `--project`, or a positional spec path.

If all configured projects and tests should run, use `pwc-p run` only. No discovery step is needed.

| Scenario | Commands |
| -------- | -------- |
| Run the full suite (no filters) | `pwc-p run ...` |
| Filter tests with Playwright flags | first `pwc-p discover ...` then `pwc-p run ...` |

## Why two commands?

Playwright filter flags (`--grep`, `--last-failed`, spec paths, and similar) are not accepted by `pwc-p run`. They must be applied during discovery so the orchestration process receives a fixed test list.

That separation keeps orchestration process explicit: `discover` records which tests match the filters and `run` orchestrates exactly that set of tests across machines.

## Discovery output

Discovery writes a file path that must be passed to `pwc-p run`:

```bash
npx pwc-p discover --pwc-discovery-file tests.txt --grep @smoke --project frontend
```

Pass the file to `run` with `--pwc-discovery-file`, the `CURRENTS_DISCOVERY_FILE` environment variable, or `orchestration.discoveryFile` in `currents.config.ts`.

{% hint style="info" %}
Using `CURRENTS_DISCOVERY_FILE` and `orchestration.discoveryFile` are the recommended options for CI environments, as this setup applies to both `discover` and `run` commands.
{% endhint %}

## Discovery and runtime flags

Flags are split by phase:

* Playwright discovery flags → `pwc-p discover` (`--grep`, `--last-failed`, `--project`).
* Supported Playwright runtime flags → `pwc-p run` (`-j`, `--timeout`).

Run `discover` only when you pass a **filter flag** (`--grep`, `--last-failed`, `--project`, or a spec path). Then pass the output file to `run`. For an unfiltered full suite, use `pwc-p run` alone.

Filter with grep:

```bash
npx pwc-p discover --pwc-discovery-file tests.txt --grep @smoke
npx pwc-p run --pwc-discovery-file tests.txt --key <record-key> --project-id <project-id> --ci-build-id <ci-build-id>
```

Filter with last-failed:

```bash
npx pwc-p discover --pwc-discovery-file tests.txt --last-failed
npx pwc-p run --pwc-discovery-file tests.txt --key <record-key> --project-id <project-id> --ci-build-id <ci-build-id>
```

Add tags on the recorded run (no discovery step):

```bash
npx pwc-p run --key <record-key> --project-id <project-id> --ci-build-id <ci-build-id> --tag tagA --tag tagB
```

## CI example

* [test-or8n.yml](https://github.com/currents-dev/currents-examples/blob/main/playwright/ci/github-actions/.github/workflows/test-or8n.yml) — Example

## Re-running only failed tests

Orchestration v2 reruns use `pwc-p discover` with `--last-failed` (or flags from the [playwright-last-failed](https://github.com/currents-dev/playwright-last-failed) action) to build the filtered test list, then `pwc-p run` with `--pwc-discovery-file`.

See [re-run-only-failed-tests-orchestrated-v2.md](re-run-only-failed-tests-orchestrated-v2.md "mention") for the full implementation details.

## Limitations and nuances

* Orchestration works on a **file level** — it balances test files (rather than individual tests).
* [Playwright Project dependencies](https://playwright.dev/docs/test-projects#dependencies) is not supported — if projects depend on one another, orchestration will not consider the dependencies. As a workaround, run the dependencies in the desired order explicitly by defining separate CI steps with `--project <name>` [specification.](https://playwright.dev/docs/test-projects#run-projects)
* [Global Setup and Teardown](https://playwright.dev/docs/test-global-setup-teardown). An orchestrated execution runs `playwright` multiple times. Beware that global setup or teardown routines run for each invocation of `playwright`.