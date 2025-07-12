---
description: Learn how to use Currents Jira Integration
---

# Usage

After setup, you can create new Jira issues or comment on existing ones directly from test execution details in Currents.

## Access Jira Features

1. Open any test execution details in Currents
2. Look for the **Jira** icon (only visible when integration is enabled)
3. Click the icon to open the Jira actions dialog

<figure><img src="../../../.gitbook/assets/currents-2025-07-11-15.25.08@2x.png" alt="Jira integration access point"><figcaption><p>Jira integration access point</p></figcaption></figure>

From here, you can:

* Create a new Jira issue
* Link to an existing issue

## Create a New Jira Issue

To create a new issue:

1. Select the **Jira Project** and **Issue Type**
2. Enter **Issue Title** and **Description** (optional)
3. Toggle **Include Details** to automatically add test context (error messages, stack traces, etc.)
4. Click **Create Issue**

Example of a newly created issue:

<figure><img src="../../../.gitbook/assets/currents-2025-07-11-15.41.48@2x (1).png" alt="Example of New Jira Issue creation form"><figcaption><p>Example of New Jira Issue creation form</p></figcaption></figure>

<figure><img src="../../../.gitbook/assets/currents-2025-07-11-15.42.28@2x.png" alt="Example of an new Jira issue created from Currents"><figcaption><p>Example of an new Jira issue created from Currents</p></figcaption></figure>

## Link to an Existing Jira Issue

To link and comment on an existing issue:

1. Select the **Jira Project**
2.  Search for the issue by typing its title (results limited to 50 items)

    _Note: For more specific results, use more detailed search terms._
3. Enter your comment text
4. Toggle **Include Details** to add test context
5. Click **Add Comment**



Example of commenting on an existing issue:

<figure><img src="../../../.gitbook/assets/currents-2025-07-11-15.45.42@2x.png" alt="Example of linking test failure to an existing Jira issue"><figcaption><p>Example of linking test failure to an existing Jira issue</p></figcaption></figure>

<figure><img src="../../../.gitbook/assets/currents-2025-07-11-15.47.01@2x.png" alt="Example of a Jira issue comment originating from Currents"><figcaption><p>Example of a Jira issue comment originating from Currents</p></figcaption></figure>

### Notes

* The integration creates one-way links from Currents to Jira
* Jira issue status updates are not reflected back in Currents
* Comments include a link back to the specific test in Currents
