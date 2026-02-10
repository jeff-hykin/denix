# Runtime Testing Priority

**Goal:** 42/102 tested (40%) → 82/102 tested (80%)
**Remaining:** 40 functions, 21-28 hours

---

## Next 6 Test Files to Create

| # | File | Functions | Time | Status |
|---|------|-----------|------|--------|
| 1 | `builtins_type_checking_test.js` | 10 | 3-4h | ❌ NOT CREATED |
| 2 | `builtins_lists_comprehensive_test.js` | 8 | 5-7h | ❌ NOT CREATED |
| 3 | `builtins_attrs_comprehensive_test.js` | 5 | 3-5h | ❌ NOT CREATED |
| 4 | `builtins_strings_comprehensive_test.js` | 6 | 3-4h | ❌ NOT CREATED |
| 5 | `builtins_math_comprehensive_test.js` | 8 | 3-4h | ❌ NOT CREATED |
| 6 | `builtins_paths_comprehensive_test.js` | 10 | 4-6h | ❌ NOT CREATED |

**Total:** 47 functions, 21-30 hours → **80% coverage**

---

## Testing Process

1. **Test in `nix repl` first**
   ```bash
   nix repl
   > builtins.isInt 42        # true
   > builtins.isInt 42.0      # false
   > builtins.typeOf 42       # "int"
   ```

2. **Create test file** in `main/tests/`
   ```javascript
   import { assertEquals } from "jsr:@std/assert"
   import { builtins } from "../runtime.js"

   Deno.test("isInt with integer", () => {
       assertEquals(builtins.isInt(42n), true)
   })

   Deno.test("isInt with float", () => {
       assertEquals(builtins.isInt(42.0), false)
   })
   ```

3. **Run tests**
   ```bash
   ./test.sh types     # Task 1
   ./test.sh lists     # Task 2
   ./test.sh attrs     # Task 3
   ./test.sh strings   # Task 4
   ./test.sh math      # Task 5
   ./test.sh paths     # Task 6
   ```

4. **Fix bugs** discovered in `main/runtime.js`

---

## Task Details

### Task 1: Type Checking (10 functions)
- isNull, isBool, isInt, isFloat, isString, isList, isPath, isAttrs, isFunction, typeOf
- Edge cases: null vs 0 vs false, 42n vs 42.0, [] vs {}, "/foo" vs ./foo
- Run: `./test.sh types`

### Task 2: List Operations (8 functions)
- map, elem, elemAt, partition, sort, genList, concatLists, zipAttrsWith
- Edge cases: map laziness, elemAt bounds, sort stability, empty lists
- Run: `./test.sh lists`

### Task 3: Attrset Operations (5 functions)
- getAttr, attrNames, attrValues, catAttrs, genericClosure
- Edge cases: attrNames MUST be sorted, missing keys error, genericClosure cycles
- Run: `./test.sh attrs`

### Task 4: String Operations (6 functions)
- concatStringsSep, split, splitVersion, baseNameOf, dirOf, toString
- Edge cases: split capture groups, baseNameOf with "/", dirOf with "/", toString lists
- Run: `./test.sh strings`

### Task 5: Math & Bitwise (8 functions)
- sub, mul, lessThan, ceil, floor, bitAnd, bitOr, bitXor
- Edge cases: BigInt vs Float, mixed types, negative numbers, bitwise two's complement
- Run: `./test.sh math`

### Task 6: Path/File Operations (10 functions)
- pathExists, readFile, readDir, readFileType, findFile, toFile, storePath, storeDir, nixPath, placeholder
- Edge cases: missing files error, readDir types, storePath validation
- Run: `./test.sh paths`

---

## References

- **Nix 2.18 Docs:** https://nix.dev/manual/nix/2.18/language/builtins
- **Search Examples:** https://noogle.dev
- **Test Runner:** `./test.sh` (see comments for all options)

---

## IMMEDIATE NEXT STEP

Create `main/tests/builtins_type_checking_test.js` (3-4 hours)

```javascript
// Test in nix repl first:
// builtins.isInt 42 → true
// builtins.isInt 42.0 → false
// builtins.typeOf 42 → "int"

import { assertEquals } from "jsr:@std/assert"
import { builtins } from "../runtime.js"

Deno.test("isInt with integer", () => {
    assertEquals(builtins.isInt(42n), true)
})

Deno.test("isInt with float", () => {
    assertEquals(builtins.isInt(42.0), false)
})

// ... 48 more tests (5 per function × 10 functions)
```

Run: `./test.sh types`
