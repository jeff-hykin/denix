# Denix Development Priorities

## ⚠️ CRITICAL RULES (READ THIS FIRST)

Your job is to focus on what is NOT implemented and NOT working. Only report what remains to be done. Do not report what you accomplished. You are a senior level developer, there is no such thing as a blocker. Break down large tasks into smaller tasks.

Before executing what is below, please filter out any achievements. Only keep remaining/unsolved tasks in this document. Add detail to each task if needed.

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
- Test 009 may still fail due to function serialization issue (investigate separately)

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

### Priority 3: Translator Edge Cases (main.js)

**DO NOT START until Priority 1 and 2 are resolved (or decision made to skip optional builtins)**

**What's NOT fully tested:**

#### Task 3.1: Advanced Pattern Matching Edge Cases

**Missing test coverage:**
- Nested `@` patterns: `f = { a, b } @ x @ y: ...` (double capture)
- Ellipsis with specific defaults: `{ a ? 1, b ? 2, ... }: ...`
- Mixed pattern styles: `{ a, b ? 2 } @ args: ...`
- Empty patterns: `{}: ...` and `{ ... }: ...`

**How to verify:**
1. Test in `nix repl` to confirm expected behavior
2. Add tests to `main/tests/translator_test.js`
3. Ensure translated JS matches Nix evaluation

#### Task 3.2: String Escape Sequences Verification

**Missing comprehensive tests:**
- All escape sequences: `\n`, `\t`, `\r`, `\\`, `\"`, `\$`, `\${`
- Unicode escapes (if Nix supports them)
- Invalid escape sequences (should error or pass through)
- Escapes in interpolated strings vs regular strings

**How to verify:**
```nix
# Test each escape in nix repl
"\n"   # newline
"\t"   # tab
"\\n"  # literal backslash-n
"\${"  # literal ${
```

#### Task 3.3: Path Literals Edge Cases

**Known partial implementation:**
- Line 149 in `main.js` has `<nixpkgs>` partial support
- Not clear if all path edge cases are handled

**Missing test coverage:**
- Path with spaces: `./path with spaces/file.nix`
- Path with special characters: `./path-with-dashes/file_with_underscores.nix`
- Path concatenation: `./path + "/subdir"`
- Home directory paths: `~/path` (if Nix supports)
- Search paths: `<nixpkgs>`, `<nixpkgs/lib>`, etc.

#### Task 3.4: Operator Precedence Verification

**Need comprehensive test suite:**
Create tests covering all operator combinations:
- Arithmetic: `1 + 2 * 3` vs `(1 + 2) * 3`
- Comparison chains: `1 < 2 && 2 < 3`
- Boolean logic: `!true || false && true`
- String concatenation: `"a" + "b" + "c"`
- Has-attr: `a ? b && c ? d` vs `(a ? b) && (c ? d)`
- Update: `a // b // c` (left-to-right or right-to-left?)

**How to verify:**
1. Test each case in `nix repl`
2. Compare with JavaScript translation output
3. Document any differences

#### Task 3.5: Additional Language Features

**Not exhaustively tested:**
- Multi-line strings (indented strings): `'' ... ''`
  - Indentation stripping behavior
  - Escape sequences in multi-line strings
  - Interpolation in multi-line strings
- URI literals: `https://example.com` (if these are first-class in Nix)
- `inherit` edge cases:
  - `inherit (expr) a b c;`
  - `inherit a b c;` in different contexts
  - Scoping behavior with inherit
- Comments preservation (not critical, but nice to have)

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

1. **Fix derivation store path bug** (~30 minutes) - Add output names to env before first hash
2. **Decide on optional builtins** - Are fetchMercurial, fetchClosure, getFlake needed?
3. **If skipping optional builtins:** Move to translator edge cases (Priority 3)
4. **Expand nixpkgs.lib testing** (Priority 4) - Target 50% coverage

**Recommendation:** Fix derivation bug first, then skip optional builtins (rarely used) and focus on translator polish + testing expansion.
