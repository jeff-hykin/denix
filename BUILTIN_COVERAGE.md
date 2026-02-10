# Builtin Coverage Analysis

**Generated:** 2026-02-10
**Status:** 114/118 builtins implemented (96.6%), 28/114 tested (24.6%)

## Summary

- **Total Nix 2.18 builtins:** 118
- **Implemented in runtime.js:** 114 (96.6%)
- **Missing from implementation:** 4 (3.4%)
- **Tested builtins:** 28 (24.6% of implemented)
- **Untested builtins:** 86 (75.4% of implemented)
- **Constants (not functions):** 7

## Missing Builtins (Not Implemented)

These 4 builtins are completely missing from `main/runtime.js`:

1. **`foldl'`** - Strict left fold (commonly used, HIGH PRIORITY)
2. **`warn`** - Deprecation warnings (commonly used, HIGH PRIORITY)
3. **`convertHash`** - Hash format conversion utility (MEDIUM PRIORITY)
4. **`addDrvOutputDependencies`** - May not exist in Nix 2.18, needs research (LOW PRIORITY)

**Estimated implementation time:** 2-3 hours for foldl', warn, convertHash

## Tested Builtins (28)

These builtins have dedicated tests:

| Builtin | Test File(s) |
|---------|-------------|
| `add` | import_integration_test.js |
| `compareVersions` | nixpkgs_lib_files_test.js |
| `div` | nixpkgs_trivial_test.js |
| `fetchClosure` | nix218_builtins_test.js (stub only) |
| `fetchGit` | builtins_fetchgit_test.js |
| `fetchTarball` | builtins_fetchtarball_test.js |
| `fetchTree` | builtins_fetchtree_test.js |
| `fetchurl` | builtins_fetchurl_test.js |
| `filterSource` | builtins_filtersource_test.js |
| `flakeRefToString` | nixpkgs_lib_files_test.js |
| `fromTOML` | fromtoml_test.js |
| `functionArgs` | nixpkgs_lib_files_test.js |
| `head` | nixpkgs_lib_files_test.js |
| `import` | import_integration_test.js |
| `intersectAttrs` | nixpkgs_lib_files_test.js |
| `isFunction` | nixpkgs_trivial_test.js |
| `length` | import_loader_test.js |
| `mapAttrs` | nixpkgs_lib_files_test.js |
| `optionalAttrs` | nixpkgs_lib_files_test.js |
| `parseFlakeRef` | nixpkgs_lib_files_test.js |
| `path` | builtins_path_test.js |
| `removeAttrs` | nixpkgs_lib_files_test.js |
| `replaceStrings` | import_e2e_test.js |
| `scopedImport` | import_integration_test.js |
| `stringLength` | nixpkgs_trivial_test.js |
| `substring` | nixpkgs_trivial_test.js, nixpkgs_lib_files_test.js |
| `tail` | nixpkgs_lib_files_test.js |
| `toJSON` | builtins_tojson_path_test.js, builtins_fetchurl_test.js, builtins_filtersource_test.js, builtins_path_test.js |

## Untested Builtins by Category

### Type Checking (9 untested, 10% coverage)
- ✗ `isNull`
- ✗ `isBool`
- ✗ `isInt`
- ✗ `isFloat`
- ✗ `isPath`
- ✗ `isString`
- ✗ `isList`
- ✗ `isAttrs`
- ✗ `typeOf`

**Priority:** HIGH - These are fundamental type checking functions used extensively

### Math (5 untested, 29% coverage)
- ✗ `sub`
- ✗ `mul`
- ✗ `lessThan`
- ✗ `ceil`
- ✗ `floor`

**Priority:** MEDIUM - Basic math operations, likely work but need verification

### Bitwise (3 untested, 0% coverage)
- ✗ `bitAnd`
- ✗ `bitOr`
- ✗ `bitXor`

**Priority:** LOW - Rarely used in typical Nix code

### String Operations (3 untested, 57% coverage)
- ✗ `concatStringsSep`
- ✗ `split`
- ✗ `match`

**Priority:** HIGH - String operations are very common in Nix

### List Operations (12 untested, 20% coverage)
- ✗ `elem`
- ✗ `elemAt`
- ✗ `filter`
- ✗ `map`
- ✗ `concatLists`
- ✗ `concatMap`
- ✗ `genList`
- ✗ `sort`
- ✗ `partition`
- ✗ `all`
- ✗ `any`
- ✗ `groupBy`

**Priority:** HIGH - List operations are core to Nix programming

### Attrset Operations (8 untested, 33% coverage)
- ✗ `attrNames`
- ✗ `attrValues`
- ✗ `hasAttr`
- ✗ `getAttr`
- ✗ `catAttrs`
- ✗ `listToAttrs`
- ✗ `zipAttrsWith`
- ✗ `genericClosure`

**Priority:** HIGH - Attribute set manipulation is fundamental to Nix

### Path/File Operations (8 untested, 0% coverage)
- ✗ `baseNameOf`
- ✗ `dirOf`
- ✗ `pathExists`
- ✗ `readFile`
- ✗ `readDir`
- ✗ `readFileType`
- ✗ `findFile`
- ✗ `toPath`

**Priority:** HIGH - File operations are common in build scripts

### Serialization (3 untested, 50% coverage)
- ✗ `toXML`
- ✗ `toPath`
- ✗ `fromJSON`

**Priority:** MEDIUM - toXML rarely used, fromJSON/toPath more common

### Import/Eval (1 untested, 67% coverage)
- ✗ `tryEval`

**Priority:** MEDIUM - Used for error handling in advanced Nix code

### Derivations (8 untested, 0% coverage)
- ✗ `derivation`
- ✗ `derivationStrict`
- ✗ `placeholder`
- ✗ `toFile`
- ✗ `storePath`
- ✗ `outputOf`
- ✗ `parseDrvName`
- ✗ `unsafeDiscardOutputDependency`

**Priority:** MEDIUM - Derivation tests exist but don't cover all builtins

### Fetch Operations (2 untested, 78% coverage)
- ✗ `fetchMercurial` (stubbed, throws NotImplemented)
- ✗ `getFlake` (stubbed, throws NotImplemented)

**Priority:** LOW - Experimental/optional features

### Hashing (2 untested, 0% coverage)
- ✗ `hashFile`
- ✗ `hashString`

**Priority:** MEDIUM - Hashing functions are used in advanced scenarios

### String Context (4 untested, 0% coverage)
- ✗ `getContext`
- ✗ `hasContext`
- ✗ `appendContext`
- ✗ `unsafeDiscardStringContext`

**Priority:** LOW - String context is advanced/internal feature

### Control Flow (8 untested, 0% coverage)
- ✗ `throw`
- ✗ `abort`
- ✗ `seq`
- ✗ `deepSeq`
- ✗ `trace`
- ✗ `traceVerbose`
- ✗ `break`
- ✗ `addErrorContext`

**Priority:** HIGH - throw/trace are commonly used for debugging

### Versioning (1 untested, 50% coverage)
- ✗ `splitVersion`

**Priority:** MEDIUM - Version parsing is common in package management

### Meta (2 untested, 33% coverage)
- ✗ `unsafeGetAttrPos`
- ✗ `getEnv`

**Priority:** LOW - Meta-programming features, less common

### Flakes (0 untested, 100% coverage)
All flake-related builtins are tested! ✓

## Test Coverage by Category

| Category | Coverage | Tested | Total |
|----------|----------|--------|-------|
| Bitwise | 0% | 0 | 3 |
| Path/File Operations | 0% | 0 | 8 |
| Derivations | 0% | 0 | 8 |
| Hashing | 0% | 0 | 2 |
| String Context | 0% | 0 | 4 |
| Control Flow | 0% | 0 | 8 |
| Type Checking | 10% | 1 | 10 |
| List Operations | 20% | 3 | 15 |
| Math | 29% | 2 | 7 |
| Attrset Operations | 33% | 4 | 12 |
| Meta | 33% | 1 | 3 |
| Serialization | 50% | 3 | 6 |
| Versioning | 50% | 1 | 2 |
| String Operations | 57% | 4 | 7 |
| Import/Eval | 67% | 2 | 3 |
| Fetch Operations | 78% | 7 | 9 |
| **Flakes** | **100%** | **2** | **2** |

## High Priority Untested Builtins

These are commonly used builtins that should be tested ASAP:

### NOT IMPLEMENTED (must implement first!)
- ⚠ **`foldl'`** - Strict left fold
- ⚠ **`warn`** - Deprecation warnings
- ⚠ **`convertHash`** - Hash format conversion

### IMPLEMENTED BUT UNTESTED
- `all` - Check if all list elements match predicate
- `any` - Check if any list element matches predicate
- `attrNames` - Get attribute set keys
- `attrValues` - Get attribute set values
- `catAttrs` - Collect specific attribute from list of sets
- `concatLists` - Flatten list of lists
- `concatMap` - Map then flatten
- `elem` - Check if element is in list
- `filter` - Filter list by predicate
- `genList` - Generate list from function
- `getAttr` - Get attribute from set
- `hasAttr` - Check if attribute exists
- `listToAttrs` - Convert list to attribute set
- `map` - Map function over list
- `match` - Regex matching
- `partition` - Split list into matching/non-matching
- `sort` - Sort list
- `split` - Split string by regex
- `throw` - Throw error
- `trace` - Debug logging

## Recommended Testing Priorities

### Priority 0: Implement Missing Builtins (2-3 hours)
1. Implement `foldl'` (30-45 min)
2. Implement `warn` (30 min)
3. Implement `convertHash` (45-60 min)
4. Research `addDrvOutputDependencies` (15 min)

### Priority 1: Core Operations (1-2 days)
Create test files for the most commonly used builtins:
- `main/tests/builtins_type_test.js` - All type checking functions
- `main/tests/builtins_list_test.js` - List operations (map, filter, fold, etc.)
- `main/tests/builtins_attrset_test.js` - Attribute set operations
- `main/tests/builtins_string_test.js` - String operations
- `main/tests/builtins_math_test.js` - Math operations

### Priority 2: File/Path Operations (2-3 days)
- `main/tests/builtins_path_ops_test.js` - Path manipulation
- `main/tests/builtins_file_test.js` - File reading/writing

### Priority 3: Control Flow & Debugging (1 day)
- `main/tests/builtins_control_test.js` - throw, trace, seq, deepSeq

### Priority 4: Advanced Features (1-2 days)
- `main/tests/builtins_hash_test.js` - Hashing functions
- `main/tests/builtins_context_test.js` - String context operations
- `main/tests/builtins_derivation_complete_test.js` - All derivation builtins

## Test File Gaps

The following test files don't exist but should:

- `main/tests/builtins_type_test.js` - Type checking functions
- `main/tests/builtins_list_test.js` - List operations
- `main/tests/builtins_attrset_test.js` - Attribute set operations
- `main/tests/builtins_string_test.js` - String operations
- `main/tests/builtins_math_test.js` - Math operations
- `main/tests/builtins_path_ops_test.js` - Path manipulation
- `main/tests/builtins_file_test.js` - File operations
- `main/tests/builtins_control_test.js` - Control flow
- `main/tests/builtins_hash_test.js` - Hashing
- `main/tests/builtins_context_test.js` - String context
- `main/tests/builtins_derivation_complete_test.js` - All derivation builtins

## Notes

- **Derivation tests exist** but only test high-level `derivation` function, not individual derivation-related builtins
- **nixpkgs.lib tests** indirectly test many builtins but not comprehensively
- **Translator tests** focus on syntax translation, not runtime behavior
- **Import tests** are comprehensive and well-structured (good model for other tests)
- **Fetch tests** are comprehensive and well-structured (good model for other tests)

## Conclusion

The runtime is **96.6% complete** in terms of implementation (114/118 builtins), but only **24.6% tested** (28/114 builtins). The biggest gaps are:

1. **4 builtins completely missing** (foldl', warn, convertHash, addDrvOutputDependencies)
2. **Type checking functions** (0% coverage) - fundamental operations
3. **List operations** (20% coverage) - core functional programming primitives
4. **Attribute set operations** (33% coverage) - essential for Nix
5. **Path/file operations** (0% coverage) - common in build scripts
6. **Control flow** (0% coverage) - debugging and error handling

**Recommended next steps:**
1. Implement the 4 missing builtins (2-3 hours)
2. Create comprehensive test files for high-priority categories (3-5 days)
3. Aim for 80%+ test coverage (1-2 weeks total)
