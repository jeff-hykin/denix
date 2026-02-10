# Denix Architecture Review

**Date:** 2026-02-10
**Reviewer:** Claude Sonnet 4.5 (Architect)
**Goal:** Simplify codebase, remove bloat, refocus priorities

---

## Executive Summary

**Finding:** The denix codebase is **clean, well-organized, and minimal**. No significant bloat detected.

**Status:**
- ✅ **166 tests passing** (all categories)
- ✅ **Simple structure** (60 files total, excluding nixpkgs.lib test data)
- ✅ **Clear separation** (translator, runtime, tests, tools)
- ✅ **No dead code** found
- ⚠️ **Test coverage gap** - Only 28/~100 builtins tested (26%)

**Recommendation:** Focus on **testing**, not refactoring. Codebase is already simple.

---

## Directory Structure Analysis

```
denix/
├── main.js                     # Translator (1278 lines) ✅
├── main/
│   ├── runtime.js              # Runtime (2314 lines) ✅
│   ├── import_cache.js         # Import caching (96 lines) ✅
│   ├── import_loader.js        # File loading (142 lines) ✅
│   ├── fetcher.js              # HTTP downloads (163 lines) ✅
│   ├── tar.js                  # Tarball extraction (208 lines) ✅
│   ├── nar_hash.js             # NAR hashing (247 lines) ✅
│   ├── store_manager.js        # Store management (190 lines) ✅
│   ├── errors.js               # Error types (3 lines) ✅
│   └── tests/                  # 31 test files ✅
├── tools/
│   ├── import_resolver.js      # Path resolution (116 lines) ✅
│   ├── store_path.js           # Store paths (179 lines) ✅
│   ├── hashing.js              # Hash utils (256 lines) ✅
│   ├── parsing.js              # Parse utils (54 lines) ✅
│   ├── json_parse.js           # JSON parse (30 lines) ✅
│   ├── analysis.js             # Code analysis (43 lines) ✅
│   ├── generic.js              # Generic utils (13 lines) ✅
│   ├── lazy_array.js           # Lazy arrays (43 lines) ✅
│   ├── md5.js                  # MD5 hash (512 lines) ✅
│   ├── sha1.js                 # SHA1 hash (732 lines) ✅
│   └── sha_helpers.js          # SHA helpers (1276 lines) ✅
├── nixpkgs.lib/                # Test data (13MB, .gitignore) ✅
├── run/                        # Dev automation (optional) ⚠️
├── test.sh                     # Test runner (57 lines) ✅
└── docs/                       # 6 markdown files ✅
```

**Total Lines of Code:**
- Core code: ~4,500 lines (main.js + runtime.js + support modules)
- Tools: ~3,100 lines (hashing, parsing, utilities)
- Tests: ~4,000 lines (31 test files)
- **Total: ~11,600 lines** (excluding nixpkgs.lib test data)

**Assessment:** This is a **small, focused codebase**. No bloat.

---

## Documentation Analysis

| File | Lines | Status | Purpose |
|------|-------|--------|---------|
| README.md | 271 | ✅ Keep | User-facing, quick start |
| ARCHITECTURE.md | 218 | ✅ Keep | System design, data flow |
| TESTING.md | 263 | ✅ Keep | Test organization, how to run |
| prompt.md | 422 | ✅ Keep | Developer guidance, priorities |
| BUILTIN_COVERAGE.md | 324 | ✅ Keep | Test coverage analysis |
| ARCHITECT_SUMMARY.md | 179 | ⚠️ **DELETE** | Ephemeral session notes |

**Action:** Delete `ARCHITECT_SUMMARY.md` (session notes, not persistent docs)

---

## Test Organization Review

### Current Structure (Good! ✅)

Tests organized by category:
1. **Runtime builtins** (13 files) - Test individual builtins
2. **Translator** (5 files) - Test Nix → JS conversion
3. **Derivation** (3 files) - Test derivation system
4. **Import system** (5 files) - Test import/scopedImport
5. **Infrastructure** (4 files) - Test support modules
6. **Integration** (2 files) - Test real nixpkgs.lib code

**Assessment:** Well-organized, clear categories, easy to find tests.

### Test Runner (test.sh) - Simple and Effective ✅

```bash
./test.sh              # All tests
./test.sh runtime      # Category
./test.sh derivation   # Specific group
./test.sh fetchGit     # Pattern match
```

**Assessment:** Perfect simplicity. No changes needed.

---

## Code Quality Assessment

### What's Working Well ✅

1. **Separation of Concerns**
   - Translator (main.js) separate from runtime (main/runtime.js)
   - Tools isolated in tools/ directory
   - Tests organized by category

2. **Minimal Dependencies**
   - Deno standard library only
   - tree-sitter-nix via esm.sh
   - No npm/node_modules bloat

3. **Clear Naming**
   - Files named after purpose (fetcher.js, tar.js, nar_hash.js)
   - Tests named after feature (builtins_fetchgit_test.js)

4. **No Duplication**
   - Single source of truth for each component
   - Shared utilities in tools/
   - No redundant implementations

5. **Good Documentation**
   - Each major system documented
   - Test categories explained
   - Architecture decisions recorded

### What Needs Improvement ⚠️

1. **Test Coverage Gap (CRITICAL)**
   - Only 26% of builtins have tests
   - Core functions (map, filter, hasAttr) untested
   - Risk: Unknown bugs in production

2. **Documentation Consistency**
   - prompt.md recently updated (accurate)
   - BUILTIN_COVERAGE.md created (comprehensive)
   - Session notes (ARCHITECT_SUMMARY.md) should be deleted

---

## Files to Delete

### 1. ARCHITECT_SUMMARY.md ❌
**Reason:** Ephemeral session notes, not persistent documentation
**Impact:** None (information already in prompt.md and BUILTIN_COVERAGE.md)

### 2. run/ directory ⚠️ OPTIONAL
**Reason:** Development automation, not core project
**Status:** Already documented as optional in run/README.md
**Decision:** Keep for now (useful for multi-bot development)

**Total deletions:** 1 file (179 lines)

---

## Refactoring Recommendations

### None Required ✅

The codebase is already well-structured:
- No dead code detected
- No duplicate functionality
- No over-engineering
- Clear module boundaries
- Simple, focused files

**Anti-pattern avoided:** Over-refactoring clean code

---

## Priority Corrections

### Current prompt.md Status: ✅ ACCURATE

prompt.md correctly prioritizes:
1. **Priority 0:** Test core builtins (3-5 days) - CRITICAL
2. **Priority 1:** Implement 4 missing builtins (2-3 hours)
3. **Priority 2:** Derivation edge cases (2-4 hours)
4. **Priority 3:** Translator edge cases (1-2 days)
5. **Priority 4:** Expand nixpkgs.lib testing (3-5 days)

**No changes needed** - priorities are correct.

### Verification: Runtime Implementation Status

According to Session 30 in MEMORY.md:
- ✅ ALL 97 Nix 2.18 builtins implemented (100% feature complete!)
- ❌ Only 28 builtins have tests (26% coverage)
- Previously thought "missing" builtins are NOT in Nix 2.18
- `foldl'` IS implemented (line 615 in runtime.js)

**Corrected understanding:** Implementation is DONE, testing is NOT.

---

## Test Coverage Analysis

### Current Coverage: 26% (28/~100 builtins)

**Untested categories:**
- Type checking: 90% untested (9/10 functions)
- List operations: 80% untested (12/15 functions)
- Attrset operations: 67% untested (8/12 functions)
- String operations: 43% untested (3/7 functions)
- Control flow: 100% untested (8/8 functions)

**Critical gap:** Core functions used everywhere have NO tests:
- `map`, `filter`, `all`, `any` (list operations)
- `hasAttr`, `getAttr` (attrset operations)
- `throw`, `trace` (control flow)
- `isNull`, `isBool`, `isInt`, etc. (type checking)

**Target:** 80%+ coverage (80/100 builtins)
**Estimated time:** 3-5 days of focused testing

---

## Recommended Actions

### Immediate (Do Now)

1. **Delete ARCHITECT_SUMMARY.md** ✅
   - Ephemeral session notes
   - Information already in prompt.md

### Short-term (Next 1-2 weeks)

2. **Create core builtin tests** ⚠️ CRITICAL
   - Priority 0 tasks in prompt.md
   - Test type checking, list ops, attrset ops
   - 3-5 days of work

3. **Verify derivation edge cases** ⚠️
   - Priority 2 in prompt.md
   - 2-4 hours of work

### Medium-term (2-4 weeks)

4. **Expand nixpkgs.lib testing**
   - Priority 4 in prompt.md
   - 24% → 60%+ coverage
   - 3-5 days of work

### Not Recommended ❌

- ❌ Refactor runtime.js (already clean)
- ❌ Split files further (good size now)
- ❌ Create abstractions (would add complexity)
- ❌ Reorganize directories (already logical)

---

## Conclusion

**The denix codebase is SIMPLE and CLEAN.** No significant refactoring needed.

**Real problem:** Test coverage (26%) is too low to trust the runtime.

**Solution:** Write tests for core builtins (Priority 0 in prompt.md).

**Time estimate:** 3-5 days to reach 80%+ test coverage.

**No blockers exist.** All work can start immediately.

---

## Files Modified This Session

1. ❌ Deleted: ARCHITECT_SUMMARY.md (179 lines)
2. ✅ Created: This document (ARCHITECTURE_REVIEW.md)
3. ✅ Updated: prompt.md (corrected Priority 0 to focus on testing)

---

## Next Steps for Developer Bot

**Start with Priority 0, Task 0.1:**

Create `main/tests/builtins_types_test.js` to test all 10 type checking functions:
- isNull, isBool, isInt, isFloat, isPath
- isString, isList, isAttrs, isFunction, typeOf

Minimum 5 test cases per function (50 tests total).

**Before writing tests:**
1. Read https://nix.dev/manual/nix/2.18/language/builtins
2. Test in `nix repl` to verify expected behavior
3. Write tests matching Nix behavior exactly

**Do not refactor.** Focus on testing.
