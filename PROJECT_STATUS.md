# Denix Project Status

**Last Updated:** 2026-02-10 (Session 109 - Architect Review)

## Quick Status

| Component | Status | Coverage | Notes |
|-----------|--------|----------|-------|
| **Translator** | ✅ Complete | 100% (87/87 tests) | Production ready |
| **Runtime** | ⚠️ Needs testing | 41% (40/97 tested) | All implemented, undertested |
| **Import System** | ✅ Complete | 100% (49 tests) | Production ready |
| **Derivations** | ⚠️ Basic only | 12 tests passing | Edge cases untested |
| **Network Fetchers** | ✅ Complete | 100% (39 tests) | fetchGit, fetchTarball, fetchTree, fetchurl |

## Current Priority: Runtime Testing

**Goal:** Reach 80% test coverage (77/97 builtins tested)
**Current:** 40/97 tested (41%)
**Needed:** 37 more builtins tested
**Time:** ~18-23 hours

### High Priority Untested Builtins (37 total)

1. **Type checking (9):** isNull, isBool, isInt, isFloat, isString, isList, isPath, isAttrs, typeOf
2. **List ops (10):** map, filter, all, any, elem, elemAt, partition, sort, genList, concatLists
3. **Attrset ops (7):** hasAttr, getAttr, attrNames, attrValues, catAttrs, genericClosure, zipAttrsWith
4. **String ops (4):** split, match, concatStringsSep, toString
5. **Math (8):** sub, mul, lessThan, ceil, floor, bitAnd, bitOr, bitXor
6. **Path/File (8):** baseNameOf, dirOf, pathExists, readFile, readDir, readFileType, findFile, toPath

## Project Structure

```
denix/
├── main.js                 # Translator (Nix → JS)
├── main/
│   ├── runtime.js          # 97 Nix builtins (2314 lines)
│   ├── import_cache.js     # Import caching
│   ├── import_loader.js    # File loading
│   ├── fetcher.js          # HTTP downloads
│   ├── tar.js              # Tarball extraction
│   ├── nar_hash.js         # NAR hashing
│   ├── store_manager.js    # Store management
│   └── tests/              # 27 test files, 240+ tests
├── tools/
│   ├── analysis.js         # StackManager for scope tracking
│   ├── parsing.js          # Nix parser (tree-sitter)
│   ├── generic.js          # toFloat helper
│   ├── lazy_array.js       # lazyMap for list operations
│   ├── json_parse.js       # JSON with BigInt support
│   ├── hashing.js          # SHA256, MD5, SHA1, SHA512
│   ├── store_path.js       # Store path computation
│   └── import_resolver.js  # Path resolution
├── nixpkgs.lib/            # Test data (10/41 files tested)
├── run/                    # Dev automation (NOT core project)
├── test.sh                 # Test runner script
└── *.md                    # Documentation
```

## Testing System

### Run All Tests
```bash
./test.sh                    # All 240+ tests
```

### Run by Category
```bash
./test.sh runtime            # Runtime builtin tests
./test.sh translator         # Translator tests
./test.sh derivation         # Derivation tests
./test.sh import             # Import system tests
./test.sh infra              # Infrastructure tests
./test.sh integration        # nixpkgs integration tests
```

### Run Specific Tests
```bash
./test.sh builtins_types     # Type checking tests (when created)
./test.sh fetchGit           # All fetchGit tests
deno test --allow-all main/tests/builtins_core_test.js  # Direct run
```

## Test Files (27 total)

### Runtime Tests (10 files)
- `builtins_core_test.js` - Core builtins
- `builtins_fetch*.js` (5 files) - Network fetchers
- `builtins_path_test.js` - path builtin
- `builtins_tojson_path_test.js` - toJSON
- `fromtoml_test.js` - TOML parser
- `operators.js` - Operator functions

### Translator Tests (4 files)
- `translator_test.js` - Core translator (87 tests)
- `hasattr_test.js` - has-attr patterns
- `string_interpolation_test.js` - String interpolation
- `path_interpolation_test.js` - Path interpolation

### Derivation Tests (3 files in derivation/)
- `001_basic_tests.js` - Basic derivation creation
- `standalone_test.js` - Store path computation
- `test_harness.js` - Shared utilities

### Import System Tests (5 files)
- `import_cache_test.js` - Caching logic
- `import_e2e_test.js` - End-to-end tests
- `import_integration_test.js` - Runtime integration
- `import_loader_test.js` - File loading
- `import_resolver_test.js` - Path resolution

### Infrastructure Tests (4 files)
- `fetcher_test.js` - HTTP downloads
- `tar_test.js` - Tarball extraction
- `nar_hash_test.js` - NAR hashing
- `store_manager_test.js` - Store management

### Integration Tests (2 files)
- `nixpkgs_lib_files_test.js` - Full nixpkgs.lib files (10 tested)
- `nixpkgs_trivial_test.js` - trivial.nix patterns (20 functions)

## Documentation Files

- **PROJECT_STATUS.md** (this file) - Quick status overview
- **prompt.md** - Current work priorities and task breakdown
- **ARCHITECTURE.md** - System architecture overview
- **BUILTIN_COVERAGE.md** - Detailed test coverage analysis
- **TESTING.md** - Testing guide and organization
- **README.md** - Project introduction and quick start

## What Works

✅ **Translator** - All Nix language features (let, rec, with, functions, patterns, etc.)
✅ **Import System** - import, scopedImport, caching, circular detection
✅ **Network Fetchers** - fetchGit, fetchTarball, fetchTree, fetchurl
✅ **Core Builtins** - 40/97 tested and working
✅ **Store System** - Uses ~/.cache/denix/store/
✅ **Type System** - BigInt for ints, Number for floats
✅ **Scope Management** - Object.create() preserves lazy getters

## Known Gaps

⚠️ **Runtime Testing** - Only 41% of builtins tested (need 80%+)
⚠️ **Derivation Edge Cases** - Multiple outputs, complex env, passthru/meta
⚠️ **nixpkgs.lib Coverage** - 10/41 files tested (24%)
❌ **Optional Builtins** - fetchMercurial, fetchClosure, getFlake (not implemented)

## Next Steps

1. **Test 37 high-priority builtins** (~18-23 hours) → Reach 80% coverage
2. **Test derivation edge cases** (~3-4 hours) → Production-ready derivations
3. **Expand nixpkgs.lib testing** (~4-6 hours) → Test 15+ more files

**DO NOT work on translator improvements or nixpkgs.lib expansion until runtime reaches 80% test coverage.**

## Development Notes

- Uses Deno with URL imports (no npm/jsr)
- BigInt for Nix integers, Number for floats
- Lazy evaluation via getters in recursive attrsets
- Object.create() for scope inheritance (preserves getters)
- All tests compare JS behavior with Nix behavior

## Resources

- **Nix 2.18 docs:** https://nix.dev/manual/nix/2.18/language/builtins
- **Test in nix repl:** `nix repl` then test functions
- **Search examples:** https://noogle.dev
