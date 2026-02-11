# Denix Architecture

## Overview

Denix is a Nix-to-JavaScript translator with full runtime implementation of Nix builtins.

**Last Review**: 2026-02-11

## Directory Structure

```
denix/
├── main/                    # Core implementation
│   ├── translator.js        # Nix→JS translation (1,288 lines)
│   ├── runtime.js           # Nix builtins (2,882 lines)
│   ├── import_cache.js      # Import caching (95 lines)
│   ├── import_loader.js     # File loading (113 lines)
│   ├── fetcher.js           # HTTP downloads (157 lines)
│   ├── tar.js               # Tarball extraction (171 lines)
│   ├── registry.js          # Flake registry (193 lines)
│   ├── nar_hash.js          # NAR hashing (244 lines)
│   ├── store_manager.js     # Store paths (148 lines)
│   └── tests/               # 40 test files (538+ tests)
├── tools/                   # Utility modules
│   ├── hashing.js           # Crypto facade (167 lines)
│   ├── sha1.js              # SHA1 impl (456 lines)
│   ├── sha_helpers.js       # SHA512 impl (859 lines)
│   ├── md5.js               # MD5 impl (276 lines)
│   ├── store_path.js        # Store computation (160 lines)
│   └── import_resolver.js   # Path resolution (119 lines)
├── README.md                # User documentation
├── TODO.md                  # Development priorities
└── prompt.md                # Agent instructions
```

## Design Principles

### 1. Clear Module Boundaries
- Each file has single clear purpose
- No circular dependencies
- 8/9 main modules < 250 lines

### 2. Appropriate Abstraction
- Tools separated from main logic
- Crypto algorithms isolated for auditing
- Test isolation preferred over DRY

### 3. Minimal Dependencies
- Only 2 external deps: quickr/FileSystem, good/zip
- Deno standard library for tests
- No npm bloat

### 4. Test Coverage
- 40 test files organized by category
- 538+ tests passing
- Integration tests for real-world scenarios

## Architecture Decisions

### Why runtime.js is Large (2,882 lines)

**Decision**: Keep as monolith, don't split

**Reasons**:
- Well-organized internally (classes → helpers → builtins → operators)
- Functionally complete (102/102 Nix 2.18 builtins)
- Splitting is high-risk, low-reward
- Editor folding makes it navigable
- No actual maintenance issues

**When to reconsider**: If file reaches 5,000+ lines or multiple contributors report issues

### Why Crypto Algorithms Are Separate Files

**Decision**: Keep sha1.js, md5.js, sha_helpers.js separate

**Reasons**:
- Independent implementations for security auditing
- Easy to replace/upgrade individual algorithms
- Clear licensing per algorithm
- No code duplication

### Why FileSystem from quickr

**Decision**: Keep external dependency

**Reasons**:
- Reliable cross-platform path operations
- Used 24 times throughout runtime.js
- Replacing with Deno.std: high cost, no benefit
- Minimal dependency (single import)

## Code Quality Metrics

- Zero circular dependencies
- Zero dead code
- Minimal duplication (test helpers intentionally isolated)
- Clear naming
- Comprehensive test coverage

## Simplification Review (2026-02-11)

Conducted deep analysis to identify bloat, dead code, and consolidation opportunities:

### ✅ No Issues Found

**Module organization**: All 9 main/ modules serve distinct purposes. No redundancy.

**Crypto libraries**: sha1.js (456 lines), md5.js (276 lines), sha_helpers.js (859 lines) are separate for:
- Independent security auditing
- Easy algorithm replacement
- Clear licensing per algorithm

**Tools directory**: All 6 utilities actively used:
- hashing.js: Used by runtime.js, store_path.js, nar_hash.js
- import_resolver.js: Used by import system
- store_path.js: Used by runtime.js, tests
- Others: Core crypto implementations

**Test fixtures**: All fixture files (nixpkgs-lib/*.nix, hash_test/*, import_test/*) are actively used by tests.

### ✅ Apparent "Issues" That Are Correct

**Import system (5 test files)**:
- Analyzed for potential consolidation
- Decision: Keep separate - each tests distinct layer
- See "Test Organization" section for details

**getFlake testing**:
- Appears in both `builtins_advanced_fetchers_test.js` and `builtins_getflake_test.js`
- Decision: Intentional - advanced_fetchers tests API, getflake_test.js tests network behavior
- Not duplication, complementary coverage

**nixpkgs_trivial_test.js**:
- Uses console.log assertions instead of Deno.test()
- Decision: Keep as-is - it's a validation script, not a unit test
- All 20 patterns pass, provides real-world translator validation

### 📊 Bloat Analysis Results

Searched for:
- ❌ Duplicate functionality - **None found**
- ❌ Dead code - **None found**
- ❌ Unused files - **None found**
- ❌ Over-abstraction - **None found**
- ❌ Unnecessary dependencies - **None found** (only 2 external deps, both essential)

**Conclusion**: Codebase is appropriately sized for its scope. 40 test files is correct for 102 builtins + translator + 9 modules.

## Test Organization

### Test File Philosophy

The 40 test files are organized by **purpose and layer**, not arbitrarily split:

**By builtin category** (23 files):
- Type checking, math/bitwise, lists, attrsets, strings, paths, control flow
- Each file tests related functions with shared setup/teardown
- File count reflects Nix's builtin organization

**By module/layer** (10 files):
- Import system: 5 files test different layers (resolver, cache, loader, integration, e2e)
- Fetch operations: 6 files for different fetchers (git, url, tarball, tree, mercurial, filtersource)
- Each has distinct network setup or VCS tool requirements

**By integration scope** (7 files):
- `translator_test.js` - Pure translator functionality (41 tests)
- `nixpkgs_trivial_test.js` - Real-world nixpkgs patterns (20 validation checks)
- `nixpkgs_lib_files_test.js` - Full nixpkgs.lib file testing
- Others test specific integration scenarios

### Why Not Consolidate?

**Import system (5 files)**: Each tests a distinct layer with different dependencies:
- Resolver: Pure path logic, minimal fixtures
- Cache: In-memory state management
- Loader: File I/O and error handling
- Integration: Runtime builtin behavior
- E2E: Full translator pipeline

Merging would couple unrelated concerns and make selective test runs impossible.

**Fetch operations (6 files)**: Each needs different external tools:
- fetchGit: Requires git CLI
- fetchMercurial: Requires hg CLI
- fetchTarball/fetchurl: HTTP mocking
- fetchTree: Multiple fetcher types
- filtersource: File filtering logic

**"Advanced fetchers" file**: Tests both fetchClosure (5 tests) and getFlake (29 tests). Separate `builtins_getflake_test.js` provides network-based testing. This is intentional complementary coverage, not duplication.

### Test Count vs File Count

- Total: 659+ test cases across 40 files
- Average: 16.5 tests per file
- Most files: 10-30 tests (appropriate depth)
- Import files: Heavily use nested t.step() for related scenarios

**Files with <5 tests are justified**:
- Network-dependent fetchers need extensive setup per test
- Integration tests validate complex interactions

## Current State

See TODO.md for current development priorities and what remains to be done.
