---
description: >-
  Authorize an application to act as a Currents user inside one organization -
  the connection flow, the permissions a grant carries, and how to review or
  revoke it
icon: key
---

# OAuth

OAuth is how an application outside Currents gets access without anyone handing it a key. A person signs in, picks one organization, and approves a named list of permissions; the application receives an access token that acts as that person, inside that organization, limited to what was approved.

It is the alternative to an [API key](../../dashboard/administration/api-keys.md), not a replacement for it. The two answer different questions:

|                       | OAuth access token                                        | API key                                     |
| --------------------- | --------------------------------------------------------- | ------------------------------------------- |
| Belongs to            | A person                                                  | An organization                             |
| Reaches               | One organization, chosen when it was authorized           | The organization it was created in          |
| Permissions           | The set consented to, capped by the member's role         | One `Read Only` or `Read & Write` level     |
| Obtained by           | Approving a screen in the browser                         | Copying a value out of the dashboard        |
| Lives                 | In the application, refreshed on its own                  | Wherever it was pasted                      |
| Ends when             | The person or an administrator revokes it                 | The key is deleted                          |
| Attributable          | Yes - actions carry the person who authorized it          | No - a key names no user                    |

A key suits a CI job, which has no person behind it. OAuth suits anything a person drives - an editor, an agent, a script run on someone's own machine - because access can be scoped below what the key would give and taken away without rotating a secret everyone shares.

## What accepts an OAuth token

Two Currents services do, and they are separate as far as a token is concerned:

| Service              | Address                        |
| -------------------- | ------------------------------ |
| The REST API         | `https://api.currents.dev`     |
| The remote MCP server | `https://api.currents.dev/mcp` |

A token is minted for one of them and named in the request that created it. A token for the REST API is refused by the MCP endpoint, and a token for the MCP endpoint is refused by the REST API - so authorizing an agent to use the tools does not hand it the whole API. An application that needs both asks for both, and holds a token per service.

See [remote-mcp.md](../../ai/remote-mcp.md "mention") for connecting an agent to the MCP endpoint.

## Authorizing an application

The application opens a Currents URL in the browser. Three screens follow.

### 1. Sign in

Only when that browser has no Currents session yet. Whatever the organization uses to sign in to the dashboard - including SSO - is what applies here; OAuth adds no second way in.

### 2. Choose an organization

A token reaches one organization, and every call the application makes acts inside it. The screen lists the organizations the account belongs to with the role held in each, and names the access level that role allows.

<figure><img src="../../.gitbook/assets/oauth-select-organization.png" alt="The organization selection screen, listing two organizations with the role held in each"><figcaption><p>An application authorized here reaches this organization and no other</p></figcaption></figure>

Authorizing the same application for a second organization is a separate grant, made by going through the flow again. Revoking one leaves the other alone.

### 3. Authorize

The consent screen names the application, the address it will receive authorization codes at, and every permission it asked for, marked as a read or a write.

<figure><img src="../../.gitbook/assets/oauth-consent.png" alt="The Currents consent screen, listing the permissions an application requested as reads and writes"><figcaption><p>Nothing is granted that is not on this screen</p></figcaption></figure>

Currents verifies nothing an application claims about itself unless it is marked **Listed**, which means Currents ships the definition of that client. Anything else is marked **3rd Party**: its name, its icon and its description are its own claims. The redirect address on the screen is the part worth reading - it is where the authorization code goes, and a familiar application sending codes to an unfamiliar address is the signal that something is wrong.

Approving returns the application to its own callback with the grant in place. From there it refreshes its own access tokens, so nobody is asked again unless the grant is revoked or the application starts asking for something new.

## Permissions

A grant carries a set of named permissions, and each one covers a specific area. An application receives exactly what was approved.

| Permission       | What it reaches                                                                                         |
| ---------------- | -------------------------------------------------------------------------------------------------------- |
| `projects:read`  | Which projects exist, and a project's settings, tags, branches and authors                               |
| `projects:write` | Project configuration, including a project's tags                                                        |
| `results:read`   | Runs, spec files, test results, failure evidence, and the runs on a pull request                         |
| `analytics:read` | Aggregate metrics - project insights, error counts, and spec-file and test performance                   |
| `actions:read`   | Quarantine, skip and tag rules, and the tests they affected                                              |
| `actions:write`  | Creating, editing, enabling, disabling and archiving those rules                                         |
| `runs:write`     | Cancelling and resetting runs, and deleting runs and their artifacts                                     |
| `webhooks:read`  | Webhook configuration, including destination URLs and headers                                            |
| `webhooks:write` | Creating, editing and deleting webhooks                                                                  |
| `issues:write`   | Creating and linking issues in the organization's connected issue tracker, and listing its projects and issue types |

Alongside these, an application may ask to verify the signer's identity (`openid`), read their name (`profile`) or email address (`email`), and stay connected without asking again (`offline_access`). Those say nothing about test data.

Each API endpoint names the single permission it needs, so a grant is not a blanket read or write: `runs:write` cancels a run and does not touch a webhook. A call made without the permission it needs is refused, and the refusal names what is missing.

{% hint style="danger" %}
`runs:write` includes permanently deleting a run and everything recorded with it, and `webhooks:write` and `actions:write` include deleting a configuration outright. None of these can be undone from Currents. Approve them only for an application that needs them.
{% endhint %}

### The role sets the ceiling

Consent cannot grant more than the member's role already permits. A permission the role does not allow is dropped from the request before the grant records it, and the screen says which permission was withheld and which role holds it.

The role is then re-checked on every request rather than only at consent, so a role that changes later takes effect immediately: lowering a member's role suspends the permissions it covered, and raising it again restores them.

What separates the two cases is whether the grant holds the permission at all. One withheld at consent was never recorded, so a higher role only makes it grantable - the application still has to ask for it again. One recorded and later suspended by a lower role is still on the grant, and returns on its own.

This is the part an API key cannot do. A key's access level is read when a call is made, so changing it takes effect at once; a token that was not re-checked would otherwise keep whatever the role allowed when it was issued.

## Reviewing and revoking access

Each person sees every application they authorized under **Account → Connected Applications**, grouped by organization, with the permissions each grant holds and when it was last used.

<figure><img src="../../.gitbook/assets/oauth-connected-applications.png" alt="The Connected Applications panel in a Currents account, showing one authorized application with its permissions and a remove control"><figcaption><p>Account → Connected Applications</p></figcaption></figure>

An organization administrator sees the same grants for everyone under **Manage Organization → Connected Applications**, listed by application or by person, and can revoke any of them.

<figure><img src="../../.gitbook/assets/oauth-org-connections.png" alt="The organization-wide Connected Applications panel, listing an application, how many people authorized it, and when it was last used"><figcaption><p>Manage Organization → Connected Applications</p></figcaption></figure>

Removing a grant takes the consent and the application's ability to renew with it, so it cannot quietly resume, and it covers every machine the application was installed on - one grant is not one computer. The application asks for authorization again the next time it runs.

<figure><img src="../../.gitbook/assets/oauth-revoke-connection.png" alt="The remove connection dialog, naming the application, the organization it loses access to, and the up to one hour window"><figcaption><p>What removing a connection does, and when it takes effect</p></figcaption></figure>

**An access token already issued keeps working until it expires, up to an hour.** Each service checks a token's signature rather than asking the authorization server about it on every call, so a revoked grant cannot recall one that is already out. Revocation stops renewal at once; it stops the current token when that token runs out.

Ending a membership is the exception, and it is immediate. The organization and role behind a token are read on every request, so someone removed from an organization loses access there on the next call the application makes - there is no window.

Because a grant covers one organization, revoking it in one leaves the person's grants in other organizations alone.

### When access ends without anyone asking

Currents emails the person whose access ended when it was not them who ended it, so an application that suddenly stops working does not read as a broken tool. Four things trigger it:

* an administrator removed the grant
* their membership in that organization ended
* the same refresh token was presented twice, which is the signature of a stolen one - Currents cancels the whole family
* the application itself was disabled or deleted

Each email names the organization access was lost in and the grants the person still holds elsewhere, so a single revocation does not read as losing everything. No email carries a credential.

## For client developers

An application needs nothing arranged with Currents in advance. Pointed at `https://api.currents.dev`, it discovers everything else:

| It reads                                                              | It learns                                            |
| --------------------------------------------------------------------- | ---------------------------------------------------- |
| The `401` from the service it called                                   | `WWW-Authenticate`, naming the metadata document     |
| That metadata document                                                 | The service's identifier, and its authorization server |
| `https://id.currents.dev/.well-known/oauth-authorization-server`       | The authorize, token and JWKS endpoints              |

| | |
| --- | --- |
| Authorization server | `https://id.currents.dev` |
| REST API metadata | `https://api.currents.dev/.well-known/oauth-protected-resource` |
| MCP metadata | `https://api.currents.dev/.well-known/oauth-protected-resource/mcp` |
| Grant types | `authorization_code`, `refresh_token` |
| PKCE | Required, `S256` |

Two things are worth knowing before building against it:

- **The service has to be named.** An authorization request states which service the token is for, and one that names none is refused - a token with no audience would be rejected by every service it was then spent at.
- **Client registration is not dynamic.** Currents does not accept dynamic client registration. A client identifies itself with a [Client ID Metadata Document](https://datatracker.ietf.org/doc/draft-parecki-oauth-client-id-metadata-document/) - an HTTPS URL it serves its own metadata at, which Currents fetches - or it is one of the clients Currents ships a definition for. A client with neither reports something like `does not support dynamic client registration`, and has to use an API key instead.

### Refusals

| Code                  | Meaning                                                                                                   |
| --------------------- | ---------------------------------------------------------------------------------------------------------- |
| `insufficient_scope`  | The endpoint needs a permission the grant does not hold. The refusal names it, so the application can ask for that one and retry. |
| `insufficient_role`   | The permission is on the grant, but the member's role no longer allows it. Authorizing again changes nothing until the role is raised. |
| `api_key_required`    | The endpoint takes an API key and not a token. No permission grants access to it.                          |

A `401` always carries the pointer an application needs to authorize or re-authorize; a `403` carries the reason and, where there is one to ask for, the permission to ask for.

## Related

* [Remote MCP Server](../../ai/remote-mcp.md) - connecting an agent over OAuth
* [API Keys](../../dashboard/administration/api-keys.md) - the organization credential
* [Manage Team](../../dashboard/administration/manage-team.md) - the roles that set the ceiling
