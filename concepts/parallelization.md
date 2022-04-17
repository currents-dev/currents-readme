---
description: Cypress Tests Parallelization explained
---

# Parallelization

### Why parallelize cypress tests?

As you Cypress Tests suite grows, it becomes crucial to optimize the overall duration in order to get a faster feedback. Once your cypress tests suite volume passed 10 spec files, you'd start looking for solutions to run the tests in parallel.

Parallelization is the most popular technique for reducing the runtime duration of your cypress tests. One of the most convenient and easy solutions is to use cloud service like Currents or Cypress Dashboard.&#x20;

Those services integrate with your CI provider and use intelligent techniques to parallelize the tests, reduce overall runtime, as well as providing features like storing video and screenshot recording, tests outputs, providing analytics and integration with 3rd party tools.

![Running cypress test in parallel reduces overall time](<../.gitbook/assets/cypress-parallelization-benefits (1) (1).png>)

### How does cypress parallelization work?

Running cypress tests in parallel on CI environment involves creating multiple containers. Depending on the size of your browser test suite, it can be dozens or hundreds of containers.

Containers use Currents cloud service to get instructions about tests (technically, spec files) to run - every test runs in a different container. Currents uses intelligent orchestration heuristics to optimally distribute the tests between containers and reduce overall runtime.

The simplistic animation below demonstrates parallelization of 6 spec files using 3 containers.

* Each container runs an identical `cypress` or `currents` command with `--parallel` flag
* Each container connects to Currents to get instructions about the next spec file to run
* Currents dashboard assigns each container a spec file to run
* Each container runs its spec file
* Each container sends the results back to Currents and get the next spec file to run
* When no more spec files left, containers finish their execution

![Cypress tests parallelization using Currents orchestration ](../.gitbook/assets/parallelization-basic.gif)

### Cypress Parallelization FAQ

#### Do I need my own machines to run cypress tests in parallel?

Yes. You still need CI machines that will run actual tests. Orchestration services will help to load-balance and troubleshot your cypress tests.

#### Can I run multiple cypress tests on the same machine?

Yes! You don't have to run different machines / containers for running cypress tests in parallel. You can run multiple `currents` / `cypress` instances on the same machine. Keep in mind that cypress tests are quite resource-demanding - running to many instances of test runner can actually slow down the overall execution or even crash the machine.

#### What CI providers can run cypress tests in parallel?

Any CI provider or tool that allows creating multiple containers / jobs can be integrated with Currents for running cypress tests in parallel. See [Broken link](broken-reference "mention") section for details.

#### How to run cypress tests in parallel?

To run cypress tests in parallel and use Currents as orchestration service, run this command:

```bash
currents run --parallel --record --key <currents_key>
```

Follow our [you-first-cypress-run.md](../getting-started/you-first-cypress-run.md "mention") guide for details.

#### How to distinguish one parallelized build / run from another?

Currents uses `--ci-build-id` flag to uniquely identify one parallelized build from another. This value of this flag is calculated automatically for popular CI tools, but you can provide it explicitly to control your. See [cypress-ci-build-id.md](cypress-ci-build-id.md "mention") for details.
