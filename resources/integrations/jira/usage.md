---
description: Learn how to use Currents Jira Integration
---

# Usage

After setup, you can create new Jira issues or comment on existing ones directly from test execution details in Currents.

## Access Jira Features

1. Open any test execution details in Currents
2. Look for the **Jira** icon (only visible when integration is enabled)
3. Click the icon to open the Jira actions dialog

<figure><img src="../../../.gitbook/assets/currents-2025-07-11-15.25.08@2x.png" alt="Jira integration icon in test details"><figcaption>Jira integration access point</figcaption></figure>

From here, you can:

- Create a new Jira issue
- Link to an existing issue

## Create a New Jira Issue

To create a new issue:

1. Select the **Jira Project** and **Issue Type**
2. Enter **Issue Title** and **Description** (optional)
3. Toggle **Include Details** to automatically add test context (error messages, stack traces, etc.)
4. Click **Create Issue**

Example of a newly created issue:

<figure><img src="../../../.gitbook/assets/currents-2025-07-11-15.41.48@2x.png" alt=""><figcaption></figcaption></figure>

<figure><img src="../../../.gitbook/assets/currents-2025-07-11-15.42.28@2x.png" alt=""><figcaption></figcaption></figure>

## Link to an Existing Jira Issue

To link and comment on an existing issue:

1. Select the **Jira Project**
2. Search for the issue by typing its title (results limited to 50 items)
3. Enter your comment text
4. Toggle **Include Details** to add test context
5. Click **Add Comment**

Note: For more specific results, use more detailed search terms.

Example of commenting on an existing issue:

<figure><img src="../../../.gitbook/assets/currents-2025-07-11-15.45.42@2x.png" alt="Adding a comment to existing Jira issue"><figcaption>Adding a comment in Currents</figcaption></figure>

<figure><img src="../../../.gitbook/assets/currents-2025-07-11-15.47.01@2x.png" alt="Comment appears in Jira issue"><figcaption>Comment appears in Jira with test context</figcaption></figure>

## Notes

- The integration creates one-way links from Currents to Jira
- Jira issue status updates are not reflected back in Currents
- Comments include a link back to the specific test in Currents
