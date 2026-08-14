# Sharing bills

Two parties need to read a bill without being able to act on it: a **mint** deciding whether to
quote on it, and a **court** hearing a claim about it. Both need to verify every detail; neither
should be able to write a single block.

There are two mechanisms, depending on whether the bill keys go along.

## Without bill keys

The hard case, and the interesting one. The receiver gets a readable rendering of the bill *and* the
original encrypted blocks, and can prove the two agree — without ever holding the key that would let
them write.

### What the sharer does

1. Build a plaintext representation of the bill chain: for each block, a wrapper holding the block
   in its **original state** alongside its **plaintext data**.
2. Serialize the wrappers with [borsh](https://borsh.io/).
3. Hash the serialized data, so it can be validated later.
4. Encrypt the serialized wrapper with the **receiver's** Secp256k1 public key.
5. Base58-encode the encrypted data.
6. **Sign the hash with the sharer's private key**, so the receiver can be sure that this exact data
   was shared by that exact entity.
7. Encrypt the bill's files with the receiver's public key, upload them, and include the list of file
   URLs.
8. Send the whole payload over HTTP, signed by the sharer.

### What the receiver does

1. Verify that the receiver public key is correct.
2. Verify the signature on the request.
3. Decrypt the payload and check the hash matches the decrypted data.
4. Rebuild a blockchain from the blocks, running every integrity check that applies to an encrypted
   bill chain.
5. **Compare each block's `plaintext_hash` against the plaintext data supplied for it** — so the
   encrypted and unencrypted versions must be the same data.
6. Verify the payload signature belongs to the holder the bill data claims it does.
7. Download the shared files, decrypt them, and validate them against the file hashes in the bill.

Step 5 is the mechanism the whole thing rests on. Because every block commits to a hash of its own
plaintext — see [The bill blockchain](../content-of-bill/blockchain.md) — a sharer cannot supply a
flattering plaintext alongside genuine ciphertext. The hashes would not match.

### Why a mint can trust what it later receives

If the mint quotes, the holder accepts, and the bill is [minted](../operations/mint.md) to it, the
mint can compare the bill it now holds against the copy it was shown — block hashes and plaintext
hashes both — and confirm it is the same bill it priced.

A holder cannot get a quote on a good bill and deliver a different one.

## With bill keys

Much simpler. The receiver gets the whole chain with its encrypted data, plus the keys to decrypt
it.

Block hashes, the integrity checks between blocks, and the plaintext hashes within them are enough
for the receiver to confirm that the chain is valid **and** that the entity sharing it had the right
to — that they were the holder.

## Which to use

| | Without keys | With keys |
| --- | --- | --- |
| Receiver can read the bill | yes | yes |
| Receiver can verify integrity | yes | yes |
| Receiver can write to the bill | no | yes |
| Typical use | a mint quoting, a court hearing a claim | transferring control |

The read-only form is the default for anything that is not a transfer. A court needs evidence, not
custody.
