---
description: How Currents Billing and Pricing Works
icon: comments-dollar
---

# Plans & Pricing

Currents has a flexible subscription-based billing model. It is designed to allow different types of customers to find a convenient plan that matches their needs.

{% hint style="info" %}
All the plans incorporate volume discounts - as your usage increases, the cost per unit decreases.
{% endhint %}

## Pricing Components

The plans are based on the number of **test recordings** and the number of **team members.**

#### Test Recordings

Test recording is a result of running a [single test](#user-content-fn-1)[^1]. It includes:

* **Execution details** - test outcome, timing data, error details and metadata for all the included attempts;
* **Attachments** - screenshots, videos, trace files, performance reports and any other attachment.

Skipped[^2] recordings do not count for billing purpose. Number of attempts or the attachments volume do not affect billing.

#### Team Members

Every non-guest account associated with your organization is a team member for billing purposes. Scale and Business plans include up to 50 team members.

[Guest accounts](administration/manage-team.md) are read-only. They do not count toward your limit and are free and unlimited.

Enterprise plans support custom seat arrangements.

## Usage Estimation

For a ballpark estimate, count the number of `it` and `test` statements in your source code and multiply by average number of CI runs.

`Test Recording Volume` = `it or test statements` x `CI runs per month`

To have a more accurate estimation, create a free trial account and start sending the test results, after a couple of days use the [usage-and-spend-control.md](usage-and-spend-control.md "mention") section to review your usage. Contact our team to extend your trial [hello@currents.dev](mailto:hello@currents.dev).

## Subscription Types

### Plans

Currents offers three plan types:

* **Scale** provides the core product through self-service. It supports tiers from 10K to 500K test recordings per month.
* **Business** provides self-service access to enterprise features, including SSO and SCIM.
* **Enterprise** provides custom contracts, dedicated Slack support, and other custom arrangements.

### Monthly Subscriptions

You pay a monthly fee for the selected plan. Your plan includes a monthly test recording allowance.

If you exceed that allowance, the extra usage has the same per-test rate as your plan. You can control extra usage limits, see more at [usage-and-spend-control.md](usage-and-spend-control.md "mention")

The usage cycle resets each month when you renew the subscription.

{% hint style="info" %}
Higher tiers provide a lower per-test rate through volume discounts.
{% endhint %}

### **Annual Subscriptions**

You pay an annual fee for the selected plan and receive a big discount, equivalent to two months free.

Your annual allowance is pooled across the year. For example, the 10K tier on a yearly plan includes 120K test recordings for the year.

This lets you use more recordings during busy months and fewer during quieter months. Extra usage applies only after you use the annual allowance.

The usage cycle resets each year on the day of subscription creation.

### Extra Usage

Extra usage is billed at the same per-test rate as your selected plan. It does not carry a higher rate.

When your organization starts incurring extra usage, Currents sends a periodic alert to organization owners. You can also configure usage warnings in the [usage-and-spend-control.md](usage-and-spend-control.md "mention") dashboard section.

You can upgrade mid-cycle if you consistently exceed your allowance. Extra usage is recalculated against the new tier's limit and rate, allowing you to pay less.

### Capping Extra Usage

If your organization uses an extra usage plan, you can cap how much usage beyond the plan limit is allowed before Currents stops recording new results.

To configure it, go to **Billing & Usage** and enable **Limit extra usage**. Then set **Extra usage cap %**.

<figure><img src="../../.gitbook/assets/CleanShot 2026-04-15 at 00.59.11@2x.png" alt="Limit extra usage settings with the toggle enabled, Extra usage cap % set to 50, and a preview reading &#x22;Recording will stop after 1,500,000 tests (Plan limit 1,000,000 + 500,000)&#x22;"><figcaption><p>Limit extra usage - Billing &#x26; Usage settings</p></figcaption></figure>

The cap is calculated as a percentage of your plan limit:

* `0%` means Currents will stop recording as soon as you go over the included plan limit.
* `50%` means Currents will allow up to 50% extra usage beyond the plan limit before stopping recording.
* Example: if your plan includes `10,000` tests or runs and the cap is `50%`, recording stops after `15,000` total tests or runs.

When the cap is reached, your CI pipelines and test runners continue running, but Currents pauses recording until one of the following happens:

* the current usage cycle resets
* you increase or remove the cap
* you upgrade your plan

## Enterprise Plans

Enterprise plans support custom contracts, dedicated Slack support, and custom billing, usage, and seat arrangements.

### Usage Cycle vs Billing Cycle

* **Usage Cycle** - defines when usage counter resets. For example:
  * Monthly Usage Cycle resets every month, usually on subscription start day.
  * Annual Usage Cycle resets every year, usually on a contract renewal.
* **Billing Cycle -** defines how often we invoice or charge customers: monthly, annually or every couple of years. Usually Billing Cycle is bound to contracts renewal date.

You can mix different types of Usage Cycle and Billing Cycle based on your needs. For example:

{% hint style="info" %}
We can occasionally send an out-of-cycle invoices for Extra Usage or mid-term upgrades
{% endhint %}

### Tiered Contract

We offer tiered contracts for better estimating the potential costs and reducing the paperwork overhead.

With a tiered contract, we will activate a different tier as soon as you reach the previous tier's threshold. Each next tier has an embedded discount, you will know in advance the max potential amount you pay.

For example, consider a 3-tier contract - the initial payment is $10,000 for 1MM test records. The next-tier charges kick in only if and after you exceed the previous tier threshold.

## FAQ

### What is a Test Result / Test Recording?

Test results is a`it()` or `test()` statement that was executed by a test runner and was sent to Currents, including all the attempts and artifacts.

What Test Recordings are included for Billed Usage?

Skipped[^2] recordings do not count for billing purpose, we only count **passed or failed** test results.

#### What happens if I exceed the plan limits?

Extra usage is billed at the same per-test rate as your plan. You can upgrade mid-cycle to apply a higher tier's allowance and rate immediately.

#### Are there limits on the number of team members I can have? <a href="#are-there-limits-on-the-number-of-team-members-i-can-have-3f" id="are-there-limits-on-the-number-of-team-members-i-can-have-3f"></a>

Read-only [guest accounts](administration/manage-team.md) are free and unlimited.

Scale and Business plans include up to 50 team members. Enterprise plans support custom seat arrangements.

### What kind of support is included in each tier? <a href="#what-kind-of-support-is-included-in-each-tier-3f" id="what-kind-of-support-is-included-in-each-tier-3f"></a>

* Non-enterprise plans: email + in-app chat during business hours
* Enterprise plans: 24/7 support, direct access to Slack and the product-engineering team

### Is there a free plan?

Currents doesn't have a free plan.

### How do upgrades work?

When upgrading your plan, the change will be effective immediately and you'll be billed a prorated amount by Stripe.

We consider an upgrade any move from monthly to yearly plans, or any move where the spend is higher. The proration will fully refund the amount charged for your previous plan, and charge the full amount of the new plan. We don't do time-based proration as our pricing is based on usage. &#x20;

### How do downgrades work?

When downgrading your plan. the change is not effective immediately. Downgrades are scheduled to happen at the end of your billing cycle. You can cancel a scheduled downgrade anytime before it's effective.&#x20;

We consider a downgrade any move from yearly to monthly plans, or any move where the spend is lower. There's no proration on downgrades, as they happen after you fully utilize your current plan.&#x20;

If you have specifics needs to change your plan immediately to something our system considers a downgrade, please reach out to us to discuss your options.

### Is there a free plan?

Currents doesn't have a free plan.

### How can I track my usage?

Use [usage-and-spend-control.md](usage-and-spend-control.md "mention") section to setup usage warnings. Additionally, Currents will send an automated emails when you start incurring Extra Usage fees. Our Customer Success team will reach out to your organization admins if you consistently exceed your plan limits or incur significant charges with a recommendation to upgrade your plan.

### Do you charge for data storage?

No, we don't. We periodically delete the data according to [data-retention.md](../resources/data-privacy/data-retention.md "mention") policy.

### Do you discount bigger plans?

Yes, all of our plans have an embedded volume discount - the more you use the lower is the price per unit. For example:

* 120K Scale (yearly) PPU is $4.08 / 1K
* 6M Scale (yearly) PPU is $1.65 / 1K

Our custom plans have similar structure but are adjusted per-customer.

### Are there discounts for annual or multi-year commitments? <a href="#are-there-discounts-for-annual-or-multi-year-commitments-3f" id="are-there-discounts-for-annual-or-multi-year-commitments-3f"></a>

Yes! We offer discounts for customers who choose to commit to annual or multi-year plans. This not only provides savings but also ensures budget predictability. Contact us at [hello@currents.dev](mailto:hello@currents.dev) for customized offers.

### What payment methods do you accept? <a href="#are-there-discounts-for-annual-or-multi-year-commitments-3f" id="are-there-discounts-for-annual-or-multi-year-commitments-3f"></a>

Credit Card payments via Stripe. SWIFT and US ACH transfers. We are a registered vendor on popular procurement platforms like Airbase, Coupa, ZipHQ, Bill.com.

[^1]: test =`it()` or `test()` statement

[^2]: `it.skip()` or `test.skip()`
