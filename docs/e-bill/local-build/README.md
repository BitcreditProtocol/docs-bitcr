# Local build

Building and running [Bitcredit-Core](https://github.com/BitcreditProtocol/Bitcredit-Core), the
E-Bill implementation, locally.

The core is written in Rust and exposes the same API two ways: as a web API, and as a WebAssembly
module for use in a browser. The WASM path is the one a wallet or a front end uses, and it is the
one these pages cover.

- [Software installation](software-installation.md): prerequisites, per operating system.
- [Configuration](configuration.md): the `Config` struct and every option in it.
- [Startup parameters](startup-parameters.md): building, serving, and resetting local state.

## The crates

The repository is a workspace. Knowing which crate does what makes the rest easier to follow:

| Crate | Responsibility |
| --- | --- |
| `bcr-ebill-core` | the protocol itself: blocks, validation, crypto |
| `bcr-ebill-persistence` | storage |
| `bcr-ebill-transport` | Nostr transport |
| `bcr-ebill-api` | the API layer that wires those together |
| `bcr-ebill-wasm` | the WebAssembly bindings and TypeScript types |

Tests follow the same shape: thorough unit tests in the core, persistence and transport crates;
integration tests at the API layer; and basic wiring tests on the outer WASM layer.

## Versioning

Semantic versioning from the first beta release, `0.5.0`, onward: `major.minor.patch`, for example
`0.4.12`. Hotfixes append a further number: `0.4.12-1`.
