---
description: The better alternative to Playwright Sharding
icon: sitemap
---

# Test Orchestration

Scaling a test suite comes with many challenges. As the test suite grows, CI becomes slower.&#x20;

Playwright [parallelism](https://playwright.dev/docs/test-parallel) helps reducing the bottleneck, but they aren't as efficient as they could be. Sharding splits test files based on the lexical order of file paths, leading to <mark style="color:$danger;">unbalanced workloads</mark>.&#x20;

Currents Test Orchestrator fixes that by balancing the load using historical execution data, continuously creating the most optimal execution order for test runs, resulting in [**up to 40% reduction the CI execution time**](https://currents.dev/posts/currents-and-fundguard) with minimal changes to configuration.

<figure><img src="../.gitbook/assets/Orchestration (4).png" alt=""><figcaption></figcaption></figure>

Instead of pre-allocating tests to CI nodes, the orchestrator keeps a live queue of pending tests and dynamically assigns them to machines as they become available. This allows continuous communication and coordination across all nodes, improving overall throughput.



* **Learning from history** — tracks test durations and uses that data to improve distribution in future runs.
* **No renaming hacks** — you don’t need to rename spec files or manually tune splits for better balance.
* **Dynamic test distribution** — tests are split based on real-time machine availability, not pre-assigned upfront.
* **Handles CI quirks** — automatically adapts to runner spin-up delays or unresponsive machines.
* **Scales with your suite** — maintains high throughput as test count, duration, or structure evolves.
* **Your CI, your environment** — the tests are running on your existing environment, the orchestrator client communicates with Currents for task assignments and reporting the results.
* **It's just Playwright** — an orchestrator uses Playwright internally, using the same configuration and interfaces to run the tests.



### Get Started

<table data-card-size="large" data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th><th data-hidden data-card-cover data-type="image">Cover image</th></tr></thead><tbody><tr><td><strong>Learn More</strong>: Technical Deep Dive</td><td><sup>Fully understand how Test Orchestration works and how it compares to native Playwright Sharding.</sup></td><td><a href="ci-optimization/playwright-parallelization.md">playwright-parallelization.md</a></td><td><a href="../.gitbook/assets/currents-orchestration-queue.png">currents-orchestration-queue.png</a></td></tr><tr><td><strong>Get Started</strong>: Setup Orchestration</td><td><sup>Read the guide on how to setup Test Orchestration in your test suite.</sup></td><td><a href="ci-optimization/playwright-orchestration.md">playwright-orchestration.md</a></td><td data-object-fit="contain"><a href="../.gitbook/assets/playwright-logo-neo.png">playwright-logo-neo.png</a></td></tr></tbody></table>

