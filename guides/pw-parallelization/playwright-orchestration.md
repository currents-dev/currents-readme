---
description: >-
  Balancing Playwright tests between CI machines for even load distribution and
  optimizes test execution in Playwright.
---

# Playwright Orchestration

Orchestration for Playwright allows to significantly decrease the duration of parallel CI Playwright runs. We've seen up to  40% increase in CI runs speed, compared to the traditional [playwright-sharding.md](playwright-sharding.md "mention").

### Playwright Orchestration vs Sharding

The traditional Playwright sharding method, which splits spec files between available shards (machines) based on the filename, often leads to unbalanced workloads. Since spec files can vary significantly in execution time, this imbalance means that some shards may end up processing only long-running spec files, while others quickly finish with shorter tests, leading to idle resources.

An optimal assignment considering the duration of spec files can significantly improve the efficiency of test execution. By balancing the workload across shards based on test durations, you minimize overall execution time and make better use of resources.

Read more about [load-balancing.md](../load-balancing.md "mention").

<figure><img src="../../.gitbook/assets/pw-shard-fast-bg.png" alt=""><figcaption><p>An optimal balancing of spec files allows to speed up CI execution</p></figcaption></figure>

### How to enable Playwright Orchestration?

{% hint style="info" %}
Beware of the [#limitations](playwright-orchestration.md#limitations "mention")
{% endhint %}

To enable Playwrigth Orchestration, you need to have an account with Currents:

* Create an account at [https://app.currents.dev](https://app.currents.dev)
* Get **Project ID** and [record-key.md](../record-key.md "mention")

After creating an account, install the most recent version of `@currents/playwright.`&#x20;

The package has a CLI tool `pwc-p,` which is a small wrapper that implements Playwright Orchestration:

* it scans the testing suite
* it establishes an orchestration session with Currents servers
* it runs Playwright, executing spec files in the optimal order
* the results are recorded to Currents for troubleshooting and analysis

For example:

```bash
npm i @currents/playwright
npx pwc-p --key <record-key> --project-id <project-id> --ci-build-id <ci-build-id>
```

If you are not already familiar, read more about [ci-build-id.md](../ci-build-id.md "mention") .

A successfully created orchestration will print an output similar to this&#x20;

```bash
$ npx pwc-p --key **redacted** --project-id **redacted** --ci-build-id `date +%s`  -c ./or8n/playwright.config.ts
🚀 Starting orchestration session...
📦 Currents reporter: 1.1.2 recording CI build 1712134904 for project JJzd65, orchestration id 260264cfa16950ab4dc98d5c54333136
🎭 Playwright: 1.42.1 5 tests in 1 project [chromium]

🌐 Executing orchestrated task: [chromium] spec-or8n-e.spec.ts
🌐 Run URL: https://app.currents.dev/run/9b93659915fe653f
# ...start executing the tests in an optimal order.
```

`pwc-p` accepts additional playwright arguments and flags (see [currents-playwright.md](../../integration-with-playwright/currents-playwright.md "mention"))  for example:

```bash
# Add additional playwright arguments and flags:
pwc-p --key <record-key> --project-id <id> --ci-build-id <build-id> -- --workers 2 --timeout 10000
```

### Dynamically switching test between machines 🔬

An additional benefit of using Currents for balancing tests is the ability to automatically redrive tests from one machine to another.

For example - many cloud providers have an option to use [Spot Instances](https://aws.amazon.com/ec2/spot/) for running workloads. Using Spot Instances can cost up to 90% lower, compared to the traditionally allocated resources.

We are currently testing this feature with a few of our customers, please [contact us](mailto:support@currents.dev) if you are interested in participating in the beta.

### Limitations

Beware of the following limitations and caveats:

* [**Playwright Project dependencies**](https://playwright.dev/docs/test-projects#dependencies) are not currently supported - i.e. if you have projects that depend one on another, orchestration will not consider the dependencies. As workaround you can run the projects in the desired order explicitly by defining separate CI steps with `--project <name>` [specification.](https://playwright.dev/docs/test-projects#run-projects)&#x20;
* [**Global Setup and Teardown**](https://playwright.dev/docs/test-global-setup-teardown). An orchestrated execution will run a playwright command for each individual file of your testing suite. Beware, that the global setup or teardown routines will run for each spec file, accordingly.&#x20;
* **Rerunning a failed CI** execution requires generating a new [ci-build-id.md](../ci-build-id.md "mention") also a rerun will include all the tests - not only the failed ones.&#x20;
