---
description: API Reference - Spec Files resource
---

# Spec Files Explorer - API

This resource allow to programmatically fetch Spec Files performance data that is available in [test-suite-performance-explorer](../../../dashboard/test-suite-performance-explorer/ "mention") > [spec-files-explorer.md](../../../dashboard/test-suite-performance-explorer/spec-files-explorer.md "mention")

{% hint style="info" %}
This resource uses **Offset Pagination** as documented at [pagination.md](../pagination.md "mention")
{% endhint %}

## List Spec Files

<mark style="color:blue;">`GET`</mark> `v1/spec-files/:projectId`

Querying this resource returns a list of spec files for a project, including the metrics calculated based on the data matching the provided filters.

The following metrics are available:

* `overallExecutions` - overall executions included in the aggregation.
* `avgDuration` - average duration of non-failed executions, in seconds;&#x20;
  * set `includeFailedInDuration` to `true` to include failed executions in the calculation
* `failedExecutions` - number of executions with at least 1 failed test.
* `flakyExecutions` - number of executions with at least 1 flaky test.
* `timeoutExecutions` - number of executions that were marked as timed out.
* `fullyReported` - count of executions with all the known tests fully completed and reported
* `suiteSize` - maximum number of tests across all the included executions
* `failureRate` - the ratio `failedExecutions` / `overallExecutions`
* `timeoutRate` - the ratio  `timeoutExecutions` / `overallExecutions`
* `flakeRate` - the ratio `flakyExecutions` / `overallExecutions`

#### Path Parameters

| Name                                        | Type   | Description     |
| ------------------------------------------- | ------ | --------------- |
| projectId<mark style="color:red;">\*</mark> | String | Your project ID |

#### Query Parameters

| Name                                          | Type      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| --------------------------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| limit                                         | Number    | Pagination limit 1-50. Default: `50`                                                                                                                                                                                                                                                                                                                                                                                                                             |
| page                                          | Number    | Page 0+. Default: `0`. See [pagination.md](../pagination.md "mention")                                                                                                                                                                                                                                                                                                                                                                                           |
| date\_start<mark style="color:red;">\*</mark> | ISOString | Date start - the test results included within the date range will be included.                                                                                                                                                                                                                                                                                                                                                                                   |
| date\_end<mark style="color:red;">\*</mark>   | ISOString | Date end - the test results included within the date range will be included.                                                                                                                                                                                                                                                                                                                                                                                     |
| tags\[]                                       | String\[] | List of tags for filtering the included test results. To provide multiple values, use `tags[]=valueA&tags[]=valueB`                                                                                                                                                                                                                                                                                                                                              |
| authors\[]                                    | String\[] | List of authors for filtering the included test results. To provide multiple values, use `authors[]=valueA&authors[]=valueB`                                                                                                                                                                                                                                                                                                                                     |
| branches\[]                                   | String\[] | List of branches for filtering the included test results. To provide multiple values, use `branches[]=valueA&branches[]=valueB`                                                                                                                                                                                                                                                                                                                                  |
| includeFailedInDuration                       | Boolean   | Include failed spec files in duration calculation. Default: `false`.                                                                                                                                                                                                                                                                                                                                                                                             |
| order                                         | Enum      | <p>Defines the attribute to order the spec files list. Default: <code>avgDuration</code>. <br></p><p>Valid values: </p><p><code>avgDuration</code></p><p><code>failedExecutions</code></p><p><code>failureRate</code></p><p><code>flakeRate</code></p><p><code>flakyExecutions</code></p><p><code>fullyReported</code></p><p><code>overallExecutions</code></p><p><code>suiteSize</code></p><p><code>timeoutExecutions</code></p><p><code>timeoutRate</code></p> |
| specNameFilter                                | String    | A string that is included in the spec file name. Default: empty.                                                                                                                                                                                                                                                                                                                                                                                                 |
| dir                                           | Enum      | <p>Sorting direction. Default: <code>desc</code>.<br></p><p>Options: <code>asc, desc</code></p>                                                                                                                                                                                                                                                                                                                                                                  |



{% tabs %}
{% tab title="200: OK Spec files list" %}
```javascript
{
    "status": "OK",
    "data": {
        "list": [
            {
                "signature": "326aafb71c1fda3085ebde3671f230f0",
                "spec": "feature.onboarding-25.spec.ts",
                "metrics": {
                    "overallExecutions": 3,
                    "avgDuration": 13184,
                    "failedExecutions": 0,
                    "flakyExecutions": 0,
                    "timeoutExecutions": 0,
                    "suiteSize": 2,
                    "failureRate": 0,
                    "timeoutRate": 0,
                    "flakeRate": 0,
                    "fullyReported": 3
                }
            }
        ],
        "total": 44, // the total number of spec files detected
        "nextPage": number | false // offset pagination hint
    }
}
```
{% endtab %}

{% tab title="400: Bad Request Parameters failure" %}
```
{
    "status": "FAILED",
    "error": "\"date_start\" is mandatory"
}
```
{% endtab %}

{% tab title="404: Not Found No project ID defined" %}
```
{
    "status": "FAILED",
    "error": "Not found"
}
```
{% endtab %}
{% endtabs %}

