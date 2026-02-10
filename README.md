# Denix - Nix to JavaScript Translator

A Nix → JavaScript translator with 1-to-1 parity for Nix 2.18 builtins, implemented in Deno.

[![Tests](https://img.shields.io/badge/tests-240%2B%20passing-brightgreen)](#testing)
[![Nix](https://img.shields.io/badge/Nix-2.18-blue)](https://nix.dev/manual/nix/2.18/language/builtins)
[![Deno](https://img.shields.io/badge/Deno-latest-blue)](https://deno.land/)

## Status

**Translator:** ✅ 100% complete (87/87 tests passing)
**Runtime:** ⚠️ 97/97 builtins implemented, 28/97 tested (26% coverage)
**Current Priority:** Test remaining 69 untested builtins

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

- ✅ **97 Nix 2.18 builtins** - All builtins implemented
- ✅ **Import system** - `builtins.import` and `builtins.scopedImport` working
- ✅ **Derivations** - Correct store path computation
- ✅ **Network fetchers** - fetchGit, fetchTarball, fetchurl, fetchTree
- ✅ **Pure Deno** - No npm/jsr, only URL imports

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
│   ├── runtime.js          # 97 Nix builtins + operators
│   └── tests/              # Test suite (27 files, 240+ tests)
├── tools/                  # Utilities (hashing, store paths)
├── test.sh                 # Test runner
├── prompt.md               # Development priorities
└── ARCHITECTURE.md         # Architecture overview
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
⚠️ Only 28/97 tested (26% coverage)

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

See [BUILTIN_COVERAGE.md](BUILTIN_COVERAGE.md) for complete list.

## Known Issues

**Fixed (2026-02-10):**
- ✅ concatLists variable name typo
- ✅ isAttrs crashes on null/undefined
- ✅ head returns array instead of element

**Testing needed:**
- 69/97 builtins have no tests yet
- Priority: Type checking, list ops, attrset ops (see prompt.md)

## Development Priority

**Current focus:** Test all 69 untested builtins

See [prompt.md](prompt.md) for detailed testing tasks and priorities.

**Don't work on translator or nixpkgs.lib until runtime has 80%+ test coverage.**

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
