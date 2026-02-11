# Denix Development Priorities

**Last Updated:** 2026-02-10 (Session 42 - 80% Coverage Achieved!)

---

## 🎯 PROJECT STATUS

### Core Systems
- ✅ **Translator (main.js)**: 100% complete, 87 tests passing
- ✅ **Runtime (main/runtime.js)**: 109/109 builtins implemented, **88/109 tested (80.7%)**
- ✅ **Import system**: Fully working (import/scopedImport)
- ✅ **Derivations**: Basic tests passing, store path system working
- ✅ **Fetch infrastructure**: All fetchers implemented (git, tarball, url, tree, mercurial)

### Test Coverage Status
- **Total Tests**: 507+ passing across 36 test files
- **Runtime Coverage**: **88/109 builtins tested (80.7%)** ✅
- **Milestone Achieved**: 80% coverage target reached!


---

## 🚨 WORK PRIORITIES

### Priority 1: EXPAND NIXPKGS.LIB TESTING (Next Focus)

**80% coverage achieved!** Now focus on validating against real-world nixpkgs.lib code.

**Current nixpkgs.lib coverage**: 12/41 files tested (29%)

**Files already tested**:
- trivial.nix (20 functions validated)
- ascii-table.nix, strings.nix, minfeatures.nix, source-types.nix, versions.nix, kernel.nix, flakes.nix, flake-version-info.nix, systems/flake-systems.nix, systems/supported.nix

**High-value files to test next** (5-8 hours):
1. **lists.nix** (2-3 hours) - Core list manipulation functions
2. **attrsets.nix** (2-3 hours) - Attribute set utilities (heavily used)
3. **options.nix** (1-2 hours) - NixOS option system foundations
4. **meta.nix** (1 hour) - Package metadata helpers
5. **debug.nix** (1 hour) - Debugging utilities

**Testing Approach**:
1. Extract pure functions from lib file (no dependencies on other lib files)
2. Create test file in `main/tests/nixpkgs_lib_<name>_test.js`
3. Compare translated output with expected Nix evaluation
4. If translator fails, identify missing features and add them

---

### Priority 2: MEDIUM-PRIORITY BUILTIN TESTS (8-12 hours)

**After expanding nixpkgs.lib testing**, optionally test these 21 remaining builtins:

#### Context Operations (5 functions, 2-3 hours)
- `getContext` - Get string context metadata
- `hasContext` - Check if string has context
- `appendContext` - Add context to string
- `addErrorContext` - Add error context for debugging
- `unsafeDiscardStringContext` - Remove string context

#### Store Operations (4 functions, 2-3 hours)
- `storePath` - Create store path
- `toFile` - Write file to store
- `placeholder` - Create output placeholder
- `outputOf` - Reference derivation output

#### Hashing (2 functions, 1 hour)
- `hashString` - Hash string with algorithm
- `hashFile` - Hash file contents

#### Derivations (3 functions, 1-2 hours)
- `derivationStrict` - Strict derivation evaluation
- `unsafeDiscardOutputDependency` - Remove output dependency
- `unsafeGetAttrPos` - Get attribute position info

#### Control Flow (3 functions, 1-2 hours)
- `break` - Debugger breakpoint (if supported)
- `traceVerbose` - Verbose tracing
- `genericClosure` - Generic closure computation

#### Fetchers (1 function, 1-2 hours)
- `fetchClosure` - Fetch from binary cache (complex)

#### Advanced (2 functions, 1-2 hours)
- `getFlake` - Load flake (complex)
- `nixPath` - Get NIX_PATH value

**Note**: fetchMercurial already tested in Session 42

---

### Priority 3: OPTIONAL IMPROVEMENTS (Only if needed)

#### Optional 3.1: Split runtime.js (Low Priority)
**Current**: 2,513 lines in one file (manageable but could be cleaner)
**Proposal**: Split into 3 files if navigability becomes an issue:
- `runtime/builtins.js` - All 109 builtins
- `runtime/operators.js` - Binary/unary operators
- `runtime/index.js` - Classes, setup, exports

**Cost**: ~20 import updates across test files
**Benefit**: Easier to find specific builtins
**Verdict**: Only do if team grows or development slows

#### Optional 3.2: Organize Hashing Module (Very Low Priority)
**Current**: sha1.js, md5.js, sha_helpers.js loose in tools/
**Proposal**: Create `tools/hashing/` subdirectory:
- `tools/hashing/sha1.js`
- `tools/hashing/md5.js`
- `tools/hashing/sha512.js`
- `tools/hashing/index.js` (wrapper, currently tools/hashing.js)

**Cost**: 6 import updates
**Benefit**: Cleaner organization
**Verdict**: Nice-to-have, not urgent

---

## 📋 TESTING SYSTEM

### Running Tests

```bash
# All tests
./test.sh

# By category
./test.sh types         # Type checking
./test.sh lists         # List operations
./test.sh attrs         # Attrset operations
./test.sh strings       # String operations
./test.sh math          # Math & bitwise
./test.sh paths         # Path/file operations
./test.sh core          # Core builtins
./test.sh translator    # Translator
./test.sh derivation    # Derivations
./test.sh import        # Import system
./test.sh infra         # Infrastructure (fetcher, tar, etc.)
./test.sh integration   # nixpkgs.lib integration

# By pattern
./test.sh <pattern>     # Run tests matching pattern
```

### Test Files (36 files, 413+ tests)

**Runtime Builtins (16 files)**:
- `builtins_type_checking_test.js` - Type functions (10 tests)
- `builtins_lists_comprehensive_test.js` - List operations (40+ tests)
- `builtins_attrset_ops_test.js` - Attrset operations (15 tests)
- `builtins_string_ops_test.js` - String operations (25 tests)
- `builtins_math_bitwise_test.js` - Math & bitwise (40 tests, complete!)
- `builtins_file_ops_test.js` - File operations (23 tests, complete!)
- `builtins_misc_test.js` - Miscellaneous (31 tests, complete!)
- `builtins_path_test.js` - Path handling
- `builtins_core_test.js` - Core functions (18 tests)
- `builtins_tojson_path_test.js` - JSON/path conversion
- `builtins_fetchgit_test.js` - Git fetching (10 tests)
- `builtins_fetchmercurial_test.js` - Mercurial fetching (8 tests)
- `builtins_fetchtarball_test.js` - Tarball fetching (6 tests)
- `builtins_fetchtree_test.js` - Generic tree fetching
- `builtins_fetchurl_test.js` - URL fetching (6 tests)
- `builtins_filtersource_test.js` - Source filtering

**Translator (4 files)**:
- `translator_test.js` - AST→JS translation (87 tests)
- `hasattr_test.js` - Has-attr expressions
- `string_interpolation_test.js` - String interpolation
- `path_interpolation_test.js` - Path interpolation

**Derivations (2 files in derivation/ subdirectory)**:
- `derivation/001_basic_tests.js` - Basic derivation tests
- `derivation/standalone_test.js` - Standalone derivation validation

**Import System (5 files)**:
- `import_resolver_test.js` - Path resolution (16 tests)
- `import_cache_test.js` - Caching & circular detection (12 tests)
- `import_loader_test.js` - File loading (7 tests)
- `import_integration_test.js` - builtins.import (8 tests)
- `import_e2e_test.js` - Full translator integration (6 tests)

**Infrastructure (4 files)**:
- `fetcher_test.js` - HTTP downloads
- `tar_test.js` - Tarball extraction
- `nar_hash_test.js` - NAR hashing
- `store_manager_test.js` - Store path management

**Integration (2 files)**:
- `nixpkgs_trivial_test.js` - nixpkgs.lib trivial.nix patterns (20 tests)
- `nixpkgs_lib_files_test.js` - Complete lib file validation

**Operators & Syntax (2 files)**:
- `operators_test.js` - Binary/unary operators
- `fromtoml_test.js` - TOML parsing

---

## 📊 DETAILED BUILTIN COVERAGE

### Fully Tested Categories (100%)
- ✅ Type checking: 10/10 (isBool, isInt, isFloat, isString, isList, isAttrs, isFunction, isPath, isNull, typeOf)
- ✅ Fetch operations: 6/6 (fetchGit, fetchTarball, fetchurl, fetchTree, path, filterSource)
- ✅ Derivations: Core functions tested

### Partially Tested Categories
- ⚠️ List operations: 13+ tested (map, filter, foldl tested; foldl', partition need more)
- ⚠️ Attrset operations: 3-5 tested (attrNames, attrValues, catAttrs tested; getAttr needs tests)
- ⚠️ String operations: 5-6 tested (toString, split, concatStringsSep, baseNameOf, dirOf tested)
- ✅ Math operations: 7/7 tested (ceil, floor, bitAnd, bitOr, bitXor, lessThan, mul)
- ✅ File operations: 6/6 tested (pathExists, readFile, readDir, readFileType, findFile, getEnv)
- ⚠️ Path operations: Some tested (needs audit)

### Untested Categories (0%)
- ❌ Context operations: 0/5 tested (advanced feature)
- ❌ Store operations: 0/4 tested (advanced feature)
- ❌ Hashing: 0/2 tested (infrastructure)

---

## 🎨 CODEBASE ARCHITECTURE

### Directory Structure
```
denix/
├── main.js                 # Nix→JS translator (1,264 lines)
├── test.sh                 # Smart test runner with filters
├── prompt.md               # This file
├── README.md               # Public documentation
│
├── main/                   # Core runtime (8 modules)
│   ├── runtime.js          # 109 builtins + operators (2,513 lines)
│   ├── errors.js           # Error classes
│   ├── import_cache.js     # Import deduplication
│   ├── import_loader.js    # File loading & evaluation
│   ├── fetcher.js          # HTTP downloads with retry
│   ├── tar.js              # Tarball extraction
│   ├── nar_hash.js         # NAR hashing for store paths
│   ├── store_manager.js    # Store path caching
│   └── tests/              # 36 test files (413+ tests)
│
├── tools/                  # Utilities (10 modules)
│   ├── parsing.js          # Tree-sitter wrapper
│   ├── import_resolver.js  # Path resolution
│   ├── store_path.js       # Store path computation
│   ├── hashing.js          # Hash function wrapper
│   ├── sha1.js             # SHA1 implementation
│   ├── md5.js              # MD5 implementation
│   ├── sha_helpers.js      # SHA512 implementation
│   ├── lazy_array.js       # Lazy evaluation proxy
│   ├── json_parse.js       # BigInt-aware JSON
│   └── generic.js          # Float conversion
```

### Module Dependencies (Clean, No Cycles)
```
Layer 1: Pure implementations (no project imports)
  └── sha1.js, md5.js, sha_helpers.js, parsing.js, lazy_array.js, json_parse.js, generic.js

Layer 2: Utilities (Layer 1 only)
  └── hashing.js, import_resolver.js, store_path.js

Layer 3: Infrastructure (Layers 1-2)
  └── tar.js, fetcher.js, nar_hash.js, store_manager.js, import_loader.js

Layer 4: Core runtime (all layers)
  └── runtime.js, main.js (translator)

Layer 5: Tests
  └── All test files
```

### Design Patterns
- **BigInt for integers**: Maintains Nix distinction from floats (1/2 = 0)
- **Object.create() for scopes**: Preserves getters for lazy evaluation
- **Import caching**: Prevents infinite loops, detects circular refs
- **Store path system**: Uses ~/.cache/denix/store/ (no root needed)
- **Curried builtins**: All functions support partial application

---

## 🚫 WHAT NOT TO DO

### Do NOT:
1. **Over-reorganize** - Current structure is clean and works well
2. **Split files prematurely** - runtime.js is large but manageable
3. **Add frameworks** - Keep using Deno with URL imports (no npm)
4. **Create abstractions** - Simple direct implementations are better
5. **Work out of order** - Finish test coverage before adding features
6. **Skip nix repl** - Always verify behavior in real Nix first
7. **Batch test completions** - Mark tests done immediately after writing

### Do:
1. **Test JS output against nix repl output** - This is the validation method
2. **Keep tests simple** - One builtin per test file section
3. **Use test.sh filters** - Run `./test.sh math` not `deno test --filter=mul`
4. **Write clear test names** - "lessThan - basic comparison" not "test1"
5. **Add edge cases** - Empty inputs, null, wrong types, BigInt vs Number
6. **Document edge cases** - Add comments explaining why tests check specific values

---

## 🎯 NEXT IMMEDIATE ACTION

**START HERE**: Test nixpkgs.lib lists.nix (2-3 hours)

1. Clone nixpkgs.lib if not already done: `git clone https://github.com/NixOS/nixpkgs tests/nixpkgs-clone`
2. Read `tests/nixpkgs-clone/lib/lists.nix`
3. Extract 5-10 pure functions with no dependencies
4. Create `main/tests/nixpkgs_lib_lists_test.js`
5. Test each function:
   ```javascript
   Deno.test("lists.nix - <function-name>", () => {
       const nixCode = `<function from lists.nix>`
       const jsCode = convertToJs(nixCode)
       const result = eval(jsCode)
       assertEquals(result(...args), expectedOutput)
   })
   ```
6. Run `./test.sh integration` to verify
7. If any translator errors occur, identify missing features and add them to main.js

---

## 📝 REFERENCE

### Key Architectural Decisions
- **Session 4**: Function closures use Object.create(), not spread operator
- **Session 5-6**: Import system fully implemented (4 phases)
- **Session 24**: Fetch infrastructure complete (all fetchers working)
- **Session 40**: Math, attrset, string tests added (+64 tests)
- **Session 41**: Coverage corrected from 59.6% → 67.9% (was undercounted)
- **Session 42**: 80% coverage achieved! Math (2), file ops (6), misc (6) = 14 new tests (+94 tests)

### Coverage Milestones
- ✅ **Current: 80.7% (88/109 builtins)** - Milestone achieved!
- Next: 90% (99/109 builtins) - Need 11 more tests
- Future: 95%+ (104/109 builtins) - Need 16 total more tests

### Time Estimates
- ✅ **To 80%: COMPLETE** (88/109 tested)
- To 90%: 8-12 hours (11 medium-priority tests)
- To 95%: 14-20 hours total (16 tests including low-priority)
