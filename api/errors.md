---
description: Cypress tests API Reference - error codes and responses
---

# Errors

Currents uses conventional HTTP response codes to indicate the success or failure of an API request. In general:&#x20;

* Codes in the `2xx` range indicate success.&#x20;
* Codes in the `4xx` range indicate an error that failed given the information provided (e.g., a required parameter was omitted, an operation failed, etc.).&#x20;
* Codes in the `5xx` range indicate an error with Currents' servers.

| HTTP Status                        | Summary                                                                                          |
| ---------------------------------- | ------------------------------------------------------------------------------------------------ |
| 200 - OK                           | Everything worked as expected.                                                                   |
| 400 - Bad Request                  | The request was unacceptable, often due to missing a required parameter.                         |
| 401 - Unauthorized                 | No valid API key provided.                                                                       |
| 402 - Request Failed               | The parameters were valid but the request failed.                                                |
| 403 - Forbidden                    | The API key doesn't have permissions to perform the request.                                     |
| 404 - Not Found                    | The requested resource doesn't exist.                                                            |
| 409 - Conflict                     | The request conflicts with another request                                                       |
| 429 - Too Many Requests            | Too many requests hit the API too quickly. We recommend an exponential backoff of your requests. |
| 500, 502, 503, 504 - Server Errors | <p>Something went wrong on Currents end.<br></p>                                                 |
