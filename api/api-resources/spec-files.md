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

The results will be sorted according to the `order` parameter. Using this query would allow to programmatically access the data that is available in [test-suite-performance-explorer](../../insights/test-suite-performance-explorer/ "mention").

{% hint style="info" %}
This resource uses **Offset Pagination** as documented at [pagination.md](../pagination.md "mention")
{% endhint %}

{% swagger method="get" path="spec-files/:projectId" baseUrl="v1/" summary="List the spec files associated to your specific organization and project" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="query" name="date_start" type="ISOString" required="true" %}
Date start - the test results included within the date range will be included.
{% endswagger-parameter %}

{% swagger-parameter in="query" required="true" name="date_end" type="ISOString" %}
Date end - the test results included within the date range will be included.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="limit" type="Number" required="false" %}
Pagination limit 1-50. Default: `50`
{% endswagger-parameter %}

{% swagger-parameter in="query" name="page" type="Number" %}
Page 0+. Default: `0`. See [pagination.md](../pagination.md "mention")
{% endswagger-parameter %}

{% swagger-parameter in="query" name="tags[]" type="String[]" %}
List of tags for filtering the included test results. To provide multiple values, use `tags[]=valueA&tags[]=valueB`
{% endswagger-parameter %}

{% swagger-parameter in="query" name="authors[]" type="String[]" %}
List of tags for filtering the included test results. To provide multiple values, use `authors[]=valueA&authors[]=valueB`
{% endswagger-parameter %}

{% swagger-parameter in="query" name="branches[]" type="String[]" %}
List of tags for filtering the included test results. To provide multiple values, use `branches[]=valueA&branches[]=valueB`
{% endswagger-parameter %}

{% swagger-parameter in="query" name="includeFailedInDuration" type="Boolean" %}
Include failed spec files in duration calculation. Default: `false`.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="order" type="Enum" %}
Defines the attribute to order the spec files list. Default: `avgDuration`. \


Valid values: `avgDuration, failedExecutions, failureRate, flakeRate, flakyExecutions, fullyReported, overallExecutions, suiteSize, timeoutExecutions, timeoutRate`
{% endswagger-parameter %}

{% swagger-parameter in="query" name="dir" type="Enum" %}
The direction of the spec files list sorting. Default: `desc`.\


Options: `asc, desc`.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="specNameFilter" type="String" %}
A string that is included in the spec file name. Default: empty.
{% endswagger-parameter %}

{% swagger-parameter type="String" in="path" name="projectId" required="true" %}
Your project ID
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Spec files list" %}
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
{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="Parameters failure" %}
```
{
    "status": "FAILED",
    "error": "\"date_start\" is mandatory"
}
```
{% endswagger-response %}

{% swagger-response status="404: Not Found" description="No project ID defined" %}
```
{
    "status": "FAILED",
    "error": "Not found"
}
```
{% endswagger-response %}
{% endswagger %}

