---
description: Running cypress tests in parallel with Currents for NX projects
---

# NX

{% hint style="info" %}
Please note:

The instructions below apply **@currents/nx 2.0.0+**
{% endhint %}

### Running cypress tests in NX project with Currents

[Nx](https://github.com/nrwl/nx) is a build system with monorepo support and powerful integrations. You can run cypress tests on Currents using [`@currents/nx` plugin](https://www.npmjs.com/package/@currents/nx) and defining a few configuration options.

### Example

See [https://github.com/currents-dev/currents-nx](https://github.com/currents-dev/currents-nx) for an example installation and configuration

### Setting up cypress with NX

First, install `@currents/nx` npm package.

```
npm i --save-dev @currents/nx
```

Add `currents` target to your project configuration.

```json
{
  "targets": {
    "currents": {
      "executor": "@currents/nx:currents",
      "options": {
        "record": true,
        "parallel": true,
        "cypressConfig": "apps/app-e2e/cypres.config.ts",
        "devServerTarget": "my-react-app:serve",
        "testingType": "e2e"
      }
    }
  }
}

```

Create a new configuration file: `currents.config.js` next to `cypress.config.{jt}s`

```javascript
// currents.config.js
module.exports = {
  // Set the `projected` and the record key obtained from https://app.currents.dev or your self-hosted instance of Sorry Cypress
  projectId: 'IfERfK',
  // Sorry Cypress users - set the director service URL
  cloudServiceUrl: 'https://cy.currents.dev',
};
```

Add `cypress-cloud/plugin` to `cypress.config.{js|ts|mjs}`

```typescript
import { nxE2EPreset } from '@nrwl/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';
import cloudPlugin from 'cypress-cloud/plugin';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__dirname, {
      bundler: 'vite',
    }),
    specPattern: './src/**/*.cy.ts',
    setupNodeEvents(on, config) {
      return cloudPlugin(on, config);
    },
  },
});
```

### Usage

```
npx nx run web-e2e:currents --key <recordKey> --ci-build-id hello-currents-nx
```

* Update your `currents.config.js` file with `projectId` obtained at [https://app.currents.dev](https://app.currents.dev/)
* Use the record key obtained at [https://app.currents.dev](https://app.currents.dev/)
* Learn more about [cypress-ci-build-id.md](../guides/cypress-ci-build-id.md "mention")
