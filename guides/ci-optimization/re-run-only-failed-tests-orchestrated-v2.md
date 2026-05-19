---
description: Re-run only failed Playwright tests when using Currents Orchestration V2
---

# Re-run Only Failed Tests — Orchestrated runs

{% hint style="info" %}
Failed orchestrated reruns require **Rerun All Jobs** in the CI provider, not **Rerun Failed Only**.
{% endhint %}

Orchestrated runs work differently from native Playwright sharding. Currents assigns tests to **all available machines**. More machines can run the tests faster, and the total number of CI machines does not need to be set in advance.

<figure><img src="../../.gitbook/assets/currents-2024-09-30-13.59.22@2x.png" alt=""><figcaption><p>Rerunning failed-only Playwright tests using Currents Orchestration</p></figcaption></figure>

That's why failed orchestrated CI reruns use **Rerun All Jobs** instead of **Rerun Failed Only**:

* The CI provider will spin up all the containers
* Currents will assign the failed tests to all the available containers
* More available containers will run the tests in parallel faster

## Orchestration flow

In Orchestration, Playwright filter flags such as `--last-failed` belong on `pwc-p discover`. The generated test list is passed to `pwc-p run` with `--pwc-discovery-file`.

```bash
npx pwc-p discover --pwc-discovery-file tests.txt --last-failed
npx pwc-p run --key <record-key> --project-id <project-id> --ci-build-id <ci-build-id> --pwc-discovery-file tests.txt
```

See [playwright-orchestration.md](playwright-orchestration.md "mention") for setup details.

## Step-by-step guides

* **GitHub Actions** — [re-run-failed-only-tests-orchestrated-v2.md](../../getting-started/ci-setup/github-actions/re-run-failed-only-tests-orchestrated-v2.md "mention")
* **GitLab CI** — [re-run-failed-only-tests.md](../../getting-started/ci-setup/gitlab/re-run-failed-only-tests.md "mention")
* **Jenkins Pipeline** — [jenkins.md](../../getting-started/ci-setup/jenkins.md#using-last-failed-flag-with-shards-and-orchestration "mention")

See also the overview: [re-run-only-failed-tests.md](re-run-only-failed-tests.md "mention").
