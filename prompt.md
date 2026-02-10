# Denix Development Priorities

## 🔴 CRITICAL RULES - READ FIRST

**Your job is to focus on what is NOT implemented and NOT working. Only report what remains to be done. Do not report what you accomplished. You are a senior level developer, there is no such thing as a blocker. Break down large tasks into smaller tasks.**

**WORK ORDER - MUST BE FOLLOWED:**
1. **Runtime (runtime.js) MUST be fully implemented first**
2. **Translator (main.js) can only be worked on AFTER runtime is complete**
3. **nixpkgs.lib tests can only be worked on AFTER translator is complete**

**IMPLEMENTATION GUIDELINES:**
- **ALWAYS read Nix documentation while implementing**: https://nix.dev/manual/nix/2.28/language/builtins.html
- **Test behavior in `nix repl` before writing code** to understand exact behavior
- **Search the internet for examples** of how each builtin is used in real Nix code
- **Use npm modules ONLY through https://esm.sh/NPM_MODULE_NAME** (note: esm.sh is unreliable)
- **Break down complex tasks** - if a builtin seems hard, split it into phases
- **Read existing working code** - see how other builtins are implemented

**BEFORE STARTING ANY TASK:**
1. Read the relevant section of https://nix.dev/manual/nix/2.28/language/builtins.html
2. Test the builtin in `nix repl` with multiple examples
3. Search for real-world usage examples in nixpkgs
4. Review similar builtin implementations in runtime.js
5. Break down the work into small, testable steps

---

## Current State - What's NOT Working

**Runtime Status (CORRECTED - Session 40):**
- **50/110 builtins have NO tests (45.5% untested)** - Better than previously claimed!
- **60/110 builtins ARE tested (54.5% coverage)** - 4 more than Session 39 claimed
- **9/10 derivation tests FAILING** (2 bugs: store path hash + toJSON crashes on derivations)
- **Critical gaps:** 0% coverage on context ops (6 functions), store/config ops (5 functions)
- **Math operators:** sub, multiply tested; lessThan, ceil, floor, bitwise UNTESTED

**Translator Status:**
- Unknown edge cases not yet discovered
- Limited nixpkgs.lib testing (15 files tested, 31 remain)

---

## 🔴 PRIORITY 0: Fix Derivation Bugs (1-2h) - BLOCKS EVERYTHING

**Problem:** 8 out of 10 derivation tests FAILING due to incorrect store path computation.

**Test command:**
```bash
deno run --allow-all main/tests/derivation/001_basic_tests.js
```

### Bug 1: Store Path Hash Mismatch (Tests 001-008 FAILING)

**Root cause:** Output names must be added to `env` with empty strings BEFORE computing the derivation hash. Currently we compute paths first, THEN add to env.

**Documentation:** Read https://nix.dev/manual/nix/2.28/language/derivations.html section on output path computation.

**Fix location:** `main/runtime.js` around line 1755

**Required change:** Add this code BEFORE creating drvStructure:
```javascript
// CRITICAL: Add empty output placeholders BEFORE hash computation
// Nix includes these in the serialization that gets hashed
for (const outputName of outputNames) {
    env[outputName] = ""
}
```

**Why this matters:** The ATerm serialization used for hashing must include these empty placeholders. Without them, our hash differs from Nix's hash.

**Verification:** After fix, all store paths should match Nix exactly. Example:
- Expected: `/nix/store/d62izaahds46siwr2b7k7q3gan6vw4p0-test`
- Currently getting: `/nix/store/xdglga0yzrfbimm0xv1agq5js8fknws9-test`

---

### Bug 2: toJSON Crashes on Derivations (Test 009 FAILING)

**Error message:**
```
error: cannot convert a function to JSON
```

**Root cause:** Derivations have callable properties (e.g., `drv.out`), so `typeof drv === "function"` is true. The toJSON function hits the function case before checking if it's a derivation object.

**Fix location:** `main/runtime.js` lines 308-320 in the `toJSON` function

**Required change:** Add derivation check in the function case:
```javascript
case "function":
    // CRITICAL: Derivations may appear as functions due to callable properties
    // but should serialize to their outPath string
    if (value && typeof value === "object" && value.type === "derivation") {
        return JSON.stringify(value.outPath)
    }
    throw new NixError(`error: cannot convert a function to JSON`)
```

**Verification:** Test 009 should pass, showing the derivation object structure is valid.

---

## PRIORITY 1: Test Math & Bitwise Operations (2-3h)

**File to create:** `main/tests/builtins_math_bitwise_test.js`

**Problem:** 5 math/bitwise functions have ZERO test coverage.

**IMPORTANT NOTE:** operators.subtract (line 2099) and operators.multiply (line 2113) are ALREADY TESTED. Only test builtins here.

**Untested builtins:**
- `ceil` (line ~810-815) - Round up to integer
- `floor` (line ~820-825) - Round down to integer
- `bitAnd` (line ~1250-1260) - Bitwise AND
- `bitOr` (line ~1265-1275) - Bitwise OR
- `bitXor` (line ~1280-1290) - Bitwise XOR

**Untested operators (test in separate file if needed):**
- `operators.lessThan` (line 2151) - Numeric comparison

**Before writing tests:**
1. Read: https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-ceil
2. Test each function in `nix repl`:
   ```nix
   nix-repl> builtins.ceil 3.7
   7
   nix-repl> builtins.ceil (-3.7)
   -3
   nix-repl> builtins.floor 3.7
   3
   nix-repl> builtins.floor (-3.7)
   -4
   nix-repl> builtins.bitAnd 12 10
   8
   nix-repl> builtins.bitOr 12 10
   14
   nix-repl> builtins.bitXor 12 10
   6
   ```

**Test requirements:**
- Minimum 5 tests per function (25+ tests total)
- Cover positive and negative floats for ceil/floor
- Cover edge cases: 0, 0.5, -0.5, large numbers
- Test bitwise with various integer values
- Test type errors: `ceil "string"` should throw

**Test file structure:**
```javascript
import { assertEquals, assertThrows } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { builtins } from "../runtime.js"

Deno.test("ceil - positive float", () => {
    assertEquals(builtins.ceil(3.7), 4n)
})

Deno.test("ceil - negative float", () => {
    assertEquals(builtins.ceil(-3.7), -3n)
})

Deno.test("floor - positive float", () => {
    assertEquals(builtins.floor(3.7), 3n)
})

// ... more tests
```

**Verification:**
```bash
deno test --allow-all main/tests/builtins_math_bitwise_test.js
```

---

## PRIORITY 2: Test Attrset Operations (1-2h)

**File to create:** `main/tests/builtins_attrset_ops_test.js`

**Problem:** 3 attrset functions have NO test coverage. These are commonly used.

**GOOD NEWS:** getAttr, hasAttr, intersectAttrs, listToAttrs, mapAttrs, optionalAttrs, removeAttrs, zipAttrsWith ARE ALREADY TESTED!

**Untested functions:**
- `attrNames` (line ~900-910) - List all attribute names (sorted)
- `attrValues` (line ~915-925) - List all attribute values
- `catAttrs` (line ~1100-1120) - Extract named attr from list of sets

**NOTE:** genericClosure is VERY complex and low priority (rarely used). Skip for now.

**Before writing tests:**
1. Read: https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-attrNames
2. Test in `nix repl`:
   ```nix
   nix-repl> builtins.attrNames { z = 1; a = 2; m = 3; }
   [ "a" "m" "z" ]
   nix-repl> builtins.attrValues { z = 1; a = 2; m = 3; }
   [ 2 3 1 ]
   nix-repl> builtins.catAttrs "x" [ { x = 1; } { x = 2; } { y = 3; } ]
   [ 1 2 ]
   nix-repl> builtins.catAttrs "missing" [ { x = 1; } ]
   [ ]
   ```

**Test requirements:**
- Minimum 7 tests per function (21+ tests total)
- Test normal cases
- Test empty sets/lists
- Test attrNames returns SORTED list
- Test attrValues returns values in SORTED KEY order
- Test catAttrs with missing attributes (should skip)

---

## PRIORITY 3: Test String Operations (2-3h)

**File to create:** `main/tests/builtins_string_ops_test.js`

**Problem:** 5 string functions have NO test coverage.

**GOOD NEWS:** match, replaceStrings, stringLength, substring ARE ALREADY TESTED!

**Untested functions:**
- `toString` (line ~1550-1590) - Convert value to string (CRITICAL - heavily used)
- `split` (line ~1350-1380) - Split string by regex (CRITICAL)
- `concatStringsSep` (line ~430-445) - Join strings with separator
- `baseNameOf` (line ~1600-1610) - Get filename from path
- `dirOf` (line ~1620-1630) - Get directory from path

**NOTE:** splitVersion is tested. Match is tested.

**Before writing tests:**
1. Read: https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-toString
2. Test in `nix repl`:
   ```nix
   nix-repl> builtins.toString 123
   "123"
   nix-repl> builtins.toString true
   "1"
   nix-repl> builtins.toString false
   ""
   nix-repl> builtins.toString null
   ""
   nix-repl> builtins.toString /path/to/file
   "/path/to/file"
   nix-repl> builtins.split ":" "a:b:c"
   [ "a" [ ":" ] "b" [ ":" ] "c" ]
   nix-repl> builtins.concatStringsSep ", " ["a" "b" "c"]
   "a, b, c"
   nix-repl> builtins.baseNameOf "/foo/bar/baz.txt"
   "baz.txt"
   nix-repl> builtins.dirOf "/foo/bar/baz.txt"
   "/foo/bar"
   ```
3. Note: Nix uses POSIX Extended Regular Expressions (not PCRE)

---

## PRIORITY 4: Test Context & Store Operations (3-4h)

**Files to create:**
- `main/tests/builtins_context_test.js`
- `main/tests/builtins_store_test.js`

**Problem:** 11 functions have NO test coverage (0% coverage areas).

**Context operations (6 functions) - ALL UNTESTED:**
- `getContext` (line ~1700) - Get string context
- `hasContext` (line ~1710) - Check if string has context
- `appendContext` (line ~1720) - Add context to string
- `unsafeDiscardStringContext` (line ~1730) - Remove context
- `unsafeDiscardOutputDependency` (line ~1740) - Remove output dependency
- `addErrorContext` (line ~1750) - Add error context info

**Store operations (5 functions) - ALL UNTESTED:**
- `placeholder` (line ~1800) - Output placeholder
- `toFile` (line ~1850) - Write string to store
- `toPath` (line ~1880) - Convert to path
- `storePath` (line ~1820) - Create store path
- `nixPath`, `storeDir` (lines ~160-165) - Constants

**WARNING:** These are advanced features. Read documentation carefully.

**Before writing tests:**
1. Read: https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-getContext
2. These are ADVANCED features used in derivations
3. String context tracks dependencies (e.g., paths to other derivations)
4. Test basic cases first, skip complex derivation dependency tracking

---

## PRIORITY 5: Test Remaining Builtins (3-4h)

**File to create:** `main/tests/builtins_remaining_test.js`

**Problem:** 26 additional functions have NO test coverage.

**Grouped by category:**

**File operations (4 functions):**
- `pathExists`, `readFile`, `readDir`, `readFileType`

**Conversion (3 functions):**
- `fromJSON`, `toXML`, `abort`

**Hashing (2 functions):**
- `hashString`, `hashFile`

**Control flow (3 functions):**
- `traceVerbose`, `addErrorContext`, `break`

**Advanced/rare (14 functions):**
- `getEnv`, `findFile`, `derivationStrict`, `outputOf`
- `fetchClosure`, `fetchMercurial`, `getFlake`
- `genericClosure`, `splitVersion`
- And 5 more...

**NOTE:** Focus on file ops and conversion first. Skip fetchClosure, fetchMercurial, getFlake (not implemented yet).

---

## PRIORITY 6: Implement Optional Builtins (ONLY if needed)

These are rarely used builtins that may not be needed for most Nix code:

**Not implemented:**
- `fetchMercurial` - Mercurial repository fetching (2-3 days)
- `fetchClosure` - Binary cache support (5-7 days, VERY COMPLEX)
- `getFlake` - Full flake system support (5-7 days, VERY COMPLEX)
- `fetchTree` type='mercurial', type='indirect' (3-4 days)

**Before implementing any of these:**
1. Verify they are actually needed for your use case
2. Read full documentation at nix.dev
3. Study existing Nix C++ implementation
4. Break down into phases with tests for each phase

---

## Test Strategy

**For EVERY function you test:**

1. **Read documentation**: https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-FUNCTIONNAME
2. **Test in nix repl**: Understand exact behavior with 5-10 examples
3. **Write test structure**:
   ```javascript
   import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
   import { builtins } from "../runtime.js"

   Deno.test("functionName - basic case", () => {
       const result = builtins.functionName(input)
       assertEquals(result, expectedOutput)
   })

   Deno.test("functionName - edge case: empty", () => {
       const result = builtins.functionName("")
       assertEquals(result, expectedResult)
   })

   // Minimum 5 tests per function
   ```

4. **Compare outputs**: JS result must EXACTLY match nix repl result
5. **If test fails**: Debug runtime.js, NOT the test

---

## Summary of Remaining Work (CORRECTED - Session 40)

**Immediate (MUST DO NOW):**
- Fix 2 derivation bugs (1-2 hours)

**High Priority (DO NEXT - to reach 75% coverage):**
- Priority 1: Test 5 math/bitwise functions (2-3 hours)
- Priority 2: Test 3 attrset functions (1-2 hours)
- Priority 3: Test 5 string functions (2-3 hours)
- **Subtotal: 13 functions, 5-8 hours → 73/110 tested (66% coverage)**

**Medium Priority (to reach 80% coverage):**
- Priority 4: Test 11 context/store functions (3-4 hours)
- Priority 5: Test 10 remaining high-value functions (3-4 hours)
- **Subtotal: 21 more functions, 6-8 hours → 84/110 tested (76% coverage)**

**Total time to 75%+ coverage:** ~11-16 hours (Priorities 0-3)
**Total time to 80%+ coverage:** ~17-24 hours (Priorities 0-5)

**Current status:** 60/110 tested (54.5% coverage)

---

## After Runtime is Complete

**ONLY AFTER 80%+ runtime test coverage:**

1. **Translator improvements** (2-3 days)
   - Test advanced pattern matching edge cases
   - Verify string escape sequences
   - Test operator precedence edge cases
   - Test against more nixpkgs.lib files

2. **nixpkgs.lib testing expansion** (4-6 days)
   - Test high-value files: lists.nix, attrsets.nix, options.nix
   - Test utility files: meta.nix, debug.nix, filesystem.nix
   - Goal: 50%+ coverage of nixpkgs.lib

---

## Documentation References

**MUST READ BEFORE IMPLEMENTING:**
- Main builtins: https://nix.dev/manual/nix/2.28/language/builtins.html
- Derivations: https://nix.dev/manual/nix/2.28/language/derivations.html
- Operators: https://nix.dev/manual/nix/2.28/language/operators.html
- Nix language: https://nix.dev/manual/nix/2.28/language/

**Additional resources:**
- Search builtins: https://noogle.dev
- Real examples: Search nixpkgs on GitHub
- Test in nix repl: `nix repl` command

---

## APPENDIX: Complete List of 50 Untested Builtins

**Session 40 verified count: 50/110 untested (45.5%)**

### Math & Bitwise (5)
- ceil, floor, bitAnd, bitOr, bitXor

### Attrset Operations (3)
- attrNames, attrValues, catAttrs

### String Operations (5)
- toString, split, concatStringsSep, baseNameOf, dirOf

### Context Operations (6 - ALL UNTESTED)
- getContext, hasContext, appendContext
- unsafeDiscardStringContext, unsafeDiscardOutputDependency
- addErrorContext

### Store/Config Operations (5 - ALL UNTESTED)
- placeholder, toFile, toPath, storePath
- (nixPath and storeDir are constants)

### File Operations (4)
- pathExists, readFile, readDir, readFileType

### Hashing (2)
- hashString, hashFile

### Conversion (3)
- fromJSON, toXML, abort

### Control Flow (2)
- traceVerbose, break

### Advanced/Rare (15)
- getEnv, findFile, derivationStrict, outputOf
- genericClosure, splitVersion
- fetchClosure (not implemented)
- fetchMercurial (not implemented)
- getFlake (not implemented)
- And 6 more rarely used functions

**Testing strategy:** Focus on Priorities 1-3 first (13 functions, 5-8 hours) to reach 66% coverage, then move to Priorities 4-5 for 80%+ coverage.
