---
description: Create and manage API keys to access the Currents REST API, MCP server, and integrations
---

# API Keys

API keys authenticate programmatic access to Currents - the [REST API](https://app.gitbook.com/o/-MT4mUcrnbXWgd1xvl_x/s/lcxad7NaXT7D2V6owvHN/), the [MCP Server](../../ai/mcp-server.md), the CLI tools, and other integrations. Every request is authorized against the permissions of the API key it carries, not the dashboard role of the user who created it.

{% hint style="info" %}
API keys are **organization-wide** credentials. They should be treated like passwords - stored in a secret manager and never committed to source control.
{% endhint %}

## Managing API Keys

Only organization **Admins** can create or revoke API keys. **Actions Admin** and **Member** roles can view existing keys, while **Guest** users cannot. See [manage-team.md](manage-team.md "mention") for the full permissions matrix.

To create a key:

1. Navigate to **Organization → API Keys**
2. Click **Create API Key**
3. Set a **label** (used to identify the key in audit logs and notifications)
4. Choose the key **permission** (see below)
5. Copy the generated key - it is shown only once

## API Key Permissions

Each key is assigned one of two permission levels that govern what it can do across the entire organization:

| Permission        | Access                                                                 |
| ----------------- | --------------------------------------------------------------------- |
| **Read Only**     | Read-only access to `GET` endpoints (runs, tests, analytics, metrics). |
| **Read & Write**  | Full read access plus write operations (create, update, delete).       |

Authorization is enforced **server-side at the REST API layer**. A **Read Only** key that attempts a write operation - deleting a run, creating a webhook, changing an action, or creating a Jira issue - is rejected with an **HTTP 403 Forbidden**, regardless of which client or tool issued the request.

{% hint style="warning" %}
**Legacy keys** created before permission levels were introduced default to **Read & Write** for backward compatibility. For read-only access, a new key with the **Read Only** permission should be created rather than reusing an older key.
{% endhint %}

### Scope

API key permissions are **organization-wide**. A key applies to all projects and data in the organization exposed by the endpoints it can reach. There is currently no per-project, per-tool, or per-endpoint key scoping - only the Read Only vs Read & Write distinction.

## Using API Keys

The key is passed as a bearer token in the `Authorization` header:

```bash
curl https://api.currents.dev/v1/runs \
-H "Authorization: Bearer API_KEY_HERE"
```

For MCP and integration setups, the key is provided through the relevant configuration (for example the `CURRENTS_API_KEY` environment variable). See the [MCP Server](../../ai/mcp-server.md) documentation for details.
