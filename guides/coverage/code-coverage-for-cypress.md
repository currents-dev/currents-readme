---
description: Learn how to setup Cypress to start reporting code coverage results
---

# Code Coverage for Cypress

### Code Coverage for Cypress

{% hint style="info" %}
TL;DR

See a working [example GitHub repository](https://github.com/currents-dev/cypress-cloud/tree/main/examples/coverage)&#x20;

* Install `cypress-cloud` version `1.9.5+`&#x20;
* Install and configure Cypress Code coverage plugin as described [here](https://docs.cypress.io/guides/tooling/code-coverage)&#x20;
* Run `cypress-cloud` with `--experimental-coverage-recording` CLI flag enabled
{% endhint %}

Enabling code coverage for Cypress involves the following steps:

* Instrumenting the code and generating the coverage report (done by `cypress` runner together with Istanbul or any other coverage tool)
* Uploading the report to Currents for processing (done by `cypress-cloud` package)

#### Instrumenting the code

Instrumenting the code and generating reports is well described in the detailed [guide](https://docs.cypress.io/guides/tooling/code-coverage).

In short:

* Install and configure the official [@cypress/code-coverage](https://www.npmjs.com/package/@cypress/code-coverage) plugin together with the `@cypress/code-coverage/support` support file (the plugin is developed and maintained by the Cypress.io team)
* Add [code instrumentation](https://github.com/cypress-io/code-coverage#instrument-your-application) - for example, by using `@cypress/code-coverage/use-babelrc` for on-the-fly instrumentation

#### Uploading the reports to Currents

* If you haven’t yet, [install `cypress-cloud`](https://github.com/currents-dev/cypress-cloud#setup); make sure to add `cypress-cloud/plugin` **after** `@cypress/code-coverage`
* **Optional:** provide custom location for generated reports:
  * `cypress-cloud` expects to find the coverage reports at their default location at `<projectRoot>/.nyc_output/out.json`
  * **Y**ou can provide a custom location by setting `env.coverageFile` in `cypress.config.{jt}s`

**Example `cypress.config.ts` file**

```tsx
// cypress.config.ts
import coveragePlugin from "@cypress/code-coverage/task";
import coverageInstrumenter from "@cypress/code-coverage/use-babelrc";

import { cloudPlugin } from "cypress-cloud/plugin";

import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      // enable on-the-file instrumentation
      on("file:preprocessor", coverageInstrumenter);
      // enable coverage plugin to generate a report
      const tempConfig = coveragePlugin(on, config);
      // enable cypress-cloud plugin
      return await cloudPlugin(on, tempConfig);
    },
    baseUrl: "<http://localhost:8888>",
    supportFile: "cypress/support/e2e.js",
    specPattern: "cypress/**/*.cy.js",
    env: {
      // @cypress/code-coverage config
      // exclude test files from the reports
      codeCoverage: {
        exclude: ["cypress/**/*.*"],
      },
      // ⭐️ instruct cypress-cloud on the location of the generated report
      coverageFile: "./.nyc_output/out.json",
    },
  },
});
```

**Example Cypress `support.ts` file**

```tsx
import "@cypress/code-coverage/support";
import "cypress-cloud/support";
```

#### Run `cypress-cloud` with coverage enabled

Running `cypress-cloud` with `--experimental-coverage-recording` flag will activate the collection of the coverage reports and send them to Currents for processing.

The script will discover the reports at the configured location `./.nyc_output/out.json` by default, or an explicit location defined in `env.coverageFile` of `cypress.config.{jt}s`

Example:

{% code overflow="wrap" %}
```bash
npx cypress-cloud run --parallel --record --key <record_key> --ci-build-id <ci-build-id>  --experimental-coverage-recording
```
{% endcode %}
