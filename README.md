# docs.bitcr.org

Bitcredit documentation. A [VuePress](https://vuejs.press/) site served at
<https://docs.bitcr.org> by a Cloudflare Worker.

It documents two things:

- **E-bill**: the electronic bill of exchange, covering its identifiers, its content, and every
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
| `pnpm exec wrangler dev` | Serve a build the way the Cloudflare Worker will, on `localhost:8787` |
| `pnpm exec wrangler deploy --dry-run` | Validate production packaging after building, without uploading |

Editing `docs/.vuepress/styles/index.scss` does not hot-reload: run `pnpm docs:build`, then start
the dev server again.

## Deploying

`docs.bitcr.org` is served by the `docs-bitcr` Cloudflare Worker as static assets, configured in
[`wrangler.jsonc`](wrangler.jsonc). Workers Builds builds pushes to `master` with
`pnpm docs:build`, then runs `npx wrangler deploy` for production. Build commands, branch controls,
the custom domain and its DNS record are managed in the Cloudflare dashboard. The build image
takes Node from `.nvmrc` and pnpm from `packageManager`.

The last reported dashboard state, recorded in [PR #27](https://github.com/BitcreditProtocol/docs-bitcr/pull/27)
on 2026-10-09, has preview branch builds disabled. While disabled, branch pushes start no
Cloudflare build, and pull requests get no preview or "Workers Builds" check. That PR reports
branch failures on #21, #23, #24 and #26; #26 failed at `wrangler versions upload` with a Worker
name mismatch. Production uses the same `docs-bitcr` name successfully. The cause is unconfirmed.

### Proposed preview build fix

[Cloudflare Support's 2026-10-12 recommendation](https://github.com/BitcreditProtocol/docs-bitcr/issues/20#issuecomment-6125599036)
is to install Wrangler 4.135.0 or newer as a project dependency, add a `previews` block, and test a
fresh push. This repository pins Wrangler 4.149.0 in `devDependencies` and `pnpm-lock.yaml`.
Install development dependencies in Workers Builds so `npx wrangler` uses that local version;
`pnpm exec wrangler --version` verifies it without downloading another version.

The empty `previews` block is sufficient for this static site, which has no separate variables
or resource bindings. Assets and compatibility settings stay at the top level, as described in
[Cloudflare's preview configuration guide](https://developers.cloudflare.com/workers/previews/configuration/).
`preview_urls: true` permits URLs; it does not enable branch build triggers. These repository
changes prepare the suggested fix. They do not change dashboard settings or establish that
automatic preview builds now work.

To validate on Cloudflare after publishing the branch:

1. Confirm the Cloudflare GitHub App includes this repository, and the build log uses the pinned
   Node, pnpm and Wrangler versions with development dependencies installed.
2. Check the dashboard's preview mode and command before enabling preview builds. Worker Previews
   uses `pnpm exec wrangler preview` (equivalent to Cloudflare's `npx wrangler preview`), not the
   older `wrangler versions upload` workflow. If the Worker still needs the
   [one-time switch to Worker Previews](https://developers.cloudflare.com/workers/ci-cd/builds/build-branches/#existing-workers-connected-to-builds),
   have the owner review it separately: Cloudflare says the switch cannot be reversed.
3. With preview builds enabled and the command confirmed, push a fresh branch commit. Verify the
   automatically triggered build, its preview URL, and the pull request's Workers Builds check.
   A successful local dry run or manual retry does not validate the push-event failure in
   [issue #20](https://github.com/BitcreditProtocol/docs-bitcr/issues/20).
4. If it still fails, collect the failed build ID, Worker ID, full build-page screenshot including
   the Logs tab, and Wrangler version for Support. Support suggests reinstalling the GitHub
   integration as a fallback if the failure persists.

Pull requests are checked by [`.github/workflows/build.yml`](.github/workflows/build.yml),
which installs with `--frozen-lockfile --strict-peer-dependencies`, builds, and fails on stub
pages or sidebar entries that point at nothing. It also checks Wrangler's production packaging
with `deploy --dry-run`, without deploying. Wrangler 4.149.0 has no dry run for `wrangler preview`,
so the Worker Previews deployment path must be tested on Cloudflare. While preview branch builds
are disabled, this is the only pull request build. It remains necessary when previews are enabled
because Workers Builds does not perform the strict peer, stub-page or sidebar checks.

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
