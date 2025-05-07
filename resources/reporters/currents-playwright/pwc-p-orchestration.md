---
description: Currents orchestration pwc-p command-line executable documentation
---

# pwc-p (orchestration)

`pwc-p` is a  command-line executable that implements Currents Orchestration for Playwright. See [Broken link](broken-reference "mention") and [playwright-orchestration.md](../../../guides/ci-optimization/playwright-orchestration.md "mention").

`pwc-p` allows providing [configuration.md](configuration.md "mention") options via CLI flags. Additionally, is passes down CLI flags to the underlying `playwright` command.&#x20;

{% hint style="success" %}
We recommended using `currents.config.ts` file. See [#configuration-sources](configuration.md#configuration-sources "mention").
{% endhint %}

```bash
> pwc-p [options] [playwright arguments and flags]

✨ Orchestrate 🎭 Playwright tests on CI using https://currents.dev

----------------------------------------------------
📖 Documentation: https://docs.currents.dev
🤙 Support:       support@currents.dev
----------------------------------------------------
```

## **Examples**

Orchestrate all tests in the current directory:

```
pwc-p --key --project-id --ci-build-id
```

Add additional playwright arguments and flags:

```
pwc-p --key --project-id --ci-build-id -- --workers 2 --timeout 10000
```



## **Options**

### **`--ci-build-id`**&#x20;

The unique identifier for a run. See [#cibuildid](configuration.md#cibuildid "mention")

***

### **`-k, --key`**&#x20;

Your secret Record Key obtained from Currents. See [#recordkey](configuration.md#recordkey "mention").

***

### **`-p, --project-id`**&#x20;

The project ID for results reporting obtained from Currents. See [#projectid](configuration.md#projectid "mention").

***

### **`-t, --tag`**&#x20;

Comma-separated tag(s) for recorded runs in Currents. See [#tag](configuration.md#tag "mention").

***

### **`--pwc-config <path>`**&#x20;

Path to currents config file `currents.config.[ts|js]`. See [#configuration-sources](configuration.md#configuration-sources "mention").

***

### **`--pwc-remove-title-tags`**&#x20;

Remove tags from test names in Currents, e.g. `Test name @smoke` becomes `Test name` in the dashboard (default: false). See [#removetitletags](configuration.md#removetitletags "mention").

***

### **`--pwc-disable-title-tags`**&#x20;

Disable parsing tags from test title, e.g. `Test name @smoke` would **not** have tag  `smoke` in the dashboard (default: false).  See [#disabletitletags](configuration.md#disabletitletags "mention").

***

### **`--pwc-cancel-after-failures <number | false>`**

Abort the cloud run after the specified number of failed tests detected. Overrides the default Currents Project settings. See [#cancelafterfailures](configuration.md#cancelafterfailures "mention").

***

### **`--pwc-debug [boolean | "remote" | "full"]`**

Enable collecting debug logs for the reporter (default: false).&#x20;

* `true` will print the debug logs to stdout
* `remote` will upload the debug logs to Currents servers.
* `full` will print the logs to stdout and also upload to Currents.

Environment variable: `CURRENTS_DEBUG=true | "remote" | "full"` . See [troubleshooting-playwright.md](../../../getting-started/playwright/troubleshooting-playwright.md "mention").

***

### **`--pwc-output-file <path>`**

File path for run summary output in JSON format. See [#outputfile](configuration.md#outputfile "mention").

***

### **`--pwc-coverage <project-name>`**

List of projects to collect coverage for, e.g. `--pwc-coverage chromium --pwc-coverage firefox`. If no projects are specified, coverage will be collected for all projects. See [#coverage.projects](configuration.md#coverage.projects "mention").

***

### **`--pwc-coverage-dir <path>`**

Coverage reports directory path. See [#coverage.dir](configuration.md#coverage.dir "mention").&#x20;

***

### **`--pwc-test-suite-file <path>`**

Path to the full test suite file for orchestration and reporting. See [#testsuitefile](configuration.md#testsuitefile "mention").

***

### **`--pwc-machine-id <string>`**

Unique identifier of the machine running the tests. Mostly used internally. If not provided, it will be generated automatically. See  [#machineid](configuration.md#machineid "mention").

***

### **`--pwc-orchestration-id <string>`**

Unique identifier of the orchestration session this run belongs to. See [#orchestrationid](configuration.md#orchestrationid "mention") .

***

### **`--pwc-reset-signal SIGUSR1 | SIGUSR2`**

Specify a process signal to listen for to trigger a reset of the current in progress tests. Only available on OS with POSIX signal support. See [#orchestration.resetsignal](configuration.md#orchestration.resetsignal "mention").

***

### **`--pwc-skip-reporter-injection`**

Do not inject `@currents/playwright` . If set, you must add Currents reporter manually. See [#orchestration.skipreporterinjection](configuration.md#orchestration.skipreporterinjection "mention")

***

### **`-V, --version`**&#x20;

Show package version

***

### **`-h, --help`**&#x20;

Show help
