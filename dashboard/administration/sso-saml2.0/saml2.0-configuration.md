---
description: Enabling SSO for Currents - manual SAML2.0 configuration
---

# SAML2.0 Configuration

Define the following SAML2.0 configuration on your Identity Provider:

* Call-back URL / ACS URL: `https://auth.currents.dev/saml2/idpresponse`
* Audience / Entity ID: `urn:amazon:cognito:sp:us-east-1_Z9TVEnj0k`
* `NameID` format (`nameIdentifierFormat`)&#x20;
  * must be `urn:oasis:names:tc:SAML:2.0:nameid-format:persistent`
  * limited to 128 characters
  * the value must be lowercase format (see below)



### SAML Attribute Mapping

<table><thead><tr><th width="155.5">IdP Attribute</th><th align="right">SAML Response Attribute</th></tr></thead><tbody><tr><td>Email</td><td align="right">http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress</td></tr><tr><td>Full Name</td><td align="right">http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name</td></tr><tr><td>Username (usually Email)</td><td align="right">http://schemas.xmlsoap.org/ws/2005/05/identity/claims/identifier</td></tr></tbody></table>



* Prefer sending `Email` in lowercase, to ensure correct integration
* `Username` must match the `NameID` (Email or Username)
* Metadata XML  must have `HTTP-POST` and `HTTP-Redirect` bindings, for example:

```xml
<md:SingleSignOnService
    Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST"
    Location="https://sso.jumpcloud.com/saml2/currents"
/>
<md:SingleSignOnService
    Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect"
    Location="https://sso.jumpcloud.com/saml2/currents"
/>
```

***

### Sharing SAML Configuration

Once you configured the IdP, contact Currents support via in-app chat or email, and provide the following details:

* IdP Metadata or publicly available metadata document endpoint URL
* Domains list that your organization members will use to access the dashboard (for example user@**example.com**)

{% hint style="warning" %}
Currents does not guarantee correct SSO operation when your IdP uses mixed-case format for emails and/or domains. Ensure that your system is either sending lowercase `NameID` and `Email` , or be prepared to verify mixed-case users during SSO setup verification.

See [troubleshooting-sso.md](troubleshooting-sso.md "mention").
{% endhint %}
