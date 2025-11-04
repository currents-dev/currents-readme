---
description: Currents Reporter for Node.js Testing Framework
---

# @currents/node-test-reporter

### Requirements <a href="#requirements" id="requirements"></a>

* **Node.js** `v18.20.4+`

### Setup

```bash
npm install @currents/node-test-reporter @currents/cmd --save-dev
```

### Usage

#### Run the Tests

Run Node.js and set `@currents/node-test-reporter`  reporter. The result is a refined JUnit XML that as the necessary information about the test results. More information is available [here](https://github.com/currents-dev/currents-reporter/blob/main/packages/node-test-reporter/README.md).

```bash
> node --test \
--test-reporter=@currents/node-test-reporter \
--test-reporter-destination=./report.xml \
**.test.mjs
```

#### Converting the Report

Run [currents-convert.md](../currents-cmd/currents-convert.md "mention") command to covert the generated report into a format compatible with Currents.&#x20;

```bash
> npx currents convert \
--framework=node \
--input-format=junit \
--input-file=./report.xml
```

#### Uploading the Results

Upload the results to Currents, specify the projectId and the [record-key.md](../../../guides/record-key.md "mention"). Read more about [currents-upload.md](../currents-cmd/currents-upload.md "mention") command.

```bash
npx currents upload --key=XXX --project-id=C3lBM6
```
