---
description: Setup instructions for Playwright Orchestration
---

# Orchestration Setup

{% hint style="warning" %}
Migrating from `v1`? See [playwright-orchestration-migration-guide.md](playwright-orchestration-migration-guide.md "mention").
{% endhint %}

Orchestration helps decrease the duration of Playwright tests in CI pipelines. Read our detailed guide on [playwright-parallelization.md](playwright-parallelization.md "mention") that compares native sharding with orchestration.

## How does it work

At a high level:

* creates a list of tests for orchestration using `pwc-p discover`
* establishes an orchestration session with Currents servers
* assigns work to available CI machines using historical execution and timing data
* records results to Currents for troubleshooting and analysis

`@currents/playwright` includes a CLI command `pwc-p` that implements Playwright Orchestration.

1. [`pwc-p discover`](../../resources/reporters/currents-playwright/pwc-p-discover.md) — runs Playwright in discovery mode and writes the list of tests to be orchestrated to a file.
2. [`pwc-p run`](../../resources/reporters/currents-playwright/pwc-p-run.md) — initiates the orchestrated execution based on the previous step.

## Setup

Install `@currents/playwright`

```bash
npm i @currents/playwright@latest
```

* Run `pwc-p discover` to create a discovery file with tests selected for orchestration, you can apply the same filters and CLI arguments as for `playwright` command.
* Run `pwc-p run` with `--pwc-discovery-file` to execute the orchestration. Run `pwc-p run --help` to see the available flags or refer to [currents-playwright](../../resources/reporters/currents-playwright/ "mention").

{% code overflow="wrap" lineNumbers="true" %}
```bash
npx pwc-p discover --pwc-discovery-file <discovery-path> [...filters]
npx pwc-p run --pwc-discovery-file <discovery-path> --key <currents-record-key> --project-id <currents-project-id> --ci-build-id <ci-build-id>
```
{% endcode %}

A successfully created orchestration prints an output similar to this.

{% code overflow="wrap" %}
```bash
$ npx pwc-p run --key *secret* --project-id WeZwSj --ci-build-id example-001
🚀 Starting orchestration session...
📦 Currents reporter: 2.0.0
  - ci build id: example-001
  - project id: WeZwSj
  - orchestration id: 11b601f500893bacfa169acb126b6239
  - machine id: bA0qyMOxUiCz9XT0
🎭 Playwright: 1.60.0 5 tests in 1 project [chromium]

🌐 Executing orchestrated task: [chromium] test2.spec.ts, test.spec.ts
ℹ️  Batch size: 3
🌐 Run URL: https://app.currents.dev/run/4aefcb5cd3bb5c89
#...
```
{% endcode %}

{% hint style="info" %}
Currents automatically balances tests between all available CI machines, which makes `--shard` redundant — it should be removed.

Read more about [ci-build-id.md](../parallelization-guide/ci-build-id.md "mention") and [reporting-strategy.md](../parallelization-guide/reporting-strategy.md "mention").
{% endhint %}

## When to use `discover`

`pwc-p discover` is required when you want to explicitly select tests for orchestration — for example:

* Filtering tests by tag: `--grep / -g @smoke`
* Filtering tests by last run outcome: `--last-failed` (see [#re-running-only-failed-tests](playwright-orchestration.md#re-running-only-failed-tests "mention"))
* Filtering tests by Playwright project: `--project chromium`
* Explicit spec file location: `playwright test <spec-file-path>`

Apply the desired arguments and parameters as if you are running `playwright` command, for example:

{% code overflow="wrap" lineNumbers="true" %}
```sh
# Create discovery file with filters applied
npx pwc-p discover --pwc-discovery-file ./test-list --grep @smoke --project chromium

# Use the discovery file as an input for orchestration
npx pwc-p run --pwc-discovery-file ./test-list --key currents-record-key --project-id currents-project-id --ci-build-id ci-build-id
```
{% endcode %}

Omitting discovery stage selects **all** tests for orchestration.

| Scenario                           | Commands                                        |
| ---------------------------------- | ----------------------------------------------- |
| Run the full suite (no filters)    | `pwc-p run ...`                                 |
| Filter tests with Playwright flags | first `pwc-p discover ...` then `pwc-p run ...` |

## Discovery output

Creates a discovery file at a destination, then use the file as an input for `pwc-p run` command

```bash
npx pwc-p discover --pwc-discovery-file tests.txt --grep @smoke --project frontend
npx pwc-p run --pwc-discovery-file tests.txt ...
```

Additional methods for providing discovery file:

* `CURRENTS_DISCOVERY_FILE` environment variable
* `orchestration.discoveryFile` in `currents.config.ts`

{% hint style="info" %}
`CURRENTS_DISCOVERY_FILE` or `orchestration.discoveryFile` are the recommended options for CI environments, as this setup applies to both `discover` and `run` commands.
{% endhint %}

## Examples

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

Run `pwc-p discover --help` or `pwc-p run --help` to see the list of supported flags.

## Orchestration in CI

Provider-specific orchestration examples are being updated for `discover` and `run`. Use these pages as starting points:

* [GitHub Actions](../../getting-started/ci-setup/github-actions/playwright-github-actions.md)
* [GitHub Actions: re-run only failed tests](../../getting-started/ci-setup/github-actions/re-run-failed-only-tests-orchestrated-v2.md)
* [GitHub Actions + NX](https://github.com/currents-dev/currents-examples/blob/main/playwright/ci/nx/.github/workflows/or8n.yml)
* [GitLab CI/CD](https://gitlab.com/currents.dev/gitlab-playwright-currents/-/blob/main/.gitlab/ci/with-reruns-pwcp.yml?ref_type=heads)
* [NX](../../getting-started/ci-setup/nx.md)
* [Jenkins](../../getting-started/ci-setup/jenkins.md)
* [CircleCI](../../getting-started/ci-setup/playwright-circleci.md)
* [Azure DevOps](../../getting-started/ci-setup/playwright-azure-devops.md)
* [AWS CodeBuild](../../getting-started/ci-setup/playwright-aws-code-build.md)
* [Harness](../../getting-started/ci-setup/playwright-harness.md)

## Orchestration and Reporters

### Additional Reporters

`pwc-p run` automatically injects Currents reporter [currents-playwright](../../resources/reporters/currents-playwright/ "mention") into Playwright, replacing all other reporters configured in `playwright.config.ts`. To add additional reporters use one of the two options.

#### **Add reporters as a CLI parameter.**

{% code overflow="wrap" %}
```bash
pwc-p run --key <record-key> --project-id <id> --ci-build-id <build-id> --reporter="./myreporter/my-awesome-reporter.ts"
```
{% endcode %}

#### **Manual Configuration**

Create `currents.config.ts` with the following contents:

```typescript
import { CurrentsConfig } from "@currents/playwright";

const config: CurrentsConfig = {
  recordKey: process.env.CURRENTS_RECORD_KEY,
  projectId: process.env.CURRENTS_PROJECT_ID,
  ciBuildId: "value", // ⚠️ Set the value as described in CI build ID guide
  orchestration: {
    skipReporterInjection: true, // prevent automatic reporter injection
  },
};

export default config;
```

* Update `playwright.config.ts`

```typescript
import { currentsReporter } from "@currents/playwright";
import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  reporter: [currentsReporter()],

  // ... rest of playwright configuration
};
```

* **Optional:** Update the `pwc-p run` CLI command

`pwc-p run` reads all the configuration from `currents.config.ts` — no need to use CLI params.

{% code overflow="wrap" %}
```bash
pwc-p run -- [...playwright-cli-params]
```
{% endcode %}

### Merging Fragmented Reports

Orchestration dynamically pulls test files from a central server, and each pull starts a fresh Playwright process. This can impact reporters that write output files—since a new process runs for each pull, you may need to handle file overwrites and merge results correctly.

The solution is to use the `blob` reporter to gather all the fragmented results and merge them.

```bash
# The PWTEST_BLOB_DO_NOT_REMOVE env variable is needed
# to preserve the `blob-report` directory between orchestrated spec runs
PWTEST_BLOB_DO_NOT_REMOVE=1 pwc-p run --key <record-key> --project-id <id> --ci-build-id <build-id> --reporter blob
```

You can generate other reports by passing the blob results to the `merge-reports` command.

```bash
npx playwright merge-reports --reporter=html ./blob-report
```

Check an [example of Github Actions setup here.](https://github.com/currents-dev/currents-examples/blob/main/playwright/ci/github-actions/.github/workflows/test-or8n.yml)

## Orchestration and Multiple Workers

Orchestration adjusts to make the best use of the available workers.

When multiple workers are enabled, the orchestrator creates a "batch" of multiple test files to ensure the most optimal utilization of all the available workers. The batch runs as single playwright command.

As of May 2025, the Playwright Test Runner [does not respect the execution order of test files](https://github.com/microsoft/playwright/issues/35743). This means that even if Currents suggests an optimal execution order, Playwright may run files in a different sequence when multiple workers are used. It only affects cases when multiple workers are involved and has a minor impact.

{% hint style="info" %}
Having multiple workers behaves differently in Playwright's [fully-parallel-mode.md](fully-parallel-mode.md "mention").  If you are using Fully Parallel Mode, and most of your test files contain more than one test, you will want to keep your Batch Size at 1 and your Playwright workers at a larger number.
{% endhint %}

### Batch size configuration

The batch size can be configured via [env variable or cli option](https://docs.currents.dev/resources/reporters/currents-playwright/pwc-p-orchestration#pwc-batch-size-less-than-auto-or-number-greater-than).

Starting at `@currents/playwright` version `1.14.0` and `@playwright/test` version starting at `1.52.0` the option can be set per project.

This means that the batch size can be handled globally, that also supports automatic detection of global workers, but also the project level workers and batch size is taken into account for defining the batch size.

Batch size for each project is determined by evaluating options in the following order of priority:

{% stepper %}
{% step %}
**Global batch size**

A global batch size defined via [environment variable or CLI option](https://docs.currents.dev/resources/reporters/currents-playwright/pwc-p-orchestration#pwc-batch-size-less-than-auto-or-number-greater-than) will override any batch size or worker settings defined at the project level.

<sub>Starting with version</sub> <sub>`1.13.0`</sub><sub>, the reporter can automatically detect and use the global worker count as the batch size, if global workers are defined.</sub>
{% endstep %}

{% step %}
**Project batch size**

`currentsBatchSize` defined at [project level](playwright-orchestration.md#project-level-batch-size)

<sub>This configuration is available in</sub><sub>`@currents/playwright`</sub> <sub>version starting at</sub> <sub>`1.14.0`</sub> <sub>and</sub> <sub>`@playwright/test`</sub> <sub>version starting at</sub> <sub>`1.52.0`</sub>
{% endstep %}

{% step %}
**Project workers**

`workers` defined at [project level](playwright-orchestration.md#project-level-workers)

<sub>This configuration is available in</sub><sub>`@currents/playwright`</sub> <sub>version starting at</sub> <sub>`1.14.0`</sub> <sub>and</sub> <sub>`@playwright/test`</sub> <sub>version starting at</sub> <sub>`1.52.0`</sub>
{% endstep %}

{% step %}
**Global workers**

[Globally defined `workers`](https://playwright.dev/docs/api/class-testconfig#test-config-workers)
{% endstep %}

{% step %}
**Default**

If none of the above is defined, batch size is `1`
{% endstep %}
{% endstepper %}

### Project level workers

This feature allows you to set the number of workers at project level, enabling each project to specify its own batch size based on the workers.

This is how the workers can be defined:

```typescript
...
projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      workers: 2
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
      workers: 3
    },
  ],
...
```

Currents will use the batch size **`auto`** option by default. This means the reporter will read each project workers setting and use it as batch size.

If no workers are defined for a project, Currents will use the global workers value as batch size.

### Project level batch size

The Playwright project configuration can be extended with `currentsBatchSize` which explicitly sets the batch size per project. Import `CurrentsFixtures` for typescript suport.<br>

```typescript
import type { CurrentsFixtures } from "@currents/playwright";
import { defineConfig, devices } from "@playwright/test";

export default defineConfig<CurrentsFixtures>({
  ...
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        currentsBatchSize: 3
      },
      workers: 2,
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        currentsBatchSize: "auto"
      },
    },
  ],
  ...
});

```

In this example, the `chromium` project has 2 workers defined. However, since the `currentsBatchSize` property is set, Currents will use the specified `currentsBatchSize` instead of the workers value.

For the `firefox` project, the `currentsBatchSize` is set to `auto`, so Currents will use the project's workers value. Since it is not defined, Currents will fall back to the global workers value.

## Re-running Only Failed Tests

Orchestrated reruns use `pwc-p discover` with `--last-failed` (or flags from the [playwright-last-failed](https://github.com/currents-dev/playwright-last-failed) action) to build the filtered test list, then `pwc-p run` with `--pwc-discovery-file`.

```bash
npx pwc-p discover --pwc-discovery-file tests.txt --last-failed
npx pwc-p run --key <record-key> --project-id <project-id> --ci-build-id <ci-build-id> --pwc-discovery-file tests.txt
```

See [re-run-only-failed-tests-orchestrated-v2.md](re-run-only-failed-tests-orchestrated-v2.md "mention") for the full implementation details.

## Limitations and Nuances

* Orchestration works on a **file level** — it balances test files (rather than individual tests).
* Batch Size needs to manually set to 1 for [fully-parallel-mode.md](fully-parallel-mode.md "mention") in order to correctly balance your machines. We will improve this in a future update.
* [Playwright Project dependencies](https://playwright.dev/docs/test-projects#dependencies) is not supported — if projects depend on one another, orchestration will not consider the dependencies. As a workaround, run the dependencies in the desired order explicitly by defining separate CI steps with `--project <name>` [specification.](https://playwright.dev/docs/test-projects#run-projects)
* [Global Setup and Teardown](https://playwright.dev/docs/test-global-setup-teardown). An orchestrated execution runs `playwright` multiple times. Beware that global setup or teardown routines run for each invocation of `playwright`.

## Next Steps

* Use [ci-tests-on-spot-instances.md](ci-tests-on-spot-instances.md "mention") to reduce your CI bills by 90%
