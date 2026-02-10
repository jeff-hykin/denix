# Denix Development Guide

## ⚠️ CRITICAL RULES - READ FIRST ⚠️

**Your job is to focus on what is NOT implemented and NOT working. Only report what remains to be done. Do not report what you accomplished.**

You are a senior level developer. There is no such thing as a blocker. Break down large tasks into smaller tasks.

**Before executing what is below, filter out any achievements. Only keep remaining/unsolved tasks in this document. Add detail to each task if needed.**

### MANDATORY WORK ORDER:
1. **Runtime FIRST** - Finish all builtins (especially network fetchers and store functions in runtime.js)
2. **Translator SECOND** - Do not work on translator until runtime is fully implemented
3. **nix-lib tests LAST** - Do not work on nix-lib tests until translator is fully implemented

### IMPLEMENTATION REQUIREMENTS:
- **ALWAYS read Nix documentation WHILE implementing**: https://nix.dev/manual/nix/2.18/language/builtins
  - Example: Working on `builtins.fetchClosure`? Read https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-fetchClosure
  - Search the internet for additional documentation and real-world usage examples
- **ALWAYS verify behavior in nix repl**: Test expected behavior before implementing
- **Test positive + negative + edge cases**: Minimum 5 cases per function
- **Compare JS output with Nix behavior**: Implementation must match exactly
- **npm modules via esm.sh ONLY**: Use `https://esm.sh/NPM_MODULE_NAME` (unreliable, may not work)

### WHAT IS NOT DONE:
- Test coverage: Only 26% (28/~100 builtins tested) - 74% of code UNTESTED
- Core builtins untested: map, filter, foldl', all, any, hasAttr, getAttr, throw, trace, isNull, typeOf, sub, mul
- Type checking: Minimal coverage (isNull, isBool, isInt, isFloat, isString, isList, isAttrs untested)
- List operations: 20% coverage (most core functions untested)
- Attrset operations: 33% coverage (hasAttr, getAttr untested)

**DO NOT REFACTOR.** Codebase is clean and simple. Focus on remaining work only.

---

## Core Principle: Focus on What Remains

Implementation ≠ Working correctly. Untested code may have bugs.

**Priority order:** Runtime → Translator → nix-lib tests

---

## WHAT REMAINS TO BE DONE (2026-02-10)

### Missing Tests (74% of builtins untested):
- Type checking: isNull, isBool, isInt, isFloat, isString, isList, isAttrs (7 functions)
- List operations: map, filter, all, any, foldl', concatLists, concatMap, elem, genList, sort, partition, groupBy (12 functions)
- Attrset operations: hasAttr, getAttr, attrNames, attrValues, catAttrs, listToAttrs (6 functions)
- Math operations: sub, mul, ceil, floor, lessThan (5 functions)
- Control flow: throw, abort, trace, seq, deepSeq (5 functions)
- String operations: concatStringsSep, split, match (3 functions)

**Total untested:** ~70 builtins need test coverage

### Immediate Work Required:
1. Test core builtins (type checking, list ops, attrset ops) - 3-5 days
2. Test derivation edge cases - 2-4 hours
3. Test translator edge cases - 1-2 days
4. Test more nixpkgs.lib files - 3-5 days

**No implementation work needed** - all code exists, just needs testing.

---

## PRIORITY 0: Test Core Builtins (3-5 days) ⚠️ CRITICAL

**What is NOT tested:**
- 70+ builtins have no test coverage (74% untested)
- Core functions (map, filter, hasAttr, getAttr) used everywhere but UNTESTED
- Unknown if implemented code works correctly

**What remains to be done:**
- Increase coverage from 26% → 80%+ (test 52+ more builtins)
- See BUILTIN_COVERAGE.md for complete list of untested builtins

**Testing workflow (DO THIS WHILE IMPLEMENTING TESTS):**
1. **Read Nix docs first**: https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-FUNCTIONNAME
2. **Test in nix repl**: Verify expected behavior before writing tests
3. **Write Deno tests**: Match Nix behavior exactly
4. **Test all cases**: Positive, negative, and edge cases (min 5 per function)
5. **Search for examples**: Find real-world usage patterns online

### Task 0.1: Type Checking Tests (4-6 hours)

**What remains:** Create `main/tests/builtins_types_test.js`

**Untested functions:** isNull, isBool, isInt, isFloat, isPath, isString, isList, isAttrs, isFunction, typeOf (10 functions)

**Before starting:**
1. Read https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-isInt (and similar for each)
2. Test each in `nix repl` to verify behavior
3. Search for real-world usage examples

**Test structure example:**
```javascript
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

**Required coverage:** 5 cases per function minimum (50 tests total)

### Task 0.2: List Operation Tests (6-8 hours)

**What remains:** Create `main/tests/builtins_list_operations_test.js`

**Untested functions:**
- `map` - CRITICAL, used everywhere
- `filter` - CRITICAL, used everywhere
- `elem` - Check membership
- `concatLists` - Flatten lists
- `concatMap` - Map then flatten
- `all`, `any` - Boolean predicates
- `genList` - Generate sequences
- `sort` - Sorting with custom comparator
- `partition` - Split by predicate
- `groupBy` - Group elements

**Before starting:**
1. Read https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-map (and similar for each)
2. Test each in `nix repl` to verify behavior
3. Find real-world usage in nixpkgs

**Required coverage:** 60+ tests (5-8 per function)

### Task 0.3: Attrset Operation Tests (4-6 hours)

**What remains:** Create `main/tests/builtins_attrsets_test.js`

**Untested functions:**
- `hasAttr` - CRITICAL, used extensively
- `getAttr` - CRITICAL, used extensively
- `attrNames` - List keys
- `attrValues` - List values
- `catAttrs` - Extract attribute from list of attrsets
- `listToAttrs` - Convert list to attrset

**Before starting:**
1. Read https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-hasAttr (and similar for each)
2. Test nested attribute access in `nix repl`
3. Test missing key behavior

**Required coverage:** 40+ tests (5-7 per function)

### Task 0.4: String Operation Tests (3-4 hours)

**What remains:** Create `main/tests/builtins_strings_test.js`

**Untested functions:**
- `concatStringsSep` - CRITICAL, join with separator
- `split` - Split by regex
- `match` - Regex matching

**Before starting:**
1. Read https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-concatStringsSep
2. Test regex behavior in `nix repl`
3. Find examples of split/match usage

**Required coverage:** 30+ tests (5-10 per function)

### Task 0.5: Math & Comparison Tests (2-3 hours)

**What remains:** Create `main/tests/builtins_math_test.js`

**Untested functions:**
- `sub`, `mul` - Basic arithmetic (BigInt handling)
- `lessThan` - Comparison
- `ceil`, `floor` - Rounding

**Before starting:**
1. Read https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-sub
2. Test BigInt vs Float behavior in `nix repl`
3. Test edge cases (negative numbers, zero, overflow)

**Required coverage:** 25+ tests (5 per function)

### Task 0.6: Control Flow Tests (2-3 hours)

**What remains:** Create `main/tests/builtins_control_flow_test.js`

**Untested functions:**
- `throw` - Error throwing
- `abort` - Fatal errors
- `trace` - Debug printing
- `seq` - Force evaluation
- `deepSeq` - Deep force evaluation

**Before starting:**
1. Read https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-throw
2. Test error messages in `nix repl`
3. Understand lazy evaluation implications

**Required coverage:** 25+ tests (5 per function)

---

---

## PRIORITY 1: Derivation Edge Cases (2-4 hours)

**What remains:** Create `main/tests/derivation/002_advanced_tests.js`

**Untested scenarios:**
- Multiple outputs edge cases
- Complex env variable serialization
- Passthru attributes
- Meta attributes
- String context propagation

**Before starting:**
1. Read https://nix.dev/manual/nix/2.18/language/derivations.html
2. Test multiple outputs in `nix repl`
3. Examine real derivations in nixpkgs

**Test cases to implement:**

1. Multiple Outputs - Each output needs different store path
2. Complex Environment Variables - Lists → space-separated, attrsets → toString
3. Passthru Attributes - Should be accessible on result
4. Meta Attributes - Should be preserved
5. String Context - Should propagate through derivation

**Implementation steps:**
1. Research how Nix handles each scenario (nix repl + docs)
2. Write test for expected behavior
3. Verify implementation matches
4. Test edge cases

**Time estimate:** 2-4 hours total

---

## PRIORITY 2: Translator Edge Cases (1-2 days)

**What remains:** Test edge cases not covered by existing 87 tests

**Untested syntax patterns:**

### Task 2.1: Pattern Matching (4-6 hours)
**What remains:**
- Nested @ patterns: `{x, y} @ all @ another`
- Ellipsis with defaults: `{x ? 1, y ? 2, ...}`
- Mixed patterns

**Before starting:** Read Nix manual section on function arguments, test in nix repl

### Task 2.2: String Escapes (2-3 hours)
**What remains:**
- All escape sequences: `\n`, `\t`, `\r`, `\\`, `\"`, `\'`
- Unicode escapes
- Dollar escape: `\${not-interpolated}`

**Before starting:** Test each escape sequence in nix repl

### Task 2.3: Path Literals (2-3 hours)
**What remains:**
- Relative paths: `./file`, `../file`
- Absolute paths: `/absolute/path`
- Path interpolation edge cases
- `<nixpkgs>` edge cases (partially implemented)

**Before starting:** Research path resolution rules in Nix

### Task 2.4: Operator Precedence (1-2 hours)
**What remains:**
- Complex expressions: `a + b * c - d / e`
- Mixed operators with parens
- Has-attr with select: `x ? y.z`

**Before starting:** Review Nix operator precedence table

### Task 2.5: Multi-line Strings (1-2 hours)
**What remains:**
- Indentation stripping
- Mixed indentation
- Empty lines

**Before starting:** Test ''multi-line'' strings in nix repl

---

## PRIORITY 3: Expand nixpkgs.lib Testing (3-5 days)

**What remains:** Test 31 more nixpkgs.lib files (currently 10/41 tested)

**Untested high-value files:**
- `lists.nix` - List utilities (2-3 hours)
- `attrsets.nix` - Attrset utilities (2-3 hours)
- `options.nix` - NixOS options (3-4 hours)
- `modules.nix` - Module system (4-6 hours)
- `meta.nix` - Package metadata (2-3 hours)
- `debug.nix` - Debugging utilities (1-2 hours)

**Before starting each file:**
1. Read the .nix file to understand its structure
2. Identify key functions to test
3. Test functions in nix repl first
4. Add tests to `main/tests/nixpkgs_lib_files_test.js`

---

## PRIORITY 4: Optional Builtins (Optional, 1-3 weeks)

**What remains:** 3 optional builtins not in Nix 2.18 (only implement if needed)

### fetchMercurial (2-3 days)
**Not implemented.** Rarely used.

**If needed:**
1. **Read docs FIRST:** https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-fetchMercurial
2. Research Mercurial node modules: `https://esm.sh/mercurial` (may not exist)
3. Break down: Research hg → Clone repo → Hash computation → Store integration
4. Test with real Mercurial repos

### fetchClosure (5-7 days) - VERY COMPLEX
**Not implemented.** Experimental feature, complex.

**If needed:**
1. **Read docs FIRST:** https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-fetchClosure
2. Research binary cache protocol (cache.nixos.org)
3. Break down: NAR download → Signature verification → Store import → Closure resolution
4. May need npm modules via `https://esm.sh/` for signature verification
5. Test with real binary cache

### getFlake (5-7 days) - VERY COMPLEX
**Not implemented.** Experimental feature, large scope.

**If needed:**
1. **Read docs FIRST:** https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-getFlake
2. Study flake.lock format
3. Break down: Parse flake.nix → Resolve inputs → Fetch inputs → Evaluate outputs
4. Study real flake.nix files in nixpkgs
5. Test with simple flakes first

### fetchTree type='indirect' (3-4 days)
**Not implemented.** Flake registry lookups.

**If needed:**
1. **Read docs FIRST:** https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-fetchTree
2. Research flake registry format
3. Break down: Parse registry → Resolve indirection → Call fetchTree with resolved URL
4. Test with github:owner/repo syntax

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

## Required Reading WHILE Implementing

**ALWAYS follow this process for EVERY builtin/feature:**

1. **Read Nix documentation FIRST** (MANDATORY):
   - For `builtins.map`: https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-map
   - For `builtins.fetchClosure`: https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-fetchClosure
   - Search internet for "nix builtin FUNCTIONNAME" for additional docs

2. **Test in nix repl** (MANDATORY):
   - Verify expected behavior before writing tests
   - Test positive cases, negative cases, edge cases
   - Document behavior differences if any

3. **Search for real-world usage**:
   - Find examples in nixpkgs
   - Search GitHub for usage patterns
   - Understand common use cases

4. **Break down the task**:
   - No task is too big for 1-2 hour pieces
   - Start with simplest case
   - Add complexity incrementally

5. **Write tests**:
   - Know what success looks like before implementing
   - Test matches nix repl behavior exactly

---

## No Blockers Exist

All tasks can be started immediately. Break down large tasks into 1-2 hour pieces.

**MANDATORY WORK ORDER (DO NOT SKIP):**
1. **Runtime FIRST** - Test all builtins (Priority 0-1)
2. **Translator SECOND** - Test edge cases (Priority 2)
3. **nix-lib tests LAST** - Expand coverage (Priority 3)

**DO NOT work on translator until runtime testing is complete.**
**DO NOT work on nix-lib tests until translator testing is complete.**

**What remains to be done:**
- 70+ builtins need test coverage (74% untested)
- Derivation edge cases need tests
- Translator edge cases need tests
- 31 nixpkgs.lib files need tests

**Remember:** Focus on what is NOT done. Do not report accomplishments.
