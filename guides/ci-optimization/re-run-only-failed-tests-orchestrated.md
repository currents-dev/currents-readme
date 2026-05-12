---
description: Re-run only failed Playwright tests when using Currents Orchestration
---

# Re-run Only Failed Tests — Orchestrated runs

{% hint style="info" %}
When rerunning failed orchestrated runs, select "Rerun All Jobs" instead of "Rerun Failed Only"
{% endhint %}

Orchestrated runs are conceptually different from the native playwright sharding. Currents assigns the tests dynamically to **all the available machines -** i.e. the more machines are available, the better (also, there's no need to provide the overall number of CI machines in advance).

<figure><img src="../../.gitbook/assets/currents-2024-09-30-13.59.22@2x.png" alt=""><figcaption><p>Rerunning Failed Only Playwright Tests using Currents Orchestration</p></figcaption></figure>

That's why when rerunning failed orchestrated CI runs, you'd select "Rerun All Jobs" instead of "Rerun Failed Only":

* The CI provider will spin up all the containers
* Currents will dynamically assign the failed tests to all the available containers
* More available containers will run the tests in parallel faster

Step-by-step guides and examples:

* **GitHub Actions** — [re-run-failed-only-tests.md](../../getting-started/ci-setup/github-actions/re-run-failed-only-tests.md "mention")
* **GitLab CI** — [re-run-failed-only-tests.md](../../getting-started/ci-setup/gitlab/re-run-failed-only-tests.md "mention")
* **Jenkins Pipeline** — [jenkins.md](../../getting-started/ci-setup/jenkins.md#using-last-failed-flag-with-shards-and-orchestration "mention")

See also the overview: [re-run-only-failed-tests.md](re-run-only-failed-tests.md "mention").
