# The bill blockchain

A bill is a chain of signed blocks. The fields on
[Field description](field-description.md) are not stored as a record someone edits — they are what
you get by replaying the chain from its first block.

## What a block holds

| Field | What it is |
| --- | --- |
| `bill_id` | the bill this block belongs to |
| `id` | the block's position in the chain |
| `op_code` | which action this block records |
| `data` | the block's payload, **encrypted** |
| `plaintext_hash` | SHA-256 hash of the payload *before* encryption |
| `hash` | this block's own hash |
| `previous_hash` | the hash of the block before it |
| `timestamp` | when the block was created |
| `public_key` | the key the block claims to be signed by |
| `signature` | a Schnorr signature over the block |

Two hashes rather than one is the detail that matters. `hash` chains the blocks together;
`plaintext_hash` commits to the *unencrypted* content. Without the second, a bill could only be
handed to someone by handing over the keys — because there would be no way to prove that a
plaintext rendering matched the ciphertext it claimed to come from. With it, a bill can be shared
read-only and still be fully checkable. See [Sharing bills](../transport/sharing-bills.md).

## The fourteen operations

Every block carries one op code:

| | | |
| --- | --- | --- |
| `Issue` | `RequestToAccept` | `Accept` |
| `Endorse` | `RequestToPay` | `RejectToAccept` |
| `Mint` | `OfferToSell` | `RejectToPay` |
| `Recourse` | `Sell` | `RejectToBuy` |
| `RequestRecourse` | | `RejectToPayRecourse` |

Note what is **not** in the list: there is no `Pay`. Paying a bill does not append a block. The
system watches for the payment and sets a flag when it arrives — which is why payment is the one
outcome that cannot be forged by writing to the chain. See [Pay](../operations/pay.md).

## Consensus

There is no mining, no voting and no global ledger. A bill's chain is agreed by construction:

- Every block is signed, and stage 4 of [validation](../concepts/validation.md) checks that the
  signature belongs to the key the block claims.
- Every block names its predecessor's hash, so the order cannot be rearranged and no block can be
  removed without breaking every block after it.
- Every block's action is checked against the whole history before it, so a valid chain is one in
  which each step was permitted at the moment it was taken.

The last point is what does the work a consensus mechanism would otherwise do. Two conflicting
next blocks cannot both be valid, because the conditions in
[General conditions](../concepts/general-conditions.md) make the available actions a function of
the chain so far. A bill blocked waiting for payment has exactly three permitted continuations,
and a fourth block does not become legitimate by being published more widely.

Participants therefore do not need to agree on which chain is longest. They need only the chain
itself, which each of them can check alone.

## Who holds the chain

Every participant holds the blocks for the bills they are party to, and the encrypted chain is
also held on Nostr relays — which is what makes [restoring an
account](../identity-record/identity-restore-transfer.md) from a seed phrase possible. The relay
stores ciphertext; the keys stay with the participants. See [Transport](../transport/).
