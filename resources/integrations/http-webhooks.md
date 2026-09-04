---
description: HTTP Webhooks for getting runs information
icon: webhook
---

# HTTP Webhooks

Enabling HTTP Webhook Integration will trigger an HTTP POST request to an endpoint of your choice.

Currents will send a POST request for the following lifecycle events of a Playwright test run:

* a new run starts - `RUN_START`
* a run finishes - `RUN_FINISH`
* a run times out - `RUN_TIMEOUT`, see [run-timeouts.md](../../dashboard/runs/run-timeouts.md "mention")
* a run is cancelled - `RUN_CANCELED`, see [cancel-run.md](../../dashboard/runs/cancel-run.md "mention")

{% hint style="info" %}
Please note: The endpoint should be publicly accessible
{% endhint %}

### Enabling the HTTP Webhook integration

* Navigate to **Manage Project > Integrations**
* Add the **HTTP Webhook** integration and provide the details:
  * **URL** - the publicly accessible endpoint that will receive the POST requests, e.g. `https://yourserver.com/webhook/currents.dev`
  * **Events (Optional)** - the events that trigger the request. Leaving this field blank activates all the events.
  * **Headers (Optional)** - custom HTTP headers sent with every request, see [#security](http-webhooks.md#security "mention")
* Click **Save** to preserve the changes

Runs with multiple groups - i.e. multiple Playwright projects reported under the same `ci-build-id` - emit a request per group, and each payload carries its own `groupId`.

### Examples

#### Example of an HTTP POST request with Playwright test run data

```bash
curl --location --request POST 'https://yourserver.com/webhook/currents.dev' \
--header 'Content-Type: application/json' \
--data-raw '{
    "event": "RUN_FINISH",
    "runUrl": "https://app.currents.dev/run/950a13c3edf4f28b6e8ce301a404b4aa",
    "buildId": "demo-build-cdx3314",
    "groupId": "chromium",
    "tags": ["smoke", "production"],
    "commit": {
        "authorEmail": "john@doe.com",
        "authorName": "John Doe",
        "defaultBranch": "main",
        "branch": "feature-A",
        "message": "feat: change button color",
        "remoteOrigin": "https://github.com/org/repo.git",
        "sha": "5a7edc9a156e417068060d67109021351fc7d9b8"
    },
    "overall": 24,
    "passes": 21,
    "failures": 2,
    "pending": 0,
    "skipped": 1,
    "retries": 3,
    "flaky": 1
}'
```

#### HTTP Webhook Integration payload schema&#x20;

```json
{
	event: "RUN_START" | "RUN_FINISH" | "RUN_TIMEOUT" | "RUN_CANCELED";
	runUrl: string;  // currents dashboard run URL
	buildId: string; // as reported by CI
	groupId: string; // only for multigroup runs
	tags: string[];
	commit: {
		sha: string | null;
		branch: string | null;
		authorName: string | null;
		authorEmail: string | null;
		message: string  | null;
		remoteOrigin: string | null;
		defaultBranch: string | null;
	},
	overall: number;  // overall number of tests
	passes: number;   // number of passed tests 
	failures: number; // number of failed tests 
	pending: number;  // number of tests that haven't reported results yet
	skipped: number;  // number of skipped tests
	retries: number;  // number of test retries for the run
	flaky: number;    // number of flaky tests for the run
}
```

#### Interpreting the results for Playwright runs

The counters reflect the status Currents assigns to each test after all its attempts have completed, which is a composition of Playwright's expected status and the outcome of every attempt - see [test-status.md](../../dashboard/tests/test-status.md "mention") for the full mapping.

| Field      | Playwright meaning                                                                                                                                                    |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `overall`  | All the tests recorded for the run or group, regardless of their outcome                                                                                               |
| `passes`   | Tests whose outcome matched their expected status, including tests marked with `test.fail()` that did fail                                                             |
| `failures` | Tests whose outcome did not match their expected status, e.g. a failed assertion, an exception or a `timedOut` attempt                                                 |
| `pending`  | Tests that were detected but haven't reported results yet - typically non-zero for `RUN_START`, `RUN_TIMEOUT` and `RUN_CANCELED`                                       |
| `skipped`  | Tests that didn't run because of an error in `beforeEach` / `beforeAll`, or because a preceding test in a [serial group](https://playwright.dev/docs/test-retries#serial-mode) failed. Tests marked with `test.skip()` or `test.fixme()` are reported as `ignored` and are not counted here |
| `retries`  | Total number of retry attempts across the run or group                                                                                                                |
| `flaky`    | Tests that had at least one attempt matching the expected status and at least one that didn't, see [flaky-tests.md](../../dashboard/tests/flaky-tests.md "mention")    |

{% hint style="info" %}
`RUN_TIMEOUT` and `RUN_CANCELED` payloads carry the **last known results** for the run or group - tests that never reported are counted in `pending`.
{% endhint %}

The `tags` field contains the run tags reported with `--tag`, see [tags.md](../../dashboard/runs/tags.md "mention").

### Security

Validate the authenticity of Currents webhooks by setting custom HTTP headers.

#### Timestamp

Currents includes an `x-timestamp` HTTP header with the system's epoch timestamp for each webhook request to help you prevent replay attacks. Make sure your server's clock is synchronized with a reliable time source to avoid validation issues.

#### Custom Headers&#x20;

You can set custom headers to pass a secret key with each webhook request.&#x20;

<figure><img src="../../.gitbook/assets/Screenshot 2026-01-19 at 20.10.03.png" alt=""><figcaption><p>Add a secret key in the headers so that your system can validate that the request came from Currents.</p></figcaption></figure>
