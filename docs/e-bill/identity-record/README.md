# Identity record

Every participant and every bill is named by an identifier the protocol generates, not by an
account someone issues. There are two kinds: a **NodeId** for identities and companies, and a
**BillId** for bills.

Both begin with the prefix `bitcr`, followed by a single character naming the network the
identifier was created on:

| Character | Network |
| --- | --- |
| `m` | Mainnet |
| `t` | Testnet |
| `T` | Testnet4 |
| `r` | Regtest |
| `s` | Signet |

Because the network is part of the identifier, a testnet identity and a mainnet identity are not
merely distinguishable — they cannot be confused for one another by any code that reads the
string.

## NodeId

Prefix, network character, and the string representation of a Secp256k1 public key:

```
PREFIX|NETWORK|Secp256k1PublicKey
```

On testnet, for example:

```
bitcrt039180c169e5f6d7c579cf1cefa37bffd47a2b389c8125601f4068c87bea795943
```

## BillId

Prefix, network character, and a base58-encoded SHA-256 hash of the bill's Secp256k1 public key:

```
PREFIX|NETWORK|Base58(Sha256(Secp256k1PublicKey))
```

On testnet:

```
bitcrtGgLTAAVDYaoPC5b45MVzdmMBhTNm5AHtm6izEquzWdDV
```

A bill has its own key pair, distinct from any participant's. See
[Bill id and keys](../content-of-bill/bill-id-and-keys.md).

## Nostr npubs

Beyond these internal identifiers, the transport layer addresses participants by Nostr npub.
An npub is **derived from the same Secp256k1 public key**, so it is not a second identity to
keep in sync — it is the same key wearing the clothes Nostr expects. See
[Transport](../transport/).

## Identified and anonymous identities

An identity is one of two types:

- **Ident** — an identified party, with the name and address fields described in
  [Field description](field-description.md).
- **Anon** — an anonymous party.

Anonymity is not available everywhere. Neither the issuer nor the payer of a bill may be
anonymous, which follows from a bill being an enforceable obligation: someone has to be
identifiable enough to be held to it. A holder further down the endorsement chain is a different
matter.

## Companies

A company is addressed by a NodeId in exactly the same format as a person. What differs is the
record behind it, and which identity a client is currently acting as — a client can switch
between acting as a person and acting as a company.

## Pages in this section

- [Field description](field-description.md) — the fields of an identity record.
- [Identity restore and transfer](identity-restore-transfer.md) — the seed phrase, and moving an
  identity between devices.
- [Cryptographic primitives](../cryptographic-primitives/) — the key and encryption schemes
  behind all of this.
- [Backing up user material](upload-user-material.md) — getting files off a device.
