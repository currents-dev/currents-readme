---
description: Running cypress tests in parallel on Gitlab CI/CD
---

# GitLab

### Running cypress tests in parallel on GitLab CI/CD

GitLab CI/CD platform allows effectively running your Playwright and cypress test in parallel, using multiple containers and Currents for tests orchestration.

In order to run cypress tests in parallel, define [`parallel`](https://docs.gitlab.com/ee/ci/jobs/job\_control.html#parallelize-large-jobs) jobs parameter in GitLab CI/CD pipeline configuration file.

GitLab will run the jobs on multiple containers - each container will run a unique set of tests using Currents orchestration service. Currents applies  intelligent optimizations and sorts the test to reduce overall runtime of the pipeline.

![Using Gitlab CI/CD parallel jobs for running cypress tests in parallel](<../.gitbook/assets/CleanShot 2022-02-18 at 23.03.15.png>)

### How to setup GitLab CI/CD to run Playwright Tests in parallel?

To run Playwright tests in parallel on GitLab CI/CD please consider taking a look at the example repository we have created.

The example [CI config file](https://gitlab.com/currents.dev/gitlab-currents-example/-/blob/main/.gitlab-ci.yml):

* runs 3 containers with Playwright tests in parallel
* Note: set your `projectId` from [Currents.dev](https://app.currents.dev) in `currents.config.js`
* Note: use CLI arguments to customize your cypress runs, e.g.: `pwc run --key <your currents.dev key> --project=firefox`
* Note: create a project, get your record key on [Currents.dev](https://app.currents.dev) and set `CURRENTS_RECORD_KEY` [GitLab CI/CD variable for the project](https://docs.gitlab.com/ee/ci/variables/#add-a-cicd-variable-to-a-project)

### How to setup GitLab CI/CD to run Cypress Tests in parallel?

To run cypress tests in parallel on GitLab CI/CD please consider taking a look at the example repository we have created.

The example [CI config file](https://gitlab.com/currents.dev/gitlab-currents-example/-/blob/main/.gitlab-ci.yml):

* runs 3 containers with cypress tests in parallel
* installs `cypress-cloud` npm package and `cypress-cloud/plugin` plugin
* Note: set your `projectId` from [Currents.dev](https://app.currents.dev) in `currents.config.js`
* Note: use CLI arguments to customize your cypress runs, e.g.: `cypress-cloud run --parallel --record --key <your currents.dev key> --group groupA`
* Note: create a project, get your record key on [Currents.dev](https://app.currents.dev) and set `CURRENTS_RECORD_KEY` [GitLab CI/CD variable for the project](https://docs.gitlab.com/ee/ci/variables/#add-a-cicd-variable-to-a-project)



