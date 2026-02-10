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

**Runtime:** 97/97 builtins implemented, 28/97 tested (26% coverage) - NEEDS 80%+ COVERAGE
**Translator:** 87/87 tests passing (DO NOT TOUCH until runtime is tested)
**Overall:** 240+ tests passing

## THE PRIORITY: Test Runtime Builtins

**Problem:** Only 28/97 builtins tested. Recent testing found bugs in 100% of tested functions.

**Goal:** Test ALL 69 untested builtins to find and fix remaining bugs

**Remaining work:** 30-40 hours testing + 15-20 hours bug fixing = 45-60 hours total

## Testing Tasks (Priority Order)

### Task 1: Type Checking Functions (HIGH PRIORITY)
**Untested functions:** isNull, isBool, isInt, isFloat, isString, isList, isPath, isFunction, typeOf (9 untested)
**Remaining time:** 4-6 hours
**Why critical:** Used everywhere in Nix code, isAttrs already had a null-check bug

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
**Untested functions:** map, filter, all, any, elem, foldl', partition, sort, genList, concatMap (10+ untested)
**Remaining time:** 6-8 hours
**Why critical:** Most used operations in Nix, head already had a bug returning wrong type

**Critical untested functions (TEST FIRST):**
- `map` - Uses complex lazyMap proxy (VERY HIGH BUG RISK)
- `filter` - Second most used (HIGH BUG RISK)
- `foldl'` - Has "TODO: check edgecases" comment in code (CONFIRMED INCOMPLETE)

**Before starting (MANDATORY):**
1. **READ** Nix docs for each list function
2. **TEST** behavior in `nix repl` with edge cases: empty lists, single element, nested lists
3. **CHECK** runtime.js implementation for TODOs and suspicious patterns
4. **CREATE** test file: `main/tests/builtins_lists_test.js`

### Task 3: Attrset Operations (HIGH PRIORITY)
**Untested functions:** hasAttr, getAttr, attrNames, attrValues, catAttrs, genericClosure (8 untested)
**Remaining time:** 4-6 hours
**Why critical:** Core attribute set operations, used in every Nix program

**Before starting (MANDATORY):**
1. **READ** Nix docs for attrset operations
2. **TEST** in `nix repl` with missing keys, nested attrs, special characters
3. **CREATE** test file: `main/tests/builtins_attrs_test.js`

### Task 4: String Operations (MEDIUM PRIORITY)
**Untested functions:** split, match (concatStringsSep already has bugs that were fixed)
**Remaining time:** 3-4 hours

**Before starting (MANDATORY):**
1. **READ** Nix docs for string operations
2. **TEST** regex behavior in `nix repl` (split and match use POSIX regex)
3. **CREATE** test file: `main/tests/builtins_strings_test.js`

### Task 5: Math & Comparison (MEDIUM PRIORITY)
**Untested functions:** sub, mul, lessThan, ceil, floor, bitAnd, bitOr, bitXor (8 untested)
**Remaining time:** 2-3 hours
**Risk:** Division by zero not handled, BigInt vs Float edge cases

**Before starting (MANDATORY):**
1. **READ** Nix docs for arithmetic operations
2. **TEST** BigInt vs Float behavior in `nix repl`
3. **CREATE** test file: `main/tests/builtins_math_test.js`

### Task 6: Everything Else (LOWER PRIORITY)
**Untested functions:** Path ops, hashing, derivation edge cases, etc. (40+ untested)
**Remaining time:** 15-20 hours

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

**Current:** 28/97 builtins tested (26% coverage) - UNACCEPTABLE
**Minimum target:** 77/97 builtins tested (80% coverage) - REQUIRED
**Optimal target:** 87/97 builtins tested (90% coverage) - GOAL

**Remaining work to minimum:** 49 untested builtins
**Remaining work to optimal:** 59 untested builtins

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

## STRICT RULES - DO NOT VIOLATE

❌ **DO NOT** work on translator until runtime is 80%+ tested
❌ **DO NOT** work on nixpkgs.lib expansion until runtime is 80%+ tested
❌ **DO NOT** add new features - focus on testing existing code
❌ **DO NOT** create new builtins - all 97 are already implemented
❌ **DO NOT** skip reading documentation before testing
❌ **DO NOT** skip testing in nix repl before writing tests
❌ **DO NOT** report what you've accomplished - only report what remains

## Critical Reminder

**Testing finds bugs.** Recent data:
- 3 bugs found in 3 tested functions (100% bug rate)
- 69 functions remain untested
- Expected bugs remaining: 20-30 critical bugs

Every untested function is a production crash waiting to happen.
