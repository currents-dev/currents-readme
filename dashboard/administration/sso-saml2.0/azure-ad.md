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

### Setup Steps

{% stepper %}
{% step %}
**Create Enterprise Application**

1. Sign in to the [Azure Portal](https://portal.azure.com)
2. Navigate to **Microsoft Entra ID** (formerly Azure Active Directory)
3. Go to **Enterprise applications** > **New application**
4. Click **Create your own application**
5. Enter a name (e.g., "Currents") and select **Integrate any other application you don't find in the gallery (Non-gallery)**
6. Click **Create**
{% endstep %}

{% step %}
**Configure SAML Single Sign-On**

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
**Configure User Attributes and Claims**

{% hint style="warning" %}
You **must** configure claim transformations as described below to ensure correct operation.

Azure AD may send email addresses with mixed-case characters which is not supported by Currents Authentication provider.

Currents requires Unique User Identifier (Name ID) `NameID` to be the user's email address in lowercase.
{% endhint %}

**Unique User Identifier (Name ID)**

Configure Entra to send the user's lowercase email as `NameID` attribute.

1. In the **Attributes & Claims** section, click **Edit**
2. Open the **Unique User Identifier (Name ID)** claim
   1. claim name `nameidentifier`;
   2. namespace `http://schemas.xmlsoap.org/ws/2005/05/identity/claims`
3. Under **Choose name identifier format**, set **Name identifier format** to **Persistent**.
4. Under **Source**, select **Transformation** (not Attribute).
5. Set **Transformation** to **ToLowercase** with input **`user.mail`** — the portal displays this as **ToLowercase (user.mail)**.
6. Click **Save**

**Additional claims**

Under **Attributes & Claims**, in **Additional claims**, click **Add new claim** for each row below. Use **SAML** as the claim type where the portal asks for it.

| Claim Name                                                           | Value                                                                                        |
| -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress` | Transformation **ToLowercase** with source `user.mail` (shown as `ToLowercase (user.mail)`). |
| `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name`         | `user.displayname`                                                                           |
|                                                                      |                                                                                              |

{% hint style="info" %}
Use the **ToLowercase** transformation for email values so mixed-case addresses from Azure AD match Currents accounts.
{% endhint %}

<figure><img src="../../../.gitbook/assets/CleanShot 2026-03-30 at 13.05.55@2x.png" alt=""><figcaption><p>Microsoft Entra Attributes Mapping Example</p></figcaption></figure>
{% endstep %}

{% step %}
**Download Federation Metadata**

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
**Share Configuration with Currents**

Contact Currents support (support@currents.dev or via in-app chat) and provide:

* The downloaded Federation Metadata XML file
* List of email domains your organization uses (e.g., `@example.com`, `@example.org`)

Currents support will configure your SSO integration and notify you when it's ready.
{% endstep %}

{% step %}
**Assign Users**

1. In your Enterprise application, go to **Users and groups**
2. Click **Add user/group**
3. Select the users or groups who should have access to Currents
4. Click **Assign**
{% endstep %}

{% step %}
**Test the Integration**

Once Currents support confirms the integration is active:

1. Navigate to [https://app.currents.dev/login](https://app.currents.dev/login)
2. Enter your email address and click **Continue**
3. You will be redirected to Microsoft's login page
4. After authenticating, you should be redirected back to the Currents dashboard

If you encounter errors, see [troubleshooting-sso.md](troubleshooting-sso.md "mention").
{% endstep %}
{% endstepper %}

### Reference

For more details on SAML attribute configuration, see:

* [saml2.0-configuration.md](saml2.0-configuration.md "mention") — full SAML configuration reference
* [Microsoft Entra SAML Claims Customization](https://learn.microsoft.com/en-us/entra/identity-platform/saml-claims-customization) — official Microsoft documentation on claim transformations
