# Cryptographic primitives

One key scheme covers the whole protocol.

## Secp256k1

Identities, companies and bills all use [Secp256k1](https://docs.rs/secp256k1/latest/secp256k1/)
key pairs — the same curve Bitcoin uses. That is not a coincidence of taste: it means a bill's
key material and the Bitcoin addresses that settle it come from one scheme, and an identity's
Nostr npub is derivable from the key it already has.

Each identity holds one key pair, derived from a 12-word BIP39 seed phrase — see
[Identity restore and transfer](../identity-record/identity-restore-transfer.md). Its public key,
prefixed and network-tagged, *is* its [node id](../identity-record/). Each bill gets its own
separate key pair, whose public key is hashed into the
[bill id](../content-of-bill/bill-id-and-keys.md).

## Encryption

Data is encrypted with [ECIES](https://docs.rs/ecies/latest/ecies/) — the Elliptic Curve
Integrated Encryption Scheme — against the recipient's Secp256k1 public key. Anyone with the
public key can encrypt to a party; only that party can read it.

This is what lets a bill be handed to a mint or a court that has no write access: the payload is
encrypted to *their* public key, and signed with the sharer's private key so they can prove who
sent it. See [Sharing bills](../transport/sharing-bills.md).

## Encoding and hashing

| Purpose | Scheme |
| --- | --- |
| Encoding binary data as text | [base58](https://docs.rs/bs58/latest/bs58/) |
| Hashing | [SHA-256](https://docs.rs/sha2/latest/sha2/) |
| Serializing structured data | [borsh](https://borsh.io/) |

Hashes appear in three places worth knowing about: in the bill id, which is a base58-encoded
SHA-256 hash of the bill's public key; as the plaintext hash inside each block, which is what
lets a decrypted bill be checked against its encrypted original; and as the content hash of every
attached file.

## What is not used any more

Earlier designs used **ed25519** keys for the DHT and **RSA-2048** for encryption. Both are gone.
If you find either mentioned as current anywhere, it is out of date — see
[Migration from the DHT](../transport/migration-from-dht.md).
