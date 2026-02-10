# Denix Runtime Test Coverage Status

**Generated:** 2026-02-10 (Session 41)

## Summary

- **Total builtins:** 109 functions + 8 constants = 117 exports
- **Tested builtins:** 74/109 (67.9%)
- **Untested builtins:** 35/109 (32.1%)
- **Goal:** 80% coverage = 88/109 tested
- **Remaining work:** 14 more builtins (3-5 hours)

## Test Pass Rate

✅ **413 tests passing** (100% pass rate)

## Complete List of 35 Untested Builtins

### HIGH PRIORITY (14 builtins - needed for 80% coverage)

**Math Operations (2 builtins, 30 minutes):**
- `lessThan` (line 211) - Simple comparison `<` operator
- `mul` (line 233) - Simple multiplication `*` operator

**File Operations (6 builtins, 2-3 hours):**
- `pathExists` (line 1422) - Check if file/directory exists
- `readFile` (line 1397) - Read file contents as string
- `readDir` (line 1614) - List directory contents
- `readFileType` (line 1474) - Get file type (regular/directory/symlink)
- `findFile` (line 1631) - Search for file in NIX_PATH
- `getEnv` (line 1396) - Get environment variable

**Miscellaneous (6 builtins, 1-2 hours):**
- `toPath` (line 359) - Convert string to absolute path
- `toXML` (line 381) - Convert value to XML string
- `fromJSON` (line 418) - Parse JSON string
- `abort` (line 1392) - Abort evaluation with error
- `getAttr` (line 640) - Get attribute from set
- `splitVersion` (line 531) - Split version string into components

**Total to 80%:** 3-5 hours

---

### MEDIUM PRIORITY (21 builtins - optional)

**String Context Operations (5 builtins):**
- `getContext` (line 1953) - Get string context metadata
- `hasContext` (line 1959) - Check if string has context
- `appendContext` (line 1946) - Attach context to string
- `addErrorContext` (line 1941) - Add error context
- `unsafeDiscardStringContext` (line 1965) - Remove string context

**Store Operations (4 builtins):**
- `storePath` (line 1680) - Validate store path format
- `toFile` (line 1423) - Create store file with content
- `placeholder` (line 1915) - Generate derivation placeholder
- `outputOf` (line 1924) - Get derivation output path

**Hashing (2 builtins):**
- `hashString` (line 738) - Hash string with algorithm
- `hashFile` (line 751) - Hash file contents

**Derivation Operations (3 builtins):**
- `derivationStrict` (line 1828) - Strict derivation (same as derivation)
- `unsafeDiscardOutputDependency` (line 2058) - Discard output dependency
- `unsafeGetAttrPos` (line 2064) - Get attribute position (file/line)

**Control Flow (3 builtins):**
- `break` (line 1352) - Debugger breakpoint (no-op in JS)
- `traceVerbose` (line 1357) - Verbose trace output
- `genericClosure` (line 2023) - Generic transitive closure

**Network Fetchers (2 builtins):**
- `fetchMercurial` (line 1060) - Fetch Mercurial repository
- `fetchClosure` (line 1320) - Fetch from binary cache

**Advanced/Flakes (2 builtins):**
- `getFlake` (line 1861) - Load flake.nix
- `nixPath` (line 1667) - Get NIX_PATH value

**Total additional:** 10-15 hours to reach 90%+ coverage

---

## Implementation Plan

### Step 1: Add Math Tests (30 minutes)

**Edit:** `main/tests/builtins_math_bitwise_test.js`

Add tests for:
- `builtins.lessThan` - Compare two values
- `builtins.mul` - Multiply two numbers

### Step 2: Test File Operations (2-3 hours)

**Create:** `main/tests/builtins_file_ops_test.js`

Test all 6 file operation builtins:
- Create temporary test files/directories
- Test pathExists, readFile, readDir
- Test readFileType with different file types
- Test findFile with NIX_PATH
- Test getEnv with environment variables

### Step 3: Test Miscellaneous Functions (1-2 hours)

**Create:** `main/tests/builtins_misc_test.js`

Test 6 miscellaneous builtins:
- toPath with various inputs
- toXML with nested structures
- fromJSON with valid/invalid JSON
- abort error handling
- getAttr with nested attributes
- splitVersion with version strings

### Step 4: Run Full Test Suite

```bash
./test.sh
```

Expected result: 80%+ coverage achieved!

---

## Testing Guidelines

**MANDATORY before writing tests:**
1. Read official docs: https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-FUNCTIONNAME
2. Test in `nix repl` with multiple inputs
3. Write down EXACT nix repl outputs
4. Write tests that match nix repl behavior
5. If test fails, fix runtime.js (NOT the test)

**Example workflow:**

```bash
# Step 1: Test in nix repl
$ nix repl
nix-repl> builtins.lessThan 5 10
true

nix-repl> builtins.lessThan 10 5
false

# Step 2: Write test
Deno.test("lessThan - 5 < 10", () => {
    assertEquals(builtins.lessThan(5n)(10n), true)
})

# Step 3: Run test
deno test --allow-all main/tests/builtins_math_bitwise_test.js

# Step 4: Fix bugs if needed
# (edit runtime.js if test fails)
```

---

## Test File Organization

**Existing test files (30 total):**

**Builtin tests (14 files):**
- builtins_core_test.js (12 functions)
- builtins_type_checking_test.js (10 functions)
- builtins_lists_comprehensive_test.js (13 functions)
- builtins_math_bitwise_test.js (5 functions) ⚡ ADD 2 MORE
- builtins_attrset_ops_test.js (3 functions)
- builtins_string_ops_test.js (5 functions)
- builtins_path_test.js
- builtins_filtersource_test.js
- builtins_tojson_path_test.js
- builtins_fetchgit_test.js
- builtins_fetchtarball_test.js
- builtins_fetchtree_test.js
- builtins_fetchurl_test.js
- fromtoml_test.js

**Import tests (5 files):**
- import_cache_test.js
- import_loader_test.js
- import_resolver_test.js
- import_integration_test.js
- import_e2e_test.js

**Translator tests (4 files):**
- translator_test.js
- hasattr_test.js
- string_interpolation_test.js
- path_interpolation_test.js

**Infrastructure tests (4 files):**
- fetcher_test.js
- tar_test.js
- nar_hash_test.js
- store_manager_test.js

**Integration tests (2 files):**
- nixpkgs_trivial_test.js (20 nixpkgs.lib functions)
- nixpkgs_lib_files_test.js (15 complete lib files)

**Derivation tests (2 files):**
- standalone_test.js
- 001_basic_tests.js

**New test files needed (2 files):**
- builtins_file_ops_test.js (CREATE THIS) 🆕
- builtins_misc_test.js (CREATE THIS) 🆕

---

## Coverage by Category

| Category | Tested | Untested | Total | Coverage |
|----------|--------|----------|-------|----------|
| Type checking | 10 | 0 | 10 | 100% ✅ |
| List operations | 13 | 0 | 13 | 100% ✅ |
| Core operations | 12 | 0 | 12 | 100% ✅ |
| Math & bitwise | 5 | 2 | 7 | 71% ⚠️ |
| Attrset operations | 3 | 2 | 5 | 60% ⚠️ |
| String operations | 5 | 1 | 6 | 83% ✅ |
| File operations | 0 | 6 | 6 | 0% ❌ |
| Conversion | 1 | 3 | 4 | 25% ❌ |
| Control flow | 2 | 4 | 6 | 33% ⚠️ |
| Context operations | 0 | 5 | 5 | 0% ❌ |
| Store operations | 0 | 4 | 4 | 0% ❌ |
| Hashing | 0 | 2 | 2 | 0% ❌ |
| Derivations | 1 | 4 | 5 | 20% ❌ |
| Fetchers | 4 | 2 | 6 | 67% ⚠️ |
| Flakes | 2 | 1 | 3 | 67% ⚠️ |
| Environment | 0 | 2 | 2 | 0% ❌ |
| Advanced | 16 | 0 | 16 | 100% ✅ |
| **TOTAL** | **74** | **35** | **109** | **67.9%** |

**Goal:** 80% = 88/109 tested (need 14 more)

---

## Notes

- All 109 function builtins are **implemented** in `main/runtime.js`
- Only testing coverage is missing, not functionality
- Runtime has 8 additional constant exports (builtins.true, builtins.false, etc.)
- All 413 existing tests pass (100% pass rate)
- No known bugs in tested functions
- Session 40 added 64 new tests (math, attrset, string operations)
- Session 41 corrected coverage count (was undercounted by 9 builtins)
