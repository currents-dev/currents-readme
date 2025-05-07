---
description: Using CI Build ID for reporting to Currents
icon: file-waveform
---

# CI Build ID

## What is CI Build ID?

**CI Build ID** is a unique identifier used by Currents to collect test results. Think of it as a hard drive "folder". We call it a Run (see [runs](../dashboard/runs/ "mention")).&#x20;



For example, when multiple CI machines run tests in parallel, their combined results are combined if they use the same CI Build ID.

* results with `--ci-build-id build001` will go to `build001` "folder"
* results with `--ci-build-id build002` will go to `build002` "folder"

<figure><img src="../.gitbook/assets/ci-build-id.png" alt=""><figcaption><p>Creating two distinct runs by using different CI Build ID</p></figcaption></figure>

## Creating a CI Build ID

You can choose between leveraging our auto-detection algorithm, or manually generating a CI Build ID.&#x20;

### Automatic Detection

Currents  automatically detects CI Build ID for popular CI providers based on the presence of environment variables. Please refer to [#build-id-for-popular-ci-providers](ci-build-id.md#build-id-for-popular-ci-providers "mention") to see the environment variables used for each provider.&#x20;

Otherwise, if not explicitly provided, Currents  generates a random unique id.

### Explicit  Value

You can also specify CI Build ID explicitly.

{% tabs %}
{% tab title="CLI" %}
With the CLI, you can use the `--ci-build-id` flag, for example:

```bash
pwc run --ci-build-id CI_BUILD_ID --key xxx --project-id yyy
```
{% endtab %}

{% tab title="Reporter Configuration" %}
Example on passing ciBuildId to Playwright Reporter configuration:

```javascript
// playwright.config.ts
import { currentsReporter } from '@currents/playwright';

//...
reporter: [
  currentsReporter({
    //... 
    ciBuildId: process.env.CURRENTS_CI_BUILD_ID
  }),
]
```
{% endtab %}

{% tab title="Environment Variable" %}
You can also set the `CURRENTS_CI_BUILD_ID` environment variable to provide an explicit CI Build ID value.
{% endtab %}
{% endtabs %}

In order to manually construct a CI Build ID that is unique for each build (but similar across all the parallel machines) it is recommended to use your CI provider's environment variables that combine pipeline/workflow/build identifier and also an attempt number.

For example, for GitHub Actions:

```
--ci-build-id "${{ github.repository }}-${{ github.run_id }}-${{ github.run_attempt }}"
```

Refer to your CI provider documentation for the list of available environment variables.



## Examples

### Different CI Build ID, Different Builds

Imagine a CI pipeline running tests in parallel using multiple machines. Starting two builds with a **different CI Build ID** will create 2 distinct "Runs" in Currents dashboard.

The reporting will happen for each build independently from the other. That is usually the desired situation - each build should have a unique CI Build ID.

### Same CI Build ID,  Different builds

In contrast, consider a situation when 2 **different** builds use the **same** CI Build ID. That's an uncommon situation, but it's worth demonstrating for understanding the use of CI Build ID.

<figure><img src="../.gitbook/assets/ci-build-id-same.png" alt=""><figcaption><p>A single run is created when using a similar CI Build ID</p></figcaption></figure>

We created two different builds with the same CI Build ID. That will result in 6 machines reporting their results to the same run.

### Build ID for Popular CI Providers

Currents tries to automatically detect the CI provider by looking at the environment variables and picking the best combination.

<details>

<summary>Build ID for Popular CI Providers Table</summary>

<table><thead><tr><th width="193">Provider</th><th width="317">Variables</th><th>Fallback</th></tr></thead><tbody><tr><td>AppVeyor</td><td><ul><li>APPVEYOR_PULL_REQUEST_HEAD_REPO_BRANCH</li><li>APPVEYOR_BUILD_NUMBER</li></ul></td><td><ul><li>APPVEYOR_BUILD_NUMBER</li></ul></td></tr><tr><td>Azure</td><td><ul><li>BUILD_BUILDID</li></ul></td><td></td></tr><tr><td>AWS Code Build</td><td><ul><li>CODEBUILD_BUILD_ID</li><li>CODEBUILD_SOURCE_VERSION</li></ul></td><td><ul><li>CODEBUILD_BUILD_ID</li></ul></td></tr><tr><td>Bamboo</td><td><ul><li>bamboo_buildKey</li><li>bamboo_buildNumber</li></ul></td><td><ul><li>bamboo_buildKey</li></ul></td></tr><tr><td>Bitbucket</td><td><ul><li>BITBUCKET_REPO_SLUG</li><li>BITBUCKET_BUILD_NUMBER</li></ul></td><td><ul><li>BITBUCKET_BUILD_NUMBER</li></ul></td></tr><tr><td>Buildkite</td><td><ul><li>BUILDKITE_BUILD_ID</li></ul></td><td></td></tr><tr><td>CircleCI</td><td><ul><li>CIRCLE_WORKFLOW_ID</li></ul></td><td><ul><li>CIRCLE_BUILD_NUM</li></ul></td></tr><tr><td>Codeship</td><td><ul><li>CI_REPO_NAME</li><li>CI_BUILD_ID</li></ul></td><td><ul><li>CI_BUILD_ID</li></ul></td></tr><tr><td>Concourse</td><td><ul><li>BUILD_ID</li><li>BUILD_NAME</li></ul></td><td><ul><li>BUILD_ID</li></ul></td></tr><tr><td>CodeFresh</td><td><ul><li>CF_BUILD_ID</li><li>CF_CURRENT_ATTEMPT</li></ul></td><td><ul><li>CF_BUILD_ID</li></ul></td></tr><tr><td>Drone</td><td><ul><li>DRONE_PULL_REQUEST</li><li>DRONE_BUILD_NUMBER</li></ul></td><td><ul><li>DRONE_BUILD_NUMBER</li></ul></td></tr><tr><td>GitHub Actions</td><td><ul><li>GITHUB_REPOSITORY</li><li>GITHUB_RUN_ID</li><li>GITHUB_RUN_ATTEMPT</li></ul></td><td><ul><li>GITHUB_RUN_ID</li></ul></td></tr><tr><td>GitLab</td><td><ul><li>CI_PIPELINE_ID</li></ul></td><td></td></tr><tr><td>GoCD</td><td><ul><li>GO_REVISION</li><li>GO_PIPELINE_COUNTER</li></ul></td><td><ul><li>GO_REVISION</li></ul></td></tr><tr><td>Google Cloud</td><td><ul><li>REPO_NAME</li><li>BUILD_ID</li></ul></td><td><ul><li>BUILD_ID</li></ul></td></tr><tr><td>Jenkins</td><td><ul><li>BUILD_NUMBER</li></ul></td><td></td></tr><tr><td>Semaphore</td><td><ul><li>SEMAPHORE_GIT_REPO_SLUG</li><li>SEMAPHORE_PIPELINE_ID</li></ul></td><td><ul><li>SEMAPHORE_PIPELINE_ID</li></ul></td></tr><tr><td>TeamFoundation</td><td><ul><li>BUILD_BUILDID</li><li>BUILD_BUILDNUMBER</li></ul></td><td><ul><li>BUILD_BUILDID</li></ul></td></tr><tr><td>Travis</td><td><p></p><ul><li>TRAVIS_REPO_SLUG</li><li>TRAVIS_BUILD_ID</li></ul></td><td><ul><li>TRAVIS_BUILD_ID</li></ul></td></tr><tr><td>Netlify</td><td><ul><li>BUILD_ID</li></ul></td><td></td></tr></tbody></table>



</details>

## Next Steps

Now, after you're familiar with CI Build ID, explore [reporting-strategy.md](parallelization-guide/reporting-strategy.md "mention") to customizing your reporting to Currents.

## FAQ

<details>

<summary>Retrying builds and CI Build ID</summary>

Imagine a situation

* You start a new build with CI Build ID **build-001**
  * Build completes and reports all the results to Currents Dashboard
  * Currents marks build-001 as "finished" and all the files as completed
* You restart the build (attempt B), but keep the same CI build ID **build-001**
  * Currents considers **build-001** as already completed
  * Currents won't accept new results for **build-001**, because all the results were already reported&#x20;
  * Currents will not send any new files for Cypress orchestration, because build-001 already ran all the spec files on the first attempt

To resolve this ambiguity, we need to have a different CI build ID for each rerun.

Most CI providers provide a different set of environment variables for different attempts and  Currents dashboard can identify it automatically - it will create an entirely new run for retries.

You can also construct an explicit CI Build ID when retrying a build, for example, for GitHub Actions:

```
"${{ github.repository }}-${{ github.run_id }}-${{ github.run_attempt }}"
```

If you are generating CI Build ID manually, please make sure to include the retry/attempt identifier.&#x20;

Please refer to your CI tool documentation to explore what environment variables are available for composing a valid CI Build ID.

</details>

<details>

<summary>Using commit SHA as CI Build ID</summary>

Using commit SHA as a CI Build ID is a valid approach and can work for many setups. However, please be aware that rerunning a build with the same commit SHA can result in a duplicate CI Build ID and prevent orchestration and reporting (see [#faq-retrying-builds-and-ci-build-id](ci-build-id.md#faq-retrying-builds-and-ci-build-id "mention"))

</details>

<details>

<summary>How to rerun CI with only failed tests?</summary>

See [re-run-only-failed-tests.md](ci-optimization/re-run-only-failed-tests.md "mention")

</details>

