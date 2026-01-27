---
description: Allows managing the team members, invitations and roles
---

# Manage Team

## Roles and Permissions

### Overview

Currents supports three organization roles that determine what actions users can perform within an organization:

* **Admin** - Full access to all organization features
* **Actions Admin** - Can manage actions/rules and view organization data
* **Member** - Read-only access to organization data, and able to execute runs

{% hint style="info" %}
All the roles (including **Member)** can execute runs with existing record keys in the organization. Also can make API requests and use Currents MCP server with existing API keys.
{% endhint %}

***

### Admin

Admins have full access to all organization features and settings. They can manage all aspects of the organization.

#### Permissions

**Runs, API & MCP**

* Execute runs with existing record keys
* Make API requests with existing API keys
* Use Currents MCP server with existing API keys

**Organization Management**

* Manage organization settings and configuration
* Invite, manage, and remove organization members
* Upload and manage organization logo
* Configure organization alerts and notifications

**Projects**

* Create, edit, and delete projects
* View all projects and test results

**Actions and Rules**

* Manage actions and rules

**API Keys**

* Create API keys
* View API keys
* Delete API keys

**Record Keys**

* Create record keys
* View record keys
* Delete record keys

**Billing**

* Access and manage billing and subscription settings

**Integrations**

* Manage organization integrations and webhooks
* View organization integrations

**Data Access**

* View all projects, test results, and organization data

***

### Actions Admin

Actions Admins can manage actions and rules while having read-only access to other organization features. This role is ideal for team members who need to configure automation rules without requiring full administrative access.

#### Permissions

**Runs, API & MCP**

* Execute runs with existing record keys
* Make API requests with existing API keys
* Use Currents MCP server with existing API keys

**Actions and Rules**

* Manage actions and rules

**View Access**

* View all projects and test results
* View organization settings
* View API keys
* View record keys
* View organization members
* View organization integrations

#### Limitations

Actions Admins **cannot**:

* Manage organization settings or members
* Create, edit, or delete projects
* Create or delete API keys
* Create or delete record keys
* Access billing settings
* Manage integrations

***

### Member

Members have read-only access to organization data. This role is suitable for team members who need to execute runs, and view test results but don't need to make organization or setting changes.

#### Permissions

**Runs, API & MCP**

* Execute runs with existing record keys
* Make API requests with existing API keys
* Use Currents MCP server with existing API keys

**View Access**

* View all projects and test results
* View organization settings
* View API keys
* View record keys
* View organization members
* View organization integrations

#### Limitations

Members **cannot**:

* Manage organization settings or members
* Create, edit, or delete projects
* Manage actions and rules
* Create or delete API keys
* Create or delete record keys
* Access billing settings
* Manage integrations

***

### Role Comparison

| Permission                   | Admin | Actions Admin | Member |
| ---------------------------- | ----- | ------------- | ------ |
| Manage organization settings | ✅     | ❌             | ❌      |
| Invite/manage members        | ✅     | ❌             | ❌      |
| Manage organization logo     | ✅     | ❌             | ❌      |
| Configure alerts             | ✅     | ❌             | ❌      |
| **Projects**                 |       |               |        |
| Create/edit/delete projects  | ✅     | ❌             | ❌      |
| View projects and results    | ✅     | ✅             | ✅      |
| **Actions & Rules**          |       |               |        |
| Manage actions and rules     | ✅     | ✅             | ❌      |
| **API Keys**                 |       |               |        |
| Create API keys              | ✅     | ❌             | ❌      |
| View API keys                | ✅     | ✅             | ✅      |
| Delete API keys              | ✅     | ❌             | ❌      |
| **Record Keys**              |       |               |        |
| Create record keys           | ✅     | ❌             | ❌      |
| View record keys             | ✅     | ✅             | ✅      |
| Delete record keys           | ✅     | ❌             | ❌      |
| **Billing**                  |       |               |        |
| Manage billing               | ✅     | ❌             | ❌      |
| **Integrations**             |       |               |        |
| Manage integrations          | ✅     | ❌             | ❌      |
| View integrations            | ✅     | ✅             | ✅      |

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
