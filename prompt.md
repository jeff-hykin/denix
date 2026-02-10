# Denix Development - Current Priority

## Goal: Test Runtime Builtins (37% → 80%)

**Status:** 40/109 builtins tested, need 47 more (87 total for 80%)

## Next 6 Test Files to Create

Create these files in order, testing each builtin against `nix repl` behavior:

### 1. Type Checking (3-4 hours)
**File:** `main/tests/builtins_type_checking_test.js`
**Functions (10):** isNull, isBool, isInt, isFloat, isString, isList, isPath, isAttrs, isFunction, typeOf
**Tests:** 50+ (each function × 5 tests minimum)

### 2. List Operations (5-7 hours)
**File:** `main/tests/builtins_lists_comprehensive_test.js`
**Functions (10):** map, filter, all, any, elem, elemAt, partition, sort, genList, concatLists
**Tests:** 70+ (includes lazyMap proxy tests)

### 3. Attrset Operations (3-5 hours)
**File:** `main/tests/builtins_attrs_comprehensive_test.js`
**Functions (6):** getAttr, attrNames, attrValues, catAttrs, genericClosure, getEnv
**Tests:** 50+ (attrNames must return sorted keys)

### 4. String Operations (3-4 hours)
**File:** `main/tests/builtins_strings_comprehensive_test.js`
**Functions (5):** split, splitVersion, baseNameOf, dirOf, toXML
**Tests:** 30+

### 5. Math & Bitwise (3-4 hours)
**File:** `main/tests/builtins_math_comprehensive_test.js`
**Functions (8):** sub, mul, ceil, floor, bitAnd, bitOr, bitXor, toString
**Tests:** 30+

### 6. Path/File Operations (4-6 hours)
**File:** `main/tests/builtins_paths_comprehensive_test.js`
**Functions (11):** pathExists, readFile, readDir, readFileType, findFile, toFile, storePath, toPath, storeDir, nixPath, placeholder
**Tests:** 40+

**Total to 80%:** 50 functions, 21-30 hours

## Test Development Process

1. **Test in nix repl first:**
   ```bash
   nix repl
   nix-repl> builtins.isNull null  # Expected: true
   ```

2. **Write Deno tests:**
   ```javascript
   import { assertEquals } from "https://deno.land/std@0.210.0/assert/mod.ts"
   import { builtins } from "../runtime.js"

   Deno.test("builtins.isNull - null returns true", () => {
       assertEquals(builtins.isNull(null), true)
   })
   ```

3. **Run tests:**
   ```bash
   deno test --allow-all main/tests/builtins_type_checking_test.js
   ```

4. **Fix bugs discovered** (untested code often has bugs)

## Running Tests

```bash
# All tests
deno test --allow-all

# By category (using test.sh)
./test.sh types      # Type checking tests
./test.sh lists      # List operation tests
./test.sh attrs      # Attrset tests
./test.sh core       # Existing core tests
./test.sh translator # Translator tests

# Specific file
deno test --allow-all main/tests/builtins_type_checking_test.js
```

## References

- **Nix 2.18 docs:** https://nix.dev/manual/nix/2.18/language/builtins
- **Architecture:** See ARCHITECTURE.md for design decisions
- **Test structure:** See existing test files for patterns
