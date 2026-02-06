# Task: Implement FIXMEs in runtime.js

## Instructions Summary
1. Read runtime.js comments and FIXMEs
2. Research each FIXME using Nix documentation
3. Track progress in main/runtime.md (difficulty, dependencies, implementation status, testing status)
4. Implement FIXMEs starting with easiest
5. Create tests under main/tests/<name>.js using Deno with URL imports
6. Follow runtime.js style (minimal comments, only when needed for justification/clarification)
7. Continuously update this file and runtime.md

## Progress Status
- [x] Read runtime.js
- [x] Create prompt.md
- [x] Create runtime.md
- [x] Research FIXMEs and document in runtime.md
- [x] Implement Phase 1 (Easy FIXMEs) - 26 functions
- [x] Create and run tests - all passing
- [x] Implement Phase 2 (Medium FIXMEs) - 12 functions
- [x] Create and run Phase 2 tests - all passing
- [x] Remove npm dependencies - pure URL imports only
- [x] Implement fromTOML with @std/toml
- [x] Implement Phase 4 (Operators + Context + Store) - 13 functions
- [x] Create and run Phase 4 tests - all passing
- [ ] Implement infrastructure-dependent FIXMEs (fetchers, import, etc.)

## Current Activity
✅ **MILESTONE REACHED**: 57 functions implemented (80% complete)
- All Phase 1 (Easy) complete: 26 functions
- All feasible Phase 2 (Medium) complete: 14 functions (added operators.add, operators.subtract)
- Phase 3 additions: 1 function (fromTOML)
- Phase 4 additions: 11 functions (functionArgs, genericClosure, 5 context functions, 4 store functions)
- Phase 5 additions: 5 functions (toFile, findFile, derivationStrict, parseFlakeRef, flakeRefToString)
- 101+ tests created, all passing
- ✅ Removed deno.json, deno.lock, node_modules
- ✅ Replaced npm:lossless-json with custom BigInt JSON parser

## Next Steps
Remaining items require major infrastructure:
- Store system (2 functions: path, filterSource)
- Import/eval system (2 functions: import, scopedImport)
- Network fetchers (5 functions: fetchurl, fetchTarball, fetchGit, fetchMercurial, fetchTree)
- Flakes (1 function: getFlake - requires fetch)
- toJSON for paths (requires full store implementation)

## Completed Implementations

### Phase 1 - Easy (26 functions):
**Builtins:**
- trace, throw, seq, deepSeq, tryEval
- mapAttrs, removeAttrs, listToAttrs, intersectAttrs, concatMap
- groupBy, parseDrvName, compareVersions

**Operators:**
- negative, negate, listConcat, divide, multiply, merge
- and, or, implication
- greaterThan, lessThan, greaterThanOrEqual, lessThanOrEqual, hasAttr

### Phase 2 - Medium (12 functions):
**Builtins:**
- sort, split, toXML, readDir, readFileType
- traceVerbose, baseNameOf (fixed), dirOf (fixed)
- catAttrs, zipAttrsWith, attrNames (fixed)

**Operators:**
- equal (deep equality)

**Other:**
- nixRepr (improved)

### Phase 3 - Additional Features (1 function):
**Builtins:**
- fromTOML (with @std/toml, converts ints to BigInt)

**Infrastructure:**
- Removed npm dependencies (replaced npm:lossless-json)
- Pure Deno URL imports only

### Phase 4 - Operators + Context + Store (13 functions):
**Operators:**
- add (number/string/path concatenation)
- subtract (numeric subtraction)

**Builtins:**
- functionArgs (function introspection)
- genericClosure (graph closure algorithm)
- nixPath, storeDir, storePath, placeholder (store functions)
- getContext, hasContext, appendContext, addErrorContext, unsafeDiscardStringContext (context functions - simplified)
- unsafeDiscardOutputDependency, unsafeGetAttrPos (utility functions)

### Tests Created:
- main/tests/simple_test.js (26 tests, all passing)
- main/tests/phase2_test.js (15 tests, all passing)
- main/tests/phase2b_test.js (12 tests, all passing)
- main/tests/fromtoml_standalone_test.js (7 tests, all passing)
- main/tests/phase3_standalone_test.js (14 tests, all passing)

**Total Implemented: 57 functions** (80% of all FIXMEs)
