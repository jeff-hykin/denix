# Denix Development Priorities

## 🎯 Project Goal
Implement a Nix → JavaScript translator with 1-to-1 parity for Nix builtins. 

---

## ✅ toJSON Derivation Fix - COMPLETED (2026-02-06)

**Fix applied:** Added derivation check in `runtime.js` line 326
**Verification:** Direct tests pass (4/4)
**Known issue:** Test harness (derivation/001_basic_tests.js) has a bug with the quickr library that needs separate investigation

```javascript
} else if (value.type === "derivation") {
    // Derivations coerce to their outPath string (Nix behavior)
    return JSON.stringify(value.outPath)
```

---

## 📋 Current Status (2026-02-06)

### Runtime (main/runtime.js)
- ✅ 62/65 Nix 2.18 builtins implemented (95%)
- ✅ All fetch infrastructure complete (fetchTarball, fetchurl, fetchGit, fetchTree, path, filterSource)
- ✅ Derivation system working
- ❌ 3 builtins remain: fetchMercurial, fetchClosure, getFlake (rarely used)

### Translator (main.js)
- ✅ 87/87 tests passing (100%)
- ✅ All core Nix language features working
- ✅ Validated against nixpkgs.lib patterns

### Testing
- ✅ 170+ runtime tests passing
- ✅ 87 translator tests passing
- ✅ Import system fully functional
- ⚠️ 10 nixpkgs.lib files tested (24% coverage - could expand)

---

## 🚨 Priority 1: Fix Derivation Test Harness (1-2 hours)

**Problem:** Test harness in `main/tests/derivation/test_harness.js` has issues with the quickr library's `run` template tag causing "undefined is not iterable" errors.

**The actual toJSON fix works** (verified with direct tests), but the test harness needs debugging.

**Options:**
1. Debug the quickr `run` template tag issue
2. Rewrite test harness without quickr dependency
3. Skip derivation integration tests for now (standalone tests work)

**Recommendation:** Option 2 - rewrite test harness using plain Deno subprocess API

---

## 📋 Priority 2: Optional Runtime Builtins (if needed)

### 2.1 fetchMercurial (~2-3 days)
- Mercurial repository cloning
- Requires `hg` command (like fetchGit requires `git`)
- **Question:** Is this needed? Mercurial usage declining

### 2.2 fetchClosure (~5-7 days, COMPLEX)
- Binary cache protocol
- NAR file downloading
- Signature verification
- **Question:** Is this needed? Very complex, rarely used

### 2.3 getFlake (~5-7 days, VERY COMPLEX)
- Full flake system implementation
- Flake registry, lock files, input resolution
- **Question:** Is this needed? Very complex

**Decision needed:** Are these optional builtins worth implementing? Runtime is 95% complete without them.

---

## 📋 Priority 3: Translator Edge Cases (2-3 days)

Only start after deciding on Priority 2.

### Edge cases to verify:
1. **Pattern matching:** Nested @ patterns, ellipsis, defaults
2. **String escapes:** All escape sequences (\n, \t, \r, \\, \", \$)
3. **Path literals:** Edge cases with interpolation
4. **Operator precedence:** Comprehensive test suite
5. **Multi-line strings:** Indented strings handling

**Current state:** Core features work, but edge cases not exhaustively tested.

---

## 📋 Priority 4: Expand nixpkgs.lib Testing (4-6 days)

Only start after Priority 2 and 3.

**Current:** 10/41 files tested (24%)
**Target:** 20/41 files (50%)

### High-value files to test next:
- lists.nix - List manipulation functions
- attrsets.nix - Attrset utilities
- options.nix - NixOS option system
- meta.nix - Package metadata
- debug.nix - Debugging utilities
- filesystem.nix - Path operations
- remaining systems/*.nix files

---

## 🧪 Test Organization

Tests are organized by function:

```
main/tests/
├── builtins/           # Individual builtin tests (organized by builtin name)
├── operators/          # Operator tests (organized by operator)
├── derivation/         # Derivation system tests
├── translator_test.js  # Main translator tests
├── nixpkgs_*_test.js  # nixpkgs.lib integration tests
├── import_*_test.js   # Import system tests
└── *_standalone_test.js  # Tests without runtime import
```

### Run tests:
```bash
# All tests
deno test --allow-all

# Specific category
deno test --allow-all main/tests/builtins/
deno test --allow-all main/tests/operators/
deno test --allow-all main/tests/derivation/

# Individual test
deno run --allow-all main/tests/derivation/standalone_test.js
```

---

## 🗑️ Recent Cleanup (2026-02-06)

**Removed bloat:**
- tools/fs_shim.js (21,722 lines - never used)
- tools/nix_tools.js (965 lines - never used)
- tools/git binary (6.8MB - should use system git)
- tools/yaml_nix.yml (old design doc)
- main/tests/phase*.js (obsolete phase-based tests)
- main/tests/simple_test.js, nixpkgs_simple_test.js (redundant)
- main/tests/other/ (unclear purpose)

**Result:** ~23KB of code removed, clearer structure

---

## 📚 Key Implementation Rules

1. **Read docs first:** Always check nix.dev and noogle.dev before implementing
2. **Test in Nix:** Verify behavior in actual Nix interpreter
3. **No assumptions:** Base implementation on documentation, not guesses
4. **BigInt for integers:** Nix ints → JavaScript BigInt (correct division: 1/2 ≠ 1.0/2)
5. **Scope via Object.create():** Function closures must preserve getters (NOT spread operator)
6. **Lazy evaluation:** Recursive sets use getters
7. **Variables via nixScope:** `nixScope["varName"]` avoids keyword conflicts

---

## 🎯 Recommended Next Steps

1. **Fix derivation test harness** (1-2 hours) - Rewrite without quickr
2. **Decide on optional builtins** (fetchMercurial, fetchClosure, getFlake) - Are they needed?
3. **If skipping optional builtins:** Move to translator edge cases (Priority 3)
4. **Expand nixpkgs.lib testing** (Priority 4) - Get to 50% coverage

**Current recommendation:** Skip optional builtins (rarely used), focus on translator polish and testing expansion.

---

## 📖 Documentation

- **ARCHITECTURE_CLEANUP.md** - Comprehensive cleanup plan and rationale
- **README.md** - Project overview and quick start
- **main/tests/derivation/IMPLEMENTATION_PLAN.md** - Derivation details
- **main/tests/derivation/PROGRESS.md** - Derivation progress tracking
