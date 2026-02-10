# CRITICAL RULES - READ FIRST

**Your job is to focus on what is NOT implemented and NOT working. Only report what remains to be done. Do not report what you accomplished. You are a senior level developer, there is no such thing as a blocker. Break down large tasks into smaller tasks.**

## WORK ORDER (MUST FOLLOW STRICTLY)

1. **Runtime (main/runtime.js)** - FINISH THIS FIRST
   - **ALL 109 builtin functions implemented** ✅ (code complete)
   - **Current test coverage: 42/109 (38.5%)** ❌ NOT ACCEPTABLE
   - **Target: 87/109 tested (80% minimum)** - 45 more functions need tests
   - **Critical untested: map, filter, getAttr, attrNames, toString** ⚠️ HIGH RISK
   - Fix all bugs discovered during testing
   - **DO NOT PROCEED** until runtime is stable and well-tested

2. **Translator (main.js)** - ONLY AFTER RUNTIME IS COMPLETE
   - Fix any edge cases in Nix → JS translation
   - Ensure all language features work correctly
   - **DO NOT WORK ON THIS** until runtime testing reaches 80%

3. **nixpkgs.lib Testing** - ONLY AFTER TRANSLATOR IS COMPLETE
   - Test against real nixpkgs.lib files
   - Validate against production Nix code
   - **DO NOT WORK ON THIS** until translator is fully verified

**CURRENT PRIORITY**: Runtime testing (38.5% → 80% = 45 functions, 24-32 hours)

## IMPLEMENTATION REQUIREMENTS

**ALWAYS read Nix documentation while implementing:**
- **Primary source:** https://nix.dev/manual/nix/2.18/language/builtins
- **Examples:** https://noogle.dev (search for function examples)
- **Verification:** Test in `nix repl` before writing JavaScript

**For missing/incomplete builtins:**
1. Read the official Nix documentation for that builtin
2. Test the builtin in `nix repl` to understand exact behavior
3. Search for examples on noogle.dev or GitHub nixpkgs
4. Write comprehensive tests BEFORE fixing implementation
5. Fix bugs, verify against `nix repl` output

**NPM modules are allowed:**
- Use https://esm.sh/NPM_MODULE_NAME format only
- Note: esm.sh is unreliable and may not work for all packages
- Prefer Deno standard library or native implementations when possible

**If you need to break down tasks:**
- Large tasks → smaller subtasks (no such thing as a blocker)
- Research phase → implementation phase → testing phase
- One function at a time if needed

---

# Runtime Testing Priority

**Current Status:** 42/109 tested (38.5%) - VERIFIED COUNT
**Target:** 87/109 tested (80%)
**Remaining Work:** 45 functions minimum, 24-32 hours

**CRITICAL DISCOVERY:**
- Actual builtin count is 109 functions (not 102)
- 67 functions are completely untested (61.5%)
- Type checking: 10 functions with ZERO tests
- Core operations (map, filter, getAttr): ZERO tests
- Fetch operations: 97 tests (well tested)
- Test distribution is highly uneven

---

## Next 6 Test Files to Create (VERIFIED ACCURATE)

| # | File | Functions | Time | Status |
|---|------|-----------|------|--------|
| 1 | `builtins_type_checking_test.js` | 10 | 3-4h | ❌ NOT CREATED |
| 2 | `builtins_lists_comprehensive_test.js` | 12 | 6-8h | ❌ NOT CREATED |
| 3 | `builtins_attrs_comprehensive_test.js` | 7 | 4-6h | ❌ NOT CREATED |
| 4 | `builtins_strings_comprehensive_test.js` | 8 | 4-5h | ❌ NOT CREATED |
| 5 | `builtins_math_comprehensive_test.js` | 8 | 3-4h | ❌ NOT CREATED |
| 6 | `builtins_paths_comprehensive_test.js` | 10 | 4-6h | ❌ NOT CREATED |

**Total:** 55 functions, 24-33 hours → **89% coverage (97/109)**

**Critical Untested Functions by Priority:**
- **Type checking (10)**: isNull, isBool, isInt, isFloat, isPath, isString, isList, isAttrs, isFunction, typeOf
- **List ops (12)**: map, filter, all, any, elem, elemAt, partition, sort, genList, concatLists, zipAttrsWith, foldl'
- **Attrset ops (7)**: getAttr, attrNames, attrValues, catAttrs, genericClosure, hasAttr, genAttrs
- **String ops (8)**: split, splitVersion, baseNameOf, dirOf, toString, match, concatStringsSep, replaceStrings
- **Math/bitwise (8)**: sub, mul, lessThan, ceil, floor, bitAnd, bitOr, bitXor
- **Path/file (10)**: pathExists, readFile, readDir, readFileType, findFile, toFile, storePath, storeDir, nixPath, placeholder

---

## Testing Process (MANDATORY STEPS)

**BEFORE writing ANY test, you MUST:**
1. Read the official Nix documentation for that builtin
2. Test the builtin in `nix repl` to understand its actual behavior
3. Document expected outputs in comments

### Step-by-Step Process

1. **Read Documentation** (https://nix.dev/manual/nix/2.18/language/builtins)
   ```
   Example: For builtins.isInt
   - Read what it does: "Return true if v is an int, false otherwise"
   - Check parameters: Takes one argument of any type
   - Note special cases: Integers vs floats
   ```

2. **Test in `nix repl` first**
   ```bash
   nix repl
   > builtins.isInt 42        # true
   > builtins.isInt 42.0      # false
   > builtins.isInt "42"      # false
   > builtins.isInt null      # false
   > builtins.typeOf 42       # "int"
   > builtins.typeOf 42.0     # "float"
   ```

3. **Search for examples** (https://noogle.dev)
   - Find real-world usage patterns
   - Identify edge cases used in nixpkgs
   - Document expected behavior

4. **Create test file** in `main/tests/`
   ```javascript
   import { assertEquals } from "jsr:@std/assert"
   import { builtins } from "../runtime.js"

   // Based on nix repl testing:
   // builtins.isInt 42 → true
   // builtins.isInt 42.0 → false
   Deno.test("isInt with integer", () => {
       assertEquals(builtins.isInt(42n), true)
   })

   Deno.test("isInt with float", () => {
       assertEquals(builtins.isInt(42.0), false)
   })
   ```

5. **Run tests**
   ```bash
   ./test.sh types     # Task 1
   ./test.sh lists     # Task 2
   ./test.sh attrs     # Task 3
   ./test.sh strings   # Task 4
   ./test.sh math      # Task 5
   ./test.sh paths     # Task 6
   ```

6. **Fix bugs** discovered in `main/runtime.js`
   - Compare test output vs `nix repl` output
   - Update implementation to match Nix behavior exactly
   - Re-run tests until passing

---

## Task Details

### Task 1: Type Checking (10 functions) - ZERO TESTS CURRENTLY
**Functions**: isNull, isBool, isInt, isFloat, isString, isList, isPath, isAttrs, isFunction, typeOf

**Current Status**: All 10 functions implemented in runtime.js lines 172-206, ZERO dedicated tests exist

**Test Requirements** (minimum 50 tests, 5 per function):
- `isNull`: Test null, 0, false, "", [], {}, undefined
- `isBool`: Test true, false, 1, "true", null
- `isInt`: Test 42n (BigInt), 42.0 (Float), "42" (String), true
- `isFloat`: Test 42.0, 42n, "42.0", NaN, Infinity
- `isString`: Test "", "foo", InterpolatedString, 42, null
- `isList`: Test [], [1,2,3], {}, null, "[]"
- `isPath`: Test Path object, "/foo", "./bar", "foo"
- `isAttrs`: Test {}, {a:1}, [], null, Object.create(null)
- `isFunction`: Test ()=>{}, builtins.map, 42, null
- `typeOf`: Test all types, return "bool"|"int"|"float"|"string"|"path"|"list"|"set"|"lambda"|"null"

**Edge Cases**:
- BigInt 42n vs Float 42.0 must return different types
- Empty list [] vs empty attrset {} must be distinguishable
- Path object vs string path "/foo" vs "./foo"
- InterpolatedString must be recognized as string type
- null must return "null", not cause errors

**Run**: `deno test --allow-all main/tests/builtins_type_checking_test.js`

---

### Task 2: List Operations (12 functions) - CRITICALLY UNTESTED
**Functions**: map, filter, all, any, elem, elemAt, partition, sort, genList, concatLists, zipAttrsWith, foldl'

**Current Status**:
- `map` uses lazyMap proxy (lines 499-547) - ZERO tests, HIGH RISK
- `filter` (line 548) - ZERO tests
- `foldl'` (line 615) - used in nixpkgs tests but not tested standalone
- All others ZERO tests

**Test Requirements** (minimum 70 tests, 5-7 per function):
- `map`: Test lazy evaluation, function application, empty list, nested lists
- `filter`: Test predicate function, empty list, all pass, none pass, edge cases
- `all`: Test empty list (true), all true, one false, predicate errors
- `any`: Test empty list (false), all false, one true, predicate errors
- `elem`: Test found, not found, null, types (1 vs 1n vs "1")
- `elemAt`: Test valid index, out of bounds, negative index, empty list
- `partition`: Test predicate function, empty list, all true, all false
- `sort`: Test comparator function, empty list, stability, equal elements
- `genList`: Test generator function, zero length, negative length, large lists
- `concatLists`: Test empty lists, nested lists, single list, many lists
- `zipAttrsWith`: Test merge function, empty lists, mismatched keys, duplicate keys
- `foldl'`: Test strict evaluation, accumulator, empty list, nested structures

**Critical Edge Cases**:
- `map`: Verify lazy evaluation with lazyMap proxy (line 527-545)
- `elemAt`: Out of bounds must throw error
- `sort`: Test stability with equal elements
- `genList`: Negative or zero length handling
- `foldl'`: Verify strict evaluation (not lazy like foldl)

**Run**: `deno test --allow-all main/tests/builtins_lists_comprehensive_test.js`

---

### Task 3: Attrset Operations (7 functions) - CORE OPERATIONS UNTESTED
**Functions**: getAttr, attrNames, attrValues, catAttrs, genericClosure, hasAttr, genAttrs

**Current Status**:
- `getAttr` (line 830) - ZERO tests, heavily used
- `attrNames` (line 820) - ZERO tests, must return SORTED list
- `attrValues` (line 825) - ZERO tests
- `hasAttr` - tested only in hasattr_test.js operator tests
- Others ZERO tests

**Test Requirements** (minimum 50 tests, 7-8 per function):
- `getAttr`: Test existing attr, missing attr (error), nested access, special chars
- `attrNames`: Test SORTED order, empty set, numeric keys, special chars
- `attrValues`: Test order matches attrNames, empty set, null values
- `catAttrs`: Test attr name, lists of attrsets, missing attrs, empty lists
- `genericClosure`: Test startSet, operator function, key, cycles, complex closures
- `hasAttr`: Test existing, missing, nested (use operator), prototype chain
- `genAttrs`: Test name list, value function, empty list, duplicate names

**Critical Edge Cases**:
- `attrNames`: MUST return sorted list (alphabetical order)
- `getAttr`: Missing attribute MUST throw error
- `genericClosure`: Handle cycles correctly, use 'key' for uniqueness
- `hasAttr`: Only own properties, not prototype chain

**Run**: `deno test --allow-all main/tests/builtins_attrs_comprehensive_test.js`

---

### Task 4: String Operations (8 functions) - HEAVILY USED, UNDERTESTED
**Functions**: split, splitVersion, baseNameOf, dirOf, toString, match, concatStringsSep, replaceStrings

**Current Status**:
- `split` (line 361) - ZERO tests, uses regex
- `splitVersion` (line 368) - ZERO tests
- `baseNameOf` (line 957) - ZERO tests
- `dirOf` (line 965) - ZERO tests
- `toString` (line 317) - ZERO tests, complex logic
- `match` - used in tests but not dedicated tests
- `concatStringsSep` (line 437) - 1 test only
- `replaceStrings` (line 451) - 1 test only

**Test Requirements** (minimum 50 tests, 6-8 per function):
- `split`: Test regex, capture groups, no captures, empty string, special chars
- `splitVersion`: Test version strings, dots, hyphens, non-version strings
- `baseNameOf`: Test "/foo/bar", "/", "foo", "./foo/bar.txt"
- `dirOf`: Test "/foo/bar", "/", "foo", "./foo/bar"
- `toString`: Test string, int, float, bool, null, list, attrset, path
- `match`: Test regex, capture groups, no match (null), global flag
- `concatStringsSep`: Test separator, empty list, single item, null handling
- `replaceStrings`: Test single replace, multiple, overlapping, no match

**Critical Edge Cases**:
- `split`: Regex capture groups create list elements
- `baseNameOf`: "/foo/" should return "foo", "/" should return ""
- `dirOf`: "/foo" should return "/", "foo" should return "."
- `toString`: Lists/attrsets have specific formatting rules
- `match`: Returns null on no match, list of captures on match

**Run**: `deno test --allow-all main/tests/builtins_strings_comprehensive_test.js`

---

### Task 5: Math & Bitwise (8 functions) - ZERO TESTS
**Functions**: sub, mul, lessThan, ceil, floor, bitAnd, bitOr, bitXor

**Current Status**:
- `sub` (line 222) - ZERO tests
- `mul` (line 230) - ZERO tests
- `lessThan` (line 211) - ZERO tests
- `ceil` (line 239) - ZERO tests
- `floor` (line 244) - ZERO tests
- `bitAnd` (line 249) - ZERO tests
- `bitOr` (line 257) - ZERO tests
- `bitXor` (line 265) - ZERO tests

**Test Requirements** (minimum 45 tests, 5-6 per function):
- `sub`: Test BigInt-BigInt, Float-Float, mixed types, negative results
- `mul`: Test BigInt*BigInt, Float*Float, mixed types, zero, negative
- `lessThan`: Test BigInt<BigInt, Float<Float, mixed types, equal values
- `ceil`: Test positive float, negative float, already int, edge cases
- `floor`: Test positive float, negative float, already int, edge cases
- `bitAnd`: Test positive, negative (two's complement), zero, all bits set
- `bitOr`: Test positive, negative, zero, identity operations
- `bitXor`: Test positive, negative, self-XOR=0, inverse operations

**Critical Edge Cases**:
- Mixed BigInt + Float operations (type coercion rules)
- Bitwise operations use two's complement for negative numbers
- `ceil(-1.5)` → -1n, `floor(-1.5)` → -2n
- Division by zero behavior (if tested)
- BigInt vs Number return types

**Run**: `deno test --allow-all main/tests/builtins_math_comprehensive_test.js`

---

### Task 6: Path/File Operations (10 functions) - ZERO TESTS
**Functions**: pathExists, readFile, readDir, readFileType, findFile, toFile, storePath, storeDir, nixPath, placeholder

**Current Status**:
- `pathExists` (line 1306) - ZERO tests
- `readFile` (line 1310) - ZERO tests
- `readDir` (line 1324) - ZERO tests
- `readFileType` (line 1341) - ZERO tests
- `findFile` (line 1350) - ZERO tests
- `toFile` (line 1432) - ZERO tests
- `storePath` (line 1459) - ZERO tests
- `storeDir` (line 1454) - ZERO tests
- `nixPath` (line 1463) - ZERO tests
- `placeholder` (line 1477) - ZERO tests

**Test Requirements** (minimum 55 tests, 5-6 per function):
- `pathExists`: Test existing file, missing file, directory, relative paths
- `readFile`: Test text file, binary file, missing file (error), encoding
- `readDir`: Test directory, empty dir, missing dir (error), file types
- `readFileType`: Test regular file, directory, symlink, missing (error)
- `findFile`: Test search paths, found file, not found (error), nested paths
- `toFile`: Test content writing, store path generation, conflicts
- `storePath`: Test path validation, store path format, error cases
- `storeDir`: Test returns "/nix/store" constant
- `nixPath`: Test NIX_PATH parsing, list of paths, empty
- `placeholder`: Test output name, store path placeholder format

**Critical Edge Cases**:
- `pathExists`: Don't throw on missing file, return false
- `readFile`: Throw error on missing file
- `readDir`: Return list of {name, type} attrsets, sorted by name
- `readFileType`: Return "regular"|"directory"|"symlink"|"unknown"
- `findFile`: Search through NIX_PATH-style list, throw if not found
- `toFile`: Store path must be deterministic (same content → same path)

**Run**: `deno test --allow-all main/tests/builtins_paths_comprehensive_test.js`

---

## Test File Status (25 files exist, 6 needed)

**Existing Test Files (25):**
1. ✅ `builtins_core_test.js` - 18 tests (groupBy, mapAttrs, trace, throw, etc.)
2. ✅ `builtins_fetchgit_test.js` - 12 tests
3. ✅ `builtins_fetchtarball_test.js` - 6 tests
4. ✅ `builtins_fetchtree_test.js` - 25 tests
5. ✅ `builtins_fetchurl_test.js` - 9 tests
6. ✅ `builtins_filtersource_test.js` - 7 tests
7. ✅ `builtins_path_test.js` - 18 tests
8. ✅ `builtins_tojson_path_test.js` - 27 tests
9. ✅ `translator_test.js` - 41 tests (Nix → JS translation)
10. ✅ `nixpkgs_trivial_test.js` - 20 tests
11. ✅ `nixpkgs_lib_files_test.js` - 14 file tests
12. ✅ `import_resolver_test.js` - 16 tests
13. ✅ `import_cache_test.js` - 12 tests
14. ✅ `import_loader_test.js` - 7 tests
15. ✅ `import_integration_test.js` - 11 tests
16. ✅ `import_e2e_test.js` - 6 tests
17. ✅ `fetcher_test.js` - support module tests
18. ✅ `tar_test.js` - support module tests
19. ✅ `nar_hash_test.js` - support module tests
20. ✅ `store_manager_test.js` - support module tests
21. ✅ `fromtoml_test.js` - 6 tests
22. ✅ `hasattr_test.js` - operator tests
23. ✅ `string_interpolation_test.js` - string tests
24. ✅ `path_interpolation_test.js` - path tests
25. ✅ `derivation/standalone_test.js` - 12 derivation tests

**Files That MUST Be Created (6):**
1. ❌ `builtins_type_checking_test.js` - 10 functions, 50+ tests
2. ❌ `builtins_lists_comprehensive_test.js` - 12 functions, 70+ tests
3. ❌ `builtins_attrs_comprehensive_test.js` - 7 functions, 50+ tests
4. ❌ `builtins_strings_comprehensive_test.js` - 8 functions, 50+ tests
5. ❌ `builtins_math_comprehensive_test.js` - 8 functions, 45+ tests
6. ❌ `builtins_paths_comprehensive_test.js` - 10 functions, 55+ tests

**Test Distribution Problem:**
- Fetch operations: 97 tests (20% of builtins, 40% of tests) ✅ OVER-TESTED
- Core operations: <30 tests (50% of builtins, 12% of tests) ❌ UNDER-TESTED
- Type checking: 0 tests (10 builtins, 0% of tests) ❌ ZERO COVERAGE

---

## References

- **Nix 2.18 Docs:** https://nix.dev/manual/nix/2.18/language/builtins
- **Search Examples:** https://noogle.dev
- **Test Runner:** `deno test --allow-all` or `./test.sh` (if it exists)

---

## COMPREHENSIVE UNTESTED BUILTINS LIST (67 FUNCTIONS)

**Session 38 Verification**: Deep analysis found 109 function builtins, 42 tested, **67 completely untested**

### Type Checking (10 functions) - 0% tested
1. `isNull` (runtime.js:172)
2. `isBool` (runtime.js:173)
3. `isInt` (runtime.js:174)
4. `isFloat` (runtime.js:175)
5. `isPath` (runtime.js:176)
6. `isString` (runtime.js:177)
7. `isList` (runtime.js:178)
8. `isAttrs` (runtime.js:179)
9. `isFunction` (runtime.js:180)
10. `typeOf` (runtime.js:181)

### List Operations (8 functions) - 0% tested
11. `map` (runtime.js:499-547) ⚠️ **HIGH RISK - uses lazyMap proxy**
12. `filter` (runtime.js:548)
13. `all` (runtime.js:590)
14. `any` (runtime.js:596)
15. `elem` (runtime.js:567)
16. `elemAt` (runtime.js:573)
17. `partition` (runtime.js:603)
18. `sort` (runtime.js:652)

### More List Operations (4 functions) - 0% tested
19. `genList` (runtime.js:685)
20. `concatLists` (runtime.js:559)
21. `zipAttrsWith` (runtime.js:679)
22. `foldl'` (runtime.js:615) - used in nixpkgs but not tested standalone

### Attrset Operations (5 functions) - 0% tested
23. `getAttr` (runtime.js:830) ⚠️ **CRITICAL - heavily used**
24. `attrNames` (runtime.js:820) ⚠️ **CRITICAL - must return sorted**
25. `attrValues` (runtime.js:825)
26. `catAttrs` (runtime.js:666)
27. `genericClosure` (runtime.js:691)

### More Attrset Operations (2 functions) - undertested
28. `hasAttr` - only operator tests, not builtin tests
29. `genAttrs` - 1 test only

### String Operations (6 functions) - 0% tested
30. `split` (runtime.js:361) - uses regex
31. `splitVersion` (runtime.js:368)
32. `baseNameOf` (runtime.js:957)
33. `dirOf` (runtime.js:965)
34. `toString` (runtime.js:317) ⚠️ **COMPLEX - many type branches**
35. `match` (runtime.js:354) - used but not tested

### More String Operations (2 functions) - undertested
36. `concatStringsSep` (runtime.js:437) - 1 test only
37. `replaceStrings` (runtime.js:451) - 1 test only

### Math & Comparison (4 functions) - 0% tested
38. `sub` (runtime.js:222)
39. `mul` (runtime.js:230)
40. `lessThan` (runtime.js:211)
41. `div` - tested in nixpkgs but not standalone

### Math Rounding (2 functions) - 0% tested
42. `ceil` (runtime.js:239)
43. `floor` (runtime.js:244)

### Bitwise Operations (3 functions) - 0% tested
44. `bitAnd` (runtime.js:249)
45. `bitOr` (runtime.js:257)
46. `bitXor` (runtime.js:265)

### Path/File Operations (10 functions) - 0% tested
47. `pathExists` (runtime.js:1306)
48. `readFile` (runtime.js:1310)
49. `readDir` (runtime.js:1324)
50. `readFileType` (runtime.js:1341)
51. `findFile` (runtime.js:1350)
52. `toFile` (runtime.js:1432)
53. `storePath` (runtime.js:1459)
54. `storeDir` (runtime.js:1454) - returns constant
55. `nixPath` (runtime.js:1463)
56. `placeholder` (runtime.js:1477)

### Hashing & Context (6 functions) - 0% tested
57. `hashString` (runtime.js:977)
58. `hashFile` (runtime.js:1011)
59. `appendContext` (runtime.js:407)
60. `getContext` (runtime.js:413)
61. `hasContext` (runtime.js:419)
62. `unsafeDiscardStringContext` (runtime.js:426)

### Control Flow & Evaluation (4 functions) - 0% tested
63. `abort` (runtime.js:1491)
64. `break` (runtime.js:1497)
65. `addErrorContext` (runtime.js:1502)
66. `getEnv` (runtime.js:1483)

### Advanced/Rarely Used (1 function) - 0% tested
67. `unsafeGetAttrPos` (runtime.js:1519)

---

## WHAT NOT TO DO (VIOLATIONS OF WORK ORDER)

❌ **DO NOT** work on nixpkgs.lib tests - runtime is only 40% tested
❌ **DO NOT** work on translator improvements - runtime testing must reach 80% first
❌ **DO NOT** skip reading Nix documentation - always verify behavior in `nix repl`
❌ **DO NOT** report achievements or completed work - only report remaining work
❌ **DO NOT** say there are "blockers" - break tasks down into smaller pieces
❌ **DO NOT** implement without testing - write tests first, then fix bugs
❌ **DO NOT** assume you know how a builtin works - always check official docs

## WHAT TO DO (FOLLOWING WORK ORDER)

✓ **DO** test the remaining 60 untested runtime builtins
✓ **DO** read https://nix.dev/manual/nix/2.18/language/builtins before implementing
✓ **DO** test each builtin in `nix repl` before writing JavaScript tests
✓ **DO** write 5-10 tests per builtin (including edge cases)
✓ **DO** fix bugs discovered during testing
✓ **DO** break down large tasks into 1-2 hour subtasks
✓ **DO** focus on what remains to be done (not what's complete)

---

## IMMEDIATE NEXT STEP

**START HERE:** Create `main/tests/builtins_type_checking_test.js` (3-4 hours)

This file DOES NOT EXIST yet. You must create it from scratch.

**Step 1**: Test each function in `nix repl` first (MANDATORY):
```bash
nix repl
> builtins.isInt 42         # true
> builtins.isInt 42.0       # false
> builtins.isInt "42"       # false
> builtins.isInt null       # false
> builtins.typeOf 42        # "int"
> builtins.typeOf 42.0      # "float"
> builtins.typeOf "foo"     # "string"
> builtins.typeOf []        # "list"
> builtins.typeOf {}        # "set"
> builtins.typeOf (x: x)    # "lambda"
> builtins.typeOf ./foo     # "path"
> builtins.typeOf true      # "bool"
> builtins.typeOf null      # "null"
```

**Step 2**: Create test file structure:
```javascript
#!/usr/bin/env deno run --allow-all
/**
 * Type checking builtin tests
 * Tests: isNull, isBool, isInt, isFloat, isString, isList, isPath, isAttrs, isFunction, typeOf
 *
 * All functions implemented in runtime.js lines 172-206
 * Current test coverage: 0/10 functions (ZERO tests exist)
 */

import { assertEquals } from "jsr:@std/assert"
import { builtins } from "../runtime.js"
import { Path, InterpolatedString } from "../runtime.js"

// ============================================================================
// isNull - Test null vs other falsy values
// ============================================================================

Deno.test("isNull - null returns true", () => {
    assertEquals(builtins.isNull(null), true)
})

Deno.test("isNull - undefined returns false", () => {
    assertEquals(builtins.isNull(undefined), false)
})

Deno.test("isNull - 0 returns false", () => {
    assertEquals(builtins.isNull(0), false)
    assertEquals(builtins.isNull(0n), false)
})

Deno.test("isNull - false returns false", () => {
    assertEquals(builtins.isNull(false), false)
})

Deno.test("isNull - empty string returns false", () => {
    assertEquals(builtins.isNull(""), false)
})

// ============================================================================
// isBool - Test true/false vs other types
// ============================================================================

Deno.test("isBool - true returns true", () => {
    assertEquals(builtins.isBool(true), true)
})

Deno.test("isBool - false returns true", () => {
    assertEquals(builtins.isBool(false), true)
})

Deno.test("isBool - 1 returns false", () => {
    assertEquals(builtins.isBool(1), false)
})

Deno.test("isBool - 'true' string returns false", () => {
    assertEquals(builtins.isBool("true"), false)
})

Deno.test("isBool - null returns false", () => {
    assertEquals(builtins.isBool(null), false)
})

// ============================================================================
// isInt - Test BigInt vs Float vs other types
// ============================================================================

Deno.test("isInt - BigInt returns true", () => {
    assertEquals(builtins.isInt(42n), true)
    assertEquals(builtins.isInt(-5n), true)
    assertEquals(builtins.isInt(0n), true)
})

Deno.test("isInt - Float returns false", () => {
    assertEquals(builtins.isInt(42.0), false)
    assertEquals(builtins.isInt(42.5), false)
})

Deno.test("isInt - String returns false", () => {
    assertEquals(builtins.isInt("42"), false)
})

Deno.test("isInt - Boolean returns false", () => {
    assertEquals(builtins.isInt(true), false)
})

Deno.test("isInt - null returns false", () => {
    assertEquals(builtins.isInt(null), false)
})

// ============================================================================
// isFloat - Test Float vs BigInt vs other types
// ============================================================================

Deno.test("isFloat - Float returns true", () => {
    assertEquals(builtins.isFloat(42.0), true)
    assertEquals(builtins.isFloat(42.5), true)
    assertEquals(builtins.isFloat(-3.14), true)
})

Deno.test("isFloat - BigInt returns false", () => {
    assertEquals(builtins.isFloat(42n), false)
})

Deno.test("isFloat - String returns false", () => {
    assertEquals(builtins.isFloat("42.0"), false)
})

Deno.test("isFloat - NaN returns true (is a number type)", () => {
    assertEquals(builtins.isFloat(NaN), true)
})

Deno.test("isFloat - Infinity returns true", () => {
    assertEquals(builtins.isFloat(Infinity), true)
    assertEquals(builtins.isFloat(-Infinity), true)
})

// Continue with isString, isList, isPath, isAttrs, isFunction, typeOf...
// Total: 50+ tests (5-6 per function)
```

**Step 3**: Run tests and fix bugs:
```bash
deno test --allow-all main/tests/builtins_type_checking_test.js
```

**Step 4**: Verify all 10 functions work correctly:
- isNull (5 tests minimum)
- isBool (5 tests minimum)
- isInt (5 tests minimum)
- isFloat (5 tests minimum)
- isString (6 tests - include InterpolatedString)
- isList (5 tests minimum)
- isPath (6 tests - include Path class)
- isAttrs (6 tests - test prototype chain)
- isFunction (5 tests minimum)
- typeOf (10 tests - all possible return values)

**Expected Time**: 3-4 hours (30 min research + 2-3 hours writing tests + 30 min fixing bugs)
