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
