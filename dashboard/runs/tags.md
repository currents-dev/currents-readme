---
description: Using Tags in Currents Dashboard
---

# Tags

{% hint style="info" %}
Read the  [playwright-tags.md](../../guides/playwright-tags.md "mention") guide
{% endhint %}

Tagging is a convenient way to augment your executions with extra data that can be helpful for managing your tests. You can tag the runs (executions) by adding `--tag tagA,tagB` flag.

For example, running the next command `@currents/playwright` (version 1.7.0+):

{% code overflow="wrap" %}
```
npx pwc --key RECORD_KEY --project-id PROJECT_ID --ci-build-id CI_BUILD_ID --tag run, tagA, tagB
```
{% endcode %}

or for Cypress:

```
cypress-cloud run --parallel --record --tag run, tagA, tagB 
```

would generate a run with the corresponding tags:

<figure><img src="../../.gitbook/assets/Screenshot 2026-01-16 at 13.33.58.png" alt=""><figcaption><p>Tagged run example</p></figcaption></figure>

The run, spec and test execution recordings will inherit the tags. You can use the tags as a filter when browsing the dashboard to narrow down the results, for example:

* filter runs by tags
* filter insights and analytics to only include records with a particular tag
* filter errors, tests and spec performance explorers to only include records with a particular tag

The tags are also available as part of [http-webhooks.md](../../resources/integrations/http-webhooks.md "mention") payload.

<figure><img src="../../.gitbook/assets/Screenshot 2026-01-16 at 13.37.05.png" alt=""><figcaption><p>Example of filtering Run Status Metrics by Tags</p></figcaption></figure>
