---
description: >-
  Install the Currents plugin from the ChatGPT plugin directory, or add the
  hosted MCP server as a developer-mode app
icon: comments
---

# ChatGPT

Currents is listed in the ChatGPT plugin directory. The plugin connects to the hosted MCP server at `https://mcp.currents.dev/mcp`, and the same listing serves [Codex](codex.md).

## Install the Currents plugin

1. In [ChatGPT](https://chatgpt.com), open the **Plugins** tab.
2. Search for **Currents** and select the plus button.
3. [Sign in](#sign-in) when ChatGPT asks.

## Create a developer-mode app instead

Use this only when you cannot install the plugin, for example when your workspace has not allowed it. Developer mode is available on the web for Plus, Pro, Business, Enterprise and Education accounts. On a Business, Enterprise or Education workspace, an admin may need to allow it first.

### Turn on developer mode

In [ChatGPT](https://chatgpt.com), open **Settings → Security and login** and turn on **Developer mode**.

### Create the Currents app

1. Go to [ChatGPT Plugins](https://chatgpt.com/plugins) and select the plus button.
2. Fill in the app details:
   * **Name**: `Currents`
   * **Description**: `Test results, flaky tests and CI failures from Currents`
   * **MCP server URL**: `https://mcp.currents.dev/mcp`
   * **Authentication**: OAuth
3. Leave the client ID and secret empty. Currents supports Client ID Metadata Documents, so ChatGPT can identify itself without a pre-registered client. If you are asked how ChatGPT should register, choose the Client ID Metadata Document option.
4. Create the app. It is listed under **Drafts** in your app settings.

## Sign in

When ChatGPT first connects, a Currents sign-in page opens:

1. Sign in to Currents.
2. Choose the organization ChatGPT will work in.
3. Approve the permissions ChatGPT asks for.

The browser then returns you to ChatGPT. ChatGPT renews the connection on its own, so you are not asked again unless it is revoked. See [Sign in once, with OAuth](README.md#sign-in-once-with-oauth) for what each screen shows.

## Use it in a conversation

Start a new chat and type `@Currents`, or describe the task and let ChatGPT pick the plugin. For a developer-mode app, open the **+** menu in the composer, choose **Developer mode**, and select **Currents**. Then ask about your projects:

> What broke in the last failed run of `<project>` on main? Open a Jira issue for it.

If ChatGPT answers without calling Currents, name it in your prompt: "Use Currents to …".

ChatGPT runs tools marked read-only without asking, and asks you to confirm every other tool call. Check the input before you confirm a write, especially `currents-delete-run`, which permanently deletes a run. You can have ChatGPT remember your choice for a tool, but only for the rest of that conversation.

## Manage the app

The app's details page in your app settings lets you turn individual Currents tools on or off, and refresh the app to pick up tools Currents has added since you created it.

To revoke ChatGPT's access from the Currents side, remove it under **Account → Connected Applications**; an administrator can do the same for everyone under **Manage Organization → Connected Applications**. See [reviewing and revoking access](../../authentication/oauth.md#reviewing-and-revoking-access).

## Troubleshooting

| What you see                           | What to do                                                                                          |
| -------------------------------------- | --------------------------------------------------------------------------------------------------- |
| No plus button to create an app        | Turn on **Developer mode** first, or ask your workspace admin to allow it.                          |
| ChatGPT does not use Currents          | Type `@Currents` in the prompt. For a developer-mode app, select **Currents** under **+ → Developer mode**. |
| A tool you expect is missing           | Refresh the app from its details page. If it is still missing, your grant or your role does not include its permission - see [the role sets the ceiling](../../authentication/oauth.md#the-role-sets-the-ceiling). |
| The wrong organization's data          | Each connection reaches one organization. Revoke it in Currents, connect again, and choose the other one. |
| `403` `organization_not_enabled`       | Contact <support@currents.dev>.                                                                     |

More causes are listed under [Remote MCP Server troubleshooting](../mcp-server/remote.md#troubleshooting).
