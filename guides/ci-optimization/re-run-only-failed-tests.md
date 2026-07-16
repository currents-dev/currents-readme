---
description: A guide on rerunning only failed Playwright tests in CI
---

# Re-run Only Failed Tests

Starting from version [1.44](https://playwright.dev/docs/release-notes?ref=playwrightsolutions.com#version-144) Playwright supports [running only the failed test from the last run](https://playwrightsolutions.com/how-to-run-failures-only-from-the-last-playwright-run/) using `--last-failed` CLI flag. For example:

```
playwright test --last-failed
```

<figure><img src="../../.gitbook/assets/currents-2024-09-30-13.43.44@2x.png" alt=""><figcaption><p>Rerunning Failed Only Playwright Tests</p></figcaption></figure>

While this feature works well for local environments, using it in CI with Playwright shards or Currents Orchestration is not straightforward.&#x20;

We have created a set of tools that simplify rerunning only the failed Playwright tests in CI, including sharded parallel CI runs and runs created by Currents Orchestration.&#x20;

## When to use it

`--last-failed` is not a replacement for [`retries`](https://playwright.dev/docs/test-retries). Retries handle flakiness automatically, within the same run, without human involvement.

Re-running failed tests is for the cases where a human fixed something between the two runs and the test code did not change — a missing environment variable, a disabled feature flag, a dependency that was down, a service that had not finished deploying. Instead of re-running the whole suite to validate the fix, you re-run only the tests that failed.

## How `--last-failed` works

Playwright records the outcome of each run in a `.last-run.json` file. On the next run, `--last-failed` reads that file and executes only the tests listed as failed.

By default the file is written to `<outputDir>/.last-run.json` — inside the first project's `outputDir` (commonly `test-results/`). That default is the source of most CI problems: `outputDir` is wiped before each run, so the file has to be preserved outside of it between runs.

Newer Playwright versions accept `--last-failed-file <path>` (or the `PLAYWRIGHT_LAST_RUN_OUTPUT_FILE` environment variable) to write the file to an explicit location, instead of depending on the internal `outputDir` layout:

```bash
npx playwright test --last-failed --last-failed-file .last-run.json
```

See the [Playwright CLI reference](https://playwright.dev/docs/test-cli) for the exact flag definition and your version's support.

{% hint style="warning" %}
Store the last-run file outside `test-results/` or any configured `outputDir` — those directories are deleted before tests start.
{% endhint %}

## Why CI makes it harder

Wiring `--last-failed` into CI requires solving a few problems that don't exist locally:

* The file must survive between runs. CI machines are ephemeral, so `.last-run.json` has to be cached or fetched from an external source.
* Each shard has its own file. With native `--shard` parallelism, the file records only the tests from that shard, so caching must be per-shard.
* Cache keys are immutable. On GitHub Actions an existing key cannot be overwritten, so the retry attempt (`run_attempt`) has to be part of the key it saves under — and the restore step then has to fall back to a prefix without the attempt, or the retry will never find the previous attempt's file.
* The file must be saved even when the job fails, which is exactly when it matters. On GitHub Actions this means `actions/cache/save` with `if: always()`, since the combined `actions/cache` action skips the save step on failure.
* The right re-run button matters. The correct choice differs between sharded and orchestrated runs — see the guides below.

The [`currents-dev/playwright-last-failed`](https://github.com/currents-dev/playwright-last-failed) action handles the caching, the per-shard keys, and the conditional flags for you, and outputs the flags to pass to Playwright.

## Follow the guide that matches how tests are run in CI

* [Sharded runs](re-run-only-failed-tests-sharded.md "mention") — fixed shard count and native Playwright `--shard` parallelism. Re-run with **Re-run failed jobs**, so passed shards are not restarted.
* [Orchestrated runs](re-run-only-failed-tests-orchestrated-v2.md "mention") — Currents assigns the failed tests to all available machines. Re-run with **Rerun All Jobs**.
