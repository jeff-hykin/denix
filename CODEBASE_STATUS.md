# Denix Codebase Status

**Last Updated:** 2026-02-10 (Session 140 - Architect Review)

## Current State

### ✅ What's Working
- **Translator:** 87/87 tests passing (100%)
- **Runtime:** 109/109 builtins implemented (100% code complete)
- **Tests:** 415+ tests passing across 27 test files
- **Test Coverage:** 56/109 builtins tested (51.4%)
- **Import System:** Fully functional (49 tests passing)
- **Fetch Infrastructure:** All fetchers working (fetchGit, fetchTarball, fetchurl, fetchTree, path, filterSource)

### 🔴 Critical Issues (MUST FIX FIRST)

#### Derivation Bugs (9/10 tests failing)
**File:** `main/tests/derivation/001_basic_tests.js`
**Run:** `deno run --allow-all main/tests/derivation/001_basic_tests.js`

**Bug 1 - Store Path Hash:**
- Tests 001-008 failing: Hash computation incorrect
- Fix: Add empty output placeholders to `env` BEFORE computing hash (line ~1755 in runtime.js)

**Bug 2 - toJSON Crash:**
- Test 009 failing: "cannot convert a function to JSON"
- Fix: Move derivation check BEFORE function check (line ~308-320 in runtime.js)

**Estimated Fix Time:** 2-3 hours

### ⚠️ Test Coverage Gaps (48.6% untested)

**Priority builtins needing tests (31 functions):**
1. Math operations (8): sub, mul, lessThan, ceil, floor, bitAnd, bitOr, bitXor
2. Attrset ops (5): getAttr, attrNames, attrValues, catAttrs, genericClosure
3. String ops (7): split, match, concatStringsSep, splitVersion, baseNameOf, dirOf, toString
4. Path/file ops (8): pathExists, readFile, readDir, readFileType, findFile, toFile, toPath

**Test files to create:**
- `builtins_math_test.js` (3-4h)
- `builtins_attrs_ops_test.js` (2-3h)
- `builtins_strings_ops_test.js` (3-4h)
- `builtins_paths_ops_test.js` (4-5h)

**Total time to 80% coverage:** 12-16 hours

## Directory Structure

```
denix/
├── main.js                    # Translator (Nix → JS)
├── main/
│   ├── runtime.js            # 109 Nix builtins (2,314 lines)
│   ├── import_cache.js       # Import caching
│   ├── import_loader.js      # File loading
│   ├── fetcher.js            # HTTP downloads
│   ├── tar.js                # Tarball extraction
│   ├── nar_hash.js           # NAR hashing
│   ├── store_manager.js      # Store management
│   ├── errors.js             # Custom errors
│   └── tests/                # 27 test files, 415+ tests
├── tools/
│   ├── hashing.js            # Crypto functions
│   ├── store_path.js         # Store path computation
│   ├── import_resolver.js    # Path resolution
│   ├── parsing.js            # Tree-sitter parser
│   └── *.js                  # Other utilities
├── test.sh                   # Test runner
├── README.md                 # User documentation
├── ARCHITECTURE.md           # Technical details
└── prompt.md                 # Current priorities
```

## File Count
- **Total:** 50 JavaScript files
- **Core:** 3 files (main.js, runtime.js, test.sh)
- **Support:** 8 files (main/)
- **Utilities:** 10 files (tools/)
- **Tests:** 27 files (main/tests/)
- **Docs:** 4 files (README, ARCHITECTURE, ARCH_SUMMARY, prompt)

## Code Quality Assessment

**✅ Clean Architecture:**
- Clear separation of concerns (translator vs runtime)
- No dead code found
- No duplicate implementations
- Minimal dependencies (Deno std library only)

**✅ Good Test Organization:**
- Category-based test runner (./test.sh)
- Tests grouped by feature
- 415+ tests covering core functionality

**⚠️ Needs Improvement:**
- Derivation tests failing (critical bug)
- 48.6% of builtins untested
- Need comprehensive test coverage before production use

## Next Actions (Priority Order)

1. **Fix derivation bugs** (2-3h) - BLOCKING all other work
2. **Create math test file** (3-4h) - 8 functions
3. **Create attrset test file** (2-3h) - 5 functions
4. **Create string test file** (3-4h) - 7 functions
5. **Create path test file** (4-5h) - 8 functions

**Total estimated time to 80% coverage:** 14-19 hours

## Testing Quick Reference

```bash
# Run all tests
./test.sh

# Run specific categories
./test.sh derivation    # Derivation tests
./test.sh math          # Math operations (file doesn't exist yet)
./test.sh attrs         # Attrset operations (file doesn't exist yet)
./test.sh strings       # String operations (file doesn't exist yet)
./test.sh paths         # Path/file operations (file doesn't exist yet)
./test.sh core          # Core builtins
./test.sh translator    # Translator tests
./test.sh import        # Import system tests

# Run specific test file
deno test --allow-all main/tests/builtins_core_test.js
```

## Documentation Files

- **README.md** - Project overview and quick start
- **ARCHITECTURE.md** - Technical design and patterns
- **ARCH_SUMMARY.md** - Quick reference guide
- **prompt.md** - Current priorities and task details
- **CODEBASE_STATUS.md** - This file (current state summary)

## Summary

**The codebase is well-structured and clean.** The main work remaining is:
1. Fix 2 derivation bugs (CRITICAL, 2-3h)
2. Add test coverage for 31 untested builtins (12-16h)

No refactoring or reorganization needed. Focus on execution (bug fixes + testing).
