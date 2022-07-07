---
description: Cypress tests API Reference - Runs resource
---

# Runs

This is an object representing cypress tests run. You can retrieve a run's details and cancel a run.&#x20;

* See [projects.md](projects.md "mention") API resource to list runs associated with a project.
* See [instances.md](instances.md "mention")API resource for fetching Instance object by an `instanceId`

{% swagger method="get" path="/runs/:runId" baseUrl="v1" summary="Get Run details" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="path" name="runId" type="String" required="true" %}
Run ID
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```javascript
{
    "status": "OK",
    "data": {
        "runId": "0a91f41ed60abfab9ea509e866ba9d6d", // run id
        "projectId": "bAYZ4a", // associated project Id
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
                "machineId": "327043fb-f9df-4611-9a5e-8a33bbba7247"
            }
        ]
    }
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="put" path="/runs/:runId/cancel" baseUrl="v1" summary="Cancel a Run" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="path" name="runId" type="String" required="true" %}
Run ID
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
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
{% endswagger-response %}

{% swagger-response status="422: Unprocessable Entity" description="The run has been already cancelled" %}
```javascript
{
    "status": "FAILED",
    "error": "Run already cancelled"
}
```
{% endswagger-response %}
{% endswagger %}
