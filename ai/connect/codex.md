---
description: >-
  Connect Codex - the CLI, the IDE extension and the ChatGPT desktop app - to
  Currents with one command and a browser sign-in
icon: terminal
---

# Codex

Codex connects to the hosted Currents MCP server at `https://api.currents.dev/mcp`. The Codex CLI, the Codex IDE extension and the ChatGPT desktop app read the same configuration, so adding Currents once makes it available in all three.

## Add the server

```bash
codex mcp add currents --url https://api.currents.dev/mcp
```

This writes an entry to `~/.codex/config.toml`:

```toml
[mcp_servers.currents]
url = "https://api.currents.dev/mcp"
```

To share the server with everyone working in a repository, put the same table in `.codex/config.toml` at the repository root instead. Codex reads project configuration from trusted projects only. The file holds no credential: each person signs in as themselves.

## Sign in

```bash
codex mcp login currents
```

A browser window opens. Sign in to Currents, choose the organization Codex will work in, and approve the permissions it asks for. See [Sign in once, with OAuth](README.md#sign-in-once-with-oauth) for what each screen shows.

Codex renews the connection on its own from then on. To revoke it everywhere, remove it under **Account → Connected Applications** in Currents.

## Check the connection

Run `codex mcp list` to see the configured servers, or type `/mcp` inside a `codex` session to see the active ones. Then ask something only Currents can answer:

> Which tests in `<project>` were flakiest on main this week, and why?

## Ask before writes

Every Currents tool says whether it only reads. Have Codex ask you before any tool that does not:

```toml
[mcp_servers.currents]
url = "https://api.currents.dev/mcp"
default_tools_approval_mode = "writes"
```

With this, Codex runs the read tools on its own and stops for writes such as `currents-delete-run`, which permanently deletes a run. `enabled_tools` and `disabled_tools` narrow the list further - see the [Codex MCP documentation](https://learn.chatgpt.com/docs/extend/mcp).

## Use an API key instead

For a CI job or anywhere no one can complete the browser sign-in, send a Currents [API key](../../dashboard/administration/api-keys.md) from an environment variable:

```bash
codex mcp add currents --url https://api.currents.dev/mcp \
  --bearer-token-env-var CURRENTS_API_KEY
```

```toml
[mcp_servers.currents]
url = "https://api.currents.dev/mcp"
bearer_token_env_var = "CURRENTS_API_KEY"
```

A key acts as the organization rather than as a person, with a single **Read Only** or **Read & Write** level. It creates no entry under **Connected Applications**, so ending it means revoking the key under **Organization → API Keys**.

## Troubleshooting

| What you see                           | What to do                                                                                          |
| -------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Currents tools fail with `401`         | Run `codex mcp login currents`.                                                                     |
| A tool you expect is missing           | Your grant or your role does not include its permission. See [the role sets the ceiling](../../authentication/oauth.md#the-role-sets-the-ceiling). |
| The wrong organization's data          | Each connection reaches one organization. Revoke it in Currents, run `codex mcp login currents` again, and choose the other one. |
| `403` `organization_not_enabled`       | Contact <support@currents.dev>.                                                                     |

More causes are listed under [Remote MCP Server troubleshooting](../mcp-server/remote.md#troubleshooting).
