---
description: Run progress view show the detailed distribution of your test on CI machines
---

# Run Progress

The Run Progress View provides a real-time visualization of tests running in a CI environment. It consists of the following elements:

* [Timeline](run-progress.md#timeline)
* [Groups panel](run-progress.md#groups-panel)
* [Machine details panel](run-progress.md#machine-details-panel)

### **Timeline**

The Timeline displays time values along the X-axis at the top of the view. The time values shown are dynamic and update as the dashboard receives new run data.

The Timeline includes a movable Y-axis indicator that displays the exact time when hovering with the mouse over any point in the Groups panel.

Time measurement starts at 0ms and ends either when all test results have been reported or when the Run Timeout occurs. See[run-timeouts.md](run-timeouts.md "mention").

<figure><img src="../../.gitbook/assets/image (16).png" alt=""><figcaption><p>Timeline</p></figcaption></figure>

### **Groups panel**

This panel consists of"

* [Groups](run-progress.md#groups)
* [Machines](run-progress.md#machines)
* [Workers](run-progress.md#workers)
* [Spec files](run-progress.md#spec-files)

#### **Groups**

Groups are the highest-level components displayed in this view. Each group represents a Playwright project (or equivalent groups in other testing frameworks).

Multiple groups can exist and are listed vertically based on the start time of the first test. Each group's label includes:

* The group **name**
* The number of **machines** that executed spec files within the group
* A **collapse** button to hide or show the machines within the group

<figure><img src="../../.gitbook/assets/image (17).png" alt=""><figcaption><p>Groups</p></figcaption></figure>

#### **Machines**

A machine represents a process that executes a set of tests using a testing framework. In the dashboard, a machine can represent either a single CI machine or multiple terminals executing tests on the same physical machine.

Each machine component contains multiple workers listed sequentially from top to bottom. When hovering over a machine, it is highlighted with a yellow background to easily identify all workers and spec files executed on that specific machine.

Each machine may display a vertical line along its left border. This line represents the idle time between when the run started and when the machine began executing tests.

<figure><img src="../../.gitbook/assets/Screen Recording 2025-02-13 at 12.33.09.gif" alt=""><figcaption><p>They grey blocks represent CI machines and the associated parallel workers</p></figcaption></figure>

#### **Workers**

A worker component represents a Playwright worker. Each machine may have multiple workers and each worker contains a block representing the spec file it ran.

Workers are organized and displayed from top to bottom, based on the earliest start time of their spec files.

{% hint style="warning" %}
When Playwright `fullyParellel`  model is enabled, tests from the same spec file can run on different workers, or in rare cases on different CI machines.&#x20;

The view **does not represent** this scenario, instead it treats each spec file as if it was fully executed on just one worker. We are working on a more detailed and precise presentation for fullyParallel scenarios.
{% endhint %}

<figure><img src="../../.gitbook/assets/image (18).png" alt=""><figcaption><p>Each line represents a worker - each worker runs spec files one after another</p></figcaption></figure>

#### **Spec files**

A spec file is a file containing tests. Each spec file is displayed in a worker row, with multiple spec files arranged sequentially from left to right within each row.

The label for each spec file displays its execution duration. The spec file container uses color coding to indicate its status [spec-file-status](../spec-file-status/ "mention"):

* **Blue**: All tests passed
* **Red**: One or more tests failed
* **Blue with red stripes**: One or more flaky tests detected
* **Gray**: Pending tests or no tests (skipped or empty)
* **Orange**: Tests currently in progress

<figure><img src="../../.gitbook/assets/Screen Recording 2025-02-13 at 13.01.24.gif" alt=""><figcaption><p>Each block represents a spec file, the colors represent spec file status</p></figcaption></figure>

Hovering over a spec file displays a tooltip containing:

* File name
* Execution start timestamp
* Execution duration
* Current status
* Test metadata

<figure><img src="../../.gitbook/assets/image (19).png" alt=""><figcaption><p>Spec file</p></figcaption></figure>

### **Machine details panel**

This panel displays detailed information about a machine when selected from the Groups Panel by clicking.

The panel shows a list of executed spec files for the selected machine, including important details for each file. Each spec file entry includes a link to its detailed view, where additional information about the file and its tests can be found [spec-files.md](../../resources/api/api-resources/spec-files.md "mention").

The panel also provides functionality to pin or unpin spec files in the Groups Panel.

<figure><img src="../../.gitbook/assets/Screen Recording 2025-02-13 at 13.09.30 (1) (1).gif" alt=""><figcaption><p>Machine details panel</p></figcaption></figure>
