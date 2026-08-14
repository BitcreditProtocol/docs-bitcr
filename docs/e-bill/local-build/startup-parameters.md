# Startup parameters

## Building

From within the `bcr-ebill-wasm` crate.

Development build:

```bash
wasm-pack build --dev --target web
```

Release build:

```bash
wasm-pack build --target web
```

Artifacts land in `crates/bcr-ebill-wasm/pkg`, including generated TypeScript bindings.

## Running

Serve the crate directory with any static HTTP server:

```bash
http-server -c-1 .
```

Then open <http://localhost:8080/>. The repository ships `index.html` and `main.js` as a playground
for exercising the built module.

## Starting the API

The module is initialised with a [config object](configuration.md):

```javascript
import * as wasm from '../pkg/bcr_ebill_wasm.js';

async function start() {
    let config = {
        bitcoin_network: "testnet",
        nostr_relays: ["wss://relay.wildcat0.clowder-dev.minibill.tech"],
        surreal_db_connection: "indxdb://default",
        job_runner_initial_delay_seconds: 1,
        job_runner_check_interval_seconds: 60,
    };
    // ...
}
```

See `main.js` in the crate for fuller examples.

## Resetting local state

In the browser, SurrealDB is backed by IndexedDB. There are three ways to get back to a blank slate:

- clear IndexedDB in the browser's developer tools, under Storage;
- open the app in a different browser;
- open it in a private window.

::: warning A blank slate is a lost identity
Clearing local state destroys the keys stored there. Without the
[seed phrase](../identity-record/identity-restore-transfer.md) the identity — and every bill it was
party to — is unrecoverable. On testnet this is a convenience. Anywhere else it is not.
:::

## Which network you are on

`bitcoin_network` decides the network character in every identifier the instance creates, so a
testnet identity cannot be mistaken for a mainnet one. Switching the setting does not carry data
across.
