---
description: Fine-tune your project settings
---

# Project Settings

After creating a project, you can modify its settings by navigating to **Manage Project > Settings** on the left menu. Below are the settings available and their descriptions:

* **Project ID**: This ID is immutable and cannot be edited, but you can copy the Project ID to include it in your Continuous Integration (CI) settings.
* **Project Name**: It can be edited at any time to reflect the nature or stage of your project.
* **Time Out Minutes**: The duration (in min[utes) after which](#user-content-fn-1)[^1] a run will timeout if it hasn't been completed. Adjust this setting based on your tests' complexity and expected duration to avoid premature terminations or unnecessary waiting times. Read more on [Run Timeouts](../runs/run-timeouts.md).
* **Enable** [**Fail Fast Strategy**](../guides/fail-fast-strategy.md): This feature allows you to configure the project to stop a test run when the first test failure is detected. It provides faster feedback during testing cycles, saving time and resources by halting runs that are likely to fail.
* **Parallel Execution Strategy**: It defines how Currents prioritizes and executes test spec files when running tests in `--parallel` mode, either based on Failure rate or Expected duration. For detailed information, refer to the [Load Balancing documentation](https://chatgpt.com).

{% embed url="https://www.loom.com/share/7fc2e0690dc64041a36976029c0204e9?hideEmbedTopBar=true&t=20s" %}
Project Settings
{% endembed %}

Through the Project Settings, you can also delete or archive the project. Deleting a project permanently removes it and all associated data, and this action cannot be undone, so proceed with caution. If you need this project data in the future, opt for the [archiving feature](archive-and-unarchive-projects.md), which allows you to recover the project later.

[^1]: 
