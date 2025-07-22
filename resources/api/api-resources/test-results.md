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

### Path Parameters

*   **`signature:`**`string` <mark style="color:red;">required</mark>

    The unique signature of the test, see [test-signature.md](test-signature.md "mention").



### Query Parameters

*   **`date_start:`**`string (ISO Datetime)` <mark style="color:red;">required</mark>

    Date start - the test results included within the date range will be included.
*   **`date_end:`**`string (ISO Datetime)` <mark style="color:red;">required</mark>

    Date end - the test results included within the date range will be included.



### Pagination Parameters

See [pagination.md](../pagination.md "mention")

*   **`starting_after:`**`string`&#x20;

    Pagination cursor&#x20;
*   **`ending_before:`**`string`

    Pagination cursor&#x20;
*   **`limit:`**`number`&#x20;

    Pagination limit `1-100.` Default: `10`



### **Filter Parameters**

*   **`branch[]:`**` ``string`

    Git branches filter. To provide multiple values, use `branch[]=valueA&branch[]=valueB`
*   **`tag[]:`**` ``string`

    Tags filter. To provide multiple values, use `branch[]=valueA&branch[]=valueB`
*   **`git_author[]:`**` ``string`

    Git authors filter. To provide multiple values, use `git_author[]=valueA&git_author[]=valueB`
*   **`group[]:`**` ``string`

    Group filter. To provide multiple values, use `group[]=valueA&group[]=valueB`
*   **`status[]:`**` ``Enum<failed | passed | pending | skipped>`

    Test status filter. To provide multiple values, use **`status`**`[]=failed&status[]=passed`

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

{% tab title="400: FAILED Bad Request " %}
```typescript
type ResponsePayload = {
  status: "FAILED";
  error: string;
};
```


{% endtab %}
{% endtabs %}

#### **Test**

| Name             | Type                                             | Description                                                                                                                |
| ---------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| `cursor`         | `String`                                         | Used for pagination. See [pagination.md](../pagination.md "mention")                                                       |
| `projectId`      | `String`                                         | ID of the project of the test. [projects](../../../dashboard/projects/ "mention")                                          |
| `groupId`        | `String`                                         | ID of the group which the current test belongs to.                                                                         |
| `runId`          | `String`                                         | ID of the run which the current test belongs to. [runs](../../../dashboard/runs/ "mention")                                |
| `instanceId`     | `String`                                         | ID of the instance which the current test belongs to. [instances.md](instances.md "mention")                               |
| `spec`           | `String`                                         | Name of the spec file which the test belongs to. [spec-files.md](spec-files.md "mention")                                  |
| `machineId`      | `String`                                         | ID of the machine which executed the test.                                                                                 |
| `signature`      | `String`                                         | Signature of the test [test-signature.md](test-signature.md "mention")                                                     |
| `title`          | `Array<String>`                                  | Title of the test. [See test title](https://docs.currents.dev/resources/api/api-resources/test-signature#test-title).      |
| `testId`         | `String`                                         | ID of the test as reporter by its framework.                                                                               |
| `expectedStatus` | `String<failed \| passed \| pending \| skipped>` | Spected status of the test. Only available for Playwright.                                                                 |
| `status`         | `String<failed \| passed \| pending \| skipped>` | Final status of the test after the execution                                                                               |
| `framework`      | `Framework`                                      | Information about the framework and reporter used for the test execution [#framework](test-results.md#framework "mention") |
| `displayError`   | `String`                                         | Latest error from the test execution                                                                                       |
| `commit`         | `Commit`                                         | Git commit information [#commit](test-results.md#commit "mention")                                                         |
| `createdAt`      | `String (ISO Datetime)`                          | Date of the test execution                                                                                                 |
| `duration`       | `Number`                                         | Total duration of the test execution in milliseconds                                                                       |
| `flaky`          | `Boolean`                                        | Property that shows if the test is marked as flaky [flaky-tests.md](../../../dashboard/tests/flaky-tests.md "mention")     |
| `attempts`       | `Array<Attempt>`                                 | List of test execution attempts [#attempt](test-results.md#attempt "mention")                                              |
| `annotations`    | `Array<Annotation>`                              | List of test annotations [#annotation](test-results.md#annotation "mention")                                               |

#### Commit

| Name          | Type     | Description                                    |
| ------------- | -------- | ---------------------------------------------- |
| `branch`      | `String` | Git Commit Branch of the recorded result       |
| `authorEmail` | `String` | Git Commit Author Email of the recorded result |
| `authorName`  | `String` | Git Commit Author Name of the recorded result  |
| `sha`         | `String` | Git Commit SHA of the recorded result          |
| `message`     | `String` | Git Commit Message of the recorded result      |

#### Framework

| Name            | Type     | Description                                        |
| --------------- | -------- | -------------------------------------------------- |
| `clientVersion` | `String` | Version of the reporter used in the test execution |
| `type`          | `Enum`   | Type of the test execution framework               |
| `version`       | `String` | Version of the testing framework                   |

#### Annotation

| Name          | Type     | Description                   |
| ------------- | -------- | ----------------------------- |
| `type`        | `String` | Type of the annotation        |
| `description` | `String` | Description of the annotation |



#### Attempt

| Name        | Type                                           | Description                                                                              |
| ----------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `attemptId` | `String`                                       | ID of the attempt                                                                        |
| `state`     | `Enum<failed \| passed \| pending \| skipped>` | Status of the attempt                                                                    |
| `startedAt` | `String (ISO Datetime)`                        | Start date of the attempt                                                                |
| `duration`  | `Number`                                       | Total duration of the attempt in milliseconds                                            |
| `error`     | `Error`                                        | Error object of the attempt in case of failure [#error](test-results.md#error "mention") |

#### Error

| Name       | Type       | Description                                                                                     |
| ---------- | ---------- | ----------------------------------------------------------------------------------------------- |
| `message`  | `String`   | Description of the error                                                                        |
| `stack`    | `String`   | More detailed description of the error                                                          |
| `location` | `Location` | Specific code location where the error happened [#location](test-results.md#location "mention") |

#### Location

| Name     | Type     | Description                         |
| -------- | -------- | ----------------------------------- |
| `line`   | `Number` | Code line where an error occurred   |
| `column` | `Number` | Code column where an error occurred |
| `file`   | `String` | File path where an error occurred   |

