---
description: Provision and de-provision users in Currents using SCIM v2
---

# SCIM User Provisioning

Currents supports [SCIM v2 ](https://datatracker.ietf.org/doc/html/rfc7644)to provision and de-provision users.

In order to setup provisioning you first need to have setup [saml2.0-configuration.md](saml2.0-configuration.md "mention") .  Once ready, contact support via in-app chat or email to request SCIM be enabled for your organization.

Once enabled by Currents support, Admins will be able to find the **SCIMv2 Endpoint** and **Authorization Bearer Token** on the **Manage Team** section at https://app.currents.dev.

<figure><img src="../../../.gitbook/assets/scim-provisioning.png" alt=""><figcaption><p>SCIM details can be fetched in the Currents app by Org Admins</p></figcaption></figure>

### Supported  provisioners:

* [Okta Provisioning](okta/okta-user-provisioning.md)
* [Other provisioners](scim-user-provisioning.md#other-provisioners)

### Supported features

Currents supports User resource provisioning using SCIM. **Group resources are not implemented**.

Only users with an email address that matches the domains configures in the [SSO setup](./) are supported.

When a user is deactivated, Currents removes the user from the team member list. When a user is activated, they are not added to the team member list in Currents until after they login.

The following provisioning endpoints are supported:

* GET Users&#x20;
  * List all users belonging to your organization in our system
  * Search for a specific user using SCIM filtering
* GET User
  * Get a specific user based on id
* POST User
  * Create a new user
* PUT User
  * Update an existing user's active status or display name.
* DELETE User
  * Deactivates the user

### Other provisioners

We do not provide an integration for all provisioners, but you may be able to manually configure your SCIM client.  Please reach out to support for assistance, and see the following SCIMv2 details for Currents.

| Name                         | Value                                                                                  |
| ---------------------------- | -------------------------------------------------------------------------------------- |
| SCIMv2 Base Url              | (Different for each org, and available in the Manage Team section of the Currents app) |
| Auth Method                  | Authorization Header                                                                   |
| Auth Type                    | Bearer Token                                                                           |
| `userName` mapping           | email                                                                                  |
| Mandatory mapped fields      | `name.givenName`, `name.familyName`, `emails`, `active`                                |
| Optional non-writable fields | `name.formatted`, `displayName`                                                        |
