# Denix Development Guide

## 🎯 Current Priority: Runtime Testing

**Status:**
- 109 builtins implemented (100% code complete)
- 40 builtins tested (37% coverage) ← TOO LOW
- **Target: 80% coverage (87 tested = 47 more needed)**
- **Estimated: 18-26 hours**

**Critical untested functions:**
- `map`, `filter`, `all`, `any` - Core list operations
- `getAttr`, `attrNames`, `attrValues` - Core attrset operations

**What's already done (skip):**
- Translator: 87/87 tests (100%)
- Import system: Complete
- Derivations: Basic functionality working

## Work Process

1. Read Nix docs: https://nix.dev/manual/nix/2.18/language/builtins
2. Test in `nix repl` to verify behavior
3. Write tests matching Nix behavior exactly
4. Use https://noogle.dev for real-world examples

## Test Task Priority

### ✅ Task 1: Type Checking (COMPLETE - Skip)
All 10 type functions tested: isNull, isBool, isInt, isFloat, isString, isList, isPath, isAttrs, typeOf, isFunction

### ⚡ Task 2: List Operations (10 functions, 5-7 hours) - START HERE
**File**: `main/tests/builtins_lists_comprehensive_test.js`

**Untested (10):**
- map (CRITICAL - lazyMap proxy)
- filter (CRITICAL)
- all, any (predicates)
- elem, elemAt
- partition, sort
- genList, concatLists

**Key edge cases:**
- Empty lists []
- Single element [1]
- Nested [[1,2],[3,4]]
- lazyMap index access
- partition lazy eval

Run: `./test.sh lists`

### ⚡ Task 3: Attrset Operations (6 functions, 3-5 hours)
**File**: `main/tests/builtins_attrs_comprehensive_test.js`

**Untested (6):**
- getAttr (CRITICAL)
- attrNames, attrValues (CRITICAL)
- catAttrs
- genericClosure
- getEnv

**Key edge cases:**
- Missing attributes
- null/undefined values
- Nested access
- Empty attrsets {}
- Environment variables

Run: `./test.sh attrs`

### Task 4: String Operations (5 functions, 3-4 hours)
**File**: `main/tests/builtins_strings_comprehensive_test.js`

**Untested (5):**
- split (POSIX ERE regex)
- splitVersion
- baseNameOf, dirOf
- toXML

Run: `./test.sh strings`

### Task 5: Math & Bitwise (8 functions, 3-4 hours)
**File**: `main/tests/builtins_math_comprehensive_test.js`

**Untested (8):**
- sub, mul
- ceil, floor
- bitAnd, bitOr, bitXor
- toString

Run: `./test.sh math`

### Task 6: Path/File Operations (11 functions, 4-6 hours)
**File**: `main/tests/builtins_paths_comprehensive_test.js`

**Untested (11):**
- pathExists, readFile, readDir, readFileType
- findFile, toFile, storePath, toPath
- storeDir, nixPath, placeholder

Run: `./test.sh paths`

### Task 7: Hashing & Context (9 functions, 4-5 hours)
**File**: `main/tests/builtins_hashing_context_test.js`

**Untested (9):**
- hashFile, hashString
- getContext, hasContext, unsafeDiscardStringContext
- appendContext, unsafeDiscardOutputDependency
- addErrorContext, outputOf

### Task 8: Control Flow (3 functions, 1-2 hours)
**File**: `main/tests/builtins_control_comprehensive_test.js`

**Untested (3):**
- abort
- seq (strict evaluation)
- deepSeq

### Task 9: JSON/Conversion (1 function, 30min-1 hour)
**File**: `main/tests/builtins_conversion_test.js`

**Untested (1):**
- fromJSON

### Task 10: Advanced Functions (6 functions, 3-5 hours)
**File**: `main/tests/builtins_advanced_test.js`

**Untested (6):**
- functionArgs
- zipAttrsWith
- parseFlakeRef, flakeRefToString
- langVersion, nixVersion

## Path to 80% Coverage

**Phase 1 (CRITICAL):** Tasks 2-3 (16 functions, 8-12 hours) → 56% coverage
**Phase 2 (HIGH):** Tasks 4-6 (24 functions, 10-14 hours) → 80% coverage ✅
**Phase 3 (OPTIONAL):** Tasks 7-10 (19 functions, 8-13 hours) → 95% coverage

**Total to 80%: Tasks 2-6 = 40 functions, 18-26 hours**

## Test File Template

```javascript
import { assertEquals, assertThrows } from "https://deno.land/std@0.210.0/assert/mod.ts"
import { builtins } from "../runtime.js"

Deno.test("builtins.FUNCTION_NAME - basic usage", () => {
    const result = builtins.FUNCTION_NAME(arg)
    assertEquals(result, expected)
})

Deno.test("builtins.FUNCTION_NAME - edge case", () => {
    const result = builtins.FUNCTION_NAME(edgeArg)
    assertEquals(result, expectedEdge)
})

Deno.test("builtins.FUNCTION_NAME - error case", () => {
    assertThrows(
        () => builtins.FUNCTION_NAME(badArg),
        Error,
        "expected error message"
    )
})
```

## Running Tests

```bash
# All tests
./test.sh

# Specific category
./test.sh lists
./test.sh attrs
./test.sh strings
./test.sh math
./test.sh paths

# All runtime tests
./test.sh runtime

# Pattern matching
deno test --allow-all --filter="map"
```

## After Runtime Testing (FUTURE)

### Optional Work (Only after 80% coverage):

1. **Translator edge cases** (2-3 days)
   - Nested destructuring with @
   - String escape sequences
   - Path literal edge cases
   - Operator precedence

2. **nixpkgs.lib expansion** (4-6 days)
   - Currently: 10/41 files tested (24%)
   - Target: 25/41 files (60%)
   - High-value: lists.nix, attrsets.nix, options.nix

3. **Optional builtins** (16-22 days)
   - fetchMercurial (2-3 days)
   - fetchClosure (5-7 days)
   - getFlake (5-7 days)
   - fetchTree edge cases (4-6 hours)

**Current recommendation:** Focus on Tasks 2-6 ONLY (80% coverage)
