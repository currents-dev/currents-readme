---
description: >-
  Have an AI agent prove the work it did: before-and-after evidence from your
  CI runs or from a browser session, posted to the pull request with links
  anyone can open without a Currents account
icon: file-certificate
---

# Evidence Sharing

{% hint style="warning" %}
**Experimental.** Evidence sharing is new. The skills, the tools they call, and what those tools return may change between releases. Avoid building a process that depends on their current output.
{% endhint %}

Evidence sharing lets an AI agent show that a change it made works. When you delegate a task to an agent, it comes back with a diff and a claim that the task is done. Evidence sharing adds the proof: the agent pulls the screenshots, traces, and attachments your tests produced in CI, or records a browser session of its own, and posts a before-and-after comment on the pull request or ticket.

* **See the fix without running it.** The comment shows the broken behavior next to the fixed one, so you review the result as well as the code.
* **Open it without a Currents account.** Evidence links need no Currents account, so a reviewer, a product manager, or a customer reads them from the comment.
* **Trust evidence from CI, not a laptop.** The agent reads the artifacts that a clean CI run already stored in Currents instead of running tests on its own machine.

Evidence sharing is served by the [Remote MCP Server](remote-mcp.md). There is nothing extra to install on the Currents side.

## Choose a skill

The Remote MCP Server publishes two evidence skills. A skill is a step-by-step workflow the agent reads before it calls any tools.

| Skill               | Use it when                                                                        | Evidence comes from                                     |
| ------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `collect-evidence`  | A test in CI already covers the change, or the agent can write one                 | The runs your CI reports to Currents                    |
| `browser-evidence`  | No test covers the change: a bug reported by hand, a UI fix, a ticket with no test | A browser session the agent drives and records itself   |

Both skills end the same way: a comment that leads with what changed for the user, followed by the before and the after.

## Enable evidence sharing

### 1. Connect the Remote MCP Server

{% tabs %}
{% tab title="Claude Code" %}
Add the server:

```bash
claude mcp add --transport http currents https://api.currents.dev/mcp
```

Run `/mcp` in Claude Code, choose **currents**, and choose **Authenticate**. In the browser window that opens, sign in, pick the organization, and approve the permissions.
{% endtab %}

{% tab title="Other clients" %}
Point any client that supports Streamable HTTP at `https://api.currents.dev/mcp`. See [remote-mcp.md](remote-mcp.md "mention") for OAuth support in other clients, and [connect with an API key](remote-mcp.md#connect-with-an-api-key) for clients that send a header instead.
{% endtab %}
{% endtabs %}

### 2. Grant the permissions each skill needs

The tools an agent receives follow the permissions you approve on the consent screen, or the access level of the API key. See [remote-mcp.md](remote-mcp.md#what-a-connection-can-reach) for the full list.

| Skill              | OAuth permission              | API key access level |
| ------------------ | ----------------------------- | -------------------- |
| `collect-evidence` | `projects:read` and `results:read`                | Read Only            |
| `browser-evidence` | `projects:read`, `results:read`, and `runs:write` | Read & Write         |

`runs:write` also grants the tools that cancel, reset, and delete runs. Grant it only to an agent that records browser sessions.

### 3. Connect Playwright MCP for browser evidence

`browser-evidence` needs a browser the agent can drive and trace. We recommend [Playwright MCP](https://github.com/microsoft/playwright-mcp): the agent uses it to record a Playwright trace, a screenshot, and an accessibility snapshot of the page before and after the change.

Tracing is off by default in Playwright MCP. Turn it on with `--caps=devtools`, which adds the `browser_start_tracing` and `browser_stop_tracing` tools:

```bash
claude mcp add playwright -- npx @playwright/mcp@latest --caps=devtools
```

In other clients, pass `--caps=devtools` in the server arguments, or set `PLAYWRIGHT_MCP_CAPS=devtools` in its environment.

`collect-evidence` does not need Playwright MCP, because it works from what CI already recorded.

## Ask the agent for evidence

The Remote MCP Server tells the agent about both skills when the agent connects, so asking for proof in plain words is enough. Name the change, where the evidence goes, and, for a browser session, the URL and the Currents project.

From CI:

```text
Fix the checkout total bug in PROJ-123, then collect evidence from the CI run on
this branch and post a before/after comment on the pull request.
```

From a browser session:

```text
Reproduce the bug in PROJ-123 at http://localhost:3000, fix it, and record
before/after browser evidence in the "web-app" Currents project. Post it on the
pull request.
```

The skills respond to phrases such as **collect evidence**, **prove it works**, **before/after**, and **reproduce this**.

In Claude Code, you can also start a skill directly. Type `/` and pick `/currents:collect-evidence (MCP)` or `/currents:browser-evidence (MCP)`, or type `/mcp__currents__collect-evidence`.

## Evidence from CI

`collect-evidence` reads the runs your CI already reported to Currents. The project needs a Currents reporter configured, so that runs appear in the dashboard.

* **The before** is the run CI recorded while the bug was live.
* **The after** is the run on the branch that fixes it.

The agent never waits for a run. If the run on the branch has not finished, the agent says so and stops. Ask again once CI finishes.

### Configure your tests to keep evidence

With `trace: 'retain-on-failure'`, a test that passes keeps no trace and no video. The failing run carries the trace, and the passing run carries only screenshots and attachments. To keep full evidence for the passing run, turn traces on for the tests that prove the change:

{% code title="playwright.config.ts" %}
```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    screenshot: 'on',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'default', testIgnore: /.*evidence.*\.spec\.ts/ },
    {
      name: 'evidence',
      testMatch: /.*evidence.*\.spec\.ts/,
      use: { video: 'on', trace: 'on' },
    },
  ],
});
```
{% endcode %}

To show a specific value or UI state, attach it from the test with a stable name. The agent pairs the before and the after by test title and attachment name, so a timestamp in the name breaks the pairing.

```ts
await testInfo.attach('evidence-order-summary.png', {
  body: await page.getByTestId('order-summary').screenshot({ animations: 'disabled' }),
  contentType: 'image/png',
});
```

The Currents reporter uploads screenshots, videos, traces, and attachments with each attempt. You do not need to change the reporter configuration.

{% hint style="info" %}
The agent creates evidence links only from a Playwright trace. For other frameworks, the agent collects the screenshots, videos, and attachments that the run stored.
{% endhint %}

## Evidence from a browser session

`browser-evidence` covers a change that no test catches. The agent drives the browser to the broken behavior and records it, fixes the code, records the fixed behavior, and posts the two side by side. Currents stores each recording as a run in the Currents project you choose, so the evidence stays available after the agent session ends. The recording appears in the project's run list like a CI run, and its artifacts count toward your artifact usage.

Before you ask, have ready:

* **A URL that is already serving the app.** The agent does not start a dev server. If nothing is serving, it stops and asks.
* **The Currents project** to record into. The agent asks at the start if more than one project fits.
* **A test account with test data.** See [#permissions-and-security](evidence-sharing.md#permissions-and-security "mention").

The agent captures the broken behavior before it touches the code. If a fix is already in place, it stashes the change and captures first.

## What an evidence link shows

For each test attempt that has a Playwright trace, the agent creates an evidence link. Everything behind the link opens without a Currents account.

| View                   | What it shows                                                                                   |
| ---------------------- | ----------------------------------------------------------------------------------------------- |
| Digest                 | The actions the test ran, console errors, failed network requests, and the frame at each failure |
| Filmstrip              | The whole attempt as one image                                                                  |
| Animation              | The attempt as an animated image that plays inline in GitHub and Linear comments               |
| Accessibility snapshot | The page's accessibility tree at a moment in the test, for diffs that two screenshots cannot show |
| Network requests       | The requests the page made. The agent starts from the failed ones                              |
| Attachments            | Files stored inside the trace, such as `testInfo.attach()` output and Playwright's error context |
| Player                 | An interactive trace player in the browser                                                      |

The agent attaches screenshots to the comment itself, so they stay visible after the evidence links expire. For evidence from CI, the agent also includes the run's dashboard URL.

## How long evidence lasts

| What                                    | How long                                                                  |
| --------------------------------------- | ------------------------------------------------------------------------- |
| Evidence link                           | 24 hours by default. Ask the agent for anything from 1 minute to 7 days. |
| Dashboard URL of the run                | For as long as the run is kept                                            |
| Artifacts of passed tests               | 7 days, or less if your organization shortened its retention. See [data-retention.md](../resources/data-privacy/data-retention.md "mention") |
| Artifacts of failed, flaky, and quarantined tests | 21 days |

Because a passing run's artifacts expire first, ask for the before and the after in one session. A week later, the after half can be gone.

When an evidence link expires, the links and the inline animation in the comment stop working. If reviewers will come back to the comment later, ask the agent for a longer expiry, up to 7 days.

An expired evidence link cannot be extended. Ask the agent to create a new one while the trace is still stored.

## Permissions and security

{% hint style="danger" %}
**An evidence link is readable by anyone who holds it,** with no Currents account, until it expires. Treat it like the content it carries.
{% endhint %}

* **A trace carries network traffic.** Request and response bodies, headers, and cookies travel with the link. If a test or a browser session signs in with real credentials or loads real customer data, that data is readable from the link.
* **Record browser sessions with a test account.** Sign in with a development account that holds only test data. The `browser-evidence` skill tells the agent to stop and ask if the only way in is someone's live account.

## Troubleshooting

| Symptom                                                | Cause and fix                                                                                                                                                                                           |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The agent has no evidence tools                        | The connection lacks `results:read`. Re-authorize with `results:read`.                                                                                                     |
| The agent cannot record a browser session              | The connection lacks `runs:write`, or the API key is Read Only. Re-authorize with `runs:write`, or use a Read & Write key.                                                                               |
| `No trace found for this test attempt`                 | The attempt recorded no trace, or the agent asked for the wrong test. Under `retain-on-failure`, a passing test keeps no trace: set `trace: 'on'` for the evidence tests.                                                                           |
| The agent reports the previous run instead of yours    | The run on the branch is still in progress. A lookup by branch returns the most recent completed run. Wait for CI to finish, then ask again.                                                             |
| The digest reports no frames                           | The trace was recorded without screenshots, or, for a browser session, the agent left the screencast frames out of the trace archive. Ask the agent to record the session again.                                                                                              |
| An artifact or trace returns `404`                     | The evidence link has expired, or the artifact is past its retention period. See [How long evidence lasts](evidence-sharing.md#how-long-evidence-lasts).                                                                                    |
| Recording a session answers `422`                      | Recording is suspended for the organization, or its subscription has expired. Check the subscription, or contact [support@currents.dev](mailto:support@currents.dev).                                                                                                                             |

## Related

* [remote-mcp.md](remote-mcp.md "mention") - connect an agent to Currents
* [oauth.md](../authentication/oauth.md "mention") - the consent screen and the permissions it grants
* [shareable-context.md](shareable-context.md "mention") - share a failure's context with an agent
* [data-retention.md](../resources/data-privacy/data-retention.md "mention") - how long Currents keeps artifacts
