---
description: How to label and filter Currents runs by environment (e.g. staging, production)
icon: layer-group
---

# Environments

{% hint style="info" %}
**Availability**

* Setting an environment is available in [currents-playwright](../resources/reporters/currents-playwright/ "mention") version **2.1.0+**.
* Filtering by environment in the Dashboard ([Run feed](../dashboard/runs/ "mention") + [Analytics](../dashboard/analytics/ "mention")) and the REST [API](https://app.gitbook.com/o/-MT4mUcrnbXWgd1xvl_x/s/lcxad7NaXT7D2V6owvHN/ "mention") is available for all projects.
* `@currents/cmd`, `@currents/jest`, `@currents/node-test-reporter`, and `cypress-cloud` do not expose an `environment` option yet.
{% endhint %}

An **environment** is a label that describes _where_ or _under which conditions_ a test run was executed — for example `staging`, `production`, `preview`, or a CI matrix dimension such as a target region or device pool. Attaching an environment lets you compare and filter results across deployment targets without mixing them into the same metrics.

Common uses:

* Separate **staging** vs **production** smoke runs in the same project.
* Compare stability of the same suite across regions (e.g. `us-east`, `eu-west`).
* Slice [Analytics](../dashboard/analytics/ "mention") (run status, duration, flakiness, test results) by deployment target.

## Environments vs. Tags

Both classify runs, but they serve different purposes:

| | Environment | [Tags](playwright-tags.md) |
|---|---|---|
| Cardinality | One value per run or per Playwright project | Many values per run/group/test |
| Intent | _Where_ the tests ran (deployment target) | Arbitrary classification (feature, team, lifecycle) |
| Source | Reporter config / project metadata | Test titles, project metadata, run config |

A run can still end up with **multiple environments** when different Playwright projects within the same run set different values — see [How environments aggregate to a run](#how-environments-aggregate-to-a-run) below.

## Setting the environment

The environment is a **run-level** value, with an optional **per-project** override. It can be provided through any of the standard [configuration sources](../resources/reporters/currents-playwright/configuration.md).

### `currents.config.ts`

```typescript
import type { CurrentsConfig } from "@currents/playwright";

const config: CurrentsConfig = {
  recordKey: process.env.CURRENTS_RECORD_KEY ?? "",
  projectId: process.env.CURRENTS_PROJECT_ID ?? "",
  environment: process.env.DEPLOY_ENV ?? "staging",
};

export default config;
```

### `CURRENTS_ENVIRONMENT` environment variable

```bash
CURRENTS_ENVIRONMENT=production npx playwright test
```

### `--pwc-environment` CLI option

Supported by `pwc`, `pwc-p discover`, and `pwc-p run`:

```bash
npx pwc --pwc-environment staging
```

### Inline reporter option

```typescript
// playwright.config.ts
import { currentsReporter } from "@currents/playwright";

export default defineConfig({
  reporter: [
    currentsReporter({
      recordKey: process.env.CURRENTS_RECORD_KEY,
      projectId: process.env.CURRENTS_PROJECT_ID,
      environment: "staging",
    }),
  ],
});
```

### Per-project override

Set `metadata.pwc.environment` on a Playwright project to override the run-level environment for that project only:

```typescript
// playwright.config.ts
export default defineConfig({
  projects: [
    {
      name: "chromium",
      metadata: { pwc: { environment: "staging" } }, // 👈 per-project
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      metadata: { pwc: { environment: "production" } }, // 👈 per-project
      use: { ...devices["Desktop Firefox"] },
    },
  ],
});
```

### Precedence of configuration options

When the environment is defined in more than one place, Currents resolves the value as follows (highest priority first):

* **Per-project** `projects[].metadata.pwc.environment`, if set for the project; otherwise the run-level value:
  * `CURRENTS_ENVIRONMENT` environment variable, if provided; otherwise
  * `--pwc-environment` CLI option, if provided; otherwise
  * `environment` from the inline reporter options in `playwright.config.ts`; otherwise
  * `environment` from `currents.config.ts`; otherwise
  * no environment is attached.

## How environments aggregate to a run

The environment is resolved **per Playwright project** and attached to the corresponding group when results are reported. At the run level, Currents collects the distinct environments from all groups into a list.

For the per-project example above, the resulting run is associated with **both** `staging` and `production`, and shows up when filtering by either value:

| Item | Environment |
|---|---|
| Run | `staging`, `production` |
| Group `chromium` | `staging` |
| Group `firefox` | `production` |

If every project shares the same value (or you only set a run-level value), the run is associated with that single environment.

## Filtering in the Dashboard

Once runs carry an environment, an **Environment** filter is available in the [Run feed](../dashboard/runs/ "mention") and across [Analytics](../dashboard/analytics/ "mention") charts (run status, run duration, run completion, run size, test results, and flakiness). Selecting one or more environments narrows every metric on the page to runs that ran in those environments.

## Filtering via the REST API

Both the runs and insights endpoints accept an `environments[]` query parameter (repeat it to pass multiple values). Runs that match **any** of the supplied environments are returned.

{% tabs %}
{% tab title="Runs" %}
```bash
curl "https://api.currents.dev/v1/projects/PROJECT_ID/runs?environments[]=staging&environments[]=production" \
  -H "Authorization: Bearer API_KEY_HERE"
```
{% endtab %}

{% tab title="Insights" %}
```bash
curl "https://api.currents.dev/v1/projects/PROJECT_ID/insights?date_start=2026-01-01T00:00:00Z&date_end=2026-01-31T23:59:59Z&environments[]=staging" \
  -H "Authorization: Bearer API_KEY_HERE"
```
{% endtab %}
{% endtabs %}

See the [API](https://app.gitbook.com/o/-MT4mUcrnbXWgd1xvl_x/s/lcxad7NaXT7D2V6owvHN/ "mention") reference for the full list of query parameters.
