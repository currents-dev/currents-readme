---
description: Add Currents extension to VS Code, Cursor and others
icon: puzzle-piece
---

# IDE Extension

Debugging CI test failures typically means jumping between your terminal, a CI dashboard, log files, and your editor. Each context switch costs time and breaks your focus. By the time you piece together the error, the stack trace, and the relevant source code, the simple fix you needed has taken 10 minutes of tab-juggling.

The Currents IDE extension eliminates that loop. It brings CI run results, failure details, flaky test analytics, and AI-powered fixes directly into your editor so you can go from "build failed" to "fix committed" without leaving your code.

- See CI failures the moment they happen, right in the sidebar
- Jump from an error message to the exact line of code in one click
- Hand full failure context (errors, stack traces, history) to an AI agent to draft a fix
- Surface your flakiest and slowest tests before they become a problem

It works with VS Code, Cursor, and any VS Code-compatible editor that supports the [Open VSX](https://open-vsx.org/) registry.

## Installation

- [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=currents.currents)
- [Open VSX Registry](https://open-vsx.org/extension/currents/currents) (Cursor and other VS Code forks)

Or search "Currents" in the Extensions panel of your editor.

## Getting Started

1. Open the Currents panel in the Activity Bar.
2. Click **Set API Key** and paste your Currents [API key](https://app.gitbook.com/s/lcxad7NaXT7D2V6owvHN/get-started/authentication#managing-the-api-keys).
3. Select a project -- your runs appear immediately.

<!-- TODO: screenshot — Currents panel in the Activity Bar showing the Set API Key prompt and project picker -->

## Features

### Run Feed

Browse your latest CI test runs directly in the sidebar. Runs refresh automatically every 30 seconds so you always see the current state of your builds.

<!-- TODO: screenshot — Run Feed sidebar showing a list of runs with status badges, branch names, and timestamps -->

- Filter by branch, author, tags, or status
- Toggle auto-refresh on or off
- Load older runs on demand

### Pull Requests

Surface CI failures grouped by pull request. Each PR shows a timeline of commits and builds so you can spot regressions immediately and fix them before merging.

<!-- TODO: screenshot or short video — Pull Requests view showing a PR with multiple commits, each with pass/fail status -->

- Filter by branch, author, tags, or status
- Toggle auto-refresh on or off

### Run Details

Click any run to open a detail panel with every spec and test result. Failed tests show error messages and stack traces inline.

<!-- TODO: screenshot — Run Detail panel showing a failed test with its error message, stack trace, and action buttons -->

- **Fix all failures** / **Fix with agent** -- send failures to your AI agent with enriched context (see [Fix with AI](#fix-with-ai) below)
- **Fix spec failures** -- same flow scoped to a single spec file, bundling its failed and flaky tests into one prompt
- **Go to file** -- jump to the test file and line in one click
- **Trace Viewer** -- open the Playwright Trace Viewer inline (see [Inline Trace Viewer](#inline-trace-viewer) below)
- **Open in Dashboard** -- open the full Currents dashboard for deeper analysis of the run, spec, or test attempt

### Test Explorer

Surface the flakiest and slowest tests across your project over a configurable date range (14, 30, 60, or 90 days). Use this view to proactively address test reliability before flaky tests slow down your team.

<!-- TODO: screenshot — Test Explorer showing a ranked list of flaky tests with flakiness rate, duration, and action buttons -->

- Sort by flakiness rate or average duration
- Jump to the test file and line in one click
- Send flaky or slow tests to AI for analysis and automated fixes
- Open in Dashboard for historical trends

### Inline Trace Viewer

When a Playwright test fails, the trace file is often the fastest path to understanding what went wrong. Normally that means downloading the trace, opening it in a browser, and mentally mapping it back to your source code. The inline Trace Viewer removes those steps entirely.

Click the **Trace Viewer** button on any failed test attempt in the Run Details panel to open the full Playwright Trace Viewer in an editor tab, right next to your code. The viewer embeds `trace.playwright.dev` in a webview panel so you can step through actions, inspect DOM snapshots, view network requests, and read console logs without leaving the editor.

<!-- TODO: screenshot or short video — Trace Viewer panel open side-by-side with a test file, showing the Playwright action timeline and a DOM snapshot -->

- Opens alongside your source code so you can cross-reference actions with test lines
- Reuses the same panel when you open another trace, keeping your layout clean
- "Open in browser" button if you need the trace in a full browser window
- Trace data streams directly from Currents -- no manual download or local file management

### Fix with AI

Copying error messages from a CI log into an AI chat loses the surrounding context that makes a fix possible -- the stack trace gets truncated, the test history is missing, and the agent has to guess at what the test was doing when it failed. The "Fix with agent" actions solve this by assembling a rich, server-processed context package before the prompt ever reaches your AI assistant.

When you click **Fix with agent** on a single test, the extension uses Currents results post-processing to create an enhanced troubleshooting context that includes:

- The full error message and stack trace (ANSI codes stripped)
- The spec file path and test title
- Historical pass/fail data for the test
- Instance and attempt metadata the AI agent can use to query further details via MCP

Alongside the markdown prompt, the extension fetches a separate **error-context snapshot** -- a post-processed artifact produced by the Currents backend that can include the page accessibility tree, console, network logs and other diagnostic data captured at the moment of failure. Giving the agent structured context that goes well beyond what a raw error message provides.

The same flow scales up:

- **Fix all failures** fetches a run-level context document covering up to 25 failing tests, plus individual error-context snapshots (up to 5) attached as separate files. The prompt instructs the agent to analyze root causes across the entire run and implement fixes.
- **Fix spec failures** bundles all failed and flaky tests within a single spec into one prompt with their respective context documents and attachments.
- **Test Explorer** builds a targeted prompt for flaky or slow tests, including the flakiness rate or average duration and the test signature, then directs the agent to use MCP tools for deeper analysis.

If the AI chat API is not available (for example in editors without a built-in chat), the prompt is copied to the clipboard with an informational notification.

<!-- TODO: screenshot or short video — clicking "Fix with agent" on a failed test, showing the AI chat opening with the enriched prompt and attached error-context file -->

### Analyze with Currents

An inline CodeLens action appears above every `test`, `it`, `describe`, and `context` definition in your code. Click it to pull recent failure data from the Currents API and send a context-rich prompt to your AI assistant that:

1. Retrieves the test signature and recent run results via MCP tools
2. Checks for failures, flakiness patterns, and performance issues
3. Builds a concrete plan to fix any problems found

A Quick Fix action (Cmd+. / Ctrl+.) is also always available on any test line, even when the CodeLens display is set to `quickfix` mode.

<!-- TODO: screenshot — CodeLens "Analyze with Currents" action appearing above a test definition, with the Quick Fix menu shown -->

### MCP Server

The extension automatically registers a [Currents MCP server](https://www.npmjs.com/package/@currents/mcp) so AI agents in Cursor and VS Code can query runs, test results, and spec instances directly through tool calls. No manual configuration needed -- the extension passes your API key to the MCP server and keeps it in sync.

You can disable auto-registration if you already have `@currents/mcp` configured manually (see Settings below).

### Settings

| Setting                          | Default                       | Description                                                                            |
| -------------------------------- | ----------------------------- | -------------------------------------------------------------------------------------- |
| `currents.filterByCurrentBranch` | `false`                       | Auto-filter runs by the current git branch when a project is selected                  |
| `currents.notifyOnRunComplete`   | `false`                       | Show an OS notification when a run finishes                                            |
| `currents.analyzeTestDisplay`    | `always`                      | Show "Analyze with Currents" as CodeLens (`always`) or only via Quick Fix (`quickfix`) |
| `currents.apiBaseUrl`            | `https://api.currents.dev/v1` | API base URL (for self-hosted or enterprise setups)                                    |
| `currents.registerMcpServer`     | `true`                        | Auto-register the Currents MCP server for AI agents                                    |

### Requirements

- A [Currents.dev](https://currents.dev) account with an API key
- VS Code 1.85+ or Cursor
