# Configuration

The application is configured with a `Config` struct:

```rust
pub struct Config {
    pub bitcoin_network: String,
    pub nostr_relays: Vec<url::Url>,
    pub esplora_base_urls: Vec<String>,
    pub surreal_db_connection: String,
    pub job_runner_initial_delay_seconds: u32,
    pub job_runner_check_interval_seconds: u32,
}
```

## Options

| Option | What it does |
| --- | --- |
| `bitcoin_network` | which Bitcoin network to use: `mainnet`, `testnet`, `testnet4` or `regtest` |
| `nostr_relays` | the Nostr relay endpoints to publish to and read from |
| `esplora_base_urls` | Esplora base URLs used for payment checks. The first is primary; on a 5xx error the client falls back to the next. A single URL string is also accepted, for backward compatibility |
| `surreal_db_connection` | the SurrealDB connection string |
| `job_runner_initial_delay_seconds` | how long to wait before cron jobs first run |
| `job_runner_check_interval_seconds` | how often cron jobs run after that |

## Example

```javascript
let config = {
    bitcoin_network: "testnet",
    esplora_base_urls: [
        "https://esplora.minibill.tech",
        "https://blockstream.info"
    ],
    nostr_relays: ["wss://relay.wildcat0.clowder-dev.minibill.tech"],
    surreal_db_connection: "indxdb://default",
    job_runner_initial_delay_seconds: 1,
    job_runner_check_interval_seconds: 60,
};
```

## Notes on individual options

**`bitcoin_network` is not cosmetic.** The network character is part of every
[node id and bill id](../identity-record/) the instance creates, so identifiers made on testnet are
structurally distinguishable from mainnet ones. Changing the network does not migrate anything; it
gives you a different world.

**`esplora_base_urls` is how payment is detected.** Paying a bill
[writes no block](../operations/pay.md) — the system watches the chain instead, through Esplora. If
these URLs are wrong or unreachable, payments will not be noticed, and bills will drift toward their
deadlines as though nobody had paid.

**`nostr_relays` determines what you can see and be seen by.** Encrypted chains live on the relays;
an instance pointed at relays where its counterparties do not publish will simply find nothing. More
than one relay is a redundancy measure — see [Transport](../transport/).

**`surreal_db_connection`** is `indxdb://default` in the browser, which means IndexedDB. See
[Startup parameters](startup-parameters.md) for how to reset it.
