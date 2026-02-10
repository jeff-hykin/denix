# Denix Development Priorities

**Last Updated:** 2026-02-10 (Session 40 - Architecture Review)

## Current State

- **Runtime:** 109/109 builtins implemented (100%)
- **Tests:** 56/109 tested (51.4% coverage)
- **Derivations:** Working but 9/10 extended tests failing (store path computation bug)
- **Translator:** 87/87 tests passing (100%)

## Priority 0: Fix Derivation Store Paths (CRITICAL - 1-2h)

**Status:** 9/10 tests failing due to incorrect store path hash computation

**Root Cause:** Environment variables must include output placeholders BEFORE computing store paths

**Test:** Run `deno run --allow-all main/tests/derivation/001_basic_tests.js`

**Expected Results:**
- Test 001-002: PASSING ✓ (simple cases work)
- Test 003-010: FAILING ✗ (store path hashes don't match Nix)

**Fix Required:** See MEMORY.md Session 27 notes - need to add empty output placeholders to env before computing derivation ATerm.

**File to Fix:** `main/runtime.js` around line 1756-1778 (derivation function)

**Verification:** All 10 tests should pass after fix.

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

Functions:
- `getAttr` - Get attribute (throws if missing)
- `attrNames` - Sorted list of keys
- `attrValues` - Values in attrNames order
- `catAttrs` - Extract attr from list of sets
- `genericClosure` - Transitive closure

### Task 3: String Operations (5 functions, 3-4h)

Create: `main/tests/builtins_strings_ops_test.js`

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
./test.sh types         # Type checking (already complete)
./test.sh lists         # List operations (already complete)
./test.sh core          # Core builtins

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

1. **Test in nix repl FIRST** - Document exact Nix behavior
2. **5+ tests per function** - Normal + edge cases + errors
3. **Compare against Nix** - Run same code in nix repl to verify
4. **Test BigInt vs Float** - Many functions handle both
5. **Fix bugs immediately** - Don't skip failing tests

---

## What NOT to Do

- ❌ Don't refactor working code
- ❌ Don't add features (runtime is complete)
- ❌ Don't work on translator (already 100%)
- ❌ Don't work on nixpkgs tests yet
- ❌ Don't split files or reorganize structure

---

## Documentation Files

- **README.md** - User-facing overview
- **ARCHITECTURE.md** - Technical design details
- **ARCHITECTURE_CLEANUP_ANALYSIS.md** - Codebase assessment (Session 40)
- **test.sh** - Test runner with categories

---

## Key Files

- `main/runtime.js` - 109 builtins (lines 164-2063)
- `main.js` - Nix → JS translator (87/87 tests passing)
- `main/tests/` - 27 test files, 290+ tests
- `tools/` - Utilities (hashing, store paths, etc.)

---

## Session 40 Findings (Architecture Review)

**Codebase Status:** ✅ CLEAN AND WELL-ORGANIZED

- 50 JavaScript files, all necessary
- No dead code found
- No duplicate implementations
- Clear separation of concerns
- Excellent test organization via test.sh

**No refactoring needed** - Focus on EXECUTION (testing + bug fixes)

---

## Immediate Next Steps

1. **Fix derivation store paths** (1-2h) - See Priority 0
2. **Test 8 math/bitwise functions** (3-4h) - See Task 1
3. **Test 5 attrset operations** (2-3h) - See Task 2
4. **Test 5 string operations** (3-4h) - See Task 3
5. **Test 8 path/file operations** (4-5h) - See Task 4

**Total to 80% coverage:** 15-20 hours of testing work
