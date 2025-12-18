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
