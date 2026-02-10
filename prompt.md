# CRITICAL RULES - READ FIRST

**Your job**: Focus ONLY on what is NOT implemented and NOT working. Only report what remains to be done. Do NOT report accomplishments. You are a senior developer - there are NO blockers. Break down large tasks into smaller tasks.

**Before executing anything below**: Filter out achievements. Only keep remaining/unsolved tasks. Add detail to each task if needed.

## MANDATORY WORK ORDER

1. **Runtime builtins FIRST** - Do NOT work on translator until runtime is fully tested (80%+ coverage)
2. **Translator SECOND** - Do NOT work on nixpkgs tests until translator is complete
3. **Network fetchers & store functions** - Finish these in runtime.js before ANYTHING ELSE

**If a plan is missing**: Figure out intermediate steps and make them Priority 0.

## Implementation Guidelines

- **Always read Nix documentation while implementing**: https://nix.dev/manual/nix/2.18/language/builtins.html
- **Test behavior in `nix repl` BEFORE writing code** - document exact outputs
- **Search the internet for documentation** - especially for complex builtins like fetchClosure, getFlake
- **NPM modules allowed ONLY via https://esm.sh/NPM_MODULE_NAME** (unreliable, use sparingly)
- **Minimum 5 tests per function**: normal cases + edge cases + error cases
- **Fix bugs immediately when discovered**

---

# Runtime Testing Priority

**Goal**: 47.7% → 80% test coverage (52/109 → 87/109 builtins tested)

## Remaining Work

### Priority 0: Verify Network Fetchers & Store Functions (1-2h)

**CRITICAL**: These must be complete before other work. Verify:
- `builtins.fetchTarball` - Working? Tests passing?
- `builtins.fetchGit` - Working? Tests passing?
- `builtins.fetchurl` - Working? Tests passing?
- `builtins.fetchTree` - Working? Tests passing?
- Store path functions - Working? Tests passing?

**If ANY are incomplete**:
1. Read https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-fetch*
2. Search for Nix documentation/examples online
3. Implement missing functionality FIRST
4. Do NOT proceed to Task 3 until these work

**Run**: `./test.sh fetch`

---

## Next 5 Test Files (18-25 hours)

### Task 3: Attrset Operations (7 functions, 4-6h) ⚡ START HERE IF PRIORITY 0 COMPLETE
**File**: `main/tests/builtins_attrs_comprehensive_test.js` (DOES NOT EXIST)

**BEFORE WRITING TESTS**:
1. Read https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-getAttr
2. Test EACH function in `nix repl` and document outputs
3. Read runtime.js implementations (lines 820-849) to understand current behavior

Untested functions:
- `getAttr` (line 830) - Get attribute, error if missing
- `attrNames` (line 820) - Return sorted list of keys
- `attrValues` (line 825) - Return values in attrNames order
- `catAttrs` (line 838) - Extract attr from list of sets
- `genericClosure` (line 849) - Transitive closure with cycle handling
- `hasAttr` - Partially tested in hasattr_test.js
- `genAttrs` (line 843) - Generate attrset from list

Test in nix repl first:
```bash
nix repl
> builtins.getAttr "x" {x=1; y=2;}          # 1
> builtins.getAttr "missing" {x=1;}         # ERROR - document exact message
> builtins.attrNames {z=3; a=1; m=2;}       # ["a" "m" "z"] (sorted!)
> builtins.attrValues {z=3; a=1; m=2;}      # [1 2 3]
> builtins.catAttrs "x" [{x=1;} {x=2; y=3;}]  # [1 2]
> builtins.catAttrs "missing" [{x=1;}]       # []
```

**Run**: `./test.sh attrs`

---

### Task 4: String Operations (8 functions, 4-5h)
**File**: `main/tests/builtins_strings_comprehensive_test.js` (DOES NOT EXIST)

**BEFORE WRITING TESTS**:
1. Read https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-split
2. Test EACH function in `nix repl` - string functions have many edge cases
3. Document behavior with: empty strings, special characters, unicode, null bytes

Untested functions: split, splitVersion, baseNameOf, dirOf, toString, match, concatStringsSep, replaceStrings

**Run**: `./test.sh strings`

---

### Task 5: Math & Bitwise (8 functions, 3-4h)
**File**: `main/tests/builtins_math_comprehensive_test.js` (DOES NOT EXIST)

**BEFORE WRITING TESTS**:
1. Read https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-bitAnd
2. Test in `nix repl` - verify BigInt vs Float behavior
3. Document edge cases: negative numbers, zero, overflow, mixed types

Untested functions: sub, mul, lessThan, ceil, floor, bitAnd, bitOr, bitXor

**Run**: `./test.sh math`

---

### Task 6: Path/File Operations (10 functions, 4-6h)
**File**: `main/tests/builtins_paths_comprehensive_test.js` (DOES NOT EXIST)

**BEFORE WRITING TESTS**:
1. Read https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-pathExists
2. Test in `nix repl` - path functions interact with filesystem
3. Document behavior: missing files, permissions, symlinks, relative vs absolute paths

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

## Complete Untested List (35 functions remaining)

**Attrset Operations (7)** - ⚠️ Task 3
- getAttr, attrNames, attrValues, catAttrs, genericClosure, hasAttr, genAttrs

**String Operations (8)** - ⚠️ Task 4
- split, splitVersion, baseNameOf, dirOf, toString, match, concatStringsSep, replaceStrings

**Math & Bitwise (8)** - ⚠️ Task 5
- sub, mul, lessThan, ceil, floor, bitAnd, bitOr, bitXor

**Path/File Operations (10)** - ⚠️ Task 6
- pathExists, readFile, readDir, readFileType, findFile, toFile, storePath, storeDir, nixPath, placeholder

**Additional Untested (12)** - Lower priority (complete after Tasks 3-6)
- compareVersions, parseDrvName, hashString, hashFile, toXML, fromJSON, toJSON, addErrorContext, unsafeGetAttrPos, unsafeDiscardStringContext, getContext, appendContext

**BEFORE implementing ANY of these**: Read https://nix.dev/manual/nix/2.18/language/builtins.html and search for examples/documentation online

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
