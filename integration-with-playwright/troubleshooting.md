---
description: Troubleshooting Playwright integration with Currents
---

# Troubleshooting

If you are experiencing issues with using `@currents/playwright`, please submit a support request either via in-app support chat.

Please collect the following information to help us effectively debug the problem:

* The associated dashboard run URL
* Screenshots if applicable
* Your setup method and configuration files
* The exact command used to run
* Environment information (use the command below)

```bash
npx envinfo --system --binaries --browsers --npmPackages --duplicates --npmGlobalPackages
```

* Activate debug mode and collect the logs

{% hint style="info" %}
Please capture and share the **whole** debug log - that will help the support person identify the root cause faster
{% endhint %}

{% tabs %}
{% tab title="pwc" %}
```
# on Linux
npx pwc --pwc-debug ... 

# on Windows
cmd /V /C npx pwc --pwc-debug ...
```
{% endtab %}

{% tab title="playwright test" %}
```
# on Linux
CURRENTS_PROJECT_ID=PROJECT_ID \ // the projectId from https://app.currents.dev
CURRENTS_RECORD_KEY=RECORD_KEY \ // the record key from https://app.currents.dev
CURRENTS_CI_BUILD_ID=hello-currents \ // a unique CI build ID
DEBUG=currents* \
npx playwright test

# on Windows
## - set the environment variables first
cmd /V /C ^
set DEBUG=currents* ^
set CURRENTS_PROJECT_ID=project_id&& ^
set CURRENTS_RECORD_KEY=record_key&& ^
set CURRENTS_CI_BUILD_ID=unique_build_id

## - the run the command
npx playwright test ...

## - examine environment variables using "set" command
```
{% endtab %}
{% endtabs %}
