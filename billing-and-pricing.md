---
description: How Currents Billing and Pricing Works
icon: comments-dollar
---

# Billing and Pricing

Currents has a flexible subscription-based billing model. It is designed to allow different types of customers to find a convenient plan that matches their needs.&#x20;

{% hint style="info" %}
All the plans incorporate volume discounts - as your usage increases, the cost per unit decreases.
{% endhint %}

### Pricing Components

The plans are based on the number of **test recordings** and the number of **team members.**

#### Test Recordings

Test recording is a result of running a [single test](#user-content-fn-1)[^1]. It includes:

* **Execution details** - test outcome, timing data, error details and metadata for all the included attempts;
* **Attachments** - screenshots, videos, trace files, performance reports and any other attachment.

Skipped[^2] recordings do not count for billing purpose. Number of attempts or the attachments volume for not affect billing.

#### Team Members

Every account associated with your organization is considered a team member for billing purposes. Each plan has a predetermined limit of seats (Team Members). You can purchase additional seats, up to 30 seats total, using [billing-and-usage.md](dashboard/administration/billing-and-usage.md "mention") section.&#x20;

If you need more seats please contact us at [hello@currents.dev](mailto:hello@currents.dev).

### Usage Estimation

For a ballpark estimate, count the number of `it` and `test` statements in your source code and multiply by average number of CI runs.

`Test Recording Volume` = `it or test statements` x `CI runs per month`&#x20;

To have a more accurate estimation, create a free trial account and start sending the test results, after a couple of days use the [billing-and-usage.md](dashboard/administration/billing-and-usage.md "mention") section to review your usage. Contact our team to extend your trial [hello@currents.dev](mailto:hello@currents.dev).

### Subscription Types

#### Monthly Subscriptions

You pay a monthly fee for the selected plan. For example consider a 10K plan that costs $49:

* we charge a $49 prepayment for the first 10K test recordings;
* we charge an Extra Usage fee for every additional 1K tests (or portion of it) at the end of usage cycle.

The usage cycle resets each month when you renew the subscription.

<table><thead><tr><th width="141.51953125">Month</th><th>Charge</th><th>End-of-month usage</th></tr></thead><tbody><tr><td>May 12</td><td>$49 prepayment for June</td><td>9K</td></tr><tr><td>June 12</td><td>$49 prepayment for June</td><td>12K</td></tr><tr><td>July 12</td><td>$49 prepayment for July<br>+$12 extra usage fee for the previous month</td><td>...and so on</td></tr></tbody></table>

**Annual Subscriptions**

You pay an annual fee (with a discount) for the selected plan. For example consider a 10K plan that costs $539/year:

* we charge a $539 prepayment for the 10K test recordings available each month;
* if you record more than 10K test recordings in any month, we will charge the Extra Usage fee for every additional 1K tests (or portion of it)  at the end of usage cycle.

<table><thead><tr><th width="158.0859375">Month</th><th>Charge</th><th>End-of-month usage</th></tr></thead><tbody><tr><td>May 12, 2024</td><td>$539 prepayment for the year</td><td>9K</td></tr><tr><td>June 12</td><td>-</td><td>12K</td></tr><tr><td>July 12</td><td>$12 extra usage fee for the previous month</td><td>...and so on</td></tr><tr><td>...</td><td></td><td></td></tr><tr><td>May 12, 2025</td><td>extra usage fees, if any</td><td>end of contract</td></tr></tbody></table>

The usage cycle resets each month on the day of subscription creation.

### Extra Seats

Each plan has a predetermined limit of seats (Team Members). You can purchase additional seats, up to 30 seats total, using [billing-and-usage.md](dashboard/administration/billing-and-usage.md "mention") section. If you need more seats please contact us at [hello@currents.dev](mailto:hello@currents.dev).

### Extra Usage

We will charge the Extra Usage fee for every additional 1K tests (or portion of it)  at the end of usage cycle. The price for the extra usage unit depends on the plan and varies.&#x20;

When your organization start incurring Extra Usage fee Currents sends a period email notification to organization owners with an alert. Additionally, you can set up usage warning in [billing-and-usage.md](dashboard/administration/billing-and-usage.md "mention") section of the dashboard.

Depending on the Usage and Billing Cycle (see below) and payment method, we will charge the fee on Monthly, Quarterly or Annual Basis.

{% hint style="info" %}
We recommend switching to a higher-tier plan to avoid incurring extra usage fees.&#x20;
{% endhint %}

### Enterprise Plans

Enterprise Plans allows customizing the terms and cadence of billing and usage cycle, in addition to premium support, unlimited seats and other contract customizations.

#### Usage Cycle vs Billing Cycle

* **Usage Cycle** - defines when usage counter resets. For example:
  * Monthly Usage Cycle resets every month, usually on subscription start day.
  * Annual Usage Cycle resets every year, usually on a contract renewal.
* **Billing Cycle -** defines how often we invoice or charge customers: monthly, annually or every couple of years. Usually Billing Cycle is bound to contracts renewal date.

You can mix different types of Usage Cycle and Billing Cycle based on your needs. For example:

<table><thead><tr><th width="131.97265625">Usage Cycle</th><th width="140.62890625">Billing Cycle</th><th>Description</th></tr></thead><tbody><tr><td>Monthly</td><td>Monthly</td><td>Standard month-to-month subscriptions. Not available for Enterprise Plans.</td></tr><tr><td>Monthly</td><td>Annual</td><td>You pay a discounted price in advance for the whole year, usage resets every month.</td></tr><tr><td>Annual</td><td>Annual</td><td>You pay in advance for the whole year and get a relatively big package of test records, the usage cycle resets at the end of the year. This option matches companies with varying usage patterns.</td></tr><tr><td>Annual</td><td>Monthly</td><td>Not supported.</td></tr></tbody></table>

{% hint style="info" %}
We can occasionally send an out-of-cycle invoices for Extra Usage or mid-term upgrades
{% endhint %}

#### Tiered Contract

We offer tiered contracts for better estimating the potential costs and reducing the paperwork overhead.&#x20;

With a tiered contract, we will activate a different tier as soon as you reach the previous tier's threshold. Each next tier has an embedded discount, you will know in advance the max potential amount you pay.&#x20;

For example, consider a 3-tier contract - the initial payment is $10,000 for 1MM test records. The next-tier charges kick in only if and after you exceed the previous tier threshold.&#x20;

| Tier   | Threshold         | Charge                                    |
| ------ | ----------------- | ----------------------------------------- |
| Tier 1 | 1MM test records  | $10,000 on subscription creation          |
| Tier 2 | 1.5MM test record | $4,000 after exceeded 1MM test records    |
| Tier 3 | 2MM test records  | $3,000 after exceeding 1.5MM test records |

### FAQ

#### What is a Test Result / Test Recording?

Test results is a`it()` or `test()` statement that was executed by a test runner and was sent to Currents, including all the attempts and artifacts.&#x20;

What Test Recordings are included for Billed Usage?

Skipped[^2] recordings do not count for billing purpose, we only count **passed or failed** test results.

#### What happens if I exceed the plan limits?

We will charge a small amount of Extra Usage fees for every 1K extra recording or portion of it. The exact amount depends on your plan and varies.

#### Are there limits on the number of team members I can have? <a href="#are-there-limits-on-the-number-of-team-members-i-can-have-3f" id="are-there-limits-on-the-number-of-team-members-i-can-have-3f"></a>

Up to 30 team members for non-enterprise plans. No limit for enterprise plans. If you need more seats please contact us at [hello@currents.dev](mailto:hello@currents.dev).

#### What kind of support is included in each tier? <a href="#what-kind-of-support-is-included-in-each-tier-3f" id="what-kind-of-support-is-included-in-each-tier-3f"></a>

* Non-enterpise plans: email + in-app chat during business hours
* Enterprise plans: 24/7 support, direct access to Slack and the product-engineering team

#### Is there a free plan?

Currents doesn't have a free plan.

#### How can I track my usage?

Use [billing-and-usage.md](dashboard/administration/billing-and-usage.md "mention") section to setup usage warnings. Additionally, Currents will send an automated emails when you start incurring Extra Usage fees. Our Customer Success team will reach out to your organization admins if you consistently exceed your plan limits or incur significant charges with a recommendation to update your plan.

#### Do you charge for data storage?

No, we don't. We periodically delete the data according to  [data-retention.md](resources/data-privacy/data-retention.md "mention") policy.

#### Do you discount bigger plans?

Yes, all of our plans have an embedded volume discount - the more you use the lower is the price per unit. For example:

* 10K plan PPU is $4.9 / 1K
* 150K plan PPU is 3.32 / 1K

Our custom plan have similar structure but are adjusted per-customer.

#### Are there discounts for annual or multi-year commitments? <a href="#are-there-discounts-for-annual-or-multi-year-commitments-3f" id="are-there-discounts-for-annual-or-multi-year-commitments-3f"></a>

Yes! We offer discounts for customers who choose to commit to annual or multi-year plans. This not only provides savings but also ensures budget predictability. Contact us at [hello@currents.dev](mailto:hello@currents.dev) for customized offers.

#### What payment methods do you accept? <a href="#are-there-discounts-for-annual-or-multi-year-commitments-3f" id="are-there-discounts-for-annual-or-multi-year-commitments-3f"></a>

Credit Card payments via Stripe. SWIFT and US ACH transfers. We are a registered vendor on popular procurement platforms like Airbase, Coupa, ZipHQ, Bill.com.



[^1]: test =`it()` or `test()` statement

[^2]: `it.skip()` or `test.skip()`&#x20;
