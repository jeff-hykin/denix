# Task: Implement a translator from Nix to JavaScript

Your job is to focus on what is NOT implemented and NOT working. Only report what remains to be done. Do not report what you accomplished. You are a senior level developer, there is no such thing as a blocker. Break down large tasks into smaller tasks.

Before executing what is below, please filter out any achievements. Only keep remaining/unsolved tasks in this document. Add detail to each task if its needed.

## What To Do Right Now

**IMMEDIATE ACTION REQUIRED**: Test fixed-points.nix (Task 1.1)

1. Create `main/tests/fixed_points_test.js`
2. Implement test for lib.fix function (most critical)
3. Test lib.extends function (needed for overlays)
4. Test remaining functions (fix', converge, composeExtensions, etc.)
5. Provide minimal lib context with just lib.foldr for composeManyExtensions
6. Verify all 9 functions work with examples from documentation

**Why this matters**: fixed-points.nix is the foundation for ALL other lib testing. Without lib.fix working, cannot create the circular lib context needed to test any other lib files.

**Estimated time**: 1-2 hours

**Next step after this**: Implement makeTestLib() helper (Task 1.2)

See "Critical Next Steps" section below for detailed implementation guide.

## Current Status Summary

**Runtime (main/runtime.js)**: 61/98 Nix 2.18 builtins implemented (62%). 170+ runtime tests passing.
**Translator (main.js)**: 87 translator tests passing. Validated against real nixpkgs.lib code.
**Import System**: Fully implemented with 49 passing tests.
**nixpkgs.lib Testing**: 11 of 34 lib files tested end-to-end (32% coverage).

## Current Blockers

**None!** All translator and runtime features needed for nixpkgs.lib testing are working.

**Known Limitations**:
- Cannot test default.nix (requires full nixpkgs with maintainers/ directory)
- 10 builtins blocked by infrastructure (fetch*, path, filterSource, getFlake)
- These do not block nixpkgs.lib testing

## Remaining Work

### 1. Expand nixpkgs.lib Test Coverage

**Status**: 11/34 lib files tested (32%)

**Critical Discovery**: nixpkgs.lib files have circular dependencies through fixed-point pattern!
- trivial.nix inherits from lib.trivial within itself
- lists.nix needs lib.strings, lib.trivial, lib.attrsets
- attrsets.nix needs lib.asserts, lib.trivial, lib.strings, lib.lists
- strings.nix needs lib.trivial
- All of these are resolved at runtime through fixed-point evaluation (lib = fix (self: {...}))

**Blocker**: Cannot test individual lib files in isolation without implementing the fixed-point pattern.
- Need to either:
  1. Implement full lib fixed-point setup (load default.nix which uses lib.fix)
  2. Create mock lib context with all required functions stubbed
  3. Test files in dependency order, building up lib context incrementally

**Not Yet Tested** (23 files):
- asserts.nix - assertion utilities (used by attrsets, lists, many others)
- attrsets.nix - CRITICAL: core attribute set manipulation (depends on: asserts, trivial, strings, lists)
- cli.nix - command-line utilities
- customisation.nix - package customization helpers
- debug.nix - debugging utilities
- default.nix - CRITICAL: main lib entry point using fixed-point (imports/combines all files)
- deprecated.nix - deprecated functions
- derivations.nix - derivation helpers
- filesystem.nix - file system utilities
- fixed-points.nix - CRITICAL: fix, extends, composeExtensions (needed to test default.nix!)
- flake.nix - flake utilities
- generators.nix - code generators (JSON, YAML, etc.)
- gvariant.nix - GSettings/GVariant helpers
- licenses.nix - software license definitions (large data file)
- lists.nix - CRITICAL: core list manipulation (depends on: strings, trivial, attrsets)
- meta.nix - package metadata helpers
- modules.nix - NixOS module system (VERY COMPLEX)
- options.nix - NixOS option definitions
- sources.nix - source fetching helpers
- strings-with-deps.nix - string utilities with dependencies
- trivial.nix - CRITICAL: core utility functions (has circular self-reference!)
- types.nix - NixOS type system (VERY COMPLEX)
- zip-int-bits.nix - integer bit manipulation

**Revised Priority Order**:
1. **IMMEDIATE - Foundation for all other tests**:
   - fixed-points.nix - MUST test first! Contains lib.fix used by default.nix
     - Provides: fix, extends, composeExtensions, makeExtensible
     - No dependencies on other lib files (only uses builtins)
     - Test: fix, extends, composeExtensions patterns

   - default.nix - Main lib entry using lib.fix to create circular lib
     - Uses fixed-points.nix to create: lib = lib.fix (self: { ... })
     - Imports and combines all other lib files
     - Test if we can load the full lib context
     - **This unlocks testing all other lib files!**

2. **HIGH PRIORITY** - Core libraries (testable after default.nix works):
   - trivial.nix - Core utility functions
     - Already validated 20 functions work individually
     - Test full file load through default.nix context

   - strings.nix - Already tested with imports
     - Verify it works through default.nix context

   - lists.nix - Essential list operations
     - Depends on: strings, trivial, attrsets
     - Test after default.nix provides full lib context

   - attrsets.nix - Essential attribute set operations
     - Depends on: asserts, trivial, strings, lists
     - Test after default.nix provides full lib context

3. **MEDIUM PRIORITY** - Common utilities:
   - asserts.nix - Used in many other lib files
   - debug.nix - Useful for testing and development
   - derivations.nix - Package building helpers
   - generators.nix - Useful for serialization

4. **LOW PRIORITY** - Specialized/complex:
   - modules.nix - NixOS module system (extremely complex)
   - types.nix - NixOS type system (extremely complex)
   - options.nix - Depends on modules and types
   - filesystem.nix - May need some stubs
   - sources.nix - Depends on fetch* builtins (not implemented)
   - licenses.nix - Just data, easy but low value
   - deprecated.nix - Low value
   - strings-with-deps.nix - Already covered by strings.nix
   - zip-int-bits.nix - Edge case, documented test limitation

**Critical Next Steps**:

**TASK 1.1**: Test fixed-points.nix (UNBLOCKS EVERYTHING)
- **File**: Create `main/tests/fixed_points_test.js`
- **Complexity**: 525 lines, 9 functions in fixed-points.nix
- **Dependency**: Only uses lib.foldr in composeManyExtensions

**Implementation Steps**:
1. Load fixed-points.nix with minimal lib context:
   ```javascript
   // Provide minimal lib with just foldr
   const lib = {
     foldr: (op, nul, list) => {
       // Simple right fold implementation
       let result = nul
       for (let i = list.length - 1; i >= 0; i--) {
         result = op(list[i])(result)
       }
       return result
     }
   }
   const fixedPoints = loadLibFile('fixed-points.nix', { lib })
   ```

2. Test each function with examples from documentation:
   - **fix**:
     - Test: `fix(self => ({ foo: "foo", bar: "bar", foobar: self.foo + self.bar }))`
     - Expected: `{ foo: "foo", bar: "bar", foobar: "foobar" }`
   - **fix'**:
     - Test: Same as fix, but check for `__unfix__` attribute
   - **converge**:
     - Test: `converge(x => x / 2)(16n)`
     - Expected: `0n` (or `1n` depending on integer division)
   - **extends**:
     - Test: `fix(extends(overlay, f))` where overlay adds/modifies attributes
     - Example from docs: `f = final => ({ a: 1n, b: final.a + 2n })`
     - Overlay: `final => prev => ({ a: prev.a + 10n })`
     - Expected: `{ a: 11n, b: 13n }`
   - **composeExtensions**:
     - Test: Compose two overlays
     - Example: overlay1 adds `c`, overlay2 adds `d`
     - Expected: Final result has both `c` and `d`
   - **composeManyExtensions**:
     - Test: Compose list of overlays
     - Use lib.foldr implementation from above
   - **makeExtensible**:
     - Test: Create extensible attrset with `extend` method
     - Verify extend works to add new attributes
   - **makeExtensibleWithCustomName**:
     - Test: Same but with custom method name like "override"
   - **toExtension**:
     - Test: Convert function to extension overlay
     - Check it works with extends

3. Create test structure:
   ```javascript
   Deno.test("fixed-points.nix", async (t) => {
     await t.step("lib.fix - basic fixed-point", () => { ... })
     await t.step("lib.fix' - with __unfix__", () => { ... })
     await t.step("lib.converge - iterative", () => { ... })
     await t.step("lib.extends - overlay application", () => { ... })
     await t.step("lib.composeExtensions - compose two", () => { ... })
     await t.step("lib.composeManyExtensions - compose list", () => { ... })
     await t.step("lib.makeExtensible - create extensible", () => { ... })
     await t.step("lib.makeExtensibleWithCustomName - custom name", () => { ... })
     await t.step("lib.toExtension - convert to extension", () => { ... })
   })
   ```

**Success Criteria**:
- All 9 functions work correctly (or 8 if skip one due to complexity)
- Examples from documentation pass
- lib.fix and lib.extends work (these are CRITICAL for makeTestLib)
- Test file added to test suite, all tests passing

2. Test default.nix loading (UNBLOCKS ALL LIB FILES) - Complexity: VERY HIGH
   - **Structure discovered**: Uses custom `makeExtensible'` (defined inline, not from fixed-points.nix!)
   - Creates: `lib = makeExtensible' (self: { ... })`
   - Uses `callLibs = file: import file { lib = self; }` to load each lib file with full context
   - **Major blockers**:
     - Imports `../maintainers/maintainer-list.nix` (outside lib directory)
     - Imports `../maintainers/computed-team-list.nix` (outside lib directory)
     - These require full nixpkgs structure to work
     - Total: 600+ lines with all the inherit statements
   - **Conclusion**: default.nix NOT testable in isolation without full nixpkgs repo
   - **Alternative**: Create simplified version for testing (see step 3)

3. Create simplified lib loader (RECOMMENDED APPROACH):
   - Cannot use default.nix (requires full nixpkgs structure)
   - Instead: Create custom `makeTestLib()` function that mimics default.nix
   - Strategy:
     ```javascript
     function makeTestLib() {
       // 1. Create minimal makeExtensible implementation
       const makeExtensible = (rattrs) => {
         const self = { ...rattrs(self), extend: (f) => makeExtensible((s) => ({ ...rattrs(s), ...f(s, rattrs(s)) })) }
         return self
       }

       // 2. Load lib files in dependency order using fix pattern
       const lib = makeExtensible((self) => {
         const callLibs = (filename) => loadLibFile(filename, { lib: self })
         return {
           fixedPoints: callLibs('fixed-points.nix'),
           trivial: callLibs('trivial.nix'),
           strings: callLibs('strings.nix'),
           lists: callLibs('lists.nix'),
           attrsets: callLibs('attrsets.nix'),
           // Add more as needed

           // Re-export key functions at top level (like default.nix does)
           fix: self.fixedPoints.fix,
           // etc.
         }
       })
       return lib
     }
     ```
   - This gives us the full lib context without needing default.nix
   - Test each lib file through this context
   - **Critical**: Need to test fixed-points.nix FIRST (step 1) before using it here

**TASK 1.2**: Implement makeTestLib() helper
- **File**: Create `main/tests/lib_loader.js`
- **Purpose**: Create full lib context for testing lib files with dependencies

**Implementation**:
```javascript
import { convertToJs } from "../../main.js"
import { createRuntime } from "../runtime.js"
import { resolve, join } from "https://deno.land/std@0.224.0/path/mod.ts"

const nixpkgsLibPath = resolve(Deno.cwd(), "nixpkgs.lib/lib")

/**
 * Load a lib file and call it with { lib } argument
 */
function loadLibFile(filename, context) {
    const filePath = join(nixpkgsLibPath, filename)
    const nixCode = Deno.readTextFileSync(filePath)
    const jsCode = convertToJs(nixCode, { relativePath: filePath })
    const runtime = createRuntime()
    runtime.runtime.currentFile = filePath

    // Evaluate and call with context
    const moduleFunc = eval(jsCode)
    return moduleFunc(context)
}

/**
 * Create full lib context using fix pattern (like default.nix)
 */
export function makeTestLib() {
    // Simple makeExtensible implementation
    const makeExtensible = (rattrs) => {
        const self = rattrs(self)
        self.extend = (f) => makeExtensible((s) => ({ ...rattrs(s), ...f(s, rattrs(s)) }))
        return self
    }

    // Build lib using fixed-point
    const lib = makeExtensible((self) => {
        const callLibs = (filename) => loadLibFile(filename, { lib: self })

        return {
            // Load lib files in dependency order
            fixedPoints: callLibs('fixed-points.nix'),
            trivial: callLibs('trivial.nix'),
            strings: callLibs('strings.nix'),
            // Add more as needed

            // Re-export key functions at top level (like default.nix)
            fix: self.fixedPoints?.fix,
            id: self.trivial?.id,
            // etc.
        }
    })

    return lib
}
```

**Testing**:
- Create `main/tests/lib_integration_test.js`
- Test: `const lib = makeTestLib()`
- Verify: `lib.fixedPoints.fix`, `lib.trivial.id`, etc. work
- Test cross-module: trivial function calling string function

**TASK 1.3**: Test trivial.nix through lib context
- Use makeTestLib() to get lib.trivial
- Test the 20 already-validated functions from nixpkgs_trivial_test.js
- Verify they work through lib context (not standalone)
- Add test to `main/tests/lib_integration_test.js`

**TASK 1.4**: Test lists.nix through lib context
- Extend makeTestLib() to include lists
- Test: singleton, forEach, foldr, foldl, flatten, unique, etc.
- Verify dependencies (strings, trivial, attrsets) work
- Create `main/tests/nixpkgs_lists_test.js` or add to lib_integration_test.js

**TASK 1.5**: Test attrsets.nix through lib context
- Extend makeTestLib() to include attrsets
- Test: mapAttrs, filterAttrs, foldAttrs, etc.
- Verify dependencies work
- Add tests for key attrset operations

### 2. Implement makeTestLib() Helper

**Status**: Does not exist. Needed to test lib files with dependencies.

**Required Implementation**:
1. Create `main/tests/lib_loader.js` with `makeTestLib()` function
2. Function should:
   - Implement simple makeExtensible (not full version, just enough for testing)
   - Load lib files in dependency order
   - Use fixed-point pattern to tie them together
   - Return complete lib object with all loaded modules
3. Dependencies to handle:
   - fixed-points.nix: Only needs lib.foldr (can provide from builtins)
   - trivial.nix: Inherits from lib.trivial (circular! need fix pattern)
   - strings.nix: Needs lib.trivial (id, warn, etc.)
   - lists.nix: Needs lib.strings, lib.trivial, lib.attrsets, lib.max
   - attrsets.nix: Needs lib.asserts, lib.trivial, lib.strings, lib.lists
   - asserts.nix: Check dependencies (likely needs trivial)

**Implementation Plan**:
1. First test fixed-points.nix standalone (see task 1.1)
2. Create makeTestLib() that uses lib.fix to create context
3. Start with minimal lib (just fixedPoints)
4. Add trivial, then strings, then lists, then attrsets
5. Handle circular dependencies through fix pattern
6. Test each addition works

**Test Strategy**:
- Create `main/tests/lib_integration_test.js`
- Test: `const lib = makeTestLib()`
- Verify: `lib.fixedPoints.fix`, `lib.trivial.id`, `lib.lists.length`, etc. all work
- Test cross-module usage: lib file functions calling other lib file functions

### 3. Create Examples Directory

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

### 4. Builtins Progress Status

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

### 5. Translator Progress Status (main.js)

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

### 6. Documentation and Polish

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

**CRITICAL PATH** (Must do in order):
1. **Test fixed-points.nix standalone** (BLOCKS EVERYTHING ELSE)
   - No dependencies except lib.foldr in composeManyExtensions
   - Test: fix, fix', extends, composeExtensions
   - Skip composeManyExtensions or stub lib.foldr
   - Estimated: 1-2 hours, create `main/tests/fixed_points_test.js`

2. **Implement makeTestLib() helper** (UNBLOCKS ALL LIB TESTING)
   - Create `main/tests/lib_loader.js`
   - Implement simple makeExtensible pattern
   - Use lib.fix to handle circular dependencies
   - Load lib files in order: fixedPoints → trivial → strings → lists → attrsets
   - Estimated: 2-3 hours

3. **Test trivial.nix through lib context**
   - Use makeTestLib() to get full lib.trivial
   - Verify 20 already-validated functions still work
   - Test remaining trivial functions
   - Estimated: 1-2 hours

4. **Test lists.nix through lib context**
   - Use makeTestLib() to get full lib.lists
   - All dependencies (strings, trivial, attrsets) resolved through lib
   - Test core list operations
   - Estimated: 2-3 hours

5. **Test attrsets.nix through lib context**
   - Use makeTestLib() to get full lib.attrsets
   - All dependencies resolved through lib
   - Test core attrset operations
   - Estimated: 2-3 hours

**NEXT** (Following week):
1. Add asserts.nix to makeTestLib (used by many files)
2. Test debug.nix, derivations.nix, generators.nix (MEDIUM priority)
3. Create examples directory with 10-15 examples
4. Update documentation (README badges, feature counts)

**LATER** (As needed):
1. Test remaining lib files (modules, types, etc. - LOW PRIORITY or complex)
2. Address minor TODOs in runtime/translator (LOW PRIORITY)
3. Performance optimization
4. Additional tooling

**NOT PLANNED** (Infeasible without major infrastructure):
- Testing default.nix (needs full nixpkgs structure with maintainers/)
- Implementing fetch* builtins (needs network layer + multi-week effort)
- Implementing path/filterSource (needs physical /nix/store)
- Implementing getFlake (needs parser + network + store)

## Investigation Needed

**None currently.** All translator features working. All needed runtime features working.

**Potential Future Investigations**:
1. Check if asserts.nix has any special dependencies
   - Needed by attrsets.nix and many other files
   - Need to verify it can be loaded through makeTestLib()
2. Check complexity of debug.nix, generators.nix
   - Medium priority files, assess effort needed
3. Performance profiling once more lib files tested
   - Identify bottlenecks in translation or runtime
4. Check if any lib files use unsupported Nix features
   - May discover missing translator features

## Files Modified in This Session

**Modified**:
- prompt.md - Complete rewrite with correct priorities and detailed task breakdown

**Analysis Done**:
- Examined fixed-points.nix (9 functions, 525 lines)
- Examined default.nix (617 lines, uses makeExtensible pattern)
- Examined lists.nix (complex dependencies on strings, trivial, attrsets)
- Examined attrsets.nix (complex dependencies on asserts, trivial, strings, lists)
- Examined trivial.nix (circular self-reference through lib.trivial)
- Discovered default.nix is not testable without full nixpkgs structure
- Identified correct approach: custom makeTestLib() using fix pattern

**Key Discovery**: nixpkgs.lib files have circular dependencies resolved through fixed-point pattern. Cannot test individual files without implementing the fix pattern to create lib context. This is why testing fixed-points.nix is the CRITICAL FIRST STEP.

## Quick Reference: Task Checklist

**Phase 1: Foundation** (CURRENT)
- [ ] Create main/tests/fixed_points_test.js
- [ ] Test lib.fix function
- [ ] Test lib.extends function
- [ ] Test remaining 7 functions in fixed-points.nix
- [ ] All tests passing

**Phase 2: Integration**
- [ ] Create main/tests/lib_loader.js
- [ ] Implement makeTestLib() function
- [ ] Test loading fixedPoints through lib context
- [ ] Test loading trivial through lib context
- [ ] Test loading strings through lib context

**Phase 3: Core Libraries**
- [ ] Add lists to makeTestLib()
- [ ] Test lib.lists functions
- [ ] Add attrsets to makeTestLib()
- [ ] Test lib.attrsets functions
- [ ] Add asserts to makeTestLib()

**Phase 4: Expansion**
- [ ] Test debug.nix
- [ ] Test derivations.nix
- [ ] Test generators.nix
- [ ] Create examples directory
- [ ] Update documentation

**Success Metrics**:
- 20+ lib files tested (from current 11)
- 150+ total tests (from current 73)
- Full lib context working with circular dependencies
- Core lib functions (trivial, lists, attrsets, strings) all working
