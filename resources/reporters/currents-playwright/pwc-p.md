---
description: Currents orchestration pwc-p command-line executable documentation
---

# pwc-p (orchestration)

`pwc-p` is a command-line executable that implements Currents Orchestration for Playwright. See [playwright-parallelization.md](../../../guides/ci-optimization/playwright-parallelization.md "mention") and [playwright-orchestration.md](../../../guides/ci-optimization/playwright-orchestration.md "mention").

{% hint style="info" %}
**Orchestration** is a two-step process: first run `pwc-p discover` to build a test list, then run `pwc-p run` to execute tests in parallel with load balancing. See [playwright-orchestration.md](../../../guides/ci-optimization/playwright-orchestration.md "mention").
{% endhint %}

## Subcommands

- **[`pwc-p discover`](pwc-p-discover.md)** — Runs Playwright test discovery and writes the test list to a file. Accepts Playwright filter flags (`--grep`, `--last-failed`, `--project`, spec paths, and similar).
- **[`pwc-p run`](pwc-p-run.md)** — Starts orchestration and executes tests with load balancing. Accepts [configuration.md](configuration.md "mention") options and supported Playwright runtime flags (`-j`, `--timeout`, and similar).

Both commands accept Currents configuration via CLI flags or `currents.config.ts`. See [playwright-orchestration.md](../../../guides/ci-optimization/playwright-orchestration.md "mention") for setup and CI examples.

{% hint style="success" %}
We recommend using `currents.config.ts` file. See [#configuration-sources](configuration.md#configuration-sources "mention").
{% endhint %}

## Basic Workflow

A typical orchestrated run follows this pattern:

```bash
# Step 1: Discover tests with optional filters
npx pwc-p discover --pwc-discovery-file tests.txt --grep @smoke

# Step 2: Run orchestrated execution using the discovery file
npx pwc-p run \
  --key <record-key> \
  --project-id <project-id> \
  --ci-build-id <ci-build-id> \
  --pwc-discovery-file tests.txt
```

Alternatively, use environment variables or `currents.config.ts` to avoid repeating the discovery file path on every command:

```bash
export CURRENTS_DISCOVERY_FILE=tests.txt
npx pwc-p discover --grep @smoke
npx pwc-p run --key <record-key> --project-id <project-id> --ci-build-id <ci-build-id>
```

See [pwc-p discover](pwc-p-discover.md) and [pwc-p run](pwc-p-run.md) for all available options.
