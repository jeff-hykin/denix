# Denix Architecture Issues & Simplification Plan

**Date:** 2026-02-11
**Status:** All 538 tests passing, 100% functionality preserved
**Codebase Size:** 5,291 lines (non-test)

---

## Executive Summary

The denix codebase is **functionally complete** (102/102 Nix builtins implemented, all tests passing). However, there are **5 critical architectural issues** that prevent scalability and maintainability:

1. **Giant runtime.js** (2,882 lines, 54% of codebase) - unmaintainable monolith
2. **Circular dependencies** - blocks refactoring
3. **Duplicate import code** - maintenance burden
4. **Overly broad imports** - high coupling
5. **Unclear module boundaries** - confusing organization

---

## Critical Issues (Must Fix)

### 1. GIANT GOD OBJECT: runtime.js (2,882 lines) 🔴 **HIGH PRIORITY**

**Problem:**
- Single file contains 54% of entire codebase
- Contains ALL builtins (127+), import system, string/path handling, fetchers, store, registry
- Impossible to navigate and maintain
- New contributors can't understand the code structure

**Evidence:**
```
runtime.js breakdown:
- Lines 164-2063: 100+ builtins definitions (1,900 lines)
- Lines 1-163: Helper functions + exports
- Mixes operators, type checking, lists, attrsets, math, strings, paths, derivations, fetchers, control flow
```

**Recommended Split:**
```
main/runtime/
├── index.js           # Public exports (re-exports from modules)
├── builtins/
│   ├── types.js       # Type checking (10 functions)
│   ├── lists.js       # List operations (30 functions)
│   ├── attrsets.js    # Attrset operations (25 functions)
│   ├── strings.js     # String operations (20 functions)
│   ├── math.js        # Math & bitwise (15 functions)
│   ├── derivations.js # Derivation system (10 functions)
│   ├── fetchers.js    # Fetch operations (8 functions)
│   └── control.js     # Control flow (trace, throw, etc.)
├── operators.js       # Operators (add, sub, etc.)
├── classes.js         # InterpolatedString, Path classes
└── helpers.js         # Utility functions
```

**Benefits:**
- Each module ~200-400 lines (manageable)
- Clear separation of concerns
- Easy to find specific builtins
- Parallelizable test execution

**Effort:** 8-12 hours
**Risk:** LOW (just moving code, tests verify correctness)

---

### 2. CIRCULAR DEPENDENCIES 🟠 **MEDIUM PRIORITY**

**Problem:**
```
translator.js → runtime.js → import_loader.js → translator.js (CYCLE!)
```

**Root Cause:**
- Error types (`NixError`, `NotImplemented`, `nixRepr`) defined in runtime.js
- Translator needs these types for error handling
- Import loader needs translator to evaluate imported files
- Creates circular dependency

**Evidence:**
```javascript
// translator.js line 7
import runtime from "./runtime.js"

// runtime.js line 2066
import { translateAndEvaluate } from "./import_loader.js"

// import_loader.js line 3
import translate from "./translator.js"
```

**Solution: Extract errors.js**
```
main/
├── errors.js          # NixError, NotImplemented, nixRepr (30 lines)
├── translator.js      # Import from errors.js
├── runtime.js         # Import from errors.js
└── import_loader.js   # No more cycle!
```

**Benefits:**
- Breaks circular dependency
- Enables ES module migration
- Allows independent testing
- Clearer error handling separation

**Effort:** 3-4 hours
**Risk:** LOW (simple extraction)

---

### 3. DUPLICATE CODE IN IMPORT SYSTEM 🔴 **HIGH PRIORITY**

**Problem:**
- `builtins.import` and `builtins.scopedImport` have ~60 lines of nearly identical code
- Only 15 lines differ (cache usage + scope override)
- Bug fixes must be applied twice
- Maintenance burden

**Evidence:**
```javascript
// runtime.js lines 2015-2063 (import)
// runtime.js lines 1963-2013 (scopedImport)
// 45+ lines are IDENTICAL
```

**Solution: Extract helper function**
```javascript
// Extract to:
function performImport(inputPath, scope = null, useCache = true) {
    // Unified import logic (60 lines)
    // Handle both cached and uncached imports
    // Handle both default and custom scopes
}

// Then simplify to:
"import": (path) => performImport(path, null, true),
"scopedImport": (scope) => (path) => performImport(path, scope, false)
```

**Benefits:**
- Single source of truth
- Bug fixes apply to both
- Easier to test
- Reduces runtime.js by 50+ lines

**Effort:** 2-3 hours
**Risk:** LOW (tests verify correctness)

---

### 4. OVERLY BROAD IMPORTS IN RUNTIME.JS 🔴 **HIGH PRIORITY**

**Problem:**
- runtime.js imports from 13+ different modules
- Creates tight coupling
- Makes runtime.js depend on EVERYTHING
- Prevents independent testing

**Evidence:**
```javascript
// runtime.js imports:
import { downloadWithRetry } from "./fetcher.js"
import { extractTarball } from "./tar.js"
import { hashDirectory } from "./nar_hash.js"
import { computeFetchStorePath, cacheExtractedDirectory } from "./store_manager.js"
import { getFlakeRegistry, resolveIndirectFlake } from "./registry.js"
import { sha256, md5, sha1, sha512 } from "../tools/hashing.js"
import { computeStorePath, makeFixedOutputPath } from "../tools/store_path.js"
import { resolveImportPath } from "../tools/import_resolver.js"
// ... and more
```

**Solution: Dependency injection**
```javascript
// Instead of importing everything, pass dependencies to functions
export function createBuiltins(dependencies) {
    const { fetcher, store, registry, hashing } = dependencies

    return {
        fetchGit: (args) => fetcher.fetchGit(args),
        // ...
    }
}
```

**Benefits:**
- Looser coupling
- Can mock dependencies in tests
- Clear dependency boundaries
- Easier to understand data flow

**Effort:** 6-8 hours
**Risk:** MEDIUM (requires careful refactoring)

---

### 5. UNCLEAR MODULE BOUNDARIES: main/ vs tools/ 🟠 **MEDIUM PRIORITY**

**Problem:**
- `main/` mixes high-level logic (runtime.js) with low-level operations (tar.js, nar_hash.js)
- `tools/` purpose unclear (utilities? pure functions? why import_resolver.js here?)
- No clear layering
- Confusing for new contributors

**Current Structure:**
```
main/
├── runtime.js          # HIGH-LEVEL (uses everything)
├── translator.js       # HIGH-LEVEL (AST → JS)
├── import_cache.js     # MID-LEVEL
├── import_loader.js    # MID-LEVEL
├── fetcher.js          # LOW-LEVEL (HTTP downloads)
├── tar.js              # LOW-LEVEL (file operations)
├── nar_hash.js         # LOW-LEVEL (hashing)
├── store_manager.js    # MID-LEVEL
└── registry.js         # MID-LEVEL

tools/
├── hashing.js          # LOW-LEVEL (pure functions)
├── store_path.js       # LOW-LEVEL (pure functions)
└── import_resolver.js  # LOW-LEVEL (pure functions)
```

**Recommended Reorganization:**
```
main/
├── translator.js       # Nix → JS translator
├── runtime/            # Split runtime.js (see issue #1)
│   ├── index.js
│   ├── builtins/
│   ├── operators.js
│   └── classes.js
├── import/             # Import system
│   ├── cache.js
│   ├── loader.js
│   └── resolver.js
├── storage/            # Store management
│   ├── manager.js
│   ├── paths.js
│   └── nar_hash.js
├── network/            # Network operations
│   ├── fetcher.js
│   ├── registry.js
│   └── tar.js
└── utils/              # Pure utilities
    ├── hashing.js
    └── errors.js

tools/ (REMOVE - consolidate into main/)
```

**Benefits:**
- Clear layering (translator → runtime → storage/network → utils)
- Easy to find related code
- Natural dependency flow (top → bottom)
- Better separation of concerns

**Effort:** 8-12 hours
**Risk:** LOW (moving files, updating imports)

---

## Other Issues (Lower Priority)

### 6. Multiple Incompatible Caching Strategies 🟠 MEDIUM

Three different caching implementations with no unified interface:

1. **import_cache.js**: Uses Map with circular detection + stack tracking
2. **store_manager.js**: Uses JSON file persistence
3. **registry.js**: Uses TTL-based memory cache (1-hour expiry)

**Problem:** Can't swap implementations without rewriting code

**Solution:** Create unified `CacheManager` interface
**Effort:** 4-6 hours

---

### 7. Exposed Internal Functions 🔵 LOW

**tar.js** exports functions that are only used internally:
- `detectFormat()` - Only called within tar.js
- `stripTopLevelDirectory()` - Only called within tar.js

**Solution:** Mark as internal or remove from exports
**Effort:** 30 minutes

---

### 8. Inconsistent Naming Patterns 🔵 LOW

Mixed naming conventions across modules:
- `computeFetchStorePath()` vs `computeStorePath()` (inconsistent prefix)
- `downloadWithRetry()` vs `extractTarball()` vs `hashDirectory()` (mixed verb styles)

**Solution:** Standardize to `verbNoun()` pattern
**Effort:** 2-3 hours

---

### 9. FileSystem Abstraction Inconsistency 🔵 LOW

Some modules use `FileSystem` (from quickr), others use Deno directly.

**Solution:** Pick one approach (recommend: use Deno directly)
**Effort:** 1 hour

---

### 10. Complex Lazy Evaluation Pattern ✅ JUSTIFIED

`lazyMap()` uses Proxy with 10 trap handlers - seems complex but:
- Matches Nix semantics exactly
- Only used once
- Well-tested

**Recommendation:** Just add documentation explaining why it's needed

---

## Refactoring Roadmap

### Phase 1: Quick Wins (3-4 hours)
**Goal:** Break circular dependencies, add documentation

1. ✅ Extract `errors.js` with NixError, NotImplemented, nixRepr (2 hours)
2. ✅ Update imports in translator.js, runtime.js, import_loader.js (1 hour)
3. ✅ Add comments explaining complex patterns (30 min)
4. ✅ Remove internal exports from tar.js (30 min)

**Risk:** LOW
**Tests affected:** 0 (just moving code)

---

### Phase 2: High-Impact Fixes (4-6 hours)
**Goal:** Reduce duplication, improve clarity

1. ✅ Extract `performImport()` helper from import/scopedImport (2 hours)
2. ✅ Standardize naming conventions (2 hours)
3. ✅ Consolidate FileSystem usage (1 hour)
4. ✅ Add JSDoc comments to all public functions (1 hour)

**Risk:** LOW
**Tests affected:** 0 (refactoring only)

---

### Phase 3: Major Refactoring (16-24 hours)
**Goal:** Split runtime.js, reorganize structure

**Part A: Split runtime.js (8-12 hours)**
1. ✅ Create main/runtime/ directory structure (1 hour)
2. ✅ Extract builtins by category to separate files (6 hours)
3. ✅ Update imports across codebase (2 hours)
4. ✅ Verify all 538 tests still pass (1 hour)

**Part B: Reorganize main/ structure (8-12 hours)**
1. ✅ Create subdirectories (import/, storage/, network/, utils/) (1 hour)
2. ✅ Move files to appropriate locations (3 hours)
3. ✅ Update all import paths (3 hours)
4. ✅ Remove tools/ directory (1 hour)
5. ✅ Verify all tests pass (1 hour)

**Risk:** MEDIUM (large changes, many imports to update)
**Tests affected:** 0 (should all still pass)

---

### Phase 4: Dependency Injection (6-8 hours)
**Goal:** Reduce coupling between modules

1. ✅ Create dependency container (2 hours)
2. ✅ Refactor builtins to accept dependencies (3 hours)
3. ✅ Update tests to use dependency injection (2 hours)
4. ✅ Verify all tests pass (1 hour)

**Risk:** MEDIUM (changes internal architecture)
**Tests affected:** Some test fixtures may need updates

---

### Phase 5: Unified Caching (4-6 hours)
**Goal:** Create consistent caching interface

1. ✅ Design CacheManager interface (1 hour)
2. ✅ Implement adapters for existing caches (2 hours)
3. ✅ Update modules to use CacheManager (2 hours)
4. ✅ Test all caching scenarios (1 hour)

**Risk:** LOW
**Tests affected:** Cache-related tests only

---

## Summary

**Total Effort:** 33-48 hours of refactoring
**Current Status:** All 538 tests passing, 100% functionality
**Goal:** Maintainable, scalable architecture without breaking anything

**Priority Order:**
1. Phase 1 (Quick Wins) - **DO FIRST** (3-4 hours)
2. Phase 2 (High-Impact) - **DO SECOND** (4-6 hours)
3. Phase 3 (Major Refactoring) - **DO WHEN TIME PERMITS** (16-24 hours)
4. Phase 4-5 - **OPTIONAL** (can defer indefinitely)

**Key Insight:** The codebase **works perfectly**. These are maintainability/scalability issues, not functional problems. The code is production-ready but should address these issues before growing further.

---

## Testing Strategy

After each phase:
1. Run full test suite: `deno test --allow-all`
2. Verify 538/538 tests passing
3. Check test execution time (should be ~4 minutes)
4. Commit changes with descriptive message
5. Tag milestone (e.g., `v1.1-phase1-complete`)

**Rollback Plan:** If any phase breaks tests, revert commit and fix issues before continuing.
