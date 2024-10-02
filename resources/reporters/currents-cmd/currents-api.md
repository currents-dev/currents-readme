---
description: Learn how to get data from Currents API using currents api CLI command
---

# currents api

`currents api` is a CLI command for fetching data from Currents [api](../../api/ "mention") the data is returned in JSON format.

### Usage

{% hint style="info" %}
The command requires the `--project-id` and [`--api-key`](../../api/api-keys.md#managing-the-api-keys) from Currents to authenticate the request and provide the required data. Alternatively, you can set the `CURRENTS_PROJECT_ID` and `CURRENTS_API_KEY` environment variables.
{% endhint %}

Obtain run data using the [ci-build-id.md](../../../guides/ci-build-id.md "mention") by running the following command:

```bash
npx currents api get-run --ci-build-id <ci-build-id> --output path/to/save/run.json
```

Obtain the last completed run details, filtered by `--branch` and/or `--tag`

```bash
npx currents api get-run --branch <branch> --tag <tag-1,tag-2,...tag-n>
```
