# Quote lifecycle

Minting is a negotiation followed by a transfer. Four steps, at the level this section documents.

::: tip Overview only
The quote state machine, its exact transitions, the service topology behind it and the keyset
derivation are specified in Bitcredit's internal `internal_cats` repository and are not published
here. What follows is the shape of the process, not its specification.
:::

## 1. Request

The holder of an accepted bill asks a mint to quote on it.

The mint needs to see the bill to price it, and gets it **read-only**: a full plaintext rendering
alongside the original encrypted blocks, encrypted to the mint's own public key, with no bill keys
handed over. The mint can verify every claim and cannot write a single block. See
[Sharing bills](../e-bill/transport/sharing-bills.md).

The bill must already be accepted: the drawee's acknowledgement is a
[protocol-level precondition for minting](../e-bill/operations/mint.md), not each mint's policy.

## 2. Offer

The mint assesses the bill and either declines or makes an offer.

An offer discounts the bill's face value by a **minting fee**, which is a function of how long the
mint must wait for maturity. Offers carry an expiry date.

Whether to offer at all is a credit decision about the drawee, and it is the mint's business
judgement, which is what mints compete on.

## 3. Accept or reject

The offer is the holder's to take or leave. Rejecting it costs nothing and ends the matter; the bill
is untouched and can be taken to another mint.

If the holder accepts, the bill is to be endorsed to the mint in a timely manner.

## 4. Mint

The bill is endorsed to the mint with a `Mint` block, and the mint issues e-cash to the holder.

At that point:

- The **mint is the holder** of the bill, with every holder action available to it.
- The former holder is a **contingent** participant: still liable on the bill, now holding e-cash
  instead.
- The **drawee owes the mint**, on the same terms and the same date as before. Nothing about their
  obligation changes except who is on the other end of it.

The mint can confirm that the bill it received is the bill it priced, by comparing block hashes and
plaintext hashes against the read-only copy from step 1. A holder cannot get a quote on one bill and
deliver another.

## What can go wrong

- **The mint declines.** The bill is unaffected. Try another mint, or hold it to maturity.
- **The offer expires.** Same position as a rejection.
- **The holder accepts but does not endorse.** The mint has priced a bill it does not hold; the offer
  lapses.
- **The bill is dishonoured after minting.** The mint holds the bill and bears the recovery, redeeming
  e-cash holders out of its guarantee capital, and is blocked from minting further until the
  guarantee is honoured. See [Credit tokens](credit-tokens.md#dishonour).

## Afterwards

See [Credit tokens](credit-tokens.md) for what the holder now has, how it travels between mints, and
how it redeems at maturity.
