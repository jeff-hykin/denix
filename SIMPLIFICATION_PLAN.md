# Denix Simplification and Refocus Plan

## Current State Analysis

### What's Actually Needed
1. **Core functionality**: Nix → JS translator (main.js) ✅ DONE
2. **Runtime builtins**: 109 builtins in runtime.js (100% implemented, 37% tested)
3. **Test system**: Validate JS matches Nix behavior
4. **Test runner**: Simple way to run all/specific tests

### What Exists
- ✅ `main.js` - Translator (complete)
- ✅ `main/runtime.js` - All builtins implemented
- ✅ `test.sh` - Test runner with categories
- ✅ 28 test files organized by feature
- ✅ Support modules (fetcher, tar, nar_hash, store_manager, import system)
- ⚠️ Documentation files: README.md, ARCHITECTURE.md, TESTING.md, prompt.md (overlap)

### Documentation Redundancy

**Current docs (4 files, ~50KB):**
1. `README.md` (5KB) - Project overview
2. `ARCHITECTURE.md` (7.2KB) - System design
3. `TESTING.md` (7.1KB) - How to test
4. `prompt.md` (32KB) - What to do next

**Issues:**
- Overlapping information across files
- prompt.md is 32KB (too large, should be concise)
- TESTING.md duplicates what test.sh already explains
- ARCHITECTURE.md has outdated stats

## Simplification Actions

### 1. Documentation Consolidation

**Keep:**
- `README.md` - Entry point (what/why/quick start)
- `ARCHITECTURE.md` - System design decisions (how)
- `prompt.md` - Current priorities only (50 lines max)

**Remove:**
- `TESTING.md` - Redundant with test.sh comments

**Update:**
- Shrink prompt.md from 828 lines → 50 lines
- Focus only on: "What's the next test file to create?"
- Remove all the motivational text, examples, nix repl commands

### 2. Test Organization (Already Good!)

Current structure is clean:
```
main/tests/
  ├── builtins_*_test.js      # Builtin tests
  ├── derivation/             # Derivation tests
  ├── import_*_test.js        # Import system
  ├── nixpkgs_*_test.js       # Integration tests
  ├── translator_test.js      # Translator tests
  └── *_interpolation_test.js # String/path tests
```

**No changes needed** - structure is logical.

### 3. Refocus Priority in prompt.md

**Old prompt.md**: 828 lines of detailed instructions
**New prompt.md**: Simple priority list

```markdown
# Current Priority: Runtime Testing

## Status
- 40/109 builtins tested (37%)
- Target: 87/109 (80%)
- Need: 47 more builtin tests

## Next Test Files to Create (in order)

1. `main/tests/builtins_type_checking_test.js` - 10 functions (isNull, isBool, isInt, isFloat, isString, isList, isPath, isAttrs, isFunction, typeOf)
2. `main/tests/builtins_lists_comprehensive_test.js` - 10 functions (map, filter, all, any, elem, elemAt, partition, sort, genList, concatLists)
3. `main/tests/builtins_attrs_comprehensive_test.js` - 6 functions (getAttr, attrNames, attrValues, catAttrs, genericClosure, getEnv)
4. `main/tests/builtins_strings_comprehensive_test.js` - 5 functions (split, splitVersion, baseNameOf, dirOf, toXML)
5. `main/tests/builtins_math_comprehensive_test.js` - 8 functions (sub, mul, ceil, floor, bitAnd, bitOr, bitXor, toString)
6. `main/tests/builtins_paths_comprehensive_test.js` - 11 functions (pathExists, readFile, readDir, readFileType, findFile, toFile, storePath, toPath, storeDir, nixPath, placeholder)

## Test Process
1. Test behavior in `nix repl` first
2. Write Deno.test() matching Nix behavior
3. Run: `deno test --allow-all <file>`
4. Fix bugs discovered

## Run Tests
- All: `deno test --allow-all`
- Category: `./test.sh <category>`
- Specific: `deno test --allow-all main/tests/<file>.js`
```

### 4. Test Runner Enhancement

Current test.sh is good but file names don't match.

**Issue:** Script expects `builtins_types_test.js` but docs say `builtins_type_checking_test.js`

**Fix:** Update test.sh to match actual file names or standardize names.

### 5. Remove Bloat

**Check for:**
- Unused imports in JS files
- Dead code in runtime.js
- Unnecessary helper functions

## Implementation Plan

### Phase 1: Documentation Cleanup (30 min)
1. Delete TESTING.md (info in test.sh)
2. Rewrite prompt.md (828 → 50 lines)
3. Update ARCHITECTURE.md stats

### Phase 2: Test Runner Alignment (15 min)
1. Decide on file naming convention
2. Update test.sh to match
3. Update prompt.md to match

### Phase 3: Code Cleanup (1 hour)
1. Check for unused imports
2. Remove dead code if any
3. Verify all helper functions are used

## Expected Outcome

**Before:**
- 4 docs (50KB), overlapping info
- prompt.md is intimidating (828 lines)
- File naming inconsistency

**After:**
- 3 docs (15KB), clear purpose
- prompt.md is simple (50 lines)
- Consistent file naming
- Zero dead code

**Result:** Simpler, clearer, easier to work with.
