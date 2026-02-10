# Denix Development Guide

**Last Updated:** 2026-02-10

---

## 🚨 CRITICAL RULES - READ THIS FIRST

**Your job is to focus on what is NOT implemented and NOT working. Only report what remains to be done. Do not report accomplishments. You are a senior level developer - there is no such thing as a blocker. Break down large tasks into smaller tasks.**

**BEFORE executing what is below, filter out any achievements. Only keep remaining/unsolved tasks in this document. Add detail to each task if needed.**

### WORK ORDER (MUST FOLLOW THIS SEQUENCE):
1. **RUNTIME FIRST** - Finish implementing and testing ALL builtins in runtime.js
   - Fix derivation bugs (7/10 tests failing)
   - Add tests for 35 untested builtins (reach 80%+ coverage)
   - Implement optional fetchers if needed (fetchMercurial, fetchClosure)
2. **TRANSLATOR SECOND** - Only after runtime is 100% stable
   - Test translator edge cases
   - Verify all language features work
3. **NIXPKGS.LIB TESTS THIRD** - Only after translator is fully verified
   - Test against real nixpkgs.lib files
   - Expand coverage to 50%+ of lib files

**DO NOT work on translator until runtime is fully implemented and tested (80%+ coverage).**
**DO NOT work on nixpkgs.lib until translator edge cases are verified.**
**DO NOT skip ahead. Follow the work order strictly.**

### MANDATORY IMPLEMENTATION PROCESS:

**BEFORE writing ANY code:**
1. **READ the official Nix documentation** for the feature you're implementing
   - Primary: https://nix.dev/manual/nix/2.28/language/builtins.html
   - Search: noogle.dev, Nix source code on GitHub
   - DO NOT guess behavior, DO NOT assume you know how it works
2. **TEST in `nix repl`** to understand exact behavior
   - Test edge cases (null, empty, invalid input)
   - Note exact error messages
   - Test type conversions
3. **COMPARE outputs** - Your implementation must match Nix exactly

**WHILE writing code:**
- Keep Nix documentation open in browser
- Test each function in `nix repl` as you implement
- Match behavior exactly, not what makes sense to you

**DEPENDENCIES:**
- **PREFER Deno standard library** over external packages
- **USE esm.sh for npm packages:** `import foo from "https://esm.sh/package-name@version"`
  - WARNING: esm.sh is unreliable, many packages don't work
  - Only use if Deno stdlib doesn't have the functionality
  - Test thoroughly, have fallback plan
- **NO npm, NO jsr, NO package.json** - Only URL imports

**TASK BREAKDOWN:**
- If you don't know HOW to implement something, break it down:
  1. Research what Nix does (docs, source code)
  2. Create implementation plan with phases
  3. Identify dependencies and prerequisites
  4. Implement smallest testable unit first
  5. Add comprehensive tests
  6. Move to next unit
- There is NO such thing as a blocker - only tasks not broken down enough

### ENFORCEMENT REMINDERS:

**IF you find yourself about to:**
- ❌ Report "I completed X" → STOP. Only report what's NOT done.
- ❌ Work on translator → STOP. Is runtime 80%+ tested?
- ❌ Work on nixpkgs.lib → STOP. Are translator edge cases verified?
- ❌ Write code without reading docs → STOP. Read Nix documentation first.
- ❌ Guess how a builtin works → STOP. Test in `nix repl` first.
- ❌ Say "this is blocked" → STOP. Break task into smaller pieces.
- ❌ Use npm packages → STOP. Use Deno stdlib or esm.sh URLs only.

**ALWAYS ask yourself:**
1. Have I read the Nix documentation for this feature?
2. Have I tested this in `nix repl` to verify exact behavior?
3. Am I following the work order (Runtime → Translator → nixpkgs.lib)?
4. Am I focusing on what's NOT done (not accomplishments)?

---

## 📊 Current Status - What's NOT Done

**CRITICAL BUGS (BLOCKING):**
- 🚨 **Derivation tests:** 7/10 tests FAILING (test 003-009)
  - Hash mismatches: Tests 003-008 (ATerm serialization format differs from Nix)
  - Test code bug: Test 009 (incorrect test translation - easy 15 min fix)
  - **THIS BLOCKS PRODUCTION USE** - derivations are core functionality

**Runtime:** 35/109 builtins UNTESTED (32.1% NOT tested)
- 14 high-priority functions needed for 80% coverage
- 21 medium-priority functions for 90% coverage

**Translator:** Edge cases NOT verified
- Pattern matching: Nested @, ellipsis with defaults NOT tested
- String escapes: Unicode escapes NOT verified
- Path literals: <nixpkgs> only partially works
- Operator precedence: NOT comprehensively tested
- Multi-line strings, URI literals: NOT verified

**nixpkgs.lib:** 31/41 files NOT tested (24% coverage)
- High-value files NOT tested: lists.nix, attrsets.nix, options.nix
- Only 10 simple files currently tested

**Immediate Next Task:**
1. Fix test 009 (15 min) - Change hasAttr calls in test code ✅ Easy win
2. Fix builtins.placeholder (30-45 min) - Implement correct placeholder algorithm ✅ Solution found!
3. Verify all 10 derivation tests pass → ~1 hour total to fix ALL derivation bugs!

---

## 🚨 Priority 0: Fix Derivation Bugs (DO THIS FIRST)

### Overview
Run: `./test.sh derivation` → Shows 7/10 tests failing

**Root causes identified:**
1. **hasAttr dual implementation** - Two incompatible APIs exist
2. **ATerm serialization mismatch** - Hash computation differs from Nix

### Task 0.1: Fix Test 009 - Incorrect Test Code (15 min) ⚡

**Problem:** Test 009 (line 175 in 001_basic_tests.js) has incorrect JavaScript translation:
- Test calls: `builtins.hasAttr({name: "name"}, drv)`
- This passes an object `{name: "name"}` as first argument
- But `builtins.hasAttr` is curried: `hasAttr(attr)(attrSet)`
- Should be: `builtins.hasAttr("name")(drv)`

**Impact:**
1. Calling `hasAttr({name: "name"})` returns a function (waiting for second call)
2. That function gets passed to toJSON
3. toJSON throws "cannot convert a function to JSON"

**Fix:**
1. Edit `main/tests/derivation/001_basic_tests.js` lines 175-178
2. Change all 4 hasAttr calls from `builtins.hasAttr({name: "X"}, drv)` to `builtins.hasAttr("X")(drv)`
3. Test should pass immediately after fix

**Files to modify:**
- `main/tests/derivation/001_basic_tests.js` lines 175-178

**Note:** The builtin implementation is CORRECT (curried). The test code is WRONG.

---

### Task 0.2: Fix builtins.placeholder Implementation (30-45 min) ⚡⚡

**Problem:** Tests 003-008 produce wrong output path hashes. The ATerm serialization format doesn't match Nix exactly.

Example mismatch (test 003):
- Expected: `/nix/store/9gfq1d96jqxmvkzj0ihsc2yxgnys7x21-test-outputs`
- Got: `/nix/store/d8w3khwy1wyq3plw9hfxyz8fqmkkd24r-test-outputs`

**MANDATORY FIRST STEP:** Read Nix documentation on derivations:
- https://nix.dev/manual/nix/2.28/language/derivations
- https://nix.dev/manual/nix/2.28/protocols/store-path
- Search for "ATerm" and "Derive" in Nix source code: https://github.com/NixOS/nix/blob/master/src/libstore/derivations.cc

**Root Cause Investigation:**

The hash mismatch means our ATerm serialization format differs from Nix. The derivation is serialized to ATerm format BEFORE hashing to compute output paths.

**Debugging steps:**

1. **Create a minimal test derivation and inspect Nix's .drv file:**
   ```bash
   nix-build --expr 'derivation { name = "test-outputs"; system = "x86_64-linux"; builder = "/bin/sh"; outputs = ["out" "dev"]; }' --show-trace
   # Find the .drv file path in the output, then:
   cat /nix/store/...test-outputs.drv
   ```
   This shows the EXACT ATerm format Nix uses.

2. **Add debug logging to our code to compare:**
   In `main/runtime.js` line ~1779, add:
   ```javascript
   console.log("Our ATerm:", drvSerializedForHash)
   ```
   Run test 003 and compare our output with Nix's .drv file.

3. **Common ATerm format issues to check:**
   - **Output format:** Should be `("out","<path>","","")` not `["out","<path>","",""]`
   - **Environment variable sorting:** Must be alphabetically sorted by key
   - **String escaping:** Special chars in env var values must be escaped
   - **Output names in env:** For multiple outputs, MUST include all output names as empty strings BEFORE computing hash
     - For `outputs = ["out" "dev"]`, env must have `out = ""` and `dev = ""` when computing paths
   - **Builder args format:** Must be list of strings in correct format
   - **Input derivations format:** Currently empty `[]` but format must match Nix

4. **Verify empty output placeholders are correct:**
   Lines 1763-1765 in runtime.js add `env[outputName] = ""` for each output.
   Our format looks correct: `Derive([("out","","","")],[],[],"x86_64-linux","/bin/sh",[],[("builder","/bin/sh"),("name","test"),("out",""),("system","x86_64-linux")])`

   **CRITICAL DISCOVERY:** The issue is that Nix does NOT use empty strings for output paths during hashing!

   **The Root Cause:**
   - We use: `env[outputName] = ""` (empty string)
   - Nix uses: `env[outputName] = builtins.placeholder(outputName)` (special hash-based placeholder)

   **Nix's placeholder algorithm:**
   ```javascript
   function placeholder(output_name) {
       const clear_text = `nix-output:${output_name}`
       const digest = sha256(clear_text)  // SHA256 hash
       return nixbase32_encode(digest)     // Encode in Nix base-32
   }
   ```
   Example: `placeholder("out")` → something like `iyh8f5s9vq6n...` (32 chars)

   **What Nix does (CORRECT):**
   1. Build ATerm with output paths set to PLACEHOLDERS: `env.out = placeholder("out")`
   2. Hash that ATerm to compute output paths
   3. Replace placeholders with actual computed paths in final .drv

   **What we're doing (WRONG):**
   1. Build ATerm with empty strings: `env.out = ""`
   2. Hash that (WRONG - different hash than Nix!)
   3. Get different output paths than Nix

   **THE FIX:**

   **Step 1: Fix `builtins.placeholder` (line 1915-1923 in runtime.js)**

   Current WRONG implementation:
   ```javascript
   "placeholder": (outputName)=>{
       const name = requireString(outputName).toString()
       const hash = sha256Hex(name).slice(0, 32)
       return `/${hash}`
   }
   ```

   Correct implementation (import encodeBase32 from store_path.js):
   ```javascript
   "placeholder": (outputName)=>{
       const name = requireString(outputName).toString()
       const clearText = `nix-output:${name}`
       const digest = sha256Hex(clearText)
       const digestBytes = new Uint8Array(digest.match(/.{2}/g).map(b => parseInt(b, 16)))
       const compressed = new Uint8Array(20)
       for (let i = 0; i < digestBytes.length; i++) {
           compressed[i % 20] ^= digestBytes[i]
       }
       return encodeBase32(compressed)  // Returns the placeholder WITHOUT leading slash!
   }
   ```

   **Step 2: Use placeholder in derivation (line 1764 in runtime.js)**

   Change from:
   ```javascript
   env[outputName] = ""
   ```

   To:
   ```javascript
   env[outputName] = builtins.placeholder(outputName)
   ```

   **Step 3: Run tests**
   After fix: `./test.sh derivation` should show 9/10 passing (test 009 still needs fix)

   **References:**
   - [Store Derivation and Deriving Path - Nix 2.28.1](https://nix.dev/manual/nix/2.28/store/derivation/)
   - [Store Derivation and Deriving Path - Nix 2.30.3](https://nix.dev/manual/nix/2.30/store/derivation/)
   - [Derivation outputs in a content-addressed world - Tweag](https://www.tweag.io/blog/2021-02-17-derivation-outputs-and-output-paths/)

**Files to modify:**
- `main/runtime.js` lines 1730-1795 (derivation implementation)
  - Check order of env var operations
  - Verify all env vars are added before serialization
- `tools/store_path.js` lines 89-117 (serializeDerivation)
  - Check ATerm format matches Nix exactly
  - Verify parentheses vs brackets
  - Verify string escaping

**Testing approach:**
1. Fix one test at a time (start with test 003 - simplest)
2. Add console.log to compare our ATerm vs Nix's ATerm
3. Fix format differences until hash matches
4. Verify fix works for all tests 003-008

**Validation:**
Run `./test.sh derivation` after each change. All 10 tests must pass.

---

### Task 0.3: Verify Derivation Tests Pass (30 min)

After fixes:
- Run `./test.sh derivation`
- All 10 tests must pass (currently 3/10 passing)
- Test edge cases: multiple outputs, various env var types
- Document any Nix version differences discovered

**Validation criteria:**
- No test failures
- Output paths match Nix exactly
- Error messages match Nix format

---

## ⚡ Priority 1: Test Coverage (AFTER Derivations Fixed)

### Goal: 80% Coverage (Need 14 more tests, 3-5 hours)

**Current:** 74/109 tested (67.9%)
**Target:** 88/109 tested (80%)

### Quick Wins (30 min)

**Test:** `lessThan` (line 211) and `mul` (line 233)
**File:** Edit `main/tests/builtins_math_bitwise_test.js` - Add to END
**Documentation:** https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-lessThan and https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-mul

**BEFORE writing tests:** Read the documentation, understand expected behavior

Test both in `nix repl` first:
```bash
builtins.lessThan 3 5        # → true
builtins.lessThan "a" "b"    # → true (lexicographic)
builtins.mul 3 5             # → 15
builtins.mul 3.5 2           # → 7.0
```

Add 5-8 test cases for each function covering:
- Integer comparison/multiplication
- Float handling
- Mixed int/float operations
- Edge cases (0, negative numbers, equal values)

---

### File Operations (2-3 hours)

**File:** Create `main/tests/builtins_file_ops_test.js`
**Documentation:** https://nix.dev/manual/nix/2.28/language/builtins.html (search for each function)

**BEFORE writing tests:** Read Nix documentation for each function. Test in `nix repl` to understand exact behavior.

Test these 6 functions:
1. `pathExists` (line 1422) - Check file/directory existence
2. `readFile` (line 1397) - Read file contents as string
3. `readDir` (line 1614) - List directory contents with types
4. `readFileType` (line 1474) - Get file type (regular/directory/symlink)
5. `findFile` (line 1631) - Search in NIX_PATH-like structure
6. `getEnv` (line 1396) - Read environment variables

**Testing approach:**
- Use Deno.makeTempFileSync() / Deno.makeTempDirSync() for test files
- Always clean up in finally blocks
- Test in nix repl first to understand exact behavior
- 5-8 tests per function

---

### Conversion & Control (1-2 hours)

**File:** Create `main/tests/builtins_misc_test.js`
**Documentation:** https://nix.dev/manual/nix/2.28/language/builtins.html (search for each function)

**BEFORE writing tests:** Read Nix documentation for each function. Test in `nix repl` to understand exact behavior, especially:
- What exact XML format does `toXML` produce?
- What errors does `fromJSON` throw?
- How does `splitVersion` handle edge cases?

Test these 6 functions:
1. `toPath` (line 359) - Convert string to path (must be absolute)
2. `toXML` (line 381) - Convert value to XML format
3. `fromJSON` (line 396) - Parse JSON string
4. `abort` (line 408) - Throw error with message
5. `getAttr` (line 637) - Get attribute from attrset (curried)
6. `splitVersion` (line 1020) - Split version string into components

**Testing approach:**
- Test all type conversions thoroughly
- Check error handling (abort, invalid JSON)
- Verify exact XML format matches Nix
- 5-8 tests per function

---

## ⚡ Priority 2: Optional Builtins (If Needed, 16-22 days)

These are rarely used in practice. Most projects don't need them:

### fetchMercurial (2-3 days)
**File:** `main/runtime.js` - Add implementation
**Documentation:** https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-fetchMercurial
**Dependencies:** Need Mercurial binary or hg package
**Status:** NOT IMPLEMENTED
**Research needed:** How does Nix call hg? What cache format? Study Nix source code.

### fetchClosure (5-7 days)
**Documentation:** https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-fetchClosure
**Complexity:** Very high - requires binary cache support
**Status:** NOT IMPLEMENTED
**Research needed:** Binary cache protocol, NAR format, signature verification. Read Nix source extensively.

### getFlake (5-7 days)
**Documentation:** https://nix.dev/manual/nix/2.28/command-ref/new-cli/nix3-flake
**Complexity:** Very high - requires full flake system
**Status:** NOT IMPLEMENTED
**Research needed:** Flake lock files, flake references, flake resolution. Study Nix flake implementation.

### fetchTree edge cases (4-6 hours)
**Missing types:** `type='mercurial'`, `type='path'`, `type='indirect'`
**Status:** NOT IMPLEMENTED

**Recommendation:** Skip these unless a specific project requires them

---

## ⚡ Priority 3: Translator Edge Cases (2-3 days)

**Status:** All core features work. Edge cases NOT verified.

Test these advanced patterns:

### Pattern Matching
- Nested @ patterns: `{ a, b } @ x @ y`
- Ellipsis with defaults: `{ a ? 1, ... } @ args`
- Multiple destructuring levels

### String Handling
- Unicode escape sequences: `"\u{1F600}"`
- Multi-line strings with indentation
- Ancient string syntax edge cases

### Path Literals
- `<nixpkgs>` lookup (partially implemented)
- Store path literals
- Relative vs absolute path handling

### Operators
- Precedence verification across all operators
- Associativity edge cases
- Update operator edge cases

**Testing approach:**
- Create `main/tests/translator_advanced_test.js`
- Find edge cases in nixpkgs source code
- Test against nix repl behavior

---

## ⚡ Priority 4: nixpkgs.lib Testing (4-6 days)

**Current:** 10/41 files tested (24% coverage)
**Target:** 20+/41 files tested (50% coverage)

**Files tested (10):**
- ascii-table.nix, strings.nix, minfeatures.nix
- source-types.nix, versions.nix, kernel.nix
- flakes.nix, flake-version-info.nix
- systems/flake-systems.nix, systems/supported.nix

**High-priority untested files (20):**
- lists.nix, attrsets.nix, options.nix - HIGH VALUE
- meta.nix, debug.nix, filesystem.nix
- trivial.nix (partial), asserts.nix
- systems/*.nix (parse, inspect, doubles, default)
- fixed-points.nix, customisation.nix
- types.nix, modules.nix
- generators.nix, cli.nix, fetchers.nix

**Testing approach:**
- Add to `main/tests/nixpkgs_lib_files_test.js`
- Import entire file, test key functions
- Verify complex expressions work correctly
- Goal: 50%+ coverage (20+ files)

---

## Testing Infrastructure

### Test Runner: ./test.sh

Run all tests:
```bash
./test.sh
```

Run by category:
```bash
./test.sh derivation    # Derivation tests
./test.sh types         # Type checking tests
./test.sh lists         # List operation tests
./test.sh attrs         # Attrset tests
./test.sh strings       # String tests
./test.sh math          # Math tests
./test.sh paths         # Path/file tests
./test.sh core          # Core builtin tests
./test.sh translator    # Translator tests
./test.sh import        # Import system tests
./test.sh infra         # Infrastructure tests
./test.sh integration   # nixpkgs integration tests
```

Run by pattern:
```bash
./test.sh <pattern>     # Any filter string
```

### Test Organization

**30 test files in main/tests/:**
- Builtin tests (13): Core, types, lists, math, attrsets, strings, paths, etc.
- Import tests (5): Resolver, cache, loader, integration, e2e
- Translator tests (4): Translator, hasattr, string/path interpolation
- Infrastructure tests (4): Fetcher, tar, nar_hash, store_manager
- Integration tests (2): nixpkgs trivial, nixpkgs lib files
- Derivation tests (2): Basic tests, standalone tests

All tests follow pattern: `[category]_test.js` or `[category]_[subcategory]_test.js`

---

## Project Structure

```
denix/
├── main.js                      # Translator (Nix → JS)
├── main/
│   ├── runtime.js               # All 109 builtins + operators
│   ├── import_cache.js          # Import caching & circular detection
│   ├── import_loader.js         # File loading (.nix, .json)
│   ├── fetcher.js               # HTTP downloads with retry
│   ├── tar.js                   # Tarball extraction
│   ├── nar_hash.js              # NAR directory hashing
│   ├── store_manager.js         # ~/.cache/denix/store/ management
│   ├── errors.js                # Custom error types
│   └── tests/                   # All 30 test files
├── tools/
│   ├── hashing.js               # SHA256, MD5, SHA1, SHA512
│   ├── store_path.js            # Store path computation & ATerm serialization
│   ├── import_resolver.js       # Path resolution for imports
│   ├── parsing.js               # tree-sitter-nix wrapper
│   ├── lazy_array.js            # Lazy list evaluation (lazyMap)
│   ├── json_parse.js            # JSON with BigInt support
│   └── generic.js               # Type conversion helpers
└── nixpkgs.lib/                 # Test data (git submodule)
```

---

## Development Commands

**Run all tests:**
```bash
./test.sh
```

**Run specific test file:**
```bash
deno test --allow-all main/tests/builtins_math_bitwise_test.js
```

**Test in nix repl:**
```bash
nix repl
nix-repl> builtins.lessThan 3 5
true
```

**Run translator:**
```bash
deno run --allow-all main.js your-file.nix
```

**Check code:**
```bash
deno check main.js
deno check main/runtime.js
```

---

## Architecture Notes

### BigInt for Integers
Nix integers → JavaScript BigInt (for correct division semantics)

### Object.create() for Scopes
Function closures use `Object.create(parentScope)` to preserve lazy evaluation getters

### Lazy Evaluation
Lists and recursive attrsets use getters/proxies for lazy computation

### Store Path
Uses `~/.cache/denix/store/` instead of `/nix/store/` (no root permissions needed)

### URL Imports Only
Zero npm/jsr dependencies, only Deno standard library + esm.sh

---

## Known Limitations

**Optional features NOT implemented:**
- `fetchMercurial` - Rarely used
- `fetchClosure` - Binary cache (complex)
- `getFlake` - Full flake system (complex)
- `fetchTree` type='mercurial|path|indirect' - Edge cases

**These are documented as optional in Nix 2.18 and rarely used in practice.**

---

## Summary

**Immediate priorities:**
1. ⚡ Fix derivation bugs (2-4 hours) - BLOCKING
2. ⚡ Add 14 high-priority tests (3-5 hours) → 80% coverage
3. Optional: Translator edge cases (2-3 days)
4. Optional: nixpkgs.lib expansion (4-6 days)

**Current status:**
- 413 tests passing
- 74/109 builtins tested (67.9%)
- 7/10 derivation tests failing (CRITICAL)
- Translator 100% passing
- Import system 100% passing

**Total time to production-ready: 4-6 hours** (fix derivations in 1 hour + reach 80% test coverage in 3-5 hours)
