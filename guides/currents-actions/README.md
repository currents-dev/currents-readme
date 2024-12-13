---
icon: arrows-turn-to-dots
description: >-
  Automate workflows with Currents Actions by triggering actions based on
  flexible rules and conditions
cover: ../../.gitbook/assets/actions-banner.png
coverY: 173.76
layout:
  cover:
    visible: true
    size: hero
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

# 🆕 Currents Actions

The **Currents Actions Engine** allows implementing custom workflows for testing-related activities. For example, conditionally and temporarily skip or quarantine a test, dynamically add a tag,  send an alert or open a ticket if test becomes flaky.

Writing and running tests locally or in CI is usually just a single step of a more comprehensive workflows. Such a workflow can consist of multiple stages:

* creating a test
* designating a person or a team as an "owner"&#x20;
* running the test in an "evaluation" mode measuring its performance and stability
* alerting when test performance (flakiness, duration, failure rate) is degraded.

Additionally, it is often required to change the test behaviour temporarily in an ad-hoc manner: skip flaky test to unblock a CI pipeline, open a ticket to investigate the flakiness... then create another ticket to "unskip" the test.

Dynamically changing tests behaviour is not just a convenience. It unlocks powerful optimization techniques like running tests selectively based on their performance. For example, a team of 40 developers run only high-impact tests on each commit, while nightly jobs execute all the tests. The list of high-impact test is defined based on test performance and age - it includes new, flaky and frequently failing tests, omitting highly stable tests that rarely fail.

Currents Actions allows implementing those scenarios using flexible set of rules and actions - all from a central dashboard that is visible to all the team members, actions applications history, combined with real-time test results, history and test observability metrics.

{% hint style="info" %}
The Dec 2024 release of Currents Actions supports [Playwright](setup.md) and implements basic actions and conditions. We are collecting feedback and working on more actions and use cases to support your testing-related workflows.
{% endhint %}

### Creating Actions

<figure><img src="../../.gitbook/assets/Screenshot 2024-12-10 at 3.22.45 PM.png" alt=""><figcaption><p>Rules is located under Manage Project in the sidebar</p></figcaption></figure>

You can also quickly create rules when viewing test details for existing runs.

<figure><img src="../../.gitbook/assets/Screenshot 2024-12-10 at 3.29.08 PM.png" alt=""><figcaption><p>Apply rules from the Run Test Details</p></figcaption></figure>

### Actions Trace

A trace of which actions were applied to a test during its is available from the test details page.

<figure><img src="../../.gitbook/assets/Screenshot 2024-12-10 at 3.53.08 PM.png" alt=""><figcaption><p>Rules trace</p></figcaption></figure>
