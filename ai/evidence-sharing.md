---
description: >-
  Have an AI agent prove the work it did with before-and-after evidence from
  your CI runs or from a browser session, shared through links anyone can open
  without a Currents account
icon: file-certificate
---

# Evidence Sharing

{% hint style="warning" %}
**Experimental.** The evidence skills, the tools they call, and what those tools return may change between releases.
{% endhint %}

When you delegate a task to an AI agent, it comes back with a diff and a claim that the task is done. Evidence sharing lets the agent back that claim with proof: the traces, screenshots, and attachments of the broken behavior and of the fixed one, as links anyone can open without a Currents account.

Evidence sharing is part of the [Remote MCP Server](remote-mcp.md). It publishes two skills, workflows the agent reads before it calls any tools:

| Skill              | Use it when                                               | Evidence comes from                            |
| ------------------ | --------------------------------------------------------- | ---------------------------------------------- |
| `collect-evidence` | A test in CI covers the change                            | The runs your CI reports to Currents           |
| `browser-evidence` | No test covers the change, such as a bug reported by hand | A browser session the agent drives and records |

## Enable evidence sharing

{% stepper %}
{% step %}
### Connect the Remote MCP Server

```bash
claude mcp add --transport http currents https://api.currents.dev/mcp
```

Run `/mcp`, choose **currents**, and choose **Authenticate**. For other clients and for API keys, see [remote-mcp.md](remote-mcp.md "mention").
{% endstep %}

{% step %}
### Grant write access for browser evidence

`collect-evidence` works with read access. `browser-evidence` uploads its recordings to Currents, so it needs the `runs:write` permission, or a **Read & Write** API key. See [what a connection can reach](remote-mcp.md#what-a-connection-can-reach).
{% endstep %}

{% step %}
### Connect Playwright MCP for browser evidence

`browser-evidence` drives the browser through [Playwright MCP](https://github.com/microsoft/playwright-mcp), which we recommend to capture the before and after of the change. Start it with `--caps=devtools` so the agent can record traces:

```bash
claude mcp add playwright -- npx @playwright/mcp@latest --caps=devtools
```
{% endstep %}
{% endstepper %}

## Ask for evidence

The Remote MCP Server tells the agent about both skills when it connects, so asking for proof in plain words is enough.

From CI, with `collect-evidence`:

```text
Fix the checkout total bug, then collect before/after evidence from the CI run
on this branch.
```

From a browser session, with `browser-evidence`:

```text
Reproduce the checkout total bug at http://localhost:3000, fix it, and record
before/after browser evidence in the "web-app" Currents project.
```

The agent writes the evidence up as a comment: what changed, the before and after, and the links. Currents does not post it anywhere. To have the agent post a pull request or ticket comment, give it a tool that can, such as a GitHub or Linear MCP server, and say where to post in the prompt. We recommend it: a reviewer then sees the before and after next to the code.

## Evidence from CI

`collect-evidence` reads runs that CI already reported to Currents. The failing run is the before, and the run on the branch with the fix is the after.

Evidence links need a Playwright trace. With `trace: 'retain-on-failure'`, a passing test keeps no trace, so the after shows only screenshots and attachments. Set `trace: 'on'` for the tests that prove the change, so the after run keeps a trace too.

## Evidence from a browser session

`browser-evidence` records the broken behavior, fixes the code, records the fixed behavior, and stores each recording as a run in the Currents project you choose. Before you ask, have:

* a URL that is already serving the app. The agent does not start a dev server.
* the Currents project to record into.
* a test account with test data. The recording carries the page's network traffic.

## What an evidence link shows

Each link serves one test attempt's Playwright trace:

* **Digest**: the actions the test ran, console errors, failed requests, and the frame at each failure
* **Filmstrip** and **animation**: the whole attempt as one image, or as an animated image
* **Accessibility snapshots**: the page structure at a point in the test, to diff before and after
* **Network requests** and **attachments** recorded in the trace
* **Player**: an interactive trace player in the browser

A link lasts 24 hours by default, up to 7 days. Artifacts behind the links follow [data-retention.md](../resources/data-privacy/data-retention.md "mention"): passed tests keep theirs for 7 days, so collect the before and the after in one session.

{% hint style="danger" %}
**Anyone holding an evidence link can read it until it expires,** including request bodies, headers, and cookies from the trace. Review evidence before you share it, and record with test accounts only.
{% endhint %}

## Troubleshooting

| Symptom                                   | Fix                                                                                                                       |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| The agent cannot record a browser session | The connection lacks `runs:write`, or uses a Read Only key. See [what a connection can reach](remote-mcp.md#what-a-connection-can-reach). |
| `No trace found for this test attempt`    | The attempt recorded no trace. Set `trace: 'on'` for the tests that prove the change.                                    |
| The agent reports an older run than yours | The run on the branch is still in progress. Ask again once CI finishes.                                                   |
| A link or artifact returns `404`          | The link expired, or the artifact is past retention. Ask the agent for a new link.                                        |
