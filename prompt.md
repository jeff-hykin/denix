# Task: Implement a translator from Nix to JavaScript

Your job is to focus on what is NOT implemented and NOT working. Only report what remains to be done. Do not report what you accomplished. You are a senior level developer, there is no such thing as a blocker. Break down large tasks into smaller tasks.

Before executing what is below, please filter out any achievements. Only keep remaining/unsolved tasks in this document. Add detail to each task if its needed.

## Current Status Summary

**Runtime (main/runtime.js)**: 61/98 Nix 2.18 builtins implemented (62%). 170+ runtime tests passing.
**Translator (main.js)**: 87 translator tests passing. Validated against real nixpkgs.lib code.
**Import System**: Fully implemented with 49 passing tests.
**nixpkgs.lib Testing**: 11 of 34 lib files tested end-to-end (32% coverage).

## Remaining Work

### 1. Expand nixpkgs.lib Test Coverage

**Status**: 11/34 lib files tested (32%)

**Not Yet Tested** (23 files):
- asserts.nix - assertion utilities
- attrsets.nix - CRITICAL: core attribute set manipulation functions
- cli.nix - command-line utilities
- customisation.nix - package customization helpers
- debug.nix - debugging utilities
- default.nix - main lib entry point (imports all other files)
- deprecated.nix - deprecated functions
- derivations.nix - derivation helpers
- filesystem.nix - file system utilities
- fixed-points.nix - CRITICAL: fix, extends, composeExtensions
- flake.nix - flake utilities
- generators.nix - code generators (JSON, YAML, etc.)
- gvariant.nix - GSettings/GVariant helpers
- licenses.nix - software license definitions (large data file)
- lists.nix - CRITICAL: core list manipulation functions
- meta.nix - package metadata helpers
- modules.nix - NixOS module system (VERY COMPLEX)
- options.nix - NixOS option definitions
- sources.nix - source fetching helpers
- strings-with-deps.nix - string utilities with dependencies
- trivial.nix - CRITICAL: core utility functions (already validated 20 functions)
- types.nix - NixOS type system (VERY COMPLEX)
- zip-int-bits.nix - integer bit manipulation

**Priority Order**:
1. **HIGH PRIORITY** - Core libraries used everywhere:
   - lists.nix - Essential list operations (map, filter, fold, etc.)
   - attrsets.nix - Essential attribute set operations (mapAttrs, filterAttrs, etc.)
   - trivial.nix - Already validated 20 functions, add full file test
   - fixed-points.nix - Used for recursive definitions (fix, extends)

2. **MEDIUM PRIORITY** - Common utilities:
   - debug.nix - Useful for testing and development
   - asserts.nix - Used in many other lib files
   - derivations.nix - Package building helpers
   - generators.nix - Useful for serialization

3. **LOW PRIORITY** - Specialized/complex:
   - modules.nix - NixOS module system (extremely complex, may need special handling)
   - types.nix - NixOS type system (extremely complex)
   - options.nix - Depends on modules and types
   - filesystem.nix - May need some stubs
   - sources.nix - Depends on fetch* builtins (not implemented)
   - licenses.nix - Just data, easy but low value
   - deprecated.nix - Low value
   - strings-with-deps.nix - Already covered by strings.nix
   - zip-int-bits.nix - Edge case, documented test limitation

4. **SKIP** (documented reasons):
   - default.nix - Just imports everything, test once others work

**Next Steps**:
1. Add test for lists.nix (HIGH PRIORITY)
   - Test: length, head, tail, map, filter, foldl, foldr, concatMap, flatten, unique, etc.
   - Create test similar to strings.nix pattern
   - Verify all core list operations work

2. Add test for attrsets.nix (HIGH PRIORITY)
   - Test: mapAttrs, filterAttrs, foldAttrs, catAttrs, attrValues, attrNames, etc.
   - Many of these are builtins, just need to verify lib wrappers work

3. Add test for trivial.nix (HIGH PRIORITY)
   - Already validated 20 functions work in nixpkgs_trivial_test.js
   - Need to add full file load test to nixpkgs_lib_files_test.js
   - Verify all utility functions (id, const, pipe, flip, etc.)

4. Add test for fixed-points.nix (HIGH PRIORITY)
   - Test: fix, extends, composeExtensions, makeExtensible
   - Critical for overlays and recursive definitions

### 2. Create Examples Directory

**Status**: Directory does not exist. No examples of translated code.

**Required**:
- Create `./examples/` directory structure
- Add examples showing Nix code → JS translation
- Include both simple and complex examples

**Suggested Examples**:
1. `examples/01_basics/` - Basic Nix expressions
   - `literals.nix` / `literals.js` - Int, float, string, list, attrset
   - `operators.nix` / `operators.js` - Arithmetic, comparison, logical
   - `functions.nix` / `functions.js` - Simple functions, currying

2. `examples/02_intermediate/` - Common patterns
   - `let_expressions.nix` / `let_expressions.js` - Let bindings
   - `with_expressions.nix` / `with_expressions.js` - With statements
   - `rec_attrsets.nix` / `rec_attrsets.js` - Recursive attribute sets
   - `string_interpolation.nix` / `string_interpolation.js` - String templates

3. `examples/03_nixpkgs_patterns/` - Real nixpkgs.lib usage
   - `trivial_utilities.nix` / `trivial_utilities.js` - pipe, compose, flip
   - `list_operations.nix` / `list_operations.js` - map, filter, fold
   - `attrset_operations.nix` / `attrset_operations.js` - mapAttrs, filterAttrs
   - `imports.nix` / `imports.js` - Using builtins.import

4. `examples/04_advanced/` - Complex real-world examples
   - `overlays.nix` / `overlays.js` - Package overlays using fixed-points
   - `derivation.nix` / `derivation.js` - Creating a derivation
   - Extract examples from existing test files

**Implementation Plan**:
1. Create directory structure
2. Extract simple examples from existing tests
3. Add explanatory comments to each example
4. Create a README.md in examples/ explaining usage
5. Add a script to automatically verify examples (translate and run)

### 3. Builtins Progress Status

**Status**: 61/98 Nix 2.18 builtins implemented (62%)

**Blocked by Infrastructure** (10 functions - CANNOT implement without major work):
- `fetchurl` - Network + store (multi-week project)
- `fetchTarball` - Network + store (multi-week project)
- `fetchGit` - Network + store (multi-week project)
- `fetchMercurial` - Network + store (multi-week project)
- `fetchTree` - Network + store (multi-week project)
- `fetchClosure` - Network + store (multi-week project)
- `path` - Physical /nix/store implementation (multi-week project)
- `filterSource` - Physical /nix/store implementation (multi-week project)
- `getFlake` - Network + parser + store (multi-month project)
- `pathExists` with paths converted to store - toJSON path edge case (needs store)

**Minor TODOs** (6 edge cases in working functions - LOW PRIORITY):
- Line 278: `toString` - unclear edge case with value vs value.toString()
- Line 332: `toString` - FIXME note without details
- Line 457: `match` - slightly different behavior note
- Line 519: `splitVersion` - possible edge cases
- Line 603: `foldl'` - check more edge cases
- Line 1057: `add` operator - path copy to store (needs physical store)

**Next Steps**:
- Document why fetch* functions cannot be implemented (need network layer + store)
- Add detailed comments explaining the 10 blocked functions
- Investigate and document the 6 edge case TODOs (create issues for each if needed)
- Mark blocked functions as "stub" implementations that throw clear errors

### 4. Translator Progress Status (main.js)

**Status**: 87 tests passing. Production ready for nixpkgs.lib patterns.

**Minor TODOs** (4 notes - LOW PRIORITY):
- Line 147: Design TODO (not specific)
- Line 186: Scope shadowing check (optimization, not critical)
- Line 232: More literal conversion cases (optimization, not critical)
- Line 1234: String escaping FIXME (use single quotes, other improvements)

**Next Steps**:
- Test translator against more complex lib files (lists.nix, attrsets.nix)
- Document any new patterns discovered during testing
- Fix string escaping if it causes issues with nixpkgs.lib files
- Address scope shadowing if it causes issues in practice

### 5. Documentation and Polish

**Status**: Good README.md exists but needs updates.

**Required Updates**:
- Update test counts in README.md badges (currently says 67 translator tests, actually 87)
- Update feature count (currently says 59 builtins, actually 61)
- Add section about examples directory (once created)
- Update "What's Not Implemented" section with clear blockers
- Add performance benchmarks section (optional)

**Optional Enhancements**:
- Add ARCHITECTURE.md explaining design decisions
- Add CONTRIBUTING.md for future contributors
- Add performance profiling and optimization
- Create a simple CLI tool for translation (`denix translate input.nix`)

## Summary of Priorities

**IMMEDIATE** (This week):
1. Test lists.nix (HIGH PRIORITY) - Core functionality
2. Test attrsets.nix (HIGH PRIORITY) - Core functionality
3. Test trivial.nix full file (HIGH PRIORITY) - Already partially validated
4. Create examples directory with 10-15 examples

**NEXT** (Following week):
1. Test fixed-points.nix (HIGH PRIORITY) - Overlays
2. Test debug.nix, asserts.nix, derivations.nix (MEDIUM)
3. Test generators.nix (MEDIUM)
4. Update documentation

**LATER** (As needed):
1. Test remaining lib files (LOW PRIORITY or complex)
2. Address minor TODOs in runtime/translator (LOW PRIORITY)
3. Performance optimization
4. Additional tooling

**NOT PLANNED** (Infeasible):
- Implementing fetch* builtins (needs network layer)
- Implementing path/filterSource (needs physical store)
- Implementing getFlake (needs parser + network + store)
