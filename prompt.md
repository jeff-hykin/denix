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

## Next 4 Test Files (12-16 hours) - REVISED PRIORITIES

### Task 3: Math & Bitwise (8 functions, 3-4h) ⚡ START HERE IF PRIORITY 0 COMPLETE
**File**: `main/tests/builtins_math_comprehensive_test.js` (DOES NOT EXIST)

**BEFORE WRITING TESTS**:
1. Read https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-bitAnd
2. Test in `nix repl` - verify BigInt vs Float behavior
3. Document edge cases: negative numbers, zero, overflow, mixed types

Untested functions (8):
- `sub` - Subtraction (BigInt and Float)
- `mul` - Multiplication (BigInt and Float)
- `lessThan` - Comparison operator (<)
- `ceil` - Round up to integer
- `floor` - Round down to integer
- `bitAnd` - Bitwise AND
- `bitOr` - Bitwise OR
- `bitXor` - Bitwise XOR

Test in nix repl first:
```bash
nix repl
> builtins.sub 10 3                # 7
> builtins.sub 10.5 3.2            # 7.3
> builtins.mul 5 6                 # 30
> builtins.lessThan 5 10           # true
> builtins.ceil 3.2                # 4
> builtins.floor 3.8               # 3
> builtins.bitAnd 5 3              # 1
> builtins.bitOr 5 3               # 7
> builtins.bitXor 5 3              # 6
```

**Run**: `deno test --allow-all main/tests/builtins_math_comprehensive_test.js`

---

### Task 4: Attrset Operations (5 functions, 2-3h)
**File**: `main/tests/builtins_attrs_operations_test.js` (DOES NOT EXIST)

**BEFORE WRITING TESTS**:
1. Read https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-getAttr
2. Test EACH function in `nix repl` and document outputs
3. Read runtime.js implementations (lines 820-849) to understand current behavior

Untested functions (5):
- `getAttr` - Get attribute, error if missing
- `attrNames` - Return sorted list of keys
- `attrValues` - Return values in attrNames order
- `catAttrs` - Extract attr from list of sets
- `genericClosure` - Transitive closure with cycle handling

Test in nix repl first:
```bash
nix repl
> builtins.getAttr "x" {x=1; y=2;}          # 1
> builtins.getAttr "missing" {x=1;}         # ERROR - document exact message
> builtins.attrNames {z=3; a=1; m=2;}       # ["a" "m" "z"] (sorted!)
> builtins.attrValues {z=3; a=1; m=2;}      # [1 2 3]
> builtins.catAttrs "x" [{x=1;} {x=2; y=3;}]  # [1 2]
```

**Run**: `deno test --allow-all main/tests/builtins_attrs_operations_test.js`

---

### Task 5: String Operations (5 functions, 3-4h)
**File**: `main/tests/builtins_strings_operations_test.js` (DOES NOT EXIST)

**BEFORE WRITING TESTS**:
1. Read https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-split
2. Test EACH function in `nix repl` - string functions have many edge cases
3. Document behavior with: empty strings, special characters, unicode

Untested functions (5):
- `split` - Split string by regex (returns alternating list)
- `splitVersion` - Split version string by dots/dashes
- `baseNameOf` - Get filename from path
- `dirOf` - Get directory from path
- `toString` - Convert to string
- `match` - Match regex and return captures
- `concatStringsSep` - Join strings with separator

Test in nix repl first:
```bash
nix repl
> builtins.split "a" "banana"              # ["b" ["a"] "n" ["a"] "n" ["a"] ""]
> builtins.splitVersion "1.2.3-beta"      # ["1" "2" "3" "beta"]
> builtins.baseNameOf "/path/to/file.txt" # "file.txt"
> builtins.dirOf "/path/to/file.txt"      # "/path/to"
> builtins.toString 123                    # "123"
> builtins.match "([a-z]+)([0-9]+)" "abc123"  # ["abc" "123"]
```

**Run**: `deno test --allow-all main/tests/builtins_strings_operations_test.js`

---

### Task 6: Path/File Operations (8 functions, 4-5h)
**File**: `main/tests/builtins_paths_operations_test.js` (DOES NOT EXIST)

**BEFORE WRITING TESTS**:
1. Read https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-pathExists
2. Test in `nix repl` - path functions interact with filesystem
3. Document behavior: missing files, permissions, symlinks, relative vs absolute paths

Untested functions (8):
- `pathExists` - Check if path exists
- `readFile` - Read file contents as string
- `readDir` - Read directory entries
- `readFileType` - Get file type (regular/directory/symlink)
- `findFile` - Find file in search path
- `toFile` - Create file in store
- `toPath` - Convert string to path

Test in nix repl first:
```bash
nix repl
> builtins.pathExists ./README.md         # true
> builtins.readFile ./test.txt            # "file contents"
> builtins.readDir ./main                 # {name = "directory"; }
> builtins.readFileType ./README.md       # "regular"
```

**Run**: `deno test --allow-all main/tests/builtins_paths_operations_test.js`

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

## Complete Untested List (53 functions remaining - VERIFIED)

**CRITICAL: Already Tested But Missing From Docs:**
- ✅ `map`, `filter`, `all`, `any`, `elem`, `partition`, `sort`, `zipAttrsWith` - Already tested in builtins_lists_comprehensive_test.js!
- ✅ `hasAttr` - Already tested in hasattr_test.js!
- ✅ `replaceStrings` - Already tested in import_e2e_test.js!

**Math & Bitwise (8)** - ⚠️ Task 3 (REVISED - 3-4 hours)
- sub, mul, lessThan, ceil, floor, bitAnd, bitOr, bitXor

**Attrset Operations (5)** - ⚠️ Task 4 (REVISED - 2-3 hours)
- getAttr, attrNames, attrValues, catAttrs, genericClosure

**String Operations (5)** - ⚠️ Task 5 (REVISED - 3-4 hours)
- split, splitVersion, baseNameOf, dirOf, toString, match, concatStringsSep

**Path/File Operations (8)** - ⚠️ Task 6 (4-5 hours)
- pathExists, readFile, readDir, readFileType, findFile, toFile, toPath

**Store/Path Functions (4)** - Lower priority (2-3 hours)
- storePath, storeDir, placeholder, outputOf

**Type/Context Functions (5)** - Lower priority (2-3 hours)
- getContext, hasContext, unsafeDiscardStringContext, appendContext, unsafeGetAttrPos

**Conversion Functions (3)** - Lower priority (2-3 hours)
- fromJSON, toXML, getEnv

**Control Flow (4)** - Lower priority (2-3 hours)
- abort, addErrorContext, break, traceVerbose

**Advanced/Rare Functions (11)** - Optional (6-8 hours)
- derivation, derivationStrict, fetchClosure, fetchMercurial, getFlake, hashFile, hashString, nixPath, unsafeDiscardOutputDependency

**BEFORE implementing ANY of these**: Read https://nix.dev/manual/nix/2.18/language/builtins.html and search for examples/documentation online

---

## Current Status

- **Implemented**: 109/109 builtins (100%)
- **Tested**: 56/109 builtins (51.4%) ✓ Better than Session 38 estimate
- **Target**: 87/109 builtins (80%)
- **Need**: 31 more tests (was 35)

**Time to 80%**: 15-21 hours (Tasks 3-6)

---

## What NOT to Do

- Don't implement new features (runtime is complete)
- Don't refactor working code
- Don't work on translator or nixpkgs tests yet
- Don't report accomplishments (only what remains)
