---
description: Connect AI agents to Currents test results, failures and CI runs
icon: message-bot
---

# MCP Server

The Currents MCP server gives AI agents such as Claude access to your test runs, failures, evidence and analytics in Currents. An agent can find the run that broke, read what each test failed on, compare a pull request against `main`, quarantine a flaky test, or open a Jira issue with the evidence attached.

[MCP (Model Context Protocol)](https://modelcontextprotocol.io/introduction) is an open standard for connecting AI applications to tools and data.

There are two ways to connect:

| | Remote server | Local server |
| --- | --- | --- |
| Address | `https://api.currents.dev/mcp` | `npx -y @currents/mcp` |
| Sign-in | Your Currents account, through OAuth | An API key |
| Access | The permissions you approve when you connect | The API key's permissions |
| Install | Nothing to install | Node.js on your machine |

Use the remote server with Claude. Use the local server with tools that only run MCP servers locally, or when you want an agent to act with an API key rather than your own account.

## Connect the remote server

### Claude (claude.ai and Claude Desktop)

1. In Claude, open **Settings → Connectors**.
2. Choose **Add custom connector**.
3. Enter the name `Currents` and the URL `https://api.currents.dev/mcp`, then choose **Add**.
4. Choose **Connect**. Claude opens Currents in your browser.
5. Sign in to Currents, choose the organization to connect, and review the permissions Claude asks for. Choose **Allow**.

The connector then appears in Claude's tools menu. A connector added on claude.ai is also available in Claude Desktop.

{% hint style="info" %}
Organization owners and admins on a Claude Team or Enterprise plan may need to add the connector for the organization before members can connect it.
{% endhint %}

### What you are asked to approve

When you connect, Currents shows the permissions the application asks for. The agent is only given the tools those permissions cover — a connection without `runs:write`, for example, has no tool that can cancel or delete a run.

| Permission | What it allows |
| --- | --- |
| `projects:read` | List projects, and read a project's settings, tags, branches and authors |
| `results:read` | Read runs, spec executions, test results, failure evidence and the runs on a pull request; create trace links |
| `analytics:read` | Read aggregate metrics: project insights, error counts, and spec-file and test performance |
| `actions:read` | Read quarantine, skip and tag rules, and the tests they affected |
| `actions:write` | Create, edit, enable, disable and archive those rules |
| `issues:write` | Create and link Jira issues, and list Jira projects and issue types |
| `runs:write` | Cancel, reset and delete runs, and record browser sessions as runs |
| `webhooks:read` | Read webhook configuration, including destination URLs |
| `webhooks:write` | Create, edit and delete webhooks |

A connection is tied to one Currents organization. To use a second organization, connect again and choose it.

To disconnect, remove the connector in Claude, or revoke it in Currents under **Account → Connected Applications**. Organization admins can review and revoke every member's connections under the organization's **Connected Applications** page.

## Connect the local server

The local server runs on your machine and authenticates with a Currents API key. Create one as described in [api-keys.md](../dashboard/administration/api-keys.md "mention").

{% tabs %}
{% tab title="Cursor" %}
1. Go to Cursor Settings > MCP > Enable
2. Add the following to your `mcp.json`

```json
{
  "mcpServers": {
    "currents": {
      "command": "npx",
      "args": ["-y", "@currents/mcp"],
      "env": {
        "CURRENTS_API_KEY": "your-api-key"
      }
    }
  }
}
```
{% endtab %}

{% tab title="Claude Desktop" %}
Add the following to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "currents": {
      "command": "npx",
      "args": ["-y", "@currents/mcp"],
      "env": {
        "CURRENTS_API_KEY": "your-api-key"
      }
    }
  }
}
```
{% endtab %}
{% endtabs %}

A **Read Only** key gives the agent read tools only in effect: every write is refused by the Currents API with **403 Forbidden**. Use a **Read & Write** key only when the agent needs to change something.

## Example prompts

These ask the agent to combine several tools:

* "The `checkout` suite has been flaky on `main` this week. Find which tests are flakiest, look at what they failed on, and quarantine the worst one."
* "Our nightly run failed last night. Tell me what broke, and open a Jira issue for the first real failure with the evidence attached."
* "Compare this pull request's runs against `main` and tell me whether it is safe to merge."
* "Show me the screenshots the `signup` test produced in the last run on `main`, and give me a link I can paste into a pull request."
* "What were the slowest spec files in the last 7 days, and how has their duration changed?"

## Tools

Each tool is listed under the permission it needs. **Read** tools do not change anything. **Write** tools change data in Currents or in a connected system. **Destructive** marks the writes that remove or overwrite something.

#### Runs, results and failure evidence — `results:read`

| Tool | What it does | Type |
| --- | --- | --- |
| `currents-create-trace-link` | Create a shareable link that serves a test attempt's Playwright trace: a markdown digest of what the attempt did and what failed, a filmstrip, an animated screencast, DOM snapshots, network requests and attachments. | Write |
| `currents-find-run` | Find a run by query parameters. | Read |
| `currents-get-context` | Get test failure context for AI debugging at run, instance, or test level. | Read |
| `currents-get-run-details` | Retrieves details of a specific test run. | Read |
| `currents-get-runs` | Retrieves a list of runs for a specific project with optional filtering. | Read |
| `currents-get-spec-instance` | Retrieves debugging data from a specific execution of a test spec file by instanceId. | Read |
| `currents-get-test-evidence` | Collect evidence artifacts (screenshots, videos, traces, attachments) produced by tests in a CI run, with signed download URLs grouped per test. | Read |
| `currents-get-test-results` | Retrieves historical test execution results for a specific test signature. | Read |
| `currents-list-pull-requests` | List pull-request cards for a project (runs grouped by meta.pr.id). | Read |
| `currents-get-tests-signatures` | Generates a unique test signature based on project, spec file path, and test title. | Read |

#### Analytics — `analytics:read`

| Tool | What it does | Type |
| --- | --- | --- |
| `currents-get-errors-explorer` | Get aggregated error metrics for a project within a date range. | Read |
| `currents-get-project-insights` | Get aggregated run and test metrics for a project within a date range. | Read |
| `currents-get-spec-files-performance` | Retrieves spec files performance metrics for a specific project within a date range. | Read |
| `currents-get-tests-performance` | Retrieves aggregated test metrics for a specific project within a date range. | Read |

#### Projects — `projects:read`

| Tool | What it does | Type |
| --- | --- | --- |
| `currents-get-project` | Get a single project by ID. | Read |
| `currents-get-projects` | Retrieves projects available in the Currents platform. | Read |
| `currents-list-project-terms` | List cursor-paginated project terms for one type (tag, branch, authorName, etc.). | Read |

#### Actions (read) — `actions:read`

| Tool | What it does | Type |
| --- | --- | --- |
| `currents-get-action` | Get a single action by ID. | Read |
| `currents-get-action-executions` | Keyed on an action: lists the test executions one rule was applied to, across every test it touched, within a date range. | Read |
| `currents-get-affected-test-executions` | Keyed on a test: lists the executions of one test that an action applied to, within a date range, with the run, branch and commit of each. | Read |
| `currents-list-actions` | List all actions for a project with optional filtering. | Read |
| `currents-list-affected-tests` | List tests affected by actions (quarantine, skip, tag) for a project within a date range. | Read |

#### Actions (write) — `actions:write`

| Tool | What it does | Type |
| --- | --- | --- |
| `currents-create-action` | Create a new action for a project. | Write |
| `currents-delete-action` | Delete (archive) an action. | Write, destructive |
| `currents-disable-action` | Disable an active action. | Write |
| `currents-enable-action` | Enable a disabled action. | Write |
| `currents-update-action` | Update an existing action. | Write, destructive |

#### Run management — `runs:write`

| Tool | What it does | Type |
| --- | --- | --- |
| `currents-cancel-run` | Cancel a run in progress. | Write, destructive |
| `currents-cancel-run-github-ci` | Cancel a run by GitHub Actions workflow run ID and attempt number. | Write, destructive |
| `currents-create-session` | Record a browser session you drove as a Currents run, so its evidence can be read and shared like a CI run's. | Write |
| `currents-delete-run` | Delete a run and all associated data. | Write, destructive |
| `currents-reset-run` | Reset failed spec files in a run to allow re-execution. | Write, destructive |

#### Jira — `issues:write`

| Tool | What it does | Type |
| --- | --- | --- |
| `currents-create-jira-issue` | Create a Jira issue from a run test using the organization Jira integration. | Write |
| `currents-link-jira-issue` | Link an existing Jira issue to a run test using the organization Jira integration. | Write |
| `currents-list-jira-issue-types` | List Jira issue types and custom fields for a Jira project. | Read |
| `currents-list-jira-projects` | List Jira projects available for the organization integration. | Read |

#### Webhooks (read) — `webhooks:read`

| Tool | What it does | Type |
| --- | --- | --- |
| `currents-get-webhook` | Get a single webhook by ID. | Read |
| `currents-list-webhooks` | List all webhooks for a project. | Read |

#### Webhooks (write) — `webhooks:write`

| Tool | What it does | Type |
| --- | --- | --- |
| `currents-create-webhook` | Create a new webhook for a project. | Write |
| `currents-delete-webhook` | Delete a webhook. | Write, destructive |
| `currents-update-webhook` | Update an existing webhook. | Write, destructive |

`currents-get-tests-signatures` needs no particular permission and is available to every connection.

## Security and data

### Destructive operations

With write permissions, an agent can remove data, and Currents does not ask for a separate confirmation. Claude asks for your approval before it runs a write tool unless you have told it not to. Once these run, they cannot be undone:

* `currents-delete-run` permanently deletes a run and all its data: test results, spec executions and analytics.
* `currents-delete-webhook` permanently removes a webhook.

Cancelling and resetting runs, archiving and editing actions, and editing webhooks change state in ways that affect your CI. Approve only the permissions the task needs.

### Systems outside Currents

* The **Jira** tools read and write issues in the Jira site connected to your Currents organization.
* The **webhook** tools store a URL that Currents will later send run data to.

### Test output is untrusted input

Tool results contain text your tests and CI produced: test titles, error messages, stack traces, console output and attachments, plus Jira issue text. Anyone who can change a test or file a Jira issue can write that text. The server tells the agent to treat it as data and to report any instructions it contains rather than follow them. This lowers the risk, but does not remove it. The permissions you grant are what limit what an agent can do.

### What Currents records

For each tool call, Currents records the tool name, whether it succeeded, the HTTP status of the underlying API call, and the organization and user it was made for. It does not record tool arguments, results, or anything from your conversation.

Creating or linking a Jira issue is also recorded in your organization's audit log, including the issue details, as it is when you do it from the dashboard.

Runs, test results and evidence are kept according to your plan. See the [Privacy Policy](https://currents.dev/privacy-policy) and [Terms of Service](https://currents.dev/tos).

### Limits

The remote server accepts up to 120 requests per minute for each user and 600 per minute for each organization. A result too large to return is refused with a message asking the agent to narrow the request — a shorter date range, a smaller limit, or fewer spec files.

## Support

* Product questions: [support@currents.dev](mailto:support@currents.dev)
* Security issues: [security@currents.dev](mailto:security@currents.dev) — see the [Security page](https://currents.dev/security)
* Source for the local server: [currents-dev/currents-mcp](https://github.com/currents-dev/currents-mcp)
