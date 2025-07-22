---
description: API Reference - Projects resource
---

# Projects

This namespace allows you to retrieve information about Currents Projects:

* Get the list of projects for your organization
* Get specific project details
* Get the list of runs for a project

## List Projects

<mark style="color:blue;">`GET`</mark> `v1/projects`

#### Query Parameters

| Name             | Type   | Description                                                        |
| ---------------- | ------ | ------------------------------------------------------------------ |
| limit            | number | Maximum number of results to return (1-100). Default: 10 |
| starting\_before | string | Pagination cursor for fetching results before this cursor. See [pagination.md](../pagination.md "mention") |
| ending\_after    | string | Pagination cursor for fetching results after this cursor. See [pagination.md](../pagination.md "mention") |

{% tabs %}
{% tab title="200: OK Project Items" %}
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
{% endtab %}

{% tab title="400: Bad Request Invalid parameters" %}
```javascript
{
    "status": "FAILED",
    "error": "Invalid limit parameter. Must be between 1 and 100"
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
    "error": "Insufficient permissions to access projects"
}
```
{% endtab %}
{% endtabs %}

## Get Project

<mark style="color:blue;">`GET`</mark> `v1/projects/:projectId`

#### Path Parameters

| Name                                        | Type   | Description |
| ------------------------------------------- | ------ | ----------- |
| projectId<mark style="color:red;">\*</mark> | string | Project ID  |

{% tabs %}
{% tab title="200: OK " %}
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
    "error": "Insufficient permissions to access this project"
}
```
{% endtab %}

{% tab title="404: Not Found Project not found" %}
```javascript
{
    "status": "FAILED",
    "error": "Project not found"
}
```
{% endtab %}
{% endtabs %}

## List Project Runs

<mark style="color:blue;">`GET`</mark> `v1/projects/:projectId/runs`

#### Path Parameters

| Name                                        | Type   | Description |
| ------------------------------------------- | ------ | ----------- |
| projectId<mark style="color:red;">\*</mark> | string | Project ID  |

#### Query Parameters

| Name             | Type   | Description                                                        |
| ---------------- | ------ | ------------------------------------------------------------------ |
| limit            | number | Maximum number of results to return (1-50). Default: 10 |
| starting\_before | string | Pagination cursor for fetching results before this cursor. See [pagination.md](../pagination.md "mention") |
| ending\_after    | string | Pagination cursor for fetching results after this cursor. See [pagination.md](../pagination.md "mention") |

{% tabs %}
{% tab title="200: OK " %}
```javascript
{
    "status": "OK",
    "has_more": true,
    "data": [
        {
            "runId": "0a91f41ed60abfab9ea509e866ba9d6d", // run ID
            "cursor": "62c5468c239c55bd1a1a97ce", // pagination cursor
            "projectId": "bAYZ4a", // project ID for this run
            "createdAt": "2022-07-06T08:23:40.939Z", // creation time
            "completionState": "COMPLETE", // "CANCELED" | "COMPLETE" | "IN_PROGRESS" | "TIMEOUT"
            "status": "FAILED", // "FAILED" | "FAILING" | "PASSED" | "RUNNING"
            "tags": ["tagA", "tagB"], // tags
            "durationMs": 2443644, // run duration in ms
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
                // Git commit information for the run
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
            }
        }
    ]
}
```
{% endtab %}

{% tab title="400: Bad Request Invalid parameters" %}
```javascript
{
    "status": "FAILED",
    "error": "Invalid limit parameter. Must be between 1 and 50"
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
    "error": "Insufficient permissions to access project runs"
}
```
{% endtab %}

{% tab title="404: Not Found Project not found" %}
```javascript
{
    "status": "FAILED",
    "error": "Project not found"
}
```
{% endtab %}
{% endtabs %}

## Get Project Insights

<mark style="color:blue;">`GET`</mark> `v1/projects/:projectId/insights`

Returns aggregated metrics for the project. See [insights-and-analytics.md](../../../dashboard/insights-and-analytics.md "mention").

#### Path Parameters

| Name                                        | Type   | Description |
| ------------------------------------------- | ------ | ----------- |
| projectId<mark style="color:red;">\*</mark> | string | Project ID  |

#### Query Parameters

| Name                                          | Type     | Description                                                                                         |
| --------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------- |
| date\_start<mark style="color:red;">\*</mark> | string (ISO 8601) | Start date for filtering the query results |
| date\_end<mark style="color:red;">\*</mark>   | string (ISO 8601) | End date for filtering the query results |
| resolution                                    | enum                            | Aggregation resolution. Values: `"1w"`, `"1d"`                                                     |
| tags\[]                                       | string   | Filter by tag names. Multiple values: `tags[]=valueA&tags[]=valueB` |
| branches\[]                                   | string   | Filter by branch names. Multiple values: `branches[]=valueA&branches[]=valueB` |



{% tabs %}
{% tab title="200: OK Successful Response" %}
<pre class="language-typescript" data-overflow="wrap"><code class="lang-typescript"><strong>type ResponsePayload = {
</strong>  status: "OK";
  data: ProjectInsights;
};

type ProjectInsights = {
  projectId: string;
  orgId: string;
  dateStart: string; // ISO date string
  dateEnd: string; // ISO date string
  resolution: string[]; 
  tags: string[];
  authors: string[];
  branches: string[];
  results: {
    overall: {
      runs: RunMetric;
      tests: TestMetric;
    };
    timeline: {
      [timestamp: number]: {
        runs: RunMetric;
        tests: TestMetric;
      };
    };
  };
};

type RunMetric = {
  total: number; // total number of runs for the period
  cancelled: number; // number of cancelled runs for the period
  timeouts: number; // number of timed-out runs for the period
  completed: number; // number of completed runs for the period
  failed: number; // number of failed runs for the period
  passed: number; // number of passed runs for the period
  avgDurationSeconds: number; // average duration of completed runs for the period
};

type TestMetric = {
  total: number; // total number of tests for the period
  failed: number; // number of failed tests for the period
  passed: number; // number of passed tests for the period
  pending: number; // number of pending tests for the period
  skipped: number; // number of skipped tests for the period
  flaky: number; // number of flaky tests for the period
};
</code></pre>
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
    "error": "Insufficient permissions to access project insights"
}
```
{% endtab %}

{% tab title="404: Not Found Project not found" %}
```javascript
{
    "status": "FAILED",
    "error": "Project not found"
}
```
{% endtab %}
{% endtabs %}

