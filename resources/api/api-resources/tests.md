---
description: API Reference for Test resource
---

# Tests

This resource allows you to programmatically fetch Test performance data that is available in [tests-explorer.md](../../../dashboard/test-suite-performance-explorer/tests-explorer.md "mention"). See [test-results.md](test-results.md "mention") if you are looking to get all the results for a particular test case.

{% hint style="info" %}
This resource uses **Offset Pagination** as documented at [pagination.md](../pagination.md "mention")
{% endhint %}

## List Tests <a href="#list-spec-files" id="list-spec-files"></a>

<mark style="color:blue;">`GET`</mark> `v1/tests/:projectId`

Querying this resource returns a list of tests for a project, including the metrics calculated based on the data matching the provided filters.

#### Path Parameters

<table><thead><tr><th width="130.1024169921875">Parameter</th><th width="130.4522705078125">Type</th><th>Description</th></tr></thead><tbody><tr><td>projectId<mark style="color:red;">*</mark></td><td>string</td><td>The project ID</td></tr></tbody></table>

#### Query Parameters

<table><thead><tr><th width="129.5728759765625">Parameter</th><th width="129.9697265625">Type</th><th>Description</th></tr></thead><tbody><tr><td>date_start<mark style="color:red;">*</mark></td><td><sub>string (ISO 8601)</sub></td><td>Start date for filtering test results within the specified date range</td></tr><tr><td>date_end<mark style="color:red;">*</mark></td><td><sub>string (ISO 8601)</sub></td><td>End date for filtering test results within the specified date range</td></tr><tr><td>limit</td><td>number</td><td>Pagination limit 1-50. Default: 50</td></tr><tr><td>page</td><td>number</td><td>Page number for pagination. Default: 0</td></tr><tr><td>tags[]</td><td>string[]</td><td>Filter by tag names. Multiple values: tags[]=valueA&#x26;tags[]=valueB</td></tr><tr><td>authors[]</td><td>string[]</td><td>Filter by author names. Multiple values: authors[]=valueA&#x26;authors[]=valueB</td></tr><tr><td>branches[]</td><td>string[]</td><td>Filter by branch names. Multiple values: branches[]=valueA&#x26;branches[]=valueB</td></tr><tr><td>groups[]</td><td>string[]</td><td>Filter by group names. Multiple values: groups[]=valueA&#x26;groups[]=valueB</td></tr><tr><td>order</td><td>enum</td><td>Defines the attribute to order the tests list. Values: <code>duration</code>, <code>executions</code>, <code>failures</code>, <code>flakiness</code>, <code>passes</code>, <code>title</code>, <code>durationXSamples</code>, <code>failRateXSamples</code>, <code>failureRateDelta</code>, <code>flakinessRateDelta</code>, <code>flakinessXSamples.</code> Default: <code>title</code><br><br><br></td></tr><tr><td>dir</td><td>enum</td><td>Sorting direction. Values: <code>"asc"</code>, <code>"desc"</code>. Default: <code>"desc"</code></td></tr><tr><td>spec</td><td>string</td><td>Filter by spec file names containing this string.</td></tr><tr><td>title</td><td>string</td><td>Filter by test titles containing this string.</td></tr></tbody></table>

<sub>The following query parameters affect the metrics calculation. See</sub> [tests-explorer.md](../../../dashboard/test-suite-performance-explorer/tests-explorer.md "mention").

<table><thead><tr><th width="130.345458984375">Parameter</th><th width="129.4495849609375">Type</th><th>Description</th></tr></thead><tbody><tr><td>min_executions</td><td>number</td><td>Filter results to those that has at least the number of executions defined on this parameter.</td></tr><tr><td>test_state[]</td><td>enum[]</td><td>Filter metrics calculations: <code>executions</code> and <code>avgDuration</code> to only calculate those with status defined in the  list of this parameter.<br>Values: <code>failed</code>, <code>passed</code>, <code>pending</code>, <code>skipped</code></td></tr></tbody></table>

### Response

{% tabs %}
{% tab title="200 OK: Tests Explorer" %}


```json
{
    "status": "OK",
    "data": {
        "list": [
            {
                "title": "should display welcome message",
                "signature": "326aafb71c1fda3085ebde3671f230f0",
                "spec": "feature.onboarding-25.spec.ts",
                "metrics": {
                    "executions": 2,
                    "failures": 2,
                    "ignored": 1,
                    "passes": 10,
                    "flaky": 1,
                    "flakinessRate": 0.1,
                    "failureRate": 0.2,
                    "avgDuration": 1500,
                    "flakinessVolume": 150,
                    "failureVolume": 300,
                    "durationVolume": 15000
                },
                "latestTag": [
                    "development",
                    "PL"
                ],
                "lastSeen": "2024-01-15T00:00:00.000Z"
            }
        ],
        "total": 44, // total number of tests detected
        "nextPage": 1 // offset pagination hint (number or false)
    }
}
```
{% endtab %}

{% tab title="400: Bad request parameters failure" %}
```json
{
    "status": "FAILED",
    "error": "\"date_start\" is mandatory"
}
```
{% endtab %}

{% tab title="401: Unauthorized/invalid API key" %}
```json
{
    "status": "FAILED",
    "error": "Invalid API key provided"
}
```
{% endtab %}
{% endtabs %}

### Response Fields

#### Data

<table><thead><tr><th width="129.5859375">Field</th><th width="130.1676025390625">Type</th><th>Description</th></tr></thead><tbody><tr><td>list</td><td>Array&#x3C;<a href="tests.md#test">Test</a>></td><td>Array that contains the list of tests.</td></tr></tbody></table>

#### **Test**

<table><thead><tr><th width="129.3211669921875">Field</th><th width="129.2257080078125">Type</th><th>Description</th></tr></thead><tbody><tr><td>title</td><td>string</td><td>The title/name of the test</td></tr><tr><td>signature</td><td>string</td><td>Unique signature identifying the test. See <a data-mention href="test-signature.md">test-signature.md</a></td></tr><tr><td>spec</td><td>string</td><td>Name of the spec file containing the test</td></tr><tr><td>metrics</td><td><a href="tests.md#metrics">Metrics</a></td><td>Performance metrics for the test</td></tr><tr><td>latestTag</td><td>string[]</td><td>List of latest tags used with the test</td></tr><tr><td>lastSeen</td><td><sub>string (ISO 8601)</sub></td><td>Date when the test was last seen</td></tr></tbody></table>

#### **Metrics**

<table><thead><tr><th width="129.881103515625">Field</th><th width="129.6943359375">Type</th><th>Description</th></tr></thead><tbody><tr><td>executions</td><td>number</td><td>Number of total executions</td></tr><tr><td>failures</td><td>number</td><td>Number of failed executions</td></tr><tr><td>ignored</td><td>number</td><td>Number of ignored executions</td></tr><tr><td>passes</td><td>number</td><td>Number of passed executions</td></tr><tr><td>flaky</td><td>number</td><td>Number of flaky executions</td></tr><tr><td>flakinessRate</td><td>number</td><td>Ratio of flaky executions (0-1)</td></tr><tr><td>failureRate</td><td>number</td><td>Ratio of failed executions (0-1)</td></tr><tr><td><sub>avgDurationMs</sub></td><td>number</td><td>Average duration in milliseconds</td></tr><tr><td><sub>flakinessVolume</sub></td><td>number</td><td>Flakiness Volume. See <a data-mention href="../../../dashboard/test-suite-performance-explorer/tests-explorer.md">tests-explorer.md</a></td></tr><tr><td><sub>failureVolume</sub></td><td>number</td><td>Failure Volume. See <a data-mention href="../../../dashboard/test-suite-performance-explorer/tests-explorer.md">tests-explorer.md</a></td></tr><tr><td><sub>durationVolume</sub></td><td>number</td><td>Duration Volume. See <a data-mention href="../../../dashboard/test-suite-performance-explorer/tests-explorer.md">tests-explorer.md</a></td></tr></tbody></table>

### Usage Examples

**Basic Request**

```bash
GET /v1/tests/project123?date_start=2024-01-01&date_end=2024-01-31
```

**Filters and Pagination**

```bash
GET /v1/tests/project123?date_start=2024-01-01&date_end=2024-01-31&tags[]=smoke&tags[]=regression&authors[]=john.doe&limit=25&page=1&order=failureRate&dir=desc
```

**Search Filters**

```bash
GET /v1/tests/project123?date_start=2024-01-01&date_end=2024-01-31&spec=login&title=authentication
```
