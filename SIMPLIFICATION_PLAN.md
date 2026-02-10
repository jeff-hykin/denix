# Denix Codebase Simplification Plan

**Date:** 2026-02-10
**Architect:** Claude Sonnet 4.5

## Executive Summary

The denix codebase is **generally well-organized** with a clear separation of concerns. However, there are several areas for improvement:

1. **Dead code identified**: 1 unused file (`tools/git.js`)
2. **Broken test**: `operators.js` fails due to BigInt JSON serialization
3. **Test organization**: Can be simplified with better grouping
4. **Priority misalignment**: prompt.md focuses on edge cases when core functionality needs attention

## Current Directory Structure

```
denix/
├── main.js                  # Nix → JS translator (87 tests passing)
├── main/
│   ├── runtime.js          # Runtime builtins (62/65 implemented)
│   ├── import_cache.js     # Import caching system
│   ├── import_loader.js    # File loading for imports
│   ├── fetcher.js          # HTTP download utilities
│   ├── tar.js              # Tarball extraction
│   ├── nar_hash.js         # NAR directory hashing
│   ├── store_manager.js    # Store path management
│   ├── errors.js           # Error classes
│   └── tests/              # 29 test files + 3 derivation tests
├── tools/
│   ├── analysis.js         # StackManager for debugging ✅ USED
│   ├── generic.js          # toFloat utility ✅ USED
│   ├── hashing.js          # Hash functions (sha256, md5, etc.) ✅ USED
│   ├── import_resolver.js  # Path resolution ✅ USED
│   ├── json_parse.js       # BigInt-safe JSON parser ✅ USED
│   ├── lazy_array.js       # Lazy map implementation ✅ USED
│   ├── parsing.js          # Nix AST parser ✅ USED
│   ├── store_path.js       # Derivation store paths ✅ USED
│   ├── sha1.js             # (internal to hashing.js)
│   ├── md5.js              # (internal to hashing.js)
│   ├── sha_helpers.js      # (internal to hashing.js)
│   └── git.js              # ❌ DEAD CODE - REMOVE
├── run/                     # Development automation (not core)
└── test.sh                  # Simple test runner ✅ KEEP
```

## Dead Code Analysis

### 1. tools/git.js - REMOVE ✅
**Reason:** Not imported anywhere in the codebase
**References broken:** Imports non-existent `fs_shim.js`
**Action:** Delete file

**Impact:** None - unused file

### 2. run/ directory - KEEP BUT DOCUMENT
**Reason:** Development automation, not part of core functionality
**Action:** Already has README.md explaining it's optional

## Broken Test Analysis

### operators.js - FIX REQUIRED
**Problem:** Uses `JSON.stringify()` on BigInts which throws error
**Root cause:** Line 4 - `const actualStr = JSON.stringify(actual)`
**Solution:** Replace with BigInt-safe serialization:

```javascript
const assertEquals = (actual, expected, msg) => {
    const serialize = (val) => {
        if (typeof val === 'bigint') return val.toString() + 'n'
        return JSON.stringify(val)
    }
    const actualStr = serialize(actual)
    const expectedStr = serialize(expected)
    if (actualStr !== expectedStr) {
        throw new Error(`${msg}\n  Expected: ${expectedStr}\n  Actual: ${actualStr}`)
    }
}
```

## Test Organization Analysis

### Current Test Files (32 total)

**Category 1: Runtime Builtins Tests (13 files)**
- `builtins_attrs.js` - attrset operations
- `builtins_eval_control.js` - eval/tryEval
- `builtins_fetchgit_test.js` - fetchGit
- `builtins_fetchtarball_test.js` - fetchTarball
- `builtins_fetchtree_test.js` - fetchTree
- `builtins_fetchurl_test.js` - fetchurl
- `builtins_filtersource_test.js` - filterSource
- `builtins_list.js` - list operations
- `builtins_path_test.js` - path builtin
- `builtins_tojson_path_test.js` - toJSON/path handling
- `builtins_version.js` - version comparison
- `nix218_builtins_test.js` - Nix 2.18 builtin validation
- `fromtoml_test.js` - fromTOML parser

**Category 2: Import System Tests (5 files)**
- `import_cache_test.js` - caching logic
- `import_e2e_test.js` - end-to-end import
- `import_integration_test.js` - runtime integration
- `import_loader_test.js` - file loading
- `import_resolver_test.js` - path resolution

**Category 3: Infrastructure Tests (4 files)**
- `fetcher_test.js` - HTTP fetcher
- `tar_test.js` - tarball extraction
- `nar_hash_test.js` - NAR hashing
- `store_manager_test.js` - store management

**Category 4: Derivation Tests (3 files in subdirectory)**
- `derivation/001_basic_tests.js` - basic derivation tests
- `derivation/standalone_test.js` - store path computation
- `derivation/test_harness.js` - shared test utilities

**Category 5: Translator Tests (4 files)**
- `translator_test.js` - main translator tests
- `operators.js` - operator tests ⚠️ BROKEN
- `hasattr_test.js` - has-attr patterns
- `string_interpolation_test.js` - string interpolation
- `path_interpolation_test.js` - path interpolation

**Category 6: Integration Tests (2 files)**
- `nixpkgs_lib_files_test.js` - full nixpkgs.lib files (44KB!)
- `nixpkgs_trivial_test.js` - trivial.nix patterns

### Recommendation: ADD TEST GROUPS

Create `test.sh` with categories:

```bash
#!/usr/bin/env bash
# Simple test runner for denix

case "$1" in
    "")
        echo "Running all tests..."
        deno test --allow-all
        ;;
    runtime|builtins)
        echo "Running runtime builtin tests..."
        deno test --allow-all --filter="builtins_"
        ;;
    translator)
        echo "Running translator tests..."
        deno test --allow-all main/tests/translator_test.js \
            main/tests/operators.js \
            main/tests/hasattr_test.js \
            main/tests/string_interpolation_test.js \
            main/tests/path_interpolation_test.js
        ;;
    derivation|drv)
        echo "Running derivation tests..."
        deno test --allow-all main/tests/derivation/
        ;;
    import)
        echo "Running import system tests..."
        deno test --allow-all --filter="import_"
        ;;
    infra)
        echo "Running infrastructure tests..."
        deno test --allow-all main/tests/fetcher_test.js \
            main/tests/tar_test.js \
            main/tests/nar_hash_test.js \
            main/tests/store_manager_test.js
        ;;
    integration|nixpkgs)
        echo "Running nixpkgs integration tests..."
        deno test --allow-all main/tests/nixpkgs_*.js
        ;;
    *)
        echo "Running tests matching: $1"
        deno test --allow-all --filter="$1"
        ;;
esac
```

## Priority Realignment

### Current prompt.md Issues

1. **Focuses on edge cases before core functionality is solid**
   - Priority 1: "Derivation edge cases" (multiple outputs, passthru, meta)
   - But basic derivation tests show only 12/12 passing
   - Need to verify what "12/12" actually means

2. **Optional builtins treated as blockers**
   - fetchMercurial, fetchClosure, getFlake are RARELY used
   - Should be lowest priority, not Priority 2

3. **Missing critical information**
   - Which derivation features actually work?
   - What does "62/65 builtins" mean? Which 3 are missing?
   - Are ALL 62 builtins fully tested?

### Recommended Priority Order

**PRIORITY 0: Fix Broken Tests (30 min)**
- Fix `operators.js` BigInt serialization bug
- Verify ALL tests pass before moving forward

**PRIORITY 1: Derivation Core Functionality (2-4 hours)**
- Understand what "12/12 tests passing" means
- Are multiple outputs working? Test them!
- Are all env variables serialized correctly? Test them!
- Create `002_advanced_tests.js` with comprehensive tests

**PRIORITY 2: Runtime Builtin Completeness (1-2 days)**
- Audit all 62 "implemented" builtins
- Which ones have tests? Which don't?
- Create test coverage matrix
- Add missing tests for untested builtins

**PRIORITY 3: Translator Edge Cases (1-2 days)**
- Pattern matching edge cases
- String escape sequences
- Operator precedence
- URI literals

**PRIORITY 4: nixpkgs.lib Testing (3-5 days)**
- Expand from 10/41 to 25/41 files (60% coverage)
- Focus on high-value files: lists.nix, attrsets.nix, options.nix

**PRIORITY 5: Optional Builtins (optional, 2-3 weeks)**
- fetchMercurial (if Mercurial support needed)
- fetchClosure (if binary cache needed)
- getFlake (if flake system needed)

## Implementation Actions

### Immediate Actions (Today, 1-2 hours)

1. **Delete dead code**
   ```bash
   rm /Users/jeffhykin/repos/denix/tools/git.js
   ```

2. **Fix operators.js**
   - Replace JSON.stringify with BigInt-safe serialization
   - Verify test passes

3. **Update test.sh with categories**
   - Add runtime, translator, derivation, import, infra, integration categories
   - Test each category works

4. **Run full test suite**
   ```bash
   deno test --allow-all 2>&1 | tee test_results.txt
   ```
   - Document which tests fail
   - Document which tests pass
   - Create test coverage matrix

### Next Actions (Tomorrow, 2-3 hours)

5. **Create TESTING.md**
   - Document test organization
   - Document how to run test categories
   - Document test coverage gaps

6. **Audit runtime builtins**
   - Create spreadsheet of all 65 Nix 2.18 builtins
   - Mark which are implemented (62)
   - Mark which have tests
   - Identify gaps

7. **Update prompt.md**
   - Replace with accurate priority order
   - Remove edge case focus before core is solid
   - Add test coverage gaps
   - Add realistic time estimates

## Simplification Principles

1. **Delete ruthlessly**: If it's not used, delete it
2. **Test before adding features**: Core must be solid before edge cases
3. **Organize by function**: Tests should be grouped by what they test
4. **Document gaps**: What's NOT working is more important than what is
5. **Realistic priorities**: Core → Edge Cases → Optional Features

## Success Metrics

- **Tests:** 100% of existing tests pass
- **Coverage:** Know exactly which builtins are tested vs untested
- **Organization:** Can run test categories independently
- **Documentation:** TESTING.md explains test structure
- **Priorities:** prompt.md reflects accurate state and priorities
