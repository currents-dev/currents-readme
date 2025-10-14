---
description: >-
  Learn how Currents automatically detects and removes sensitive information
  such as tokens, passwords, and API keys from trace files to ensure your data
  remains secure and compliant.
---

# Data Redaction

{% hint style="success" %}
**Availability**

The Data Redaction feature is available as part of the **Enterprise plan.** It provides enhanced privacy controls and secure data handling designed for organizations with advanced compliance or audit requirements.\
\
Contact our support team if you're interested in enabling this feature for your organization.
{% endhint %}

### Overview

To enhance data privacy and protect sensitive information, Currents automatically identifies and removes secrets from trace files. This process ensures that tokens, passwords, API keys, and other confidential credentials are never exposed during trace review or debugging.

* Protects customer and system credentials from accidental leaks.
* Simplifies compliance with GDPR, SOC 2, and other privacy standards.
* Reduces the risk of exposing sensitive data during debugging or collaboration.

### How It Works

1. **Secret Detection**\
   Our system automatically scans trace files for common patterns that match sensitive data — such as authentication tokens, access keys, passwords, and environment variables.
2. **Data Scrubbing**\
   Detected secrets are replaced with a placeholder string (e.g., `*********`), ensuring that sensitive values are never stored or displayed in plain text.
3. **File Preservation**\
   Currents preserves a hidden, access-restricted copy of the original (un-scrubbed) trace file for audit and internal investigation needs.
   * Access to this original data is strictly limited to authorized personnel.
   * The file is stored securely in an encrypted manner.
   * Both redacted and non-redacted version of traces are subject to your organzation's Data Retention policy.
4. **User Access**\
   When you access or download trace files through the Currents platform, any detected secrets will appear as masked values (`*********`), ensuring that sensitive data is never exposed in your workspace.

#### Example

Before scrubbing:

```json
{
  "api_key": "sk_live_123456789abcdef",
  "user_password": "SuperSecret123!"
}
```

After scrubbing:

```json
{
  "api_key": "*********",
  "user_password": "*********"
}
```
