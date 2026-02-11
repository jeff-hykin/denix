# Denix Architecture

## Overview

Denix translates Nix code to JavaScript with 1-to-1 parity for all Nix 2.18 builtins. The architecture is designed for simplicity and correctness.

## Core Components

### 1. Translator (`main.js` - 1,264 lines)

**Purpose**: Convert Nix AST to executable JavaScript code

**Key Features**:
- Tree-sitter based parser
- Handles all Nix language constructs (let, rec, with, functions, etc.)
- Generates code that uses runtime.js builtins and operators
- Preserves lazy evaluation semantics

**Translation Strategy**:
- Nix variables → `nixScope["varName"]` (avoids keyword conflicts)
- Nix integers → JavaScript BigInt (correct integer division: 1/2 = 0)
- Nix floats → JavaScript Number
- Nix strings → JavaScript String or InterpolatedString class (for lazy eval)
- Nix paths → Path class (extends InterpolatedString)
- Nix functions → JavaScript functions with Object.create() scopes
- Nix operators → Named operator functions (operators.add, operators.subtract, etc.)

### 2. Runtime (`main/runtime.js` - 2,513 lines)

**Purpose**: Provide all 109 Nix 2.18 builtins + operators

**Architecture**:
- **builtins object**: All 109 Nix builtins (fetchGit, map, filter, etc.)
- **operators object**: Binary/unary operators (add, subtract, multiply, etc.)
- **Helper classes**: InterpolatedString, Path, NixError
- **Scope management**: Runtime stack for lazy evaluation

**Key Design Patterns**:
- Curried functions for partial application
- Object.create() for scope inheritance (preserves getters)
- Lazy evaluation via getters for recursive attrsets
- BigInt arithmetic with automatic float conversion

### 3. Import System (4 modules)

**Purpose**: Support `builtins.import` and `builtins.scopedImport`

**Modules**:
1. **import_resolver.js** - Path resolution (absolute, relative, directory/default.nix)
2. **import_cache.js** - Import deduplication and circular dependency detection
3. **import_loader.js** - File loading (.nix, .json) and evaluation
4. Integration in runtime.js - `builtins.import` and `builtins.scopedImport`

### 4. Fetch Infrastructure (4 modules)

**Purpose**: Network fetchers with store path management

**Modules**:
1. **fetcher.js** - HTTP downloads with retry logic
2. **tar.js** - Tarball extraction (using @std/tar)
3. **nar_hash.js** - NAR directory hashing for store paths
4. **store_manager.js** - Store path caching (~/.cache/denix/store/)

**Supported Fetchers**:
- fetchGit, fetchMercurial, fetchTarball, fetchurl, fetchTree, path, filterSource

### 5. Tools (10 utility modules)

**Core Utilities**:
- **parsing.js** - Tree-sitter wrapper for Nix parsing
- **store_path.js** - Store path computation (NAR hash → /nix/store/...)
- **hashing.js** - SHA1, MD5, SHA256, SHA512 implementations
- **import_resolver.js** - Path resolution logic
- **json_parse.js** - BigInt-aware JSON parser
- **lazy_array.js** - Lazy evaluation proxy for lists
- **generic.js** - Float conversion utility

## Module Dependency Layers

```
Layer 1: Pure implementations (no project imports)
  └── sha1.js, md5.js, sha_helpers.js, parsing.js, lazy_array.js, json_parse.js, generic.js

Layer 2: Utilities (Layer 1 only)
  └── hashing.js, import_resolver.js, store_path.js

Layer 3: Infrastructure (Layers 1-2)
  └── tar.js, fetcher.js, nar_hash.js, store_manager.js, import_loader.js

Layer 4: Core runtime (all layers)
  └── runtime.js, main.js (translator)

Layer 5: Tests (36 files, 413+ tests)
  └── All test files
```

**No circular dependencies exist in the codebase.**

## Key Design Decisions

### 1. BigInt for Integers

**Problem**: JavaScript doesn't distinguish integers from floats
**Impact**: In Nix, `1/2` = 0 (integer division), but in JS, `1/2` = 0.5
**Solution**: All Nix integers → JavaScript BigInt
- Preserves integer semantics
- Requires special handling in operators (toFloat() conversion when needed)

### 2. Object.create() for Scopes

**Problem**: Nix has lazy evaluation with recursive attrsets
**Impact**: Need to preserve getters across scope inheritance
**Solution**: Use Object.create(parentScope) instead of {...parentScope}
- Getters preserved via prototype chain
- Returned objects only contain own properties (no pollution)

### 3. InterpolatedString Class

**Problem**: Nix string interpolation is lazy (doesn't evaluate until needed)
**Example**: `"${expensive_computation}_suffix"` shouldn't evaluate `expensive_computation` until the string is used
**Solution**: Wrap interpolated parts in functions, evaluate on toString()

### 4. Import Caching

**Problem**: Multiple imports of same file should only evaluate once
**Solution**: import_cache.js tracks imported files by path
- Detects circular dependencies
- Returns cached result for repeated imports

### 5. Store Path System

**Problem**: Nix uses /nix/store/ which requires root access
**Solution**: Use ~/.cache/denix/store/ instead
- No root permissions needed
- Same NAR hashing algorithm
- Compatible with Nix store paths

## Testing Architecture

### Test Organization (36 files, 413+ tests)

**Builtin Tests (16 files)** - Test individual builtins:
- Type checking (10 functions)
- Lists (15+ functions)
- Attrsets (5 functions)
- Strings (6 functions)
- Math & bitwise (7 functions)
- File operations (6 functions)
- Paths (8 functions)
- Fetch operations (6 fetchers)

**Integration Tests (9 files)** - End-to-end workflows:
- Translator tests (87 tests)
- Import system E2E (49 tests)
- nixpkgs.lib validation (86+ tests)

**Infrastructure Tests (4 files)** - Support modules:
- Fetcher, tar, nar_hash, store_manager

**Derivation Tests (2 files)** - Store path computation:
- Basic derivation tests
- Standalone validation

### Smart Test Runner (test.sh)

Supports running tests by category:
```bash
./test.sh                # All tests
./test.sh types          # Type checking tests
./test.sh lists          # List operations
./test.sh math           # Math & bitwise
./test.sh translator     # Translator tests
./test.sh derivation     # Derivation tests
./test.sh integration    # nixpkgs.lib tests
```

## Code Quality Metrics

- **Total Files**: 56 JavaScript files
- **Dead Code**: 0 (Session 42 audit)
- **Unused Imports**: 0
- **Circular Dependencies**: 0
- **Test Coverage**: 67.9% (74/109 builtins tested)
- **Test Pass Rate**: 100% (413/413 passing)

## Performance Considerations

### Lazy Evaluation

**Challenge**: Nix is lazy, JavaScript is eager
**Solution**: Use Proxy objects for lists, getters for attrsets
**Impact**: Slight performance overhead, but maintains correctness

### Import Caching

**Benefit**: O(1) lookup for repeated imports
**Implementation**: Map keyed by resolved absolute path

### Store Path Caching

**Benefit**: Avoid redundant downloads and hashing
**Implementation**: Files cached in ~/.cache/denix/store/
**Eviction**: Manual (no automatic cleanup yet)

## Future Architecture Considerations

### If Runtime.js Grows Too Large

**Current**: 2,513 lines in one file (manageable)
**Future Option**: Split into 3 modules:
- `runtime/builtins.js` - All 109 builtins
- `runtime/operators.js` - Binary/unary operators
- `runtime/index.js` - Classes, setup, exports

**Cost**: ~20 import updates across tests
**Benefit**: Easier navigation

### If Tests Become Hard to Find

**Current**: 36 test files (good organization)
**Future Option**: Group by subdirectories:
- `tests/builtins/` - All builtin tests
- `tests/integration/` - Integration tests
- `tests/infrastructure/` - Infrastructure tests

**Cost**: Update test.sh patterns
**Benefit**: Clearer organization

**Recommendation**: Current structure is excellent, don't change unless needed.

## Architectural Principles

1. **Simplicity over Abstraction** - Direct implementations preferred
2. **Correctness over Performance** - Match Nix behavior exactly
3. **No Over-Engineering** - No unnecessary frameworks or abstractions
4. **URL Imports Only** - Zero npm/jsr dependencies
5. **Test Against Nix** - Use `nix repl` to verify all behavior
6. **Clean Dependencies** - Layered architecture, no cycles

## Session History: Architectural Decisions

- **Session 4**: Fixed function closure bug (Object.create vs spread)
- **Sessions 5-6**: Implemented import system (4-phase approach)
- **Session 24**: Completed fetch infrastructure (all fetchers working)
- **Session 40**: Added 64 tests (math, attrset, string operations)
- **Session 41**: Corrected test coverage from 59.6% → 67.9% (was undercounted)
- **Session 42**: Architecture audit (no dead code, clean structure confirmed)

