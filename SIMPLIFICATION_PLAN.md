# Denix Codebase Simplification Plan

## Executive Summary

**Current State**: 413 tests passing ✅, all core functionality working, 67.9% runtime coverage

**Goal**: Simplify codebase architecture without compromising functionality or test quality

**Philosophy**: SIMPLICITY FIRST - Remove bloat, organize clearly, make maintenance easy

---

## Critical Findings

### 1. DOCUMENTATION BLOAT ⚠️

**Problem**: Three overlapping documentation files with redundant content

- `README.md` (5.2 KB) - Project overview + architecture
- `ARCHITECTURE.md` (6.6 KB) - Technical details + file listing
- `prompt.md` (22.6 KB) - Development guide + status + priorities

**Issues**:
- ARCHITECTURE.md line 153 references non-existent `tools/analysis.js`
- ARCHITECTURE.md line 58 says "27 test files" (actually 30)
- All three repeat similar architecture information
- prompt.md mixes rules, status, and implementation details

**Solution**:
```
KEEP: README.md (user-facing, project overview)
MERGE: ARCHITECTURE.md → README.md (consolidate architecture section)
REFACTOR: prompt.md → Focus ONLY on development priorities, remove status
STATUS: Move to MEMORY.md (already in .claude/projects/)
```

### 2. NIXPKGS.LIB BLOAT 🔴

**Problem**: 13MB `nixpkgs.lib/` directory with its own git history

- Contains 32+ .nix files + subdirectories
- Only 12 files actually used by tests
- Has its own .git directory (nested repository)
- Bloats main repo significantly

**Current Usage**:
```javascript
// Only ONE test file uses it:
main/tests/nixpkgs_lib_files_test.js (line 16)

// Tests these 12 files:
- ascii-table.nix
- fetchers.nix
- flake-version-info.nix
- flakes.nix
- kernel.nix
- licenses.nix
- minfeatures.nix
- source-types.nix
- strings.nix
- versions.nix
- systems/flake-systems.nix
- systems/supported.nix
```

**Solution Options**:

**Option A (RECOMMENDED)**: Minimal test fixtures
```bash
# Create minimal fixture directory
mkdir -p main/tests/fixtures/nixpkgs-lib/lib/systems
# Copy only the 12 files actually used in tests
# Update nixpkgs_lib_files_test.js line 16
# Remove bloated nixpkgs.lib/ directory
# Result: ~120KB instead of 13MB (99% size reduction)
```

**Option B**: Git submodule
```bash
# Convert to submodule (keeps separate git history)
git rm -rf nixpkgs.lib
git submodule add https://github.com/NixOS/nixpkgs nixpkgs-submodule
# Update test paths
# Result: Still 13MB but separated from main repo
```

**Option C**: Keep as-is but document
```
# Add to README that nixpkgs.lib is optional reference material
# Users can remove it if they don't need integration tests
# Result: No change, just documentation
```

### 3. TEST ORGANIZATION 📁

**Problem**: 30 test files in flat `main/tests/` directory

**Current Structure** (hard to navigate):
```
main/tests/
├── builtins_attrset_ops_test.js
├── builtins_core_test.js
├── builtins_fetchgit_test.js
├── builtins_fetchtarball_test.js
├── builtins_fetchtree_test.js
├── builtins_fetchurl_test.js
├── builtins_filtersource_test.js
├── builtins_lists_comprehensive_test.js
├── builtins_math_bitwise_test.js
├── builtins_path_test.js
├── builtins_string_ops_test.js
├── builtins_tojson_path_test.js
├── builtins_type_checking_test.js
├── derivation/ (subdirectory)
├── fetcher_test.js
├── fixtures/ (subdirectory)
├── fromtoml_test.js
├── hasattr_test.js
├── import_cache_test.js
├── import_e2e_test.js
├── import_integration_test.js
├── import_loader_test.js
├── import_resolver_test.js
├── nar_hash_test.js
├── nixpkgs_lib_files_test.js
├── nixpkgs_trivial_test.js
├── operators.js  ⚠️ (not named *_test.js)
├── path_interpolation_test.js
├── store_manager_test.js
├── string_interpolation_test.js
├── tar_test.js
└── translator_test.js
```

**Proposed Structure** (clear organization):
```
main/tests/
├── builtins/                    # Runtime builtin tests (13 files)
│   ├── attrset_ops_test.js
│   ├── core_test.js
│   ├── fetchgit_test.js
│   ├── fetchtarball_test.js
│   ├── fetchtree_test.js
│   ├── fetchurl_test.js
│   ├── filtersource_test.js
│   ├── lists_comprehensive_test.js
│   ├── math_bitwise_test.js
│   ├── path_test.js
│   ├── string_ops_test.js
│   ├── tojson_path_test.js
│   └── type_checking_test.js
├── translator/                  # Translator tests (5 files)
│   ├── translator_test.js
│   ├── hasattr_test.js
│   ├── string_interpolation_test.js
│   ├── path_interpolation_test.js
│   └── operators_test.js        # Rename from operators.js
├── infrastructure/              # Infrastructure tests (6 files)
│   ├── fetcher_test.js
│   ├── tar_test.js
│   ├── nar_hash_test.js
│   ├── store_manager_test.js
│   ├── fromtoml_test.js
│   └── derivation/              # Keep subdirectory
├── integration/                 # Integration tests (7 files)
│   ├── import_cache_test.js
│   ├── import_e2e_test.js
│   ├── import_integration_test.js
│   ├── import_loader_test.js
│   ├── import_resolver_test.js
│   ├── nixpkgs_lib_files_test.js
│   └── nixpkgs_trivial_test.js
└── fixtures/                    # Test fixtures (keep)
```

**Benefits**:
- Clear separation of concerns
- Easy to run specific test categories
- New contributors can navigate easily
- test.sh already supports subdirectories

**Update test.sh**:
```bash
# Add category shortcuts
builtins)  deno test --allow-all main/tests/builtins/
translator) deno test --allow-all main/tests/translator/
infra)     deno test --allow-all main/tests/infrastructure/
integration) deno test --allow-all main/tests/integration/
```

### 4. MINOR CLEANUP ITEMS

**File Issues**:
- `main/tests/operators.js` - Should be renamed to `operators_test.js` (154 lines, doesn't follow naming convention)
- `main/errors.js` - Only 2 lines, could be inlined into runtime.js (optional)

**Documentation Errors**:
- ARCHITECTURE.md line 153: Remove reference to non-existent `tools/analysis.js`
- ARCHITECTURE.md line 58: Update "27 files" → "30 files"

---

## Implementation Priority

### Phase 1: Documentation Cleanup (30 min)

1. Consolidate README.md + ARCHITECTURE.md
2. Refactor prompt.md to focus on priorities only
3. Fix documentation errors
4. Update file counts

### Phase 2: Test Organization (2-3 hours)

1. Create subdirectories under main/tests/
2. Move files to appropriate subdirectories
3. Rename `operators.js` → `operators_test.js`
4. Update test.sh with new paths
5. Verify all tests still pass

### Phase 3: Remove nixpkgs.lib Bloat (1-2 hours)

1. Create minimal fixture directory
2. Copy only the 12 used .nix files
3. Update nixpkgs_lib_files_test.js path
4. Add README explaining how to get full nixpkgs.lib
5. Remove 13MB directory
6. Verify integration tests still pass

### Phase 4: Verify & Document (30 min)

1. Run full test suite (413 tests should still pass)
2. Update MEMORY.md with new structure
3. Commit changes with clear message

---

## Testing Strategy

The current test.sh provides excellent organization:

```bash
./test.sh                 # Run all tests (413 tests)
./test.sh builtins        # Runtime builtin tests
./test.sh translator      # Translator tests
./test.sh derivation      # Derivation tests
./test.sh import          # Import system tests
./test.sh infra           # Infrastructure tests
./test.sh integration     # nixpkgs integration tests
./test.sh <pattern>       # Run specific tests
```

**Goal**: Tests should validate JS behavior against Nix behavior

**Current Status**: ✅ ACHIEVED
- All 413 tests compare Deno output vs expected Nix behavior
- Integration tests validate against real nixpkgs.lib code
- Test coverage: 67.9% of runtime builtins

---

## Recommended Action Plan

### Immediate (Do First)

1. **Consolidate documentation** - Merge README + ARCHITECTURE, refactor prompt.md
2. **Fix doc errors** - Remove analysis.js reference, update file counts

### Short-term (This Session)

3. **Organize tests** - Create subdirectories, move files, update test.sh
4. **Minimal fixtures** - Extract 12 used .nix files, remove 13MB bloat

### Optional (If Time)

5. **Rename operators.js** → operators_test.js
6. **Inline errors.js** → runtime.js (only 2 lines)

---

## Success Criteria

✅ All 413 tests pass
✅ Repo size reduced by ~13MB
✅ Clear directory organization
✅ Single source of truth for architecture docs
✅ prompt.md focused on development priorities only
✅ Easy for new contributors to navigate

---

## Risk Assessment

**LOW RISK**: All proposed changes are organizational
- No code logic changes
- Only moving files and updating paths
- All tests verify behavior remains identical

**Rollback Plan**: Git makes reverting trivial if needed

---

## Next Steps

1. Review this plan with human architect
2. Get approval on approach (especially nixpkgs.lib handling)
3. Execute Phase 1-4 in order
4. Verify all tests pass
5. Update MEMORY.md with new structure

**Estimated Total Time**: 4-6 hours for complete simplification
