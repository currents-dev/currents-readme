---
description: >-
  Give an AI agent tools to read and act on your Currents test results over the
  Model Context Protocol - hosted by Currents, or run locally
icon: message-bot
---

# MCP Server

[MCP](https://modelcontextprotocol.io/introduction) (Model Context Protocol) is an open standard for giving an AI agent tools. The Currents MCP server gives an agent tools for your test results: it can list runs, read failures with their evidence and history, rank flaky and slow tests, and act on what it finds - quarantine a test, open a Jira issue, cancel or reset a run.

To set up a specific assistant, go to [Connect Your AI](../connect/README.md).

## Hosted or local

The same tools are served two ways:

|               | [Remote MCP Server](remote.md)                      | [Local MCP Server](local.md)           |
| ------------- | --------------------------------------------------- | -------------------------------------- |
| Address       | `https://api.currents.dev/mcp`                      | The `@currents/mcp` npm package        |
| Runs          | Hosted by Currents                                  | On your machine                        |
| Transport     | Streamable HTTP                                     | stdio                                  |
| Credentials   | OAuth sign-in, or an API key                        | API key only                           |
| Acts as       | The person who signed in, in one organization       | The organization the key belongs to    |
| Tool list     | The tools the connection was granted                | Every tool                             |
| Stays current | Ships with Currents                                 | Re-fetched by the client on each start |

Use the remote server unless your client can only start local servers. It needs nothing installed, and a sign-in gives each person access that follows their own role, which an administrator can revoke without rotating a shared key.

## Tools

These are the tools the [remote server](remote.md) serves. Each needs one permission, and a connection is only handed the tools its permissions cover. The [local package](local.md) is released from its own [repository](https://github.com/currents-dev/currents-mcp), whose README lists the tools in the version you run; it lists every tool it has and relies on the API key to refuse what the key does not allow.

| Permission       | Tools                                                                                                                                                                                                                                                  |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `projects:read`  | `currents-get-projects`, `currents-get-project`, `currents-list-project-terms`                                                                                                                                                                         |
| `results:read`   | `currents-get-runs`, `currents-get-run-details`, `currents-find-run`, `currents-get-spec-instance`, `currents-get-test-results`, `currents-get-test-evidence`, `currents-create-evidence-links`, `currents-get-context`, `currents-list-pull-requests` |
| `analytics:read` | `currents-get-project-insights`, `currents-get-spec-files-performance`, `currents-get-tests-performance`, `currents-get-errors-explorer`                                                                                                               |
| `actions:read`   | `currents-list-actions`, `currents-get-action`, `currents-list-affected-tests`, `currents-get-affected-test-executions`, `currents-get-action-executions`                                                                                              |
| `actions:write`  | `currents-create-action`, `currents-update-action`, `currents-delete-action`, `currents-enable-action`, `currents-disable-action`                                                                                                                      |
| `runs:write`     | `currents-create-session`, `currents-cancel-run`, `currents-reset-run`, `currents-delete-run`, `currents-cancel-run-github-ci`                                                                                                                         |
| `shares:write`   | `currents-create-share-link`                                                                                                                                                                                                                           |
| `webhooks:read`  | `currents-list-webhooks`, `currents-get-webhook`                                                                                                                                                                                                       |
| `webhooks:write` | `currents-create-webhook`, `currents-update-webhook`, `currents-delete-webhook`                                                                                                                                                                        |
| `issues:write`   | `currents-create-jira-issue`, `currents-link-jira-issue`, `currents-list-jira-projects`, `currents-list-jira-issue-types`                                                                                                                              |

`currents-get-tests-signatures` computes a test signature from values the caller already holds, so it is listed for every connection.

Three kinds of tool reach beyond Currents: the Jira tools read and write issues in your connected Jira, the webhook tools store a URL Currents will later send run data to, and `currents-create-share-link` creates a link to test results that anyone can open until it expires.

{% hint style="danger" %}
**Some write tools cannot be undone.** `currents-delete-run` permanently deletes a run and everything recorded with it, and `currents-delete-webhook` and `currents-delete-action` remove a configuration outright. Currents does not ask for confirmation - whether the agent asks first is up to the client. Grant `runs:write`, `webhooks:write` and `actions:write`, or a **Read & Write** key, only to an agent that needs them.
{% endhint %}

## Example prompts

* "Tests are failing in CI. Get the details for run `<runId>` and fix the failures."
* "Summarize the last run - group the failures by likely root cause and tell me which are new versus known flaky."
* "What were the top flaky tests in the last 30 days? Fix the three worst ones."
* "What are the slowest specs in the last 7 days? Suggest what to split or parallelize."
* "When did `checkout.spec.ts` start failing, and what changed in its error message between runs?"

The remote server also publishes skills - multi-step workflows the agent reads before calling tools. [Evidence Sharing](../evidence-sharing.md) is built on them.

## Related

* [Connect Your AI](../connect/README.md) - setup for Claude, ChatGPT, Codex and other clients
* [Remote MCP Server](remote.md) - the hosted endpoint, OAuth and API keys, and troubleshooting
* [Local MCP Server](local.md) - the `@currents/mcp` package
* [OAuth](../../authentication/oauth.md) - permissions, and which roles can grant them
