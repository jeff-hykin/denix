# Denix Architecture Simplification Report

**Date:** 2026-02-10
**Session:** 123 (Architect Bot)
**Purpose:** Identify and document bloat, redundancy, and simplification opportunities

---

## Executive Summary

The denix codebase is **functionally complete and well-organized**, but has accumulated **technical debt** in the form of unused imports and duplicate code. The main work remaining is **testing** (37% → 80% coverage), not implementation.

**Key Finding:** None of the identified issues block progress on the primary goal (testing 62 untested builtins).

---

## Issues Found (Priority Order)

### 1. MASSIVE UNUSED IMPORTS (HIGH PRIORITY)
**Impact:** Bloats both main files, increases load time, clutters namespace

**main.js - 8 lines of unused imports:**
```javascript
// REMOVE THESE (100+ unused symbols):
import { OperatingSystem } from "https://deno.land/x/quickr@0.6.51/main/operating_system.js"
import { FileSystem } from "https://deno.land/x/quickr@0.6.51/main/file_system.js"
import { run, hasCommand, throwIfFails, zipInto, mergeInto, returnAsString, Timeout, Env, Cwd, Stdin, Stdout, Stderr, Out, Overwrite, AppendTo } from "https://deno.land/x/quickr@0.6.51/main/run.js"
import { Console, black, white, red, green, blue, yellow, cyan, magenta, ... (50+ color constants) } from "https://deno.land/x/quickr@0.6.51/main/console.js"
import { zip, enumerate, count, permute, combinations, wrapAroundGet } from "https://deno.land/x/good@1.5.1.0/array.js"
import { toString as safeToString } from "https://deno.land/x/good@1.5.1.0/string.js"
import { deepCopy, deepCopySymbol, allKeyDescriptions, deepSortObject, ... (20+ functions) } from "https://deno.land/x/good@1.5.1.0/value.js"
import { escapeRegexMatch } from "https://deno.land/x/good@1.7.1.1/flattened/escape_regex_match.js"

// KEEP THESE (3 lines, actually used):
import { nixFileToXml, parse, xmlStylePreview } from "./tools/parsing.js"
import { StackManager } from "./tools/analysis.js"
import { NixError, NotImplemented } from "./main/errors.js"
```

**main/runtime.js - 8 lines of mostly unused imports:**
```javascript
// REMOVE THESE (100+ unused symbols):
import { OperatingSystem } from "https://deno.land/x/quickr@0.6.51/main/operating_system.js"
import { FileSystem } from "https://deno.land/x/quickr@0.6.51/main/file_system.js"
import { run, hasCommand, throwIfFails, ... } from "https://deno.land/x/quickr@0.6.51/main/run.js"
import { Console, black, white, red, ... (50+ colors) } from "https://deno.land/x/quickr@0.6.51/main/console.js"
import { zip, enumerate, count, permute, combinations, wrapAroundGet } from "https://deno.land/x/good@1.5.1.0/array.js"  // Only 'zip' is used!
import { toString as safeToString } from "https://deno.land/x/good@1.5.1.0/string.js"
import { deepCopy, deepCopySymbol, ... (20+ functions) } from "https://deno.land/x/good@1.5.1.0/value.js"
import { escapeRegexMatch } from "https://deno.land/x/good@1.7.1.1/flattened/escape_regex_match.js"

// SIMPLIFY TO:
import { zip } from "https://deno.land/x/good@1.5.1.0/array.js"
```

**Savings:** ~95% reduction in imported symbols (100+ → 4)

---

### 2. DUPLICATE nixRepr FUNCTION (MEDIUM PRIORITY)
**Impact:** Code duplication, potential divergence, DRY violation

**Found in TWO places:**
- `main.js` line 1223
- `main/runtime.js` line 126

**Solution:**
1. Export `nixRepr` from `main/runtime.js`
2. Import it in `main.js`
3. Delete the duplicate

**Savings:** ~10 lines, prevents bugs from fixing one but not the other

---

### 3. REDUNDANT DOCUMENTATION (MEDIUM PRIORITY)
**Impact:** Confusion, maintenance burden, contradictions

**Files to DELETE:**
- `SIMPLIFICATION_PLAN.md` (145 lines) - Obsolete planning document
- `SIMPLIFICATION_SUMMARY.md` (177 lines) - Duplicate of SIMPLIFICATION_PLAN.md

Both files describe work that's already been done (simplification). They're historical artifacts.

**Files to CONSOLIDATE:**
- `README.md` (174 lines) - Keep as project overview
- `ARCHITECTURE.md` (223 lines) - Keep as technical design doc
- `prompt.md` (528 lines) - **BLOATED**, should be 50-100 lines max

**prompt.md issues:**
- 528 lines (should be ~50 lines)
- Lots of motivational text, detailed examples, nix repl commands
- Should focus on: "What test file to create next?"
- Currently has massive repetition of edge cases and examples

**Solution:** Simplify prompt.md to:
```markdown
# Current Priority: Runtime Testing (37% → 80%)

## Next 6 Test Files to Create

1. `main/tests/builtins_type_checking_test.js` (9 functions, 3-4 hours)
2. `main/tests/builtins_lists_comprehensive_test.js` (6 functions, 3-4 hours)
3. `main/tests/builtins_attrs_comprehensive_test.js` (3 functions, 2-3 hours)
4. `main/tests/builtins_strings_comprehensive_test.js` (4 functions, 2-3 hours)
5. `main/tests/builtins_math_comprehensive_test.js` (7 functions, 2-3 hours)
6. `main/tests/builtins_paths_comprehensive_test.js` (11 functions, 4-6 hours)

## Test Process

1. Test in `nix repl` first
2. Write Deno.test() matching behavior
3. Run: `deno test --allow-all <file>`
4. Fix bugs discovered

## References

- Nix 2.18 Builtins: https://nix.dev/manual/nix/2.18/language/builtins.html
- Noogle: https://noogle.dev
```

**Savings:** 528 → ~50 lines (90% reduction), focus on actionable info only

---

### 4. TEST FILE INCONSISTENCIES (LOW PRIORITY)
**Impact:** Minor confusion, not blocking

**Naming inconsistencies:**
- `hasattr_test.js` → should be `builtins_hasattr_test.js`
- `operators.js` → should be `operators_test.js`

**Import inconsistencies:**
- Some tests use `"https://deno.land/std@0.208.0/assert/mod.ts"`
- Others use `"jsr:@std/assert"`
- Others use `"https://deno.land/std@0.224.0/assert/mod.ts"`
- Others use `"https://deno.land/std@0.210.0/assert/mod.ts"`

**Solution:** Standardize to `jsr:@std/assert` (simplest, version-agnostic)

---

### 5. POTENTIAL DEAD CODE (LOW PRIORITY)
**Impact:** Minimal, needs verification

**In main.js:**
- `isConstantExpression` function (line 1239) - Defined but never called
- Needs grep verification before removal

---

## Recommended Action Plan

### Phase 1: Quick Wins (1 hour)
1. **Remove unused imports** from main.js (lines 1-8)
2. **Remove unused imports** from main/runtime.js (lines 1-8, keep only `zip`)
3. **Delete obsolete docs** (SIMPLIFICATION_PLAN.md, SIMPLIFICATION_SUMMARY.md)

### Phase 2: Consolidation (30 min)
4. **Export nixRepr** from runtime.js
5. **Import nixRepr** in main.js (remove duplicate)

### Phase 3: Documentation (30 min)
6. **Simplify prompt.md** from 528 → 50 lines
7. Keep only actionable priorities, remove examples/motivation

### Phase 4: Test Cleanup (30 min, optional)
8. Rename `hasattr_test.js` → `builtins_hasattr_test.js`
9. Rename `operators.js` → `operators_test.js`
10. Standardize test imports to `jsr:@std/assert`

---

## Testing Impact

**CRITICAL:** None of these changes affect testing priorities.

The main work is:
1. Create 6 test files (Tasks 0-5 in prompt.md)
2. Test 50 untested builtins
3. Fix bugs discovered during testing

**Total testing work:** 21-30 hours

**Total cleanup work:** 2.5 hours (can be done in parallel or after)

---

## Files Modified Summary

| File | Current Size | Action | New Size | Savings |
|------|--------------|--------|----------|---------|
| main.js | Lines 1-8 imports | Remove 8 lines unused imports | Lines 1-3 imports | 5 lines |
| main/runtime.js | Lines 1-8 imports | Remove 7 lines, keep 1 | Lines 1-1 imports | 7 lines |
| main.js | Line 1223 nixRepr | Remove duplicate, import from runtime | Import statement | -10 lines |
| prompt.md | 528 lines | Simplify to essentials | ~50 lines | -478 lines |
| SIMPLIFICATION_PLAN.md | 145 lines | Delete (obsolete) | 0 | -145 lines |
| SIMPLIFICATION_SUMMARY.md | 177 lines | Delete (obsolete) | 0 | -177 lines |
| hasattr_test.js | - | Rename to builtins_hasattr_test.js | - | Consistency |
| operators.js | - | Rename to operators_test.js | - | Consistency |
| All test files | Various | Standardize imports to jsr:@std/assert | Various | Consistency |

**Total savings:** ~822 lines + 100+ unused import symbols removed

---

## Conclusion

The denix codebase is **well-architected** but has **technical debt** from rapid development. The cleanup is **not urgent** and doesn't block testing work.

**Recommendation:** Do Phase 1-2 cleanup (1.5 hours) to remove bloat, then focus entirely on testing (21-30 hours to reach 80% coverage).

**Priority:** Testing > Cleanup

The most important metric is **37% test coverage → 80% test coverage**, not lines of code.
