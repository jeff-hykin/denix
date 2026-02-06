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
- [ ] Continue with remaining feasible FIXMEs
- [ ] Implement infrastructure-dependent FIXMEs

## Current Activity
✅ **MILESTONE REACHED**: 39 functions implemented (55% complete)
- All Phase 1 (Easy) complete: 26 functions
- All feasible Phase 2 (Medium) complete: 12 functions
- Phase 3 additions: 1 function (fromTOML)
- 60 tests created, all passing
- ✅ Removed deno.json, deno.lock, node_modules
- ✅ Replaced npm:lossless-json with custom BigInt JSON parser
- See IMPLEMENTATION_SUMMARY.md for full details

## Next Steps
Remaining items require major infrastructure:
- Store system (12 functions)
- Import/eval system (4 functions)
- Network fetchers (5 functions)
- String context system (5 functions)
- Flakes (4 functions)

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

### Tests Created:
- main/tests/simple_test.js (26 tests, all passing)
- main/tests/phase2_test.js (15 tests, all passing)
- main/tests/phase2b_test.js (12 tests, all passing)
- main/tests/fromtoml_standalone_test.js (7 tests, all passing)

**Total Implemented: 39 functions** (55% of all FIXMEs)
