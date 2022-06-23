---
description: Cancelling cypress tests runs via dashboard
---

# Cancel Run

You can stop cypress test by cancelling runs that are currently in progress using dashboard controls.&#x20;

Cancelling a run can be useful for:

* preventing run from timing out
* optimizing usage of your CI provider resources
* reducing the number of recorded tests

{% hint style="warning" %}
Please note: Cancelling a run cannot be undone
{% endhint %}

### How to cancel Cypress tests run?

In-progress runs can be cancelled by clicking "Cancel Run" button in Runs Feed view.

![Cancelling cypress tests run from Runs Feed view](../.gitbook/assets/cancelling-run.gif)

You can also cancel a run when from Run Details view.

![Cancelling cypress tests run from Run Details view](../.gitbook/assets/cancel-run-02.gif)

### What happens when a run is cancelled?

Cancelling a run affects in-progress and pending tests, as well as integrations and runs analytics.

* the run's status will become "Cancelled"
* in-progress tests will run to completion, the dashboard will accept their result
* attempts to start a new test for a cancelled run would fail with the error message `Run is cancelled`

### How cancelled runs affect insights?

* Cancelled runs are excluded from Runs Insights - only completed runs appear in Runs Insights charts
* Tests recorded as part of a cancelled run are still included in Tests Insights charts

### How does cancelling a run affect test records plan usage?

* Only fully recorded tests consume your organization's test records limit.&#x20;
* Cancelled runs do consume your organization's runs limit (for organizations on deprecated runs-based plans)

### How does cancelling a run affect integrations (GitHub, Slack, etc.)?

#### GitHub / BitBucket Commit Status Check

* Commit status checks will display `Cancelled by <username>` message
* Commit status check outcome will be set according to the last known run status, for example
  * if no failed tests were recorded before the cancellation, status check outcome will be `success`
  * otherwise status check outcome will be `failure`

![Cancelling cypress tests run - GitHub commit status message](<../.gitbook/assets/CleanShot 2022-02-17 at 01.27.24.png>)

#### GitHub PR Comment

* Currents will post a new PR comment with `Cancelled by <username>` message
* PR comment details will be set according to the last known run status

![Cancelling cypress tests run - GitHub PR comment](<../.gitbook/assets/CleanShot 2022-02-17 at 01.26.27.png>)

#### Slack / MS Teams

* Currents will post a cancellation notification with the last known run results

![Cancelling cypress tests run - Slack message example](<../.gitbook/assets/CleanShot 2022-02-17 at 01.09.18.png>)

![Cancelling cypress tests run - MS Teams example](<../.gitbook/assets/CleanShot 2022-02-17 at 01.12.24 (1).png>)

#### HTTP Webhook Integration

* A new HTTP POST request will be emitted with  last known run results. and event type `RUN_CANCELED`  See [http-webhooks.md](../integrations/http-webhooks.md "mention") for details.

