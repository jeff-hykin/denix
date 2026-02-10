# Denix Development Priorities

## ⚠️ CRITICAL RULES (READ THIS FIRST)

Your job is to focus on what is NOT implemented and NOT working. Only report what remains to be done. Do not report what you accomplished. You are a senior level developer, there is no such thing as a blocker. Break down large tasks into smaller tasks.

Before executing what is below, please filter out any achievements. Only keep remaining/unsolved tasks in this document. Add detail to each task if needed.

## 📊 Current State Summary

**Runtime (main/runtime.js):**
- 62/65 Nix 2.18 builtins implemented (95%)
- ❌ **Critical bug:** Derivation store paths incorrect (fix ready, 30 min)
- ❌ **Missing:** 3 optional builtins (fetchMercurial, fetchClosure, getFlake) - rarely used
- ⚠️ **Edge cases:** Many builtins lack comprehensive edge case tests

**Translator (main.js):**
- ✅ All core language features working
- ✅ 87/87 translator tests passing
- ⚠️ **Edge cases:** Pattern matching, string escapes, path literals, operator precedence need comprehensive testing

**Testing:**
- ✅ 170+ runtime tests passing
- ✅ 87 translator tests passing
- ✅ 10/41 nixpkgs.lib files tested (24%)
- ❌ **Derivation tests:** 1/10 passing (store path bug)
- ⚠️ **Coverage:** Need to expand to 50%+ of nixpkgs.lib

**Immediate blocker:** Derivation store path bug (30 min fix)

### WORK ORDER (MUST FOLLOW THIS SEQUENCE)
1. **Runtime (main/runtime.js)** - Finish remaining builtins and fix bugs
2. **Translator (main.js)** - Fix edge cases
3. **nixpkgs.lib tests** - Expand coverage

DO NOT work on nix-lib tests until the code translator is fully implemented.
DO NOT work on the translator until the runtime is fully implemented.

### ALWAYS READ DOCUMENTATION WHILE IMPLEMENTING

When implementing builtins, ALWAYS follow this 5-step process:
1. Read https://nix.dev/manual/nix/2.28/language/builtins.html first
2. Search https://noogle.dev for examples
3. Test behavior in actual Nix interpreter (`nix repl`)
4. Implement based on documented behavior, NOT assumptions
5. Verify with tests that match Nix output exactly

You are allowed to use npm modules ONLY through https://esm.sh/NPM_MODULE_NAME (which doesn't always work reliably).

---

## 🎯 Project Goal
Implement a Nix → JavaScript translator with 1-to-1 parity for Nix builtins.

---

## ❌ What Remains To Be Done

### Priority 1: Runtime Bugs (main/runtime.js)

#### Task 1.1: Fix Derivation Store Path Computation (~30 minutes)

**Problem:** Output names not added to environment before computing output paths.

**Root cause in `main/runtime.js` lines 1753-1779:**
1. Builds `env` from attributes (lines 1726-1756)
2. Creates `drvStructure` with this env (line 1759-1767)
3. Computes output paths from serialization (line 1770-1776)
4. THEN adds output paths to env (line 1778) ← TOO LATE!

**What Nix does differently:**
- Adds output NAMES to env with empty strings BEFORE computing paths
- Example: `env.out = ""` must be set BEFORE first hash
- After computing output path, updates `env.out = "/nix/store/..."`

**Required changes:**
After line 1756 in `main/runtime.js`, insert:
```javascript
// Add output names to env with empty strings (Nix behavior)
for (const outputName of outputNames) {
    env[outputName] = ""
}
```

**How to verify:**
```bash
deno test --allow-all main/tests/derivation/001_basic_tests.js
# Should pass 9-10 tests (currently 1/10 passing)
```

**Expected behavior:**
- Test "Basic derivation with no inputs" should compute exact path: `/nix/store/d62izaahds46siwr2b7k7q3gan6vw4p0-test`
- After fix, should pass 9/10 tests
- Test 009 currently fails due to incorrect JS code in test file (not a runtime bug):
  - Line 175-179 in 001_basic_tests.js incorrectly call `builtins.hasAttr({name: "name"}, drv)`
  - Should be `builtins.hasAttr("name")(drv)` (curried form)
  - This is a test file bug, not a runtime or translator bug
  - Can be fixed by correcting the test JS code to use proper curried calls

---

### Priority 1.2: Test Derivation Edge Cases (~2-3 hours)

After fixing the store path bug, additional derivation edge cases need testing:

**Missing test coverage:**
- Multiple outputs: `outputs = ["out" "dev" "doc"];`
- Complex environment variables (nested attrsets, lists, paths)
- Derivation dependencies (inputDrvs)
- Source dependencies (inputSrcs)
- passAsFile attribute
- impureEnvVars attribute
- Fixed-output derivations (outputHash, outputHashAlgo, outputHashMode)
- Structured attributes (__structuredAttrs = true)

**Where to add tests:**
- Create `main/tests/derivation/002_advanced_tests.js`
- Or expand existing `001_basic_tests.js` with more test cases

**How to verify:**
1. Test each case in `nix repl` to get expected behavior
2. Compare with JS runtime output
3. Ensure store paths match exactly

**Time estimate:** 2-3 hours

---

### Priority 2: Optional Runtime Builtins (main/runtime.js)

**Current status:** 3 builtins throw `NotImplemented` errors:
- Line 1058: `fetchMercurial` (requires hg binary)
- Line 1318: `fetchClosure` (requires binary cache protocol)
- Line 1853: `getFlake` (requires full flake system)

**Decision needed:** Are these worth implementing? All three are:
- Rarely used in practice
- Complex (5-22 days estimated)
- Not blocking other work

#### Task 2.1: Implement fetchMercurial (~2-3 days)

**What's missing:**
- Mercurial repository cloning (similar to fetchGit)
- Requires `hg` command-line tool available
- NAR hashing of cloned repository
- Store path management and caching

**Implementation steps:**
1. Read https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-fetchMercurial
2. Create `main/hg_fetcher.js` based on `main/git_fetcher.js` pattern
3. Implement clone, checkout, and cache logic
4. Handle ref/rev parameters
5. Write tests in `main/tests/builtins_fetchmercurial_test.js`

**Time estimate:** 2-3 days (low priority, rarely used)

#### Task 2.2: Implement fetchClosure (~5-7 days, VERY COMPLEX)

**What's missing:**
- Binary cache protocol (HTTP API)
- NAR file downloading and extraction
- Signature verification
- Store path validation
- Cache layer integration

**Implementation steps:**
1. Read https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-fetchClosure
2. Read Nix binary cache format documentation
3. Implement NAR streaming parser (main/nar_parser.js)
4. Implement signature verification (requires cryptography)
5. Integrate with store_manager.js
6. Handle `fromStore`, `toPath`, `inputAddressed` parameters
7. Write comprehensive tests

**Time estimate:** 5-7 days (very complex, experimental feature)

#### Task 2.3: Implement getFlake (~5-7 days, VERY COMPLEX)

**What's missing:**
- Flake input resolution (git, tarball, path, indirect)
- Flake registry support (https://flake.registry)
- Lock file parsing and generation (flake.lock)
- Flake evaluation (outputs, inputs, systems)
- Circular dependency detection

**Implementation steps:**
1. Read https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-getFlake
2. Read Nix flakes RFC (https://github.com/NixOS/rfcs/pull/49)
3. Implement flake.lock parser (main/flake_lock.js)
4. Implement registry fetcher (downloads from GitHub)
5. Implement input resolver (handles all input types)
6. Implement flake evaluator (calls import on flake.nix)
7. Handle indirect references (uses registry)
8. Write extensive tests

**Time estimate:** 5-7 days (very complex system)

#### Task 2.4: Implement fetchTree edge cases (~4-6 hours)

**What's missing in `main/runtime.js` lines 1280-1315:**
- Line 1289: `type='mercurial'` throws NotImplemented
- Line 1311: `type='indirect'` throws NotImplemented (requires flake registry)
- Line 1293: `type='path'` not fully tested (may have edge cases)

**For type='path':**
1. Read https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-fetchTree
2. Test with various path configurations
3. Ensure NAR hashing works correctly
4. Add tests to `main/tests/builtins_fetchtree_test.js`

**For type='indirect':**
- Requires flake registry support (blocked by getFlake implementation)
- Or implement minimal registry resolver just for fetchTree

**Time estimate:** 4-6 hours for type='path' testing, 3-4 days for type='indirect'

---

### Priority 2.5: Runtime Builtin Edge Cases Testing (~3-5 hours)

**What's missing:** Comprehensive edge case tests for implemented builtins. Many builtins have basic tests but lack edge case coverage.

**Builtins needing more edge case tests:**

1. **String operations:**
   - `substring`: Negative indices, out-of-bounds, BigInt vs Number handling
   - `split`: Empty string, regex edge cases, capturing groups
   - `match`: Complex regex patterns, null results, escaping
   - `concatStringsSep`: Empty lists, null values, non-string coercion

2. **List operations:**
   - `sort`: Stability (equal elements maintain order?), custom comparators edge cases
   - `groupBy`: Empty lists, null/undefined keys, duplicate keys
   - `foldl'`: Empty lists, error propagation, promise handling
   - `concatMap`: Nested lists, empty results

3. **Attrset operations:**
   - `mapAttrs`: Nested attrsets, functions as values, promise handling
   - `filterAttrs`: Functions as values, order preservation
   - `catAttrs`: Missing attributes, nested attrsets
   - `zipAttrsWith`: Conflicting types, empty attrsets

4. **Type checking:**
   - `typeOf`: All edge cases (what does Nix return for unusual values?)
   - Type coercion edge cases across all builtins

5. **Path operations:**
   - `path`: Symlinks, permissions, recursive with large trees
   - `filterSource`: Edge cases with filters, paths with special characters
   - Path interpolation with store paths

6. **Import system:**
   - Circular import detection (tested but may need more cases)
   - Import caching across different relative paths to same file
   - Import of .json files with complex structures
   - Error messages for missing files

**How to test:**
1. Read Nix documentation for each builtin's edge cases
2. Test in `nix repl` to confirm expected behavior
3. Add tests to relevant `main/tests/builtins/` subdirectories
4. Compare runtime.js output with Nix output

**Time estimate:** 3-5 hours (incremental, can be done alongside other work)

---

### Priority 3: Translator Edge Cases (main.js)

**DO NOT START until Priority 1 and 2 are resolved (or decision made to skip optional builtins)**

**What's NOT fully tested:**

#### Task 3.1: Advanced Pattern Matching Edge Cases (~2-3 hours)

**Missing test coverage:**
- Nested `@` patterns: `f = { a, b } @ x @ y: ...` (double capture - does Nix even support this?)
- Ellipsis with specific defaults: `{ a ? 1, b ? 2, ... }: ...`
- Mixed pattern styles: `{ a, b ? 2 } @ args: ...`
- Empty patterns: `{}: ...` and `{ ... }: ...`
- Pattern matching with inherit: `{ inherit a b; c ? 3; }: ...`
- Nested destructuring: `{ a: { b, c }, d }: ...` (if Nix supports this)

**How to verify:**
1. Test each pattern in `nix repl` to confirm Nix behavior/syntax
2. Add tests to `main/tests/translator_test.js`
3. Ensure translated JS matches Nix evaluation
4. If pattern is invalid in Nix, document why it's not needed

**Current status:** Basic patterns work, but exotic combinations untested

**Time estimate:** 2-3 hours

#### Task 3.2: String Escape Sequences Verification (~1-2 hours)

**Missing comprehensive tests:**
- All escape sequences: `\n`, `\t`, `\r`, `\\`, `\"`, `\$`, `\${`
- Unicode escapes (if Nix supports them - check in nix repl)
- Invalid escape sequences (should error or pass through)
- Escapes in interpolated strings vs regular strings vs multi-line strings
- Escape sequences in paths (if different behavior)

**How to verify:**
```nix
# Test each escape in nix repl
"\n"   # newline
"\t"   # tab
"\\n"  # literal backslash-n
"\${"  # literal ${
"\x41" # hex escape (if supported)
"\u0041" # unicode escape (if supported)
```

**Where to add tests:**
- Create `main/tests/string_escapes_test.js`
- Test both Nix and JS output match

**Current status:** Basic escapes work (used in ascii-table.nix tests), but comprehensive edge cases untested

**Time estimate:** 1-2 hours

#### Task 3.3: Path Literals Edge Cases (~2-3 hours)

**Known partial implementation:**
- Line 149 in `main.js` has `<nixpkgs>` partial support (only for NIX_PATH lookup)
- Basic path literals work (./relative, /absolute)
- Path interpolation works

**Missing test coverage:**
- Path with spaces: `./path with spaces/file.nix` (check if Nix allows this)
- Path with special characters: `./path-with-dashes/file_with_underscores.nix`
- Path concatenation: `./path + "/subdir"` (check if works, or if requires string conversion)
- Home directory paths: `~/path` (check if Nix supports this syntax)
- Search paths: `<nixpkgs>`, `<nixpkgs/lib>`, etc. (needs NIX_PATH resolution)
- Relative vs absolute path behavior differences
- Path normalization (../ handling)

**<nixpkgs> implementation status:**
- Line 149 in main.js looks up NIX_PATH environment variable
- Splits by `:` and checks each path
- Returns first match
- May not handle all edge cases (multiple colons, empty entries, etc.)

**How to verify:**
```nix
# Test in nix repl with various paths
./test
/tmp/test
<nixpkgs>
./path/../other
```

**Where to add tests:**
- Expand `main/tests/path_interpolation_test.js`
- Or create `main/tests/path_literals_test.js`

**Time estimate:** 2-3 hours

#### Task 3.4: Operator Precedence Verification (~3-4 hours)

**Need comprehensive test suite:**
Create tests covering all operator combinations to ensure precedence matches Nix exactly:

**Operators by precedence (need to verify in Nix docs):**
1. Function application (highest precedence)
2. Unary: `-`, `!`
3. Has-attr: `?`
4. Arithmetic: `*`, `/`
5. Arithmetic: `+`, `-`
6. String concat: `+` (same as addition?)
7. List concat: `++`
8. Update: `//`
9. Comparison: `<`, `>`, `<=`, `>=`
10. Equality: `==`, `!=`
11. Logical AND: `&&`
12. Logical OR: `||`
13. Implication: `->`
14. Let, if, with (lowest precedence)

**Test cases needed:**
- Arithmetic: `1 + 2 * 3` (should be 7, not 9)
- Comparison chains: `1 < 2 && 2 < 3` (should be true)
- Boolean logic: `!true || false && true` (operator precedence: ! > && > ||)
- String concatenation: `"a" + "b" + "c"` (left-to-right)
- Has-attr: `a ? b && c ? d` (? binds tighter than &&)
- Update: `a // b // c` (left-to-right: `(a // b) // c`)
- Mixed: `1 + 2 < 3 * 4` (arithmetic before comparison)
- Function application: `f x + 1` (should be `(f x) + 1`, not `f (x + 1)`)

**How to verify:**
1. Read Nix language reference for operator precedence table
2. Test each case in `nix repl`
3. Compare with JavaScript translation output
4. Create `main/tests/operator_precedence_test.js`

**Current status:** Basic operators work, but complex precedence combinations untested

**Time estimate:** 3-4 hours

#### Task 3.5: Additional Language Features (~4-5 hours)

**Not exhaustively tested:**

**Multi-line strings (indented strings): `'' ... ''`**
- Indentation stripping behavior (removes common leading whitespace)
- Escape sequences in multi-line strings: `''$`, `'''`, `''\n`, `''\t`, `''${`
- Interpolation in multi-line strings: `'' text ${expr} more ''`
- Mixing tabs and spaces in indentation
- Empty lines and trailing whitespace handling
- Line ending normalization (CRLF vs LF)

**URI literals:**
- Check if Nix has first-class URI syntax: `https://example.com`
- Or if URIs are just strings that happen to look like URLs
- Test in `nix repl`: `https://example.com` (does it parse as special syntax?)

**`inherit` edge cases:**
- `inherit (expr) a b c;` - inherit from specific attrset
- `inherit a b c;` - inherit from outer scope
- Scoping behavior: what scope does `inherit` look up?
- Using inherit in different contexts: let, rec sets, non-rec sets, function defaults
- Inheriting non-existent attributes (should error)
- `inherit` with same attribute name defined elsewhere in same attrset

**`with` expression edge cases:**
- Nested `with` expressions: `with a; with b; expr`
- Shadowing behavior: `with { x = 1; }; x + (let x = 2; in x)`
- Error handling: `with null; expr` (should error)
- Performance with large attrsets

**Function definition edge cases:**
- Currying: `a: b: c: body` (multiple parameters)
- Mix of destructuring and simple params: Not allowed? Or `{a}: b: body`?

**Where to test:**
- Expand existing tests or create new test files
- Multi-line strings: `main/tests/string_interpolation_test.js` or new file
- Inherit: Add to `main/tests/translator_test.js`
- With: Add to `main/tests/translator_test.js`

**Current status:** Basic features work, but edge cases and complex combinations untested

**Time estimate:** 4-5 hours

---

### Priority 4: Expand nixpkgs.lib Testing

**DO NOT START until Priority 3 is complete**

**Current state:** 10/41 nixpkgs.lib files tested (24% coverage)

**Files tested (10 total):**
1. ascii-table.nix
2. strings.nix
3. minfeatures.nix
4. source-types.nix
5. versions.nix
6. kernel.nix
7. flakes.nix
8. flake-version-info.nix
9. systems/flake-systems.nix
10. systems/supported.nix

**Files NOT tested (31 remaining):**

**High-value targets (should test these first):**
1. **lists.nix** - Core list manipulation (map, filter, fold, etc.)
2. **attrsets.nix** - Core attrset utilities (mapAttrs, filterAttrs, etc.)
3. **options.nix** - NixOS option system (mkOption, mkEnableOption, etc.)
4. **meta.nix** - Package metadata handling
5. **debug.nix** - Debugging utilities (traceVal, etc.)
6. **filesystem.nix** - Path operations

**Medium-value targets:**
7. systems/doubles.nix - Platform architecture handling
8. systems/parse.nix - Platform string parsing
9. systems/default.nix - Platform system integration
10. systems/inspect.nix - System inspection utilities
11. systems/architectures.nix - Architecture definitions
12. systems/platforms.nix - Platform configurations
13. systems/examples.nix - Example platform configs

**Lower-value targets (defer):**
14. trivial.nix - Already tested via nixpkgs_trivial_test.js
15. licenses.nix - License metadata (large dataset)
16. maintainers.nix - Maintainer metadata (large dataset)
17. teams.nix - Team definitions (large dataset)
18. modules.nix - Module system (complex, may need runtime features)
19. types.nix - Type system (complex)
20. asserts.nix - Assertion utilities
21. cli.nix - CLI utilities
22. customisation.nix - Package customization
23. derivations.nix - Derivation utilities (may need working derivations)
24. fetchers.nix - Fetcher utilities (needs network)
25. fixed-points.nix - Fixed-point combinators (complex)
26. generators.nix - Code generators
27. gvariant.nix - GVariant serialization
28. fileset/ - File set operations (directory)
29. path/ - Path operations (directory)
30. tests/ - Test utilities (directory)
31. (other unlisted files)

**Goal:** Reach 20/41 files tested (50% coverage)

**How to add tests:**
1. Create `main/tests/nixpkgs_lib_[filename]_test.js`
2. Import the .nix file using the translator
3. Evaluate key functions with test inputs
4. Compare outputs with expected values
5. Document any translator bugs found

---

## 🧪 Test Organization

Tests are in `main/tests/`:
```
main/tests/
├── builtins/           # Individual builtin tests
├── operators/          # Operator tests
├── derivation/         # Derivation system tests
├── translator_test.js  # Main translator tests
├── nixpkgs_*_test.js  # nixpkgs.lib integration tests
├── import_*_test.js   # Import system tests
└── *_standalone_test.js  # Tests without runtime import
```

### Run tests:
```bash
# All tests (may hang on some fetch tests)
deno test --allow-all

# Specific category
deno test --allow-all main/tests/builtins/
deno test --allow-all main/tests/operators/
deno test --allow-all main/tests/derivation/

# Individual test
deno test --allow-all main/tests/translator_test.js
deno run --allow-all main/tests/derivation/standalone_test.js
```

---

## 📚 Key Implementation Rules

1. **Read docs first:** Always check nix.dev and noogle.dev before implementing
2. **Test in Nix:** Verify behavior in actual Nix interpreter (`nix repl`)
3. **No assumptions:** Base implementation on documentation, not guesses
4. **BigInt for integers:** Nix ints → JavaScript BigInt (for correct division: 1/2 ≠ 1.0/2)
5. **Scope via Object.create():** Function closures must preserve getters (NOT spread operator!)
   - Correct: `const nixScope = Object.create(parentScope)`
   - Wrong: `const nixScope = {...parentScope}` (loses getters!)
6. **Lazy evaluation:** Recursive sets use getters
7. **Variables via nixScope:** `nixScope["varName"]` avoids keyword conflicts and handles dashes

---

## 🎯 Immediate Next Steps

**MUST follow this order (per WORK ORDER at top):**

1. **Priority 1.1: Fix derivation store path bug** (~30 minutes)
   - Add 3 lines of code after line 1756 in runtime.js
   - Should fix 8 failing tests immediately
   - Also fix test 009 JS code (test file bug, not runtime bug)

2. **Priority 1.2: Test derivation edge cases** (~2-3 hours)
   - Multiple outputs, fixed-output derivations, structured attrs
   - Create `main/tests/derivation/002_advanced_tests.js`

3. **Priority 2: Decide on optional builtins** - Are they needed?
   - fetchMercurial (2-3 days)
   - fetchClosure (5-7 days, VERY COMPLEX)
   - getFlake (5-7 days, VERY COMPLEX)
   - fetchTree edge cases (4-6 hours)
   - **Recommendation:** Skip these (rarely used), move to translator

4. **Priority 2.5: Runtime builtin edge case testing** (~3-5 hours)
   - Test string, list, attrset, path operations with edge cases
   - Incremental work, can be done alongside other tasks

5. **Priority 3: Translator edge cases** (~12-17 hours total)
   - Pattern matching (2-3h)
   - String escapes (1-2h)
   - Path literals (2-3h)
   - Operator precedence (3-4h)
   - Additional features (4-5h)

6. **Priority 4: Expand nixpkgs.lib testing** (4-6 days)
   - Target 50% coverage (20/41 files)
   - Focus on high-value targets first (lists, attrsets, options)

**Recommended path:** 1.1 → 1.2 → Skip Priority 2 → 2.5 → 3 → 4

**Total estimated time (if skipping Priority 2):**
- Priority 1: 2.5-3.5 hours
- Priority 2.5: 3-5 hours
- Priority 3: 12-17 hours
- Priority 4: 4-6 days
- **Grand total:** ~6-8 days of focused work to reach production-ready translator + comprehensive testing
