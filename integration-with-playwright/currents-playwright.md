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

* Enabled traces, videos and screenshots in `playwright.config.js|ts` to enhance the dashboard test results.
* Disable [parallelizing tests in a single file](https://playwright.dev/docs/test-parallel#parallelize-tests-in-a-single-file) because it is not currently supported

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

* `pwc` CLI command - it runs `playwright` with a predefined configuration
* Alternatively, you can add `@currents/playwright` reporter to Playwright configuration file

#### `pwc` CLI command

Run `pwc` to create your first Playwright run in Currents dashboard. Set the record key, and project ID obtained from Currents dashboard in the previous step. Learn more about [CI Build ID](../guides/cypress-ci-build-id.md).

```
npx pwc --key RECORD_KEY --project-id PROJECT_ID --ci-build-id hello-currents
```

Starting from version `0.10.0` you can provide `--tag` CLI option to add tags that will apply to the whole execution, for example:

{% code overflow="wrap" %}
```sh
npx pwc --key RECORD_KEY --project-id PROJECT_ID --ci-build-id CI_BUILD_ID --tag tagA,tagB
```
{% endcode %}

Explore more about [playwright-tags.md](../guides/playwright-tags.md "mention").

#### `@currents/playwright` reporter

Alternatively, you can manually add the reporter to Playwright configuration and keep using `playwright test` CLI command.&#x20;

```typescript
import { currentsReporter } from '@currents/playwright';

const currentsConfig = {
  ciBuildId: process.env.CURRENTS_CI_BUILD_ID,
  recordKey: process.env.CURRENTS_RECORD_KEY,
  projectId: process.env.CURRENTS_PROJECT_ID,
  tag: ["runTagA", "runTagB"],
};
reporter: [
  // explicitly provide reporter name and configuration
  [
    "@currents/playwright",
    currentsConfig
  ],
  // ...or use the helper function that ensures type safety
  currentsReporter(currentsConfig),
  /* other reporters, if exist, e.g.:
  ["html"]
  */
]
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

With the reporter configured, you can run `npx playwright test` to start sending the results to Currents dashboard. Learn more about [cypress-ci-build-id.md](../guides/cypress-ci-build-id.md "mention").

### Examples

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
* Reruns are not supported - rerunning with the same CI build ID would generate a warning and new results would not be uploaded. Please use a new CI build ID.
* Full parallel mode ([parallelizing tests in a single file](https://playwright.dev/docs/test-parallel#parallelize-tests-in-a-single-file)) is not currently supported
