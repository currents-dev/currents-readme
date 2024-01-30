---
description: Running Playwright tests with Currents Dashboard
---

# Your First Playwright Run

Integrating Currents with Playwright enables recording test results together with screenshots, videos, and traces to the cloud dashboard. That unlocks more effective troubleshooting, analytics and proactive monitoring, extending your team's workflows using REST API, WebHooks and built-in integration with Slack, GitHub etc.

{% embed url="https://www.loom.com/share/050c43a3cc6a47d08e3735a50a92eb95?hideEmbedTopBar=true&hide_owner=true&hide_share=true&hide_title=true" %}
Walkthrough creating your first Playwright run on Currents
{% endembed %}

### **Overview**

Here's an overview of what steps you'll need to take to start running Playwright tests using the Currents dashboard and a CI:

* Create an organization and a project
* Install `@currents/playwright` npm package
* Enable traces, videos and screenshots in `playwright.config.js|ts` to enhance the dashboard test results
* Run the tests using `pwc` CLI command or by configuring an extra reporter
* Update your CI provider configuration

{% embed url="https://www.loom.com/share/1227e61104c84365b6aaec144fc9a4c6?hideEmbedTopBar=true.&hide_owner=true&hide_share=true&hide_title=false" %}
Setting Up Playwright in 2 minutes
{% endembed %}

### Create an Organization and a Project

After signing up for the dashboard service, you will be prompted to create a new organization and a project. You can change the name later.

![Creating an Organization and a Project in Currents dashboard](../.gitbook/assets/currents-create-org.gif)

After creating a new organization and a project, you'll see on-screen instructions with your newly created **Project ID** and **Record Key.**&#x20;

Select Playwright from the framework selection list and then choose the preferred installation method (see below).

### Install `@currents/playwright` package

```bash
npm i -D @currents/playwright
```

### Update `playwright.config.js|ts`

{% hint style="info" %}
Disable [`fullParallel`](https://playwright.dev/docs/api/class-testconfig#test-config-fully-parallel) mode and [parallelizing tests in a single file](https://playwright.dev/docs/test-parallel#parallelize-tests-in-a-single-file) - it is not currently supported by Currents
{% endhint %}

Enabled traces, videos and screenshots in `playwright.config.js|ts` to enhance the dashboard test results.

```javascript
use: {
    // ...
    trace: "on",
    video: "on",
    screenshot: "on",
  }
```

### Create your first Playwright run&#x20;

`@currents/playwright` provides an executable script named `pwc` - it runs `playwright` with a predefined configuration.&#x20;

Alternatively, you can add `@currents/playwright` reporter to `playwright.config.ts`

#### Using `pwc` CLI command

Run `pwc` to create your first Playwright run in Currents dashboard.&#x20;

```
npx pwc --key RECORD_KEY --project-id PROJECT_ID --ci-build-id hello-currents
```

* Set the **Record Key**, and **Project ID** obtained from Currents dashboard in the previous step.&#x20;
* Provide `--ci-build-id` to identify this run in the dashboard - the example above uses `hello-currents` as the build ID.

{% hint style="info" %}
Please note that in CI environments the  Build ID needs to be generated based on CI environment variables.&#x20;

`@currents/playwright` automatically detects the Build ID for popular CI providers, but in some cases, you need to define it explicitly.&#x20;

We encourage you to invest 3 minutes into learning more about [ci-build-id.md](../guides/ci-build-id.md "mention") to prevent confusion during the setup.&#x20;
{% endhint %}

#### Manually configuring `@currents/playwright` reporter

Alternatively, you can explicitly add the reporter to Playwright configuration:

```typescript
import { defineConfig, devices, PlaywrightTestConfig } from "@playwright/test";
import { CurrentsConfig, currentsReporter } from "@currents/playwright";

const currentsConfig: CurrentsConfig = {
  ciBuildId: "ci-build-id", // 📖 https://currents.dev/readme/guides/ci-build-id
  recordKey: "secret record key", // 📖 https://currents.dev/readme/guides/record-key
  projectId: "project id", // get one at https://app.currents.dev
};

const config: PlaywrightTestConfig = {
  use: {
    trace: "on",
    video: "on",
    screenshot: "on",
  },
  
  reporter: [currentsReporter(currentsConfig)], // 👈🏻 add Currents reporter

  projects: [
    {
      name: "chromium",
      retries: 2,
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],

};

export default defineConfig(config);


```

You can also set environment variables to provide the configuration options to Currents reporter:

{% tabs %}
{% tab title="Linux" %}
```javascript
CURRENTS_PROJECT_ID=PROJECT_ID \ // the projectId from https://app.currents.dev
CURRENTS_RECORD_KEY=RECORD_KEY \ // the record key from https://app.currents.dev
CURRENTS_CI_BUILD_ID=hello-currents \
npx playwright test
```
{% endtab %}

{% tab title="Windows" %}
```typescript
cmd /V /C "set CURRENTS_PROJECT_ID=PROJECT_ID // the projectId from https://app.currents.dev
&& set CURRENTS_RECORD_KEY=RECORD_KEY // the record key from https://app.currents.dev
&& set CURRENTS_CI_BUILD_ID=hello-currents 
&& npx playwright test"
```
{% endtab %}
{% endtabs %}

With the reporter configured, you can run `npx playwright test` to start sending the results to Currents dashboard.

### Explore the Newly Created Run

If Currents reporter is configured properly, the results of the execution will appear on Currents dashboard, additionally, a link to the recorded run will appear at the end of the execution:

<figure><img src="../.gitbook/assets/currents-2023-04-16-19.36.20@2x.png" alt=""><figcaption><p>A link to recorded results appearing at the end of Playwright tests execution</p></figcaption></figure>

Now you can start configuring your CI environment to record Playwright tests to Currents. Please consider exploring those guides to ensure smooth configuration:

* [api-resources](../api/api-resources/ "mention")
* [ci-build-id.md](../guides/ci-build-id.md "mention")
* [pw-parallelization.md](../guides/pw-parallelization.md "mention")
* [playwright-tags.md](../guides/playwright-tags.md "mention")
* [test-status.md](../tests/test-status.md "mention")
* [insights-and-analytics.md](../insights/insights-and-analytics.md "mention")
* [run-details.md](../runs/run-details.md "mention")

### Update CI Provider Configuration

{% hint style="info" %}
Treat the **Record Key** as a Ci secret - don't expose it publicly&#x20;
{% endhint %}

In order to collect results from multiple CI runners, please make sure that  `--ci-build-id` is **similar across parallel machines, but is unique for each build.**

Please reach out to our in-app support chat to get help with setting up the CI pipeline.

Currents support collecting results from parallel executions on multiple machines using the built-in [Playwright Sharding](https://playwright.dev/docs/test-parallel#shard-tests-between-multiple-machines). The results will be kept as a single dashboard run as long as they share the same CI build ID.

Check out the example for popular CI providers below, more examples for different providers will be added in future.

### Examples

Check out the example repositories that showcase running Playwright tests on popular CI providers and recording the results to Currents:

* [playwright-github-actions.md](../ci-setup/github-actions/playwright-github-actions.md "mention")
* [playwright-gitlab-ci-cd.md](../ci-setup/gitlab/playwright-gitlab-ci-cd.md "mention")
* [jenkins-playwright.md](../ci-setup/jenkins-playwright.md "mention")
* [playwright-circleci.md](../ci-setup/circleci/playwright-circleci.md "mention")
* [playwright-aws-code-build.md](../ci-setup/aws-code-build/playwright-aws-code-build.md "mention")

Explore [@currents/playwright](../integration-with-playwright/currents-playwright.md) npm package documentation for configuration options.
