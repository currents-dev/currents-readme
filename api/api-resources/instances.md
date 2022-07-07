---
description: Cypress tests API Reference - Instance resource
---

# Instances

An instance is an object representing the results of a cypress spec file.&#x20;

You can obtain the list of instance objects by querying [runs.md](runs.md "mention") API resource.

{% hint style="info" %}
**Please note,** the asset URLs listed in the responses (videos, screenshots) are "signed" URLs. They are only valid for 2h since their retrieval.
{% endhint %}

{% swagger method="get" path="/instances/:instanceId" baseUrl="v1" summary="Get Instance item" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="path" name="instanceId" type="String" required="true" %}
Instance ID
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
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
        // cypress runner version used to create the instance
        "cypressVersion": "10.3.0",
        // cypress runner id used to create the instance
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
{% endswagger-response %}
{% endswagger %}
