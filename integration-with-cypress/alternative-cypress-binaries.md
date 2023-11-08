---
description: Using alternative Cypress Binaries
---

# Alternative Cypress Binaries

Following the [original blocking of Sorry Cypress, Currents and DeploySentintel users](https://currents.dev/posts/v13-blocking), Cypress.io team decided to apply the blocking to older versions of the app.

As part of our [commitment to support](https://currents.dev/posts/v13-blocking) our customers using old versions, we've compiled independent versions of Cypress App binaries.

The supported versions are:

* 9.7.0
* 10.11.0
* 11.2.0
* 12.17.4

Please follow the instructions below to use the alternative version:

* Pin your cypress version to one of the supported versions
* Clean the existing Cypress binary `npx cypress cache clear`
* Define download mirror by configuring environment variable:
  * Linux: `export CYPRESS_DOWNLOAD_MIRROR=https://cy-cdn.currents.dev`
  * Windows cmd:  `set CYPRESS_DOWNLOAD_MIRROR=https://cy-cdn.currents.dev`
  * Window PowerShell:  `$env:CYPRESS_DOWNLOAD_MIRROR = "https://cy-cdn.currents.dev"`
* Download the independent Cypress App binary: `npx cypress install`
* Run your workflows as usual

**We apologize for the interruption of your workflow and possible downtime.** We received no communication from Cypress.io team - the blocking was done with a clear intent to intimidate and apply pressure on customers who are not willing to subscribe to Cypress Cloud service.

Please contact our support channels for additional information and assistance.
