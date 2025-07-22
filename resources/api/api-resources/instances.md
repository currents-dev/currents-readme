---
description: API Reference - Instance resource
---

# Instances

An instance is an object representing the results of a spec file execution. You can obtain a list of instances associated with a run from the [runs.md](runs.md "mention") API resource.

{% hint style="info" %}
Asset URLs in the response (videos, screenshots) are pre-signed URLs with a 2-hour expiration time. You must download or access these URLs within 2 hours of receiving the API response.
{% endhint %}

## Get Instance

<mark style="color:blue;">`GET`</mark> `v1/instances/:instanceId`

#### Path Parameters

| Name                                         | Type   | Description |
| -------------------------------------------- | ------ | ----------- |
| instanceId<mark style="color:red;">\*</mark> | string | Instance ID |

{% hint style="warning" %}
The output is different for different test runners
{% endhint %}

{% tabs %}
{% tab title="200: OK (Cypress) " %}
```javascript
{
    "status": "OK",
    "data": {
        // Associated run id
        "runId": "9ee42e4b85c02c634fe30b26d728624e",
        // Associated group id
        "groupId": "1657092333",
        // Associated project id
        "projectId": "LPjo81",
        // instance id
        "instanceId": "bf89e79f-af2a-43cb-afba-2575e567f103",
        // spec file path
        "spec": "cypress/integration/orchestration_100.spec.js",
        // test runner version used to create the instance
        "cypressVersion": "10.3.0",
        // test runner id used to create the instance
        "machineId": "25574b7e-c7d0-4ea4-804a-c56304c03fe0",
        // Git Commit info
        "commit": {
            "remoteOrigin": "https://github.com/nasa/monorepo",
            "branch": "feat/branch",
            "authorName": "John Doe",
            "authorEmail": "john@doe.org",
            "message": "Commit message\n",
            "sha": "d45ffe35ac5af2ea98726503f2dade3cf821a32e"
        },
        // Tags used to create the associated run
        "tags": ["tagA"],
        // Platform used to execute the spec file
        "platform": {
            "osName": "darwin",
            "osVersion": "21.4.0",
            "browserName": "Electron",
            "browserVersion": "100.0.4896.160"
        },
        // Instance creation time
        "createdAt": "2022-07-06T07:25:50.025Z",
        // Test results
        "results": {
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
            // Tests details
            "tests": [
                {
                    // The body of the test
                    "body": "() => {\n    throw new Error(\"oh!\");\n    cy.log(\"Apple\");\n  }",
                    // Test Title 
                    "title": [
                        "Test",
                        "passing test"
                    ],
                    // Test State
                    "state": "failed",
                    // Outcome of a failed test
                    "displayError": "Error: oh!\n    at Context.eval (https://en.wikipedia.org/__cypress/tests?p=cypress/integration/orchestration_100.spec.js:101:11)",
                    // Test attempts details
                    "attempts": [
                        {
                            "state": "failed",
                            "error": {
                                "name": "Error",
                                "message": "oh!",
                                "stack": "    at Context.eval (https://en.wikipedia.org/__cypress/tests?p=cypress/integration/orchestration_100.spec.js:101:11)",
                                "codeFrame": {
                                    "line": 3,
                                    "column": 11,
                                    "originalFile": "cypress/integration/orchestration_100.spec.js",
                                    "relativeFile": "cypress/integration/orchestration_100.spec.js",
                                    "absoluteFile": "/Users/agoldis/currents-demo/cypress/integration/orchestration_100.spec.js",
                                    "frame": "  1 | describe(\"Test\", function () {\n  2 |   it(\"passing test\", () => {\n> 3 |     throw new Error(\"oh!\");\n    |           ^\n  4 |     cy.log(\"Apple\");\n  5 |   });\n  6 |   it.skip(\"ignored / pending tests\", () => {",
                                    "language": "js"
                                }
                            },
                            "wallClockStartedAt": "2022-07-06T07:25:50.876Z",
                            "wallClockDuration": 102,
                            "videoTimestamp": 827
                        }
                    ],
                    "testId": "r3"
                },
                {
                    "body": "",
                    "title": [
                        "Test",
                        "ignored / pending tests"
                    ],
                    "state": "pending",
                    "displayError": null,
                    "attempts": [
                        {
                            "state": "pending",
                            "error": null,
                            "wallClockStartedAt": null,
                            "wallClockDuration": null,
                            "videoTimestamp": null
                        }
                    ],
                    "testId": "r4"
                }
            ],
            // An exception that prevented the spec file from running
            "exception": null,
            // Screenshot details
            "screenshots": [
                {
                    "screenshotId": "wz9n2",
                    "name": null,
                    // Associated testId
                    "testId": "r3",
                    "testAttemptIndex": 0,
                    "takenAt": "2022-07-06T07:25:50.893Z",
                    "height": 720,
                    "width": 1280,
                    // Screenshot URL
                    "screenshotURL": "https://fs-staging.currents.dev/629849461deb0ae7090f97d1/50d92085-1493-4483-9cfa-07040876d083.png?Expires=1657182482&Key-Pair-Id=K1ZNDCCIZ3P4FU&Signature=RXyy7IzX0v793GiFko41roeT8veZ0Oe63prKdEB4k2WiXbJsNGhM-ee11L8d7t9-5vYPngoOXa6CGjl7P0~iFcDOxdc3XSjLYmv3mopvpWcqFdBi06RmU54NPf3jWCStQ9A0-WoR9uSp6PkhAzwJHknyx6epQXH2iwSuWJ-ROvalqPpshTjndT9R35-DnEefNaXnmZEzm-oScWCjtC~YzJlW4y3rLTaJIFfnR-K-ZCBMBy3lFn7fd~-YVUTo~RkoWN3uM-FpK-bZBjkfBv9DhRR1Q96bBbtZ3v7kcbohI2FrqoxcYEgePWqVXusvCWUIY7LybMOYi7TXyhNFkXZxlg__"
                }
            ],
            // Video URL
            "videoUrl": "https://fs-staging.currents.dev/629849461deb0ae7090f97d1/bf89e79f-af2a-43cb-afba-2575e567f103.mp4?Expires=1657182482&Key-Pair-Id=K1ZNDCCIZ3P4FU&Signature=KOu78qUJ-3ZwLlXXebh6InH8ItbhNp2KS3RrsDqfXHV7R-4vDBqK1qCCcGc6VEeCq~5yLIoupoXKdhnhrsNvFgKKaOu122bCJTDJnIK8WmdsypftPekvI~Q6XXqhx2~DhYU1u~gU4DKqYNhAGvk6ZqZdW3YE6Tg17wv4GU2yLl1uOrnZtXL5AJATrREuSV86wFto94wjLU6QGpOIGCB-TMDp3MHbKsVg16JqgeCapYIvys115BfvQHvqCE4CtI0FvtxnmkO9URaN35N7rV2~azDxHPzpSISUkh3fduwBd-ZO50ZB0dHa9tgGNrpVWk42EPUY~iBrnvttC8cob4j3Yw__",
        }
    }
}
```
{% endtab %}

{% tab title="200: OK (Playwright)" %}
```javascript
{
    "status": "OK",
    "data": {
        // Associated project id
        "projectId": "DgTfZV",
        // Associated run id
        "runId": "dbb95157b6cb92f0",
        // Associated group id
        "groupId": "chromium",
        // instance id
        "instanceId": "2tniK8lM9j1rSoVh",
        // Test runner ID used to create the instance
        "machineId": "CnZYMAcVDvd5",
        // spec file path
        "spec": "test-a.spec.ts",
        // Instance creation time
        "createdAt": "2024-06-17T09:49:31.368Z",
        // Test runner worker information
        "worker": {
            "workerIndex": 1,
            "parallelIndex": 1
        },
        // Framework information
        "framework": {
            "clientVersion": "1.4.0",
            "type": "pw",
            "version": "1.44.0"
        },
        // Platform used to execute the spec file
        "platform": {
            "osName": "linux",
            "osVersion": "Ubuntu - 22.04",
            "browserName": "chromium",
            "browserVersion": ""
        },
        // Tags used to create the associated run
        "tags": ["project:chrome"],
        "commit": {
            "remoteOrigin": "https://github.com/nasa/monorepo",
            "branch": "feat/branch",
            "authorName": "John Doe",
            "authorEmail": "john@doe.org",
            "message": "Commit message\n",
            "sha": "d45ffe35ac5af2ea98726503f2dade3cf821a32e"
        },
        "claimList": [
            {
                "machineId": "CnZYMAcVDvd5",
                "t": 1718617771368
            }
        ],
        // Instance signature
        "signature": "754165b1b268e4b6f8d967ac1548bdd0",
        // Test results
        "results": {
            "stats": {
                "overall": 1,
                "tests": 1,
                "passes": 0,
                "failures": 1,
                "pending": 0,
                "skipped": 0,
                "flaky": 0,
                "retries": 0,
                "wallClockStartedAt": "2024-06-17T09:49:31.370Z",
                "wallClockEndedAt": "2024-06-17T09:49:46.426Z",
                "wallClockDuration": 15056
            },
            // Tests details
            "tests": [
                {
                    // Indicates if the test is done
                    "_d": true,
                    // Test state
                    "state": "failed",
                    "testId": "9d314e60d70d532f877a-b29c77ddb916da38bad5",
                    // Test title
                    "originalTitle": ["test 01"],
                    // Test title without tags
                    "title": ["test 01"],
                    // Test attempts details
                    "attempts": [
                        {
                            "_d": true,
                            "attemptId": "EgFANdSInxFkVNat-0",
                            "state": "failed",
                            "rawStatus": "failed",
                            "workerIndex": 0,
                            "parallelIndex": 0,
                            "error": {
                                "name": "Error",
                                "message": "oh!",
                                "stack": "Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoBe[2m([22m[32mexpected[39m[2m) // Object.is equality[22m\n\nExpected: [32m2[39m\nReceived: [31m1[39m\n    at /home/slavic/Projects/currents-playwright/e2e/artifacts/test-a.spec.ts:34:13",
                                "codeFrame": {
                                    "frame": "[0m [90m 32 |[39m test([32m\"test 01\"[39m[33m,[39m [36masync[39m ({ page }[33m,[39m testInfo) [33m=>[39m {\n [90m 33 |[39m   [36mawait[39m testBody({ page }[33m,[39m testInfo)[33m;[39m\n[31m[1m>[22m[39m[90m 34 |[39m   expect([35m1[39m)[33m.[39mtoBe([35m2[39m)[33m;[39m\n [90m    |[39m             [31m[1m^[22m[39m\n [90m 35 |[39m })[33m;[39m\n [90m 36 |[39m\n [90m 37 |[39m test([32m\"test 02\"[39m[33m,[39m [36masync[39m ({ page }[33m,[39m testInfo) [33m=>[39m {[0m",
                                    "line": 34,
                                    "column": 13,
                                    "file": "/home/slavic/Projects/currents-playwright/e2e/artifacts/test-a.spec.ts"
                                }
                            },
                            "wallClockStartedAt": "2024-06-17T09:49:31.370Z",
                            "wallClockDuration": 15445,
                            "videoTimestamp": null
                        }
                    ],
                    "displayError": null,
                    "isFlaky": false,
                    "tags": ["project:chrome"]
                }
            ],
            // Test traces
            "playwrightTraces": [
                {
                    "testId": "9d314e60d70d532f877a-3cf4d85bf8993ae9b67d",
                    "traceId": "dec2d21867282cb99b9d850e2145e8ed",
                    "testAttemptIndex": 0,
                    "name": "trace",
                    "traceURL": "https://fs-staging.currents.dev/64c37267d04f264d0923d328/9I2Njx6U5sOa0gx9.zip?Expires=1718877913&Key-Pair-Id=K1ZNDCCIZ3P4FU&Signature=CKuitZE2XIb9tkf-pb435dsSx1fBUb3hgJ0qt2RxrD0qNSF0gviXZMQuaWCoPDaE7MWQbH4G71EelUnOim6tA0HokMDsN-lUHYd44pCVBEAOG92vyFF-WBnagVBS1lSySin059qex1ZqeBoLRzNTGmz-h5LlpaC4oi3GAJEWAVcv4wWFFPxaidrNNGe73sPaAh18wD9fpiJntRMDo6S-FAJY8vbmbWLic9jMvWALUwqvgtiAUbh5wPA3NCaFbhbpykTOECxgwoOPs0lyctkiXP-H~m0L~GhpHcc93Th0HJjbfAy817aVgnGoP9Hxg23R3Z~pEOsk1qKuAuyMyJnHxA__"
                }
            ],
            // Test screenshots
            "screenshots": [
                {
                    "name": "manually generated screenshot",
                    "testId": "9d314e60d70d532f877a-49357ab40cb4d4de5da1",
                    "screenshotId": "d9ed1360c77b7e7bc441fee1c91acc03",
                    "testAttemptIndex": 0,
                    "screenshotURL": "https://fs-staging.currents.dev/64c37267d04f264d0923d328/s00TiZbe3RVgv3jO.png?Expires=1718877913&Key-Pair-Id=K1ZNDCCIZ3P4FU&Signature=RTE3yO~FAsCUGnYwF64FRmDWpLIiiGnyxhOL7HltoMrED7fznKXe9arrDsfY3ZsqGf3Vz1mQ9DADd55ltlMS4a-CpZ0Vyk51OokzutsfjFVCes18vNkOu3rUE4fw-lmpv664HOT4laFYfq1sBjgiHn330jbfd8WC1SuC32eKz699qWyHq83jesfapkFFTSS1DCeDZd-Zju74TlEGnrOsk2kpkf2wSFaYJJY0GcGXP9hzTc~fgt1Q-pX8mMdcoxRswStvj5g9tl4ZLvGrNNK2li7YEiFRWee~xcu6JED3I-pPVoGzbZQiVpqHY1S3Bw2DvEdnPVI2BDXs~3HffpQTBA__",
                    "takenAt": "2024-06-17T09:49:40.961Z"
                }
            ],
            // Test videos
            "videos": [
                {
                    "testId": "9d314e60d70d532f877a-3cf4d85bf8993ae9b67d",
                    "videoUrl": "https://fs-staging.currents.dev/64c37267d04f264d0923d328/zTDmXmfu4kxMe088.webm?Expires=1718877913&Key-Pair-Id=K1ZNDCCIZ3P4FU&Signature=tVi3k4VJVkCRPzY7Nz-rMxlUfuDvRL3sJi9ybwupZgy4BW6c7usH8fEJJrjJ5z~h1Y-mEsuO6APpSMvQcxqMYgRvv1RO5S6pQoGLjceBbvRPaagsskMDyj5tA2E96GvHDkTqmNFTxRk~Mt-Nj-he-tob~VdebKn4wNpu8jAB-6T6Vy1NUKEQLxifvVbLpSXNv4uWFzn3jMTIfpYeblpOMAG-NdZomNEWErgBbqn9LheRxosIsQ4ZSZIZP0YLTw-bTynF01B0Lk-y0jXMqxzem2G048BXHsUjpGWzciBCcco-6Z967bFCT3XZdloNxfZevN1gM0wxN-DjesaLbmw5-g__",
                    "testAttemptIndex": 0
                }
            ]
        },
        // Instance last update time
        "_t": "2024-06-17T09:49:57.380Z"
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
    "error": "Insufficient permissions to access this instance"
}
```
{% endtab %}

{% tab title="404: Not Found Instance not found" %}
```javascript
{
    "status": "FAILED",
    "error": "Instance not found"
}
```
{% endtab %}
{% endtabs %}
