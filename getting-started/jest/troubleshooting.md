---
description: Troubleshooting Jest integration with Currents
---

# Troubleshooting Jest

If you are experiencing issues with using `@currents/jest`, please collect more information about the failure and submit a support request via our support channels.&#x20;

### 1. Collecting Environment Information

Please collect the following information to help us effectively debug the problem:

* The associated dashboard Run URL
* Screenshots if applicable
* Your setup method and configuration files
* The exact command used to run Jest
* Environment information (use the command below)

Use the following command to print information about your CI environment

```bash
npx envinfo --system --binaries --browsers --npmPackages --duplicates --npmGlobalPackages
```

### 2. Activate Debug Mode

Set `DEBUG=currents*` before running `jest` to obtain detailed information about the reporter execution process.



For more details on how to troubleshoot Jest tests, refer to [their documentation](https://jestjs.io/docs/troubleshooting).
