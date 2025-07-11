---
description: Setup instructions for Currents integration with Jira
---

# Setup

## Requirements

* The installation must be performed by a user with Admin permission in Currents
* The installation must be performed by Jira App admin one that can install and configure applications

## Enable Jira Integration

* Open Project Integrations section (select a **Project > Integrations**)&#x20;
* Click **Jira App > Add Integration**
* Click **+ Add Jira Installation** (you can have up to 3 installations)
* Change the Installation label — we commend setting it to your Jira namespace label e.g. `currents-dev.atlassian.com`
* After creating an installation get the **Installation Link Token** - you will need it later to [#link-installation](setup.md#link-installation "mention")

## Install Currents for Jira App

Open [Currents for Jira](https://marketplace.atlassian.com/apps/1238333) on [Atlassian Marketplace](https://marketplace.atlassian.com) (or search for `Currents` )

* Click **Get It Now**
* Follow the on-screen instructions

## Link Jira App

Once installed, you need to Link the newly installed application to your Currents organization

* Open **Setting (upper right corner) > Apps**&#x20;
* Open **Manage Apps** (usually `https://<namespace>.atlassian.net/plugins/servlet/upm`)
* Open **User-installed** section expand **Currents for Jira** and click **Configure**
* Enter the **Installation Link Token** and click **Link Installation**

<figure><img src="../../../.gitbook/assets/currents-2025-07-11-15.16.00@2x.png" alt="" width="373"><figcaption><p>Link Jira App to your Currents Organization</p></figcaption></figure>

<p align="center">🎉 Congratulations!  </p>

<p align="center">A successfully linked installation details will show up in Currents Dashboard.</p>

<figure><img src="../../../.gitbook/assets/currents-2025-07-11-15.48.16@2x.png" alt="Example of successfully linked Currents integration with Jira" width="563"><figcaption><p>Example of successfully linked Currents app for Jira</p></figcaption></figure>

