# Issue

Issuing creates the bill and its first block. Every other action is a continuation of this one.

## Who may perform it

Only the **issuer**, the drawer of the bill. There is no prior state to satisfy, since this is
the first action there is.

## Conditions

- The **issuer can't be anonymous.**
- The **payer can't be anonymous.**
- The **payer can't be the payee** at the time of issue.

The first two are not enforced by a check that could be skipped: drawer and drawee are typed as
*identified* participants, so a bill with an anonymous one cannot be built in the first place. See
[Field description](../content-of-bill/field-description.md).

The third exists because a bill instructing someone to pay themselves is not an obligation. Note
the wording: *at the time of issue*. Nothing stops a bill later being endorsed back to the payer;
that is an ordinary situation the protocol handles by granting them both holder and payer actions.

## The three types

Which type a bill is follows from who pays whom:

| Type | Value | Who pays | Who is paid | Parties |
| --- | --- | --- | --- | --- |
| `PromissoryNote` | 0 | the drawer | the payee | two |
| `SelfDrafted` | 1 | the drawee | the drawer | two |
| `ThreeParties` | 2 | the drawee | the payee | three |

**`PromissoryNote`** has no drawee in substance: whoever signs is whoever pays. The issuer
promises to pay the payee themselves.

**`SelfDrafted`** names the drawer as their own payee, so the drawee pays the drawer directly. Two
parties, one instrument. Because drawer and drawee are the same party in the recourse calculation's
terms, a self-drafted bill leaves the drawer unavailable as a recourse target. See
[Recourse](recourse.md).

**`ThreeParties`** is the classic draft: the drawer orders the drawee to pay a third party. Three
roles, three sets of obligations.

## What is set at issue

The parties, the sum and currency, the issue and maturity dates, the places of issue and of
payment, and any attached files. See
[Field description](../content-of-bill/field-description.md) for each field.

Maturity is the field that makes this a credit instrument rather than a payment instruction, and
it drives the deadline rules for requesting payment later.

## Result

An `Issue` block, and a bill in its opening state:

- the **payee is the holder**
- neither accepted nor requested to accept, neither paid nor requested to pay
- the holder may request acceptance, request payment, endorse, or offer to sell
- the payer may accept, or reject acceptance
- the holder may **not** mint yet, because minting requires an accepted bill

## Next

- [Request to accept](request-to-accept.md): get the drawee's signature on the obligation.
- [Endorse](endorse.md): pass it on as payment.
- [Offer to sell](sale.md): sell it for money now.
