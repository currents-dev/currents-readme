---
description: Cypress and Playwright GitHub App integration for Currents dashboard
---

# GitHub App

{% hint style="info" %}
Commit information must be available for GitHub integrations (PR comments, commit status updates). See [commit-information.md](../../../dashboard/runs/commit-information.md "mention").
{% endhint %}

Currents integration with GitHub allows posting results of your Playwright and Cypress tests as:

* [Commit status checks](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks) and / or
* Pull Request comment

![GitHub App integration with Currents - PR Comment example](<../../../.gitbook/assets/pr-comment-example 2_rounded.png>)

### Activating GitHub Integration

To set up an integration:

* Open your project settings (Manage Project)
* Click “Connect” in the “Connect your GitHub repositories” section.

Your browser will be redirected to GitHub; you will need to approve installing “currents.bot” GitHub App for your organization.

![Setting up GitHub integration with Currents Dashboard](../../../.gitbook/assets/github-cypress-setup-example.gif)

During the installation, the following permissions are requested:

* read and write to issues (for posting PR comments)
* read and write to Pull Requests (for posting PR comments)
* read and write to commit statuses (for posting commit status updates)

After approving the permissions, your browser will navigate back to the Project Settings screen. To complete the setup, you will need to associate a repository with the project and then save the changes.

![Changing repository for GitHub integration](../../../.gitbook/assets/github-cypress-change-settings.gif)

To change the GitHub repository associated with a project, select the new repository from the dropdown list and click “Save”

### GitHub Integration Settings

Use the following settings to change the behaviour of your GitHub Integration.

#### Commit Status Label

Set the commit status label to distinguish the GitHub status checks one from another. For example, when multiple Current Dashboard projects are connected to the same repository, setting the Commit Status label will conveniently display the status check for each project separately.

{% hint style="info" %}
**Please note -** using the same status for the same repo across different projects can create a conflict - runs from both projects will overwrite the associated status check item.
{% endhint %}

![An example of multiple status check items](<../../../.gitbook/assets/CleanShot 2022-07-18 at 15.16.04@2x.png>)

#### PR Comment

Enabling PR comments will post a summary of your run to the associated GitHub PR. The comment will be posted:

* after run’s completion - with the details of test results
* after run’s timeout - with the last known test results

Re-running Playwright or cypress tests for the same PR will delete the previous comment and post a new one with the most recent result unless **Keep Old Results** option is enabled

![GitHub integration - PR comment example](../../../.gitbook/assets/github-cypress-pr-comment.gif)

#### Failed Runs Only

Enabling the "Failed Runs Only" toggle would prevent posting a comment for successful runs - i.e. runs that have 0 failed or skipped tests.

**Events Selection**

You can customize what event can trigger posting a PR comment:

* Run Finish - will post a comment when a run completes its execution without cancellation or a timeout
* Run Cancelled - will post a comment upon the run's cancellation, due to [fail-fast-strategy.md](../../../guides/parallelization-guide/fail-fast-strategy.md "mention")or cancellation via the Dashboard. See more at [cancel-run.md](../../../dashboard/runs/cancel-run.md "mention")
* Run Timeout - will post a comment after a run's timeout is detected. Read more about [run-timeouts.md](../../../dashboard/runs/run-timeouts.md "mention").

#### Keep Old **Results**

When enabled, old results posted as a PR comment will be preserved, i.e. the integration will keep the comments with the results of the previous runs.

#### Commit Status Checks

Enabling Commit Status checks will trigger updates for the associated commit - the status depends on the outcomes of your run:

* “Pending” for on-going runs
* “Failed” for failed or timed out runs
* “Passed” for successful runs

![GitHub Integration - commit status check example](../../../.gitbook/assets/github-commit-status.gif)

### Deactivating GitHub Integration

To detach a repository from a project, navigate to Project Settings and click “Disconnect Repository”.

![GitHub integration - remove repository](../../../.gitbook/assets/cypress-github-remove-integration.gif)

To completely remove GitHub integration, navigate to Project Settings, click “Configure” and then uninstall “currents-bot” Github App. Uninstalling the app will automatically detach all the projects from their respective repositories.

![Disconnecting GitHub Integration](../../../.gitbook/assets/github-cypress-disconnecting.gif)

### Troubleshooting GitHub Integration

{% hint style="info" %}
**Please note:** your CI environment must expose git commit information in order for cypress agent to send commit details (sha, repository URL etc.) and enable the integration.
{% endhint %}

We use [https://github.com/cypress-io/commit-info](https://github.com/cypress-io/commit-info) package to discover git-related information.

* To expose your git information, please make sure that `.git` directory is present in your CI environment
* You can explicitly provide git information via environment variables

```
branch: COMMIT_INFO_BRANCH
message: COMMIT_INFO_MESSAGE
email: COMMIT_INFO_EMAIL
author: COMMIT_INFO_AUTHOR
sha: COMMIT_INFO_SHA
timestamp: COMMIT_INFO_TIMESTAMP
remote: COMMIT_INFO_REMOTE
```

#### I have enabled GitHub integration, but nothing is getting reported to GitHub

Behind the scenes, Currents is using git commit data to identify the PR (issue) to comment on.&#x20;

The simplified flow is:

1. Get the list of pull requests associated with the commit using an API call: `'GET /repos/{owner}/{repo}/commits/{commit_sha}/pulls',`
2. Select a PR with HEAD commit matching the reported commit sha

Sometimes the commit SHA reported for a run is different from PR's HEAD commit - our integration would not be able to detect the Pull Requests and won't post a comment and status checks.

Please contact our support via in-app chat and share:

* Run that is affected
* Commit sha of the affected run
* HEAD commit sha of the associated Pull Request

Read more about [commit-data-for-github-actions.md](../../../getting-started/ci-setup/github-actions/commit-data-for-github-actions.md "mention").
