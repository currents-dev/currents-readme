---
description: Troubleshooting Vitest integration with Currents
---

# Troubleshooting Vitest

If you are experiencing issues with reporting Vitest results, please collect more information about the failure and submit a support request via our support channels.

### 1. Collecting Environment Information

Please collect the following information to help us effectively debug the problem:

* The associated dashboard Run URL
* The JUnit XML file produced by Vitest
* Your setup method and configuration files
* The exact commands used to run `vitest`, `currents convert` and `currents upload`
* Environment information (use the command below)

Use the following command to print information about your CI environment

```bash
npx envinfo --system --binaries --browsers --npmPackages --duplicates --npmGlobalPackages
```

### 2. Activate Debug Mode

Set `DEBUG=currents*` before running `currents convert` or `currents upload` to obtain detailed information about the conversion and upload process. Alternatively, pass the `--debug` flag to either command.

### 3. Common Issues

<details>

<summary>No results are uploaded</summary>

Check that Vitest actually wrote the JUnit XML file at the path passed to `currents convert --input-file`. Vitest only writes the file when the `junit` reporter is enabled and `outputFile.junit` is set — without `outputFile`, the report is printed to stdout instead.

</details>

<details>

<summary>Conversion or upload is skipped when tests fail</summary>

`vitest run` exits with a non-zero code when tests fail. In CI this stops the job before the results are reported. Make the conversion and upload steps run regardless of the test outcome — see [vitest-github-actions.md](ci-setup/vitest-github-actions.md "mention").

</details>

For more details on how to troubleshoot Vitest tests, refer to [their documentation](https://vitest.dev/guide/debugging).
