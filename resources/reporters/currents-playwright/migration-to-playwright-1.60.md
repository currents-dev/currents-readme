---
description: Upgrade @currents/playwright for Playwright 1.60+
---

# Upgrade for Playwright 1.60+

When using **Playwright 1.60.0+**, update `@currents/playwright` to **2.0.0+**. Playwright 1.60.0 introduced breaking changes that are addressed in Currents 2.x.

```bash
npm i @currents/playwright@^2
```

This applies to all Currents Playwright setups — `pwc`, the reporter with `playwright test`, and CI with sharding. **No other changes are required** unless you run tests with **`pwc-p`** (Currents Orchestration). For orchestration CI, continue with the [Orchestration v2 migration guide](../../../guides/ci-optimization/playwright-orchestration-migration-guide.md "mention").
