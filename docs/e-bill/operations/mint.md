# Mint

Minting turns a bill into e-cash before it matures. The holder takes the bill to a
[Wildcat mint](../../wildcat-mint/), gets a quote, and if they accept it the bill is endorsed to the
mint.

From the bill's point of view this is a transfer like any other. What is different is who receives
it and what they do with it afterwards.

## Who may perform it

The **holder**.

## Conditions

- The default rule: the bill can't be **blocked**, **recoursed to the end**, **only recoursable**,
  or **paid**.
- **The bill has to be accepted.**

That second condition is the only place in the protocol where acceptance is a prerequisite for
anything. A mint will not take an obligation the drawee has never acknowledged, and the protocol
enforces that rather than leaving it to each mint's policy.

The practical order is therefore fixed: [request acceptance](request-to-accept.md) →
[accept](accept.md) → mint.

## The two steps

Minting is an offer and an acceptance, like a [sale](sale.md), but the negotiation happens off the
bill:

1. **Request a quote.** The holder asks a mint to quote on the bill. This shares the bill with the
   mint so it can make a decision — *without* handing over the bill keys, so the mint can read the
   chain but not write to it. See [Sharing bills](../transport/sharing-bills.md).
2. **Accept the quote.** If the holder accepts, a `Mint` block is written and the bill is endorsed
   to the mint.

Between those steps the bill carries a **mint state** — `requested to mint` — visible only to the
current holder. See [Bill states](../concepts/bill-states.md).

## Result

A `Mint` block. The **mint becomes the holder**, with every holder action available to it. The
former holder becomes a **contingent** participant: still liable on the bill, and holding e-cash
instead of a bill.

The drawee now settles with the mint rather than with the original payee. Nothing about the drawee's
obligation changes — they owe the same sum on the same date to whoever holds the bill, and that is
now the mint.

## Why the mint can verify what it was given

When the holder later endorses the bill to the mint for real, the mint can compare it block by block
against the read-only copy it was shown when quoting — matching block hashes and plaintext hashes —
and confirm it is the same bill it priced. A holder cannot get a quote on one bill and deliver
another.

## What the mint does next

That is [Wildcat's side of the story](../../wildcat-mint/): the mint splits the bill's value into
e-cash units, each carrying the two attributes that matter — who owes it, and when it falls due.

## Next

- [Wildcat Mint](../../wildcat-mint/) — what happens to the bill after it is minted.
- [Sharing bills](../transport/sharing-bills.md) — how a mint reads a bill it does not own.
