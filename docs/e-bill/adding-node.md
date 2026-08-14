# Adding a contact and exchanging data

To issue a bill to someone, or endorse one to them, you need their
[node id](identity-record/). Adding them as a contact is how you get it and keep it.

## Resolving a contact

A contact is added by node id. Because a node id contains the participant's Secp256k1 public key,
and their Nostr npub is derived from that same key, a node id is all that is needed to find them:
the client resolves the npub, looks up the relay list that identity publishes, and reads their
public profile data from there.

No handshake and no approval step is involved in *finding* someone. Their public data is public.

## Sharing your own details

Publishing works the other way round, and with one restriction worth knowing: a client will only
publish contact data for a node id it holds the keys for. You can publish yourself; you cannot
publish somebody else.

## Private contact information

Public profile data is the small part. The fields on an
[identity record](identity-record/field-description.md), such as postal address, date and place of
birth, identification number and identity documents, are not broadcast.

Sharing those is a deliberate act, and it works by **sharing derived keys over a private
message**. Rather than sending the data itself, the client sends the keys that decrypt it. Two
consequences:

- The recipient can read what those keys unlock, and nothing else.
- The data does not have to be re-sent when it changes.

This is the same idea as [sharing a bill](transport/sharing-bills.md): pass the ability to read,
not a copy.

## Why a contact is needed before a bill

A bill names its parties by node id, and the drawer and drawee
[must be identified parties](content-of-bill/field-description.md) rather than anonymous ones. So
issuing a bill to a counterparty means already knowing who they are in the protocol's terms.

The practical order is: add the contact, exchange whatever private details the trade requires, then
issue.

## Companies

A company is addressed by a node id in exactly the same format as a person, and is added as a
contact the same way. What differs is the record behind it, and that a client can act as either
a person or a company, switching between the identities it holds.
