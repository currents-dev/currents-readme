---
description: Troubleshooting Currents integration with Cypress
---

# Troubleshooting Cypress

{% hint style="warning" %}
**We are suspending our support of Cypress test runner version 13+**

We will continue to support [prior versions](integrating-with-cypress/alternative-cypress-binaries.md) of Cypress.

[Read more](https://currents.dev/posts/v13-blocking)
{% endhint %}

If you are experiencing issues with using `@currents/cli` or `cypress-cloud`, please submit a support request either via in-app support chat or on GitHub:

* [@currents/cli GitHub Issues](https://github.com/currents-dev/cli/issues)
* [cypress-cloud GitHub Issues](https://github.com/currents-dev/cypress-cloud/issues)

Please collect the following information to help us effectively debug the problem:

* The associated dashboard run URL
* Screenshots if applicable
* The exact command used to run `currents` or `cypress-cloud`
* Configuration files (`cypress.config.{jt}s` and `currents.config.js`)
* CI environment information (use the command below)

```bash
npx envinfo --system --binaries --browsers --npmPackages --duplicates --npmGlobalPackages
```

* Activate debug mode and collect the logs

{% hint style="info" %}
Please capture and share the **whole** debug log - that will help the support person identify the root cause faster
{% endhint %}

### Enabling `DEBUG` mode for `cypress-cloud@1.9.0+`

Starting from version 1.9.0 `cypress-cloud` provides a CLI flag for activating the debug mode.&#x20;

```
npx cypress-cloud run ... --cloud-debug
```

You can specify the scope of debug messages printed

* `true | all` show all debug messages
* `cypress` activate debug mode for cypress only
* `currents` activate the debug mode for currents only
* `commit-info` activate the debug mode for git commit info only

### Enabling DEBUG mode for `@currents/cli` and `cypress-cloud < 1.9.0`

{% tabs %}
{% tab title="cypress-cloud" %}
```
# on Linux
DEBUG=currents:*,cypress:* npx cypress-cloud run ...

# on Windows
cmd /V /C "set DEBUG=currents:*,cypress:*&& npx cypress-cloud run ..."
```
{% endtab %}

{% tab title="@currents/cli" %}
```
# on Linux
DEBUG=cy2*,cypress:* npx currents run ...

# on Windows
cmd /V /C "set DEBUG=cy2*,cypress:*&& npx currents run ..."
```
{% endtab %}
{% endtabs %}
