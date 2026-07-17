---
description: Connect AI Agents to Currents
icon: message-bot
---

# MCP Server

### What is MCP

MCP stands for [**Model Context Protocol**](https://modelcontextprotocol.io/introduction). It's an open pattern, introduced by Anthropic, that provides a consistent way for systems to expose tools and resources that can be used by AI models.

[Currents MCP server](https://github.com/currents-dev/currents-mcp) is a context layer for AI tools that leverage information about Playwright test results, such as failed tests, errors, and more.

### Get started

**Install our NPM package**

```bash
npm install @currents/mcp
```

**Setup the MCP Server**

{% tabs %}
{% tab title="Cursor" %}
1. Go to Cursor Settings > MCP > Enable
2. Add the following to your `mcp.json`

```json
{
  "mcpServers": {
    "currents": {
      "command": "npx",
      "args": [
        "-y",
        "@currents/mcp"
      ],
      "env": {
        "CURRENTS_API_KEY": "your-api-key"
      }
    }
  }
}
```
{% endtab %}

{% tab title="Claude " %}
Add the following to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "currents": {
      "command": "npx",
      "args": [
        "-y",
        "@currents/mcp"
      ],
      "env": {
        "CURRENTS_API_KEY": "your-api-key"
      }
    }
  }
}
```
{% endtab %}
{% endtabs %}

**Example Prompt**

> @folder Tests are failing in CI. Get all the details from the run `<runId>` fix the failures

Get the `runId` from the run's "Advanced" tab in the dashboard. Soon, the MCP server will be able to fetch the latest runs for an organization, removing the need for users to provide a specific run id.

### Use Cases & Capabilities

Currents MCP server exposes a variety of tools to retrieve projects, runs, test results, and performance metrics.

For a complete and up-to-date list of available tools and their usage, please refer to the [Currents MCP GitHub Repository](https://github.com/currents-dev/currents-mcp).

These tools can be used to provide context to the AI agent about all the details of a run, test executions, and specs, including historical data like error rate, debugging logs, duration, flakiness, and more.

Here are some examples of AI prompts:

* "Please fix this test"
* "Summarize my last test run"
* "What were the top flaky tests in the last 30 days?
* "What were the slowest specs in the last 7 days?"
* "Please fix all my flaky tests"

### Permissions & Security

The MCP server authenticates with the configured `CURRENTS_API_KEY`, and **every operation is limited by that API key's permissions**. The server does not grant any access beyond what the key already allows.

* When the server is configured with a **Read Only** API key, all write operations (for example deleting a run, creating a webhook, or changing an action) are rejected by the Currents API with an **HTTP 403 Forbidden** - regardless of which tools the MCP server exposes to the agent.
* A **Read & Write** key allows the agent to perform write operations. A Read Only key is recommended when the agent only needs to read test results and analytics.

A dedicated key with the appropriate permission should be created to restrict what an AI agent can do through the MCP server. See [api-keys.md](../dashboard/administration/api-keys.md "mention") for how to create and scope API keys.

{% hint style="danger" %}
**Beware of destructive, irrecoverable operations.** When used with a **Read & Write** key, the MCP server can perform permanent deletions with no confirmation step and no way to restore the data. Currently the irrecoverable tools are:

* **`currents-delete-run`** - permanently deletes a run and all associated data (test results, test records, instances, and analytics). This cannot be undone.
* **`currents-delete-webhook`** - permanently removes a webhook configuration.

* **`currents-delete-action`** - permanently removes an action.

Other write operations - such as `currents-cancel-run`, `currents-reset-run`, webhook and action creation/updates, and Jira issue creation/linking - are impactful but reversible. Grant a Read & Write key to an agent only when these capabilities are required.
{% endhint %}
