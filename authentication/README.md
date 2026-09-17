---
description: >-
  How something outside Currents proves who it is - an API key for automation,
  or an OAuth grant for an application a person drives
icon: key
---

# Authentication

Currents accepts two kinds of credential, and which one to use follows from whether a person is behind the calls.

| | |
| --- | --- |
| [OAuth](oauth.md) | An application acts as the person who authorized it, inside one organization, limited to the permissions they approved and capped by their role. Revocable per person, per organization, from the dashboard. |
| [API Keys](../dashboard/administration/api-keys.md) | An organization credential with a single `Read Only` or `Read & Write` level. It names no user, so it suits CI and anything else with nobody behind it. |

Reporters uploading test results use a [record key](../guides/record-key.md) instead, which is neither of these - it identifies a project to report into and reaches nothing else.
