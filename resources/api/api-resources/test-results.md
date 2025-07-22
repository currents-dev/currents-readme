---
description: API Reference - Test Results
---

# Test Results

This resource allows to query test results based on its signature.

{% hint style="info" %}
Learn how to generate [test-signature.md](test-signature.md "mention") before using this resource
{% endhint %}

## Get Test Results

<mark style="color:blue;">`GET`</mark> `v1/test-results/:signature`

#### Path Parameters

| Name                                      | Type   | Description                                                                    |
| ----------------------------------------- | ------ | ------------------------------------------------------------------------------ |
| signature<mark style="color:red;">\*</mark> | string | Unique test signature. See [test-signature.md](test-signature.md "mention") |



#### Query Parameters

| Name                                         | Type                              | Description                                                                                     |
| -------------------------------------------- | --------------------------------- | ----------------------------------------------------------------------------------------------- |
| date_start<mark style="color:red;">\*</mark>  | string (ISO 8601)             | Start date for filtering test results within the specified date range |
| date_end<mark style="color:red;">\*</mark>    | string (ISO 8601)             | End date for filtering test results within the specified date range |
| starting_after                               | string                            | Pagination cursor for fetching results after this cursor. See [pagination.md](../pagination.md "mention") |
| ending_before                                | string                            | Pagination cursor for fetching results before this cursor. See [pagination.md](../pagination.md "mention") |
| limit                                        | number                            | Maximum number of results to return (1-100). Default: 10 |
| branch[]                                     | string                            | Filter by Git branch names. Multiple values: `branch[]=valueA&branch[]=valueB` |
| tag[]                                        | string                            | Filter by tag names. Multiple values: `tag[]=valueA&tag[]=valueB` |
| git_author[]                                 | string                            | Filter by Git author names. Multiple values: `git_author[]=valueA&git_author[]=valueB` |
| group[]                                      | string                            | Filter by group names. Multiple values: `group[]=valueA&group[]=valueB` |
| status[]                                     | enum                                        | Test status filter. Values: `"failed"`, `"passed"`, `"pending"`, `"skipped"`. Multiple values: `status[]=failed&status[]=passed` |

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

| Name             | Type                                             | Description                                                                                                                |
| ---------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| cursor           | string                                           | Pagination cursor for this result. See [pagination.md](../pagination.md "mention") |
| projectId        | string                                           | Project ID for this test. See [projects](../../../dashboard/projects/ "mention") |
| groupId          | string                                           | Group ID that this test belongs to |
| runId            | string                                           | Run ID that this test belongs to. See [runs](../../../dashboard/runs/ "mention") |
| instanceId       | string                                           | Instance ID that this test belongs to. See [instances.md](instances.md "mention") |
| spec             | string                                           | Spec file name that contains this test. See [spec-files.md](spec-files.md "mention") |
| machineId        | string                                           | Machine ID that executed this test |
| signature        | string                                           | Signature of the test [test-signature.md](test-signature.md "mention")                                                     |
| title            | string[]                                         | Title of the test. [See test title](https://docs.currents.dev/resources/api/api-resources/test-signature#test-title).      |
| testId           | string                                           | Test ID as reported by the testing framework |
| expectedStatus   | enum                                         | Expected status of the test. Values: `"failed"`, `"passed"`, `"pending"`, `"skipped"`. Only available for Playwright. |
| status           | enum                                         | Final status of the test after the execution. Values: `"failed"`, `"passed"`, `"pending"`, `"skipped"`             |
| framework        | Framework                                        | Information about the framework and reporter used for the test execution [#framework](test-results.md#framework "mention") |
| displayError     | string                                           | Most recent error message from test execution |
| commit           | Commit                                           | Git commit information [#commit](test-results.md#commit "mention")                                                         |
| createdAt        | string (ISO 8601)                                | Timestamp when the test was executed |
| duration         | number                                           | Total duration of the test execution in milliseconds                                                                       |
| flaky            | boolean                                          | Indicates whether the test is marked as flaky. See [flaky-tests.md](../../../dashboard/tests/flaky-tests.md "mention") |
| attempts         | Attempt[]                                        | List of test execution attempts [#attempt](test-results.md#attempt "mention")                                              |
| annotations      | Annotation[]                                     | List of test annotations [#annotation](test-results.md#annotation "mention")                                               |

#### Commit

| Name          | Type     | Description                                    |
| ------------- | -------- | ---------------------------------------------- |
| branch        | string   | Git branch name for this test result |
| authorEmail   | string   | Git commit author email address |
| authorName    | string   | Git commit author name |
| sha           | string   | Git commit SHA hash |
| message       | string   | Git commit message |

#### Framework

| Name            | Type     | Description                                        |
| --------------- | -------- | -------------------------------------------------- |
| clientVersion | string   | Version of the reporter used in the test execution |
| type          | enum     | Type of the test execution framework. Values: `"pw"`, `"cypress"`, `"jest"`, `"postman"`, `"vitest"` |
| version       | string   | Version of the testing framework                   |

#### Annotation

| Name          | Type     | Description                   |
| ------------- | -------- | ----------------------------- |
| type          | string   | Type of the annotation        |
| description   | string   | Description of the annotation |



#### Attempt

| Name        | Type                                           | Description                                                                              |
| ----------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------- |
| attemptId     | string                                         | Unique identifier for this test attempt |
| state         | enum                                         | Status of the attempt. Values: `"failed"`, `"passed"`, `"pending"`, `"skipped"`    |
| startedAt     | string (ISO 8601)                              | Timestamp when the attempt started |
| duration      | number                                         | Total duration of the attempt in milliseconds                                            |
| error         | Error                                          | Error object of the attempt in case of failure [#error](test-results.md#error "mention") |

#### Error

| Name       | Type       | Description                                                                                     |
| ---------- | ---------- | ----------------------------------------------------------------------------------------------- |
| message      | string     | Description of the error                                                                        |
| stack        | string     | More detailed description of the error                                                          |
| location     | Location   | Specific code location where the error happened [#location](test-results.md#location "mention") |

#### Location

| Name     | Type     | Description                         |
| -------- | -------- | ----------------------------------- |
| line         | number   | Line number where the error occurred |
| column       | number   | Column number where the error occurred |
| file         | string   | File path where an error occurred   |

