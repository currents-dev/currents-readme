---
description: >-
  Add Currents as a connector in Claude Desktop and claude.ai, for yourself or
  for your whole Claude organization
icon: message-bot
---

# Claude Desktop and claude.ai

Claude connects to Currents as a custom connector pointing at `https://api.currents.dev/mcp`. A connector belongs to your Claude account rather than to one device, so adding it once makes Currents available in Claude Desktop and on claude.ai.

## Add the connector

{% tabs %}
{% tab title="Free, Pro and Max" %}
1. In Claude Desktop or claude.ai, open **Customize → Connectors**.
2. Click **+**, then **Add custom connector**.
3. Name it `Currents` and enter the URL `https://api.currents.dev/mcp`.
4. Leave **Advanced settings** empty. Claude identifies itself to Currents on its own, so there is no client ID or secret to enter.
5. Click **Add**, then **Connect**.

On the Free plan, Claude allows one custom connector.
{% endtab %}

{% tab title="Team and Enterprise" %}
An owner adds the connector for the organization first:

1. Open **Organization settings → Connectors**.
2. Click **Add**, hover over **Custom** and choose **Web**.
3. Enter the URL `https://api.currents.dev/mcp` and leave **Advanced settings** empty.
4. Click **Add**.

Each member then connects with their own Currents account:

1. Open **Customize → Connectors**.
2. Find **Currents** and click **Connect**.

Adding the connector gives nobody access to Currents data. Each member signs in to Currents themselves, and their connection carries their own Currents role.
{% endtab %}
{% endtabs %}

## Sign in

Clicking **Connect** opens a Currents sign-in page:

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

Restart Claude Desktop after saving. The hosted connector above is the simpler option for most people: nothing to install, and access that follows your own Currents role.

## Troubleshooting

| What you see                           | What to do                                                                                          |
| -------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Claude does not use Currents           | Check that **Currents** is turned on under **+ → Connectors** for this conversation.                |
| A tool you expect is missing           | Your grant or your role does not include its permission. See [the role sets the ceiling](../../authentication/oauth.md#the-role-sets-the-ceiling). |
| The wrong organization's data          | Each connection reaches one organization. Disconnect, connect again, and choose the other one.     |
| `403` `organization_not_enabled`       | Contact <support@currents.dev>.                                                                     |

More causes are listed under [Remote MCP Server troubleshooting](../mcp-server/remote.md#troubleshooting).
