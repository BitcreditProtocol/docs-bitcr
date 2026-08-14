# Glossary

Bills of exchange predate every institution people now confuse them with. These are the terms this
protocol uses, and what each one actually means.

The instrument, money, party and mechanics terms follow the
[bitcr.org glossary](https://bitcr.org/glossary). The protocol terms in the last two sections are
specific to this documentation.

## Instruments

**Bill of exchange** — A private payment instrument in use since the Middle Ages: a dated,
transferable order to pay, regulated worldwide by the Geneva Convention of 1930.

**e-bill** — An electronic bill of exchange. The UNCITRAL Model Law on Electronic Transferable
Records (2017) provides for them; the UK enacted it in September 2023.

**Draft (three parties)** — The classic bill: the drawer orders the drawee to pay a third party, the
payee. Three roles, three sets of obligations. `ThreeParties` in the protocol.

**Self-drafted bill** — The drawer names themselves as payee, so the drawee pays the drawer directly.
Two parties, one instrument. `SelfDrafted`.

**Promissory note** — The issuer promises to pay the payee themselves. No drawee: the person who
signs is the person who pays. `PromissoryNote`.

**Real bill** — A bill that arises from goods already sold and in demand, and that is extinguished
when those goods are paid for. Self-liquidating by construction.

**Minibill** — A standardised, fungible unit a mint issues by splitting an e-bill's amount. It is the
technical form of e-cash.

**eBills / eCash** — The apps, capitalised: eBills is the browser PWA for trade, eCash the native
mobile wallet. The lowercase, hyphenated e-bill and e-cash are the protocol primitives those apps
operate on.

**Bitcredit** — A claim to future bitcoin, backed by e-bills. The credit money layer of Bitcoin, not
an altcoin.

## Money

**e-cash** — Bearer, private, non-custodial digital cash issued by mints against held e-bills. Spends
instantly, in person or online.

**Credit sat** — An e-cash unit: a satoshi's worth of credit money circulating before the underlying
e-bill matures.

**Debit sat** — An outright satoshi. Credit sats swap automatically into debit sats when the
underlying e-bill is paid on-chain.

**M0 / M1** — Base money versus circulating money. Bitcoin is a fixed M0; Bitcredit supplies the
elastic M1 layer that commerce needs.

**Law of Reflux** — Credit money issued against real value flows back to its issuer and is
extinguished at maturity, which is why the supply cannot inflate.

## Parties and capital

**Mint (wildcat)** — An operator running the open-source Wildcat software that transforms eligible
commercial e-bills into e-cash and guarantees their redemption with verifiable capital.

**Clowder** — The network of mints. Clowders settle between themselves, so e-cash minted in one place
pays a supplier in another.

**e-IOU** — The Special Guarantee Asset: verifiable on Bitcoin mainchain, held by mints as dedicated
guarantee capital and awarded to contributors for delivered work.

**Guarantee ratio** — How much e-IOU capital a mint holds against the bitcredit it has issued. One of
the axes mints compete on.

**Meta money** — An asset with a systemic rather than transactional function. e-IOU is not spent; it
absorbs Bitcoin's volatility to help stabilise purchasing power.

**Endorsement** — Passing a bill on. Each endorser adds their own liability, so a circulated bill
carries several independent obligations to pay.

**Ungovernance** — Bitcredit's decision process: deliberation through debates, prediction markets,
unconferences and polls, concluded by transparent voting weighted by e-IOU holdings.

## Mechanics

**Minting rate** — The gap between a bill's face value and the e-cash a mint issues against it: the
market price of time and credit quality, narrowing to zero at settlement. Agreed directly between the
business and the mint, deal by deal.

**Dishonour** — Failure to pay a bill at maturity. It exposes the payer, triggers the endorsement
chain, and blocks further creation by the guaranteeing mint until settled.

**Redemption** — Settlement at maturity: the payer pays, e-cash is redeemed, and the bitcredit is
burned.

**Melt** — Taking e-cash out into outright bitcoin. The fee is set by the mint that issued it, not by
the protocol.

**Payment fee** — What one e-cash payment costs the payer: 1 sat, flat, regardless of amount.

**Value given** — The Neo-Austrian term for goods actually delivered: the only thing the protocol
permits an e-bill to be issued against.

## Roles in a bill

See [Roles](e-bill/concepts/roles.md) for how these interact.

**Drawer** — The issuer of the bill. Must be an identified party.

**Drawee**, also **payer** — The party the bill is drawn against, asked to accept and to pay. Must be
an identified party.

**Payee** — Named at issue as the party to be paid; the first holder. May be anonymous.

**Holder** — Whoever holds the bill now: the payee at first, then the endorsee of the last endorsing
action. Requests, endorsements, sales and mints are the holder's to make.

**Endorser / endorsee** — The two sides of an endorsement: who passed the bill on, and who received
it and became holder.

**Seller / buyer** — The two sides of a sale. The seller is the holder; the buyer exists only while
an offer is open.

**Recourser / recoursee** — The current holder claiming against an earlier holder, and that earlier
holder.

**Contingent** — A participant in the guarantee chain: someone who has held the bill and therefore
carries liability, without being the holder now. Called *guarantor* in older material.

## Protocol states and terms

See [General conditions](e-bill/concepts/general-conditions.md) for the four that gate every action.

**paid** — The bill has been paid. Terminal: no participant can do anything further.

**blocked** — The bill is waiting for something — a payment, a sale, or a recourse. Only actions that
resolve the wait are permitted.

**only recoursable** — Acceptance or payment was rejected, or its deadline expired. The only remaining
actions are the recourse actions.

**recoursed to the end** — Recourse ran back through the endorsement chain until no earlier holder
remained. Terminal, and resolvable only in court.

**NodeId** — The identifier of an identity or company: the prefix `bitcr`, a network character, and a
Secp256k1 public key.

**BillId** — The identifier of a bill: the prefix `bitcr`, a network character, and a base58-encoded
SHA-256 hash of the bill's Secp256k1 public key.

**Network character** — The character after `bitcr` naming the network an identifier was created on:
`m` mainnet, `t` testnet, `T` testnet4, `r` regtest, `s` signet.

**Op code** — Which of the [fourteen actions](e-bill/content-of-bill/blockchain.md) a block records.
There is no op code for payment: paying writes no block.

**Plaintext hash** — A hash of a block's payload before encryption, recorded in the block. It is what
lets a bill be shared read-only and still be verified against its ciphertext.

**Chain key** — The key that decrypts a bill's blocks. Relays hold the blocks; only participants hold
the keys.

**CATS** — Credit Assurance Token Standard, the Bitcredit
[protocol specification](https://github.com/BitcreditProtocol/cats).

**NUTs** — Cashu's numbered specifications, which the mint's e-cash follows. See
[Cryptographic primitives](wildcat-mint/cryptographic-primitives.md).
