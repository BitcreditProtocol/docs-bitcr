# Accept

Acceptance is the drawee acknowledging the obligation. It is the drawee's signature on the bill,
and it is what turns a bill drawn *on* someone into a debt owed *by* them.

## Who may perform it

The **payer** — the drawee named at issue.

## Conditions

- The default rule: the bill can't be **blocked**, **recoursed to the end**, **only recoursable**,
  or **paid**.
- The bill can't already be **accepted**.

## Acceptance does not require a request

Nothing in the conditions requires a [request to accept](request-to-accept.md) to have been made.
A drawee who intends to honour a bill can accept it unprompted.

The request exists for the holder's benefit, not the protocol's: it puts a deadline on the drawee
and gives the holder a recourse path if that deadline passes.

## Result

An `Accept` block. The bill is accepted, and unblocked if a request was open.

Two consequences follow immediately:

- The holder may now [mint](mint.md) the bill. Minting is the one action gated on acceptance.
- The acceptance path is closed permanently. An accepted bill cannot later be rejected —
  `RejectToAccept` requires that the bill is not already accepted.

## Rejecting acceptance

The drawee may refuse instead.

### Who may perform it

The **payer**.

### Conditions

`RejectToAccept` carries the same conditions as `Accept`:

- The default rule: the bill can't be **blocked**, **recoursed to the end**, **only recoursable**,
  or **paid**.
- The bill can't already be **accepted**.

Like acceptance, rejection does not require a request to have been made.

### Result

A `RejectToAccept` block, and the bill becomes **only recoursable**. From this point the sole
remaining actions are `RequestRecourse`, `Recourse` and `RejectToPayRecourse` — the bill cannot be
endorsed, sold, minted or requested to pay.

Rejecting acceptance is therefore not a neutral act. It does not merely decline a request; it ends
the bill's ordinary life and starts the process of allocating the loss up the endorsement chain.

## Special case: the drawee is also the holder

If the bill has been endorsed back to the drawee, that identity holds both roles and gets both sets
of actions. They can [request acceptance](request-to-accept.md) and then accept the same bill.

## Next

- [Request to pay](request-to-pay.md) — the next step for an accepted bill at maturity.
- [Mint](mint.md) — now unlocked.
- [Recourse](recourse.md) — the path after a rejection.
