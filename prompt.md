# Denix Development Guide

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

### Current State (Verified 2026-02-10)

**REMAINING WORK (FOCUS HERE):**
- **Runtime builtins testing**: CRITICALLY INCOMPLETE
  - Total: 109 function builtins (+ 8 constants)
  - Tested: 40 (37% coverage) ← TOO LOW
  - **Untested: 69 (63%)** ← YOUR PRIMARY TASK
  - **Target: 87 tested (80% = 47 more tests needed)**
  - **Estimated: 17-25 hours to reach 80%**

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

### Task 2: List Operations (10 functions, 5-7 hours) - CRITICAL START HERE

**File to create**: `main/tests/builtins_lists_test.js`

**Already tested (DO NOT RE-TEST)**: concatMap, groupBy, head, tail, length, foldl'

**UNTESTED (10 functions) - YOUR WORK:**
- **map** - CRITICAL (most used list function, uses lazyMap proxy)
- **filter** - CRITICAL (second most used)
- **all** - CRITICAL (list predicate)
- **any** - CRITICAL (list predicate)
- elem - Check element membership
- elemAt - Index access
- partition - Split list by predicate (lazy evaluation)
- sort - Sort with comparator
- genList - Generate list from function
- concatLists - Flatten one level

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

### Task 3: Attrset Operations (6 functions, 3-5 hours) - CRITICAL
**File**: `main/tests/builtins_attrs_test.js`

Already tested (skip): hasAttr (operator test), functionArgs, genAttrs, intersectAttrs, listToAttrs, mapAttrs, optionalAttrs, removeAttrs, zipAttrsWith

UNTESTED (your work) (6 functions):
- **getAttr** - CRITICAL (core attrset access)
- **attrNames** - CRITICAL (keys list)
- **attrValues** - CRITICAL (values list)
- catAttrs - Extract attribute from list of attrsets
- genericClosure - Transitive closure computation (COMPLEX)
- getEnv - Environment variable access

Test cases needed:
- Empty {}
- Nested {a: {b: {c: 1}}}
- Missing keys (should throw)
- Special keys ("", "with-dashes", "123")
- genericClosure (needs operator key/function)

Run: `./test.sh attrs`

### Task 4: String Operations (5 functions, 3-4 hours) - HIGH
**File**: `main/tests/builtins_strings_test.js`

Already tested (skip): concatMapStringsSep, match, replaceStrings, stringLength, substring

UNTESTED (your work) (5 functions):
- split - Split string by regex (POSIX ERE)
- splitVersion - Split version string
- baseNameOf - Get filename from path
- dirOf - Get directory from path
- toXML - Convert to XML string

Test cases needed:
- Empty strings ""
- Special chars "\n\t"
- Unicode
- Regex patterns (split uses POSIX ERE)
- Long strings
- Path operations (baseNameOf, dirOf)

Run: `./test.sh strings`

### Task 5: Math & Bitwise (8 functions, 3-4 hours) - MEDIUM
**File**: `main/tests/builtins_math_test.js`

Already tested (skip): add, div, lessThan (via operators)

UNTESTED (your work) (8 functions):
- sub - Subtraction
- mul - Multiplication
- ceil - Round up
- floor - Round down
- bitAnd - Bitwise AND
- bitOr - Bitwise OR
- bitXor - Bitwise XOR
- toString - Convert to string

Test cases needed:
- BigInt vs float handling
- Negative numbers
- Division by zero edge cases
- ceil/floor with negative floats
- Bitwise operations on BigInts
- toString edge cases (bools, floats, paths, etc.)

Run: `./test.sh math`

### Task 6: Path/File Operations (7 functions, 3-5 hours) - MEDIUM
**File**: `main/tests/builtins_paths_test.js`

Already tested (skip): path, toPath (likely), baseNameOf/dirOf covered in string tests

UNTESTED (your work) (7 functions):
- pathExists - Check if path exists
- readFile - Read file contents
- readDir - List directory contents
- readFileType - Get file type (regular, directory, symlink, unknown)
- findFile - Search for file in search path
- toFile - Write string to store file
- storePath - Import path to store

Test cases needed:
- Absolute paths /Users/...
- Relative paths ./file
- Non-existent paths (pathExists should return false)
- Directories vs files
- Symlinks
- Large files
- Binary files

Run: `./test.sh paths`

### Task 7: Hashing & Context (6 functions, 3-4 hours) - MEDIUM
**File**: `main/tests/builtins_hashing_test.js`

UNTESTED (your work) (6 functions):
- hashFile - Hash file contents (MD5, SHA1, SHA256, SHA512)
- hashString - Hash string (MD5, SHA1, SHA256, SHA512)
- getContext - Get string context
- hasContext - Check if string has context
- appendContext - Append context to string
- unsafeDiscardStringContext - Remove context
- unsafeDiscardOutputDependency - Remove output dependency

Test cases needed:
- All hash types (md5, sha1, sha256, sha512)
- Empty strings/files
- Large files
- Binary files
- String context operations

Run: `./test.sh hashing`

### Task 8: Control Flow & Error (4 functions, 2-3 hours) - LOW
**File**: `main/tests/builtins_control_test.js`

Already tested (skip): throw, trace, tryEval, deepSeq, seq

UNTESTED (your work) (4 functions):
- abort - Abort evaluation with message
- addErrorContext - Add context to errors
- traceVerbose - Conditional trace

Test cases needed:
- Error messages
- Stack traces
- Verbose flag behavior

Run: `./test.sh control`

### Task 9: JSON/Conversion (2 functions, 1-2 hours) - LOW
**File**: `main/tests/builtins_json_test.js`

Already tested (skip): toJSON, fromTOML, parseDrvName

UNTESTED (your work) (2 functions):
- fromJSON - Parse JSON string
- toXML - Convert to XML (already in Task 4)

Test cases needed:
- Valid JSON
- Invalid JSON
- Nested structures
- Unicode

Run: `./test.sh json`

### Task 10: Advanced/Fetch (8 functions, 5-7 hours) - OPTIONAL
**File**: `main/tests/builtins_advanced_test.js`

Already tested (skip): fetchGit, fetchTarball, fetchTree, fetchurl, filterSource, parseFlakeRef, flakeRefToString

UNTESTED (your work) (8 functions):
- fetchClosure - Fetch from binary cache (VERY COMPLEX, not in Nix 2.18)
- fetchMercurial - Fetch Mercurial repo (OPTIONAL, rarely used)
- getFlake - Get flake (VERY COMPLEX, flakes experimental)
- placeholder - Derivation placeholder
- outputOf - Get derivation output
- unsafeGetAttrPos - Get attribute source position
- derivationStrict - Strict derivation

Run: `./test.sh advanced`

## After 80% Coverage Summary

### Total Work Remaining to 80% Coverage:
- **Tasks 2-6: 36 functions untested**
- **Estimated time: 17-25 hours**
- **Target: 87/109 tested (80%)**

### Path to 80%:
1. Task 2: List operations (10 functions, 5-7 hours) ⚡ CRITICAL
2. Task 3: Attrset operations (6 functions, 3-5 hours) ⚡ CRITICAL
3. Task 4: String operations (5 functions, 3-4 hours)
4. Task 5: Math & bitwise (8 functions, 3-4 hours)
5. Task 6: Path/file operations (7 functions, 3-5 hours)

### After 80% (Optional):
- Task 7: Hashing (6 functions, 3-4 hours) → 90%
- Task 8: Control flow (4 functions, 2-3 hours) → 92%
- Task 9: JSON (2 functions, 1-2 hours) → 93%
- Task 10: Advanced (8 functions, 5-7 hours) → 100%

## Time Estimates (UPDATED)

- **Tasks 2-6 (to 80%)**: 17-25 hours (36 functions)
- **Tasks 7-9 (to 90%)**: 6-9 hours (12 functions)
- **Task 10 (to 100%)**: 5-7 hours (8 functions)
- **Total to 80%**: 17-25 hours ⚡
- **Total to 90%**: 23-34 hours
- **Total to 100%**: 28-41 hours

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

## Next Immediate Action

**Start Task 2: Create main/tests/builtins_lists_test.js** (5-7 hours)

CRITICAL PRIORITY: Test the most-used list operations (map, filter, all, any)

BEFORE starting:
1. Read https://nix.dev/manual/nix/2.18/language/builtins#builtins-map
2. Read https://nix.dev/manual/nix/2.18/language/builtins#builtins-filter
3. Test in nix repl:
   ```
   nix repl
   nix-repl> builtins.map (x: x * 2) [1 2 3]
   nix-repl> builtins.filter (x: x > 2) [1 2 3 4]
   nix-repl> builtins.all (x: x > 0) [1 2 3]
   nix-repl> builtins.any (x: x > 5) [1 2 3]
   ```
4. Document expected outputs

SPECIAL ATTENTION:
- **map** uses lazyMap proxy - test index access (list[0], list[1])
- **partition** is lazy - ensure evaluated only once
- Test with empty lists, single elements, nested lists

Write 50+ test cases for 10 list functions.
