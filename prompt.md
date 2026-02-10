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

**Runtime Status:**
- 53/109 builtins have NO tests (48.6% untested)
- 8/10 derivation tests FAILING (store path hash bug)
- Network fetchers MAY have edge case bugs (insufficient test coverage)

**Translator Status:**
- Unknown edge cases not yet discovered
- No comprehensive testing against nixpkgs.lib files yet

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

## PRIORITY 1: Test Math & Bitwise Operations (3-4h)

**File to create:** `main/tests/builtins_math_bitwise_test.js`

**Problem:** 8 math/bitwise functions have ZERO test coverage.

**Untested functions (with line numbers in runtime.js):**
- `sub` (line ~xxx) - Subtraction
- `mul` (line ~xxx) - Multiplication
- `lessThan` (line ~xxx) - Numeric comparison
- `ceil` (line ~xxx) - Round up to integer
- `floor` (line ~xxx) - Round down to integer
- `bitAnd` (line ~xxx) - Bitwise AND
- `bitOr` (line ~xxx) - Bitwise OR
- `bitXor` (line ~xxx) - Bitwise XOR

**Before writing tests:**
1. Read: https://nix.dev/manual/nix/2.28/language/operators.html
2. Test each function in `nix repl`:
   ```nix
   nix-repl> builtins.sub 10 3
   nix-repl> builtins.mul 6 7
   nix-repl> builtins.lessThan 5 10
   nix-repl> builtins.ceil 3.7
   nix-repl> builtins.floor 3.7
   nix-repl> builtins.bitAnd 12 10
   nix-repl> builtins.bitOr 12 10
   nix-repl> builtins.bitXor 12 10
   ```

**Test requirements:**
- Minimum 5 tests per function (40+ tests total)
- Cover BigInt cases: `sub 10n 3n`
- Cover Float cases: `sub 10.5 3.2`
- Cover mixed cases: `sub 10n 3.2`
- Test edge cases: negative numbers, zero, identity operations
- Test type errors: `sub "string" 5` should throw

**Test file structure:**
```javascript
import { assertEquals, assertThrows } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { builtins } from "../runtime.js"

Deno.test("sub - BigInt subtraction", () => {
    assertEquals(builtins.sub(10n)(3n), 7n)
})

Deno.test("sub - Float subtraction", () => {
    assertEquals(builtins.sub(10.5)(3.2), 7.3)
})

// ... more tests
```

**Verification:**
```bash
deno test --allow-all main/tests/builtins_math_bitwise_test.js
```

---

## PRIORITY 2: Test Attrset Operations (2-3h)

**File to create:** `main/tests/builtins_attrset_ops_test.js`

**Problem:** 5 critical attrset functions have NO test coverage. These are heavily used in nixpkgs.lib.

**Untested functions:**
- `getAttr` (line ~xxx) - Get attribute by name string
- `attrNames` (line ~xxx) - List all attribute names
- `attrValues` (line ~xxx) - List all attribute values
- `catAttrs` (line ~xxx) - Extract named attr from list of sets
- `genericClosure` (line ~xxx) - Transitive closure computation

**Before writing tests:**
1. Read: https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-getAttr
2. Test in `nix repl`:
   ```nix
   nix-repl> builtins.getAttr "x" { x = 1; y = 2; }
   nix-repl> builtins.attrNames { a = 1; b = 2; c = 3; }
   nix-repl> builtins.attrValues { a = 1; b = 2; c = 3; }
   nix-repl> builtins.catAttrs "x" [ { x = 1; } { x = 2; } { y = 3; } ]
   nix-repl> builtins.genericClosure { startSet = [ { key = 1; } ]; operator = x: []; }
   ```

**Test requirements:**
- Minimum 10 tests per function (50+ tests total)
- Test normal cases
- Test missing attributes (should throw for getAttr)
- Test empty sets/lists
- Test nested structures
- Test genericClosure with real graph examples

---

## PRIORITY 3: Test String Operations (3-4h)

**File to create:** `main/tests/builtins_string_ops_test.js`

**Problem:** 7 string functions have NO test coverage.

**Untested functions:**
- `split` (line ~xxx) - Split string by regex
- `match` (line ~xxx) - Regex match with groups
- `concatStringsSep` (line ~xxx) - Join strings with separator
- `splitVersion` (line ~xxx) - Parse version string
- `baseNameOf` (line ~xxx) - Get filename from path
- `dirOf` (line ~xxx) - Get directory from path
- `toString` (line ~xxx) - Convert value to string

**Before writing tests:**
1. Read: https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-split
2. Test in `nix repl` - especially regex behavior
3. Note: Nix uses POSIX Extended Regular Expressions (not PCRE)

---

## PRIORITY 4: Test Path/File Operations (4-5h)

**File to create:** `main/tests/builtins_path_file_ops_test.js`

**Problem:** 8 file system functions have NO test coverage.

**Untested functions:**
- `pathExists` (line ~xxx) - Check if path exists
- `readFile` (line ~xxx) - Read file contents as string
- `readDir` (line ~xxx) - List directory contents
- `readFileType` (line ~xxx) - Get file type (regular/directory/symlink)
- `findFile` (line ~xxx) - Search for file in paths
- `toFile` (line ~xxx) - Write string to store
- `toPath` (line ~xxx) - Convert to path
- `baseNameOf` (line ~xxx) - Get filename (also in Priority 3)

**Setup required:**
Create test fixtures in `main/tests/fixtures/pathops_test/`:
- `regular_file.txt` - A regular file
- `empty_file.txt` - Empty file
- `subdir/nested.txt` - Nested file
- Create symlinks for testing

---

## PRIORITY 5: Implement Missing Builtins (AFTER testing above)

**Problem:** Some builtins may be incompletely implemented or have missing edge cases.

**What to do:**
1. Run all tests created in Priorities 1-4
2. If any tests fail, debug and fix the implementations
3. Check if any builtins throw `NotImplemented` errors
4. Verify implementations match Nix behavior exactly

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

## Summary of Remaining Work

**Immediate (MUST DO NOW):**
- Fix 2 derivation bugs (1-2 hours)

**High Priority (DO NEXT):**
- Test 8 math/bitwise functions (3-4 hours)
- Test 5 attrset functions (2-3 hours)
- Test 7 string functions (3-4 hours)
- Test 8 path/file functions (4-5 hours)

**Total time to 80% coverage:** ~15-20 hours

**Result after completion:** 84/109 builtins tested (77% coverage)

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
