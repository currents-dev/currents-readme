---
description: Guide to Cypress Flaky Tests
---

# Flaky Tests

### What is flaky cypress test?

Flaky cypress test is a tests that did not succeed from the first attempt. The build will fail only occasionally: One time it will pass, another time fail, the next time pass again, without any changes to the build having been made. Flaky tests are marked with a special badge on run, spec and individual test level.

![Cypress Run Summary with 1 flaky test detected](<../.gitbook/assets/cypress-flaky-tests (1).png>)

### How to activate flaky tests detection?

Flaky tests are automatically activated for all cypress tests with [retries](https://docs.cypress.io/guides/guides/test-retries#How-It-Works) enabled. When a test has retries enabled and doesn't not pass from the first attempt, it will be marked as flaky.&#x20;

### Why are flaky tests bad?

A flaky test like this **can block the continuous deployment pipeline**, making feature delivery slower than it needs to be. Moreover, a flaky test is problematic because it is not deterministic anymore — making it useless. After all, you wouldn’t trust one any more than you would trust a liar.

Flaky tests are **expensive to repair**, often requiring hours or even days to debug.&#x20;

In summary, flaky cypress tests are considered harmful because:

* You cannot trust them - neither system / component under test nor the test itself are reliable
* Even if flaky tests pass, your end users can experience intermittent issues
* Flaky tests increase the duration of your tests suite
* Flaky tests are expensive to repair and to maintain

### How to get rid of flaky tests?

Your team is arguably the **most important factor**. As a first step, admit that you have a problem with flaky tests. Getting the whole team’s commitment is crucial! Then, as a team, you need to decide how to deal with flaky tests.

#### Identify flaky cypress tests

Use our [#top-flaky-tests](../insights/insights-and-analytics.md#top-flaky-tests "mention") Insights to see the tests with the highest flakiness rate.&#x20;

![Cypress Top Flaky Tests Insights](../.gitbook/assets/cypress-flaky-tests.png)

#### Eliminate Flaky Cypress Tests

Examine the outcomes of your runs to see what tests are flaky and eliminate the source of flakiness.

* Don't use fixed wait times
* Optimize tests structure - write smaller tests
* Keep tests isolated - use fresh, clean data before each test
* Give up and use retries 😛
