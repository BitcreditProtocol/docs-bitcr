# docs.bitcr.org

Bitcredit documentation. A [VuePress](https://vuejs.press/) site published to
<https://docs.bitcr.org> from the `gh-pages` branch.

It documents two things:

- **E-Bill** — the electronic bill of exchange: its identifiers, its content, and every
  operation a participant can perform on it.
- **Wildcat Mint** — what a Wildcat is and what it does with a bill, at an overview level.

## Where the content comes from

This site does not invent protocol facts. Every technical claim traces to one of these, and
a page that cannot cite one of them does not get written:

| Source | Covers |
| --- | --- |
| [`cats/Bitcredit-Core/ids_and_keys.md`](https://github.com/BitcreditProtocol/cats/blob/main/Bitcredit-Core/ids_and_keys.md) | NodeId and BillId formats, network prefixes, key and encryption schemes |
| [`cats/Bitcredit-Core/bill_actions.md`](https://github.com/BitcreditProtocol/cats/blob/main/Bitcredit-Core/bill_actions.md) | bill types, every action, recoursee derivation |
| [`cats/Bitcredit-Core/bill_validation.md`](https://github.com/BitcreditProtocol/cats/blob/main/Bitcredit-Core/bill_validation.md) | validation pipeline, per-action preconditions |
| [`cats/Bitcredit-Core/bill_sharing.md`](https://github.com/BitcreditProtocol/cats/blob/main/Bitcredit-Core/bill_sharing.md) | sharing a bill with a mint or a court |
| [`Bitcredit-Core/docs/concepts.md`](https://github.com/BitcreditProtocol/Bitcredit-Core/blob/main/docs/concepts.md) | roles, bill states, payment actions |
| [`Bitcredit-Core/docs/`](https://github.com/BitcreditProtocol/Bitcredit-Core/tree/main/docs) | prerequisites, configuration, WASM, versioning |
| [bit.cr](https://bit.cr) and [bitcr.org](https://bitcr.org) | Wildcat overview, glossary, FAQ |

[CATS](https://github.com/BitcreditProtocol/cats) — the Credit Assurance Token Standard — is
the specification. When this site and CATS disagree, CATS is right and this site is a bug.

## House rules

1. **Cite the spec, don't paraphrase from memory.** If a deadline is "minimum UTC end-of-day
   plus 48 hours", it is because `bill_validation.md` says so.
2. **Do not document architecture the protocol has left behind.** The DHT/libp2p transport,
   RSA encryption and ed25519 keys were all replaced. They are described in exactly one place,
   [Migration from the DHT](docs/e-bill/transport/migration-from-dht.md), in the past tense.
   Everywhere else the answer is Nostr and Secp256k1.
3. **One page per idea.** Preconditions shared by every operation live in
   `operations/README.md` and are linked, not restated ten times.
4. **A page with only a heading is worse than no page.** It costs a reader a click to learn
   nothing. Leave it out of the sidebar and record the gap below instead.

## Running locally

Requires Node 20 or newer and pnpm 9.

```bash
pnpm install
pnpm docs:dev
```

The dev server reloads on save. Editing `docs/.vuepress/styles/index.scss` needs a rebuild:

```bash
pnpm docs:build && pnpm docs:dev
```

## Deploying

Pushing to `master` runs [`.github/workflows/docs.yml`](.github/workflows/docs.yml), which
builds the site and publishes `docs/.vuepress/dist` to `gh-pages`. GitHub Pages serves that
branch at `docs.bitcr.org` (CNAME in `docs/.vuepress/public/CNAME`, HTTPS enforced).

Pull requests are checked by [`.github/workflows/build.yml`](.github/workflows/build.yml),
which installs with `--frozen-lockfile --strict-peer-dependencies`, builds, and fails on stub
pages or sidebar entries that point at nothing. It does not deploy. Since the deploy workflow
only fires on `master`, this is the only thing standing between a broken dependency bump and
the live site.

Navigation is not automatic: a new page has to be added to the `sidebar` in
[`docs/.vuepress/config.js`](docs/.vuepress/config.js), or it is only reachable by URL.

## Known gaps

Deliberately not written yet, rather than written badly:

- **User documentation.** Screenshots, settings reference and journey map cannot be derived
  from the specifications; they need the current app in front of you.
  `docs/e-bill/user-documentation/` points at the bit.cr guides in the meantime.
- **Wildcat Mint depth.** Only the overview is public. The quote state machine, service
  topology, keyset derivation and API surface are specified in the internal `internal_cats`
  repository and are not published here.
- **Identity field list.** `docs/e-bill/identity-record/field-description.md` predates the
  current wallet. Check it against the app before treating it as current.
- **Terms of use.** The 2024 outline listed a terms-of-use page for each section. Neither
  exists: they need legal review, not technical writing.

## Licence

[MIT](LICENSE).
