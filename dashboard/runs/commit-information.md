---
description: Displaying Commit Information on Currents
---

# Commit Information

{% hint style="info" %}
If no commit information is available - either from`.git` folder or from environment variables, no commit data will be shown in the dashboard.&#x20;

Commit information must be available for Bitbucket, GitHub and GitLab integrations (PR comments, commit status updates).
{% endhint %}

In order to obtain commit information Currents client SDKs use a set of `git`  commands. This information is being used to display Run details and enhance insights and analytic, for example, filtering flakiness rate by branch or searching Runs based on commit message.

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
* Enable the corresponding client SDK debug mode ([Playwright](../../getting-started/playwright/troubleshooting-playwright.md) or [Cypress](../../getting-started/cypress/troubleshooting-cypress.md#cypress-cloud))
* Contact our support channels for assistance
