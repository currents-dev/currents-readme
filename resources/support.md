---
description: >-
  Users guide for reporting support and troubleshooting issues with Currents
  systems
icon: headset
---

# Support

### Support Channels

Currents Support team is available for issues, features requests and general inquires:

* ⭐️ In-app Intercom chat is the main and the preferred way to engage with Currents Support
* 📧 Email support@currents.dev - this email is monitored 9/5
* 💬 Dedicated direct Slack channel is available as part of Enterprise Plan with a direct access to team members

### Support Hours

Our formal support hours are **8am-5pm Pacific Time,** however our team members are located at various EU and US timezones, drop us a message and we'll get back to you as soon as possible.

### Reporting Details

Whenever you're facing a technical issue, provide the following information to our support team:

* Frequency and urgency of the issue
* Testing Framework + Version
* Currents Run ID or Dashboard URL associated with the issue
* Screenshots or video recordings if applicable
* Full error message, including the stack trace, if available
* Full and relevant CI execution logs with sensitive information redacted
* CI pipeline configuration
  * The exact commands used during the execution
  * Relevant configuration of the CI setup stages

### CI Logs and Configuration

Currents offers packages that integrate with test runners in isolated CI environments, which we can’t access and don’t collect any remote telemetry from. While our backend is fully instrumented with logs and traces that allow us to investigate and pinpoint issues independently, having access to CI logs and pipeline configurations is often essential for troubleshooting.

{% hint style="warning" %}
Sharing relevant and comprehensive logs will ensure a timely, effective and successful resolution.
{% endhint %}

### Client Side Debug Mode

Our client-side tools include built-in debugging, but it’s disabled by default. To enable debug mode, set the environment variable:

```
DEBUG=currents*


```

Or pass the CLI flag:

```
--pwc-debug
```

Check the tools documentation below for more details, or reach out to our support team if you need help enabling debug mode for Currents packages.

* [troubleshooting.md](../getting-started/jest/troubleshooting.md "mention")
* [troubleshooting-cypress.md](../getting-started/cypress/troubleshooting-cypress.md "mention")
* [troubleshooting-playwright.md](../getting-started/playwright/troubleshooting-playwright.md "mention")
* [troubleshooting-sso.md](../dashboard/administration/sso-saml2.0/troubleshooting-sso.md "mention")

### Resources

* Status page / Uptime: [https://status.currents.dev](https://status.currents.dev)
* Changelog - see the recent changes at [https://changelog.currents.dev/changelog](https://changelog.currents.dev/changelog)
* Feature Requests / Roadmap
  * Our roadmap often changes because of an ongoing prioritization of customer requests
  * Use Intercom in-app chat to request a feature
  * Open a request or upvote an existing request at [https://changelog.currents.dev/](https://changelog.currents.dev/)
