---
description: Currents reporter for Jest
---

# @currents/jest

Currents reporter for [Jest](https://jestjs.io/) generates test results that for uploading to Currents.&#x20;

The reporter stores the generated results in a temporary directory. Upload the generated results using a separate package [currents-cmd](../currents-cmd/ "mention").

### Requirements

* **Jest** `v29.5.0+`
* **Node.js** `v18.20.4+`

### Setup

```sh
npm install @currents/jest @currents/cmd --save-dev
```

Add the reporter to Jest configuration:

```ts
import type { Config } from "jest";

const config: Config = {
  reporters: ["default", "@currents/jest"],
};

export default config;
```

or set the `--reporters` option when running the `jest`

```sh
npx jest --reporters=@currents/jest
```

The reporter saves the test results in a temporary folder named  `.currents/[timestamp]-[uuidv4()]`.&#x20;

{% hint style="info" %}
We recommend adding`.currents` to `.gitignore`
{% endhint %}

### Usage

* Configure the reporter
* Run the tests  `npx jest`
* Use `currents` from [currents-cmd](../currents-cmd/ "mention") package to upload the results

Example:

{% code overflow="wrap" fullWidth="false" %}
```bash
$ npx jest --reporters=@currents/jest --reporters=default
[currents]: Run started
[currents]: Report directory is set to - /Users/agoldis/immer/.currents/2024-07-16T20-33-12-555Z-478913e1-1916-499b-8d8d-c08043d50f3d
# ....
[currents]: [__tests__/base.js] - spec results written to file: /Users/agoldis/immer/.currents/2024-07-16T20-33-12-555Z-478913e1-1916-499b-8d8d-c08043d50f3d/instances/Aql-q2CM.json
[currents]: Run completed

# 📖 see @currents/cmd documentation
$ npx currents upload --key=XXX --project-id=C3lBM6
Currents config: {
  projectId: 'C3lBM6',
  recordKey: '*****',
  removeTitleTags: false,
  disableTitleTags: false,
  debug: false
}
Report directory: '.currents/2024-07-16T20-33-12-555Z-478913e1-1916-499b-8d8d-c08043d50f3d'
[root] Run created: 'https://app.currents.dev/run/8466c149d9bbf745'
Script execution finished
✨  Done in 17.96s.
```
{% endcode %}

### Configuration

| Property    | Type     | Description                                                             | Environment variable    | Default                            |
| ----------- | -------- | ----------------------------------------------------------------------- | ----------------------- | ---------------------------------- |
| `recordKey` | `string` | The organization's record key                                           | CURRENTS\_RECORD\_KEY   |                                    |
| `projectId` | `string` | The target project                                                      | CURRENTS\_PROJECT\_ID   |                                    |
| `ciBuildId` | `string` | The [CI Build ID](../../../guides/parallelization-guide/ci-build-id.md) | CURRENTS\_CI\_BUILD\_ID | Auto-generated                     |
| `reportDir` | `string` | Test results directory                                                  | `CURRENTS_REPORT_DIR`   | `.currents/[timestamp]-[uuidv4()]` |

### Troubleshooting

Set `DEBUG=currents*` before running `jest` to obtain detailed information about the reporter execution process.
