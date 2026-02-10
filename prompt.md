# Denix Development Priorities

## CRITICAL RULES - READ FIRST

**Your job is to focus on what is NOT implemented and NOT working. Only report what remains to be done. Do not report accomplishments or add achievement markers (✅/🎉). You are a senior level developer - there is no such thing as a blocker. Break down large tasks into smaller tasks.**

**CURRENT WORK ORDER:**
1. **Runtime testing** - Test the 69 untested builtins (Priority 0 tasks 0.1-0.6) - THIS IS THE WORK
2. **AFTER testing complete:** nixpkgs.lib testing - Test 26 remaining library files (Priority 3)

**What's blocking progress:** 74% of runtime builtins are untested (69/97 functions). Runtime has code but no verification it works correctly.

## MANDATORY IMPLEMENTATION PROCESS

**BEFORE implementing ANY builtin or feature:**
1. Read official Nix documentation at https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-FUNCTION
2. Test behavior in `nix repl` with 5+ test cases (positive, negative, edge cases)
3. Search for real-world usage examples in nixpkgs
4. Write implementation matching Nix behavior EXACTLY
5. Write comprehensive tests (minimum 5 tests per function)

**npm packages:** Only allowed via `https://esm.sh/NPM_MODULE_NAME` (note: unreliable, may not work)

## Current State (2026-02-10)

**Test coverage: 26%** (28/97 builtins tested, 69 untested)

**What this means:** Runtime has code but NO VERIFICATION that it works correctly.

**All functions ARE implemented** - checked lines 175-650 in runtime.js. They exist and have code. Testing verifies:
1. Functions return correct values for normal inputs
2. Functions handle edge cases correctly (empty lists, null, negative numbers)
3. Functions throw correct errors for invalid inputs
4. Functions match Nix 2.18 behavior exactly (verify in nix repl first)

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

**BEFORE starting:**
1. Read: https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-map
2. Test in nix repl:
   ```nix
   nix-repl> builtins.map (x: x * 2) [1 2 3]
   [ 2 4 6 ]
   nix-repl> builtins.filter (x: x > 2) [1 2 3 4]
   [ 3 4 ]
   ```

**Required tests:** 5-10 tests per function (70+ total tests)
**File to create:** `main/tests/builtins_lists_test.js`

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

**BEFORE starting:**
1. Read: https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-hasAttr
2. Test in nix repl:
   ```nix
   nix-repl> builtins.hasAttr "x" {x = 1; y = 2;}
   true
   nix-repl> builtins.getAttr "x" {x = 1; y = 2;}
   1
   ```

**Required tests:** 5-10 tests per function (50+ total tests)
**File to create:** `main/tests/builtins_attrsets_test.js`

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

**MANDATORY reading before implementing:**
- Nix 2.18 builtins: https://nix.dev/manual/nix/2.18/language/builtins.html
- Search function documentation: https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-FUNCTION_NAME
- Noogle (search nixpkgs for examples): https://noogle.dev
- Test in nix repl before implementing!

**For network fetchers (when implementing):**
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

**Start with Task 0.1: Type Checking Tests**
1. Create file: `main/tests/builtins_types_test.js`
2. Read: https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-isNull
3. Test each function in nix repl
4. Write 5-10 tests per function (10 functions = 50-100 tests)
5. Estimated time: 4-6 hours

**Goal:** Verify that isNull, isBool, isInt, isFloat, isString, isList, isAttrs, isPath, isFunction, typeOf all work correctly.

---

## FINAL WORK SUMMARY

**Priority 0 (Tasks 0.1-0.6):** 22-32 hours - Test 46 critical builtins
**Priority 0 (Tasks 0.7-0.8):** 10-16 hours - Test 23 additional builtins
**Priority 1:** 2-4 hours - Test derivation edge cases
**Priority 2:** 8-16 hours - Test translator edge cases
**Priority 3:** 12-40 hours - Test 26 remaining nixpkgs.lib files

**Total remaining work:** 54-108 hours (7-14 days at 8 hours/day)

---

**REMEMBER:** No achievements. No checkboxes. Only what remains to be done.
