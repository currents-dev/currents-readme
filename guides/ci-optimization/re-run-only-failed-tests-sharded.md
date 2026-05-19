---
description: Re-run only failed tests when using native Playwright sharding
---

# Re-run Only Failed Tests — Sharded runs

Native Playwright sharding runs tests in parallel across a fixed set of jobs. On retry, each job should run only the tests that failed in the previous execution. The guides below show how to wire `--last-failed` into GitHub Actions, GitLab CI, and Jenkins—using the `playwright-last-failed` helper where needed.

Step-by-step guides:

* [**GitHub Actions**](../../getting-started/ci-setup/github-actions/re-run-failed-only-tests-sharded.md)
* [**GitLab CI**](../../getting-started/ci-setup/gitlab/re-run-failed-only-tests.md#playwright-sharding)
* [**Jenkins Pipeline**](../../getting-started/ci-setup/jenkins.md#using-last-failed-flag-with-shards-and-orchestration)
