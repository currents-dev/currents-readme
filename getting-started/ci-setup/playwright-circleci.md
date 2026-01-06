---
description: Running Playwright Tests in Parallel on CircleCI and Currents
---

# Playwright - CircleCI

{% hint style="info" %}
TL;DR Check out the example repository:

[https://github.com/currents-dev/circleci-pw-example](https://github.com/currents-dev/circleci-pw-example)
{% endhint %}

Run Playwright tests in [parallel on CircleCI](https://circleci.com/docs/2.0/parallelism-faster-jobs/) using the native [Playwright Sharding](https://playwright.dev/docs/test-sharding) to split the tests between multiple containers. Parallelizing the test will help in decreasing the overall run duration.&#x20;

Currents collects the results of distributed parallel CircleCI builds for more efficient troubleshooting. Each container will receive a unique set of tests to run so that your tests will run faster and you can receive faster feedback from your browser test suite.

Create multiple containers that will run your tests in parallel by setting the desired amount of containers with [`parallelism`](https://circleci.com/docs/2.0/configuration-reference/#parallelism) flag in  `config.yaml` file.

Please refer to the [example repository](https://github.com/currents-dev/circleci-pw-example) demonstrating how to set up [CircleCI](https://circleci.com) for running Playwright tests in parallel using [Currents](https://currents.dev) service.

* Create an organization at https://app.currents.dev
* Create a new project
* Grab `CURRENTS_RECORD_KEY` [record-key.md](../../../guides/record-key.md "mention") and `CURRENTS_PROJECT_ID` &#x20;
* Store `CURRENTS_RECORD_KEY`: [https://circleci.com/docs/contexts/](https://circleci.com/docs/contexts/)

{% code overflow="wrap" %}
```yaml
# .circleci/config.yml
version: 2.1
jobs:
  run-test:
    docker:
      - image: mcr.microsoft.com/playwright:latest
    # Enable parallelism of 3
    parallelism: 3
    steps:
      - checkout
      - run: npm i -D @playwright/test
      - run: npx playwright install
      - run: npx playwright install chrome
      - run:
          name: Run tests
          # Enable Playwright Shards
          # - Use CURRENTS_RECORD_KEY secret from context
          # - Grab Project ID from https://app.currents.dev
          command: SHARD="$((${CIRCLE_NODE_INDEX}+1))"; npx pwc --key $CURRENTS_RECORD_KEY --project-id bnsqNa --shard=${SHARD}/${CIRCLE_NODE_TOTAL}

# Invoke jobs via workflows
workflows:
  run-test-workflow:
    jobs:
      - run-test:
          # Use "currents" CircleCI context to enable access to secrets
          context: currents
```
{% endcode %}

The example [config file](https://github.com/currents-dev/circleci-pw-example/blob/main/.circleci/config.yml):

* runs 3 containers with Playwright tests in parallel
* Note: use CLI arguments to customize your cypress runs, e.g.: `pwc run --key <your Currents.dev key>`
