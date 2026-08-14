# Credit tokens

The unit a mint issues against a bill. Bearer, private, non-custodial digital cash — spendable
instantly, in person or online.

## Credit sats and debit sats

The distinction that makes the system legible:

- A **credit sat** is a satoshi's worth of credit money, circulating *before* the underlying bill
  matures.
- A **debit sat** is an outright satoshi.

Credit sats swap automatically into debit sats when the underlying bill is paid on-chain. That is
the whole arc: credit money exists for the interval between a sale and its settlement, and stops
existing when the settlement arrives.

The standardised, fungible unit a mint issues by splitting a bill's amount is called a **minibill**;
it is the technical form of e-cash.

## The two attributes each unit carries

Every unit keeps two attributes of the bill it came from:

1. **Who owes it.**
2. **When it falls due.**

This is what lets Wildcats recognise each other's units. A mint receiving a unit it did not issue can
see what stands behind it, which is why e-cash from one mint spends against any other and where a
unit was minted does not matter to whoever accepts it.

Mints settle between themselves — the network of them is called a **clowder** — so e-cash minted in
Austria pays a supplier in China.

## Redemption

At the maturity of the bill it came from, e-cash redeems **1:1 into outright Bitcoin** on the
mainchain.

The fee is taken once, at the start, when the bill is minted. What you hold afterwards does not
decay: there is no carry, no demurrage, and no second bite at maturity.

This is the **Law of Reflux** in operation — credit money issued against real value flows back to its
issuer and is extinguished at maturity, which is why the supply cannot inflate. A unit of e-cash is
not a claim that persists; it is a claim with an expiry built into the instrument behind it.

## Melting

Taking e-cash out into outright Bitcoin before maturity is called **melting**. The fee for it is set
by the mint that issued the unit, not by the protocol — so it is worth comparing melt fees when
choosing a mint, alongside minting fees and guarantee ratios.

## What a payment costs

**One satoshi, flat**, regardless of amount. Not a percentage. Eleven payments cost eleven satoshis,
with no monthly fee.

## Non-custodial

A payment splits into Bitcoin outputs only the holder's own key can spend. A mint going under does
not touch what a holder has already received.

## Dishonour

If the bill behind a unit is not paid at maturity, that is a **dishonour**. It exposes the payer,
triggers the [endorsement chain](../e-bill/operations/recourse.md), and blocks the guaranteeing mint
from creating anything further until the guarantee is honoured. Holders are redeemed out of the
mint's guarantee capital while recovery runs.
