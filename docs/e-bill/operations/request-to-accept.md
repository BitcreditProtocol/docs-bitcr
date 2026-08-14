# Request to accept

Acceptance is the drawee putting their signature on the obligation. Requesting it asks them to.

A bill can circulate without ever being accepted, but an unaccepted bill is a weaker instrument:
the drawee has not yet acknowledged the debt, and a mint will not take one: [minting requires an
accepted bill](mint.md).

## Who may perform it

The **holder**.

## Conditions

- The default rule: the bill can't be **blocked**, **recoursed to the end**, **only recoursable**,
  or **paid**.
- The bill can't already be **accepted**.
- The bill can't already be **requested to accept**.

The last two conditions are stated explicitly here, unlike for most actions, because acceptance is
a one-shot path: once it has been requested, the request must resolve before anything else, and
once it has been accepted or rejected, that is final.

## Deadline

The holder sets a deadline. The floor is the **UTC end of day of the request plus 48 hours**; the
drawee cannot be given less than that to respond.

While the request is open the bill is **blocked**. Three things can resolve it:

| Outcome | Result |
| --- | --- |
| The drawee [accepts](accept.md) | the bill is accepted and unblocked |
| The drawee [rejects](accept.md#rejecting-acceptance) | the bill becomes **only recoursable** |
| The deadline expires | the bill becomes **only recoursable** |

Note the asymmetry with an offer to sell: an expired offer to sell simply unblocks the bill, but an
expired request to accept changes the bill's fate. From that point the only actions left are
recourse actions.

## Result

A `RequestToAccept` block, and a bill blocked waiting for acceptance.

## Next

- [Accept](accept.md): what the drawee does with the request.
- [Recourse](recourse.md): the path if acceptance is refused or the deadline passes.
