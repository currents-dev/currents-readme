---
description: Running Playwright tests with NX
---

# Playwright - NX

### Running cypress tests in NX project with Currents

[Nx](https://github.com/nrwl/nx) is a build system with monorepo support and powerful integrations. Playwright tests executions in Nx can be done by using [@nx/playwright](https://nx.dev/nx-api/playwright) plugin.

[This example repository](https://github.com/currents-dev/currents-playwright-nx-example) showcases all the implementation described here.

To use the nx playwright plugin, Currents client must be set as reporter option in the `playwright.config` file.&#x20;

Here a quick example:

```typescript
import { nxE2EPreset } from '@nx/playwright/preset';
import { defineConfig, devices } from '@playwright/test';
import { CurrentsConfig, currentsReporter } from '@currents/playwright';

const currentsConfig: CurrentsConfig = {
  recordKey: process.env.CURRENTS_RECORD_KEY,
  projectId: process.env.CURRENTS_PROJECT_ID,
};

const nxConf = nxE2EPreset(__filename);
export default defineConfig({
  ...nxConf,
  reporter: [currentsReporter(currentsConfig)],
  ...
  ...
});
```

{% hint style="info" %}
See a more scalable [example for multiple projects here](https://github.com/currents-dev/currents-playwright-nx-example/tree/main)
{% endhint %}

In order to execute the tests, our example `project.json` file includes the `e2e` target and Playwright plugin as `executor` property.

```json
{
  "$schema": "../../node_modules/nx/schemas/project-schema.json",
  "name": "e2e-02",
  "projectType": "application",
  "sourceRoot": "apps/e2e-02/src",
  "targets": {
    "e2e": {
      "executor": "@nx/playwright:playwright",
      "options": {
        "skipInstall": true,
        "output": "{workspaceRoot}/playwright-report/{projectName}",
        "config": "{projectRoot}/playwright.config.ts"
      }
    }
  }
}
```

The command to execute the tests with Playwright is:

```bash
CURRENTS_RECORD_KEY=recordkey \
CURRENTS_PROJECT_ID=projectid \
CURRENTS_CI_BUILD_ID=`date +%s` \
nx run-many -t e2e  --parallel=2 --verbose
```

This will create a run execution in Currents reporting the tests results.

### Using `--last-failed` flag

For executing only the failed tests according to a previous run, add the `--last-failed` flag to the execution command.

```bash
CURRENTS_RECORD_KEY=recordkey \
CURRENTS_PROJECT_ID=projectid \
CURRENTS_CI_BUILD_ID=`date +%s` \
nx run-many -t e2e  --parallel=2 --verbose --last-failed
```

{% hint style="info" %}
For a more detailed explanation on last failed CI setup, [see here](../../../guides/ci-optimization/re-run-only-failed-tests.md)
{% endhint %}

### Orchestration in a single project

It is possible to orchestrate the Playwright tests in a single nx project by using the same `ci-build-id` across multiple machines.

This is showcased in the `e2e-03` nx project and the `project.json` file is slightly different than for the other projects.

```json
{
  "$schema": "../../node_modules/nx/schemas/project-schema.json",
  "name": "e2e-03",
  "projectType": "application",
  "sourceRoot": "apps/e2e-03/src",
  "targets": {
    "or8n": {
      "executor": "nx:run-commands",
      "options": {
        "config": "apps/e2e-03/playwright.config.ts",
        "commands": [
          {
            "command": "npx pwc-p"
          }
        ]
      }
    }
  }
}
```

Key differences with other nx projects in the example repository:

* `executor` property has the value `nx:run-commands`.
* A `command` property is added within `options` . This executes `npx pwc-p` which is the [Currents orchestration ](../../../guides/ci-optimization/playwright-orchestration.md#playwright-orchestration)command.
* Reporter config in `playwright.config` file is not needed

To locally execute orchestration nx project:

```bash
CURRENTS_RECORD_KEY=recordkey \
CURRENTS_PROJECT_ID=projectid \
CURRENTS_CI_BUILD_ID=unique-id \
nx run-many -t or8n
```

This Github Action yaml file executes the Playwright tests distributed in three shards:

```yaml
name: Run or8n Tests

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main
  workflow_dispatch:

jobs:
  e2e_tests:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        shard: [1, 2, 3]

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Install Dependencies
        run: npm install

      - name: Reset NX
        run: npx nx reset

      - name: Run All E2E Tests
        env:
          CURRENTS_PROJECT_ID: ${{secrets.CURRENTS_PROJECT_ID}}
          CURRENTS_RECORD_KEY: ${{secrets.CURRENTS_RECORD_KEY}}
          CURRENTS_CI_BUILD_ID: ${{ github.run_id }}-${{ github.sha }}
        run: npx nx run-many -t or8n
```

