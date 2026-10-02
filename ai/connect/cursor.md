---
description: >-
  Install the Currents plugin from the Cursor Marketplace and sign in from the
  browser
icon: arrow-pointer
---

# Cursor

The Currents plugin for Cursor adds the hosted MCP server at `https://mcp.currents.dev/mcp` and the Currents skills: fixing failing CI tests, collecting evidence from CI runs, and recording a browser session as evidence. It is listed in the [Cursor Marketplace](https://cursor.com/marketplace).

## Install the plugin

1. In Cursor, open **Customize** in the sidebar.
2. Find **Currents** and select **Install**.
3. Choose the scope: your user, or the current project.

## Sign in

The first time the agent calls a Currents tool, a browser window opens:

1. Sign in to Currents.
2. Choose the organization Cursor will work in.
3. Approve the permissions Cursor asks for.

The consent screen shows the Cursor icon. See [Sign in once, with OAuth](README.md#sign-in-once-with-oauth) for what each screen shows.

In the Cursor CLI, sign in with:

```bash
agent mcp login currents
```

## Add the server without the plugin

Cursor registers itself with an MCP server dynamically, and Currents does not accept that. The plugin passes a client ID that Currents publishes instead. To add only the server, put the same entry in `~/.cursor/mcp.json`, or in `.cursor/mcp.json` to share it with everyone working in a repository:

```json
{
  "mcpServers": {
    "currents": {
      "url": "https://mcp.currents.dev/mcp",
      "auth": {
        "CLIENT_ID": "https://app.currents.dev/oauth-clients/cursor.json"
      }
    }
  }
}
```

Without the `CLIENT_ID`, sign-in fails. The file holds no credential: each person signs in as themselves.

## Check the connection

Run `agent mcp list` in the CLI, or open the MCP settings in Cursor and check that **currents** is connected. Then ask something only Currents can answer:

> Which tests in `<project>` were flakiest on main this week, and why?

## Troubleshooting

| What you see                           | What to do                                                                                          |
| -------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Sign-in fails before the Currents page | Check that the `currents` entry has the `CLIENT_ID` shown above.                                    |
| Currents tools fail with `401`         | Run `agent mcp login currents`, or sign in again from Cursor's MCP settings.                       |
| A tool you expect is missing           | Your grant or your role does not include its permission. See [the role sets the ceiling](../../authentication/oauth.md#the-role-sets-the-ceiling). |
| The wrong organization's data          | Each connection reaches one organization. Revoke it under **Account → Connected Applications**, sign in again, and choose the other one. |
| `403` `organization_not_enabled`       | Contact <support@currents.dev>.                                                                     |

More causes are listed under [Remote MCP Server troubleshooting](../mcp-server/remote.md#troubleshooting).
