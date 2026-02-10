# Denix Development Guide

## Project Goal
Implement a Nix → JavaScript translator with 1-to-1 parity for Nix builtins.

## Core Files
- **main/runtime.js** - Nix builtins implementation (62/65 done)
- **main.js** - Nix → JS translator (complete, needs edge case tests)
- **main/tests/** - Test suite (165 tests passing, 1 flaky network test)

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

## What's NOT Done

### Runtime (main/runtime.js)
1. **Derivation bug** (above) - 30 min
2. **Optional builtins** (decision needed: skip or implement?)
   - fetchMercurial (2-3 days, rare)
   - fetchClosure (5-7 days, experimental)
   - getFlake (5-7 days, experimental)
3. **Builtin edge cases** - Most builtins need more edge case tests

### Translator (main.js)
Translator works but needs comprehensive edge case tests:
1. **Pattern matching** - Nested @, ellipsis with defaults, empty patterns
2. **String escapes** - All escape sequences in various string types
3. **Path literals** - Spaces, special chars, <nixpkgs> edge cases
4. **Operator precedence** - Complex operator combinations
5. **Multi-line strings** - Indentation stripping, escape sequences
6. **Inherit** - All scoping edge cases

### Testing Coverage
Currently: 10/41 nixpkgs.lib files tested (24%)
Goal: 50%+ coverage

**High-value test targets:**
- lists.nix (core list utils)
- attrsets.nix (core attrset utils)
- options.nix (NixOS option system)
- debug.nix, meta.nix, filesystem.nix

## Implementation Rules

1. **Read docs first** - https://nix.dev/manual/nix/2.28/language/builtins.html
2. **Test in nix repl** - Verify behavior before implementing
3. **BigInt for integers** - Nix ints → BigInt (for correct 1/2 = 0)
4. **Object.create() for scopes** - Preserves getters, NOT spread operator
5. **Lazy eval via getters** - Recursive sets need getters

## Recommended Work Order

**SIMPLE PATH (skip optional features):**
1. Fix derivation bug (30 min) → Priority 1
2. Test derivation edge cases (2-3 hrs) → Create 002_advanced_tests.js
3. Skip optional builtins (fetchMercurial, fetchClosure, getFlake)
4. Test translator edge cases (12-17 hrs) → Tasks listed above
5. Expand nixpkgs.lib coverage (4-6 days) → Target 50%

**Total: ~6-8 days to production-ready**

**COMPLETE PATH (implement everything):**
Add 16-22 days for optional builtins (not recommended - rarely used)

## Current Status
- ✅ 165/166 tests passing (1 flaky network test)
- ✅ All core Nix language features working
- ✅ Import system working
- ✅ Store path system working (except derivation bug)
- ⚠️ Derivation store paths broken (fix ready)
- ⚠️ Edge case test coverage incomplete
- ⚠️ nixpkgs.lib coverage at 24%
