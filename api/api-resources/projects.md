---
description: Cypress tests API Reference - Projects resource
---

# Projects

This is an object representing your Currents project. You can retrieve the list of projects for your organization, get specific project details, and retrieve the list of runs for a project.

{% swagger method="get" path="projects" baseUrl="v1/" summary="List the projects associated with your organization" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="query" name="limit" type="1-50" %}
Pagination limit 1-50. Default 10.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="starting_before" type="String" %}
Pagination cursor. See 

[pagination.md](../pagination.md "mention")


{% endswagger-parameter %}

{% swagger-parameter in="query" name="ending_after" type="String" %}
Pagination cursor. See 

[pagination.md](../pagination.md "mention")


{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Project Items" %}
```javascript
{
    "status": "OK",
    "has_more": false,
    "data": [{
        "projectId": "emdaGd", // project id
        "name": "Hello Currents", // project name
        "createdAt": "2022-01-14T16:15:18.852Z", // creation date
        "inactivityTimeoutSeconds": 7200, // timeout value
        "cursor": "61e1a196954ca800138aae97", // pagination cursor
        "failFast": true // enable fail-fast strategy
    }]
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="get" path="/projects/:projectId" baseUrl="v1" summary="Get project item" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="path" name="projectId" required="true" type="String" %}
Project ID
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```javascript
{
    "status": "OK",
    "data": {
        "projectId": "emdaGd", // project id
        "name": "Hello Currents", // project name
        "createdAt": "2022-01-14T16:15:18.852Z", // creation date
        "inactivityTimeoutSeconds": 7200, // timeout value
        "failFast": true // enable fail-fast strategy
    }
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="get" path="/projects/:projectId/runs" baseUrl="v1" summary="List the runs associated with the project" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="path" name="projectId" type="String" required="true" %}
Project ID
{% endswagger-parameter %}

{% swagger-parameter in="query" name="limit" type="1-50" %}
Pagination limit 1-50. Default 10.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="starting_before" type="String" %}
Pagination cursor. See 

[pagination.md](../pagination.md "mention")


{% endswagger-parameter %}

{% swagger-parameter in="query" name="ending_after" type="String" %}
Pagination cursor. See 

[pagination.md](../pagination.md "mention")


{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```javascript
{
    "status": "OK",
    "has_more": true,
    "data": [
        {
            "runId": "0a91f41ed60abfab9ea509e866ba9d6d", // run id
            "cursor": "62c5468c239c55bd1a1a97ce", // pagination cursor
            "projectId": "bAYZ4a", // run's project ID
            "createdAt": "2022-07-06T08:23:40.939Z", // creation time
            "tags": ["tagA", "tagB"], // tags
            "cypressVersion": "9.5.4", // cypress version
            // timeout data
            "timeout": {
                "isTimeout": true, // whether the run timed out
                "timeoutValueMs": 3600000 // value used for timeout
            },
            // cancellation data
            "cancellation": {
                "actor": "api-request",
                "canceledAt": "2022-06-28T07:24:58.948Z",
                "reason": "apiRequest"
            },
            // Groups progress within the run
            "groups": [
                {
                    "groupId": "regression-c64c5c2b976aa5047507cb8badc889aac7539a3b-2621389820-1", 
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
                // Git commit data for the run
                "commit": {
                    "sha": "c64c5c2b976aa5047507cb8badc889aac7539a3b",
                    "branch": "feat/branch",
                    "authorName": "John Doe",
                    "authorEmail": "john@users.noreply.github.com",
                    "message": "Commit message",
                    "remoteOrigin": "https://github.com/nasa/monorepo",
                    "defaultBranch": null
                }
            }
        }
    ]
}
```
{% endswagger-response %}
{% endswagger %}
