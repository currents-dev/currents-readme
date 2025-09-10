---
description: API Reference - Test Results
---

# Test Results

This resource allows you to query test results based on their signature.

{% hint style="info" %}
Learn how to generate [test-signature.md](test-signature.md "mention") before using this resource
{% endhint %}

## Get Test Results

<mark style="color:blue;">`GET`</mark> `v1/test-results/:signature`

#### Path Parameters

<table><thead><tr><th width="129.78125">Name</th><th width="130.49609375">Type</th><th>Description</th></tr></thead><tbody><tr><td>signature<mark style="color:red;">*</mark></td><td>string</td><td>Unique test signature. See <a data-mention href="test-signature.md">test-signature.md</a></td></tr></tbody></table>

#### Query Parameters

<table><thead><tr><th width="130.150146484375">Name</th><th width="129.7620849609375">Type</th><th>Description</th></tr></thead><tbody><tr><td>date_start<mark style="color:red;">*</mark></td><td><sub>string (ISO 8601)</sub></td><td>Start date for filtering test results within the specified date range</td></tr><tr><td>date_end<mark style="color:red;">*</mark></td><td><sub>string (ISO 8601)</sub></td><td>End date for filtering test results within the specified date range</td></tr><tr><td>starting_after</td><td>string</td><td>Pagination cursor for fetching results after this cursor. See <a data-mention href="../pagination.md">pagination.md</a></td></tr><tr><td>ending_before</td><td>string</td><td>Pagination cursor for fetching results before this cursor. See <a data-mention href="../pagination.md">pagination.md</a></td></tr><tr><td>limit</td><td>number</td><td>Maximum number of results to return (1-100). Default: 10</td></tr><tr><td>branch[]</td><td>string</td><td>Filter by Git branch names. Multiple values: <code>branch[]=valueA&#x26;branch[]=valueB</code></td></tr><tr><td>tag[]</td><td>string</td><td>Filter by tag names. Multiple values: <code>tag[]=valueA&#x26;tag[]=valueB</code></td></tr><tr><td>git_author[]</td><td>string</td><td>Filter by Git author names. Multiple values: <code>git_author[]=valueA&#x26;git_author[]=valueB</code></td></tr><tr><td>group[]</td><td>string</td><td>Filter by group names. Multiple values: <code>group[]=valueA&#x26;group[]=valueB</code></td></tr><tr><td>status[]</td><td>enum</td><td>Test status filter. Values: <code>"failed"</code>, <code>"passed"</code>, <code>"pending"</code>, <code>"skipped"</code>. Multiple values: <code>status[]=failed&#x26;status[]=passed</code></td></tr></tbody></table>

### **Response**

{% tabs %}
{% tab title="200: OK Successful Response" %}
```json
{
  "status": "OK",
  "has_more": false,
  "data": [
    {
      "cursor": "67b8dac9413406575084b5b0",
      "signature": "a298aed2635166ffd75a5a88d29aaba4",
      "framework": {
        "clientVersion": "1.9.0",
        "type": "pw",
        "version": "1.49.0"
      },
      "createdAt": "2025-02-21T19:57:41.437Z",
      "projectId": "C3lBM6",
      "groupId": "Project A",
      "runId": "1aadb82f23eec93c",
      "instanceId": "Kw9tznsG3FUqMkGX",
      "spec": "1-failing.spec.ts",
      "machineId": "Iod3wzFiqQUF",
      "tags": ["basic"],
      "title": ["basic test @basic"],
      "testId": "57ab34a754efae6a0981-782e8b09a9c1dd694d18",
      "displayError": "Error: [31mTimed out 5000ms waiting for [39m[2mexpect([22m[31mlocator[39m[2m).[22mtoHaveText[2m([22m[32mexpected[39m[2m)[22m\n\nLocator: locator('.todo-list')\nExpected string: [32m\"Learn [7mPlaywrigh[27mt\"[39m\nReceived string: [31m\"Learn [7mJavaScrip[27mt\"[39m\nCall log:\n[2m  - expect.toHaveText with timeout 5000ms[22m\n[2m  - waiting for locator('.todo-list')[22m\n[2m    9 × locator resolved to <ul class=\"todo-list\">…</ul>[22m\n[2m      - unexpected value \"Learn JavaScript\"[22m",
      "commit": {
        "branch": "test-staging-pr",
        "authorEmail": "author@email.com",
        "authorName": "John Smith",
        "sha": "768c70d1946661182e5029c35169405e9c0c0473",
        "message": "Testing staging PR"
      },
      "duration": 18658,
      "flaky": false,
      "expectedStatus": "passed",
      "status": "failed",
      "attempts": [
        {
          "attemptId": "xUFASNJTFZ0B79Pt-0",
          "state": "failed",
          "error": {
            "message": "Error: [31mTimed out 5000ms waiting for [39m[2mexpect([22m[31mlocator[39m[2m).[22mtoHaveText[2m([22m[32mexpected[39m[2m)[22m\n\nLocator: locator('.todo-list')\nExpected string: [32m\"Learn [7mPlaywrigh[27mt\"[39m\nReceived string: [31m\"Learn [7mJavaScrip[27mt\"[39m\nCall log:\n[2m  - expect.toHaveText with timeout 5000ms[22m\n[2m  - waiting for locator('.todo-list')[22m\n[2m    9 × locator resolved to <ul class=\"todo-list\">…</ul>[22m\n[2m      - unexpected value \"Learn JavaScript\"[22m",
            "stack": "Error: [31mTimed out 5000ms waiting for [39m[2mexpect([22m[31mlocator[39m[2m).[22mtoHaveText[2m([22m[32mexpected[39m[2m)[22m\n\nLocator: locator('.todo-list')\nExpected string: [32m\"Learn [7mPlaywrigh[27mt\"[39m\nReceived string: [31m\"Learn [7mJavaScrip[27mt\"[39m\nCall log:\n[2m  - expect.toHaveText with timeout 5000ms[22m\n[2m  - waiting for locator('.todo-list')[22m\n[2m    9 × locator resolved to <ul class=\"todo-list\">…</ul>[22m\n[2m      - unexpected value \"Learn JavaScript\"[22m\n\n    at /Users/agoldis/playwright-gh-actions-demo/basic/1-failing.spec.ts:13:26",
            "location": {
              "line": 13,
              "column": 26,
              "file": "/Users/agoldis/playwright-gh-actions-demo/basic/1-failing.spec.ts"
            }
          },
          "startedAt": "2025-02-21T19:57:41.437Z",
          "duration": 6482
        },
        {
          "attemptId": "xUFASNJTFZ0B79Pt-1",
          "state": "failed",
          "error": {
            "message": "Error: [31mTimed out 5000ms waiting for [39m[2mexpect([22m[31mlocator[39m[2m).[22mtoHaveText[2m([22m[32mexpected[39m[2m)[22m\n\nLocator: locator('.todo-list')\nExpected string: [32m\"Learn [7mPlaywrigh[27mt\"[39m\nReceived string: [31m\"Learn [7mJavaScrip[27mt\"[39m\nCall log:\n[2m  - expect.toHaveText with timeout 5000ms[22m\n[2m  - waiting for locator('.todo-list')[22m\n[2m    9 × locator resolved to <ul class=\"todo-list\">…</ul>[22m\n[2m      - unexpected value \"Learn JavaScript\"[22m",
            "stack": "Error: [31mTimed out 5000ms waiting for [39m[2mexpect([22m[31mlocator[39m[2m).[22mtoHaveText[2m([22m[32mexpected[39m[2m)[22m\n\nLocator: locator('.todo-list')\nExpected string: [32m\"Learn [7mPlaywrigh[27mt\"[39m\nReceived string: [31m\"Learn [7mJavaScrip[27mt\"[39m\nCall log:\n[2m  - expect.toHaveText with timeout 5000ms[22m\n[2m  - waiting for locator('.todo-list')[22m\n[2m    9 × locator resolved to <ul class=\"todo-list\">…</ul>[22m\n[2m      - unexpected value \"Learn JavaScript\"[22m\n\n    at /Users/agoldis/playwright-gh-actions-demo/basic/1-failing.spec.ts:13:26",
            "location": {
              "line": 13,
              "column": 26,
              "file": "/Users/agoldis/playwright-gh-actions-demo/basic/1-failing.spec.ts"
            }
          },
          "startedAt": "2025-02-21T19:57:48.278Z",
          "duration": 5760
        },
        {
          "attemptId": "xUFASNJTFZ0B79Pt-2",
          "state": "failed",
          "error": {
            "message": "Error: [31mTimed out 5000ms waiting for [39m[2mexpect([22m[31mlocator[39m[2m).[22mtoHaveText[2m([22m[32mexpected[39m[2m)[22m\n\nLocator: locator('.todo-list')\nExpected string: [32m\"Learn [7mPlaywrigh[27mt\"[39m\nReceived string: [31m\"Learn [7mJavaScrip[27mt\"[39m\nCall log:\n[2m  - expect.toHaveText with timeout 5000ms[22m\n[2m  - waiting for locator('.todo-list')[22m\n[2m    9 × locator resolved to <ul class=\"todo-list\">…</ul>[22m\n[2m      - unexpected value \"Learn JavaScript\"[22m",
            "stack": "Error: [31mTimed out 5000ms waiting for [39m[2mexpect([22m[31mlocator[39m[2m).[22mtoHaveText[2m([22m[32mexpected[39m[2m)[22m\n\nLocator: locator('.todo-list')\nExpected string: [32m\"Learn [7mPlaywrigh[27mt\"[39m\nReceived string: [31m\"Learn [7mJavaScrip[27mt\"[39m\nCall log:\n[2m  - expect.toHaveText with timeout 5000ms[22m\n[2m  - waiting for locator('.todo-list')[22m\n[2m    9 × locator resolved to <ul class=\"todo-list\">…</ul>[22m\n[2m      - unexpected value \"Learn JavaScript\"[22m\n\n    at /Users/agoldis/playwright-gh-actions-demo/basic/1-failing.spec.ts:13:26",
            "location": {
              "line": 13,
              "column": 26,
              "file": "/Users/agoldis/playwright-gh-actions-demo/basic/1-failing.spec.ts"
            }
          },
          "startedAt": "2025-02-21T19:57:54.406Z",
          "duration": 5689
        }
      ]
    }
  ]
}
```
{% endtab %}

{% tab title="400: Bad Request Invalid parameters" %}
```javascript
{
    "status": "FAILED",
    "error": "date_start and date_end are required parameters"
}
```
{% endtab %}

{% tab title="401: Unauthorized Invalid API key" %}
```javascript
{
    "status": "FAILED",
    "error": "Invalid API key provided"
}
```
{% endtab %}

{% tab title="403: Forbidden Insufficient permissions" %}
```javascript
{
    "status": "FAILED",
    "error": "Insufficient permissions to access test results"
}
```
{% endtab %}

{% tab title="404: Not Found Test signature not found" %}
```javascript
{
    "status": "FAILED",
    "error": "Test signature not found"
}
```
{% endtab %}
{% endtabs %}

#### **Test**

<table><thead><tr><th width="129.76953125">Name</th><th width="129.78125">Type</th><th>Description</th></tr></thead><tbody><tr><td>cursor</td><td>string</td><td>Pagination cursor for this result. See <a data-mention href="../pagination.md">pagination.md</a></td></tr><tr><td>projectId</td><td>string</td><td>Project ID for this test. See <a data-mention href="../../../dashboard/projects/">projects</a></td></tr><tr><td>groupId</td><td>string</td><td>Group ID that this test belongs to</td></tr><tr><td>runId</td><td>string</td><td>Run ID that this test belongs to. See <a data-mention href="../../../dashboard/runs/">runs</a></td></tr><tr><td>instanceId</td><td>string</td><td>Instance ID that this test belongs to. See <a data-mention href="instances.md">instances.md</a></td></tr><tr><td>spec</td><td>string</td><td>Spec file name that contains this test. See <a data-mention href="spec-files.md">spec-files.md</a></td></tr><tr><td>machineId</td><td>string</td><td>Machine ID that executed this test</td></tr><tr><td>signature</td><td>string</td><td>Test signature. See <a data-mention href="test-signature.md">test-signature.md</a></td></tr><tr><td>title</td><td>string[]</td><td>Test title. See <a href="https://docs.currents.dev/resources/api/api-resources/test-signature#test-title">test title</a></td></tr><tr><td>testId</td><td>string</td><td>Test ID as reported by the testing framework</td></tr><tr><td>expectedStatus</td><td>enum</td><td>Expected status of the test. Values: <code>"failed"</code>, <code>"passed"</code>, <code>"pending"</code>, <code>"skipped"</code>. Only available for Playwright.</td></tr><tr><td>status</td><td>enum</td><td>Final status of the test after the execution. Values: <code>"failed"</code>, <code>"passed"</code>, <code>"pending"</code>, <code>"skipped"</code></td></tr><tr><td>framework</td><td>Framework</td><td>Information about the framework and reporter used for the test execution <a data-mention href="test-results.md#framework">#framework</a></td></tr><tr><td>displayError</td><td>string</td><td>Most recent error message from test execution</td></tr><tr><td>commit</td><td>Commit</td><td>Git commit information <a data-mention href="test-results.md#commit">#commit</a></td></tr><tr><td>createdAt</td><td><sub>string (ISO 8601)</sub></td><td>Timestamp when the test was executed</td></tr><tr><td>duration</td><td>number</td><td>Total duration of the test execution in milliseconds</td></tr><tr><td>flaky</td><td>boolean</td><td>Indicates whether the test is marked as flaky. See <a data-mention href="../../../dashboard/tests/flaky-tests.md">flaky-tests.md</a></td></tr><tr><td>attempts</td><td>Attempt[]</td><td>List of test execution attempts <a data-mention href="test-results.md#attempt">#attempt</a></td></tr><tr><td>annotations</td><td>Annotation[]</td><td>List of test annotations <a data-mention href="test-results.md#annotation">#annotation</a></td></tr></tbody></table>

#### Commit

<table><thead><tr><th width="130.19921875">Name</th><th width="130.15234375">Type</th><th>Description</th></tr></thead><tbody><tr><td>branch</td><td>string</td><td>Git branch name for this test result</td></tr><tr><td>authorEmail</td><td>string</td><td>Git commit author email address</td></tr><tr><td>authorName</td><td>string</td><td>Git commit author name</td></tr><tr><td>sha</td><td>string</td><td>Git commit SHA hash</td></tr><tr><td>message</td><td>string</td><td>Git commit message</td></tr></tbody></table>

#### Framework

<table><thead><tr><th width="129.72265625">Name</th><th width="130.703125">Type</th><th>Description</th></tr></thead><tbody><tr><td>clientVersion</td><td>string</td><td>Version of the reporter used for test execution</td></tr><tr><td>type</td><td>enum</td><td>Type of the test execution framework. Values: <code>"pw"</code>, <code>"cypress"</code>, <code>"jest"</code>, <code>"postman"</code>, <code>"vitest"</code></td></tr><tr><td>version</td><td>string</td><td>Version of the testing framework</td></tr></tbody></table>

#### Annotation

<table><thead><tr><th width="129.7890625">Name</th><th width="129.9453125">Type</th><th>Description</th></tr></thead><tbody><tr><td>type</td><td>string</td><td>Type of the annotation</td></tr><tr><td>description</td><td>string</td><td>Description of the annotation</td></tr></tbody></table>

#### Attempt

<table><thead><tr><th width="130.27734375">Name</th><th width="130.265625">Type</th><th>Description</th></tr></thead><tbody><tr><td>attemptId</td><td>string</td><td>Unique identifier for this test attempt</td></tr><tr><td>state</td><td>enum</td><td>Status of the attempt. Values: <code>"failed"</code>, <code>"passed"</code>, <code>"pending"</code>, <code>"skipped"</code></td></tr><tr><td>startedAt</td><td><sub>string (ISO 8601)</sub></td><td>Timestamp when the attempt started</td></tr><tr><td>duration</td><td>number</td><td>Total duration of the attempt in milliseconds</td></tr><tr><td>error</td><td>Error</td><td>Error object of the attempt in case of failure <a data-mention href="test-results.md#error">#error</a></td></tr></tbody></table>

#### Error

<table><thead><tr><th width="129.546875">Name</th><th width="129.98046875">Type</th><th>Description</th></tr></thead><tbody><tr><td>message</td><td>string</td><td>Error description</td></tr><tr><td>stack</td><td>string</td><td>Detailed error description with stack trace</td></tr><tr><td>location</td><td>Location</td><td>Code location where the error occurred. See <a data-mention href="test-results.md#location">#location</a></td></tr></tbody></table>

#### Location

<table><thead><tr><th width="130.48046875">Name</th><th width="130.109375">Type</th><th>Description</th></tr></thead><tbody><tr><td>line</td><td>number</td><td>Line number where the error occurred</td></tr><tr><td>column</td><td>number</td><td>Column number where the error occurred</td></tr><tr><td>file</td><td>string</td><td>File path where the error occurred</td></tr></tbody></table>
