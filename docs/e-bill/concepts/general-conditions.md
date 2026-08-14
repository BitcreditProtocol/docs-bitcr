# General conditions

Four conditions gate almost every action on a bill. They are stated once here because the
operation pages reference them constantly, and because most of the preconditions in the
specification are *only* these conditions — nothing more specific is spelled out.

## The four conditions

### paid

The bill has been paid. **No further action is possible by any participant.** This is terminal.

### recoursed to the end

The bill was recoursed back through the endorsement chain until the current holder had no
earlier holder left to claim against. **No further action is possible by any participant.** The
bill is permanently blocked and can only be resolved in court.

### only recoursable

The bill was **rejected to pay**, **rejected to accept**, or its **payment** or **acceptance
deadline expired**. From this point the only actions available are `RequestRecourse`, `Recourse`
and `RejectToPayRecourse`. Ordinary circulation is over; what remains is assigning the loss.

### blocked

The bill is in a *waiting state* — something has been requested and has not yet resolved. While
blocked, the only actions permitted are the ones that resolve the wait:

| Waiting for | Triggered by | Resolved by |
| --- | --- | --- |
| Payment | `RequestToPay` | payment arriving, `RejectToPay`, or the deadline expiring |
| A sale | `OfferToSell` | `Sell`, `RejectToBuy`, or the deadline expiring |
| A recourse | `RequestRecourse` | `Recourse`, `RejectToPayRecourse`, or the deadline expiring |

## Why the preconditions look so short

The specification lists `RequestToPay`'s only condition as "the bill can't be **blocked**,
**recoursed to the end**, **only recoursable**, or **paid**" — and says nothing about not
requesting payment twice. That is not an omission.

A `RequestToPay` can only end in one of three ways: the bill gets paid (**paid**), the deadline
passes (**only recoursable**), or the payer rejects (**only recoursable**). Until one of those
happens the bill is **blocked**. So every possible outcome of a first request already trips one
of the four conditions, and a second request is impossible without any rule saying so.

Read the conditions this way throughout: they are usually load-bearing in combination, not
individually.

## Deadlines

Three actions set a deadline, and the protocol enforces a floor on how soon it can fall:

| Action | Earliest permitted deadline |
| --- | --- |
| `OfferToSell` | UTC end of the same day |
| `RequestToAccept` | UTC end of day of the request **plus 48 hours** |
| `RequestToPay` | UTC end of day of the request **plus 48 hours** |
| `RequestRecourse` | UTC end of day of the request **plus 48 hours** |

The requester chooses the deadline; the floor stops them choosing one their counterparty cannot
realistically meet.

What expiry does depends on the action:

- **Offer to sell expires** — the offer is invalidated and the bill is unblocked. Circulation
  continues as before.
- **Request to recourse expires** — the bill is unblocked and can be requested to recourse
  again.
- **Request to accept or to pay expires** — the bill becomes **only recoursable**. This is the
  one case where a deadline passing changes the bill's fate rather than just releasing it.

### The maturity-date subtlety in `RequestToPay`

If payment is requested **before** the bill's maturity date, the bill is blocked until the
requested deadline, and when that deadline passes the bill simply unblocks. The real expiry in
that case is **48 hours after the maturity date**, at UTC end of day — not the deadline the
requester set.

If payment is requested **after** maturity, the deadline is exactly the one the requester set.

## Special case: holder is also the payer

If one identity is both the current holder and the payer — for example because the bill was
endorsed back to the drawee — they may perform both holder and payer actions. They can
`RequestToAccept` and then `Accept` the same bill.
