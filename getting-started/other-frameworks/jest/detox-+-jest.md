---
description: Send the results of Detox + Jest tests to Currents
---

# Detox + Jest

[Detox](https://wix.github.io/Detox/) is a gray-box end-to-end testing framework for React Native apps. Detox runs the tests with a test runner, and Jest is the recommended one.

Currents receives the results of Detox tests through the [currents-jest](../../../resources/reporters/currents-jest/ "mention") reporter and the `currents upload` command of [currents-cmd](../../../resources/reporters/currents-cmd/ "mention"). A Detox run in Currents includes:

* the result of every test attempt, including the attempts of `detox test --retries`
* the videos, screenshots and device logs that Detox records, attached to the attempt they belong to
* `detox.trace.json`, the Detox trace of the session

{% hint style="info" %}
Detox support is in the beta versions of the packages: `@currents/jest` `1.4.0-beta.1` and `@currents/cmd` `1.11.0-beta.2`. See [the example project](https://github.com/currents-dev/currents-examples/tree/main/generic-reporter/jest/detox) for a React Native app that runs Detox in GitHub Actions and reports to Currents.
{% endhint %}

### Install the packages

```bash
npm install --save-dev @currents/jest@beta @currents/cmd@beta
```

### Add the reporter

Add `@currents/jest` next to the Detox reporter in the Jest configuration of your Detox tests:

{% code title="e2e/jest.config.js" %}
```javascript
/** @type {import('jest').Config} */
module.exports = {
  rootDir: '..',
  testMatch: ['<rootDir>/e2e/**/*.test.js'],
  testTimeout: 120000,
  maxWorkers: 1,
  globalSetup: 'detox/runners/jest/globalSetup',
  globalTeardown: 'detox/runners/jest/globalTeardown',
  testEnvironment: 'detox/runners/jest/testEnvironment',
  reporters: ['detox/runners/jest/reporter', '@currents/jest'], // 👈🏻
  verbose: true,
};
```
{% endcode %}

### Record artifacts

Currents uploads the files that Detox records. Turn on the artifact plugins in the Detox configuration, or with the `--record-logs`, `--take-screenshots` and `--record-videos` options of `detox test`:

{% code title=".detoxrc.js" %}
```javascript
module.exports = {
  artifacts: {
    plugins: {
      log: 'all',
      screenshot: 'failing',
      video: 'failing',
    },
  },
  // ...
};
```
{% endcode %}

Detox writes `detox.trace.json` only when it records logs.

### Run the tests and upload the results

```bash
npx detox test --configuration android.emu.release --retries 1
npx currents upload --project-id=<project id> --key=<record key>
```

Run `currents upload` after `detox test` exits. Detox finishes writing the videos and logs only when the test run ends. See [currents-upload.md](../../../resources/reporters/currents-cmd/currents-upload.md "mention") for the options of the command.

### Retries

`detox test --retries <n>` starts Jest again for the spec files that failed. The reporter adds the attempts of every rerun to the results of the same test, so a test that fails on the first run and passes on the rerun shows both attempts and is marked flaky in Currents.

Jest retries ([`jest.retryTimes()`](https://jestjs.io/docs/jest-object#jestretrytimesnumretries-options)) also work: they run in the same Jest process.

### Report directory

All the Jest processes of one `detox test` write their results to `.currents/<session>`, named after the Detox artifacts directory of the session. `currents upload` reads the most recent directory in `.currents`.

To use another directory, set `reportDir` in the reporter options or the `CURRENTS_REPORT_DIR` environment variable, and pass the same directory to `currents upload --report-dir`. The results of an earlier `detox test` stay in that directory, so remove it before each run.

{% hint style="info" %}
We recommend adding `.currents` to `.gitignore`
{% endhint %}

### Earlier versions

With `@currents/jest` before `1.4.0-beta.0`:

* `currents upload` runs Jest to list the tests, which runs the Detox `globalSetup`. Set `selectedConfiguration` in the [Detox config file](https://wix.github.io/Detox/docs/config/overview/#config-structure) to the configuration you run the tests with, or upload fails with `Cannot determine which configuration to use from Detox config`.
* Every rerun of `detox test --retries` writes to a new report directory, or replaces the results of the earlier run when the report directory is set. Currents shows only one attempt of a retried test.
* Detox artifacts are not uploaded.

With `@currents/cmd` `1.11.0-beta.1`, runs of `pull_request` workflows in GitHub Actions show the merge commit that GitHub creates (`Merge <sha> into <sha>`) instead of the last commit of the pull request.
