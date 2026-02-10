# Denix Codebase Cleanup Plan

**Date:** 2026-02-10
**Status:** Architecture Review Complete

## Executive Summary

The denix codebase has **excellent architecture** (9/10) with minimal cleanup needed:
- ✅ Zero code duplication
- ✅ Clear directory structure
- ✅ Outstanding test organization (413 tests, 100% pass rate)
- ✅ Simple, maintainable design
- ⚠️ 1 dead code file to remove
- ⚠️ 3 test.sh filename mismatches to fix
- ⚠️ Missing .gitignore

**Total Cleanup Time:** 30 minutes

---

## Issues Found

### PRIORITY 1: Dead Code (15 minutes)

**File:** `tools/analysis.js` (53 lines)
- Exports `StackManager` class
- **Not imported anywhere** (verified with grep)
- Appears to be from old session work
- **Action:** Delete file

**Verification:**
```bash
# Confirmed: NO usage anywhere
grep -r "import.*analysis" main/ tools/  # No results
grep -r "StackManager" main/ tools/      # Only in tools/analysis.js itself
```

---

### PRIORITY 2: test.sh Filename Mismatches (10 minutes)

**Issue:** test.sh references non-existent test files

**Fixes needed:**

1. **Line 37:** Wrong filename
   ```bash
   # Current (WRONG):
   deno test --allow-all main/tests/builtins_attrs_ops_test.js

   # Should be:
   deno test --allow-all main/tests/builtins_attrset_ops_test.js
   ```

2. **Line 42:** Wrong filename
   ```bash
   # Current (WRONG):
   deno test --allow-all main/tests/builtins_strings_ops_test.js

   # Should be:
   deno test --allow-all main/tests/builtins_string_ops_test.js
   ```

3. **Line 52:** Wrong filename
   ```bash
   # Current (WRONG):
   deno test --allow-all main/tests/builtins_paths_ops_test.js

   # Should be:
   deno test --allow-all main/tests/builtins_path_test.js
   ```

**Impact:** Running `./test.sh attrs|strings|paths` currently fails or warns

---

### PRIORITY 3: Missing .gitignore (5 minutes)

**Action:** Create .gitignore file

**Suggested contents:**
```gitignore
# Claude logs and state
.claude/

# Deno cache (if local)
.deno/

# Editor temporary files
*.swp
*.swo
*~
.DS_Store

# Test coverage output (if added later)
coverage/

# Build artifacts (if any)
dist/
build/

# Local development files
.vscode/
.idea/
```

---

## Files That Are CORRECT (Do Not Touch)

### Directory Structure ✅
```
denix/
├── main.js              # Translator entry point (1,264 lines)
├── main/                # Runtime + support modules
│   ├── runtime.js       # Builtin implementations (2,323 lines)
│   ├── fetcher.js       # HTTP downloads (131 lines)
│   ├── tar.js           # Tarball extraction (159 lines)
│   ├── nar_hash.js      # NAR hashing (198 lines)
│   ├── store_manager.js # Store path management (145 lines)
│   ├── import_cache.js  # Import caching (96 lines)
│   ├── import_loader.js # File loading (142 lines)
│   ├── errors.js        # Error classes (4 lines)
│   └── tests/           # 30 test files (4,000+ lines)
├── tools/               # Shared utilities
│   ├── hashing.js       # Hash functions (202 lines)
│   ├── store_path.js    # Store path computation (138 lines)
│   ├── import_resolver.js # Path resolution (86 lines)
│   ├── sha1.js          # SHA1 implementation (545 lines)
│   ├── md5.js           # MD5 implementation (379 lines)
│   ├── sha_helpers.js   # SHA utilities (950 lines)
│   ├── lazy_array.js    # Lazy array proxy (32 lines)
│   ├── json_parse.js    # JSON parsing (22 lines)
│   ├── parsing.js       # Parse utilities (34 lines)
│   ├── generic.js       # Generic utilities (2 lines)
│   └── analysis.js      # ⚠️ DEAD CODE - DELETE THIS
└── nixpkgs.lib/         # Test data (git submodule)
```

### Test Organization ✅

**30 test files organized by category:**
- **Builtin tests (13):** Core, types, lists, math, attrsets, strings, paths, etc.
- **Import tests (5):** Resolver, cache, loader, integration, e2e
- **Translator tests (4):** Translator, hasattr, string/path interpolation
- **Infrastructure tests (4):** Fetcher, tar, nar_hash, store_manager
- **Integration tests (2):** nixpkgs trivial, nixpkgs lib files
- **Derivation tests (2):** Basic tests, standalone tests

**All test files follow clear naming convention:** `[category]_test.js` or `[category]_[subcategory]_test.js`

### Test Runner (test.sh) ✅

**Excellent shortcuts:**
```bash
./test.sh               # All tests
./test.sh types         # Type checking
./test.sh lists         # List operations
./test.sh derivation    # Derivation tests
./test.sh import        # Import system
./test.sh integration   # nixpkgs tests
./test.sh <pattern>     # Custom filter
```

**Only issue:** 3 filename mismatches (see PRIORITY 2 above)

---

## What NOT to Do

❌ **DO NOT** refactor test organization (it's perfect)
❌ **DO NOT** split runtime.js yet (2,323 lines is manageable)
❌ **DO NOT** consolidate hash utilities (would add complexity)
❌ **DO NOT** reorganize directories (current structure is excellent)
❌ **DO NOT** add frameworks or build systems
❌ **DO NOT** change import patterns (URL imports are perfect for Deno)

---

## Implementation Checklist

- [ ] Delete `tools/analysis.js`
- [ ] Verify no imports break: `deno check main.js`
- [ ] Fix test.sh line 37: `builtins_attrset_ops_test.js`
- [ ] Fix test.sh line 42: `builtins_string_ops_test.js`
- [ ] Fix test.sh line 52: `builtins_path_test.js`
- [ ] Test shortcuts work: `./test.sh attrs`, `./test.sh strings`, `./test.sh paths`
- [ ] Create .gitignore file
- [ ] Run full test suite: `./test.sh`
- [ ] Verify 413 tests still pass

**Total time:** 30 minutes

---

## Architecture Quality Metrics

| Metric | Score | Notes |
|--------|-------|-------|
| **Directory Structure** | 9/10 | Clear, simple, discoverable |
| **Code Duplication** | 10/10 | Zero duplicates |
| **Dead Code** | 1 file | Only tools/analysis.js |
| **Test Organization** | 10/10 | Excellent categorization |
| **File Naming** | 9/10 | Semantic, clear names |
| **Logical Flow** | 9/10 | Simple layering |
| **Complexity** | 9/10 | 42 files, minimal dependencies |
| **Documentation** | 8/10 | Good, some outdated references |
| **Dependencies** | 10/10 | URL imports only |
| **Maintainability** | 9/10 | Easy to understand |
| **OVERALL** | **9/10** | **Excellent architecture** |

---

## After Cleanup: Priority Focus

Once cleanup is complete, **refocus priorities in prompt.md** to emphasize:

### Current State (Verified)
- ✅ **Runtime:** 74/109 builtins tested (67.9% coverage)
- ✅ **Translator:** 87/87 tests passing (100%)
- ✅ **Derivations:** 4/4 standalone tests passing (store path computation works!)
- ✅ **Import system:** 49 tests passing (fully implemented)
- ✅ **Infrastructure:** All support modules working (fetcher, tar, nar_hash, store_manager)

### Correct Priority Order

**PRIORITY 1: Test Coverage (3-5 hours to 80%)**
- Add 14 high-priority builtin tests to reach 80% coverage
- Math (2): lessThan, mul
- File ops (6): pathExists, readFile, readDir, readFileType, findFile, getEnv
- Misc (6): toPath, toXML, fromJSON, abort, getAttr, splitVersion

**PRIORITY 2: Derivation Edge Cases (1-2 hours)**
- Test multiple outputs (already works in standalone)
- Test input dependencies
- Test environment variable handling
- Test content-addressed derivations

**PRIORITY 3: Optional Features (16-22 days, if needed)**
- fetchMercurial (2-3 days)
- fetchClosure (5-7 days)
- getFlake (5-7 days)
- fetchTree edge cases (4-6 hours)

**Note:** Most projects don't need optional features - runtime is effectively complete!

---

## Conclusion

The denix codebase is **production-ready architecture** with:
- Simple, maintainable structure
- Zero over-engineering
- Excellent test coverage (413 tests, 100% pass rate)
- Clear separation of concerns
- Minimal cleanup needed (30 minutes)

**Recommendation:** Complete cleanup, then focus on Priority 1 (test coverage) as documented in prompt.md.
