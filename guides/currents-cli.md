---
description: Using currents CLI tool for running cypress tests with Currents dashboard
---

# Currents CLI

`currents` is a lightweight executable script - it integrates with `cypress` and allows running cypress with Currents as a parallelization and recording dashboard. The script is available in `@current/cli` npm package.

{% hint style="success" %}
**Please note:** `currents` requires `cypress` to be installed - so you will need to get both packages from NPM

```
npm install @currents/cli cypress
```
{% endhint %}

{% hint style="info" %}
**Please note:** `currents` CLI is intended to be used in CI environments, using it for running cypress tests interactively is not recommended&#x20;
{% endhint %}

### Using `currents`

Use `currents` the same way you're using `cypress` command. It accepts exactly the same flags. In fact, `currents` is just running `cypress` behind the scenes.

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
  info [options]     Prints Cypress and system information
```

Behind the scenes, `currents` CLI tool changes the configuration of cypress runner to use Currents servers (https://cy.currents.dev) for parallelization and recordings.

### Currents CLI Compatibility

Sometimes Cypress.io team changes the internal architecture of cypress installation, which introduces a breaking change for integration with currents.&#x20;

Please use the table below to figure out the compatibility between `@currents/cli` and `cypress`

| Cypress | @currents/cli |         cy2 | @currents/nx |
| ------- | ------------: | ----------: | -----------: |
| 11.0.0+ |        3.0.0+ |      3.2.0+ |       0.1.0+ |
| 6.7.0+  |   any version | any version |  any version |

### Additional tools within `@currents/cli`

The package contains a few other utilities:

* `currents-prepare` - reconfigures cypress to use Currents dashboard without automatically launching cypress runner
* `currents-reset` - restores the original Cypress runner configuration

### Using `currents-prepare` CLI

`currents-prepare` can be useful when you need to invoke custom scripts that run `cypress` behind the scenes.&#x20;

For example: let's say you have a custom script that's starting cypress via its [Module API](https://docs.cypress.io/guides/guides/module-api). Before running the custom script, you'd run `currents-prepare.` It will change cypress configuration to use Currents Dashboard:

```
npm install @currents/cli cypress-repeat
npx currents-prepare
npx cypress-repeat ...
```

### `@currents/cli` API

`@currents/cli` exposes an [API](https://github.com/currents-dev/cli#example-api-usage) for programmatic invocation. For example:

```javascript
#!/usr/bin/env node

const { patch } = require('@currents/cli');
const cypress = require('cypress');

async function main() {
  // 
  await patch();
  // run Cypress as usual
  await cypress.run({
    // Cypress config goes here
  })
  
}

main().catch(console.error);
```

### Uninstalling currents

Currents executable script does not permanently change cypress' runner configuration - it temporarily modifies the configuration only for the current invocation. In other words, you can keep using cypress as usual after installing currents.

However, older versions of @currents/cli used to permanently modify cypress installation. Use one of the following methods for restoring the original cypress configuration and removing Currents from cypress package:

* Run `npx currents-reset`  from `@currents/cli` npm package to restore the original configuration
* Remove the [cached Cypress binaries](https://docs.cypress.io/guides/references/advanced-installation#Binary-cache)
* Run `cypress install --force` to install a fresh version of cypress binaries
* Reinstall cypress npm package from scratch

{% hint style="warning" %}
**MacOS Ventura Users**

Running the commands in an interactive shell (or VSCode) can fail with`EPERM: operation not permitted` error.

You need to explicitly allow the shell app (or VSCode) to modify other applications.

Add the app to the App Management allowed list to stop the error.

**Mac OS Settings > Privacy and Security > App Management**

****![](<../.gitbook/assets/CleanShot 2022-11-03 at 00.04.10@2x.png>)****
{% endhint %}
