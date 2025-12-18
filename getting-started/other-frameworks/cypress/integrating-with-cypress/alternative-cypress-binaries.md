---
description: Using alternative Cypress Binaries
---

# Alternative Cypress Binaries

{% hint style="info" %}
**We are suspending our support of Cypress test runner version 13+**

We will continue to support prior versions of Cypress.
{% endhint %}

Following the blocking of [Sorry Cypress, Currents and DeploySentintel](https://currents.dev/posts/v13-blocking) packages, we are suspending our support of Cypress 13+.

We apologize for the interruption of your workflows and possible downtime caused by the sudden blocking on November 7. We received no communication from Cypress.io team about the intent to release the breaking change.

We will continue supporting prior versions of the MIT-licensed Cypress test runner using independent, block-free versions of binaries.

***

As a background - Cypress installation has 2 components:

* an [npm package](https://www.npmjs.com/package/cypress) `cypress`- a lightweight NodeJS wrapper that parses command line flags, downloads and runs an OS/platform-specific Electron binary application.
* Electron application (binary) - an OS/platform-specific binary code, it is usually pre-installed and cached on docker images or is being downloaded by the npm package.

We are hosting independent versions of the electron app and docker images with pre-installed binaries that you can use without the risk of being blocked. The supported versions:

| Version          | Supported OS-Architecture |
| ---------------- | ------------------------- |
| 9.0.0 - 9.7.0    | All                       |
| 10.0.0 - 10.11.0 | All                       |
| 11.0.0 - 11.1.0  | All                       |
| 12.0.0 - 12.17.3 | `linux-x64, linux-arm64`  |
| 12.17.4          | All                       |

{% hint style="success" %}
Missing specific version, OS or architecture? Not sure what version to use? Let us know!
{% endhint %}

#### Using the alternative binaries

Use a one-liner to install alternative cypress binaries:

```
CYPRESS_DOWNLOAD_MIRROR=https://cy-cdn.currents.dev npx cypress install --force
```

_Alternatively_, follow the step-by-step instructions below:

* Pin `cypress` version to one of the supported versions in `package.json`
  * For example: `"cypress": "12.17.0"`
  * Update your package manager lock file
* Clean the existing Cypress binary `npx cypress cache clear`
* Define [download mirror](https://docs.cypress.io/guides/references/advanced-installation#Mirroring) by configuring environment variable:
  * Linux: `export CYPRESS_DOWNLOAD_MIRROR=https://cy-cdn.currents.dev`
  * Windows cmd:  `set CYPRESS_DOWNLOAD_MIRROR=https://cy-cdn.currents.dev`
  * Window PowerShell:  `$env:CYPRESS_DOWNLOAD_MIRROR = "https://cy-cdn.currents.dev"`
* Reinstall Cypress App binary from the alternative mirror: `npx cypress install`
* Run your workflows as usual

#### Using Docker images with pre-installed binaries

Use the following [docker image](https://hub.docker.com/r/currentsdev/cypress-included) that has pre-installed, block-free binaries to run your workflows:

`docker pull currentsdev/cypress-included:<version>`

#### Examples

* [GitHub Actions](https://github.com/currents-dev/gh-actions-example/blob/main/.github/workflows/currents.yml) example [workflow](https://github.com/currents-dev/gh-actions-example/blob/main/.github/workflows/currents.yml) with `cypress-io/github-action@v6`

Please contact our support channels for additional information and assistance.
