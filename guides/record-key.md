---
description: Using record key to associate your runs with your organization
icon: key
---

# Record Key

### What is Record Key?

Record key is a secret you use to associate runs with your organization in Currents dashboard.

When running tests in parallel using Currents dashboard, provide your Record Key as `--key` argument.

### Can I publish my Record Key?

You'd treat your Record Key as a secret and not publish it. Having your Record Key would allow creating new runs on behalf of your organization.

### Where is my Record Key?

You can obtain your record key by navigating to "Record Keys" section of your organization menu. Accessed by clicking on your Organization's Name in the side menu.

<div data-with-frame="true"><figure><img src="../.gitbook/assets/Screenshot 2025-12-17 at 8.15.18 AM.png" alt="Record Keys for Currents Dashboard"><figcaption><p>Record Keys for Currents Dashboard</p></figcaption></figure></div>

### Can I rotate my Record Key?

Yes, in "Record Keys" section of your organization menu, delete the existing key and create a new key.

<div data-with-frame="true"><img src="../.gitbook/assets/currents-rotate-record-key.png" alt="Rotating a record key"></div>

{% hint style="info" %}
Please note: requests to create a run for non-existing or deleted Record Key will be rejected
{% endhint %}
