# Recourse

When a bill is dishonoured, the loss travels back along the chain of people who endorsed it. That is
recourse, and it is what the [endorsement chain](endorse.md) exists for.

Recourse only becomes available once the bill is **only recoursable**, meaning acceptance or payment
was refused or its deadline lapsed. At that point ordinary circulation is over and the remaining
question is who bears the loss.

## Who can be recoursed against

Not simply "anyone earlier". The eligible set is calculated, and the calculation is the most
intricate rule in the protocol. It is worth reading closely, because it determines who is on the hook.

### The derivation

1. **Collect all holders** from the bill, ignoring `Recourse` blocks:
   - for an `Issue` block, the holder is the **payee**
   - for an `Endorse` block, the holder is the **endorsee**
   - for a `Mint` block, the holder is the **mint**
   - for a `Sell` block, the holder is the **buyer**
2. **Iterate the holders until the caller finds themselves** as a holder or as the drawee. That
   locates the first block in which the caller held the bill. They may only recourse against holders
   who held it *before* that point, so every holder encountered before it goes on the list.
3. If the caller **was never a holder**, they can recourse against nobody. (This is the case for a
   party who is both drawer and drawee.)
4. If the **drawer is not the same as the drawee**, the drawer can also be recoursed against.
5. The **caller is removed**: one cannot recourse against oneself.
6. The **drawee is removed**. The drawee has already refused; recoursing against them is what
   recourse is an alternative to.
7. The list is **sorted by endorsement timestamp, descending**, most recent first.

The consequence of step 2 is the one that surprises people: **coming back round the chain does not
enlarge your options.** If you held a bill, passed it on, and received it again, your eligible
recoursees are still only those who held it before your *first* turn.

### Worked examples

These are the specification's own examples. Read `->` as "endorsed to".

#### Example 1

> Alice (Drawer & Drawee) → Bob (Payee) → Charly → Dave → Erin → Charly

**Charly** may recourse against:

- Bob (Payee)

Charly held the bill twice. Only Bob preceded his first turn. Dave and Erin held it *after* him, so
they are not available. Alice is both drawer and drawee, so step 4 does not add her and step 6
removes her.

#### Example 2

> Alice (Drawer) / Bob (Drawee) → Dave (Payee) → Charly → Erin → Charly

**Charly** may recourse against:

- Dave (Payee)
- Alice (Drawer, because drawer ≠ drawee)

Here the drawer and drawee are different parties, so step 4 applies and Alice joins the list. Bob,
the drawee, is removed by step 6.

#### Example 3

> Alice (Drawer & Drawee) → Bob (Payee) → Dave → Charly → Erin → Charly

**Charly** may recourse against:

- Bob (Payee)
- Dave (Endorsee)

Compare with Example 1: the only difference is that Dave now holds the bill *before* Charly rather
than after, which puts him on the list.

#### Example 4

> Alice (Drawer & Drawee) → Bob (Payee) → Dave → Charly → Erin

**Erin** may recourse against:

- Bob (Payee)
- Dave (Endorsee)
- Charly (Endorsee)

Erin is the last holder and held the bill only once, so every previous holder is eligible.

## Requesting recourse

### Who may perform it

The **holder**, who becomes the **recourser**.

### Conditions

- The bill can't be **blocked**, **recoursed to the end**, or **paid**.
- Plus, depending on which kind of recourse:
  - **for acceptance**: the bill must be **rejected to accept**, or have an expired
    `RequestToAccept` block;
  - **for payment**: the bill must be **rejected to pay**, or have an expired `RequestToPay` block.

Note that **only recoursable** is absent from the first line. Of course it is: being only
recoursable is the precondition for recourse, not an obstacle to it.

### Deadline

The recourser sets a deadline, with a floor of the **UTC end of day of the request plus 48 hours**.
Until it passes, the recoursee owes the recourser the sum, and the bill is **blocked** waiting for
that payment.

If the deadline expires, the bill is **unblocked and can be requested to recourse again**, possibly
against a different recoursee. An expired recourse request costs an attempt, not the claim.

### Result

A `RequestRecourse` block, and a bill blocked waiting for recourse.

## Recourse

### Conditions

- The bill has to be **waiting for recourse**: an unexpired, unrejected `RequestRecourse` must be
  the last block.
- The bill can't be **waiting for payment** or **waiting for sale**.
- The bill can't be **recoursed to the end** or **paid**.

### What triggers it

The recoursee paying, within the deadline. As everywhere, payment is detected rather than declared.
See [Pay](pay.md).

### Result

A `Recourse` block. The bill is **endorsed to the recoursee**, who becomes the holder. Having paid
the loss, they now hold the instrument and may pursue it themselves, including by recoursing further
back against holders who preceded *their* first turn.

That is how a loss walks up the chain: each step is a real settlement between two parties, not a
bookkeeping entry.

### Unless it was the last one

If the bill was recoursed to the **last possible recoursee**, with nobody earlier remaining, the bill
is **blocked permanently** and can only be resolved in court. This is the **recoursed to the end**
state, and it is terminal for every participant.

## Rejecting a recourse

### Who may perform it

The **recoursee**: specifically the one named in the last unexpired `RequestRecourse`, if that is the
last block.

### Conditions

- The bill has to be **waiting for recourse**.
- The bill can't be **waiting for payment** or **waiting for sale**.
- The bill can't be **recoursed to the end** or **paid**.
- The bill can't already be **rejected to recourse**.

### Result

A `RejectToPayRecourse` block, and the bill is **blocked permanently**, resolvable only in court.

This is the harshest outcome in the protocol, and the asymmetry is deliberate. A recoursee who
*ignores* the request lets the deadline lapse, and the bill unblocks so the recourser can try
elsewhere. A recoursee who *formally refuses* ends the protocol's involvement entirely: the dispute
is now a legal one, and the chain of signed blocks is the evidence either side takes to court.

## The court's view

A court does not need to be a participant. A bill can be shared with it read-only: full plaintext,
fully verifiable, with no ability to write. That is one of the two use cases the sharing mechanism
was built for. See [Sharing bills](../transport/sharing-bills.md).
