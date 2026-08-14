# Request to pay

Asking the drawee to settle. This is the action that starts the endgame: everything after it either
ends the bill as **paid**, or as **only recoursable**.

## Who may perform it

The **holder**.

## Conditions

- The default rule: the bill can't be **blocked**, **recoursed to the end**, **only recoursable**,
  or **paid**.

That is the entire list. It looks too short — and it is worth understanding why it isn't.

Nothing says "you cannot request payment twice". Nothing needs to. A `RequestToPay` can only end
three ways: the bill gets paid, the payer rejects, or the deadline expires. The first makes the bill
**paid**; the other two make it **only recoursable**; and until one of them happens the bill is
**blocked**. Every outcome trips a condition that already forbids a second request. See
[General conditions](../concepts/general-conditions.md#why-the-preconditions-look-so-short).

Note also what is *not* required: the bill does **not** have to be accepted. Payment can be
requested on a bill the drawee never signed.

## Deadline

The holder sets a deadline, with a floor of the **UTC end of day of the request plus 48 hours**.

While it is open the bill is **blocked** — waiting for payment — and only three things resolve it:
payment arriving, [rejection](pay.md#rejecting-payment), or expiry.

### Requesting before maturity behaves differently

This is the one genuinely surprising rule on this page.

**Requested after the maturity date** — the deadline is exactly the one the holder set. When it
expires, the bill becomes **only recoursable**.

**Requested before the maturity date** — the bill is blocked until the deadline the holder set, but
when that deadline passes the bill simply **unblocks**. It does not become only recoursable. The
real expiry in this case falls **48 hours after the maturity date**, at UTC end of day.

The effect is that an early request cannot be used to force a bill into recourse ahead of time. A
holder who asks for payment in September on a bill maturing in November gets a blocked bill and,
when their deadline lapses, an unblocked one — not a defaulted counterparty.

## Result

A `RequestToPay` block, and a bill blocked waiting for payment.

## Next

- [Pay](pay.md) — how payment actually happens, and how the payer can refuse.
- [Recourse](recourse.md) — the path after rejection or expiry.
