# Denix Development Priorities

## QUICK START - What To Do Now

**Priority 0 (2-3h):** Fix 2 derivation bugs in `main/runtime.js`
- Bug 1: Add empty output placeholders before line 1755
- Bug 2: Move derivation check before function check at line 306-320

**Priority 1 (12-16h):** Create 4 new test files for 28 untested builtins
- Create `builtins_math_test.js` - 8 functions (3-4h)
- Create `builtins_attrs_ops_test.js` - 5 functions (2-3h)
- Create `builtins_strings_ops_test.js` - 7 functions (3-4h)
- Create `builtins_paths_ops_test.js` - 8 functions (4-5h)

**Result:** 80%+ test coverage (56/109 → 87/109 builtins tested)

---

## CRITICAL INSTRUCTIONS - READ FIRST

**Your job is to focus on what is NOT implemented and NOT working. Only report what remains to be done. Do not report what you accomplished. You are a senior level developer, there is no such thing as a blocker. Break down large tasks into smaller tasks.**

**Before executing what is below, please filter out any achievements. Only keep remaining/unsolved tasks in this document. Add detail to each task if needed.**

### MANDATORY WORK ORDER - DO NOT DEVIATE

1. **FIRST: Finish Runtime** (network fetchers + store functions in runtime.js)
2. **SECOND: Finish Translator** (only after runtime is complete)
3. **THIRD: Test nixpkgs.lib files** (only after translator is complete)

**DO NOT work on translator until runtime is fully implemented.**
**DO NOT work on nixpkgs.lib tests until translator is fully implemented.**

### IMPLEMENTATION GUIDELINES

**Always Read Documentation While Implementing:**
1. **Before starting ANY builtin**, read official Nix documentation:
   - Primary: https://nix.dev/manual/nix/2.28/language/builtins.html
   - Search: Use web search for "nix builtins.FUNCTION_NAME" for examples
2. **Test in nix repl first** - Document exact Nix behavior before coding
3. **Compare outputs** - Your implementation must match Nix exactly
4. **Read existing code** - Check how similar builtins are implemented
5. **Test incrementally** - Write tests as you implement, not after

**NPM Modules:**
- You are allowed to use npm modules via https://esm.sh/NPM_MODULE_NAME
- WARNING: esm.sh is unreliable and doesn't always work
- Prefer Deno standard library when possible
- Always test esm.sh imports before relying on them

---

## Current State - What Remains

**Critical Runtime Issues:**
1. **Derivation bugs** (9/10 tests failing):
   - Store path hash computation incorrect
   - toJSON crashes on derivation objects with functions
2. **53/109 builtins untested** (48.6% no test coverage):
   - 28 high-priority builtins (Tasks 1-4) - need 12-16h testing
   - 25 lower-priority builtins - defer until 80% coverage reached

**What Works:**
- Translator: 87/87 tests passing ✅
- Import system: 49 tests passing ✅
- Type checking: 10/10 functions tested ✅
- List operations: 13/15 core functions tested ✅
- Attrset operations: Basic functions tested ✅

## Priority 0: Fix Derivation Store Paths (CRITICAL - 2-3h)

**Status:** 9/10 tests failing

**Test Command:** `deno test --allow-all main/tests/derivation/001_basic_tests.js`

**Failures:**
- Tests 001-008: Store path hashes don't match Nix (wrong hash computation)
- Test 009: JavaScript crashes with "cannot convert a function to JSON" error
- Test 010: PASSING (only passing test)

**Root Causes:**

1. **Hash Computation Bug (Tests 001-008)**: Output names must be added to `env` with empty strings BEFORE creating drvStructure
   - Current code at line 1762: Creates `env: { ...env }` without output placeholders
   - Nix behavior: Includes `env.out = ""` in the initial serialization
   - Fix: Add BEFORE line 1755 (before creating drvStructure):
     ```javascript
     // Add empty output placeholders to env BEFORE computing hash
     for (const outputName of outputNames) {
         env[outputName] = ""
     }
     ```

2. **JSON Serialization Bug (Test 009)**: `builtins.toJSON` crashes when trying to serialize derivation object
   - Error: "cannot convert a function to JSON" at runtime.js:309
   - Issue: Derivation return value includes functions (toString, Symbol.toPrimitive at lines 1810-1811)
   - Current code (line 318-320): Has special case for derivations BUT only checks `value.type === "derivation"`
   - Problem: The check happens AFTER the function check at line 308-309
   - Fix: Move derivation check BEFORE function check, or filter out function properties in object iteration

**Verification Steps:**
1. Fix hash computation bug → Tests 001-008 should pass
2. Fix JSON serialization bug → Test 009 should pass
3. All 10 tests should pass

**Documentation:**
- https://nix.dev/manual/nix/2.28/language/derivations
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-derivation
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-toJSON

---

## Priority 1: Test Untested Builtins (12-16h to 80%)

**Goal:** 56/109 tested → 87/109 tested (51% → 80% coverage)

**Need:** 31 more builtins tested

**DO NOT re-test these (already tested in existing files):**
- Type checking (10/10): isNull, isBool, isInt, isFloat, isPath, isString, isList, isAttrs, isFunction, typeOf
- Core operations (12): add, div, elem, length, head, tail, map, filter, all, any, foldl, foldr
- Attrset basics (5): hasAttr, mapAttrs, removeAttrs, listToAttrs, intersectAttrs
- String basics (4): substring, stringLength, replaceStrings, concatStrings
- Import/eval (2): import, scopedImport
- Fetch operations (6): fetchurl, fetchTarball, fetchGit, fetchTree, path, filterSource
- Derivations (2): derivation, derivationStrict

### Task 1: Math & Bitwise (8 functions, 3-4h) ⚡ START HERE

**File:** `main/tests/builtins_math_test.js` (DOES NOT EXIST - must create)

**Functions to test:**
1. `sub` (line 218 in runtime.js) - Subtraction for BigInt and Float
2. `mul` (line 232 in runtime.js) - Multiplication for BigInt and Float
3. `lessThan` (line 246 in runtime.js) - Comparison (<) for BigInt and Float
4. `ceil` (line 689 in runtime.js) - Round up float to int
5. `floor` (line 698 in runtime.js) - Round down float to int
6. `bitAnd` (line 707 in runtime.js) - Bitwise AND for BigInt
7. `bitOr` (line 712 in runtime.js) - Bitwise OR for BigInt
8. `bitXor` (line 717 in runtime.js) - Bitwise XOR for BigInt

**Test requirements per function (5-10 tests each):**
- Normal cases (positive numbers, negative numbers)
- BigInt vs Float handling
- Edge cases (zero, one, large numbers)
- Type checking (should throw on wrong types)
- Mixed type operations where applicable

**Documentation:**
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-sub
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-mul
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-lessThan
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-ceil
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-floor
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-bitAnd
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-bitOr
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-bitXor

**Validate behavior in nix repl:**
```bash
nix repl
> builtins.sub 10 3        # 7
> builtins.sub 10 3.5      # 6.5
> builtins.mul 5 6         # 30
> builtins.mul 2.5 4       # 10.0
> builtins.lessThan 5 10   # true
> builtins.lessThan 10 5   # false
> builtins.ceil 3.2        # 4
> builtins.ceil (-3.2)     # -3
> builtins.floor 3.8       # 3
> builtins.floor (-3.8)    # -4
> builtins.bitAnd 5 3      # 1
> builtins.bitOr 5 3       # 7
> builtins.bitXor 5 3      # 6
```

### Task 2: Attrset Operations (5 functions, 2-3h)

**File:** `main/tests/builtins_attrs_ops_test.js` (DOES NOT EXIST - must create)

**Functions to test:**
1. `getAttr` (line 806 in runtime.js) - Get attribute by name, throw if missing
2. `attrNames` (line 827 in runtime.js) - Get sorted list of attribute names
3. `attrValues` (line 832 in runtime.js) - Get values in attrNames order
4. `catAttrs` (line 837 in runtime.js) - Extract named attribute from list of sets
5. `genericClosure` (line 847 in runtime.js) - Compute transitive closure over startSet

**Test requirements:**
- `getAttr`: Normal access, nested attrs, missing key (should throw), non-attrset (should throw)
- `attrNames`: Empty set, single key, multiple keys (verify sorting), inherited attrs
- `attrValues`: Empty set, order matches attrNames, correct value extraction
- `catAttrs`: Empty list, missing attr in some items, all items have attr, non-attrset items
- `genericClosure`: Simple closure, complex graph, cycle detection, startSet validation

**Documentation:**
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-getAttr
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-attrNames
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-attrValues
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-catAttrs
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-genericClosure

**Validate in nix repl:**
```bash
nix repl
> builtins.getAttr "x" { x = 1; y = 2; }      # 1
> builtins.attrNames { c = 3; a = 1; b = 2; } # ["a" "b" "c"]
> builtins.attrValues { c = 3; a = 1; b = 2; } # [1 2 3]
> builtins.catAttrs "x" [{x=1;} {y=2;} {x=3;}] # [1 3]
> builtins.genericClosure {
    startSet = [{key = 1;}];
    operator = x: [{key = x.key + 1;}];
  }
```

### Task 3: String Operations (7 functions, 3-4h)

**File:** `main/tests/builtins_strings_ops_test.js` (DOES NOT EXIST - must create)

**Functions to test:**
1. `split` (line 400 in runtime.js) - Split string by regex, returns alternating list
2. `match` (line 376 in runtime.js) - Match regex and return capture groups
3. `concatStringsSep` (line 437 in runtime.js) - Join list with separator
4. `splitVersion` (line 2010 in runtime.js) - Split version string by dots/dashes
5. `baseNameOf` (line 1312 in runtime.js) - Extract filename from path
6. `dirOf` (line 1321 in runtime.js) - Extract directory from path
7. `toString` (line 261 in runtime.js) - Convert value to string

**Test requirements:**
- `split`: Simple split, regex patterns, empty matches, no matches, POSIX character classes
- `match`: Successful match with captures, no match (returns null), groups, POSIX regex
- `concatStringsSep`: Empty list, single item, multiple items, empty separator
- `splitVersion`: Simple versions (1.2.3), complex (1.2.3-alpha), edge cases
- `baseNameOf`: Absolute path, relative path, filename only, trailing slash
- `dirOf`: Absolute path, relative path, root directory, current directory
- `toString`: String, int, float, bool, null, path, attrset, list, derivation

**Documentation:**
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-split
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-match
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-concatStringsSep
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-splitVersion
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-baseNameOf
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-dirOf
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-toString

**Validate in nix repl:**
```bash
nix repl
> builtins.split "\\." "a.b.c"          # ["a" "" "b" "" "c"]
> builtins.match "(.*)@(.*)" "foo@bar"  # ["foo" "bar"]
> builtins.concatStringsSep "," ["a" "b" "c"] # "a,b,c"
> builtins.splitVersion "1.2.3-alpha"   # ["1" "2" "3" "alpha"]
> builtins.baseNameOf "/path/to/file.txt" # "file.txt"
> builtins.dirOf "/path/to/file.txt"    # "/path/to"
> builtins.toString 123                 # "123"
```

### Task 4: Path/File Operations (8 functions, 4-5h)

**File:** `main/tests/builtins_paths_ops_test.js` (DOES NOT EXIST - must create)

**Functions to test:**
1. `pathExists` (line 1297 in runtime.js) - Check if path exists on filesystem
2. `readFile` (line 1330 in runtime.js) - Read file contents as string
3. `readDir` (line 1344 in runtime.js) - Read directory, return attrset {name: type}
4. `readFileType` (line 1359 in runtime.js) - Get file type (regular/directory/symlink/unknown)
5. `findFile` (line 1394 in runtime.js) - Search for file in search paths
6. `toFile` (line 1525 in runtime.js) - Create file in store with given content
7. `toPath` (line 1537 in runtime.js) - Convert string to path type
8. `baseNameOf` (line 1312 in runtime.js) - Extract filename (also in Task 3)

**Test requirements:**
- `pathExists`: Existing file, non-existing, directory, relative path, absolute path
- `readFile`: Normal file, empty file, non-existing (should throw), binary content
- `readDir`: Normal directory, empty directory, non-directory (should throw), subdirectories
- `readFileType`: Regular file, directory, symlink, non-existing
- `findFile`: Found in first path, found in later path, not found, empty search paths
- `toFile`: Simple content, multiline content, special characters, verify store path format
- `toPath`: String to path, path to path, verify Path class instance

**Documentation:**
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-pathExists
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-readFile
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-readDir
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-readFileType
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-findFile
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-toFile
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-toPath

**Validate in nix repl:**
```bash
nix repl
> builtins.pathExists ./README.md         # true
> builtins.readFile ./README.md           # (file contents)
> builtins.readDir ./.                    # { "main" = "directory"; ... }
> builtins.readFileType ./README.md       # "regular"
> builtins.findFile [{ path = ./.; prefix = ""; }] "README.md" # ./README.md
> builtins.toFile "test.txt" "content"    # "/nix/store/...-test.txt"
> builtins.toPath "/some/path"            # /some/path
```

**Note:** These tests require actual filesystem access. Create test fixtures:
- `main/tests/fixtures/path_test_file.txt` - Test file with known content
- `main/tests/fixtures/path_test_dir/` - Test directory with known structure

### Remaining Untested Builtins (Lower Priority)

**After Tasks 1-4, remaining 25 untested builtins:**

**Store Functions (4 functions):**
- `storePath` (line 1484) - Validate/register store path
- `storeDir` (line 1489) - Get store directory ("/nix/store")
- `placeholder` (line 1494) - Get output placeholder for derivations
- `outputOf` (line 1499) - Get specific output of derivation

**String Context Functions (3 functions):**
- `getContext` (line 1506) - Get string context metadata
- `appendContext` (line 1511) - Add context to string
- `hasContext` (line 1520) - Check if string has context

**Advanced Operations (18 functions):**
- `abort` (line 1565) - Abort evaluation with message
- `tryEval` (line 1570) - Catch evaluation errors
- `seq` (line 1589) - Force evaluation (already tested in builtins_core_test.js)
- `deepSeq` (line 1594) - Force deep evaluation (already tested)
- `functionArgs` (line 1604) - Get function argument names (already tested)
- `addErrorContext` (line 1623) - Add error context
- `unsafeDiscardStringContext` (line 1628) - Strip string context
- `unsafeGetAttrPos` (line 1633) - Get attribute position
- `unsafeDiscardOutputDependency` (line 1638) - Strip output dependency
- `partition` (line 575) - Partition list by predicate
- `groupBy` (line 597) - Group list by key function
- `zipAttrsWith` (line 798) - Zip attrsets with function
- `intersectAttrs` (line 771) - Intersection of two attrsets
- `genAttrs` (line 817) - Generate attrset from list
- `fromTOML` (line 1418) - Parse TOML string
- `parseFlakeRef` (line 1975) - Parse flake reference
- `flakeRefToString` (line 1992) - Convert flake ref to string

**Note:** Many of these are already tested indirectly (seq, deepSeq, functionArgs). Focus on Tasks 1-4 first to reach 80% coverage.

---

## Test Runner Usage

```bash
# Run all tests
./test.sh

# Run specific groups
./test.sh derivation    # Derivation tests
./test.sh types         # Type checking tests
./test.sh lists         # List operations tests
./test.sh core          # Core builtins tests

# Run specific test file
deno test --allow-all main/tests/builtins_math_test.js
```

---

## Test File Template

```javascript
import { assertEquals, assertThrows } from "jsr:@std/assert";
import { builtins } from "../runtime.js";

Deno.test("functionName - normal case", () => {
    assertEquals(builtins.functionName(input), expected);
});

Deno.test("functionName - edge case", () => {
    assertEquals(builtins.functionName(edgeInput), edgeExpected);
});

Deno.test("functionName - error case", () => {
    assertThrows(
        () => builtins.functionName(badInput),
        Error,
        "expected error message"
    );
});
```

---

## Testing Best Practices

1. **Read Nix documentation FIRST** - https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-FUNCTION_NAME
2. **Test in nix repl SECOND** - Document exact Nix behavior before coding
3. **Write 5+ tests per function** - Normal + edge cases + errors
4. **Compare against Nix** - Run same code in nix repl to verify outputs match
5. **Test BigInt vs Float** - Many functions handle both types
6. **Fix bugs immediately** - Don't skip failing tests, fix them now

## Common Issues & Solutions

**Issue:** Test shows different BigInt behavior than Nix
- **Cause:** JavaScript BigInt (1n) vs Nix int (1) display differently
- **Solution:** Compare numeric values, not string representations

**Issue:** Function works in nix but throws in JS runtime
- **Cause:** Missing type validation or incorrect error messages
- **Solution:** Check Nix error messages in nix repl, match exactly

**Issue:** POSIX regex patterns don't work
- **Cause:** JavaScript doesn't support POSIX character classes like [[:space:]]
- **Solution:** Runtime has `posixToJsRegex` converter at line 127

**Issue:** Test output order doesn't match Nix
- **Cause:** Object property ordering or list sorting differences
- **Solution:** Sort results before comparing, or use deep equality checks

**Issue:** Derivation tests fail with "cannot convert function to JSON"
- **Cause:** Derivation objects contain toString and Symbol.toPrimitive functions
- **Solution:** This is the Priority 0 bug, fix toJSON function first

---

## What NOT to Do

- ❌ Don't refactor code unnecessarily
- ❌ Don't add features beyond what's documented in tasks
- ❌ Don't work on translator until runtime is complete
- ❌ Don't work on nixpkgs tests until translator is complete
- ❌ Don't split files or reorganize structure without explicit instruction

---

## Existing Test Files (27 files)

**Translator Tests:**
- `translator_test.js` - 87 tests, all Nix → JS translation

**Runtime Builtin Tests:**
- `builtins_type_checking_test.js` - 10 type functions ✅
- `builtins_core_test.js` - 12 core operations ✅
- `builtins_lists_comprehensive_test.js` - 13 list operations ✅
- `hasattr_test.js` - hasAttr function ✅
- `fromtoml_test.js` - fromTOML function ✅

**Fetch System Tests:**
- `builtins_fetchurl_test.js`, `builtins_fetchgit_test.js`, `builtins_fetchtarball_test.js`
- `builtins_fetchtree_test.js`, `builtins_path_test.js`, `builtins_filtersource_test.js`
- `fetcher_test.js`, `tar_test.js`, `nar_hash_test.js`, `store_manager_test.js`

**Import System Tests:**
- `import_resolver_test.js`, `import_cache_test.js`, `import_loader_test.js`
- `import_integration_test.js`, `import_e2e_test.js`

**Integration Tests:**
- `nixpkgs_trivial_test.js` - 20 functions from nixpkgs.lib.trivial
- `nixpkgs_lib_files_test.js` - 15 complete nixpkgs.lib files

**Other Tests:**
- `operators.js`, `string_interpolation_test.js`, `path_interpolation_test.js`
- `builtins_tojson_path_test.js`

**Derivation Tests (separate directory):**
- `main/tests/derivation/001_basic_tests.js` - 10 tests (1 passing, 9 failing)

---

## Test Files That NEED TO BE CREATED (Priority 1)

1. ❌ `main/tests/builtins_math_test.js` - Math & bitwise operations (8 functions)
2. ❌ `main/tests/builtins_attrs_ops_test.js` - Attrset operations (5 functions)
3. ❌ `main/tests/builtins_strings_ops_test.js` - String operations (7 functions)
4. ❌ `main/tests/builtins_paths_ops_test.js` - Path/file operations (8 functions)

---

## Reference Documentation Files

- **README.md** - User-facing overview
- **ARCHITECTURE.md** - Technical design details
- **MEMORY.md** - Session history and project memory
- **test.sh** - Test runner with categories
- **BUILTIN_COVERAGE.md** - Comprehensive test coverage analysis

---

## Key Files to Modify

- `main/runtime.js` - Builtin implementations (lines 164-2063)
- `main.js` - Nix → JS translator
- `main/tests/` - Test files directory (create new test files here)
- `tools/` - Utilities (hashing, store paths, etc.)

---

## Code Organization Notes

- 50 JavaScript files exist in the codebase
- Test organization handled via test.sh script
- Focus should be on execution (testing + bug fixes), not refactoring

---

## Immediate Next Steps - Detailed Action Plan

### Step 1: Fix Derivation Bugs (2-3h) - PRIORITY 0

**File to edit:** `main/runtime.js`

**Fix 1: Store path hash (line 1755)** - Add before creating drvStructure:
```javascript
// Add empty output placeholders to env BEFORE computing hash
for (const outputName of outputNames) {
    env[outputName] = ""
}
```

**Fix 2: toJSON function order (line 306-320)** - Move derivation check before function check:
```javascript
case "function":
    // Check if it's a derivation object before throwing
    if (typeof value === "object" && value?.type === "derivation") {
        return JSON.stringify(value.outPath)
    }
    throw new NixError(`error: cannot convert a function to JSON`)
```

**Verify:** Run `deno test --allow-all main/tests/derivation/001_basic_tests.js`
- Expected: 10/10 tests passing

### Step 2: Create Math Test File (3-4h) - TASK 1

**Action:** Create new file `main/tests/builtins_math_test.js`

**Process:**
1. Read Nix documentation for each of 8 functions
2. Test each function in `nix repl` to understand exact behavior
3. Write 5-10 tests per function (40-80 tests total)
4. Test BigInt and Float handling
5. Test edge cases (zero, negative, large numbers)
6. Run tests, fix any bugs discovered

**Functions:** sub, mul, lessThan, ceil, floor, bitAnd, bitOr, bitXor

### Step 3: Create Attrset Test File (2-3h) - TASK 2

**Action:** Create new file `main/tests/builtins_attrs_ops_test.js`

**Process:** Same as Step 2 (5-10 tests per function, 25-50 tests total)

**Functions:** getAttr, attrNames, attrValues, catAttrs, genericClosure

### Step 4: Create String Test File (3-4h) - TASK 3

**Action:** Create new file `main/tests/builtins_strings_ops_test.js`

**Process:** Same as Step 2 (5-10 tests per function, 35-70 tests total)

**Functions:** split, match, concatStringsSep, splitVersion, baseNameOf, dirOf, toString

### Step 5: Create Path Test File (4-5h) - TASK 4

**Action:**
1. Create test fixtures directory `main/tests/fixtures/`
2. Create test files and directories for testing
3. Create new file `main/tests/builtins_paths_ops_test.js`

**Process:** Same as Step 2 (5-10 tests per function, 40-80 tests total)

**Functions:** pathExists, readFile, readDir, readFileType, findFile, toFile, toPath, baseNameOf

---

**Total estimated time:** 14-19 hours
**Result:** 80%+ test coverage (87/109 builtins tested)
