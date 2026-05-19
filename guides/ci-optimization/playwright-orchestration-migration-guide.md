---
description: Migration guide for upgrading to Orchestration v2
---

# Migration from Orchestration V1

{% hint style="warning" %}
When using **Playwright 1.60.0+**, update all `@currents/playwright` packages to **2.0.0+**. Playwright 1.60.0 introduced breaking changes that are addressed in the latest Currents packages.
For the orchestration setup, see [playwright-orchestration-v2.md](playwright-orchestration-v2.md "mention").
{% endhint %}

## 1. Upgrade `@currents/playwright`

```bash
npm i @currents/playwright@^2
```

`@currents/playwright` **2.0.0+** supports **Playwright 1.60.0+**. Move to **2.x** for Playwright compatibility even if you do not use orchestration.

## 2. Replace `pwc-p` with `pwc-p run`

In every CI orchestration job, change the execution command from bare `pwc-p` to `pwc-p run`:

```bash
# Before
npx pwc-p --key <record-key> --project-id <project-id> --ci-build-id <ci-build-id>

# After
npx pwc-p run --key <record-key> --project-id <project-id> --ci-build-id <ci-build-id>
```

Until this point, the tests execution should work as always without any further change if the intention is to execute all the test suite.

If the execution command included filtering flags like `--grep / -g`, `--project / -p`, `--last-failed`, that affects/scopes the set of tests that will be executed, follow to the step 3.

## 3. Add `pwc-p discover` when filtering

Add a **`pwc-p discover`** step **before** `pwc-p run` only when a **CLI filter** narrows which tests run:

* `--last-failed`
* `--grep / -g`
* `--project / -p`
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

## CI provider examples

Provider-specific orchestration examples are being updated for `discover` and `run`. Use these pages as starting points:

* [GitHub Actions](../../getting-started/ci-setup/github-actions/playwright-github-actions.md "mention")
* [GitLab CI/CD](../../getting-started/ci-setup/gitlab/playwright-gitlab-ci-cd.md "mention")
* [NX](../../getting-started/ci-setup/nx.md "mention")
* [Jenkins](../../getting-started/ci-setup/jenkins.md "mention")
* [CircleCI](../../getting-started/ci-setup/playwright-circleci.md "mention")
* [Azure DevOps](../../getting-started/ci-setup/playwright-azure-devops.md "mention")
* [AWS CodeBuild](../../getting-started/ci-setup/playwright-aws-code-build.md "mention")
* [Harness](../../getting-started/ci-setup/playwright-harness.md "mention")
