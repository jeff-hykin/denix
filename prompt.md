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

## QUICK STATUS (Updated 2026-02-10)

**Runtime Completeness:**
- 108 / 115 builtins implemented (94%)
- 7 missing: 4 simple (foldl', warn, convertHash, addDrvOutputDependencies), 3 complex (fetchMercurial, fetchClosure, getFlake)
- Unknown test coverage - needs audit

**What needs immediate work:**
1. Implement 4 simple missing builtins (2-3 hours)
2. Create builtin test coverage matrix (3-4 hours)
3. Add tests for untested builtins (1-2 days)
4. Validate derivation edge cases (2-4 hours)

**After runtime is solid:**
5. Translator edge case testing
6. Expand nixpkgs.lib testing

---

## WHAT'S NOT DONE (CURRENT GAPS)

**Goal:** Nix → JavaScript translator with 1-to-1 parity for Nix builtins

**Runtime gaps (main/runtime.js):**
- **7 builtins not implemented** (out of 115 total Nix 2.18/2.28 builtins):
  - `addDrvOutputDependencies` - no stub (added in Nix 2.24+, may not be needed for 2.18)
  - `convertHash` - no stub (hash format conversion)
  - `foldl` - no stub (list folding, should be `foldl'` with strict evaluation)
  - `warn` - no stub (warning messages)
  - `fetchMercurial` - stub exists, throws NotImplemented (requires hg binary)
  - `fetchClosure` - stub exists, throws NotImplemented (requires binary cache, experimental)
  - `getFlake` - stub exists, throws NotImplemented (requires flake system, experimental)
- **fetchTree partial**: types 'indirect' and 'mercurial' throw NotImplemented
- **Builtin test coverage unknown**: Need audit matrix showing which builtins have tests
- **Derivations**: Edge cases not tested (multiple outputs, passthru, meta, complex env)

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

## PRIORITY 0: Implement Missing Simple Builtins (2-3 hours)

**Goal:** Implement the 4 missing builtins that have no stub

**Why this is Priority 0:**
- Quick wins - all are straightforward functions
- Brings runtime closer to 100% builtin coverage
- `foldl'` and `warn` are commonly used in nixpkgs

### Task 0.1: Implement `foldl'` (30 min)

**Read documentation FIRST:**
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-foldl'
- Test in `nix repl`: `builtins.foldl' (acc: x: acc + x) 0 [1 2 3 4]`

**Location:** Add in `main/runtime.js` after line 574 (after `"tail"`)

**Implementation:**
```javascript
"foldl'": (op) => (nul) => (list) => {
    requireList(list);
    let acc = nul;
    for (const elem of list) {
        acc = op(acc)(elem);
        // Note: The ' means strict evaluation - we evaluate acc at each step
        // JavaScript is already strict, so no special handling needed
    }
    return acc;
},
```

**Test:** Create `main/tests/builtins_fold_test.js` with at least 5 test cases:
1. Sum numbers: `foldl' (acc: x: acc + x) 0 [1 2 3 4]` → 10
2. Build list: `foldl' (acc: x: acc ++ [x]) [] [1 2 3]` → [1,2,3]
3. Empty list: `foldl' (acc: x: acc + x) 5 []` → 5
4. String concat: `foldl' (acc: x: acc + x) "" ["a" "b" "c"]` → "abc"
5. Complex operation: nested function calls

### Task 0.2: Implement `warn` (20 min)

**Read documentation FIRST:**
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-warn
- Test in `nix repl`: `builtins.warn "deprecated" "value"`

**Location:** Add in `main/runtime.js` after line 1354 (after `"traceVerbose"`)

**Implementation:**
```javascript
"warn": (msg) => (value) => {
    // Note: Nix prints warnings to stderr with "warning: " prefix
    console.error(`warning: ${requireString(msg).toString()}`);
    return value;
},
```

**Test:** Add to `main/tests/builtins_eval_control.js`:
1. Basic warning: `warn "deprecated" "value"` → returns "value", prints warning
2. Warning with interpolation: `warn "deprecated: ${x}" y`
3. Multiple warns: nested warn calls

### Task 0.3: Implement `convertHash` (45 min)

**Read documentation FIRST:**
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-convertHash
- Test in `nix repl` with various formats

**Implementation:**
```javascript
"convertHash": (args) => {
    // Converts hash from one format to another
    // args: { hash: "...", toHashFormat: "base16"|"nix32"|"base32"|"base64" }
    // Uses existing hash utilities in tools/hashing.js
    const hash = requireString(args.hash).toString();
    const toFormat = requireString(args.toHashFormat).toString();

    // Need to detect input format, decode, then re-encode
    // Use nix32Encode/nix32Decode from tools/store_path.js
    throw new Error("TODO: implement hash format conversion");
},
```

**Research needed:**
1. What hash formats does Nix support? (base16, nix32, base32, base64, sri)
2. How to detect input format?
3. Existing code in tools/store_path.js for nix32?

**Test:** Create `main/tests/builtins_hash_convert_test.js`

### Task 0.4: Research `addDrvOutputDependencies` (15 min)

**Check if this is needed:**
- This builtin was added in Nix 2.24+ (we target 2.18)
- Research: Is it in Nix 2.18? Check Nix changelog
- If NOT in 2.18: Document as "not needed for 2.18 compatibility"
- If in 2.18: Add to implementation list

**Action:** Read Nix changelog, update BUILTIN_COVERAGE.md

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

**Goal:** Verify all 108 implemented builtins (out of 115 total) actually work

**Why this is Priority 2:**
- Can't trust implementation without verification
- Some builtins may have tests, some may not
- Need comprehensive test coverage matrix to identify gaps

**What "tested" means:**
A builtin is "tested" if there exists at least one test that:
1. Calls the builtin directly (e.g., `builtins.add(1n)(2n)`)
2. Verifies the output matches expected behavior
3. Would fail if the builtin was broken or removed

**Where to look for tests:**
- `main/tests/builtins_*.js` - Direct builtin tests
- `main/tests/operators_test.js` - Operator tests (add, sub, mul, div, etc.)
- `main/tests/translator_test.js` - Some builtins called indirectly
- `main/tests/nixpkgs_*.js` - Integration tests (may use builtins)

**Known test file gaps (no file exists):**
- No `builtins_string_test.js` - string operations NOT directly tested
  - `concatStringsSep`, `replaceStrings`, `split`, `match`, `stringLength`, `substring` need tests
- No `builtins_hash_test.js` - hash operations NOT tested
  - `hashString`, `hashFile` implemented but not tested
- No `builtins_type_test.js` - type checking may not be directly tested
  - `isNull`, `isBool`, `isInt`, `isFloat`, `isString`, `isList`, `isAttrs`, `isFunction`, `typeOf`
- No `builtins_fold_test.js` - folding operations not tested (foldl' not yet implemented)

### Task 2.1: Create Builtin Coverage Matrix (3-4 hours)

**Create `BUILTIN_COVERAGE.md` with this process:**

**Step 1: Generate builtin list (15 min)**
```bash
# Extract all builtins from runtime.js
grep -E '^\s*"[a-zA-Z][a-zA-Z0-9]*":\s*' main/runtime.js | \
  sed 's/.*"\([a-zA-Z][a-zA-Z0-9]*\)".*/\1/' | sort -u > /tmp/implemented.txt

# Create the Nix 2.18 official list
cat > /tmp/nix_2_18_builtins.txt << 'EOF'
[paste the 115 builtins from Nix docs]
EOF
```

**Step 2: Check each builtin (2-3 hours)**

For each builtin in `/tmp/nix_2_18_builtins.txt`:
1. Check if in `/tmp/implemented.txt` → mark as ✅ Implemented or ❌ Missing
2. Search all test files: `grep -r "builtins\.<name>\|runtime\.<name>" main/tests/`
3. If found in tests → mark as ✅ Tested, note which file(s)
4. If not found → mark as ❌ Untested

**Step 3: Create markdown table**

```markdown
# Nix 2.18 Builtin Coverage (115 total)

Status: 108/115 implemented, X/115 tested

## Summary by Category

### Type Checking (9 builtins)
| Builtin | Implemented | Tested | Test File | Notes |
|---------|-------------|--------|-----------|-------|
| isNull | ✅ | ✅ | builtins_type.js | |
| isBool | ✅ | ✅ | builtins_type.js | |
| isInt | ✅ | ✅ | builtins_type.js | |
| isFloat | ✅ | ✅ | builtins_type.js | |
| isString | ✅ | ✅ | builtins_type.js | |
| isList | ✅ | ✅ | builtins_type.js | |
| isAttrs | ✅ | ✅ | builtins_type.js | |
| isFunction | ✅ | ✅ | builtins_type.js | |
| typeOf | ✅ | ✅ | builtins_type.js | |

### Arithmetic (8 builtins)
| Builtin | Implemented | Tested | Test File | Notes |
|---------|-------------|--------|-----------|-------|
| add | ✅ | ✅ | operators_test.js | |
| sub | ✅ | ✅ | operators_test.js | |
| mul | ✅ | ✅ | operators_test.js | |
| div | ✅ | ✅ | operators_test.js | |
| ceil | ✅ | ? | ? | Need to check |
| floor | ✅ | ? | ? | Need to check |
| lessThan | ✅ | ✅ | operators_test.js | |

... [continue for all categories]

### String Operations (12 builtins)
### List Operations (15 builtins)
### Attrset Operations (14 builtins)
### File Operations (9 builtins)
### Network Fetchers (7 builtins)
### Derivations (4 builtins)
### Evaluation Control (7 builtins)
### Hash/Encoding (4 builtins)
### Misc (26 builtins)

## Untested Builtins (Priority Order)

**High Priority (commonly used):**
- [ ] concatStringsSep - string joining
- [ ] replaceStrings - string replacement
- [ ] ...

**Medium Priority (utility functions):**
- [ ] ...

**Low Priority (rarely used):**
- [ ] ...
```

**Automation option:** Create a script to help:
```javascript
// tools/generate_coverage.js
const builtins = [...]; // from Nix docs
const implemented = new Set([...]); // from runtime.js
// grep through test files and generate markdown
```

### Task 2.2: Add Missing Builtin Tests (varies, 1-2 days)

**For each untested builtin, follow this workflow:**

**Step 1: Read documentation (5-10 min)**
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-<name>
- Read the full description, parameters, return value
- Note any special behavior or edge cases

**Step 2: Test in `nix repl` (5-10 min)**
```nix
nix repl
nix-repl> builtins.<name> arg1 arg2 ...
# Try various inputs:
# - Normal cases
# - Edge cases (empty, null, long inputs)
# - Error cases (wrong types)
```

**Step 3: Write test cases (15-30 min)**
- Create or add to appropriate test file
- Minimum 3 test cases per builtin:
  1. Basic usage (most common case)
  2. Edge case (empty/null/boundary)
  3. Type validation (should throw for wrong types)
- For complex builtins: 5-10 test cases

**Step 4: Verify implementation (5-15 min)**
- Run test: `./test.sh`
- If fails: Compare our output with `nix repl` output
- Fix implementation if needed
- Document any intentional differences (rare)

**Priority order:**

**High Priority (commonly used, add first):**
- String: `concatStringsSep`, `replaceStrings`, `split`, `match`, `splitVersion`
- List: `genList`, `sort`, `groupBy`, `partition`, `foldl'` (new!)
- Attrset: `mapAttrs`, `zipAttrsWith`, `removeAttrs`, `listToAttrs`
- File: `baseNameOf`, `dirOf`, `pathExists`, `readFile`, `readDir`

**Medium Priority (utility, add if time):**
- Type checking: Should already be tested, verify
- Comparison: `compareVersions`, `lessThan`
- Encoding: `toJSON`, `fromJSON`, `toXML`, `fromTOML`
- Hash: `hashString`, `hashFile`

**Low Priority (advanced/rare, defer):**
- `seq`, `deepSeq` - evaluation control
- `addErrorContext` - debugging
- `unsafeDiscardStringContext` - advanced string context
- `unsafeGetAttrPos` - introspection

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

1. **Priority 0:** Implement missing simple builtins (2-3 hours) ← **START HERE**
2. **Priority 1:** Derivation validation (2-4 hours)
3. **Priority 2:** Runtime builtin audit (1-2 days)
4. **Priority 3:** Translator edge cases (1-2 days) - **ONLY AFTER RUNTIME AUDIT COMPLETE**
5. **Priority 4:** nixpkgs.lib testing (3-5 days) - **ONLY AFTER TRANSLATOR COMPLETE**
6. **Priority 5:** Optional builtins (only if needed)

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

### Not Implemented (7 builtins out of 115 total)

**Missing completely (no stub):**
- `addDrvOutputDependencies` - may not exist in Nix 2.18, needs research
- `convertHash` - hash format conversion (should implement)
- `foldl'` - strict left fold (commonly used, should implement)
- `warn` - warning messages (commonly used, should implement)

**Stubbed but throw NotImplemented:**
- `fetchMercurial` - requires hg binary (optional, rarely used)
- `fetchClosure` - requires binary cache (experimental, rarely used)
- `getFlake` - requires flake system (experimental, rarely used)

### Partial Implementation
- `fetchTree`: types 'indirect' and 'mercurial' throw NotImplemented

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

**Step 1 (RIGHT NOW - 30 min):**
1. Test `foldl'` behavior in `nix repl`:
   ```nix
   builtins.foldl' (acc: x: acc + x) 0 [1 2 3 4]
   builtins.foldl' (acc: x: acc ++ [x]) [] [1 2 3]
   ```
2. Implement `foldl'` in runtime.js (after line 575)
3. Create `main/tests/builtins_fold_test.js` with 5+ test cases
4. Run `./test.sh` to verify

**Step 2 (NEXT 20 min):**
5. Test `warn` behavior in `nix repl`:
   ```nix
   builtins.warn "this is deprecated" "value"
   ```
6. Implement `warn` in runtime.js (after `trace`)
7. Add test to `main/tests/builtins_eval_control.js`
8. Run `./test.sh` to verify

**Step 3 (NEXT 45 min):**
9. Research `convertHash` - test in `nix repl`:
   ```nix
   builtins.convertHash { hash = "sha256-..."; toHashFormat = "base16"; }
   ```
10. Research Nix hash formats (base16, nix32, base32, base64, sri)
11. Check tools/store_path.js for existing hash utilities
12. Implement or stub `convertHash` based on research

**Step 4 (NEXT 15 min):**
13. Research `addDrvOutputDependencies` - is it in Nix 2.18?
14. Check Nix 2.18 vs 2.24 changelog
15. Document findings

**Step 5 (NEXT 2-4 hours - Priority 1):**
16. Run `./test.sh derivation` to see current state
17. Create `main/tests/derivation/002_advanced_tests.js`
18. Test multiple outputs, passthru, meta, edge cases (see Priority 1 section)

**Step 6 (TOMORROW - 4-8 hours - Priority 2):**
19. Create `BUILTIN_COVERAGE.md` with all 115 builtins
20. Audit which builtins have tests vs just implementation
21. Add tests for untested builtins

**DO NOT PROCEED TO PRIORITY 3 OR 4 UNTIL PRIORITY 0-2 COMPLETE**
