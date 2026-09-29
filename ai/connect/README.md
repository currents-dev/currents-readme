---
description: >-
  Connect Claude, ChatGPT, Codex, your editor or any other MCP client to Currents, and pick the
  setup that fits where you work
icon: plug
---

# Connect Your AI

Currents hosts an MCP server at `https://api.currents.dev/mcp`. Once your AI assistant is connected to it, the assistant can read your runs, test results, failure evidence and analytics, and act on them - quarantine a flaky test, open a Jira issue, cancel or reset a run - without you pasting anything into the chat.

The pages in this section walk through the setup for each assistant. They all end at the same place: an assistant that acts as you, inside one Currents organization, with the permissions you approved.

## Pick your assistant

| Assistant                                                     | Where you use it                                      | Setup                                                                        |
| ------------------------------------------------------------- | ----------------------------------------------------- | ---------------------------------------------------------------------------- |
| [Claude Code](claude-code.md)                                 | Terminal, VS Code, JetBrains                          | One `claude mcp add` command, then sign in from the browser                  |
| [Claude Desktop and claude.ai](claude.md)                     | Claude Desktop app, claude.ai                         | Add Currents as a custom connector, then sign in from the browser            |
| [ChatGPT](chatgpt.md)                                         | chatgpt.com                                           | Create a developer-mode app, then sign in from the browser                   |
| [Codex](codex.md)                                             | Codex CLI, Codex IDE extension, ChatGPT desktop app   | One `codex mcp add` command, then `codex mcp login`                          |
| [Cursor, VS Code and compatible editors](../ide-extension.md) | The editor                                            | Install the Currents extension, which registers the MCP server for the editor's agent |
| [Other MCP clients](other-clients.md)                         | Wherever the client runs                              | Enter the server URL by hand, with OAuth or an API key                       |

## Before you start

* **A Currents account in the organization you want to connect.** You choose the organization while signing in, and the connection reaches that organization only. To use two organizations, connect twice.
* **The right role for what you want the assistant to do.** Your role caps the permissions you can approve: a Guest can let the assistant read projects and results only, and webhooks are for Admins. See [the role sets the ceiling](../../authentication/oauth.md#the-role-sets-the-ceiling).
* **Nothing to install for the hosted server.** Currents runs it, so there is no package to keep up to date. The [local package](../mcp-server/local.md) is the exception, for clients that can only start a local server.

## Sign in once, with OAuth

Every assistant that connects to the hosted server with OAuth signs in the same way. The first time it calls Currents, a browser window opens and walks you through three screens:

1. **Sign in** to Currents, if that browser is not signed in already. SSO applies as it does for the dashboard.
2. **Choose an organization.** The assistant will act in this one and no other.
3. **Authorize.** The screen lists every permission the assistant asked for, grouped by area and marked **Read** or **Write**. Approve them, and the browser hands you back to the assistant.

The assistant renews its own access from then on, so you are not asked again unless the connection is revoked or the assistant starts asking for more. [OAuth](../../authentication/oauth.md) explains each screen and each permission.

{% hint style="info" %}
A client that cannot complete this sign-in can send a Currents API key instead. A key acts as the organization rather than as you, with a single **Read Only** or **Read & Write** level - see [Other MCP clients](other-clients.md#with-an-api-key).
{% endhint %}

## Try it

Once connected, ask about your own projects in plain language:

* "Which tests in `<project>` were flakiest on main this week, and why?"
* "What broke in the last failed `<project>` run on main? Open a Jira issue for it."
* "Is this pull request safe to merge? Compare its runs with main."
* "Which spec files got slowest over the last 30 days, and which errors fail them most often?"

The assistant chooses the tools itself. [Tools](../mcp-server/README.md#tools) lists every tool and the permission it needs.

{% hint style="danger" %}
Some tools cannot be undone: `currents-delete-run` permanently deletes a run and everything recorded with it. Currents does not ask for confirmation, so leave your assistant set to ask you before it calls a write tool.
{% endhint %}

## Review or revoke a connection

Every assistant you authorized is listed under **Account → Connected Applications**, with what it can read and write and when it was last used. Removing it there ends the assistant's access within the hour, on every machine it was set up on. An organization administrator sees and can revoke everyone's connections under **Manage Organization → Connected Applications**. See [reviewing and revoking access](../../authentication/oauth.md#reviewing-and-revoking-access).

A connection made with an API key is not listed there, because a key names no user and creates no grant. To end it, remove the key from the assistant's configuration, and have an Admin revoke the key under **Organization → API Keys** - until then it keeps working anywhere else it was pasted.

## Related

* [MCP Server](../mcp-server/README.md) - every tool, and hosted versus local
* [Remote MCP Server](../mcp-server/remote.md) - the endpoint, authentication and troubleshooting
* [OAuth](../../authentication/oauth.md) - the sign-in screens, permissions and roles
* [Local MCP Server](../mcp-server/local.md) - the `@currents/mcp` package, which runs locally with an API key
