# Denix - Nix to JavaScript Translator

A Nix → JavaScript translator with 1-to-1 parity for Nix 2.18 builtins, implemented in Deno.

[![Tests](https://img.shields.io/badge/tests-413%2B%20passing-brightgreen)](#testing)
[![Nix](https://img.shields.io/badge/Nix-2.18-blue)](https://nix.dev/manual/nix/2.18/language/builtins)
[![Deno](https://img.shields.io/badge/Deno-latest-blue)](https://deno.land/)

## Status

**Translator:** ✅ 100% complete (87/87 tests passing)
**Runtime:** ✅ 109 builtins implemented, 74 tested (67.9% coverage)
**Derivations:** ✅ All derivation tests passing (10/10)
**Goal:** 80% test coverage (88/109 builtins)

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

- ✅ **109 Nix builtins** - All Nix 2.18 builtins implemented
- ✅ **Import system** - `builtins.import` and `builtins.scopedImport` fully working
- ✅ **Derivations** - Full derivation support (10/10 tests passing)
- ✅ **Network fetchers** - fetchGit, fetchTarball, fetchurl, fetchTree, path, filterSource
- ✅ **Pure Deno** - Zero npm/jsr dependencies, only URL imports

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
import translate from "./main.js"

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
├── main.js                 # Nix → JS translator (1,264 lines)
├── main/
│   ├── runtime.js          # 109 Nix builtins + operators (2,513 lines)
│   └── tests/              # Test suite (36 files, 413+ tests)
├── tools/                  # Utilities (hashing, store paths, 10 modules)
├── test.sh                 # Smart test runner with filters
└── prompt.md               # Current priorities & task breakdown
```

## Testing

**Current coverage:** 413+ tests passing across 36 test files
- Runtime builtins: ~260+ tests (16 files)
- Translator: 87 tests (4 files)
- Import system: 49 tests (5 files)
- Derivations: 12 tests (2 files)
- Infrastructure: 30+ tests (4 files)
- Integration: 66+ tests (2 files - nixpkgs.lib validation)

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

### Implemented Builtins (109/109)

✅ All Nix 2.18 builtins implemented
✅ 74/109 tested (67.9% coverage)

**Categories:**
- Type checking: isNull, isBool, isInt, isFloat, isString, isList, isAttrs, isPath, isFunction, typeOf
- Lists: map, filter, foldl', all, any, elem, head, tail, length, etc.
- Attrsets: hasAttr, getAttr, mapAttrs, removeAttrs, intersectAttrs, etc.
- Strings: substring, stringLength, split, match, replaceStrings, etc.
- Math: add, sub, mul, div, lessThan, ceil, floor, bitwise ops
- Derivations: derivation, toPath, storePath, path, etc.
- Fetchers: fetchGit, fetchTarball, fetchurl, fetchTree, filterSource
- Import: import, scopedImport
- Control: throw, trace, seq, deepSeq, tryEval
- And more...

See [main/runtime.js](main/runtime.js) for complete implementation.

## Known Issues

**Testing needed:**
- 35/109 builtins have no tests yet (32% untested)
- Priority: File ops (6) → Math ops (2) → Misc conversion (6) → Advanced features (21)

## Development Priority

**Immediate:** Add tests for 14 high-priority builtins (3-5h) to reach 80% coverage
**Next:** Add tests for remaining 21 medium-priority builtins (8-12h)

See [prompt.md](prompt.md) for detailed tasks.

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

See [ARCHITECTURE.md](ARCHITECTURE.md) for architecture overview.

### Adding Tests for Untested Builtins

Priority order:
1. Type checking (isAttrs, isInt, typeOf, etc.)
2. List operations (map, filter, foldl', etc.)
3. Attrset operations (hasAttr, getAttr, etc.)
4. Everything else

See [prompt.md](prompt.md) for detailed testing guide.

## License

MIT
