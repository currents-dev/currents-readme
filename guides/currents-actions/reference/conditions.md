# Conditions

### Rule Conditions

A Rule is configured with one or more match conditions.  When the conditions match the Rule's Action will be applied. You can set whether all conditions must match, or just one of the conditions.

Conditions can be matched against the following test data:

<table><thead><tr><th width="385">Field</th><th>Description</th></tr></thead><tbody><tr><td>File</td><td>The filename for the test</td></tr><tr><td>Test Title</td><td>The title of the test</td></tr><tr><td>Test Title Path</td><td>The full title path including named <code>describe</code> statements</td></tr><tr><td>Project</td><td>The Playwright project's name (from your Playwright config)</td></tr><tr><td>Test ID</td><td>The Paywright test id. (This is unique for each test per-project)</td></tr><tr><td>Tags</td><td>Test tags</td></tr><tr><td>Git Author Email</td><td>Email that authored the git commit</td></tr><tr><td>Git Author Name</td><td>Name that authored the git commit</td></tr><tr><td>Git Branch</td><td>Git branch the test was run on</td></tr><tr><td>Git Message</td><td>Message of the git commit</td></tr><tr><td>Git Remote Origin</td><td>The git remote the test was synced from</td></tr></tbody></table>

We support the following operators when evaluating your conditions:

| Operator | Description                                                            |
| -------- | ---------------------------------------------------------------------- |
| is       | Matches when the value is an exact match                               |
| is not   | Matches when the value is different than                               |
| in       | Matches when one of the values (separated by commas) is an exact match |
| not in   | Matches when all values are different than                             |
| is any   | Matches when any value exists                                          |
| is empty | Matches when the field has no value                                    |

