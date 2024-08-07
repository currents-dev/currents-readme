---
description: Detailed guide to Cypress Tests Parallelization
---

# Cypress Parallelization

### Why parallelize cypress tests?

As your Cypress Tests suite grows, it becomes crucial to optimizing the overall duration in order to get faster feedback. Once your cypress tests suite volume passed 10 spec files, you'd start looking for solutions to run the tests in parallel.

Parallelization is the most popular technique for reducing the duration of your cypress tests. One of the most convenient and easy solutions is to use cloud services like Currents or Cypress Dashboard.&#x20;

Those services integrate with your CI provider and use intelligent techniques to parallelize the tests, reduce overall duration, as well as provide features like storing video and screenshot recording, test outputs, and providing analytics and integration with 3rd party tools.

![Running cypress test in parallel reduces the overall time](<../../.gitbook/assets/cypress-parallelization-benefits (2).png>)

### How does cypress parallelization work?

Running cypress tests in parallel in CI environment involves creating multiple containers. Depending on the size of your browser test suite, it can be dozens or hundreds of containers.

Containers use Currents cloud service to get instructions about tests (technically, spec files) to run - every test runs in a different container. Currents uses intelligent orchestration heuristics to optimally distribute the tests between containers and reduce overall runtime.

The simplistic animation below demonstrates the parallelization of 6 spec files using 3 containers.

* Each container runs an identical `cypress` or [`cypress-cloud`](../../resources/reporters/cypress-cloud/) command with `--parallel` flag
* Each container connects to Currents dashboard to get instructions about the next spec file to run
* Currents dashboard assigns each container a spec file
* Each container runs its spec file
* Each container sends the results back to Currents and gets the next spec file to run
* When no more spec files are left, containers finish their execution

![Cypress tests parallelization using Currents orchestration ](../../.gitbook/assets/parallelization-basic.gif)

### Do I need my own machines to run cypress tests in parallel?

Yes. You still need CI machines that will run the actual tests. Currents Dashboard (and other orchestration services) will load-balance the tests between the machines and will record test results to allow troubleshooting of your cypress tests.

### Can I run multiple cypress tests in parallel on the same machine?

Yes! You don't have to have different machines/containers for running cypress tests in parallel.&#x20;

You can run multiple [`cypress-cloud`](../../resources/reporters/cypress-cloud/) / `cypress` instances on the same machine. Keep in mind that cypress tests are quite resource-demanding - running too many instances of a test runner can actually slow down the overall execution or even crash the machine.

### How to run cypress tests in parallel locally?

Running cypress tests in parallel on localhost requires running two or more cypress runners at the same time. Open two separate terminals and run an identical [cypress-cloud](https://github.com/currents-dev/cypress-cloud) command with `--parallel` flag  `--ci-build-id` flag with identical value:

```
npx cypress-cloud run --parallel --record --key <currents_key> --ci-build-id build-001
```

You will see that two runners are executing different spec files and running in parallel.

### Splitting cypress spec files for running in parallel

You don't need to split files manually when using Cypress / Currents or Sorry Cypress dashboard service - the service does that for you automatically and distributes the spec files between cypress runners.

Moreover, Currents dashboard uses historical data to optimally sort the spec files in order to reduce the overall build / run duration.

### What CI providers can run cypress tests in parallel?

Any CI provider or tool that allows creating multiple containers/jobs can be integrated with Currents for running cypress tests in parallel. See [Broken link](broken-reference "mention") section for details.

Here are a few popular CI providers that can run cypress tests in parallel:

* [GitHub Actions](../../getting-started/ci-setup/github-actions/)
* [Jenkins](../../getting-started/ci-setup/jenkins/)
* [GitLab](../../getting-started/ci-setup/gitlab/)
* [CircleCI](../../getting-started/ci-setup/circleci/)
* [AWS Code Build](../../getting-started/ci-setup/aws-code-build/)

### How to run cypress tests in parallel?

To run cypress tests in parallel and use Currents as an orchestration service, run this command:

```bash
npx cypress-cloud run --parallel --record --key <currents_key> --ci-build-id build-001
```

Read more about the importance of [CI Build ID](../ci-build-id.md). You can generate `currents_key` by creating an organization and a project on [Currents Dashboard](https://app.currents.dev).

### How to create parallelized cypress builds?

Currents uses `--ci-build-id` flag to uniquely identify one parallelized build from another.&#x20;

![Using CI Build ID to create different build](<../../.gitbook/assets/cypress-ci-build-id-different-jobs (1).png>)

The value of this flag is calculated automatically for popular CI tools, but you can also provide it explicitly. See [ci-build-id.md](../ci-build-id.md "mention") for details.
