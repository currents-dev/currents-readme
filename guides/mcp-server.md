---
description: Connect AI Agents to Currents
icon: message-bot
---

# MCP Server

{% embed url="https://www.youtube.com/embed/r3ukps46JqA?cc_lang_pref=en&cc_load_policy=1&rel=0&si=_rmQ4X_tsFTrVcIS" %}

## What is MCP

MCP stands for [**Model Context Protocol**](https://modelcontextprotocol.io/introduction). It's an open pattern, introduced by Anthropic, that provides a consistent way for systems to expose tools and resources that can be used by AI models.

In our case, [Currents MCP server](https://github.com/currents-dev/currents-mcp) acts as a context layer for any tool that can leverage information about a run, such as the spec list, failed tests, errors, and more.

## Get started

**Install our NPM package**

```bash
npm install @currents/mcp
```

**Setup the MCP Server**

{% tabs %}
{% tab title="Cursor" %}
1. Go to Cursor Settings > MCP > Enable
2. Add the following to your `mcp.json`&#x20;

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

> @folder Tests are failing in CI. Get all the details from the run \<runId> and its specs and fix them.

The runId can be copied from the run's "advanced tab" in the dashboard. Soon, the MCP server will be able to fetch the last runs for an organization, removing the need for users to provide a specific run id.

## Use Cases & Capabilities

Currents MCP server currently exposes three tools.

***

`get-api-config`&#x20;

* Get the API key and URL used to make requests to Currents API

`get-run`

* Get the run information by its ID

`get-spec-file-attempts-and-errors`

* Get the instance information about attempts and errors by its ID

***

These tools can be used to provide context to the AI agent about all the details of a run, their specs, errors, duration, and more.&#x20;

This allows AI agents to provide more precise solutions for fixing failing tests, specially those that are flaky and mostly failing in CI.
