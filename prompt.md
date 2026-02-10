# Denix Development Guide

## CRITICAL RULES (Read This First!)

**Your job is to focus on what is NOT implemented and NOT working. Only report what remains to be done. Do not report what you accomplished. You are a senior level developer, there is no such thing as a blocker. Break down large tasks into smaller tasks.**

### STRICT WORK ORDER (DO NOT VIOLATE):
1. **RUNTIME FIRST**: Finish all runtime.js builtins testing (current priority)
2. **TRANSLATOR SECOND**: Only after runtime is 80%+ tested
3. **NIXPKGS TESTS LAST**: Only after translator is fully validated

### MANDATORY IMPLEMENTATION PROCESS:
1. **Read official Nix documentation WHILE implementing**: https://nix.dev/manual/nix/2.18/language/builtins
2. **Test behavior in nix repl** before and during implementation
3. **Compare your output** to nix repl output exactly
4. **Search for examples** on https://noogle.dev
5. **Read source code** if documentation is unclear

### EXTERNAL DEPENDENCIES:
- **Prefer**: Deno standard library (https://deno.land/std/)
- **Allowed**: npm packages via `https://esm.sh/NPM_MODULE_NAME` (unreliable, have fallback plan)
- **Forbidden**: Direct npm/jsr imports

## Primary Goal

**Test 63 untested runtime builtins to reach 80% test coverage.**

Current Status (verified via comprehensive analysis):
- **Total builtins: 109 functions** (excluding 8 constants like null, true, false, etc.)
- **Tested: 40 builtins (37% coverage)**
- **Untested: 69 builtins (63%)**
- **Target: 87 builtins tested (80% coverage = 47 more tests needed)**

## Test Development Process (FOLLOW THIS EXACTLY)

For each untested builtin:

1. **Read official docs FIRST**: https://nix.dev/manual/nix/2.18/language/builtins#builtins-FUNCTION
   - Understand all parameters, types, return values
   - Note any special behaviors or edge cases mentioned

2. **Test in nix repl EXTENSIVELY**:
   ```bash
   nix repl
   nix-repl> builtins.FUNCTION arg1 arg2
   ```
   - Try normal cases
   - Try edge cases (null, empty, wrong types)
   - Document exact outputs

3. **Search for examples**: https://noogle.dev (see real-world usage)

4. **Create test file**: `main/tests/builtins_CATEGORY_test.js`
   - Use template below
   - Write 5-10 tests minimum per function

5. **Run tests**: `./test.sh CATEGORY`

6. **Fix bugs found**: Compare test output to nix repl
   - If output differs, fix runtime.js implementation
   - Re-read Nix docs to understand correct behavior

7. **Verify exact match**: Your output must match nix repl exactly

**DO NOT SKIP STEP 1 AND 2!** Implementation based on assumptions will be wrong.

## Testing Priorities (69 untested builtins)

### Task 1: Type Checking (0 functions, 0 hours) - ✅ ALL TESTED
**File**: `main/tests/builtins_types_test.js`

✅ All type checking functions are ALREADY TESTED:
- isNull, isBool, isInt, isFloat, isString, isList, isPath, isAttrs, typeOf, isFunction

Status: COMPLETE - Move to Task 2

### Task 2: List Operations (10 functions, 5-7 hours) - CRITICAL
**File**: `main/tests/builtins_lists_test.js`

✅ Already tested: concatMap, groupBy, head, tail, length, foldl'

❌ UNTESTED (10 functions):
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

✅ Already tested: hasAttr (operator test), functionArgs, genAttrs, intersectAttrs, listToAttrs, mapAttrs, optionalAttrs, removeAttrs, zipAttrsWith

❌ UNTESTED (6 functions):
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

✅ Already tested: concatMapStringsSep, match, replaceStrings, stringLength, substring

❌ UNTESTED (5 functions):
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

✅ Already tested: add, div, lessThan (via operators)

❌ UNTESTED (8 functions):
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

✅ Already tested: path, toPath (likely), baseNameOf/dirOf covered in string tests

❌ UNTESTED (7 functions):
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

❌ UNTESTED (6 functions):
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

✅ Already tested: throw, trace, tryEval, deepSeq, seq

❌ UNTESTED (4 functions):
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

✅ Already tested: toJSON, fromTOML, parseDrvName

❌ UNTESTED (2 functions):
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

✅ Already tested: fetchGit, fetchTarball, fetchTree, fetchurl, filterSource, parseFlakeRef, flakeRefToString

❌ UNTESTED (8 functions):
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

## Current Project State (VERIFIED)

### What Needs Work ⚠️
- **Testing**: Only 40/109 builtins tested (37% coverage)
- **Goal**: 87/109 tested (80% coverage = 47 more tests needed)
- **Work remaining**: Tasks 2-6 (36 critical functions, 17-25 hours to 80%)

### What's Working ✅
- **Translator**: 87/87 tests passing (100%)
- **Import system**: Fully functional
- **Derivation system**: 12/12 basic tests passing
- **Fetch infrastructure**: 5/8 fetch functions tested (fetchGit, fetchTarball, fetchTree, fetchurl, filterSource)
- **Type checking**: All 10 type functions tested

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

## Common Mistakes to Avoid

1. **Reporting achievements**: "I completed X" → Just move to next task
2. **Working on translator before runtime tests**: Runtime must be 80%+ tested first
3. **Skipping documentation**: Always read https://nix.dev/manual/nix/2.18/language/builtins#builtins-FUNCTION
4. **Not testing in nix repl**: You must verify expected behavior first
5. **Saying "blocked"**: Break the task down into smaller steps
6. **Adding TODOs without plans**: If unsure how to implement, research and create sub-tasks

## Self-Check Questions (Ask Yourself)

- [ ] Am I working on runtime tests? (If no, why not? Runtime comes first!)
- [ ] Did I read the Nix docs for this function? (Required before coding)
- [ ] Did I test in nix repl? (Required before writing tests)
- [ ] Am I reporting what's NOT done? (Not what IS done)
- [ ] Did I break down any "blockers"? (No blockers exist)

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
