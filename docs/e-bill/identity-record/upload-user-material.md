# Backing up user material

Files such as an identity document, a profile picture or the invoices attached to a bill are not kept
inside the record or the block that refers to them. They are held separately and committed to by
hash.

## How a file is stored

1. The file is encrypted with the owner's Secp256k1 public key.
2. The encrypted file is uploaded to Nostr.
3. What the record keeps is a triple: the file **name**, the **SHA-256 hash** of its content, and
   the **hash under which it is stored** on Nostr.

So the record proves what the file was without containing it. Change one byte of the file and the
content hash no longer matches what the block committed to.

## How a file is read back

The client fetches the encrypted file, then decrypts it with the identity's private key and
checks the content hash against the one recorded. Reading your own material is therefore only
possible with your own keys: the relay stores ciphertext it cannot open.

## What this means for backups

There are two things to keep safe, and they are not the same:

- **The seed phrase.** Without it nothing can be decrypted, no matter what is still on the relays.
  See [Identity restore and transfer](identity-restore-transfer.md).
- **The files themselves**, if you care about them independently. They live on relays, encrypted;
  a relay that drops them is not a loss of the bill's validity, since the hashes in the chain stand
  either way, but it is a loss of the attachment.

A bill whose attached files have gone missing is still a valid bill with a verifiable chain. It is
just a bill you can no longer show the paperwork for, which in a dispute may matter a great deal.

## Files on a shared bill

When a bill is shared with an external party, a mint or a court, its files are re-encrypted
with **that party's** public key, uploaded, and the list of URLs is sent along with the payload.
The receiver downloads them, decrypts them with their own key, and validates them against the
file hashes recorded in the bill data. See [Sharing bills](../transport/sharing-bills.md).
