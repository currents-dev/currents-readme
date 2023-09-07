---
description: Troubleshooting SSO connectivity to Currents
---

# Troubleshooting SSO

Please follow the steps below to help collect information when you have issues with using SSO connection:

* Open the latest Chrome browser
* Navigate to [https://app.currents.dev/login](https://app.currents.dev/login)
* Open Chrome Developer Tools **(View > Developer > Developer Tools)**
* Switch to Network Tab (1) and make sure that Network Recording is active (the recording button is red) (2)

<figure><img src="../../.gitbook/assets/currents-2023-06-08-09.23.15@2x.png" alt=""><figcaption><p>Activating Network Recording in Chrome Develper Tools</p></figcaption></figure>

* Enter your email into the Email field, then click **"Continue"** - you will be forwarded to your organization's Identity Service Provider login screen
* Enter your credentials, you will be forwarded to currents.dev domain
* Upon seeing an error message, please capture the screenshot
* Save the recorded network requests log (HAR) by clicking the **"Export HAR..."** button in Chrome Developer Tools

<figure><img src="../../.gitbook/assets/currents-2023-06-08-09.22.52@2x.png" alt=""><figcaption><p>Exporting HAR from Chrome Developer Tools</p></figcaption></figure>

* Share the screenshot and the generated HAR file with our Support team
