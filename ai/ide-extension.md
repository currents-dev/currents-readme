---
description: Add Currents extension to VS Code, Cursor and others
icon: puzzle-piece
---

# IDE Extension

The Currents IDE extension brings test reporting directly into your editor. View CI runs, inspect failures, explore flaky tests, and fix them with AI — without leaving your workflow.

It works with VS Code, Cursor, and any VS Code-compatible editor that supports the [Open VSX](https://open-vsx.org/) registry.

### Installation

* [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=currents.currents)
* [Open VSX Registry](https://open-vsx.org/extension/currents/currents) (Cursor and other VS Code forks)

Or search "Currents" in the Extensions panel of your editor.

### Getting Started

1. Open the Currents panel in the Activity Bar.
2. Click Set API Key and paste your Currents [API key](https://app.gitbook.com/s/lcxad7NaXT7D2V6owvHN/get-started/authentication#managing-the-api-keys).
3. Select a project — your runs will appear immediately.

### Features

<figure><img src="../.gitbook/assets/image (69).png" alt=""><figcaption></figcaption></figure>

#### Run Feed

Browse your latest CI test runs in the sidebar. Runs are filtered by your current git branch automatically and refresh in real time.&#x20;

* 🔎 Filter by branch.
* 🔎 Filter by author.
* 🔄️ Enable/disable auto-refresh.

#### Run Details

Click any run to see every spec and test result. Failed and failed tests show error messages and stack traces inline.

* **💬 Fix all failures**: ask an agent to attempt fixing all run failures.
* **💬 Fix with agent**: open a pre-filled chat with all the context needed for agents to attempt a fix.
* **📂 Go to file**: Jump to the test file and line in one click
* **🐞 Trace Viewer**: Opens the failed attempt Playwright Trace Viewer.
* **➡️ Dashboard**: Open Currents dashboard with full details of the run, spec or test attempt.

#### Test Explorer

<figure><img src="../.gitbook/assets/image (70).png" alt=""><figcaption></figcaption></figure>

Surface the flakiest and slowest tests across your project.

* **📂 Go to file**: Jump to the test file and line in one click.
* **💬 Fix with agent**: open a pre-filled chat with all the context needed for agents to attempt a fix.

#### Fix with AI

Send any failure or flaky test to your AI assistant (Copilot, Cursor, etc.) with full context — error messages, stack traces, and recent history — to generate a fix right in your editor.

<figure><img src="../.gitbook/assets/image (68).png" alt=""><figcaption></figcaption></figure>

An inline CodeLens action also appears above test definitions in your code, letting you pull failure data from Currents and start a fix without navigating away.

#### MCP Server

The extension automatically registers a [Currents MCP server](https://www.npmjs.com/package/@currents/mcp) so AI agents can query runs, test results, and spec instances directly through tool calls.

### Source Code

The extension is open source under the Apache 2.0 license.

[GitHub Repository](https://github.com/currents-dev/ide-extension)
