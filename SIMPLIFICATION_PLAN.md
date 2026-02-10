# Denix Simplification Plan

## Executive Summary

**Goal**: Simplify codebase by removing dead code and improving test organization.
**Impact**: Minimal - only removing 3 unused functions and 2 unused imports.
**Effort**: 15-30 minutes
**Risk**: Very low - all changes are removals of unused code

---

## 1. Remove Unused Code (High Priority)

### 1.1 Remove `curlString` from tools/generic.js
**File**: `/Users/jeffhykin/repos/denix/tools/generic.js` (lines 2-11)
**Status**: Exported but never used anywhere in codebase
**Action**: Delete function and export

### 1.2 Remove `nixFileToXml` from tools/parsing.js
**File**: `/Users/jeffhykin/repos/denix/tools/parsing.js` (lines 31-39)
**Status**: Imported but never called
**Action**: Delete function and remove from exports (keep `xmlStylePreview` which IS used)

### 1.3 Remove unused `StackManager` imports
**Files**:
- `main.js` line 3
- `main/runtime.js` line 4

**Status**: Imported but never instantiated
**Action**: Remove import statements from both files
**Note**: Keep StackManager in tools/analysis.js (may be useful for future debugging)

---

## 2. Current Architecture Assessment

### 2.1 What's Good ✅
- Clean separation: main/ (runtime), tools/ (utilities), main/tests/ (all tests)
- No circular dependencies
- No duplicate test names
- Good test coverage distribution (27 standard files + 3 derivation files)
- All fixture files in fixtures/ are actually used
- Logical module organization

### 2.2 What's Acceptable ⚠️
- Derivation tests use custom test harness (3 files)
  - Reason: May need special setup/teardown
  - Impact: 90% of tests still use standard Deno.test pattern
  - Recommendation: Document why custom harness is needed, OR migrate to Deno.test

### 2.3 What's Not a Problem ✓
- Multiple hashing files (sha1.js, sha_helpers.js, md5.js, hashing.js)
  - These are different crypto algorithms, not duplicates
  - Consolidating would hurt readability
  - Current organization is good

---

## 3. Test Organization Analysis

### 3.1 Current Test Structure
```
main/tests/
├── translator_test.js              (87 tests - Nix→JS translation)
├── builtins_core_test.js           (Core builtins: seq, deepSeq, abort, etc.)
├── builtins_fetch*.js (6 files)    (Network fetchers: ~97 tests)
├── builtins_path_test.js           (Path builtin)
├── builtins_tojson_path_test.js    (JSON serialization)
├── import_*.js (5 files)           (Import system: ~49 tests)
├── string_interpolation_test.js    (String handling)
├── path_interpolation_test.js      (Path handling)
├── hasattr_test.js                 (Attribute access)
├── operators.js                    (Operator tests)
├── fromtoml_test.js                (TOML parsing)
├── fetcher_test.js                 (HTTP fetcher)
├── tar_test.js                     (Tarball extraction)
├── nar_hash_test.js                (NAR hashing)
├── store_manager_test.js           (Store management)
├── nixpkgs_trivial_test.js         (20 nixpkgs functions)
├── nixpkgs_lib_files_test.js       (Full lib files)
├── derivation/ (3 files)           (Derivation system: 12+ tests)
└── fixtures/                       (Test data: 5 .nix files)
```

### 3.2 Test Coverage by Category
| Category | Files | Status | Coverage |
|----------|-------|--------|----------|
| **Translator** | 1 | ✅ Complete | 87/87 tests (100%) |
| **Type Checking** | 0 | ❌ Missing | 0/10 builtins (0%) |
| **List Operations** | 0 | ❌ Missing | 0/12 builtins (0%) |
| **Attrset Operations** | 0 | ⚠️ Partial | 2/7 builtins (hasAttr only) |
| **String Operations** | 1 | ⚠️ Partial | 2/8 builtins |
| **Math/Bitwise** | 0 | ❌ Missing | 0/8 builtins (0%) |
| **Path/File Ops** | 1 | ⚠️ Partial | 1/10 builtins |
| **Operators** | 1 | ✅ Good | ~20 operators tested |
| **Fetch System** | 6 | ✅ Excellent | ~97 tests |
| **Import System** | 5 | ✅ Excellent | ~49 tests |
| **Derivations** | 3 | ✅ Good | 12+ tests |
| **Infrastructure** | 4 | ✅ Good | Store, tar, NAR, fetcher |
| **Integration** | 2 | ✅ Good | nixpkgs.lib files |

### 3.3 Test Naming Convention
**Current Pattern**: Good consistency ✅
- Runtime tests: `builtins_<category>_test.js`
- System tests: `<system>_test.js` (import_*, fetch*, tar, nar, store)
- Integration: `nixpkgs_*.js`
- Derivations: `derivation/*.js` (subdirectory)

**Recommendation**: Keep current pattern, it's clear and consistent.

---

## 4. Missing Test Files (From prompt.md)

Need to create 6 new test files for untested builtins:

| Priority | File | Functions | Time | Impact |
|----------|------|-----------|------|--------|
| 🔥 **1** | `builtins_type_checking_test.js` | 10 | 3-4h | Critical (isNull, typeOf, etc.) |
| 🔥 **2** | `builtins_lists_comprehensive_test.js` | 12 | 6-8h | Critical (map, filter, all) |
| 🔥 **3** | `builtins_attrs_comprehensive_test.js` | 7 | 4-6h | Critical (getAttr, attrNames) |
| ⚠️ **4** | `builtins_strings_comprehensive_test.js` | 8 | 4-5h | Important (split, toString) |
| ⚠️ **5** | `builtins_math_comprehensive_test.js` | 8 | 3-4h | Important (sub, mul, bitwise) |
| ⚠️ **6** | `builtins_paths_comprehensive_test.js` | 10 | 4-6h | Important (pathExists, readFile) |

**Total**: 55 functions, 24-33 hours → 89% coverage (97/109 builtins)

---

## 5. Simplification Actions

### Phase 1: Remove Dead Code (15 min)
1. ✅ Delete `curlString` from tools/generic.js
2. ✅ Delete `nixFileToXml` from tools/parsing.js
3. ✅ Remove `StackManager` imports from main.js and main/runtime.js
4. ✅ Run tests to verify nothing breaks
5. ✅ Commit changes

### Phase 2: Document Test Harness (5 min)
1. Add comment to `main/tests/derivation/test_harness.js` explaining why custom pattern
2. If no good reason exists, consider migrating to Deno.test in future

### Phase 3: Update Documentation (10 min)
1. Update ARCHITECTURE.md with current accurate state
2. Update README.md if needed
3. Ensure prompt.md reflects true priorities

---

## 6. Testing System Analysis

### 6.1 Current Test Runner: `test.sh` ✅
**Status**: Excellent organization

Supports:
- `./test.sh` - Run all tests
- `./test.sh types` - Type checking (file doesn't exist yet)
- `./test.sh lists` - List operations (file doesn't exist yet)
- `./test.sh attrs` - Attrset operations (file doesn't exist yet)
- `./test.sh strings` - String operations (file doesn't exist yet)
- `./test.sh math` - Math operations (file doesn't exist yet)
- `./test.sh paths` - Path operations (file doesn't exist yet)
- `./test.sh core` - Core builtins
- `./test.sh translator` - Translator tests
- `./test.sh derivation` - Derivation tests
- `./test.sh import` - Import system tests
- `./test.sh infra` - Infrastructure tests
- `./test.sh integration` - nixpkgs integration tests
- `./test.sh <pattern>` - Custom filter

**Assessment**: No changes needed, test runner is well-designed.

### 6.2 Test Execution Speed
- All tests: ~1-2 seconds (fast!)
- Network tests: May be slower or flaky (acceptable, have error handling)
- Derivation tests: ~11ms (very fast)

**Assessment**: Performance is excellent, no optimization needed.

---

## 7. Priority Correction for prompt.md

### Current prompt.md Issues:
1. ✅ Correctly identifies 67 untested builtins
2. ✅ Correctly prioritizes type checking, lists, attrsets
3. ⚠️ Needs to emphasize derivation system is WORKING (not broken)
4. ⚠️ Should clarify that cleanup is minimal (3 functions + 2 imports)

### Recommended prompt.md Structure:

```markdown
# CURRENT PRIORITY: Runtime Testing (38.5% → 80%)

## Status
- Runtime: 109/109 implemented ✅ 42/109 tested (38.5%) ⚠️
- Translator: 87/87 tests passing ✅
- Derivations: Working (12+ tests passing) ✅
- Import system: Working (49 tests passing) ✅
- Fetch system: Working (97 tests passing) ✅

## Immediate Actions (in order):
1. **Create 6 test files** for 55 untested builtins (24-33 hours)
   - Task 1: Type checking (10 functions, 3-4h) 🔥 START HERE
   - Task 2: List operations (12 functions, 6-8h) 🔥 CRITICAL
   - Task 3: Attrset operations (7 functions, 4-6h) 🔥 CRITICAL
   - Task 4: String operations (8 functions, 4-5h)
   - Task 5: Math operations (8 functions, 3-4h)
   - Task 6: Path operations (10 functions, 4-6h)

2. **Fix bugs discovered during testing** (built into time above)

3. **Optional: Remove dead code** (15 min, very low priority)
   - 3 unused functions
   - 2 unused imports
   - No impact on functionality

## What NOT to do:
- ❌ Don't implement new features (runtime is 100% feature complete)
- ❌ Don't refactor working code (translator is stable)
- ❌ Don't optimize performance (it's already fast)
- ❌ Don't add documentation (focus on tests)

## Success Criteria:
- 80% test coverage (87/109 builtins tested)
- All discovered bugs fixed
- All tests passing
```

---

## 8. Architectural Recommendations

### 8.1 Keep As-Is ✅
- Directory structure (main/, tools/, main/tests/)
- Test naming convention (builtins_*, import_*, nixpkgs_*)
- Test runner (test.sh)
- Module organization (runtime.js, import_*.js, fetch*.js)
- Hashing system (5 separate files for different algorithms)

### 8.2 Minor Improvements (Low Priority)
- Document why derivation tests use custom harness
- Consider adding JSDoc comments to complex functions (optional)

### 8.3 Don't Change ❌
- Don't consolidate hashing files (they're different algorithms)
- Don't move test files around (current organization is logical)
- Don't create new directories (would add complexity)
- Don't refactor working code (focus on testing instead)

---

## 9. Summary

**Current State**:
- Codebase is clean and well-organized ✅
- Only 3 unused functions + 2 unused imports to remove
- 90% of tests use standard Deno.test pattern
- No circular dependencies, no duplicates

**Simplification Impact**:
- Remove 3 functions (curlString, nixFileToXml, one StackManager import usage)
- Remove 2 import statements
- Total code reduction: ~30 lines
- Risk: Zero (unused code can't break anything)

**True Priority**:
- Testing is 1000x more important than cleanup
- Need 45 more functions tested to reach 80% coverage
- Time: 24-33 hours for testing vs 15 min for cleanup
- Focus: Test type checking, lists, attrsets FIRST

**Recommendation**:
1. Do quick cleanup (15 min) NOW
2. Focus 100% on testing (24-33 hours) NEXT
3. Ignore optional improvements until 80% coverage reached
