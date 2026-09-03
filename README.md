# docs.bitcr.org

Bitcredit documentation. A [VuePress](https://vuejs.press/) site published to
<https://docs.bitcr.org> from the `gh-pages` branch.

It documents two things:

- **E-Bill**: the electronic bill of exchange, covering its identifiers, its content, and every
  operation a participant can perform on it.
- **Wildcat Mint**: what a Wildcat is and what it does with a bill, at an overview level.

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

[CATS](https://github.com/BitcreditProtocol/cats), the Credit Assurance Token Standard, is
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
5. **No em dashes.** Use a colon, a semicolon, a comma pair, or a full stop, and rewrite the
   sentence around whichever you pick rather than swapping the character. Most of the time the
   clause after the dash can stand on its own as a sentence, which reads better than either.

## Running locally

Requires Node 24, the version in `.nvmrc`, which `nvm use` and `fnm use` pick up and CI reads
through `node-version-file`. VuePress itself needs Node 22.18 or newer, so Node 20 is out. pnpm is
pinned to 11.25.0 in the `packageManager` field of `package.json`. With `corepack enable`, or with
pnpm 10 or newer installed, that version is picked up automatically, so Dependabot, CI and local
installs all write the same lockfile.

| Command | Does |
|---|---|
| `pnpm install` | Install dependencies exactly as locked |
| `pnpm docs:dev` | Dev server, reloads on save |
| `pnpm docs:clean-dev` | Dev server after clearing the VuePress cache |
| `pnpm docs:build` | Build the site into `docs/.vuepress/dist` |
| `pnpm docs:update-package` | Bump the VuePress packages to their latest release |
| `npx wrangler dev` | Serve a build the way the Cloudflare Worker will, on `localhost:8787` |

Editing `docs/.vuepress/styles/index.scss` does not hot-reload: run `pnpm docs:build`, then start
the dev server again.

## Deploying

Pushing to `master` runs [`.github/workflows/docs.yml`](.github/workflows/docs.yml), which
builds the site and publishes `docs/.vuepress/dist` to `gh-pages`. GitHub Pages serves that
branch at `docs.bitcr.org` (CNAME in `docs/.vuepress/public/CNAME`, HTTPS enforced).

The site is moving to Cloudflare Workers. The repository is connected to Workers Builds, which
builds every push with `pnpm docs:build`; for `master` it then runs `npx wrangler deploy` to the
`docs-bitcr` Worker, for any other branch `npx wrangler versions upload`. That upload gives the
branch a preview at `https://<branch>-docs-bitcr.bitcredit.workers.dev`, slashes in the branch
name turned into hyphens, and reports as the "Workers Builds: docs-bitcr" check on the pull
request. The Worker is configured in [`wrangler.jsonc`](wrangler.jsonc); the build and preview
commands live in the Cloudflare dashboard. The build image takes Node from `.nvmrc` and pnpm from
`packageManager`. Until DNS moves, `docs.bitcr.org` is still served by GitHub Pages as above.
Two things stop builds without a visible error: the Cloudflare GitHub App must list this
repository, and the preview command must be `versions upload`, not `wrangler preview`, which is
a private beta. `npx wrangler dev` serves a local build.

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
