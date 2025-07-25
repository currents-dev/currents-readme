---
description: API Reference - Spec Files resource
---

# Spec Files Explorer - API

This resource allows you to programmatically fetch Spec Files performance data that is available in [test-suite-performance-explorer](../../../dashboard/test-suite-performance-explorer/ "mention") > [spec-files-explorer.md](../../../dashboard/test-suite-performance-explorer/spec-files-explorer.md "mention")

{% hint style="info" %}
This resource uses **Offset Pagination** as documented at [pagination.md](../pagination.md "mention")
{% endhint %}

## List Spec Files

<mark style="color:blue;">`GET`</mark> `v1/spec-files/:projectId`

Querying this resource returns a list of spec files for a project, including the metrics calculated based on the data matching the provided filters.

The following metrics are available:

* `overallExecutions` - overall executions included in the aggregation.
* `avgDuration` - average duration of non-failed executions in seconds
  * Set `includeFailedInDuration` to `true` to include failed executions in the calculation
* `failedExecutions` - number of executions with at least 1 failed test.
* `flakyExecutions` - number of executions with at least 1 flaky test.
* `timeoutExecutions` - number of executions that were marked as timed out.
* `fullyReported` - count of executions with all known tests fully completed and reported
* `suiteSize` - maximum number of tests across all included executions
* `failureRate` - the ratio `failedExecutions` / `overallExecutions`
* `timeoutRate` - the ratio  `timeoutExecutions` / `overallExecutions`
* `flakeRate` - the ratio `flakyExecutions` / `overallExecutions`

#### Path Parameters

| Name                                        | Type   | Description     |
| ------------------------------------------- | ------ | --------------- |
| projectId<mark style="color:red;">\*</mark> | string | The project ID |

#### Query Parameters

| Name                                          | Type      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| --------------------------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| limit                                         | number    | Pagination limit 1-50. Default: `50`                                                                                                                                                                                                                                                                                                                                                                                                                             |
| page                                          | number    | Page 0+. Default: `0`. See [pagination.md](../pagination.md "mention")                                                                                                                                                                                                                                                                                                                                                                                           |
| date\_start<mark style="color:red;">\*</mark> | string (ISO 8601) | Start date for filtering test results within the specified date range |
| date\_end<mark style="color:red;">\*</mark>   | string (ISO 8601) | End date for filtering test results within the specified date range |
| tags\[]                                       | string\[] | Filter by tag names. Multiple values: `tags[]=valueA&tags[]=valueB` |
| authors\[]                                    | string\[] | Filter by author names. Multiple values: `authors[]=valueA&authors[]=valueB` |
| branches\[]                                   | string\[] | Filter by branch names. Multiple values: `branches[]=valueA&branches[]=valueB` |
| includeFailedInDuration                       | boolean   | Include failed spec files in average duration calculation. Default: `false` |
| order                                         | enum                            | Defines the attribute to order the spec files list. Values: `"avgDuration"`, `"failedExecutions"`, `"failureRate"`, `"flakeRate"`, `"flakyExecutions"`, `"fullyReported"`, `"overallExecutions"`, `"suiteSize"`, `"timeoutExecutions"`, `"timeoutRate"`. Default: `avgDuration` |
| specNameFilter                                | string    | Filter by spec file names containing this string. Default: empty |
| dir                                           | enum                            | Sorting direction. Values: `"asc"`, `"desc"`. Default: `desc` |



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
        "total": 44, // total number of spec files detected
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
    "error": "Insufficient permissions to access spec files"
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

