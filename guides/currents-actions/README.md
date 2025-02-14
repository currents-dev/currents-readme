---
icon: bolt-lightning
description: >-
  Automate workflows by triggering actions based on flexible rules and
  conditions
cover: ../../.gitbook/assets/Actions Banner - gitbookx2.png
coverY: 0
layout:
  cover:
    visible: true
    size: full
  title:
    visible: true
  description:
    visible: true
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
---

# Currents Actions

The Currents Actions Engine enables the implementation of custom workflows for testing-related activities. For example, you can conditionally and temporarily skip or quarantine a test, dynamically add a tag, send an alert, or open a ticket if a test becomes flaky.

Writing and running tests locally or in CI is typically just one step in a more comprehensive workflow. Such a workflow can include multiple stages, such as:

* Creating a test;
* Assigning a person or team as the "owner";
* Running the test in "evaluation" mode to measure its performance and stability;
* Alerting the team when test performance (e.g., flakiness, duration, or failure rate) degrades.

It is often necessary to tweak test behavior temporarily in an ad-hoc manner. For instance, skipping a flaky test to unblock a CI pipeline, opening a ticket to investigate the flakiness, and later creating another ticket to "unskip" the test.

Another example is the intelligent selection of tests to run. For instance, only high-impact tests are run on each commit, while nightly jobs or commits to the main branch run the full test suite. The list of high-impact tests is dynamically defined based on test performance or other criteria (e.g., age, tags). This list might include new, flaky, and frequently failing tests, while omitting stable tests that rarely fail. This approach accelerates software delivery and conserves CI resources without compromising quality.

Today, teams often rely on in-house solutions and conventions to implement such workflows.

Currents Actions, combined with detailed reporting, integrations with third-party tools, test result histories, and observability metrics, unlocks these scenarios using a flexible set of rules and actions - all powered by the Currents platform as the source of truth, accessible to the entire team.

{% hint style="info" %}
The Dec 2024 release of Currents Actions supports [Playwright](setup-currents-actions.md) and implements basic set of actions and conditions. We are collecting feedback and working on support more testing-related workflows. Please contact our team to get more detials or share ideas.
{% endhint %}
