---
description: Integrating GitHub with Currents dashboard for running Playwright tests
---

# GitHub

[Currents](https://currents.dev) integration with GitHub allows using Playwright or Cypress tests results with your GitHub workflows, as well as getting faster feedback and insights about your tests directly within Pull Requests.



Currents integration with GitHub allows&#x20;

* Posting results as [commit status checks](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks) - to prevent merging commits with failed / timed-out runs
* Posting Pull Request comments - to share your test outcomes

There are two versions of GitHub integration available - see the details below.&#x20;

{% hint style="info" %}
**Please note:** we recommend using GitHub App based implementation due to its setup simplicity
{% endhint %}

[GitHub App](github-app.md) integration

* ✅ PR comments support
* ✅ Commit Status checks
* ✅ Improved security with no explicit sharing of access tokens
* ✅ Convenient UI
* ❌ GitHub Enterprise

[GitHub OAuth](github-oauth.md) integration (OAuth token based)

* ✅ Commit Status checks
* ✅ Github Enterprise
* 🔐 Requires user-specific OAuth access token
* ❌ Does not support PR Comments
