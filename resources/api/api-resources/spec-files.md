---
description: API Reference - Spec Files resource
---

# Spec Files

This resource represents the spec files and their performance metrics, computed based on the recorded results.

Querying this resource will fetch all the executions recorded between `date_start`, `date_end` with all the filters applied, group the results by spec file name and calculate metrics:

* `overallExecutions` - overall executions included in the aggregation.
* `avgDuration` - an average value of the durations for non-failed executions, measured in seconds; set `includeFailedInDuration` to `true` to include failed executions in the calculation
* `failedExecutions` - count of executions with at least 1 failed test.
* `flakyExecutions` - count of executions with at least 1 flaky test.
* `timeoutExecutions` - count of executions that were marked as timed out.
* `fullyReported` - count of executions that were fully reported - i.e. all the known tests fully completed and reported the results
* `suiteSize` - maximum number of tests across all the included executions
* `failureRate` - the ratio of `failedExecutions` / `overallExecutions`
* `timeoutRate` - the ratio of `timeoutExecutions` / `overallExecutions`
* `flakeRate` - the ratio of `flakyExecutions` / `overallExecutions`

The results will be sorted according to the `order` parameter. Using this query would allow to programmatically access the data that is available in [test-suite-performance-explorer](../../../dashboard/test-suite-performance-explorer/ "mention").

{% hint style="info" %}
This resource uses **Offset Pagination** as documented at [pagination.md](../pagination.md "mention")
{% endhint %}

## List the spec files associated to your specific organization and project

<mark style="color:blue;">`GET`</mark> `v1/spec-files/:projectId`

#### Path Parameters

<table><thead><tr><th width="184">Name</th><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>projectId<mark style="color:red;">*</mark></td><td>String</td><td>Your project ID</td></tr></tbody></table>

#### Query Parameters

| Name                                          | Type      | Description                                                                                                                                                                                                                                                                             |
| --------------------------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| limit                                         | Number    | Pagination limit 1-50. Default: `50`                                                                                                                                                                                                                                                    |
| page                                          | Number    | Page 0+. Default: `0`. See [pagination.md](../pagination.md "mention")                                                                                                                                                                                                                  |
| date\_start<mark style="color:red;">\*</mark> | ISOString | Date start - the test results included within the date range will be included.                                                                                                                                                                                                          |
| date\_end<mark style="color:red;">\*</mark>   | ISOString | Date end - the test results included within the date range will be included.                                                                                                                                                                                                            |
| tags\[]                                       | String\[] | List of tags for filtering the included test results. To provide multiple values, use `tags[]=valueA&tags[]=valueB`                                                                                                                                                                     |
| authors\[]                                    | String\[] | List of authors for filtering the included test results. To provide multiple values, use `authors[]=valueA&authors[]=valueB`                                                                                                                                                            |
| branches\[]                                   | String\[] | List of branches for filtering the included test results. To provide multiple values, use `branches[]=valueA&branches[]=valueB`                                                                                                                                                         |
| includeFailedInDuration                       | Boolean   | Include failed spec files in duration calculation. Default: `false`.                                                                                                                                                                                                                    |
| order                                         | Enum      | <p>Defines the attribute to order the spec files list. Default: <code>avgDuration</code>. <br></p><p>Valid values: <code>avgDuration, failedExecutions, failureRate, flakeRate, flakyExecutions, fullyReported, overallExecutions, suiteSize, timeoutExecutions, timeoutRate</code></p> |
| specNameFilter                                | String    | A string that is included in the spec file name. Default: empty.                                                                                                                                                                                                                        |
| dir                                           | Enum      | <p>The direction of the spec files list sorting. Default: <code>desc</code>.<br></p><p>Options: <code>asc, desc</code>.</p>                                                                                                                                                             |

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

