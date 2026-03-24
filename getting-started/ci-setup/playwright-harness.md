---
description: Running Playwright tests on Harness CI with Currents reporting and parallel sharding
---

# Harness

This guide explains how to run Playwright tests on [Harness Continuous Integration](https://developer.harness.io/docs/category/set-up-cicd-pipelines) and report results to [Currents](https://currents.dev). It follows Harness NextGen pipeline patterns ([Run steps](https://developer.harness.io/docs/continuous-integration/use-ci/run-step-settings), [stage parallelism](https://developer.harness.io/docs/continuous-integration/use-ci/run-tests/speed-up-ci-test-pipelines-using-parallelism), [secrets](https://developer.harness.io/docs/platform/secrets/add-use-text-secrets)).

{% hint style="warning" %}
**`CURRENTS_CI_BUILD_ID` is mandatory** for Harness. Harness is **not** in Currents’ [auto-detected CI providers](../../guides/parallelization-guide/ci-build-id.md#build-id-for-popular-ci-providers). If you omit it, Currents may generate a **different** build ID per job or shard: parallel Playwright shards **will not merge into one run**, reporting and orchestration **break**, and **retries** can collide with or duplicate prior runs. Always set `CURRENTS_CI_BUILD_ID` in every Run step (see below).
{% endhint %}

## Prerequisites

**Currents**

- Organization and project at [https://app.currents.dev](https://app.currents.dev)
- **Project ID** and **Record Key** — see [record-key.md](../../guides/record-key.md "mention")
- **`CURRENTS_CI_BUILD_ID`** set in CI for every Playwright step (mandatory on Harness — see [CI Build ID](#ci-build-id-mandatory-on-harness))
- `@currents/playwright` installed and configured — see [currents-playwright](../../resources/reporters/currents-playwright/ "mention")

**Harness**

- A **CI pipeline** with a **Build** (`CI`) stage
- A [Docker registry connector](https://developer.harness.io/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference/) that can pull your Playwright image (for example `mcr.microsoft.com/playwright`). Replace `YOUR_DOCKER_CONNECTOR` in the examples with your connector reference (for example `account.harnessImageRegistry` or your org’s Docker Hub connector).

## Store the Record Key as a Harness secret

1. In Harness, create an **encrypted text** secret at the appropriate [scope](https://developer.harness.io/docs/platform/role-based-access-control/rbac-in-harness/#permissions-hierarchy-scopes) (project, org, or account).
2. Use a stable **identifier** (Harness derives it from the name). Example identifier: `currents_record_key`.
3. Reference it only by **identifier** in expressions, not the display name. See [Add and reference text secrets](https://developer.harness.io/docs/platform/secrets/add-use-text-secrets).

{% hint style="warning" %}
Avoid `$` in secret values when possible; the shell may expand it. If unavoidable, follow Harness guidance (for example quoting or base64 encoding) in the [text secrets](https://developer.harness.io/docs/platform/secrets/add-use-text-secrets) documentation.
{% endhint %}

## Application configuration

Use the same Playwright + Currents setup as other CI providers.

**`playwright.config.ts`** (reporter):

{% code title="playwright.config.ts" overflow="wrap" %}

```typescript
import { currentsReporter } from "@currents/playwright";
import { defineConfig } from "@playwright/test";

export default defineConfig({
  reporter: [currentsReporter()],
  use: {
    trace: "on",
    video: "on",
    screenshot: "on",
  },
  // ...projects, testDir, etc.
});
```

{% endcode %}

**`currents.config.ts`**:

{% code title="currents.config.ts" %}

```typescript
import { CurrentsConfig } from "@currents/playwright";

const config: CurrentsConfig = {
  projectId: process.env.CURRENTS_PROJECT_ID ?? "",
  recordKey: process.env.CURRENTS_RECORD_KEY ?? "",
};

export default config;
```

{% endcode %}

## CI Build ID (mandatory on Harness)

**You must provide `CURRENTS_CI_BUILD_ID`** (environment variable or reporter config). It is a **required** input for correct Currents behavior on Harness — not optional.

Without a stable, explicit value:

- Each parallel shard may get its own ID → **multiple runs** instead of one combined run
- Reruns may reuse or collide with IDs → **stale or rejected** uploads — see the [CI Build ID FAQ](../../guides/parallelization-guide/ci-build-id.md#faq-retrying-builds-and-ci-build-id)

The value must be:

- **Unique per pipeline execution** (each execution gets its own Currents run)
- **Identical across all parallel Playwright shards** in the same execution (shards merge into one run)
- **Different when you retry the same logical build**, when you need a fresh run — see [CI Build ID](../../guides/parallelization-guide/ci-build-id.md "mention")

Harness resolves expressions before the step runs. Common choices:

| Approach             | Expression (example)                                                                         | Notes                                                                                                                                                             |
| -------------------- | -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Execution only       | `<+pipeline.executionId>`                                                                    | Unique per execution; confirm behavior for **re-runs** in your Harness edition                                                                                    |
| Execution + sequence | Concatenate `<+pipeline.executionId>` with `<+pipeline.sequenceId>` using `+` or `.concat()` | See [Harness variables](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables); helps separate retries when `sequenceId` changes |

Compose multi-part IDs with the concatenation patterns documented under **Harness variables** (for example combining `<+pipeline.identifier>`, `<+pipeline.executionId>`, and `<+pipeline.sequenceId>`).

## Option A — Single Run step (no parallelism)

Add a **Run** step in your **CI** stage. Set **Container Registry** to your Docker connector and **Image** to a [Playwright image](https://playwright.dev/docs/docker) tag that matches your `@playwright/test` version.

{% code overflow="wrap" %}

```yaml
execution:
  steps:
    - step:
        type: Run
        name: playwright_currents
        identifier: playwright_currents
        spec:
          connectorRef: YOUR_DOCKER_CONNECTOR
          image: mcr.microsoft.com/playwright:v1.49.0-jammy
          shell: Bash
          command: |-
            npm ci
            npx playwright install chrome
            npx playwright test
          envVariables:
            CI: "true"
            CURRENTS_PROJECT_ID: YOUR_CURRENTS_PROJECT_ID
            CURRENTS_RECORD_KEY: <+secrets.getValue("currents_record_key")>
            CURRENTS_CI_BUILD_ID: <+pipeline.executionId>
```

{% endcode %}

- Replace `YOUR_CURRENTS_PROJECT_ID` with your project ID, or use a [pipeline variable](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables) (for example `<+pipeline.variables.currents_project_id>`).
- Replace `currents_record_key` with your secret’s **identifier**.

## Option B — Parallel Playwright sharding (recommended)

Use **stage-level** [parallelism](https://developer.harness.io/docs/continuous-integration/use-ci/run-tests/speed-up-ci-test-pipelines-using-parallelism) so Harness runs multiple copies of the stage. Playwright’s [`--shard`](https://playwright.dev/docs/test-sharding) is **1-based**; Harness parallel indices are **0-based**, so use `HARNESS_NODE_INDEX + 1` for the shard index.

Do **not** rely on Harness `split_tests` for Playwright unless you intentionally drive a custom split; native sharding matches the rest of Currents’ CI docs and keeps setup simple.

{% code overflow="wrap" %}

```yaml
- stage:
    name: playwright_tests
    identifier: playwright_tests
    type: CI
    strategy:
      parallelism: 3
      maxConcurrency: 3
    spec:
      cloneCodebase: true
      platform:
        os: Linux
        arch: Amd64
      runtime:
        type: Cloud
        spec: {}
      execution:
        steps:
          - step:
              type: Run
              name: playwright_currents_shard
              identifier: playwright_currents_shard
              spec:
                connectorRef: YOUR_DOCKER_CONNECTOR
                image: mcr.microsoft.com/playwright:v1.49.0-jammy
                shell: Bash
                command: |-
                  npm ci
                  npx playwright install chrome
                  SHARD_INDEX=$((HARNESS_NODE_INDEX + 1))
                  npx playwright test --shard=${SHARD_INDEX}/${HARNESS_NODE_TOTAL}
                envVariables:
                  CI: "true"
                  HARNESS_NODE_INDEX: <+strategy.iteration>
                  HARNESS_NODE_TOTAL: <+strategy.iterations>
                  CURRENTS_PROJECT_ID: YOUR_CURRENTS_PROJECT_ID
                  CURRENTS_RECORD_KEY: <+secrets.getValue("currents_record_key")>
                  CURRENTS_CI_BUILD_ID: <+pipeline.executionId>
```

{% endcode %}

- Tune `parallelism` and `maxConcurrency` per [best practices for looping strategies](https://developer.harness.io/docs/platform/pipelines/looping-strategies/best-practices-for-looping-strategies).
- **`CURRENTS_CI_BUILD_ID` is mandatory** — the **same** value must reach every shard (the `<+pipeline.executionId>` expression above resolves identically for all parallel instances of the same execution).

## Environment variables reference

| Variable               | Required                        | Description                                                                                                                       |
| ---------------------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `CURRENTS_PROJECT_ID`  | Yes                             | Currents project ID from the dashboard                                                                                            |
| `CURRENTS_RECORD_KEY`  | Yes                             | Record key; inject via `<+secrets.getValue("SECRET_IDENTIFIER")>` (or org/account-scoped variant)                                 |
| `CURRENTS_CI_BUILD_ID` | **Yes (mandatory)** | **Required on Harness.** Stable ID shared by all shards in one execution; must change appropriately on retries — see [CI Build ID](../../guides/parallelization-guide/ci-build-id.md "mention") |
| `CI`                   | Optional                        | Set to `true` so tools behave as in CI                                                                                            |
| `HARNESS_NODE_INDEX`   | Parallel only                   | `<+strategy.iteration>` — 0-based shard index                                                                                     |
| `HARNESS_NODE_TOTAL`   | Parallel only                   | `<+strategy.iterations>` — must match `parallelism`                                                                               |

## Optional — Pipeline or stage variables

You can define **pipeline** or **stage** variables for non-secret settings (for example project ID) and reference them with expressions such as `<+pipeline.variables.currents_project_id>`. Precedence for environment variables in Harness is **step > stage > pipeline**. See [Variables](https://developer.harness.io/docs/open-source/pipelines/variables) (open-source YAML) and [Harness variables](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables) (expressions).

## Harness Open Source / GitOps pipeline YAML

If you use the **open-source pipeline** schema (`kind: pipeline`), environment variables are often declared under `spec.options.envs` (pipeline-wide) or `spec.envs` on a `ci` stage, and Run steps use `spec.container` and `spec.script`. The **Currents** requirements are the same: include **`CURRENTS_CI_BUILD_ID` (mandatory)**, other `CURRENTS_*` variables, and `npx playwright test` with optional `--shard`. Map them to your schema per [CI stage reference](https://developer.harness.io/docs/open-source/reference/pipelines/yaml/stage.type.ci).

## Further reading

- [Harness CI Run step settings](https://developer.harness.io/docs/continuous-integration/use-ci/run-step-settings)
- [Speed up CI with parallelism](https://developer.harness.io/docs/continuous-integration/use-ci/run-tests/speed-up-ci-test-pipelines-using-parallelism)
- Currents: [CI optimization](../../guides/ci-optimization/ "mention"), [Playwright orchestration](../../guides/ci-optimization/playwright-orchestration.md "mention")

{% hint style="info" %}
Got stuck configuring CI? Reach out to [support.md](../../resources/support.md "mention").
{% endhint %}
