# Roles

A role is a position in a bill, not a kind of user. One identity can hold several roles in the
same bill at once, and the protocol handles that by simply adding their permissions together.

## The roles

| Role | Who they are | Fixed for the life of the bill? |
| --- | --- | --- |
| **Drawer** | The issuer of the bill. | Yes |
| **Drawee** (payer) | The side the bill is drawn against; the one asked to accept and pay. | Yes |
| **Payee** | Named at issue as the first party to be paid. Becomes the first holder. | Yes, but stops being holder once the bill is passed on |
| **Holder** | Whoever holds the bill now: the payee at first, then the endorsee of the last endorsing action. | No, it changes with every endorsement, sale, mint or recourse |
| **Endorser / Endorsee** | The two sides of an endorsement: who passed the bill on, and who received it. Each endorser adds their own liability, so a circulated bill carries several independent obligations to pay. | Positions within one action |
| **Buyer** | The party named in an open offer to sell. | Only while that offer is open |
| **Seller** | The holder who made that offer. | Only for that sale |
| **Recourser / Recoursee** | The current holder claiming against an earlier holder, and that earlier holder. | Only while that recourse request is open |
| **Contingent** | A participant in the guarantee chain: someone who has been a holder and therefore carries liability, without being the holder now. | Yes, once they have held it |

## Reconciling two vocabularies

The specification and this site describe the same bill with two levels of granularity, and the
difference is worth stating plainly because both terms appear in the code and the API.

[`concepts.md`](https://github.com/BitcreditProtocol/Bitcredit-Core/blob/main/docs/concepts.md)
defines **six** roles, Drawer, Payer, Holder, Contingent, Recoursee and Buyer, because those are
the six that determine what the API returns for a caller. Everything else in the table above is
a *position within an action* rather than a distinct role:

- **Payer** is the API's name for the drawee.
- **Payee** is the holder at the moment of issue.
- **Endorser** and **Seller** are the holder, seen from inside an endorsement or a sale.
- **Endorsee** is the party who becomes the holder as a result.
- **Guarantor**, in the 2024 outline, is what the specification now calls **Contingent**.

So the shorter list is not a subset. It is the same structure named by what the protocol has
to decide: *given this caller and this bill, which actions are available?*

## Roles that carry no permissions of their own

Three roles appear in a bill without granting any action:

- **Drawer**, relevant only in combination with another role. A drawer who is also the payee
  acts as a holder; a drawer who is also the drawee acts as a payer. The one thing the drawer
  contributes alone is that if drawer and drawee differ, the drawer can be recoursed against.
- **Contingent**, which carries liability but not permissions. What matters for a contingent
  participant is the roles they held earlier, which is where their payment history and states
  come from.
- **Payee**, after the bill has moved on. The position is historical; the permissions went with
  the holder.

## When one identity holds two roles

The protocol does not special-case these; it unions the permissions.

- **Holder is also the payer**, for instance because the bill was endorsed back to the drawee.
  They may perform both holder and payer actions, so they can request acceptance and then accept
  the same bill.
- **Payer is also the buyer**: payer actions plus buyer actions.
- **Drawer is also the drawee**, which is a self-drafted bill. Nobody can be recoursed against the
  drawer in this case, because drawer and drawee are the same party and the drawee is always
  removed from the recourse list.

## What each role may actually do

Permissions depend on the bill's state as much as on the role. That combination is set out in
[General conditions](general-conditions.md) and, action by action, in
[Operations](../operations/).
