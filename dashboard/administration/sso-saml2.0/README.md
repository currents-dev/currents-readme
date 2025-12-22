---
description: SSO SAML2.0 Instructions for Currents
---

# SSO SAML2.0

Currents supports SSO integration via SAML 2.0, including JIT provisioning and SCIMv2. When enabled, authentication will be deferred to your Identity Provider (IdP). Follow the instructions for your IdP:

* Setup with [okta](okta/ "mention")&#x20;
* Manual [saml2.0-configuration.md](saml2.0-configuration.md "mention")
* Enabling [idp-initiated-sessions.md](idp-initiated-sessions.md "mention")
* Enabling [scim-user-provisioning.md](scim-user-provisioning.md "mention")

### ⚠️ Limitations

Please note that there are certain limitations to Currents SSO integration.

* SSO integration is only available for customers with an **active subscription.**
* Enabling SSO will for **all the team members.**
* Currents **does not** support [idp-initiated-sessions.md](idp-initiated-sessions.md "mention").
* **Custom Roles are not supported** - the roles need to be manually configured for each user via the dashboard. New accounts will be created with "member" role.
* **User Deletion is available vis SCIMv2** - For IdPs that do not support SCIMv2 you can manually delete the users on the Currents team page.

### Troubleshooting

See [troubleshooting-sso.md](troubleshooting-sso.md "mention") section for help.



