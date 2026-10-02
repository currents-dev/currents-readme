---
description: >-
  Add Currents to GitHub Copilot in VS Code and Copilot CLI from the GitHub MCP
  Registry, then sign in from the browser
icon: code
---

# VS Code and GitHub Copilot

Currents is listed in the [GitHub MCP Registry](https://github.com/mcp), which is the MCP server gallery in VS Code and the server search in Copilot CLI. Both connect to the hosted MCP server at `https://mcp.currents.dev/mcp`.

## VS Code

### Install the server

1. Open the Extensions view and enter `@mcp currents` in the search field.
2. Select **Install** to add Currents to your user profile. To add it to the current workspace instead, right-click it and select **Install in Workspace**. This writes the server to `.vscode/mcp.json`, which you can commit to share it with everyone working in the repository.

You can also open [Install in VS Code](https://vscode.dev/redirect/mcp/install?name=currents&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fmcp.currents.dev%2Fmcp%22%7D), or add the entry to `mcp.json` by hand:

```json
{
  "servers": {
    "currents": {
      "type": "http",
      "url": "https://mcp.currents.dev/mcp"
    }
  }
}
```

### Sign in

The first time Copilot connects to Currents, VS Code asks to sign in and opens a browser window:

1. Sign in to Currents.
2. Choose the organization VS Code will work in.
3. Approve the permissions VS Code asks for.

The consent screen shows the VS Code icon. See [Sign in once, with OAuth](README.md#sign-in-once-with-oauth) for what each screen shows. The configuration holds no credential: each person signs in as themselves.

### Check the connection

Run **MCP: List Servers** from the Command Palette and check that **currents** is running. In Copilot Chat, select **Configure Tools** to see the Currents tools and turn off the ones you do not want the agent to call, such as `currents-delete-run`, which permanently deletes a run.

## Copilot CLI

Add the server from the registry:

1. Start `copilot` with `--experimental`, or enter `/experimental on` in a session.
2. Enter `/mcp search currents` and select **Currents**.
3. Press <kbd>Ctrl</kbd>+<kbd>S</kbd> to save. There is no API key to fill in.

Or add it with one command:

```bash
copilot mcp add --transport http currents https://mcp.currents.dev/mcp
```

The first time Copilot calls Currents, a browser window opens for the same sign-in as above. Sign in from an interactive session: `copilot -p` cannot open the browser. Enter `/mcp` to see the server and its status.

## Troubleshooting

| What you see                           | What to do                                                                                          |
| -------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Currents tools fail with `401`         | Sign in again: in VS Code, run **MCP: List Servers**, select **currents** and restart it.           |
| A tool you expect is missing           | Your grant or your role does not include its permission. See [the role sets the ceiling](../../authentication/oauth.md#the-role-sets-the-ceiling). |
| The wrong organization's data          | Each connection reaches one organization. Revoke it under **Account → Connected Applications**, sign in again, and choose the other one. |
| `403` `organization_not_enabled`       | Contact <support@currents.dev>.                                                                     |

More causes are listed under [Remote MCP Server troubleshooting](../mcp-server/remote.md#troubleshooting).
