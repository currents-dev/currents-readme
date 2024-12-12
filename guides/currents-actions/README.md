---
icon: arrows-turn-to-dots
description: Use Currents Rules to trigger actions
---

# Currents Actions

The Currents Actions Engine allows you to specify actions to be taken when certain conditions are met. The initial implementation allows you to have certain actions automatically taken in your [Playwright tests](setup.md) (like skipping the test) when they match certain conditions (matching file name, test name, git branch, etc).

### Creating Rules in Currents

{% hint style="info" %}
The current version only has support for[ test run actions with Playwright](setup.md), and requires the [Currents Rules Fixtures ](../../resources/reporters/currents-playwright/currents-playwright-fixtures.md)to be used in your Playwright project.
{% endhint %}

Rules are managed from the Rules UI in Currents. From this page you can Create, View and Edit your Rules.

<figure><img src="../../.gitbook/assets/Screenshot 2024-12-10 at 3.22.45 PM.png" alt=""><figcaption><p>Rules is located under Manage Project in the sidebar</p></figcaption></figure>

You can also quickly create rules when viewing test details for existing runs.

<figure><img src="../../.gitbook/assets/Screenshot 2024-12-10 at 3.29.08 PM.png" alt=""><figcaption><p>Apply rules from the Run Test Details</p></figcaption></figure>

### Tracing which Rules were Applied

A trace of which rules were applied to a test during the run is available from the test details page.

 

<figure><img src="../../.gitbook/assets/Screenshot 2024-12-10 at 3.53.08 PM.png" alt=""><figcaption><p>Rules trace</p></figcaption></figure>
