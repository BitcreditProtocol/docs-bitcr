# Operations

Fourteen actions can be taken on a bill. Which are available to you depends on two things: the
roles you hold in that bill, and the state the bill is in.

These pages describe **action validation** only, meaning whether an action is possible for a given
participant. Whether the data is well-formed is a separate question, covered in
[Validation](../concepts/validation.md).

## Every action, by role

| Action | Who may take it | Writes a block? |
| --- | --- | --- |
| [`Issue`](issue.md) | the issuer | yes |
| [`RequestToAccept`](request-to-accept.md) | the holder | yes |
| [`Accept`](accept.md) | the payer | yes |
| [`RejectToAccept`](accept.md#rejecting-acceptance) | the payer | yes |
| [`RequestToPay`](request-to-pay.md) | the holder | yes |
| [`RejectToPay`](pay.md#rejecting-payment) | the payer | yes |
| Paying | the payer | **no**, see [Pay](pay.md) |
| [`Endorse`](endorse.md) | the holder | yes |
| [`OfferToSell`](sale.md) | the holder | yes |
| [`Sell`](sale.md#sell) | the holder | yes |
| [`RejectToBuy`](sale.md#rejecting-a-purchase) | the buyer | yes |
| [`Mint`](mint.md) | the holder | yes |
| [`RequestRecourse`](recourse.md#requesting-recourse) | the holder | yes |
| [`Recourse`](recourse.md#recourse) | the holder | yes |
| [`RejectToPayRecourse`](recourse.md#rejecting-a-recourse) | the recoursee | yes |

Roles are positions, not accounts. See [Roles](../concepts/roles.md). One identity holding two
roles simply gets both sets of actions.

## The conditions behind every row

Almost every precondition in the specification reduces to four states: **paid**, **recoursed to
the end**, **only recoursable** and **blocked**. Rather than restate them on every page, they are
defined once:

**→ [General conditions](../concepts/general-conditions.md)**

Read that page first. Without it the per-action conditions below look suspiciously short, and the
reason they are short is that the four conditions do most of the work in combination.

## The default rule

Six actions share exactly one precondition, the same one:

> The bill can't be **blocked**, **recoursed to the end**, **only recoursable**, or **paid**.

Those are `RequestToPay`, `Endorse`, `OfferToSell`, and, with one extra condition each,
`RequestToAccept`, `Mint`, `Accept` and `RejectToAccept`. Where a page says "the default rule", it
means this sentence.

## The three shapes an action has

Reading the operation pages is easier once you notice that all fourteen fall into three shapes:

**Requests** open a waiting state and set a deadline. `RequestToAccept`, `RequestToPay`,
`OfferToSell`, `RequestRecourse`. Each blocks the bill until it resolves.

**Resolutions** close a waiting state. `Accept`, `Sell`, `Recourse`, the payment arriving, and
every `Reject*`. Each requires its corresponding request to be the last block and still open.

**Transfers** hand the bill to someone else without any waiting state at all. `Endorse` is the
pure case; `Sell`, `Mint` and `Recourse` are transfers that happen to resolve a request first.

## Terminal outcomes

Three states end a bill's life, and two of them end it for everyone:

- **paid**: nothing further, by anyone.
- **recoursed to the end**: nothing further, by anyone; only a court can resolve it.
- **only recoursable**: ordinary circulation is over; only the recourse actions remain.
