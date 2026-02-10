# Denix Development Priorities

## ⚠️ CRITICAL INSTRUCTIONS - READ FIRST ⚠️

**YOUR JOB:** Focus ONLY on what is NOT implemented and NOT working. Report ONLY what remains to be done.

**YOU ARE:** A senior level developer. There is no such thing as a blocker. Break down large tasks into smaller tasks.

**WORK ORDER (MUST FOLLOW THIS SEQUENCE):**
1. ✅ Runtime builtins → CURRENT PRIORITY (97 implemented, only 28 tested = 26% coverage)
2. ⏸️ Translator improvements → DO NOT WORK ON THIS until runtime is 80%+ tested
3. ⏸️ nixpkgs.lib testing → DO NOT WORK ON THIS until runtime is 80%+ tested

**DOCUMENTATION-DRIVEN DEVELOPMENT:**
When implementing ANY builtin or feature:
1. **READ** official Nix docs FIRST: https://nix.dev/manual/nix/2.18/language/builtins
2. **TEST** behavior in `nix repl` to understand edge cases
3. **SEARCH** the internet for additional documentation and examples
4. **IMPLEMENT** based on documented behavior, not assumptions
5. **VERIFY** against nix repl output

**EXTERNAL DEPENDENCIES:**
- You MAY use npm modules through https://esm.sh/NPM_MODULE_NAME
- WARNING: esm.sh doesn't always work reliably
- Prefer Deno standard library when possible

---

## Current Status (2026-02-10)

**Runtime:** 97/97 builtins implemented, 40/97 tested (41% coverage) - NEEDS 80%+ COVERAGE
**Translator:** 87/87 tests passing (DO NOT TOUCH until runtime is tested)
**Overall:** 240+ tests passing
**Known bugs:** ALL FIXED! (3 bugs from Session 32 were already fixed)

## THE PRIORITY: Test Runtime Builtins

**Problem:** Only 40/97 builtins tested (41% coverage). Need comprehensive testing.

**Goal:** Test ALL 57 remaining untested builtins to achieve 80%+ coverage

**Remaining work:** 25-35 hours testing + 10-15 hours bug fixing = 35-50 hours total

## Testing Tasks (Priority Order)

### Task 1: Type Checking Functions (HIGH PRIORITY)
**Untested functions:** isNull, isBool, isInt, isFloat, isString, isList, isPath, isAttrs, typeOf (9 untested)
**Remaining time:** 3-4 hours
**Why critical:** Used everywhere in Nix code, fundamental to all operations

**Before starting (MANDATORY):**
1. **READ** Nix 2.18 docs: https://nix.dev/manual/nix/2.18/language/builtins
2. **TEST** in `nix repl` to understand expected behavior for each function
3. **VERIFY** behavior with null, undefined, edge cases in nix repl
4. **CREATE** test file: `main/tests/builtins_types_test.js`

**Example test structure:**
```javascript
import { builtins } from "../runtime.js"
import { assertEquals } from "https://deno.land/std@0.220.0/assert/mod.ts"

Deno.test("builtins.isAttrs - basic cases", () => {
    assertEquals(builtins.isAttrs({}), true)
    assertEquals(builtins.isAttrs({a: 1n}), true)
    assertEquals(builtins.isAttrs(null), false)
    assertEquals(builtins.isAttrs(undefined), false)
    assertEquals(builtins.isAttrs([]), false)
    assertEquals(builtins.isAttrs(1n), false)
    assertEquals(builtins.isAttrs("hello"), false)
})

// 5-10 tests per function
```

### Task 2: List Operations (HIGH PRIORITY)
**Untested functions:** map, filter, all, any, elem, elemAt, partition, sort, genList, concatLists (10 untested)
**Already tested:** head, tail, concatMap, foldl
**Remaining time:** 4-5 hours
**Why critical:** Most used operations in Nix

**Critical untested functions (TEST FIRST):**
- `map` - Uses complex lazyMap proxy (VERY HIGH BUG RISK)
- `filter` - Second most used (HIGH BUG RISK)
- `concatLists` - List flattening (MEDIUM RISK)

**Before starting (MANDATORY):**
1. **READ** Nix docs for each list function
2. **TEST** behavior in `nix repl` with edge cases: empty lists, single element, nested lists
3. **CHECK** runtime.js implementation for TODOs and suspicious patterns
4. **CREATE** test file: `main/tests/builtins_lists_test.js`

### Task 3: Attrset Operations (HIGH PRIORITY)
**Untested functions:** hasAttr, getAttr, attrNames, attrValues, catAttrs, genericClosure, zipAttrsWith (7 untested)
**Already tested:** mapAttrs, removeAttrs, listToAttrs, intersectAttrs, genAttrs, optionalAttrs
**Remaining time:** 3-4 hours
**Why critical:** Core attribute set operations, used in every Nix program

**Before starting (MANDATORY):**
1. **READ** Nix docs for attrset operations
2. **TEST** in `nix repl` with missing keys, nested attrs, special characters
3. **CREATE** test file: `main/tests/builtins_attrs_test.js`

### Task 4: String Operations (MEDIUM PRIORITY)
**Untested functions:** split, match, concatStringsSep, toString (4 untested)
**Already tested:** substring, stringLength, replaceStrings, concatMapStringsSep
**Remaining time:** 2-3 hours

**Before starting (MANDATORY):**
1. **READ** Nix docs for string operations
2. **TEST** regex behavior in `nix repl` (split and match use POSIX regex)
3. **CREATE** test file: `main/tests/builtins_strings_test.js`

### Task 5: Math & Comparison (MEDIUM PRIORITY)
**Untested functions:** sub, mul, lessThan, ceil, floor, bitAnd, bitOr, bitXor (8 untested)
**Already tested:** add, div, compareVersions
**Remaining time:** 2-3 hours
**Risk:** BigInt vs Float edge cases

**Before starting (MANDATORY):**
1. **READ** Nix docs for arithmetic operations
2. **TEST** BigInt vs Float behavior in `nix repl`
3. **CREATE** test file: `main/tests/builtins_math_test.js`

### Task 6: Path/File Operations (MEDIUM PRIORITY)
**Untested functions:** baseNameOf, dirOf, pathExists, readFile, readDir, readFileType, findFile, toPath (8 untested)
**Remaining time:** 3-4 hours
**Why important:** File operations are common in build scripts

**Before starting (MANDATORY):**
1. **READ** Nix docs for path/file operations
2. **TEST** behavior in `nix repl` with real files
3. **CREATE** test file: `main/tests/builtins_path_ops_test.js`

### Task 7: Control Flow & Debugging (MEDIUM PRIORITY)
**Untested functions:** abort, addErrorContext, break, traceVerbose (4 untested)
**Already tested:** throw, trace, seq, deepSeq, tryEval
**Remaining time:** 1-2 hours

### Task 8: Derivations (MEDIUM PRIORITY)
**Untested functions:** derivation, derivationStrict, placeholder, toFile, storePath, outputOf, unsafeDiscardOutputDependency (7 untested)
**Remaining time:** 3-4 hours
**Note:** Basic derivation tests exist but don't cover all builtins

### Task 9: Hashing & String Context (LOWER PRIORITY)
**Untested functions:** hashFile, hashString, getContext, hasContext, appendContext, unsafeDiscardStringContext (6 untested)
**Remaining time:** 2-3 hours

### Task 10: Miscellaneous (LOWER PRIORITY)
**Untested functions:** getEnv, splitVersion, unsafeGetAttrPos, toXML, fetchMercurial, fetchClosure, getFlake (7 untested)
**Note:** fetchMercurial, fetchClosure, getFlake are stubbed (throw NotImplemented)
**Remaining time:** 2-3 hours

## How to Test a Builtin (MANDATORY PROCESS)

### Step 1: Research Expected Behavior (DO NOT SKIP)
```bash
# Open nix repl and test the function
nix repl
nix-repl> builtins.someFunc arg1 arg2
nix-repl> builtins.someFunc edgeCase
nix-repl> builtins.someFunc null
nix-repl> builtins.someFunc {}
# Test with different types, edge cases, error conditions
```

**Also read documentation:**
- Primary: https://nix.dev/manual/nix/2.18/language/builtins
- Search: Google "nix builtins.someFunc examples"
- Reference: Check nixpkgs code for real-world usage

### Step 2: Create Test File
```javascript
// main/tests/builtins_CATEGORY_test.js
import { builtins } from "../runtime.js"
import { assertEquals, assertThrows } from "https://deno.land/std@0.220.0/assert/mod.ts"

Deno.test("builtins.func - normal cases", () => {
    assertEquals(builtins.func(normalInput), expectedOutput)
})

Deno.test("builtins.func - edge cases", () => {
    // Test null/undefined if applicable
    // Test empty collections if applicable
    // Test boundary conditions
    assertEquals(builtins.func(edgeCase), expectedOutput)
})

Deno.test("builtins.func - error cases", () => {
    // Only if the function should throw errors
    assertThrows(() => builtins.func(invalidInput))
})
```

### Step 3: Run Tests
```bash
./test.sh                    # Run all tests
./test.sh builtins_types     # Run specific file
deno test --allow-all main/tests/builtins_types_test.js  # Direct run
```

### Step 4: Fix Bugs Found (NOT IF, WHEN)
When a test fails (expect this to happen frequently):
1. Read the error message carefully
2. Check runtime.js implementation (line numbers in BUILTIN_COVERAGE.md)
3. Compare implementation with Nix documentation
4. Fix the bug (common issues: null checks, type conversions, variable name typos)
5. Re-run tests to verify fix
6. Check if fix breaks other tests

## Test File Naming Convention (MUST FOLLOW)

Create these test files (they don't exist yet):
- `main/tests/builtins_types_test.js` - Type checking functions (NEEDS CREATION)
- `main/tests/builtins_lists_test.js` - List operations (NEEDS CREATION)
- `main/tests/builtins_attrs_test.js` - Attribute set operations (NEEDS CREATION)
- `main/tests/builtins_strings_test.js` - String operations (NEEDS CREATION)
- `main/tests/builtins_math_test.js` - Math & comparison (NEEDS CREATION)
- `main/tests/builtins_CATEGORY_test.js` - Other categories (NEEDS CREATION)

## Running Tests by Category

```bash
./test.sh                  # All tests
./test.sh builtins_types   # Type checking tests (after creation)
./test.sh builtins_lists   # List operation tests (after creation)
./test.sh builtins_attrs   # Attrset operation tests (after creation)
```

## Common Bug Patterns Found (Learn From These)

Based on bugs already discovered:

1. **Missing null checks** - Always test with null/undefined
   ```javascript
   // BAD: if (value.constructor.name === "Object")
   // GOOD: if (value && value.constructor && value.constructor.name === "Object")
   ```

2. **Variable name typos** - Copy-paste errors
   ```javascript
   // BAD: lists.map(list => ...) when variable is actually 'lists'
   // GOOD: lists.map(item => ...) or check variable names carefully
   ```

3. **Wrong return types** - Returning wrapped value instead of unwrapped
   ```javascript
   // BAD: return [elements[0]]
   // GOOD: return elements[0]
   ```

4. **Insufficient edge case handling** - TODO comments indicate incomplete code
   ```javascript
   // If you see "TODO: check edgecases" - THAT NEEDS TESTS IMMEDIATELY
   ```

## Success Criteria (What Remains)

**Current:** 40/97 builtins tested (41% coverage) - NOT ENOUGH
**Minimum target:** 77/97 builtins tested (80% coverage) - REQUIRED
**Optimal target:** 87/97 builtins tested (90% coverage) - GOAL

**Remaining work to minimum:** 37 untested builtins (Tasks 1-6)
**Remaining work to optimal:** 47 untested builtins (Tasks 1-10)

**Time estimates:**
- Tasks 1-6 (reach 80%): 18-23 hours
- Tasks 7-10 (reach 90%+): Additional 8-12 hours
- Total to 80%: 18-23 hours
- Total to 90%: 26-35 hours

## After Runtime Testing Reaches 80%

DO NOT START THESE until runtime has 80%+ test coverage:

### Phase 2: Translator Edge Cases (2-3 days remaining)
- Nested destructuring patterns
- String escape sequences
- Multi-line strings
- URI literals
- Operator precedence edge cases

### Phase 3: nixpkgs.lib Testing Expansion (4-6 days remaining)
- Currently: 10/41 files tested
- Target: 25/41 files tested
- Remaining: 15 high-value files (lists.nix, attrsets.nix, options.nix, etc.)

## NEXT IMMEDIATE STEP

**START HERE:** Task 1 - Type Checking Functions

1. Read this section of prompt.md: "Task 1: Type Checking Functions"
2. Open `nix repl` and test each function with edge cases
3. Create `main/tests/builtins_types_test.js`
4. Write 5-10 tests per function (9 functions total)
5. Run tests with `./test.sh builtins_types`
6. Fix any bugs discovered
7. Move to Task 2 when done

**Expected time:** 3-4 hours
**Expected bugs:** 1-3 bugs (based on historical data)

## STRICT RULES - DO NOT VIOLATE

❌ **DO NOT** work on translator until runtime is 80%+ tested
❌ **DO NOT** work on nixpkgs.lib expansion until runtime is 80%+ tested
❌ **DO NOT** add new features - focus on testing existing code
❌ **DO NOT** create new builtins - all 97 are already implemented
❌ **DO NOT** skip reading documentation before testing
❌ **DO NOT** skip testing in nix repl before writing tests
❌ **DO NOT** report what you've accomplished - only report what remains

## Summary of Remaining Testing Work

**Priority 1-6 (REQUIRED for 80% coverage):**
- Task 1: Type Checking (9 builtins, 3-4 hours)
- Task 2: List Operations (10 builtins, 4-5 hours)
- Task 3: Attrset Operations (7 builtins, 3-4 hours)
- Task 4: String Operations (4 builtins, 2-3 hours)
- Task 5: Math & Comparison (8 builtins, 2-3 hours)
- Task 6: Path/File Operations (8 builtins, 3-4 hours)
- **Total: 46 builtins, 18-23 hours**

**Priority 7-10 (OPTIONAL for 90% coverage):**
- Task 7: Control Flow (4 builtins, 1-2 hours)
- Task 8: Derivations (7 builtins, 3-4 hours)
- Task 9: Hashing & Context (6 builtins, 2-3 hours)
- Task 10: Miscellaneous (7 builtins, 2-3 hours)
- **Total: 24 builtins, 8-12 hours**

**GRAND TOTAL: 70 untested builtins, 26-35 hours to 90% coverage**

Note: Some builtins are tested but need more comprehensive edge case testing (like concatMapStringsSep, genAttrs, etc.)

---

## APPENDIX: Complete List of Untested Builtins (72 total)

**Type Checking (9):** isNull, isBool, isInt, isFloat, isString, isList, isPath, isAttrs, typeOf

**List Operations (10):** map, filter, all, any, elem, elemAt, partition, sort, genList, concatLists

**Attrset Operations (7):** hasAttr, getAttr, attrNames, attrValues, catAttrs, genericClosure, zipAttrsWith

**String Operations (4):** split, match, concatStringsSep, toString

**Math & Comparison (8):** sub, mul, lessThan, ceil, floor, bitAnd, bitOr, bitXor

**Path/File Operations (8):** baseNameOf, dirOf, pathExists, readFile, readDir, readFileType, findFile, toPath

**Control Flow (4):** abort, addErrorContext, break, traceVerbose

**Derivations (7):** derivation, derivationStrict, placeholder, toFile, storePath, outputOf, unsafeDiscardOutputDependency

**Hashing & String Context (6):** hashFile, hashString, getContext, hasContext, appendContext, unsafeDiscardStringContext

**Miscellaneous (7):** getEnv, splitVersion, unsafeGetAttrPos, toXML, fetchMercurial, fetchClosure, getFlake

**Constants/Special (2):** nixPath, storeDir

---

## Already Tested Builtins (40 total)

add, compareVersions, concatMap, concatMapStringsSep, deepSeq, div, fetchGit, fetchTarball, fetchTree, fetchurl, filterSource, flakeRefToString, foldl, fromTOML, functionArgs, genAttrs, groupBy, head, import, intersectAttrs, isFunction, length, listToAttrs, mapAttrs, optionalAttrs, parseDrvName, parseFlakeRef, path, removeAttrs, replaceStrings, scopedImport, seq, stringLength, substring, tail, throw, toJSON, trace, tryEval, concatMapStringsSep

