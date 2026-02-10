# Denix Architecture Summary

**Last Updated:** 2026-02-10

## Project Goal

Implement a Nix → JavaScript translator with 1-to-1 parity for all Nix 2.18 builtins.

## Current Status

- **Runtime**: 109/109 builtins implemented (100%)
- **Tests**: 52/109 tested (47.7%)
- **Target**: 80% test coverage (87/109 tested)
- **Translator**: 87/87 tests passing (100%)

## Directory Structure

```
denix/
├── main.js                 # Translator (Nix AST → JavaScript)
├── main/
│   ├── runtime.js          # 109 Nix builtins implementation
│   ├── errors.js           # NixError, NotImplemented classes
│   ├── import_*.js         # Import system (3 files)
│   ├── fetcher.js          # HTTP downloads with retry
│   ├── tar.js              # Tarball extraction
│   ├── nar_hash.js         # NAR directory hashing
│   ├── store_manager.js    # Store path management
│   └── tests/              # 27 test files, 290+ tests
├── tools/
│   ├── hashing.js          # SHA256, MD5, SHA1, SHA512
│   ├── store_path.js       # Store path computation
│   ├── import_resolver.js  # Path resolution
│   ├── parsing.js          # Tree-sitter Nix parser
│   └── *.js                # Utility modules
└── nixpkgs.lib/            # Test data (git submodule)
```

## Core Design Patterns

### 1. BigInt for Nix Integers
Nix integers → JavaScript BigInt (required for correct division: `1/2 ≠ 1.0/2`)

### 2. Scope Management
- Nix variables → `nixScope["varName"]` (avoids keyword conflicts)
- Uses Object.create() for scope inheritance (preserves getters)
- Lazy evaluation via getters for recursive sets

### 3. String Interpolation
- Plain strings → JavaScript strings
- Interpolated strings → InterpolatedString class (lazy evaluation)
- Paths → Path class (extends InterpolatedString)

### 4. Import System
- Caching via import_cache.js
- Path resolution via import_resolver.js
- Supports .nix and .json files
- Circular import detection

## Test Organization

```bash
./test.sh              # Run all tests
./test.sh types        # Type checking tests
./test.sh lists        # List operation tests
./test.sh attrs        # Attrset tests
./test.sh translator   # Translator tests
./test.sh derivation   # Derivation tests
```

## Next Priority

Create 4 remaining test files (18-25 hours):
1. `builtins_attrs_comprehensive_test.js` (7 functions, 4-6h)
2. `builtins_strings_comprehensive_test.js` (8 functions, 4-5h)
3. `builtins_math_comprehensive_test.js` (8 functions, 3-4h)
4. `builtins_paths_comprehensive_test.js` (10 functions, 4-6h)

## Key Files

- **README.md** - Project overview and quick start
- **ARCHITECTURE.md** - Technical design details
- **prompt.md** - Current testing priorities (147 lines, simplified)
- **test.sh** - Test runner with category support

## Documentation Philosophy

Keep it simple:
- README: What and how to use
- ARCHITECTURE: Technical design
- prompt.md: What needs to be done next (<150 lines)
- This file: Quick reference

## Cleanup Completed (2026-02-10)

- Deleted 4 redundant documentation files (1,086 lines removed)
- Simplified prompt.md from 518 → 147 lines (72% reduction)
- Verified all tests still passing
- No dead code removed (isConstantExpression is actually used)
- No duplicate code found (codebase is clean)
