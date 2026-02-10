# Denix Development Guide

## ⚠️ CRITICAL RULES - READ FIRST ⚠️

**YOUR PRIME DIRECTIVE:**
Your job is to focus on what is NOT implemented and NOT working. Only report what remains to be done. Do not report what you accomplished. You are a senior level developer, there is no such thing as a blocker. Break down large tasks into smaller tasks.

**MANDATORY WORK ORDER (DO NOT DEVIATE):**
1. ✅ Runtime implementation (main/runtime.js) FIRST - finish ALL network fetchers and store functions
2. ⏸️ Translator improvements (main.js) SECOND - only after runtime is 100% complete
3. ⏸️ nixpkgs.lib testing THIRD - only after translator is 100% complete

**BEFORE IMPLEMENTING ANYTHING:**
- ALWAYS read Nix official documentation FIRST: https://nix.dev/manual/nix/2.28/language/builtins.html
- Search for additional documentation on noogle.dev and the internet
- Test behavior in `nix repl` to verify expected behavior
- Example: For builtins.fetchClosure, read https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-fetchClosure
- Read, test, then implement - in that order

**EXTERNAL DEPENDENCIES:**
- You MAY use npm modules ONLY via https://esm.sh/NPM_MODULE_NAME
- WARNING: esm.sh is unreliable and may not work for all modules
- Prefer Deno standard library when possible
- Test esm.sh imports before committing to them

**WHEN WRITING THIS DOCUMENT:**
- Remove ALL checkboxes with ✅ and their associated text (they are achievements)
- Remove ALL "Completed" or "Done" sections
- Focus ONLY on gaps, missing features, untested code
- Add implementation detail if a task is unclear how to execute
- Break tasks larger than 4 hours into subtasks

**Core principle: SIMPLICITY**
- Delete unused code ruthlessly
- Test before adding features
- Core functionality before edge cases
- No over-engineering

**When stuck:**
- Break the problem down into smaller pieces
- There are no blockers - only tasks that need more breakdown
- Read documentation FIRST, then implement
- Test in `nix repl` before implementing

---

## WHAT'S NOT DONE (CURRENT GAPS)

**Goal:** Nix → JavaScript translator with 1-to-1 parity for Nix builtins

**Runtime gaps (main/runtime.js):**
- 3 optional builtins not implemented: fetchMercurial, fetchClosure, getFlake
- fetchTree: types 'indirect', 'mercurial', 'path' not implemented
- Unknown: Which of the "62 implemented" builtins actually have tests? (needs audit)
- Derivations: Edge cases not tested (multiple outputs, passthru, meta, complex env)

**Translator gaps (main.js):**
- Nested pattern matching edge cases not tested
- String escape sequences not comprehensively tested
- Path literal edge cases not tested
- Operator precedence not comprehensively tested
- Multi-line strings may have edge cases

**Testing gaps:**
- Only 10/41 nixpkgs.lib files tested (24% coverage)
- Need builtin coverage matrix to know what's actually tested
- Many edge cases lack tests

---


## PRIORITY 1: Derivation Validation (2-4 hours)

**Goal:** Verify derivations work correctly, add edge case tests

**Why this is Priority 1:**
- Derivations are CORE to Nix (everything is a derivation)
- Only 12 basic tests exist - need comprehensive coverage
- Multiple outputs, env serialization, passthru/meta NOT tested

### Task 1.1: Run Existing Derivation Tests (15 min)

```bash
./test.sh derivation
```

**Verify:**
- What do "12/12 tests passing" actually test?
- Are store paths computed correctly?
- Read `main/tests/derivation/001_basic_tests.js`

### Task 1.2: Create Advanced Derivation Tests (2-3 hours)

Create `main/tests/derivation/002_advanced_tests.js`

**Test Case 1: Multiple Outputs (30 min)**
```nix
derivation {
  name = "multi-output";
  system = "x86_64-linux";
  builder = "/bin/sh";
  outputs = [ "out" "dev" "doc" ];
}
```
- Verify result.out, result.dev, result.doc exist
- Each should have different store path
- Test in `nix repl` first!

**Test Case 2: Complex Environment Variables (30 min)**
```nix
derivation {
  name = "complex-env";
  system = "x86_64-linux";
  builder = "/bin/sh";
  stringVar = "hello";
  numberVar = 42;
  listVar = [ "a" "b" "c" ];  # Space-separated in env
  attrsetVar = { x = 1; };     # Nix repr in env
}
```
- Verify env.stringVar, env.numberVar, env.listVar serialization
- Test serialization in `nix repl`

**Test Case 3: Passthru Attributes (20 min)**
```nix
(derivation {...}) // { passthru = { foo = "bar"; }; }
```
- Verify passthru exists but doesn't affect store path

**Test Case 4: Meta Attributes (20 min)**
```nix
(derivation {...}) // { meta = { description = "..."; }; }
```
- Verify meta exists but doesn't affect store path

**Test Case 5: Edge Cases (30 min)**
- Empty args: `args = [];`
- Long names: 100+ character names
- Special chars: `name = "test-1.2.3";`
- Invalid: Missing required fields (should throw)

**Skip:** String context (too complex, needs 1+ day)

---

## PRIORITY 2: Runtime Builtin Audit (1-2 days)

**Goal:** Verify all 62 "implemented" builtins actually work

**Why this is Priority 2:**
- Can't trust "62/65 implemented" without verification
- Some builtins may have tests, some may not
- Need comprehensive test coverage matrix

### Task 2.1: Create Builtin Coverage Matrix (2-3 hours)

Create `BUILTIN_COVERAGE.md`:

```markdown
# Nix 2.18 Builtin Coverage

| Builtin | Implemented | Tested | Test File | Notes |
|---------|-------------|--------|-----------|-------|
| add | ✅ | ✅ | operators.js | |
| addErrorContext | ✅ | ❌ | - | No test |
| all | ✅ | ✅ | builtins_list.js | |
| any | ✅ | ✅ | builtins_list.js | |
... (all 65 builtins)
```

**Steps:**
1. List all 65 Nix 2.18 builtins from https://nix.dev/manual/nix/2.28/language/builtins.html
2. Check runtime.js for implementation (search `"<builtin>":`)
3. Search test files for usage (grep)
4. Mark implemented vs tested vs missing

### Task 2.2: Add Missing Builtin Tests (varies)

For each untested builtin:
1. Test in `nix repl` to understand behavior
2. Add test to appropriate test file
3. Verify implementation matches Nix behavior

**Priority order:**
- High: String functions, list functions, attrset functions
- Medium: Type functions, comparison functions
- Low: Advanced features (seq, deepSeq, etc.)

---

## PRIORITY 3: Translator Edge Cases (1-2 days)

**Goal:** Verify translator handles all Nix language features

**Why this is Priority 3:**
- Core translator works (87/87 tests pass)
- Edge cases may break on real-world code
- Need comprehensive test coverage

### Task 3.1: Pattern Matching Edge Cases (4-6 hours)

Create `main/tests/translator_patterns_advanced_test.js`

**Test Case 1: Nested @ Patterns**
```nix
{ a, b, ... }@args@outer: ...
```

**Test Case 2: Ellipsis with Defaults**
```nix
{ a ? 1, b ? 2, ... }: ...
```

**Test Case 3: Complex Destructuring**
```nix
{ x ? { y ? { z ? 1; }; }; }: x.y.z
```

**Test Case 4: @ with Nested Patterns**
```nix
{ a: { b: c } } @ full: full.a.b
```

Test each in `nix repl` first!

### Task 3.2: String Escape Sequences (2-3 hours)

Add to `main/tests/translator_test.js`:

```javascript
// Test all escape sequences
testCases.push(
    ["\"\\t\"", "\t"],       // Tab
    ["\"\\n\"", "\n"],       // Newline
    ["\"\\r\"", "\r"],       // Carriage return
    ["\"\\\\\"", "\\"],      // Backslash
    ["\"\\\"\"", "\""],      // Quote
    ["\"\\\$\"", "$"],       // Dollar (for interpolation)
    // Multi-line strings
    ["''\\n  text\\n''", "text"],
    // URI literals
    ["https://example.com", "https://example.com"],
)
```

### Task 3.3: Path Literal Edge Cases (2-3 hours)

Test:
- Relative paths: `./foo`, `../bar`
- Absolute paths: `/foo/bar`
- Home paths: `~/foo` (may not work without HOME)
- Paths with spaces: `./foo\ bar` (if supported)
- <nixpkgs> paths (partial implementation exists)

### Task 3.4: Operator Precedence (2-3 hours)

Create comprehensive operator precedence tests:
```nix
1 + 2 * 3        # Should be 7, not 9
a && b || c      # Test precedence
!a && b          # Unary vs binary
```

Verify against Nix behavior in `nix repl`.

---

## PRIORITY 4: nixpkgs.lib Testing (3-5 days)

**Goal:** Expand from 10/41 files to 25/41 files (60% coverage)

**Why this is Priority 4:**
- Validates translator + runtime against real-world code
- Catches edge cases not found by unit tests
- Provides confidence for production use

### Task 4.1: High-Value Files (2-3 days)

**Tier 1: Most Used (add to nixpkgs_lib_files_test.js)**

1. **lists.nix** (4-6 hours)
   - Core list functions: map, filter, fold, flatten, unique, etc.
   - Heavy usage in nixpkgs
   - ~30 functions to test

2. **attrsets.nix** (4-6 hours)
   - Core attrset functions: mapAttrs, filterAttrs, recursiveUpdate, etc.
   - Critical for nixpkgs
   - ~40 functions to test

3. **options.nix** (3-4 hours)
   - NixOS module system option definitions
   - mkOption, types, etc.
   - ~15 functions to test

**Tier 2: Utilities (add if time permits)**

4. **meta.nix** (2-3 hours) - Package metadata helpers
5. **debug.nix** (2-3 hours) - Debugging utilities (traceVal, etc.)
6. **filesystem.nix** (3-4 hours) - Filesystem operations
7. **generators.nix** (2-3 hours) - Config file generators (JSON, TOML, INI)
8. **cli.nix** (2-3 hours) - Command-line argument parsing

**Tier 3: Systems (add if time permits)**

9. **systems/parse.nix** (1-2 hours) - Platform string parsing
10. **systems/inspect.nix** (1-2 hours) - Platform inspection
11. **systems/doubles.nix** (1-2 hours) - Platform pair definitions
12. **systems/default.nix** (1-2 hours) - Main systems export

### Task 4.2: Test Pattern

For each file:
1. Read the .nix file - understand what it exports
2. Identify 3-5 representative functions to test
3. Test in `nix repl` to verify expected behavior
4. Add test case to `nixpkgs_lib_files_test.js`
5. Run test, fix any translator/runtime bugs found

---

## PRIORITY 5: Optional Builtins (optional, 2-3 weeks)

**These are OPTIONAL - rarely used in practice**

### Task 5.1: fetchMercurial (2-3 days)

**If you need Mercurial support:**
- Read documentation FIRST: https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-fetchMercurial
- Test in `nix repl` to understand behavior
- Similar to fetchGit but for Mercurial repos
- Need `hg` command or isomorphic-hg library (via esm.sh)
- Low priority: Mercurial usage declining

### Task 5.2: fetchClosure (5-7 days)

**VERY COMPLEX - only if needed:**
- Read documentation FIRST: https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-fetchClosure
- Search for NAR format documentation
- Fetches closures from binary caches
- Requires NAR format understanding
- Requires binary cache protocol (cache.nixos.org)
- Experimental feature in Nix

### Task 5.3: getFlake (5-7 days)

**VERY COMPLEX - only if needed:**
- Read documentation FIRST: https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-getFlake
- Search for flake system documentation
- Full flake system implementation
- Flake lockfile parsing
- Flake input resolution
- Experimental feature in Nix

### Task 5.4: fetchTree type='indirect' (3-4 days)

**Advanced fetchTree types:**
- Read documentation FIRST: https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-fetchTree
- Test each type in `nix repl`
- type='indirect': Flake registry lookups
- type='path': Local directory (may already work)
- type='mercurial': Mercurial repos

---

## WORK ORDER - DO NOT SKIP PRIORITIES

**YOU MUST COMPLETE IN THIS ORDER:**

1. **Priority 1:** Derivation validation (2-4 hours) ← **START HERE**
2. **Priority 2:** Runtime builtin audit (1-2 days)
3. **Priority 3:** Translator edge cases (1-2 days) - **ONLY AFTER RUNTIME AUDIT COMPLETE**
4. **Priority 4:** nixpkgs.lib testing (3-5 days) - **ONLY AFTER TRANSLATOR COMPLETE**
5. **Priority 5:** Optional builtins (only if needed)

**Why this order:**
- Can't trust translator until runtime is fully tested
- Can't trust nixpkgs tests until translator handles all edge cases
- Foundation must be solid before building on top

---

## TESTING

See `TESTING.md` for comprehensive testing guide.

**Quick commands:**
```bash
./test.sh                # All tests
./test.sh runtime        # Runtime builtins
./test.sh translator     # Translator
./test.sh derivation     # Derivations
./test.sh import         # Import system
./test.sh infra          # Infrastructure
./test.sh integration    # nixpkgs integration
```

---

## KNOWN ISSUES

### Not Implemented (3 builtins)
- fetchMercurial (optional)
- fetchClosure (optional, experimental)
- getFlake (optional, experimental)

### Partial Implementation
- fetchTree: types 'indirect', 'mercurial' not implemented

### Network Tests
- fetchGit ref normalization: Flaky (uses "master" instead of "main")
- May fail if network is down or remote changes

### Edge Cases Not Tested
- Derivations: Multiple outputs, passthru, meta, complex env
- Translator: Nested patterns, string escapes, operator precedence
- Import system: Some circular import cases

---

## SIMPLIFICATION PRINCIPLES

1. **Delete ruthlessly:** If unused, delete it
2. **Test first:** Verify before implementing
3. **Core before edge cases:** Solid foundation before extras
4. **Document gaps:** What's NOT working > what is
5. **Break down tasks:** Max 1 day per task, ideally 2-4 hours

---

## IMPLEMENTATION WORKFLOW (MANDATORY)

**For EVERY builtin/feature you implement, follow these steps:**

1. **READ DOCUMENTATION FIRST**
   - Start at: https://nix.dev/manual/nix/2.28/language/builtins.html
   - Search noogle.dev for examples: https://noogle.dev/
   - Search the internet for additional context
   - Example: For builtins.fetchClosure, read the full docs before coding

2. **TEST IN NIX REPL**
   - Open `nix repl` in terminal
   - Test the behavior with various inputs
   - Understand edge cases and error conditions
   - Document expected vs actual behavior

3. **WRITE TEST FIRST**
   - Create test file with expected behavior from step 2
   - Use examples from documentation
   - Test edge cases you discovered

4. **IMPLEMENT**
   - Write the actual implementation
   - Reference your test results from step 2
   - Keep it simple - match Nix behavior exactly

5. **VERIFY**
   - Run your test
   - Compare output with `nix repl` behavior
   - Fix any discrepancies

**DO NOT skip steps. DO NOT implement without documentation.**

## GETTING HELP

- **Nix manual:** https://nix.dev/manual/nix/2.28/language/builtins.html
- **Nix builtins search:** https://noogle.dev/
- **Test in nix repl:** `nix repl` → test behavior
- **No blockers:** Break problems down further
- **External modules:** Only via https://esm.sh/NPM_MODULE_NAME (may be unreliable)

---

## IMMEDIATE NEXT ACTIONS

**Step 1 (RIGHT NOW - 15 min):**
1. Read this prompt.md fully - understand work order
2. Run `./test.sh derivation` to see current state
3. Read `main/tests/derivation/001_basic_tests.js` to understand what's tested

**Step 2 (TODAY - 2-4 hours):**
4. Create `main/tests/derivation/002_advanced_tests.js`
5. Add test case 1: Multiple outputs - test in `nix repl` first
6. Add test case 2: Complex environment variables - test in `nix repl` first
7. Add test case 3: Passthru attributes
8. Add test case 4: Meta attributes
9. Add test case 5: Edge cases (empty args, long names, special chars)

**Step 3 (TOMORROW - 4-8 hours):**
10. Read Nix 2.18 builtins documentation: https://nix.dev/manual/nix/2.28/language/builtins.html
11. Create `BUILTIN_COVERAGE.md` listing all 65 builtins
12. For each builtin: mark if implemented, mark if tested, note which test file
13. Identify gaps - which builtins have code but NO tests

**Step 4 (THIS WEEK - 2-3 days):**
14. Add tests for high-priority untested builtins
15. Fix any bugs found during testing
16. Complete Priority 2 runtime audit

**DO NOT PROCEED TO PRIORITY 3 OR 4 UNTIL PRIORITY 1-2 COMPLETE**
