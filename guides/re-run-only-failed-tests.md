---
icon: rotate-reverse
description: A guide on rerunning only failed Playwright tests in CI
---

# Re-run Only Failed  Tests

Rerunning only failed tests in CI is one of the most popular way to unblock CI pipelines - indeed, often the tests pass on a rerun, unblocking pending Pull Requests and marking all the checkmarks green.

Speaking strictly, the tests that randomly fail and then pass without any change to the tests, the application under test or the environment, are considered flaky (see [flaky-tests.md](../dashboard/tests/flaky-tests.md "mention")). Even if tests pass after a rerun, it is recommended to explore the failures and eliminate the flakiness.&#x20;

<figure><img src="../.gitbook/assets/currents-2024-09-30-13.43.44@2x.png" alt=""><figcaption><p>Rerunning Failed Only Playwright Tests</p></figcaption></figure>

However there are plenty of pragmatic reasons why teams defer the investigation and just want to unblock the CI pipeline, for example:

* skipping a known flaky tests that is currently under investigation
* fixing an infrastructure component or CI environment
* temporary outage of the CI environment
* urgent deployment of a hot fix

Starting from version [1.44](https://playwright.dev/docs/release-notes?ref=playwrightsolutions.com#version-144) Playwright supports [running only the failed test from the last run](https://playwrightsolutions.com/how-to-run-failures-only-from-the-last-playwright-run/) using `--last-failed` CLI flag, for example:

```
playwright test --last-failed
```

While this feature works well for local environments, there are a few challenges related to rerunning the failed only tests in CI that are related to how Playwright implements parallel execution with shards:

<details>

<summary><strong>Problem #1: Adding <code>--last-failed</code> finds no tests</strong></summary>

Simply adding `--last-failed` to the CI command wouldn't work - Playwright immediately stops with an error message:

```sh
$ npx playwright test --last-failed
Error: No tests found
```

Why is that?&#x20;

Behind the scenes Playwright creates `.last-run.json` file in [output directory](https://playwright.dev/docs/api/class-testproject#test-project-output-dir) (defaults to `<package.json-directory>/test-results)`after every run. When Playwright `--last-failed` CLI flag is present, Playwright first scans the output directory and uses `.last-run.json` file to run only the failed tests. If the file is not present, Playwright has no tests to run and stops immediately.

That means you need to conditionally add `--last-failed` flag for reruns only and make the file from the previous runs available on the newly created containers.

</details>

<details>

<summary><strong>Problem #2: CI reruns only a subset of failed tests</strong></summary>

Typically you'd use `--shard x/n` command to split tests between the available containers - each container will only run a subset of the tests. Imagine a scenario when some tests fail - a few containers will pass and others fail.

As an example, consider the following scenario of GitHub Actions Matrix job with 3 containers (see [GHA matrix strategy documentation](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/running-variations-of-jobs-in-a-workflow#about-matrix-strategies)). A typical CI command would look like this:

`playwright test --shard ${{ matrix.shard }}/${{ strategy.job-total }}`

* shard 1/3 runs `playwright test --shard 1/3` and <mark style="color:red;">fails</mark>
* shard 2/3 runs `playwright test --shard 2/3` and <mark style="color:green;">passes</mark>
* shard 3/3 runs `playwright test --shard 3/3` and <mark style="color:red;">fails</mark>

Popular CI providers (like GitHub Actions, GitLab CI etc) allow rerunning **only the failed containers** - i.e. a rerun will have less containers, compared to the original run. That "breaks" the sharding mechanism and as a result only a subset of the failed tests will be included in a rerun.

Rerunning **only the failed jobs** will start 2 containers. However `${{ matrix.shard }}/${{ strategy.job-total }}` still refers to the total number of nodes in the matrix configuration, not the actual number of containers. As a result we end up with following commands:

* shard 1/3 runs `playwright test --shard 1/3 --last-failed` and runs 1/3 of all the discovered tests 😕
* shard 2/3 doesn't start because if passed in the previous run
* shard 3/3 runs `playwright test --shard 3/3 --last-failed` and runs 1/3 of all the discovered tests 😕

As a result, not all the failed tests are included in the new run.

</details>

Solving those issues requires maintaining cumbersome configuration and custom scripts, that's why we have created a set of tools that unlock rerunning only the failed Playwright tests in CI, including sharded parallel CI runs and runs created by Currents Orchestration.&#x20;

{% hint style="info" %}
📖 Good to know

Playwright allows setting [output directory](https://playwright.dev/docs/api/class-testproject#test-project-output-dir) on a project level. If you have multiple projects and they have different output directories, Playwright will generate `.last-run.json` in the directory of the first project (according to execution level).
{% endhint %}

### Re-run Failed Playwright Tests - Playwright Shards in CI

The suggested templates do not require maintaining complex CI configurations and scripts - they are compatible with popular CI providers and can be used even without Currents reporter.

<details>

<summary>GitHub Actions</summary>

See our step-by-step guide to [Setting up Re-runs with GitHub Actions](../getting-started/ci-setup/github-actions/playwright-github-actions.md#playwright-sharding)

</details>

<details>

<summary>GitLab CI</summary>

See our step-by-step guide to [Setting up retries of failed job with GitLab CI](../getting-started/ci-setup/gitlab/playwright-gitlab-ci-cd.md#playwright-sharding)

</details>

<details>

<summary>Jenkins Pipeline</summary>

See our step-by-step guide to [Setting up retries of failed job with Jenkins Pipeline](../getting-started/ci-setup/jenkins/jenkins-playwright.md#using-last-failed-flag-with-shards-and-orchestration)

</details>



### Re-run Failed Playwright Tests - Currents Orchestration

{% hint style="info" %}
When rerunning failed orchestrated CI runs, you'd select "Rerun All Jobs" instead of "Rerun Failed Only"
{% endhint %}

Currents orchestration for Playwright (see [playwright-orchestration.md](parallelization-guide/pw-parallelization/playwright-orchestration.md "mention")) improves CI execution time by up to 40%, compared to the native Playwright Sharding. It eliminates the need to maintain and update CI configuration and automatically balances the tests between available CI machines in the most optimal way.

Orchestrated runs are conceptually different from the native playwright shards. Currents assigns the tests dynamically to **all the available machines -** i.e. the more machines are available, the better (also, there's no need to provide the overall number of CI machines in advance).

<figure><img src="../.gitbook/assets/currents-2024-09-30-13.59.22@2x.png" alt=""><figcaption><p>Rerunning Failed Only Playwright Tests using Currents Orchestration</p></figcaption></figure>

That's why when rerunning failed orchestrated CI runs, you'd select "Rerun All Jobs" instead of "Rerun Failed Only":

* The CI provider will spin up all the containers
* Currents will dynamically assign the failed tests to all the available containers
* More available containers will run the tests in parallel faster

<details>

<summary>GitHub Actions</summary>

See our step-by-step guide to [Setting up Re-runs with GitHub Actions](../getting-started/ci-setup/github-actions/playwright-github-actions.md#currents-orchestration)

</details>

<details>

<summary>GitLab CI</summary>

See our step-by-step guide to [Setting up retries of failed job with GitLab CI](../getting-started/ci-setup/gitlab/playwright-gitlab-ci-cd.md#currents-orchestration)

</details>

<details>

<summary>Jenkins Pipeline</summary>

See our step-by-step guide to [Setting up retries of failed job with Jenkins Pipeline](../getting-started/ci-setup/jenkins/jenkins-playwright.md#using-last-failed-flag)

</details>

