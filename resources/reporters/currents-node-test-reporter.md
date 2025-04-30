---
description: Currents reporter for Node JS
---

# @currents/node-test-reporter

#### Requirements <a href="#requirements" id="requirements"></a>

* **Node.js** `v18.20.4+`

### Setup

```bash
npm install @currents/node-test-reporter @currents/cmd --save-dev
```

### Usage

*   Executing tests and generating reports with the `@currents/node-test-reporter`.\
    The result is a JUnit XML file compatible with the Currents API.\
    You can find more information [here](https://github.com/currents-dev/currents-reporter/blob/main/packages/node-test-reporter/README.md).\


    ```
    node --test --test-reporter=@currents/node-test-reporter --test-reporter-destination=./report.xml **.test.mjs
    ```
*   Converting the report into a format that Currents servers can process.\
    You can find more information about the convert command [here](https://docs.currents.dev/resources/reporters/currents-cmd/currents-convert).\


    ```
    npx currents convert --input-format=junit --input-file=./report.xml --framework=node
    ```
*   Uploading results to the server.\
    You can find more information about the upload command [here](https://docs.currents.dev/resources/reporters/currents-cmd/currents-upload).\


    ```
    npx currents upload --key=XXX --project-id=C3lBM6
    ```



***
