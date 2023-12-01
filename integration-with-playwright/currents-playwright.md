---
description: >-
  Setup and usage instructions for Playwright integrartion with Currents
  Dashboard
---

# @currents/playwright

### Requirements

* NodeJS 14.0.0+
* Playwright 1.22.2+

### Setup

#### Install `@currents/playwright` package

```bash
npm i -D @currents/playwright
```

#### Update `playwright.config.js|ts`

* Creating a new organization and a project at https://app.currents.dev, you'll see on-screen instructions with your newly created **Project ID** and **Record Key.**&#x20;
* Enabled traces, videos and screenshots in `playwright.config.js|ts` to enhance the dashboard test results.

{% hint style="info" %}
Disable [`fullParallel`](https://playwright.dev/docs/api/class-testconfig#test-config-fully-parallel) mode and [parallelizing tests in a single file](https://playwright.dev/docs/test-parallel#parallelize-tests-in-a-single-file) - it is not currently supported by Currents
{% endhint %}

```javascript
use: {
    // ...
    trace: "on",
    video: "on",
    screenshot: "on",
}
```

### Using @currents/playwright

Choose the preferred usage method for `@currents/playwright`&#x20;

* `pwc` CLI command - runs `playwright` with a predefined configuration.
* Alternatively, you can add `@currents/playwright` reporter to `playwright.config.ts`&#x20;

#### `pwc` CLI command

Run `pwc` to create your first Playwright run in Currents dashboard.&#x20;

```
npx pwc --key RECORD_KEY --project-id PROJECT_ID --ci-build-id hello-currents
```

* Set the **Record Key**, and **Project ID** obtained from Currents dashboard.
* Set `--ci-build-id` to a unique value for local testing. Learn more about [ci-build-id.md](../guides/ci-build-id.md "mention") for CI runs.

#### `@currents/playwright` reporter

Alternatively, you can manually add the reporter to Playwright configuration and keep using `playwright test` CLI command.&#x20;

```typescript
// playwright.config.ts
import { defineConfig, devices, PlaywrightTestConfig } from "@playwright/test";
import { CurrentsConfig, currentsReporter } from "@currents/playwright";

const currentsConfig: CurrentsConfig = {
  ciBuildId: "ci-build-id", // 📖 https://currents.dev/readme/guides/ci-build-id
  recordKey: "secret record key", // 📖 https://currents.dev/readme/guides/record-key
  projectId: "project id", // get one at https://app.currents.dev
};

export default defineConfig({
  // ...
  reporter: [currentsReporter(currentsConfig)], // 👈🏻 add Currents reporter
})
```

You can provide the required configuration as a parameter of `currentsReporter` function or as environment variables.&#x20;

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

With the reporter configured, you can run `npx playwright test` to start sending the results to Currents dashboard. Learn more about [ci-build-id.md](../guides/ci-build-id.md "mention").

#### Configuring @currents/playwright

`@currents/playwright` accepts configuration from the following sources:

* environment variables, e.g. `CURRENTS_TAG=tagA,tagB`
* options of `pwc` CLI command, e.g. `npx pwc ---tag tagA --tag tagB`
* reading `currentsReporter` JS configuration object, e.g. `reporters: [currentsReporter(options)]`

The following configuration options are available:

* **`--ci-build-id`**&#x20;
  * the unique identifier for a run.
  * Environment variable: `CURRENTS_CI_BUILD_ID`
  * JS configuration key: `ciBuildId?: string`
* **`-k, --key`**&#x20;
  * your secret Record Key obtained from Currents.
  * Environment variable: `CURRENTS_RECORD_KEY`
  * JS configuration key: `recordKey: string`
* **`-p, --project-id`**&#x20;
  * the project ID for results reporting obtained from Currents.
  * Environment variable: `CURRENTS_PROJECT_ID`
  * JS configuration key: `recordKey: string`
* **`-t, --tag`**&#x20;
  * comma-separated tag(s) for recorded runs in Currents.
  * Environment variable: `CURRENTS_TAG`
  * JS configuration key: `tag?: string[]`
  * Released in version: `0.7.0`
* **`--pwc-remove-title-tags`**&#x20;
  * remove tags from test names in Currents, e.g. `Test name @smoke` becomes `Test name` in the dashboard (default: false). See [playwright-tags.md](../guides/playwright-tags.md "mention").
  * Environment variable: n/a
  * JS configuration key: `removeTitleTags?: boolean = false`
  * Released in version: `0.10.0`
* **`--pwc-disable-title-tags`**&#x20;
  * disable parsing tags from test title, e.g. `Test name @smoke` would not have tag  `smoke` in the dashboard (default: false). See [playwright-tags.md](../guides/playwright-tags.md "mention").
  * Environment variable: `CURRENTS_DISABLE_TITLE_TAGS`
  * JS configuration key: `disableTitleTags?: boolean = false`
  * Released in version: `0.11.0`
* **`--pwc-cancel-after-failures <number | false>`**
  * abort the cloud run after the specified number of failed tests detected. Overrides the default Currents Project settings. If set, must be a positive integer or `false` to override automatic cancellations and project's [fail-fast-strategy.md](../guides/fail-fast-strategy.md "mention"). Also, see [cancel-run.md](../runs/cancel-run.md "mention") and[fail-fast-strategy.md](../guides/fail-fast-strategy.md "mention")
  * Environment variable: `CURRENTS_CANCEL_AFTER_FAILURES`
  * JS configuration key: `cancelAfterFailures?: number | boolean = undefined`
  * Released in version: `0.11.0`
* **`--pwc-debug`**
  * enable debug logs for the reporter (default: false)
  * Environment variable: `DEBUG=currents*`
* **`-V, --version`** show package version
* **`-h, --help`** show `pwc` help

#### Overriding Configuration

Certain configuration values can have multiple sources, e.g. CLI fag and environment variables. Configuration values will resolve as follows:

* first, the environment variable, if exists, otherwise
* the corresponding CLI flag if exists, otherwise
* `currentsReporter` JS configuration object, otherwise
* the default value, otherwise
* throw if the configuration is mandatory

### Examples

* Run all tests in the current directory:

```
pwc --key <record-key> --project-id <id> --ci-build-id <build-id>    
```

* Run only tests filtered by the tag "@smoke":

```
pwc --key <record-key> --project-id <id> --ci-build-id <build-id> --grep smoke
```

* Run playwright tests and add tags "tagA", "tagB" to the recorded run:

```
pwc --key <record-key> --project-id <id> --ci-build-id <build-id> --tag tagA --tag tagB
```

* Provide `playwright` arguments and flags:

```
pwc --key <record-key> --project-id <id> --ci-build-id <build-id> -- --workers 2 --timeout 10000 --shard 1/2
```

#### CI Examples

Check out the example repositories that showcase running Playwright tests on popular CI providers and recording the results to Currents:

* [playwright-github-actions.md](../ci-setup/github-actions/playwright-github-actions.md "mention")
* [playwright-gitlab-ci-cd.md](../ci-setup/gitlab/playwright-gitlab-ci-cd.md "mention")
* [jenkins-playwright.md](../ci-setup/jenkins-playwright.md "mention")
* [playwright-circleci.md](../ci-setup/circleci/playwright-circleci.md "mention")
* [playwright-aws-code-build.md](../ci-setup/aws-code-build/playwright-aws-code-build.md "mention")

### Good To Know

#### Screenshots

By default, Playwright only captures screenshots at the end of a test, according to the provided [screenshot](https://playwright.dev/docs/screenshots) option. Manually created screenshots are hidden by default and won't be attached to any test.

To send screenshots to Currents, they have to be attached to the test. For example, you can attach a screenshot to a test like this

```jsx
const { test, expect } = require("@playwright/test");

test("basic test", async ({ page }, testInfo) => {
  await page.goto("<https://playwright.dev>");
  const screenshot = await page.screenshot();
  await testInfo.attach("screenshot", {
    body: screenshot,
    contentType: "image/png",
  });
});
```

For more information see the Playwright [test info attachment](https://playwright.dev/docs/api/class-testinfo#test-info-attach) documentation.

### Limitations

* We recommend using the native [Playwright Shards](https://playwright.dev/docs/test-parallel#shard-tests-between-multiple-machines) while we are working on other types of orchestration-related features.
* Rerunning with the same CI build ID would generate a warning and new results would not be uploaded. Please use a new CI build ID.
* Full parallel mode ([parallelizing tests in a single file](https://playwright.dev/docs/test-parallel#parallelize-tests-in-a-single-file)) is not currently supported
