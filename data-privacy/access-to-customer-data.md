---
description: Data necessary for test reporting
---

# Access to Customer Data

{% hint style="info" %}
Currents does not scan or read any information not part of test results or testing-framework-generated artifacts.&#x20;

We only collect CI environment information necessary to perform its tasks.&#x20;

We encourage our customers to use best practices and not to use production systems credentials or PII in tests.&#x20;

If you have any concerns or questions, please refer to [https://currents.dev/security](https://currents.dev/security) or contact us through our support channels.
{% endhint %}

## What types of data does Currents have access to?

We collect diverse data from our users' test suites, which are strictly limited to their specific use cases, test executions, or administrative purposes within the organization. Below is a list of the data collected and processed by Currents.

### Team / Administration

* Team member emails
* Team member names (provided by administrators - might not be real names)
* IP addresses used to access the system

### Register Survey - Onboarding Form

* Organization name (might not be a real name)
* Estimated amount of tests
* Estimated organization size
* Domain of the organization (based on the registration email)
* Project name

### Test Results

* Test runner configuration
* Test results and timing
* Test execution steps details
* Test errors and exceptions
* Test source code snippets accessible in testing frameworks results

### Artifacts

* Playwright traces
* Screenshots
* Videos
* Terminal stdout and stderr produced while executing a test

### CI Environments

* **Git information**: commit message, commit sha, commit branch, commit author, remote origin.
* **CI-specific:** Environment variables, build ID, pipeline ID, CI provider type, Pull Request details.
* **Machines:** OS type, OS memory, CPU type.

### Integrations

* **GitHub**: No access to data or repos source code; we post comments and status check updates for Pull Requests. The integration application is listed here: [https://github.com/apps/currents-bot](https://github.com/apps/currents-bot), and the list of permissions appears as part of the setup.
* **GitLab**: We list repositories and projects, refresh oAuth tokens, post notes and status check updates to Merge Requests, fetching Merge Request details.
* **BitBucket**: No access to data; we only post status check updates for Pull Requests.
* **Microsoft Teams, Slack**: No access to data, just posting messages within the restrictions of the platform's rules.
