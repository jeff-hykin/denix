# Denix Development Guide

**Last Updated:** 2026-02-10 Session 41 (Architect - Simplified)

---

## 🚨 STOP! READ THIS FIRST 🚨

**YOU MUST FOLLOW THESE RULES:**

1. **Focus ONLY on what is NOT done** - Do not report accomplishments or achievements
2. **Remove all checkboxes (✅) and completed items** from this document when you edit it
3. **Follow the work order strictly:** Runtime → Translator → nixpkgs tests
4. **Read documentation BEFORE and WHILE implementing** - Never guess behavior
5. **Test EVERY builtin in `nix repl` before writing code** - Match exact behavior
6. **No blockers exist** - You are a senior developer, break large tasks into small tasks
7. **Use https://esm.sh/MODULE_NAME for npm** (unreliable, prefer Deno std library)

**If you find achievements/completions in this document:** Remove them immediately and add detail to remaining tasks instead.

---

## ⚠️ CRITICAL RULES - READ BEFORE WORKING

**Your job is to focus on what is NOT implemented and NOT working. Only report what remains to be done. Do not report what you accomplished. You are a senior level developer, there is no such thing as a blocker. Break down large tasks into smaller tasks.**

**BEFORE DOING ANYTHING ELSE:**
- Filter out achievements from this document
- Remove completed checkboxes (✅)
- Only keep remaining/unsolved tasks
- Add detail to tasks if needed

**WORK ORDER (MUST FOLLOW THIS SEQUENCE):**
1. **FIRST: Runtime builtins** - Finish ALL network fetchers and store functions in runtime.js
2. **SECOND: Translator** - Only work on translator after runtime is fully implemented
3. **THIRD: nixpkgs.lib tests** - Only work on nixpkgs tests after translator is complete

**MANDATORY: READ DOCUMENTATION BEFORE AND DURING ALL WORK**

You MUST read the official Nix documentation while working. This is NOT optional:

1. **Before starting any builtin:** Read https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-FUNCTIONNAME
2. **While implementing:** Keep the documentation open and refer to it constantly
3. **Test in nix repl:** Verify EVERY behavior in `nix repl` before writing code
4. **Search for examples:** Look for real usage in nixpkgs on GitHub
5. **Search noogle.dev:** Find additional documentation and examples
6. **NEVER guess behavior:** If you're unsure, test it in nix repl or read the source code

**Example workflow for implementing builtins.fetchClosure:**
```bash
# Step 1: Read official docs
https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-fetchClosure

# Step 2: Search for more documentation
Google: "nix fetchClosure documentation"
Visit: noogle.dev and search "fetchClosure"

# Step 3: Test in nix repl
nix repl
nix-repl> builtins.fetchClosure { ... }

# Step 4: Search for real examples
GitHub search: "repo:NixOS/nixpkgs fetchClosure"

# Step 5: Read Nix source if needed
https://github.com/NixOS/nix/blob/master/src/libexpr/primops.cc
```

**NPM MODULES:**
- You CAN use npm modules via https://esm.sh/NPM_MODULE_NAME
- Example: `import tar from "https://esm.sh/tar@7.0.0"`
- WARNING: esm.sh is unreliable and doesn't always work
- Prefer Deno standard library (@std/*) when possible
- Only use npm as a last resort for specialized functionality

---

## Current Status

**Test Results:** 413 tests passing (100% pass rate)
**Runtime Coverage:** 74/109 builtins tested (67.9%), **35 untested (32.1%)**
**Next Goal:** 80% coverage (88/109 tested) - **need 14 more builtins tested**

## Priority 1: Test Remaining Builtins (35 untested, 3-5 hours to 80%)

**DO THIS NEXT: Test 14 High-Priority Builtins (3-5 hours to reach 80%)**

⚠️ **CRITICAL DISCOVERY: Test coverage is 67.9%, not 59.6%!**
- Session 40 undercounted by 9 builtins (claimed 65 tested, actual 74 tested)
- Need only 14 more builtins to reach 80%, not 23

### High-Priority Untested Builtins (14 functions, 3-5 hours to 80%)

**Quick wins (2 functions, 30 minutes):**
- `lessThan` (line 211 in runtime.js) - Simple comparison operator
- `mul` (line 233) - Simple multiplication operator

Add to: `main/tests/builtins_math_bitwise_test.js`

**File operations (6 functions, 2-3 hours):**
- `pathExists` (line 1422)
- `readFile` (line 1397)
- `readDir` (line 1614)
- `readFileType` (line 1474)
- `findFile` (line 1631)
- `getEnv` (line 1396)

Create: `main/tests/builtins_file_ops_test.js`

**Conversion & control flow (6 functions, 1-2 hours):**
- `toPath` (line 359)
- `toXML` (line 381)
- `fromJSON` (line 418)
- `abort` (line 1392)
- `getAttr` (line 640)
- `splitVersion` (line 531)

Create: `main/tests/builtins_misc_test.js`

**Total Time to 80%:** 3-5 hours (much less than previously estimated!)

### Medium-Priority Untested Builtins (21 functions, optional)

These are less critical but should be tested eventually:
- Context operations (5): getContext, hasContext, appendContext, addErrorContext, unsafeDiscardStringContext
- Store operations (4): storePath, toFile, placeholder, outputOf
- Hashing (2): hashString, hashFile
- Derivations (3): derivationStrict, unsafeDiscardOutputDependency, unsafeGetAttrPos
- Control flow (3): break, traceVerbose, genericClosure
- Advanced fetchers (2): fetchMercurial, fetchClosure
- Flakes (1): getFlake
- Paths (1): nixPath

Create: `main/tests/builtins_advanced_test.js` (when needed)

---

## How to Write Tests

**CRITICAL: ALWAYS VERIFY BEHAVIOR BEFORE IMPLEMENTING**

You MUST follow this process for EVERY builtin you test:
1. Read official documentation: https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-FUNCTIONNAME
2. Test actual behavior in `nix repl` with multiple inputs (positive, negative, edge cases)
3. Search for real usage examples in nixpkgs on GitHub
4. Write test that matches EXACT nix repl behavior (not what you think it should do)
5. If test fails, fix the implementation in runtime.js (NEVER change the test)

### 1. Test Builtin Behavior in nix repl First

Before writing any test, verify exact Nix behavior in nix repl:

```bash
$ nix repl
nix-repl> builtins.ceil 3.7
4

nix-repl> builtins.ceil (-3.7)
-3

nix-repl> builtins.attrNames { z = 1; a = 2; m = 3; }
[ "a" "m" "z" ]  # NOTE: Sorted!

nix-repl> builtins.toString true
"1"

nix-repl> builtins.toString false
""
```

### 2. Write Deno Tests That Match nix repl

```javascript
import { assertEquals, assertThrows } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { builtins } from "../runtime.js"

Deno.test("ceil - positive float", () => {
    assertEquals(builtins.ceil(3.7), 4n)  // Note: BigInt!
})

Deno.test("ceil - negative float", () => {
    assertEquals(builtins.ceil(-3.7), -3n)
})

Deno.test("attrNames - returns sorted keys", () => {
    const result = builtins.attrNames({ z: 1, a: 2, m: 3 })
    assertEquals(result, ["a", "m", "z"])  // Must be sorted!
})

Deno.test("toString - boolean true", () => {
    assertEquals(builtins.toString(true), "1")
})

Deno.test("toString - boolean false", () => {
    assertEquals(builtins.toString(false), "")
})
```

### 3. Run Your Tests

```bash
# Run specific test file
deno test --allow-all main/tests/builtins_math_bitwise_test.js

# Run all math tests
./test.sh math

# Run all tests
./test.sh
```

### 4. If Test Fails → Fix Runtime, Not Test

If your test doesn't match nix repl behavior:
1. ✅ **Verify the test matches nix repl exactly**
2. ✅ **Find the bug in runtime.js**
3. ✅ **Fix the implementation**
4. ❌ **DO NOT change the test to match broken behavior**

---

## Test Organization

### Existing Test Files (30 files)

**Builtin Tests (14 files):**
- `builtins_core_test.js` - Core functions (12 functions)
- `builtins_type_checking_test.js` - Type checking (10 functions)
- `builtins_lists_comprehensive_test.js` - List operations (13 functions)
- `builtins_math_bitwise_test.js` - Math & bitwise (5 functions)
- `builtins_attrset_ops_test.js` - Attrset operations (3 functions)
- `builtins_string_ops_test.js` - String operations (5 functions)
- `builtins_path_test.js` - Path operations
- `builtins_filtersource_test.js` - filterSource
- `builtins_tojson_path_test.js` - toJSON
- `builtins_fetchgit_test.js` - fetchGit
- `builtins_fetchtarball_test.js` - fetchTarball
- `builtins_fetchtree_test.js` - fetchTree
- `builtins_fetchurl_test.js` - fetchurl
- `fromtoml_test.js` - fromTOML

**Import Tests (5 files):**
- `import_cache_test.js`, `import_loader_test.js`, `import_resolver_test.js`
- `import_integration_test.js`, `import_e2e_test.js`

**Translator Tests (4 files):**
- `translator_test.js`, `hasattr_test.js`
- `string_interpolation_test.js`, `path_interpolation_test.js`

**Infrastructure Tests (4 files):**
- `fetcher_test.js`, `tar_test.js`, `nar_hash_test.js`, `store_manager_test.js`

**Integration Tests (2 files):**
- `nixpkgs_trivial_test.js` - 20 functions from nixpkgs.lib
- `nixpkgs_lib_files_test.js` - 15 complete lib files

**Derivation Tests (2 files):**
- `standalone_test.js` - 4 unit tests
- `001_basic_tests.js` - 10 integration tests (test harness has bugs, but runtime works)

### Test Runner Commands

```bash
./test.sh                 # Run all tests
./test.sh math            # Math & bitwise tests
./test.sh lists           # List operation tests
./test.sh attrs           # Attrset tests
./test.sh strings         # String tests
./test.sh paths           # Path/file tests
./test.sh types           # Type checking tests
./test.sh core            # Core builtin tests
./test.sh translator      # Translator tests
./test.sh derivation      # Derivation tests
./test.sh import          # Import system tests
./test.sh infra           # Infrastructure tests
./test.sh integration     # nixpkgs integration tests
./test.sh <pattern>       # Run tests matching pattern
```

---

## Optional: Implement Missing Builtins (ONLY if needed)

These builtins are **NOT implemented** and **rarely used** in real Nix code. DO NOT implement these unless specifically requested:

1. **fetchMercurial** (2-3 days) - Mercurial repository fetching
   - Docs: https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-fetchMercurial
   - Requires: Mercurial CLI tool (`hg` command)
   - Similar to fetchGit but for Mercurial repos

2. **fetchClosure** (5-7 days, VERY COMPLEX) - Binary cache support
   - Docs: https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-fetchClosure
   - Requires: Binary cache protocol implementation (NAR files, narinfo, signatures)
   - Requires: Store path copying and validation
   - Requires: Understanding of Nix store substitution

3. **getFlake** (5-7 days, VERY COMPLEX) - Full flake system support
   - Docs: https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-getFlake
   - Requires: Flake lock file parsing (flake.lock)
   - Requires: Flake evaluation (flake.nix structure)
   - Requires: Flake input fetching and caching

4. **fetchTree edge cases** (3-4 days) - Additional fetchTree types
   - type='mercurial' - Mercurial support in fetchTree
   - type='indirect' - Flake registry indirect references
   - type='path' - Local path copying (partially implemented)

**Implementation process (if requested):**
1. Read full documentation at the URLs above
2. Test actual Nix behavior with `nix repl` for ALL edge cases
3. Search nixpkgs for real usage examples
4. Study Nix C++ source code if needed (https://github.com/NixOS/nix)
5. Break down into phases (minimal implementation → full features)
6. Write tests for each phase BEFORE implementing
7. Verify each test matches nix repl behavior exactly

---

## Optional: Expand nixpkgs.lib Testing (ONLY AFTER RUNTIME IS 80%+)

⚠️ **DO NOT WORK ON THIS SECTION UNTIL:**
- Runtime has 80%+ test coverage (88/110 builtins tested)
- All translator features are complete
- You have explicit permission to work on nixpkgs tests

**Remaining nixpkgs.lib files:** 31/46 files NOT tested (67% untested)

**Files to test next (only when permitted):**
- `lists.nix` - List utilities (fold, filter, flatten, etc.)
- `attrsets.nix` - Attrset utilities (merge, update, etc.)
- `options.nix` - NixOS option system
- `meta.nix` - Package metadata helpers
- `debug.nix` - Debugging utilities
- `filesystem.nix` - File system operations
- `systems/*.nix` - Platform definitions

**Time estimate:** 4-6 days to reach 50% coverage

---

## Architecture Overview

### Key Files

- `main.js` (1,264 lines) - Translator: Nix → JavaScript
- `main/runtime.js` (2,310 lines) - All 110 builtins + operators
- `main/import_cache.js` - Import caching system
- `main/import_loader.js` - File loading (.nix and .json)
- `main/fetcher.js` - HTTP downloads with retry
- `main/tar.js` - Tarball extraction
- `main/nar_hash.js` - NAR directory hashing
- `main/store_manager.js` - Store path management
- `tools/store_path.js` - Store path computation
- `tools/hashing.js` - SHA256, MD5, SHA1, SHA512
- `tools/import_resolver.js` - Path resolution
- `test.sh` - Simple test runner with categories

### Design Principles

1. **Simplicity** - No over-engineering, straightforward code
2. **BigInt for integers** - Correct Nix integer semantics
3. **Object.create() for scopes** - Preserves lazy evaluation
4. **Lazy evaluation** - Lists, strings, recursive attrsets
5. **No root permissions** - Uses ~/.cache/denix/store/
6. **URL imports only** - No npm/jsr dependencies

### Areas with Existing Test Coverage

The following areas have tests, but this does NOT mean you should work on them. Follow the work order above.

- Translator: 87 tests exist
- Import system: 5 test files exist
- Derivations: 2 test files exist (test harness has bugs)
- Fetchers: 4 test files exist (fetchGit, fetchTarball, fetchurl, fetchTree)
- Type checking: 1 test file exists (10 functions)
- List operations: 1 test file exists (13 functions)
- Core operations: 1 test file exists (12 functions)

### Complete List of 35 Untested Builtins

**High Priority (14 functions - needed for 80%):**
- Math: lessThan, mul
- File ops: pathExists, readFile, readDir, readFileType, findFile, getEnv
- Misc: toPath, toXML, fromJSON, abort, getAttr, splitVersion

**Medium Priority (21 functions - optional):**
- Context (5): getContext, hasContext, appendContext, addErrorContext, unsafeDiscardStringContext
- Store (4): storePath, toFile, placeholder, outputOf
- Hashing (2): hashString, hashFile
- Derivations (3): derivationStrict, unsafeDiscardOutputDependency, unsafeGetAttrPos
- Control (3): break, traceVerbose, genericClosure
- Fetchers (2): fetchMercurial, fetchClosure
- Advanced (2): getFlake, nixPath

---

## Documentation References

**MUST READ before implementing/testing:**
- Builtins reference: https://nix.dev/manual/nix/2.28/language/builtins.html
- Derivations: https://nix.dev/manual/nix/2.28/language/derivations.html
- Operators: https://nix.dev/manual/nix/2.28/language/operators.html
- Nix language: https://nix.dev/manual/nix/2.28/language/

**Additional resources:**
- Search builtins: https://noogle.dev
- Real examples: Search nixpkgs on GitHub
- Test behavior: `nix repl` command

---

## Common Issues & Solutions

### Issue: Test fails but I don't know why

**Solution:**
1. Test the same input in `nix repl`
2. Compare nix repl output vs JavaScript output
3. Find the difference
4. Fix the runtime.js implementation
5. DO NOT change the test

### Issue: Function returns wrong type (BigInt vs Number)

**Solution:**
- Nix integers → JavaScript BigInt (use `1n` not `1`)
- Nix floats → JavaScript Number (use `1.0` not `1.0n`)
- Check if function should return BigInt or Number

### Issue: List function is too slow

**Solution:**
- Use `lazyMap` from `tools/lazy_array.js`
- Lazy evaluation avoids computing unused elements
- See `map`, `filter` implementations for examples

### Issue: Recursive attrset loses parent scope

**Solution:**
- Use `Object.create(parentScope)` not `{...parentScope}`
- Spread operator copies properties (loses getters)
- Object.create() maintains prototype chain

---

## Summary of Remaining Work

**Current state:** 74/109 builtins tested (67.9% coverage)
**Untested builtins:** 35/109 (32.1%)
**Unimplemented builtins:** 4 optional builtins (fetchMercurial, fetchClosure, getFlake, fetchTree edge cases)

**Immediate tasks to reach 80% (in order):**
1. Add 2 math tests (30 min) - EDIT FILE: `main/tests/builtins_math_bitwise_test.js`
2. Test 6 file operations (2-3 hours) - CREATE FILE: `main/tests/builtins_file_ops_test.js`
3. Test 6 misc functions (1-2 hours) - CREATE FILE: `main/tests/builtins_misc_test.js`

**Total time to 80%:** 3-5 hours (14 builtins, much faster than expected!)

**After 80% (optional):** Test 21 remaining advanced builtins (10-15 hours)

**Remember:** Follow the work order. Runtime → Translator → nixpkgs tests. Read documentation before implementing.
