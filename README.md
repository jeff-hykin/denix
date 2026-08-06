# Denix - Nix to JavaScript Translator

A Nix → JavaScript translator with 1-to-1 parity for Nix 2.18 builtins, implemented in Deno.

[![Tests](https://img.shields.io/badge/tests-538%20passing-brightgreen)](#testing)
[![Nix](https://img.shields.io/badge/Nix-2.18-blue)](https://nix.dev/manual/nix/2.18/language/builtins)
[![Deno](https://img.shields.io/badge/Deno-latest-blue)](https://deno.land/)

## Status

**Translator:** ✅ 100% complete (87/87 tests passing)
**Runtime:** ✅ 102 builtins implemented, 82 tested (80.4% coverage) 🎯
**Derivations:** ✅ All derivation tests passing (12/12)
**Goal:** ✅ 80% coverage milestone achieved!

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
- ✅ **102 Nix builtins** - All Nix 2.18 builtins implemented (100% feature complete)
- ✅ **80.4% test coverage** - 82/102 builtins tested with 538 passing tests
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
│   └── tests/              # Test suite (34 files, 538 tests)
├── tools/                  # Utilities (hashing, store paths, parsing, 10 modules)
├── test.sh                 # Smart test runner with filters
└── prompt.md               # Current priorities & remaining work
```

## Testing

**Current coverage:** 538 tests passing across 34 test files
- Runtime builtins: ~370+ tests (17 files)
- Translator: 87 tests (4 files)
- Import system: 49 tests (5 files)
- Derivations: 12 tests (2 files)
- Infrastructure: 30+ tests (4 files)
- Integration: 66+ tests (2 files - nixpkgs.lib validation)

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

### Implemented Builtins (102/102)

✅ All Nix 2.18 builtins implemented (100% feature complete)
✅ 82/102 tested (80.4% coverage) 🎯

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

**✅ 80% test coverage milestone achieved!**

Remaining work:
- 20/102 builtins untested (19.6%) - all medium/low priority
- Optional: Test medium-priority builtins (context ops, store ops, hashing)
- Recommended: Expand nixpkgs.lib testing (lists.nix, attrsets.nix, options.nix)

See [prompt.md](prompt.md) for remaining work.

## Key Design Decisions

1. **BigInt for integers** - Correct integer division (1/2 = 0, not 0.5)
2. **Object.create() for scopes** - Preserves lazy evaluation getters
3. **~/.cache/denix/store/** - No root permissions needed
4. **URL imports only** - Zero npm/jsr dependencies

## Dependencies

- Deno standard library (URL imports)
- tree-sitter-nix (parser, via esm.sh)
- @std/assert (testing)

## Contributing

### Adding Tests for Remaining Builtins

20 builtins remain untested (all medium/low priority):
- Context operations (4): addErrorContext, appendContext, hasContext, unsafeDiscardStringContext
- Store operations (5): storeDir, storePath, toFile, placeholder, outputOf
- Hashing (2): hashString, hashFile
- Derivation (3): derivationStrict, unsafeDiscardOutputDependency, unsafeGetAttrPos
- Control flow (4): break, traceVerbose, genericClosure
- Advanced (2): fetchClosure, nixPath

See [prompt.md](prompt.md) for detailed implementation guide.

## License

MIT
