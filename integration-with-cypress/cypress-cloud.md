---
description: Setup and usage instruction for cypress-cloud
---

# cypress-cloud

{% hint style="info" %}
Please refer to the most recent documentation published in the GitHub repository

[https://github.com/currents-dev/cypress-cloud](https://github.com/currents-dev/cypress-cloud)
{% endhint %}

{% hint style="warning" %}
**We are suspending our support of integration with Cypress starting from version 13**.&#x20;

We will continue to support [older versions of Cypress](https://currents.dev/readme/integration-with-cypress/alternative-cypress-binaries) and provide assistance to the affected customers. Please contact our support channels for details.

[Read more](https://currents.dev/posts/v13-blocking)
{% endhint %}

### Setup

Install the package:

```sh
npm install cypress-cloud
```

Create a new configuration file: `currents.config.js` in the project’s root, set the `projectId` and the record key obtained from [Currents](https://app.currents.dev/) or your self-hosted instance of Sorry Cypress:

```javascript
// currents.config.js
module.exports = {
  projectId: "Ij0RfK",
  recordKey: "xxx",
  // Sorry Cypress users - set the director service URL
  cloudServiceUrl: "http://cy.currents.dev",
};
```

Add `cypress-cloud/plugin` to `cypress.config.{j|t}s`

{% tabs %}
{% tab title="cypress.config.js" %}
```javascript
// cypress.config.js
const { defineConfig } = require("cypress");
const { cloudPlugin } = require("cypress-cloud/plugin");
module.exports = defineConfig({
  e2e: {
    // ...
    async setupNodeEvents(on, config) {
      const result = await cloudPlugin(on, config);
      return result;
    },
  },
});
```
{% endtab %}

{% tab title="cypress.config.ts" %}
```typescript
import { defineConfig } from "cypress";
import currents from "cypress-cloud/plugin";

export default defineConfig({
  e2e: {
    // ...
    async setupNodeEvents(on, config) {
      const result = await currents(on, config);
      return result;
    },
  }
});
```
{% endtab %}
{% endtabs %}

Add `cypress-cloud/support` to [cypress support](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Support-file) file

```typescript
require("cypress-cloud/support");
```

#### Setup with existing plugins

Please refer to our [collection of guides](https://github.com/currents-dev/cypress-cloud#configuration) for setting up `cypress-cloud` together with other plugins

### Usage

{% code overflow="wrap" %}
```sh
npx cypress-cloud --parallel --record --key your_key --ci-build-id hello-cypress-cloud
```
{% endcode %}

See all the available options `npx cypress-cloud --help`. Learn more about [CI Build ID](https://currents.dev/readme/guides/cypress-ci-build-id).

### Documentation

{% hint style="info" %}
Please refer to the most recent documentation published in the GitHub repository

[https://github.com/currents-dev/cypress-cloud](https://github.com/currents-dev/cypress-cloud)
{% endhint %}

