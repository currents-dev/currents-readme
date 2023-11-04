---
description: Running Playwright Tests in Parallel on CircleCI and Currents
---

# Playwright - CircleCI

Run Playwright tests in [parallel on CircleCI](https://circleci.com/docs/2.0/parallelism-faster-jobs/) using the native [Playwright Sharding](https://playwright.dev/docs/test-sharding) to split the tests between multiple containers. Parallelizing the test will help in decreasing the overall run duration.&#x20;

Currents collects the results of distributed parallel CircleCI builds for more efficient troubleshooting. Each container will receive a unique set of tests to run, so that your tests will run faster and you can receive faster feedback from your browser test suite.

Create multiple containers that will run your tests in parallel by setting the desired amount of containers with [`parallelism`](https://circleci.com/docs/2.0/configuration-reference/#parallelism) flag in  `config.yaml` file.

Please refer to the [example repository](https://github.com/currents-dev/circleci-pw-example) that demonstrates how to setup [CircleCI](https://circleci.com) for running Playwright tests in parallel using [Currents](https://currents.dev) service.

{% code overflow="wrap" %}
```yaml
version: 2.1
jobs:
  run-test:
    docker:
      - image: mcr.microsoft.com/playwright:latest
  
    # Grab 
    # - CURRENTS_PROJECT_ID
    # - CURRENTS_RECORD_KEY
    # at https://app.currents.dev 
    #
    # Read more about CI Build ID:
    # https://currents.dev/readme/guides/cypress-ci-build-id
    steps:
      - checkout
      - run: npm i -D @playwright/test
      - run: npx playwright install
      - run: npx playwright install chrome
      - run:
          name: Run test
          command: npx pwc --key $CURRENTS_RECORD_KEY --project-id $CURRENTS_PROJECT_ID --ci-build-id 


# Invoke jobs via workflows
workflows:
  run-test-workflow:
    jobs:
      - run-test
```
{% endcode %}

The example [config file](https://github.com/currents-dev/circleci-pw-example/blob/main/.circleci/config.yml):

* runs 3 containers with Playwright tests in parallel
* Note: set your `projectId` from [Currents.dev](https://app.currents.dev) in `currents.config.js`
* Note: use CLI arguments to customize your cypress runs, e.g.: `pwc run --key <your Currents.dev key>`
* Note: create an organization, get your record key at [Currents.dev](https://app.currents.dev) and set [Environment variable](https://circleci.com/docs/2.0/env-vars/) `CURRENTS_RECORD_KEY`
