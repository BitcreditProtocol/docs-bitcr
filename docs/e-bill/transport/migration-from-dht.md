# Migration from the DHT

::: warning Historical
This page describes architecture the protocol **no longer uses**. It is here so that older
documents, diagrams and code comments can be read in context. Nothing on this page is current.
:::

Bitcredit's first transport was a distributed hash table built on
[libp2p](https://libp2p.io/). It was replaced by [Nostr](./).

## What the DHT design looked like

- **libp2p** provided the peer-to-peer networking, with a Kademlia-style DHT for discovery and
  storage.
- Each bill had a **topic** in the DHT, and participants joined the topic to publish and receive
  events for that bill.
- Nodes joined the network through bootstrap peers, then put and fetched events by key.
- **DCUtR**, Direct Connection Upgrade through Relay, was used to get peers into direct
  connection with one another after meeting through a relay, for cases where neither could accept
  inbound connections.
- Relay nodes existed to make that hole-punching possible.

The key scheme was different too: **ed25519** keys for the DHT's own logic, and **RSA-2048** for
encrypting data. Identities were created by publishing a DHT identity event and promoting it.

## What replaced it

| Then | Now |
| --- | --- |
| libp2p DHT | Nostr relays |
| Per-bill DHT topics | encrypted public events, readable only with the chain key |
| DCUtR hole-punching between peers | clients connect to relays; no peer-to-peer connectivity needed |
| Bootstrap nodes and DHT joining | a published relay list per identity |
| ed25519 for DHT logic | Secp256k1 throughout |
| RSA-2048 for encryption | ECIES over Secp256k1 |
| DHT identity creation event | a key pair derived from a BIP39 seed phrase |

## Why

The protocol did not need a distributed hash table. It needed asynchronous message delivery and
somewhere durable to keep encrypted blocks, and a DHT is an expensive way to buy those:

- **Connectivity.** DCUtR exists because direct peer connections are hard behind NAT. Removing the
  requirement for peers to reach each other at all removed a whole class of failure that no amount
  of hole-punching fully solves.
- **Availability.** A DHT keeps data available by keeping enough peers online. Relays are simply
  servers, and a participant can publish to several. Neither approach trusts the storage, since the
  blocks are encrypted either way, so the simpler one wins.
- **One key scheme.** Using Secp256k1 everywhere means a participant's node id, their Nostr npub,
  their encryption key and the Bitcoin addresses that settle their bills all derive from one key
  pair. The DHT design needed ed25519 *and* RSA *and* Secp256k1, and kept them in step by hand.
- **An existing ecosystem.** Nostr already had relays, relay discovery, gift-wrapped private
  messages and file storage conventions. None of that had to be built.

The through-line: the DHT was solving a distribution problem the protocol did not have, while the
real problem, proving a chain of signed blocks is valid, is solved by the
[validation rules](../concepts/validation.md) and not by the transport at all. Once that is clear,
the transport can be the boring option.

## Reading older material

If you encounter any of these presented as current, it is out of date:

- ed25519 keys, RSA-2048 encryption
- DHT topics, libp2p, DCUtR, bootstrap nodes
- "DHT identity creation" as the way an identity comes into being

The current answers are in [Transport](./),
[Cryptographic primitives](../cryptographic-primitives/) and
[Identity record](../identity-record/).
