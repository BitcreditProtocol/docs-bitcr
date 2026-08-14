# Bill id and keys

A bill has its own key pair, separate from every participant's. This is what makes a bill a thing
in its own right rather than a message belonging to whoever sent it.

## The bill id

The id is the prefix `bitcr`, the network character, and a base58-encoded SHA-256 hash of the
bill's Secp256k1 public key:

```
PREFIX|NETWORK|Base58(Sha256(Secp256k1PublicKey))
```

For example, on testnet:

```
bitcrtGgLTAAVDYaoPC5b45MVzdmMBhTNm5AHtm6izEquzWdDV
```

Note the difference from a [node id](../identity-record/), which carries the public key itself
rather than a hash of it. A node id is a key you can encrypt to; a bill id is a commitment to a
key. The network character means the same thing in both: `m` mainnet, `t` testnet, `T` testnet4,
`r` regtest, `s` signet.

## The bill key pair

The bill's key pair is what the bill's own data is encrypted against. Holding it is what
distinguishes a party who can **write** to the bill from a party who can only **read** it.

That distinction is the whole basis of sharing a bill without handing over control:

- **With the bill keys** — the receiver gets the chain and the keys to decrypt it. They can
  validate everything and act on it.
- **Without the bill keys** — the receiver gets a plaintext rendering alongside the original
  encrypted blocks, encrypted to their own public key. They can verify every claim and cannot
  write a single block.

A mint deciding whether to quote, and a court hearing a dispute, both get the second kind. See
[Sharing bills](../transport/sharing-bills.md).

## Keys and payment addresses

Because the scheme is Secp256k1 — the curve Bitcoin uses — the same key material that identifies
and signs a bill also generates the Bitcoin addresses that settle it. The address to pay is
derived rather than configured, which is why every payment action carries an `address_to_pay` and
a mempool link for tracking it, and why the receiver of a payment gets a private descriptor with
which to spend the funds.

## Derivation

Bill keys are not the identity key reused. They are derived from a parent secret key using a chain
type and an index — the same idea as BIP32, but with the protocol's own chain types and plain
private keys rather than extended ones. One seed phrase therefore reconstructs a participant's
bills as well as their identity. See
[Identity restore and transfer](../identity-record/identity-restore-transfer.md).
