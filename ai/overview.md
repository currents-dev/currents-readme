---
description: >-
  Fix and auto-heal failing Playwright tests in CI with AI agents - MCP server,
  IDE extension, dashboard prompts, agent skills, and automation
icon: sparkles
---

# Overview

Currents captures everything about your Playwright test runs in CI: errors, stack traces, traces, console and network logs, historical pass/fail data, flakiness rates, and performance metrics. This page is an overview of the ways to put that data in front of an AI agent - whether you are debugging interactively in your editor, triaging failures from the dashboard, or building pipelines that auto-heal failing tests before anyone looks at the run.

## Why context matters

Pasting an error message into an AI chat is the least effective way to get an AI fix for a Playwright test failure. The error message alone is missing most of what determines the right fix:

* Is this test flaky, or did it just start failing? An agent that doesn't know the test's history will "fix" a flaky test by treating a symptom.
* What was on the page when the assertion failed? Without the DOM state, the agent guesses why a locator didn't match.
* Did other tests in the run fail for the same reason? A selector change that breaks 12 tests needs one fix, not 12.

Currents post-processes test results on the server into a structured troubleshooting context that answers these questions:

* Full error message, stack trace, and code frame (ANSI codes stripped)
* An **error-context snapshot** captured at the moment of failure: the page accessibility tree, console output, and network logs
* Historical pass/fail data and flakiness rates for the test
* Run, spec, instance, and attempt identifiers the agent can use to query further details via [MCP](mcp-server.md)

Every entry point below delivers this same context - they differ in where you are when you use them and how much of the loop is automated.

## Entry points

| Method                                                       | Where                             | Best for                                                                         |
| ------------------------------------------------------------ | --------------------------------- | -------------------------------------------------------------------------------- |
| [MCP Server](mcp-server.md)                                  | Any MCP-capable agent             | Agents querying runs, tests, and analytics on demand; autonomous troubleshooting |
| [IDE Extension](ide-extension.md)                            | VS Code, Cursor, compatible forks | Debugging CI failures without leaving the editor                                 |
| [Fix with AI](overview.md#fix-with-ai-from-the-dashboard)    | Currents dashboard                | Handing a failure to an agent while triaging a run                               |
| [Playwright Skill](agent-skill-playwright-best-practices.md) | Claude Code, Cursor, other agents | Teaching agents how to write and fix Playwright tests correctly                  |
| [n8n](../resources/integrations/n8n.md)                      | n8n workflows                     | Automated triage, notifications, and agent pipelines without code                |

### MCP Server

The [Currents MCP server](mcp-server.md) is the foundation the other entry points build on. It exposes tools for retrieving projects, runs, test results, spec instances, and performance analytics, so any MCP-capable agent - Claude Code, Cursor, or a custom agent built on the Model Context Protocol - can pull test data on demand instead of relying on what you paste into the prompt.

This is what makes auto-healing possible rather than one-shot fixes: an agent given a run ID can enumerate the failures, fetch each test's error details and history, decide which failures share a root cause, implement a fix, and verify it - querying for more context at every step instead of working from a fixed snapshot.

What agents accomplish with the MCP server in practice:

* **Failure triage** - summarize a run, group failures by root cause, and separate new regressions from known flaky tests
* **AI fixes with verification** - fix a failing test, then check the next run's results to confirm the fix held
* **Flakiness burn-down** - rank tests by flakiness over a date range and work through them systematically
* **Performance investigation** - find the slowest specs and tests, and track duration changes across runs
* **Cross-run analysis** - answer "when did this start failing?" or "does this fail on every branch or just mine?" from run history

Example prompts:

* "Tests are failing in CI. Get the details for run `<runId>` and fix the failures."
* "Summarize the last run - group the failures by likely root cause and tell me which are new versus known flaky."
* "What were the top flaky tests in the last 30 days? Fix the three worst ones."
* "What are the slowest specs in the last 7 days? Suggest what to split or parallelize."
* "When did `checkout.spec.ts` start failing, and what changed in its error message between runs?"

The Currents MCP server pairs well with browser-automation MCP servers such as [Playwright MCP](https://github.com/microsoft/playwright-mcp): Currents supplies what failed in CI and why, and the browser tools let the agent reproduce the failure in a live browser before committing a fix.

Access is scoped by the API key you configure. Use a **Read Only** key when the agent only needs to read results; a **Read & Write** key additionally allows operations like canceling runs or managing webhooks, including some irreversible deletions. See [MCP Server](mcp-server.md) for the permission model and [API Keys](../dashboard/administration/api-keys.md) for creating scoped keys.

### IDE Extension

The [IDE extension](ide-extension.md) brings CI runs, failure details, and flaky test analytics into VS Code, Cursor, and other compatible editors. Its **Fix with agent** actions assemble the full troubleshooting context - the processed error, test history, and the error-context snapshot - and hand it to your editor's AI assistant, scoped to a single test, a spec file, or all failures in a run.

{% embed url="https://player.mux.com/iA00R00026FMz9ktoCreZIl89xjOKbi1T2Mk3OrPy00S1j8?metadata-video-title=Current+IDE+Extension+-+fastest+way+to+fix+CI+failure&video-title=Current+IDE+Extension+-+fastest+way+to+fix+CI+failure" %}

The extension also registers the Currents MCP server automatically, so the agent can follow up with its own queries after the initial prompt. An **Analyze with Currents** action on every test definition pulls recent failure and flakiness data for that specific test - useful for investigating a test before it becomes a problem, not just after it fails.

This is the fastest interactive loop: failure feed, trace viewer, source code, and agent all in one place.

### Fix with AI from the dashboard

When you're triaging a run in the dashboard, every failed test attempt has a **Fix with AI** action. It generates a prompt containing the processed error, code frame, a link to the error-context snapshot, and the MCP identifiers (project, run, instance, test, attempt) an agent needs to fetch deeper context.

You can copy the prompt to your clipboard for any agent, or open it directly in a supported tool - Cursor, GitHub Copilot, Claude Code, Zed, Conductor, or Codex. The dashboard remembers your preferred target.

<figure><img src="../.gitbook/assets/CleanShot 2026-07-22 at 16.39.43@2x.png" alt=""><figcaption></figcaption></figure>



This is the bridge from investigation to action: whoever is looking at the failing run - not necessarily the person with the repo open - can package the failure with its full context and route it to an agent in one click.

### Playwright Skill

Context tells an agent _what_ failed; the [Playwright Best Practices skill](agent-skill-playwright-best-practices.md) tells it _how_ to fix it well. It's an [Agent Skill](https://agentskills.io/home) - an open standard supported by Claude Code, Cursor, VS Code, and others - that packages expert Playwright knowledge: locator strategy, web-first assertions, debugging flaky tests, CI configuration, and more.

{% hint style="info" %}
As of July 2026, it is the most-installed Playwright skill on [skills.sh](https://skills.sh) - over 64K installs - and the second-ranked result among all skills for the "playwright" keyword.
{% endhint %}

<figure><img src="../.gitbook/assets/CleanShot 2026-07-22 at 16.36.28@2x.png" alt=""><figcaption></figcaption></figure>

Without it, agents fall back on generic patterns from training data - sprinkling `waitForTimeout` calls, brittle CSS selectors, retries that mask real bugs. With it, fixes follow the same practices an experienced Playwright engineer would apply. Install it alongside any of the entry points above; the agent picks it up automatically when a task involves Playwright.

```bash
npx skills add https://github.com/currents-dev/playwright-best-practices-skill
```

### n8n

The [n8n integration](../resources/integrations/n8n.md) connects Currents to more than a thousand apps for workflows that run without a human in the loop. The Currents n8n node reads runs and test results via the API, so you can build automations that react to test outcomes: route new failures to Slack with context attached, open tickets for tests that cross a flakiness threshold, or feed failure data to an AI agent node for automated analysis and triage.

Combined with [HTTP webhooks](../resources/integrations/http-webhooks.md) as a trigger, this covers the fully autonomous end of the spectrum - no editor, no dashboard, just test results flowing into whatever process you define.

## Coming up

### Slack

**Fix with AI** is coming to the [Slack integration](../resources/integrations/slack/): failed-test notifications will include a Fix with AI button that opens one-click deep links to AI coding tools, plus a copyable prompt for everything else - prefilled with the same enriched failure context and MCP identifiers as the dashboard and IDE actions. A failure lands in your team channel, and anyone in the thread can route it to an agent without opening the dashboard first.

## Combining entry points

These methods compose - most teams end up using several:

* **Interactive debugging**: the IDE extension for the failure feed and one-click fixes, with the MCP server (auto-registered) letting the agent query beyond the initial prompt, and the Playwright skill shaping the fixes it writes.
* **Triage to fix**: whoever monitors the dashboard uses Fix with AI to package failures for the engineer's agent of choice - the MCP identifiers in the prompt let that agent pick up the investigation with full access to the run.
* **Auto-healing CI**: an n8n workflow or webhook triggers on run completion, an agent with the MCP server and the Playwright skill analyzes the failures and drafts a fix - a triaged ticket, a root-cause summary, or a PR that heals the failing test before anyone opens the run.
