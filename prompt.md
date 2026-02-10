# Denix Development Guide

## ⚠️ CRITICAL RULES - READ FIRST ⚠️

**Your job is to focus on what is NOT implemented and NOT working. Only report what remains to be done. Do not report what you accomplished. You are a senior level developer, there is no such thing as a blocker. Break down large tasks into smaller tasks.**

**WORK ORDER (MUST FOLLOW STRICTLY):**
1. **Runtime first** - Finish all network fetchers and store functions in runtime.js
2. **Translator second** - Only work on translator AFTER runtime is 100% complete
3. **Tests third** - Only work on nix-lib tests AFTER translator is 100% complete

**IMPLEMENTATION REQUIREMENTS:**
- **ALWAYS read Nix documentation WHILE implementing**: https://nix.dev/manual/nix/2.28/language/builtins.html
- **Search for real-world examples** of the builtin you're implementing
- **Test behavior in `nix repl`** before implementing in JavaScript
- **Use npm modules ONLY via esm.sh**: `import pkg from "https://esm.sh/PACKAGE_NAME"` (but esm.sh is unreliable)
- **Break down large tasks** into sub-tasks (max 1 day per sub-task)
- **No blockers exist** - if stuck, break the problem down further

**If a plan is missing for how to implement remaining features, create intermediate steps and make them Priority 0.**

---

## WHAT REMAINS TO BE DONE

### Runtime (main/runtime.js) - 3 BUILTINS NOT IMPLEMENTED

**Remaining work:**
- fetchMercurial (optional, rarely used) - see Priority 2.1
- fetchClosure (optional, experimental) - see Priority 2.2
- getFlake (optional, experimental) - see Priority 2.3

**Edge cases NOT implemented:**
- fetchTree types: 'path', 'indirect', 'mercurial' - see Priority 2.4

### Translator (main.js) - EDGE CASES NOT TESTED

**Edge cases need verification:**
- Nested destructuring patterns with @-syntax
- All string escape sequences (\t, \n, \r, \\, \", \$, etc.)
- Path literal edge cases (whitespace, special chars)
- Operator precedence comprehensive tests
- Multi-line string handling
- URI literals

### Testing - LOW COVERAGE

**nixpkgs.lib testing:**
- Only 10/41 files tested (24% coverage)
- Target: 50%+ coverage (21+ files)
- High-value files NOT tested: lists.nix, attrsets.nix, options.nix, meta.nix, debug.nix, filesystem.nix

**Derivation edge cases NOT tested:**
- Multiple outputs (outputs = ["out" "dev" "doc"])
- Passthru attributes preservation
- Meta attributes preservation
- String context propagation
- Edge cases: empty args, long names, special chars

**Import system edge cases NOT tested:**
- Circular import detection completeness
- Cache invalidation behavior
- Relative vs absolute path edge cases

**Network test issues:**
- 1 flaky test: fetchGit ref normalization (uses "master" not "main")

---

## PROJECT OVERVIEW

**Goal:** Implement Nix → JavaScript translator with 1-to-1 parity for Nix builtins.

**Current state:**
- Runtime: 62/65 builtins (3 optional remain)
- Translator: 87/87 core tests passing (edge cases need tests)
- Total tests: 240+ passing (coverage gaps remain)

---

## PRIORITY 1: Derivation Edge Cases (2-3 hours)

**Task:** Create `main/tests/derivation/002_advanced_tests.js`

**Test cases needed:**

1. **Multiple outputs** (15 min)
   ```nix
   derivation {
     outputs = [ "out" "dev" "doc" ];
     # verify each output has unique store path
   }
   ```

2. **Complex env variables** (15 min)
   - Arrays/lists in env (should serialize correctly)
   - Nested attrsets in env
   - Special characters in values

3. **Passthru attributes** (15 min)
   ```nix
   derivation { ... } // { passthru = { foo = "bar"; }; }
   # Verify passthru preserved but not in store path
   ```

4. **Meta attributes** (15 min)
   ```nix
   derivation { ... } // { meta = { description = "..."; }; }
   ```

5. **String context propagation** (30 min)
   - When derivation paths used in strings
   - Context maintained through operations
   - Test with builtins.unsafeDiscardStringContext

6. **Edge cases** (30 min)
   - Empty args array
   - Very long derivation names
   - Special characters in name
   - No outputs specified (should default to ["out"])

**Read first:** https://nix.dev/manual/nix/2.28/language/derivations.html

---

## PRIORITY 2: Optional Runtime Builtins (16-22 DAYS TOTAL)

**DECISION NEEDED:** These are rarely used. Consider skipping to save 16-22 days.

### 2.1 builtins.fetchMercurial (~2-3 days)

**Status:** NOT IMPLEMENTED

**Read while working:**
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-fetchMercurial
- Search: "Mercurial hg clone examples"
- Test in `nix repl`: `builtins.fetchMercurial { url = "..."; rev = "..."; }`

**Implementation steps:**
1. Read Nix docs for fetchMercurial signature and behavior (30 min)
2. Research `hg` CLI usage and Mercurial repo structure (1-2 hours)
3. Create `main/tests/builtins/fetchMercurial_test.js` with basic tests (2-3 hours)
4. Implement in `main/runtime.js` similar to fetchGit but using `hg clone` (1 day)
5. Handle authentication, caching, error cases (4-6 hours)
6. Add integration tests with real repositories (2-3 hours)

**Dependencies:** Requires `hg` (Mercurial) CLI in PATH

### 2.2 builtins.fetchClosure (~5-7 days) - VERY COMPLEX

**Status:** NOT IMPLEMENTED

**Read while working:**
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-fetchClosure
- https://nix.dev/manual/nix/2.28/protocols/binary-cache
- Search: "Nix binary cache narinfo format"
- Search: "Ed25519 signature verification JavaScript"

**What's missing:**
- Binary cache download system
- Store path verification
- Signature checking (Ed25519)
- NAR file extraction

**Implementation steps:**
1. **Research phase (1-2 days):**
   - Read Nix documentation thoroughly
   - Study binary cache protocol
   - Examine narinfo file format
   - Understand signature verification

2. **Implementation phase (3-4 days):**
   - Create `tools/binary_cache.js` for cache downloads
   - Implement NAR file extraction (extend `main/nar_hash.js`)
   - Add signature verification using Web Crypto API or esm.sh library
   - Update store manager for binary cache integration

3. **Testing phase (1-2 days):**
   - Create `main/tests/builtins/fetchClosure_test.js`
   - Test with cache.nixos.org
   - Test signature verification
   - Test error handling

### 2.3 builtins.getFlake (~5-7 days) - VERY COMPLEX

**Status:** NOT IMPLEMENTED

**Read while working:**
- https://nix.dev/manual/nix/2.28/command-ref/new-cli/nix3-flake.html
- Search: "Nix flake.lock schema"
- Search: "Nix flake registry protocol"
- Test in `nix repl`: `builtins.getFlake "github:nixos/nixpkgs"`

**What's missing:**
- Flake lock file parsing
- Flake registry support
- Input resolution system
- Output schema generation

**Implementation steps:**
1. **Research phase (2-3 days):**
   - Read flake documentation comprehensively
   - Study `flake.lock` JSON schema
   - Understand flake inputs/outputs structure
   - Examine registry protocol

2. **Implementation phase (2-3 days):**
   - Create `tools/flake_parser.js` for flake.nix parsing
   - Create `tools/flake_lock.js` for lock file handling
   - Implement input resolution (fetchTree integration)
   - Build output schema generator

3. **Testing phase (1-2 days):**
   - Create `main/tests/builtins/getFlake_test.js`
   - Test with real flakes (nixpkgs, flake-utils)
   - Test lock file generation/update
   - Test error handling

### 2.4 builtins.fetchTree Edge Cases (~3-4 hours)

**Status:** Partial implementation - missing 3 types

**Read while working:**
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-fetchTree
- Test each type in `nix repl`

**Missing types:**
- `type = "path"` - Local directory copy
- `type = "indirect"` - Flake registry lookup
- `type = "mercurial"` - Mercurial repositories

**Implementation steps:**
1. Read documentation for each type (30 min)
2. Implement `type = "path"` - simplest, just copy to store (1 hour)
3. Implement `type = "indirect"` - requires flake registry (1 hour)
4. Implement `type = "mercurial"` - requires fetchMercurial first (1 hour)

---

## PRIORITY 3: Translator Edge Cases (2-3 days)

**Status:** Core features working, edge cases NOT tested

### 3.1 Advanced Pattern Matching (1 day)

**What's NOT tested:**
- Deeply nested destructuring: `{ a: { b: { c } } }`
- Multiple @-bindings: `{ x, y } @ args @ outer`
- Ellipsis with defaults: `{ a ? 1, ... } @ args`
- Pattern matching in nested let bindings

**Steps:**
1. Create `main/tests/translator_patterns_advanced_test.js`
2. Test each pattern type in isolation
3. Test combinations of patterns
4. Verify error messages for invalid patterns

### 3.2 String Escape Sequences (4-6 hours)

**What's NOT tested:**
- All escape sequences: `\t`, `\n`, `\r`, `\\`, `\"`, `\$`
- Invalid escape sequences (should error)
- Escapes in interpolated strings
- Escapes in multi-line strings

**Steps:**
1. Add tests to `main/tests/translator_test.js`
2. Test each escape in plain strings
3. Test escapes in interpolated strings
4. Test escapes in multi-line strings ('' ... '')

### 3.3 Path Literal Edge Cases (4-6 hours)

**What's NOT tested:**
- Paths with spaces (should error or quote)
- Paths with special characters
- Relative vs absolute path behavior
- Path concatenation edge cases
- `<nixpkgs>` lookup behavior (partially implemented)

**Steps:**
1. Test in `nix repl` to verify Nix behavior
2. Add tests for each edge case
3. Fix translator if behavior doesn't match

### 3.4 Operator Precedence (4-6 hours)

**What's NOT tested:**
- Complex precedence: `a + b * c - d / e`
- Logical operators: `a && b || c`
- Comparison chains: `a < b < c`
- Has-attr in expressions: `x.y or z && a.b`

**Steps:**
1. Create comprehensive precedence test table
2. Test each combination in `nix repl`
3. Add tests to translator_test.js
4. Fix any precedence bugs found

### 3.5 Additional Language Features (4-6 hours)

**What's NOT fully tested:**
- Multi-line strings ('' ... '') with indentation
- URI literals (http://example.com)
- Inherit expressions in all contexts
- Comments in complex expressions

---

## PRIORITY 4: nixpkgs.lib Testing (4-6 days)

**Status:** 10/41 files tested (24%)
**Target:** 50%+ coverage (21+ files)

**High-value files NOT tested:**
1. lists.nix - Core list operations
2. attrsets.nix - Core attrset operations
3. options.nix - NixOS option system
4. meta.nix - Package metadata
5. debug.nix - Debugging utilities
6. filesystem.nix - File operations
7. modules.nix - Module system
8. asserts.nix - Assertion utilities
9. derivations.nix - Derivation helpers
10. generators.nix - Code generators
11. cli.nix - CLI utilities

**Implementation:**
- Create tests in `main/tests/nixpkgs_lib_files_test.js`
- Follow existing patterns from tested files
- Start with simpler files (meta, debug)
- Progress to complex files (modules, options)

---

## TECHNICAL DETAILS

### Key Patterns
- **BigInt for integers** - Nix ints → BigInt (correct 1/2 = 0)
- **Object.create() for scopes** - Preserves getters (NOT spread operator)
- **Lazy eval via getters** - Recursive sets need getters

### Development Commands
```bash
./test.sh              # All tests
./test.sh keyword      # Filter by keyword
deno test --allow-all  # Direct deno test
nix repl               # Test Nix behavior
```

### Core Files
- **main/runtime.js** - Nix builtins (62/65, 3 remain)
- **main.js** - Nix → JS translator (edge cases need tests)
- **main/tests/** - Test suites (coverage gaps remain)

---

## KNOWN ISSUES

### Flaky Network Test (5 min fix, optional)

**Problem:** fetchGit test fails because octocat/Hello-World uses "main" not "master"

**Location:** `main/tests/builtins_fetchgit_test.js` line 183-201

**Fix:**
```javascript
// Change lines 189 and 197 from:
ref: "master",
// To:
ref: "main",
```

**Status:** Has graceful error handling, does not block development
