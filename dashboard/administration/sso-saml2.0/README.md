---
description: SSO SAML2.0 Instructions for Currents
---

# SSO SAML2.0

Currents supports SSO integration via SAML 2.0, including JIT provisioning and SCIMv2. When enabled, authentication will be deferred to your Identity Provider (IdP). Follow the instructions for your IdP:

* Setup with [azure-ad.md](azure-ad.md "mention")
* Setup with [okta](okta/ "mention")
* Setup with [jumpcloud](jumpcloud/ "mention")
* Manual [saml2.0-configuration.md](saml2.0-configuration.md "mention")

### Before you start

* SSO is part of the Enterprise plan.
* Once SSO is on, people with an email on your listed domains sign in through your IdP. They can't use a password or social sign-in for Currents.
* Users are created the first time they sign in. Add [scim-user-provisioning.md](scim-user-provisioning.md "mention") if you also want your IdP to create and remove users.
* To open Currents from your IdP's app list, see [idp-initiated-sessions.md](idp-initiated-sessions.md "mention").

### Troubleshooting

See [troubleshooting-sso.md](troubleshooting-sso.md "mention") section for help.
