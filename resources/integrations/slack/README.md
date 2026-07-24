---
description: >-
  Integrating Slack with Currents dashboard for test notifications
icon: slack
---

# Slack

Currents integration with Slack allows posting test results directly into Slack channels, helping your team stay informed about test outcomes without leaving Slack.

There are two versions of Slack integration available:

{% hint style="info" %}
**Recommendation:** We recommend using the Slack App integration due to its advanced features and improved security model.
{% endhint %}

## [Slack App](slack-app.md) Integration (Recommended)

The Slack App integration provides a rich, feature-complete experience for test notifications:

* ✅ Organization-level installation with per-project configuration
* ✅ Multiple destinations (the dashboard shows your organization's limit; the default is 10)
* ✅ Run-level notifications with thread-based grouping
* ✅ Individual failed or flaky test notifications
* ✅ Fix with AI from failed-test messages
* ✅ Advanced filtering by tags, branches, and commit messages
* ✅ Annotation-based mentions (users, groups, emails)
* ✅ UI-based mention rules configuration
* ✅ Improved security with OAuth 2.0

The Slack App also delivers independently configured [Action lifecycle notifications](../../../guides/currents-actions/lifecycle-notifications.md) for actions that are created, disabled, re-enabled, archived, expiring, or expired. Connecting Slack under **Integrations** does not enable these notifications; configure them under **Actions > Settings**.

## [Slack Webhook](slack-webhook.md) Integration (Legacy)

The webhook-based integration provides basic notification functionality:

* ✅ Simple setup with Incoming Webhooks
* ✅ Run start, finish, timeout, and cancel notifications
* ✅ Branch name filtering
* ✅ Tag-based filtering
* ❌ No individual test notifications
* ❌ No annotation-based mentions
* ❌ Limited to single channel per integration
