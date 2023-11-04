---
description: Running Cypress in parallel on AWS CodeBuild
---

# Cypress - AWS Code Build

{% hint style="info" %}
TL;DR Check out the example repository:

[https://github.com/currents-dev/aws-codebuild-example](https://github.com/currents-dev/aws-codebuild-example)
{% endhint %}

Executing Cypress tests in parallel on AWS CodeBuild can significantly reduce the overall run duration. AWS CodeBuild supports [Batched Build](https://docs.aws.amazon.com/codebuild/latest/userguide/batch-build.html) in [matrix mode](https://docs.aws.amazon.com/codebuild/latest/userguide/batch-build.html#batch\_build\_matrix) for launching several workers in parallel.&#x20;

Those workers will use Currents as an orchestration service - each worker will run a subset of spec files and report the results to the cloud dashboard for convenient reporting and troubleshooting.

{% hint style="info" %}
tl;dr - check out the [example repository](https://github.com/currents-dev/aws-codebuild-example)&#x20;
{% endhint %}

### Prerequisites

To enable parallel runs, please make sure:

* you have privileged access to your AWS Account
* you have an AWS CodeBuild project created with the batched configuration enabled

### Configuration Steps

The first step is to create a `buildspec.yml` file in the root directory of your application's source code repository. This file defines the build and test steps for your application.&#x20;

In the `buildspec.yml` file, you need to create multiple workers that will run your Cypress tests in parallel by setting the desired number of workers. See an example with 3 workers below:&#x20;

```yaml
## buildspec.yml
version: 0.2

batch:
  fast-fail: false
  build-matrix:
    dynamic:
      buildspec:
        - buildspec.yml
      env:
        variables:
          WORKERS:
            - 1
            - 2
            - 3

  phases:
    install:
      runtime-versions:
        nodejs: latest
      commands:
        # Set COMMIT_INFO variables to send Git details to Currents
        - export COMMIT_INFO_BRANCH="$(git rev-parse HEAD | xargs git name-rev |
          cut -d' ' -f2 | sed 's/remotes\/origin\///g')"
        - export COMMIT_INFO_MESSAGE="$(git log -1 --pretty=%B)"
        - export COMMIT_INFO_EMAIL="$(git log -1 --pretty=%ae)"
        - export COMMIT_INFO_AUTHOR="$(git log -1 --pretty=%an)"
        - export COMMIT_INFO_SHA="$(git log -1 --pretty=%H)"
        - export COMMIT_INFO_REMOTE="$(git config --get remote.origin.url)"
        - npm ci
    build:
      commands:
        - npx cypress-cloud run --record --parallel --ci-build-id $CODEBUILD_INITIATOR
```

You must also include the necessary commands to install Cypress, configure parallel execution, and run your tests.

By distributing tests to each worker, Currents enables faster execution of Cypress tests on AWS CodeBuild. This parallel execution ensures quicker feedback from your browser test suite while leveraging intelligent optimizations to minimize the overall runtime.

Additionally, Currents captures screenshots and videos during the test execution, facilitating troubleshooting efforts.

### Example:  Cypress Tests in parallel on AWS CodeBuild

Please refer to [example repository](https://github.com/currents-dev/aws-codebuild-example) that demonstrates how to set up AWS Code Build for running cypress tests in parallel using [Currents](https://currents.dev) service.

The example [config file](https://github.com/currents-dev/aws-codebuild-example/blob/main/buildspec.yml):

* uses 3 workers in [matrix mode](https://docs.aws.amazon.com/codebuild/latest/userguide/batch-build.html#batch\_build\_matrix).&#x20;
* is designed to be executed within a [batch build](https://docs.aws.amazon.com/codebuild/latest/userguide/batch-build.html).

Note:

* The example uses [CODEBUILD\_INITIATOR](https://docs.aws.amazon.com/codebuild/latest/userguide/build-env-ref-env-vars.html) as a [CI Build ID](https://currents.dev/readme/guides/cypress-ci-build-id). When testing interactively, the CODEBUILD\_INITIATOR will be set to the username of the build initiator. When running a batched build, the variable will have the batch build id. Read more about [cypress-ci-build-id.md](../../guides/cypress-ci-build-id.md "mention")
* get your record key from [Currents.dev](https://app.currents.dev/) and set [AWS CodeBuild Environment Variable](https://docs.aws.amazon.com/codebuild/latest/userguide/change-project-console.html#change-project-console-environment) variable `CURRENTS_RECORD_KEY`. Read more about [record-key.md](../../guides/record-key.md "mention")
* set the `projectId` in `currents.config.js` - obtain the project id from [Currents.dev](https://app.currents.dev/)
* use CLI arguments to customize your cypress-cloud runs, e.g.: `npx cypress-cloud run --parallel --record --key <your currents.dev key> --group groupA`

Here's an example of the demo run in Currents dashboard. Note that 3 runners were used as part of this run:

<figure><img src="../../.gitbook/assets/Screenshot 2023-05-17 at 14.29.28.png" alt=""><figcaption><p>Running cypress tests in parallel on AWS Code Build</p></figcaption></figure>
