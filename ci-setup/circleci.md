---
description: Running cypress tests in parallel on CircleCI and Currents dashboard
---

# CircleCI

### How to run Playwright and cypress in parallel on CircleCI?

Running tests in [parallel on CircleCI](https://circleci.com/docs/2.0/parallelism-faster-jobs/) can help in decreasing overall run duration.&#x20;

Create multiple containers that will run your tests in parallel by setting the desired amount of containers with [`parallelism`](https://circleci.com/docs/2.0/configuration-reference/#parallelism) flag in  `config.yaml` file.

Each container will receive a unique set of tests to run, so that your tests will run faster and you can receive faster feedback from your browser test suite.

Currents orchestrates the tests between multiple containers, applying intelligent optimizations to reduce overall runtime of your workflow, records screenshots and videos for later troubleshooting.

{% hint style="info" %}
Note that Playwright's full parallelization and orchestration is not currently supported by Currents.
{% endhint %}

### How to setup CircleCI to run Playwright Tests in parallel?

Please refer to [example repository](https://github.com/currents-dev/circleci-pw-example) that demonstrates how to setup [CircleCI](https://circleci.com) for running Playwright tests in parallel using [Currents](https://currents.dev) service.

The example [config file](https://github.com/currents-dev/circleci-pw-example/blob/main/.circleci/config.yml):

* runs 3 containers with Playwright tests in parallel
* Note: set your `projectId` from [Currents.dev](https://app.currents.dev) in `currents.config.js`
* Note: use CLI arguments to customize your cypress runs, e.g.: `pwc run --key <your Currents.dev key>`
* Note: create an organization, get your record key at [Currents.dev](https://app.currents.dev) and set [Environment variable](https://circleci.com/docs/2.0/env-vars/) `CURRENTS_RECORD_KEY`

### How to setup CircleCI to run Cypress Tests in parallel?

Please refer to [example repository](https://github.com/currents-dev/circleci-example) that demonstrates how to setup [CircleCI](https://circleci.com) for running cypress tests in parallel using [Currents](https://currents.dev) service.

The example [config file](https://github.com/currents-dev/circleci-example/blob/master/.circleci/config.yml):

* runs 5 containers with cypress tests in parallel
* uses [Cypress Orb](https://circleci.com/developer/orbs/orb/cypress-io/cypress)
* uses [Custom Test Command](https://github.com/currents-dev/circleci-example/blob/master/.circleci/config.yml#L9) to run `currents` for recording test results and parallelization with [Currents.dev](https://currents.dev)
* Note: set your `projectId` from [Currents.dev](https://app.currents.dev) in `currents.config.js`
* Note: use CLI arguments to customize your cypress runs, e.g.: `cypress-cloud run --record --key <your Currents.dev key>`
* Note: create an organization, get your record key at [Currents.dev](https://app.currents.dev) and set [Environment variable](https://circleci.com/docs/2.0/env-vars/) `CURRENTS_RECORD_KEY`

Here's an example of the demo run in Currents.dev dashboard, note that 3 cypress agents were used as part of this run:

![Running cypress tests in parallel on CircleCI](../.gitbook/assets/circle-ci-parallel-cypress-tests.png)
