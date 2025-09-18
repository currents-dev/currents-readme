---
description: Connect AI Agents to Currents
icon: message-bot
---

# MCP Server

{% embed url="https://www.youtube.com/embed/r3ukps46JqA?cc_lang_pref=en&cc_load_policy=1&rel=0&si=_rmQ4X_tsFTrVcIS" %}

## What is MCP

MCP stands for [**Model Context Protocol**](https://modelcontextprotocol.io/introduction). It's an open pattern, introduced by Anthropic, that provides a consistent way for systems to expose tools and resources that can be used by AI models.

In our case, [Currents MCP server](https://github.com/currents-dev/currents-mcp) acts as a context layer for any tool that can leverage information about a run, such as spec list, failed tests, errors, and more.

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

The runId can be copied from the run's "advanced tab" in the dashboard. Soon, the MCP server will be able to fetch the latest runs for an organization, removing the need for users to provide a specific run id.

## Use Cases & Capabilities

Currents MCP server currently exposes a variety of tools.

***

| Tool                                  | Description                                                                                                                |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `currents-get-projects`               | Retrieves a list of all [projects](../dashboard/projects/) available.                                                      |
| `currents-get-run-details`            | Retrieves details of a specific [test run](../resources/api/api-resources/runs.md).                                        |
| `currents-get-spec-instances`         | Retrieves debugging data a specific execution of a test [spec file](../dashboard/tests/spec-file-status.md).               |
| `currents-get-spec-files-performance` | Retrieves spec file [historical performance](../resources/api/api-resources/spec-files.md) metrics for a specific project. |
| `currents-get-tests-performance`      | Retrieves test [historical performance](../resources/api/api-resources/tests.md) metrics for a specific project.           |
| `currents-get-tests-signatures`       | Retrieves a test signature by its spec file name and test name. Allows the agent to find test results of a specific test.  |
| `currents-get-test-results`           | Retrieves debugging data from [test results](../resources/api/api-resources/test-results.md) of a test by its signature.   |

***

These tools can be used to provide context to the AI agent about all the details of a run, tests executions, and specs, including historical data like error rate, debugging logs, duration, flakiness, and more.&#x20;

Here are some examples of what you can ask your AI agent:

* "Please fix this test"&#x20;
* "What were the top flaky tests in the last 30 days?
* "What were the slowest specs in the last 7 days?"
* "Please fix all my flaky tests"&#x20;
