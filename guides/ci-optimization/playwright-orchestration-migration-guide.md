---
description: Migration Guide for Currents Orchestration v1 -> v2
---

# Migration Guide

{% hint style="info" %}
This guide is for migrating Currents Orchestration from `v1` to `v2` . If you are not using Currents Orchestration see [migration-to-playwright-1.60.md](../../resources/reporters/currents-playwright/migration-to-playwright-1.60.md "mention")&#x20;
{% endhint %}

## What Has Changed?

`v2` of Currents Orchestration requires running two separate commands:

* `pwc-p discover` — runs Playwright in discovery mode and writes the list of tests to be orchestrated to a file.
* `pwc-p run` — initiates the orchestrated execution based on the previous step, using the list of tests as an input.

That's different from `v1` that was using a single command for discovery and execution.&#x20;



The migration involves:

* Adding `pwc-p discover`  step
* Using `pwc-p run` command

## Migration Steps

{% stepper %}
{% step %}
### Update `@currents/playwright` to 2.0.0+

{% code overflow="wrap" lineNumbers="true" %}
```
npm i @currents/playwright@^2
```
{% endcode %}
{% endstep %}

{% step %}
### Use `pwc-p discover` command

* Run  `pwc-p discover` to create a discovery file with tests selected for orchestration, you can apply the same filters and CLI arguments as for `playwright` command.
* Run `pwc-p run` with `--pwc-discovery-file` to execute the orchestration. Run `pwc-p run --help`  to see the available flags or refer to [currents-playwright](../../resources/reporters/currents-playwright/ "mention").

{% code overflow="wrap" lineNumbers="true" %}
```bash
npx pwc-p discover --pwc-discovery-file discovery-path [...filters]
npx pwc-p run --pwc-discovery-file discovery-path --key currents-record-key --project-id currents-project-id --ci-build-id ci-build-id
```
{% endcode %}
{% endstep %}

{% step %}
### Replace `pwc-p` with `pwc-p run`

Update your CI configuration to use `pwc-p run` instead of `pwc-p`

{% code overflow="wrap" %}
```bash
# Before
npx pwc-p --key record-key --project-id project-id --ci-build-id ci-build-id

# After
npx pwc-p run --pwc-discovery-file discovery-path --key record-key --project-id project-id --ci-build-id ci-build-id
```
{% endcode %}
{% endstep %}
{% endstepper %}

## When to use `discover`

`pwc-p discover` is required when you want to explicitly select tests for orchestration — for example:

* Filtering tests by tag:  `--grep / -g @smoke`
* Filtering tests by last run outcome:  `--last-failed`  (see [#re-running-only-failed-tests](playwright-orchestration-migration-guide.md#re-running-only-failed-tests "mention"))
* Filtering tests by Playwright project: `--project chromium`
* Explicit spec file location: `playwright test <spec-file-path>`

Apply the desired arguments and parameters as if you are running `playwright` command, for example:

{% code overflow="wrap" lineNumbers="true" %}
```sh
# Create discovery file with filters applied
npx pwc-p discover --pwc-discovery-file ./test-list --grep @smoke --project chromium

# Use the discovery file as an input for orchestration
npx pwc-p run --pwc-discovery-file ./test-list --key currents-record-key --project-id currents-project-id --ci-build-id ci-build-id
```
{% endcode %}

Omitting discovery stage selects **all** tests for orchestration.

| Scenario                           | Commands                                        |
| ---------------------------------- | ----------------------------------------------- |
| Run the full suite (no filters)    | `pwc-p run ...`                                 |
| Filter tests with Playwright flags | first `pwc-p discover ...` then `pwc-p run ...` |
