---
description: >-
  Connect any MCP client to the hosted Currents MCP server by hand - the
  address, the transport, and the two ways to authenticate
icon: sliders
---

# Other MCP Clients

Any MCP client that speaks Streamable HTTP can use Currents. If your assistant has its own page in [Connect Your AI](README.md), follow that instead. Otherwise, configure it with these values:

| Setting        | Value                                              |
| -------------- | -------------------------------------------------- |
| Server URL     | `https://api.currents.dev/mcp`                     |
| Transport      | Streamable HTTP (sometimes labeled `http`)         |
| Authentication | OAuth, or a Currents API key as a bearer token     |

## With OAuth

Most clients need only the URL. The client discovers the rest from the server, opens a browser for you to sign in, choose an organization and approve permissions, and renews the connection on its own. A typical configuration:

```json
{
  "mcpServers": {
    "currents": {
      "type": "http",
      "url": "https://api.currents.dev/mcp"
    }
  }
}
```

Leave any client ID and secret fields empty. The client must identify itself with a Client ID Metadata Document; one that can only register itself dynamically cannot sign in and needs an API key instead. See [for client developers](../../authentication/oauth.md#for-client-developers).

## With an API key

Send a Currents [API key](../../dashboard/administration/api-keys.md) in the `Authorization` header:

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

A key acts as the organization rather than as a person, with a single **Read Only** or **Read & Write** level. Use a **Read Only** key unless the agent needs to change something.

## If your client only runs local servers

Some clients can only start an MCP server as a local process. Use the [Local MCP Server](../mcp-server/local.md), the `@currents/mcp` package, which runs on your machine and authenticates with an API key.

## Reference

[Remote MCP Server](../mcp-server/remote.md) covers the endpoint in full: which tools a connection is handed, the headers it expects, and what each error means.
