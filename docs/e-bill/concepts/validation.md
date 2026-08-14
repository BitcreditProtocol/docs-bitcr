# Validation

When a block arrives, it is checked in five nested stages. They run cheapest first: each stage
assumes everything outside it already held, so the expensive coherency work only ever runs on
data that has already proved it is well-formed.

## The five stages

1. **Payload verification.** *Is this even a block?*
   The incoming bytes are checked for being a block at all, before anything is trusted enough to
   deserialize further.

2. **Outer integrity.** *Is this a valid block that can be added to this chain?*
   The block's own hashes are checked, and its link to the previous block.

3. **Inner payload validation.** *Is the block data valid?*
   The decoded contents are checked: identifiers, dates, currencies, sums.

4. **Inner integrity.** *Was the block signed by who it claims signed it?*
   The signature is verified against the claimed signer's key.

5. **Chain-order validation.** *Are the blocks in the correct order of flow?*
   The block is checked against the bill's history: does this action make sense as the next step,
   given every action before it?

Stage 5 is where [general conditions](general-conditions.md) are enforced. A structurally
perfect, correctly signed `RequestToPay` still fails here if the bill was already paid.

The [specification renders this as a nested state diagram](https://github.com/BitcreditProtocol/cats/blob/main/Bitcredit-Core/bill_validation.md);
the nesting is the point: stage 5 sits inside stage 4 sits inside stage 3, and so on.

## Two kinds of check, kept apart

The specification is careful to separate:

- **Data validation.** Are the NodeIds well-formed, the dates real, the currency known, the sum
  parseable? This is stages 1 to 4.
- **Action validation.** Is this action available to this participant, given this bill's state?
  This is stage 5, and it is what the [operation pages](../operations/) document.

A page saying "who can perform this action and when" is describing action validation only. It
assumes the data is already well-formed.

## Validation when a bill is shared

An external party, such as a mint deciding on a quote or a court hearing a claim, receives a bill
without the keys to write to it. They still run the full check, plus two more:

- the plaintext hash recorded in each block is compared against the plaintext data supplied
  alongside it, so the encrypted and unencrypted versions must agree;
- the payload signature must belong to the holder the bill data claims it does.

This is what makes a shared bill trustworthy without being writable. See
[Sharing bills](../transport/sharing-bills.md).
