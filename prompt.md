# Denix Development Priorities

## Current Status (2026-02-10)

**Runtime:** 97/97 builtins implemented, 28/97 tested (26% coverage)
**Translator:** 100% complete (87/87 tests passing)
**Overall:** 240+ tests passing

**CRITICAL:** 3 bugs just fixed in runtime.js (concatLists, isAttrs, head)

## THE PRIORITY: Test Runtime Builtins

**Reality:** 15 minutes of testing found 3 bugs in 3 functions (100% failure rate)

**Goal:** Test ALL 69 untested builtins to find and fix remaining bugs

**Estimated work:** 30-40 hours testing + 15-20 hours bug fixing = 45-60 hours total

## Testing Tasks (Priority Order)

### Task 1: Type Checking Functions (HIGH PRIORITY)
**Functions:** isNull, isBool, isInt, isFloat, isString, isList, isAttrs, isPath, isFunction, typeOf (10 functions)
**Time:** 4-6 hours
**Why critical:** Used everywhere in Nix code

**Before starting:**
1. Read Nix 2.18 docs: https://nix.dev/manual/nix/2.18/language/builtins
2. Test in `nix repl` to understand expected behavior
3. Create `main/tests/builtins_types_test.js`

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
**Functions:** map, filter, all, any, elem, foldl', partition, sort, genList, concatMap (10+ functions)
**Time:** 6-8 hours
**Why critical:** Most used operations in Nix

**Critical functions to test first:**
- `map` - Uses complex lazyMap proxy (HIGH BUG RISK)
- `filter` - Second most used
- `foldl'` - Has "TODO: check edgecases" comment in code

### Task 3: Attrset Operations (HIGH PRIORITY)
**Functions:** hasAttr, getAttr, attrNames, attrValues, catAttrs, genericClosure (8 functions)
**Time:** 4-6 hours
**Why critical:** Core attribute set operations

### Task 4: String Operations (MEDIUM PRIORITY)
**Functions:** concatStringsSep, split, match, replaceStrings (already tested) (3 untested)
**Time:** 3-4 hours

### Task 5: Math & Comparison (MEDIUM PRIORITY)
**Functions:** sub, mul, lessThan, ceil, floor, bitAnd, bitOr, bitXor (8 functions)
**Time:** 2-3 hours

### Task 6: Everything Else (LOWER PRIORITY)
**Functions:** Path ops, hashing, derivation edge cases, etc. (40+ functions)
**Time:** 15-20 hours

## How to Test a Builtin

### Step 1: Understand Expected Behavior
```bash
nix repl
nix-repl> builtins.someFunc arg1 arg2
<observe output>
```

### Step 2: Create Test File
```javascript
// main/tests/builtins_CATEGORY_test.js
import { builtins } from "../runtime.js"
import { assertEquals } from "https://deno.land/std@0.220.0/assert/mod.ts"

Deno.test("builtins.func - description", () => {
    // Test normal cases
    assertEquals(builtins.func(normalInput), expectedOutput)

    // Test edge cases
    assertEquals(builtins.func(edgeCase), expectedOutput)

    // Test error cases if applicable
    assertThrows(() => builtins.func(invalidInput))
})
```

### Step 3: Run Tests
```bash
./test.sh                    # Run all tests
./test.sh builtins_types     # Run specific file
deno test --allow-all main/tests/builtins_types_test.js  # Direct run
```

### Step 4: Fix Bugs Found
When a test fails:
1. Check the runtime.js implementation (line numbers in BUILTIN_COVERAGE.md)
2. Compare with Nix docs
3. Fix the bug
4. Re-run tests

## Test File Naming Convention

- `builtins_types_test.js` - Type checking functions
- `builtins_lists_test.js` - List operations
- `builtins_attrs_test.js` - Attribute set operations
- `builtins_strings_test.js` - String operations
- `builtins_math_test.js` - Math & comparison
- `builtins_CATEGORY_test.js` - Other categories

## Running Tests by Category

```bash
./test.sh                  # All tests
./test.sh types            # Type checking tests
./test.sh lists            # List operation tests
./test.sh attrs            # Attrset operation tests
```

## Success Criteria

**Minimum acceptable:** 80% test coverage (77/97 builtins tested)
**Goal:** 90%+ coverage (87/97 builtins tested)

## After Runtime Testing is Complete

Only AFTER runtime has 80%+ test coverage:

1. **Derivation edge cases** (2-3 hours) - Multiple outputs, passthru, meta
2. **Translator edge cases** (2-3 days) - Nested patterns, escapes, etc.
3. **More nixpkgs.lib testing** (4-6 days) - Expand from 10/41 to 25/41 files

## What NOT to Do

❌ Don't work on translator improvements until runtime is 80%+ tested
❌ Don't work on nixpkgs.lib expansion until runtime is 80%+ tested
❌ Don't add new features - focus on testing existing code
❌ Don't create new builtins - all 97 are already implemented

## Key Insight

**Testing is not busy work - it's bug discovery.** We found 3 critical bugs in 15 minutes. There are likely 20-30 more bugs waiting to be discovered in the untested code.

Every hour spent testing saves days of debugging production issues.
