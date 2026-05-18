---
description: How to setup failed tests re-run on GitLab
---

# Re-run Only Failed Tests

When a workflow fails in GitLab CI/CD you have the option to re-run the failed jobs. However, an additional setup is required for properly configuring Playwright for rerunning only the failed tests. See [Re-run Only Failed Tests](https://docs.currents.dev/guides/re-run-only-failed-tests) guide for details.

<figure><img src="../../../.gitbook/assets/currents-2024-10-02-14.07.49@2x.png" alt=""><figcaption><p>Rerunning only the failed jobs on GitLab CI/CD</p></figcaption></figure>

#### Playwright Sharding

If you're using [Playwright Sharding](https://docs.currents.dev/guides/parallelization-guide/pw-parallelization/playwright-sharding) for running your tests in parallel, use [currents cache](https://docs.currents.dev/resources/reporters/currents-cmd/currents-cache) command to store the last run results and simplify re-run workflows.

Example workflows are available in our GitLab repositories:

* [reruns-pwc.yml](https://gitlab.com/currents.dev/gitlab-playwright-currents/-/blob/main/.gitlab/ci/with-reruns-pwc.yml?ref_type=heads) - re-run only failed tests on GitLab CI using 3 parallel runners and Playwright Shards + Currents `pwc` command
* [reruns-reporter.yml](https://gitlab.com/currents.dev/gitlab-playwright-currents/-/blob/main/.gitlab/ci/with-reruns-reporter.yml?ref_type=heads) - re-run only failed tests on GitLab CI using 3 parallel runners and Playwright Shards + Currents reporter in `playwright.config.ts`

##### Install the @currents/cmd package

```bash
npm i -D @currents/cmd
```

##### Add an after_script to upload the cache

Add an `after_script` to the end of your job that uploads run information to the cache

```yaml
after_script:
    # Save the last-run.json to cache after the run
    - npx currents cache set --pw-output-dir basic/test-results --preset last-run
```

See the [configuration for details](../../../resources/reporters/currents-cmd/#cache-test-artifacts) on the flags.

##### Add a download cache step to your script

Update your job script to download the cache prior to running tests

```yaml
script:
    - npm ci
    # Grab the last run from cache. CacheId is automatically calculated for GitLab, and a .currents_env file is created with extra env variables
    # $EXTRA_PW_FLAGS will contain the correct --shard flag, as well as --last-failed if this was a retried job
    # $RUN_ATTEMPT will be populated with a value 1+ based on how many times this job has been retried
    - npx currents cache get --preset last-run --continue
    - cat .currents_env >> $GITLAB_ENV && source .currents_env
    - npx playwright install
    # Run playwright, provide a build id with the run-attempt included and also pass $EXTRA_PW_FLAGS 
    - export CURRENTS_CI_BUILD_ID="reporter-$CI_PIPELINE_ID-$RUN_ATTEMPT"
    - npx playwright test -c playwright.config.reporter.ts $EXTRA_PW_FLAGS

```

See the [configuration for details](../../../resources/reporters/currents-cmd/#cache-test-artifacts) on the flags.

##### Full example

{% code lineNumbers="true" %}
```yaml
test-rerun-reporter:
  image: {{space.vars.PW_IMAGE_ROUTE}}:{{space.vars.LATEST_PW_IMAGE_VERSION}}
  stage: test
  parallel: 3
  variables:
    CURRENTS_PROJECT_ID: bnsqNa
    # CURRENTS_RECORD_KEY: <set in your CI/CD variables>
  script:
    - npm ci
    # Grab the last run from cache. CacheId is automatically calculated for GitLab, and a .currents_env file is created with extra env variables
    # $EXTRA_PW_FLAGS will contain the correct --shard flag, as well as --last-failed if this was a retried job
    # $RUN_ATTEMPT will be populated with a value 1+ based on how many times this job has been retried
    - npx currents cache get --preset last-run --continue
    - cat .currents_env >> $GITLAB_ENV && source .currents_env
    - npx playwright install
    - cd ./basic
    # Run playwright, provide a build id with the run-attempt included and also pass $EXTRA_PW_FLAGS 
    - export CURRENTS_CI_BUILD_ID="reporter-$CI_PIPELINE_ID-$RUN_ATTEMPT"
    - npx playwright test -c playwright.config.reporter.ts $EXTRA_PW_FLAGS
  after_script:
    # Save the last-run.json to cache after the run
    - npx currents cache set --pw-output-dir basic/test-results --preset last-run

```
{% endcode %}

#### Currents Orchestration

In case you're using [playwright-orchestration.md](../../../guides/ci-optimization/playwright-orchestration.md "mention") for running your Playwright tests in parallel, use [currents-api.md](../../../resources/reporters/currents-cmd/currents-api.md "mention") command to fetch the results of the last run from the [API](https://app.gitbook.com/o/-MT4mUcrnbXWgd1xvl_x/s/lcxad7NaXT7D2V6owvHN/ "mention").

\
An example workflow is available in our GitLab demo repository

* [rerun-or8n.yml](https://gitlab.com/currents.dev/gitlab-playwright-currents/-/blob/main/.gitlab/ci/with-reruns-pwcp.yml?ref_type=heads) - rerun only failed tests on GitLab CI/CD with Currents Orchestration

##### Install the @currents/cmd package

```bash
npm i -D @currents/cmd
```

##### Set `CURRENTS_API_KEY` environment variable

Obtain an API key (see [Authentication](https://app.gitbook.com/s/lcxad7NaXT7D2V6owvHN/get-started/authentication "mention")) and [record-key.md](../../../guides/record-key.md "mention") from Currents Dashboard and set [GitLab CI/CD variable](https://docs.gitlab.com/ee/ci/variables/) accordingly

```yaml
variables:
    CURRENTS_PROJECT_ID: bnsqNa
    CURRENTS_RECORD_KEY: # set CI/CD variable
    CURRENTS_API_KEY: # set CI/CD variable
```

##### Add an after_script to upload the cache

Add an `after_script` to the end of your job that uploads GitLab retry information to the cache

```yaml
after_script:
    # Save the last-run.json to cache after the run
    - npx currents cache set --pw-output-dir basic/test-results --preset last-run
```

See [currents-cache.md](../../../resources/reporters/currents-cmd/currents-cache.md "mention") documentation for all the available options

##### Add an API get-run step to your script

Update your job script to download the cache prior to running tests, and then also grab the previous run.

{% code overflow="wrap" %}
```yaml
script:
    - npm ci
    # Grab the last run from cache. CacheId is automatically calculated for GitLab, and a .currents_env file is created with extra env variables
    # $EXTRA_PWCP_FLAGS will contain --last-failed if this was a retried job
    # $RUN_ATTEMPT will be populated with a value 1+ based on how many times this job has been retried
    - npx currents cache get --preset last-run --continue
    - cat .currents_env >> $GITLAB_ENV && source .currents_env
    # Grab the complete last run from the API so orchestration can find all the failures
    - npx currents api get-run --branch=$CI_COMMIT_REF_NAME --pw-last-run --output=basic/test-results/.last-run.json || true
    - npx playwright install
    # Run pwc-p, provide a build id with the run-attempt included, and also pass EXTRA_PWCP_FLAGS
    - npx pwc-p --ci-build-id=or8n-$CI_PIPELINE_ID-$RUN_ATTEMPT $EXTRA_PWCP_FLAGS

```
{% endcode %}

See [currents-api.md](../../../resources/reporters/currents-cmd/currents-api.md "mention") documentation to explore all the available options

##### Full example

{% code lineNumbers="true" %}
```yaml
test-rerun-pwcp:
  image: {{space.vars.PW_IMAGE_ROUTE}}:{{space.vars.LATEST_PW_IMAGE_VERSION}}
  stage: test
  parallel: 3
  variables:
    CURRENTS_PROJECT_ID: bnsqNa
    # CURRENTS_RECORD_KEY: <set in your CI/CD variables>
    # CURRENTS_API_KEY: <set in your CI/CD variables>
  script:
    - npm ci
    # Grab the last run from cache. CacheId is automatically calculated for GitLab, and a .currents_env file is created with extra env variables
    # $EXTRA_PWCP_FLAGS will contain --last-failed if this was a retried job
    # $RUN_ATTEMPT will be populated with a value 1+ based on how many times this job has been retried
    - npx currents cache get --preset last-run --continue
    - cat .currents_env >> $GITLAB_ENV && source .currents_env
    # Grab the complete last run from the API so orchestration can find all the failures
    - npx currents api get-run --branch=$CI_COMMIT_REF_NAME --pw-last-run --output=basic/test-results/.last-run.json || true
    - npx playwright install
    # Run pwc-p, provide a build id with the run-attempt included, and also pass EXTRA_PWCP_FLAGS
    - npx pwc-p --ci-build-id=or8n-$CI_PIPELINE_ID-$RUN_ATTEMPT $EXTRA_PWCP_FLAGS
  after_script:
    # Save the last-run to cache in order to track the run attempts
    - npx currents cache set --preset last-run --pw-output-dir basic/test-results

```
{% endcode %}
