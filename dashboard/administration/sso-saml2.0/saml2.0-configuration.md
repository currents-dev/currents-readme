---
description: Enabling SSO for Currents - manual SAML2.0 configuration
---

# SAML2.0 Configuration

Define the following SAML2.0 configuration on your Identity Provider:

* Call-back URL / ACS URL: `https://auth.currents.dev/saml2/idpresponse`
* Audience / Entity ID: `urn:amazon:cognito:sp:us-east-1_Z9TVEnj0k`
* `NameID` format (`nameIdentifierFormat`) should be `urn:oasis:names:tc:SAML:2.0:nameid-format:persistent` with a limitation of up to 128 characters
* Attribute Mappings

<table><thead><tr><th width="155.5">IdP Attribute</th><th align="right">SAML Response Attribute</th></tr></thead><tbody><tr><td>Email</td><td align="right">http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress</td></tr><tr><td>Full Name</td><td align="right">http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name</td></tr></tbody></table>

* The generated metadata XML  must have `HTTP-POST` and `HTTP-Redirect` bindings, for example:

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

Once you configured your IdP, please contact the support via in-app chat or email, and provide the following details:

* IdP Metadata or publicly available metadata document endpoint URL
* Domains list that your organization members will use to access the dashboard (for example user@**example.com**)
