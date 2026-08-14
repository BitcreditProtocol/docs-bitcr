# Wildcat Mint

A **Wildcat** is a credit mint: an operator running the open-source Wildcat software, which takes an
accepted [e-bill](../e-bill/) before it matures and turns it into e-cash.

It is a business, not an office of the protocol. Anyone can run one, competing mints quote against
each other, and nobody has to be contracted with in order to use bills at all — minting is one thing
a holder may choose to do with a bill, not a step in its life.

::: tip Scope of this section
These pages cover Wildcat at an overview level: what a mint is, what a credit token is, and the
shape of the quoting process. The internal specifications — the quote state machine, service
topology, keyset derivation and API surface — live in Bitcredit's internal `internal_cats`
repository and are not published here.
:::

## The problem a mint solves

An accepted e-bill is sound value in an awkward shape. It is one lump with one maturity date, and
you cannot pay eleven workers and a diesel bill with a single instrument due in ninety days.

A mint fixes the shape. It takes the bill, holds it to maturity, and splits it into e-cash spendable
in any denomination — the job specialist discount houses did for merchant bills two centuries ago,
without the building.

## What is negotiated

A bill is minted **whole**. It is one instrument and it changes hands in one piece; there is no
partial minting.

What gets negotiated is the **minting fee**, and that fee is a function of how long the mint has to
wait for maturity. It is the market price of time and credit quality, and it narrows to zero at
settlement. The rate is agreed between the business and the mint, deal by deal, rather than set by
the protocol.

## What backs the e-cash

The backing is two-deep, and the first layer is mandatory:

1. **Full backing in Bitcoin and Bitcoin-denominated bills.** Every unit of e-cash is backed. This
   floor is not a mint's choice.
2. **Separate guarantee capital**, locked by the Wildcat above that floor. The ratio a mint holds
   against its own liabilities is verifiable on the Bitcoin mainchain at any moment.

If the buyer of the underlying bill defaults, the guarantee capital is sold to redeem holders while
recovery runs its course. An unpaid bill also blocks that mint from minting anything further until
the guarantee is honoured.

## Non-custodial

The mint cannot touch what you hold. A payment splits into Bitcoin outputs only your own key can
spend, so a mint failing does not reach your money. The purpose of the whole arrangement is that the
way out into ordinary Bitcoin stays open at all times.

## Competing on what

A Wildcat locks its guarantee and then competes on **industry specialisation, minting fees, service
levels and guarantee ratios**. Someone who understands a trade corridor better than a bank does can
price bills in it.

Mints are also connected: e-cash from one spends against any other, and where a unit was minted does
not matter to whoever accepts it. See [Credit tokens](credit-tokens.md).

## Pages in this section

- [Credit tokens](credit-tokens.md) — what a unit of e-cash is and why it travels.
- [Quote lifecycle](quote-lifecycle.md) — request, offer, accept, mint.
- [Cryptographic primitives](cryptographic-primitives.md) — Cashu and Secp256k1.

## From the bill's side

For what minting does to the bill itself — the conditions, the block written, and who the drawee owes
afterwards — see [Mint](../e-bill/operations/mint.md).
