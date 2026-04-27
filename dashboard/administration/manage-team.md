---
description: Allows managing the team members, invitations and roles
---

# Manage Team

## Roles and Permissions

### Overview

Currents supports three organization roles that determine what actions users can perform within an organization:

* **Admin** - Full access to all organization features
* **Actions Admin** - Can manage actions/rules and view organization data
* **Member** - Read-only access to organization data
* **Guest** - Read-only access to runs data. Does not occupy seats.

{% hint style="info" %}
All the roles (including **Member**) can browse test results, artifacts, and analytics. They can also make API requests and use Currents MCP server if they have access to API keys.
{% endhint %}

### Guest Users

In April 2026, we introduced a new role: "Guest." These users have read-only access to run data and cannot view other areas.

\
The best part: **they don’t count toward your organization member limit**. You can have unlimited guest users.

### Permissions and Roles Table

| Permission                             | Admin | Actions Admin | Member | Guest |
| -------------------------------------- | ----- | ------------- | ------ | ----- |
| **Browse Test Results**                |       |               |        |       |
| Browse test results                    | ✅     | ✅             | ✅      | ✅     |
| Browse artifacts                       | ✅     | ✅             | ✅      | ✅     |
| Browse Analytics and Explorers         | ✅     | ✅             | ✅      | ✅     |
| **API and Record Keys**                |       |               |        |       |
| View API keys                          | ✅     | ✅             | ✅      | ❌     |
| View record keys                       | ✅     | ✅             | ✅      | ❌     |
| Manage API keys                        | ✅     | ❌             | ❌      | ❌     |
| Manage record keys                     | ✅     | ❌             | ❌      | ❌     |
| **Organization and Billing**           |       |               |        |       |
| View organization settings             | ✅     | ✅             | ✅      | ✅     |
| View organization members              | ✅     | ✅             | ✅      | ❌     |
| Manage organization members            | ✅     | ❌             | ❌      | ❌     |
| Manage organization settings           | ✅     | ❌             | ❌      | ❌     |
| Access and manage billing              | ✅     | ❌             | ❌      | ❌     |
| Manage billing alerts                  | ✅     | ❌             | ❌      | ❌     |
| **Projects, Actions and Integrations** |       |               |        |       |
| View all projects and test results     | ✅     | ✅             | ✅      | ✅     |
| View integrations                      | ✅     | ✅             | ✅      | ✅     |
| Manage actions and rules               | ✅     | ✅             | ❌      | ❌     |
| Create, edit, and archive projects     | ✅     | ❌             | ❌      | ❌     |
| Manage integrations                    | ✅     | ❌             | ❌      | ❌     |

***

### Best Practices

#### When to Use Each Role

* **Admin**: Assign to organization owners and team leads who need full control over the organization
* **Actions Admin**: Assign to team members responsible for configuring automation rules and actions
* **Member**: Assign to team members who primarily need to execute runs and view test results.
* **Guest**: Assign to team members who only needs to view test results.&#x20;

#### Security Considerations

* Only grant Admin role to trusted team members who require full access
* Use Actions Admin for team members who need to manage automation without full administrative privileges
* Regularly review role assignments to ensure users have appropriate access levels

***

### Changing Roles

Only organization Admins can change member roles. To change a user's role:

1. Navigate to the organization settings
2. Go to the Members section
3. Find the user whose role you want to change
4. Select the new role from the dropdown menu
5. Save the changes

**Note**: When changing roles, the user's permissions will update immediately.
