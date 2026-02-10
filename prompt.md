# Denix Development Guide

## ⚠️ CRITICAL RULES - READ FIRST ⚠️

**Your job is to TEST the runtime. Implementation is 100% complete. Testing is only 26% complete.**

You are a senior level developer. There is no such thing as a blocker. Break down large tasks into smaller tasks.

### MANDATORY WORK ORDER:
1. **Test core builtins FIRST** (type checking, list ops, attrset ops) - 26% → 80%+ coverage
2. **Test edge cases SECOND** (derivations, translator, complex scenarios)
3. **Integration tests LAST** (nixpkgs.lib files)

### TESTING REQUIREMENTS:
- **ALWAYS verify in nix repl first**: Test expected behavior before writing tests
- **Read Nix documentation**: https://nix.dev/manual/nix/2.18/language/builtins
- **Test positive + negative + edge cases**: Minimum 5 cases per function
- **Compare JS output with Nix behavior**: Tests must match exactly
- **No implementation needed**: ALL builtins are already implemented, just untested

### CODEBASE STATUS (Verified 2026-02-10):
- ✅ Runtime: 100% feature complete (ALL 97 Nix 2.18 builtins implemented)
- ✅ Translator: 100% complete (87/87 tests passing)
- ✅ Infrastructure: Complete (import, derivation, fetch, store)
- ❌ **Test coverage: Only 26%** (28/~100 builtins tested)

**DO NOT REFACTOR.** Codebase is clean and simple. Focus on testing only.

---

## Core Principle: TEST BEFORE CLAIMING COMPLETE

Implementation ≠ Working correctly. 75% untested code is not "mostly done".

**Priority order:** Core tests → Edge case tests → Integration tests

---

## WHAT IS NOT DONE (2026-02-10)

**CORRECTED COUNTS (verified against Nix 2.18 docs):**
- Nix 2.18 has **97 builtin functions** (excluding constants)
- Denix implements **~107 builtins** (includes some extras like `scopedImport`, `fetchTree`, etc.)
- **All core Nix 2.18 builtins are implemented** (100% feature complete!)
- **HOWEVER:** Only 28 builtins have tests (26% coverage) - THIS IS THE REAL PROBLEM

**Missing builtins NOT in Nix 2.18:**
- `warn` - Added in Nix 2.24+ (NOT needed for 2.18 compatibility)
- `convertHash` - Added in Nix 2.25+ (NOT needed for 2.18 compatibility)
- `addDrvOutputDependencies` - Added in later versions (NOT needed for 2.18 compatibility)

**Critical Testing Gap (THE ACTUAL ISSUE):**
- Only 28/~100 builtins have tests (26% coverage)
- Type checking: Minimal coverage (isFunction tested, but isNull, isBool, isInt, isFloat, isString, isList, isAttrs untested)
- List operations: 20% coverage (map, filter, all, any, foldl' untested!)
- Attrset operations: 33% coverage (hasAttr, getAttr untested!)
- Math operations: Minimal coverage (sub, mul, ceil, floor untested!)
- Cannot trust runtime without testing core operations

**Immediate Work Required:**
1. Test core builtins (type checking, list ops, attrset ops) - 3-5 days (HIGHEST PRIORITY)
2. Derivation edge cases - 2-4 hours
3. Translator edge cases - 1-2 days

---

## PRIORITY 0: Test Core Builtins (3-5 days) ⚠️ CRITICAL

**Current Status:**
- ✅ ALL 97 Nix 2.18 builtins implemented (100% feature complete!)
- ❌ Only 28 builtins have tests (26% coverage)
- ❌ 74% of builtins UNTESTED - unknown if they work correctly
- ❌ Core functions (map, filter, hasAttr, getAttr) used everywhere but UNTESTED

**Why this matters:**
- Cannot trust runtime without testing core operations
- Bugs could exist in "implemented" code
- Integration tests fail if core builtins broken

**Goal:** Increase coverage from 26% → 80%+ (test 52+ more builtins)

**See BUILTIN_COVERAGE.md** for complete coverage analysis.

**Testing workflow:**
1. Read https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-FUNCTIONNAME
2. Test in `nix repl` to verify expected behavior
3. Write Deno tests matching Nix behavior exactly
4. Test positive cases, negative cases, and edge cases (min 5 per function)

### Task 0.1: Type Checking Tests (4-6 hours)

Create `main/tests/builtins_types_test.js` - Test ALL 10 type checking functions:

```javascript
// Test each: isNull, isBool, isInt, isFloat, isPath, isString, isList, isAttrs, isFunction, typeOf
Deno.test("isInt - positive cases", () => {
    assertEquals(builtins.isInt(42n), true)
    assertEquals(builtins.isInt(0n), true)
    assertEquals(builtins.isInt(-5n), true)
})

Deno.test("isInt - negative cases", () => {
    assertEquals(builtins.isInt(3.14), false)
    assertEquals(builtins.isInt("42"), false)
    assertEquals(builtins.isInt(null), false)
})
```

**Minimum tests:** 5 cases per function (50 tests total)
- Positive cases (correct type)
- Negative cases (wrong types)
- Edge cases (empty, null, undefined)

### Task 0.2: List Operation Tests (6-8 hours)

Create `main/tests/builtins_list_operations_test.js`:

**High priority untested:**
- `map` - Used everywhere! Test with numbers, strings, nested lists
- `filter` - Used everywhere! Test predicate functions
- `elem` - Check membership
- `concatLists` - Flatten lists
- `concatMap` - Map then flatten
- `all`, `any` - Boolean predicates
- `genList` - Generate sequences
- `sort` - Sorting with custom comparator
- `partition` - Split by predicate
- `groupBy` - Group elements

**Minimum tests:** 60+ tests (5-8 per function)

### Task 0.3: Attrset Operation Tests (4-6 hours)

Create `main/tests/builtins_attrsets_test.js`:

**High priority untested:**
- `hasAttr` - Used extensively! Test nested attrs
- `getAttr` - Used extensively! Test nested, missing keys
- `attrNames` - List keys
- `attrValues` - List values
- `catAttrs` - Extract attribute from list of attrsets
- `listToAttrs` - Convert list to attrset
- `mapAttrs` - Already tested but needs more cases

**Minimum tests:** 40+ tests

### Task 0.4: String Operation Tests (3-4 hours)

Create `main/tests/builtins_strings_test.js`:

**High priority untested:**
- `concatStringsSep` - Join with separator (VERY common)
- `split` - Split by regex
- `match` - Regex matching

**Already tested but need more cases:**
- `stringLength`, `substring`, `replaceStrings`

**Minimum tests:** 30+ tests

### Task 0.5: Math & Comparison Tests (2-3 hours)

Create `main/tests/builtins_math_test.js`:

**Untested:**
- `sub`, `mul` - Basic arithmetic
- `lessThan` - Comparison
- `ceil`, `floor` - Rounding

**Minimum tests:** 25+ tests

### Task 0.6: Control Flow Tests (2-3 hours)

Create `main/tests/builtins_control_flow_test.js`:

**Untested:**
- `throw` - Error throwing
- `abort` - Fatal errors
- `trace` - Debug printing
- `seq` - Force evaluation
- `deepSeq` - Deep force evaluation

**Minimum tests:** 25+ tests

---

---

## PRIORITY 1: Derivation Edge Cases (2-4 hours)

**Goal:** Verify derivations work in complex scenarios

**Current status:** 12 basic tests passing, but missing:
- Multiple outputs edge cases
- Complex env variable serialization
- Passthru attributes
- Meta attributes
- String context propagation

Create `main/tests/derivation/002_advanced_tests.js`:

### Test Case 1: Multiple Outputs
```nix
derivation {
  name = "multi-output";
  system = "x86_64-linux";
  builder = "/bin/sh";
  outputs = [ "out" "dev" "doc" ];
}
```
Verify: Each output has different store path

### Test Case 2: Complex Environment Variables
```nix
derivation {
  name = "complex-env";
  system = "x86_64-linux";
  builder = "/bin/sh";
  listVar = [ "a" "b" "c" ];  # Space-separated in env
  attrsetVar = { x = 1; };     # toString in env
}
```

### Test Case 3: Passthru Attributes
```nix
derivation {
  name = "with-passthru";
  system = "x86_64-linux";
  builder = "/bin/sh";
  passthru = { version = "1.0"; };
}
```
Verify: `result.passthru.version == "1.0"`

**Time estimate:** 2-4 hours total

---

## PRIORITY 2: Translator Edge Cases (1-2 days)

**Goal:** Ensure translator handles all Nix syntax correctly

**Current status:** 87/87 tests passing, but edge cases not tested:

### 3.1: Pattern Matching (4-6 hours)
- Nested @ patterns: `{x, y} @ all @ another`
- Ellipsis with defaults: `{x ? 1, y ? 2, ...}`
- Mixed patterns

### 3.2: String Escapes (2-3 hours)
- All escape sequences: `\n`, `\t`, `\r`, `\\`, `\"`, `\'`
- Unicode escapes
- Dollar escape in interpolation: `\${not-interpolated}`

### 3.3: Path Literals (2-3 hours)
- Relative paths: `./file`, `../file`
- Absolute paths: `/absolute/path`
- Path interpolation edge cases
- `<nixpkgs>` (partially implemented)

### 3.4: Operator Precedence (1-2 hours)
- Complex expressions: `a + b * c - d / e`
- Mixed operators with parens
- Has-attr with select: `x ? y.z`

### 3.5: Multi-line Strings (1-2 hours)
- Indentation stripping
- Mixed indentation
- Empty lines

---

## PRIORITY 3: Expand nixpkgs.lib Testing (3-5 days)

**Goal:** Validate against more real-world code

**Current:** 10/41 files tested (24%)
**Target:** 25/41 files tested (60%+)

**High-value files:**
- `lists.nix` - List utilities (2-3 hours)
- `attrsets.nix` - Attrset utilities (2-3 hours)
- `options.nix` - NixOS options (3-4 hours)
- `modules.nix` - Module system (4-6 hours)
- `meta.nix` - Package metadata (2-3 hours)
- `debug.nix` - Debugging utilities (1-2 hours)

Add tests to `main/tests/nixpkgs_lib_files_test.js`

---

## PRIORITY 4: Optional Builtins (Optional, 1-3 weeks)

**Only if needed for specific use cases:**

### fetchMercurial (2-3 days)
**Read first:** https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-fetchMercurial

- Requires `hg` binary or npm mercurial module via `https://esm.sh/mercurial` (if exists)
- Similar to fetchGit but for Mercurial
- Rarely used
- Break down: Research hg → Clone repo → Hash computation → Store integration

### fetchClosure (5-7 days) - COMPLEX
**Read first:** https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-fetchClosure

- Requires binary cache access (cache.nixos.org)
- Experimental feature
- Very complex implementation
- Break down: NAR download → Signature verification → Store import → Closure resolution
- May need npm modules via esm.sh for signature verification

### getFlake (5-7 days) - VERY COMPLEX
**Read first:** https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-getFlake

- Requires full flake system (lock files, inputs, outputs)
- Experimental feature
- Large scope
- Break down: Parse flake.nix → Resolve inputs → Fetch inputs → Evaluate outputs
- Study real flake.nix files in nixpkgs for patterns

### fetchTree type='indirect' (3-4 days)
**Read first:** https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-fetchTree

- Flake registry lookups (github:owner/repo → actual URL)
- Complex resolution logic
- Break down: Parse registry → Resolve indirection → Call fetchTree with resolved URL

---

## Testing Commands

```bash
# Run all tests
./test.sh

# Run by category
./test.sh runtime       # All builtin tests
./test.sh translator    # Translator tests
./test.sh derivation    # Derivation tests
./test.sh import        # Import system tests
./test.sh integration   # nixpkgs.lib tests

# Run specific tests
./test.sh builtins_types    # Type checking tests (once created)
./test.sh builtins_list     # List operation tests (once created)
```

---

## Documentation Files

- **TESTING.md** - Test organization and how to run tests
- **ARCHITECTURE.md** - Project structure and design decisions
- **BUILTIN_COVERAGE.md** - Complete builtin coverage analysis (NEW!)
- **README.md** - Project overview and quick start

---

## Key Design Patterns

### BigInt for Integers
```javascript
// Nix: 1 + 2
// JS: 1n + 2n
```

### Object.create() for Scopes
```javascript
// Preserves getters for lazy evaluation
const nixScope = Object.create(parentScope)
// NOT: const nixScope = {...parentScope} // Loses getters!
```

### Lazy Evaluation via Getters
```javascript
Object.defineProperty(obj, "lazy", {
    get() { return expensiveComputation() }
})
```

### InterpolatedString Class
```javascript
// "Hello ${name}" becomes:
new InterpolatedString(["Hello ", ""], [name])
```

---

## When You Need Information

1. **ALWAYS read Nix documentation FIRST**: https://nix.dev/manual/nix/2.28/language/builtins.html
   - For `builtins.fetchClosure`, read https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-fetchClosure
   - For `builtins.foldl'`, read https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-foldl'
   - Search web for additional examples and usage patterns
2. **Search for real-world usage**: Use web search to find how others use the builtin
3. **Test in nix repl**: Verify expected behavior before implementing in JavaScript
4. **Break down the task**: No task is too big to break into 1-2 hour pieces
5. **Write tests first**: Know what success looks like before coding
6. **Start simple**: Core cases before edge cases

---

## No Blockers Exist

All tasks can be started immediately. Break down large tasks into 1-2 hour pieces.

**Remember the work order:**
1. Runtime (Priority 0-2) - Test and complete all builtins
2. Translator (Priority 3) - Handle edge cases
3. nixpkgs.lib (Priority 4) - Expand test coverage

**Do NOT work on translator until runtime is 100% complete.**
**Do NOT work on nixpkgs.lib tests until translator is 100% complete.**

The biggest issue is test coverage (24.6%), not implementation. Testing comes first.
