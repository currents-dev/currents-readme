---
description: >-
  What test data Currents sends to an AI provider, when it is sent, and how
  organization admins grant or revoke consent
icon: shield-check
---

# AI Data Usage and Consent

Currents' AI features work by sending part of your test data to a large-language-model provider. That only happens after an administrator of your organization consents to it. Until then, the AI features stay off for everyone in the organization.

This page describes what is sent, when, and who controls it.

## What is sent

When an AI feature runs on a failed test, Currents sends the troubleshooting context it assembled for that test:

* The error message, stack trace, and code frame from the failed attempt
* The **error-context snapshot** captured at the moment of failure: the page accessibility tree, console output, and network logs
* Source code snippets referenced by the stack trace
* Test, spec, and run identifiers, along with the test's title and file path
* Historical pass/fail and flakiness data for that test

Nothing is sent on a schedule or in the background. A request is made only when someone opens an AI feature on a specific test, or when an automation you configured requests one.

{% hint style="warning" %}
This data comes from your test run, and Currents sends it as captured. If your tests log credentials, tokens, customer records, or other sensitive values into errors, console output, or network logs, those values are part of what gets sent.

Treat the consent decision as covering whatever your tests produce, and keep secrets out of test output regardless of whether AI features are enabled.
{% endhint %}

## Where it is sent

Currents sends the context to an LLM provider over an API call. The default provider is OpenAI; self-hosted and enterprise deployments can point Currents at a different OpenAI-compatible endpoint — an LLM gateway, Azure OpenAI, or another provider — via configuration.

Your test data is not used to train models. Requests are made through the provider's API, which is covered by the provider's API data-handling terms rather than its consumer-product terms.

## Who can grant consent

Only **organization administrators** can change the consent setting. The decision applies to the entire organization: every project, every user, every AI entry point.

The organization creation form offers **Allow AI analysis**, ticked by default. Leaving it ticked records the grant against the person creating the organization; clearing it records nothing at all, so the organization reads as never asked rather than as having refused, and its AI features stay off until an admin grants consent in settings.

## Granting and revoking consent

Go to **Organization Settings → AI usage consent** and use the toggle.

The setting records who made the decision, when, and which version of the terms was shown at the time. That stamp appears under the toggle.

### Revoking

Revoking takes effect immediately:

* AI features stop working for everyone in the organization
* AI requests already in flight fail rather than completing
* Data already sent to the provider is not recalled — revoking stops future requests

Because in-flight work fails, the dashboard asks you to confirm before revoking.

## Turning AI off without revoking consent

Consent controls whether Currents *may* send data. If you want to keep consent in place but stop using a specific feature, disable that feature instead — consent by itself does not trigger any requests.

## Related

* [AI Overview](overview.md) — the AI features and entry points
* [Manage Team](../dashboard/administration/manage-team.md) — organization roles and who counts as an administrator
* [Service Agreement](https://currents.dev/tos) — the terms governing AI data use
