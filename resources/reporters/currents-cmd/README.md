---
description: The package has CLI commands and tools for Currents platform
---

# @currents/cmd

### Requirements

* Create an account at https://app.currents.dev
* Obtain the Project Id (see [project-settings.md](../../../dashboard/projects/project-settings.md "mention")) and the [record-key.md](../../../guides/record-key.md "mention")&#x20;

{% hint style="info" %}
Get familiar with  [ci-build-id.md](../../../guides/parallelization-guide/ci-build-id.md "mention") before using `currents` in CI.&#x20;

It is <mark style="color:yellow;">**important**</mark> to set the `CI Build ID` explicitly using `--ci-build-id` option, if you are using CI sharding or multiple CI machines to parallelize your tests.&#x20;

If not set explicitly, the `CI Build ID` will be set to a random value and it will affect your reporting.
{% endhint %}

### Setup

```sh
npm install @currents/cmd --save-dev
```

### Subcommands

* [`currents api`](currents-api.md) - retrieve data from Currents [Resources](https://app.gitbook.com/s/lcxad7NaXT7D2V6owvHN/resources "mention") entities
* [`currents upload`](currents-upload.md) - upload the test results into the Currents Dashboard
* [`currents cache`](currents-cache.md) - manage test artifacts and configuration cache
* [`currents convert`](currents-convert.md) - convert test reports to Currents internal format

### Troubleshooting

Run the CLI command with the `--debug` argument or prefix it with `DEBUG="currents*"` to obtain detailed information about the command execution process.
