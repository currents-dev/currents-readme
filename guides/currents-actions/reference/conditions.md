---
description: Reference documentation of Conditions that are available for Currents Actions
---

# Conditions

An Actions can have one or more conditions. You can use `AND` or  `OR` combinator for multiple conditions. Use comma-separated strings to define list values.

### Fields

#### <mark style="color:purple;">File</mark>

Test filename path, for example `path/to/file.spec.ts`.

| Field Type          | `string`                                                                                                                                                                     |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Value Types         | `string \| string[]`                                                                                                                                                         |
| Supported Operators | <p><a data-mention href="conditions.md#basic-operators">#basic-operators</a></p><p><a data-mention href="conditions.md#one-to-many-operators">#one-to-many-operators</a></p> |

#### <mark style="color:purple;">Test Title</mark>

Test title, for example in test definition `test("should open landing page")` it is `should open landing page`.

| Field Type          | `string`                                                                                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Value Types         | `string \| string[]`                                                                                                                                                      |
| Supported Operators | <p><a data-mention href="conditions.md#basic-operators">#basic-operators</a><br><a data-mention href="conditions.md#one-to-many-operators">#one-to-many-operators</a></p> |

<mark style="color:purple;">**Test Title Path**</mark>

Full title path as an array including named `describe` statements.  `['Todo App', 'should be able to add new items']`

| Field Type          | `string[]`                                                                                                                           |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Value Types         | `string \| string[]`                                                                                                                 |
| Supported Operators | [#basic-operators](conditions.md#basic-operators "mention")[#many-to-many-operators](conditions.md#many-to-many-operators "mention") |

#### <mark style="color:purple;">Test ID</mark>

Playwright [test id](https://playwright.dev/docs/api/class-testinfo#test-info-test-id), matching the test case id in the [Reporter API](https://playwright.dev/docs/api/class-reporter).

| Field Type          | `string`                                                                                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Value Types         | `string \| string[]`                                                                                                                                                      |
| Supported Operators | <p><a data-mention href="conditions.md#basic-operators">#basic-operators</a><br><a data-mention href="conditions.md#one-to-many-operators">#one-to-many-operators</a></p> |

#### <mark style="color:purple;">Tags</mark>

Test tag list. For example, if a test has the following list of tags `['a', 'b']`, each value in the list will be evaluated separately.

| Field Type          | `string[]`                                                                                                                                                                  |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Value Types         | `string \| string[]`                                                                                                                                                        |
| Supported Operators | <p><a data-mention href="conditions.md#basic-operators">#basic-operators</a><br><a data-mention href="conditions.md#many-to-many-operators">#many-to-many-operators</a></p> |

#### <mark style="color:purple;">Project</mark>

Playwright project name as defined in your `playwright.config.ts`.&#x20;

| Field Type          | `string`                                                                                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Value Types         | `string \| string[]`                                                                                                                                                      |
| Supported Operators | <p><a data-mention href="conditions.md#basic-operators">#basic-operators</a><br><a data-mention href="conditions.md#one-to-many-operators">#one-to-many-operators</a></p> |

#### <mark style="color:purple;">Git Author Email</mark>

Git commit author email. See [commit-information.md](../../../dashboard/runs/commit-information.md "mention") to explore how Currents collects git commit information.

| Field Type          | `string`                                                                                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Value Types         | `string \| string[]`                                                                                                                                                      |
| Supported Operators | <p><a data-mention href="conditions.md#basic-operators">#basic-operators</a><br><a data-mention href="conditions.md#one-to-many-operators">#one-to-many-operators</a></p> |

#### <mark style="color:purple;">Git Author Branch</mark>

Git commit author name. See [commit-information.md](../../../dashboard/runs/commit-information.md "mention") to explore how Currents collects git commit information.

| Field Type          | `string`                                                                                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Value Types         | `string \| string[]`                                                                                                                                                      |
| Supported Operators | <p><a data-mention href="conditions.md#basic-operators">#basic-operators</a><br><a data-mention href="conditions.md#one-to-many-operators">#one-to-many-operators</a></p> |

#### <mark style="color:purple;">Git Branch</mark>

Git commit branch name. See [commit-information.md](../../../dashboard/runs/commit-information.md "mention") to explore how Currents collects git commit information.

| Field Type          | `string`                                                                                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Value Types         | `string \| string[]`                                                                                                                                                      |
| Supported Operators | <p><a data-mention href="conditions.md#basic-operators">#basic-operators</a><br><a data-mention href="conditions.md#one-to-many-operators">#one-to-many-operators</a></p> |

#### <mark style="color:purple;">Git Message</mark>

Git commit message. See [commit-information.md](../../../dashboard/runs/commit-information.md "mention") to explore how Currents collects git commit information.

| Field Type          | `string`                                                                                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Value Types         | `string \| string[]`                                                                                                                                                      |
| Supported Operators | <p><a data-mention href="conditions.md#basic-operators">#basic-operators</a><br><a data-mention href="conditions.md#one-to-many-operators">#one-to-many-operators</a></p> |

#### <mark style="color:purple;">Git Remote Origin</mark>

Git remote origin URL. See [commit-information.md](../../../dashboard/runs/commit-information.md "mention") to explore how Currents collects git commit information.

| Field Type          | `string`                                                                                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Value Types         | `string \| string[]`                                                                                                                                                      |
| Supported Operators | <p><a data-mention href="conditions.md#basic-operators">#basic-operators</a><br><a data-mention href="conditions.md#one-to-many-operators">#one-to-many-operators</a></p> |

### Operators

#### Basic operators

Available for all fields.

<table data-full-width="false"><thead><tr><th>Operator</th><th>Description</th></tr></thead><tbody><tr><td><code>is</code></td><td>exact match</td></tr><tr><td><code>is not</code></td><td>the value is different</td></tr><tr><td><code>is any</code></td><td>fields doesn't exists, <code>undefined</code>or <code>null</code></td></tr><tr><td><code>is empty</code></td><td>field has no value</td></tr></tbody></table>

#### One to Many operators

Used to match a single value field (eg Test Title), against a list of values.

<table data-full-width="false"><thead><tr><th>Operator</th><th>Description</th></tr></thead><tbody><tr><td><code>in</code></td><td>one of the comma-separated values is an exact match</td></tr><tr><td><code>not in</code></td><td>none of the comma-separated values match</td></tr></tbody></table>

#### Many to Many operators

{% hint style="info" %}
Added in `@currents/playwright@1.10.0`
{% endhint %}

Used to match a list field (eg Test Title Path) against one or more values.

<table data-full-width="false"><thead><tr><th>Operator</th><th>Description</th></tr></thead><tbody><tr><td><code>includes</code></td><td>all of the comma-separated values can be found in the field</td></tr><tr><td><code>includes some</code></td><td>at least one of the comma-separated values can be found in the field</td></tr><tr><td><code>missing</code></td><td>all of the comma-separated values are missing from the field</td></tr><tr><td><code>missing any</code></td><td>any of the comma-separated values are missing from the field</td></tr></tbody></table>

### Examples

<table><thead><tr><th>Field</th><th width="139">Operator</th><th width="136">Value</th><th>Description</th></tr></thead><tbody><tr><td>Test Id</td><td>is</td><td>1234</td><td>id is exact match</td></tr><tr><td>Git Author branch</td><td>not in</td><td>main,stable</td><td>no matches</td></tr><tr><td>Tags</td><td>includes</td><td>featureA</td><td>tag matches</td></tr><tr><td>Tags</td><td>includes some</td><td>featA,featB</td><td>at least one tag matches</td></tr></tbody></table>

