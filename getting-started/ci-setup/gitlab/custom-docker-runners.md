---
description: Self hosted/managed docker runners
---

# Custom Docker runners

Gitlab CI/CD gives you the option to use your custom docker containers to execute your tests instead of directly using their built-in runners.

This usually leads to the loss of git information and environment variables not be directly available, so in this case for Currents to be able to gather all the information needed you need to setup the needed environment variables accordingly.

```
GITLAB_CI=true
CI_PIPELINE_ID=$CI_PIPELINE_ID
CI_PIPELINE_URL=$CI_PIPELINE_URL
CI_BUILD_ID=$CI_BUILD_ID
CI_JOB_ID=$CI_JOB_ID
CI_JOB_URL=$CI_JOB_URL
CI_JOB_NAME=$CI_JOB_NAME
GITLAB_HOST=$GITLAB_HOST
CI_PROJECT_ID=$CI_PROJECT_ID
CI_PROJECT_URL=$CI_PROJECT_URL
CI_REPOSITORY_URL=$CI_REPOSITORY_URL
CI_ENVIRONMENT_URL=$CI_ENVIRONMENT_URL
CI_DEFAULT_BRANCH=$CI_DEFAULT_BRANCH

COMMIT_INFO_BRANCH=$CI_COMMIT_BRANCH
COMMIT_INFO_MESSAGE=$CI_COMMIT_MESSAGE
COMMIT_INFO_SHA=$CI_COMMIT_SHA
COMMIT_INFO_REMOTE=$CI_REPOSITORY_URL
```

Adding these environment variables to your `.yml` file will allow your custom docker runner to report the correct information to Currents and have all the available information in the dashboard to use it as a usual Gitlab CI/CD tests execution.
