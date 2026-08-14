# Bill states

A bill does not have *a* state. It has several independent ones, and which of them are visible
to a given participant depends on the roles that participant holds. This is why two people can
look at the same bill and correctly see different things.

## Always relevant, to everyone

### Acceptance

Whether the drawee has accepted:

- requested to accept, with a deadline
- accepted
- rejected to accept
- request to accept expired

### Payment

Whether the bill has been paid:

- requested to pay, with a deadline
- paid
- rejected to pay
- request to pay expired

## Relevant only to the parties involved

### Recourse

Visible to the current and past parties of a recourse: the recourser, who is the holder, and
the recoursee, who is an earlier holder. A bill can be recoursed more than once in its life, so
this is a **list** of states, latest first:

- requested to recourse, with a deadline
- recoursed
- rejected to pay recourse
- request to recourse expired

### Sale

Visible to the seller, who is the holder, and the buyer. Also a **list**, latest first, because
a bill can be offered for sale repeatedly:

- offered to sell, with a deadline
- sold
- rejected to buy
- offer to sell expired

### Mint

Visible only to the current holder:

- requested to mint

## Payment actions

Alongside states, the API tells a caller what they should *do* about money. There are two:

**Pay.** The bill is waiting for a payment from this caller. Carries what is needed to make it:
the type of payment (`Pay`, `Sell`, `Recourse`), the receiver, the time of request, currency and
sum, a payment link, the Bitcoin address to pay, a mempool link for tracking it, the transaction
id, whether it is in the mempool, how many confirmations it has, and the payment deadline.

**Check Payment.** The caller is the receiver of a current or past payment. Carries the same
fields for each payment, ordered latest first, plus the sender, the private descriptor needed to
spend the received funds, and a status: waiting, paid, rejected or expired, with timestamps.

Note that paying is not an action that writes a block. The system watches the chain, and sets a
flag on the bill when the payment arrives. See [Pay](../operations/pay.md).

## What each role sees

The full permutation table lives in the specification; the shape of it is:

| Role | Bill actions | States visible |
| --- | --- | --- |
| **Payer** | `Accept`, `RejectAcceptance`, `RejectPayment` | acceptance, payment |
| **Holder** | `RequestAcceptance`, `RequestToPay`, `OfferToSell`, `Sell`, `Endorse`, `Mint`, and the recourse actions when the bill can be recoursed | acceptance, payment, mint; plus sale and recourse states for the ones they were party to |
| **Buyer** | `RejectBuying` while an offer is open; holder actions once sold | acceptance, payment, sale |
| **Recoursee** | `RejectToPayRecourse` while a request is open; holder actions once recoursed | acceptance, payment, recourse |
| **Drawer** | none of its own | acceptance, payment |
| **Contingent** | none of its own | acceptance, payment |

A buyer who pays becomes the holder and inherits holder actions. A recoursee who pays does the
same. In both cases the earlier holder keeps a `Check Payment` view of that settlement, because
they were the one who received it.

::: tip Source note
`concepts.md` lists `RejectBuying` and `Pay(Sell)` under the Recoursee role. That is a
copy-paste slip from the Buyer section directly above it. The recoursee's action is
`RejectToPayRecourse` and their payment is `Pay(Recourse)`, as
[`bill_validation.md`](https://github.com/BitcreditProtocol/cats/blob/main/Bitcredit-Core/bill_validation.md)
states unambiguously. This page follows `bill_validation.md`.
:::
