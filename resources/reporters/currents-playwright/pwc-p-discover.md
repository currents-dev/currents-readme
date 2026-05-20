---
description: pwc-p discover command documentation - test discovery and filtering for Playwright orchestration
---

# pwc-p discover

`pwc-p discover` runs Playwright test discovery and writes the test list to a file. This output is then used by [`pwc-p run`](pwc-p-run.md) to execute tests with orchestration load balancing.

The discover command accepts Playwright filter flags to narrow down the test suite before orchestration. See the [Playwright docs](https://playwright.dev/docs/test-cli#reference) for complete filter flag documentation.

## Examples

Discover all tests (no filters):

```bash
npx pwc-p discover --pwc-discovery-file tests.txt
```

Filter tests by tag:

```bash
npx pwc-p discover --pwc-discovery-file tests.txt --grep @smoke
```

Discover only failed tests from the last run:

```bash
npx pwc-p discover --pwc-discovery-file tests.txt --last-failed
```

Discover tests from a specific project:

```bash
npx pwc-p discover --pwc-discovery-file tests.txt --project chromium
```

Discover tests from specific spec files:

```bash
npx pwc-p discover --pwc-discovery-file tests.txt tests/auth.spec.ts tests/checkout.spec.ts
```

## Options

### `--pwc-discovery-file <path>`

Path to the discovery output file written by `pwc-p discover` and read by `pwc-p run`. Also available as `CURRENTS_DISCOVERY_FILE` environment variable or `orchestration.discoveryFile` in `currents.config.ts` (recommended for CI so both commands use the same path).

### `--grep <pattern>`

Filter tests by title using a regex pattern (Playwright passthrough). For example, `--grep @smoke` runs tests with `@smoke` tag.

### `--last-failed`

Discover only tests that failed in the previous run (Playwright passthrough).

### `--project <name>`

Filter tests by project name (Playwright passthrough). For example, `--project chromium` runs tests only on Chromium.

### Spec files

Specify test files or directories directly without a flag:

```bash
npx pwc-p discover --pwc-discovery-file tests.txt tests/auth.spec.ts tests/checkout.spec.ts
```

### `--pwc-config <path>`

Path to currents config file `currents.config.[ts|js]`. See [#configuration-sources](configuration.md#configuration-sources "mention").

### `-V, --version`

Show package version.

### `-h, --help`

Show help message.
