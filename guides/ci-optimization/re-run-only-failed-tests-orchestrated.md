---
description: Re-run only failed Playwright tests when using Currents Orchestration
---

# Re-run Only Failed Tests — Orchestrated runs

{% hint style="info" %}
Failed orchestrated reruns require **Rerun All Jobs** in the CI provider, not **Rerun Failed Only**.
{% endhint %}

Orchestrated runs work differently from native Playwright sharding. Currents assigns tests to **all available machines**. When retrying, use **Rerun All Jobs** to let Currents redistribute the failed tests across all available containers for optimal parallel execution.

<figure><img src="../../.gitbook/assets/currents-2024-09-30-13.59.22@2x.png" alt=""><figcaption><p>Rerunning Failed Only Playwright Tests using Currents Orchestration</p></figcaption></figure>

Step-by-step guides and examples:

* [**GitHub Actions**](../../getting-started/ci-setup/github-actions/re-run-failed-only-tests-orchestrated.md)
* [**GitLab CI**](../../getting-started/ci-setup/gitlab/re-run-failed-only-tests.md)
* [**Jenkins Pipeline**](../../getting-started/ci-setup/jenkins.md#using-last-failed-flag-with-shards-and-orchestration)
