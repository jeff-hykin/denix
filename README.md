# Denix - Nix to JavaScript Translator

A Nix → JavaScript translator with 1-to-1 parity for Nix 2.18 builtins, implemented in Deno.

[![Tests](https://img.shields.io/badge/tests-538%20passing-brightgreen)](#testing)
[![Nix](https://img.shields.io/badge/Nix-2.18-blue)](https://nix.dev/manual/nix/2.18/language/builtins)
[![Deno](https://img.shields.io/badge/Deno-latest-blue)](https://deno.land/)

## Status

**Translator:** 87/87 tests passing
**Runtime:** 102 builtins implemented, 82 tested (80.4% coverage)
**Derivations:** 12/12 derivation tests passing
**Remaining work:** See [TODO.md](TODO.md) for nixpkgs.lib testing priorities

## Quick Start

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

- **102 Nix builtins** - All Nix 2.18 builtins implemented (100% feature complete)
- **80.4% test coverage** - 82/102 builtins tested with 538 passing tests
- **Import system** - `builtins.import` and `builtins.scopedImport` fully working
- **Derivations** - Full derivation support (12/12 tests passing)
- **Network fetchers** - fetchGit, fetchTarball, fetchurl, fetchTree, fetchMercurial, path, filterSource
- **Pure Deno** - Zero npm/jsr dependencies, only URL imports

## Using the Runtime

```javascript
import { builtins, operators } from "./main/runtime.js"

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

## Using the Translator

```javascript
import translate from "./main/translator.js"

const nixCode = `
  let
    x = 1;
    y = 2;
  in x + y
`

const jsCode = translate(nixCode)
const result = eval(jsCode)  // 3n
```

## Project Structure

```
denix/
├── main/
│   ├── translator.js       # Nix → JS translator (1,264 lines)
│   ├── runtime.js          # 102 Nix builtins + operators (2,750+ lines)
│   ├── import_cache.js     # Import caching & circular detection
│   ├── import_loader.js    # Nix file loading & evaluation
│   ├── fetcher.js          # HTTP downloads with retry logic
│   ├── tar.js              # Tarball extraction
│   ├── nar_hash.js         # NAR directory hashing
│   ├── store_manager.js    # Store path management
│   ├── registry.js         # Flake registry handling
│   └── tests/              # Test suite (39 files, 538 tests)
├── tools/                  # Utilities (hashing, store paths, resolvers)
├── test.sh                 # Smart test runner with filters
└── TODO.md                 # Remaining work priorities
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

All Nix 2.18 builtins implemented (100% feature complete)
82/102 tested (80.4% coverage)

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

Remaining work:
- Test 2 remaining fixture files (fetchers.nix, licenses.nix)
- Fetch and test high-priority nixpkgs.lib files (lists.nix, attrsets.nix, options.nix, etc.)
- Translator edge cases (pattern matching, string/path handling, operator precedence)
- Optional: Advanced features (fetchClosure, getFlake, fetchTree edge cases)

See [TODO.md](TODO.md) for detailed priorities.

## Architecture & Design Decisions

### Core Patterns

**Type System:**
- Nix integers → JavaScript BigInt (for correct integer division: 1/2 = 0, not 0.5)
- Nix floats → JavaScript number
- Nix strings → String or InterpolatedString class
- Nix paths → Path class (extends InterpolatedString)

**Scope Management:**
- Nix variables → `nixScope["varName"]` (avoids JS keyword conflicts)
- Function closures use `Object.create(parentScope)` to preserve lazy evaluation getters
- NEVER use spread operator `{...scope}` as it loses getters

**Storage:**
- Store path: `~/.cache/denix/store/` (no root permissions needed)
- Import caching with circular dependency detection

**Dependencies:**
- URL imports only (zero npm/jsr dependencies)
- tree-sitter-nix for parsing (via esm.sh)
- Deno standard library modules

## Dependencies

- Deno standard library (URL imports)
- tree-sitter-nix (parser, via esm.sh)
- @std/assert (testing)

## Contributing

### Expanding nixpkgs.lib Testing

Current fixtures (12 files): 10 tested, 2 remaining (fetchers.nix, licenses.nix)

To expand testing, fetch more nixpkgs.lib files:
- **lists.nix** (~30 functions) - map, filter, fold, flatten, unique, sort, etc.
- **attrsets.nix** (~25 functions) - mapAttrs, filterAttrs, mergeAttrs, etc.
- **options.nix** (~20 functions) - mkOption, mkEnableOption, mkDefault, etc.

See [TODO.md](TODO.md) for details.

## License

MIT
