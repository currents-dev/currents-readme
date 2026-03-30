---
description: SSO SAML2.0 Instructions for Currents
---

# SSO SAML2.0

Currents supports SSO integration via SAML 2.0, including JIT provisioning and SCIMv2. When enabled, authentication will be deferred to your Identity Provider (IdP). Follow the instructions for your IdP:

* Setup with [azure-ad](azure-ad/ "mention")&#x20;
* Setup with [okta](okta/ "mention")
* Setup with [jumpcloud](../../../administration/sso-saml2.0/jumpcloud/ "mention")
* Manual [saml2.0-configuration.md](saml2.0-configuration.md "mention")

### SSO Features

Please note that there are certain limitations to Currents SSO integration.

* SSO integration is only available for customers with an **active subscription.**
* Enabling SSO will for **all the team members.**
* Follow the guide on enabling [idp-initiated-sessions.md](idp-initiated-sessions.md "mention")
* Follow the guides on enabling [scim-user-provisioning.md](scim-user-provisioning.md "mention")

### Troubleshooting

See [troubleshooting-sso.md](troubleshooting-sso.md "mention") section for help.
