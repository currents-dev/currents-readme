---
description: Displaying Commit Information on Currents
---

# Commit Information

Currents client SDKs use a set of `git` commands to obtain git commit information. This information is being used to display Run Details and enable certain platform features, for example

* show analytics filtered by branch flakiness
* searching items based on commit message
* integration with SVC providers

{% hint style="info" %}
If no commit information is available either from`.git` folder or from environment variables, no commit data will be shown in the dashboard.&#x20;

Commit information must be available for Bitbucket, GitHub and GitLab integrations (PR comments, commit status updates).
{% endhint %}

Currents uses the following information:

| Item        | Source                   |
| ----------- | ------------------------ |
| Run Title   | Commit message           |
| Branch Link | Git origin + branch name |
| Commit Link | Git origin + commit SHA  |
| Author      | Commit author            |

### Git Commands

Currents uses the following commands to get the commit data (see [src/git-api.js](https://github.com/currents-dev/commit-info/blob/master/src/git-api.js)):

* git branch: `git rev-parse --abbrev-ref HEAD`
* commit message: `git show -s --pretty=%B`
* commit author email: `git show -s --pretty=%ae`
* commit author name: `git show -s --pretty=%an`
* commit SHA: `git show -s --pretty=%H`
* git origin: `git config --get remote.origin.url`

### GitHub Actions and Pull Requests

Currents automatically detects PR information, including PR title and the target branch when running in GitHub Actions as a result of [`pull_request`](https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows#pull_request) GHA event. When a Pull Request is detected, Currents uses the following Pull Request data instead of the commit information.

| Item        | Source                          |
| ----------- | ------------------------------- |
| Run Title   | Pull Request title              |
| Commit Link | Pull Request discussion link    |
| Commit SHA  | Source branch latest commit SHA |

You can change this behavior in [project-settings.md](../projects/project-settings.md "mention").

### Merge Commits in Pull Request Runs

On pull request runs, some CI providers check out a merge commit that they create by merging the pull request into the target branch, for example `Merge <sha> into <sha>` in GitHub Actions. `@currents/playwright` `2.5.1` and `@currents/cmd` `1.11.0` record the last commit of the pull request instead. They read its SHA from:

| CI provider                          | Pull request commit SHA                                      |
| ------------------------------------ | ------------------------------------------------------------ |
| GitHub Actions                       | `pull_request.head.sha` in the event file (`GITHUB_EVENT_PATH`) |
| GitLab CI, merged results pipelines  | `CI_MERGE_REQUEST_SOURCE_BRANCH_SHA`                         |
| Azure Pipelines                      | `SYSTEM_PULLREQUEST_SOURCECOMMITID`                          |
| Travis CI                            | `TRAVIS_PULL_REQUEST_SHA`                                    |
| Semaphore                            | `SEMAPHORE_GIT_PR_SHA`                                       |
| Buildkite                            | `BUILDKITE_PULL_REQUEST_HEAD_COMMIT`                         |
| Bitbucket Pipelines                  | `BITBUCKET_COMMIT`                                           |

The reporter uses the commit only when it is a parent of the checked-out merge commit. When a shallow clone doesn't have the commit, the reporter fetches it with `git fetch --depth=1 origin <sha>`, with a 3 second timeout. If the fetch fails, Currents records the merge commit.

* Set `CURRENTS_DISABLE_HEAD_COMMIT_FETCH=true` to turn the fetch off.
* Set `COMMIT_INFO_SHA` to record a specific commit. The reporter then skips this step.

Jenkins sets no variable with the pull request commit, so Currents records the merge commit that Jenkins creates.

### Overriding Commit Info

You can override the commit info by manually setting environment variables:

```
COMMIT_INFO_BRANCH: branch
COMMIT_INFO_MESSAGE: commit message
COMMIT_INFO_EMAIL: commit author email
COMMIT_INFO_AUTHOR: commit author name
COMMIT_INFO_SHA: commit info sha
COMMIT_INFO_TIMESTAMP: commit timestamp
COMMIT_INFO_REMOTE: remote origin
```

For example, if `.git` directory isn't available on the CI machine and the commands mentioned above return no value, you can set the environment variables explicitly. This method can be helpful for non-traditional setups, for example:

* tests repo is different from application source code repo and you want to show the source code commit details in the dashboard
* manual CI pipeline invocation
* local testing

### Troubleshooting Commit Info

If you're not seeing git information for your runs, most chances `.git` directory is not available in the CI environment and Currents can't detect the commit information automatically.

* Run the [#git-commands](commit-information.md#git-commands "mention") as part of your CI jobs manually and capture the output
* Use the environment variables from [#overriding-commit-info](commit-information.md#overriding-commit-info "mention") section
* Enable the corresponding client SDK debug mode ([Playwright](../../guides/troubleshooting-playwright.md) or [Cypress](../../getting-started/other-frameworks/cypress/troubleshooting-cypress.md#cypress-cloud))
* Contact our support channels for assistance
