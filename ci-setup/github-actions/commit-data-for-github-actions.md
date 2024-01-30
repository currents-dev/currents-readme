---
description: How to get correct git commit information when using GitHub Actions
coverY: 0
layout:
  cover:
    visible: false
    size: full
  title:
    visible: true
  description:
    visible: true
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
---

# Commit data for GitHub Actions

### GitHub Pull Request Title, Issue Link and Branch Name

{% hint style="info" %}
**Update Jan 30, 2024**

`@currents/playwright@0.12.0` and `cypress-cloud@1.10.0` better detect Pull Request information when running in GitHub Actions
{% endhint %}

The recent (Jan 30, 2024) releases of `@currents/playwright@0.12.0` and `cypress-cloud@1.10.0` better handle git information when running in GitHub Actions triggered by `` `pull_request` `` trigger.

* PR title becomes Run Title (instead of a generic message PR #XX)
* Effective Branch becomes the PR HEAD branch name - allowing more meaningful usage in analytics and notification filters
* UI will display a direct link to GitHub Pull Request issue

<figure><img src="../../.gitbook/assets/currents-2024-01-30-14.57.07@2x (1).png" alt=""><figcaption><p>Capturing GitHub PR data</p></figcaption></figure>

### Temporary commit in GitHub Pull Requests

Running tests using GitHub Actions can generate confusing git information. For example, instead of the last commit message (or pull request title), one can see something like:

```
Merge de7282540ac30ee4e32a0b1fede4f6391b4cc321 into fa58941d8a807b83ec5a3e5bfb83418ce12173c7
```

Also, the branch name becomes `refs/pull/12/merge` instead of the expected branch name. Why is that happening?

That happens when your GitHub Actions workflow is triggered by [`pull_request`](https://docs.github.com/en/github-ae@latest/actions/using-workflows/events-that-trigger-workflows#pull\_request).

It changes the behaviour of `@actions/checkout` - it creates a **new merge commit,** which is created from merging the base to the head.

Specifically:

* it performs `git checkout` to `github.ref` environment variable
* it sets the git `ref` to `refs/remotes/pull/##/merge`
* it sets the commit SHA to an arbitrary value that is different from the commit that triggered the workflow

For example, a developer creates a pull request from the `feat/login` branch to be merged into the `main` branch with the title "_Add new login feature_". When the GitHub Actions workflow is triggered, instead of checking out the `feat/login` branch, the action creates a merge commit. In the GitHub Actions log, the commit message appears as "_Merge de7282540ac30ee4e32a0b1fede4f6391b4cc321 into fa58941d8a807b83ec5a3e5bfb83418ce12173c7_", which is a merge of the `feat/login` branch into the `main` branch. Consequently, the branch name in the CI environment shows as `refs/pull/12/merge`, not the expected `feat/login`.

To change the default behaviour and checkout the triggering commit, use the following `@actions/checkout` configuration

```yaml
- uses: actions/checkout@v2
  with:
    ref: ${{ github.event.pull_request.head.sha }}
```

The workflow will check out the last commit from the **head** branch of the pull request that triggered the workflow. Beware, that this approach might not detect issues that could arise when the pull request is eventually merged into the base branch. If the base branch has been updated since the pull request was created, there might be merge conflicts or integration issues that won't be detected with this configuration.

Read more about [GitHub Actions and `pull_request`](https://frontside.com/blog/2020-05-26-github-actions-pull\_request/) (by frontside.com).
