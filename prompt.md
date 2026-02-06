# Task: Implement a translator from Nix to JavaScript

0. We need to stay organized. Please list all .md files. Find which are related to agent progress/todo/status/summary/etc and compress/summarize them into this document so that the repo doesnt get too cluttered. Also make sure this document doesn't get too long.
1. We need to implement the core nix functions in JavaScript and make sure they have 1-to-1 parity with Nix. NOTE: there are some mapping caveats you need to consider such as JS needing to use BigInts to distinguish between nix ints and nix floats. We need to validate that all nix operators and builtin's mimic their Nix counterparts, using abstractions such as BigInt where direct mapping is impossible. Read below ("Builtins Progress Status") to see the status of builtins. These are implemented in `main/runtime.js`. 
2. Once the core functions are implemented, we need to have a translator that translates Nix to JavaScript. This is implemented in `main.js` at the top level. It explains the core ideas of how to translate Nix to JavaScript, including namespace problems and literals. Fill out the TODOs and create integration tests of it translating nix code, and testing if the resulting JS performs the same as the original Nix. See below ("Translator Progress Status") for the status of the translator.
3. Once the translator is implemented, we need to start testing it against the nixpkgs lib. For example curl from github, this repo: git@github.com:nix-community/nixpkgs.lib.git and start testing different library functions.

## 1. Builtins Progress Status

**Status**: INCOMPLETE 59/98 Nix 2.18 builtins fully functional 

**What Works**:
- ✅ 120+ tests, all passing
- ✅ Correct derivation store paths matching Nix exactly
- ✅ Pure Deno with URL imports (no npm/jsr dependencies)
- ✅ All 98 Nix 2.18 builtins present in codebase

**Remaining Items**:
- **1 FIXME** (line 289): `toJSON` for paths - requires full store infrastructure
- **5 TODOs** (lines 235, 411, 459, 540, 986): Minor edge case notes (non-blocking)
- **12 functions** need to start work on large tasks: fetchurl, fetchTarball, fetchGit, fetchMercurial, fetchTree, fetchClosure, import, scopedImport, path, filterSource, getFlake. These require weeks of work, so I should use libraries for things like git, and break down the work into smaller tasks and start working on those smaller tasks in helper directories.

**1 FIXME**:
- toJSON for paths (line 289) - requires store to hash/copy files to /nix/store

**5 TODOs** (minor edge case notes):
- Line 235: toString edge case unclear
- Line 411: slightly different behavior note
- Line 459: splitVersion edge cases
- Line 540: foldl' edge cases
- Line 986: add operator path copy to store

**12 Infrastructure-Blocked Functions**:
- Store system (2): path, filterSource
- Import/eval system (2): import, scopedImport
- Network fetchers (6): fetchurl, fetchTarball, fetchGit, fetchMercurial, fetchTree, fetchClosure
- Flakes (1): getFlake

## 2. Translator Progress Status (main.js)

### Status: CORE FEATURES COMPLETE ✅

All critical Nix language features have been implemented and tested!

### What Works ✅
- [x] Basic structure and design (documented at top of main.js)
- [x] Integer literals (converted to BigInt)
- [x] Float literals
- [x] Boolean and null literals
- [x] Simple operators (binary expressions: +, -, *, /, ==, !=, <, <=, >, >=, &&, ||, ->, //, ++, ?)
- [x] Simple strings (non-interpolated, both double-quote and double-single-quote)
- [x] Simple paths (non-interpolated)
- [x] Function calls (apply_expression)
- [x] If-then-else expressions
- [x] List expressions
- [x] Simple function definitions (single argument)
- [x] Partial support for complex functions (formals with defaults)
- [x] **select_expression** - Attribute selection (e.g., `a.b.c`)
- [x] **has_attr_expression** - Attribute existence check (e.g., `a ? b`)
- [x] **attrset_expression** - Non-rec attribute sets with inherit
- [x] **rec_attrset_expression** - Recursive attribute sets with lazy evaluation
- [x] **let_expression** - Let-in bindings with proper scoping and nested attributes
- [x] **with_expression** - With scopes
- [x] **Integration tests** - 23 tests covering all major features, all passing ✅

### Test Coverage
**main/tests/translator_test.js**: 23 integration tests
- ✅ Literals (integers, floats, strings)
- ✅ Lists (simple and mixed types)
- ✅ Attribute sets (simple and recursive)
- ✅ Let expressions (simple, with references, with nested attributes)
- ✅ Select expressions (simple and nested)
- ✅ With expressions
- ✅ If expressions
- ✅ Operators (add, multiply)
- ✅ Complex combinations (let+with, nested attributes, etc.)

**main/tests/string_interpolation_test.js**: 8 interpolation tests
- ✅ Double-quoted string interpolation (`"hello ${world}"`)
- ✅ Indented string interpolation (`''hello ${world}''`)
- ✅ Multiple interpolations in one string
- ✅ Interpolation with expressions and attribute access

**main/tests/path_interpolation_test.js**: 5 path interpolation tests
- ✅ Path interpolation (`./path/${var}/file`)
- ✅ Multiple interpolations in paths
- ✅ Absolute paths with interpolation

**Total**: 36 tests, all passing ✅

### What Needs Work ⬜

**Medium Priority** (common features):
1. ~~**Lines 269-270**: String interpolation (e.g., `"${x}"`, `''${x}''`)~~ ✅ **COMPLETE**
2. ~~**Lines 272-273**: Path escapes and interpolation~~ ✅ **COMPLETE**
3. **Line 300**: Handle Nix truthy-ness correctly (empty strings, empty lists, etc.)
4. **Complex functions**: Full support for @ syntax, inherit_from
5. **Nested attribute paths in non-rec attrsets**: e.g., `{ a.b.c = 10; }`

**Low Priority** (edge cases and optimizations):
6. **Line 191**: Support hex/oct/scientific number formats
7. **Line 207**: Add more literal optimization cases
8. **Line 147**: Design TODO - record unsafeGetAttrPos, handle `<nixpkgs>` syntax
9. **Line 453**: nixRepr should use single quotes instead of double
10. **Boolean shadowing**: Detect when `true`/`false` are shadowed by local variables

### Next Steps
1. Test against simple nixpkgs.lib functions (now possible with interpolation support!)
2. ~~Implement string/path interpolation~~ ✅ **COMPLETE** (Session 2026-02-05)
3. Improve function expression support (@ syntax, inherit_from)
4. Handle edge cases (truthy-ness, hex/oct numbers, etc.)
5. Performance optimizations