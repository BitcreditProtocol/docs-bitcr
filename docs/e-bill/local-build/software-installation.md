# Software installation

## Rust

Rust **1.85 or newer**, plus a recent toolchain.

## System libraries

### Ubuntu

```bash
sudo apt install -y libclang-dev pkg-config build-essential
```

### Fedora

```bash
sudo dnf install -y make automake gcc gcc-c++ kernel-devel clang-devel
sudo dnf install -y pkgconf-pkg-config @development-tools
```

### Windows

In an MSYS2 terminal:

```bash
pacman -S mingw-w64-x86_64-gcc mingw-w64-x86_64-make mingw-w64-x86_64-llvm
pacman -S base-devel pkgconf
```

## wasm-pack

Building the WebAssembly module needs
[`wasm-pack`](https://drager.github.io/wasm-pack/installer/):

```bash
curl https://drager.github.io/wasm-pack/installer/init.sh -sSf | bash
```

## A local HTTP server

To serve the built WASM artifacts, any static server will do.
[`http-server`](https://www.npmjs.com/package/http-server) is what the repository's examples use.

## Next

[Startup parameters](startup-parameters.md) — building and running what you have just installed.
