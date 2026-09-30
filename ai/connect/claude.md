---
description: >-
  Connect Currents to Claude Desktop and claude.ai from the Claude connectors
  directory, for yourself or for your whole Claude organization
icon: message-bot
---

# Claude Desktop and claude.ai

Currents is listed in the Claude connectors directory at [claude.ai/directory/currents](https://claude.ai/directory/currents). A connector belongs to your Claude account rather than to one device, so connecting once makes Currents available in Claude Desktop, claude.ai, the Claude mobile app, Cowork and [Claude Code](claude-code.md#use-the-connector-from-claude.ai-instead).

## Connect from the Claude directory

{% tabs %}
{% tab title="Free, Pro and Max" %}
1. Open [claude.ai/directory/currents](https://claude.ai/directory/currents). Or, in Claude Desktop or claude.ai, open **Customize → Connectors**, select **Discover** and search for **Currents**.
2. Click **Connect to Claude**, then [sign in](#sign-in).

The directory listing works on every plan, including Free, and there is no URL to enter.
{% endtab %}

{% tab title="Team and Enterprise" %}
An Owner adds Currents for the organization first:

1. Open [claude.ai/directory/currents](https://claude.ai/directory/currents).
2. Click **Connect for your team**. Currents is now available to everyone in the organization.
3. Click **Connect to Claude** to connect your own Currents account.

Owners can also add Currents from **Organization settings → Connectors → Browse connectors**.

Each member then connects with their own Currents account:

1. Open **Customize → Connectors** and find **Currents**.
2. Click **Connect to Claude**, then [sign in](#sign-in).

On a Team plan, a member without permission to enable connectors sees **Request** instead of a connect button. **Request** sends the request to the organization's Owners, who approve it under **Organization settings → Connectors**.

Adding the connector gives nobody access to Currents data. Each member signs in to Currents themselves, and their connection carries their own Currents role.
{% endtab %}
{% endtabs %}

<details>

<summary>Add Currents by URL, if the directory is not available to you</summary>

Use a custom connector only when you cannot connect from the directory listing.

**Free, Pro and Max:**

1. In Claude Desktop or claude.ai, open **Customize → Connectors**.
2. Click **+**, then **Add custom connector**.
3. Name it `Currents` and enter the URL `https://mcp.currents.dev/mcp`.
4. Leave **Advanced settings** empty. Claude identifies itself to Currents on its own, so there is no client ID or secret to enter.
5. Click **Add**, then **Connect**.

On the Free plan, Claude allows one custom connector.

**Team and Enterprise:** an Owner opens **Organization settings → Connectors**, clicks **Add**, hovers over **Custom** and chooses **Web**, enters `https://mcp.currents.dev/mcp` with **Advanced settings** empty, and clicks **Add**. Members then connect as described in the **Team and Enterprise** tab above.

</details>

### If you added Currents by URL before

A custom connector you added earlier keeps working. It shows under **Custom** in **Customize → Connectors**, and the directory listing shows Currents as not connected. Connecting from the directory without removing it gives you two Currents connections.

To move to the directory listing:

1. In **Customize → Connectors**, open the Currents connector under **Custom**.
2. Open the three-dot menu and select **Remove**. On Team and Enterprise plans, an Owner removes it under **Organization settings → Connectors**.
3. Connect from [claude.ai/directory/currents](https://claude.ai/directory/currents) and sign in again.

## Sign in

Clicking **Connect to Claude** opens a Currents sign-in page:

1. Sign in to Currents.
2. Choose the organization Claude will work in.
3. Approve the permissions Claude asks for.

The browser then returns you to Claude, and the connector shows as connected. See [Sign in once, with OAuth](README.md#sign-in-once-with-oauth) for what each screen shows.

## Use it in a chat

Click **+** at the bottom left of the message box, open **Connectors**, and make sure **Currents** is turned on for the conversation. Then ask about your projects:

> Which tests in `<project>` were flakiest on main this week, and why?

The **Search and tools** menu lets you turn off individual Currents tools before Claude calls them. Turn off the ones a conversation does not need, especially `currents-delete-run`, which permanently deletes a run - Currents itself does not ask for confirmation.

## Disconnect

Disconnecting in **Customize → Connectors** removes Currents from Claude. To revoke Claude's access from the Currents side, remove it under **Account → Connected Applications**; an administrator can do the same for everyone under **Manage Organization → Connected Applications**. See [reviewing and revoking access](../../authentication/oauth.md#reviewing-and-revoking-access).

## Run the server locally instead

Claude Desktop can also run the [`@currents/mcp`](../mcp-server/local.md) package on your computer, authenticated with an API key rather than your own sign-in. It works in Claude Desktop only, not on claude.ai. Open **Settings → Developer → Edit Config** and add Currents to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "currents": {
      "command": "npx",
      "args": ["-y", "@currents/mcp"],
      "env": {
        "CURRENTS_API_KEY": "your-api-key"
      }
    }
  }
}
```

Restart Claude Desktop after saving. To stop using it, delete the `currents` entry and restart again. A local setup creates no entry under **Connected Applications**: the key keeps working until an Admin revokes it under **Organization → API Keys**.

The hosted connector above is the simpler option for most people: nothing to install, and access that follows your own Currents role.

## Troubleshooting

| What you see                           | What to do                                                                                          |
| -------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Claude does not use Currents           | Check that **Currents** is turned on under **+ → Connectors** for this conversation.                |
| A tool you expect is missing           | Your grant or your role does not include its permission. See [the role sets the ceiling](../../authentication/oauth.md#the-role-sets-the-ceiling). |
| The wrong organization's data          | Each connection reaches one organization. Disconnect, connect again, and choose the other one.     |
| Two Currents connectors in the list    | One is a custom connector added by URL. Remove the one under **Custom**. See [If you added Currents by URL before](#if-you-added-currents-by-url-before). |
| `403` `organization_not_enabled`       | Contact <support@currents.dev>.                                                                     |

More causes are listed under [Remote MCP Server troubleshooting](../mcp-server/remote.md#troubleshooting).
