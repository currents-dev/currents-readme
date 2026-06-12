---
description: Setup instructions for Currents integration with Linear
---

# Setup

## Requirements

You need:

* A Linear workspace
* Currents organization admin permissions

## Architecture

| Scope | Behavior |
| --- | --- |
| Organization | One Linear workspace connection per Currents organization |
| Project | Enable or disable the integration per Currents project |

Multiple Currents projects can share the same workspace connection.

## Connect your workspace

1. In Currents, go to **Project > Integrations**
2. Select **Linear App**, then **Add Integration**
3. Click **Connect Linear App**
4. Approve the OAuth request in Linear
5. Return to Currents and confirm the workspace appears as connected

<figure><img src="../../../.gitbook/assets/linear-connect.png" alt="Connect Linear App button"><figcaption><p>Starting the OAuth connection</p></figcaption></figure>

{% hint style="info" %}
Only organization admins can connect, disconnect, or change settings. Other members can view connection status.
{% endhint %}

## Enable for a project

After the workspace is connected, turn the integration on for each project that should use it:

1. Open **Project > Integrations > Linear App**
2. If prompted, click **Enable for this project**
3. Turn on **Enable Linear Integration**
4. Click **Save Configuration**

If the workspace is already connected at the organization level, you can enable the current project without repeating OAuth.

***

<p align="center">🎉 Congratulations!</p>

<p align="center">A successful connection shows the linked workspace on the integration page:</p>

## Disconnect

Organization admins can remove the workspace connection from **Project > Integrations > Linear App**:

1. Click **Disconnect**
2. Confirm

This revokes Linear permissions and disables the integration for every project that used the connection.

## Reconnect after disconnect

If you disconnected the integration and want to connect the same workspace again:

1. Go to **Project > Integrations > Linear App**
2. Click **Re-authenticate**
3. Approve the OAuth request in Linear

Per-project settings are preserved when you reconnect.
