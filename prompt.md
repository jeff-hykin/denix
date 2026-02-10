# Denix Development Priorities

## CRITICAL RULES - READ FIRST

**Your job is to focus on what is NOT implemented and NOT working. Only report what remains to be done. Do not report what you accomplished. You are a senior level developer, there is no such thing as a blocker. Break down large tasks into smaller tasks.**

**WORK ORDER (MUST FOLLOW STRICTLY):**
1. **Runtime builtins FIRST** - 57 untested builtins remaining (59% of runtime needs testing)
2. **Translator edge cases SECOND** - Only after runtime reaches 80%+ test coverage
3. **nixpkgs.lib tests THIRD** - Only after translator is fully validated

**DO NOT work on translator or nixpkgs.lib until runtime reaches 80% test coverage.**

## IMPLEMENTATION METHODOLOGY

**Before implementing ANY builtin or feature:**
1. **Read Nix 2.18 official docs**: https://nix.dev/manual/nix/2.18/language/builtins
2. **Search for additional documentation**: Use noogle.dev, search for blog posts, examples
3. **Test in nix repl**: Try all edge cases - nulls, empty lists, type errors, etc.
4. **Find real-world examples**: Search nixpkgs for actual usage patterns
5. **Implement based on documented behavior** - NOT assumptions

**External dependencies:**
- You CAN use npm modules via https://esm.sh/NPM_MODULE_NAME
- WARNING: esm.sh is unreliable, have fallback plan
- Prefer Deno standard library when possible

**When stuck:**
- Break large tasks into smaller subtasks
- Research first, implement second
- No such thing as a blocker - find alternatives

## Current Priority: Runtime Testing

**Remaining work:** 57/97 builtins untested (59% of runtime NOT tested)
**Target:** 80%+ coverage (77/97 tested = 37 more builtins needed)
**Estimated time:** 18-23 hours of focused testing

## IMMEDIATE NEXT STEP

**Start with Task 1: Type Checking (3-4 hours)**

1. Read https://nix.dev/manual/nix/2.18/language/builtins#builtins-isNull
2. Test each function in nix repl:
   ```nix
   nix-repl> builtins.isNull null
   true
   nix-repl> builtins.isNull 123
   false
   ```
3. Create `main/tests/builtins_types_test.js`
4. Write 5-8 tests per function (9 functions total)
5. Run `./test.sh builtins_types`
6. Fix any bugs discovered
7. Move to Task 2 (List Operations)

## Testing Process (MANDATORY STEPS)

**For EACH untested builtin:**
1. **Read Nix 2.18 docs**: https://nix.dev/manual/nix/2.18/language/builtins#builtins-FUNCTION_NAME
2. **Test in nix repl**: Try edge cases (null, empty, wrong types, etc.)
3. **Search noogle.dev**: Find examples and additional documentation
4. **Create/update test file**: `main/tests/builtins_CATEGORY_test.js`
5. **Write 5-10 tests minimum**: Normal cases, edge cases, error cases
6. **Run tests**: `./test.sh builtins_CATEGORY`
7. **Fix bugs found**: Untested code WILL have bugs
8. **Verify against nix repl**: Outputs must match exactly

## Untested Builtins - WHAT NEEDS TESTING

**57 untested builtins remaining** (59% of runtime NOT validated)

### Task 1: Type Checking (9 untested) - 3-4 hours
**Why critical:** Used everywhere, fundamental to Nix
**Untested functions:**
- `isNull`, `isBool`, `isInt`, `isFloat`, `isString`, `isList`, `isPath`, `isAttrs`, `typeOf`

**Test file:** `main/tests/builtins_types_test.js`
**Required tests per function:** 5-8 tests (each type, null, nested values)
**Documentation:** https://nix.dev/manual/nix/2.18/language/builtins#builtins-isNull

### Task 2: List Operations (12 untested) - 6-8 hours
**Why critical:** Core functional programming, used in 80% of Nix code
**Untested functions:**
- `map` (MOST USED!), `filter` (2ND MOST!), `all`, `any`, `elem`, `elemAt`, `partition`, `sort`, `genList`, `concatLists`, `concatMap`, `groupBy`

**Test file:** `main/tests/builtins_lists_test.js`
**Required tests per function:** 8-10 tests (empty list, single item, complex predicates)
**Documentation:** https://nix.dev/manual/nix/2.18/language/builtins#builtins-map

### Task 3: Attrset Operations (8 untested) - 4-6 hours
**Why critical:** Attribute sets are the core data structure in Nix
**Untested functions:**
- `hasAttr` (CRITICAL!), `getAttr` (CRITICAL!), `attrNames`, `attrValues`, `catAttrs`, `listToAttrs`, `zipAttrsWith`, `genericClosure`

**Test file:** `main/tests/builtins_attrs_test.js`
**Required tests per function:** 6-8 tests (nested attrs, missing keys, empty sets)
**Documentation:** https://nix.dev/manual/nix/2.18/language/builtins#builtins-hasAttr

### Task 4: String Operations (3 untested) - 3-4 hours
**Why important:** String manipulation very common
**Untested functions:**
- `concatStringsSep`, `split`, `match`

**Test file:** `main/tests/builtins_strings_test.js`
**Required tests per function:** 6-8 tests (empty strings, unicode, regex patterns)
**Documentation:** https://nix.dev/manual/nix/2.18/language/builtins#builtins-split

### Task 5: Math & Comparison (5 untested) - 2-3 hours
**Why important:** Basic operations needed everywhere
**Untested functions:**
- `sub`, `mul`, `lessThan`, `ceil`, `floor`

**Test file:** `main/tests/builtins_math_test.js`
**Required tests per function:** 4-6 tests (BigInt, float, edge cases)
**Documentation:** https://nix.dev/manual/nix/2.18/language/builtins#builtins-sub

### Task 6: Path/File Operations (8 untested) - 4-6 hours
**Why important:** Build scripts use these heavily
**Untested functions:**
- `baseNameOf`, `dirOf`, `pathExists`, `readFile`, `readDir`, `readFileType`, `findFile`, `toPath`

**Test file:** `main/tests/builtins_path_ops_test.js`
**Required tests per function:** 5-7 tests (absolute/relative paths, missing files)
**Documentation:** https://nix.dev/manual/nix/2.18/language/builtins#builtins-baseNameOf

### Task 7: Control Flow (8 untested) - 2-3 hours
**Untested functions:**
- `throw`, `abort`, `seq`, `deepSeq`, `trace`, `traceVerbose`, `break`, `addErrorContext`

**Test file:** `main/tests/builtins_control_test.js`
**Documentation:** https://nix.dev/manual/nix/2.18/language/builtins#builtins-throw

### Task 8: Bitwise (3 untested) - 1-2 hours
**Untested functions:**
- `bitAnd`, `bitOr`, `bitXor`

**Test file:** `main/tests/builtins_bitwise_test.js`

### Task 9: Hashing & Context (6 untested) - 3-4 hours
**Untested functions:**
- `hashFile`, `hashString`, `getContext`, `hasContext`, `appendContext`, `unsafeDiscardStringContext`

**Test file:** `main/tests/builtins_hashing_test.js`

### Task 10: Remaining Functions (8 untested) - 3-4 hours
**Untested functions:**
- `derivationStrict`, `placeholder`, `toFile`, `storePath`, `outputOf`, `unsafeDiscardOutputDependency`, `splitVersion`, `unsafeGetAttrPos`, `getEnv`, `toXML`, `fromJSON`, `tryEval`

**Multiple test files needed**

**Total time to 80% coverage:** Tasks 1-6 = 22-31 hours
**Total time to 90% coverage:** Tasks 1-10 = 33-48 hours

## Test File Template (MANDATORY STRUCTURE)

**Every test file MUST:**
1. Import from runtime.js correctly
2. Use Deno.test() for each test case
3. Compare outputs against nix repl behavior
4. Test edge cases (null, empty, wrong types)
5. Have 5-10 tests minimum per builtin

**Template:**
```javascript
import { builtins } from "../runtime.js"
import { assertEquals, assertThrows } from "https://deno.land/std@0.220.0/assert/mod.ts"

// Test each builtin with normal + edge cases
Deno.test("builtins.isAttrs - basic cases", () => {
    assertEquals(builtins.isAttrs({}), true)
    assertEquals(builtins.isAttrs({a:1}), true)
})

Deno.test("builtins.isAttrs - edge cases", () => {
    assertEquals(builtins.isAttrs(null), false)
    assertEquals(builtins.isAttrs(undefined), false)
    assertEquals(builtins.isAttrs([]), false)
    assertEquals(builtins.isAttrs("string"), false)
})

// Compare against nix repl:
// nix-repl> builtins.isAttrs {}
// true
// nix-repl> builtins.isAttrs null
// false
```

**Run tests:**
```bash
./test.sh                    # All tests
./test.sh builtins_types     # Specific category
deno test --allow-all main/tests/builtins_types_test.js  # Direct
```

## Test Files Needed (DO NOT EXIST YET)

**Missing test files that MUST be created:**
- `main/tests/builtins_types_test.js` - NOT CREATED (Task 1)
- `main/tests/builtins_lists_test.js` - NOT CREATED (Task 2)
- `main/tests/builtins_attrs_test.js` - NOT CREATED (Task 3)
- `main/tests/builtins_strings_test.js` - NOT CREATED (Task 4)
- `main/tests/builtins_math_test.js` - NOT CREATED (Task 5)
- `main/tests/builtins_path_ops_test.js` - NOT CREATED (Task 6)
- `main/tests/builtins_control_test.js` - NOT CREATED (Task 7)
- `main/tests/builtins_bitwise_test.js` - NOT CREATED (Task 8)
- `main/tests/builtins_hashing_test.js` - NOT CREATED (Task 9)

## What Comes AFTER Runtime Testing (DO NOT START YET)

**DO NOT START these until runtime reaches 80% test coverage:**

### Phase 2: Translator Edge Cases (NOT STARTED)
**Remaining edge cases that need validation:**
- Nested pattern matching with @-patterns and ellipsis
- String escape sequences (verify all \x, \n, \t, etc.)
- Path literal edge cases (absolute vs relative)
- URI literals (may not be tested)
- Operator precedence comprehensive tests
- Multi-line string handling

**Estimated time:** 2-3 days

### Phase 3: nixpkgs.lib Expansion (NOT STARTED)
**Currently:** 10/41 files tested (24% coverage)
**Remaining:** 31 untested files

**Next files to test (in order):**
1. lists.nix - Core list functions
2. attrsets.nix - Attribute set utilities
3. options.nix - NixOS module options
4. meta.nix - Package metadata helpers
5. debug.nix - Debugging utilities
6. (26 more files...)

**Estimated time:** 4-6 days

### Phase 4: Optional Builtins (NOT STARTED, LOW PRIORITY)
**Not implemented, rarely used:**
- `fetchMercurial` - Mercurial support (2-3 days)
- `fetchClosure` - Binary cache (5-7 days, VERY COMPLEX)
- `getFlake` - Full flake system (5-7 days, VERY COMPLEX)

**Estimated time:** 12-17 days (only if needed)

## Quick Reference

**Run all tests:** `./test.sh`
**Run by category:** `./test.sh runtime`, `./test.sh translator`, `./test.sh derivation`
**Run specific:** `./test.sh builtins_types`

**Documentation:**
- Nix 2.18 builtins: https://nix.dev/manual/nix/2.18/language/builtins
- Test coverage analysis: BUILTIN_COVERAGE.md
- Test organization: TESTING.md
- Architecture: ARCHITECTURE.md

