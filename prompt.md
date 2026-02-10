# Denix Development Guide

## ⚠️ CRITICAL RULES - READ FIRST ⚠️

**Your job is to focus on what is NOT implemented and NOT working. Only report what remains to be done. Do not report accomplishments.**

You are a senior level developer. There is no such thing as a blocker. Break down large tasks into smaller tasks.

### MANDATORY WORK ORDER (DO NOT DEVIATE):
1. **Runtime builtins MUST be fully implemented FIRST** (all network fetchers, store functions, missing builtins)
2. **Translator MUST be complete SECOND** (only after runtime is 100% done)
3. **nixpkgs.lib tests come LAST** (only after translator is 100% done)

### IMPLEMENTATION REQUIREMENTS:
- **ALWAYS read Nix documentation while implementing**: https://nix.dev/manual/nix/2.28/language/builtins.html
- **Search for examples**: Use web search to find real-world usage patterns
- **Test in nix repl first**: Verify expected behavior before implementing
- **NPM modules**: Only use via `https://esm.sh/NPM_MODULE_NAME` (unreliable, may not work)
- **Break down tasks**: If something seems large (>4 hours), break into smaller pieces

### BEFORE EXECUTING TASKS BELOW:
- Filter out any achievement language (✅, "Complete!", "Working!")
- Only keep remaining/unsolved tasks
- Add implementation details where missing

---

## Core Principle: SIMPLICITY FIRST

Focus on what is NOT working. Test core functionality before edge cases.

**Priority order:** Core tests → Missing builtins → Edge cases → Optional features

---

## WHAT IS NOT DONE (2026-02-10)

**Runtime Gaps:**
- 4 builtins missing: `foldl'`, `warn`, `convertHash`, `addDrvOutputDependencies` (2-3 hours work)
- 86 builtins implemented but UNTESTED (75.4% - this is DANGEROUS)
- Core functions with NO tests: `map`, `filter`, `hasAttr`, `getAttr`, `throw`, `trace`, `isNull`, `typeOf`

**Critical Testing Gap:**
- Only 28/114 builtins have tests (24.6% coverage)
- Type checking: 0% coverage (all 10 functions untested)
- List operations: 20% coverage (map, filter, foldl untested!)
- Attrset operations: 33% coverage (hasAttr, getAttr untested!)
- Cannot trust runtime without testing core operations

**Immediate Work Required:**
1. Test core builtins (type checking, list ops, attrset ops) - 3-5 days
2. Implement 4 missing builtins - 2-3 hours
3. Derivation edge cases - 2-4 hours
4. Translator edge cases - 1-2 days

---

## PRIORITY 0: Test Core Builtins (3-5 days) ⚠️ CRITICAL

**Why this is Priority 0:**
- 75% of builtins are UNTESTED - we don't know if they work!
- Core functions (map, filter, hasAttr, getAttr) used everywhere
- Cannot trust runtime without testing core operations
- Current test coverage is dangerously low (24.6%)

**See BUILTIN_COVERAGE.md** for complete coverage analysis.

**Before testing each builtin:**
1. Read https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-FUNCTIONNAME
2. Test in nix repl to understand exact behavior
3. Write tests for normal cases, edge cases, and error cases

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

## PRIORITY 1: Implement Missing Builtins (2-3 hours)

**Goal:** Complete builtin implementation to 100%

### Task 1.1: Implement `foldl'` (30 min)

**Read first:** https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-foldl'

**Location:** Add after line 574 in `main/runtime.js` (after `"tail"`)

```javascript
"foldl'": (op) => (nul) => (list) => {
    requireList(list);
    let acc = nul;
    for (const elem of list) {
        acc = op(acc)(elem);
    }
    return acc;
},
```

**Test:** Add to `main/tests/builtins_list_operations_test.js`:
- Sum: `foldl' (acc: x: acc + x) 0 [1 2 3 4]` → 10
- Build list: `foldl' (acc: x: acc ++ [x]) [] [1 2 3]` → [1,2,3]
- Empty list: `foldl' (acc: x: acc + x) 5 []` → 5
- String concat: `foldl' (acc: x: acc + x) "" ["a" "b" "c"]` → "abc"

### Task 1.2: Implement `warn` (20 min)

**Read first:** https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-warn

**Location:** Add after line 1354 in `main/runtime.js` (after `"traceVerbose"`)

```javascript
"warn": (msg) => (value) => {
    console.error(`warning: ${requireString(msg).toString()}`);
    return value;
},
```

**Test:** Add to `main/tests/builtins_control_flow_test.js`:
- Basic: `warn "deprecated" 42` → returns 42, prints warning
- With interpolation
- Multiple warns

### Task 1.3: Implement `convertHash` (1 hour)

**Read first:** https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-convertHash

**Research needed:**
- What formats: base16, nix32, base32, base64, sri
- How to detect input format?
- Use existing code in `tools/store_path.js` for nix32

**Location:** Add near other hash functions in `main/runtime.js`

**Test:** Create `main/tests/builtins_hash_convert_test.js`

### Task 1.4: Research `addDrvOutputDependencies` (15 min)

**Check:** Is this in Nix 2.18 or only 2.24+?
- Read Nix changelog
- If NOT in 2.18: Document as "not needed"
- If in 2.18: Add to implementation list

---

## PRIORITY 2: Derivation Edge Cases (2-4 hours)

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

## PRIORITY 3: Translator Edge Cases (1-2 days)

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

## PRIORITY 4: Expand nixpkgs.lib Testing (3-5 days)

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

## PRIORITY 5: Optional Builtins (Optional, 1-3 weeks)

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
