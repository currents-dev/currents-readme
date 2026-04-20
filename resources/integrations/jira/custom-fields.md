---
description: Jira Custom fieds support
---

# Custom Fields

The Currents Jira integration now supports custom fields when creating or linking Jira issues. This allows to set required custom field values directly from the Currents dashboard, ensuring issues are created with all necessary information.

#### Overview

When creating a new Jira issue or linking an existing one, the integration automatically:

1. **Detects required custom fields** for the selected issue type
2. **Displays appropriate input fields** based on the field type
3. **Validates required fields** before submission
4. **Warns about unsupported fields** that cannot be set through the integration

#### Supported Field Types

The integration supports the following Jira custom field types:

#### Text Fields

* **Type**: `TEXT`
* **Input**: Single-line text input
* **Use case**: Short text values, summaries, or single-line descriptions

<figure><img src="../../../.gitbook/assets/image.png" alt=""><figcaption></figcaption></figure>

#### Select (Single Choice)

* **Type**: `SELECT`
* **Input**: Dropdown with predefined options
* **Use case**: Single selection from a list of allowed values (e.g., Priority, Category)

<figure><img src="../../../.gitbook/assets/image (1).png" alt=""><figcaption></figcaption></figure>

#### Multi-Select

* **Type**: `MULTI_SELECT`
* **Input**: Multi-select dropdown with predefined options
* **Use case**: Multiple selections from a list (e.g., Components, Tags)

<figure><img src="../../../.gitbook/assets/image (2).png" alt=""><figcaption></figcaption></figure>

#### Checkbox

* **Type**: `CHECKBOX`
* **Input**: Multi-checkbox selection
* **Use case**: Multiple boolean selections from predefined options (e.g., Flags, Features)

<figure><img src="../../../.gitbook/assets/image (3).png" alt="" width="224"><figcaption></figcaption></figure>

#### Labels

* **Type**: `LABELS`
* **Input**: Tag input with autocomplete
* **Use case**: Free-form labels or tags that can be added dynamically

<figure><img src="../../../.gitbook/assets/image (4).png" alt=""><figcaption></figcaption></figure>

#### Number

* **Type**: `NUMBER`
* **Input**: Number input field
* **Use case**: Numeric values (e.g., Story Points, Estimates)

<figure><img src="../../../.gitbook/assets/image (5).png" alt=""><figcaption></figcaption></figure>

#### Date

* **Type**: `DATE`
* **Input**: Date picker (date only, no time)
* **Use case**: Due dates, start dates, or any date-only fields

<figure><img src="../../../.gitbook/assets/image (6).png" alt=""><figcaption></figcaption></figure>

#### DateTime

* **Type**: `DATETIME`
* **Input**: Date and time picker
* **Use case**: Timestamps, deadlines with time, or scheduled dates

<figure><img src="../../../.gitbook/assets/image (7).png" alt=""><figcaption></figcaption></figure>

#### User (Single)

* **Type**: `USER`
* **Input**: Searchable user picker with Jira user search
* **Use case**: Assignee, owner, or any single user field
* **Note**: Searches users within the selected Jira project scope

#### Multi-User

* **Type**: `MULTI_USER`
* **Input**: Multi-select user picker with Jira user search
* **Use case**: Reviewers, watchers, or any field requiring multiple users
* **Note**: Searches users within the selected Jira project scope

<figure><img src="../../../.gitbook/assets/image (8).png" alt=""><figcaption></figcaption></figure>

#### Unsupported Fields

* **Type**: `UNSUPPORTED`
* **Behavior**: Shows a warning message if the field is required
* **Action**: Issues with unsupported required fields cannot be created through the integration

<figure><img src="../../../.gitbook/assets/image (9).png" alt=""><figcaption></figcaption></figure>

### Usage

#### Creating a New Issue with Custom Fields

1. Select the **Jira Project** and **Issue Type**
2. **Required custom fields** will automatically appear below the issue type selection
3. Fill in the required custom field values
4. Enter **Issue Title** and **Description** (optional)
5. Toggle **Include Details** to automatically add test context
6. Click **Create Issue**

> **Note**: If an issue type has unsupported required custom fields, a warning will be displayed listing those fields. In this case, it is required to create the issue directly in Jira.

### Field Behavior

#### Required vs Optional Fields

* **Required fields**: Always displayed and must be filled before submission
* **Optional fields**: Not displayed in the form (only required fields are shown)

#### Field Validation

* Required fields are validated before form submission
* Number fields validate that the input is a valid number
* User fields validate that selected users exist in the Jira project
* Empty or invalid values will prevent form submission

#### Unsupported Fields

If an issue type has required custom fields that are not supported by the integration:

* A warning message is displayed listing all unsupported required fields
* The form's submit button is disabled
* Create the issue directly in Jira to set these fields

### Limitations

#### Unsupported Field Types

Some Jira custom field types are not currently supported, including:

* Complex field types (e.g., cascading selects, epic links, sprint fields)
* Custom field types from third-party Jira apps
* Fields that require special Jira permissions or context

If the issue type requires unsupported custom fields, a warning will show up and the issue is ought to be created in Jira directly.

#### Project-Scoped User Fields

User and Multi-User fields search for users within the selected Jira project. If a user is not found:

* Ensure the user has access to the selected project
* Verify the project ID is correctly set
* Try searching with the user's display name or email address

### Troubleshooting

#### Custom Fields Not Appearing

If custom fields don't appear after selecting an issue type:

* The issue type may not have any required custom fields
* Check that the project and issue type selection is valid
* Refresh the page and try again

#### Field Values Not Saving

If custom field values aren't being saved:

* Ensure all required fields are filled
* Check for validation errors (red error messages)
* Verify the field type is supported

#### Unsupported Field Warning

If an unsupported field warning shows up:

* The listed fields cannot be set through the Currents integration
* Create the issue directly in Jira to set these fields
* Consider making these fields optional in the Jira project configuration if possible

### Limitations

#### Currents Jira app upgrade

In order to use the User field properly in the Jira integration, it is required that the Currents Jira app installation is upgraded to its latest version in the Jira platform, and accept the new required permissions `jira:users` so our system has access to the API to query it.

#### Required Jira issue unsupported custom properties

**Problem**: Jira issues allows _required_ custom properties when an issue is created depending on the _issue type_. This is currently **partially supported** in our integration, as we can send custom payload to the create issue endpoint except for **unsupported issue types**.

**Solution**: Two options are available to overcome this issue. First,&#x20;

* Don't enforce custom properties as required.
* Use a different issue type that has no required custom properties.
* Create the issue directly in Jira platform and link it.
