---
description: API Reference - Runs resource
---

# Runs

**Run** is an object representing a CI execution.

* See [projects.md](projects.md "mention") API resource to list runs associated with a project.
* See [instances.md](instances.md "mention") API resource for fetching Instance objects by `instanceId`

{% hint style="info" %}
Asset URLs in the response (videos, screenshots) are pre-signed URLs with a 2-hour expiration time. You must download or access these URLs within 2 hours of receiving the API response.
{% endhint %}

## Get Run

<mark style="color:blue;">`GET`</mark> `v1/runs/:runId`

#### Path Parameters

| Name                                    | Type   | Description |
| --------------------------------------- | ------ | ----------- |
| runId<mark style="color:red;">\*</mark> | string | Run ID      |

{% hint style="warning" %}
Note: The output may vary between different test runners.
{% endhint %}

{% tabs %}
{% tab title="200: OK (Cypress) " %}
```javascript
{
    "status": "OK",
    "data": {
        "runId": "0a91f41ed60abfab9ea509e866ba9d6d", // run id
        "projectId": "bAYZ4a", // associated project Id
        "completionState": "COMPLETE", // "CANCELED" | "COMPLETE" | "IN_PROGRESS" | "TIMEOUT"
        "status": "FAILED", // "FAILED" | "FAILING" | "PASSED" | "RUNNING"
        "createdAt": "2022-07-06T08:23:40.939Z", // run creation time
        "tags": ["tagA", "tagB"], // run tags
        "cypressVersion": "9.5.4", // test runner version
        // timeout details
        "timeout": { 
            "isTimeout": true, // whether the run timed out
            "timeoutValueMs": 3600000 // value used for timeout
        },
        // Groups progress within the run
        "groups": [
            {
                "groupId": "regression-c64c5c2b976aa5047507cb8badc889aac7539a3b-2621389820-1",
                // Platform details for the run
                "platform": {
                    "osName": "linux",
                    "osVersion": "Debian - 10.11",
                    "browserName": "Chrome",
                    "browserVersion": "97.0.4692.71"
                },
                // Instances / specs progress
                "instances": {
                    "overall": 73,
                    "claimed": 73,
                    "complete": 73,
                    "passes": 62,
                    "failures": 11
                },
                // Tests progress
                "tests": {
                    "overall": 264,
                    "passes": 230,
                    "failures": 16,
                    "pending": 12,
                    "skipped": 6,
                    "retries": 3,
                    "flaky": 3
                }
            }
        ],
        "meta": {
            // CI Build ID associated with the run
            "ciBuildId": "regression-c64c5c2b976aa5047507cb8badc889aac7539a3b-2621389820-1",
            // Git commit info
            "commit": {
                "sha": "c64c5c2b976aa5047507cb8badc889aac7539a3b",
                "branch": "feat/branch",
                "authorName": "John Doe",
                "authorEmail": "john@users.noreply.github.com",
                "message": "Commit message",
                "remoteOrigin": "https://github.com/nasa/monorepo",
                "defaultBranch": null
            }
        },
        // Spec files associated with the run
        "specs": [
            {
                // Spec groupId
                "groupId": "regression-c64c5c2b976aa5047507cb8badc889aac7539a3b-2621389820-1",
                // Spec file path
                "spec": "integration/api/external-api-call-tests.ts",
                // Associated instance ID
                "instanceId": "b5f95e95-726f-4a3b-9edc-6cc0b0eb85fd",
                // Time when the test runner claimed the spec file
                "claimedAt": "2022-07-06T08:37:58.317Z",
                // Time when the test runner reported results to the dashboard
                "completedAt": "2022-07-06T08:38:05.113Z",
                // Test runner that claimed the spec file 
                "machineId": "327043fb-f9df-4611-9a5e-8a33bbba7247",
                // Results of the instance associated with the spec file
                "results": {
                    // Signed video URL 
                    "videoUrl": "https://fs-staging.currents.dev/629849461deb0ae7090f97d1/bf89e79f-af2a-43cb-afba-2575e567f103.mp4?Expires=1657219165&Key-Pair-Id=K1ZNDCCIZ3P4FU&Signature=QYVMeagJ~N~~3YHdSzpRZeCevUolGmUkG5Wr45D3V5ucLdqNnIulSRPoqLMFppKYU9e1AqOXz-7AmCZ-796~17t4RHVfURSdl3Fb4D~ksZ6IcVO6xrnkV8dfJEwZmBcQS8423BqXJ2Xs1VL~XLy~2UOwo4HYEHL5BxgEVtT0HgfUOW5xqopV9MHblDn7Ll0VbCnCJlc5oRjUNXwYjlxkTwe9hKMzaM~5nt82C2O3loMJuc2j0ma2UEPsMSC6zxhI4fhkhD2P-vQ0-Vd2iRLYe6FZnoQ73UIeOkucjGSPnaGTBFi~PoxTZ9ZDMkiCEYfCusYi7HtVM3-~Istbg~JJMw__",
                    // Aggregated test results for the instance
                    "stats": {
                        "suites": 1,
                        "tests": 2,
                        "passes": 0,
                        "pending": 1,
                        "skipped": 0,
                        "failures": 1,
                        "wallClockStartedAt": "2022-07-06T07:25:50.856Z",
                        "wallClockEndedAt": "2022-07-06T07:25:50.992Z",
                        "wallClockDuration": 136
                    },
                    // Screenshots associated with the instance
                    "screenshots": [
                        {
                            "screenshotId": "wz9n2",
                            "name": null,
                            "testId": "r3",
                            "testAttemptIndex": 0,
                            "takenAt": "2022-07-06T07:25:50.893Z",
                            "height": 720,
                            "width": 1280,
                            "screenshotURL": "https://fs-staging.currents.dev/629849461deb0ae7090f97d1/50d92085-1493-4483-9cfa-07040876d083.png?Expires=1657219165&Key-Pair-Id=K1ZNDCCIZ3P4FU&Signature=HGGQhays0F~nZriOkuUboDQLI67XEyczK8KdVQLjIAVWwfpPSQMe7YA370QP6t7Xg~PviOlFkBLETtVkG1jI3L2FYojOtnyaDYhcpfqG~0z5rQGw9ScRIm8lq8QYaoI8bBFr6cOmji8Zv3~fcjBEHqpFbkC8tmQMJI~QZC~DbgXcS7ta3qwydMUmEu6RGEWnPuz8CGYC1gh3hnYqgsV7GakR~qWzymqJWBZHM~ZW3R9AbHai4T3Makv4OTMVvXXHl9nZdi6CKev4pfklf2O2w5xju1V4y9FVRpgu7FUz4US7atnSJuqteWiZBse8hpG2mDOVetjUiebiBLNIWx12Kw__"
                        }
                    ],
                    // The amount of flaky tests detected in the instance
                    "flaky": 0
                }
            }
        ]
    }
}
```
{% endtab %}

{% tab title="200: OK (Playwright)" %}
{% code fullWidth="false" %}
```javascript

{
    "status": "OK",
    "data": {
        "runId": "477f534243d9051c", // run id
        "projectId": "DgTfZV", // associated project Id
        "createdAt": "2024-05-27T12:30:15.171Z", // run creation time
        "tags": ["project:chrome"], // run tags
        "durationMs": 234435, // run duration in ms
        // timeout details
        "timeout": {
            "isTimeout": false  // whether the run timed out
        },
        // Group progress within the run
        "groups": [
            {
                // Instances / specs progress
                "instances": {
                    "overall": 1,
                    "claimed": 1,
                    "complete": 1,
                    "passes": 0,
                    "failures": 1
                },
                // Tests progress
                "tests": {
                    "overall": 5,
                    "tests": 5,
                    "passes": 0,
                    "failures": 5,
                    "pending": 0,
                    "skipped": 0,
                    "flaky": 0,
                    "retries": 0
                },
                "groupId": "chromium",
                // Platform details for the group
                "platform": {
                    "osName": "linux",
                    "osVersion": "Ubuntu - 22.04",
                    "browserName": "chromium",
                    "browserVersion": ""
                },
                // Group tags
                "tags": ["project:chrome"]
            }
        ],
        "meta": {
            // CI Build ID associated with the run
            "ciBuildId": "1716813012",
            // Git commit info
            "commit": {
                "sha": "c64c5c2b976aa5047507cb8badc889aac7539a3b",
                "branch": "feat/branch",
                "authorName": "John Doe",
                "authorEmail": "john@users.noreply.github.com",
                "message": "Commit message",
                "remoteOrigin": "https://github.com/nasa/monorepo",
                "defaultBranch": null
            },
            // Framework details
            "framework": {
                "type": "pw" | "cypress" | "jest" | "postman" | "vitest",
                "version": "1.52.0", // test runner version
                "clientVersion": "1.12.0" // currents client version
            }
        },
        // Spec files associated with the run
        "specs": [
            {
                // Spec file path
                "spec": "test-a.spec.ts",
                // Spec groupId
                "groupId": "chromium",
                // Associated instance ID
                "instanceId": "IzzYS81rn8unznmX",
                // Time when the test runner claimed the spec file
                "claimedAt": "2024-05-27T12:30:14.331Z",
                // Time when the test runner reported results to the dashboard
                "completedAt": "2024-05-27T12:30:28.275Z",
                // Tags associated with the spec file
                "tags": ["project:chrome"],
                // Results of the instance associated with the spec file
                "results": {
                    "flaky": 0,
                    "stats": {
                        "overall": 5,
                        "tests": 5,
                        "passes": 0,
                        "failures": 5,
                        "pending": 0,
                        "skipped": 0,
                        "flaky": 0,
                        "retries": 0,
                        "wallClockStartedAt": "2024-05-27T12:30:14.331Z",
                        "wallClockEndedAt": "2024-05-27T12:30:28.275Z",
                        "wallClockDuration": 13944
                    },
                    // Note: videos are available only via instance API
                    "videoUrl": null,
                    // Note: screenshots are available only via instance API
                    "screenshots": []
                },
                // Test runner that claimed the spec file 
                "machineId": "lcI9xbSwemNV",
                // Playwright worker information
                "worker": {
                    "workerIndex": 0,
                    "parallelIndex": 0
                }
            }
        ],
        "completionState": "COMPLETE", // "CANCELED" | "COMPLETE" | "IN_PROGRESS" | "TIMEOUT"
        "status": "FAILED" // "FAILED" | "FAILING" | "PASSED" | "RUNNING"
    }
}
```
{% endcode %}
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
    "error": "Insufficient permissions to access this run"
}
```
{% endtab %}

{% tab title="404: Not Found Run not found" %}
```javascript
{
    "status": "FAILED",
    "error": "Run not found"
}
```
{% endtab %}
{% endtabs %}

## Cancel a Run

<mark style="color:orange;">`PUT`</mark> `v1/runs/:runId/cancel`

#### Path Parameters

| Name                                    | Type   | Description |
| --------------------------------------- | ------ | ----------- |
| runId<mark style="color:red;">\*</mark> | string | Run ID      |

{% tabs %}
{% tab title="200: OK " %}
```javascript
{
    "status": "OK",
    "data": {
        "actor": "api:keyName", // api key name used to cancel the run
        "canceledAt": "2022-07-07T07:22:13.611Z", // cancellation time
        "reason": "apiRequest", // cancellation reason
        "runId": "9ee42e4b85c02c634fe30b26d728624e" // associated runId
    }
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
    "error": "Insufficient permissions to cancel this run"
}
```
{% endtab %}

{% tab title="404: Not Found Run not found" %}
```javascript
{
    "status": "FAILED",
    "error": "Run not found"
}
```
{% endtab %}

{% tab title="422: Unprocessable Entity Run already cancelled" %}
```javascript
{
    "status": "FAILED",
    "error": "Run already cancelled"
}
```
{% endtab %}
{% endtabs %}

## Delete a Run

<mark style="color:red;">`DELETE`</mark> `v1/runs/:runId`

#### Path Parameters

| Name                                    | Type   | Description |
| --------------------------------------- | ------ | ----------- |
| runId<mark style="color:red;">\*</mark> | string | Run ID      |

{% tabs %}
{% tab title="200: OK " %}
```javascript
{
    "status": "OK",
    "data": {
        "runId": ":runId",
        "actor": "API Request"
    }
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
    "error": "Insufficient permissions to delete this run"
}
```
{% endtab %}

{% tab title="404: Not Found Run not found" %}
```javascript
{
    "status": "FAILED",
    "error": "Run not found"
}
```
{% endtab %}
{% endtabs %}
