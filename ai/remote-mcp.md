---
description: >-
  Connect an AI agent to Currents over the hosted MCP endpoint - OAuth in the
  browser or an API key header, with the tool list following what the
  connection was granted
icon: cloud-bolt
---

# Remote MCP Server

Currents hosts the MCP server at `https://api.currents.dev/mcp`. A client points at that URL and connects: there is no package to install, no local process to keep alive, and - in a client that supports OAuth - no key to paste into a configuration file.

It serves the same tools as the [`@currents/mcp`](mcp-server.md) package that runs locally over stdio. What differs is where the server runs and how a caller proves who it is.

|                | Remote - `api.currents.dev/mcp`                       | Local - `@currents/mcp`                     |
| -------------- | ----------------------------------------------------- | ------------------------------------------- |
| Runs           | Hosted by Currents                                    | On the developer's machine                  |
| Transport      | Streamable HTTP                                       | stdio                                       |
| Credentials    | OAuth access token, or an API key                     | API key only                                |
| Acts as        | The person who authorized it, in one organization     | The organization the key belongs to         |
| Tool list      | The tools the connection was granted                  | Every tool                                  |
| Stays current  | Ships with Currents                                   | Re-fetched by the client on each start      |

**OAuth is the remote endpoint only.** The published npm package authenticates with `CURRENTS_API_KEY` and nothing else, so none of the per-permission behavior below applies to it.

## Connect with OAuth

A connection made this way acts as the person who authorized it, inside the one organization they picked, and carries only the permissions they consented to. The client keeps the token in its own credential store rather than in a project configuration file, so no credential is committed alongside the code the way an [API key](remote-mcp.md#connect-with-an-api-key) would be. An administrator can revoke the connection from the dashboard - see [oauth.md](../authentication/oauth.md "mention").

{% tabs %}
{% tab title="Claude Code" %}
```bash
claude mcp add --transport http currents https://api.currents.dev/mcp
```

Then run `/mcp` and choose **Authenticate**, which opens the browser. On a headless machine, `claude mcp login currents --no-browser` prints the authorization URL instead and takes the redirect URL back.
{% endtab %}

{% tab title="Other clients" %}
Any client that speaks Streamable HTTP and can identify itself the way Currents requires completes the flow against `https://api.currents.dev/mcp` with nothing arranged in advance. A client that can only register itself dynamically cannot, and uses an API key instead - see [for client developers](../authentication/oauth.md#for-client-developers).
{% endtab %}
{% endtabs %}

The browser then walks through signing in, choosing the organization the connection will act in, and approving the permissions the client asked for. [oauth.md](../authentication/oauth.md "mention") covers those screens, what each permission reaches, and how to review or revoke a connection afterwards.

## Connect with an API key

Every MCP client that can send a header can reach the endpoint with a Currents API key, including clients that cannot complete the OAuth flow. The key goes in an `Authorization` header, in place of the `your-api-key` placeholder below:

```json
{
  "mcpServers": {
    "currents": {
      "type": "http",
      "url": "https://api.currents.dev/mcp",
      "headers": {
        "Authorization": "Bearer your-api-key"
      }
    }
  }
}
```

A key is an organization credential rather than a personal one: it names no user, and it carries a single **Read Only** or **Read & Write** access level instead of the permission set OAuth grants. See [api-keys.md](../dashboard/administration/api-keys.md "mention") for creating and scoping one.

## What a connection can reach

The tool list is a property of the connection, and it is rebuilt on every request from the permissions the grant holds, capped by the role the member holds at that moment ([the role sets the ceiling](../authentication/oauth.md#the-role-sets-the-ceiling)). The endpoint registers only the tools whose permission survives that, so a task with no matching tool is access the connection lacks rather than something Currents cannot do - and an agent is not handed a tool it would only collect a `403` from.

| Permission       | Tools                                                                                                                                                                         |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `projects:read`  | `currents-get-projects`, `currents-get-project`, `currents-list-project-terms`                                                                                                 |
| `results:read`   | `currents-get-runs`, `currents-get-run-details`, `currents-find-run`, `currents-get-spec-instance`, `currents-get-test-results`, `currents-get-test-evidence`, `currents-get-context`, `currents-list-pull-requests` |
| `analytics:read` | `currents-get-project-insights`, `currents-get-spec-files-performance`, `currents-get-tests-performance`, `currents-get-errors-explorer`                                       |
| `actions:read`   | `currents-list-actions`, `currents-get-action`, `currents-list-affected-tests`, `currents-get-affected-test-executions`, `currents-get-affected-executions`                     |
| `actions:write`  | `currents-create-action`, `currents-update-action`, `currents-delete-action`, `currents-enable-action`, `currents-disable-action`                                              |
| `runs:write`     | `currents-cancel-run`, `currents-reset-run`, `currents-delete-run`, `currents-cancel-run-github-ci`                                                                            |
| `webhooks:read`  | `currents-list-webhooks`, `currents-get-webhook`                                                                                                                              |
| `webhooks:write` | `currents-create-webhook`, `currents-update-webhook`, `currents-delete-webhook`                                                                                               |
| `issues:write`   | `currents-create-jira-issue`, `currents-link-jira-issue`, `currents-list-jira-projects`, `currents-list-jira-issue-types`                                                      |

`currents-get-tests-signatures` computes a test signature from values the caller already holds, so it is listed for every connection. `projects:write` reaches the REST API and no tool here.

An API key is filtered the same way, by access level rather than by permission: a **Read Only** key is handed the read tools and the two Jira lookups, and a **Read & Write** key is handed the whole catalog.

{% hint style="danger" %}
**Some write tools are irreversible.** `currents-delete-run` permanently deletes a run and everything recorded with it, and `currents-delete-webhook` and `currents-delete-action` remove a configuration outright. None of them has a confirmation step inside Currents - whether the agent asks first is up to the client. Grant `runs:write`, `webhooks:write` and `actions:write`, or a **Read & Write** key, only to an agent that needs them.
{% endhint %}

## Endpoint reference

| | |
| --- | --- |
| Endpoint | `https://api.currents.dev/mcp` |
| Method | `POST` only - `GET` and `DELETE` answer `405` |
| Transport | Streamable HTTP, stateless, one exchange per request |
| Headers | `Content-Type: application/json`, `Accept: application/json, text/event-stream` |
| OAuth resource identifier | `https://api.currents.dev/mcp` |
| OAuth metadata document | `https://api.currents.dev/.well-known/oauth-protected-resource/mcp` |

This endpoint and the REST API are separate OAuth resource servers, so a token minted for one is refused by the other: authorizing an agent to use the tools is not authorizing it to use the whole API. The rest of what a client needs - the authorization server, PKCE, how a client identifies itself - is in [for client developers](../authentication/oauth.md#for-client-developers).

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

* [OAuth](../authentication/oauth.md) - the connection flow, permissions, and revoking access
* [MCP Server](mcp-server.md) - the local `@currents/mcp` package
* [Overview](overview.md) - every way to put Currents data in front of an agent
* [API Keys](../dashboard/administration/api-keys.md) - creating and scoping a key
