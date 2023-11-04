---
description: Detailed guide to Playwright Tests Parallelization
---

# Playwright Parallelization

### Parallelization in Playwright

By default, Playwright runs the test files in parallel using several worker processes that run at the same time on the same machine (see [Playwright docs](https://playwright.dev/docs/test-parallel)). In addition to machine-level parallelization with workers, you can split the spec files between multiple machines using **sharding**.

### What is Playwright Sharding?

As mentioned, Playwright runs test files in parallel by default, but you can scale this behaviour by running tests on multiple machines simultaneously. This is called [sharding in Playwright](https://playwright.dev/docs/test-sharding).



![Running Playwright tests with sharding enabled](<../.gitbook/assets/Playwright parallelization.png>)

This behaviour is activated by using the `--shard` flag. For example:

```
npx playwright test --shard 1/2
```

Currents collects test results across different machines + workers and presents them in the cloud dashboard, using CI Build ID to assign the results to a build/run.

### How does Playwright sharding works?

Running Playwright tests in parallel in a CI environment involves creating multiple containers. Depending on the size of your browser test suite, it can be dozens or hundreds of containers. This will depend on the shards that you declare for your set of tests, but remember that the tests inside each shard will be also parallelized amongst multiple workers.

The workers on each shard will report to Currents the outcome of the tests.

### Do I need my own machines to run Playwright sharding?

Yes. You still need CI machines that will run the actual tests. Currents Dashboard (and other orchestration services) will record test results to allow troubleshooting of your Playwright tests.

### How to run Playwright tests with sharding enabled locally?

Running Playwright tests with sharding enabled on localhost requires running two or more CLI's executing Playwright with the `--shard` flag and the same [CI Build ID](cypress-ci-build-id.md). Open two separate terminals and run an identical `pwc` command with `--shard=1/2` and `--shard=2/2` flag respectively and  `--ci-build-id` flag with identical values in both terminals:

```
npx pwc --key <currents key> --project-id <currents project id> --ci-build-id ciid --shard=1/2
```

```
npx pwc --key <currents key> --project-id <currents project id> --ci-build-id ciid --shard=2/2
```

You will see that two shards are executing different spec files and running in parallel as well as the amount of workers executing tests on each one of the shards.

### Splitting Playwright spec files for sharding

You don't need to split files manually when using Playwright / Currents dashboard service - Playwright does that for you automatically and distributes the spec files between Playwright shards and workers.

### What CI providers can run Playwright sharding?

Any CI provider or tool that allows creating multiple containers/jobs can be integrated with Currents for running Playwright sharding.

Here are a few example repositories for popular CI providers

* [GitHub Actions](https://github.com/currents-dev/gh-actions-pw-example)
* [GitLab](https://gitlab.com/currents.dev/gitlab-playwright-currents)
* [CircleCI](https://github.com/currents-dev/circleci-pw-example)
* [Jenkins](../ci-setup/jenkins/jenkins-playwright.md)

### What is CI Build ID?

The **CI Build ID** defines what build (or run) the results belong to - for example, providing the same CI Build ID on two different machines will show their results in the same run.

The value of this flag is calculated automatically for popular CI tools, but you can also provide it explicitly. See [cypress-ci-build-id.md](cypress-ci-build-id.md "mention") guide for details.&#x20;

You can provide CI Build ID using the environment variable: `CURRENTS_BUILD_ID`, `pwc` CLI flag

```
npx pwc ... --ci-build-id XXXXX
```

or inline configuration:

```typescript
// playwright.config.ts
import { currentsReporter } from '@currents/playwright';

//...
reporter: [
  currentsReporter({
  //... 
    ciBuildId: process.env.CURRENTS_CI_BUILD_ID
  }),
]
```

