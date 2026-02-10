# Denix Development Priorities

## CRITICAL RULE

**Focus on what is NOT working. Do not report achievements.**

You are implementing a Nix→JavaScript translator. Break large tasks into small steps. No blockers exist.

## Current Status (2026-02-10)

- ✅ Runtime: 100% feature complete (all 97 Nix 2.18 builtins implemented)
- ✅ Translator: 100% complete (87/87 tests passing)
- ❌ **Test coverage: Only 26%** (28/~100 builtins tested)

**The ONLY remaining work is TESTING.**

## What Remains

### Priority 0: Test Untested Builtins (3-5 days)

**69 builtins have NO tests** (71% of codebase untested):

**Critical untested:**
- Type checking (9): isNull, isBool, isInt, isFloat, isPath, isString, isList, isAttrs, typeOf
- List ops (10): map, filter, all, any, elem, elemAt, concatLists, genList, sort, partition
- Attrset ops (6): hasAttr, getAttr, attrNames, attrValues, catAttrs, zipAttrsWith
- String ops (3): concatStringsSep, split, match
- Math ops (5): sub, mul, lessThan, ceil, floor
- Control flow (6): abort, traceVerbose, break, addErrorContext, genericClosure
- Path/file (8): baseNameOf, dirOf, pathExists, readFile, readDir, readFileType, findFile, toPath
- Hashing (2): hashFile, hashString
- Derivations (7): derivationStrict, placeholder, toFile, storePath, outputOf, unsafeDiscardOutputDependency
- String context (4): getContext, hasContext, appendContext, unsafeDiscardStringContext
- Bitwise (3): bitAnd, bitOr, bitXor
- Other (6): toXML, fromJSON, splitVersion, unsafeGetAttrPos, getEnv, tryEval (needs better tests)

**Testing workflow (MANDATORY):**
1. Read https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-FUNCTION
2. Test in `nix repl` (5+ cases: positive, negative, edge)
3. Write Deno.test() matching Nix behavior exactly
4. Search nixpkgs for real-world usage

**File to create:** `main/tests/builtins_CATEGORY_test.js` (e.g., builtins_types_test.js, builtins_math_test.js)

**Test format:**
```javascript
import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { builtins } from "../runtime.js"

Deno.test("builtins.FUNCTION - description", () => {
    // Test here
    assertEquals(builtins.FUNCTION(input), expected)
})
```

**Goal:** 26% → 80%+ coverage (test 52+ more builtins)

### Priority 1: Test Derivation Edge Cases (2-4 hours)

Current: 12/12 basic tests passing

Missing tests:
- Multiple outputs (out, dev, doc, bin)
- passthru attributes
- meta attributes
- String context propagation

**File:** `main/tests/derivation/002_edge_cases.js`

### Priority 2: Test Translator Edge Cases (1-2 days)

Current: 87/87 tests passing

Missing coverage:
- Nested pattern matching (@-patterns, ellipsis with defaults)
- All string escape sequences (\n, \t, \r, \", \\, \${)
- Multi-line strings with indentation stripping
- URI literals
- Operator precedence edge cases
- Inherit edge cases

**Files to enhance:** `main/tests/translator_test.js`, create `main/tests/translator_edge_cases_test.js`

### Priority 3: Expand nixpkgs.lib Testing (3-5 days)

Current: 15/41 files tested (37%)

**High-value targets:**
- lists.nix (map, filter, fold operations)
- attrsets.nix (core attrset utilities)
- strings.nix (already tested, expand coverage)
- options.nix (module system options)
- modules.nix (module system core)

**File:** `main/tests/nixpkgs_lib_files_test.js` (expand existing)

## Implementation Requirements

**ALWAYS while implementing:**
1. Read Nix docs: https://nix.dev/manual/nix/2.18/language/builtins
2. Verify in `nix repl` BEFORE coding
3. Test positive + negative + edge cases (min 5 per function)
4. Compare JS output with Nix behavior exactly

**npm packages:** Only via `https://esm.sh/NPM_MODULE_NAME` (unreliable)

## Running Tests

```bash
./test.sh                    # All tests
./test.sh runtime            # Runtime builtin tests
./test.sh translator         # Translator tests
./test.sh derivation         # Derivation tests
./test.sh import             # Import system tests
./test.sh integration        # nixpkgs integration tests
```

## Key Files

**Core:**
- `main.js` - Nix→JS translator (1278 lines)
- `main/runtime.js` - Builtin implementations (2314 lines)
- `main/tests/` - Test suites (31 files)

**Infrastructure:**
- `main/import_*.js` - Import system (3 files)
- `main/fetcher.js`, `tar.js`, `nar_hash.js`, `store_manager.js` - Fetch/store (4 files)
- `tools/` - Utilities (hashing, parsing, store paths)

**Documentation:**
- `README.md` - Project overview
- `BUILTIN_COVERAGE.md` - Detailed coverage analysis (69 untested functions listed)
- `TESTING.md` - Testing conventions
- `ARCHITECTURE.md` - System design

## Next Steps

1. Start with Priority 0: Test type checking builtins (isNull, isBool, etc.)
2. Create `main/tests/builtins_types_test.js` with 10+ tests
3. Continue with list operations, attrset operations, etc.
4. Goal: 80%+ coverage = test 52+ more builtins

**Remember:** Focus on what's NOT tested, not what's done.
