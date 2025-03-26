---
description: API Reference - Projects resource
---

# Projects

This is an object representing your Currents project. You can retrieve the list of projects for your organization, get specific project details, and retrieve the list of runs for a project.

## List the projects associated with your organization

<mark style="color:blue;">`GET`</mark> `v1/projects`

#### Query Parameters

| Name             | Type   | Description                                                        |
| ---------------- | ------ | ------------------------------------------------------------------ |
| limit            | 1-100  | Pagination limit 1-50. Default 10.                                 |
| starting\_before | String | Pagination cursor. See [pagination.md](../pagination.md "mention") |
| ending\_after    | String | Pagination cursor. See [pagination.md](../pagination.md "mention") |

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
{% endtabs %}

## Get project item

<mark style="color:blue;">`GET`</mark> `v1/projects/:projectId`

#### Path Parameters

| Name                                        | Type   | Description |
| ------------------------------------------- | ------ | ----------- |
| projectId<mark style="color:red;">\*</mark> | String | Project ID  |

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
{% endtabs %}

## List the runs associated with the project

<mark style="color:blue;">`GET`</mark> `v1/projects/:projectId/runs`

#### Path Parameters

| Name                                        | Type   | Description |
| ------------------------------------------- | ------ | ----------- |
| projectId<mark style="color:red;">\*</mark> | String | Project ID  |

#### Query Parameters

| Name             | Type   | Description                                                        |
| ---------------- | ------ | ------------------------------------------------------------------ |
| limit            | 1-50   | Pagination limit 1-50. Default 10.                                 |
| starting\_before | String | Pagination cursor. See [pagination.md](../pagination.md "mention") |
| ending\_after    | String | Pagination cursor. See [pagination.md](../pagination.md "mention") |

{% tabs %}
{% tab title="200: OK " %}
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
            "completionState": "COMPLETE", // "CANCELED" | "COMPLETE" | "IN_PROGRESS" | "TIMEOUT"
            "status": "FAILED", // "FAILED" | "FAILING" | "PASSED" | "RUNNING"
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
{% endtab %}
{% endtabs %}

## Get project insights - aggregated metrics for runs, spec files and tests

<mark style="color:blue;">`GET`</mark> `v1/projects/:projectId/insights`

#### Path Parameters

| Name                                        | Type   | Description |
| ------------------------------------------- | ------ | ----------- |
| projectId<mark style="color:red;">\*</mark> | String | Project ID  |

#### Query Parameters

| Name                                          | Type     | Description                                                                                         |
| --------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------- |
| date\_start<mark style="color:red;">\*</mark> | String   | ISO Date format indicating the start date for the query                                             |
| date\_end<mark style="color:red;">\*</mark>   | String   | ISO Date format indicating the end date for the query                                               |
| resolution                                    | 1w \| 1d | Aggregation resolution. Valid values are "1w" or "1d"                                               |
| tags\[]                                       | String   | List of tags for filtering the query. To provide multiple values, use `tags[]=valueA&tags[]=valueB` |
| branches\[]                                   | String   | List of branches for filtering the query. `branches[]=valueA&branches[]=valueB`                     |



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
  total: number; // overall # of runs for the period
  cancelled: number; // # of runs for the period
  timeouts: number; // # of timed-out runs for the period
  completed: number; // # of completed runs for the period
  failed: number; // # of failed  runs for the period
  passed: number; // # of passed runs for the period
  avgDurationSeconds: number; // avg duration of completed runs for the period
};

type TestMetric = {
  total: number; // overall # of tests for the period
  failed: number; // # of failed tests for the period
  passed: number; // # of passed tests for the period
  pending: number; // # of pending tests for the period
  skipped: number; // # of skipped tests for the period
  flaky: number; // # of flaky tests for the period
};
</code></pre>
{% endtab %}
{% endtabs %}

