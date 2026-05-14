---
description: Playwright Orchestration v2 setup instructions
---

# Orchestration Setup v2

Orchestration v2 is a preview implementation for Playwright. The purpose of orchestration is the same as described in [playwright-orchestration.md](playwright-orchestration.md "mention"), but the implementation is split into two phases:

1. `pwc-p discover` runs Playwright discovery and writes the canonical test list output to a file.
2. `pwc-p run` uses that test list to orchestrate the test execution with Currents.

{% hint style="warning" %}
The v2 command shape is a preview and can change before the final release.
{% endhint %}

## Setup v2

Install `@currents/playwright`

```bash
npm i @currents/playwright
```

Run discovery before execution. The discovery command receives Playwright discovery flags and writes a test list file:

```bash
npx pwc-p discover -c ./playwright.config.ts --pwc-discovery-output tests.txt
```

Then pass the generated test list to `pwc-p run`:

```bash
npx pwc-p run --key <record-key> --project-id <project-id> --ci-build-id <ci-build-id> --test-list tests.txt
```

{% hint style="success" %}
Read more about [ci-build-id.md](../parallelization-guide/ci-build-id.md "mention") and [reporting-strategy.md](../parallelization-guide/reporting-strategy.md "mention").
{% endhint %}

## Discovery and runtime flags

In v2, flags are split by phase:

* Playwright discovery flags go to `pwc-p discover`.
* Supported Playwright runtime flags go to `pwc-p run`.

For example, use `--grep` during discovery so the generated test list only contains matching tests:

```bash
npx pwc-p discover -c ./playwright.config.ts --pwc-discovery-output tests.txt --grep @smoke
npx pwc-p run --key <record-key> --project-id <project-id> --ci-build-id <ci-build-id> --test-list tests.txt
```

Runtime flags such as workers and timeout are passed to `pwc-p run`:

```bash
npx pwc-p run --key <record-key> --project-id <project-id> --ci-build-id <ci-build-id> --test-list tests.txt -j 4 --timeout 60000
```

## Examples

### Basic orchestration

```bash
npx pwc-p discover -c ./playwright.config.ts --pwc-discovery-output tests.txt
npx pwc-p run --key <record-key> --project-id <project-id> --ci-build-id <ci-build-id> --test-list tests.txt
```

### Orchestration with runtime flags

```bash
npx pwc-p discover -c ./playwright.config.ts --pwc-discovery-output tests.txt
npx pwc-p run --key <record-key> --project-id <project-id> --ci-build-id <ci-build-id> --test-list tests.txt -j 4 --timeout 60000
```

### Filter with grep

```bash
npx pwc-p discover -c ./playwright.config.ts --pwc-discovery-output tests.txt --grep @smoke
npx pwc-p run --key <record-key> --project-id <project-id> --ci-build-id <ci-build-id> --test-list tests.txt
```

### Filter with last-failed style input

Use the failed-test filter during discovery, then orchestrate the generated test list.

```bash
npx pwc-p discover -c ./playwright.config.ts --pwc-discovery-output tests.txt --last-failed
npx pwc-p run --key <record-key> --project-id <project-id> --ci-build-id <ci-build-id> --test-list tests.txt
```

{% hint style="info" %}
For failed-test reruns, use the v2 discovery phase to generate the filtered test list before running `pwc-p run`.
{% endhint %}

### Add tags

```bash
npx pwc-p discover -c ./playwright.config.ts --pwc-discovery-output tests.txt
npx pwc-p run --key <record-key> --project-id <project-id> --ci-build-id <ci-build-id> --test-list tests.txt --tag tagA --tag tagB
```

## Re-running Only Failed Tests

The v2 rerun flow should create the list of tests during discovery, then pass that list to `pwc-p run`. The final CI examples are not published yet; use the preview examples on this page until the dedicated v2 rerun guide is available.

See also the current orchestrated rerun guide for the shared CI behavior: [re-run-only-failed-tests-orchestrated.md](re-run-only-failed-tests-orchestrated.md "mention").

## Next Steps

* Review the general [playwright-orchestration.md](playwright-orchestration.md "mention") overview.
* Compare with the current [playwright-orchestration-v1.md](playwright-orchestration-v1.md "mention") implementation.
