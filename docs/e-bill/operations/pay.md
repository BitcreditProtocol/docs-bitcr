# Pay

Paying is the one thing on a bill that is not an operation.

## No block is written

There is no `Pay` op code. The [fourteen block types](../content-of-bill/blockchain.md) do not
include one, and this is deliberate: **the payment happens in the background, on Bitcoin.** The
system watches for it and sets a flag on the bill when it arrives.

The consequence is worth stating plainly. Every other fact about a bill is established by somebody
signing a block that says so. Payment is established by money moving. It is the one outcome no
participant can assert into existence by writing to the chain.

## How the payer pays

The payer's client receives a **Pay** payment action carrying everything needed:

| Field | What it is |
| --- | --- |
| `type` | what the payment is for — `Pay`, `Sell` or `Recourse` |
| `receiver` | who is being paid: payee, seller, recourser or holder |
| `time_of_request` | when the request was made |
| `currency`, `sum` | what is owed |
| `link_to_pay` | a generated payment link |
| `address_to_pay` | the Bitcoin address to pay |
| `mempool_link_for_address_to_pay` | a mempool explorer link for tracking it |
| `tx_id` | the Bitcoin transaction id |
| `in_mempool` | whether it has been broadcast |
| `confirmations` | how many confirmations it has |
| `payment_deadline` | the deadline from the request |

The address is derived from the bill's key material rather than configured by anyone — see
[Bill id and keys](../content-of-bill/bill-id-and-keys.md).

## How the receiver checks

The receiving side gets a **Check Payment** action instead: the same fields for every current and
past payment, ordered latest first, plus the `sender`, a `private_descriptor_to_spend` for spending
the funds received, and a `status` — waiting, paid, rejected or expired — with timestamps.

Because it is a list, a participant who has been paid before on the same bill — a seller in an
earlier sale, a recourser in an earlier recourse — keeps that history.

## Once paid

The bill is **paid**, and no participant can do anything further with it. This is terminal, and it
is terminal for everyone: not "the holder is satisfied" but "the instrument is discharged".

## Rejecting payment

The payer may refuse instead.

### Who may perform it

The **payer**.

### Conditions

- The bill has to be **waiting for payment** — an unexpired, unrejected `RequestToPay` must be the
  last block.
- The bill can't be **waiting for sale** or **waiting for recourse**.
- The bill can't be **recoursed to the end**, **only recoursable**, or **paid**.

Unlike [rejecting acceptance](accept.md#rejecting-acceptance), rejecting payment *does* require a
request to be open. There is nothing to refuse until payment has been asked for.

There is one additional case the specification calls out: the payer may also reject if there was a
request to pay made **before** the maturity date which has since expired, provided the bill's own
payment deadline has not expired. This is the counterpart of the early-request rule in
[Request to pay](request-to-pay.md#requesting-before-maturity-behaves-differently) — the bill
unblocked, but the payer's ability to formally refuse has not lapsed with it.

### Result

A `RejectToPay` block, and the bill becomes **only recoursable**. The remaining actions are
`RequestRecourse`, `Recourse` and `RejectToPayRecourse`.

## Next

- [Recourse](recourse.md) — what happens when payment does not.
