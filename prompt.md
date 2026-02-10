# CRITICAL RULES - READ FIRST

**Your job is to focus on what is NOT implemented and NOT working. Only report what remains to be done. Do not report what you accomplished. You are a senior level developer, there is no such thing as a blocker. Break down large tasks into smaller tasks.**

## WORK ORDER (MUST FOLLOW STRICTLY)

1. **Runtime (main/runtime.js)** - FINISH THIS FIRST
   - Complete all 102 builtin functions
   - Test coverage must reach 80% minimum (82/102 functions)
   - Fix all bugs discovered during testing
   - **DO NOT PROCEED** until runtime is stable and well-tested

2. **Translator (main.js)** - ONLY AFTER RUNTIME IS COMPLETE
   - Fix any edge cases in Nix → JS translation
   - Ensure all language features work correctly
   - **DO NOT WORK ON THIS** until runtime testing is done

3. **nixpkgs.lib Testing** - ONLY AFTER TRANSLATOR IS COMPLETE
   - Test against real nixpkgs.lib files
   - Validate against production Nix code
   - **DO NOT WORK ON THIS** until translator is fully verified

## IMPLEMENTATION REQUIREMENTS

**ALWAYS read Nix documentation while implementing:**
- **Primary source:** https://nix.dev/manual/nix/2.18/language/builtins
- **Examples:** https://noogle.dev (search for function examples)
- **Verification:** Test in `nix repl` before writing JavaScript

**For missing/incomplete builtins:**
1. Read the official Nix documentation for that builtin
2. Test the builtin in `nix repl` to understand exact behavior
3. Search for examples on noogle.dev or GitHub nixpkgs
4. Write comprehensive tests BEFORE fixing implementation
5. Fix bugs, verify against `nix repl` output

**NPM modules are allowed:**
- Use https://esm.sh/NPM_MODULE_NAME format only
- Note: esm.sh is unreliable and may not work for all packages
- Prefer Deno standard library or native implementations when possible

**If you need to break down tasks:**
- Large tasks → smaller subtasks (no such thing as a blocker)
- Research phase → implementation phase → testing phase
- One function at a time if needed

---

# Runtime Testing Priority

**Current Status:** 42/102 tested (40%)
**Target:** 82/102 tested (80%)
**Remaining Work:** 40 functions, 21-28 hours

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

## Testing Process (MANDATORY STEPS)

**BEFORE writing ANY test, you MUST:**
1. Read the official Nix documentation for that builtin
2. Test the builtin in `nix repl` to understand its actual behavior
3. Document expected outputs in comments

### Step-by-Step Process

1. **Read Documentation** (https://nix.dev/manual/nix/2.18/language/builtins)
   ```
   Example: For builtins.isInt
   - Read what it does: "Return true if v is an int, false otherwise"
   - Check parameters: Takes one argument of any type
   - Note special cases: Integers vs floats
   ```

2. **Test in `nix repl` first**
   ```bash
   nix repl
   > builtins.isInt 42        # true
   > builtins.isInt 42.0      # false
   > builtins.isInt "42"      # false
   > builtins.isInt null      # false
   > builtins.typeOf 42       # "int"
   > builtins.typeOf 42.0     # "float"
   ```

3. **Search for examples** (https://noogle.dev)
   - Find real-world usage patterns
   - Identify edge cases used in nixpkgs
   - Document expected behavior

4. **Create test file** in `main/tests/`
   ```javascript
   import { assertEquals } from "jsr:@std/assert"
   import { builtins } from "../runtime.js"

   // Based on nix repl testing:
   // builtins.isInt 42 → true
   // builtins.isInt 42.0 → false
   Deno.test("isInt with integer", () => {
       assertEquals(builtins.isInt(42n), true)
   })

   Deno.test("isInt with float", () => {
       assertEquals(builtins.isInt(42.0), false)
   })
   ```

5. **Run tests**
   ```bash
   ./test.sh types     # Task 1
   ./test.sh lists     # Task 2
   ./test.sh attrs     # Task 3
   ./test.sh strings   # Task 4
   ./test.sh math      # Task 5
   ./test.sh paths     # Task 6
   ```

6. **Fix bugs** discovered in `main/runtime.js`
   - Compare test output vs `nix repl` output
   - Update implementation to match Nix behavior exactly
   - Re-run tests until passing

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

## WHAT NOT TO DO (VIOLATIONS OF WORK ORDER)

❌ **DO NOT** work on nixpkgs.lib tests - runtime is only 40% tested
❌ **DO NOT** work on translator improvements - runtime testing must reach 80% first
❌ **DO NOT** skip reading Nix documentation - always verify behavior in `nix repl`
❌ **DO NOT** report achievements or completed work - only report remaining work
❌ **DO NOT** say there are "blockers" - break tasks down into smaller pieces
❌ **DO NOT** implement without testing - write tests first, then fix bugs
❌ **DO NOT** assume you know how a builtin works - always check official docs

## WHAT TO DO (FOLLOWING WORK ORDER)

✓ **DO** test the remaining 60 untested runtime builtins
✓ **DO** read https://nix.dev/manual/nix/2.18/language/builtins before implementing
✓ **DO** test each builtin in `nix repl` before writing JavaScript tests
✓ **DO** write 5-10 tests per builtin (including edge cases)
✓ **DO** fix bugs discovered during testing
✓ **DO** break down large tasks into 1-2 hour subtasks
✓ **DO** focus on what remains to be done (not what's complete)

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
