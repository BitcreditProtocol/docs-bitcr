# Content of a bill

A bill holds its parties, its terms, and the chain of blocks that produced both. These pages cover
each in turn.

- [Field description](field-description.md) — every field on a bill, and which ones the protocol
  maintains rather than the participants.
- [Bill id and keys](bill-id-and-keys.md) — how a bill is named, and why it has a key pair of its
  own.
- [The bill blockchain](blockchain.md) — the block format, the fourteen operations, and how a
  chain is agreed without mining or voting.
- [Bill example](bill-example.md) — a bill read end to end.

The short version: a bill names an identified drawer and drawee, a payee who may be anonymous, a
sum in a currency, a place of issue and a place of payment, and a maturity date. Everything else —
whether it is accepted, whether it is blocked, what you may do with it next — is derived by
replaying its blocks.
