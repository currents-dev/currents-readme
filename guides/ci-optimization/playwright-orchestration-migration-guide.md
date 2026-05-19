---
description: Migrate from Orchestration v1 to v2 (pwc-p discover + run)
---

# Migration from Orchestration v1

{% hint style="info" %}
**Not using Currents Orchestration?** Upgrade `@currents/playwright` to 2.x and you are done. See [migration-to-playwright-1.60.md](../../resources/reporters/currents-playwright/migration-to-playwright-1.60.md "mention") — no `pwc-p` changes required.
{% endhint %}

This guide is for CI that runs tests with **`pwc-p`**. If you use `pwc`, `playwright test` with the Currents reporter, or sharding only, follow the [Playwright 1.60+ upgrade guide](../../resources/reporters/currents-playwright/migration-to-playwright-1.60.md "mention") instead.

## Prerequisites

Upgrade `@currents/playwright` to **2.0.0+** before changing orchestration commands:

```bash
npm i @currents/playwright@^2
```

## 1. Replace `pwc-p` with `pwc-p run`

In every CI orchestration job, change the execution command from bare `pwc-p` to `pwc-p run`:

```bash
# Before
npx pwc-p --key <record-key> --project-id <project-id> --ci-build-id <ci-build-id>

# After
npx pwc-p run --key <record-key> --project-id <project-id> --ci-build-id <ci-build-id>
```

Until this point, the tests execution should work as always without any further change if the intention is to execute all the test suite.

If the execution command included filtering flags like `--grep / -g`, `--project`, `--last-failed`, that affects/scopes the set of tests that will be executed, follow to the step 2.

## 2. Add `pwc-p discover` when filtering

Add a **`pwc-p discover`** step **before** `pwc-p run` only when a **CLI filter** narrows which tests run:

* `--last-failed`
* `--grep / -g`
* `--project`
* a positional spec path

| Scenario | Commands (in order) |
| -------- | ------------------- |
| Full suite, no CLI filters | `pwc-p run` only |
| Filtered suite or last-failed rerun | `pwc-p discover` → `pwc-p run --pwc-discovery-file <file>` |

**Discovery**:

```bash
npx pwc-p discover --pwc-discovery-file tests.txt --grep @smoke
```

**Execution**:

```bash
npx pwc-p run --key <record-key> --project-id <project-id> --ci-build-id <ci-build-id> --pwc-discovery-file tests.txt
```

Playwright filter flags belong on **`discover`**. Currents and runtime flags belong on **`run`**.
