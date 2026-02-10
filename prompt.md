# Denix Development Guide

## QUICK DECISION GUIDE

**Current state:** Runtime is 95% complete (62/65 builtins). All core features working.

**Choose your path:**
1. **RECOMMENDED (6-8 days):** Skip optional builtins → Translator edge cases → nixpkgs.lib testing
2. **COMPLETE (22-30 days):** Implement all optional builtins → Translator → Testing

**Immediate next steps:**
- Start: Priority 1 (Derivation edge cases, 2-3 hours)
- Then decide: Skip or implement optional builtins (Priority 2)
- Then: Priority 3 (Translator edge cases, 12-17 hours)
- Then: Priority 4 (nixpkgs.lib testing, 4-6 days)

## CRITICAL RULES - READ FIRST

**Your job is to focus on what is NOT implemented and NOT working. Only report what remains to be done. Do not report what you accomplished. You are a senior level developer, there is no such thing as a blocker. Break down large tasks into smaller tasks.**

**Before executing what is below, filter out any achievements. Only keep remaining/unsolved tasks in this document. Add detail to each task if needed.**

### WORK ORDER (MUST FOLLOW THIS SEQUENCE):
1. **Priority 1: Derivation edge cases** - Test advanced derivation scenarios
2. **Priority 2: Optional builtins (DECISION)** - Skip or implement fetchMercurial/fetchClosure/getFlake
3. **Priority 3: Translator edge cases** - Only AFTER runtime is complete or explicitly skipped
4. **Priority 4: nixpkgs.lib testing** - Only AFTER translator edge cases are tested

### IMPLEMENTATION REQUIREMENTS:
- **Read Nix documentation while implementing** - ALWAYS check https://nix.dev/manual/nix/2.28/language/builtins.html
- **Search for examples** - Look for real-world usage patterns and test cases
- **Verify behavior in nix repl** - Test actual Nix behavior before implementing
- **Use npm modules via esm.sh** - Example: `https://esm.sh/PACKAGE_NAME` (note: unreliable, may not work)
- **Break down large tasks** - No task should take more than 1 day without intermediate checkpoints

---

## Project Goal
Implement a Nix → JavaScript translator with 1-to-1 parity for Nix builtins.

## Current Status

### What's Working (95% Complete)
- **Runtime (62/65 builtins):**
  - ✅ All math operators (add, sub, mul, div, etc.)
  - ✅ All comparison operators (equal, lessThan, etc.)
  - ✅ All list operations (map, filter, fold, etc.)
  - ✅ All string operations (concatStrings, substring, etc.)
  - ✅ All attrset operations (hasAttr, getAttr, mapAttrs, etc.)
  - ✅ Import system (import, scopedImport with caching)
  - ✅ Derivation system (derivation with store paths)
  - ✅ All network fetchers (fetchGit, fetchTarball, fetchurl, fetchTree, path, filterSource)
  - ✅ Type checking (isInt, isFloat, isString, etc.)
  - ✅ Path operations (baseNameOf, dirOf, etc.)
  - ✅ JSON/TOML parsing (fromJSON, toJSON, fromTOML)

- **Translator (87/87 tests):**
  - ✅ All expressions (let, with, if, assert, function, etc.)
  - ✅ All operators (arithmetic, comparison, logical, etc.)
  - ✅ All patterns (destructuring, @-syntax, defaults, etc.)
  - ✅ String interpolation and paths
  - ✅ Recursive attribute sets
  - ✅ Has-attr expressions

- **Tests (240+ passing):**
  - ✅ 41 translator tests
  - ✅ 179+ runtime builtin tests
  - ✅ 20 nixpkgs trivial.nix pattern tests
  - ✅ 10 nixpkgs.lib file integration tests
  - ⚠️ 1 flaky network test (has graceful error handling)

### What's NOT Working (5% Remaining)
- **Runtime:**
  - ❌ fetchMercurial (optional, rarely used)
  - ❌ fetchClosure (optional, experimental)
  - ❌ getFlake (optional, experimental)
  - ⚠️ fetchTree types: 'path', 'indirect', 'mercurial' (edge cases)

- **Testing:**
  - ⚠️ Derivation edge cases not tested (multiple outputs, passthru, meta)
  - ⚠️ Translator edge cases not tested (nested patterns, all escapes, etc.)
  - ⚠️ nixpkgs.lib coverage at 24% (10/41 files tested)

## Core Files
- **main/runtime.js** - Nix builtins implementation (62/65 working, 3 optional remain)
- **main.js** - Nix → JS translator (all core features working, edge cases need tests)
- **main/tests/** - Test suite (240+ tests, 1 flaky network test)

## Test System

### Run tests:
```bash
./test.sh              # All tests
./test.sh derivation   # Filter by name
deno test --allow-all  # Direct deno test
```

### Test organization:
```
main/tests/
├── builtins/           # Per-builtin tests (attrNames, baseNameOf, etc.)
├── operators/          # Operator tests (and, divide, equal, etc.)
├── derivation/         # Derivation system tests
├── translator_test.js  # Core translator (41 tests)
├── nixpkgs_*_test.js  # Real nixpkgs.lib integration tests
└── *_test.js          # Other runtime tests
```

## Known Issues

### ⚠️ Flaky Network Test (5 min fix, optional)
**Problem:** `fetchGit - ref normalization` test fails intermittently because octocat/Hello-World uses "main" branch, not "master".

**Location:** `main/tests/builtins_fetchgit_test.js` line 183-201

**Impact:** Test already has error handling, skips gracefully. Does not block development.

**Fix (5 minutes):**
```javascript
// Change line 189 and 197 from:
ref: "master",
ref: "refs/heads/master",

// To:
ref: "main",
ref: "refs/heads/main",
```

**Alternative:** Leave as-is (acceptable for network-dependent tests)

---

## RECOMMENDED IMMEDIATE ACTION

**Start with Priority 1: Derivation Edge Cases (2-3 hours)**

This is the shortest, highest-value task that will improve test coverage without requiring major decisions. After completing this, you'll need to decide whether to:
- Skip optional builtins (recommended, saves 16-22 days) → go to Priority 3
- Implement optional builtins → go to Priority 2

---

## Priority 1: Derivation Edge Cases (2-3 hours)
**Status:** Basic derivation tests passing (12/12). Advanced edge cases not tested.

**Task:** Create `main/tests/derivation/002_advanced_tests.js`

**Test cases needed:**

1. **Multiple outputs** (15 min)
   ```nix
   derivation {
     outputs = [ "out" "dev" "doc" ];
     # ... verify each output has unique store path
   }
   ```

2. **Complex env variables** (15 min)
   - Arrays/lists in env (should serialize correctly)
   - Nested attrsets in env
   - Special characters in values

3. **Passthru attributes** (15 min)
   ```nix
   derivation { ... } // { passthru = { foo = "bar"; }; }
   # Verify passthru attributes preserved but not in store path
   ```

4. **Meta attributes** (15 min)
   ```nix
   derivation { ... } // { meta = { description = "..."; }; }
   # Verify meta attributes preserved
   ```

5. **String context propagation** (30 min)
   - When derivation paths are used in strings
   - Verify context is maintained through operations
   - Test with builtins.unsafeDiscardStringContext

6. **Edge cases** (30 min)
   - Empty args array
   - Very long derivation names
   - Special characters in name
   - Derivations with no outputs specified (should default to ["out"])

**Read first:** https://nix.dev/manual/nix/2.28/language/derivations.html

---

## Priority 2: Optional Runtime Builtins (DECISION NEEDED)

**Before starting ANY of these, read the documentation and search for usage examples.**

### Option A: Skip These (Recommended)
These builtins are rarely used and experimental. Total time saved: 16-22 days.

### Option B: Implement All (Only if explicitly requested)

#### 2.1 builtins.fetchMercurial (~2-3 days)
**Read first:** https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-fetchMercurial

**Not implemented:** Full implementation needed (similar to fetchGit).

**Steps:**
1. Read Nix documentation for fetchMercurial signature and behavior
2. Search for `hg` CLI usage examples and Mercurial repository structure
3. Create `main/tests/builtins/fetchMercurial_test.js` with basic tests
4. Implement in `main/runtime.js` (similar to fetchGit but using `hg clone`)
5. Handle authentication, caching, and error cases
6. Add integration tests with real repositories

**Dependencies:** Requires `hg` (Mercurial) CLI available in PATH.

#### 2.2 builtins.fetchClosure (~5-7 days) - VERY COMPLEX
**Read first:** https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-fetchClosure

**Not implemented:** Binary cache download system, store path verification, signature checking.

**Steps:**
1. **Research phase (1-2 days):**
   - Read Nix documentation thoroughly
   - Study binary cache protocol (https://nix.dev/manual/nix/2.28/protocols/binary-cache)
   - Examine narinfo file format
   - Understand signature verification (Ed25519)
2. **Implementation phase (3-4 days):**
   - Create `tools/binary_cache.js` for cache downloads
   - Implement NAR file extraction (extend existing `main/nar_hash.js`)
   - Add signature verification using Web Crypto API or esm.sh library
   - Update store manager for binary cache integration
3. **Testing phase (1-2 days):**
   - Create `main/tests/builtins/fetchClosure_test.js`
   - Test with cache.nixos.org
   - Test signature verification
   - Test error handling

**Dependencies:** Requires understanding of NAR format, binary cache protocol, signature verification.

#### 2.3 builtins.getFlake (~5-7 days) - VERY COMPLEX
**Read first:** https://nix.dev/manual/nix/2.28/command-ref/new-cli/nix3-flake.html

**Not implemented:** Flake lock file parsing, flake registry, input resolution, output schema.

**Steps:**
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

**Dependencies:** Requires fetchTree working, complex JSON schema handling.

#### 2.4 builtins.fetchTree Edge Cases (~3-4 hours)
**Read first:** https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-fetchTree

**Not implemented:**
- `type = "path"` - Local directory copy
- `type = "indirect"` - Flake registry lookup
- `type = "mercurial"` - Mercurial repositories

**Steps:**
1. Read documentation for each type
2. Implement `type = "path"` (simplest - just copy directory to store)
3. Implement `type = "indirect"` (requires flake registry support)
4. Implement `type = "mercurial"` (requires fetchMercurial first)

---

## Priority 3: Translator Edge Cases (AFTER RUNTIME COMPLETE)

**Do NOT work on translator edge cases until Priority 1 and 2 are complete or explicitly skipped.**

### 3.1 Pattern Matching Edge Cases (~3-4 hours)
**Not tested:** Nested @-patterns, ellipsis with defaults, empty patterns.

**Create:** `main/tests/translator_patterns_advanced_test.js`

**Test cases needed:**
```nix
# Nested @ patterns
{ a, b } @ x @ y: x.a + y.b

# Ellipsis with defaults
{ a ? 1, ... } @ args: args.b or 2

# Empty patterns
{}: 42
```

### 3.2 String Escape Sequences (~2-3 hours)
**Not verified:** All escape sequences in all string types.

**Create:** `main/tests/translator_strings_advanced_test.js`

**Test cases needed:**
```nix
# All escapes: \n \r \t \\ \" \$
# In regular strings: "test\n"
# In indented strings: ''test\n''
# Dollar escapes: "''${ expr }"
```

### 3.3 Path Literal Edge Cases (~2-3 hours)
**Not tested:** Spaces, special characters, <nixpkgs> variants.

**Create:** `main/tests/translator_paths_advanced_test.js`

**Note:** <nixpkgs> is partially implemented (line 149 in main.js) but needs tests.

### 3.4 Operator Precedence (~3-4 hours)
**Not verified:** Complex operator combinations.

**Create:** `main/tests/translator_operators_precedence_test.js`

### 3.5 Additional Language Features (~3-4 hours)
**Not fully tested:** Multi-line strings, URI literals, inherit edge cases.

**Create:** `main/tests/translator_language_features_test.js`

---

## Priority 4: nixpkgs.lib Testing (AFTER RUNTIME AND TRANSLATOR COMPLETE)

**Do NOT work on nixpkgs.lib tests until Priority 1-3 are complete.**

### Testing Coverage Gap
**Current:** 10/41 nixpkgs.lib files tested (24%)
**Goal:** 50%+ coverage (21+ files)

### 31 Remaining Files to Test

**High Priority (5-6 days):**
- lists.nix - Core list operations
- attrsets.nix - Core attrset operations
- options.nix - NixOS option system
- meta.nix - Package metadata
- debug.nix - Debugging utilities
- filesystem.nix - File operations

**Medium Priority:**
- modules.nix, asserts.nix, derivations.nix
- generators.nix, cli.nix, gvariant.nix

**Lower Priority (complex dependencies):**
- tests/*.nix files (20 remaining)
- systems/parse.nix, systems/inspect.nix
- Other utility files

---

## Implementation Rules (READ WHILE WORKING)

### Documentation-First Approach (MANDATORY)
**Never implement without reading documentation first.**

1. **Read Nix docs** - https://nix.dev/manual/nix/2.28/language/builtins.html
2. **Search for examples** - Use web search to find real-world usage patterns
3. **Test in nix repl** - Verify actual Nix behavior before implementing
4. **Check noogle.dev** - Search Nix builtin documentation and examples
5. **Read source code** - When docs unclear, check Nix source (GitHub)

### Technical Implementation Rules
1. **BigInt for integers** - Nix ints → BigInt (for correct 1/2 = 0)
2. **Object.create() for scopes** - Preserves getters, NOT spread operator
3. **Lazy eval via getters** - Recursive sets need getters
4. **Use esm.sh for npm** - Example: `import lib from "https://esm.sh/PACKAGE@VERSION"`
   - Warning: esm.sh is unreliable, may not work for all packages
   - Prefer Deno standard library when possible

### Work Order (ENFORCE THIS)

**SIMPLE PATH (Recommended - skip optional features):**
1. Priority 1: Fix derivation bug (30 min)
2. Priority 1: Test derivation edge cases (2-3 hrs)
3. DECISION: Skip optional builtins (fetchMercurial, fetchClosure, getFlake)?
4. Priority 3: Translator edge cases (12-17 hrs)
5. Priority 4: nixpkgs.lib coverage to 50% (4-6 days)

**Total: ~6-8 days to production-ready**

**COMPLETE PATH (Only if explicitly requested):**
Add Priority 2 optional builtins (16-22 days total)

---

## What Remains to Be Done

### Runtime Issues (Priority 1-2)
1. **Derivation edge cases not tested** (2-3 hours)
   - Multiple outputs, complex env vars, passthru/meta attributes
2. **Flaky network test** (Low priority, has graceful handling)
   - fetchGit ref normalization fails intermittently
3. **Optional builtins not implemented** (16-22 days total, decision needed)
   - fetchMercurial (~2-3 days)
   - fetchClosure (~5-7 days, VERY COMPLEX)
   - getFlake (~5-7 days, VERY COMPLEX)
   - fetchTree type='path', type='indirect', type='mercurial' (~3-4 hours)

### Translator Issues (Priority 3, AFTER runtime complete)
1. **Pattern matching edge cases not tested** (~3-4 hours)
   - Nested @-patterns, ellipsis with defaults, empty patterns
2. **String escape sequences not verified** (~2-3 hours)
   - All escapes in regular and indented strings
3. **Path literal edge cases not tested** (~2-3 hours)
   - Spaces, special characters, <nixpkgs> variants
4. **Operator precedence not comprehensively tested** (~3-4 hours)
   - Complex operator combinations
5. **Additional language features not fully tested** (~3-4 hours)
   - Multi-line strings, URI literals, inherit edge cases

### Testing Gaps (Priority 4, AFTER translator complete)
1. **nixpkgs.lib coverage at 24%** (goal: 50%+, 4-6 days)
   - 10/41 files tested
   - 31 files untested (lists.nix, attrsets.nix, options.nix, etc.)
2. **Import system edge cases untested** (~2-3 hours)
   - Circular import error messages
   - Cache invalidation behavior
   - Relative path resolution edge cases
