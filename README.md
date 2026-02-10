# Denix - Nix to JavaScript Translator

A Nix → JavaScript translator with 1-to-1 parity for Nix 2.18 builtins, implemented in Deno.

[![Tests](https://img.shields.io/badge/tests-240%2B%20passing-brightgreen)](#testing)
[![Nix](https://img.shields.io/badge/Nix-2.18-blue)](https://nix.dev/manual/nix/2.18/language/builtins)
[![Deno](https://img.shields.io/badge/Deno-latest-blue)](https://deno.land/)

## Status

**Translator:** ✅ 100% complete (87/87 tests passing)
**Runtime:** ⚠️ 109 builtins implemented, 56 tested (51% coverage)
**Critical Issue:** 🐛 8/10 derivation tests failing - [see fixes](prompt.md#-priority-0-fix-derivation-bugs-1-2h---critical)
**Goal:** 80% test coverage (87/109 builtins)

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
- ⚠️ **Derivations** - Basic derivation support (2/10 tests passing, bugs identified)
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
├── main.js                 # Nix → JS translator
├── main/
│   ├── runtime.js          # 109 Nix builtins + operators
│   └── tests/              # Test suite (28 files, 240+ tests)
├── tools/                  # Utilities (hashing, store paths)
├── test.sh                 # Test runner
├── prompt.md               # Current priorities
└── ARCHITECTURE.md         # System design
```

## Testing

**Current coverage:** 240+ tests passing
- Runtime tests: ~170+
- Translator tests: 87
- Integration tests: ~30+

**Test categories:**
1. Runtime builtins (builtins_*_test.js)
2. Translator (translator_test.js)
3. Derivations (derivation/*)
4. Import system (import_*_test.js)
5. Infrastructure (fetcher, tar, nar_hash, store_manager)
6. Integration (nixpkgs.lib validation)

## Implementation Status

### Implemented Builtins (97/97)

✅ All Nix 2.18 builtins implemented
⚠️ Only 40/97 tested (41% coverage)

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

**Critical (must fix first):**
- 🐛 Derivation store path hash mismatch (8 tests failing)
- 🐛 toJSON crashes on derivation objects (1 test failing)

**Testing needed:**
- 53/109 builtins have no tests yet (49% untested)
- Priority: Fix bugs → Math ops → Attrset ops → String ops → Path ops

## Development Priority

**Immediate:** Fix 2 derivation bugs (1-2h) - [see prompt.md](prompt.md#-priority-0-fix-derivation-bugs-1-2h---critical)
**Next:** Add tests for 31 critical builtins (12-16h total)

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
