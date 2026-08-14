# Transport

Bills move over [Nostr](https://nostr.com/). Relays carry the traffic and store the encrypted
chains; keys stay with the participants.

## Addressing

Participants are addressed by Nostr **npub**, derived from the same Secp256k1 public key that
forms their [node id](../identity-record/). There is no second identity to keep in sync. It is
one key presented in the form Nostr expects.

Each identity publishes the relays it is reachable through, and its record carries that relay
list. Discovery works the ordinary Nostr way: to reach a participant, find where they said they
would be listening.

## What gets published, and how

| Purpose | Nostr event |
| --- | --- |
| Bill chain blocks | text notes: **public events, encrypted content** |
| Private messages between participants | gift-wrapped events, with legacy encrypted direct messages still handled |
| Relay discovery | relay list events |
| Profile data | metadata events |
| File storage servers | a Blossom server list (kind `10063`) |
| File metadata | kind `1063` events |

The first row is the one that repays a second look. Chain blocks travel as **public** notes, and
their privacy comes entirely from encryption rather than from access control. A relay holds them,
serves them to anyone, and cannot read them. A client without the chain key for a bill sees the
event arrive and skips it. Nothing about the bill is exposed by its blocks being fetchable.

This is what makes the relay a dumb, replaceable component rather than a trusted one.

## Who acts as a relay

Anyone. Bitcredit publishes its own relay implementation,
[`bcr-relay`](https://github.com/BitcreditProtocol/bcr-relay), with a
[Postgres storage backend](https://github.com/BitcreditProtocol/nostr-postgres-db), but a
participant is free to run any Nostr relay, or several.

Because relays hold ciphertext and are chosen per identity, using more than one is a redundancy
measure rather than a coordination problem. There is no canonical relay whose failure stops the
protocol.

## Files

Files attached to identities and bills are not put in events. They are encrypted to the recipient's
public key and stored on **Blossom** servers, with the event carrying only the metadata: name,
content hash, and the hash it is stored under.

So an attachment is committed to by hash in the chain and fetched separately. See
[Backing up user material](../identity-record/upload-user-material.md).

## Why the relay holds anything at all

A bill's blocks live with its participants, and could in principle be exchanged directly. The relay
earns its place by making two things work:

- **Asynchrony.** A drawee does not have to be online when a bill is issued to them.
- **Restore.** An identity recovered from a
  [seed phrase](../identity-record/identity-restore-transfer.md) has keys and nothing else. The
  chains it can decrypt are on the relays, which is what turns twelve words back into a portfolio
  of bills.

## Pages in this section

- [Sharing bills](sharing-bills.md): handing a bill to a mint or a court, with or without keys.
- [Migration from the DHT](migration-from-dht.md): what this replaced, and why.
