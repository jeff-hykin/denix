# Denix Testing Guide

## Quick Start

```bash
# Run all tests
./test.sh

# Run specific test categories
./test.sh runtime       # Runtime builtin tests
./test.sh translator    # Translator tests
./test.sh derivation    # Derivation tests
./test.sh import        # Import system tests
./test.sh infra         # Infrastructure tests
./test.sh integration   # nixpkgs integration tests

# Run tests matching a pattern
./test.sh fetchGit      # All fetchGit tests
./test.sh "002"         # Tests with "002" in name
```

## Test Organization

### Category 1: Runtime Builtin Tests (13 files)

Tests for `main/runtime.js` builtins implementation.

| File | What It Tests | Status |
|------|---------------|--------|
| `builtins_attrs.js` | attrset operations (hasAttr, getAttr, etc.) | ✅ |
| `builtins_eval_control.js` | eval, tryEval, seq | ✅ |
| `builtins_fetchgit_test.js` | fetchGit builtin (network) | ✅ |
| `builtins_fetchtarball_test.js` | fetchTarball builtin (network) | ✅ |
| `builtins_fetchtree_test.js` | fetchTree builtin (network) | ✅ |
| `builtins_fetchurl_test.js` | fetchurl builtin (network) | ✅ |
| `builtins_filtersource_test.js` | filterSource builtin | ✅ |
| `builtins_list.js` | list operations (map, filter, head, tail) | ✅ |
| `builtins_path_test.js` | path builtin | ✅ |
| `builtins_tojson_path_test.js` | toJSON and path handling | ✅ |
| `builtins_version.js` | version comparison builtins | ✅ |
| `nix218_builtins_test.js` | Validates all Nix 2.18 builtins exist | ✅ |
| `fromtoml_test.js` | fromTOML parser | ✅ |

**Run:** `./test.sh runtime`

### Category 2: Translator Tests (5 files)

Tests for `main.js` Nix → JavaScript translator.

| File | What It Tests | Status |
|------|---------------|--------|
| `translator_test.js` | Core translator (87 tests) | ✅ |
| `operators.js` | Operator translation | ✅ |
| `hasattr_test.js` | has-attr pattern translation | ✅ |
| `string_interpolation_test.js` | String interpolation | ✅ |
| `path_interpolation_test.js` | Path interpolation | ✅ |

**Run:** `./test.sh translator`

### Category 3: Derivation Tests (3 files)

Tests for `builtins.derivation` implementation.

| File | What It Tests | Status |
|------|---------------|--------|
| `derivation/001_basic_tests.js` | Basic derivation creation | ✅ |
| `derivation/standalone_test.js` | Store path computation | ✅ |
| `derivation/test_harness.js` | Shared test utilities | - |

**Run:** `./test.sh derivation`

**Known gaps:**
- Multiple outputs (outputs = ["out" "dev" "doc"])
- Complex environment variable serialization
- Passthru attribute preservation
- Meta attribute preservation
- String context propagation

### Category 4: Import System Tests (5 files)

Tests for `builtins.import` and `builtins.scopedImport`.

| File | What It Tests | Status |
|------|---------------|--------|
| `import_cache_test.js` | Import caching logic | ✅ |
| `import_e2e_test.js` | End-to-end import testing | ✅ |
| `import_integration_test.js` | Runtime integration | ✅ |
| `import_loader_test.js` | File loading for imports | ✅ |
| `import_resolver_test.js` | Path resolution | ✅ |

**Run:** `./test.sh import`

### Category 5: Infrastructure Tests (4 files)

Tests for support modules (fetcher, tar, NAR hash, store manager).

| File | What It Tests | Status |
|------|---------------|--------|
| `fetcher_test.js` | HTTP download with retry | ✅ |
| `tar_test.js` | Tarball extraction | ✅ |
| `nar_hash_test.js` | NAR directory hashing | ✅ |
| `store_manager_test.js` | Store path management | ✅ |

**Run:** `./test.sh infra`

### Category 6: Integration Tests (2 files)

Tests using real nixpkgs.lib code.

| File | What It Tests | Status |
|------|---------------|--------|
| `nixpkgs_lib_files_test.js` | Full nixpkgs.lib files (10 files tested) | ✅ |
| `nixpkgs_trivial_test.js` | trivial.nix patterns (20 functions) | ✅ |

**Run:** `./test.sh integration`

**Coverage:** 10/41 nixpkgs.lib files tested (24%)

**Files tested:**
1. ascii-table.nix
2. strings.nix
3. minfeatures.nix
4. source-types.nix
5. versions.nix
6. kernel.nix
7. flakes.nix
8. flake-version-info.nix
9. systems/flake-systems.nix
10. systems/supported.nix

**Files NOT tested (31 remaining):**
- High value: lists.nix, attrsets.nix, options.nix, modules.nix
- Utilities: meta.nix, debug.nix, filesystem.nix, generators.nix, cli.nix
- Systems: parse.nix, inspect.nix, doubles.nix, default.nix
- Complex: derivations.nix, customisation.nix, fixed-points.nix
- And 16 more...

## Test Count Summary

**Total:** ~240+ tests passing
- Runtime tests: ~170+
- Translator tests: 87
- Integration tests: ~30+

## Writing New Tests

### For Runtime Builtins

```javascript
// main/tests/builtins_<name>_test.js
import { builtins } from "../runtime.js"

Deno.test("builtin.<name> basic usage", () => {
    const result = builtins.<name>(arg)
    assertEquals(result, expected)
})
```

### For Translator

```javascript
// Use translator_test.js pattern
import translate from "../../main.js"

Deno.test("translate <pattern>", () => {
    const nixCode = `...`
    const jsCode = translate(nixCode)
    const result = new Function(`return ${jsCode}`)()
    assertEquals(result, expected)
})
```

### For nixpkgs.lib Files

```javascript
// Add to nixpkgs_lib_files_test.js
Deno.test("nixpkgs.lib <filename>", async () => {
    const jsCode = translateNixFile("nixpkgs.lib/lib/<filename>.nix")
    const module = new Function(`
        const runtime = ...
        return ${jsCode}
    `)()
    // Test specific functions from module
    assertEquals(module.someFunc(...), expected)
})
```

## Testing Against Nix

To verify behavior matches Nix:

```bash
# Start nix repl
nix repl

# Test behavior
nix-repl> builtins.someFunc arg
<expected output>

# Then implement test to match
```

## Known Testing Issues

1. **Network tests may be flaky**
   - Tests with network access (fetchGit, fetchTarball, etc.) can fail if:
     - Network is down
     - Remote server changes
     - Git refs are renamed (master → main)

2. **BigInt serialization**
   - Use custom serialization for BigInt in assertions
   - Fixed in operators.js

3. **Lazy evaluation differences**
   - Nix: Lazy by default
   - JavaScript: Eager by default
   - Some edge cases (tryEval) can't be perfectly replicated

## Test Coverage Gaps

### Runtime Builtins
- ❌ fetchMercurial (not implemented)
- ❌ fetchClosure (not implemented)
- ❌ getFlake (not implemented)
- ⚠️ fetchTree type='indirect' (partial implementation)

### Translator Edge Cases
- ⚠️ Nested destructuring patterns with @-syntax
- ⚠️ All string escape sequences
- ⚠️ Path literal edge cases
- ⚠️ Operator precedence comprehensive tests
- ⚠️ Multi-line string handling
- ⚠️ URI literals

### Derivation Edge Cases
- ⚠️ Multiple outputs
- ⚠️ Complex env variable serialization
- ⚠️ Passthru attributes
- ⚠️ Meta attributes
- ⚠️ String context (advanced)

### nixpkgs.lib Coverage
- 24% coverage (10/41 files)
- Target: 60%+ (25/41 files)

## Continuous Integration

Not yet configured. To add CI:

1. Create `.github/workflows/test.yml`
2. Run `deno test --allow-all`
3. Fail if any tests fail
4. Cache Deno dependencies

## Performance

Test suite runs in ~30-60 seconds (including network tests).

To run without network tests:
```bash
deno test --allow-all --filter="builtins_" --ignore="fetch"
```
