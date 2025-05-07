---
description: Playwright Orchestration setup instructions
---

# Orchestration Setup

Orchestration helps decrease the duration of Playwright tests in CI pipelines. Read our detailed guide on [playwright-parallelization.md](playwright-parallelization.md "mention") that compares the native sharding with orchestration.



### How does it work

`@currents/playwright` contains a command-line executable `pwc-p` —  a lightweight wrapper that implements  Orchestration and runs Playwright behind the scenes.

* it scans the testing suite
* it establishes an orchestration session with Currents servers
* **it** runs Playwright, executing spec files in the optimal order
* the results are recorded to Currents for troubleshooting and analysis



### Setup

Install `@currents/playwright`

```bash
npm i @currents/playwright
```

\


Replace `playwright` command with `pwc-p`&#x20;

```bash
npx pwc-p --key <record-key> --project-id <project-id> --ci-build-id <ci-build-id>
```

{% hint style="success" %}
Read more about [ci-build-id.md](../ci-build-id.md "mention")  and [reporting-strategy.md](../parallelization-guide/reporting-strategy.md "mention")&#x20;
{% endhint %}

&#x20;

`pwc-p` accepts additional playwright arguments and flags (see [currents-playwright](../../resources/reporters/currents-playwright/ "mention")), for example:

{% code overflow="wrap" %}
```bash
# Add additional playwright arguments and flags:
pwc-p --key <record-key> --project-id <id> --ci-build-id <build-id> -- --workers 2 --timeout 10000
```
{% endcode %}

{% hint style="success" %}
There's no need to define shards,

Make sure to remove `--shard` flag — Currents uses all the available machines automatically.
{% endhint %}



A successfully created orchestration prints an output similar to this:

{% code overflow="wrap" %}
```bash
$ npx pwc-p --key **redacted** --project-id **redacted** --ci-build-id `date +%s`  -c ./or8n/playwright.config.ts

🚀 Starting orchestration session...
📦 Currents reporter: 1.1.2 recording CI build 1712134904 for project JJzd65, orchestration id 260264cfa16950ab4dc98d5c54333136
🎭 Playwright: 1.42.1 5 tests in 1 project [chromium]

🌐 Executing orchestrated task: [chromium] spec-or8n-e.spec.ts
🌐 Run URL: https://app.currents.dev/run/9b93659915fe653f
# ...start executing the tests in an optimal order.
```
{% endcode %}



### Examples

Check out the following example configuration of running orchestration in popular CI providers:

* [GitHub Actions](https://github.com/currents-dev/playwright-gh-actions-demo/blob/main/.github/workflows/test-or8n.yml)
* [GitLab CI/CD](https://gitlab.com/currents.dev/gitlab-playwright-currents/-/blob/main/.gitlab/ci/with-reruns-pwcp.yml?ref_type=heads)
* [GitHub Actions + NX](https://github.com/currents-dev/currents-playwright-nx-example/blob/main/.github/workflows/or8n.yml)
* _Missing an example?_ [_Let us know_](mailto:support@currents.dev)_._



### Orchestration and Reporters

#### Adding Additional Reporters

`pwc-p` automatically injects Currents reporter [currents-playwright](../../resources/reporters/currents-playwright/ "mention") into playwright, replacing all other reporters configured in `playwright.config.ts` . To add additional reporters use one of the two options



**Add additional reporters via a CLI parameter.**

{% code overflow="wrap" %}
```bash
# passing additional reporters:
pwc-p --key <record-key> --project-id <id> --ci-build-id <build-id> --reporter="./myreporter/my-awesome-reporter.ts"
```
{% endcode %}



**Prevent automatic injection of Currents reporter, add it manually.**

* Create `currents.config.ts` with the following contents:

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
  reporter: [
    currentsReporter(), // Currents reporter will use 
    // reporter
  ],

  // ... rest of playwright configuration
}
```

* **Optional:** Update `pwc-p` CLI  command

`pwc-p` reads all the configuration from `currents.config.ts` - no need to use CLI params.

{% code overflow="wrap" %}
```
pwc-p  -- [...playwright-cli-params]
```
{% endcode %}



#### Merging Fragmented Reports

Orchestration dynamically pulls test files from a central server, and each pull starts a fresh Playwright process. This can impact reporters that write output files—since a new process runs for each pull, you may need to handle file overwrites and merge results correctly.

The solution is to use the `blob` reporter to gather all the fragmented results and merge them.

```bash
# The PWTEST_BLOB_DO_NOT_REMOVE env variable is needed 
# to preserve the `blob-report` directory between orchestrated spec runs
PWTEST_BLOB_DO_NOT_REMOVE=1 pwc-p --key <record-key> --project-id <id> --ci-build-id <build-id> --reporter blob
```

You can generate other reports by passing the blob results to the `merge-reports` command.

```bash
npx playwright merge-reports --reporter=html ./blob-report
```

Check an [example of Github Actions setup here.](https://github.com/currents-dev/playwright-gh-actions-demo/blob/main/.github/workflows/test-or8n.yml)



### Orchestration and Multiple Workers

`@currents/playwright#13.0.0+` supports automatic detection of multiple workers and the orchestration adjusts to make the best use of the available workers.&#x20;

When multiple workers are enabled, the orchestrator creates a  "batch" of multiple test files to ensure the most optimal utilization of all the available workers. The batch runs as single playwright command.

As of May 2025, the Playwright Test Runner [does not respect the execution order of test files](https://github.com/microsoft/playwright/issues/35743). This means that even if Currents suggests an optimal execution order, Playwright may run files in a different sequence when multiple workers are used. It only affects cases when multiple workers are involved and has a minor impact.

Also see [fully-parallel-mode.md](fully-parallel-mode.md "mention").



### Re-running Only Failed Tests

Re-running only failed tests for orchestrated runs requires collecting the results from multiple machines, or alternatively getting the failed test from Currents [api](../../resources/api/ "mention"). We have created a set of tools to simplify the setup. See [re-run-only-failed-tests.md](re-run-only-failed-tests.md "mention").



### Limitations and Nuances

* Orchestration works on a **file level** - i.e. it balances test files (rather than tests)
* [**Playwright Project dependencies**](https://playwright.dev/docs/test-projects#dependencies) is not supported - i.e. if you have projects that depend one on another, orchestration will not consider the dependencies. As a workaround, run the dependencies in the desired order explicitly by defining separate CI steps with `--project <name>` [specification.](https://playwright.dev/docs/test-projects#run-projects)&#x20;
* [**Global Setup and Teardown**](https://playwright.dev/docs/test-global-setup-teardown). An orchestrated execution will run `playwright` command multiple times. Beware, that the global setup or teardown routines will run for each invocation of `playwright`.



### Next Steps

* Use [ci-tests-on-spot-instances.md](ci-tests-on-spot-instances.md "mention") to reduce your CI bills by 90%
* Explore how to [re-run-only-failed-tests.md](re-run-only-failed-tests.md "mention")
