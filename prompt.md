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

**Test 57 untested runtime builtins to reach 80% test coverage.**

Current: 40/97 tested (41%) → Target: 77/97 tested (80%)

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

## Testing Priorities (57 untested builtins)

### Task 1: Type Checking (9 functions, 3-4 hours) - CRITICAL
**File**: `main/tests/builtins_types_test.js`

Functions: isNull, isBool, isInt, isFloat, isString, isList, isPath, isAttrs, typeOf

Why critical: Used everywhere, fundamental to Nix

Test cases:
- Basic types (null, true, 42n, 3.14, "str", [], {})
- Edge cases (null vs undefined, InterpolatedString vs string)
- Wrong types (pass int to isString, etc.)

Run: `./test.sh types`

### Task 2: List Operations (12 functions, 6-8 hours) - CRITICAL
**File**: `main/tests/builtins_lists_test.js`

Functions: map, filter, all, any, elem, elemAt, partition, sort, genList, concatLists, concatMap, groupBy

Why critical: Most used functions in Nix

Test cases:
- Empty lists []
- Single element [1]
- Normal operations [1, 2, 3]
- Nested [[1,2],[3,4]]
- Complex predicates
- Large lists (performance)

Special attention:
- map uses lazyMap proxy - test index access
- partition is lazy - test computed only once

Run: `./test.sh lists`

### Task 3: Attrset Operations (8 functions, 4-6 hours) - CRITICAL
**File**: `main/tests/builtins_attrs_test.js`

Functions: hasAttr, getAttr, attrNames, attrValues, catAttrs, genericClosure, zipAttrsWith, functionArgs

Why critical: Attrsets are THE core data structure

Test cases:
- Empty {}
- Nested {a: {b: {c: 1}}}
- Missing keys
- Special keys ("", "with-dashes", "123")
- genericClosure (complex, needs operator key/function)

Run: `./test.sh attrs`

### Task 4: String Operations (3 functions, 3-4 hours) - HIGH
**File**: `main/tests/builtins_strings_test.js`

Functions: split, match, concatStringsSep

Test cases:
- Empty strings ""
- Special chars "\n\t"
- Unicode
- Regex patterns (split uses POSIX ERE)
- Long strings

Run: `./test.sh strings`

### Task 5: Math & Comparison (5 functions, 2-3 hours) - MEDIUM
**File**: `main/tests/builtins_math_test.js`

Functions: sub, mul, lessThan, ceil, floor

Test cases:
- BigInt vs float handling
- Negative numbers
- Division by zero (lessThan doesn't divide but test edge cases)
- ceil/floor with negative floats

Run: `./test.sh math`

### Task 6: Path/File Operations (8 functions, 4-6 hours) - MEDIUM
**File**: `main/tests/builtins_paths_test.js`

Functions: baseNameOf, dirOf, pathExists, readFile, readDir, readFileType, findFile, toPath

Test cases:
- Absolute paths /Users/...
- Relative paths ./file
- Non-existent paths (pathExists should return false)
- Directories vs files
- Symlinks

Run: `./test.sh paths`

## After 80% Coverage (Tasks 7-10)

### Task 7: Hash Functions (4 functions, 2-3 hours)
hashString, hashFile (both already working via hashing.js)

### Task 8: Conversion Functions (3 functions, 2-3 hours)
fromJSON, toJSON, toXML (toJSON already tested)

### Task 9: Control Flow (3 functions, 2-3 hours)
abort, trace (both already working), addErrorContext

### Task 10: Derivation Edge Cases (6 hours)
Test derivation with multiple outputs, custom builders, etc.

## Time Estimates

- **Task 1-6 (to 80%)**: 22-31 hours
- **Task 7-9 (to 90%)**: 6-9 hours
- **Task 10 (derivation)**: 6 hours
- **Total to 90%**: 34-46 hours

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

## Current Project State

### What Needs Work ⚠️
- **Testing**: Only 40/97 builtins tested (41% coverage)
- **Goal**: 77/97 tested (80% coverage = 37 more tests needed)
- **Work remaining**: Tasks 1-6 below (22-31 hours to 80% coverage)

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

**Create main/tests/builtins_types_test.js** (Task 1, 3-4 hours)

BEFORE starting:
1. Read https://nix.dev/manual/nix/2.18/language/builtins#builtins-typeOf
2. Test each function in nix repl with edge cases
3. Document expected outputs

Then write 50+ test cases for 9 type checking functions.
