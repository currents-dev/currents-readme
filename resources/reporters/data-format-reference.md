---
description: Currents Reporting API - Data Format Reference
---

# Data Format Reference

Currents can accept results from arbitrary testing frameworks. This document provides detailed instructions for creating test results data compatible with Currents.&#x20;

* To upload the results use [currents-upload.md](currents-cmd/currents-upload.md "mention") command.&#x20;
* Refer to [currents-convert.md](currents-cmd/currents-convert.md "mention") to see how we convert the  results from various popular testing framework to "Currents Format" that conforms to the specification presented below.

## Results Directory

To upload the results to Currents create a "Results Directory" with all the necessary files. The directory will be used as  the `--output-dir` parameter for [currents-upload.md](currents-cmd/currents-upload.md "mention") command, for example:

`npx currents convert  --output-dir path-to-results-directory`

Within the Results Directory the following structure of files and directories is expected.

```
results-dir/
├── instances/
│   ├── <instance-id-1>.json
│   ├── <instance-id-2>.json
│   └── <instance-id-n>.json
│── config.json
└── fullTestSuite.json
```

The output consists of two main components:&#x20;

* `fullTestSuite.json` is the [#full-test-suite](data-format-reference.md#full-test-suite "mention") JSON document that contains the tests expected to be reported. It does not contains test results.
* `config.json`  is a [#configuration-file](data-format-reference.md#configuration-file "mention") that contains the metadata like test framework name, version and more
* `instances` folder contains [#instance-files](data-format-reference.md#instance-files "mention") - JSON document that represents  a spec file or a logical collection and the associated test results.

## Full Test Suite

The Full Test Suite is a JSON-formatted file that contains the list of all the tests expected to be reported to the Currents platform for the current build / run.

Each element in the array of `fullTestSuite.json` file represents a group of tests, organized by the `name` property which defines the group name.&#x20;

<figure><img src="../../.gitbook/assets/image.png" alt=""><figcaption><p>Note that the property "name" is showed as the "group name" in the dashboard.</p></figcaption></figure>

{% hint style="info" %}
Currents requires that all test results from the Full Test Suite be submitted before the project's specified timeout. If results are not received by the deadline, the run is marked as timed out. See [run-timeouts.md](../../dashboard/runs/run-timeouts.md "mention").
{% endhint %}

`Full Test Suite file`

The root of the `fullTestSuite.json` file is a list of elements of the type `Group`.

{% hint style="info" %}
The `SuiteTest`'s  can be part of any `Group` and may even be included in multiple `Group`s.
{% endhint %}

<details>

<summary>Full Test Suite file root object: <code>Array&#x3C;Group></code></summary>

```json
[
   {
	"name": "Dashboard Tests",
	"tags": ["e2e", "dashboard"],
	"tests": [
		{
			"title": ["dashboard", "login"],
			"spec": "__tests__/dashboard/login.spec.tsx",
			"tags": ["completed"],
			"testId": "a50d141accce5aaa"
		}
		...
	],
   },
   {
	"name": "Landing Tests",
	"tags": ["e2e", "landing"],
	"tests": [
		{
			"title": ["landing"],
			"spec": "__tests__/landing/landing.spec.tsx",
			"tags": ["incomplete"],
			"testId": "7yyhd141aicke532sa"
		}
		...
	],
   }
   ...
]
```

</details>

{% hint style="info" %}
Starting on version 1.6.8 of [`@currents/cmd`](https://www.npmjs.com/package/@currents/cmd) package, multiple files are allowed as input, each one representing a [`Group`](data-format-reference.md#group). See [currents-convert.md](currents-cmd/currents-convert.md "mention") input file flag.
{% endhint %}

#### `Group`

<table><thead><tr><th width="152">Property</th><th width="203">Type</th><th width="103">Required</th><th>Description</th></tr></thead><tbody><tr><td><code>name</code></td><td><code>string</code></td><td>Yes</td><td>Represents the group ID that will be visualized in the dashboard. All the tests will be organized by the group ID.</td></tr><tr><td><code>tags</code></td><td><code>Array&#x3C;string></code></td><td>Yes</td><td>Run-level tags for this run / build. See <a data-mention href="../../guides/playwright-tags.md">playwright-tags.md</a>.</td></tr><tr><td><code>tests</code></td><td><code>Array&#x3C;</code> <a href="data-format-reference.md#suitetest"><code>SuiteTest</code></a><code>></code></td><td>Yes</td><td><p>List of included tests, including test title, spec file, test tags and testId.</p><p></p><p><code>testId</code> of full test suite file and instance files must to match.</p></td></tr></tbody></table>

#### `SuiteTest`

| Property | Type            | Required | Description                                                                                                                                                                                |
| -------- | --------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `title`  | `Array<string>` | Yes      | Test description plus title.                                                                                                                                                               |
| `spec`   | `string`        | Yes      | The spec file where this test is defined.                                                                                                                                                  |
| `tags`   | `Array<string>` | No       | A list of tags or  associated with the test for categorization or filtering.                                                                                                               |
| `testId` | `string`        | Yes      | A unique identifier for the test case. It is created with a hash of the spec file property and the title. [See how to generate this property](data-format-reference.md#generating-testid). |

### Configuration File

The `config.json` file contains the metadata used by Currents to properly display results in the dashboard. Example:

```json
{
  "framework": "postman",
  "frameworkVersion": "1.12.12",
  "frameworkConfig": {
    "format": "junit"
  }
}
```

***

**Property**: `framework`

**Description**: Name of the framework used to execute the tests. The currently accepted values are `postman` and `vitest`. Support for other frameworks will be added in the future.

**Type**: `postman | vitest`

***

**Property**: `frameworkVersion`

**Description**: Testing framework version used to execute the tests.

**Type**: String

***

**Property**: `frameworkConfig`

**Description**: Contains information about the configuration of the framework. Currently the property `format` with value `junit` is allowed.

**Type**:&#x20;

```
{
    "format": "junit"
}
```

***

### Instance Files

Instance File is a JSON document that represents spec file and included tests execution results.

{% hint style="info" %}
Some testing frameworks are not bound to filesystem (e.g. Postman), so Instance File can be a logical collection of tests.&#x20;
{% endhint %}

<details>

<summary>Instance JSON file example</summary>

```json
{
  "groupId": "e2e",
  "spec": "src/same-title.test.ts",
  "startTime": "2024-11-21T03:47:14.963Z",
  "results": {
    "stats": {
      "suites": 1,
      "tests": 3,
      "passes": 2,
      "pending": 0,
      "skipped": 1,
      "failures": 0,
      "flaky": 1,
      "wallClockStartedAt": "2024-11-21T03:47:14.963Z",
      "wallClockEndedAt": "2024-11-21T03:47:16.134Z",
      "wallClockDuration": 1171
    },
    "tests": [
      {
        "_t": 1732160836119,
        "testId": "fa8675d9f8d0a03f",
        "title": ["Test cases with same title", "Test case example"],
        "state": "failed",
        "isFlaky": true,
        "expectedStatus": "passed",
        "timeout": 0,
        "location": {
          "column": 1,
          "file": "src/same-title.test.ts",
          "line": 1
        },
        "retries": 4,
        "attempts": [
          {
            "_s": "failed",
            "attempt": 1,
            "startTime": "2024-11-21T03:47:16.119Z",
            "steps": [],
            "duration": 7,
            "status": "failed",
            "stdout": [],
            "stderr": [
              "Error: \u001b[2mexpect(\u001b[22m\u001b[31mreceived\u001b[39m\u001b[2m).\u001b[22mtoBe\u001b[2m(\u001b[22m\u001b[32mexpected\u001b[39m\u001b[2m) // Object.is equality\u001b[22m\n\nExpected: \u001b[32m2\u001b[39m\nReceived: \u001b[31m0\u001b[39m\n    at Object.toBe (/Users/miguelangarano/Documents/GitHub/currents-reporter/examples/src/same-title.test.ts:7:17)\n    at Promise.then.completed (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/utils.js:298:28)\n    at new Promise (<anonymous>)\n    at callAsyncCircusFn (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/utils.js:231:10)\n    at _callCircusTest (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/run.js:316:40)\n    at processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at _runTest (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/run.js:252:3)\n    at _runTestsForDescribeBlock (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/run.js:126:9)\n    at _runTestsForDescribeBlock (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/run.js:121:9)\n    at run (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/run.js:71:3)\n    at runAndTransformResultsToJestFormat (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:122:21)\n    at jestAdapter (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js:79:19)\n    at runTestInternal (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-runner/build/runTest.js:367:16)\n    at runTest (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-runner/build/runTest.js:444:34)\n    at Object.worker (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-runner/build/testWorker.js:106:12)"
            ],
            "errors": [
              {
                "message": "Error: Error: \u001b[2mexpect(\u001b[22m\u001b[31mreceived\u001b[39m\u001b[2m).\u001b[22mtoBe\u001b[2m(\u001b[22m\u001b[32mexpected\u001b[39m\u001b[2m) // Object.is equality\u001b[22m\n\nExpected: \u001b[32m2\u001b[39m\nReceived: \u001b[31m0\u001b[39m\n\n   5 |\n   6 |   test('Test case example', () => {\n>  7 |     expect(j++).toBe(2);\n     |                 ^\n   8 |   });\n   9 |\n  10 |   test.skip('Test case example', () => {\n\n    at Object.toBe (/Users/miguelangarano/Documents/GitHub/currents-reporter/examples/src/same-title.test.ts:7:17)\n    at Promise.then.completed (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/utils.js:298:28)\n    at new Promise (<anonymous>)\n    at callAsyncCircusFn (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/utils.js:231:10)\n    at _callCircusTest (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/run.js:316:40)\n    at processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at _runTest (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/run.js:252:3)\n    at _runTestsForDescribeBlock (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/run.js:126:9)\n    at _runTestsForDescribeBlock (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/run.js:121:9)\n    at run (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/run.js:71:3)\n    at runAndTransformResultsToJestFormat (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:122:21)\n    at jestAdapter (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js:79:19)\n    at runTestInternal (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-runner/build/runTest.js:367:16)\n    at runTest (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-runner/build/runTest.js:444:34)\n    at Object.worker (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-runner/build/testWorker.js:106:12)\n    at /Users/miguelangarano/Documents/GitHub/currents-reporter/packages/jest/src/reporter.ts:310:21\n    at Array.map (<anonymous>)\n    at /Users/miguelangarano/Documents/GitHub/currents-reporter/packages/jest/src/reporter.ts:306:61\n    at Array.map (<anonymous>)\n    at /Users/miguelangarano/Documents/GitHub/currents-reporter/packages/jest/src/reporter.ts:305:39\n    at processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async Promise.all (index 0)\n    at CustomReporter.onTestFileResult (/Users/miguelangarano/Documents/GitHub/currents-reporter/packages/jest/src/reporter.ts:283:19)\n    at ReporterDispatcher.onTestFileResult (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/@jest/core/build/ReporterDispatcher.js:30:9)\n    at onResult (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/@jest/core/build/TestScheduler.js:154:7)",
                "location": { "column": 17, "file": "../..", "line": 7 }
              }
            ],
            "error": {
              "message": "Error: Error: \u001b[2mexpect(\u001b[22m\u001b[31mreceived\u001b[39m\u001b[2m).\u001b[22mtoBe\u001b[2m(\u001b[22m\u001b[32mexpected\u001b[39m\u001b[2m) // Object.is equality\u001b[22m\n\nExpected: \u001b[32m2\u001b[39m\nReceived: \u001b[31m0\u001b[39m\n\n   5 |\n   6 |   test('Test case example', () => {\n>  7 |     expect(j++).toBe(2);\n     |                 ^\n   8 |   });\n   9 |\n  10 |   test.skip('Test case example', () => {\n\n    at Object.toBe (/Users/miguelangarano/Documents/GitHub/currents-reporter/examples/src/same-title.test.ts:7:17)\n    at Promise.then.completed (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/utils.js:298:28)\n    at new Promise (<anonymous>)\n    at callAsyncCircusFn (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/utils.js:231:10)\n    at _callCircusTest (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/run.js:316:40)\n    at processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at _runTest (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/run.js:252:3)\n    at _runTestsForDescribeBlock (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/run.js:126:9)\n    at _runTestsForDescribeBlock (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/run.js:121:9)\n    at run (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/run.js:71:3)\n    at runAndTransformResultsToJestFormat (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:122:21)\n    at jestAdapter (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js:79:19)\n    at runTestInternal (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-runner/build/runTest.js:367:16)\n    at runTest (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-runner/build/runTest.js:444:34)\n    at Object.worker (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-runner/build/testWorker.js:106:12)\n    at /Users/miguelangarano/Documents/GitHub/currents-reporter/packages/jest/src/reporter.ts:310:21\n    at Array.map (<anonymous>)\n    at /Users/miguelangarano/Documents/GitHub/currents-reporter/packages/jest/src/reporter.ts:306:61\n    at Array.map (<anonymous>)\n    at /Users/miguelangarano/Documents/GitHub/currents-reporter/packages/jest/src/reporter.ts:305:39\n    at processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async Promise.all (index 0)\n    at CustomReporter.onTestFileResult (/Users/miguelangarano/Documents/GitHub/currents-reporter/packages/jest/src/reporter.ts:283:19)\n    at ReporterDispatcher.onTestFileResult (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/@jest/core/build/ReporterDispatcher.js:30:9)\n    at onResult (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/@jest/core/build/TestScheduler.js:154:7)",
              "location": { "column": 17, "file": "../..", "line": 7 }
            }
          },
          {
            "_s": "passed",
            "attempt": 1,
            "startTime": "2024-11-21T03:47:16.131Z",
            "steps": [],
            "duration": 0,
            "status": "passed",
            "stdout": [],
            "stderr": [],
            "errors": []
          },
          {
            "_s": "failed",
            "attempt": 2,
            "startTime": "2024-11-21T03:47:16.132Z",
            "steps": [],
            "duration": 0,
            "status": "failed",
            "stdout": [],
            "stderr": [
              "Error: \u001b[2mexpect(\u001b[22m\u001b[31mreceived\u001b[39m\u001b[2m).\u001b[22mtoBe\u001b[2m(\u001b[22m\u001b[32mexpected\u001b[39m\u001b[2m) // Object.is equality\u001b[22m\n\nExpected: \u001b[32m2\u001b[39m\nReceived: \u001b[31m1\u001b[39m\n    at Object.toBe (/Users/miguelangarano/Documents/GitHub/currents-reporter/examples/src/same-title.test.ts:7:17)\n    at Promise.then.completed (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/utils.js:298:28)\n    at new Promise (<anonymous>)\n    at callAsyncCircusFn (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/utils.js:231:10)\n    at _callCircusTest (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/run.js:316:40)\n    at processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at _runTest (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/run.js:252:3)\n    at _runTestsForDescribeBlock (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/run.js:148:7)\n    at _runTestsForDescribeBlock (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/run.js:121:9)\n    at run (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/run.js:71:3)\n    at runAndTransformResultsToJestFormat (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:122:21)\n    at jestAdapter (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js:79:19)\n    at runTestInternal (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-runner/build/runTest.js:367:16)\n    at runTest (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-runner/build/runTest.js:444:34)\n    at Object.worker (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-runner/build/testWorker.js:106:12)"
            ],
            "errors": [
              {
                "message": "Error: Error: \u001b[2mexpect(\u001b[22m\u001b[31mreceived\u001b[39m\u001b[2m).\u001b[22mtoBe\u001b[2m(\u001b[22m\u001b[32mexpected\u001b[39m\u001b[2m) // Object.is equality\u001b[22m\n\nExpected: \u001b[32m2\u001b[39m\nReceived: \u001b[31m1\u001b[39m\n\n   5 |\n   6 |   test('Test case example', () => {\n>  7 |     expect(j++).toBe(2);\n     |                 ^\n   8 |   });\n   9 |\n  10 |   test.skip('Test case example', () => {\n\n    at Object.toBe (/Users/miguelangarano/Documents/GitHub/currents-reporter/examples/src/same-title.test.ts:7:17)\n    at Promise.then.completed (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/utils.js:298:28)\n    at new Promise (<anonymous>)\n    at callAsyncCircusFn (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/utils.js:231:10)\n    at _callCircusTest (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/run.js:316:40)\n    at processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at _runTest (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/run.js:252:3)\n    at _runTestsForDescribeBlock (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/run.js:148:7)\n    at _runTestsForDescribeBlock (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/run.js:121:9)\n    at run (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/run.js:71:3)\n    at runAndTransformResultsToJestFormat (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:122:21)\n    at jestAdapter (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js:79:19)\n    at runTestInternal (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-runner/build/runTest.js:367:16)\n    at runTest (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-runner/build/runTest.js:444:34)\n    at Object.worker (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-runner/build/testWorker.js:106:12)\n    at /Users/miguelangarano/Documents/GitHub/currents-reporter/packages/jest/src/reporter.ts:310:21\n    at Array.map (<anonymous>)\n    at /Users/miguelangarano/Documents/GitHub/currents-reporter/packages/jest/src/reporter.ts:306:61\n    at Array.map (<anonymous>)\n    at /Users/miguelangarano/Documents/GitHub/currents-reporter/packages/jest/src/reporter.ts:305:39\n    at processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async Promise.all (index 0)\n    at CustomReporter.onTestFileResult (/Users/miguelangarano/Documents/GitHub/currents-reporter/packages/jest/src/reporter.ts:283:19)\n    at ReporterDispatcher.onTestFileResult (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/@jest/core/build/ReporterDispatcher.js:30:9)\n    at onResult (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/@jest/core/build/TestScheduler.js:154:7)",
                "location": { "column": 17, "file": "../..", "line": 7 }
              }
            ],
            "error": {
              "message": "Error: Error: \u001b[2mexpect(\u001b[22m\u001b[31mreceived\u001b[39m\u001b[2m).\u001b[22mtoBe\u001b[2m(\u001b[22m\u001b[32mexpected\u001b[39m\u001b[2m) // Object.is equality\u001b[22m\n\nExpected: \u001b[32m2\u001b[39m\nReceived: \u001b[31m1\u001b[39m\n\n   5 |\n   6 |   test('Test case example', () => {\n>  7 |     expect(j++).toBe(2);\n     |                 ^\n   8 |   });\n   9 |\n  10 |   test.skip('Test case example', () => {\n\n    at Object.toBe (/Users/miguelangarano/Documents/GitHub/currents-reporter/examples/src/same-title.test.ts:7:17)\n    at Promise.then.completed (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/utils.js:298:28)\n    at new Promise (<anonymous>)\n    at callAsyncCircusFn (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/utils.js:231:10)\n    at _callCircusTest (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/run.js:316:40)\n    at processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at _runTest (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/run.js:252:3)\n    at _runTestsForDescribeBlock (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/run.js:148:7)\n    at _runTestsForDescribeBlock (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/run.js:121:9)\n    at run (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/run.js:71:3)\n    at runAndTransformResultsToJestFormat (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapterInit.js:122:21)\n    at jestAdapter (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-circus/build/legacy-code-todo-rewrite/jestAdapter.js:79:19)\n    at runTestInternal (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-runner/build/runTest.js:367:16)\n    at runTest (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-runner/build/runTest.js:444:34)\n    at Object.worker (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/jest-runner/build/testWorker.js:106:12)\n    at /Users/miguelangarano/Documents/GitHub/currents-reporter/packages/jest/src/reporter.ts:310:21\n    at Array.map (<anonymous>)\n    at /Users/miguelangarano/Documents/GitHub/currents-reporter/packages/jest/src/reporter.ts:306:61\n    at Array.map (<anonymous>)\n    at /Users/miguelangarano/Documents/GitHub/currents-reporter/packages/jest/src/reporter.ts:305:39\n    at processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at async Promise.all (index 0)\n    at CustomReporter.onTestFileResult (/Users/miguelangarano/Documents/GitHub/currents-reporter/packages/jest/src/reporter.ts:283:19)\n    at ReporterDispatcher.onTestFileResult (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/@jest/core/build/ReporterDispatcher.js:30:9)\n    at onResult (/Users/miguelangarano/Documents/GitHub/currents-reporter/node_modules/@jest/core/build/TestScheduler.js:154:7)",
              "location": { "column": 17, "file": "../..", "line": 7 }
            }
          },
          {
            "_s": "passed",
            "attempt": 3,
            "startTime": "2024-11-21T03:47:16.133Z",
            "steps": [],
            "duration": 0,
            "status": "passed",
            "stdout": [],
            "stderr": [],
            "errors": []
          }
        ]
      }
    ]
  }
}
```

</details>

The properties that can be found in an instance file are the following:

**Root Object**

<table data-header-hidden><thead><tr><th width="155"></th><th width="169"></th><th width="100"></th><th></th></tr></thead><tbody><tr><td><strong>Property</strong></td><td><strong>Type</strong></td><td><strong>Required</strong></td><td><strong>Description</strong></td></tr><tr><td><code>groupId</code></td><td><code>string</code></td><td>Yes</td><td>Identifier for the test group It provides a reference of what are the tests executed about.</td></tr><tr><td><code>spec</code></td><td><code>string</code></td><td>Yes</td><td><p>The name of the spec file  or logical collection that contains the executed tests. </p><p></p><p>The <code>spec</code> property must be unique across all instance files.</p><p></p><p>Example: <code>__tests__/utils.spec.ts</code></p></td></tr><tr><td><code>startTime</code></td><td><p><code>string</code> </p><p>(ISO Datetime)</p></td><td>Yes</td><td>The timestamp indicating when the execution of the spec file started in ISO 8601 format.</td></tr><tr><td><code>results</code></td><td><code>Array&#x3C;</code><a href="data-format-reference.md#testresult"><code>TestResult</code></a><code>></code></td><td>Yes</td><td>Contains an array of test results.</td></tr></tbody></table>

#### `TestResult`&#x20;

<table data-header-hidden><thead><tr><th width="125"></th><th width="169"></th><th width="100"></th><th></th></tr></thead><tbody><tr><td><strong>Property</strong></td><td><strong>Type</strong></td><td><strong>Required</strong></td><td><strong>Description</strong></td></tr><tr><td><code>stats</code></td><td><a href="data-format-reference.md#statsobject"><code>StatsObject</code></a></td><td>Yes</td><td>Summary statistics for the test run.</td></tr><tr><td><code>tests</code></td><td><code>Array&#x3C;</code><a href="data-format-reference.md#test"><code>Test</code></a><code>></code></td><td>Yes</td><td>Array of objects, each representing an individual test result.</td></tr></tbody></table>

#### `StatsObject`

<table data-header-hidden><thead><tr><th width="141"></th><th width="138"></th><th width="100"></th><th></th></tr></thead><tbody><tr><td><strong>Property</strong></td><td><strong>Type</strong></td><td><strong>Required</strong></td><td><strong>Description</strong></td></tr><tr><td><code>suites</code></td><td><code>number</code></td><td>Yes</td><td>Number of logical grouping or collection of tests results.</td></tr><tr><td><code>tests</code></td><td><code>number</code></td><td>Yes</td><td>The total number of tests executed in the current instance. </td></tr><tr><td><code>passes</code></td><td><code>number</code></td><td>Yes</td><td>The number of tests that passed in the current instance.</td></tr><tr><td><code>pending</code></td><td><code>number</code></td><td>Yes</td><td>The number of tests that are pending to be executed and can be reported later.</td></tr><tr><td><code>skipped</code></td><td><code>number</code></td><td>Yes</td><td>The number of tests that were not executed on purpose in the current instance.</td></tr><tr><td><code>failures</code></td><td><code>number</code></td><td>Yes</td><td>The number of tests that failed in the current instance.</td></tr><tr><td><code>flaky</code></td><td><code>number</code></td><td>Yes</td><td>The number of tests marked as flaky by the testing framework in the current instance.</td></tr><tr><td><code>wallClockStartedAt</code></td><td><code>string</code> (ISO Datetime)</td><td>Yes</td><td>Time when the first test started its first attempt in ISO 8601 format.</td></tr><tr><td><code>wallClockEndedAt</code></td><td><code>string</code> (ISO Datetime)</td><td>Yes</td><td>Time when the last test finished its last attempt in ISO 8601 format.</td></tr><tr><td><code>wallClockDuration</code></td><td><code>number</code></td><td>Yes</td><td>Total duration of the spec file tests execution in milliseconds.</td></tr></tbody></table>

#### `Test`

Each object in the `tests` array represents the execution result of a test, possibly with multiple attempts.

<table data-header-hidden><thead><tr><th width="136"></th><th></th><th width="100"></th><th></th></tr></thead><tbody><tr><td><strong>Property</strong></td><td><strong>Type</strong></td><td><strong>Required</strong></td><td><strong>Description</strong></td></tr><tr><td><code>_t</code></td><td><code>number</code> </td><td>Yes</td><td>The timestamp indicating when the execution of the spec file started, in milliseconds.</td></tr><tr><td><code>testId</code></td><td><code>string</code></td><td>Yes</td><td>Unique identifier for the test. <a href="data-format-reference.md#generate-a-testid">See how to generate this property</a>.</td></tr><tr><td><code>title</code></td><td><code>Array&#x3C;string></code></td><td>Yes</td><td>Array containing the specification and title of the test. Example: <code>["75119228-2d2d-4e59-b426-60a002b8cdce / Get Run", "Response status code is 200"]</code>.</td></tr><tr><td><code>state</code></td><td><code>failed | passed | skipped</code></td><td>Yes</td><td>Final state of the test.</td></tr><tr><td><code>isFlaky</code></td><td><code>boolean</code></td><td>Yes</td><td>Indicates whether the test is flaky.</td></tr><tr><td><code>expectedStatus</code></td><td><code>failed | passed | skipped</code></td><td>Yes</td><td>The expected status of the test. </td></tr><tr><td><code>timeout</code></td><td><code>number</code></td><td>Yes</td><td>Time in milliseconds that the test execution lasted without having a clear state result.</td></tr><tr><td><code>location</code></td><td><a href="data-format-reference.md#location"><code>Location</code></a></td><td>Yes</td><td>Object containing file location details for the test.</td></tr><tr><td><code>retries</code></td><td><code>number</code></td><td>Yes</td><td>Number of retries attempted for the test.</td></tr><tr><td><code>attempts</code></td><td><code>Array&#x3C;</code><a href="data-format-reference.md#attempt"><code>Attempt</code></a><code>></code></td><td>Yes</td><td>Array of objects representing each attempt made for the test. </td></tr></tbody></table>

#### `Location`

<table data-header-hidden><thead><tr><th width="133"></th><th width="100"></th><th width="117"></th><th></th></tr></thead><tbody><tr><td><strong>Property</strong></td><td><strong>Type</strong></td><td><strong>Required</strong></td><td><strong>Description</strong></td></tr><tr><td><code>column</code></td><td><code>number</code></td><td>Yes</td><td>Column number of the test in the source file.</td></tr><tr><td><code>file</code></td><td><code>string</code></td><td>Yes</td><td>The file path where the test is defined.</td></tr><tr><td><code>line</code></td><td><code>number</code></td><td>Yes</td><td>Line number of the test in the source file. </td></tr></tbody></table>

#### `Attempt`

Object describes an individual attempt of a test.

<table data-header-hidden><thead><tr><th width="185"></th><th width="190"></th><th width="100"></th><th></th></tr></thead><tbody><tr><td><strong>Property</strong></td><td><strong>Type</strong></td><td><strong>Required</strong></td><td><strong>Description</strong></td></tr><tr><td><code>_s</code></td><td><code>passed | failed | pending</code></td><td>Yes</td><td>Status of the test attempt.</td></tr><tr><td><code>attempt</code></td><td><code>number</code></td><td>Yes</td><td>Index of the attempt. Defines the order of the attempts execution.</td></tr><tr><td><code>startTime</code></td><td><code>string</code> (ISO Datetime)</td><td>Yes</td><td>Timestamp when the attempt started in ISO 8601 format.</td></tr><tr><td><code>steps</code></td><td><code>Array&#x3C;</code><a href="data-format-reference.md#step"><code>Step</code></a><code>></code></td><td>Yes</td><td>Array of steps executed during the attempt.</td></tr><tr><td><code>duration</code></td><td><code>number</code></td><td>Yes</td><td>Duration of the attempt in milliseconds.</td></tr><tr><td><code>status</code></td><td><code>passed | failed | pending</code></td><td>Yes</td><td>Final status of the attempt.</td></tr><tr><td><code>stdout</code></td><td><code>Array&#x3C;string></code></td><td>Yes</td><td>Standard output logs for the attempt.</td></tr><tr><td><code>stderr</code></td><td><code>Array&#x3C;string></code></td><td>Yes</td><td>Standard error logs for the attempt.</td></tr><tr><td><code>errors</code></td><td><code>Array&#x3C;</code><a href="data-format-reference.md#error"><code>Error</code></a><code>></code></td><td>Yes</td><td>Array of error objects encountered during the attempt.</td></tr></tbody></table>

#### `Step`

<table data-header-hidden><thead><tr><th width="163"></th><th width="144"></th><th width="100"></th><th></th></tr></thead><tbody><tr><td><strong>Property</strong></td><td><strong>Type</strong></td><td><strong>Required</strong></td><td><strong>Description</strong></td></tr><tr><td><code>title</code></td><td><code>string</code></td><td>Yes</td><td>The title or description of the step. Example: <code>"Validate API response schema"</code>.</td></tr><tr><td><code>category</code></td><td><code>string</code></td><td>No</td><td>The category of the step, indicating its classification. Example: <code>"API Test"</code>.</td></tr><tr><td><code>duration</code></td><td><code>number</code></td><td>Yes</td><td>The duration of the step in milliseconds. Example: <code>200</code>.</td></tr><tr><td><code>error</code></td><td><code>Error</code></td><td>No</td><td>An optional error object describing any issue encountered during the step execution.</td></tr><tr><td><code>startTime</code></td><td><code>string</code> (ISO Datetime)</td><td>Yes</td><td>Step start date time, in ISO 8601 format.</td></tr></tbody></table>

#### `Error`

<table data-header-hidden><thead><tr><th width="142"></th><th width="100"></th><th width="100"></th><th></th></tr></thead><tbody><tr><td><strong>Property</strong></td><td><strong>Type</strong></td><td><strong>Required</strong></td><td><strong>Description</strong></td></tr><tr><td><code>message</code></td><td><code>string</code></td><td>Yes</td><td>A description of the error encountered during the test attempt. Example: <code>"expected 631 to be below 200"</code>.</td></tr><tr><td><code>stack</code></td><td><code>string</code></td><td>No</td><td>The stack trace related to the error. Example: <code>"AssertionError: expected 631 to be below 200\n at Object.eval sandbox-script.js:2:1)."</code>.</td></tr><tr><td><code>value</code></td><td><code>string</code></td><td>No</td><td>The type or categorization of the error. Example: <code>"AssertionFailure"</code>.</td></tr></tbody></table>

### Generating testId&#x20;

The testId is a hash composed by the title of the test and the spec file name. Use this function to generate it.

```typescript
export function generateTestId(testTitle: string, specFileName: string): string {
  const combinedString = `${testTitle}${specFileName}`;
  const fullHash = crypto
    .createHash('sha256')
    .update(combinedString)
    .digest('hex');
  return fullHash.substring(0, 16);
}
```

