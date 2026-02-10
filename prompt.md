# Denix Development Priorities

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

**Runtime Issues:**
- 53/109 builtins untested (48.6% have no test coverage)
- Derivation store path computation bug (9/10 extended tests failing)

**What Works:**
- Translator: Complete
- Import system: Complete
- Basic derivations: Working (but see bug above)

## Priority 0: Fix Derivation Store Paths (CRITICAL - 1-2h)

**Status:** 9/10 tests failing due to incorrect store path hash computation

**Root Cause:** Environment variables must include output placeholders BEFORE computing store paths

**Test:** Run `deno run --allow-all main/tests/derivation/001_basic_tests.js`

**Current Results:**
- Test 001-002: Simple cases work
- Test 003-010: Store path hashes don't match Nix (NEEDS FIX)

**Fix Required:** See MEMORY.md Session 27 notes - need to add empty output placeholders to env before computing derivation ATerm.

**File to Fix:** `main/runtime.js` around line 1756-1778 (derivation function)

**Verification:** All 10 tests should pass after fix.

**Documentation to Read:**
- https://nix.dev/manual/nix/2.28/language/derivations
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-derivation
- Search: "nix derivation store path computation" for implementation details

---

## Priority 1: Test Untested Builtins (12-16h to 80%)

**Goal:** 56/109 tested → 87/109 tested (51% → 80% coverage)

**Need:** 31 more builtins tested

### Task 1: Math & Bitwise (8 functions, 3-4h) ⚡ START HERE

Create: `main/tests/builtins_math_test.js`

Functions:
- `sub` - Subtraction (BigInt and Float)
- `mul` - Multiplication (BigInt and Float)
- `lessThan` - Comparison (<)
- `ceil` - Round up
- `floor` - Round down
- `bitAnd` - Bitwise AND
- `bitOr` - Bitwise OR
- `bitXor` - Bitwise XOR

**Documentation:**
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-sub
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-mul
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-ceil
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-bitAnd

**Test in nix repl first:**
```bash
nix repl
> builtins.sub 10 3     # 7
> builtins.mul 5 6      # 30
> builtins.ceil 3.2     # 4
> builtins.bitAnd 5 3   # 1
```

### Task 2: Attrset Operations (5 functions, 2-3h)

Create: `main/tests/builtins_attrs_ops_test.js`

**Documentation:**
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-getAttr
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-attrNames
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-attrValues
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-catAttrs
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-genericClosure

Functions:
- `getAttr` - Get attribute (throws if missing)
- `attrNames` - Sorted list of keys
- `attrValues` - Values in attrNames order
- `catAttrs` - Extract attr from list of sets
- `genericClosure` - Transitive closure

### Task 3: String Operations (5 functions, 3-4h)

Create: `main/tests/builtins_strings_ops_test.js`

**Documentation:**
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-split
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-splitVersion
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-baseNameOf
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-dirOf
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-toString
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-match
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-concatStringsSep

Functions:
- `split` - Split by regex (alternating list)
- `splitVersion` - Split version by dots/dashes
- `baseNameOf` - Get filename
- `dirOf` - Get directory
- `toString` - Convert to string
- `match` - Regex match with captures
- `concatStringsSep` - Join with separator

### Task 4: Path/File Operations (8 functions, 4-5h)

Create: `main/tests/builtins_paths_ops_test.js`

**Documentation:**
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-pathExists
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-readFile
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-readDir
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-readFileType
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-findFile
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-toFile
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-toPath

Functions:
- `pathExists` - Check if path exists
- `readFile` - Read file as string
- `readDir` - Read directory entries
- `readFileType` - Get file type
- `findFile` - Find in search path
- `toFile` - Create file in store
- `toPath` - Convert to path

**Remaining 5 untested functions** (lower priority, skip for 80% goal):
- `storePath`, `storeDir`, `placeholder`, `outputOf` (store functions)
- Various context/advanced functions

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

---

## What NOT to Do

- ❌ Don't refactor code unnecessarily
- ❌ Don't add features beyond what's documented in tasks
- ❌ Don't work on translator until runtime is complete
- ❌ Don't work on nixpkgs tests until translator is complete
- ❌ Don't split files or reorganize structure without explicit instruction

---

## Reference Documentation Files

- **README.md** - User-facing overview
- **ARCHITECTURE.md** - Technical design details
- **MEMORY.md** - Session history and project memory
- **test.sh** - Test runner with categories

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

## Immediate Next Steps

1. **Fix derivation store paths** (1-2h) - See Priority 0
2. **Test 8 math/bitwise functions** (3-4h) - See Task 1
3. **Test 5 attrset operations** (2-3h) - See Task 2
4. **Test 5 string operations** (3-4h) - See Task 3
5. **Test 8 path/file operations** (4-5h) - See Task 4

**Total to 80% coverage:** 15-20 hours of testing work
