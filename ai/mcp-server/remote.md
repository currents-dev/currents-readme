---
description: >-
  Connect an AI agent to Currents over the hosted MCP endpoint - OAuth in the
  browser or an API key header, with the tool list following what the
  connection was granted
icon: cloud-bolt
---

# Remote MCP Server

Currents hosts the MCP server at `https://mcp.currents.dev/mcp`. A client points at that URL and connects: there is no package to install, no local process to keep alive, and - in a client that supports OAuth - no key to paste into a configuration file.

It serves the tools listed under [MCP Server](README.md#tools), the same ones the [local package](local.md) runs over stdio. This page covers what is specific to the hosted endpoint: how a client authenticates, which tools a connection is handed, and what to check when a connection fails. For step-by-step setup in a particular assistant, see [Connect Your AI](../connect/README.md).

## Connect with OAuth

A connection made this way acts as the person who authorized it, inside the one organization they picked, and carries only the permissions they consented to. Completing the flow leaves nothing to paste into a project configuration file: the client receives the token itself and holds it wherever it keeps credentials, unlike an [API key](#connect-with-an-api-key), which is written into the configuration the client reads. An administrator can revoke the connection from the dashboard - see [oauth.md](../../authentication/oauth.md "mention").

Setup differs by client:

* [Claude Code](../connect/claude-code.md)
* [Claude Desktop and claude.ai](../connect/claude.md), from the [Claude connectors directory](https://claude.ai/directory/currents)
* [ChatGPT](../connect/chatgpt.md)
* [Codex](../connect/codex.md)
* [Cursor](../connect/cursor.md), from the [Cursor Marketplace](https://cursor.com/marketplace)
* Any other client that speaks Streamable HTTP and can identify itself the way Currents requires: point it at `https://mcp.currents.dev/mcp` and leave any client ID and secret empty. A client that can only register itself dynamically cannot, and uses an API key instead - see [for client developers](../../authentication/oauth.md#for-client-developers).

The browser then walks through signing in, choosing the organization the connection will act in, and approving the permissions the client asked for. [oauth.md](../../authentication/oauth.md "mention") covers those screens, what each permission reaches, and how to review or revoke a connection afterwards.

## Connect with an API key

Every MCP client that can send a header can reach the endpoint with a Currents API key, including clients that cannot complete the OAuth flow. The key goes in an `Authorization` header, in place of the `your-api-key` placeholder below:

```json
{
  "mcpServers": {
    "currents": {
      "type": "http",
      "url": "https://mcp.currents.dev/mcp",
      "headers": {
        "Authorization": "Bearer your-api-key"
      }
    }
  }
}
```

A key is an organization credential rather than a personal one: it names no user, and it carries a single **Read Only** or **Read & Write** access level instead of the permission set OAuth grants. See [api-keys.md](../../dashboard/administration/api-keys.md "mention") for creating and scoping one.

## What a connection can reach

The tool list is a property of the connection, and it is rebuilt on every request from the permissions the grant holds, capped by the role the member holds at that moment ([the role sets the ceiling](../../authentication/oauth.md#the-role-sets-the-ceiling)). The endpoint registers only the tools whose permission survives that, so a task with no matching tool is access the connection lacks rather than something Currents cannot do - and an agent is not handed a tool it would only collect a `403` from.

The [tools table](README.md#tools) lists which permission each tool needs.

An API key is filtered the same way, by access level rather than by permission: a **Read Only** key is handed the read tools, the two Jira lookups, and `currents-create-evidence-links`, and a **Read & Write** key is handed the whole catalog.

{% hint style="danger" %}
`currents-delete-run`, `currents-delete-webhook` and `currents-delete-action` cannot be undone, and Currents does not ask for confirmation. See [Tools](README.md#tools) before granting `runs:write`, `webhooks:write`, `actions:write` or a **Read & Write** key.
{% endhint %}

## Endpoint reference

| | |
| --- | --- |
| Endpoint | `https://mcp.currents.dev/mcp` |
| Method | `POST` only - `GET` and `DELETE` answer `405` |
| Transport | Streamable HTTP, stateless, one exchange per request |
| Headers | `Content-Type: application/json`, `Accept: application/json, text/event-stream` |
| OAuth resource identifier | `https://mcp.currents.dev/mcp` |
| OAuth metadata document | `https://mcp.currents.dev/.well-known/oauth-protected-resource/mcp` |

This endpoint and the REST API are separate OAuth resource servers, so a token minted for one is refused by the other: authorizing an agent to use the tools is not authorizing it to use the whole API. The rest of what a client needs - the authorization server, PKCE, how a client identifies itself - is in [for client developers](../../authentication/oauth.md#for-client-developers).

## Troubleshooting

| Answer                                          | Cause                                                                                                                                 |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `401` with a `WWW-Authenticate` header          | No credential, or an expired one. The header names the metadata document a client starts discovery from.                              |
| `403` `organization_not_enabled`                | The endpoint is not served to that organization. Contact [support@currents.dev](mailto:support@currents.dev).                          |
| `405` with `Allow: POST`                        | The client opened a `GET` stream. This server is stateless and answers `POST` alone.                                                   |
| `406` or `415`                                  | A missing `Accept` or `Content-Type` header.                                                                                          |
| `does not support dynamic client registration`  | The client can only register itself dynamically. Use an API key header instead.                                                        |

A tool that is refused reports the status and the body it got back, so the reason a call failed reaches the agent that made it rather than only the transport.

A missing permission is not one of those refusals. The tool for it is not listed in the first place, so an agent that asks for it by name is told the tool does not exist - which is the signal that the connection lacks that access, not that Currents lacks the feature.

## Related

* [Connect Your AI](../connect/README.md) - step-by-step setup for each assistant
* [OAuth](../../authentication/oauth.md) - the connection flow, permissions, and revoking access
* [MCP Server](README.md) - the tools, and hosted versus local
* [Local MCP Server](local.md) - the `@currents/mcp` package
* [Evidence Sharing](../evidence-sharing.md) - have an agent prove its change with before-and-after evidence
* [Overview](../overview.md) - every way to put Currents data in front of an agent
* [API Keys](../../dashboard/administration/api-keys.md) - creating and scoping a key
