# Endorse

Passing a bill on. The simplest of the transfers: one block, no waiting state, no payment.

## Who may perform it

The **holder**, who becomes the **endorser** of this endorsement.

## Conditions

- The default rule: the bill can't be **blocked**, **recoursed to the end**, **only recoursable**,
  or **paid**.

That is all. Endorsement does not require the bill to be accepted, does not set a deadline, and
does not wait for anything, which is what makes it the mechanism by which a bill circulates as
money rather than as a contract to be renegotiated at each step.

## Result

An `Endorse` block. The **endorsee becomes the holder** and inherits every holder action. The
endorsements count increases by one.

The endorser becomes a **contingent** participant: no longer able to act on the bill, but still
liable on it.

## Why endorsing is not free

Each endorser adds their own liability. A bill that has passed through five hands carries five
independent obligations to pay, and if the drawee dishonours it, the holder can claim against
earlier holders rather than being left with a bad debt.

That is the reason a circulated bill is *better* security than a fresh one, and the reason
[recourse](recourse.md) has an order to it: the claim travels back along the chain of people who
each, by endorsing, accepted that risk.

So an endorsement is a payment and a guarantee at once. The endorser has settled their own debt
with the instrument, and has underwritten it in doing so.

## Endorsing back to an earlier participant

Nothing prevents a bill being endorsed back to someone who held it before, including the drawee.
Two consequences:

- If the endorsee is the **drawee**, that identity now holds both holder and payer roles and gets
  both sets of actions: they can [request acceptance](request-to-accept.md) and then
  [accept](accept.md).
- For [recourse](recourse.md), a participant can only claim against holders who held the bill
  *before their own first time holding it*. Coming back round the chain does not enlarge the set of
  people you can recourse against.

## Next

- [Sale](sale.md): transferring for money rather than as payment.
- [Mint](mint.md): transferring to a mint for e-cash.
- [Recourse](recourse.md): what the endorsement chain is for when a bill goes bad.
