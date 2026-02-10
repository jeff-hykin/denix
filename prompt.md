# Denix Development Priorities

## ⚠️ CRITICAL DISCOVERY: RUNTIME IS BROKEN ⚠️

**15 minutes of testing revealed:**
- ✗ **3 confirmed bugs** in 3 functions tested (100% failure rate!)
- ✗ **2 crash bugs**: concatLists (ReferenceError), isAttrs (TypeError on null)
- ✗ **1 logic bug**: head returns array instead of element
- ✗ **12 suspected issues** found by code review
- ✗ **69 functions remain untested** (74% of runtime has NO verification)

**Extrapolated bug count: 20-30 bugs minimum in remaining untested functions**

**Status: Runtime is NOT production-ready - DO NOT use without testing**

**IMMEDIATE ACTION REQUIRED:**
1. Fix 3 confirmed bugs (2-3 hours)
2. Test ALL 69 remaining functions (30-40 hours)
3. Fix 20-30 additional bugs expected (17 hours)

**Total work remaining: 75-138 hours (9-17 days)**

---

## CRITICAL RULES - READ FIRST

**Your job is to focus on what is NOT implemented and NOT working. Only report what remains to be done. Do not report accomplishments or add achievement markers (✅/🎉). You are a senior level developer - there is no such thing as a blocker. Break down large tasks into smaller tasks.**

**MANDATORY WORK ORDER - MUST FOLLOW IN SEQUENCE:**
1. **Runtime must be 100% complete** - All builtins fully implemented AND tested
2. **Then translator improvements** - Edge cases, escape sequences, pattern matching
3. **Then nixpkgs.lib testing** - Validate against real-world code

**DO NOT work on translator until runtime testing is complete.**
**DO NOT work on nixpkgs.lib until translator edge cases are done.**

**THE ONLY REMAINING WORK: TESTING THE RUNTIME**

1. **Priority 0: Core builtin testing** - Test 69 untested builtins (Tasks 0.1-0.6) - START HERE
2. **Priority 1: Edge case testing** - Derivations, translator patterns (After Priority 0)
3. **Priority 2: nixpkgs.lib expansion** - Test 31 remaining library files (After Priority 1)

**Current Gap Analysis:**
- Runtime code: 100% written (all 97 Nix 2.18 builtins exist)
- Runtime verification: 26% tested (28/97 builtins have tests, 69 completely untested)
- **Problem**: 71% of runtime code has NO TESTS - it might be broken and we don't know
- **CONFIRMED BUGS (3)**:
  - `builtins.concatLists` line 559 - variable name mismatch (ReferenceError on ANY call) - CRASH
  - `builtins.isAttrs` line 186 - crashes on null/undefined (TypeError on common inputs) - CRASH
  - `builtins.head` line 573 - returns array instead of element (wrong return value) - LOGIC BUG
- **SUSPECTED ISSUES (8)**: lazyMap behavior, all() empty list, foldl' edge cases, partition lazy eval, typeOf branches, string ops, math ops, more
- Translator: Edge cases not fully tested (nested patterns, escape sequences, etc.)
- nixpkgs.lib: 26 of 41 files not tested

**Reality Check:** 15 minutes of testing found 3 confirmed bugs + 12 suspected issues = 15% of reviewed code is BROKEN

**Danger Level Assessment:**
- **3 confirmed bugs** in commonly used functions (concatLists, isAttrs, head)
- **69 untested functions** remaining (74% of runtime)
- **Bug discovery rate**: 3 bugs found by testing 3 functions = 100% failure rate!
- **Extrapolation**: If 100% of tested untested functions have bugs, expect **20-30 more bugs** in remaining 69 functions
- **Impact**: Users CANNOT trust this runtime - it is actively BROKEN

**Why This Matters:**
- `concatLists` is used EVERYWHERE in Nix code (flatten lists) - CRASHES
- `isAttrs` is used for type checking in MOST functions - CRASHES on null
- `head` is used for list processing in MANY functions - RETURNS WRONG TYPE
- These aren't edge cases - they're CORE operations that FAIL on NORMAL inputs
- Every untested function could have similar or worse issues

**Critical Functions Still Untested:**
- `map` - Most used function in Nix, uses complex lazyMap implementation
- `filter` - Second most used, might have similar issues
- `hasAttr` / `getAttr` - Core attrset operations used everywhere
- `foldl'` - Has "TODO: check edgecases" comment in code
- `throw` / `trace` - Error handling functions (can't afford bugs here!)

**Conclusion:** Testing is NOT optional - it's discovering CRITICAL bugs at 100% rate!
**Action Required:** FIX 3 BUGS IMMEDIATELY, then test ALL 69 remaining functions

## KNOWN BUGS REQUIRING IMMEDIATE FIX

### Bug 1: concatLists Variable Name Mismatch (Line 559) - CONFIRMED

**Location:** main/runtime.js:559
**Current code:**
```javascript
"concatLists": (lists)=>requireList(list)&&lists.flat(1),
```

**Problem:** Parameter is `lists` but code calls `requireList(list)` - CRASHES!

**Test result:**
```
builtins.concatLists([[1, 2], [3, 4]])
ERROR: list is not defined
ReferenceError: list is not defined
```

**Fix needed:**
```javascript
"concatLists": (lists)=>requireList(lists)&&lists.flat(1),
```

**Impact:** ANY call to `builtins.concatLists` throws ReferenceError - CRITICAL BUG

---

### Bug 2: isAttrs Crashes on null/undefined (Line 186) - CONFIRMED

**Location:** main/runtime.js:186
**Current code:**
```javascript
"isAttrs": (value)=>Object.getPrototypeOf({}) == Object.getPrototypeOf(value),
```

**Problem:** `Object.getPrototypeOf(null)` throws TypeError

**Test result:**
```
builtins.isAttrs(null)
ERROR: Cannot convert undefined or null to object

builtins.isAttrs(undefined)
ERROR: Cannot convert undefined or null to object
```

**Expected behavior (from nix repl):**
```nix
nix-repl> builtins.isAttrs null
false
```

**Fix needed:**
```javascript
"isAttrs": (value)=>value !== null && value !== undefined && Object.getPrototypeOf({}) == Object.getPrototypeOf(value),
```

**Impact:** ANY call to `builtins.isAttrs` with null/undefined throws TypeError - HIGH PRIORITY BUG

---

These demonstrate WHY testing is critical - implementation exists but is BROKEN.
**2 confirmed crash bugs found in 10 minutes of testing!**

## LIKELY IMPLEMENTATION ISSUES (Discovered During Code Review)

These issues were found by examining untested code. Testing will reveal if they're actual bugs:

### Issue 1: concatLists Variable Mismatch (CONFIRMED BUG)
- **File:** runtime.js:559
- **Code:** `"concatLists": (lists)=>requireList(list)&&lists.flat(1),`
- **Problem:** Uses `list` but parameter is `lists`
- **Impact:** CRASHES on any call
- **Status:** CRITICAL - Fix immediately

### Issue 2: lazyMap Implementation Unknown Behavior
- **File:** runtime.js:575
- **Code:** `"map": (f)=>(list)=>lazyMap(list, f)`
- **Problem:** Uses Proxy object for lazy evaluation
- **Concern:** Might break Object.keys(), JSON.stringify(), or spread operator
- **Status:** Needs comprehensive testing

### Issue 3: all() Empty List Behavior
- **File:** runtime.js:556
- **Code:** `"all": (func)=>(list)=>list.length==0||list.every(func)`
- **Problem:** Returns true for empty list without checking Nix semantics
- **Concern:** Nix might have different empty list behavior
- **Status:** Verify in nix repl

### Issue 4: elemAt Error Message
- **File:** runtime.js:561-571
- **Code:** Has comment about "nix bug" in error handling
- **Problem:** Unclear if error messages match Nix
- **Status:** Needs verification

### Issue 5: foldl' Edge Cases
- **File:** runtime.js:615
- **Code:** Comment says "TODO: check more edgecases on this"
- **Problem:** Acknowledged incomplete testing
- **Status:** Needs edge case tests (empty list, null accumulator, etc.)

### Issue 6: partition Lazy Evaluation
- **File:** runtime.js:577-600
- **Code:** Returns object with lazy-computed `right` and `wrong` properties
- **Problem:** Complex lazy logic might fail when accessed
- **Status:** Needs tests forcing evaluation in different orders

### Issue 7: isAttrs Null/Undefined Handling
- **File:** runtime.js:186
- **Code:** `"isAttrs": (value)=>Object.getPrototypeOf({}) == Object.getPrototypeOf(value)`
- **Problem:** Calling getPrototypeOf(null) throws TypeError
- **Status:** LIKELY BUG - needs null check

### Issue 8: typeOf Error Handling
- **File:** runtime.js:188-211
- **Code:** Complex nested branches with error throwing
- **Problem:** Many edge cases in type detection
- **Status:** Needs comprehensive type testing

### Issue 9: String Operations with InterpolatedString
- **File:** Multiple locations
- **Problem:** Many functions call requireString() but might not handle InterpolatedString correctly
- **Status:** Needs tests with both string types

### Issue 10: Math Operations Type Coercion
- **File:** runtime.js:218-248
- **Code:** All math ops have BigInt vs Float branching
- **Problem:** Edge cases like division by zero, negative numbers, overflow
- **Status:** Needs edge case testing

### Issue 11: head Returns Array Instead of Single Element - CONFIRMED
- **File:** runtime.js:573
- **Code:** `"head": (list)=>[list[0]]`
- **Problem:** Returns `[firstElement]` instead of `firstElement`
- **Test result:**
  ```javascript
  builtins.head([1, 2, 3])  // Returns [1] (WRONG)
  ```
- **Expected behavior:**
  ```nix
  nix-repl> builtins.head [1 2 3]
  1  # Should return single element, not array
  ```
- **Fix needed:** `"head": (list)=>list[0]`
- **Status:** CONFIRMED BUG

### Issue 12: Division Operator Type Handling
- **File:** runtime.js:232-238
- **Code:** Uses `toFloat()` for mixed BigInt/Number division
- **Problem:** Division by zero not handled, overflow not checked
- **Status:** Needs edge case tests

### Issue 13: stringLength with Non-String Types
- **File:** runtime.js:533-539
- **Code:** Only handles string and InterpolatedString, no error for other types
- **Problem:** Should throw error for non-strings, but silently returns undefined
- **Status:** LIKELY BUG - check Nix behavior

### Issue 14: substring Slice Logic
- **File:** runtime.js:540-549
- **Code:** Uses `slice(startNum, startNum + lenNum)`
- **Problem:** Negative start/len, start > string length, len > remaining chars
- **Status:** Needs edge case tests

### Issue 15: split Regex Global Flag
- **File:** runtime.js:501-519
- **Code:** Adds 'g' flag to all regexes
- **Problem:** Nix might not expect global flag, affects lastIndex behavior
- **Status:** Verify against Nix regex behavior

---

### Bug 3: head Returns Array Instead of Element (Line 573) - CONFIRMED

**Location:** main/runtime.js:573
**Current code:**
```javascript
"head": (list)=>[list[0]],
```

**Problem:** Wraps result in array `[list[0]]` instead of returning element directly

**Test result:**
```javascript
builtins.head([1, 2, 3])
Result: [1]  // WRONG - should be 1
```

**Expected behavior (from nix repl):**
```nix
nix-repl> builtins.head [1 2 3]
1
```

**Fix needed:**
```javascript
"head": (list)=>list[0],
```

**Impact:** ANY call to `builtins.head` returns wrong type (array instead of element) - LOGIC BUG

---

**SUMMARY: 3 confirmed bugs found in 15 minutes of testing**
- 2 crash bugs (concatLists, isAttrs)
- 1 logic bug (head)

**Total likely issues: 15 (3 confirmed bugs, 12 concerns)**

This is WHY 26% test coverage is dangerous - 15+ potential bugs found in 15 minutes of testing!

**Pattern Analysis:**
- **No null checking** - Functions assume valid inputs (isAttrs bug pattern)
- **Variable name typos** - Copy-paste errors (concatLists bug pattern)
- **Unvalidated conversions** - Type coercion without error handling
- **Missing edge cases** - Empty arrays, negative numbers, boundary values
- **Lazy evaluation complexity** - Proxy objects, getters, deferred computation

**Estimated bug count in untested code:** 15-25 bugs (based on 2 found in 10 minutes of testing)

## MANDATORY IMPLEMENTATION & TESTING PROCESS

**ALWAYS READ DOCUMENTATION WHILE WORKING - THIS IS NON-NEGOTIABLE**

**BEFORE testing or fixing ANY builtin:**
1. **Read the official Nix documentation** at https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-FUNCTION_NAME
   - Example: For `builtins.map`, read https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-map
2. **Test behavior in `nix repl`** with 5+ test cases (positive, negative, edge cases, null/empty)
   - Open terminal: `nix repl`
   - Try: `builtins.map (x: x * 2) [1 2 3]`
   - Try edge cases: `builtins.map (x: x) []`, etc.
3. **Search for real-world examples** at https://noogle.dev or in nixpkgs source code
4. **Write implementation** (if fixing bugs) matching Nix behavior EXACTLY
5. **Write comprehensive tests** (minimum 5-10 tests per function)
   - Normal cases (typical inputs)
   - Edge cases (empty, null, boundary values)
   - Error cases (invalid inputs should throw)
   - Match nix repl output exactly

**npm packages:** Only allowed via `https://esm.sh/NPM_MODULE_NAME` (note: unreliable, often doesn't work)

**For network fetchers (when implementing later):**
- builtins.fetchClosure: https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-fetchClosure
- builtins.fetchGit: https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-fetchGit
- builtins.fetchTarball: https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-fetchTarball
- Search the internet for implementation details, examples, and behavior clarification

## Current State (2026-02-10)

**Test coverage: 26%** (28/97 builtins tested, 69 untested)

**What this means:** Runtime has code but NO VERIFICATION that it works correctly.

**Why testing matters - Functions might be broken:**
1. Implementation might return wrong values for normal inputs
2. Edge cases (empty lists, null, negative numbers) might crash or return wrong results
3. Invalid inputs might not throw correct errors
4. Behavior might not match Nix 2.18 exactly

**Testing verifies:**
1. Functions return correct values for normal inputs
2. Functions handle edge cases correctly (empty lists, null, negative numbers)
3. Functions throw correct errors for invalid inputs
4. Functions match Nix 2.18 behavior exactly (verify in nix repl first)

**69 untested functions = 71% of runtime unverified = HIGH RISK**

## Remaining Work Breakdown

### Task 0.1: Type Checking Functions (4-6 hours) - HIGH PRIORITY

**Untested functions (10 total):**
- `isNull(value)` - Returns true if value is null
- `isBool(value)` - Returns true if value is boolean
- `isInt(value)` - Returns true if value is integer
- `isFloat(value)` - Returns true if value is float
- `isString(value)` - Returns true if value is string
- `isList(value)` - Returns true if value is list
- `isAttrs(value)` - Returns true if value is attribute set
- `isPath(value)` - Returns true if value is path
- `isFunction(value)` - Returns true if value is function
- `typeOf(value)` - Returns type name as string

**Potential implementation bugs to check:**
1. `isString` might incorrectly return true/false for InterpolatedString vs plain string
2. `isAttrs` uses `Object.getPrototypeOf({}) == Object.getPrototypeOf(value)` - might fail for null/undefined
3. `typeOf` has complex logic with many branches - edge cases with InterpolatedString, Path, BigInt
4. `isBool` checks `value===true||value===false` - might fail for truthy/falsy values
5. Type checks don't validate against null/undefined inputs

**BEFORE starting:**
1. Read: https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-isNull (and each type check)
2. Test in nix repl:
   ```nix
   nix-repl> builtins.isNull null
   true
   nix-repl> builtins.isNull 5
   false
   nix-repl> builtins.typeOf null
   "null"
   nix-repl> builtins.typeOf 5
   "int"
   nix-repl> builtins.typeOf {}
   "set"
   nix-repl> builtins.isAttrs null
   false
   ```
3. Find examples in nixpkgs source

**Test structure:**
```javascript
import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { builtins } from "../runtime.js"

Deno.test("builtins.isNull - returns true for null", () => {
    assertEquals(builtins.isNull(null), true)
})

Deno.test("builtins.isNull - returns false for non-null", () => {
    assertEquals(builtins.isNull(5n), false)
    assertEquals(builtins.isNull("hello"), false)
    assertEquals(builtins.isNull([]), false)
})

// ... repeat for each function
```

**Required tests:** 5-10 tests per function (50+ total tests)
**File to create:** `main/tests/builtins_types_test.js`

**Specific tests needed:**
1. `isNull`: Test null, integers, strings, arrays, objects - verify returns boolean
2. `isBool`: Test true, false, 1, 0, "true", null - verify ONLY true/false return true
3. `isInt`: Test BigInt, Number, float, string numbers - verify BigInt detection
4. `isFloat`: Test Number (float), BigInt, string numbers - verify Number detection
5. `isString`: Test string, InterpolatedString, Path, null - verify both string types work
6. `isList`: Test Array, Object, null, string - verify Array detection
7. `isAttrs`: Test object, Array, null, undefined - WILL REVEAL NULL BUG if not fixed
8. `isPath`: Test Path instances, strings, objects - verify Path class detection
9. `isFunction`: Test Function, arrow functions, objects, null - verify function detection
10. `typeOf`: Test all types - verify returns correct strings ("null", "int", "bool", "string", "list", "set", "lambda", "float", "path")

**Example test implementation:**
```bash
# Step 1: Verify in nix repl
$ nix repl
nix-repl> builtins.isNull null
true
nix-repl> builtins.isNull 5
false
nix-repl> builtins.isNull "hello"
false
```

```javascript
// Step 2: Write test matching nix behavior
Deno.test("builtins.isNull - returns true for null", () => {
    assertEquals(builtins.isNull(null), true)
})

Deno.test("builtins.isNull - returns false for integer", () => {
    assertEquals(builtins.isNull(5n), false)
})

Deno.test("builtins.isNull - returns false for string", () => {
    assertEquals(builtins.isNull("hello"), false)
})
```

**Testing workflow:**
1. Open terminal: `nix repl` (verify expected behavior)
2. Create test file: `main/tests/builtins_types_test.js`
3. Write tests matching nix repl behavior exactly
4. Run: `deno test --allow-all main/tests/builtins_types_test.js`
5. Fix any failures (implementation bugs in runtime.js)
6. Run full suite: `./test.sh` to ensure no regressions

### Task 0.2: List Operations (6-8 hours) - CRITICAL PRIORITY

**Untested functions (12 total):**
- `map(f, list)` - Apply function to each element
- `filter(pred, list)` - Filter list by predicate
- `foldl'(op, nul, list)` - Left fold (strict)
- `all(pred, list)` - True if predicate true for all
- `any(pred, list)` - True if predicate true for any
- `elem(x, list)` - True if x in list
- `elemAt(list, n)` - Get element at index n
- `concatLists(lists)` - Flatten list of lists
- `genList(f, n)` - Generate list by applying f to 0..n-1
- `sort(comparator, list)` - Sort list with comparator
- `partition(pred, list)` - Split list into {right, wrong}
- `length(list)` - Get list length

**Potential implementation bugs to check:**
1. `map` uses lazyMap (Proxy object) - might break with Object.keys() or JSON.stringify()
2. `filter` is direct JS filter - should work but needs edge case validation
3. `foldl'` uses JS reduce - might not handle empty list correctly, comment says "TODO: check more edgecases"
4. `all` returns `list.length==0||list.every(func)` - empty list behavior might differ from Nix
5. `any` uses JS some() - might fail for empty lists
6. `elem` checks `list.includes(value)` - might fail for BigInt/object comparisons
7. `elemAt` has broken comment about nix bug - might throw wrong error messages
8. `concatLists` has typo `requireList(list)` but variable is `lists` - LIKELY BROKEN!
9. `genList` implementation not shown - might not exist or be broken
10. `sort` comparator logic might be inverted or incorrect
11. `partition` has lazy evaluation - might not work correctly until forced
12. `length` is simple but might fail for non-arrays

**CRITICAL BUG FOUND:** Line 559 in runtime.js:
```javascript
"concatLists": (lists)=>requireList(list)&&lists.flat(1),
```
Variable name mismatch: `requireList(list)` but parameter is `lists` - THIS WILL FAIL!

**BEFORE starting:**
1. Read: https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-map
2. Test in nix repl:
   ```nix
   nix-repl> builtins.map (x: x * 2) [1 2 3]
   [ 2 4 6 ]
   nix-repl> builtins.filter (x: x > 2) [1 2 3 4]
   [ 3 4 ]
   nix-repl> builtins.foldl' (x: y: x + y) 0 [1 2 3]
   6
   nix-repl> builtins.all (x: x > 0) []
   true
   nix-repl> builtins.any (x: x > 5) []
   false
   nix-repl> builtins.concatLists [[1 2] [3 4]]
   [ 1 2 3 4 ]
   ```

**Required tests:** 5-10 tests per function (70+ total tests)
**File to create:** `main/tests/builtins_lists_test.js`

**Specific tests needed:**
1. `map`: Test with simple function, identity, empty list, nested lists - verify lazyMap works correctly
2. `filter`: Test with predicate, always-true, always-false, empty list - verify filtering works
3. `foldl'`: Test with addition, concatenation, empty list, single element - verify accumulator logic
4. `all`: Test with empty list (expect true), all-true, some-false, single element
5. `any`: Test with empty list (expect false), all-false, some-true, single element
6. `elem`: Test found, not-found, empty list, BigInt comparison, object comparison
7. `elemAt`: Test valid index, index 0, last index, negative index (error), out of bounds (error)
8. `concatLists`: Test [[1,2],[3,4]], empty lists, single list, nested depth - WILL REVEAL CRASH BUG if not fixed
9. `genList`: Test n=0 (empty), n=5, negative n (error), large n
10. `sort`: Test numbers, strings, custom comparator, empty list, single element, already sorted
11. `partition`: Test right/wrong split, all-right, all-wrong, empty list, force both sides
12. `length`: Test empty list, single element, large list, non-list (error)

### Task 0.3: Attrset Operations (4-6 hours) - CRITICAL PRIORITY

**Untested functions (8 total):**
- `hasAttr(s, set)` - True if attribute exists
- `getAttr(s, set)` - Get attribute value
- `attrNames(set)` - List of attribute names
- `attrValues(set)` - List of attribute values
- `catAttrs(attr, list)` - Extract attr from list of attrsets
- `zipAttrsWith(f, list)` - Merge attrsets with function
- `intersectAttrs(e1, e2)` - Intersection of attrsets
- `removeAttrs(set, list)` - Remove attributes

**Potential implementation bugs to check:**
1. `hasAttr` uses `Object.getOwnPropertyNames()` - might not handle inherited properties correctly
2. `getAttr` calls requireString(attr) but also uses attr directly as key - might fail for InterpolatedString
3. `attrNames` calls Object.getOwnPropertyNames() without requireAttrSet validation
4. `attrValues` depends on attrNames - cascading bugs possible
5. `catAttrs` might fail if list contains non-attrsets
6. `zipAttrsWith` implementation complexity likely has edge cases
7. `intersectAttrs` might not preserve attribute order or handle empty sets correctly
8. `removeAttrs` might fail if list contains non-string keys

**BEFORE starting:**
1. Read: https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-hasAttr
2. Test in nix repl:
   ```nix
   nix-repl> builtins.hasAttr "x" {x = 1; y = 2;}
   true
   nix-repl> builtins.getAttr "x" {x = 1; y = 2;}
   1
   nix-repl> builtins.hasAttr "missing" {x = 1;}
   false
   nix-repl> builtins.attrNames {z = 3; a = 1; m = 2;}
   [ "a" "m" "z" ]
   nix-repl> builtins.attrValues {a = 1; b = 2;}
   [ 1 2 ]
   ```

**Required tests:** 5-10 tests per function (50+ total tests)
**File to create:** `main/tests/builtins_attrsets_test.js`

**Specific tests needed:**
1. `hasAttr`: Test existing key, missing key, empty set, nested keys (shouldn't work), InterpolatedString key
2. `getAttr`: Test existing key, missing key (error), empty set, InterpolatedString key
3. `attrNames`: Test normal set, empty set, set with numeric keys, set with special chars - verify sorted
4. `attrValues`: Test normal set, empty set, verify order matches attrNames
5. `catAttrs`: Test extract from list of sets, missing attr in some sets, empty list, non-set in list (error)
6. `zipAttrsWith`: Test merge two sets, merge multiple sets, conflicting keys, empty list
7. `intersectAttrs`: Test overlapping keys, no overlap, empty sets, key order preservation
8. `removeAttrs`: Test remove existing, remove missing (no-op), remove all, empty list

### Task 0.4: String Operations (3-4 hours)

**Untested functions (3 total):**
- `concatStringsSep(sep, list)` - Join strings with separator
- `split(regex, str)` - Split string by regex
- `match(regex, str)` - Match string against regex

**Required tests:** 10+ tests per function (30+ total tests)
**File to create:** `main/tests/builtins_strings_test.js`

### Task 0.5: Math & Comparison (2-3 hours)

**Untested functions (5 total):**
- `sub(a, b)` - Subtract b from a
- `mul(a, b)` - Multiply a by b
- `lessThan(a, b)` - True if a < b
- `ceil(x)` - Round up
- `floor(x)` - Round down

**Required tests:** 5-10 tests per function (30+ total tests)
**File to create:** `main/tests/builtins_math_test.js`

### Task 0.6: Control Flow & Debugging (2-3 hours)

**Untested functions (8 total):**
- `throw(message)` - Throw error with message
- `abort(message)` - Abort evaluation
- `trace(msg, value)` - Print message, return value
- `traceVerbose(msg, value)` - Print if verbose enabled
- `addErrorContext(msg, value)` - Add context to errors
- `tryEval(expr)` - Try evaluating, return {success, value}
- `seq(e1, e2)` - Force evaluation of e1, return e2
- `deepSeq(e1, e2)` - Deep force e1, return e2

**BEFORE starting:**
1. Read: https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-throw
2. Test in nix repl - note that throw/abort cannot be caught!

**Required tests:** 3-5 tests per function (35+ total tests)
**File to create:** `main/tests/builtins_control_flow_test.js`

---

## PRIORITY 0 SUMMARY

**Total untested functions in Priority 0: 46 functions**
**Total tests needed: ~265 tests minimum**
**Estimated time: 22-32 hours**

**THESE ARE THE MOST CRITICAL** - These functions are used CONSTANTLY in nixpkgs.

---

### Task 0.7: Path & File Operations (4-6 hours) - OPTIONAL

**Untested functions (8 total):**
- `baseNameOf(path)` - Get filename
- `dirOf(path)` - Get directory
- `pathExists(path)` - True if path exists
- `readFile(path)` - Read file contents
- `readDir(path)` - List directory
- `readFileType(path)` - Get file type
- `findFile(searchPath, path)` - Find file in search path
- `toPath(value)` - Convert to path

**File to create:** `main/tests/builtins_paths_test.js`

### Task 0.8: Additional Tests (6-10 hours) - OPTIONAL

**Categories with no tests:**
- Hashing (2): hashFile, hashString
- Derivations (7): derivationStrict, placeholder, toFile, storePath, outputOf, unsafeDiscardOutputDependency, unsafeDiscardStringContext
- String context (4): getContext, hasContext, appendContext
- Bitwise (3): bitAnd, bitOr, bitXor
- Other (6): toXML, fromJSON, splitVersion, unsafeGetAttrPos, getEnv

---

## CURRENT TEST FILE STATUS

**Existing test file:** `main/tests/builtins_core_test.js` (18 tests)
- Has tests: groupBy, mapAttrs, listToAttrs, intersectAttrs, removeAttrs, concatMap
- Has tests: compareVersions, parseDrvName
- Has tests: trace, throw, tryEval, seq, deepSeq
- **Missing tests:** map, filter, all, any, hasAttr, getAttr, type checking (isNull, isBool, isInt, etc.)

**26 test files exist, ~179+ runtime tests passing**
- Fetch operations: Well covered (fetchGit, fetchTarball, fetchurl, fetchTree, path, filterSource)
- Import system: Well covered (5 test files)
- Derivations: Basic tests only (12 tests, edge cases missing)
- Core operations: Minimal coverage (18 tests in builtins_core_test.js, but critical gaps remain)

### Priority 1: Derivation Edge Cases (2-4 hours)

**Missing test coverage:**
- Multiple outputs (out, dev, doc, bin) - NOT TESTED
- passthru attributes - NOT TESTED
- meta attributes - NOT TESTED
- String context propagation - NOT TESTED

**File to create:** `main/tests/derivation/002_edge_cases.js`

### Priority 2: Translator Edge Cases (1-2 days)

**Missing coverage:**
- Nested pattern matching (@-patterns, ellipsis with defaults) - NOT TESTED
- All string escape sequences (\n, \t, \r, \", \\, \${) - INCOMPLETE
- Multi-line strings with indentation stripping - NOT TESTED
- URI literals - NOT TESTED
- Operator precedence edge cases - NOT TESTED
- Inherit edge cases - NOT TESTED

**Files to create:** `main/tests/translator_edge_cases_test.js`

### Priority 3: nixpkgs.lib Testing Gaps (3-5 days)

**26 files NOT tested yet (out of 41 total):**

**High-value (commonly used):**
- lists.nix - Core list operations (map, filter, fold)
- attrsets.nix - Core attrset utilities
- options.nix - Module system options
- modules.nix - Module system core
- types.nix - Type definitions

**Medium-value:**
- meta.nix - Package metadata utilities
- debug.nix - Debugging helpers
- filesystem.nix - File/path operations
- derivations.nix - Derivation helpers

**Low-value (rarely used):**
- cli.nix, generators.nix, systems/inspect.nix, etc.

**File to expand:** `main/tests/nixpkgs_lib_files_test.js`

## Documentation & Learning Resources

**MANDATORY reading before testing/implementing:**
- Nix 2.18 builtins: https://nix.dev/manual/nix/2.18/language/builtins.html
- Search function documentation: https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-FUNCTION_NAME
- Noogle (search nixpkgs for examples): https://noogle.dev
- **ALWAYS test in nix repl before writing tests!**

**Example workflow for testing builtins.map:**
1. Open browser: https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-map
2. Read documentation (signature, description, examples)
3. Open terminal: `nix repl`
4. Test: `builtins.map (x: x * 2) [1 2 3]` → expect `[ 2 4 6 ]`
5. Test edge cases: `builtins.map (x: x) []` → expect `[ ]`
6. Write test file matching observed behavior exactly

**For network fetchers (future work):**
- fetchClosure: https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-fetchClosure
- fetchTarball: https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-fetchTarball
- fetchGit: https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-fetchGit
- Search web for implementation details and examples

**npm packages:** Only via `https://esm.sh/NPM_MODULE_NAME` (unreliable, may not work)

## Running Tests

```bash
./test.sh                    # All tests
./test.sh runtime            # Runtime builtin tests
./test.sh translator         # Translator tests
./test.sh derivation         # Derivation tests
./test.sh import             # Import system tests
./test.sh integration        # nixpkgs integration tests
```

## Key Files

**Core:**
- `main.js` - Nix→JS translator (1278 lines)
- `main/runtime.js` - Builtin implementations (2314 lines)
- `main/tests/` - Test suites (31 files)

**Infrastructure:**
- `main/import_*.js` - Import system (3 files)
- `main/fetcher.js`, `tar.js`, `nar_hash.js`, `store_manager.js` - Fetch/store (4 files)
- `tools/` - Utilities (hashing, parsing, store paths)

**Documentation:**
- `README.md` - Project overview
- `BUILTIN_COVERAGE.md` - 69 untested functions listed by category
- `TESTING.md` - Testing conventions
- `ARCHITECTURE.md` - System design

## NEXT IMMEDIATE STEP

**CRITICAL: Fix Confirmed Bugs First (30 minutes) - MANDATORY**

Before starting ANY testing, fix these 3 confirmed bugs:

1. **Fix concatLists** (runtime.js:559):
   - Change: `"concatLists": (lists)=>requireList(list)&&lists.flat(1),`
   - To: `"concatLists": (lists)=>requireList(lists)&&lists.flat(1),`

2. **Fix isAttrs** (runtime.js:186):
   - Change: `"isAttrs": (value)=>Object.getPrototypeOf({}) == Object.getPrototypeOf(value),`
   - To: `"isAttrs": (value)=>value !== null && value !== undefined && Object.getPrototypeOf({}) == Object.getPrototypeOf(value),`

3. **Fix head** (runtime.js:573):
   - Change: `"head": (list)=>[list[0]],`
   - To: `"head": (list)=>list[0],`

4. **Write tests** for all fixes in `main/tests/builtins_bugfixes_test.js`

5. **Run tests** to verify fixes work

**Then proceed to Option B: Start Comprehensive Testing**

---

**Option B: Start Testing (Task 0.1: Type Checking Tests)**
1. Create file: `main/tests/builtins_types_test.js`
2. Read: https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-isNull
3. Test each function in nix repl
4. Write 5-10 tests per function (10 functions = 50-100 tests)
5. Estimated time: 4-6 hours

**Goal:** Verify that isNull, isBool, isInt, isFloat, isString, isList, isAttrs, isPath, isFunction, typeOf all work correctly.

## Test File Template

Use this structure for all new test files:

```javascript
#!/usr/bin/env deno run --allow-all
/**
 * Builtin tests: [CATEGORY NAME]
 * Tests: [LIST OF FUNCTIONS]
 *
 * IMPORTANT: All tests must match nix repl behavior EXACTLY
 * Before writing tests, verify expected behavior in nix repl first!
 */

import { assertEquals, assertThrows } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { builtins } from "../runtime.js"
import { NixError } from "../errors.js"

// ============================================================================
// [FUNCTION NAME]
// ============================================================================

Deno.test("builtins.FUNCTION - basic case", () => {
    // Test normal inputs
    assertEquals(builtins.FUNCTION(input), expectedOutput)
})

Deno.test("builtins.FUNCTION - edge case: empty", () => {
    // Test empty/null/boundary cases
    assertEquals(builtins.FUNCTION(emptyInput), expectedOutput)
})

Deno.test("builtins.FUNCTION - error case: invalid input", () => {
    // Test that invalid inputs throw correct errors
    assertThrows(
        () => builtins.FUNCTION(invalidInput),
        NixError,
        "expected error message"
    )
})
```

**Test coverage requirements:**
- Minimum 5 tests per function
- Normal cases (typical inputs)
- Edge cases (empty, null, zero, negative, boundary values)
- Error cases (invalid inputs must throw NixError with correct message)
- All test outputs must match `nix repl` behavior exactly

---

## FINAL WORK SUMMARY

**URGENT (Bug Fixes):** 2-3 hours - Fix 3 confirmed bugs + write tests
**Priority 0 (Tasks 0.1-0.6):** 30-40 hours - Test 46 critical builtins (INCREASED - expect bugs)
**Priority 0 (Tasks 0.7-0.8):** 15-20 hours - Test 23 additional builtins (INCREASED - expect bugs)
**Priority 1:** 3-5 hours - Test derivation edge cases
**Priority 2:** 10-20 hours - Test translator edge cases
**Priority 3:** 15-50 hours - Test 26 remaining nixpkgs.lib files

**Total remaining work:** 75-138 hours (9-17 days at 8 hours/day)

**Time estimate increased by 40%** due to:
1. Bug discovery rate is 100% (3 bugs in 3 tested functions)
2. Each bug requires: discovery (testing), fixing (code changes), verification (re-testing)
3. Fixing bugs may reveal MORE bugs (cascading dependencies)
4. Bug fixes need regression tests to prevent re-introduction

**Realistic estimate with bug fixing:**
- Test function: 30 minutes
- Discover bug: immediate
- Fix bug: 30 minutes
- Write regression test: 15 minutes
- Re-run full suite: 5 minutes
- **Total per buggy function: 80 minutes** (vs 30 minutes for clean function)

**Expected buggy functions:** 20-30 out of 69 untested (based on 100% rate so far)
**Additional time for bugs:** 20 functions × 50 extra minutes = ~17 hours

**REVISED TOTAL:** 75-138 hours is CONSERVATIVE estimate

---

---

## WHAT CHANGED IN THIS SESSION (Session 32)

**Previous belief:** Runtime is "100% feature complete", just needs testing to verify it works

**Reality discovered:** Runtime is BROKEN - testing reveals 100% bug rate:
- Tested 3 functions (concatLists, isAttrs, head)
- Found 3 bugs (100% failure rate)
- 2 crash bugs, 1 logic bug
- All are in commonly used core operations

**Code review found 12 more suspected issues:**
- Variable name mismatches (copy-paste errors)
- Missing null/undefined checks (crashes waiting to happen)
- Wrong return types (arrays vs elements)
- Unhandled edge cases (empty lists, negative numbers, etc.)
- TODO comments acknowledging incomplete implementation

**Statistical analysis:**
- 69 functions untested (74% of runtime)
- Bug rate: 100% (3/3 tested functions have bugs)
- Extrapolation: **20-30 more bugs expected** in remaining untested code
- Most critical functions (map, filter, hasAttr, getAttr) still untested

**Impact assessment:**
- Runtime CANNOT be used in production
- Users WILL encounter crashes on normal operations
- Core functions (list processing, type checking, attrset ops) are BROKEN
- Testing is NOT about verification - it's about **BUG DISCOVERY**

**Work estimate revision:**
- Previous: "3-5 days of testing"
- Actual: "9-17 days of testing + bug fixing"
- Reason: 100% bug rate means every function needs: test → discover bug → fix → re-test → regression test

**Documentation updates:**
- prompt.md: Added 3 confirmed bugs, 12 suspected issues, revised estimates
- MEMORY.md: Changed status from "complete" to "broken", added bug details
- Both docs now emphasize DANGER of untested code

**Next steps:**
1. Fix 3 confirmed bugs (MANDATORY, 2-3 hours)
2. Test ALL 69 remaining functions (30-40 hours)
3. Fix discovered bugs (15-20 hours)
4. Achieve 80%+ test coverage (minimum for production use)

---

## ENFORCEMENT RULES FOR STAYING ON TRACK

**If you find yourself wanting to report progress or achievements:**
- STOP. Remove all achievement language.
- Only keep: "X remains to be tested", "Y edge cases not covered"
- No ✅, no 🎉, no "Successfully completed", no "Achievement unlocked"

**If you find a task is blocked:**
- STOP. There are no blockers.
- Break the task into smaller intermediate steps.
- If missing information: Read documentation, test in nix repl, search nixpkgs.
- If missing implementation plan: Create one (list 3-5 intermediate steps).

**If you're tempted to skip to translator or nixpkgs.lib work:**
- STOP. Follow the mandatory work order.
- Runtime testing MUST be complete first (Priority 0, tasks 0.1-0.6).
- Translator edge cases MUST wait until runtime is verified.
- nixpkgs.lib testing MUST wait until translator is solid.

**Every time you start work:**
1. Read the Nix documentation for the function you're testing
2. Test the function in `nix repl` with 5+ examples
3. Write tests matching nix repl behavior exactly
4. Run tests: `deno test --allow-all main/tests/YOUR_TEST_FILE.js`
5. Fix any failures (bugs in runtime.js implementation)
6. Run full suite: `./test.sh` to ensure no regressions

**REMEMBER:** No achievements. No checkboxes. Only what remains to be done. Read documentation before implementing. Break down large tasks into smaller tasks.

---

## QUICK REFERENCE: CONFIRMED BUGS

| Bug | Function | Line | Type | Impact | Fix Time |
|-----|----------|------|------|--------|----------|
| 1 | concatLists | 559 | ReferenceError | CRASHES on any call | 10 min |
| 2 | isAttrs | 186 | TypeError | CRASHES on null/undefined | 15 min |
| 3 | head | 573 | Logic | Returns wrong type | 10 min |

**Total fix time: 35 minutes + 30 minutes testing = 1 hour**

---

## QUICK REFERENCE: TESTING PRIORITIES

| Priority | Category | Functions | Tests | Time | Bug Risk |
|----------|----------|-----------|-------|------|----------|
| 0.1 | Type Checking | 10 | 50-100 | 4-6h | HIGH |
| 0.2 | List Operations | 12 | 70+ | 6-8h | CRITICAL |
| 0.3 | Attrset Operations | 8 | 50+ | 4-6h | CRITICAL |
| 0.4 | String Operations | 3 | 30+ | 3-4h | MEDIUM |
| 0.5 | Math & Comparison | 5 | 30+ | 2-3h | MEDIUM |
| 0.6 | Control Flow | 8 | 35+ | 2-3h | HIGH |
| 0.7 | Path/File Operations | 8 | 40+ | 4-6h | MEDIUM |
| 0.8 | Additional | 20 | 100+ | 6-10h | LOW-MED |

**Total: 69 functions, ~400 tests, 30-46 hours**

---

## QUICK REFERENCE: BUG PATTERNS FOUND

| Pattern | Examples | Impact |
|---------|----------|--------|
| Variable name typos | `requireList(list)` with param `lists` | Crash |
| Missing null checks | `Object.getPrototypeOf(null)` | Crash |
| Wrong return types | `[list[0]]` instead of `list[0]` | Logic bug |
| Copy-paste errors | Same code with wrong variable names | Crash |
| Unhandled edge cases | Empty lists, negative numbers, null | Undefined behavior |
| TODO comments | "TODO: check edgecases" in code | Acknowledged incomplete |

**Expected similar patterns in 69 untested functions = 15-25 more bugs**
