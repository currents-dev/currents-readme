---
description: >-
  Connect Claude Code to Currents with one command and a browser sign-in, for
  yourself or for everyone working in a repository
icon: terminal
---

# Claude Code

Claude Code connects to the hosted Currents MCP server at `https://api.currents.dev/mcp`. You add the server once, sign in from the browser, and Claude Code can then read your runs and test results and act on them from any session.

## Add the server

Run this in a terminal:

```bash
claude mcp add --transport http --scope user currents https://api.currents.dev/mcp
```

`--scope` decides where the entry is saved and who gets it:

| Scope             | Available in                   | Saved in                          |
| ----------------- | ------------------------------ | --------------------------------- |
| `user`            | Every project on this machine  | `~/.claude.json`                  |
| `local` (default) | The current project, for you   | `~/.claude.json`                  |
| `project`         | The current project, for everyone who clones it | `.mcp.json` in the repository root |

To share the server with your team, add it with `--scope project` and commit the `.mcp.json` it writes:

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

The file holds no credential. Each person who opens the project approves the server and signs in as themselves, so the connection carries their own role and organization.

## Sign in

1. Start Claude Code and run `/mcp`.
2. Select **currents** and choose **Authenticate**. A browser window opens.
3. Sign in to Currents, choose the organization Claude Code will work in, and approve the permissions it asks for. See [Sign in once, with OAuth](README.md#sign-in-once-with-oauth) for what each screen shows.
4. Return to Claude Code. `/mcp` now shows **currents** as connected.

On a machine with no browser, run `claude mcp login currents --no-browser`. It prints the sign-in URL for you to open elsewhere, and asks you to paste back the address the browser lands on.

Claude Code keeps the connection renewed from then on. `claude mcp logout currents` clears it on this machine; to revoke it everywhere, remove **Claude Code** under **Account → Connected Applications** in Currents.

## Check the connection

```bash
claude mcp list
```

`currents` shows `✔ Connected` once you are signed in, and `! Needs authentication` before that. Then ask Claude Code something only Currents can answer:

> What failed in the last run of `<project>` on main, and which of those tests are flaky?

## Decide which tools run without asking

Claude Code asks before it calls an MCP tool. To stop it asking for tools that only read, allow them by name in `.claude/settings.json` and leave the write tools prompting:

```json
{
  "permissions": {
    "allow": [
      "mcp__currents__currents-get-projects",
      "mcp__currents__currents-get-runs",
      "mcp__currents__currents-get-run-details",
      "mcp__currents__currents-find-run",
      "mcp__currents__currents-get-test-results",
      "mcp__currents__currents-get-context",
      "mcp__currents__currents-get-tests-performance"
    ]
  }
}
```

`mcp__currents` alone would allow every Currents tool, including `currents-delete-run`, which permanently deletes a run. [Tools](../mcp-server/README.md#tools) lists every tool and the permission it needs.

## Use the connector from claude.ai instead

If you sign in to Claude Code with a claude.ai account, a Currents connector you connected in claude.ai is available in Claude Code with no `claude mcp add` command. Connect it once from the [Claude connectors directory](claude.md#connect-from-the-claude-directory), and it follows your Claude account to every machine you sign in on.

The connector shows in `/mcp` as **claude.ai Currents**. Its tool names start with `mcp__claude_ai_Currents__` instead of `mcp__currents__`, so write permission rules with that prefix: `mcp__claude_ai_Currents__currents-get-runs`. See [Use MCP servers from claude.ai](https://code.claude.com/docs/en/mcp#use-mcp-servers-from-claude-ai) in the Claude Code documentation.

## Use an API key instead

For a CI job or anywhere no one can complete the browser sign-in, send a Currents [API key](../../dashboard/administration/api-keys.md) in a header:

```bash
claude mcp add --transport http currents https://api.currents.dev/mcp \
  --header "Authorization: Bearer $CURRENTS_API_KEY"
```

In a committed `.mcp.json`, reference the key from the environment so it never lands in the repository:

```json
{
  "mcpServers": {
    "currents": {
      "type": "http",
      "url": "https://api.currents.dev/mcp",
      "headers": {
        "Authorization": "Bearer ${CURRENTS_API_KEY}"
      }
    }
  }
}
```

To stop using it, run `claude mcp remove currents`; the key itself keeps working until an Admin revokes it under **Organization → API Keys**.

A key acts as the organization rather than as a person, with a single **Read Only** or **Read & Write** level. A **Read Only** key gets the read tools, the two Jira lookups and `currents-create-evidence-links`, and nothing else.

## Pair it with the Playwright skill

Currents tells Claude Code what failed and why; the [Playwright Best Practices skill](../agent-skill-playwright-best-practices.md) shapes how it writes the fix:

```bash
npx skills add https://github.com/currents-dev/playwright-best-practices-skill
```

## Troubleshooting

| What you see                           | What to do                                                                                          |
| -------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `! Needs authentication`               | Run `/mcp`, select **currents** and choose **Authenticate**.                                        |
| A tool you expect is missing           | Your grant or your role does not include its permission. See [the role sets the ceiling](../../authentication/oauth.md#the-role-sets-the-ceiling). |
| The wrong organization's data          | Each connection reaches one organization. Run `claude mcp logout currents`, then authenticate again and choose the other one. |
| `403` `organization_not_enabled`       | Contact <support@currents.dev>.                                                                     |

More causes are listed under [Remote MCP Server troubleshooting](../mcp-server/remote.md#troubleshooting).
