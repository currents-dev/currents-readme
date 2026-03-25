---
description: >-
  Setting up SAML2.0 SSO with Azure AD / Microsoft Entra ID as an IdP for
  Currents
---

# Azure AD / Entra ID

{% hint style="info" %}
Enabling SSO will affect all users of your organization, users would not be able to sign in to Currents using a different authorization method when SSO is enabled.
{% endhint %}

### Supported Features

* SP-initiated SSO (Single Sign-On)
* Just-In-Time provisioning

### Important: Azure AD Default Behavior

{% hint style="warning" %}
Azure AD's default SAML configuration uses an **opaque persistent identifier** (Object ID) for `NameID`, not the user's email. Additionally, Azure AD may send email addresses with mixed-case characters.

Currents requires:

* `NameID` to be the user's **email address in lowercase**
* The `identifier` claim to match `NameID` exactly

You **must** configure claim transformations as described below to ensure correct operation.
{% endhint %}

### Setup Steps

{% stepper %}
{% step %}
#### Create Enterprise Application

1. Sign in to the [Azure Portal](https://portal.azure.com)
2. Navigate to **Microsoft Entra ID** (formerly Azure Active Directory)
3. Go to **Enterprise applications** > **New application**
4. Click **Create your own application**
5. Enter a name (e.g., "Currents") and select **Integrate any other application you don't find in the gallery (Non-gallery)**
6. Click **Create**
{% endstep %}

{% step %}
#### Configure SAML Single Sign-On

1. In your new application, go to **Single sign-on** in the left menu
2. Select **SAML** as the single sign-on method
3. In the **Basic SAML Configuration** section, click **Edit** and set:

| Setting                | Value                                         |
| ---------------------- | --------------------------------------------- |
| Identifier (Entity ID) | `urn:amazon:cognito:sp:us-east-1_Z9TVEnj0k`   |
| Reply URL (ACS URL)    | `https://auth.currents.dev/saml2/idpresponse` |

4. Click **Save**
{% endstep %}

{% step %}
#### Configure User Attributes and Claims

This is the most critical step. You must configure claims to send the user's lowercase email as both `NameID` and the `identifier` attribute.

1. In the **Attributes & Claims** section, click **Edit**

**Configure NameID**

2. Click on the **Unique User Identifier (Name ID)** claim
3. Set the following:
   * **Source**: Attribute
   * **Source attribute**: `user.mail`
   * **Name identifier format**: `Persistent`
4. Expand **Manage transformation** and add a transformation:
   * **Transformation**: `ToLowercase()`
5. Click **Save**

**Add Required Claims**

Add the following claims by clicking **Add new claim** for each:

| Claim Name     | Namespace                                               | Source Attribute   | Transformation  |
| -------------- | ------------------------------------------------------- | ------------------ | --------------- |
| `emailaddress` | `http://schemas.xmlsoap.org/ws/2005/05/identity/claims` | `user.mail`        | `ToLowercase()` |
| `identifier`   | `http://schemas.xmlsoap.org/ws/2005/05/identity/claims` | `user.mail`        | `ToLowercase()` |
| `name`         | `http://schemas.xmlsoap.org/ws/2005/05/identity/claims` | `user.displayname` | —               |

{% hint style="info" %}
The `ToLowercase()` transformation is essential. Without it, users with mixed-case email addresses will encounter authentication errors.
{% endhint %}
{% endstep %}

{% step %}
#### Download Federation Metadata

1. In the **SAML Certificates** section, locate **Federation Metadata XML**
2. Click **Download** to save the metadata file
3. Open the downloaded XML file and verify it contains both `HTTP-POST` and `HTTP-Redirect` bindings:

```xml
<SingleSignOnService 
    Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" 
    Location="https://login.microsoftonline.com/..." />
<SingleSignOnService 
    Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect" 
    Location="https://login.microsoftonline.com/..." />
```
{% endstep %}

{% step %}
#### Share Configuration with Currents

Contact Currents support (support@currents.dev or via in-app chat) and provide:

* The downloaded Federation Metadata XML file
* List of email domains your organization uses (e.g., `@example.com`, `@example.org`)

Currents support will configure your SSO integration and notify you when it's ready.
{% endstep %}

{% step %}
#### Assign Users

1. In your Enterprise application, go to **Users and groups**
2. Click **Add user/group**
3. Select the users or groups who should have access to Currents
4. Click **Assign**
{% endstep %}

{% step %}
#### Test the Integration

Once Currents support confirms the integration is active:

1. Navigate to [https://app.currents.dev/login](https://app.currents.dev/login)
2. Enter your email address and click **Continue**
3. You will be redirected to Microsoft's login page
4. After authenticating, you should be redirected back to the Currents dashboard

If you encounter errors, see [troubleshooting-sso.md](../troubleshooting-sso.md "mention").
{% endstep %}
{% endstepper %}

### Reference

For more details on SAML attribute configuration, see:

* [saml2.0-configuration.md](../saml2.0-configuration.md "mention") — full SAML configuration reference
* [Microsoft Entra SAML Claims Customization](https://learn.microsoft.com/en-us/entra/identity-platform/saml-claims-customization) — official Microsoft documentation on claim transformations
