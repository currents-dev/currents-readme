---
description: API Reference for Spec Files resource
---

# Spec Files

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
* `timeoutRate` - the ratio `timeoutExecutions` / `overallExecutions`
* `flakeRate` - the ratio `flakyExecutions` / `overallExecutions`

#### Path Parameters

<table><thead><tr><th width="130.150146484375">Name</th><th width="129.7578125">Type</th><th>Description</th></tr></thead><tbody><tr><td>projectId<mark style="color:red;">*</mark></td><td>string</td><td>The project ID</td></tr></tbody></table>

#### Query Parameters

<table><thead><tr><th width="130.40625">Name</th><th width="129.896728515625">Type</th><th>Description</th></tr></thead><tbody><tr><td>limit</td><td>number</td><td>Pagination limit 1-50. Default: <code>50</code></td></tr><tr><td>page</td><td>number</td><td>Page 0+. Default: <code>0</code>. See <a data-mention href="../pagination.md">pagination.md</a></td></tr><tr><td>date_start<mark style="color:red;">*</mark></td><td>string (ISO 8601)</td><td>Start date for filtering test results within the specified date range</td></tr><tr><td>date_end<mark style="color:red;">*</mark></td><td>string (ISO 8601)</td><td>End date for filtering test results within the specified date range</td></tr><tr><td>tags[]</td><td>string[]</td><td>Filter by tag names. Multiple values: <code>tags[]=valueA&#x26;tags[]=valueB</code></td></tr><tr><td>authors[]</td><td>string[]</td><td>Filter by author names. Multiple values: <code>authors[]=valueA&#x26;authors[]=valueB</code></td></tr><tr><td>branches[]</td><td>string[]</td><td>Filter by branch names. Multiple values: <code>branches[]=valueA&#x26;branches[]=valueB</code></td></tr><tr><td>includeFailedInDuration</td><td>boolean</td><td>Include failed spec files in average duration calculation. Default: <code>false</code></td></tr><tr><td>order</td><td>enum</td><td>Defines the attribute to order the spec files list. Values: <code>"avgDuration"</code>, <code>"failedExecutions"</code>, <code>"failureRate"</code>, <code>"flakeRate"</code>, <code>"flakyExecutions"</code>, <code>"fullyReported"</code>, <code>"overallExecutions"</code>, <code>"suiteSize"</code>, <code>"timeoutExecutions"</code>, <code>"timeoutRate"</code>. Default: <code>avgDuration</code></td></tr><tr><td>specNameFilter</td><td>string</td><td>Filter by spec file names containing this string. Default: empty</td></tr><tr><td>dir</td><td>enum</td><td>Sorting direction. Values: <code>"asc"</code>, <code>"desc"</code>. Default: <code>desc</code></td></tr></tbody></table>

### Response

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
