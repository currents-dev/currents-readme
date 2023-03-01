---
description: SSO SAML2.0 Instructions for Currents
---

# SSO SAML2.0

Currents supports SSO integration via SAML 2.0. When enabled, authentication will be deferred to your Identity Provider (IdP).

{% hint style="info" %}
**Please note** SSO integration is only available for customers with an active subscription.
{% endhint %}

The configuration entries you will need to define on your IdP

* Call-back URL: `https://auth.currents.dev/saml2/idpresponse`
* Audience: `urn:amazon:cognito:sp:us-east-1_Z9TVEnj0k`
* `NameID` **** format (nameIdentifierFormat) should be `urn:oasis:names:tc:SAML:2.0:nameid-format:persistent` with a limitation of up to 128 characters
* Attribute Mappings

| IdP Attribute |                                            SAML Response Attribute |
| ------------- | -----------------------------------------------------------------: |
| Email         | http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress |
| Full Name     |         http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name |



Once you configure your IdP, please contact the support via in-app chat or email, and provide the following details:

* IdP Metadata or publicly available metadata document endpoint URL
* Domains list that your organization members will use to access the dashboard (for example user@**example.com**)

Please note that there are certain limitations to Currents SSO integration:

* Custom Roles for team members are not supported at the moment - the roles need to be manually configured for each user via the dashboard. New accounts will be created with "member**"** role.
* User Deletion **** - Currents won't be notified if user access is revoked in IdP. You can delete the users on the team page.
* Enabling SSO will mandate the auth method for all the team members**.**
* IdP-initiated auth requests are not supported (due to lack of support from AWS Cognito)

