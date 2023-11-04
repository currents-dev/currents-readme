---
description: Running Cypress test in parallel on GitLab
---

# Cypress - GitLab CI/CD

GitLab CI/CD platform allows effectively running your Playwright and cypress test in parallel, using multiple containers and Currents for tests orchestration.

To run Cypress tests in parallel, define [`parallel`](https://docs.gitlab.com/ee/ci/jobs/job\_control.html#parallelize-large-jobs) jobs parameter in GitLab CI/CD pipeline configuration file.

GitLab will run the jobs on multiple containers - each container will run a unique set of tests using Currents orchestration service. Currents applies intelligent optimizations and sorts the test to reduce overall runtime of the pipeline.

![Using Gitlab CI/CD parallel jobs for running cypress tests in parallel](<../../.gitbook/assets/CleanShot 2022-02-18 at 23.03.15.png>)
