---
description: Using Playwright Annotations to enhance reporting to Currents dashboard
icon: note-sticky
---

# Playwright Annotations

{% hint style="info" %}
Requires `@currents/playwright` 1.5.0+
{% endhint %}

[Playwright Annotations](https://playwright.dev/docs/test-annotations) is a flexible way to add additional information about tests, like:

* ownership information
* metadata
* links to external resources (Jira ticket, GitHub issue)
* notes

Together with [playwright-tags.md](playwright-tags.md "mention") it allows augmenting your testing suite with metadata for easier managing, better reporting and improved integrations.&#x20;

You can add an annotation to a test by:

* adding `annotations` object to `test` definition or
* calling `testInfo.annotations.push`

For example:

```typescript
test("annotated test", {
    annotation: {
      type: "issue",
      description: "https://github.com/microsoft/playwright/issues/23180",
    },
}, async ({ page }, testInfo) => {
  testInfo.annotations.push({
    type: "note",
    description: "This is a note",
  });

  testInfo.annotations.push({
    type: "jira",
    description: "https://jira.company.io/ticket/JIRA-123",
  });

  testInfo.annotations.push({
    type: "owner",
    description: "johnsmith",
  });
});
```

Currents shows the annotations for the test:

<figure><img src="../.gitbook/assets/Screenshot 2026-01-09 at 19.04.22.png" alt=""><figcaption><p>Playwright annotations in Currents</p></figcaption></figure>

## Limitations

Currents applies the following rules when parsing annotations:

* types: `skip, fixme, fail, slow` are reserved by Playwright
* `32` max distinct annotations per test, extra annotations will be removed (sorted by the order of appearance)
* `type` field is limited to `256` characters, the values are trimmed and truncated to the max length
* `description` field is limited to `2048` characters, the values are trimmed and truncated to the max length
* If `type` is empty after trimming, the annotation is ignored

## Source and Deduplication

Annotations can originate from test case definition or at runtime from test execution attempt.

* Currents deduplicates annotations with exactly the same type, description and source.
* Currents removes attempt-level annotation if there's an equivalent test-case annotation

## Annotation: Test Owner&#x20;

While Currents displays all the annotations related to a test, some annotation have a special meaning, for example - test owner.

To designate an owner of a test, add annotation with `type: owner`, for example:

```
testInfo.annotations.push({
  type: "owner",
  description: "johnsmith",
});
```

The value will appear in various areas of the dashboard so that your team can quickly identify the who owns the test.

<figure><img src="../.gitbook/assets/Screenshot 2026-01-15 at 17.46.22.png" alt=""><figcaption><p>Showing test owner using annotations in Currents </p></figcaption></figure>

## Annotation: Slack Notifications

The documentation migrated to [#annotation-based-mentions](../resources/integrations/slack/slack-app.md#annotation-based-mentions "mention")

## Annotation:  Custom Metrics

{% hint style="info" %}
Custom metric is an experimental feature. We are gathering feedback to refine and improve it.
{% endhint %}

#### Recording Custom Metrics

Annotation of type `currents:metric` allows tracking arbitrary metrics associated with your tests, for example:

* page performance
* accessibility score
* memory consumption
* network response timing



Use annotation  `type` of `currents:metric` and a serialized JSON object in `description`  to define a metric. For example:

{% code overflow="wrap" %}
```typescript
{
  type: "currents:metric",
  description: JSON.stringify({
    "name": "memory_usage", 
    "value": 540.3, 
    "type": "float",
    "unit": "mb"
  }),
}
```
{% endcode %}

The JSON string must contain `name` and `value`. And optionally can contain `type` and `unit` .&#x20;

<table><thead><tr><th width="146.32421875">Parameter</th><th width="106.8671875">Type</th><th>Description</th></tr></thead><tbody><tr><td>name<mark style="color:red;">*</mark></td><td>string</td><td>The name of the metric you want to track.</td></tr><tr><td>value<mark style="color:red;">*</mark></td><td>number</td><td>The current value of the metric you want to track.</td></tr><tr><td>type</td><td>enum</td><td>The value type. Values: <code>float</code>, <code>integer</code>. Default: <code>float</code></td></tr><tr><td>unit</td><td>enum</td><td>The unit to show in the dashboard. Values: <code>none</code>, <code>ms</code>, <code>s</code>, <code>%</code>, <code>b</code> , <code>kb</code> , <code>mb</code> , <code>gb</code> Default: <code>none</code>  </td></tr></tbody></table>

For example, the following test captures page load time as a custom metric metrics:

```typescript
test("performance test example", async ({ page }) => {
  await page.goto(`https://example.com`);
  const [performanceTiming] = await page.evaluate(() => {
    const [timing] = performance.getEntriesByType(
      "navigation"
    ) as PerformanceNavigationTiming[];
    return [timing];
  });
  // Get the start to load event end time
  const startToLoadEventEnd =
    performanceTiming.loadEventEnd - performanceTiming.startTime;
    
  // Add the custom metric to the annotations
  test
    .info()
    .annotations.push({
      type: "currents:metric",
      description: JSON.stringify({
        name: "page-performance",
        value: startToLoadEventEnd,
        type: "float",
        unit: "ms",
      }),
    });
});
```

#### Browsing Custom Metrics

The custom metrics are available in [#test-results](../dashboard/insights-and-analytics.md#test-results "mention") chart. Use "Custom Metric" control to browse the available metrics and aggregation functions.&#x20;

<div data-with-frame="true"><figure><img src="../.gitbook/assets/Screenshot 2026-01-15 at 17.51.19.png" alt=""><figcaption><p>Custom metric selection</p></figcaption></figure></div>
