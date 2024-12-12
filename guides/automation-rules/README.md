---
icon: ruler-triangle
description: Use Currents Rules to trigger actions
---

# Automation Rules

The Currents Rules Engine allows you to specify actions to be taken when certain conditions are met. The initial implementation allows you to have certain actions automatically taken in your [Playwright tests](applying-rules-to-runs.md) (like skipping the test) when they match certain conditions (matching file name, test name, git branch, etc).

### Creating Rules in Currents

{% hint style="info" %}
The current version only has support for[ test run actions with Playwright](applying-rules-to-runs.md), and requires the [Currents Rules Fixtures ](../../resources/reporters/currents-playwright/currents-playwright-fixtures.md)to be used in your Playwright project.
{% endhint %}

Rules are managed from the Rules UI in Currents. From this page you can Create, View and Edit your Rules.

<figure><img src="../../.gitbook/assets/Screenshot 2024-12-10 at 3.22.45 PM.png" alt=""><figcaption><p>Rules is located under Manage Project in the sidebar</p></figcaption></figure>

<figure><img src="../../.gitbook/assets/Screenshot 2024-12-10 at 3.27.00 PM (1).png" alt=""><figcaption><p>Edit a rule</p></figcaption></figure>

You can also quickly create rules when viewing test details for existing runs.

<figure><img src="../../.gitbook/assets/Screenshot 2024-12-10 at 3.29.08 PM.png" alt=""><figcaption><p>Apply rules from the Run Test Details</p></figcaption></figure>

### Rules Actions

The following actions are supported when a rule matches:

<table><thead><tr><th width="188">Action</th><th width="434">Description</th><th>Min Version</th></tr></thead><tbody><tr><td>Skip Test</td><td>Playwright will not run the test at all</td><td>v1.9.0</td></tr><tr><td>Quarantine Test</td><td>Playwright will run the test, but will ignore any reported failures</td><td>v1.9.0</td></tr></tbody></table>

### Rule Conditions

A Rule is configured with one or more match conditions.  When the conditions match the Rule's Action will be applied. You can set whether all conditions must match, or just one of the conditions.

Conditions can be matched against the following test data:

<table><thead><tr><th width="199">Field</th><th>Description</th></tr></thead><tbody><tr><td>File</td><td>The filename for the test</td></tr><tr><td>Test Title</td><td>The title of the test</td></tr><tr><td>Test Title Path</td><td>The full title path including named <code>describe</code> statements</td></tr><tr><td>Project</td><td>The Playwright project's name (from your Playwright config)</td></tr><tr><td>Test ID</td><td>The Paywright test id. (This is unique for each test per-project)</td></tr><tr><td>Tags</td><td>Test tags</td></tr><tr><td>Git Author Email</td><td>Email that authored the git commit</td></tr><tr><td>Git Author Name</td><td>Name that authored the git commit</td></tr><tr><td>Git Branch</td><td>Git branch the test was run on</td></tr><tr><td>Git Message</td><td>Message of the git commit</td></tr><tr><td>Git Remote Origin</td><td>The git remote the test was synced from</td></tr></tbody></table>

We support the following operators when evaluating your conditions:

| Operator | Description                                                            |
| -------- | ---------------------------------------------------------------------- |
| is       | Matches when the value is an exact match                               |
| is not   | Matches when the value is different than                               |
| in       | Matches when one of the values (separated by commas) is an exact match |
| not in   | Matches when all values are different than                             |
| is any   | Matches when any value exists                                          |
| is empty | Matches when the field has no value                                    |



<figure><img src="../../.gitbook/assets/Screenshot 2024-12-10 at 3.33.14 PM.png" alt=""><figcaption><p>Match all/any of the conditions</p></figcaption></figure>

<figure><img src="../../.gitbook/assets/Screenshot 2024-12-10 at 3.46.19 PM.png" alt=""><figcaption><p>Condition fields</p></figcaption></figure>

