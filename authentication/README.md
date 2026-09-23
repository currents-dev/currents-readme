---
description: >-
  How something outside Currents proves who it is - an API key for automation,
  an OAuth grant for an application a person drives, or a personal access token
  for a person's own scripts and tools
icon: key
---

# Authentication

Currents accepts three kinds of credential, and which one to use follows from whether a person is behind the calls, and whether an application is holding the credential on their behalf.

| | |
| --- | --- |
| [OAuth](oauth.md) | An application acts as the person who authorized it, inside one organization, limited to the permissions they approved and capped by their role. Revocable per person, per organization, from the dashboard. |
| [Personal Access Tokens](personal-access-tokens.md) | A person's own credential for one organization, carrying the permissions chosen when it was created and expiring on a date set then. Created by an administrator for themselves, with no application and no authorization flow involved. |
| [API Keys](../dashboard/administration/api-keys.md) | An organization credential with a single `Read Only` or `Read & Write` level. It names no user, so it suits CI and anything else with nobody behind it. |

Reporters uploading test results use a [record key](../guides/record-key.md) instead, which is neither of these - it identifies a project to report into and reaches nothing else.
