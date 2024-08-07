---
description: Integrating Currents dashboard with GitLab
---

# GitLab

{% hint style="info" %}
The integration is available for both Playwright and Cypress. The examples and screenshot below are based on Cypress framework.
{% endhint %}

Currents Dashboard integration with GitLab allows posting [commit build statuses](https://docs.gitlab.com/ee/api/commits.html#post-the-build-status-to-a-commit) as well [merge request comments](https://docs.gitlab.com/ee/user/discussions/) with a summary of your cypress tests.

#### Example of GitLab commit status

![Cypress GitLab Integration - commit build status example](../../.gitbook/assets/cypress-gitlab-integration-commit-status.png)

#### Example of GitLab Merge Request note

![Cypress GitLab Integration - Merge Request comment example](../../.gitbook/assets/cypress-gitlab-merge-request-note.png)

### Enabling GitLab Integration

In order to install GitLab integration in Currents Dashboard, visit **Project Settings -> Integrations** and click **Connect GitLab repositories**.

![Installing GitLab integration for Cypress](../../.gitbook/assets/cypress-gitlab-install-integration.png)

{% hint style="info" %}
**GitLab Enterprise and self-hosted GitLab users:** you'd override the default **GitLab Instance Domain** with the base URL of your GitLab setup. For example `https://gitlab.yourcompany.com`
{% endhint %}

Follow the on-screen instructions to create a new [GitLab OAuth App](https://docs.gitlab.com/ee/integration/oauth\_provider.html#user-owned-applications) with the following properties:

* `https://hub.currents.dev/gitlab/callback` as **Redirect URI**&#x20;
* `api` scope in the application permissions

{% hint style="info" %}
**Please note:** `api` scope is required for the integration to work correctly. At the time of implementation, GitLab didn't allow setting more granular permissions.&#x20;

Here's the list of API calls that Currents use:

* Getting the list of repositories accessible to OAuth token issuer
* Posting commit build status updates
* Posting and deleting Merge Request notes
{% endhint %}

Enter the details (**App ID** and **App Secret**) of the newly created GitLab OAuth App and click **Connect.**

After a successful connection, you will see a dropdown list of accessible  GitLab projects (repositories). Select the repository you'd like to integrate with the Currents project and click **Save.**

![Installing GitLab Integration with Cypress](../../.gitbook/assets/cypress-gitlab-installation.gif)

Currents Dashboard will start posting [commit build statuses](https://docs.gitlab.com/ee/api/commits.html#post-the-build-status-to-a-commit) and [merge request comments](https://docs.gitlab.com/ee/user/discussions/) with a summary of your Playwright tests for Merge Requests in the selected project.

### Customizing GitLab Integration&#x20;

Toggling GitLab Integration settings change the type of content that is being posted to GitLab

![Customizing GitLab Integration](<../../.gitbook/assets/CleanShot 2022-06-02 at 00.52.52@2x.png>)

* Merge Requests Comment - will toggle on / off posting  run results summary to a merge request
* Commit Status - will toggle on / off updating commit status with run results

### Disabling GitLab Integration

Clicking **Disconnect Project** (1) will detach the integration from the currently selected GitLab project. Disconnecting a project would keep GitLab OAuth App credentials. You would still be able to select a different GitLab project from the list to reactivate the integration.&#x20;

**Uninstalling** (2) the integration removes the associated credentials and the integration altogether.

![Disabling GitLab Integration](<../../.gitbook/assets/CleanShot 2022-06-02 at 00.57.05@2x.png>)
