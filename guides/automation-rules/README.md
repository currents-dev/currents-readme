---
description: Use Currents Rules to trigger actions
icon: ruler-triangle
---

# Automation Rules

The Currents Rules Engine allows you to specify actions to be taken when certain conditions are met. The initial implementation allows you to have certain actions automatically taken in your [Playwright tests](applying-rules-to-runs.md) (like skipping the test) when they match certain conditions (matching file name, test name, git branch, etc).

### Creating Rules in Currents

{% hint style="info" %}
The current version only has support for[ test run actions with Playwright](applying-rules-to-runs.md), and requires the [Currents Rules Fixtures ](../../resources/reporters/currents-playwright/currents-playwright-fixtures.md)to be used in your Playwright project.
{% endhint %}

Rules are managed from the Rules UI in Currents.

<figure><img src="../../.gitbook/assets/Rules Link (1).png" alt=""><figcaption><p>Rules is located under Manage Project in the sidebar</p></figcaption></figure>

From this page you can Create, View and Edit your Rules.

<figure><img src="../../.gitbook/assets/Rule Management.png" alt=""><figcaption><p>View Rules</p></figcaption></figure>

<figure><img src="../../.gitbook/assets/Screenshot 2024-12-06 at 11.52.26 AM.png" alt=""><figcaption><p>Create rule</p></figcaption></figure>

You can also quickly create rules when viewing test details for existing runs.

<figure><img src="../../.gitbook/assets/Screenshot 2024-12-06 at 11.53.23 AM.png" alt=""><figcaption><p>Apply rules from the Run Test Details</p></figcaption></figure>
