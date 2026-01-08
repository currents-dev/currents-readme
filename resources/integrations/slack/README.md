---
description: Integrating Slack with Currents dashboard for Playwright and Cypress test notifications
---

# Slack

Currents integration with Slack allows posting test results of your Playwright or Cypress tests directly into Slack channels, helping your team stay informed about test outcomes without leaving Slack.

There are two versions of Slack integration available:

{% hint style="info" %}
**Recommendation:** We recommend using the Slack App integration due to its advanced features and improved security model.
{% endhint %}

## [Slack App](slack-app.md) Integration (Recommended)

The Slack App integration provides a rich, feature-complete experience for test notifications:

* ✅ Organization-level installation with per-project configuration
* ✅ Multiple destinations (up to 10 channels per project)
* ✅ Run-level notifications with thread-based grouping
* ✅ Individual test failure notifications
* ✅ Advanced filtering by tags, branches, and commit messages
* ✅ Annotation-based mentions (users, groups, emails)
* ✅ UI-based mention rules configuration
* ✅ Improved security with OAuth 2.0

## [Slack Webhook](slack-webhook.md) Integration (Legacy)

The webhook-based integration provides basic notification functionality:

* ✅ Simple setup with Incoming Webhooks
* ✅ Run start, finish, timeout, and cancel notifications
* ✅ Branch name filtering
* ✅ Tag-based filtering
* ❌ No individual test notifications
* ❌ No annotation-based mentions
* ❌ Limited to single channel per integration

