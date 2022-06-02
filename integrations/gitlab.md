---
description: >-
  Getting cypress test results in GitLab - integrating Currents dashboard with
  GitLab
---

# GitLab Integration

Posting the results of cypress tests to GitLab is a convenient way to augment your Merge Requests with information from the browser automation tests suite.&#x20;

Currents Dashboard integration with GitLab allows posting [commit build statuses](https://docs.gitlab.com/ee/api/commits.html#post-the-build-status-to-a-commit) as well [merge request comments](https://docs.gitlab.com/ee/user/discussions/) with a summary of your cypress tests.

![Cypress GitLab Integration - commit build status example](../.gitbook/assets/cypress-gitlab-integration-commit-status.png)

![Cypress GitLab Integration - Merge Request comment example](../.gitbook/assets/cypress-gitlab-merge-request-note.png)

### How to enable Cypress integration with GitLab?

In order to install GitLab integration in Currents Dashboard, visit **Project Settings -> Integrations** and click **Connect GitLab repositories**.

![Installing GitLab integration for Cypress](../.gitbook/assets/cypress-gitlab-install-integration.png)

Follow on-screen instruction to create a new [GitLab OAuth App](https://docs.gitlab.com/ee/integration/oauth\_provider.html#user-owned-applications) with the following properties:

* `https://hub.currents.dev/gitlab/callback` as **Redirect URI**&#x20;
* `api` scope in the application permissions

Enter the details (**App ID** and **App Secret**) of the newly created GitLab OAuth App and click **Connect.**

After a successful connection, you will see a dropdown list of accessible  GitLab projects (repositories)

Select the repository you'd like to integrate with Currents Dashboard project and click **Save.**

![Installing GitLab Integration with Cypress](../.gitbook/assets/cypress-gitlab-installation.gif)

Currents Dashboard will start posting [commit build statuses](https://docs.gitlab.com/ee/api/commits.html#post-the-build-status-to-a-commit) and [merge request comments](https://docs.gitlab.com/ee/user/discussions/) with a summary of your cypress tests to new Merge Request.

