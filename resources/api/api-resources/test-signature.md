---
description: API Reference - Test Signature resource
---

# Test Signature

Test Signature is a unique test identifier in Currents. Multiple recordings of the same test case share the same signature.

It is based on the combination of the organization ID, the project ID, the spec file path, and the test title.

## Generate Test Signature

<mark style="color:blue;">`POST`</mark> `v1/signature/test`

### **Request Body**

```json
{
    "projectId": "Currents project id",
    "specFilePath": "the spec file path",
    "testTitle": ["title part 1", "title part 2"]
}
```

#### Request Body Parameters

| Name                                           | Type           | Description                                                                                                   |
| ---------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------- |
| projectId<mark style="color:red;">\*</mark>     | string         | Project ID. See [projects](../../../dashboard/projects/ "mention") |
| specFilePath<mark style="color:red;">\*</mark>  | string         | Relative path to the test spec file. See [spec-files.md](spec-files.md "mention") and [#spec-file-path](test-signature.md#spec-file-path "mention") |
| testTitle<mark style="color:red;">\*</mark>     | string[] | Hierarchical test title array, e.g., `['describe', 'title']` |

### Response

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

{% tab title="400: Bad Request Invalid parameters" %}
```javascript
{
    "status": "FAILED",
    "error": "Missing required parameter: projectId"
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
    "error": "Insufficient permissions to generate test signatures"
}
```
{% endtab %}

{% tab title="422: Unprocessable Entity Invalid data" %}
```javascript
{
    "status": "FAILED",
    "error": "Invalid testTitle format. Must be a non-empty array"
}
```
{% endtab %}
{% endtabs %}

### Spec File Path

Spec file path is the filesystem path as reported by your test runner. Some test runners (e.g., Postman) use the associated collection name. Examples:

* `navigation.spec.ts`
* `e2e/navigation/menu.spec.ts`
* `Render Embed Pages`  (Postman collection name)

### Test Title

Test title is an array of strings representing the canonical title of the test in the suite, including test group names. For example:

```typescript
test.describe("navigation", () => {
    test("menu should open", () => {
        // ...
    }
})
```

Becomes `['navigation', 'menu should open']`

You can also send a single string with test title elements joined by `>`, e.g.: `navigation > menu should open`

