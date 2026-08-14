# FAQ

Technical questions about how bills behave. For questions about the business, such as what it costs,
who runs mints and why bills at all, see the [bit.cr FAQ](https://bit.cr/faq).

## Why can't I do anything with this bill?

Almost always one of four states. In order of how often they catch people out:

1. **blocked**: something has been requested and has not resolved. Look for an open request to pay,
   offer to sell, or request to recourse. Only the actions that resolve it are available.
2. **only recoursable**: acceptance or payment was refused, or its deadline lapsed. The bill cannot
   be endorsed, sold or minted any more; only the recourse actions remain.
3. **paid**: terminal, for everyone.
4. **recoursed to the end**: terminal, for everyone. Court only.

See [General conditions](concepts/general-conditions.md).

## Why is there no "pay" operation?

Because payment is not something anyone declares. There are
[fourteen block types](content-of-bill/blockchain.md) and none of them is `Pay`: the payment happens
on Bitcoin, and the system watches for it and flags the bill when it arrives.

This is the one fact about a bill that cannot be asserted by writing to the chain. See
[Pay](operations/pay.md).

## Do I have to get a bill accepted?

No. A bill can be issued, endorsed, sold, requested for payment and paid without ever being accepted.

One thing requires it: [minting](operations/mint.md). A mint will not take a bill the drawee has never
acknowledged, and that is enforced by the protocol rather than left to each mint.

## I requested payment before the maturity date and the deadline passed. Is the bill in default?

No. An early request blocks the bill until your deadline and then simply unblocks it. The real expiry
falls 48 hours after the maturity date, at UTC end of day.

Requesting payment early cannot push a bill into recourse ahead of time. See
[Request to pay](operations/request-to-pay.md#requesting-before-maturity-behaves-differently).

## Why can't I recourse against someone who held the bill?

Because you may only claim against holders who held it **before your own first time holding it**.

If you held a bill, endorsed it on, and later received it again, coming back round does not enlarge
your options; they were fixed by your first turn. The drawee is also always excluded, and so is the
drawer when drawer and drawee are the same party.

The [derivation and four worked examples](operations/recourse.md#who-can-be-recoursed-against) spell
this out.

## What is the difference between a deadline expiring on a sale and on a payment?

A great deal.

- **Offer to sell expires** → the offer is void, the bill unblocks, circulation continues.
- **Request to recourse expires** → the bill unblocks and can be requested to recourse again.
- **Request to accept or to pay expires** → the bill becomes **only recoursable**.

Two of those release the bill; the third changes its fate.

## A recoursee ignored my request versus refused it: same thing?

No, and the asymmetry is deliberate.

**Ignored**, so the deadline lapses: the bill unblocks and you can request recourse again, possibly
against someone else. You lose an attempt, not the claim.

**Formally refused** with a `RejectToPayRecourse`: the bill is **blocked permanently** and resolvable
only in court.

## Can the same person be both holder and payer?

Yes, for example when a bill is endorsed back to the drawee. The protocol does not special-case it;
it adds the two roles' permissions together. Such a party can request acceptance and then accept the
same bill.

## Why do two participants see different actions on the same bill?

Because the action list is computed per caller, from their roles and the bill's state. This is by
design, not a caching artefact. See [Bill states](concepts/bill-states.md).

## Can a relay read my bills?

No. Chain blocks travel as **public** Nostr events with encrypted content. Privacy comes from
encryption, not from access control. A relay serves ciphertext it cannot open, and a client without
the chain key skips the event.

That is why relays are replaceable rather than trusted, and why you can publish to several. See
[Transport](transport/).

## How does a mint or a court read a bill without being able to change it?

They get the encrypted blocks *and* a plaintext rendering, encrypted to their own public key, with no
bill keys. Every block commits to a hash of its own plaintext, so the two must agree: a sharer cannot
supply a flattering plaintext next to genuine ciphertext.

See [Sharing bills](transport/sharing-bills.md).

## I lost my device. Can I get my bills back?

If you have the 12-word seed phrase, yes: recover the keys and restore the account, and the encrypted
chains come back from the relays.

If you do not have the seed phrase, no. There is no account to reclaim and nobody who can help. See
[Identity restore and transfer](identity-record/identity-restore-transfer.md).

## Why does the documentation mention DHT, libp2p, RSA and ed25519?

Only in one place, and only in the past tense. Those were the earlier transport and key schemes; they
were replaced by Nostr and Secp256k1. If you find them presented as current anywhere, that document is
out of date.

See [Migration from the DHT](transport/migration-from-dht.md).

## Where is the authoritative answer when this site is wrong?

[CATS](https://github.com/BitcreditProtocol/cats), the Credit Assurance Token Standard. When this
site and CATS disagree, CATS is right and this site has a bug worth reporting.
