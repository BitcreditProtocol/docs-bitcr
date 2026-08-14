# Cryptographic primitives

## Cashu

Credit tokens are Chaumian e-cash, and the mint follows the [Cashu](https://cashu.space/) protocol.
Cashu's specifications are called **NUTs** — Notation, Usage, and Terminology — and they are the
reference for how blinded signatures, minting, melting and swapping work:

- **[cashu.space](https://cashu.space/)** — the protocol's home.
- **[NUTs specifications](https://github.com/cashubtc/nuts)** — the numbered documents themselves.

The pieces most relevant to a credit mint are the ones covering keysets and public keys, minting and
melting quotes, swapping tokens, and signature-based mint authentication.

Bitcredit's use of Cashu is not vanilla. A credit mint issues tokens against a bill that has not yet
matured, so its tokens carry [two extra attributes](credit-tokens.md#the-two-attributes-each-unit-carries)
— who owes the underlying bill, and when it falls due — which plain Cashu units do not have. That is
what lets units from different mints be recognised and settled against each other.

The specifics of those modifications are in Bitcredit's internal `internal_cats` repository and are
not published here.

## Secp256k1

The same curve as [the E-Bill side](../e-bill/cryptographic-primitives/), and the same curve Bitcoin
uses. One scheme covers the whole system: an identity's key, the bill's key, the Nostr npub derived
from it, the Bitcoin addresses that settle the bill, and the mint's keysets.

The practical consequence is that a credit token's cryptography and its underlying bill's
cryptography are not two systems that have to be reconciled. They are the same primitives applied at
two layers.

## Why Bitcoin, not a chain of its own

E-cash redeems 1:1 into outright Bitcoin at the maturity of the bill behind it, and a mint's
guarantee ratio is verifiable on the Bitcoin mainchain. Both properties require the settlement layer
to be Bitcoin itself rather than a ledger the mint controls — which is also why a payment splits into
outputs only the holder's key can spend. See [Credit tokens](credit-tokens.md).
