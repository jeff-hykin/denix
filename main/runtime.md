# Runtime FIXME Tracking

## Summary from runtime.js Top Comments

**Hard parts identified:**
- builtins.fetchGit
- builtins.sort
- operators.equality
- builtins.fromTOML
- builtins.fetchMercurial
- create the value-to-env-var function for derivations

## FIXME Categories by Difficulty

### EASY (Can implement immediately)

| Line | Function | Status | Tested | Notes |
|------|----------|--------|--------|-------|
| 543 | `builtins.trace` | ✅ DONE | ✅ | Prints e1 to stderr, returns e2. Simple pass-through. |
| 549 | `builtins.throw` | ✅ DONE | ✅ | Throws catchable error. Similar to abort but can be caught by tryEval. |
| 546 | `builtins.seq` | ✅ DONE | ✅ | Forces evaluation of e1, returns e2. Simple wrapper. |
| 547 | `builtins.deepSeq` | ✅ DONE | ✅ | Like seq but deep evaluation. Needs recursive traversal. |
| 545 | `builtins.tryEval` | ✅ DONE | ✅ | Catches throw/assert errors, returns {success, value}. |
| 506 | `builtins.mapAttrs` | ✅ DONE | ✅ | Map function over attribute set with name+value. |
| 507 | `builtins.removeAttrs` | ✅ DONE | ✅ | Remove named attributes from set. |
| 505 | `builtins.listToAttrs` | ✅ DONE | ✅ | Convert [{name, value}...] to attrset. |
| 504 | `builtins.intersectAttrs` | ✅ DONE | ✅ | Keep only attrs from e2 whose names are in e1. |
| 502 | `builtins.concatMap` | ✅ DONE | ✅ | Map then flatten. Equivalent to concatLists(map f list). |
| 656 | `operators.listConcat` | ✅ DONE | ✅ | List concatenation (++). Use .concat(). |
| 655 | `operators.negative` | ✅ DONE | ✅ | Numeric negation (-a). |
| 666 | `operators.negate` | ✅ DONE | ✅ | Boolean negation (!a). |
| 677 | `operators.and` | ✅ DONE | ✅ | Boolean and (a && b). |
| 678 | `operators.or` | ✅ DONE | ✅ | Boolean or (a \|\| b). |
| 679 | `operators.implication` | ✅ DONE | ✅ | Boolean implication (a -> b). Equivalent to !a \|\| b. |
| 672 | `operators.notEqual` | ✅ DONE | ✅ | Inequality (a != b). Opposite of equal. |
| 673 | `operators.greaterThan` | ✅ DONE | ✅ | Greater than (a > b). |
| 674 | `operators.greaterThanOrEqual` | ✅ DONE | ✅ | Greater or equal (a >= b). |
| 675 | `operators.lessThan` | ✅ DONE | ✅ | Less than (a < b). |
| 676 | `operators.lessThanOrEqual` | ✅ DONE | ✅ | Less or equal (a <= b). |
| 631 | `builtins.parseDrvName` | ✅ DONE | ✅ | Split "name-version" into {name, version}. |
| 632 | `builtins.compareVersions` | ✅ DONE | ✅ | Compare version strings, return -1/0/1. |

### MEDIUM (Require more implementation work)

| Line | Function | Status | Tested | Notes |
|------|----------|--------|--------|-------|
| 481 | `builtins.groupBy` | ✅ DONE | ✅ | Group list by key function. Returns {key: [elements]}. |
| 480 | `builtins.sort` | ✅ DONE | ✅ | Sort with comparator. Stable sort using JS Array.sort. |
| 386 | `builtins.split` | ✅ DONE | ✅ | Regex split with capture groups. Returns alternating strings/groups. |
| 323 | `builtins.toXML` | ✅ DONE | ✅ | Convert to XML string. Full XML serialization implemented. |
| 563 | `builtins.readDir` | ✅ DONE | ⬜ | Return {name: type} for directory contents. Uses Deno.readDirSync. |
| 557 | `builtins.toFile` | ✅ DONE | ✅ | Computes correct store path (doesn't write file). |
| 558 | `builtins.readFileType` | ✅ DONE | ⬜ | Get file type. Uses Deno.statSync. |
| 104 | `nixRepr` | ✅ DONE | ⬜ | Improved string escaping. |
| 554 | `builtins.baseNameOf` | ✅ DONE | ⬜ | Added derivation handling and type checking. |
| 555 | `builtins.dirOf` | ✅ DONE | ⬜ | Added derivation handling and type checking. |
| 980 | `operators.add` | ✅ DONE | ✅ | Addition with int/float/string/path handling. |
| 986 | `operators.subtract` | ✅ DONE | ✅ | Subtraction with proper int/float handling. |
| 664 | `operators.divide` | ✅ DONE | ✅ | Division with proper int/float handling. |
| 665 | `operators.multiply` | ✅ DONE | ✅ | Multiplication with proper int/float handling. |
| 667 | `operators.merge` | ✅ DONE | ✅ | Attribute set merge (a // b). Right-biased merge. |
| 680 | `operators.hasAttr` | ✅ DONE | ✅ | Check attribute existence (a ? b). |
| 493 | `builtins.attrNames` | ✅ DONE | ✅ | Fixed .sorted() to .sort(). JS lexicographic sort matches Nix. |
| 495 | `builtins.catAttrs` | ✅ DONE | ✅ | Collect values of named attribute from list of attrsets. |
| 503 | `builtins.zipAttrsWith` | ✅ DONE | ✅ | Merge attrsets with function applied to collected values. |

### HARD (Complex or have major dependencies)

| Line | Function | Status | Tested | Prerequisites | Notes |
|------|----------|--------|--------|---------------|-------|
| 670 | `operators.equal` | ✅ DONE | ⬜ | - | Deep equality with recursive comparison for lists and attrsets. |
| 331 | `builtins.fromTOML` | ✅ DONE | ✅ | - | Uses @std/toml, converts ints to BigInt. |
| 285 | `builtins.toJSON` for paths | ⬜ TODO | ⬜ | Store system | Hash file, create store entry, return path. |
| 530 | `builtins.fetchurl` | ⬜ TODO | ⬜ | Network, Store | Fetch URL to store. Not available in restricted mode. |
| 531 | `builtins.fetchTarball` | ⬜ TODO | ⬜ | Network, Store | Fetch and extract tarball. |
| 532 | `builtins.fetchGit` | ⬜ TODO | ⬜ | Git binary, Store | Clone git repo. **Marked as hard in comments.** |
| 533 | `builtins.fetchMercurial` | ⬜ TODO | ⬜ | Hg binary, Store | Clone hg repo. **Marked as hard in comments.** |
| 534 | `builtins.fetchTree` | ⬜ TODO | ⬜ | Store | Experimental feature. |
| 537 | `builtins.import` | ⬜ TODO | ⬜ | Parser, Evaluator | Parse and evaluate .nix file. |
| 538 | `builtins.scopedImport` | ⬜ TODO | ⬜ | import | Import with custom scope. |
| 539 | `builtins.functionArgs` | ✅ DONE | ✅ | - | Introspect function arguments. Returns __functionArgs metadata or {}. |
| 559 | `builtins.path` | ⬜ TODO | ⬜ | Store | Copy path to store with options. Complex. |
| 567 | `builtins.findFile` | ✅ DONE | ✅ | - | Search NIX_PATH-style list with prefix support. |
| 796 | `builtins.nixPath` | ✅ DONE | ✅ | - | Return NIX_PATH value as list of {prefix, path}. |
| 797 | `builtins.storeDir` | ✅ DONE | ✅ | - | Return store directory path (/nix/store). |
| 798 | `builtins.storePath` | ✅ DONE | ✅ | - | Validate store path format. |
| 608 | `builtins.derivation` | ✅ DONE | ✅ | Store, Builder | Create derivation. **Fully working with correct store paths!** |
| 630 | `builtins.derivationStrict` | ✅ DONE | ✅ | derivation | Same as derivation (historical difference removed). |
| 633 | `builtins.getFlake` | ⬜ TODO | ⬜ | Flakes | Flake support. |
| 634 | `builtins.parseFlakeRef` | ⬜ TODO | ⬜ | Flakes | Parse flake reference. |
| 954 | `builtins.placeholder` | ✅ DONE | ✅ | - | Placeholder for output paths. Generates deterministic hash. |
| 957 | `builtins.addErrorContext` | ✅ DONE | ✅ | - | Add context to errors. Simplified (no context tracking). |
| 958 | `builtins.appendContext` | ✅ DONE | ✅ | - | String context manipulation. Simplified (no context tracking). |
| 959 | `builtins.getContext` | ✅ DONE | ✅ | - | Get string context. Returns {} (no context tracking). |
| 960 | `builtins.hasContext` | ✅ DONE | ✅ | - | Check for string context. Returns false (no context tracking). |
| 961 | `builtins.unsafeDiscardStringContext` | ✅ DONE | ✅ | - | Remove string context. Returns string (no context tracking). |
| 645 | `builtins.filterSource` | ⬜ TODO | ⬜ | Store | Filtered copy to store. |
| 646 | `builtins.flakeRefToString` | ⬜ TODO | ⬜ | Flakes | Convert flake ref to string. |
| 966 | `builtins.genericClosure` | ✅ DONE | ✅ | - | Generic graph closure. BFS algorithm with deduplication. |
| 967 | `builtins.unsafeDiscardOutputDependency` | ✅ DONE | ✅ | - | Discard output deps. Simplified (no context tracking). |
| 968 | `builtins.unsafeGetAttrPos` | ✅ DONE | ✅ | AST tracking | Get attribute source position. Returns null (no AST tracking). |
| 544 | `builtins.traceVerbose` | ✅ DONE | ⬜ | trace | Like trace but checks NIX_TRACE_VERBOSE env var. |

## Implementation Priority

1. **Phase 1**: Easy operators and simple builtins
   - All EASY category items

2. **Phase 2**: Medium complexity items
   - Items that don't depend on store system

3. **Phase 3**: Store-dependent features
   - toFile, readDir, readFileType, etc.

4. **Phase 4**: Complex features
   - import, derivation, fetch* functions

## Test Files Created

- `main/tests/simple_test.js` - Phase 1 test suite (26 tests, all passing)
- `main/tests/phase2_test.js` - Phase 2 test suite (15 tests, all passing)
- `main/tests/phase2b_test.js` - Phase 2b test suite (12 tests, all passing)
- `main/tests/fromtoml_standalone_test.js` - TOML parser test suite (7 tests, all passing)
- `main/tests/builtins_eval_control.js` - Evaluation control tests (blocked by prex WASM issue)
- `main/tests/builtins_attrs.js` - Attribute set tests (blocked by prex WASM issue)
- `main/tests/builtins_list.js` - List helper tests (blocked by prex WASM issue)
- `main/tests/operators.js` - Operator tests (blocked by prex WASM issue)
- `main/tests/builtins_version.js` - Version tests (blocked by prex WASM issue)

## Implementation Statistics

- **Total FIXMEs identified:** ~71
- **Implemented:** 52 (73%)
- **Remaining Easy/Medium:** 0
- **Remaining Hard:** ~19 (mostly store/fetcher/import/flake related)

## Recent Additions

### Phase 4 (Operators + Context + Store Functions)
- **operators.add**: Addition with int/float/string/path handling
- **operators.subtract**: Subtraction with int/float handling
- **builtins.functionArgs**: Function introspection with __functionArgs metadata
- **builtins.genericClosure**: Graph closure algorithm with BFS and deduplication
- **Context functions**: Simplified implementations (getContext, hasContext, appendContext, addErrorContext, unsafeDiscardStringContext, unsafeDiscardOutputDependency)
- **Store functions**: Basic implementations (nixPath, storeDir, storePath, placeholder, unsafeGetAttrPos)

### Phase 3 (Infrastructure Cleanup + New Features)
- **fromTOML**: TOML parser with BigInt conversion (uses @std/toml)
- **JSON parser**: Replaced npm:lossless-json with pure URL imports
- **Cleanup**: Removed deno.json, deno.lock, node_modules - pure Deno URL imports only

### Phase 2b
- catAttrs: Collect attribute values from list of attrsets
- zipAttrsWith: Merge attrsets with function
- attrNames: Fixed sorting (was calling non-existent .sorted())
- operators.equal: Deep equality with tests for lists and attrsets

## Notes

- **73% Complete**: All feasible functions without major infrastructure are now implemented!
- Many remaining items require a full Nix store implementation (toFile, path, filterSource)
- Context functions implemented in simplified form (no context tracking, but functional)
- Flake support is relatively modern and may be lower priority (3 functions)
- Import/eval system critical for full Nix functionality (2 functions)
- Network fetchers blocked on network + store implementation (5 functions)
- Test infrastructure works around prex WASM issue using standalone tests
