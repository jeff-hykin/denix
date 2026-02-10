# Denix Architectural Analysis & Simplification Plan

**Date:** 2026-02-10
**Analyst:** Architect Bot (Session 127)
**Status:** Complete Assessment

---

## Executive Summary

The denix codebase has **ONE CLEAR GOAL**: Make runtime.js work with 80%+ test coverage.

**Current State:**
- ✅ Runtime: 102 functions implemented (100%)
- ⚠️ Tests: 42/102 tested (40%)
- 🎯 Goal: 82/102 tested (80%)

**Core Issue:** The codebase has accumulated bloat that **distracts from the main goal**.

---

## Simplification Philosophy

### What Makes a Simple Codebase?

1. **Clear Purpose** - One main goal, not many
2. **Minimal Dependencies** - Only import what's used
3. **Clean Testing** - Easy to run, easy to understand
4. **No Dead Code** - Everything has a reason
5. **No Documentation Bloat** - prompt.md should be < 100 lines

### Current Problems

1. **Bloated imports** (100+ unused symbols)
2. **Documentation overload** (prompt.md = 457 lines, should be ~50)
3. **Duplicate code** (nixRepr in 2 places)
4. **Unclear test organization** (27 test files, unclear grouping)

---

## Critical Simplifications (MUST DO)

### 1. Clean Up runtime.js Imports (15 min) ⚡ CRITICAL

**Problem:** Lines 1-8 import 100+ unused symbols

**Current:**
```javascript
import { OperatingSystem } from "..."  // UNUSED
import { FileSystem } from "..."       // UNUSED
import { run, hasCommand, ... } from "..."  // UNUSED (12+ symbols)
import { Console, black, white, ... } from "..."  // UNUSED (50+ symbols)
import { zip, enumerate, count, ... } from "..."  // Only 'zip' used!
import { toString as safeToString } from "..."  // UNUSED
import { deepCopy, deepCopySymbol, ... } from "..."  // UNUSED (10+ symbols)
import { escapeRegexMatch } from "..."  // UNUSED
```

**Solution:** Replace lines 1-8 with:
```javascript
import { zip } from "https://deno.land/x/good@1.5.1.0/array.js"
```

**Why critical:** Bloat makes the file harder to read and slower to load.

---

### 2. Consolidate nixRepr Function (10 min)

**Problem:** Duplicate function in 2 places:
- main/runtime.js line 126
- main.js line 1223

**Solution:**
1. Export from runtime.js: `export const nixRepr = (value)=>{...}`
2. Import in main.js: `import { nixRepr } from "./main/runtime.js"`
3. Delete duplicate in main.js

---

### 3. Simplify prompt.md (20 min) ⚡ CRITICAL

**Problem:** 457 lines of verbose instructions, examples, edge cases

**Current Structure:**
- 80 lines of "CRITICAL INSTRUCTIONS"
- 200+ lines of detailed edge case examples
- 100+ lines of nix repl command examples
- Lots of motivational text

**Solution:** Simplify to ~50 lines:

```markdown
# Runtime Testing Priority

**Goal:** 42/102 → 82/102 tested (40% → 80%)

## Next 6 Test Files (21-28 hours)

1. `builtins_type_checking_test.js` - 10 functions, 3-4h
2. `builtins_lists_comprehensive_test.js` - 8 functions, 5-7h
3. `builtins_attrs_comprehensive_test.js` - 5 functions, 3-5h
4. `builtins_strings_comprehensive_test.js` - 6 functions, 3-4h
5. `builtins_math_comprehensive_test.js` - 8 functions, 3-4h
6. `builtins_paths_comprehensive_test.js` - 10 functions, 4-6h

## Testing Process

1. Test in `nix repl` first
2. Write Deno.test() matching behavior
3. Run: `./test.sh types` (or lists/attrs/strings/math/paths)
4. Fix bugs in runtime.js

## References

- Nix 2.18 Docs: https://nix.dev/manual/nix/2.18/language/builtins
- Noogle: https://noogle.dev
```

**Why critical:** Shorter = clearer. Developer should see "what to do next" in 30 seconds.

---

## Testing System Simplification

### Current State (Good but Could Be Better)

**test.sh is excellent!** It has:
- Clear categories (types, lists, attrs, strings, math, paths)
- Run all tests: `./test.sh`
- Run by category: `./test.sh types`
- Run by pattern: `./test.sh derivation`

**Test files are well-organized:**
- `builtins_*_test.js` - Runtime builtin tests
- `translator_test.js` - Translator tests
- `derivation/` - Derivation tests
- `import_*_test.js` - Import system tests
- `nixpkgs_*_test.js` - Integration tests

### Minor Improvements (Optional)

1. **Rename for consistency:**
   - `hasattr_test.js` → `builtins_hasattr_test.js`
   - `operators.js` → `operators_test.js`

2. **Standardize imports:**
   - Some use `jsr:@std/assert`
   - Some use `https://deno.land/std@0.208.0/assert/mod.ts`
   - Standardize to `jsr:@std/assert` (simplest)

**Priority:** LOW - Can be done after 80% coverage

---

## What to DELETE

### Documentation Files
- ✅ SIMPLIFICATION_PLAN.md (already deleted)
- ✅ SIMPLIFICATION_SUMMARY.md (already deleted)
- ❓ SIMPLIFICATION_COMPLETE.md (150 lines, historical artifact)
- ❓ ARCHITECT_REPORT.md (210 lines, can consolidate into this file)

**Recommendation:** Keep only this file (ARCHITECT_ANALYSIS.md) as the single source of truth.

### Dead Code (Need Verification)
- `isConstantExpression` in main.js:1239 - Defined but never called?
- Need to grep codebase to verify before deletion

---

## Directory Structure Assessment

### Current Structure (GOOD)
```
denix/
├── main.js                 # Translator (1268 lines)
├── main/
│   ├── runtime.js          # Runtime (2314 lines)
│   ├── errors.js           # Error classes
│   ├── import_cache.js     # Import caching
│   ├── import_loader.js    # Import loading
│   ├── fetcher.js          # HTTP downloads
│   ├── tar.js              # Tar extraction
│   ├── nar_hash.js         # NAR hashing
│   ├── store_manager.js    # Store management
│   └── tests/              # 27 test files
├── tools/
│   ├── hashing.js          # Hash functions
│   ├── store_path.js       # Store path computation
│   ├── import_resolver.js  # Path resolution
│   ├── parsing.js          # XML parsing
│   ├── analysis.js         # Stack manager
│   ├── generic.js          # Utilities
│   ├── json_parse.js       # JSON parser
│   ├── lazy_array.js       # Lazy array
│   └── md5.js, sha1.js, sha_helpers.js  # Hash implementations
├── nixpkgs.lib/            # External test data (git submodule)
├── test.sh                 # Test runner
├── README.md               # Project overview
├── ARCHITECTURE.md         # Technical design
└── prompt.md               # Current priorities
```

**Assessment:** Structure is **EXCELLENT**. No changes needed.

### Files to Review (Optional)
- `tools/analysis.js` (1363 bytes) - Is StackManager still used?
- `tools/generic.js` (350 bytes) - Only has `toFloat`, worth a file?
- `tools/md5.js`, `tools/sha1.js`, `tools/sha_helpers.js` - Could be consolidated into `tools/hashing.js`?

**Priority:** LOW - Structure is clean enough

---

## The Real Priority: prompt.md

### Current prompt.md Issues

1. **Too long** (457 lines)
2. **Too detailed** (nix repl examples for every function)
3. **Too motivational** ("CRITICAL", "⚡", "START HERE", "MUST DO")
4. **Too repetitive** (edge cases listed for every function)

### Simplified prompt.md (Target: 50 lines)

The developer needs to see:
1. **What's the goal?** (80% test coverage)
2. **What's next?** (6 test files to create)
3. **How to test?** (./test.sh command)
4. **Where to learn?** (Nix docs link)

That's it! Everything else is bloat.

**Example:**
```markdown
# Goal: 80% Runtime Test Coverage

**Status:** 42/102 tested (40%)
**Target:** 82/102 tested (80%)
**Remaining:** 40 functions, 21-28 hours

## Next 6 Test Files

| File | Functions | Time |
|------|-----------|------|
| builtins_type_checking_test.js | 10 | 3-4h |
| builtins_lists_comprehensive_test.js | 8 | 5-7h |
| builtins_attrs_comprehensive_test.js | 5 | 3-5h |
| builtins_strings_comprehensive_test.js | 6 | 3-4h |
| builtins_math_comprehensive_test.js | 8 | 3-4h |
| builtins_paths_comprehensive_test.js | 10 | 4-6h |

## Process

1. Test in `nix repl` first: `builtins.isInt 42`
2. Create test file: `main/tests/builtins_type_checking_test.js`
3. Run: `./test.sh types`
4. Fix bugs in runtime.js

## References

- Nix 2.18: https://nix.dev/manual/nix/2.18/language/builtins
- Examples: https://noogle.dev
```

---

## Action Plan

### Phase 1: Critical Cleanup (45 min)

1. ✅ Clean up runtime.js imports (15 min)
2. ✅ Consolidate nixRepr (10 min)
3. ✅ Simplify prompt.md (20 min)

**Goal:** Remove bloat, focus on clarity

### Phase 2: Documentation (15 min)

4. ✅ Delete SIMPLIFICATION_COMPLETE.md
5. ✅ Delete ARCHITECT_REPORT.md
6. ✅ Keep only this file (ARCHITECT_ANALYSIS.md)

**Goal:** One source of truth

### Phase 3: Verification (10 min)

7. ✅ Run all tests to verify no breakage
8. ✅ Update README.md if needed

**Total Time:** 70 minutes (1.2 hours)

---

## After Simplification: Focus on Testing

Once cleanup is done, the **ONLY PRIORITY** is:

1. Create `builtins_type_checking_test.js` (3-4h)
2. Create `builtins_lists_comprehensive_test.js` (5-7h)
3. Create `builtins_attrs_comprehensive_test.js` (3-5h)
4. Create `builtins_strings_comprehensive_test.js` (3-4h)
5. Create `builtins_math_comprehensive_test.js` (3-4h)
6. Create `builtins_paths_comprehensive_test.js` (4-6h)

**Total:** 21-28 hours to 80% coverage

---

## Success Criteria

### For Simplification
- ✅ runtime.js: 8 import lines → 1 import line
- ✅ prompt.md: 457 lines → ~50 lines
- ✅ No duplicate code (nixRepr consolidated)
- ✅ All tests still passing

### For Overall Project
- 🎯 Runtime: 80%+ test coverage (82/102 functions)
- 🎯 Tests: All passing
- 🎯 Documentation: Clear and concise

---

## Conclusion

The denix codebase is **well-architected** but has **documentation bloat**. The simplification should take ~1 hour, then focus entirely on testing.

**Key Insight:** Simpler docs = clearer priorities = faster progress.

**Next Step:** Execute Phase 1-2 cleanup, then start testing work.
