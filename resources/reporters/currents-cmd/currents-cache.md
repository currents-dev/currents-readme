---
description: >-
  Use currents cache command to store and retrieve data from Currents-managed
  remote cache
---

# currents cache

The `currents cache` command allows you to store and retrieve files from CI machines. The files are securely stored in Currents-managed storage. This command is designed to be used in CI environments to facilitate activites like [re-run-only-failed-tests.md](../../../guides/re-run-only-failed-tests.md "mention").

`currents cache` stores  meta data about CI execution and test artifacts, each cache item has a unique `id.` You can provide the `id` manually or it can be automatically generated based on CI environment variables

{% hint style="info" %}
Automatic CI parameters detection is only supported for GitHub Actions and GitLab CI
{% endhint %}

### Usage

To save items from paths `path-1, path-2` to cache, use the following command:

```bash
npx currents cache set --key <record-key> --id <id> --path <path-1,path-2,...path-n>
```

To download  cached items and store the files in `--output-dir` use the following command:

```bash
npx currents cache get --key <record-key> --id <id> --output-dir test-results
```

### Subcommands

`get`

* `--id` - used to identify which cache file to retrieve and extract. If not set, Currents will attempt to locate one based on your CI environment. (supports GitHub Actions, and GitLab CI)
* `--key` - [Your Currents Record Key ](../../../guides/record-key.md)
* `--preset` - use a predefined preset for creating necessary configuration files for implementing CI workflows. See [#cache-presets](currents-cache.md#cache-presets "mention").
* `--preset-output <path-to-file>`- path to a file for saving the preset configuration values (default: `.currents_env`)
* `--output-dir <path-to-dir>` - directory for extracting the cache contents to, defaults to `./`
* `--matrix-index <number>`  - the node index when using parallel/matrix jobs in CI. Used to correctly identify the node cache, and properly populate shards when using the last-run preset.
* `--matrix-total <number>` - the node total when using parallel/matrix jobs in CI. Used to populate shards when using the last-run preset.
* `--help` - show help message

`set`

* `--id` - used to to identify the cache for retreival later. If not set, Currents will attempt to locate one based on your CI environment. (supports GitHub Actions, and GitLab CI)
* `--key` - [Your Currents Record Key ](../../../guides/record-key.md)
* `--preset`
  * Use a predefined set of paths and files for uploading to the cache. Currents team maintains  preset to implement certain CI workflows. for example  [re-run-only-failed-tests.md](../../../guides/re-run-only-failed-tests.md "mention")
* `--path <path-1, path-2>` - comma-separated list of paths to cache
* `--pw-output-dir <dir>` - Playwright [output directory](https://playwright.dev/docs/api/class-testconfig#test-config-output-dir) containing`.last-run.json` (default: `./test-results`)
* `--matrix-index <number>`  - the node index when using parallel/matrix jobs in CI. Used to correctly identify the node cache, and properly populate shards when using the last-run preset.
* `--matrix-total <number>` - the node total when using parallel/matrix jobs in CI. Used to populate shards when using the last-run preset.
* `--help` - show help message

### Cache Presets

You can set a predefined list of files and directories using `--preset` flag. Currents team maintains preset the implement certain CI workflows like rerunning only failed tests or retrieving CI build ID of the previous runs.

#### Preset: last-run

This preset defines a set of rules to implement [re-run-only-failed-tests.md](../../../guides/re-run-only-failed-tests.md "mention") flow on various CI providers.

* `currents cache set --preset last-run` will automatically add to cache files necessary to rerun only failed tests ([.last-run.json](../../../guides/re-run-only-failed-tests.md))
* `currents cache get --preset last-run` will fetch the cache contents of the cache and also create the files necessary for rerunning only previously failed tests

The preset output file will contain CI specific information that should be passed to your Playwright test command. To have the shard information presented correctly, you should ensure you are providing `--matrix-index`  and `--matrix-total` information.
