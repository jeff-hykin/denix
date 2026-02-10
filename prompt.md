# Runtime Testing Priority

**Goal**: 47.7% → 80% test coverage (52/109 → 87/109 builtins tested)

## Rules

1. Test runtime builtins FIRST (do not work on translator or nixpkgs tests until 80%+ coverage)
2. Test in `nix repl` before writing code - document exact behavior
3. Read Nix 2.18 docs: https://nix.dev/manual/nix/2.18/language/builtins
4. Minimum 5 tests per function (normal + edge + error cases)
5. Fix bugs immediately when discovered

## Next 5 Test Files (20-29 hours)

### Task 2: List Operations (12 functions, 6-8h) ⚡ START HERE
**File**: `main/tests/builtins_lists_comprehensive_test.js` (EXISTS - has 72 tests)

Functions tested: map, filter, length, foldl, head, tail, concatMap, groupBy, etc.

**Status**: Review existing tests, add missing edge cases if needed, then move to Task 3.

---

### Task 3: Attrset Operations (7 functions, 4-6h) ⚡ CRITICAL
**File**: `main/tests/builtins_attrs_comprehensive_test.js` (DOES NOT EXIST)

Untested functions:
- `getAttr` (line 830) - Get attribute, error if missing
- `attrNames` (line 820) - Return sorted list of keys
- `attrValues` (line 825) - Return values in attrNames order
- `catAttrs` (line 838) - Extract attr from list of sets
- `genericClosure` (line 849) - Transitive closure with cycle handling
- `hasAttr` - Partially tested in hasattr_test.js
- `genAttrs` (line 843) - Generate attrset from list

Test in nix repl:
```bash
nix repl
> builtins.getAttr "x" {x=1; y=2;}          # 1
> builtins.attrNames {z=3; a=1; m=2;}       # ["a" "m" "z"] (sorted!)
> builtins.attrValues {z=3; a=1; m=2;}      # [1 2 3]
> builtins.catAttrs "x" [{x=1;} {x=2; y=3;}]  # [1 2]
```

**Run**: `./test.sh attrs`

---

### Task 4: String Operations (8 functions, 4-5h)
**File**: `main/tests/builtins_strings_comprehensive_test.js` (DOES NOT EXIST)

Untested functions: split, splitVersion, baseNameOf, dirOf, toString, match, concatStringsSep, replaceStrings

**Run**: `./test.sh strings`

---

### Task 5: Math & Bitwise (8 functions, 3-4h)
**File**: `main/tests/builtins_math_comprehensive_test.js` (DOES NOT EXIST)

Untested functions: sub, mul, lessThan, ceil, floor, bitAnd, bitOr, bitXor

**Run**: `./test.sh math`

---

### Task 6: Path/File Operations (10 functions, 4-6h)
**File**: `main/tests/builtins_paths_comprehensive_test.js` (DOES NOT EXIST)

Untested functions: pathExists, readFile, readDir, readFileType, findFile, toFile, storePath, storeDir, nixPath, placeholder

**Run**: `./test.sh paths`

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

## Test Runner

```bash
./test.sh              # Run all tests
./test.sh attrs        # Run specific task
./test.sh <pattern>    # Match test name
```

## Complete Untested List (57 functions)

**Type Checking (10)** - ✅ DONE (71 tests in builtins_type_checking_test.js)

**List Operations (12)** - ✅ DONE (72 tests in builtins_lists_comprehensive_test.js)

**Attrset Operations (7)** - ⚠️ Task 3
- getAttr, attrNames, attrValues, catAttrs, genericClosure, hasAttr, genAttrs

**String Operations (8)** - ⚠️ Task 4
- split, splitVersion, baseNameOf, dirOf, toString, match, concatStringsSep, replaceStrings

**Math & Bitwise (8)** - ⚠️ Task 5
- sub, mul, lessThan, ceil, floor, bitAnd, bitOr, bitXor

**Path/File Operations (10)** - ⚠️ Task 6
- pathExists, readFile, readDir, readFileType, findFile, toFile, storePath, storeDir, nixPath, placeholder

**Additional Untested (12)** - Lower priority
- compareVersions, parseDrvName, hashString, hashFile, toXML, fromJSON, toJSON, addErrorContext, unsafeGetAttrPos, unsafeDiscardStringContext, getContext, appendContext

---

## Current Status

- **Implemented**: 109/109 builtins (100%)
- **Tested**: 52/109 builtins (47.7%)
- **Target**: 87/109 builtins (80%)
- **Need**: 35 more tests

**Time to 80%**: 18-25 hours (Tasks 3-6)

---

## What NOT to Do

- Don't implement new features (runtime is complete)
- Don't refactor working code
- Don't work on translator or nixpkgs tests yet
- Don't report accomplishments (only what remains)
