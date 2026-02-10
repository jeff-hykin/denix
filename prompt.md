# Denix Development Guide

## CRITICAL RULES - READ FIRST

**Your job is to focus on what is NOT implemented and NOT working. Only report what remains to be done. Do not report what you accomplished. You are a senior level developer, there is no such thing as a blocker. Break down large tasks into smaller tasks.**

**Before executing what is below, filter out any achievements. Only keep remaining/unsolved tasks in this document. Add detail to each task if needed.**

### WORK ORDER (MUST FOLLOW THIS SEQUENCE):
1. **Runtime first** - Finish network fetchers and store functions in `main/runtime.js`
2. **Translator second** - Only work on translator edge cases AFTER runtime is complete
3. **Testing last** - Only work on nixpkgs.lib tests AFTER translator is fully implemented

### IMPLEMENTATION REQUIREMENTS:
- **Read Nix documentation while implementing** - ALWAYS check https://nix.dev/manual/nix/2.28/language/builtins.html
- **Search for examples** - Look for real-world usage patterns and test cases
- **Verify behavior in nix repl** - Test actual Nix behavior before implementing
- **Use npm modules via esm.sh** - Example: `https://esm.sh/PACKAGE_NAME` (note: unreliable, may not work)
- **Break down large tasks** - No task should take more than 1 day without intermediate checkpoints

---

## Project Goal
Implement a Nix → JavaScript translator with 1-to-1 parity for Nix builtins.

## Core Files
- **main/runtime.js** - Nix builtins implementation (3 optional builtins remain)
- **main.js** - Nix → JS translator (edge case tests needed)
- **main/tests/** - Test suite (1 flaky network test remains)

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

## Critical Bugs

### ❌ Derivation Store Paths (30 min fix)
**Problem:** Derivation tests failing (1/10 pass) because output names not in env before hashing.

**Location:** `main/runtime.js` line 1756

**Fix:** Add this after line 1756:
```javascript
// Add output names to env with empty strings (Nix behavior)
for (const outputName of outputNames) {
    env[outputName] = ""
}
```

**Verify:** `deno test --allow-all --filter=derivation` should pass 9/10 tests

## Priority 1: Runtime Bugs (DO THIS FIRST)

### 1.1 Derivation Store Path Bug (30 min) - CRITICAL
**Problem:** Derivation tests failing (1/10 pass) because output names not in env before hashing.

**Steps:**
1. Open `main/runtime.js` line 1756
2. Add code snippet shown above (lines 39-43)
3. Run: `deno test --allow-all --filter=derivation`
4. Expected: 9/10 tests pass (was 1/10)

### 1.2 Derivation Edge Cases (2-3 hours)
After fixing the bug above, create `main/tests/derivation/002_advanced_tests.js`:
- Multiple outputs (out, dev, doc)
- Complex env variables
- Passthru attributes
- Meta attributes
- String context propagation

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

### Runtime Issues
1. Derivation store path bug (30 min fix available)
2. Flaky network test needs investigation
3. Optional builtins not implemented (fetchMercurial, fetchClosure, getFlake)

### Translator Issues
1. Pattern matching edge cases not tested
2. String escape sequences not verified
3. Path literal edge cases not tested
4. Operator precedence not comprehensively tested
5. Multi-line strings need verification

### Testing Gaps
1. nixpkgs.lib coverage at 24% (goal: 50%+)
2. 31 nixpkgs.lib files untested
3. Derivation edge cases untested
4. Import system edge cases untested (circular imports, caching behavior)
