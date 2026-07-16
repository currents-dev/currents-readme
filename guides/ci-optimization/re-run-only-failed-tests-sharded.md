---
description: Re-run only failed tests when using native Playwright sharding
---

# Re-run Only Failed Tests — Sharded runs

Native Playwright sharding runs tests in parallel across a fixed set of jobs. On retry, each job should run only the tests that failed in the previous execution.

{% hint style="info" %}
Sharded reruns use **Re-run failed jobs** in the CI provider — not **Re-run all jobs**. See [#re-run-the-failed-jobs-only](re-run-only-failed-tests-sharded.md#re-run-the-failed-jobs-only "mention").
{% endhint %}

## How sharding changes `--last-failed`

Each shard is an independent Playwright process with its own `.last-run.json`. A shard's file lists only the tests that ran in that shard, so:

* Every shard needs its own cached copy of `.last-run.json` — keyed by shard index.
* Shard 2 re-runs shard 2's failures. Shards never see each other's results, so there is nothing to merge.
* Shard assignment must stay stable between attempts. Playwright distributes tests deterministically, so keep the shard total and the test files unchanged between the original run and the retry.

## What the setup has to do

Four things have to be true for a sharded rerun to work:

1. `.last-run.json` survives between attempts. CI machines are ephemeral — the file must be cached (or fetched from Currents) and restored into the retried job.
2. The save key is unique per shard and per attempt. It needs the shard index, because each shard has a different file, and the attempt number, because on GitHub Actions an existing cache key cannot be overwritten — each retry has to write a new entry.
3. The restore key is a prefix that omits the attempt. This is the step that is easy to miss: a key containing the attempt number never hits on a retry, because that attempt has not written a cache yet. Restore has to fall back to a stable `run_id` + shard prefix so it picks up the most recent previous attempt.
4. `--last-failed` is passed conditionally. The first attempt has no `.last-run.json` — passing `--last-failed` when the file is missing is not what you want on a clean run. Add the flag only when a previous attempt's file was actually restored.

On GitHub Actions, points 2 and 3 come out as a save key with `run_attempt` and a restore prefix without it:

```yaml
key: last-run-${{ github.run_id }}-${{ matrix.shard }}-${{ github.run_attempt }}
restore-keys: |
  last-run-${{ github.run_id }}-${{ matrix.shard }}-
```

Scoping the key to `run_id` also keeps a previous workflow's results from leaking into a fresh run.

The file also has to be saved even when the job fails, which is the case that matters here. Use `actions/cache/save` with `if: always()` — the combined `actions/cache` action skips its save step when the job fails.

## Re-run the failed jobs only

Use the CI provider's **Re-run failed jobs** (GitHub Actions) or **Retry failed jobs** (GitLab CI):

* Shards that passed are not restarted.
* Shards that failed re-run with only their own failed tests.

**Re-run all jobs** would restart every shard, including the ones that passed — which defeats the purpose. This is the opposite of [orchestrated runs](re-run-only-failed-tests-orchestrated-v2.md "mention"), where **Rerun All Jobs** is the correct choice because Currents redistributes the failed tests across all available machines.

## Choosing an approach

<table><thead><tr><th width="220">Approach</th><th>When to use it</th></tr></thead><tbody><tr><td><a href="https://github.com/currents-dev/playwright-last-failed">playwright-last-failed</a> action</td><td>GitHub Actions. Handles the cache, the per-shard/per-attempt key, and the conditional flags, and outputs the flags to pass to Playwright.</td></tr><tr><td><a href="../../resources/reporters/currents-cmd/currents-cache.md">currents cache</a> with <code>--preset last-run</code></td><td>GitLab CI and other providers. Stores <code>.last-run.json</code> in Currents-managed storage and writes the shard and <code>--last-failed</code> flags to an env file.</td></tr><tr><td>Native CI cache</td><td>No extra tooling. You own the cache keys and the conditional flag logic — see the caveats above.</td></tr></tbody></table>

Playwright also accepts `--last-failed-file <path>` (or `PLAYWRIGHT_LAST_RUN_OUTPUT_FILE`) to write the last-run file to an explicit path instead of the default `<outputDir>/.last-run.json`. This is useful with a native cache, where caching a stable path is simpler than depending on the internal `outputDir` layout. See [re-run-only-failed-tests.md](re-run-only-failed-tests.md "mention") for details.

## Step-by-step guides

* [**GitHub Actions**](../../getting-started/ci-setup/github-actions/re-run-failed-only-tests-sharded.md)
* [**GitLab CI**](../../getting-started/ci-setup/gitlab/re-run-failed-only-tests.md#playwright-sharding)
* [**Jenkins Pipeline**](../../getting-started/ci-setup/jenkins.md#using-last-failed-flag-with-shards-and-orchestration)

See also the overview: [re-run-only-failed-tests.md](re-run-only-failed-tests.md "mention").
