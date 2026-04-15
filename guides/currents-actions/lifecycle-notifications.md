---
description: Configure and receive action lifecycle notifications
---

# Lifecycle Notifications

Action lifecycle notifications inform teams when actions are created, disabled, re-enabled, archived, expired or approaching expiration. Currents delivers these notifications to Slack, email, or both.

This provides visibility into changes and upcoming expirations without requiring visiting the dashboard. Teams receive timely updates, allowing them to respond before a forgotten quarantine leads to unexpected test failures.

Notification settings are configured entirely in the dashboard. The REST API can create and manage actions, but notification routing is configured per project in the **Action > Settings** page.

<figure><img src="../../.gitbook/assets/image (55).png" alt=""><figcaption><p>Navigate to Action Settings</p></figcaption></figure>

<figure><img src="../../.gitbook/assets/image (56).png" alt=""><figcaption><p>Actions Settings > Notifications Page</p></figcaption></figure>

### Configuration and Delivery

#### Slack

Enabling Slack notifications requires two steps:

1. **Connect Slack to the organization** following the [#installation](../../resources/integrations/slack/slack-app.md#installation "mention").

{% hint style="info" %}
Note that this OAuth flow requires an organization administrator.
{% endhint %}

<figure><img src="../../.gitbook/assets/image (48).png" alt=""><figcaption><p>Missing Slack App installation</p></figcaption></figure>

2. **Enable Slack notifications** in the Action Settings page:

* select a channel
* choose the events

Connecting Slack under Integrations alone does not enable notifications — they must be configured on this page.

<figure><img src="../../.gitbook/assets/image (59).png" alt=""><figcaption><p>Slack channel configuration</p></figcaption></figure>

Once Slack is connected, anyone with **Actions Admin** access can configure the channel and events. If the Slack option is unavailable, an organization administrator must complete the Integrations setup first.

#### Email

Email is configured on the same page. Slack and email are independent — either or both can be enabled.

<figure><img src="../../.gitbook/assets/image (50).png" alt=""><figcaption><p>Email channel configuration</p></figcaption></figure>

Recipients include:

* **Action creator** — always listed, but mail is sent only when the creator value is a valid email address.
* **Organization administrators** and **action administrators** — optional.
* **Additional emails** — up to ten extra addresses.

{% hint style="warning" %}
**Action creator notice**

When an action is created via the REST API, the creator is stored as the API key label, which is not an email address and does not receive creator mail. For API-driven workflows, add additional emails or enable admin recipients.
{% endhint %}

{% hint style="info" %}
**Notification attribution**

Every notification displays the original creator of the action. For disable, re-enable, and archive events, the notification also identifies who performed the action — the signed-in user (dashboard) or the API key label (REST API). Expiring and expired notifications are system-triggered and display only the original creator.
{% endhint %}

<figure><img src="../../.gitbook/assets/image (53).png" alt=""><figcaption><p>Slack notification example</p></figcaption></figure>

<figure><img src="../../.gitbook/assets/image (54).png" alt=""><figcaption><p>Email notification example</p></figcaption></figure>

### Available Events

Each event can be enabled or disabled separately for Slack and email.

| Event                 | What triggers it                                                                                       |
| --------------------- | ------------------------------------------------------------------------------------------------------ |
| **Action created**    | A new action is created.                                                                               |
| **Action disabled**   | An action is manually disabled while it has not yet expired.                                           |
| **Action re-enabled** | A disabled action is re-enabled while it has not yet expired.                                          |
| **Action archived**   | An action is archived (soft-deleted) via the REST API.                                                 |
| **Action expiring**   | An active action will expire within the next 12 hours.                                                 |
| **Action expired**    | An action's expiration time passed within the last 12 hours (older expirations do not trigger alerts). |

### Important Notes

**Expiring** and **expired** notifications both use a 12-hour window. Expiring looks ahead — the expiration falls within the next 12 hours. Expired looks back — the expiration occurred within the last 12 hours.

If an expiration is set or changed very close to the actual moment — within that same 12-hour window — Currents may skip the expiring or expired notification to avoid redundant alerts.

Additional edge cases:

* **Already expired, then disabled** — no "action disabled" notification is sent.
* **Re-enabled while still expired** — no "action re-enabled" notification is sent. This event applies only when the action is not expired at the time it is re-enabled.
* **Bulk changes** — each qualifying action receives its own notification. There is no combined digest for batch operations.

<br>
