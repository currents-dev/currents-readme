---
description: '@currents/playwright configuration reference'
---

# Configuration

## Configuration Sources

`@currents/playwright` accepts configuration from the following sources:

* **⭐️ Preferred:** reading `currents.config.ts` file
* Environment variables, e.g. `CURRENTS_TAG=tagA,tagB`
* CLI command options, e.g. `npx pwc ---tag tagA --tag tagB`
* Inline configuration in `playwright.config.ts` e.g. `reporters: [currentsReporter(options)]`

{% hint style="success" %}
We recommend using `currents.config.ts` as the preferred method for defining the configution — the file is evaluated at runtime, i.e. you can make is smart.

For example:

```typescript
import { OrchestrationStatus, CurrentsConfig } from "@currents/playwright";

function getCIBuildId() {
  return "example";
}
const onFinish = async (result: OrchestrationStatus) => {
    console.log("Orchestration finished with status", result);
};

const config: CurrentsConfig = {
  recordKey: process.env.CURRENTS_RECORD_KEY || throw new Error("oh no!"),
  projectId: process.env.CURRENTS_PROJECT_ID,
  ciBuildId: getCIBuildId(),
  orchestration: {
    skipReporterInjection: true,
    onFinish,
  },
};

export default config;
```
{% endhint %}

### Configuration Overrides

Configuration values will resolve as follows:

* environment variable value if exists, otherwise
* corresponding CLI parameter value if exists, otherwise
* value from `playwright.config.ts`  if exists, otherwise
* value from `currents.config.ts` if exists, otherwise
* the default value, otherwise
* throw if the value is mandatory



Example of using environment variables

{% tabs %}
{% tab title="Linux" %}
```javascript
CURRENTS_PROJECT_ID=PROJECT_ID \ // the projectId from https://app.currents.dev
CURRENTS_RECORD_KEY=RECORD_KEY \ // the record key from https://app.currents.dev
CURRENTS_CI_BUILD_ID=hello-currents \ // the CI build ID 
CURRENTS_TAG=tagA,tagB \
npx playwright test
```
{% endtab %}

{% tab title="Windows" %}
```typescript
cmd /V /C "set CURRENTS_PROJECT_ID=PROJECT_ID // the projectId from https://app.currents.dev
&& set CURRENTS_RECORD_KEY=RECORD_KEY // the record key from https://app.currents.dev
&& set CURRENTS_CI_BUILD_ID=hello-currents  // CI build id
&& set CURRENTS_TAG=tagA,tagB  // tags for the created run
&& npx playwright test"
```
{% endtab %}
{% endtabs %}

## Reference

### ciBuildId <mark style="color:yellow;">\*</mark>

* Type: `string`
* Default: `undefined`
* Environment variable: `CURRENTS_CI_BUILD_ID`

<mark style="color:yellow;">Required.</mark> The ID of the build to associate the test run with. See [ci-build-id.md](../../../guides/ci-build-id.md "mention").

***

### projectId <mark style="color:yellow;">\*</mark>

* Type: `string`
* Default:  `undefined`
* Environment variable: `CURRENTS_PROJECT_ID`

<mark style="color:yellow;">Required.</mark> The Currents project ID used for reporting. See [projects](../../../dashboard/projects/ "mention").

***

### recordKey <mark style="color:yellow;">\*</mark>

* Type: `string`
* Default: _Required_
* Environment variable: `CURRENTS_RECORD_KEY`

<mark style="color:yellow;">Required.</mark> Secret key used to authenticate and upload results to Currents. See [record-key.md](../../../guides/record-key.md "mention").

***

### tag

* Type: `string[]`
* Default: `[]`
* Environment variable: `CURRENTS_TAG=tagA,tagB`

Tags added to the test run metadata. See [playwright-tags.md](../../../guides/playwright-tags.md "mention").

***

### removeTitleTags

* Type: `boolean`
* Default: `false`
* Environment variable: N/A

Remove inline tags like `@smoke` from test titles when processing test results on Currents servers. Helps to keep the test title consistent and keep test history when tags change.

***

### disableTitleTags

* Type: `boolean`
* Default: `false`
* Environment variable: `CURRENTS_DISABLE_TITLE_TAGS`

Prevent parsing tags like @smoke from test titles.

***

### cancelAfterFailures

* Type: `number | false`
* Default: `false`
* Environment variable: `CURRENTS_CANCEL_AFTER_FAILURES`

Stop the run after a number of failures. The number of failures is determined from all the results reported to the associated run (i.e. from multiple machines). Pass false to disable. See [fail-fast-strategy.md](../../../guides/ci-optimization/fail-fast-strategy.md "mention").

***

### testSuiteFile

* Type: `string`
* Default: `undefined`
* Environment variable: `CURRENTS_TEST_SUITE_FILE`

Full path to the test suite file used for orchestration and reporting. Mostly used internally.

***

### machineId

* Type: `string`
* Default: `CURRENTS_MACHINE_ID`
* Environment variable: N/A

Optional unique machine identifier. Mostly used internally.

***

### orchestrationId

* Type: `string`
* Default: Auto-generated
* Environment variable: `CURRENTS_ORCHESTRATION_ID`

Unique orchestration ID for the run. Mostly used internally.

***

### outputFile

* Type: `string`
* Default: `undefined`
* Environment variable: `CURRENTS_OUTPUT_FILE`

File path for the JSON output summary. The TypeScript definition of the contents is available:

```typescript
import type { ExecutionJSONSummary } from '@currents/playwright'
```

***

### orchestration

Set of configuration items related to [playwright-orchestration.md](../../../guides/ci-optimization/playwright-orchestration.md "mention").\


#### orchestration.resetSignal

* Type: `SIGUSR1 | SIGUSR2`
* Default: `undefined`
* Environment variable: N/A

Signal used to reset the tests running on the machine. See [ci-tests-on-spot-instances.md](../../../guides/ci-optimization/ci-tests-on-spot-instances.md "mention").

\


#### orchestration.skipReporterInjection

* Type: `boolean`
* Default: `false`
* Environment variable: N/A

Prevents `pwc-p` from automatically configuring Playwright to use Currents reporter . If see, you must add Currents reporter manuall. See [playwright-orchestration.md](../../../guides/ci-optimization/playwright-orchestration.md "mention").

\


#### orchestration.onFinish

* Type: `(status: OrchestrationStatus) => Promise<void>`
* Default: `undefined`
* Environment variable: N/A

Optional async callback called after orchestration completes. The callback runs on each machine that is part of an orchestrated run. The parameter `status` contains aggregated results from all the participating machines. The TypeScript definition of the contents is available:

```typescript
import type { OrchestrationStatus } from "@currents/playwright";
```

\


#### orchestration.batchSize

* Type: `"auto" | number`
* Default: `auto`
* Environment variable: `CURRENTS_BATCH_SIZE`
* Released in: `1.13.0`

Sets the batch size for orchestration. Batch size defines how many parallel workers should be used for the orchestration.&#x20;

* `auto` infers the batch size from Playwright workers.&#x20;
* `number` explicitly sets the batch size, must be greater than `0`

{% hint style="info" %}
Defining this variable will override any project level batch size/workers definition. [Project level settings](../../../guides/ci-optimization/playwright-orchestration.md#project-level-workers) are available on `@currents/playwright` starting at version `1.14.0`.
{% endhint %}

***

### coverage

Set of configuration items related to [code-coverage-for-playwright.md](../../../guides/ci-optimization/coverage/code-coverage-for-playwright.md "mention").\
\


#### coverage.projects

* Type: `boolean | string[]`
* Default: `false`
* Environment variable: N/A

Enable or disable coverage collection for Playwright projects

* `true | []`: enable for all projects
* `string[]`: only enable for specified projects
* `false | undefined`: disabled

\


#### coverage.dir

* Type: `string`
* Default: `.nyc_output`
* Environment variable: N/A

Directory path for reading coverage reports. See [code-coverage-for-playwright.md](../../../guides/ci-optimization/coverage/code-coverage-for-playwright.md "mention").
