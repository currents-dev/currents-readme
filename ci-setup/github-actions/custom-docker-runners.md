---
description: Self hosted/managed docker runners
---

# Custom Docker runners

Github Actions gives you the option to use your custom docker containers to execute your tests instead of directly using their built-in runners.

This usually leads to the loss of git information and environment variables not be available, so in this case for Currents to be able to gather all the information needed you need to setup the needed environment variables accordingly.

The best way to access this variables is through the context objects, specifically in this case the `github` one.

```
GITHUB_WORKFLOW=${{github.workflow}}
GITHUB_ACTION=true
GITHUB_EVENT_NAME=${{github.event_name}}
GITHUB_RUN_ID=${{github.run_id}}
GITHUB_RUN_ATTEMPT=${{github.run_attempt}}
GITHUB_REPOSITORY=${{github.repository}}

COMMIT_INFO_BRANCH=${{github.ref_name}}
COMMIT_INFO_MESSAGE=${{github.event.head_commit.message}}
COMMIT_INFO_EMAIL=${{github.event.head_commit.author.email}}
COMMIT_INFO_AUTHOR=${{github.event.head_commit.author.name}}
COMMIT_INFO_SHA=${{github.sha}}
COMMIT_INFO_TIMESTAMP=${{github.event.head_commit.timestamp}}
COMMIT_INFO_REMOTE=${{github.repository}}
```

Adding these environment variables to your `.yml` file will allow your custom docker runner to report the correct information to Currents and have all the available information in the dashboard to use it as a usual Github Action tests execution.
