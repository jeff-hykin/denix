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

### RUNTIME STATUS: 100% Feature Complete, 26% Tested

**All 97 Nix 2.18 builtins are implemented.** No implementation work needed.

**Only ~28/97 builtins have tests.** This is the ONLY remaining runtime work.

### Critical Untested Builtins (74% untested = 69 functions):

**Type Checking (9 untested):** isNull, isBool, isInt, isFloat, isPath, isString, isList, isAttrs, typeOf

**List Operations (12 untested):** map, filter, all, any, elem, elemAt, concatLists, concatMap, genList, sort, partition, groupBy

**Attrset Operations (8 untested):** hasAttr, getAttr, attrNames, attrValues, catAttrs, listToAttrs, zipAttrsWith, genericClosure

**String Operations (3 untested):** concatStringsSep, split, match

**Math Operations (5 untested):** sub, mul, lessThan, ceil, floor

**Control Flow (8 untested):** throw, abort, trace, traceVerbose, seq, deepSeq, break, addErrorContext

**Path/File Operations (8 untested):** baseNameOf, dirOf, pathExists, readFile, readDir, readFileType, findFile, toPath

**Hashing (2 untested):** hashFile, hashString

**Derivations (8 untested):** derivation, derivationStrict, placeholder, toFile, storePath, outputOf, parseDrvName, unsafeDiscardOutputDependency

**String Context (4 untested):** getContext, hasContext, appendContext, unsafeDiscardStringContext

**Bitwise (3 untested):** bitAnd, bitOr, bitXor

**Serialization (3 untested):** toXML, toPath, fromJSON

**Versioning (1 untested):** splitVersion

**Meta (2 untested):** unsafeGetAttrPos, getEnv

**Import/Eval (1 untested):** tryEval

**Fetch (2 untested/optional):** fetchMercurial (stubbed), getFlake (stubbed)

### Work Priority (in order):
1. **PRIORITY 0:** Test core builtins (3-5 days) - See below for detailed tasks
2. **PRIORITY 1:** Test derivation edge cases (2-4 hours)
3. **PRIORITY 2:** Test translator edge cases (1-2 days)
4. **PRIORITY 3:** Expand nixpkgs.lib testing (3-5 days)

**All code exists. Only testing remains.**

---

## PRIORITY 0: Test Core Builtins (3-5 days) ⚠️ CRITICAL

**Current Status:**
- 69/97 builtins completely untested (71%)
- Old test files exist but use wrong format: `builtins_list.js`, `builtins_attrs.js`, `builtins_eval_control.js`, `builtins_version.js`
- These files need conversion to Deno.test format OR deletion + rewrite

**What remains to be done:**
1. Convert OR delete old test files (30 min)
2. Create proper Deno test files for 69 untested builtins (3-5 days)
3. Increase coverage from 26% → 80%+ (test 52+ more builtins minimum)

**Testing workflow (MANDATORY FOR EVERY BUILTIN):**
1. **Read Nix docs FIRST**: https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-FUNCTIONNAME
2. **Test in `nix repl`**: Verify expected behavior (5+ test cases)
3. **Write Deno.test()**: Match Nix behavior exactly
4. **Test all cases**: Positive, negative, edge cases (min 5 per function)
5. **Search for examples**: Find real-world usage in nixpkgs

### Task 0.1: Type Checking Tests (4-6 hours)

**What remains:** Create `main/tests/builtins_types_test.js` with Deno.test format

**Untested functions (10 total):**
- `isNull` - Check if value is null
- `isBool` - Check if value is boolean
- `isInt` - Check if value is BigInt (Nix int → JS BigInt)
- `isFloat` - Check if value is number (Nix float → JS number)
- `isPath` - Check if value is Path instance
- `isString` - Check if value is string (or InterpolatedString)
- `isList` - Check if value is Array
- `isAttrs` - Check if value is plain object
- `isFunction` - Check if value is function (already tested in nixpkgs_trivial_test.js)
- `typeOf` - Return string name of type

**Before starting (MANDATORY):**
1. Read https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-isInt
2. Test EACH function in `nix repl`:
   ```nix
   nix-repl> builtins.isInt 42
   true
   nix-repl> builtins.isInt 3.14
   false
   nix-repl> builtins.typeOf 42
   "int"
   nix-repl> builtins.typeOf 3.14
   "float"
   ```
3. Document expected behavior for each function
4. Search nixpkgs for real-world usage examples

**Test structure example:**
```javascript
import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { builtins } from "../runtime.js"

Deno.test("isInt - positive cases", () => {
    assertEquals(builtins.isInt(42n), true)
    assertEquals(builtins.isInt(0n), true)
    assertEquals(builtins.isInt(-5n), true)
    assertEquals(builtins.isInt(-999999999999n), true)
})

Deno.test("isInt - negative cases", () => {
    assertEquals(builtins.isInt(3.14), false)
    assertEquals(builtins.isInt("42"), false)
    assertEquals(builtins.isInt(null), false)
    assertEquals(builtins.isInt([]), false)
    assertEquals(builtins.isInt({}), false)
})

Deno.test("typeOf - all types", () => {
    assertEquals(builtins.typeOf(null), "null")
    assertEquals(builtins.typeOf(true), "bool")
    assertEquals(builtins.typeOf(42n), "int")
    assertEquals(builtins.typeOf(3.14), "float")
    assertEquals(builtins.typeOf("hello"), "string")
    assertEquals(builtins.typeOf([]), "list")
    assertEquals(builtins.typeOf({}), "set")
    assertEquals(builtins.typeOf(()=>{}), "lambda")
})
```

**Required coverage:**
- 5 test cases per function MINIMUM
- 50 total test cases minimum
- Must cover: null, bool, int (BigInt), float (number), string, list (Array), set (object), lambda (function), path (Path)

**Time estimate:** 4-6 hours (30-45 min per function)

### Task 0.2: List Operation Tests (6-8 hours)

**What remains:** Delete or convert `main/tests/builtins_list.js`, then create `main/tests/builtins_list_operations_test.js`

**Old file status:** `builtins_list.js` exists but only tests `groupBy` (2 tests, wrong format)

**Untested functions (12 total):**
- `map` - **CRITICAL** - Map function over list: `map (x: x * 2) [1 2 3]` → `[2 4 6]`
- `filter` - **CRITICAL** - Filter list by predicate: `filter (x: x > 2) [1 2 3 4]` → `[3 4]`
- `elem` - Check membership: `elem 2 [1 2 3]` → `true`
- `elemAt` - Get element at index: `elemAt [1 2 3] 1` → `2`
- `concatLists` - Flatten lists: `concatLists [[1 2] [3 4]]` → `[1 2 3 4]`
- `concatMap` - Map then flatten: `concatMap (x: [x (x*2)]) [1 2]` → `[1 2 2 4]`
- `all` - All match predicate: `all (x: x > 0) [1 2 3]` → `true`
- `any` - Any match predicate: `any (x: x > 2) [1 2 3]` → `true`
- `genList` - Generate sequence: `genList (x: x * 2) 5` → `[0 2 4 6 8]`
- `sort` - Sort with comparator: `sort (a: b: a < b) [3 1 2]` → `[1 2 3]`
- `partition` - Split by predicate: `partition (x: x > 2) [1 2 3 4]` → `{ right = [3 4]; wrong = [1 2]; }`
- `groupBy` - Group by key function: `groupBy (x: x.type) [{type="a"; v=1;} {type="b"; v=2;}]` → `{a=[{...}]; b=[{...}];}`

**Before starting (MANDATORY):**
1. Read https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-map
2. Test EACH function in `nix repl`:
   ```nix
   nix-repl> builtins.map (x: x * 2) [1 2 3]
   [ 2 4 6 ]
   nix-repl> builtins.filter (x: x > 2) [1 2 3 4]
   [ 3 4 ]
   nix-repl> builtins.partition (x: x > 2) [1 2 3 4]
   { right = [ 3 4 ]; wrong = [ 1 2 ]; }
   ```
3. Test currying behavior (Nix functions are curried!)
4. Test edge cases: empty lists, single element, null values
5. Search nixpkgs for real-world usage

**Test structure example:**
```javascript
import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { builtins } from "../runtime.js"

Deno.test("map - basic transformation", () => {
    const double = (x) => x * 2n
    const result = builtins.map(double)([1n, 2n, 3n])
    assertEquals(result, [2n, 4n, 6n])
})

Deno.test("map - empty list", () => {
    const double = (x) => x * 2n
    const result = builtins.map(double)([])
    assertEquals(result, [])
})

Deno.test("filter - basic predicate", () => {
    const greaterThan2 = (x) => x > 2n
    const result = builtins.filter(greaterThan2)([1n, 2n, 3n, 4n])
    assertEquals(result, [3n, 4n])
})

Deno.test("partition - splits by predicate", () => {
    const greaterThan2 = (x) => x > 2n
    const result = builtins.partition(greaterThan2)([1n, 2n, 3n, 4n])
    assertEquals(result.right, [3n, 4n])
    assertEquals(result.wrong, [1n, 2n])
})
```

**Required coverage:**
- 5-8 test cases per function
- 70+ total test cases minimum
- Must test: empty lists, single element, multiple elements, currying, edge cases
- **CRITICAL:** Test map and filter thoroughly (10+ cases each)

**Time estimate:** 6-8 hours (30-45 min per function)

### Task 0.3: Attrset Operation Tests (4-6 hours)

**What remains:** Delete or convert `main/tests/builtins_attrs.js`, then create `main/tests/builtins_attrsets_test.js`

**Old file status:** `builtins_attrs.js` exists but only tests `mapAttrs` (already tested elsewhere, wrong format)

**Untested functions (8 total):**
- `hasAttr` - **CRITICAL** - Check if attribute exists: `hasAttr "x" {x=1; y=2;}` → `true`
- `getAttr` - **CRITICAL** - Get attribute value: `getAttr "x" {x=1; y=2;}` → `1`
- `attrNames` - List keys: `attrNames {x=1; y=2;}` → `["x" "y"]` (sorted!)
- `attrValues` - List values: `attrValues {x=1; y=2;}` → `[1 2]` (sorted by key!)
- `catAttrs` - Extract attribute from list: `catAttrs "x" [{x=1;} {x=2; y=3;} {y=4;}]` → `[1 2]`
- `listToAttrs` - Convert list to set: `listToAttrs [{name="x"; value=1;}]` → `{x=1;}`
- `zipAttrsWith` - Merge attrsets with function: `zipAttrsWith (name: values: ...) [{x=1;} {x=2;}]`
- `genericClosure` - Compute transitive closure (COMPLEX)

**Before starting (MANDATORY):**
1. Read https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-hasAttr
2. Test EACH function in `nix repl`:
   ```nix
   nix-repl> builtins.hasAttr "x" {x=1; y=2;}
   true
   nix-repl> builtins.hasAttr "z" {x=1; y=2;}
   false
   nix-repl> builtins.getAttr "x" {x=1; y=2;}
   1
   nix-repl> builtins.attrNames {z=3; a=1; b=2;}
   [ "a" "b" "z" ]  # SORTED alphabetically!
   nix-repl> builtins.catAttrs "x" [{x=1; y=2;} {x=3;} {y=4;}]
   [ 1 3 ]  # Skips items without "x"
   ```
3. Test nested attributes, missing keys, null values
4. **IMPORTANT:** attrNames and attrValues return SORTED results
5. Search nixpkgs for real-world usage

**Test structure example:**
```javascript
import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { builtins } from "../runtime.js"

Deno.test("hasAttr - attribute exists", () => {
    assertEquals(builtins.hasAttr("x")({x: 1n, y: 2n}), true)
})

Deno.test("hasAttr - attribute missing", () => {
    assertEquals(builtins.hasAttr("z")({x: 1n, y: 2n}), false)
})

Deno.test("getAttr - get value", () => {
    assertEquals(builtins.getAttr("x")({x: 1n, y: 2n}), 1n)
})

Deno.test("attrNames - returns sorted keys", () => {
    // Keys MUST be sorted alphabetically
    const result = builtins.attrNames({z: 3n, a: 1n, b: 2n})
    assertEquals(result, ["a", "b", "z"])
})

Deno.test("attrValues - returns values sorted by key", () => {
    // Values returned in order of sorted keys
    const result = builtins.attrValues({z: 3n, a: 1n, b: 2n})
    assertEquals(result, [1n, 2n, 3n])  // a, b, z order
})

Deno.test("catAttrs - extracts attribute from list", () => {
    const list = [{x: 1n, y: 2n}, {x: 3n}, {y: 4n}]
    const result = builtins.catAttrs("x")(list)
    assertEquals(result, [1n, 3n])  // Skips third item (no x)
})

Deno.test("listToAttrs - converts list to set", () => {
    const list = [{name: "x", value: 1n}, {name: "y", value: 2n}]
    const result = builtins.listToAttrs(list)
    assertEquals(result, {x: 1n, y: 2n})
})
```

**Required coverage:**
- 5-7 test cases per function
- 50+ total test cases minimum
- Must test: empty sets, missing keys, sorted order (attrNames/attrValues), currying
- **CRITICAL:** Test hasAttr and getAttr thoroughly (10+ cases each)
- **IMPORTANT:** Verify attrNames and attrValues return SORTED results

**Time estimate:** 4-6 hours (30-45 min per function)

### Task 0.4: String Operation Tests (3-4 hours)

**What remains:** Create `main/tests/builtins_strings_test.js`

**Untested functions (3 total):**
- `concatStringsSep` - **CRITICAL** - Join with separator: `concatStringsSep ", " ["a" "b" "c"]` → `"a, b, c"`
- `split` - Split by regex: `split "([.])" "a.b.c"` → `["a" ["."] "b" ["."] "c"]` (captures in sublists!)
- `match` - Regex matching: `match "(.*)@(.*)" "user@host"` → `["user" "host"]` or `null`

**Before starting (MANDATORY):**
1. Read https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-concatStringsSep
2. Test EACH function in `nix repl`:
   ```nix
   nix-repl> builtins.concatStringsSep ", " ["a" "b" "c"]
   "a, b, c"
   nix-repl> builtins.split "([.])" "a.b.c"
   [ "a" [ "." ] "b" [ "." ] "c" ]  # Captures in sublists!
   nix-repl> builtins.match "(.*)@(.*)" "user@host"
   [ "user" "host" ]
   nix-repl> builtins.match "(.*)@(.*)" "no-at-sign"
   null  # No match returns null
   ```
3. **IMPORTANT:** split returns captures as SUBLISTS, not strings
4. Test regex edge cases: empty strings, no matches, multiple captures
5. Search nixpkgs for real-world usage (especially split/match)

**Test structure example:**
```javascript
import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { builtins } from "../runtime.js"

Deno.test("concatStringsSep - basic join", () => {
    const result = builtins.concatStringsSep(", ")(["a", "b", "c"])
    assertEquals(result, "a, b, c")
})

Deno.test("concatStringsSep - empty separator", () => {
    const result = builtins.concatStringsSep("")(["a", "b", "c"])
    assertEquals(result, "abc")
})

Deno.test("split - with captures", () => {
    // Captures returned as sublists!
    const result = builtins.split("([.])")("a.b.c")
    assertEquals(result, ["a", ["."], "b", ["."], "c"])
})

Deno.test("match - successful match", () => {
    const result = builtins.match("(.*)@(.*)")("user@host")
    assertEquals(result, ["user", "host"])
})

Deno.test("match - no match returns null", () => {
    const result = builtins.match("(.*)@(.*)")("no-at-sign")
    assertEquals(result, null)
})
```

**Required coverage:**
- 8-10 test cases per function
- 30+ total test cases minimum
- Must test: empty strings, empty separators, regex captures, no matches, currying
- **CRITICAL:** Test split capture behavior (sublists!) and match null returns

**Time estimate:** 3-4 hours (1 hour per function)

### Task 0.5: Math & Comparison Tests (2-3 hours)

**What remains:** Create `main/tests/builtins_math_test.js`

**Untested functions (5 total):**
- `sub` - Subtraction: `sub 5 3` → `2`
- `mul` - Multiplication: `mul 3 4` → `12`
- `lessThan` - Comparison: `lessThan 3 5` → `true`
- `ceil` - Ceiling: `ceil 3.7` → `4`
- `floor` - Floor: `floor 3.7` → `3`

**Before starting (MANDATORY):**
1. Read https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-sub
2. Test EACH function in `nix repl`:
   ```nix
   nix-repl> builtins.sub 5 3
   2
   nix-repl> builtins.mul 3 4
   12
   nix-repl> builtins.lessThan 3 5
   true
   nix-repl> builtins.ceil 3.7
   4
   nix-repl> builtins.floor 3.7
   3
   nix-repl> builtins.sub 3 5
   -2  # Negative results OK
   ```
3. **IMPORTANT:** sub/mul work with BOTH ints (BigInt) and floats (number)
4. Test BigInt arithmetic: `sub 999999999999 1` should work
5. Test float arithmetic: `ceil 3.14` → `4`
6. Test edge cases: negative numbers, zero, mixed int/float

**Test structure example:**
```javascript
import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { builtins } from "../runtime.js"

Deno.test("sub - integer subtraction", () => {
    assertEquals(builtins.sub(5n)(3n), 2n)
})

Deno.test("sub - negative result", () => {
    assertEquals(builtins.sub(3n)(5n), -2n)
})

Deno.test("mul - integer multiplication", () => {
    assertEquals(builtins.mul(3n)(4n), 12n)
})

Deno.test("mul - with zero", () => {
    assertEquals(builtins.mul(5n)(0n), 0n)
})

Deno.test("lessThan - true case", () => {
    assertEquals(builtins.lessThan(3n)(5n), true)
})

Deno.test("lessThan - false case", () => {
    assertEquals(builtins.lessThan(5n)(3n), false)
})

Deno.test("ceil - rounds up", () => {
    assertEquals(builtins.ceil(3.7), 4)
})

Deno.test("floor - rounds down", () => {
    assertEquals(builtins.floor(3.7), 3)
})
```

**Required coverage:**
- 5 test cases per function minimum
- 30+ total test cases minimum
- Must test: BigInt (int), number (float), negative numbers, zero, currying
- Test mixed int/float if Nix supports it

**Time estimate:** 2-3 hours (30 min per function)

### Task 0.6: Control Flow Tests (2-3 hours)

**What remains:** Delete or convert `main/tests/builtins_eval_control.js`, then create `main/tests/builtins_control_flow_test.js`

**Old file status:** `builtins_eval_control.js` exists but only tests `trace` and `throw` (2 tests, wrong format)

**Untested functions (8 total):**
- `throw` - **CRITICAL** - Throw error: `throw "error message"` → throws error
- `abort` - Fatal error: `abort "fatal"` → throws error (same as throw?)
- `trace` - **CRITICAL** - Debug print: `trace "debug" value` → prints to stderr, returns value
- `traceVerbose` - Verbose trace (only if verbose mode enabled)
- `seq` - Force evaluation: `seq x y` → evaluates x, returns y
- `deepSeq` - Deep force: `deepSeq x y` → deeply evaluates x, returns y
- `break` - Debugger breakpoint (may not be in Nix 2.18)
- `addErrorContext` - Add context to errors

**Before starting (MANDATORY):**
1. Read https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-throw
2. Test EACH function in `nix repl`:
   ```nix
   nix-repl> builtins.throw "test error"
   error: test error
   nix-repl> builtins.trace "debug message" 42
   trace: debug message
   42
   nix-repl> builtins.seq null "value"
   "value"  # Returns second arg after evaluating first
   ```
3. **IMPORTANT:** trace prints to stderr but RETURNS the value
4. **IMPORTANT:** seq/deepSeq force evaluation (hard to test in JS - different lazy eval)
5. Verify which functions exist in Nix 2.18 (break may not exist)
6. Search nixpkgs for real-world usage

**Test structure example:**
```javascript
import { assertEquals, assertThrows } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { builtins } from "../runtime.js"

Deno.test("throw - throws error with message", () => {
    assertThrows(
        () => builtins.throw("test error"),
        Error,
        "test error"
    )
})

Deno.test("abort - throws error with message", () => {
    assertThrows(
        () => builtins.abort("fatal error"),
        Error,
        "fatal error"
    )
})

Deno.test("trace - returns value", () => {
    // trace prints to stderr but returns the value
    const result = builtins.trace("debug message")(42n)
    assertEquals(result, 42n)
})

Deno.test("seq - returns second argument", () => {
    // seq evaluates first arg, returns second
    const result = builtins.seq(null)("value")
    assertEquals(result, "value")
})

Deno.test("deepSeq - returns second argument", () => {
    // deepSeq deeply evaluates first arg, returns second
    const result = builtins.deepSeq({a: 1n, b: 2n})("value")
    assertEquals(result, "value")
})
```

**Required coverage:**
- 5 test cases per function minimum
- 35+ total test cases minimum
- Must test: error messages, trace output (stderr), seq/deepSeq behavior, currying
- **CRITICAL:** Test throw and trace thoroughly (10+ cases each)
- **NOTE:** seq/deepSeq behavior may differ from Nix (JS eager evaluation)

**Time estimate:** 2-3 hours (20-30 min per function)

### Task 0.7: Path/File Operation Tests (4-6 hours) - LOWER PRIORITY

**What remains:** Create `main/tests/builtins_path_ops_test.js`

**Untested functions (8 total):**
- `baseNameOf` - Get filename: `baseNameOf "/path/to/file.txt"` → `"file.txt"`
- `dirOf` - Get directory: `dirOf "/path/to/file.txt"` → `"/path/to"`
- `pathExists` - Check if path exists: `pathExists ./file.nix` → `true/false`
- `readFile` - Read file content: `readFile ./file.txt` → `"content"`
- `readDir` - List directory: `readDir ./dir` → `{file1="regular"; dir1="directory";}`
- `readFileType` - Get file type: `readFileType ./file` → `"regular"/"directory"/"symlink"/"unknown"`
- `findFile` - Search in NIX_PATH: `findFile <nixpkgs> "lib/trivial.nix"`
- `toPath` - Convert to path: `toPath "/absolute/path"` → path type

**Time estimate:** 4-6 hours

### Task 0.8: Additional Tests (6-10 hours) - OPTIONAL

**Hashing (2 functions):** hashFile, hashString
**Derivations (8 functions):** derivation, derivationStrict, placeholder, toFile, storePath, outputOf, parseDrvName, unsafeDiscardOutputDependency
**String Context (4 functions):** getContext, hasContext, appendContext, unsafeDiscardStringContext
**Bitwise (3 functions):** bitAnd, bitOr, bitXor
**Serialization (3 functions):** toXML, toPath, fromJSON
**Versioning (1 function):** splitVersion
**Meta (2 functions):** unsafeGetAttrPos, getEnv
**Import/Eval (1 function):** tryEval

**Time estimate:** 6-10 hours (optional, lower priority)

---

## PRIORITY 0 SUMMARY

**Total time estimate:** 22-32 hours for tasks 0.1-0.6 (CRITICAL)
**Additional time:** 10-16 hours for tasks 0.7-0.8 (OPTIONAL)

**Recommended order:**
1. Task 0.1: Type Checking (4-6 hours) - FOUNDATION
2. Task 0.2: List Operations (6-8 hours) - CRITICAL (map, filter)
3. Task 0.3: Attrset Operations (4-6 hours) - CRITICAL (hasAttr, getAttr)
4. Task 0.4: String Operations (3-4 hours) - HIGH PRIORITY
5. Task 0.5: Math & Comparison (2-3 hours) - MEDIUM PRIORITY
6. Task 0.6: Control Flow (2-3 hours) - HIGH PRIORITY (throw, trace)
7. Task 0.7: Path/File Ops (4-6 hours) - LOWER PRIORITY
8. Task 0.8: Additional Tests (6-10 hours) - OPTIONAL

**After completing tasks 0.1-0.6:** Test coverage will increase from 26% → ~65%
**After completing all tasks:** Test coverage will reach 80%+

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

---

## FINAL WORK SUMMARY - WHAT REMAINS TO BE DONE

### Runtime Testing (PRIORITY 0) - 22-32 hours critical work
- **69/97 builtins untested** (71% of runtime has NO TESTS)
- Create 6 new test files with 200+ test cases
- Focus on: type checking, list ops (map/filter), attrset ops (hasAttr/getAttr), strings, math, control flow
- **Goal:** Increase coverage from 26% → 65%+ (test 40+ more builtins)

### Derivation Testing (PRIORITY 1) - 2-4 hours
- Test multiple outputs, complex env vars, passthru/meta attrs, string context
- Create `main/tests/derivation/002_advanced_tests.js`

### Translator Testing (PRIORITY 2) - 1-2 days
- Test pattern matching edge cases (nested @, ellipsis)
- Test string escapes, path literals, operator precedence
- Test multi-line strings, URI literals

### nixpkgs.lib Testing (PRIORITY 3) - 3-5 days
- Test 31 more files (currently 10/41 tested)
- Focus on: lists.nix, attrsets.nix, options.nix, modules.nix
- **Goal:** 50%+ coverage (20+/41 files)

### Optional Builtins (PRIORITY 4) - 1-3 weeks (OPTIONAL)
- fetchMercurial (2-3 days)
- fetchClosure (5-7 days, VERY COMPLEX)
- getFlake (5-7 days, VERY COMPLEX)
- Only implement if needed for specific use cases

---

## NEXT IMMEDIATE STEP

**Start with Task 0.1: Type Checking Tests (4-6 hours)**

1. Create `main/tests/builtins_types_test.js`
2. Test 10 functions: isNull, isBool, isInt, isFloat, isPath, isString, isList, isAttrs, isFunction, typeOf
3. Write 50+ test cases total
4. Follow the detailed instructions in Task 0.1 above

**This is the foundation for all other runtime tests.**
