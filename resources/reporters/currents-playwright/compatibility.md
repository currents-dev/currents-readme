---
description: Discover the compatible versions of @currents/playwright
---

# Compatibility Guide

### Compatibility Table

Use the following table to discover what versions of `@currents/playwright` to use:

| @playwright/test | @currents/playwright |
| ---------------- | -------------------- |
| 1.59.1           | 1.24.0, 2.0.0+       |
| 1.60.0+          | 2.0.0+               |

#### Notes

* **May 19 2026** `@playwright/test@1.60.0` introduced changes that require updating Currents reporter to version `2.0.0+`.
  * Currents Orchestration users, follow the  [playwright-orchestration-migration-guide.md](../../../guides/ci-optimization/playwright-orchestration-migration-guide.md "mention")
  * If you are **not** using Currents Orchestration no additional changed required beyond version bump.
