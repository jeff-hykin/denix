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
| 557 | `builtins.toFile` | ⬜ TODO | ⬜ | Write to nix store. Need store path generation. |
| 558 | `builtins.readFileType` | ✅ DONE | ⬜ | Get file type. Uses Deno.statSync. |
| 104 | `nixRepr` | ✅ DONE | ⬜ | Improved string escaping. |
| 554 | `builtins.baseNameOf` | ✅ DONE | ⬜ | Added derivation handling and type checking. |
| 555 | `builtins.dirOf` | ✅ DONE | ⬜ | Added derivation handling and type checking. |
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
| 331 | `builtins.fromTOML` | ⬜ TODO | ⬜ | TOML parser | Parse plain ints to BigInt. **Marked as hard in comments.** |
| 285 | `builtins.toJSON` for paths | ⬜ TODO | ⬜ | Store system | Hash file, create store entry, return path. |
| 530 | `builtins.fetchurl` | ⬜ TODO | ⬜ | Network, Store | Fetch URL to store. Not available in restricted mode. |
| 531 | `builtins.fetchTarball` | ⬜ TODO | ⬜ | Network, Store | Fetch and extract tarball. |
| 532 | `builtins.fetchGit` | ⬜ TODO | ⬜ | Git binary, Store | Clone git repo. **Marked as hard in comments.** |
| 533 | `builtins.fetchMercurial` | ⬜ TODO | ⬜ | Hg binary, Store | Clone hg repo. **Marked as hard in comments.** |
| 534 | `builtins.fetchTree` | ⬜ TODO | ⬜ | Store | Experimental feature. |
| 537 | `builtins.import` | ⬜ TODO | ⬜ | Parser, Evaluator | Parse and evaluate .nix file. |
| 538 | `builtins.scopedImport` | ⬜ TODO | ⬜ | import | Import with custom scope. |
| 539 | `builtins.functionArgs` | ⬜ TODO | ⬜ | - | Introspect function arguments. |
| 559 | `builtins.path` | ⬜ TODO | ⬜ | Store | Copy path to store with options. Complex. |
| 567 | `builtins.findFile` | ⬜ TODO | ⬜ | - | Search NIX_PATH-style list. |
| 572 | `builtins.nixPath` | ⬜ TODO | ⬜ | - | Return NIX_PATH value. |
| 573 | `builtins.storeDir` | ⬜ TODO | ⬜ | Store | Return store directory path. |
| 574 | `builtins.storePath` | ⬜ TODO | ⬜ | Store | Validate store path. |
| 608 | `builtins.derivation` | ⬜ TODO | ⬜ | Store, Builder | Create derivation. **Very complex.** |
| 630 | `builtins.derivationStrict` | ⬜ TODO | ⬜ | derivation | Strict version of derivation. |
| 633 | `builtins.getFlake` | ⬜ TODO | ⬜ | Flakes | Flake support. |
| 634 | `builtins.parseFlakeRef` | ⬜ TODO | ⬜ | Flakes | Parse flake reference. |
| 635 | `builtins.placeholder` | ⬜ TODO | ⬜ | derivation | Placeholder for output paths. |
| 638 | `builtins.addErrorContext` | ⬜ TODO | ⬜ | Error system | Add context to errors. |
| 639 | `builtins.appendContext` | ⬜ TODO | ⬜ | Context system | String context manipulation. |
| 640 | `builtins.getContext` | ⬜ TODO | ⬜ | Context system | Get string context. |
| 641 | `builtins.hasContext` | ⬜ TODO | ⬜ | Context system | Check for string context. |
| 642 | `builtins.unsafeDiscardStringContext` | ⬜ TODO | ⬜ | Context system | Remove string context. |
| 645 | `builtins.filterSource` | ⬜ TODO | ⬜ | Store | Filtered copy to store. |
| 646 | `builtins.flakeRefToString` | ⬜ TODO | ⬜ | Flakes | Convert flake ref to string. |
| 647 | `builtins.genericClosure` | ⬜ TODO | ⬜ | - | Generic graph closure. Complex algorithm. |
| 648 | `builtins.unsafeDiscardOutputDependency` | ⬜ TODO | ⬜ | Context system | Discard output deps. |
| 649 | `builtins.unsafeGetAttrPos` | ⬜ TODO | ⬜ | AST tracking | Get attribute source position. |
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
- `main/tests/builtins_eval_control.js` - Evaluation control tests (blocked by prex WASM issue)
- `main/tests/builtins_attrs.js` - Attribute set tests (blocked by prex WASM issue)
- `main/tests/builtins_list.js` - List helper tests (blocked by prex WASM issue)
- `main/tests/operators.js` - Operator tests (blocked by prex WASM issue)
- `main/tests/builtins_version.js` - Version tests (blocked by prex WASM issue)

## Implementation Statistics

- **Total FIXMEs identified:** ~71
- **Implemented:** 38 (54%)
- **Remaining Easy/Medium:** ~6
- **Remaining Hard:** ~27 (mostly store/context/flake related)

## Recent Additions (Phase 2b)

- catAttrs: Collect attribute values from list of attrsets
- zipAttrsWith: Merge attrsets with function
- attrNames: Fixed sorting (was calling non-existent .sorted())
- operators.equal: Deep equality with tests for lists and attrsets

## Notes

- Many HARD items require a Nix store implementation
- Context system (string contexts) is needed for several features
- Flake support is relatively modern and may be lower priority
- Import/derivation are critical for full Nix functionality
