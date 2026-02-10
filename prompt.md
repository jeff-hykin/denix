# Denix Development Guide

## Primary Goal

**Test 57 untested runtime builtins to reach 80% test coverage.**

Current: 40/97 tested (41%) → Target: 77/97 tested (80%)

## Core Rules

1. **Focus on what's NOT done** - No achievement reporting
2. **Runtime testing FIRST** - Don't work on translator/nixpkgs until 80% coverage
3. **Research before coding** - Read Nix docs, test in nix repl, find examples
4. **Break tasks down** - No blockers exist

## Test Development Process

For each untested builtin:

1. **Read official docs**: https://nix.dev/manual/nix/2.18/language/builtins#builtins-FUNCTION
2. **Test in nix repl**: Try edge cases (null, empty, wrong types)
3. **Create test file**: `main/tests/builtins_CATEGORY_test.js`
4. **Write 5-10 tests**: Normal cases + edge cases + error handling
5. **Run**: `./test.sh CATEGORY`
6. **Fix bugs**: Untested code will have bugs
7. **Verify**: Match nix repl output exactly

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

### What's Working ✅
- Translator: 100% (87/87 tests passing)
- Runtime: 97/97 builtins implemented
- Import system: Full working
- Derivations: Basic working (12 tests passing)
- Fetchers: All working (fetchGit, fetchTarball, fetchurl, fetchTree)
- Infrastructure: fetcher.js, tar.js, nar_hash.js, store_manager.js

### What Needs Work ⚠️
- Testing: Only 40/97 builtins tested (41% coverage)
- Goal: 77/97 tested (80% coverage = 37 more tests needed)

### Known Fixed Issues
- ✅ concatLists - variable name typo fixed
- ✅ isAttrs - null check added
- ✅ head - returns element not array

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

## Next Immediate Action

**Create main/tests/builtins_types_test.js** (Task 1, 3-4 hours)

Test 9 type checking functions with 50+ test cases total.
