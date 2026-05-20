---
description: pwc-p run command documentation - orchestration execution for Playwright
---

# pwc-p run

`pwc-p run` starts orchestration and executes Playwright tests with load balancing across available workers. It distributes tests from the list produced by [`pwc-p discover`](pwc-p-discover.md) for parallel execution.

## Examples

Run the full suite with orchestration:

```bash
npx pwc-p run --key <record-key> --project-id <project-id> --ci-build-id <ci-build-id>
```

Run tests from a discovery file (filtered earlier):

```bash
npx pwc-p discover --pwc-discovery-file tests.txt --grep @smoke
npx pwc-p run --key <record-key> --project-id <project-id> --ci-build-id <ci-build-id> --pwc-discovery-file tests.txt
```

Add Playwright runtime flags:

```bash
npx pwc-p run --key <record-key> --project-id <project-id> --ci-build-id <ci-build-id> -j 2 --timeout 10000
```

## Currents Configuration

These options configure how tests are recorded and reported in Currents.

### `--ci-build-id`

The unique identifier for a run. See [#cibuildid](configuration.md#cibuildid "mention").

### `-k, --key`

Your secret Record Key obtained from Currents. See [#recordkey](configuration.md#recordkey "mention").

### `-p, --project-id`

The project ID for results reporting obtained from Currents. See [#projectid](configuration.md#projectid "mention").

### `-t, --tag`

Comma-separated tag(s) for recorded runs in Currents. See [#tag](configuration.md#tag "mention").

### `--pwc-config <path>`

Path to currents config file `currents.config.[ts|js]`. See [#configuration-sources](configuration.md#configuration-sources "mention").

## Discovery File

### `--pwc-discovery-file <path>`

Path to the discovery output file written by `pwc-p discover` and read by `pwc-p run`. Also available as `CURRENTS_DISCOVERY_FILE` environment variable or `orchestration.discoveryFile` in `currents.config.ts` (recommended for CI so both commands use the same path).

## Tag Handling

### `--pwc-remove-title-tags`

Remove tags from test names in Currents, e.g. `Test name @smoke` becomes `Test name` in the dashboard (default: false). See [#removetitletags](configuration.md#removetitletags "mention").

### `--pwc-disable-title-tags`

Disable parsing tags from test title, e.g. `Test name @smoke` would **not** have tag `smoke` in the dashboard (default: false). See [#disabletitletags](configuration.md#disabletitletags "mention").

### `--pwc-disable-test-tags`

Prevent reporting tags defined in the test title or by test annotations (default: false). See [#disabletesttags](configuration.md#disabletesttags "mention").

## Orchestration

### `--pwc-batch-size <auto|number>`

Defines how many Playwright workers are available for orchestration. See [#orchestration.batchsize](configuration.md#orchestration.batchsize "mention").

### `--pwc-reset-signal <SIGUSR1|SIGUSR2>`

Specify a process signal to listen for to trigger a reset of the current in-progress tests. Only available on OS with POSIX signal support. See [#orchestration.resetsignal](configuration.md#orchestration.resetsignal "mention").

### `--pwc-skip-reporter-injection`

Do not inject `@currents/playwright`. If set, you must add Currents reporter manually. See [#orchestration.skipreporterinjection](configuration.md#orchestration.skipreporterinjection "mention").

### `--pwc-orchestration-id <string>`

Unique identifier of the orchestration session this run belongs to. See [#orchestrationid](configuration.md#orchestrationid "mention").

### `--pwc-machine-id <string>`

Unique identifier of the machine running the tests. Mostly used internally. If not provided, it will be generated automatically. See [#machineid](configuration.md#machineid "mention").

### `--pwc-test-suite-file <path>`

Path to the full test suite file for orchestration and reporting. See [#testsuitefile](configuration.md#testsuitefile "mention").

### `--pwc-cancel-after-failures <number | false>`

Abort the cloud run after the specified number of failed tests detected. Overrides the default Currents Project settings. See [#cancelafterfailures](configuration.md#cancelafterfailures "mention").

## Debugging & Output

### `--pwc-debug [boolean | "remote" | "full"]`

Enable collecting debug logs for the reporter (default: false).

- `true` will print the debug logs to stdout
- `remote` will upload the debug logs to Currents servers
- `full` will print the logs to stdout and also upload to Currents

Environment variable: `CURRENTS_DEBUG=true | "remote" | "full"`. See [troubleshooting-playwright.md](../../../guides/troubleshooting-playwright.md "mention").

### `--pwc-output-file <path>`

File path for run summary output in JSON format. See [#outputfile](configuration.md#outputfile "mention").

### `--pwc-console-output <preset>`

Reporter console output. See [#consoleoutput](configuration.md#consoleoutput "mention").

### `--pwc-coverage <project-name>`

List of projects to collect coverage for, e.g. `--pwc-coverage chromium --pwc-coverage firefox`. If no projects are specified, coverage will be collected for all projects. See [#coverage.projects](configuration.md#coverage.projects "mention").

### `--pwc-coverage-dir <path>`

Coverage reports directory path. See [#coverage.dir](configuration.md#coverage.dir "mention").

## Runtime Flags

These flags are passed through to Playwright and control test execution:

### `-j, --workers <number>`

Number of parallel workers (Playwright passthrough). For example, `-j 2` runs tests with 2 workers.

### `--timeout <milliseconds>`

Test timeout in milliseconds (Playwright passthrough). For example, `--timeout 10000` sets a 10-second timeout.

See [Playwright CLI reference](https://playwright.dev/docs/test-cli#reference) for additional runtime flags.

## Help

### `-V, --version`

Show package version.

### `-h, --help`

Show help message.
