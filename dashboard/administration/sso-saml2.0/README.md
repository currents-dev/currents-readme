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

* Setup with [okta.md](okta.md "mention")&#x20;
* Manual [saml2.0-configuration.md](saml2.0-configuration.md "mention")
* Enabling [idp-initiated-sessions.md](idp-initiated-sessions.md "mention")

### Currents SSO Limitations

Please note that there are certain limitations to Currents SSO integration:

* Custom Roles for team members are not supported - the roles need to be manually configured for each user via the dashboard. New accounts will be created with "member" role.
* User Deletion - Currents won't be notified if user access is revoked in IdP. You can delete the users on the team page.

### Troubleshooting

Follow the instruction in [troubleshooting-sso.md](troubleshooting-sso.md "mention") section for help.



