---
description: Running cypress tests in parallel with Currents dashboard
---

# You First Cypress Run

Setting up Currents for running and recording cypress tests in parallel can be done seamlessly within a few minutes.

Here's an overview of what steps you'll need to take to start running cypress tests in parallel using Currents dashboard:

* Create an organization and a project
* Update `cypress.json` with newly created `projectId`
* Install `cypress` and `@currents/cli` npm packages
* Use `currents`  CLI command to create your first run
* Update your CI provider configuration

### Create New Organization and a Project

After signing up to the dashboard service, you will be prompted to create a new organization and a project. You can change the name later.

![Creating Organization and Project in Currents dashboard](../.gitbook/assets/currents-create-org.gif)

After creating a new organization and a project, you'll see on-screen instructions with your newly created  `projectId`

``

### Update `cypress.json` with newly created `projectId`&#x20;

{% hint style="info" %}
**Please note:** If you don't have cypress project ready, please clone a demo repository with predefined cypress tests and GitHub actions integration.

[https://github.com/currents-dev/gh-actions-example](https://github.com/currents-dev/gh-actions-example)
{% endhint %}

Edit `cypress.json` file and set the `projectId` of the newly created project.



### Install `@currents/cli` and `cypress` npm packages

{% hint style="info" %}
**Please note:** cypress versions `6.7.0` and up are supported
{% endhint %}

Use your favourite NodeJS package manager to install `@currents/cli` and `cypress` packages.&#x20;

```bash
npm install @currents/cli cypress
```



### Create your first cypress run

Run `currents` command to create your first cypress run in Currents dashboard.

```
npx currents run \
--parallel \
--record \
--key RECORD_KEY \
--ci-build-id hello-currents
```

Running this command will create a new run in Currents dashboard.

![Creating first cypress run with Currents dashboard](../.gitbook/assets/cypress-first-run.gif)

{% hint style="info" %}
Learn more about

* [Currents CLI](../guides/currents-cli.md)
* [Record Key](../guides/record-key.md)
* [CI Build ID](../guides/cypress-ci-build-id.md)
{% endhint %}

### Update your CI provider configuration

To unlock the full power of Currents dashboard, update your CI provider configuration to use Currents for running your cypress tests in parallel.&#x20;

Please read our [Parallelization Guide](../guides/parallelization.md) and check out few [CI Setup examples](broken-reference) for popular CI tools.
