---
name: Suite Size Documentation Update
overview: Update the Currents documentation to reflect the new Suite Size analytics view and rename the old "Test Suite Size" chart to "Run Size", creating separate pages for each.
todos:
  - id: create-suite-size-page
    content: Create new dashboard/suite-size.md documenting the new Suite Size analytics view
    status: pending
  - id: rename-to-run-size
    content: Update dashboard/insights-and-analytics.md to rename 'Test Suite Size' to 'Run Size'
    status: pending
  - id: update-navigation
    content: Update SUMMARY.md to add Suite Size page to navigation
    status: pending
isProject: false
---

# Suite Size Documentation Update

---

## SECTION 1: Create New Suite Size Analytics Page

**Standalone task - can be executed independently**

### Objective

Create a new documentation page for the Suite Size analytics view.

### File to Create

`dashboard/suite-size.md`

### Content Requirements

The page should follow GitBook markdown format with frontmatter. Include:

**Frontmatter:**

```yaml
---
description: Track changes in test suite composition over time
icon: chart-line-up
---
```

**Page Title:** `# Suite Size`

**Introduction:**

Explain that Suite Size tracks unique tests and spec files discovered in CI runs over time to monitor test suite growth and composition changes.

**Key Metrics Section:**

- **Test Cases**: Unique test cases (individual test functions) executed in the selected period
- **Spec Files**: Unique spec files executed in the selected period
- **Delta**: Period-over-period change showing growth or reduction

**Visualization Components:**

1. **Main Chart**: Dual-axis area chart showing Test Cases (left Y-axis) and Spec Files (right Y-axis)
2. **Delta Chart**: Bar chart showing period-over-period changes (green for positive, red for negative)
3. **Summary Statistics**: Metric cards showing current values, deltas, and percentage changes
4. **Metrics Table**: Tabular view with expandable rows showing test changes details (added/removed tests)

**Smoothing/Rolling Window Section:**

- **Raw Values Mode**: Actual counts per period
- **Rolling Presence Mode**: Counts unique tests/specs seen within a rolling window (1-14 periods, default: 3)
- Include note about daily resolution without smoothing showing high variance

**Grouping Options:**

- None (Aggregate): Overall metrics
- By Tag: Group by Playwright tags
- By Branch: Group by Git branch
- By Group: Group by test group (e.g., browser like Firefox, Chromium)
- When grouped, displays multi-line chart with top N limit selector (3, 5, or 10 series)

**Filters Section:**

- Date Range
- Tag (Playwright tags)
- Git Author
- Git Branch
- Group
- Tags Logical Operator (AND/OR for multiple tags)

**Use Cases:**

- Monitor test suite growth over sprints
- Identify when tests were added or removed
- Track test coverage changes by branch or tag
- Detect unexpected changes in suite composition

### Style Guidelines

- Follow existing documentation patterns in `dashboard/insights-and-analytics.md`
- Use GitBook hint blocks where appropriate
- Reference related pages using GitBook mention syntax: [`page.md`](path/page.md "mention")

---

## SECTION 2: Rename "Test Suite Size" to "Run Size"

**Standalone task - can be executed independently**

### Objective

Update the existing Analytics documentation to rename the "Test Suite Size" chart to "Run Size".

### File to Modify

`dashboard/insights-and-analytics.md`

### Specific Changes Required

**Change 1 - Line 21:**

```
BEFORE: * **Suite Size**, **Test Results**, and **Test Flakiness** charts also support the **group** filter.
AFTER:  * **Run Size**, **Test Results**, and **Test Flakiness** charts also support the **group** filter.
```

**Change 2 - Line 59:**

```
BEFORE: ### Test Suite Size
AFTER:  ### Run Size
```

**Change 3 - Line 68:**

```
BEFORE: <figure><img src="../.gitbook/assets/Screenshot 2026-01-19 at 19.21.17.png" alt=""><figcaption><p>Example chart - Test Suite Size</p></figcaption></figure>
AFTER:  <figure><img src="../.gitbook/assets/Screenshot 2026-01-19 at 19.21.17.png" alt=""><figcaption><p>Example chart - Run Size</p></figcaption></figure>
```

### Important Notes

- Do NOT modify any other occurrences of "Suite Size" in other files
- The description text (lines 61-66) accurately describes the Run Size chart and does not need changes
- The screenshot reference remains the same (only caption changes)

---

## SECTION 3: Update Navigation

**Standalone task - can be executed independently**

### Objective

Add the new Suite Size page to the GitBook navigation.

### File to Modify

`SUMMARY.md`

### Specific Change Required

Insert a new navigation entry after the Analytics line. Find line 115:

```
* [Analytics](dashboard/insights-and-analytics.md)
```

Add immediately after it:

```
* [Suite Size](dashboard/suite-size.md)
```

### Result

The Dashboard section navigation should include:

```
* [Analytics](dashboard/insights-and-analytics.md)
* [Suite Size](dashboard/suite-size.md)
* [Administration](dashboard/administration/README.md)
```

---

## Reference: Files NOT to Modify

The following files mention "Suite Size" but refer to a **different concept** (the number of tests in a spec file, which is a spec-level metric, not the analytics chart). These should remain unchanged:

- `dashboard/test-suite-performance-explorer/spec-files-explorer.md`
- `dashboard/spec-file-status/spec-files-view.md`
- `insights/currents-explorer/spec-files-explorer/README.md`
- `insights/currents-explorer/spec-files-explorer/spec-files-performance.md`