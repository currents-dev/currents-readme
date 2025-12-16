---
description: >-
  Setup and usage instructions for Playwright integration with Currents
  Dashboard
---

# @currents/playwright

## Requirements

* NodeJS 14.0.0+
* Playwright 1.22.2+

***

## Setup

Creating a new organization and a project at [https://app.currents.dev](https://app.currents.dev), you'll see on-screen instructions with your newly created **Project ID** and **Record Key.**&#x20;

### Install `@currents/playwright`&#x20;

```bash
npm i -D @currents/playwright
```



### Create `currents.config.ts`

Create `currents.config.(m|j|t)s` configuration file.

* Set the **Record Key**, and **Project ID** obtained from Currents dashboard.
* Learn more about [ci-build-id.md](../../../guides/ci-build-id.md "mention").

```typescript
import { CurrentsConfig } from "@currents/playwright";

const config: CurrentsConfig = {
  recordKey: process.env.CURRENTS_RECORD_KEY || throw new Error("oh no!"),
  projectId: process.env.CURRENTS_PROJECT_ID
};

export default config;
```



### Update `playwright.config.js|ts`

Enabled traces, videos and screenshots in `playwright.config.js|ts`

```javascript
use: {
    // ...
    trace: "on",
    video: "on",
    screenshot: "on",
}
```

***

## Usage

Choose the preferred usage method. See details below.



*   `pwc` command-line executable.

    * Run `pwc test` instead of `playwright test`
    * `pwc` automatically configures Playwright to work with Currents
    * Keep Currents configuration in `currents.config.ts`


* Manually add Currents Reporter.
  * Explicitly add Currents reporter to `playwright.config.ts`&#x20;
  * Run `playwright test`  as usual
  * Keep Currents configuration in `currents.config.ts`



* `pwc-p` command-line executable for orchestration.
  * Required to enable [#playwright-orchestration](../../../guides/ci-optimization/playwright-parallelization.md#playwright-orchestration "mention").
  * See [playwright-orchestration.md](../../../guides/ci-optimization/playwright-orchestration.md "mention").
  * See [pwc-p-orchestration.md](pwc-p-orchestration.md "mention")



### `pwc` command-line executable

```
npx pwc --key RECORD_KEY --project-id PROJECT_ID --ci-build-id hello-currents
```

* `pwc` reads configuration from `currents.config.ts`
* Run `pwc` to start recording Playwright runs to Currents.
* Learn more about [ci-build-id.md](../../../guides/ci-build-id.md "mention").
* See [pwc.md](pwc.md "mention") reference documentation.

{% hint style="info" %}
Using `pwc` command overrides the reporters configured in `playwright.config.ts` - you can specify additional reporters using `--reporter` flag. Alternatively, you can explicitly add currents reported in the Playwright configuration as appears below.
{% endhint %}



### Manually Add Currents Reporter

You can manually add Current sreporter to `playwright.config.ts` and keep using `playwright test` CLI command.&#x20;

```typescript
// playwright.config.ts
import { defineConfig, devices, PlaywrightTestConfig } from "@playwright/test";
import { 
  CurrentsFixtures,
  CurrentsWorkerFixtures,
  currentsReporter
} from "@currents/playwright";

export default defineConfig<CurrentsFixtures, CurrentsWorkerFixtures>({
  // ...
  reporter: [currentsReporter()], // 👈🏻 add Currents reporter
})
```

* The reporter reads the configuration from `currents.config.ts` file. See additional configuration options [#configuration](./#configuration "mention").
* Run `npx playwright test` to start sending the results to Currents dashboard.
* Learn more about [ci-build-id.md](../../../guides/ci-build-id.md "mention").

***

## Configuration

Numerous configuration options are available. See  [configuration.md](configuration.md "mention").

***

## Fixtures

The package also provides additional fixtures for Playwright that support various features:

* [code-coverage-for-playwright.md](../../../guides/coverage/code-coverage-for-playwright.md "mention")
* [currents-actions](../../../guides/currents-actions/ "mention")

{% content-ref url="playwright-fixtures.md" %}
[playwright-fixtures.md](playwright-fixtures.md)
{% endcontent-ref %}

***

## Examples

* Run all tests in the current directory:

```
pwc --key <record-key> --project-id <id>    
```

* Run orchestration for all tests in the current directory:

```
pwc-p --key <record-key> --project-id <id> --ci-build-id <build-id>
```

* Run only tests filtered by the tag "@smoke":

```
pwc --key <record-key> --project-id <id> --grep smoke
```

* Run playwright tests and add tags "tagA", "tagB" to the recorded run:

```
pwc --key <record-key> --project-id <id> --tag tagA --tag tagB
```

* Provide `playwright` arguments and flags:

```
pwc --key <record-key> --project-id <id> -- --workers 2 --timeout 10000 --shard 1/2
```

## CI Examples

Check out the example repositories that showcase running Playwright tests on popular CI providers and recording the results to Currents:

* [playwright-github-actions.md](../../../getting-started/ci-setup/github-actions/playwright-github-actions.md "mention")
* [playwright-gitlab-ci-cd.md](../../../getting-started/ci-setup/gitlab/playwright-gitlab-ci-cd.md "mention")
* [jenkins-playwright.md](../../../getting-started/ci-setup/jenkins/jenkins-playwright.md "mention")
* [playwright-circleci.md](../../../getting-started/ci-setup/circleci/playwright-circleci.md "mention")
* [playwright-aws-code-build.md](../../../getting-started/ci-setup/aws-code-build/playwright-aws-code-build.md "mention")
* [playwright-azure-devops.md](../../../getting-started/ci-setup/azure-devops/playwright-azure-devops.md "mention")

Explore how to speed up CI Playwright runs by enabling [playwright-parallelization.md](../../../guides/ci-optimization/playwright-parallelization.md "mention").
