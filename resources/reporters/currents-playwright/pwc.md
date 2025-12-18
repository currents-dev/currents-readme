---
description: pwc command-line executable documentation
---

# pwc

`pwc` is a lightweight command-line executable that runs Playwright with a few pre-configured options.&#x20;

`pwc` allows providing [configuration.md](configuration.md "mention") options via CLI flags. Additionally, is passes down CLI flags to the underlying `playwright` command.&#x20;

{% hint style="success" %}
We recommended using `currents.config.ts` file. See [#configuration-sources](configuration.md#configuration-sources "mention").
{% endhint %}

```bash
> pwc [options] [playwright arguments and flags]

🎭 Run Playwright tests on CI using https://currents.dev

----------------------------------------------------
📖 Documentation: https://docs.currents.dev
🤙 Support:       support@currents.dev
----------------------------------------------------
```



## **Examples**

Run all tests in the current directory:

```
pwc --key --project-id --ci-build-id
```

Run only tests filtered by the tag `@smoke`:

```
pwc --key --project-id --ci-build-id --grep smoke
```

Run playwright tests and add tags `"tagA", "tagB"` to the recorded run:

```
pwc --key --project-id --ci-build-id --tag tagA --tag tagB
```

Set `playwright` arguments and flags:

```
pwc --key --project-id --ci-build-id -- --workers 2 --timeout 10000 --shard 1/2
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

### **`--pwc-disable-test-tags`**&#x20;

Prevent reporting tags defined in the test title or by test annotations (default: false).  See [#disabletesttags](configuration.md#disabletesttags "mention").

***

### **`--pwc-cancel-after-failures <number | false>`**

Abort the cloud run after the specified number of failed tests detected. Overrides the default Currents Project settings. See [#cancelafterfailures](configuration.md#cancelafterfailures "mention").

***

### **`--pwc-debug [boolean | "remote" | "full"]`**

Enable collecting debug logs for the reporter (default: false).&#x20;

* `true` will print the debug logs to stdout
* `remote` will upload the debug logs to Currents servers.
* `full` will print the logs to stdout and also upload to Currents.

Environment variable: `CURRENTS_DEBUG=true | "remote" | "full"` . See [troubleshooting-playwright.md](../../../guides/troubleshooting-playwright.md "mention").

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

### **`-V, --version`**&#x20;

Show package version

***

### **`-h, --help`**&#x20;

Show `pwc` help
