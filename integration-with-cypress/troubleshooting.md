# Troubleshooting

If you are experiencing issues with using @currents/cli or cypress-cloud, please submit a support request either via in-app support chat or on GitHub:

* [@currents/cli GitHub Issues](https://github.com/currents-dev/cli/issues)
* [cypress-cloud GitHub Issues](https://github.com/currents-dev/cypress-cloud/issues)

Please collect the following information to help us effectively debug the problem  Share the output as part of a ticket or conversation with a support person.

{% hint style="info" %}
Please capture and share the **whole** debug log - that will help the support person identify the root cause faster
{% endhint %}

* Get the (CI) environment information&#x20;

```bash
npx envinfo --system --binaries --browsers --npmPackages --duplicates --npmGlobalPackages
```

* Activate debug mode and collect the logs

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
