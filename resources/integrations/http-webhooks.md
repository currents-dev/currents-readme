---
description: HTTP Webhooks for Playwright and Cypress tests dashboard
icon: webhook
---

# HTTP Webhooks

Enabling HTTP Webhook Integration will trigger an HTTP POST request to an endpoint of your choice.

Currents will send a POST request for the following lifecycle event of Cypress or Playwright tests run:

* a new run starts
* a run finishes
* a run times out
* a run is cancelled

{% hint style="info" %}
Please note: The endpoint should be publicly accessible
{% endhint %}

### Examples

#### Example of HTTP POST request with cypress tests run data

```bash
curl --location --request POST 'https://yourserver.com/webhook/currents.dev' \
--header 'Content-Type: application/json' \
--data-raw '{
    "event": "RUN_START",
    "runUrl": "https://app.currents.dev/run/950a13c3edf4f28b6e8ce301a404b4aa",
    "buildId": "demo-build-cdx3314",
    "commit": {
        "authorEmail": "john@doe.com",
        "authorName": "John Doe",
        "defaultBranch": "main",
        "branch": "feature-A",
        "message": "feat: change button color",
        "remoteOrigin": "https://github.com/org/repo.git",
        "sha": "5a7edc9a156e417068060d67109021351fc7d9b8"
    },
    "failures": 0,
    "flaky": 0,
    "overall": 1,
    "passes": 1,
    "pending": 0,
    "retries": 0,
    "skipped": 0
}'
```

#### HTTP Webhook Integration payload schema&#x20;

```json
{
	event: "RUN_START" | "RUN_FINISH" | "RUN_TIMEOUT" | "RUN_CANCELED";
	runUrl: string;  // currents dashoard run URL
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
	pending: number;  // number of pending tests
	skipped: number;  // number of skipped tests
	retries: number;  // number of test retries for the run
	flaky: number;    // number of flaky tests for the run
}
```

### Security

Validate the authenticity of Currents webhooks by setting custom HTTP headers.

#### Timestamp

Currents includes an `x-timestamp` HTTP header with the system's epoch timestamp for each webhook request to help you prevent replay attacks. Make sure your server's clock is synchronized with a reliable time source to avoid validation issues.

#### Custom Headers&#x20;

You can set custom headers to pass a secret key with each webhook request.&#x20;

<figure><img src="../../.gitbook/assets/Screenshot 2026-01-19 at 20.10.03.png" alt=""><figcaption><p>Add a secret key in the headers so that your system can validate that the request came from Currents.</p></figcaption></figure>
