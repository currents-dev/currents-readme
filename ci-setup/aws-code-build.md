---
description: Running cypress tests in parallel on AWS Code Build and Currents dashboard
---

# AWS Code Build

### **How to run cypress in parallel on AWS Code Build?**

Executing Cypress tests in parallel on AWS CodeBuild can significantly reduce the overall run duration.

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
```

You must also include the necessary commands to install Cypress, configure parallel execution, and run your tests.

By distributing tests to each worker, Currents enables faster execution of Cypress tests on AWS CodeBuild. This parallel execution ensures quicker feedback from your browser test suite while leveraging intelligent optimizations to minimize the overall runtime.

Additionally, Currents captures screenshots and videos during the test execution, facilitating troubleshooting efforts.

### How to setup AWS Code Build to run Cypress Tests in parallel?

Please refer to [example repository](https://github.com/currents-dev/aws-codebuild-example) that demonstrates how to setup AWS Code Build for running cypress tests in parallel using [Currents](https://currents.dev) service.

The example [config file](https://github.com/currents-dev/aws-codebuild-example/blob/main/buildspec.yml):

* uses 3 workers in [matrix mode](https://docs.aws.amazon.com/codebuild/latest/userguide/batch-build.html#batch\_build\_matrix).&#x20;
* is designed to be executed within a [batch build](https://docs.aws.amazon.com/codebuild/latest/userguide/batch-build.html).
* **Note**: The example uses [CODEBUILD\_INITIATOR](https://docs.aws.amazon.com/codebuild/latest/userguide/build-env-ref-env-vars.html) as a [CI Build ID](https://currents.dev/readme/guides/cypress-ci-build-id). When testing interactively, the CODEBUILD\_INITIATOR will be set to the username of the build initiator. When running a batched build, the variable will have the batch build id.
* **Note**: get your record key from [Currents.dev](https://app.currents.dev/) and set [AWS CodeBuild Environment Variable](https://docs.aws.amazon.com/codebuild/latest/userguide/change-project-console.html#change-project-console-environment) variable `CURRENTS_RECORD_KEY`.
* **Note**: set the `projectId` in `currents.config.js` - obtain the project id from [Currents.dev](https://app.currents.dev/)
* **Note**: use CLI arguments to customize your cypress-cloud runs, e.g.: `npx cypress-cloud run --parallel --record --key <your currents.dev key> --group groupA`

Here's an example of the demo run in Currents dashboard. Note that 3 runners were used as part of this run:

<figure><img src="../.gitbook/assets/Screenshot 2023-05-17 at 14.29.28.png" alt=""><figcaption><p>Running cypress tests in parallel on AWS Code Build</p></figcaption></figure>
