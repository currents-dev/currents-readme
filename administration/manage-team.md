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

{% hint style="info" %}
All the roles (including **Member**) can browse test results, artifacts, and analytics. They can also make API requests and use Currents MCP server with existing API keys.
{% endhint %}

### Permissions and Roles Table

| Permission                             | Admin | Actions Admin | Member |
| -------------------------------------- | ----- | ------------- | ------ |
| **Browse Test Results**                |       |               |        |
| Browse test results                    | ✅     | ✅             | ✅      |
| Browse artifacts                       | ✅     | ✅             | ✅      |
| Browse Analytics and Explorers         | ✅     | ✅             | ✅      |
| **API and Record Keys**                |       |               |        |
| View API keys                          | ✅     | ✅             | ✅      |
| View record keys                       | ✅     | ✅             | ✅      |
| Manage API keys                        | ✅     | ❌             | ❌      |
| Manage record keys                     | ✅     | ❌             | ❌      |
| **Organization and Billing**           |       |               |        |
| View organization settings             | ✅     | ✅             | ✅      |
| View organization members              | ✅     | ✅             | ✅      |
| Manage organization members            | ✅     | ❌             | ❌      |
| Manage organization settings           | ✅     | ❌             | ❌      |
| Access and manage billing              | ✅     | ❌             | ❌      |
| Manage billing alerts                  | ✅     | ❌             | ❌      |
| **Projects, Actions and Integrations** |       |               |        |
| View all projects and test results     | ✅     | ✅             | ✅      |
| View integrations                      | ✅     | ✅             | ✅      |
| Manage actions and rules               | ✅     | ✅             | ❌      |
| Create, edit, and archive projects     | ✅     | ❌             | ❌      |
| Manage integrations                    | ✅     | ❌             | ❌      |

***

### Best Practices

#### When to Use Each Role

* **Admin**: Assign to organization owners and team leads who need full control over the organization
* **Actions Admin**: Assign to team members responsible for configuring automation rules and actions
* **Member**: Assign to team members who primarily need to execute runs and view test results. This role can execute runs with existing record keys.

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
