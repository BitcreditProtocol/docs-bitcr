# E-Bill

An **e-bill** is an electronic bill of exchange: a dated, transferable order to pay, of the kind
in commercial use since the Middle Ages, issued and passed on without a bank in the middle.

A bill is not a message. It is a chain of signed blocks. Every action a participant takes,
whether accepting, endorsing, offering to sell or recoursing, appends a block, and the chain is what
proves who owes what to whom. Reading a bill means replaying that chain and checking it.

## The three types of bill

A bill is issued by its **drawer**. Which type it is depends on who ends up paying whom:

| Type | Value | Who pays | Who is paid |
| --- | --- | --- | --- |
| `PromissoryNote` | 0 | the drawer | the payee |
| `SelfDrafted` | 1 | the drawee | the drawer |
| `ThreeParties` | 2 | the drawee | the payee |

A promissory note has no drawee at all: whoever signs is whoever pays. A self-drafted bill
names the drawer as their own payee, so two parties settle one instrument. `ThreeParties` is
the classic draft: the drawer orders the drawee to pay someone else.

In every case **the drawee and the payee cannot be the same entity**, and neither the issuer
nor the payer may be an anonymous identity.

## Who can do what

Roles are positions in a bill, not accounts. The same person is the drawer of one bill, the
payee of another and a recoursee in a third; and within a single bill a role can change hands
as the bill circulates.

- The **holder** is whoever holds it now: initially the payee, afterwards the endorsee of the
  most recent endorsing action. Requests, endorsements, sales and mints are theirs to make.
- The **drawee**, or payer, is the side the bill is drawn against. Acceptance and payment, or
  the refusal of either, are theirs.
- A **buyer** or a **recoursee** exists only while an offer or a recourse request is open.

See [Roles](concepts/roles.md) for the full table, and [Operations](operations/) for what each
role may do and when.

## How a bill ends

Exactly three ways:

1. **Paid.** The drawee pays at maturity. No further action is possible by anyone.
2. **Recoursed to the end.** Payment or acceptance was refused and the loss travelled back up
   the endorsement chain until no earlier holder was left to recourse against. The bill is
   permanently blocked and only a court can resolve it.
3. **Minted.** The holder sells it to a [Wildcat mint](../wildcat-mint/) before maturity, which
   turns it into e-cash. The bill itself then settles between the mint and the drawee.

## Where to start

- [Concepts](concepts/roles.md): roles, states, and the conditions that gate every action.
- [Identifiers and keys](identity-record/): how identities and bills are named and signed.
- [Content of a bill](content-of-bill/): what a bill actually holds.
- [Operations](operations/): one page per action, with its preconditions and deadlines.
- [Transport](transport/): how bills move over Nostr.
