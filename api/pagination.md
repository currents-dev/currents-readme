---
description: Cypress tests API Reference - pagination and listing
---

# Pagination

All top-level API resources have support for bulk fetches via "list" API methods. For instance, you can list projects, list runs for a project.&#x20;

These list API methods share a common structure, taking optional parameters: `limit`, `starting_after`, and `ending_before`.

{% hint style="warning" %}
**Please note:** Listing parameters are mutually exclusive -- only one of `starting_after` or `ending_before` may be used.
{% endhint %}

| Parameter        | Description                                                                                                                  |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `limit`          | Limit the number of returned items. Valid values are **1 to 50**. The default value is **10**.                               |
| `starting_after` | Pagination cursor - if specified, the response will list items created before the pointed item.                              |
| `ending_before`  | Pagination cursor - if specified, the response will list items created after the pointed item on reverse chronological order |

### "List" API method responses

All "list" API methods responses have the `has_more` flag, every item of the requested type has a `cursor` field that can be used for pagination, for example:

```jsonp
// GET https://api.currents.dev/v1/projects/bAYZ41/runs

{
    "status": "OK",
    "has_more": true,
    "data": [
        {
            "runId": "9ee42e4b85c02c634fe30b26d728624e",
            "cursor": "62c538efcbd7fab8a5edb371",
            // ...
        }, {
            "runId": "9af7a261f148d1b45d013eec6a22902e",
            "cursor": "62baacbf9f4689a83d2b24cb",
            // ...
        },
        // ...
    ]
}
```

If `has_more` value is true, you can get additional items from the "list" API, using cursor-based pagination.

### Using items cursor for pagination

Currents' list API methods utilize cursor-based pagination via the `starting_after` and `ending_before` parameters. Both parameters take an existing pointer value (see below) and return objects in a particular order.&#x20;

* if `ending_before` specified - in reverse chronological order
* if `starting_after` is specified - in chronological order
* if none specified - in chronological order

The `ending_before` parameter returns items created before the pointed item. The `starting_after` parameter returns items listed after the pointed item.&#x20;

For example, giver a chronological ordered list of items in a DB and using `pointer1003` as a reference:

```
pointer1006
pointer1005
pointer1004
pointer1003 <
pointer1002
pointer1001
pointer1000
```

* `starting_after=pointer1003` would return

```
pointer1002
pointer1001
pointer1000
```

* `ending_before=pointer1003`would return (in reverse chronological order)

```
pointer1004
pointer1005
pointer1006
```
