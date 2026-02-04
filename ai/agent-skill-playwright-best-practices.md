---
description: >-
  Empower your AI Agents to write, debug, and maintain Playwright tests with
  expert knowledge
icon: brain-circuit
---

# Agent Skill: Playwright Best Practices

### Installation

```bash
npx skills add https://github.com/currents-dev/playwright-best-practices-skill
```

After installing, the AI will automatically use the skill when your tasks involve Playwright. No additional configuration is required.

<details>

<summary>What is an Agent Skill</summary>

[Agent Skills](https://agentskills.io/home) are a new open standard for **providing expertise to agents without bloating the context window**. Created by Anthropic, skills are now available in all major AI development tools, including [Claude Code](https://code.claude.com/docs/en/skills), [Cursor](https://cursor.com/docs/context/skills), [VS Code](https://code.visualstudio.com/docs/copilot/customization/agent-skills), [Google Gemini](https://geminicli.com/docs/cli/skills/), and more.

At its simplest, a skill is a directory containing a `SKILL.md` file with metadata and expert knowledge that tells an agent how to perform a task in an opinionated way.

```
playwright-best-practices-skill/
├── SKILL.md          # Instructions + metadata
└── references/       # Topic-specific documentation
    ├── locators.md
    ├── assertions-waiting.md
    ├── debugging.md
    └── ...
```

Skills are **progressively disclosed** to preserve context. When an agent starts, only the skill's name and description are loaded. When a task matches the skill's purpose, the agent reads the full instructions and pulls in relevant references as needed.

This means the agent gets precise, expert knowledge exactly when it's relevant—without loading everything at once.

</details>

### How is it used?

The skill triggers automatically when the AI infers you need help with Playwright-related tasks. You don't have to mention "skill" or "Playwright best practices", just describe your task and the AI will use the skill when it's relevant.

#### **Example prompts:**

* "Fix this flaky login test" → The agent pulls in debugging and assertions guidance
* "Add a test for the checkout flow" → The agent uses test organization and locator best practices
* "Refactor these tests to use Page Object Model" → The agent references POM patterns and structure
* "Why is this test timing out in CI?" → The agent consults debugging and CI/CD references
* "Set up parallel execution for our test suite" → The agent uses performance and CI/CD guidance
* "Add accessibility tests for the dashboard" → The agent uses axe-core and keyboard navigation guidance
* "Test the mobile layout and touch gestures" → The agent references device emulation and touch patterns
* "Mock the payment gateway in tests" → The agent uses third-party service mocking patterns
* "Test the real-time collaboration feature" → The agent references multi-user and WebSocket testing

#### The skill covers:

* Writing new E2E, component, API, visual regression, or accessibility tests
* Testing mobile/responsive layouts, touch gestures, or device emulation
* Implementing file uploads/downloads, date/time mocking, or WebSocket testing
* Handling OAuth popups, geolocation, permissions, or multi-tab flows
* Testing iframes, canvas/WebGL, service workers, or PWA features
* Testing Electron desktop apps or browser extensions
* Internationalization (i18n), locales, RTL layouts, or date/number formats
* Testing error states, offline mode, or network failure scenarios
* Security testing (XSS, CSRF, authentication, authorization)
* Performance testing with Web Vitals or Lighthouse
* Reviewing or refactoring Playwright test code
* Fixing flaky tests or debugging failures
* Setting up CI/CD, test coverage, or global setup/teardown
* Configuring projects, dependencies, parallel runs, or sharding

### Learn more

<table data-card-size="large" data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th><th data-hidden data-card-cover data-type="image">Cover image</th><th data-hidden data-type="image">Cover image (dark)</th><th data-hidden data-card-cover-dark data-type="image">Cover image (dark)</th></tr></thead><tbody><tr><td><h4>View on GitHub</h4></td><td>See the full source code and documentation</td><td><a href="https://github.com/currents-dev/playwright-best-practices-skill">https://github.com/currents-dev/playwright-best-practices-skill</a></td><td data-object-fit="contain"><a href="../.gitbook/assets/github-mark.png">github-mark.png</a></td><td><a href="../.gitbook/assets/github-mark-white.png">github-mark-white.png</a></td><td data-object-fit="contain"><a href="../.gitbook/assets/github-mark-white.png">github-mark-white.png</a></td></tr></tbody></table>
