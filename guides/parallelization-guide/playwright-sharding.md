---
description: Playwright Sharding and reporting the results to Currents
---

# Reporting in CI

By default, Playwright runs the test files in parallel using several worker processes that run on the same machine (see [Playwright docs](https://playwright.dev/docs/test-parallel)). In addition to machine-level parallelization with workers, you can split the spec files between multiple machines using **sharding**.

### What is Playwright Sharding?

As mentioned, Playwright runs test files in parallel by default, but you can scale this behaviour by running tests on multiple machines simultaneously. This is called [sharding in Playwright](https://playwright.dev/docs/test-sharding).

<figure><img src="../../.gitbook/assets/playwright-sharding-example.png" alt=""><figcaption><p>Running Playwright tests with sharding</p></figcaption></figure>

This behaviour is activated by using the `--shard` flag. For example:

```
npx playwright test --shard 1/2
```

Currents collects test results across different machines + workers and presents them in the cloud dashboard, using CI Build ID to assign the results to a build/run.



### Reporting Sharded Playwright from localhost

Running Playwright tests with sharding enabled on localhost requires running two or more `playwright` commands with the `--shard` flag and the same [CI Build ID](ci-build-id.md).&#x20;

Open two separate terminals and run an identical `pwc` command with `--shard=1/2` and `--shard=2/2` flag respectively and  `--ci-build-id` flag with identical values in both terminals. In the example below we use a dummy CI build ID `ciid`, you can replace it with any value as long as it's the same.

{% code overflow="wrap" %}
```
npx pwc --key <currents key> --project-id <currents project id> --ci-build-id ciid --shard=1/2
```
{% endcode %}

{% code overflow="wrap" %}
```
npx pwc --key <currents key> --project-id <currents project id> --ci-build-id ciid --shard=2/2
```
{% endcode %}

You will see that two shards are executing different spec files and running in parallel as well as the amount of workers executing tests on each one of the shards.



### Splitting Test Files for Sharding

You don't need to split files manually when using Currents - Playwright does that for you automatically and distributes the spec files between Playwright shards and workers.

By default, Playwright runs test files in alphabetical order and distributes the files between shards and workers on each shard. You can use some naming convention to control the test order, for example:

* `001-user-signin-flow.spec.ts`
* `002-create-new-document.spec.ts`&#x20;

and so on.

In addition, you can enable [fully-parallel-mode.md](../ci-optimization/fully-parallel-mode.md "mention") in a single file, so Playwright will split individual tests instead of test files.&#x20;

### What CI Providers Support Playwright Sharding?

Any CI provider or tool that allows creating multiple containers/jobs can be integrated with Currents for running Playwright sharding.

Here are a few example setups for popular CI providers:

* [GitHub Actions](https://github.com/currents-dev/playwright-gh-actions-demo)
* [GitLab](https://gitlab.com/currents.dev/gitlab-playwright-currents)
* [CircleCI](https://github.com/currents-dev/circleci-pw-example)
* [Jenkins](../../getting-started/ci-setup/jenkins.md)
