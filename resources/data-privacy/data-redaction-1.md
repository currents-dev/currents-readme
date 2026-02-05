---
description: Learn how Currents can be integrated to your own S3-compatible object storage.
---

# Bring Your Own Storage

{% hint style="success" %}
**Availability**

The Bring Your Own Storage (BYOS) feature is available as part of the **Enterprise plan.** It provides a simple and secure way to integrate our solution with your existing storage infrastructure, ensuring full data ownership.\
\
Contact our support team if you're interested in enabling this feature for your organization.
{% endhint %}

### Overview

Our Bring Your Own Storage (BYOS) model allows customers to use their own S3-compatible object storage with our solution.\
Instead of uploading data to storage managed by us, all files remain within the customer’s storage environment.&#x20;

We integrate directly with your storage and handle the setup on our side.

Examples of S3-compatible storage providers:

* GCS(Google GCP)
* S3 (AWS)
* R2 (Cloudflare)
* Wasabi
* Backblaze B22&#x20;

### How It Works

To enable BYOS, we require the following from you:

* An S3-compatible storage endpoint
* A dedicated bucket for the solution
* Access credentials (with the minimum required permissions)

Once these are provided, our team will configure the solution to securely read and write data directly to your storage.

### Full Data Ownership

You retain complete ownership and control of your data:

* Data is stored exclusively in your infrastructure
* You control retention, lifecycle policies, and access
* No duplication of data into third-party storage

### Security & Access

* Access is limited strictly to the provided bucket
* Permissions follow the principle of least privilege
* Credentials can be rotated or revoked at any time
