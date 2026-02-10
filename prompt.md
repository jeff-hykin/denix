# Denix Development Guide

## 🚨 QUICK STATUS (Session 35 - ACCURATE COUNTS)

**Runtime Status:**
- ✅ 109 function builtins implemented (100% code complete)
- ✅ 40 builtins tested (37% coverage)
- ❌ **69 builtins UNTESTED** (63% - YOUR WORK)
- 🎯 **Target: 87 tested (80% = need 47 more)**
- ⏱️ **Estimated: 18-26 hours to 80%**

**What's NOT Working:**
- CRITICAL untested: `map`, `filter`, `all`, `any`, `getAttr`, `attrNames`, `attrValues`
- 63% of runtime has ZERO test coverage
- HIGH RISK: Core list/attrset operations completely untested

**What IS Working (SKIP THESE):**
- ✅ Translator: 87/87 tests passing (100%)
- ✅ Import system: Full functionality (5 test files)
- ✅ Derivations: 12/12 basic tests passing
- ✅ Type checking: All 10 functions tested

**Your ONLY Job:**
→ Create test files for 69 untested builtins (Tasks 2-10)
→ Start with Task 2: List operations (10 functions, 5-7 hours)
→ DO NOT work on translator, imports, or derivations (already done)

---

## CRITICAL RULES (ENFORCED)

**Your job is to focus on what is NOT implemented and NOT working. Only report what remains to be done. Do not report what you accomplished. You are a senior level developer, there is no such thing as a blocker. Break down large tasks into smaller tasks.**

**Before executing what is below, filter out any achievements. Only keep remaining/unsolved tasks. Add detail to each task if needed.**

### STRICT WORK ORDER (DO NOT VIOLATE):
1. **RUNTIME TESTING FIRST**: Test untested builtins (37% → 80% coverage)
2. **TRANSLATOR EDGE CASES**: Only after runtime is 80%+ tested
3. **NIXPKGS EXPANSION**: Only after translator is fully validated

**In other words: Finish testing runtime.js builtins before doing ANYTHING ELSE.**

### WHEN YOU FEEL "BLOCKED" (Senior Developer Mindset)

**There are NO blockers. Only tasks that need to be broken down.**

**Example: "I don't know how to implement fetchClosure"**
1. Read https://nix.dev/manual/nix/2.18/language/builtins#builtins-fetchClosure
2. Search "nix fetchClosure implementation" on GitHub
3. Test in nix repl: `nix repl> builtins.fetchClosure { fromStore = "..."; ... }`
4. Break down: a) Understand binary cache format, b) HTTP client, c) Validation, d) Store path
5. Research each sub-task independently
6. Implement smallest piece first

**Example: "The implementation is too complex"**
- That means: Break it into smaller functions
- Create helper functions for each logical step
- Test each helper independently
- Integrate step by step

**Example: "I'm not sure if this is the right approach"**
- That means: Test in nix repl and compare behavior
- Your implementation must match Nix exactly
- If unsure, read source code: https://github.com/NixOS/nix

**You are a SENIOR developer. Research, break down, solve. No task is too large to decompose.**

### MANDATORY IMPLEMENTATION PROCESS (NO EXCEPTIONS):

**YOU MUST FOLLOW THESE STEPS IN ORDER. NO SHORTCUTS.**

1. **Read official Nix documentation BEFORE starting**: https://nix.dev/manual/nix/2.18/language/builtins#builtins-FUNCTION_NAME
   - Read the ENTIRE entry for the builtin you're testing
   - Understand ALL parameters, types, return values
   - Note special behaviors and edge cases

2. **Test behavior in nix repl EXTENSIVELY** before writing ANY code:
   ```bash
   nix repl
   nix-repl> builtins.FUNCTION arg1 arg2
   ```
   - Test normal cases
   - Test edge cases (empty, null, wrong types)
   - Test error cases
   - DOCUMENT EXACT OUTPUTS

3. **Search for real-world examples**: https://noogle.dev
   - See how the builtin is actually used
   - Find edge cases you might have missed

4. **THEN AND ONLY THEN** write test code

5. **Compare your output** to nix repl output - they must match EXACTLY

6. **If unclear, read Nix source code**: https://github.com/NixOS/nix

**Implementations based on assumptions or memory WILL BE WRONG. Always verify against Nix behavior.**

### EXTERNAL DEPENDENCIES:
- **Prefer**: Deno standard library (https://deno.land/std/)
- **Allowed**: npm packages via `https://esm.sh/NPM_MODULE_NAME`
  - **WARNING**: esm.sh is UNRELIABLE - always have a fallback plan
  - If esm.sh fails, implement yourself or use Deno stdlib alternative
- **Forbidden**: Direct npm/jsr imports (will not work)

## Primary Goal (Architecture-Driven Priority)

**Test critical untested builtins first, then reach 80% coverage.**

### Current State (Verified 2026-02-10 Session 35)

**REMAINING WORK (FOCUS HERE):**
- **Runtime builtins testing**: CRITICALLY INCOMPLETE
  - Total: 109 function builtins (+ 8 constants = 117 total properties)
  - Tested: 40 distinct functions (37% coverage) ← TOO LOW
  - **Untested: 69 functions (63%)** ← YOUR PRIMARY TASK
  - **Target: 87 tested (80% = 47 more tests needed)**
  - **Estimated: 17-25 hours to reach 80%**

**Verification method (Session 35):**
- Counted exports in runtime.js: 117 total (109 functions + 8 constants)
- Analyzed ALL test files in main/tests/ for builtin usage
- Found 40 distinct tested builtins across all test files

**DO NOT MODIFY (ALREADY DONE):**
- Derivations (12/12 tests passing, basic functionality complete)
- Translator (87/87 tests passing, 100%)
- Import system (full functionality)

### Critical Gap Analysis

**Most-used functions are UNTESTED:**
- `map`, `filter` - Core list operations (used in every Nix file)
- `getAttr`, `attrNames`, `attrValues` - Core attrset access
- `all`, `any` - Predicates (used everywhere)

**This is the biggest risk in the codebase.**

### COMPLETE LIST: 69 Untested Builtins (YOUR WORK)

**Type Checking (0 untested - ALL DONE ✅):**
- ✅ All 10 type functions tested (isNull, isBool, isInt, isFloat, isString, isList, isPath, isAttrs, typeOf, isFunction)

**List Operations (6 untested):**
- ❌ map (CRITICAL - lazyMap proxy)
- ❌ filter (CRITICAL)
- ❌ all (CRITICAL)
- ❌ any (CRITICAL)
- ❌ elem (check membership)
- ❌ elemAt (index access)
- ❌ partition (lazy split)
- ❌ sort (with comparator)
- ❌ genList (generate from function)
- ❌ concatLists (flatten one level)

**Attrset Operations (6 untested):**
- ❌ getAttr (CRITICAL - core access)
- ❌ attrNames (CRITICAL - get keys)
- ❌ attrValues (CRITICAL - get values)
- ❌ catAttrs (extract attribute from list)
- ❌ genericClosure (transitive closure)
- ❌ getEnv (environment variables)
- ❌ hasAttr (tested via operators, may need direct test)

**String Operations (5 untested):**
- ❌ split (POSIX ERE regex)
- ❌ splitVersion (version string parsing)
- ❌ baseNameOf (filename from path)
- ❌ dirOf (directory from path)
- ❌ toXML (XML conversion)
- ❌ match (tested indirectly, may need comprehensive tests)
- ❌ concatStringsSep (tested in nixpkgs, may need direct tests)

**Math & Bitwise (8 untested):**
- ❌ sub (subtraction)
- ❌ mul (multiplication)
- ❌ ceil (round up)
- ❌ floor (round down)
- ❌ bitAnd (bitwise AND)
- ❌ bitOr (bitwise OR)
- ❌ bitXor (bitwise XOR)
- ❌ toString (type conversion)
- ❌ lessThan (tested via operators, may need direct test)

**Path/File Operations (11 untested):**
- ❌ pathExists (check path exists)
- ❌ readFile (read file contents)
- ❌ readDir (list directory)
- ❌ readFileType (file type detection)
- ❌ findFile (search in NIX_PATH)
- ❌ toFile (write to store)
- ❌ storePath (import to store)
- ❌ toPath (convert to path type)
- ❌ storeDir (get store directory)
- ❌ nixPath (get NIX_PATH)
- ❌ placeholder (derivation placeholder)

**Hashing & Context (9 untested):**
- ❌ hashFile (hash file contents)
- ❌ hashString (hash string)
- ❌ getContext (get string context)
- ❌ hasContext (check for context)
- ❌ appendContext (add context)
- ❌ unsafeDiscardStringContext (remove context)
- ❌ unsafeDiscardOutputDependency (remove dep)
- ❌ addErrorContext (error context)
- ❌ unsafeGetAttrPos (source position)

**Control Flow (4 untested):**
- ❌ abort (abort with message)
- ❌ traceVerbose (conditional trace)
- ❌ break (debugger breakpoint)
- ❌ addErrorContext (error handling)

**Conversion (2 untested):**
- ❌ fromJSON (parse JSON)
- ❌ toXML (already listed above)

**Advanced/Fetch (10 untested):**
- ❌ fetchMercurial (Mercurial repos - OPTIONAL)
- ❌ fetchClosure (binary cache - VERY COMPLEX, not in Nix 2.18)
- ❌ getFlake (flake system - VERY COMPLEX)
- ❌ outputOf (derivation output)
- ❌ derivationStrict (strict derivation)
- ❌ compareVersions (version comparison - may be tested)

**Derivation System (partially tested):**
- ⚠️ derivation (basic tests exist, edge cases untested)
- ❌ derivationStrict (no tests)
- ❌ placeholder (no tests)
- ❌ outputOf (no tests)

**Total: 69+ untested functions**

**NOTE**: Some functions like `compareVersions`, `concatStringsSep`, `match` may have indirect tests in nixpkgs test files but lack comprehensive direct testing in dedicated test files.

## Test Development Process (MANDATORY STEPS - NO EXCEPTIONS)

**For EVERY untested builtin, follow these steps IN ORDER:**

### Step 1: READ NIX DOCUMENTATION (REQUIRED)
**URL**: https://nix.dev/manual/nix/2.18/language/builtins#builtins-FUNCTION_NAME

**What to read:**
- Function signature (parameters, types)
- Return value type
- Behavior description
- ALL edge cases mentioned
- ANY special notes or warnings

**If docs are unclear:**
- Search "nix builtins.FUNCTION_NAME" on Google
- Read Nix source: https://github.com/NixOS/nix/tree/2.18-maintenance/src
- Check noogle.dev for examples

**DO NOT PROCEED TO STEP 2 WITHOUT READING DOCS.**

### Step 2: TEST IN NIX REPL (REQUIRED)
```bash
nix repl
nix-repl> builtins.FUNCTION_NAME arg1 arg2
```

**What to test:**
- Normal/happy path cases (3-5 examples)
- Edge cases: empty values, null, single elements
- Boundary cases: very large/small values
- Error cases: wrong types, invalid inputs
- Special cases mentioned in docs

**WRITE DOWN EXACT OUTPUTS** - you'll need them for tests.

**DO NOT PROCEED TO STEP 3 WITHOUT NIX REPL TESTING.**

### Step 3: SEARCH REAL-WORLD USAGE (RECOMMENDED)
- Visit https://noogle.dev
- Search for the builtin name
- Review example code
- Identify patterns you might have missed

### Step 4: CREATE TEST FILE
**Location**: `main/tests/builtins_CATEGORY_test.js`

**Requirements:**
- Use template from "Test File Template" section below
- Write 5-10 tests MINIMUM per function
- Cover: normal cases, edge cases, error cases
- Compare outputs to nix repl results from Step 2

### Step 5: RUN TESTS
```bash
./test.sh CATEGORY
```

### Step 6: FIX BUGS IF FOUND
**If output differs from nix repl:**
- Go back to runtime.js implementation
- Re-read Nix docs (Step 1)
- Check nix repl behavior again (Step 2)
- Fix implementation to match Nix exactly
- Re-run tests

### Step 7: VERIFY EXACT MATCH
**Your test output MUST match nix repl output exactly.**
- Same values
- Same types (BigInt vs number, string vs Path)
- Same error messages
- Same behavior on edge cases

---

**REMINDER: Steps 1 and 2 are NOT OPTIONAL. Implementations based on guessing WILL BE WRONG.**

## Testing Strategy: CRITICAL FUNCTIONS FIRST

### Phase 0: Pre-Testing Analysis ✅ COMPLETE
- ✅ Verified derivations work (12/12 tests passing)
- ✅ Verified translator complete (87/87 tests)
- ✅ Verified type checking complete (10/10 functions tested)
- ✅ Identified 69 untested builtins

### Priority Ranking (Architecture-Driven)

**CRITICAL (must test immediately):**
- List: map, filter, all, any (most-used operations)
- Attrset: getAttr, attrNames, attrValues (core access)

**HIGH (test next):**
- List: elem, elemAt, partition, sort, genList, concatLists
- Attrset: catAttrs, genericClosure, getEnv
- String: split, splitVersion, baseNameOf, dirOf

**MEDIUM (80% coverage):**
- Math: sub, mul, ceil, floor, bitAnd, bitOr, bitXor, toString
- Path/File: pathExists, readFile, readDir, readFileType, findFile, toFile, storePath

**LOW (nice to have):**
- Hashing, control flow, JSON, advanced features

## Testing Priorities (69 untested builtins)

### Task 1: Type Checking - SKIP (Already Done)
**ALL 10 type functions already tested. Do not work on these:**
- isNull, isBool, isInt, isFloat, isString, isList, isPath, isAttrs, typeOf, isFunction

### Task 2: List Operations (10 functions, 5-7 hours) - ⚡ CRITICAL START HERE

**File to create**: `main/tests/builtins_lists_comprehensive_test.js`

**Already tested (VERIFIED - skip these)**: concatMap, groupBy, head, tail, length, foldl'

**UNTESTED (10 functions) - YOUR WORK:**
1. **map** - CRITICAL (most used list function, uses lazyMap proxy)
2. **filter** - CRITICAL (second most used)
3. **all** - CRITICAL (list predicate - check all match)
4. **any** - CRITICAL (list predicate - check any match)
5. **elem** - Check element membership in list
6. **elemAt** - Index access (list[n])
7. **partition** - Split list by predicate (lazy evaluation)
8. **sort** - Sort with comparator function
9. **genList** - Generate list from function (f 0, f 1, ..., f (n-1))
10. **concatLists** - Flatten one level ([[a,b], [c,d]] → [a,b,c,d])

Test cases needed:
- Empty lists []
- Single element [1]
- Normal operations [1, 2, 3]
- Nested [[1,2],[3,4]]
- Complex predicates
- Large lists (performance)

Special attention:
- **map uses lazyMap proxy** - test index access, not just iteration
- **partition is lazy** - ensure computed only once

Run: `./test.sh lists`

### Task 3: Attrset Operations (6 functions, 3-5 hours) - ⚡ CRITICAL

**File to create**: `main/tests/builtins_attrs_comprehensive_test.js`

**Already tested (VERIFIED - skip these)**: functionArgs, genAttrs, intersectAttrs, listToAttrs, mapAttrs, optionalAttrs, removeAttrs, zipAttrsWith

**Note**: hasAttr tested via operators but may need direct comprehensive test

**UNTESTED (6 functions) - YOUR WORK:**
1. **getAttr** - CRITICAL (core attrset access: getAttr "key" {key = value;})
2. **attrNames** - CRITICAL (get list of keys: ["key1" "key2"])
3. **attrValues** - CRITICAL (get list of values: [val1 val2])
4. **catAttrs** - Extract named attribute from list of attrsets
5. **genericClosure** - Transitive closure computation (COMPLEX - operator + startSet)
6. **getEnv** - Environment variable access (getEnv "PATH")

Test cases needed:
- Empty {}
- Nested {a: {b: {c: 1}}}
- Missing keys (should throw)
- Special keys ("", "with-dashes", "123")
- genericClosure (needs operator key/function)

Run: `./test.sh attrs`

### Task 4: String Operations (5 functions, 3-4 hours) - HIGH

**File to create**: `main/tests/builtins_strings_comprehensive_test.js`

**Already tested (VERIFIED - skip these)**: concatMapStringsSep (nixpkgs), match (may need comprehensive test), replaceStrings, stringLength, substring

**UNTESTED (5 functions) - YOUR WORK:**
1. **split** - Split string by POSIX ERE regex (returns alternating non-match/match)
2. **splitVersion** - Split version string ("1.2.3" → ["1" "2" "3"])
3. **baseNameOf** - Get filename from path ("/path/to/file.txt" → "file.txt")
4. **dirOf** - Get directory from path ("/path/to/file.txt" → "/path/to")
5. **toXML** - Convert Nix value to XML string

Test cases needed:
- Empty strings ""
- Special chars "\n\t"
- Unicode
- Regex patterns (split uses POSIX ERE)
- Long strings
- Path operations (baseNameOf, dirOf)

Run: `./test.sh strings`

### Task 5: Math & Bitwise (8 functions, 3-4 hours) - MEDIUM

**File to create**: `main/tests/builtins_math_comprehensive_test.js`

**Already tested (VERIFIED - skip these)**: add (operators), div (operators/nixpkgs)

**Note**: lessThan tested via operators but may need direct comprehensive test

**UNTESTED (8 functions) - YOUR WORK:**
1. **sub** - Subtraction (builtins.sub a b)
2. **mul** - Multiplication (builtins.mul a b)
3. **ceil** - Round up float to int (ceil 1.5 → 2)
4. **floor** - Round down float to int (floor 1.5 → 1)
5. **bitAnd** - Bitwise AND on integers
6. **bitOr** - Bitwise OR on integers
7. **bitXor** - Bitwise XOR on integers
8. **toString** - Convert any value to string (handles ints, floats, bools, paths, etc.)

Test cases needed:
- BigInt vs float handling
- Negative numbers
- Division by zero edge cases
- ceil/floor with negative floats
- Bitwise operations on BigInts
- toString edge cases (bools, floats, paths, etc.)

Run: `./test.sh math`

### Task 6: Path/File Operations (11 functions, 4-6 hours) - MEDIUM

**File to create**: `main/tests/builtins_paths_comprehensive_test.js`

**Already tested (VERIFIED - skip these)**: path (comprehensive fetch test)

**UNTESTED (11 functions) - YOUR WORK:**
1. **pathExists** - Check if path exists (returns bool)
2. **readFile** - Read file contents as string
3. **readDir** - List directory contents (returns attrset: {name = "type";})
4. **readFileType** - Get file type ("regular", "directory", "symlink", "unknown")
5. **findFile** - Search for file in NIX_PATH/search path
6. **toFile** - Write string to store file (returns store path)
7. **storePath** - Import path to store (copy to /nix/store)
8. **toPath** - Convert string/path to path type
9. **storeDir** - Get store directory path (/nix/store)
10. **nixPath** - Get NIX_PATH as list of attrsets
11. **placeholder** - Get derivation output placeholder string

**Note**: baseNameOf and dirOf are path operations but listed in string operations (Task 4)

Test cases needed:
- Absolute paths /Users/...
- Relative paths ./file
- Non-existent paths (pathExists should return false)
- Directories vs files
- Symlinks
- Large files
- Binary files

Run: `./test.sh paths`

### Task 7: Hashing & Context (9 functions, 4-5 hours) - MEDIUM

**File to create**: `main/tests/builtins_hashing_context_test.js`

**Already tested (VERIFIED - skip these)**: None in this category

**UNTESTED (9 functions) - YOUR WORK:**
1. **hashFile** - Hash file contents (supports "md5", "sha1", "sha256", "sha512")
2. **hashString** - Hash string value (same hash types as hashFile)
3. **getContext** - Get string context (store paths, dependencies)
4. **hasContext** - Check if string has context (returns bool)
5. **appendContext** - Append context to string
6. **unsafeDiscardStringContext** - Remove all context from string
7. **unsafeDiscardOutputDependency** - Remove output dependency from context
8. **addErrorContext** - Add context message to error
9. **unsafeGetAttrPos** - Get source position of attribute (file/line/column)

Test cases needed:
- All hash types (md5, sha1, sha256, sha512)
- Empty strings/files
- Large files
- Binary files
- String context operations

Run: `./test.sh hashing`

### Task 8: Control Flow & Debug (3 functions, 1-2 hours) - LOW

**File to create**: `main/tests/builtins_control_comprehensive_test.js`

**Already tested (VERIFIED - skip these)**: throw, trace, tryEval, deepSeq, seq

**UNTESTED (3 functions) - YOUR WORK:**
1. **abort** - Abort evaluation with error message
2. **traceVerbose** - Conditional trace (only if verbose flag set)
3. **break** - Debugger breakpoint (if debugging enabled)

**Note**: addErrorContext moved to Task 7 (Hashing & Context)

Test cases needed:
- Error messages
- Stack traces
- Verbose flag behavior

Run: `./test.sh control`

### Task 9: JSON/Conversion (1 function, 30min-1 hour) - LOW

**File to create**: `main/tests/builtins_conversion_test.js`

**Already tested (VERIFIED - skip these)**: toJSON (comprehensive), fromTOML, parseDrvName

**UNTESTED (1 function) - YOUR WORK:**
1. **fromJSON** - Parse JSON string to Nix value

**Note**: toXML is in Task 4 (String Operations), not here

Test cases needed:
- Valid JSON
- Invalid JSON
- Nested structures
- Unicode

Run: `./test.sh json`

### Task 10: Advanced/Optional Features (6 functions, 4-6 hours) - OPTIONAL

**File to create**: `main/tests/builtins_advanced_test.js`

**Already tested (VERIFIED - skip these)**: fetchGit, fetchTarball, fetchTree, fetchurl, filterSource, parseFlakeRef, flakeRefToString

**UNTESTED (6 functions) - YOUR WORK (ALL OPTIONAL):**
1. **fetchMercurial** - Fetch from Mercurial repository (OPTIONAL - rarely used)
2. **fetchClosure** - Fetch from binary cache (VERY COMPLEX - not in Nix 2.18)
3. **getFlake** - Get flake (VERY COMPLEX - flakes experimental in 2.18)
4. **outputOf** - Get specific derivation output path
5. **derivationStrict** - Strict version of derivation builtin
6. **compareVersions** - Compare version strings (may be tested already)

**Note**: placeholder moved to Task 6 (Path/File), unsafeGetAttrPos moved to Task 7 (Hashing & Context)

Run: `./test.sh advanced`

## Work Summary: Path to 80% Coverage

### CORRECTED Total Work Remaining to 80% Coverage:
- **Tasks 2-6: 40 functions untested**
- **Estimated time: 20-29 hours**
- **Target: 87/109 tested (80% = need 47 more tests, accounting for overlaps)**

### Path to 80% Coverage (HIGH PRIORITY):
1. ⚡ Task 2: List operations (10 functions, 5-7 hours) - CRITICAL
2. ⚡ Task 3: Attrset operations (6 functions, 3-5 hours) - CRITICAL
3. Task 4: String operations (5 functions, 3-4 hours) - HIGH
4. Task 5: Math & bitwise (8 functions, 3-4 hours) - MEDIUM
5. Task 6: Path/file operations (11 functions, 4-6 hours) - MEDIUM

**Subtotal: 40 functions, 18-26 hours**

### After 80% Coverage (LOWER PRIORITY):
- Task 7: Hashing & Context (9 functions, 4-5 hours) → 85%
- Task 8: Control Flow (3 functions, 1-2 hours) → 88%
- Task 9: JSON/Conversion (1 function, 0.5-1 hour) → 89%
- Task 10: Advanced/Optional (6 functions, 4-6 hours) → 95%

**Subtotal: 19 functions, 9.5-14 hours**

## Time Estimates (CORRECTED Session 35)

- **Tasks 2-6 (to 80%)**: 18-26 hours (40 functions)
- **Tasks 7-9 (to ~90%)**: 5.5-8 hours (13 functions)
- **Task 10 (to ~95%)**: 4-6 hours (6 functions)
- **Total to 80%**: 18-26 hours ⚡ PRIMARY GOAL
- **Total to 90%**: 23.5-34 hours
- **Total to 95%**: 27.5-40 hours

**NOTE**: 100% coverage includes experimental/optional features (fetchMercurial, fetchClosure, getFlake) that are not in standard Nix 2.18 usage.

## Quick Reference: Test File Contents

This section provides quick copy-paste guidance for each test file.

### Task 2: builtins_lists_comprehensive_test.js
**Functions to test**: map, filter, all, any, elem, elemAt, partition, sort, genList, concatLists
**Key edge cases**:
- Empty lists `[]`
- Single element `[1]`
- map: Test lazyMap proxy (index access, iteration, length)
- partition: Test lazy evaluation (returns `{right: [], wrong: []}`)
- all/any: Empty list behavior (all [] → true, any [] → false)
**Minimum tests**: 50-60 total (5-6 per function)

### Task 3: builtins_attrs_comprehensive_test.js
**Functions to test**: getAttr, attrNames, attrValues, catAttrs, genericClosure, getEnv
**Key edge cases**:
- Empty attrsets `{}`
- Nested `{a: {b: {c: 1}}}`
- Missing keys (should throw)
- Special keys ("", "with-dashes", "123")
- genericClosure: Requires `operator` and `startSet`
**Minimum tests**: 30-40 total (5-7 per function)

### Task 4: builtins_strings_comprehensive_test.js
**Functions to test**: split, splitVersion, baseNameOf, dirOf, toXML
**Key edge cases**:
- Empty strings `""`
- Special chars `"\n\t"`
- Unicode strings
- split: POSIX ERE regex (alternating non-match/match)
- Paths: `/path/to/file.txt`
**Minimum tests**: 25-30 total (5-6 per function)

### Task 5: builtins_math_comprehensive_test.js
**Functions to test**: sub, mul, ceil, floor, bitAnd, bitOr, bitXor, toString
**Key edge cases**:
- BigInt vs float handling
- Negative numbers
- ceil/floor with negative floats
- Division by zero (if applicable)
- toString: All types (bool, int, float, path, list, attrset)
**Minimum tests**: 40-50 total (5-6 per function)

### Task 6: builtins_paths_comprehensive_test.js
**Functions to test**: pathExists, readFile, readDir, readFileType, findFile, toFile, storePath, toPath, storeDir, nixPath, placeholder
**Key edge cases**:
- Absolute paths `/Users/...`
- Relative paths `./file`
- Non-existent paths
- Directories vs files
- Symlinks
- readDir: Returns `{name = "type";}`
**Minimum tests**: 55-65 total (5-6 per function)

### Task 7: builtins_hashing_context_test.js
**Functions to test**: hashFile, hashString, getContext, hasContext, appendContext, unsafeDiscardStringContext, unsafeDiscardOutputDependency, addErrorContext, unsafeGetAttrPos
**Key edge cases**:
- All hash types: "md5", "sha1", "sha256", "sha512"
- Empty strings/files
- Context operations (store paths)
**Minimum tests**: 45-55 total (5-6 per function)

### Task 8: builtins_control_comprehensive_test.js
**Functions to test**: abort, traceVerbose, break
**Key edge cases**:
- Error messages
- Verbose flag behavior
**Minimum tests**: 15-20 total (5-7 per function)

### Task 9: builtins_conversion_test.js
**Functions to test**: fromJSON
**Key edge cases**:
- Valid JSON: `{"key": "value"}`
- Invalid JSON (should throw)
- Nested structures
- Unicode
**Minimum tests**: 10-15 total

### Task 10: builtins_advanced_test.js (OPTIONAL)
**Functions to test**: fetchMercurial, fetchClosure, getFlake, outputOf, derivationStrict, compareVersions
**Note**: These are optional/experimental features, low priority
**Minimum tests**: 30-40 total (5-7 per function)

---

## Test File Template

```javascript
import { assertEquals, assertThrows } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { builtins } from "../runtime.js"

Deno.test("builtins.FUNCTION - basic case", () => {
    assertEquals(builtins.FUNCTION(arg), expected)
})

Deno.test("builtins.FUNCTION - edge case", () => {
    assertEquals(builtins.FUNCTION(edgeArg), expectedEdge)
})

Deno.test("builtins.FUNCTION - error case", () => {
    assertThrows(() => builtins.FUNCTION(invalidArg))
})
```

## Current Project State (VERIFIED 2026-02-10)

### 🎯 What Needs Work (TOP PRIORITY)
- **Runtime Testing**: Only 40/109 builtins tested (37%)
- **Critical gap**: Most-used functions untested (map, filter, getAttr)
- **Goal**: 87/109 tested (80% = 47 more tests)
- **Work**: Tasks 2-6 (36 functions, 17-25 hours to 80%)

### Areas to SKIP (Already Done - DO NOT WORK ON THESE)
- **Translator** - 87/87 tests passing, no work needed
- **Import system** - 5 test files, all passing, no work needed
- **Derivations** - 12/12 tests passing, basic functionality complete
- **Type checking** - 10/10 functions tested, no work needed
- **Fetch infrastructure** - 5/8 functions tested, sufficient for now

### ⚠️ Derivation Edge Cases (LOW PRIORITY)
Derivations work for basic use cases. These edge cases are NOT blocking:
- Multiple outputs (outputs = ["out" "dev" "doc"]) - partially working
- Complex environment serialization - working for common cases
- Passthru/meta attributes - not critical for core functionality
- String context propagation - advanced feature

**Decision**: Skip derivation edge cases. Focus on untested builtins first.

## Project Structure

```
denix/
├── main.js                      # Translator (1,278 lines)
├── main/runtime.js              # Runtime (2,314 lines, 97 builtins)
├── main/tests/                  # 27 test files
├── tools/                       # Support (hashing, store_path, etc.)
├── test.sh                      # Test runner
└── README.md, ARCHITECTURE.md   # Documentation
```

## Test Runner Usage

```bash
./test.sh              # All tests
./test.sh types        # Type checking tests
./test.sh lists        # List operation tests
./test.sh attrs        # Attrset tests
./test.sh derivation   # Derivation tests
./test.sh import       # Import system tests
```

## External Dependencies

- Use Deno standard library (prefer this)
- Can use npm via https://esm.sh/NPM_MODULE_NAME (unreliable, have fallback)
- No npm/jsr direct imports allowed

## Documentation

- **Nix 2.18 builtins**: https://nix.dev/manual/nix/2.18/language/builtins
- **Examples**: https://noogle.dev
- **Test locally**: `nix repl`

## Common Mistakes to Avoid (LEARN THESE)

### ❌ WRONG: Reporting achievements
**Bad**: "I completed testing map!"
**Good**: "Remaining: 68 untested builtins. Next: filter (Task 2)"

### ❌ WRONG: Working on translator/nixpkgs before runtime
**Bad**: Starting nixpkgs tests when runtime is 37% tested
**Good**: Finish runtime testing (80%+) FIRST, then move on

### ❌ WRONG: Skipping documentation
**Bad**: "I'll test map based on what I know"
**Good**: "Reading https://nix.dev/manual/nix/2.18/language/builtins#builtins-map"

### ❌ WRONG: Not testing in nix repl
**Bad**: Writing tests without verifying Nix behavior
**Good**: Running 10+ test cases in nix repl, documenting outputs

### ❌ WRONG: Saying "blocked" or "can't do this"
**Bad**: "We're blocked on X"
**Good**: "X needs research. Sub-tasks: 1) Read Y, 2) Test Z, 3) Implement"

### ❌ WRONG: Large tasks without breakdown
**Bad**: "Test all list operations" (10 functions, 7 hours)
**Good**: "1. map (1h), 2. filter (1h), 3. all (30m), 4. any (30m), ..."

### ❌ WRONG: TODOs without implementation plans
**Bad**: "TODO: Implement fetchClosure"
**Good**: "fetchClosure: 1) Read docs, 2) Understand binary cache format, 3) Research Deno HTTP streaming, 4) Implement fetcher.js extension, 5) Test"

### ❌ WRONG: Guessing or assuming behavior
**Bad**: "I think map should return an array"
**Good**: "Tested in nix repl: builtins.map (x: x*2) [1 2 3] returns [2 4 6]"

## Self-Check Before Every Action (MANDATORY)

### WORK ORDER ENFORCEMENT:
- [ ] **Am I working on runtime testing?** (If NO, STOP - you're violating work order)
- [ ] **Is runtime 80%+ tested?** (If NO, don't touch translator/nixpkgs)
- [ ] **Am I avoiding completed areas?** (derivations, translator, imports are DONE)

### PRIORITY CHECK:
- [ ] **Am I testing critical functions first?** (map, filter, getAttr are HIGHEST priority)
- [ ] **Am I starting with Task 2?** (List operations, 10 functions)
- [ ] **Have I broken down the task?** (Each function is ~30-60min, not 5-7 hours)

### IMPLEMENTATION QUALITY:
- [ ] **Did I read Nix docs?** (https://nix.dev/manual/nix/2.18/language/builtins#builtins-FUNCTION)
- [ ] **Did I test in nix repl?** (Minimum 5-10 test cases documented)
- [ ] **Am I reporting remaining work?** (NOT "I completed X", but "68 functions remain")

### SIMPLICITY CHECK:
- [ ] **Am I adding complexity?** (If yes, simplify)
- [ ] **Does this file/function need to exist?** (If no, don't create it)
- [ ] **Am I over-engineering?** (If yes, use simpler approach)

**IF ANY CHECK FAILS, STOP AND CORRECT COURSE.**

## Next Immediate Action (START HERE)

**Task 2: Create `main/tests/builtins_lists_comprehensive_test.js`**

**Estimated time**: 5-7 hours (break into 1-hour chunks per function)

**CRITICAL PRIORITY**: Test the 4 most-used list operations FIRST:
1. map (1 hour)
2. filter (1 hour)
3. all (30 min)
4. any (30 min)

Then test remaining 6 functions:
5. elem (30 min)
6. elemAt (30 min)
7. partition (1 hour - lazy evaluation)
8. sort (45 min)
9. genList (45 min)
10. concatLists (45 min)

### MANDATORY STEPS (NO SHORTCUTS):

**Step 1: Read Nix 2.18 docs (15 minutes)**
- https://nix.dev/manual/nix/2.18/language/builtins#builtins-map
- https://nix.dev/manual/nix/2.18/language/builtins#builtins-filter
- https://nix.dev/manual/nix/2.18/language/builtins#builtins-all
- https://nix.dev/manual/nix/2.18/language/builtins#builtins-any
- (etc. for all 10 functions)

**Step 2: Test in nix repl (30 minutes)**
```bash
nix repl
nix-repl> builtins.map (x: x * 2) [1 2 3]
# Expected: [ 2 4 6 ]
nix-repl> builtins.map (x: x * 2) []
# Expected: [ ]
nix-repl> builtins.filter (x: x > 2) [1 2 3 4]
# Expected: [ 3 4 ]
nix-repl> builtins.all (x: x > 0) [1 2 3]
# Expected: true
nix-repl> builtins.all (x: x > 0) []
# Expected: true (empty list)
nix-repl> builtins.any (x: x > 5) [1 2 3]
# Expected: false
```

**Document ALL outputs** - you'll need exact values for assertions.

**Step 3: Create test file (4-6 hours)**
```javascript
import { assertEquals, assertThrows } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { builtins } from "../runtime.js"

Deno.test("builtins.map - basic case", () => {
    const result = builtins.map((x) => x * 2n)([1n, 2n, 3n])
    assertEquals([...result], [2n, 4n, 6n])
})

// 50+ more tests...
```

**Step 4: Run tests**
```bash
./test.sh lists
```

**Step 5: Fix bugs found** (if any)
- Go back to runtime.js
- Compare against nix repl behavior
- Fix implementation
- Re-run tests

### SPECIAL ATTENTION REQUIRED:

**map** - Uses lazyMap proxy, test:
- Array iteration: `[...result]`
- Index access: `result[0]`, `result[1]`
- Length property: `result.length`
- Nested maps: `map (x: map (y: y*2) x) [[1,2],[3,4]]`

**partition** - Lazy evaluation, test:
- Returns `{right: [...], wrong: [...]}`
- Both lists computed only once
- Empty list handling

**all/any** - Boolean predicates, test:
- Empty list edge cases (all [] → true, any [] → false)
- Short-circuit evaluation (not testable in JS but document expected)

### Required test coverage (MINIMUM):
- Empty lists: `[]`
- Single element: `[1]`
- Normal case: `[1, 2, 3]`
- Nested: `[[1,2], [3,4]]`
- Large lists: `[1..100]` (use genList)
- Error cases: wrong types, invalid predicates

**Target: 50-60 test cases total for all 10 functions**

---

## Progress Tracker: Path to 80% Coverage

**Current Status: 40/109 tested (37%)**

```
Progress to 80% (87 tested):
[████████████░░░░░░░░░░░░░░░░░░░] 40/87 (46%)

Need: 47 more tested builtins
```

### Task Completion Checklist

**Priority 0: Pre-Testing ✅ COMPLETE**
- [x] Verify derivation tests (12/12 passing)
- [x] Verify translator tests (87/87 passing)
- [x] Verify type checking tests (10/10 complete)
- [x] Count untested builtins (69 identified)

**Priority 1: CRITICAL Functions (16 functions = 40/109 → 56/109 = 51%)**
- [ ] Task 2.1: map (1 hour)
- [ ] Task 2.2: filter (1 hour)
- [ ] Task 2.3: all (30 min)
- [ ] Task 2.4: any (30 min)
- [ ] Task 3.1: getAttr (45 min)
- [ ] Task 3.2: attrNames (30 min)
- [ ] Task 3.3: attrValues (30 min)

**After completing above: 47/109 = 43% → Continue with remaining tasks**

**Priority 2: HIGH Functions (24 functions = 56/109 → 80/109 = 73%)**
- [ ] Task 2: Remaining list ops (6 functions, 3-4 hours)
- [ ] Task 3: Remaining attrset ops (3 functions, 2-3 hours)
- [ ] Task 4: String operations (5 functions, 3-4 hours)
- [ ] Task 5: Math & bitwise (8 functions, 3-4 hours)

**Priority 3: MEDIUM Functions (11 functions = 80/109 → 91/109 = 83%) - REACHES 80%!**
- [ ] Task 6: Path/file operations (11 functions, 4-6 hours)

**🎯 GOAL REACHED: 80% Coverage (87+ tested)**

**Priority 4: OPTIONAL Functions (after 80%)**
- [ ] Task 7: Hashing & Context (9 functions, 4-5 hours) → 85%
- [ ] Task 8: Control Flow (3 functions, 1-2 hours) → 88%
- [ ] Task 9: JSON/Conversion (1 function, 0.5-1 hour) → 89%
- [ ] Task 10: Advanced (6 functions, 4-6 hours) → 95%

### Time to Key Milestones

- **50% coverage** (55 tested): 8-12 hours (Priority 1 complete)
- **70% coverage** (76 tested): 15-20 hours (Priority 1-2 partial)
- **80% coverage** (87 tested): 18-26 hours (Priority 1-3 complete) ⭐ GOAL
- **90% coverage** (98 tested): 23-34 hours (Priority 1-4 + Task 7-9)
- **95% coverage** (104 tested): 27-40 hours (All tasks)

### What NOT to Work On (Already Complete)

- ❌ Translator improvements (87/87 tests, 100%)
- ❌ Import system (5 test files, all passing)
- ❌ Derivation edge cases (basic tests sufficient)
- ❌ Type checking (10/10 complete)
- ❌ Documentation updates (prompt.md and MEMORY.md accurate)
- ❌ Fetch infrastructure (5/8 tested, sufficient)

**Focus ONLY on testing the 69 untested builtins.**
