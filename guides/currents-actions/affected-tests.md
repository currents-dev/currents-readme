---
description: Track what tests have been affected by Actions
---

# Affected Tests

The **Affected Tests** tab is part of the project **Actions** area in Currents. It helps teams see which tests were touched by actions (such as skip, quarantine, or tag rules) over a recent period, and jump from there into the relevant runs, test views, or action definitions.

### Opening the tab

1. Open the project in Currents.
2. Go to **Manage Project** -> **Actions**.

<figure><img src="../../.gitbook/assets/image (12).png" alt=""><figcaption></figcaption></figure>

***

### What the screen shows at a glance

From top to bottom:

1. **Search** — narrow the list by words in the test title, spec file path, or action name.
2. **Filters** — limit by action status, action type, and how far back in time to look.
3. **Affected tests —** List of the affected tests with its executions by the actions using the filters set.

<figure><img src="../../.gitbook/assets/image (1) (2).png" alt=""><figcaption></figcaption></figure>

***

### Specific action affected tests

When a specific action is selected, a list of affected tests with its executions will show up at the bottom of the panel.

<figure><img src="../../.gitbook/assets/image (2) (3).png" alt=""><figcaption></figcaption></figure>

***

### Filters

#### Action Status

The **Action Status** setting filters results based on the current state of related actions, allowing you to view only those that are active, disabled, expired, or archived. By default, results are shown for active actions when the tab is first opened.

#### Action Type

The **Action Type** setting filters results based on the kind of actions performed. It allows you to limit results to specific categories such as skip actions, quarantine actions, or tag actions, depending on what you want to focus on.

{% hint style="info" %}
**Look back** is separate from **Reset Filters**: resetting does not change the selected look back period.
{% endhint %}



***

### List header

When there are results, a short line above the list shows how many affected tests are shown (for example a range on long lists) and offers **Sorted by last seen**. That control flips between **newest first** and **oldest first** based on when the test was last seen in the selected window.

***

### Each test row (before expanding)

| Part             | What it means                                                              |
| ---------------- | -------------------------------------------------------------------------- |
| Arrow            | Expands or collapses run-level detail for that test.                       |
| **Title**        | Name of the test.                                                          |
| **Spec file**    | Name of the spec (smaller text under the title).                           |
| **Last seen**    | How long ago matching activity last occurred, within the look back window. |
| **N runs**       | How many runs in that window are associated with this test for this view.  |
| **Badges**       | Types of actions that applied (Skip, Quarantine, Tag), for quick scanning. |
| **Action names** | Links to open each action’s page to read or change the rule.               |

If many different actions apply to the same test, the row may show the first two and an **and N more** link. Choosing it reveals the rest; **show less** hides the extra lines again.

Choosing an **action name** opens that action in the "Actions" tab.

**Expired**, **Disabled**, or an **expires** time may appear next to an action when that status applies. When an active action is close to expiring, the expiry hint may be highlighted.

***

### Expanded row: executions

After expanding a test, Currents loads a short list of **executions** (recent runs where that test ran and the actions applied).

| Part              | What it means                                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Run** + link    | Opens the **run** in Currents. The link text is often the **commit message**; if not, it may show a run identifier. |
| **Open test**     | Opens the **test** view for that run (instance and test).                                                           |
| Badges            | Action types that applied on that execution.                                                                        |
| Action name links | Same as in the collapsed row—open the action definition for that project.                                           |
| Time              | When that execution occurred, shown as a relative time.                                                             |
