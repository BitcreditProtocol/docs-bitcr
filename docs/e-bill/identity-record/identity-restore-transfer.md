# Identity restore and transfer

An identity is a key pair, and that key pair comes from a seed phrase. Restoring an identity on a
new device therefore means two separate things: recovering the keys, and then recovering
everything those keys give access to.

## The seed phrase

A new identity is created by generating a **12-word BIP39 seed phrase** and deriving the
Secp256k1 key pair from it. The seed is taken with an empty passphrase and its first 32 bytes
become the secret key.

The client can show the phrase back to the user for safekeeping. Recovery accepts it in the other
direction, and **detects word count and language automatically**, so a phrase written down in a
language other than English still recovers.

Because the node id is the public half of this key pair, recovering the phrase recovers the
identity itself. There is no account on a server to reclaim and nobody to ask.

::: danger The seed phrase is the identity
Anyone holding the phrase holds the identity, including its liabilities on every bill it has ever
touched. There is no reset and no support channel that can help.
:::

## Derived keys

Bills and other chains do not use the identity key directly. Keys are derived from the parent
secret key using a chain type and an index, the same idea as BIP32 but with the protocol's own
chain types and using plain private keys rather than extended ones.

The practical consequence is that one seed phrase reconstructs the whole tree, not just the
top-level identity.

## Restoring the account

Recovering keys gives you an identity with no history. The restore step then rebuilds it:

1. Recover the key pair from the seed phrase.
2. Start the restore service with those keys.
3. Restore the account, which repopulates chains, chain keys, contacts, notifications and mint
   state from what is held on Nostr.

This is why restoring needs a network: the blocks were never only local. The relay holds the
encrypted chains, and the recovered keys are what make them readable again. See
[Transport](../transport/).

## Transfer between devices

There is no device-to-device pairing step. Transferring an identity is the restore path run
deliberately: take the seed phrase to the new device, recover, and let the account rebuild from
the relays.

Files are the exception worth noting: they are stored encrypted on Nostr and fetched on demand
rather than being part of the chain, so they come back the same way. See
[Backing up user material](upload-user-material.md).
