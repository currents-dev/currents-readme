---
description: API Reference - Gets a test signature
---

# Test Signature

The test signature is a unique hash identifier for a specific test in our system. It is based in the combination of the organization ID, the project ID, the spec file where the test belongs to and the test title.

This combination ensures uniqueness to identify a specific test for metrics purposes and runs completion awareness.

## Get Test Signature

<mark style="color:blue;">`POST`</mark> `v1/signature/test`

**Request Body**

```json
{
    "projectId": "your project id",
    "specFilePath": "the spec file path",
    "testTitle": ["title part 1", "title part 2"]
}
```

The properties sent in the request are needed to get the correct test signature.

<table><thead><tr><th width="143">Property</th><th width="199">Type</th><th width="91">Required</th><th>Description</th></tr></thead><tbody><tr><td>projectId</td><td>String</td><td>Yes</td><td>Refers to the project ID where the test can/will be found. <a data-mention href="../../../dashboard/projects/">projects</a></td></tr><tr><td>specFilePath</td><td>String</td><td>Yes</td><td>Is the spec file name with its full relative path, where the test belongs to. <a data-mention href="spec-files.md">spec-files.md</a> </td></tr><tr><td>testTitle</td><td>Array&#x3C;String> | String</td><td>Yes</td><td>Title of the test that is usually divided in multiple strings. Can also be sent as an string by copying directly from the dashboard.</td></tr></tbody></table>

#### Spec File Path

The spec file path is a string but it may be just the name of the spec file like this example:

<figure><img src="../../../.gitbook/assets/image (1) (2).png" alt=""><figcaption><p>Spec File Path with file name with extension</p></figcaption></figure>

Can also be a name without file extensions (Usually in JUnit payloads [Broken link](broken-reference "mention"))

<figure><img src="../../../.gitbook/assets/image (21).png" alt=""><figcaption><p>Spec File Path with common name</p></figcaption></figure>

Or might also be a full relative path to a file

<figure><img src="../../../.gitbook/assets/image (22).png" alt=""><figcaption><p>Spec File Path with complete file path</p></figcaption></figure>

It is important that the spec file path is set exactly to how it is reported to Currents otherwise it will not return a test signature that matches a test reported to Currents.

#### Test Title

The test title in Currents is always an array reported by the framework and refers to the title of the test.

This array can have a single element and show as a single phrase:

<figure><img src="../../../.gitbook/assets/image (23).png" alt=""><figcaption><p>Test title with single element</p></figcaption></figure>

Or can also be made up of multiple elements, like when there are multiple nested `describe`  groups and within those the `it` functions defining each test. For this case the title looks like this:

<figure><img src="../../../.gitbook/assets/image (24).png" alt=""><figcaption><p>Test title with multiple elements</p></figcaption></figure>

This last example can be visualized as follows in an array:

```json
[
 "Rended Embed pages",
 "should have a 200 resonse and expected response headers"
]
```

In the spec file might look like this:

```javascript
describe('Rended Embed pages', function() {
  it('should have a 200 resonse and expected response headers', function() { ... });
});
```

The Test signature endpoint can also accept the string copied from the dashboard as `testTitle` property for ease of use, meaning you could simply send the title you see in the dashboard instead of an array:

```
{
    "projectId": "your project id",
    "specFilePath": "the spec file path",
    "testTitle": "Rended Embed pages > should have a 200 response and expected response headers"
}
```



{% hint style="info" %}
It is important to understand how the Spec File Path and Test Title is formed so the information sent to the API is correct.
{% endhint %}

{% tabs %}
{% tab title="200: OK Successful Response" %}
{% code overflow="wrap" %}
```typescript
type ResponsePayload = {
  status: "OK";
  data: {
    signature: string;
  }
};
```
{% endcode %}
{% endtab %}

{% tab title="400: FAILED Bad Request " %}
```typescript
type ResponsePayload = {
  status: "FAILED";
  error: string;
};
```
{% endtab %}
{% endtabs %}

