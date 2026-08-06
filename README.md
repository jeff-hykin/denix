# Denix - Nix to JavaScript Translator

A Nix → JavaScript translator with 1-to-1 parity for Nix 2.18 builtins, implemented in Deno.

[![Tests](https://img.shields.io/badge/tests-805%20passing-brightgreen)](#testing)
[![Nix](https://img.shields.io/badge/Nix-2.18-blue)](https://nix.dev/manual/nix/2.18/language/builtins)
[![Deno](https://img.shields.io/badge/Deno-latest-blue)](https://deno.land/)

## Status

**Translator:** ✅ 100% complete
**Runtime:** ✅ all Nix builtins implemented and exercised by tests (805 passing unit tests)
**Derivations:** ✅ byte-identical .drv output vs real Nix across the stdenv closure (515/515)
**Build:** ✅ builds cowsay from nixpkgs end-to-end (substitution + local stdenv phases)

## Quick Start

Install the `denix` CLI globally with Deno (no Nix installation required):

```bash
# From the web
deno install -g --allow-all --name denix "https://raw.esm.sh/gh/jeff-hykin/denix@claude3/main/cli/denix.js"

# Or from a local clone
deno install -g --allow-all --name denix ./main/cli/denix.js
```

Then:

```bash
denix --help                                  # colorized help for all subcommands

# Translate Nix to readable JavaScript
denix translate default.nix                   # print translated JS to stdout
denix translate -E '{ a = 1; b = a + 1; }'    # translate an inline expression
denix translate default.nix -o default.js     # write JS to a file

# Evaluate Nix and print the result
denix eval -E '1 + 2'                         # 3
denix eval default.nix -A version             # select an attribute path
denix eval -E '{ a = [ 1 2 ]; }' --json       # JSON output (--xml works too)
denix eval shell.nix --arg 'pkgs=import <nixpkgs> {}'

# Build derivations (writes to ~/.cache/denix/store, symlinks ./result)
denix build default.nix
denix build -E '(import <nixpkgs> {}).cowsay'
denix build ./my-flake#packages.aarch64-darwin.default
denix build default.nix --dry-run             # print the .drv path only
```

## Running the Test Suite

```bash
# Run all tests
./test.sh

# Run specific test categories
./test.sh types        # Type checking tests
./test.sh lists        # List operation tests
./test.sh translator   # Translator tests
./test.sh derivation   # Derivation tests

# Or use deno directly
deno test --allow-all
```

## Features

- ✅ **`denix` CLI** - translate, eval, and build from the command line (`deno install`-able)
- ✅ **All Nix builtins** - every Nix 2.18 builtin implemented and covered by tests (805 passing)
- ✅ **Import system** - `builtins.import` and `builtins.scopedImport` fully working
- ✅ **Derivations** - Full derivation support (12/12 tests passing)
- ✅ **Network fetchers** - fetchGit, fetchTarball, fetchurl, fetchTree, fetchMercurial, path, filterSource
- ✅ **Pure Deno** - Zero npm/jsr dependencies, only URL imports

## Using the Runtime

No install needed — import straight from esm.sh:

```javascript
import { builtins, operators } from "https://raw.esm.sh/gh/jeff-hykin/denix@claude3/main/runtime.js"

// Type checking
builtins.isAttrs({a: 1})       // true
builtins.typeOf(42n)            // "int"
builtins.typeOf(3.14)           // "float"

// List operations
builtins.length([1n, 2n, 3n])   // 3n
builtins.head([1n, 2n, 3n])     // 1n
builtins.map(x => x * 2n)([1n, 2n, 3n])  // [2n, 4n, 6n]

// Operators
operators.add(1n, 2n)           // 3n
operators.divide(10n, 3n)       // 3n (integer division)
```

## Importing Nix Code

`builtins.import` evaluates real Nix files — local paths or URLs — and returns them as JavaScript values (Nix ints become BigInts, attrsets become objects, functions become functions):

```javascript
import { builtins } from "https://raw.esm.sh/gh/jeff-hykin/denix@claude3/main/runtime.js"

// Import a local .nix file
const flake = builtins.import("/path/to/project/flake.nix")
flake.description                  // "my flake"
flake.outputs                      // a callable JS function

// Import Nix code straight from a URL
const remoteFlake = builtins.import(
    "https://cdn.jsdelivr.net/gh/jeff-hykin/denix@claude3/examples/flake-a/flake.nix"
)
// Relative imports inside a URL-imported file resolve against that URL,
// so `import ./lib/helper.nix` inside it fetches the sibling URL.

// .json files work too (Nix semantics: numbers become BigInts)
const data = builtins.import("/path/to/data.json")

// Flakes with inputs: builtins.getFlake resolves inputs recursively
const resolved = await builtins.getFlake("path:/path/to/project")
resolved.outputs                   // outputs called with resolved inputs
```

## Using the Translator

```javascript
import { convertToJsSync } from "https://raw.esm.sh/gh/jeff-hykin/denix@claude3/translator.js"

const nixCode = `
  let
    x = 1;
    y = 2;
  in x + y
`

const jsCode = convertToJsSync(nixCode)  // readable JS that maps 1-to-1 to the Nix
```

## Project Structure

```
denix/
├── denix                   # CLI entry point (translate / eval / build)
├── translator.js           # Nix → JS translator
├── main/
│   ├── cli/denix.js        # CLI implementation (cliffy)
│   ├── runtime.js          # 102 Nix builtins + operators (2,750+ lines)
│   ├── builder.js          # Derivation builder (local build + cache substitution)
│   ├── import_cache.js     # Import caching & circular detection
│   ├── import_loader.js    # Nix file loading & evaluation
│   ├── fetcher.js          # HTTP downloads with retry logic
│   ├── tar.js              # Tarball extraction
│   ├── nar_hash.js         # NAR directory hashing
│   ├── store_manager.js    # Store path management
│   └── tests/              # Test suite (52 files, 805 tests)
├── tools/                  # Utilities (hashing, store paths, parsing, 10 modules)
├── test.sh                 # Smart test runner with filters
└── prompt.md               # Current priorities & remaining work
```

## Testing

**Current coverage:** 805 unit tests passing across 52 files (`main/tests/`), plus conformance suites under `tests/translation/` (fetchers 47/47, translation output fidelity, derivation byte-fidelity vs real Nix)

All tests pass in ~4 minutes.

**Smart test runner:**
```bash
./test.sh              # Run all tests
./test.sh math         # Run math & bitwise tests
./test.sh lists        # Run list operation tests
./test.sh translator   # Run translator tests
./test.sh derivation   # Run derivation tests
./test.sh integration  # Run nixpkgs.lib integration tests
```

**Test by pattern:**
```bash
./test.sh fetchGit     # Run tests matching "fetchGit"
deno test --allow-all --filter="import"
```

## Implementation Status

### Implemented Builtins

✅ All Nix 2.18 builtins implemented and exercised by the test suites

**Categories:**
- Type checking: isNull, isBool, isInt, isFloat, isString, isList, isAttrs, isPath, isFunction, typeOf
- Lists: map, filter, foldl', all, any, elem, head, tail, length, etc.
- Attrsets: hasAttr, getAttr, mapAttrs, removeAttrs, intersectAttrs, etc.
- Strings: substring, stringLength, split, match, replaceStrings, etc.
- Math: add, sub, mul, div, lessThan, ceil, floor, bitwise ops
- Derivations: derivation, toPath, storePath, path, etc.
- Fetchers: fetchGit, fetchTarball, fetchurl, fetchTree, fetchMercurial, getFlake, filterSource
- Import: import, scopedImport
- Control: throw, trace, seq, deepSeq, tryEval
- And more...

See [main/runtime.js](main/runtime.js) for complete implementation.

## Development Status

Working today: byte-identical derivations vs real Nix (515/515 across the stdenv closure), binary-cache substitution, local builds (cowsay end-to-end), flakes, and a green main test suite (805 tests) plus the fetchers conformance suite (47/47).

Remaining work (aspirational conformance suites): nix-hash CLI emulation, nixpkgs module system, and parts of the upstream nix_lang/network suites.

## Key Design Decisions

1. **BigInt for integers** - Correct integer division (1/2 = 0, not 0.5)
2. **Object.create() for scopes** - Preserves lazy evaluation getters
3. **~/.cache/denix/store/** - No root permissions needed
4. **URL imports only** - Zero npm/jsr dependencies

## Dependencies

- Deno standard library (URL imports)
- tree-sitter-nix (parser, via esm.sh)
- @std/assert (testing)

## License

MIT
