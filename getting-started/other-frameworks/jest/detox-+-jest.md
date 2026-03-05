---
description: Follow this guide to enable integrating Detox + Jest with Currents
---

# Detox + Jest

[Detox](https://wix.github.io/Detox/) is a popular gray-box end-to-end testing and automation framework for React Native apps.&#x20;

Detox delegates scheduling and running tests onto a test runner. Jest is the default and the recommended choice, for many reasons, including - but not limited to, parallel test suite execution capability, and complete integration with Detox API.

Currents integration with Jest allows sending the results of your Detox tests to Currents.&#x20;

### Add Currents Reporter for Jest

After you setup and configure Detox for your mobile application, add [currents-jest](../../../resources/reporters/currents-jest/ "mention") reporter to `jest.config.js`

{% code title="jest.config.js" %}
```javascript
/** @type {import('jest').Config} */
module.exports = {
  maxWorkers: 1,
  globalSetup: './globalSetup.ts',
  globalTeardown: 'detox/runners/jest/globalTeardown',
  testEnvironment: 'detox/runners/jest/testEnvironment',
  setupFilesAfterEnv: ['./setup.ts'],
  testRunner: 'jest-circus/runner',
  testTimeout: 120000,
  testMatch: ['**/*.test.ts'],
  transform: {
    '\\.tsx?$': 'ts-jest'
  },
  reporters: ['detox/runners/jest/reporter', '@currents/jest'], // 👈🏻
  verbose: true
};
```
{% endcode %}

### Run Detox Tests

Run detox tests:

```
npx detox test --configuration android.emu.release
```

Running this command with [currents-jest](../../../resources/reporters/currents-jest/ "mention") reporter enabled generates results in a format compatible for processing by Currents.

In order to send the results for processing you'd invoke an additional command `currents upload` from [currents-cmd](../../../resources/reporters/currents-cmd/ "mention") npm package.

### Uploading Results to Currents

Run the following command to upload the results to Currents (see [currents-upload.md](../../../resources/reporters/currents-cmd/currents-upload.md "mention") for details)

```
npx currents upload --key=KPEvZL0LDYzcZH3U --project-id=X7niCl
```

Before running `currents upload`  you must explicitly define detox configuration that matches the configuration used to run the tests.&#x20;

For example, if you run the tests using `--configuration android.emu.release`, then you should also define the same configuration value for `currents upload` command.

{% hint style="warning" %}
Without specifying the configuration, you may encounter an error:

{% code overflow="wrap" %}
```
Jest: Got error running globalSetup
Cannot determine which configuration to use from Detox config at path:
_path/detox-example/.detoxrc.js

HINT: Use --configuration to choose one of the following:
* android.emu.release
* ios
```
{% endcode %}
{% endhint %}

#### Setting Detox Configuration

To explicitly set Detox configuration set the `selectedConfiguration: <configuration key>` in the Detox [config file](https://wix.github.io/Detox/docs/config/overview/#config-structure):

{% code title=".detoxrc.js" %}
```javascript
  selectedConfiguration: "android.emu.release",
  configurations: {
    "android.emu.release": {
      device: "emulator",
      app: "android.release",
    },
    ios: {
      device: "ios.simulator",
      app: "ios",
    },
  }
```
{% endcode %}

If you have only one configuration value in the `configurations` object of detox configuration file, Detox will pick it by default and there's no need to explicitly set the configuration.&#x20;

{% hint style="info" %}
The `currents upload` command will execute `jest` to discover the full test suite. During this process, the `globalSetup` script will be run, which can only utilize the `selectedConfiguration` option or the single value from the `configurations` object.
{% endhint %}

### Detox retries limitation

When retries are used (e.g. with Detox), results can end up in **multiple report directories** or show **only the last attempt**. This section explains why and how to configure the reporter.

#### How the report directory works

The reporter writes results into a **report directory**. One Jest process uses one directory per run.

* **Not set:** A new unique directory is created for each run (e.g. `.currents/2025-03-05-…-uuid`). If your workflow starts Jest **more than once** (e.g. Detox re-runs failed tests in a new process), each run gets its own directory. Results are split across folders and upload may see only one or fail.
* **Set:** Every run writes to the same folder. Upload sees one report. If a later run only re-runs failed tests, it **overwrites** those tests results in that folder, so Currents shows only the **last attempt** for retried specs.

**Configuration:** Set the path in Jest config (`reportDir` in the reporter options) or with the `CURRENTS_REPORT_DIR` environment variable. Env var overrides the config option when both are set.

#### Why Detox is different

Detox runs tests via Jest in separate processes. With [`detox test --retries <n>`](https://wix.github.io/Detox/docs/config/testRunner/#testrunnerretries-number), Detox **starts Jest again** for failed test files only. So you get multiple Jest runs in one logical run - which leads to either multiple report directories (if report dir is not set) or overwritten retry results (if it is set). The same applies to any setup that runs Jest more than once.

#### What to do

**Option 1: Use Jest retries (recommended)**

Use **Jest's built-in retries** (e.g. [`jest.retryTimes()`](https://jestjs.io/docs/jest-object#jestretrytimesnumretries-options) in config). Retries stay in the same Jest process, so there is one run, one report directory, and full retry history in Currents.

Use this when Jest-level retries are enough and you don't need Detox’s “re-run only failed files in a new process” behavior.

**Option 2: Fixed report directory with Detox retries**

When you must use [Detox's retries](https://wix.github.io/Detox/docs/config/testRunner/#testrunnerretries-number), set a **fixed report directory** so every run writes to the same place and upload finds a single report.

**Jest config:**

```js
// jest.config.js
module.exports = {
  reporters: [
    'detox/runners/jest/reporter',
    ['@currents/jest', { reportDir: './e2e/.test-results' }],
  ],
  // ...
};
```

**Or environment variable:**

```bash
CURRENTS_REPORT_DIR=./e2e/.test-results
```

**Trade-off:** The retry run writes to the same directory and overwrites the first run’s results for those tests, so Currents shows only the last attempt for retried specs.

#### Quick reference

| Scenario                                         | No fixed report directory                    | Fixed report directory                                             |
| ------------------------------------------------ | -------------------------------------------- | ------------------------------------------------------------------ |
| Single Jest run (or Jest retries in one process) | One directory, full results                  | One directory, full results                                        |
| Multiple Jest runs (e.g. Detox `--retries`)      | Several directories; upload may use only one | One directory; retried tests overwrite → only last attempt visible |

**Recommendation:** Prefer Jest retries when possible (one directory, full retry history). If using Detox `--retries`, set a fixed report directory and accept that retried specs show only the last attempt.

{% hint style="info" %}
Improved support for Detox-style retries (e.g. merging retry runs into one report or full retry history in Currents) is proposed on [Featurebase](https://currents.featurebase.app/p/improved-detox-retries-support). Upvote there to help prioritise implementation.
{% endhint %}
