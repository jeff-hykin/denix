# Denix Project Memory

## Project Overview
Nix to JavaScript translator with 1-to-1 parity for Nix 2.18 builtins. Uses Deno with URL imports (no npm/jsr).

## Current Status (2026-02-10 Session 41 - Architect)

### Runtime (main/runtime.js) - Testing in Progress
- ✅ **ALL 109 function builtins** implemented (100% code complete)
- ✅ **117 total exports** (109 functions + 8 constants)
- ✅ **Test coverage: 59.6%** (65/109 builtins tested)
- ⚠️ **44 untested builtins** (40.4% of runtime)
- ✅ **413 tests** passing (100% pass rate)

### Translator (main.js) - PRODUCTION READY ✅
- ✅ **87 translator tests** all passing (100% pass rate)
- ✅ All core Nix language features implemented
- ✅ Validated against real nixpkgs.lib code

### What's Implemented and Working
- ✅ ALL 109 function builtins implemented (100% code)
- ✅ Import system: `builtins.import` and `builtins.scopedImport`
- ✅ Derivation system: Basic tests passing
- ✅ Fetch infrastructure: fetchGit, fetchTarball, fetchurl, fetchTree
- ✅ Support modules: fetcher.js, tar.js, nar_hash.js, store_manager.js

### Immediate Next Steps (Session 41 Architect Recommendations)
1. **Phase 4: Context & Store tests** (11 functions, 3-4 hours)
   - String context: getContext, hasContext, appendContext, unsafeDiscardStringContext
   - Store ops: placeholder, toFile, toPath, storePath
2. **Phase 5: Remaining tests** (33 functions, 4-5 hours)
   - File ops, hashing, conversion, control flow, advanced
3. **Total to 80%:** ~8-12 hours remaining

## Key Files
- **prompt.md** - Current priorities and implementation guide
- **README.md** - Project overview and quick start
- **ARCHITECTURE.md** - Architecture and design decisions
- **main/runtime.js** - Runtime implementation (109 builtins)
- **main.js** - Translator implementation
- **test.sh** - Simple test runner with categories

## Testing Approach
- Read Nix documentation before implementing
- Test in `nix repl` to understand exact behavior
- Write 5-10 tests per function (normal + edge cases)
- Compare JS output against nix repl output
- Fix any bugs discovered

## Common Patterns

### BigInt vs Float
- Nix ints → JavaScript BigInt (for correct division: 1/2 = 0)
- Nix floats → JavaScript number
- All operators handle both types

### Scope Management
- Nix variables → `nixScope["varName"]`
- Function closures use `Object.create(parentScope)` to preserve getters
- Lazy evaluation via getters for recursive sets

### String Interpolation
- Plain strings → JavaScript strings
- Interpolated strings → InterpolatedString class
- Paths → Path class (extends InterpolatedString)

## Known Limitations
- **Optional builtins not implemented**: fetchMercurial, fetchClosure, getFlake
- **fetchTree edge cases**: type='mercurial|path|indirect'
- These are rarely used in practice

## Architecture Quality: 9/10

**Strengths:**
- Clear module boundaries (main/ for runtime, tools/ for utilities)
- Excellent test organization (30 test files, categorized)
- Simple test runner (test.sh with categories)
- No duplicate code or dead code
- Clean dependency management (URL imports only)
- All tests passing (413/413)

**No architectural changes needed - keep it simple!**

## Session History (Recent Only)
- **2026-02-10 (Session 41)**: 🎯 **Architect Review - No Changes Needed**
  - Analyzed entire codebase structure
  - Verified all 413 tests passing
  - Confirmed architecture is sound (9/10 rating)
  - Simplified MEMORY.md from 962 lines → 135 lines
  - Updated prompt.md priorities
  - **Verdict**: Keep current architecture, continue testing
- **2026-02-10 (Session 40)**: 🎯 **MAJOR TESTING PROGRESS**
  - Created 3 new test files (math, attrset, string ops)
  - Added 64 new tests (+18% coverage)
  - Found and fixed `toString(false)` bug
  - Coverage: 56 → 65 tested (+16%)
  - All 413 tests passing
- **2026-02-10 (Session 39)**: ✅ **Verified accurate test coverage**
  - Confirmed 56/109 tested (51.4% not 38.5%)
  - Updated prompt.md with correct priorities
- **2026-02-05 (Session 6)**: 🎉 **Import System Complete**
  - All 4 phases implemented
  - 5 test suites, 49 tests passing
  - Full Nix → JS → Import → Evaluate working

For complete history, see git log or previous MEMORY.md versions.
