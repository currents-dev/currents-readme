---
description: How to configure custom CI build IDs for failed test reruns on GitHub Actions
---

# Custom CI Build ID for Reruns

The [Last Failed GitHub Action](https://github.com/currents-dev/playwright-last-failed) uses the default CI build ID pattern to fetch the previous run information:

`${{ github.repository }}-${{ github.run_id }}-${{ github.run_attempt }}`

When you use a custom [CI build ID](../../../guides/parallelization-guide/ci-build-id.md "mention") for your test runs, set `previous-ci-build-id` to match that custom pattern.

<figure><img src="../../../.gitbook/assets/custom-ci-build-id.png" alt=""><figcaption><p>Using custom CI build ID for reruns</p></figcaption></figure>

## For Sharded Runs (with matrix strategy)

Use the matrix index and total to ensure each shard reruns its own failed tests:

{% code overflow="wrap" %}
```yaml

# an example for custom value like:
# currents-${{ github.run_id }}-${{ github.run_attempt }}
- name: Compute previous run attempt
  id: previous-attempt
  run: echo "previous=$(( ${{ github.run_attempt }} - 1 ))" >> "$GITHUB_OUTPUT"
- name: Playwright Last Failed action
  uses: currents-dev/playwright-last-failed@v2
  with:
    # if a custom CI build id is used, set "previous-ci-build-id" accordingly
    previous-ci-build-id: currents-${{ github.run_id }}-${{ steps.previous-attempt.outputs.previous }}
    pw-output-dir: basic/test-results
    matrix-index: ${{ matrix.shard }}
    matrix-total: ${{ strategy.job-total }}
```
{% endcode %}

## For Orchestrated Runs (Currents assigns tests across machines)

Omit the matrix parameters and use `or8n: true` so Currents handles test distribution:

{% code overflow="wrap" %}
```yaml
- name: Compute previous run attempt
  id: previous-attempt
  run: echo "previous=$(( ${{ github.run_attempt }} - 1 ))" >> "$GITHUB_OUTPUT"
- name: Playwright Last Failed action
  uses: currents-dev/playwright-last-failed@v2
  with:
    or8n: true
    previous-ci-build-id: currents-${{ github.run_id }}-${{ steps.previous-attempt.outputs.previous }}
    pw-output-dir: basic/test-results
```
{% endcode %}
