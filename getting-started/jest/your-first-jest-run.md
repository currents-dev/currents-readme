---
description: Running Jest tests with Currents dashboard
---

# Your First Jest Run

Setting up Currents for running and recording Jest tests in parallel can be done seamlessly within a few minutes.

## Prerequisites

<details>

<summary>Create an Organization and a Project</summary>

After signing up for the dashboard service, you will be prompted to create a new organization and a project. You can change their names later.

<img src="../../.gitbook/assets/currents-create-org.gif" alt="Creating an Organization and a Project in Currents dashboard" data-size="original">

After creating a new organization and a project, you'll see on-screen instructions with your newly created **Project ID** and **Record Key.**&#x20;

Select Jest from the framework selection list.

</details>

<details>

<summary>Install @currents/jest and @currents/cmd packages</summary>

```bash
npm install @currents/jest @currents/cmd --save-dev
```

</details>

<details>

<summary>Use the Currents reporter</summary>

You have two options on how to use our reporter.

**Option 1**: Update Jest configuration file:

{% code title="jest.config.js" %}
```javascript
import type { Config } from "jest";

const config: Config = {
  reporters: ["default", "@currents/jest"], // Add this line to your config
};

export default config;
```
{% endcode %}

**Option 2**: Pass our reporter as an argument when executing Jest.

{% code title="package.json" %}
```json
{
  ...
  "scripts": {
    ...
    "test": "jest --reporters=@currents/jest",
  },
  ...
}
```
{% endcode %}

</details>

<details>

<summary>Update your .gitignore</summary>

Add a line in your .gitignore to avoid pushing temporary generated reports to your repository.

```
.currents-report*
```

</details>

## Create your first Jest run&#x20;

Everytime you run Jest, Currents will generate a temporary report folder with the test results. For this data to be uploaded to your dashboard, you must run the `@currents/cmd` utility.

#### Step 1: Run the tests

```sh
npx jest --reporters=@currents/jest
```

#### Step 2: Upload the results

Run our utility command to upload the last results to the dashboard.

```sh
npx currents upload --key=XXX --project-id=YYY
```

Set the [**Record Key**](../../guides/record-key.md), and [**Project ID**](../../dashboard/projects/project-settings.md) obtained from Currents dashboard in the previous step.

{% hint style="info" %}
You can also setup the Record Key and Project ID in the [Reporter configuration](../../resources/reporters/currents-jest.md#configuration).
{% endhint %}

## Explore your first run

If everything was set up correctly, the execution results will show on the Currents dashboard. The latest report should be uploaded to Currents, and a link to the run will be displayed.

<figure><img src="../../.gitbook/assets/image (5).png" alt=""><figcaption><p>A link to the recorded results</p></figcaption></figure>

## Explore

Learn more about our dashboard and its features.

<table data-view="cards"><thead><tr><th></th><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td>Setup CI</td><td></td><td></td><td><a href="../ci-setup/">ci-setup</a></td></tr><tr><td>Speed Up CI</td><td></td><td></td><td><a href="../../guides/parallelization-guide/pw-parallelization/">pw-parallelization</a></td></tr><tr><td>Test Status</td><td></td><td></td><td><a href="../../dashboard/tests/test-status.md">test-status.md</a></td></tr><tr><td>Insights and Analytics</td><td></td><td></td><td><a href="../../dashboard/insights-and-analytics.md">insights-and-analytics.md</a></td></tr><tr><td>Run Details</td><td></td><td></td><td><a href="../../dashboard/runs/run-details.md">run-details.md</a></td></tr></tbody></table>
