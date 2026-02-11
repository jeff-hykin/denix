# Denix Simplification Plan - 2026-02-11

## Executive Summary

**Status:** Codebase is functionally complete (102/102 builtins, 538 tests passing)
**Problem:** Poor maintainability due to 2,882-line runtime.js monolith (39% of all code)
**Goal:** Achieve <500 lines per file without breaking functionality

## Issues Identified

### 1. Documentation Bloat (IMMEDIATE FIX)

**Remove these temporary working documents:**
- `ARCHITECTURE_ISSUES.md` (13KB) - describes problems, doesn't solve them
- `SIMPLIFICATION_2026_02_11.md` (3.5KB) - meta-document about past simplification
- `prompt.md` (11KB) - agent instructions, not user documentation

**Reason:** These are working notes, not permanent documentation. Keep only:
- `README.md` - User-facing documentation
- `TODO.md` - Development priorities
- `CONTRIBUTING.md` (if created) - Contributor guide

**Action:** Delete 3 files, save 27.5KB

---

### 2. Runtime.js Monolith (MAJOR REFACTOR)

**Current:** `runtime.js` - 2,882 lines, 102 builtins + helpers + classes

**Problem breakdown:**
```
Lines 1-163:    Helper classes (InterpolatedString, Path, DotString)
Lines 164-2063: Giant builtins object literal (1,900 lines!)
Lines 2064-end: Operators + exports
```

**Proposed split:**
```
main/runtime/
├── index.js              # Public exports only (~50 lines)
├── classes.js            # InterpolatedString, Path, DotString (~180 lines)
├── operators.js          # All operators (~200 lines)
└── builtins/
    ├── types.js          # isNull, isBool, isInt, typeOf, etc. (~150 lines)
    ├── lists.js          # map, filter, head, tail, etc. (~400 lines)
    ├── attrsets.js       # hasAttr, mapAttrs, removeAttrs, etc. (~350 lines)
    ├── strings.js        # substring, split, match, etc. (~300 lines)
    ├── math.js           # add, sub, mul, bitwise, etc. (~200 lines)
    ├── paths.js          # path, toPath, baseNameOf, etc. (~200 lines)
    ├── derivations.js    # derivation, placeholder, etc. (~400 lines)
    ├── fetchers.js       # fetchGit, fetchTarball, etc. (~350 lines)
    ├── import.js         # import, scopedImport (~150 lines)
    └── control.js        # throw, trace, seq, tryEval, etc. (~150 lines)
```

**Benefits:**
- Each file <450 lines (largest is lists.js at ~400)
- Easy to navigate: "Where's mapAttrs?" → builtins/attrsets.js
- Parallel development: multiple contributors can work on different categories
- Easier testing: test files map 1:1 to implementation files

**Migration strategy:**
1. Create `main/runtime/` directory
2. Copy classes out to `classes.js`
3. Copy operators out to `operators.js`
4. Split builtins by category (10 files)
5. Create `index.js` that re-exports everything
6. Update imports in all test files (40 files)
7. Delete old `runtime.js`

**Estimated effort:** 4-6 hours (mostly mechanical copying)

---

### 3. Test Organization (OPTIONAL IMPROVEMENT)

**Current:** Flat structure in `main/tests/` (40 files)

**Proposed:**
```
main/tests/
├── unit/
│   ├── builtins/          # Mirror runtime structure
│   │   ├── types_test.js
│   │   ├── lists_test.js
│   │   ├── attrsets_test.js
│   │   └── ...
│   ├── translator_test.js
│   └── ...
├── integration/
│   ├── nixpkgs_lib_files_test.js
│   ├── nixpkgs_trivial_test.js
│   └── import_e2e_test.js
└── fixtures/
    └── ... (existing fixtures)
```

**Benefits:**
- Clear distinction between unit and integration tests
- Easier to run "just unit tests" or "just integration tests"
- Test files parallel source structure

**Tradeoff:** Requires updating 40 import paths
**Decision:** SKIP for now - not worth the churn

---

## Recommended Actions (Priority Order)

### Priority 1: Delete Documentation Bloat (5 minutes)
```bash
rm ARCHITECTURE_ISSUES.md
rm SIMPLIFICATION_2026_02_11.md
rm prompt.md
```

**Impact:** -27.5KB, cleaner repository

---

### Priority 2: Split runtime.js (4-6 hours)

**Step-by-step process:**

1. **Create directory structure** (1 minute)
```bash
mkdir -p main/runtime/builtins
```

2. **Extract classes** (15 minutes)
```bash
# Create main/runtime/classes.js
# Lines 1-163 from runtime.js → classes.js
# Export: InterpolatedString, Path, DotString
```

3. **Extract operators** (15 minutes)
```bash
# Create main/runtime/operators.js
# Lines 2064+ from runtime.js → operators.js
# Export: add, subtract, multiply, divide, etc.
```

4. **Split builtins by category** (3-4 hours)
```bash
# Create 10 builtins/*.js files
# Extract from giant builtins object literal (lines 164-2063)
# Each file exports object with relevant builtins
```

5. **Create index.js** (30 minutes)
```javascript
// main/runtime/index.js
export * from "./classes.js"
export * from "./operators.js"
export { builtins } from "./builtins/index.js"

// main/runtime/builtins/index.js
import * as types from "./types.js"
import * as lists from "./lists.js"
// ... import all categories
export const builtins = {
    ...types.builtins,
    ...lists.builtins,
    // ... merge all
}
```

6. **Update imports** (30 minutes)
```bash
# Find all imports of runtime.js
grep -r "from.*runtime.js" main/tests/

# Update to:
import { builtins, operators } from "../runtime/index.js"
```

7. **Test and verify** (30 minutes)
```bash
deno test --allow-all
# All 538 tests should still pass
```

8. **Delete old runtime.js** (1 second)
```bash
git rm main/runtime.js
```

**Total time:** 4-6 hours
**Result:**
- Largest file: ~400 lines (lists.js)
- Average file: ~250 lines
- 13 files instead of 1 monolith

---

### Priority 3: Update README (15 minutes)

**Changes needed:**
- Update "Project Structure" section to show new runtime/ directory
- Update import examples to use new paths
- Update line counts (will be more spread out)

---

## Validation Criteria

**Before simplification:**
- [ ] All 538 tests passing
- [ ] Document current line counts per file

**After simplification:**
- [ ] All 538 tests still passing
- [ ] No file >500 lines
- [ ] All imports updated correctly
- [ ] README reflects new structure

---

## Non-Issues (Things That Are Fine)

### ✅ Hashing module structure
- `hashing.js` acts as facade for sha1/md5/sha_helpers
- This is proper separation of concerns
- **Keep as-is**

### ✅ Main vs Tools separation
- `main/` = runtime + translator
- `tools/` = utilities used by main
- Clear boundary, good design
- **Keep as-is**

### ✅ Test file count (40 files)
- Comprehensive test coverage is good
- 538 passing tests validate everything
- **Keep as-is**

---

## Timeline

**Completed (2026-02-11):**
- ✅ Priority 1: Deleted doc bloat (ARCHITECTURE_ISSUES.md, SIMPLIFICATION_2026_02_11.md, prompt.md)
- ✅ Updated README.md status section

**Next:**

**This week:**
- Priority 2: Split runtime.js (4-6 hours)
- Priority 3: Update README (15 min)

**Total effort:** 5-7 hours of focused work

---

## Risk Assessment

**Low risk:**
- Priority 1 (delete docs) - No code changes, zero risk

**Medium risk:**
- Priority 2 (split runtime) - Mechanical refactor, but touches many files
  - Mitigation: Run full test suite after each step
  - Rollback: Git revert if tests fail

**Success criteria:**
- All 538 tests pass
- No functionality changes
- Improved maintainability

---

## Conclusion

The codebase is **functionally complete** but has **one major maintainability issue**: the 2,882-line runtime.js monolith.

**Recommended action:** Execute Priority 1 (delete docs) immediately, then allocate 4-6 hours for Priority 2 (split runtime).

After this simplification:
- No file >500 lines ✓
- Clear module boundaries ✓
- Easy navigation ✓
- Parallel development possible ✓
- Zero functionality loss ✓
