---
description: Using currents CLI tool for running cypress tests with Currents dashboard
---

# Currents CLI

`currents` CLI tool is a lightweight wrapper for `cypress` command. It allows running cypress tests whiel using Currents dashboard for parallelization and recording of the tests.

`@current/cli` tool provides two executable scripts:

* `currents` - reconfigures cypress to use Currents dashboard **and** launches cypress runner
* `currents-prepare` - reconfigures cypress to use Currents dashboard without automatically launching cypress runner.&#x20;

{% hint style="info" %}
**Please note:**`currents` needs `cypress` to work correctly - so you will need to install both packages from NPM

```
npm install @currents/cli cypress
```
{% endhint %}

### Using `currents` CLI

Use `currents` the same way you're using `cypress` command - it accepts exactly the same flags. In fact, `currents` is just running `cypress` behind the scenes.

```
$ npx currents --help                                                                             ✖ ✹ ✭

[currents] Running cypress with API URL: https://cy.currents.dev

Usage: cypress <command> [options]

Options:
  -v, --version      prints Cypress version
  -h, --help         display help for command

Commands:
  help               Shows CLI help and exits
  version            prints Cypress version
  open [options]     Opens Cypress in the interactive GUI.
  run [options]      Runs Cypress tests from the CLI without the GUI
  open-ct [options]  Opens Cypress component testing interactive mode.
  run-ct [options]   Runs all Cypress Component Testing suites
  install [options]  Installs the Cypress executable matching this package's version
  verify [options]   Verifies that Cypress is installed correctly and executable
  cache [options]    Manages the Cypress binary cache
  info [options]     Prints Cypress and system informationbas
```

{% hint style="info" %}
**Please note:** `currents` CLI is intended to be used in CI environments, using it for running cypress tests interactively is not recommended&#x20;
{% endhint %}

Behind the scenes, `currents` CLI tool changes the configuration of cypress runner to use Currents servers (https://cy.currents.dev) for parallelization and recordings.

### Using `currents-prepare` CLI

`currents-prepare` can be useful when you need to invoke custom scripts that run `cypress` behind the scenes.&#x20;

For example: let's say you have a custom script that's starting cypress via its [Module API](https://docs.cypress.io/guides/guides/module-api). Before running the custom script, you'd run `currents-prepare.` It will patch cypress to use Currents Dashboard:

```
npm install @currents/cli cypress-repeat
npx currents-prepare
npx cypress-repeat ...
```

### How to use `@currents/cli` programmatically?

`@currents/cli` package uses [https://www.npmjs.com/package/cy2](https://www.npmjs.com/package/cy2) behind the scenes. It reconfigures cypress runner to use a different dashboard service.

You can also use `cy2` directly and specify `https://cy.currents.dev` as an alternative dashboard.&#x20;

For example:

```javascript
#!/usr/bin/env node

const { patch } = require('cy2');
const cypress = require('cypress')

async function main() {
  await patch('https://cy.currents.dev');
  // run Cypress as usual
  await cypress.run({
    // Cypress config goes here
  })
  
}

main().catch(console.error);
```

### How to revert the changes to Cypress configuration?

Remove `cypress` NPM package and reinstall it from scratch, restoring the original cypress configuration.
