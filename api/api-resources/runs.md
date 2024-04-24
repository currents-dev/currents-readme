---
description: API Reference - Runs resource
---

# Runs

This is an object representing Playwright tests run. You can retrieve a run's details and cancel a run.&#x20;

* See [projects.md](projects.md "mention") API resource to list runs associated with a project.
* See [instances.md](instances.md "mention")API resource for fetching Instance object by an `instanceId`

{% hint style="info" %}
Asset URLs listed in the responses (videos, screenshots) are "signed" URLs. They are only valid for 2h since their retrieval.
{% endhint %}

## Get Run details

<mark style="color:blue;">`GET`</mark> `v1/runs/:runId`

#### Path Parameters

| Name                                    | Type   | Description |
| --------------------------------------- | ------ | ----------- |
| runId<mark style="color:red;">\*</mark> | String | Run ID      |

{% tabs %}
{% tab title="200: OK " %}
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
        "cypressVersion": "9.5.4", // cypress runner version
        // timeout details
        "timeout": { 
            "isTimeout": true, // whether the run timed out
            "timeoutValueMs": 3600000 // value used for timeout
        },
        // Groups progress within the run
        "groups": [
            {
                "groupId": "regression-c64c5c2b976aa5047507cb8badc889aac7539a3b-2621389820-1",
                // Platform details for the 
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
                // Time when a cypress runner requested the spec file
                "claimedAt": "2022-07-06T08:37:58.317Z",
                // Time when a cypress runner reported the results to the dashboard
                "completedAt": "2022-07-06T08:38:05.113Z",
                // Cypress runner that requested the spec file 
                "machineId": "327043fb-f9df-4611-9a5e-8a33bbba7247",
                // The results of the instance associated with the spec file
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
                    // Screeenshots associated with the instance
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
{% endtabs %}

## Cancel a Run

<mark style="color:orange;">`PUT`</mark> `v1/runs/:runId/cancel`

#### Path Parameters

| Name                                    | Type   | Description |
| --------------------------------------- | ------ | ----------- |
| runId<mark style="color:red;">\*</mark> | String | Run ID      |

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

{% tab title="422: Unprocessable Entity The run has been already cancelled" %}
```javascript
{
    "status": "FAILED",
    "error": "Run already cancelled"
}
```
{% endtab %}
{% endtabs %}

## Deleting a Run

<mark style="color:red;">`DELETE`</mark> `v1/runs/:runId`

#### Path Parameters

| Name                                    | Type   | Description |
| --------------------------------------- | ------ | ----------- |
| runId<mark style="color:red;">\*</mark> | String | Run ID      |

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
{% endtabs %}
