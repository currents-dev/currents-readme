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

## Commit data for GitHub Actions

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

To change the default behaviour and checkout the triggering commit, use the following `@actions/checkout` configuration

```yaml
- uses: actions/checkout@v2
  with:
    ref: ${{ github.event.pull_request.head.sha }}
```

Read more about [GitHub Actions and `pull_request`](https://frontside.com/blog/2020-05-26-github-actions-pull\_request/) (by frontside.com).
