# Denix Development Priorities

## CRITICAL RULES - READ FIRST

**Your job is to focus on what is NOT implemented and NOT working. Only report what remains to be done. Do not report what you accomplished. You are a senior level developer, there is no such thing as a blocker. Break down large tasks into smaller tasks.**

**WORK ORDER (MUST FOLLOW STRICTLY):**
1. **Runtime builtins FIRST** - 57 untested builtins remaining (59% of runtime needs testing)
2. **Translator edge cases SECOND** - Only after runtime reaches 80%+ test coverage
3. **nixpkgs.lib tests THIRD** - Only after translator is fully validated

**DO NOT work on translator or nixpkgs.lib until runtime reaches 80% test coverage.**

## IMPLEMENTATION METHODOLOGY

**Before implementing ANY builtin or feature:**
1. **Read Nix 2.18 official docs**: https://nix.dev/manual/nix/2.18/language/builtins
2. **Search for additional documentation**: Use noogle.dev, search for blog posts, examples
3. **Test in nix repl**: Try all edge cases - nulls, empty lists, type errors, etc.
4. **Find real-world examples**: Search nixpkgs for actual usage patterns
5. **Implement based on documented behavior** - NOT assumptions

**External dependencies:**
- You CAN use npm modules via https://esm.sh/NPM_MODULE_NAME
- WARNING: esm.sh is unreliable, have fallback plan
- Prefer Deno standard library when possible

**When stuck:**
- Break large tasks into smaller subtasks
- Research first, implement second
- No such thing as a blocker - find alternatives

## Current State (Session 33 Verified)

**Runtime Status:**
- ✅ ALL 97 Nix 2.18 builtins implemented (100% feature complete)
- ✅ ALL known bugs fixed (Session 32's 3 bugs already resolved)
- ✅ 40/97 builtins tested (41% coverage)
- ⚠️ 57/97 builtins untested (59% lacking validation)

**What's Working:**
- All critical infrastructure (imports, derivations, fetchers)
- All 240+ existing tests passing
- Translator 100% (87/87 tests passing)

**What Needs Work:**
- Comprehensive testing of 57 untested builtins
- Target: 80%+ coverage (37 more builtins = 77/97 total)
- Estimated: 18-23 hours to reach 80% coverage

## IMMEDIATE NEXT STEP

**Start Task 1: Type Checking Tests (3-4 hours)**

Create `main/tests/builtins_types_test.js` to test 9 type functions:

**Process:**
1. Read Nix docs: https://nix.dev/manual/nix/2.18/language/builtins#builtins-isNull
2. Test each in nix repl to understand behavior:
   ```bash
   nix-repl> builtins.isNull null
   true
   nix-repl> builtins.isNull 123
   false
   nix-repl> builtins.isAttrs {}
   true
   nix-repl> builtins.typeOf 42
   "int"
   ```
3. Write comprehensive tests (see Test File Template below)
4. Run: `./test.sh builtins_types`
5. If bugs found: fix in runtime.js, re-test
6. Move to Task 2 when all 9 functions passing

## Testing Process (MANDATORY STEPS)

**For EACH untested builtin:**
1. **Read Nix 2.18 docs**: https://nix.dev/manual/nix/2.18/language/builtins#builtins-FUNCTION_NAME
2. **Test in nix repl**: Try edge cases (null, empty, wrong types, etc.)
3. **Search noogle.dev**: Find examples and additional documentation
4. **Create/update test file**: `main/tests/builtins_CATEGORY_test.js`
5. **Write 5-10 tests minimum**: Normal cases, edge cases, error cases
6. **Run tests**: `./test.sh builtins_CATEGORY`
7. **Fix bugs found**: Untested code WILL have bugs
8. **Verify against nix repl**: Outputs must match exactly

## Priority Summary - Focus on Testing Runtime

**Current Testing Coverage:** 40/97 builtins tested (41%)
**Untested Builtins:** 57 remaining (59% of runtime lacks validation)
**Target for Production:** 80%+ coverage (77/97 = 37 more builtins needed)
**Estimated Time to 80%:** 22-31 hours (Tasks 1-6 below)

### Quick Task Overview

| Task | Priority | Builtins | Hours | Coverage After |
|------|----------|----------|-------|----------------|
| 1. Type Checking | CRITICAL | 9 | 3-4 | 49/97 (51%) |
| 2. List Operations | CRITICAL | 12 | 6-8 | 61/97 (63%) |
| 3. Attrset Operations | CRITICAL | 8 | 4-6 | 69/97 (71%) |
| 4. String Operations | HIGH | 3 | 3-4 | 72/97 (74%) |
| 5. Math & Comparison | MEDIUM | 5 | 2-3 | 77/97 (79%) |
| 6. Path/File Operations | MEDIUM | 8 | 4-6 | 85/97 (88%) |
| **Total (Tasks 1-6)** | | **45** | **22-31** | **80%+** ✓ |

**After Task 6, you'll reach 80%+ coverage (production-ready threshold).**

Additional tasks (7-10) add 12 more builtins for 90%+ coverage (see below).

## Untested Builtins - WHAT NEEDS TESTING

**57 untested builtins remaining** (59% of runtime NOT validated)

### Task 1: Type Checking (9 untested) - 3-4 hours
**Priority:** CRITICAL - Used everywhere, fundamental to Nix
**Status:** ⚠️ NOT TESTED (0% coverage in this category)

**Functions to test:**
- `isNull` - Check if value is null
- `isBool` - Check if value is boolean
- `isInt` - Check if value is BigInt (Nix integer)
- `isFloat` - Check if value is JavaScript number (Nix float)
- `isString` - Check if value is string or InterpolatedString
- `isList` - Check if value is Array
- `isPath` - Check if value is Path instance
- `isAttrs` - Check if value is plain object (attribute set)
- `typeOf` - Return type as string ("int", "bool", "string", etc.)

**Test file to create:** `main/tests/builtins_types_test.js`
**Tests per function:** 5-8 (normal cases + edge cases)
**Edge cases to test:** null, undefined, nested objects, wrong types
**Documentation:** https://nix.dev/manual/nix/2.18/language/builtins#builtins-isNull

**Expected behavior (test in nix repl first):**
```nix
nix-repl> builtins.isNull null
true
nix-repl> builtins.isNull 123
false
nix-repl> builtins.isAttrs {}
true
nix-repl> builtins.isAttrs null
false
nix-repl> builtins.typeOf 42
"int"
nix-repl> builtins.typeOf "hello"
"string"
```

**Run tests:** `./test.sh builtins_types` or `deno test --allow-all main/tests/builtins_types_test.js`

### Task 2: List Operations (12 untested) - 6-8 hours
**Priority:** CRITICAL - Most used functions in Nix, core functional programming
**Status:** ⚠️ PARTIALLY TESTED (head/tail tested, 10 remain untested)

**Functions to test (HIGHEST PRIORITY):**
- `map` - **MOST USED IN NIX!** Apply function to each list element (uses lazyMap proxy)
- `filter` - **2ND MOST USED!** Keep elements matching predicate
- `all` - Check if ALL elements match predicate
- `any` - Check if ANY elements match predicate
- `elem` - Check if value exists in list
- `elemAt` - Get element at index (already has bounds checking)
- `partition` - Split list into {right, wrong} based on predicate (lazy eval!)
- `sort` - Sort list with custom comparator
- `genList` - Generate list from index function
- `concatLists` - Flatten list of lists
- `concatMap` - Map then flatten (f => list => list.flatMap)
- `groupBy` - Group list elements by key function

**Test file to create:** `main/tests/builtins_lists_test.js`
**Tests per function:** 8-10 (normal + edge cases)
**Critical edge cases:**
- Empty lists: `[]`
- Single element: `[1]`
- Nested lists: `[[1,2],[3,4]]`
- Complex predicates: `x: x > 10 && x < 20`
- Large lists (performance): `genList (x: x) 1000`
**Documentation:** https://nix.dev/manual/nix/2.18/language/builtins#builtins-map

**Expected behavior (test in nix repl):**
```nix
nix-repl> builtins.map (x: x * 2) [1 2 3]
[ 2 4 6 ]
nix-repl> builtins.filter (x: x > 2) [1 2 3 4]
[ 3 4 ]
nix-repl> builtins.all (x: x > 0) [1 2 3]
true
nix-repl> builtins.partition (x: x > 2) [1 2 3 4]
{ right = [ 3 4 ]; wrong = [ 1 2 ]; }
```

**Special attention:**
- `map` uses lazyMap proxy - test that results are accessible by index
- `partition` is lazy - test that accessing .right/.wrong computes only once

**Run tests:** `./test.sh builtins_lists` or `deno test --allow-all main/tests/builtins_lists_test.js`

### Task 3: Attrset Operations (8 untested) - 4-6 hours
**Priority:** CRITICAL - Attribute sets are THE core data structure in Nix
**Status:** ⚠️ PARTIALLY TESTED (mapAttrs/removeAttrs tested, 8 remain untested)

**Functions to test (HIGHEST PRIORITY):**
- `hasAttr` - **CRITICAL!** Check if attribute exists in set
- `getAttr` - **CRITICAL!** Get attribute value (throws if missing)
- `attrNames` - Get sorted list of attribute names (keys)
- `attrValues` - Get list of attribute values
- `catAttrs` - Collect specific attribute from list of attrsets
- `listToAttrs` - Convert list of {name,value} to attrset
- `zipAttrsWith` - Merge list of attrsets with custom function
- `genericClosure` - Compute transitive closure (complex, graph traversal)

**Test file to create:** `main/tests/builtins_attrs_test.js`
**Tests per function:** 6-8 (normal + edge cases)
**Critical edge cases:**
- Empty attrsets: `{}`
- Missing keys: `getAttr "missing" {}` (should throw)
- Nested attrsets: `{a.b.c = 1;}`
- Keys with special chars: `{"foo-bar" = 1;}`
- Duplicate keys in listToAttrs (first wins)
**Documentation:** https://nix.dev/manual/nix/2.18/language/builtins#builtins-hasAttr

**Expected behavior (test in nix repl):**
```nix
nix-repl> builtins.hasAttr "foo" {foo=1;}
true
nix-repl> builtins.getAttr "foo" {foo=1;}
1
nix-repl> builtins.attrNames {z=1; a=2;}
[ "a" "z" ]
nix-repl> builtins.catAttrs "name" [{name="a";} {name="b";} {}]
[ "a" "b" ]
nix-repl> builtins.listToAttrs [{name="a"; value=1;} {name="b"; value=2;}]
{ a = 1; b = 2; }
```

**Special attention:**
- `genericClosure` is complex (graph traversal) - needs extensive testing
- `attrNames` must return SORTED list (alphabetical order)
- `getAttr` must throw NixError with proper message if key missing

**Run tests:** `./test.sh builtins_attrs` or `deno test --allow-all main/tests/builtins_attrs_test.js`

### Task 4: String Operations (3 untested) - 3-4 hours
**Priority:** HIGH - String manipulation is very common in Nix code
**Status:** ⚠️ PARTIALLY TESTED (replaceStrings/substring tested, 3 remain)

**Functions to test:**
- `concatStringsSep` - Join strings with separator
- `split` - Split string by regex into list of [string, [groups], string, ...]
- `match` - Match entire string against regex, return capture groups or null

**Test file to create:** `main/tests/builtins_strings_test.js`
**Tests per function:** 6-8 (normal + edge cases)
**Critical edge cases:**
- Empty strings: `""`
- Unicode characters: `"hello 世界"`
- Regex special chars: `"foo.bar"` (need escaping)
- Multiple capture groups: `"a(b)(c)"`
- No match: should return null
**Documentation:** https://nix.dev/manual/nix/2.18/language/builtins#builtins-split

**Expected behavior (test in nix repl):**
```nix
nix-repl> builtins.concatStringsSep "/" ["usr" "local" "bin"]
"usr/local/bin"
nix-repl> builtins.split "," "a,b,c"
[ "a" [ ] "b" [ ] "c" ]
nix-repl> builtins.match "a(b)(c)" "abc"
[ "b" "c" ]
nix-repl> builtins.match "abc" "xyz"
null
```

**Special attention:**
- Nix uses POSIX regex (converted to JS regex in runtime.js)
- `split` returns alternating list of strings and capture group arrays
- `match` must match ENTIRE string (anchored with ^$)

**Run tests:** `./test.sh builtins_strings` or `deno test --allow-all main/tests/builtins_strings_test.js`

### Task 5: Math & Comparison (5 untested) - 2-3 hours
**Priority:** MEDIUM - Basic operations but less commonly used than above
**Status:** ⚠️ PARTIALLY TESTED (add/div tested, 5 remain untested)

**Functions to test:**
- `sub` - Subtraction (handles BigInt and float)
- `mul` - Multiplication (handles BigInt and float)
- `lessThan` - Less-than comparison (works with any comparable type)
- `ceil` - Round up to integer (float → BigInt)
- `floor` - Round down to integer (float → BigInt)

**Test file to create:** `main/tests/builtins_math_test.js`
**Tests per function:** 4-6 (BigInt, float, mixed, edge cases)
**Critical edge cases:**
- BigInt + BigInt: `42n - 10n` → `32n`
- Float + Float: `4.5 * 2.0` → `9.0`
- Mixed types (should convert to float)
- Division by zero (if applicable)
- Negative numbers
**Documentation:** https://nix.dev/manual/nix/2.18/language/builtins#builtins-sub

**Expected behavior (test in nix repl):**
```nix
nix-repl> builtins.sub 10 3
7
nix-repl> builtins.mul 6 7
42
nix-repl> builtins.lessThan 5 10
true
nix-repl> builtins.ceil 3.2
4
nix-repl> builtins.floor 3.8
3
```

**Special attention:**
- Nix integers are JavaScript BigInt (use `42n` syntax)
- Mixed int/float operations convert to float
- ceil/floor return BigInt (Nix integers), not float

**Run tests:** `./test.sh builtins_math` or `deno test --allow-all main/tests/builtins_math_test.js`

### Task 6: Path/File Operations (8 untested) - 4-6 hours
**Priority:** MEDIUM-HIGH - Build scripts and derivations use these
**Status:** ⚠️ NOT TESTED (0% coverage, path builtin tested separately)

**Functions to test:**
- `baseNameOf` - Get filename from path (`"/foo/bar.txt"` → `"bar.txt"`)
- `dirOf` - Get directory from path (`"/foo/bar.txt"` → `"/foo"`)
- `pathExists` - Check if path exists on filesystem
- `readFile` - Read file contents as string
- `readDir` - List directory entries
- `readFileType` - Get file type ("regular", "directory", "symlink", etc.)
- `findFile` - Search for file in search path list
- `toPath` - Convert string to path (deprecated but still exists)

**Test file to create:** `main/tests/builtins_path_ops_test.js`
**Tests per function:** 5-7 (absolute/relative paths, missing files, edge cases)
**Critical edge cases:**
- Absolute paths: `/usr/bin/foo`
- Relative paths: `./foo/bar`
- Missing files (should handle gracefully or throw)
- Symlinks (how are they handled?)
- Special characters in paths
**Documentation:** https://nix.dev/manual/nix/2.18/language/builtins#builtins-baseNameOf

**Expected behavior (test in nix repl):**
```nix
nix-repl> builtins.baseNameOf "/usr/local/bin/nix"
"nix"
nix-repl> builtins.dirOf "/usr/local/bin/nix"
"/usr/local/bin"
nix-repl> builtins.pathExists ./README.md
true
nix-repl> builtins.readFile ./test.txt
"contents of file"
```

**Special attention:**
- Create test fixtures (temp files/dirs) for these tests
- Clean up temp files after tests
- Test both success and error cases
- `findFile` uses NIX_PATH search path

**Run tests:** `./test.sh builtins_path_ops` or `deno test --allow-all main/tests/builtins_path_ops_test.js`

### Task 7: Control Flow (8 untested) - 2-3 hours
**Priority:** MEDIUM - Debugging and error handling
**Status:** ⚠️ NOT TESTED (0% coverage)

**Functions to test:**
- `throw` - Throw error with message
- `abort` - Abort evaluation with message
- `seq` - Force evaluation of first arg, return second
- `deepSeq` - Force deep evaluation of first arg, return second
- `trace` - Print debug message, return value
- `traceVerbose` - Print debug message if verbose enabled
- `break` - Breakpoint for debugging (when supported)
- `addErrorContext` - Add context to error messages

**Test file to create:** `main/tests/builtins_control_test.js`
**Tests per function:** 3-5 (normal + error cases)
**Critical tests:**
- `throw` and `abort` must actually throw errors
- `trace` must print to stderr/stdout
- `seq` must force evaluation (test with lazy values)
- Error messages must be correct format

**Expected behavior:**
```nix
nix-repl> builtins.throw "oops"
error: oops
nix-repl> builtins.trace "debug" 42
trace: debug
42
nix-repl> builtins.seq (1/0) "never"
error: division by zero
```

**Documentation:** https://nix.dev/manual/nix/2.18/language/builtins#builtins-throw
**Run tests:** `./test.sh builtins_control`

### Task 8: Bitwise Operations (3 untested) - 1-2 hours
**Priority:** LOW - Rarely used in typical Nix code
**Status:** ⚠️ NOT TESTED (0% coverage)

**Functions to test:**
- `bitAnd` - Bitwise AND
- `bitOr` - Bitwise OR
- `bitXor` - Bitwise XOR

**Test file to create:** `main/tests/builtins_bitwise_test.js`
**Tests per function:** 4-6 (various bit patterns)
**Critical tests:**
- Simple cases: `bitAnd 3 5` → `1` (0b011 & 0b101 = 0b001)
- All zeros, all ones
- Large numbers (BigInt support)

**Expected behavior:**
```nix
nix-repl> builtins.bitAnd 3 5
1
nix-repl> builtins.bitOr 3 5
7
nix-repl> builtins.bitXor 3 5
6
```

**Documentation:** https://nix.dev/manual/nix/2.18/language/builtins#builtins-bitAnd
**Run tests:** `./test.sh builtins_bitwise`

### Task 9: Hashing & String Context (6 untested) - 3-4 hours
**Priority:** LOW-MEDIUM - Advanced features, less commonly used
**Status:** ⚠️ NOT TESTED (0% coverage)

**Functions to test:**
- `hashString` - Hash string with algorithm ("sha256", "md5", "sha1", "sha512")
- `hashFile` - Hash file contents
- `getContext` - Get string context (derivation dependencies)
- `hasContext` - Check if string has context
- `appendContext` - Add context to string
- `unsafeDiscardStringContext` - Remove context from string

**Test files to create:**
- `main/tests/builtins_hashing_test.js` (hashString, hashFile)
- `main/tests/builtins_context_test.js` (context functions)

**Critical tests:**
- All hash algorithms: sha256, md5, sha1, sha512
- Known hash values (test vectors)
- String context is Nix-specific (complex feature)

**Expected behavior:**
```nix
nix-repl> builtins.hashString "sha256" "hello"
"2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
nix-repl> builtins.hasContext "normal string"
false
```

**Documentation:**
- https://nix.dev/manual/nix/2.18/language/builtins#builtins-hashString
- https://nix.dev/manual/nix/2.18/language/builtins#builtins-getContext

**Run tests:** `./test.sh builtins_hashing` and `./test.sh builtins_context`

### Task 10: Miscellaneous Functions (12 untested) - 3-5 hours
**Priority:** LOW - Specialized functions, less commonly used
**Status:** ⚠️ NOT TESTED (various categories)

**Functions to test:**
- `derivationStrict` - Strict variant of derivation
- `placeholder` - Output path placeholder for self-references
- `toFile` - Write string to store file
- `storePath` - Convert path to store path
- `outputOf` - Get output path of derivation
- `unsafeDiscardOutputDependency` - Remove output dependency
- `splitVersion` - Split version string into components
- `unsafeGetAttrPos` - Get source position of attribute
- `getEnv` - Get environment variable
- `toXML` - Convert value to XML
- `fromJSON` - Parse JSON (already has implementation)
- `tryEval` - Try evaluation, catch errors

**Test files to create:**
- `main/tests/builtins_derivation_extra_test.js` (derivationStrict, placeholder, outputOf)
- `main/tests/builtins_store_test.js` (toFile, storePath, unsafeDiscardOutputDependency)
- `main/tests/builtins_misc_test.js` (splitVersion, toXML, fromJSON, tryEval, getEnv, unsafeGetAttrPos)

**Critical tests:**
- `splitVersion` has specific parsing rules (see comments in runtime.js line 521-530)
- `toXML` must generate valid XML
- `fromJSON` must parse BigInt for integers
- `tryEval` must catch errors gracefully

**Expected behavior:**
```nix
nix-repl> builtins.splitVersion "1.2.3"
[ "1" "2" "3" ]
nix-repl> builtins.toXML {foo = "bar";}
"<?xml version='1.0'?>\n<attrs><attr name=\"foo\"><string value=\"bar\" /></attr></attrs>"
nix-repl> builtins.fromJSON "{\"a\":42}"
{ a = 42; }
```

**Documentation:** https://nix.dev/manual/nix/2.18/language/builtins
**Run tests:** Multiple test commands needed for different categories

## Time Investment Summary

| Milestone | Tasks | Builtins Tested | Coverage | Time |
|-----------|-------|-----------------|----------|------|
| **Baseline (Current)** | - | 40/97 | 41% | 0h |
| **After Task 1** | Type Checking | 49/97 | 51% | 3-4h |
| **After Task 2** | + List Ops | 61/97 | 63% | 9-12h |
| **After Task 3** | + Attrset Ops | 69/97 | 71% | 13-18h |
| **After Task 4** | + String Ops | 72/97 | 74% | 16-22h |
| **After Task 5** | + Math | 77/97 | 79% | 18-25h |
| **After Task 6** | + Path Ops | 85/97 | **88%** ✅ | **22-31h** |
| **After Task 7** | + Control Flow | 93/97 | 96% | 24-34h |
| **After Task 8** | + Bitwise | 96/97 | 99% | 25-36h |
| **After Tasks 9-10** | + Remaining | 97/97 | **100%** ✅ | **32-45h** |

**Recommended Goal:** Complete Tasks 1-6 (80%+ coverage, 22-31 hours)
**Stretch Goal:** Complete Tasks 1-10 (100% coverage, 32-45 hours)

**Total untested builtins:** 57
**Total time to 80% coverage:** 22-31 hours (Tasks 1-6)
**Total time to 100% coverage:** 32-45 hours (Tasks 1-10)

## Test File Template (MANDATORY STRUCTURE)

**Every test file MUST follow this structure:**

### Step 1: Test in nix repl FIRST
Before writing ANY tests, verify behavior in nix repl:
```bash
$ nix repl
nix-repl> builtins.isAttrs {}
true
nix-repl> builtins.isAttrs null
false
nix-repl> builtins.isAttrs []
false
nix-repl> builtins.typeOf 42
"int"
nix-repl> builtins.typeOf "hello"
"string"
```

### Step 2: Create test file with proper imports
```javascript
import { builtins } from "../runtime.js"
import { assertEquals, assertThrows } from "https://deno.land/std@0.220.0/assert/mod.ts"

// Test each builtin separately with descriptive names
```

### Step 3: Write tests (minimum 5-10 per builtin)

**Test Structure:**
1. **Normal cases** (2-3 tests) - typical usage
2. **Edge cases** (2-3 tests) - empty, null, boundary values
3. **Error cases** (1-2 tests) - wrong types, invalid input
4. **Complex cases** (1-2 tests) - nested structures, large data

**Example Test File:**
```javascript
import { builtins } from "../runtime.js"
import { assertEquals, assertThrows } from "https://deno.land/std@0.220.0/assert/mod.ts"

// ============ isNull tests ============
Deno.test("builtins.isNull - returns true for null", () => {
    assertEquals(builtins.isNull(null), true)
})

Deno.test("builtins.isNull - returns false for non-null values", () => {
    assertEquals(builtins.isNull(undefined), false)
    assertEquals(builtins.isNull(0), false)
    assertEquals(builtins.isNull(false), false)
    assertEquals(builtins.isNull(""), false)
    assertEquals(builtins.isNull([]), false)
    assertEquals(builtins.isNull({}), false)
})

// ============ isAttrs tests ============
Deno.test("builtins.isAttrs - returns true for plain objects", () => {
    assertEquals(builtins.isAttrs({}), true)
    assertEquals(builtins.isAttrs({a: 1}), true)
    assertEquals(builtins.isAttrs({nested: {foo: "bar"}}), true)
})

Deno.test("builtins.isAttrs - returns false for non-objects", () => {
    assertEquals(builtins.isAttrs(null), false)
    assertEquals(builtins.isAttrs(undefined), false)
    assertEquals(builtins.isAttrs([]), false)
    assertEquals(builtins.isAttrs("string"), false)
    assertEquals(builtins.isAttrs(42), false)
    assertEquals(builtins.isAttrs(42n), false) // BigInt
})

// ============ typeOf tests ============
Deno.test("builtins.typeOf - identifies all Nix types", () => {
    assertEquals(builtins.typeOf(null), "null")
    assertEquals(builtins.typeOf(true), "bool")
    assertEquals(builtins.typeOf(42n), "int") // BigInt = Nix int
    assertEquals(builtins.typeOf(3.14), "float")
    assertEquals(builtins.typeOf("hello"), "string")
    assertEquals(builtins.typeOf([]), "list")
    assertEquals(builtins.typeOf({}), "set")
    assertEquals(builtins.typeOf(x => x), "lambda")
})

// Add comments with nix repl verification:
// Verified in nix repl:
// nix-repl> builtins.isAttrs {}
// true
// nix-repl> builtins.typeOf 42
// "int"
```

### Step 4: Run tests and verify
```bash
# Run specific test file
deno test --allow-all main/tests/builtins_types_test.js

# Run all tests in category
./test.sh builtins_types

# Run all tests
./test.sh
```

### Step 5: If tests fail, debug
1. Check runtime.js implementation (line numbers in error)
2. Verify against nix repl behavior
3. Fix bug in runtime.js
4. Re-run tests
5. Document any edge cases discovered

**Key Requirements:**
- ✅ 5-10 tests minimum per builtin
- ✅ Test normal, edge, and error cases
- ✅ Use descriptive test names
- ✅ Group tests by builtin (comments)
- ✅ Verify against nix repl first
- ✅ Document expected behavior in comments

## Test Files Status

### Test Files That Need to Be Created

**Missing test files (DO NOT EXIST YET):**
- ❌ `main/tests/builtins_types_test.js` - Task 1 (9 functions)
- ❌ `main/tests/builtins_lists_test.js` - Task 2 (12 functions)
- ❌ `main/tests/builtins_attrs_test.js` - Task 3 (8 functions)
- ❌ `main/tests/builtins_strings_test.js` - Task 4 (3 functions)
- ❌ `main/tests/builtins_math_test.js` - Task 5 (5 functions)
- ❌ `main/tests/builtins_path_ops_test.js` - Task 6 (8 functions)
- ❌ `main/tests/builtins_control_test.js` - Task 7 (8 functions)
- ❌ `main/tests/builtins_bitwise_test.js` - Task 8 (3 functions)
- ❌ `main/tests/builtins_hashing_test.js` - Task 9 (2 functions)
- ❌ `main/tests/builtins_context_test.js` - Task 9 (4 functions)
- ❌ `main/tests/builtins_misc_test.js` - Task 10 (various)

### Test Files That Already Exist

**Existing test files (DO NOT MODIFY):**
- ✅ `main/tests/builtins_core_test.js` - Core functionality
- ✅ `main/tests/builtins_fetchgit_test.js` - fetchGit tests
- ✅ `main/tests/builtins_fetchtarball_test.js` - fetchTarball tests
- ✅ `main/tests/builtins_fetchtree_test.js` - fetchTree tests
- ✅ `main/tests/builtins_fetchurl_test.js` - fetchurl tests
- ✅ `main/tests/derivation/*.js` - Derivation tests
- ✅ `main/tests/nixpkgs_lib_files_test.js` - nixpkgs.lib integration
- ✅ `main/tests/translator_test.js` - Translator tests

## Common Pitfalls to Avoid

### ❌ DO NOT:
1. **Skip nix repl verification** - Always test expected behavior in nix repl FIRST
2. **Write tests without understanding behavior** - Read Nix docs before testing
3. **Test only happy path** - Must test edge cases (null, empty, errors)
4. **Use console.log for tests** - Must use Deno.test() assertions
5. **Modify existing test files** - Create NEW test files for untested builtins
6. **Assume untested code works** - Untested code may have bugs
7. **Test multiple builtins in one test** - One test = one assertion
8. **Forget to import correctly** - Must import from "../runtime.js"

### ✅ DO:
1. **Test in nix repl first** - Understand expected behavior
2. **Read Nix 2.18 docs** - Official source of truth
3. **Test edge cases** - null, undefined, empty, wrong types
4. **Use descriptive test names** - "builtins.map - handles empty list"
5. **Group tests by builtin** - Add comments to separate sections
6. **Write 5-10 tests per builtin** - Normal + edge + error cases
7. **Verify tests pass** - Run `./test.sh` before moving on
8. **Fix bugs immediately** - If test fails, fix runtime.js first

## What Comes AFTER Runtime Testing (DO NOT START YET)

**DO NOT START these until runtime reaches 80% test coverage:**

### Phase 2: Translator Edge Cases (NOT STARTED)
**Remaining edge cases that need validation:**
- Nested pattern matching with @-patterns and ellipsis
- String escape sequences (verify all \x, \n, \t, etc.)
- Path literal edge cases (absolute vs relative)
- URI literals (may not be tested)
- Operator precedence comprehensive tests
- Multi-line string handling

**Estimated time:** 2-3 days

### Phase 3: nixpkgs.lib Expansion (NOT STARTED)
**Currently:** 10/41 files tested (24% coverage)
**Remaining:** 31 untested files

**Next files to test (in order):**
1. lists.nix - Core list functions
2. attrsets.nix - Attribute set utilities
3. options.nix - NixOS module options
4. meta.nix - Package metadata helpers
5. debug.nix - Debugging utilities
6. (26 more files...)

**Estimated time:** 4-6 days

### Phase 4: Optional Builtins (NOT STARTED, LOW PRIORITY)
**Not implemented, rarely used:**
- `fetchMercurial` - Mercurial support (2-3 days)
- `fetchClosure` - Binary cache (5-7 days, VERY COMPLEX)
- `getFlake` - Full flake system (5-7 days, VERY COMPLEX)

**Estimated time:** 12-17 days (only if needed)

## Final Summary - What Remains to Be Done

### Current State
- ✅ Runtime: 100% feature complete (all 97 Nix 2.18 builtins implemented)
- ✅ Translator: 100% working (87/87 tests passing)
- ✅ Infrastructure: All working (imports, derivations, fetchers, store)
- ✅ Known bugs: ALL FIXED (Session 33 verified)
- ⚠️ **Test coverage: 41%** (40/97 builtins tested, 57 untested)

### What Needs to Be Done
**Create 9-11 new test files to test 57 untested builtins.**

**Immediate Priority (Tasks 1-6, 22-31 hours to 80% coverage):**
1. Type Checking - 9 builtins (3-4h) → 51% coverage
2. List Operations - 12 builtins (6-8h) → 63% coverage
3. Attrset Operations - 8 builtins (4-6h) → 71% coverage
4. String Operations - 3 builtins (3-4h) → 74% coverage
5. Math & Comparison - 5 builtins (2-3h) → 79% coverage
6. Path/File Operations - 8 builtins (4-6h) → 88% coverage

**After 80% coverage, project is PRODUCTION READY.** ✅

**Optional (Tasks 7-10, +10-14 hours to 100% coverage):**
7. Control Flow - 8 builtins (2-3h)
8. Bitwise - 3 builtins (1-2h)
9. Hashing & Context - 6 builtins (3-4h)
10. Miscellaneous - 12 builtins (3-5h)

### Why This Work Is Important
- **Validation:** Untested code may contain bugs (Session 32 found 3 bugs in 3 tested functions)
- **Confidence:** 80%+ coverage = production-ready, trustworthy runtime
- **Documentation:** Tests serve as examples of how to use each builtin
- **Regression prevention:** Tests catch future bugs when code changes

### How to Start
1. **Start with Task 1** (Type Checking, 3-4 hours)
2. **Read this prompt.md** - All instructions are here
3. **Follow the Testing Process** (section above)
4. **Use the Test File Template** (section above)
5. **Run tests frequently** - `./test.sh builtins_types`
6. **Fix bugs immediately** - Don't skip to next task

### Success Criteria
- ✅ All 9 test files created for Tasks 1-6
- ✅ Minimum 5-10 tests per builtin
- ✅ All tests passing (`./test.sh` shows 0 failures)
- ✅ 77+/97 builtins tested (80%+ coverage)
- ✅ Runtime is production-ready

## Quick Reference

**Run tests:**
```bash
./test.sh                           # All tests
./test.sh builtins_types            # Specific category
deno test --allow-all main/tests/builtins_types_test.js  # Direct file
```

**Key documentation:**
- **Nix 2.18 builtins:** https://nix.dev/manual/nix/2.18/language/builtins
- **Test coverage analysis:** BUILTIN_COVERAGE.md (shows which builtins tested/untested)
- **This file:** prompt.md (complete implementation plan)

**Verify behavior first:**
```bash
$ nix repl
nix-repl> builtins.map (x: x * 2) [1 2 3]
[ 2 4 6 ]
```

**Create test:**
```javascript
Deno.test("builtins.map - doubles each element", () => {
    const result = builtins.map(x => x * 2n)([1n, 2n, 3n])
    assertEquals([...result], [2n, 4n, 6n])
})
```

## No More Implementation Work Needed

**DO NOT implement new builtins** - All 97 Nix 2.18 builtins are already implemented in runtime.js.

**DO NOT work on translator** - All 87 translator tests passing, feature complete.

**DO NOT work on nixpkgs.lib** - 10 files already tested, more can be added AFTER runtime reaches 80%.

**DO: Focus 100% on runtime testing** - Create test files, validate builtins, fix any bugs found.

