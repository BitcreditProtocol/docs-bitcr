# Field description

What a bill holds. The fields divide into three groups: the parties, the terms, and the state the
protocol maintains on top of them.

## Participants

1. **Drawer**
   - The issuer of the bill.
   - **Must be an identified party.** An anonymous identity cannot issue a bill.

2. **Drawee**
   - The party the bill is drawn against: the one asked to accept and to pay.
   - **Must be an identified party.**
   - Cannot be the same entity as the payee at the time of issue.

3. **Payee**
   - The party to be paid, and the first holder.
   - May be anonymous.

4. **Endorsee**
   - The current endorsee, if the bill has been passed on. Absent on a bill that has never
     moved.
   - May be anonymous.

5. **Endorsements count**
   - How many times the bill has been endorsed.

6. **All participant node ids**
   - Every [node id](../identity-record/) that appears anywhere in the bill.

The distinction in 1–4 is enforced by the types themselves, not by a check that could be
forgotten: drawer and drawee are declared as *identified* participants, while payee and endorsee
are declared as participants that may be either. A bill with an anonymous drawee does not fail
validation; it cannot be constructed.

## Terms

7. **Sum** and **currency**
   - The amount payable and the currency it is payable in.

8. **Issue date** and **time of drawing**
   - The date on the instrument, and the timestamp at which it was actually drawn. They are
     separate fields because the date a bill bears and the moment it was created are not
     necessarily the same.

9. **Maturity date** and **time of maturity**
   - When the bill falls due, as a date and as a timestamp. Maturity is what makes a bill a
     credit instrument rather than a payment, and it drives the payment deadline rules described
     in [General conditions](../concepts/general-conditions.md).

10. **Country and city of issuing**
    - Where the bill was issued.

11. **Country and city of payment**
    - Where it is payable. Not necessarily where it was issued: a bill drawn in Austria may be
      payable in Singapore.

12. **Files**
    - Attached documents: invoices, delivery notes, whatever evidences the goods behind the bill.
      Each is held as a name, a content hash and a storage hash rather than as bytes. See
      [Backing up user material](../identity-record/upload-user-material.md).

## Maintained by the protocol

13. **Id**
    - The [bill id](bill-id-and-keys.md).

14. **State**
    - Acceptance, payment and mint state. See [Bill states](../concepts/bill-states.md).

15. **Status**
    - The derived summary of where the bill stands.

16. **Actions**
    - What the caller may do with the bill right now, given their roles. This is computed per
      caller, so two participants requesting the same bill receive different action lists. See
      [Operations](../operations/).

17. **Active notification**
    - The outstanding notification for this bill, if any.

::: tip Source
Field names and optionality read from
[`crates/bcr-ebill-wasm/src/data/bill.rs`](https://github.com/BitcreditProtocol/Bitcredit-Core/blob/main/crates/bcr-ebill-wasm/src/data/bill.rs).
The bill also carries a `current_waiting_state` field which is marked for deprecation in the
source and is deliberately not documented here. Use the state fields instead.
:::
