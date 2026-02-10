# Denix Development Priorities

## Mission
Make runtime.js production-ready through comprehensive testing. All 97 Nix 2.18 builtins are implemented but only 41% are tested.

## Current Priority: Runtime Testing

**Status:** 97/97 builtins implemented, 40/97 tested (41% coverage)
**Goal:** Reach 80%+ coverage (77/97 tested)
**Estimated time:** 18-23 hours of focused testing

**DO NOT work on translator or nixpkgs.lib until runtime reaches 80% test coverage.**

## Testing Process

1. **Research in nix repl** - Test behavior with edge cases
2. **Read Nix 2.18 docs** - https://nix.dev/manual/nix/2.18/language/builtins
3. **Create test file** - Use `main/tests/builtins_CATEGORY_test.js` pattern
4. **Write 5-10 tests per function** - Normal cases, edge cases, errors
5. **Fix bugs found** - Expect bugs in untested code
6. **Run:** `./test.sh` or `./test.sh builtins_CATEGORY`

## Untested Builtins by Priority

See BUILTIN_COVERAGE.md for complete analysis. Key gaps:

**HIGH PRIORITY (37 builtins needed for 80% coverage):**
1. **Type checking (9):** isNull, isBool, isInt, isFloat, isString, isList, isPath, isAttrs, typeOf
2. **List ops (10):** map, filter, all, any, elem, elemAt, partition, sort, genList, concatLists
3. **Attrset ops (7):** hasAttr, getAttr, attrNames, attrValues, catAttrs, genericClosure, zipAttrsWith
4. **String ops (4):** split, match, concatStringsSep, toString
5. **Math (8):** sub, mul, lessThan, ceil, floor, bitAnd, bitOr, bitXor
6. **Path/File (8):** baseNameOf, dirOf, pathExists, readFile, readDir, readFileType, findFile, toPath

**MEDIUM PRIORITY (20 builtins for 90%+ coverage):**
7. **Control flow (4):** abort, addErrorContext, break, traceVerbose
8. **Derivations (7):** derivation, derivationStrict, placeholder, toFile, storePath, outputOf, unsafeDiscardOutputDependency
9. **Hashing (6):** hashFile, hashString, getContext, hasContext, appendContext, unsafeDiscardStringContext
10. **Misc (7):** getEnv, splitVersion, unsafeGetAttrPos, toXML, fetchMercurial, fetchClosure, getFlake

See BUILTIN_COVERAGE.md for detailed analysis of each category.

## Test File Organization

**Create these test files:**
- `main/tests/builtins_types_test.js` - Type checking (9 builtins)
- `main/tests/builtins_lists_test.js` - List operations (10 builtins)
- `main/tests/builtins_attrs_test.js` - Attrset operations (7 builtins)
- `main/tests/builtins_strings_test.js` - String operations (4 builtins)
- `main/tests/builtins_math_test.js` - Math & comparison (8 builtins)
- `main/tests/builtins_path_ops_test.js` - Path/file operations (8 builtins)
- (More as needed for remaining categories)

**Test structure template:**
```javascript
import { builtins } from "../runtime.js"
import { assertEquals, assertThrows } from "https://deno.land/std@0.220.0/assert/mod.ts"

Deno.test("builtins.isAttrs - basic cases", () => {
    assertEquals(builtins.isAttrs({}), true)
    assertEquals(builtins.isAttrs(null), false)
})
```

**Run tests:**
```bash
./test.sh                    # All tests
./test.sh builtins_types     # Specific category
deno test --allow-all main/tests/builtins_types_test.js  # Direct
```

## Next Steps After 80% Coverage

**DO NOT START until runtime reaches 80% test coverage:**

1. **Translator edge cases** - Nested patterns, escape sequences, URI literals
2. **nixpkgs.lib expansion** - Test 15+ more files from nixpkgs.lib (currently 10/41)
3. **Derivation edge cases** - Multiple outputs, complex env vars, passthru/meta

## Quick Reference

**Run all tests:** `./test.sh`
**Run by category:** `./test.sh runtime`, `./test.sh translator`, `./test.sh derivation`
**Run specific:** `./test.sh builtins_types`

**Documentation:**
- Nix 2.18 builtins: https://nix.dev/manual/nix/2.18/language/builtins
- Test coverage analysis: BUILTIN_COVERAGE.md
- Test organization: TESTING.md
- Architecture: ARCHITECTURE.md

