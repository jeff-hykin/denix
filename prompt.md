# ⚠️ CRITICAL RULES - READ FIRST ⚠️

**Your job is to focus on what is NOT implemented and NOT working. Only report what remains to be done. NEVER report accomplishments, achievements, or what you've done. You are a senior level developer - there are no blockers, only tasks to break down.**

---

## 🚨 CURRENT STATE (as of 2026-02-06)

**Runtime:** 62/65 builtins implemented (95% complete)
- All core functionality working
- All fetch infrastructure complete (fetchTarball, fetchurl, fetchGit, fetchTree, path, filterSource)
- Import system fully functional
- 3 optional/experimental builtins not implemented (fetchMercurial, fetchClosure, getFlake)

**Translator:** Production ready
- 87/87 tests passing
- All core Nix language features implemented
- Successfully translates nixpkgs.lib code

**Tests:** 170+ tests passing across all categories

**CRITICAL FINDING:** Derivation tests are FAILING (0/10 passing)
- Error: "undefined is not iterable (cannot read property Symbol(Symbol.iterator))"
- Location: main/tests/derivation/001_basic_tests.js
- This is a BLOCKER that needs investigation BEFORE any other work

---

## 📋 PRIORITY 1: Fix derivation implementation (BLOCKER)

The derivation builtin is implemented but failing all tests. Must investigate and fix:

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

**DO NOT WORK ON ANYTHING ELSE UNTIL THIS IS FIXED**

---

## 📋 PRIORITY 2: After derivation is fixed

Choose one path (user will decide):

### Option A: Implement optional builtins (~16-22 days)
- fetchMercurial (2-3 days) - Mercurial VCS support
- fetchClosure (5-7 days) - Binary cache support (complex)
- getFlake (5-7 days) - Full flake system (complex)
- fetchTree type='indirect' (3-4 days) - Flake registry

### Option B: Expand testing (~2-3 days)
- Verify translator edge cases
- Test more nixpkgs.lib files (31 remaining)
- Focus on: lists.nix, attrsets.nix, options.nix, modules.nix

**DO NOT choose a path. Wait for user instruction AFTER derivation is fixed.**

---

## 📚 IMPLEMENTATION GUIDELINES

**When implementing any builtin:**

1. Read documentation:
   - https://noogle.dev/f/builtins/BUILTIN_NAME
   - https://nix.dev/manual/nix/2.18/language/builtins

2. Test in real Nix interpreter to verify behavior

3. Implement based on documentation (not assumptions)

4. Create comprehensive tests comparing JS vs Nix output

**Dependencies:**
- Use Deno @std/* when possible
- npm packages via https://esm.sh/PACKAGE_NAME (unreliable, test first)

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

## 🔍 WHAT'S NOT IMPLEMENTED

### Runtime (main/runtime.js):
- 3 optional builtins throw NotImplemented:
  - fetchMercurial (line 1055)
  - fetchClosure (line 1315)
  - getFlake (line 1850)

- fetchTree partial implementation:
  - type='mercurial' (line 1286) - needs fetchMercurial
  - type='indirect' (line 1308) - needs flake registry

### Translator (main.js):
- Edge cases that may need verification:
  - Nested destructuring with @ and defaults
  - All string escape sequences
  - Path literal edge cases
  - Operator precedence
  - Multi-line indented strings
  - URI literals

### Testing:
- 31 nixpkgs.lib files not yet tested
- Derivation tests failing (0/10 passing) - **BLOCKER**

---

## 🎯 FOCUS

**RIGHT NOW:** Fix derivation tests (Priority 1)

**NEXT:** Wait for user to choose Option A (optional builtins) or Option B (testing)

**NEVER:** Report achievements. Only report what's NOT done.
