---
description: A guide on optimizing Playwright tests in CI for better efficiency
icon: microchip
layout:
  title:
    visible: true
  description:
    visible: true
  tableOfContents:
    visible: true
  outline:
    visible: false
  pagination:
    visible: true
---

# CI Optimization

Currents offers several ways to speed up and optimize your CI pipeline. Whether you’re just starting with basic test sharding or looking to squeeze every bit of efficiency from your infrastructure, the following strategies can help you reduce runtime, cut costs, and make test results more actionable.



* **Speed up CI by running Playwright tests in parallel** — start with sharding and switch to Currents Orchestration for more efficient use of resource. See [playwright-parallelization.md](playwright-parallelization.md "mention").
* **Reduce CI costs by utilizing Cloud Spot Instances** —  orchestration allows dynamically reroute tests from a to-be-terminated to a healthy instance. See [ci-tests-on-spot-instances.md](ci-tests-on-spot-instances.md "mention").
* **Enable Playwright Fully Parallel Mode** — run tests from the same test file in parallel using all the available CPUs. See [fully-parallel-mode.md](fully-parallel-mode.md "mention").
* **Explore Load Balancing Strategies** — run frequently failing or flaky tests first with Currents Orchestration. See [fail-fast-strategy.md](fail-fast-strategy.md "mention").
* **Rerun only failed tests** — see [re-run-only-failed-tests.md](re-run-only-failed-tests.md "mention")
