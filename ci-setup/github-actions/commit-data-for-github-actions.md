---
description: How to get correct git commit information when using GitHub Actions
---

# Commit data for GitHub Actions

```
Merge de7282540ac30ee4e32a0b1fede4f6391b4cc321 into fa58941d8a807b83ec5a3e5bfb83418ce12173c7
```

Specifically:

* it performs `git checkout` to `github.ref` environment variable
* it sets the git `ref` to `refs/remotes/pull/##/merge`

To change the default behaviour and  the triggering commit, use the following `@actions/checkout` configuration

```yaml
- uses: actions/checkout@v2
  with:
    ref: ${{ github.event.pull_request.head.sha }}
```
