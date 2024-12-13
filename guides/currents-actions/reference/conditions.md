---
description: Reference documentation of Conditions that are available for Currents Actions
---

# Conditions

An Actions can have one or more conditions. You can use `AND` or  `OR` combinator for multiple conditions. Use comma-separated strings to define list values.

### Fields

#### <mark style="color:purple;">File</mark>

Test filename path, for example `path/to/file.spec.ts`.

| Value Types         | `string \| string[]` |
| ------------------- | -------------------- |
| Supported Operators | all                  |

#### <mark style="color:purple;">Test Title</mark>

Test title, for example in test definition `test("should open landing page")` it is `should open landing page`.

| Value Types         | `string \| string[]` |
| ------------------- | -------------------- |
| Supported Operators | all                  |

<mark style="color:purple;">**Test Title Path**</mark>

Full title path including named `describe` statements.&#x20;

| Value Types         | `string \| string[]` |
| ------------------- | -------------------- |
| Supported Operators | all                  |

#### <mark style="color:purple;">Test ID</mark>

Playwright [test id](https://playwright.dev/docs/api/class-testinfo#test-info-test-id), matching the test case id in the [Reporter API](https://playwright.dev/docs/api/class-reporter).

| Value Types         | `string \| string[]` |
| ------------------- | -------------------- |
| Supported Operators | all                  |

#### <mark style="color:purple;">Tags</mark>

Test tag list. For example, if a test has the following list of tags `['a', 'b']`, each value in the list will be evaluated separately.

| Value Types         | `string \| string[]` |
| ------------------- | -------------------- |
| Supported Operators | all                  |

#### <mark style="color:purple;">Project</mark>

Playwright project name as defined in your `playwright.config.ts`.&#x20;

| Value Types         | `string \| string[]` |
| ------------------- | -------------------- |
| Supported Operators | all                  |

#### <mark style="color:purple;">Git Author Email</mark>

Git commit author email. See [commit-information.md](../../../dashboard/runs/commit-information.md "mention") to explore how Currents collects git commit information.

| Value Types         | `string \| string[]` |
| ------------------- | -------------------- |
| Supported Operators | all                  |

#### <mark style="color:purple;">Git Author Branch</mark>

Git commit author name. See [commit-information.md](../../../dashboard/runs/commit-information.md "mention") to explore how Currents collects git commit information.

| Value Types         | `string \| string[]` |
| ------------------- | -------------------- |
| Supported Operators | all                  |

#### <mark style="color:purple;">Git Branch</mark>

Git commit branch name. See [commit-information.md](../../../dashboard/runs/commit-information.md "mention") to explore how Currents collects git commit information.

| Value Types         | `string \| string[]` |
| ------------------- | -------------------- |
| Supported Operators | all                  |

#### <mark style="color:purple;">Git Message</mark>

Git commit message. See [commit-information.md](../../../dashboard/runs/commit-information.md "mention") to explore how Currents collects git commit information.

| Value Types         | `string \| string[]` |
| ------------------- | -------------------- |
| Supported Operators | all                  |

#### <mark style="color:purple;">Git Remote Origin</mark>

Git remote origin URL. See [commit-information.md](../../../dashboard/runs/commit-information.md "mention") to explore how Currents collects git commit information.

| Value Types         | `string \| string[]` |
| ------------------- | -------------------- |
| Supported Operators | all                  |

### Operators

<table data-full-width="false"><thead><tr><th>Operator</th><th>Description</th></tr></thead><tbody><tr><td><code>is</code></td><td>exact match</td></tr><tr><td><code>is not</code></td><td>the value is different</td></tr><tr><td><code>in</code></td><td>one of the comma-separated values is an exact match</td></tr><tr><td><code>not in</code></td><td>none of the comma-separated values match</td></tr><tr><td><code>is any</code></td><td>fields doesn't exists, <code>undefined</code>or <code>null</code></td></tr><tr><td><code>is empty</code></td><td>field has no value</td></tr></tbody></table>

