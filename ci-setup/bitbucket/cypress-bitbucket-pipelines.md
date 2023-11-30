---
description: >-
  Running Cypress tests in parallel on Bitbucket Pipelines and Currents
  dashboard
---

# Cypress - Bitbucket Pipelines

{% hint style="info" %}
TL;DR Check out the example repository:

[https://bitbucket.org/currents-org/currents-cypress-example](https://bitbucket.org/currents-org/currents-cypress-example/src/master/)
{% endhint %}

The example [config file](https://bitbucket.org/currents-org/currents-cypress-example/src/2e36527ccf01c9135dd51afaf620e7f930571dd9/bitbucket-pipelines.yml):

* uses a [docker image](https://hub.docker.com/r/currentsdev/cypress-included) with a pre-installed [alternative Cypress test runner](https://currents.dev/readme/integration-with-cypress/alternative-cypress-binaries) that allows using alternative orchestration services like Sorry Cypress and Currents.
* runs 3 containers with cypress tests in parallel using [`cypress-cloud`](https://github.com/currents-dev/cypress-cloud) integration package and the command below:

```
npx cypress-cloud --key $CURRENTS_RECORD_KEY --parallel
```

![](https://bytebucket.org/currents-org/currents-cypress-example/raw/2e36527ccf01c9135dd51afaf620e7f930571dd9/images/demo.png)

### Setup <a href="#markdown-header-setup" id="markdown-header-setup"></a>

* Create an account at https://app.currents.dev
* Get your **Record Key** and set [Secure Bitbucket Pipeline variable](https://support.atlassian.com/bitbucket-cloud/docs/variables-and-secrets/#Secured-variables) `CURRENTS_RECORD_KEY`
* Get your **Project ID** and update the contents of `currents.config.js`
* Follow the install instructions for [`cypress-cloud`](https://github.com/currents-dev/cypress-cloud) package
* Use CLI arguments to customize your cypress-cloud runs, e.g.: `npx cypress-cloud run --parallel --record --key <your currents.dev key> --group groupA`
* Note: Currents will automatically detect CI Build ID for Bitbucket Pipeline execution. Read the [guide](https://currents.dev/readme/guides/ci-build-id) for more advanced use cases.
* Note: Refer to the recent [Pipeline executions](https://bitbucket.org/currents-org/currents-cypress-example/pipelines/results/page/1) to see the setup in action

### Adding Bitbucket status check <a href="#markdown-header-adding-bitbucket-status-check" id="markdown-header-adding-bitbucket-status-check"></a>

[Currents integration with Bitbucket](https://currents.dev/readme/integrations/bitbucket) posts runs progress and outcome for every Bitbucket Pipeline invocation:

![](https://bytebucket.org/currents-org/currents-cypress-example/raw/2e36527ccf01c9135dd51afaf620e7f930571dd9/images/integration.png)

### Using Alternative Cypress Binaries <a href="#markdown-header-using-alternative-cypress-binaries" id="markdown-header-using-alternative-cypress-binaries"></a>

Currents team is maintaining an alternative version of the MIT-licensed Cypress test runner, compatible in features and open for using with recording services like Sorry Cypress and Currents.

See [alternative-cypress-binaries.md](../../integration-with-cypress/alternative-cypress-binaries.md "mention").
