---
description: Running Cypress tests in parallel on CircleCI and Currents dashboard
---

# Cypress - CircleCI

Please refer to [example repository](https://github.com/currents-dev/circleci-example) that demonstrates how to setup [CircleCI](https://circleci.com) for running cypress tests in parallel using [Currents](https://currents.dev) service.

The example [config file](https://github.com/currents-dev/circleci-example/blob/master/.circleci/config.yml):

* runs 5 containers with cypress tests in parallel
* uses [Cypress Orb](https://circleci.com/developer/orbs/orb/cypress-io/cypress)
* uses [Custom Test Command](https://github.com/currents-dev/circleci-example/blob/master/.circleci/config.yml#L9) to run `currents` for recording test results and parallelization with [Currents.dev](https://currents.dev)
* Note: set your `projectId` from [Currents.dev](https://app.currents.dev) in `currents.config.js`
* Note: use CLI arguments to customize your cypress runs, e.g.: `cypress-cloud run --record --key <your Currents.dev key>`
* Note: create an organization, get your record key at [Currents.dev](https://app.currents.dev) and set [Environment variable](https://circleci.com/docs/2.0/env-vars/) `CURRENTS_RECORD_KEY`

Here's an example of the demo run in Currents.dev dashboard, note that 3 cypress agents were used as part of this run:

![Running cypress tests in parallel on CircleCI](../../.gitbook/assets/circle-ci-parallel-cypress-tests.png)
