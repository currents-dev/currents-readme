---
description: Running cypress tests in parallel with GitHub Action and Currents dashboard
---

# GitHub Actions

### Running Cypress in parallel with GitHub Actions

Currents dashboard allows running cypress tests in parallel using multiple containers within your GitHub Actions workflow.

By using [GitHub Actions matrix execution strategy](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob\_idstrategymatrix), you can create multiple containers that will run your cypress tests in parallel.

Each container will receive a unique set of tests to run, so that your cypress tests will run faster and you can receive faster feedback from your browser test suite.

Currents orchestrates the tests between multiple containers, applying intelligent optimizations to reduce the overall runtime of your workflow, records screenshots and videos for later troubleshooting.

![Cypress Tests Parallelization with Github Actions](<../.gitbook/assets/Cypress-Parallelization-github-actions (1).jpg>)

### GitHub Workflow configuration for Cypress tests

Please take a look at the [example repository](https://github.com/currents-dev/gh-actions-example) that showcases running cypress tests in parallel using GitHub Actions.

The example [workflow config file](https://github.com/currents-dev/gh-actions-example/blob/main/.github/workflows/currents.yml):

* runs 3 containers with cypress tests in parallel
* uses [Custom Test Command](https://github.com/cypress-io/github-action#custom-test-command) to run `cypress-cloud` for recording test results and parallelization with [Currents.dev](https://currents.dev)
* Note: set the `projectId` in `currents.config.js` (you can obtain the project id from [Currents.dev](https://app.currents.dev) in Project Settings)
* Note: install `cypress-cloud/plugin` in `cypress.config.js`
* Note: use CLI arguments to customize your cypress runs, e.g.: `cypress-cloud run --parallel --record --key <your currents.dev key> --group groupA`
* Note: create an organization, get your record key on [Currents.dev](https://app.currents.dev) and set [GH secret](https://docs.github.com/en/actions/reference/encrypted-secrets) variable `CURRENTS_RECORD_KEY`

Here's an example of how the demo workflow appears in Currents dashboard

![Running Cypress tests in parallel - Currents dashboard](../.gitbook/assets/github-actions-cypress-parallel-execution.gif)

### How to setup Git commit data for Cypress when using GitHub Actions

Running Cypress tests using GitHub Actions can generate confusing git information. For example, instead of the last commit message (or pull request title), one can see something like:

```
Merge de7282540ac30ee4e32a0b1fede4f6391b4cc321 into fa58941d8a807b83ec5a3e5bfb83418ce12173c7
```

Also, the branch name becomes `refs/pull/12/merge` instead of the expected branch name. Why is that happening?

That happens when your GitHub Actions workflow is triggered by [`pull_request`](https://docs.github.com/en/github-ae@latest/actions/using-workflows/events-that-trigger-workflows#pull\_request).&#x20;

It changes the behaviour of `@actions/checkout` - it creates a **new merge commit,** which is created from merging the base to the head.&#x20;

Specifically:

* it performs `git checkout` to `github.ref` environment variable
* it sets the git `ref` to `refs/remotes/pull/##/merge`
* it sets the commit SHA to an arbitrary value that is different from the commit that triggered the workflow

In order to change the default behaviour and checkout the triggering commit, use the following `@actions/checkout` configuration

```yaml
- uses: actions/checkout@v2
  with:
    ref: ${{ github.event.pull_request.head.sha }}
```

Read more about [GitHub Actions and `pull_request`](https://frontside.com/blog/2020-05-26-github-actions-pull\_request/) (by frontside.com).
