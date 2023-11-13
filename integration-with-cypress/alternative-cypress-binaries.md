---
description: Using alternative Cypress Binaries
---

# Alternative Cypress Binaries

Following the [original blocking of Sorry Cypress, Currents and DeploySentintel users](https://currents.dev/posts/v13-blocking), Cypress.io team decided to apply the blocking to older app versions.

As part of our commitment to support our customers using old versions, we have published block-free versions of Cypress App binaries.

The supported versions are:

| Version | Supported OS and Architecture |
| ------- | ----------------------------- |
| 9.7.0   | All                           |
| 10.7.0  | All                           |
| 10.11.0 | All                           |
| 11.2.0  | All                           |
| 12.4.0  | `linux-x64`                   |
| 12.17.3 | `linux-x64, linux-arm64`      |
| 12.17.4 | All                           |

{% hint style="success" %}
Missing specific version, OS or architecture? Let us know!
{% endhint %}

Please follow the instructions below to use the alternative version:

* Pin your cypress version to one of the supported versions
* Clean the existing Cypress binary `npx cypress cache clear`
* Define download mirror by configuring environment variable:
  * Linux: `export CYPRESS_DOWNLOAD_MIRROR=https://cy-cdn.currents.dev`
  * Windows cmd:  `set CYPRESS_DOWNLOAD_MIRROR=https://cy-cdn.currents.dev`
  * Window PowerShell:  `$env:CYPRESS_DOWNLOAD_MIRROR = "https://cy-cdn.currents.dev"`
* Reinstall Cypress App binary from the alternative mirror: `npx cypress install`
* Run your workflows as usual

_Alternatively_, use a one-liner to reinstall cypress binaries:

```
CYPRESS_DOWNLOAD_MIRROR=https://cy-cdn.currents.dev npx cypress install --force
```

***

Examples:

* Using alternative Cypress binaries with [GitHub Actions](https://github.com/currents-dev/gh-actions-example/blob/main/.github/workflows/currents.yml). Example [workflow](https://github.com/currents-dev/gh-actions-example/actions/runs/6809756956/job/18516652532).

**We apologize for the interruption of your workflows and possible downtime.** We received no communication from Cypress.io team.

Please contact our support channels for additional information and assistance.
