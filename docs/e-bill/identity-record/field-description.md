# Field description

The fields of an identity record, as the client exposes them.

## Entered by the user

1. **Name**
   - Legal full name of the identity, including all middle and last names.
   - **Field is mandatory**
   - Field type: Textbox

2. **Email address**
   - Email address for contacting the identity.
   - Optional.
   - Field type: Textbox

3. **Postal address**
   - Where the identity is **based**. Made up of four parts, each optional on an identity
     record: country, city, zip code and street address.
   - Field type: Dropdown box for country, textbox for the rest

4. **Date of birth**
   - Optional.
   - Field type: Calendar

5. **Country of birth**
   - Optional.
   - Field type: Dropdown box

6. **City of birth**
   - Optional.
   - Field type: Textbox

7. **Identification number**
   - A national identification number for the identity. The field is deliberately generic
     rather than tied to any one country's scheme.
   - Optional.
   - Field type: Textbox

8. **Profile picture**
   - Optional.
   - Field type: File upload

9. **Identity document**
   - Optional.
   - Field type: File upload

Uploaded files are not stored as bytes on the record. Each one is held as a name, a SHA-256 hash
of the content, and the hash under which it is stored on Nostr — so the record commits to the
file's content without containing it. See [Backing up user material](upload-user-material.md).

## Generated, not entered

These are part of the record but no one types them in:

10. **Identity type** — `Ident` for an identified party, `Anon` for an anonymous one. Neither
    the issuer nor the payer of a bill may be anonymous.
11. **Node id** — the identity's identifier. See [Identity record](./).
12. **Bitcoin public key** — the Secp256k1 public key behind the node id.
13. **Nostr public key (npub)** — derived from the same key, used by the transport layer.
14. **Nostr relays** — the relays this identity publishes to and is reachable through.

::: warning Verify before relying on this
The field list above was read from
[`crates/bcr-ebill-wasm/src/data/identity.rs`](https://github.com/BitcreditProtocol/Bitcredit-Core/blob/main/crates/bcr-ebill-wasm/src/data/identity.rs)
rather than from the running app, and which fields a given client marks as required can be
stricter than what the protocol accepts. Check the app before treating any single entry as
current.

An earlier version of this page listed the email address as mandatory and named field 7
"Social Security Number". Both were correct once and are not now: email is optional, and the
field is a generic identification number.
:::
