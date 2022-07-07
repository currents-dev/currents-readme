---
description: Cypress tests API Reference - Projects resource
---

# Projects

This is an object representing your Currents project. You can retrieve the list of projects for your organization, get specific project details, retrieve the list of runs for a project.

{% swagger method="get" path="projects" baseUrl="v1/" summary="List the projects associated with your organization" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="query" name="limit" type="1-50" %}
Pagination limit 1-50. Default 10.
{% endswagger-parameter %}

{% swagger-parameter in="query" name="starting_before" type="String" %}
Pagination cursor. See 

[pagination.md](../pagination.md "mention")


{% endswagger-parameter %}

{% swagger-parameter in="query" name="ending_after" type="String" %}
Pagination cursor. See 

[pagination.md](../pagination.md "mention")


{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Project Items" %}
```javascript
{
    "status": "OK",
    "has_more": false,
    "data": [{
        "projectId": "emdaGd", // project id
        "name": "Hello Currents", // project name
        "createdAt": "2022-01-14T16:15:18.852Z", // creation date
        "inactivityTimeoutSeconds": 7200, // timeout value
        "cursor": "61e1a196954ca800138aae97", // pagination cursor
        "failFast": true // enable fail-fast strategy
    }]
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="get" path="/projects/:projectId" baseUrl="v1" summary="Get project item" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="path" name="projectId" required="true" type="String" %}
ProjectId
{% endswagger-parameter %}
{% endswagger %}

\
