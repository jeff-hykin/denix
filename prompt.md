# Denix Development Priorities

**Goal:** Make runtime.js work correctly with comprehensive test coverage.

**Current State:**
- ✅ 109/109 builtins implemented (100% code complete)
- ⚠️ 56/109 builtins tested (51% coverage)
- 🐛 8/10 derivation tests failing (critical bugs)
- 🎯 Target: 80%+ test coverage (87/109 builtins)

---

## 🔴 PRIORITY 0: Fix Derivation Bugs (1-2h) - CRITICAL

**Status:** 8 out of 10 derivation tests FAILING

**Test command:**
```bash
deno run --allow-all main/tests/derivation/001_basic_tests.js
```

### Bug 1: Store Path Hash (Tests 001-008)

**Problem:** Output names must be in `env` BEFORE computing hash.

**Fix location:** `main/runtime.js` line ~1755

**Solution:** Add empty output placeholders BEFORE creating drvStructure:
```javascript
// Add empty output placeholders (Nix includes these in hash computation)
for (const outputName of outputNames) {
    env[outputName] = ""
}
```

### Bug 2: toJSON Crash (Test 009)

**Problem:** Derivations have callable properties, hitting function case before object case.

**Fix location:** `main/runtime.js` lines 308-320

**Solution:** Check for derivations in the function case:
```javascript
case "function":
    // Derivations may appear as functions but should serialize to outPath
    if (value && typeof value === "object" && value.type === "derivation") {
        return JSON.stringify(value.outPath)
    }
    throw new NixError(`error: cannot convert a function to JSON`)
```

---

## PRIORITY 1: Test Math & Bitwise Operations (3-4h)

**File to create:** `main/tests/builtins_math_bitwise_test.js`

**8 untested functions:**
- sub, mul, lessThan (arithmetic/comparison)
- ceil, floor (rounding)
- bitAnd, bitOr, bitXor (bitwise)

**Test requirements:**
- 5-10 tests per function
- Cover BigInt and Float cases
- Test edge cases (negatives, zero, identity operations)

**Run tests:**
```bash
./test.sh math
```

---

## PRIORITY 2: Test Attrset Operations (2-3h)

**File to create:** `main/tests/builtins_attrset_ops_test.js`

**5 untested functions:**
- getAttr, attrNames, attrValues
- catAttrs, genericClosure

**Critical:** These are commonly used in nixpkgs.lib

**Run tests:**
```bash
./test.sh attrs
```

---

## PRIORITY 3: Test String Operations (3-4h)

**File to create:** `main/tests/builtins_string_ops_test.js`

**7 untested functions:**
- split, match (regex)
- concatStringsSep (joining)
- splitVersion (parsing)
- baseNameOf, dirOf, toString (conversion)

**Run tests:**
```bash
./test.sh strings
```

---

## PRIORITY 4: Test Path/File Operations (4-5h)

**File to create:** `main/tests/builtins_path_file_ops_test.js`

**8 untested functions:**
- pathExists, readFile, readDir, readFileType
- findFile, toFile, toPath, baseNameOf

**Setup:** Create test fixtures in `main/tests/fixtures/pathops_test/`

**Run tests:**
```bash
./test.sh paths
```

---

## Test Strategy

**Before writing tests:**
1. Read Nix docs: https://nix.dev/manual/nix/2.28/language/builtins.html
2. Test in `nix repl` to understand exact behavior
3. Write 5-10 tests per function (normal + edge cases)
4. Compare JS output against nix repl output

**Test structure:**
```javascript
import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { builtins } from "../runtime.js"

Deno.test("functionName - basic case", () => {
    assertEquals(builtins.functionName(input), expectedOutput)
})
```

---

## Summary

**Work order:**
1. Fix derivation bugs (1-2h) ← START HERE
2. Add math tests (3-4h)
3. Add attrset tests (2-3h)
4. Add string tests (3-4h)
5. Add path tests (4-5h)

**Total time to 80% coverage:** ~15-20 hours

**Result:** 84/109 builtins tested (77% coverage)

---

## Documentation

- **README.md** - User guide and quick start
- **ARCHITECTURE.md** - Technical design decisions
- **This file** - Current priorities and tasks
