# Sale

Selling a bill is a two-step transfer: the holder offers, and the sale completes only when the
buyer pays. The bill is blocked in between, so a bill cannot be offered to two buyers at once.

## Offer to sell

### Who may perform it

The **holder**, who becomes the **seller** for this sale.

### Conditions

- The default rule: the bill can't be **blocked**, **recoursed to the end**, **only recoursable**,
  or **paid**.

### Deadline

The seller names a buyer, a price, and a deadline. The floor here is lower than elsewhere: the
**UTC end of the same day**. A sale is a live negotiation, not a 48-hour obligation imposed on a
counterparty who never asked for it.

While the offer stands the bill is **blocked** — waiting for a sale — until payment, rejection or
expiry.

### Result

An `OfferToSell` block. The named buyer now has one action available to them,
[rejecting](#rejecting-a-purchase), and one payment action, paying for the bill.

## Sell

Completing the sale.

### Who may perform it

The **holder** — still the seller at this point.

### Conditions

- The bill has to be **waiting for sale**: an unexpired, unrejected `OfferToSell` must be the last
  block.
- The bill can't be **waiting for payment** or **waiting for recourse**.
- The bill can't be **recoursed to the end**, **only recoursable**, or **paid**.

### What triggers it

The buyer paying, within the deadline. Payment is detected on-chain rather than asserted — see
[Pay](pay.md) — and once detected, the `Sell` action becomes available to the seller.

### Result

A `Sell` block. The bill is endorsed to the buyer, who becomes the **holder** and inherits every
holder action. The seller becomes a **contingent** participant: no longer able to act, still liable
if the bill is dishonoured, and retaining a `Check Payment` view of the settlement they received.

## Rejecting a purchase

### Who may perform it

The **buyer** — specifically, the buyer named in the last unexpired `OfferToSell`, if that is the
last block.

### Conditions

- The bill has to be **waiting for sale**.
- The bill can't be **waiting for payment** or **waiting for recourse**.
- The bill can't be **recoursed to the end**, **only recoursable**, or **paid**.
- The bill can't already be **rejected to buy**.

A buyer can reject **once per offer**, and only while that offer is live.

### Result

A `RejectToBuy` block. The offer is invalidated and the bill is **unblocked**. The holder is
unchanged and free to offer it to someone else.

## If the deadline expires

The offer is invalidated and the bill is unblocked — the same outcome as a rejection, reached by
silence rather than refusal.

This is the mild kind of expiry. Compare [request to accept](request-to-accept.md) and
[request to pay](request-to-pay.md), where a lapsed deadline makes the bill **only recoursable**. A
failed sale costs the holder a sale; a failed acceptance or payment costs the bill its ordinary
life.

## Sale states are a list

A bill can be offered for sale many times over its life. Sale states are therefore kept as a list,
latest first, and each is visible to the seller and buyer of that particular sale — not to
participants who had no part in it. See [Bill states](../concepts/bill-states.md).

## Next

- [Endorse](endorse.md) — transferring a bill without a sale.
- [Mint](mint.md) — selling to a mint rather than to another business.
