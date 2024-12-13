---
description: Reference documentation of Conditions that are available for Currents Actions
---

# Conditions

An Actions can have one or more conditions. You can use `AND` or  `OR` combinator for multiple conditions.

### Field Types

<table data-full-width="false"><thead><tr><th>Field</th><th>Description</th><th>Min Version</th></tr></thead><tbody><tr><td>File</td><td>test filename path</td><td>1.9.0+</td></tr><tr><td>Test Title</td><td>test title</td><td>1.9.0+</td></tr><tr><td>Test Title Path</td><td>full title path including named <code>describe</code> statements</td><td>1.9.0+</td></tr><tr><td>Project</td><td>Playwright project name</td><td>1.9.0+</td></tr><tr><td>Test ID</td><td>Playwright testId (unique per-project)</td><td>1.9.0+</td></tr><tr><td>Tags</td><td>test tags</td><td>1.9.0+</td></tr><tr><td>Git Author Email</td><td>git commit author email</td><td>1.9.0+</td></tr><tr><td>Git Author Name</td><td>git commit author name</td><td>1.9.0+</td></tr><tr><td>Git Branch</td><td>git commit branch name</td><td>1.9.0+</td></tr><tr><td>Git Message</td><td>git commit message</td><td>1.9.0+</td></tr><tr><td>Git Remote Origin</td><td>git remote origin URL</td><td>1.9.0+</td></tr></tbody></table>

### Actions

<table data-full-width="false"><thead><tr><th>Operator</th><th>Description</th><th>Min Version</th></tr></thead><tbody><tr><td><code>is</code></td><td>exact match</td><td>1.9.0+</td></tr><tr><td><code>is not</code></td><td>the value is different</td><td>1.9.0+</td></tr><tr><td><code>in</code></td><td>one of the comma-separated values is an exact match</td><td>1.9.0+</td></tr><tr><td><code>not in</code></td><td>none of the comma-separated values match</td><td>1.9.0+</td></tr><tr><td><code>is any</code></td><td>fields doesn't exists, <code>undefined</code>or <code>null</code></td><td>1.9.0+</td></tr><tr><td><code>is empty</code></td><td>field has no value</td><td>1.9.0+</td></tr></tbody></table>

