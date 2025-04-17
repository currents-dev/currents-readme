---
description: SSO SAML2.0 Instructions for Currents
---

# SSO SAML2.0

Currents supports SSO integration via SAML 2.0. When enabled, authentication will be deferred to your Identity Provider (IdP).

{% hint style="info" %}
**Please note**&#x20;

* SSO integration is only available for customers with an active subscription
* Enabling SSO will mandate the auth method for all the team members
{% endhint %}

Follow the instructions:

* Setup with [okta](okta/ "mention")&#x20;
* Manual [saml2.0-configuration.md](saml2.0-configuration.md "mention")
* Enabling [idp-initiated-sessions.md](idp-initiated-sessions.md "mention")

### Currents SSO Limitations

Please note that there are certain limitations to Currents SSO integration:

* Custom Roles for team members are not supported - the roles need to be manually configured for each user via the dashboard. New accounts will be created with "member" role.
* User Deletion - For IdPs that do not support SCIMv2 you can manually delete the users on the Currents team page. Automatic user deletion is only supported via SCIMv2.

### Troubleshooting

Follow the instruction in [troubleshooting-sso.md](troubleshooting-sso.md "mention") section for help.



