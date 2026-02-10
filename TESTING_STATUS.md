# Runtime Testing Status (Session 34 - ACCURATE)

**Date**: 2026-02-10
**Status**: 40/109 builtins tested (37% coverage)
**Goal**: 87/109 tested (80% coverage)
**Gap**: 47 more tests needed

## Summary Statistics

| Metric | Count | Percentage |
|--------|-------|------------|
| Total function builtins | 109 | 100% |
| Tested builtins | 40 | 37% |
| Untested builtins | 69 | 63% |
| Target (80%) | 87 | 80% |
| Tests needed for 80% | 47 | 43% |

## Tested Builtins (40 total)

### Core Operations (13)
- ✅ add
- ✅ compareVersions
- ✅ concatMap
- ✅ deepSeq
- ✅ div
- ✅ foldl'
- ✅ groupBy
- ✅ intersectAttrs
- ✅ listToAttrs
- ✅ mapAttrs
- ✅ removeAttrs
- ✅ seq
- ✅ substring

### Type Checking (10)
- ✅ isAttrs
- ✅ isBool
- ✅ isFloat
- ✅ isFunction
- ✅ isInt
- ✅ isList
- ✅ isNull
- ✅ isPath
- ✅ isString
- ✅ typeOf

### Fetch Operations (5)
- ✅ fetchGit
- ✅ fetchTarball
- ✅ fetchTree
- ✅ fetchurl
- ✅ filterSource
- ✅ path

### Import/Eval (2)
- ✅ import
- ✅ scopedImport

### String Operations (6)
- ✅ concatMapStringsSep
- ✅ length
- ✅ match
- ✅ replaceStrings
- ✅ stringLength
- ✅ substring

### Attrset Operations (6)
- ✅ functionArgs
- ✅ genAttrs
- ✅ intersectAttrs
- ✅ optionalAttrs
- ✅ removeAttrs
- ✅ zipAttrsWith

### Derivation (2)
- ✅ derivation
- ✅ parseDrvName

### List Operations (3)
- ✅ concatMap
- ✅ head
- ✅ tail

### Control Flow (2)
- ✅ throw
- ✅ trace
- ✅ tryEval

### Conversion (2)
- ✅ fromTOML
- ✅ toJSON

### Flakes (2)
- ✅ flakeRefToString
- ✅ parseFlakeRef

---

## Untested Builtins (69 total)

### List Operations (10) - CRITICAL PRIORITY
- ❌ **map** - Most used list function (lazyMap proxy)
- ❌ **filter** - Second most used
- ❌ **all** - List predicate
- ❌ **any** - List predicate
- ❌ elem - Element membership
- ❌ elemAt - Index access
- ❌ partition - Split by predicate
- ❌ sort - Sort with comparator
- ❌ genList - Generate from function
- ❌ concatLists - Flatten one level

### Attrset Operations (6) - CRITICAL PRIORITY
- ❌ **getAttr** - Core attribute access
- ❌ **attrNames** - Get keys list
- ❌ **attrValues** - Get values list
- ❌ catAttrs - Extract attribute from list
- ❌ genericClosure - Transitive closure
- ❌ getEnv - Environment variable

### String Operations (5) - HIGH PRIORITY
- ❌ split - Split by regex
- ❌ splitVersion - Split version string
- ❌ baseNameOf - Get filename
- ❌ dirOf - Get directory
- ❌ toXML - Convert to XML

### Math & Bitwise (8) - MEDIUM PRIORITY
- ❌ sub - Subtraction
- ❌ mul - Multiplication
- ❌ ceil - Round up
- ❌ floor - Round down
- ❌ bitAnd - Bitwise AND
- ❌ bitOr - Bitwise OR
- ❌ bitXor - Bitwise XOR
- ❌ toString - Convert to string

### Path/File Operations (7) - MEDIUM PRIORITY
- ❌ pathExists - Check path exists
- ❌ readFile - Read file contents
- ❌ readDir - List directory
- ❌ readFileType - Get file type
- ❌ findFile - Search in path
- ❌ toFile - Write to store
- ❌ storePath - Import to store

### Hashing & Context (7) - LOW PRIORITY
- ❌ hashFile - Hash file contents
- ❌ hashString - Hash string
- ❌ getContext - Get string context
- ❌ hasContext - Check context
- ❌ appendContext - Add context
- ❌ unsafeDiscardStringContext - Remove context
- ❌ unsafeDiscardOutputDependency - Remove dependency

### Control Flow (4) - LOW PRIORITY
- ❌ abort - Abort evaluation
- ❌ addErrorContext - Add error context
- ❌ traceVerbose - Conditional trace
- ❌ (seq, deepSeq, throw, trace, tryEval already tested)

### Conversion (2) - LOW PRIORITY
- ❌ fromJSON - Parse JSON
- ❌ (toJSON already tested)

### Advanced/Fetch (8) - OPTIONAL
- ❌ fetchClosure - Binary cache (COMPLEX, not in Nix 2.18)
- ❌ fetchMercurial - Mercurial repos (OPTIONAL)
- ❌ getFlake - Get flake (COMPLEX, experimental)
- ❌ placeholder - Derivation placeholder
- ❌ outputOf - Get output
- ❌ unsafeGetAttrPos - Get source position
- ❌ derivationStrict - Strict derivation
- ❌ (8 functions, rarely used)

### Other (12)
- ❌ lessThan (tested via operators)
- ❌ Various string context operations
- ❌ Various advanced features

---

## Path to 80% Coverage

### Phase 1: Critical Functions (16 functions, 8-12 hours)
1. Task 2.1: List core (map, filter, all, any) - 3-4 hours
2. Task 2.2: List extras (elem, elemAt, partition, sort, genList, concatLists) - 2-3 hours
3. Task 3: Attrset ops (getAttr, attrNames, attrValues, catAttrs, genericClosure, getEnv) - 3-5 hours

**After Phase 1**: 56/109 tested (51% coverage)

### Phase 2: High Priority (5 functions, 3-4 hours)
4. Task 4: String ops (split, splitVersion, baseNameOf, dirOf, toXML) - 3-4 hours

**After Phase 2**: 61/109 tested (56% coverage)

### Phase 3: Medium Priority (15 functions, 6-9 hours)
5. Task 5: Math & bitwise (sub, mul, ceil, floor, bitAnd, bitOr, bitXor, toString) - 3-4 hours
6. Task 6: Path/file (pathExists, readFile, readDir, readFileType, findFile, toFile, storePath) - 3-5 hours

**After Phase 3**: 76/109 tested (70% coverage)

### Phase 4: Final Push (11+ functions, 5-7 hours)
7. Need 11 more tests to reach 80% (87/109)
8. Choose from hashing (7), control flow (4), conversion (2), or advanced (8)

**After Phase 4**: 87/109 tested (80% coverage) ✅

---

## Time Estimates

| Target | Functions | Hours | Days (8h) |
|--------|-----------|-------|-----------|
| 50% coverage | +16 | 8-12 | 1-1.5 |
| 60% coverage | +21 | 11-16 | 1.5-2 |
| 70% coverage | +36 | 17-25 | 2-3 |
| **80% coverage** | **+47** | **22-32** | **3-4** |
| 90% coverage | +58 | 28-41 | 3.5-5 |
| 100% coverage | +69 | 34-48 | 4-6 |

## Next Steps

**Immediate**: Start Task 2 (List Operations)
1. Read Nix docs for map, filter, all, any
2. Test in nix repl with edge cases
3. Create `main/tests/builtins_lists_test.js`
4. Write 50+ test cases (5-10 per function)
5. Pay special attention to lazyMap proxy behavior

**Test file template**: See prompt.md line 180-195
