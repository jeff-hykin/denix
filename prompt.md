# ⚠️ CRITICAL RULES - READ FIRST ⚠️

**Your job is to focus on what is NOT implemented and NOT working. Only report what remains to be done. NEVER report accomplishments, achievements, or what you've done. You are a senior level developer - there are no blockers, only tasks to break down.**

**Before executing tasks below, filter out any achievements. Only keep remaining/unsolved tasks. Add detail to each task if needed.**

## 🚨 WORK ORDER - MUST FOLLOW THIS SEQUENCE:

1. **FIRST:** Finish the runtime (main/runtime.js) - Complete all network fetchers and store functions
2. **SECOND:** Finish the translator (main.js) - Only after runtime is 100% complete
3. **THIRD:** Test against nixpkgs.lib - Only after translator is 100% complete

**DO NOT skip ahead. DO NOT work on translator if runtime is incomplete. DO NOT work on nixpkgs tests if translator has issues.**

## 📖 ALWAYS READ DOCUMENTATION WHILE IMPLEMENTING:

When implementing any builtin:
1. **Read official docs:** https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-FUNCTION_NAME
2. **Read community docs:** https://noogle.dev/f/builtins/FUNCTION_NAME
3. **Search for examples:** Search internet for real-world usage and behavior
4. **Test in Nix:** Verify behavior in actual Nix interpreter before implementing
5. **Base implementation on documentation, NOT assumptions**

## 🚨 CURRENT BLOCKERS (as of 2026-02-06)

### BLOCKER #1: Derivation tests FAILING (0/10 passing)
- Error: "undefined is not iterable (cannot read property Symbol(Symbol.iterator))"
- Location: main/tests/derivation/001_basic_tests.js
- **This MUST be fixed before any other work**

---

## 📋 PRIORITY 1: Fix derivation implementation

**STATUS:** Derivation builtin exists but failing all tests. Root cause unknown. Must investigate and fix:

### Steps to debug and fix:

1. **Run test and capture error:**
   ```bash
   deno run --allow-all main/tests/derivation/001_basic_tests.js
   ```

2. **Check builtins.derivation return value:**
   - Add console.log in runtime.js at line ~1692
   - Verify it returns object with: outPath, drvPath, outputs, all properties
   - Check outputs is an array (not string)
   - Check if any code tries to iterate over non-iterable

3. **Check builtins.toJSON implementation:**
   - Verify it handles derivation objects correctly
   - Ensure it doesn't try to iterate over non-iterable properties
   - Check how it serializes Symbol properties

4. **Common issues:**
   - outputs not an array (should be ["out"] by default)
   - Missing required properties on derivation object
   - toJSON trying to iterate over wrong type
   - Symbol.iterator missing on a required iterable

5. **Fix and verify:** All 10 derivation tests must pass before proceeding

**TIME ESTIMATE:** 2-4 hours to debug and fix

**STOP HERE. DO NOT PROCEED TO PRIORITY 2 UNTIL THIS IS FIXED.**

---

## 📋 PRIORITY 2: Remaining runtime work (After derivation fixed)

**DO NOT START UNTIL:** Derivation tests pass (10/10 passing)

**REMAINING WORK:** 3 optional/experimental builtins need implementation

### Task 2.1: Implement fetchMercurial (~2-3 days)
**Status:** Not implemented, throws NotImplemented error
**Documentation:**
- https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-fetchMercurial
- Search for "nix fetchMercurial examples" for real-world usage

**What's needed:**
- Mercurial repository cloning
- Revision/branch/tag support
- Hash verification
- Store path integration
- Caching similar to fetchGit

**Steps to implement:**
1. Research Mercurial CLI commands for cloning
2. Determine if `hg` command is required or if there's a JS library
3. Check if esm.sh has mercurial support (unlikely)
4. May need to shell out to `hg` command like fetchGit shells to `git`
5. Implement store path computation for hg repos
6. Add tests comparing output with real Nix

### Task 2.2: Implement fetchClosure (~5-7 days) - COMPLEX
**Status:** Not implemented, throws NotImplemented error
**Documentation:**
- https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-fetchClosure
- Search for "nix fetchClosure binary cache" for details

**What's needed:**
- Binary cache protocol understanding
- NAR file downloading and verification
- Store path validation
- Signature verification
- Content-addressed derivation support

**Steps to implement:**
1. Read Nix binary cache protocol documentation
2. Understand NAR format (already partially implemented in nar_hash.js)
3. Implement cache.nixos.org API calls
4. Download and verify NAR files
5. Extract NAR to store
6. Handle fromPath parameter
7. Handle toPath parameter (content-addressed conversion)
8. Implement signature verification
9. Add comprehensive tests

**WARNING:** This is complex. Break into smaller tasks. Consider if it's needed.

### Task 2.3: Implement getFlake (~5-7 days) - VERY COMPLEX
**Status:** Not implemented, throws NotImplemented error
**Documentation:**
- https://nix.dev/manual/nix/2.18/command-ref/new-cli/nix3-flake.html
- Search for "nix flakes specification" for full details

**What's needed:**
- Flake input resolution
- Flake lock file parsing
- Input fetching (uses fetchTree with type='indirect')
- Flake evaluation
- Output schema validation

**Steps to implement:**
1. Understand flake.nix schema (inputs, outputs)
2. Implement flake.lock parsing
3. Implement input resolution (github:, git+https:, etc.)
4. Implement fetchTree type='indirect' (flake registry)
5. Evaluate flake outputs
6. Handle flake dependencies
7. Add comprehensive tests

**WARNING:** This is very complex. May require implementing flake registry. Consider if it's needed.

### Task 2.4: Implement fetchTree type='indirect' (~3-4 days)
**Status:** Partial implementation, type='indirect' not supported
**Documentation:**
- Part of getFlake system
- Resolves flake references via registry

**What's needed:**
- Flake registry lookup (registry.json)
- Indirect reference resolution
- Integration with existing fetchTree

**NOTE:** This is a prerequisite for getFlake. Implement if doing Task 2.3.

---

## 📋 PRIORITY 3: Translator improvements (After runtime 100% complete)

**DO NOT START UNTIL:** Runtime has 65/65 builtins working OR user decides optional builtins not needed

**REMAINING EDGE CASES TO VERIFY:**

### Task 3.1: Advanced pattern matching
- Nested destructuring with @ pattern
- Ellipsis in nested patterns
- Default values in nested patterns
- Test file location: main/tests/translator_patterns_test.js (add new tests)

### Task 3.2: String escape sequences
- Verify all escape sequences work: \n, \t, \r, \\, \", \$, \${
- Test in string literals and interpolated strings
- Test file location: main/tests/string_interpolation_test.js (add new tests)

### Task 3.3: Path literal edge cases
- Relative paths: ./file, ../file
- Home paths: ~/file (note: partial implementation exists at main.js line 149)
- Angle bracket paths: <nixpkgs> (note: partial implementation exists)
- Test file location: main/tests/path_literals_test.js (create new file)

### Task 3.4: Operator precedence
- Verify all 16 operators have correct precedence
- Test complex expressions: `1 + 2 * 3 == 7`
- Test file location: main/tests/operators_precedence_test.js (create new file)

### Task 3.5: Additional language features
- Multi-line indented strings (verify strip leading whitespace)
- URI literals (http://example.com)
- Inherit from specific scope: `inherit (pkgs) lib;`
- Test file location: main/tests/language_features_test.js (create new file)

---

## 📋 PRIORITY 4: nixpkgs.lib testing (After translator 100% complete)

**DO NOT START UNTIL:** Translator has all edge cases verified OR user decides edge cases not critical

**REMAINING FILES TO TEST:** 31 out of 41 nixpkgs.lib files not tested

**High-value files (test first):**
- lib/lists.nix - List manipulation functions
- lib/attrsets.nix - Attribute set operations
- lib/options.nix - NixOS option system
- lib/modules.nix - Module system (complex)
- lib/types.nix - Type definitions

**Utility files:**
- lib/meta.nix - Package metadata
- lib/debug.nix - Debugging utilities
- lib/filesystem.nix - File operations
- lib/cli.nix - CLI argument parsing
- lib/derivations.nix - Derivation helpers

**Remaining systems/*.nix files:**
- lib/systems/default.nix
- lib/systems/doubles.nix
- lib/systems/elaborate.nix
- lib/systems/examples.nix
- lib/systems/inspect.nix
- lib/systems/parse.nix
- lib/systems/platforms.nix

**Test file location:** main/tests/nixpkgs_lib_files_test.js (add new tests)

---

## 📚 IMPLEMENTATION GUIDELINES

**ALWAYS follow this process when implementing any builtin:**

1. **Read official documentation FIRST:**
   - https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-FUNCTION_NAME
   - https://noogle.dev/f/builtins/FUNCTION_NAME
   - Search internet: "nix FUNCTION_NAME examples"
   - Search internet: "nix FUNCTION_NAME behavior"

2. **Test in real Nix interpreter:**
   - Verify exact behavior with edge cases
   - Document any surprising behavior
   - Test error cases

3. **Implement based on documentation (NOT assumptions):**
   - Follow exact semantics from docs
   - Match error messages when possible
   - Preserve lazy evaluation where Nix uses it

4. **Create comprehensive tests:**
   - Compare JS output with real Nix output
   - Test edge cases (empty, null, errors)
   - Test integration with other builtins

**Dependencies:**
- Prefer Deno @std/* standard library when possible
- npm packages ONLY via https://esm.sh/PACKAGE_NAME
- WARNING: esm.sh is unreliable, test before committing to a package
- Consider shelling out to system commands when esm.sh unavailable (e.g., `git`, `hg`)

**When stuck:**
- Break large tasks into smaller subtasks
- Research how Nix implements it (check Nix source code on GitHub)
- Ask user for clarification on priorities
- There are NO blockers, only tasks to decompose further

---

## 🗂️ PROJECT STRUCTURE

### Core files:
- `main/runtime.js` - Runtime implementation (62/65 builtins)
- `main.js` - Nix to JavaScript translator
- `main/tests/` - 160+ test files organized by category

### Support modules:
- `main/fetcher.js` - HTTP downloads with retry
- `main/tar.js` - Tarball extraction
- `main/nar_hash.js` - Directory hashing (NAR format)
- `main/store_manager.js` - Store path management + caching
- `tools/store_path.js` - Store path computation
- `tools/hashing.js` - SHA256, MD5, SHA1, SHA512
- `tools/import_resolver.js` - Path resolution for imports

### Test organization:
- `main/tests/operators/` - Operator tests (16 operators)
- `main/tests/builtins/` - Builtin tests (25 builtins)
- `main/tests/derivation/` - Derivation tests (FAILING)
- `main/tests/*_test.js` - Integration tests
- `main/tests/run_all_tests.js` - Test runner

### Running tests:
```bash
# Run all tests
deno test --allow-all

# Run specific test
deno run --allow-all main/tests/simple_test.js

# Run test category
deno run --allow-all main/tests/run_all_tests.js

# Run derivation tests
deno run --allow-all main/tests/derivation/001_basic_tests.js
```

---

## 🔍 SUMMARY: WHAT'S NOT WORKING / NOT IMPLEMENTED

### IMMEDIATE ISSUE:
- **Derivation tests failing (0/10 passing)** - Must fix first

### Runtime (main/runtime.js) - 3 builtins missing:
- fetchMercurial (line 1055) - throws NotImplemented
- fetchClosure (line 1315) - throws NotImplemented
- getFlake (line 1850) - throws NotImplemented
- fetchTree type='indirect' (line 1308) - throws error, needs flake registry
- fetchTree type='mercurial' (line 1286) - throws error, needs fetchMercurial

### Translator (main.js) - Edge cases not verified:
- Nested destructuring with @ and defaults - may have bugs
- All string escape sequences - not fully tested
- Path literal edge cases - partial implementation
- Operator precedence - not verified comprehensive
- Multi-line indented strings - not verified
- URI literals - may not be implemented

### Testing - Coverage gaps:
- 31 out of 41 nixpkgs.lib files not tested (24% coverage)
- Derivation tests failing (0/10 passing)
- No tests for: operator precedence, path literals, many edge cases

---

## 🎯 YOUR CURRENT FOCUS

**RIGHT NOW (Priority 1):** Fix derivation tests - investigate why 0/10 passing

**AFTER THAT:** Wait for user decision on Priority 2 vs Priority 3 vs Priority 4

**REMEMBER:**
- Only report what's NOT done or NOT working
- Break down large tasks into smaller ones
- Read Nix documentation before implementing
- Test against real Nix to verify behavior
