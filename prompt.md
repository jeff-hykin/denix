# Denix Development Guide

**Last Updated:** 2026-02-10 (Architecture Cleanup Complete)

---

## 🎯 Project Goal

Build a **Nix → JavaScript translator** with 1-to-1 parity for all Nix builtins.

**Status:** Runtime is 95% feature-complete, needs more test coverage.

---

## 📊 Current Status (Verified)

**Tests:** 413 passing (100% pass rate)
**Runtime:** 74/109 builtins tested (67.9% coverage) - **35 untested**
**Translator:** 87/87 tests passing (100%)
**Derivations:** 4/4 tests passing (store path computation works!)
**Import System:** 49 tests passing (fully implemented)

**Next Goal:** 80% test coverage (need 14 more builtins tested, 3-5 hours)

---

## 🚨 Rules for Developers

1. **Read Nix docs BEFORE implementing:** https://nix.dev/manual/nix/2.28/language/builtins.html
2. **Test in `nix repl` BEFORE writing code** - match exact behavior
3. **Focus on what's NOT done** - remove completed items from this doc
4. **No blockers exist** - break large tasks into small tasks
5. **Work order:** Runtime tests → Translator edge cases → nixpkgs integration

---

## ⚡ Priority 1: Test Coverage (DO THIS NEXT)

### Goal: 80% Coverage (Need 14 more tests, 3-5 hours)

**Quick Wins (30 minutes):**
- [ ] `lessThan` (line 211) - Simple comparison
- [ ] `mul` (line 233) - Simple multiplication

*Edit:* `main/tests/builtins_math_bitwise_test.js`

**File Operations (2-3 hours):**
- [ ] `pathExists` (line 1422)
- [ ] `readFile` (line 1397)
- [ ] `readDir` (line 1614)
- [ ] `readFileType` (line 1474)
- [ ] `findFile` (line 1631)
- [ ] `getEnv` (line 1396)

*Create:* `main/tests/builtins_file_ops_test.js`

**Conversion & Control (1-2 hours):**
- [ ] `toPath` (line 359)
- [ ] `toXML` (line 381)
- [ ] `fromJSON` (line 418)
- [ ] `abort` (line 1392)
- [ ] `getAttr` (line 640)
- [ ] `splitVersion` (line 531)

*Create:* `main/tests/builtins_misc_test.js`

### Medium Priority (21 untested, defer until 80%+ coverage)

- Context ops (5): getContext, hasContext, appendContext, addErrorContext, unsafeDiscardStringContext
- Store ops (4): storePath, toFile, placeholder, outputOf
- Hashing (2): hashString, hashFile
- Derivations (3): derivationStrict, unsafeDiscardOutputDependency, unsafeGetAttrPos
- Control flow (3): break, traceVerbose, genericClosure
- Fetchers (2): fetchMercurial, fetchClosure
- Advanced (2): getFlake, nixPath

---

## 📝 How to Write Tests

### Step 1: Test in nix repl

```bash
$ nix repl
nix-repl> builtins.lessThan 3 5
true
nix-repl> builtins.lessThan 5 3
false
nix-repl> builtins.pathExists "/tmp"
true
```

### Step 2: Write Deno Test

```javascript
import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { builtins } from "../runtime.js"

Deno.test("lessThan - basic comparison", () => {
    assertEquals(builtins.lessThan(3n, 5n), true)
    assertEquals(builtins.lessThan(5n, 3n), false)
    assertEquals(builtins.lessThan(3n, 3n), false)
})

Deno.test("pathExists - existing path", () => {
    assertEquals(builtins.pathExists("/tmp"), true)
})

Deno.test("pathExists - non-existing path", () => {
    assertEquals(builtins.pathExists("/nonexistent-123456"), false)
})
```

### Step 3: Run Tests

```bash
# Run specific test file
deno test --allow-all main/tests/builtins_file_ops_test.js

# Run all tests
./test.sh

# Run category
./test.sh math       # Math/bitwise tests
./test.sh attrs      # Attrset tests
./test.sh strings    # String tests
./test.sh derivation # Derivation tests
```

---

## 🏗️ Priority 2: Derivation Edge Cases (1-2 hours)

**Status:** Basic derivations work (4/4 tests passing), need comprehensive tests.

**Remaining edge cases:**
- [ ] Test multiple outputs (out, dev, doc)
- [ ] Test input derivations (buildInputs)
- [ ] Test environment variable propagation
- [ ] Test content-addressed derivations
- [ ] Test fixed-output derivations

*Edit:* `main/tests/derivation/001_basic_tests.js`

---

## 🔧 Priority 3: Optional Features (16-22 days, probably not needed)

Most projects don't need these. Runtime is effectively complete without them.

**Optional builtins not implemented:**
- `fetchMercurial` (2-3 days) - Rare, only for Mercurial repos
- `fetchClosure` (5-7 days) - Binary cache support, very complex
- `getFlake` (5-7 days) - Full flake system, very complex
- `fetchTree` edge cases (4-6 hours) - type='mercurial', type='path', type='indirect'

**Only implement if you have a specific use case requiring them.**

---

## 📁 Codebase Structure

```
denix/
├── main.js                 # Nix → JS translator (1,264 lines)
├── main/
│   ├── runtime.js          # 109 builtins (2,323 lines)
│   ├── fetcher.js          # HTTP downloads
│   ├── tar.js              # Tarball extraction
│   ├── nar_hash.js         # NAR hashing
│   ├── store_manager.js    # Store path management
│   ├── import_cache.js     # Import caching
│   ├── import_loader.js    # File loading
│   └── tests/              # 30 test files (4,000+ lines)
├── tools/
│   ├── hashing.js          # Hash functions
│   ├── store_path.js       # Store path computation
│   ├── import_resolver.js  # Path resolution
│   └── ... (hash implementations)
└── nixpkgs.lib/            # Test data (git submodule)
```

**Test organization (30 files):**
- Builtin tests (13): Core, types, lists, math, attrsets, strings, etc.
- Import tests (5): Resolver, cache, loader, integration, e2e
- Translator tests (4): Translator, hasattr, string/path interpolation
- Infrastructure tests (4): Fetcher, tar, nar_hash, store_manager
- Integration tests (2): nixpkgs trivial, nixpkgs lib files
- Derivation tests (2): Basic tests, standalone tests

---

## 🧪 Test Runner Shortcuts

```bash
./test.sh                # All tests (413 tests)
./test.sh types          # Type checking tests
./test.sh lists          # List operation tests
./test.sh math           # Math/bitwise tests
./test.sh attrs          # Attrset tests
./test.sh strings        # String tests
./test.sh paths          # Path/file tests
./test.sh derivation     # Derivation tests
./test.sh import         # Import system tests
./test.sh translator     # Translator tests
./test.sh integration    # nixpkgs integration tests
./test.sh <pattern>      # Custom filter
```

---

## 📚 Documentation Resources

**Official Nix docs:**
- Builtins: https://nix.dev/manual/nix/2.28/language/builtins.html
- Language: https://nix.dev/manual/nix/2.28/language/
- Derivations: https://nix.dev/manual/nix/2.28/language/derivations.html

**Additional resources:**
- noogle.dev - Searchable Nix function reference
- GitHub nixpkgs - Real-world usage examples
- Nix source code - https://github.com/NixOS/nix/blob/master/src/libexpr/primops.cc

---

## 🚀 Quick Start for New Contributors

1. **Clone and test:**
   ```bash
   git clone <repo>
   cd denix
   ./test.sh  # Should see 413 tests passing
   ```

2. **Pick a task from Priority 1** (test coverage)

3. **Test in nix repl first:**
   ```bash
   nix repl
   nix-repl> builtins.lessThan 3 5
   ```

4. **Write test matching exact nix repl behavior**

5. **Run your test:**
   ```bash
   deno test --allow-all main/tests/your_test.js
   ```

6. **If test fails, fix runtime.js** (never change the test to match buggy implementation)

---

## 🎓 Design Patterns

### BigInt vs Number
- Nix integers → JavaScript BigInt (for correct division: `1/2 ≠ 1.0/2`)
- Nix floats → JavaScript number
- All operators handle both types

### Scope Management
- Variables: `nixScope["varName"]` (avoids keyword conflicts)
- Function closures: Use `Object.create(parentScope)` NOT spread operator
- Lazy evaluation: Use getters for recursive attrsets

### String Interpolation
- Plain strings → JavaScript strings
- Interpolated → `InterpolatedString` class (lazy eval)
- Paths → `Path` class (extends `InterpolatedString`)

---

## 🔍 Troubleshooting

**Test fails but nix repl shows different output?**
- Your test is correct, fix runtime.js implementation

**Import error?**
- Check URL imports are correct (esm.sh can be unreliable)
- Prefer Deno std library (@std/*)

**Store path mismatch?**
- Check tools/store_path.js serialization format
- Verify NAR hash computation in main/nar_hash.js

**Scope issues?**
- Use Object.create() not spread operator for function closures
- Check runtime.scopeStack management

---

## ✅ What's Working (No Action Needed)

- All 109 builtins implemented (100% code complete)
- Translator fully functional (87/87 tests)
- Import system complete (49 tests)
- Derivation store paths working (4/4 tests)
- Fetch infrastructure complete (fetchGit, fetchTarball, fetchurl, fetchTree, path, filterSource)
- All support modules working (fetcher, tar, nar_hash, store_manager)

**Focus on Priority 1 (test coverage) - implementation is done!**
