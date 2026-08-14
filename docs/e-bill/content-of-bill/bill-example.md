# Bill example

A worked example, read end to end. The identifiers below are the testnet examples from the
specification; the parties and amounts are illustrative.

## The trade

A cotton exporter in Austria ships to a textile mill in Singapore on 90 days' credit. Rather than
wait, the exporter draws a bill on the mill and pays their own supplier with it.

- **Drawer** — the exporter, who issues the bill
- **Drawee** — the mill, which owes for the goods
- **Payee** — the exporter's supplier, who will be paid

Drawee and payee differ, and the drawee pays the payee, so this is a `ThreeParties` bill — the
classic draft.

## The bill as issued

| Field | Value |
| --- | --- |
| Id | `bitcrtGgLTAAVDYaoPC5b45MVzdmMBhTNm5AHtm6izEquzWdDV` |
| Type | `ThreeParties` (2) |
| Drawer | the exporter, an identified party |
| Drawee | the mill, an identified party |
| Payee | the supplier |
| Sum | 250,000 |
| Currency | sat |
| Issue date | 2026-08-14 |
| Maturity date | 2026-11-12 |
| Country / city of issuing | AT / Vienna |
| Country / city of payment | SG / Singapore |
| Files | the invoice and the bill of lading, by hash |

Place of payment is Singapore while the place of issue is Vienna. Nothing requires them to match.

## Block 1 — Issue

`op_code: Issue`, `previous_hash` pointing at nothing before it. At this moment:

- the **payee** is the holder
- the bill is neither accepted nor requested to accept
- the holder may request acceptance, request payment, endorse, or offer to sell
- the drawee may accept, or reject to accept

The holder cannot yet **mint**: minting requires an accepted bill.

## Block 2 — RequestToAccept

The holder wants the mill's signature on the obligation before circulating it further, so they
request acceptance, with a deadline. The floor on that deadline is the UTC end of the day of the
request plus 48 hours.

The bill is now **blocked** — waiting for acceptance. The only moves that resolve it are the
mill accepting, the mill rejecting, or the deadline passing.

## Block 3 — Accept

The mill accepts. The bill is now accepted, and unblocked.

Two things follow. The holder may now mint it, because minting requires acceptance. And the
acceptance path is closed for good: the mill cannot later reject what it has accepted.

## Block 4 — Endorse

The holder endorses the bill to their own supplier further up the chain. The endorsee becomes the
holder; the former holder becomes a **contingent** participant — no longer able to act, still
liable if the bill is dishonoured.

The endorsements count is now 1.

## What happens at maturity

On or after 2026-11-12 the holder requests payment, again with a deadline at least 48 hours past
the UTC end of the request day. Then one of three things:

**It is paid.** No block is written for the payment itself — the system detects it on-chain and
flags the bill. The bill is now **paid**, and no participant can do anything further with it.

**It is rejected, or the deadline passes.** The bill becomes **only recoursable**. Ordinary
circulation is over; what remains is deciding who bears the loss. The holder requests recourse
against an earlier holder — see [Recourse](../operations/recourse.md) for exactly which earlier
holders are eligible.

**It was requested early.** Had payment been requested *before* 2026-11-12, the bill would have
blocked until the requested deadline and then simply unblocked, with the real expiry falling 48
hours after the maturity date. See
[General conditions](../concepts/general-conditions.md#the-maturity-date-subtlety-in-requesttopay).

## Or: it never reaches maturity

At any point after acceptance the holder can take it to a [Wildcat mint](../../wildcat-mint/)
instead, and receive e-cash against it now rather than money in November. The `Mint` block endorses
the bill to the mint, and the mill then settles with the mint.
