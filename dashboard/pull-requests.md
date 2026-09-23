---
description: Browse a project's runs grouped by the pull request that triggered them
icon: code-pull-request
---

# Pull Requests

The **Pull Requests** page lists the pull requests that CI has reported runs for, one row per pull request, with the status of its latest run and a strip of its recent runs. It answers "what is the state of this PR's tests?" without scanning the run feed for matching branches.

The page is available in every project, under **Pull Requests** in the project sidebar.

## How pull requests are detected

A run belongs to a pull request when the CI provider reports one. Currents reads the pull request number, link, title and source and destination branches from the CI environment of these providers:

* GitHub Actions (runs triggered by a [`pull_request`](https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows#pull_request) event)
* GitLab CI
* Bitbucket Pipelines
* CircleCI
* Buildkite
* Jenkins
* Azure Pipelines
* AWS CodeBuild

Runs that are not associated with a pull request, for example runs on `main` or scheduled runs, do not appear on this page. They remain in the [Runs](runs/README.md) feed.

When CI reports no pull request title, the row shows the latest commit message instead, in muted text. See [commit-information.md](runs/commit-information.md "mention") for how Currents collects commit data.

## The pull request list

Each row shows:

| Column       | Description                                                                                                                                      |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Pull request | The PR number and title. Hovering the title shows the source and destination branches and the repository. PRs from other repositories are prefixed with the repository name. |
| Author       | The commit author of the latest run.                                                                                                             |
| Latest run   | The status of the most recent run.                                                                                                               |
| Recent runs  | The statuses of up to the ten most recent runs.                                                                                                  |
| Runs         | The number of runs in the selected date range that match the filters.                                                                            |
| Last run     | When the most recent run was created.                                                                                                            |

A link icon on row hover opens the pull request on the Git provider.

Branch, Tags, Environment and First run columns can be turned on from the **Columns** menu. Environment is shown automatically when a row on the page has an environment, and First run is shown only when the list is sorted by first run.

### Expanding a pull request

Clicking a row, or pressing Enter on it, expands the pull request into its recent runs. Each run shows its status, commit author and short SHA, failed test count, duration and creation time. A run is marked as superseded when the same commit ran again after it.

Clicking a run opens it in a preview drawer without leaving the page. Opening the run with a modified click (for example Ctrl+click or Cmd+click) opens the full run page in a new tab. **View all runs** at the end of the expanded row opens the [Runs](runs/README.md) feed filtered to that pull request.

### Row actions

Right-clicking a row opens a context menu with:

* **Open latest run**
* **Open on** _the Git provider_, which opens the pull request
* **Copy branch name**
* **Filter by this author**
* **Filter by this branch**

## Finding pull requests

* **Date range** — the list covers the last 30 days by default. When no pull requests are found, the empty state offers to widen the range to 90 days.
* **Search** — matches the PR title, `#number` or branch name.
* **Status chips** — **Failed**, **Failing**, **Running** and **Passed** filter by the status of each pull request's latest run.
* **Filter** — narrows the list by branch, author, tag and environment.

{% hint style="info" %}
Status and search are checked against each pull request's latest run. A pull request whose latest run passed does not match the **Failed** chip, even if earlier runs failed.
{% endhint %}

## Display options

The **Display** menu controls:

* **Sort by** — **Last run** (default), **First run** or **Number of runs**, and the sort direction.
* **Rows per page** — 20 or 50.
* **Density** — **Compact**, or **Comfortable**, which adds the source and destination branches under each title.
* **Group stacked pull requests** — on by default. See [#stacked-pull-requests](pull-requests.md#stacked-pull-requests "mention").

Density, columns, grouping and page size are saved in the browser for each project. Search, status chips, sort and page size are kept in the URL, so a link to the page opens the same view.

## Stacked pull requests

A pull request is stacked on another when its destination branch is the other pull request's source branch. With **Group stacked pull requests** on, stacked pull requests are listed under their parent, and a stack icon marks the base of the stack and each pull request stacked on it. Hovering the icon names the parent pull request.

With grouping off, a stacked pull request shows a **Stacked on** badge with its parent's number instead.

## Missing commit information

When most runs on the page arrive with only a commit SHA, and no commit message or author, a warning explains that CI is not sending git data to Currents. A warning icon also marks each affected pull request. The alert links to the [commit-information.md](runs/commit-information.md "mention") setup guide and offers **Fix with AI**, which hands an AI coding assistant a prompt to fix the CI configuration.

The alert can be dismissed for the project. Clicking a pull request's warning icon shows it again.
