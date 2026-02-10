# Denix Development Guide

## 🚨 CRITICAL RULES - READ FIRST

**SELF-CHECK BEFORE RESPONDING:**
- [ ] Am I reporting accomplishments? (If yes, STOP and rewrite)
- [ ] Am I skipping reading Nix documentation? (If yes, STOP and read docs first)
- [ ] Am I working on translator/nixpkgs.lib before runtime is 80% tested? (If yes, STOP)
- [ ] Am I saying "this is a blocker"? (If yes, STOP - there are no blockers, break it down)

**Your job is to focus on what is NOT implemented and NOT working.**
- **Only report what remains to be done**
- **Do not report accomplishments or achievements**
- **You are a senior developer - there are no blockers, only tasks to break down**
- **Before executing below, filter out any completed tasks and achievements**

**WORK ORDER - MUST FOLLOW THIS SEQUENCE:**
1. **Runtime builtins FIRST** - Finish testing all 109 runtime builtins (currently 37% coverage)
2. **Network fetchers NEXT** - Only after runtime testing reaches 80%+ coverage
3. **Translator improvements LAST** - Only after runtime is production-ready
4. **nixpkgs.lib tests LAST** - Only after translator is fully stable

**IMPLEMENTATION METHODOLOGY:**
- **Always read Nix documentation while implementing**: https://nix.dev/manual/nix/2.18/language/builtins
- **Always test behavior in `nix repl`** before writing tests
- **Search the internet for documentation** (e.g., for fetchClosure, search "nix fetchClosure examples")
- **Use https://noogle.dev** to find real-world usage examples
- **Use npm modules ONLY via https://esm.sh/NPM_MODULE_NAME** (unreliable, prefer Deno std)
- **Break down large tasks** - If a task seems complex, identify intermediate steps and make them priorities

---

## 🎯 Current Priority: Runtime Testing (37% → 80% Coverage)

**What is NOT done:**
- **69 builtins have ZERO tests** (63% of runtime)
- **Target: 80% coverage = 47 more functions need tests**
- **Estimated: 18-26 hours of work remaining**

**VERIFIED Status (Session 36 - Corrected):**
- Tested: 40/109 builtins (37% coverage) ✅
- Actually untested: 62/109 builtins (57% coverage) ✅
- NO type checking tests (isNull, isBool, isInt, isFloat, isString, isList, isPath, isAttrs, typeOf) - 10 functions
- NO list operation tests (map, filter, all, any, elem, elemAt, partition, sort, genList, concatLists) - 10 functions
- NO core attrset tests (getAttr, attrNames, attrValues, catAttrs) - 6 functions

**Corrected from Session 35:** 7 functions thought to be untested are actually tested or are constants, reducing total from 69 to 62.

**Critical untested functions:**
- `map`, `filter`, `all`, `any` - Core list operations (ZERO tests)
- `getAttr`, `attrNames`, `attrValues` - Core attrset operations (ZERO tests)
- Type checking: isNull, isBool, isInt, isFloat, isString, isList, isPath, isAttrs, typeOf (ZERO tests)

## Complete List of Untested Builtins (69 functions)

**Verified from test file analysis (Session 36):**

**Type Checking (10 untested):**
isNull, isBool, isInt, isFloat, isString, isList, isPath, isAttrs, isFunction, typeOf

**List Operations (10 untested):**
map, filter, all, any, elem, elemAt, partition, sort, genList, concatLists

**Attrset Operations (6 untested):**
getAttr, attrNames, attrValues, catAttrs, genericClosure, getEnv

**String Operations (5 untested):**
split, splitVersion, baseNameOf, dirOf, toXML

**Math & Bitwise (8 untested):**
sub, mul, ceil, floor, bitAnd, bitOr, bitXor, toString

**Path/File Operations (11 untested):**
pathExists, readFile, readDir, readFileType, findFile, toFile, storePath, toPath, storeDir, nixPath, placeholder

**Hashing & Context (9 untested):**
hashFile, hashString, getContext, hasContext, unsafeDiscardStringContext, appendContext, unsafeDiscardOutputDependency, addErrorContext, outputOf

**Control Flow (3 untested):**
abort, seq (TESTED in builtins_core_test.js, ignore), deepSeq (TESTED, ignore)

**Conversion (1 untested):**
fromJSON

**Advanced (6 untested):**
zipAttrsWith, parseFlakeRef (TESTED, ignore), flakeRefToString (TESTED, ignore), langVersion (constant, ignore), nixVersion (constant, ignore), break

**ACCURATE COUNT (Session 36):**
- Type checking: 10 untested
- List operations: 10 untested
- Attrset operations: 6 untested
- String operations: 5 untested
- Math & bitwise: 8 untested
- Path/file: 11 untested
- Hashing/context: 9 untested
- Control flow: 1 untested (seq/deepSeq already tested)
- Conversion: 1 untested
- Advanced: 1 untested (others already tested or are constants)
- **Total: 62 actually untested functions** (not 69 - some are tested or constants)

## Work Process (MANDATORY FOR EVERY BUILTIN)

**NEVER skip these steps:**
1. **Read Nix documentation**: https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-FUNCTION_NAME
2. **Search for examples**: Use Google/noogle.dev to find real-world usage
3. **Test in `nix repl`**: Verify exact behavior with edge cases
4. **Write tests**: Match Nix behavior exactly, including error messages
5. **Document findings**: If behavior differs from docs, note it in test comments

## Test Files That DO NOT EXIST (Must Create)

**Session 36 verified - these files need to be created from scratch:**

1. `main/tests/builtins_type_checking_test.js` - 10 type checking functions (Task 0)
2. `main/tests/builtins_lists_comprehensive_test.js` - 10 list operations (Task 1)
3. `main/tests/builtins_attrs_comprehensive_test.js` - 6 attrset operations (Task 2)
4. `main/tests/builtins_strings_comprehensive_test.js` - 5 string operations (Task 3)
5. `main/tests/builtins_math_comprehensive_test.js` - 8 math/bitwise (Task 4)
6. `main/tests/builtins_paths_comprehensive_test.js` - 11 path/file operations (Task 5)
7. `main/tests/builtins_hashing_context_test.js` - 9 hashing/context (Task 6)
8. `main/tests/builtins_control_comprehensive_test.js` - 3 control flow (Task 7)
9. `main/tests/builtins_conversion_test.js` - 1 conversion (Task 8)
10. `main/tests/builtins_advanced_test.js` - 6 advanced (Task 9)

**Total: 10 new test files needed, 69 functions to test**

## Test Task Priority


### ⚡ Task 0: Type Checking (10 functions, 3-4 hours) - START HERE FIRST
**File**: `main/tests/builtins_type_checking_test.js` (DOES NOT EXIST - must create)

**CRITICAL: Type checking has ZERO tests! These are fundamental functions.**

**BEFORE WRITING ANY TESTS:**
- Read: https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-isNull
- Read: https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-typeOf
- Test each in `nix repl` to verify exact behavior

**Required nix repl tests:**
```bash
nix repl
nix-repl> builtins.isNull null       # => true
nix-repl> builtins.isNull false      # => false
nix-repl> builtins.isBool true       # => true
nix-repl> builtins.isBool 1          # => false
nix-repl> builtins.isInt 1           # => true
nix-repl> builtins.isInt 1.5         # => false
nix-repl> builtins.isFloat 1.5       # => true
nix-repl> builtins.isFloat 1         # => false
nix-repl> builtins.isString "hello"  # => true
nix-repl> builtins.isList [1 2 3]    # => true
nix-repl> builtins.isPath /tmp       # => true
nix-repl> builtins.isAttrs {a=1;}    # => true
nix-repl> builtins.typeOf null       # => "null"
nix-repl> builtins.typeOf true       # => "bool"
nix-repl> builtins.typeOf 1          # => "int"
nix-repl> builtins.typeOf 1.5        # => "float"
```

**Untested (10):**
- isNull - Check for null values
- isBool - Check for boolean values
- isInt - Check for integer values (BigInt in JS)
- isFloat - Check for float values (number in JS)
- isString - Check for string/InterpolatedString/Path
- isList - Check for array values
- isPath - Check for Path objects
- isAttrs - Check for object values (not null, not array)
- isFunction - Already tested in nixpkgs_trivial_test.js
- typeOf - Return type as string

**Minimum tests required (50+ total):**
- 10 positive cases (one per function, correct type returns true)
- 30+ negative cases (wrong types return false)
- 10 edge cases (null, undefined, empty structures, functions, derivations)

**Test structure example:**
```javascript
import { assertEquals } from "https://deno.land/std@0.210.0/assert/mod.ts"
import { builtins } from "../runtime.js"

Deno.test("builtins.isNull - null returns true", () => {
    assertEquals(builtins.isNull(null), true)
})

Deno.test("builtins.isNull - false returns false", () => {
    assertEquals(builtins.isNull(false), false)
})

Deno.test("builtins.isBool - true returns true", () => {
    assertEquals(builtins.isBool(true), true)
})

Deno.test("builtins.isBool - 1 returns false", () => {
    assertEquals(builtins.isBool(1n), false)
})

// ... 40 more tests
```

**Time estimate:** 3-4 hours (10 functions × 5 tests each = 50 tests minimum)

Run: `deno test --allow-all main/tests/builtins_type_checking_test.js`

---

### ⚡ Task 1: List Operations (10 functions, 5-7 hours) - AFTER TASK 0
**File**: `main/tests/builtins_lists_comprehensive_test.js` (DOES NOT EXIST - must create)

**CRITICAL: Core list operations have ZERO tests!**

**BEFORE WRITING ANY TESTS:**
- Read: https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-map
- Read: https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-filter
- Search noogle.dev for each function's real-world usage
- Test each function in `nix repl` with edge cases

**Required nix repl tests:**
```bash
nix repl
nix-repl> builtins.map (x: x * 2) [1 2 3]       # => [2 4 6]
nix-repl> builtins.filter (x: x > 2) [1 2 3 4]  # => [3 4]
nix-repl> builtins.all (x: x > 0) [1 2 3]       # => true
nix-repl> builtins.any (x: x < 0) [1 2 3]       # => false
nix-repl> builtins.elem 2 [1 2 3]               # => true
nix-repl> builtins.elemAt [10 20 30] 1          # => 20
nix-repl> builtins.partition (x: x > 2) [1 2 3 4]  # => {right=[3 4]; wrong=[1 2];}
nix-repl> builtins.sort (a: b: a < b) [3 1 2]   # => [1 2 3]
nix-repl> builtins.genList (i: i * 2) 5         # => [0 2 4 6 8]
nix-repl> builtins.concatLists [[1 2] [3 4]]    # => [1 2 3 4]
```

**Untested (10):**
- map (CRITICAL - uses lazyMap proxy in implementation) - Read docs first!
- filter (CRITICAL - most commonly used) - Read docs first!
- all (predicate checking) - Read docs first!
- any (predicate checking) - Read docs first!
- elem (element membership) - Read docs first!
- elemAt (index access) - Read docs first!
- partition (split by predicate) - Read docs first!
- sort (custom comparator) - Read docs first!
- genList (generate list from function) - Read docs first!
- concatLists (flatten list of lists) - Read docs first!

**Key edge cases:**
- Empty lists []
- Single element [1]
- Nested lists [[1,2],[3,4]]
- lazyMap: Check if returned value supports index access (runtime.js uses Proxy)
- partition: Check lazy evaluation (don't call predicate twice)
- sort: Verify stability (equal elements maintain order)
- genList: Zero length, large length
- Functions that throw on invalid input

**Minimum tests required (70+ total):**
- 10 basic usage tests (one per function)
- 30 edge case tests (empty, single element, nested)
- 20 error cases (wrong types, out of bounds, invalid predicates)
- 10 lazyMap/Proxy behavior tests

**Time estimate:** 5-7 hours (10 functions × 7 tests each = 70 tests minimum)

Run: `deno test --allow-all main/tests/builtins_lists_comprehensive_test.js`

### ⚡ Task 2: Attrset Operations (6 functions, 3-5 hours) - AFTER TASK 1
**File**: `main/tests/builtins_attrs_comprehensive_test.js` (DOES NOT EXIST - must create)

**CRITICAL: Core attrset operations have ZERO tests!**

**BEFORE WRITING ANY TESTS:**
- Read: https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-getAttr
- Read: https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-attrNames
- Read: https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-genericClosure
- Test each in `nix repl` to verify exact behavior and error messages

**Required nix repl tests:**
```bash
nix repl
nix-repl> builtins.getAttr "x" {x=1; y=2;}        # => 1
nix-repl> builtins.attrNames {z=1; a=2; m=3;}     # => ["a" "m" "z"] (sorted!)
nix-repl> builtins.attrValues {z=1; a=2;}         # => [2 1] (sorted by key)
nix-repl> builtins.catAttrs "x" [{x=1;} {y=2;} {x=3;}]  # => [1 3]
nix-repl> builtins.getEnv "HOME"                  # => "/Users/..."
```

**Untested (6):**
- getAttr (CRITICAL - most used attrset operation) - Read docs first!
- attrNames (CRITICAL - returns sorted list of keys) - Read docs first!
- attrValues (CRITICAL - returns values in key-sorted order) - Read docs first!
- catAttrs (extract attribute from list of attrsets) - Read docs first!
- genericClosure (transitive closure computation) - Read docs first! (Complex - may need 10+ tests)
- getEnv (environment variable access) - Read docs first!

**Key edge cases:**
- Missing attributes (getAttr should throw)
- null/undefined values in attrsets
- Empty attrsets {}
- attrNames: Verify alphabetical sorting
- attrValues: Verify values match sorted key order
- genericClosure: Circular references, empty startSet, duplicate keys
- getEnv: Missing variables return empty string

**Minimum tests required (50+ total):**
- 6 basic usage tests (one per function)
- 20 edge case tests (empty, missing, null values)
- 15 error cases (wrong types, missing required attributes)
- 10+ genericClosure tests (complex algorithm needs thorough testing)

**Test structure example:**
```javascript
Deno.test("builtins.getAttr - basic access", () => {
    const obj = { x: 1, y: 2 }
    assertEquals(builtins.getAttr("x")(obj), 1)
})

Deno.test("builtins.getAttr - missing attribute throws", () => {
    assertThrows(
        () => builtins.getAttr("z")({ x: 1 }),
        Error,
        "attribute 'z' missing"
    )
})

Deno.test("builtins.attrNames - returns sorted keys", () => {
    const obj = { z: 1, a: 2, m: 3 }
    assertEquals(builtins.attrNames(obj), ["a", "m", "z"])
})

Deno.test("builtins.attrValues - returns values in key order", () => {
    const obj = { z: 1, a: 2 }
    assertEquals(builtins.attrValues(obj), [2, 1])  // a=2, z=1
})
```

**Time estimate:** 3-5 hours (6 functions × 8 tests each = 50 tests minimum)

Run: `deno test --allow-all main/tests/builtins_attrs_comprehensive_test.js`

### Task 3: String Operations (5 functions, 3-4 hours) - AFTER TASK 2
**File**: `main/tests/builtins_strings_comprehensive_test.js` (DOES NOT EXIST - must create)

**BEFORE WRITING ANY TESTS:**
- Read: https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-split
- Read: https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-splitVersion
- Read docs for baseNameOf, dirOf, toXML
- Test each in `nix repl` to verify exact behavior

**Required nix repl tests:**
```bash
nix repl
nix-repl> builtins.split "([a-z]+)" "hello123world"
  # => ["" ["hello"] "123" ["world"] ""]
nix-repl> builtins.splitVersion "1.2.3.4"
  # => ["1" "2" "3" "4"]
nix-repl> builtins.baseNameOf "/path/to/file.txt"
  # => "file.txt"
nix-repl> builtins.dirOf "/path/to/file.txt"
  # => "/path/to"
nix-repl> builtins.toXML {a=1; b="hello";}
  # => "<?xml version='1.0' encoding='utf-8'?>\n<expr>...</expr>"
```

**Untested (5):**
- split (POSIX ERE regex matching) - Read docs first!
- splitVersion (version string parsing) - Read docs first!
- baseNameOf (extract filename from path) - Read docs first!
- dirOf (extract directory from path) - Read docs first!
- toXML (convert Nix value to XML) - Read docs first!

**Key edge cases:**
- split: Empty string, no matches, multiple captures, ^ and $ anchors
- splitVersion: Single component, empty version, non-numeric parts
- baseNameOf/dirOf: Root paths "/", relative paths, trailing slashes
- toXML: Nested structures, special characters, null values

**Minimum tests required (30+ total):**
- 5 basic usage tests
- 15 edge case tests
- 10 error cases

**Time estimate:** 3-4 hours (5 functions × 6 tests each = 30 tests minimum)

Run: `deno test --allow-all main/tests/builtins_strings_comprehensive_test.js`

### Task 4: Math & Bitwise (8 functions, 3-4 hours) - AFTER TASK 3
**File**: `main/tests/builtins_math_comprehensive_test.js` (DOES NOT EXIST - must create)

**BEFORE WRITING ANY TESTS:**
- Read: https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-sub
- Read: https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-mul
- Read docs for ceil, floor, bitAnd, bitOr, bitXor, toString
- Test each in `nix repl` to verify exact behavior

**Required nix repl tests:**
```bash
nix repl
nix-repl> builtins.sub 10 3          # => 7
nix-repl> builtins.mul 5 4           # => 20
nix-repl> builtins.ceil 3.2          # => 4
nix-repl> builtins.floor 3.8         # => 3
nix-repl> builtins.bitAnd 12 10      # => 8 (binary: 1100 & 1010 = 1000)
nix-repl> builtins.bitOr 12 10       # => 14 (binary: 1100 | 1010 = 1110)
nix-repl> builtins.bitXor 12 10      # => 6 (binary: 1100 ^ 1010 = 0110)
nix-repl> builtins.toString 42       # => "42"
nix-repl> builtins.toString true     # => "1"
nix-repl> builtins.toString false    # => ""
```

**Untested (8):**
- sub (subtraction) - Read docs first!
- mul (multiplication) - Read docs first!
- ceil (ceiling function) - Read docs first!
- floor (floor function) - Read docs first!
- bitAnd (bitwise AND) - Read docs first!
- bitOr (bitwise OR) - Read docs first!
- bitXor (bitwise XOR) - Read docs first!
- toString (convert any value to string) - Read docs first!

**Key edge cases:**
- sub/mul: BigInt vs float, negative numbers, overflow
- ceil/floor: Negative numbers, already integer values
- bitAnd/bitOr/bitXor: Negative numbers (two's complement), zero
- toString: null, bool, int, float, list, attrset, function, path

**Minimum tests required (30+ total):**
- 8 basic usage tests
- 12 edge case tests (negative, zero, mixed types)
- 10 toString conversion tests (all Nix types)

**Time estimate:** 3-4 hours (8 functions × 4 tests each = 30 tests minimum)

Run: `deno test --allow-all main/tests/builtins_math_comprehensive_test.js`

### Task 5: Path/File Operations (11 functions, 4-6 hours) - AFTER TASK 4
**File**: `main/tests/builtins_paths_comprehensive_test.js` (DOES NOT EXIST - must create)

**BEFORE WRITING ANY TESTS:**
- Read: https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-pathExists
- Read: https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-readFile
- Read: https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-readDir
- Read docs for all 11 functions
- Test each in `nix repl` to verify exact behavior

**Required nix repl tests:**
```bash
nix repl
nix-repl> builtins.pathExists /tmp          # => true
nix-repl> builtins.pathExists /nonexistent  # => false
nix-repl> builtins.readFile /etc/hosts      # => "127.0.0.1 localhost\n..."
nix-repl> builtins.readDir /tmp             # => {file1="regular"; dir1="directory";}
nix-repl> builtins.readFileType /tmp        # => "directory"
nix-repl> builtins.toPath "."               # => /Users/.../current/dir
nix-repl> builtins.storeDir                 # => "/nix/store"
nix-repl> builtins.placeholder "out"        # => "/1rz4g4z...hash...out"
```

**Untested (11):**
- pathExists (check if path exists) - Read docs first!
- readFile (read file contents as string) - Read docs first!
- readDir (list directory contents with types) - Read docs first!
- readFileType (get file type: regular, directory, symlink, unknown) - Read docs first!
- findFile (search for file in path list) - Read docs first!
- toFile (create text file in store) - Read docs first!
- storePath (add path to store) - Read docs first!
- toPath (convert string to path) - Read docs first!
- storeDir (get store directory path) - Read docs first!
- nixPath (get NIX_PATH as list) - Read docs first!
- placeholder (get derivation output placeholder) - Read docs first!

**Key edge cases:**
- pathExists: Symlinks, relative paths, permissions
- readFile: Binary files, empty files, large files
- readDir: Empty directories, permission denied
- readFileType: Symlinks to directories, broken symlinks
- findFile: Missing files, multiple search paths
- toFile: Special characters in name, empty content
- storePath: Circular references, large directories
- toPath: Relative vs absolute, string interpolation
- placeholder: Different output names

**Minimum tests required (40+ total):**
- 11 basic usage tests
- 20 edge case tests
- 10 error cases

**Time estimate:** 4-6 hours (11 functions × 4 tests each = 40 tests minimum)

Run: `deno test --allow-all main/tests/builtins_paths_comprehensive_test.js`

### Task 6: Hashing & Context (9 functions, 4-5 hours) - OPTIONAL (for 90%+ coverage)
**File**: `main/tests/builtins_hashing_context_test.js` (DOES NOT EXIST - must create)

**BEFORE WRITING ANY TESTS:**
- Read: https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-hashString
- Read: https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-hashFile
- Read docs for all context functions
- Test each in `nix repl` to verify exact behavior

**Required nix repl tests:**
```bash
nix repl
nix-repl> builtins.hashString "sha256" "hello"
  # => "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
nix-repl> builtins.hashFile "sha256" /tmp/test.txt
  # => "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
nix-repl> builtins.hasContext "hello"
  # => false
nix-repl> builtins.hasContext "${/tmp}"
  # => true (contains path context)
```

**Untested (9):**
- hashFile (hash file contents) - Read docs first!
- hashString (hash string with algorithm) - Read docs first!
- getContext (get string context metadata) - Read docs first!
- hasContext (check if string has context) - Read docs first!
- unsafeDiscardStringContext (remove context from string) - Read docs first!
- appendContext (add context to string) - Read docs first!
- unsafeDiscardOutputDependency (remove output dependency) - Read docs first!
- addErrorContext (add context to error messages) - Read docs first!
- outputOf (get derivation output path) - Read docs first!

**Key edge cases:**
- hashString: Different algorithms (md5, sha1, sha256, sha512), empty string
- hashFile: Missing files, large files, symlinks
- Context functions: Store paths in strings, derivation outputs
- outputOf: Different output names, missing outputs

**Minimum tests required (35+ total):**
- 9 basic usage tests
- 15 edge case tests
- 10 error cases

**Time estimate:** 4-5 hours (9 functions × 4 tests each = 35 tests minimum)

Run: `deno test --allow-all main/tests/builtins_hashing_context_test.js`

### Task 7: Control Flow (3 functions, 1-2 hours) - OPTIONAL
**File**: `main/tests/builtins_control_comprehensive_test.js` (DOES NOT EXIST - must create)

**NOTE:** seq and deepSeq are ALREADY TESTED in builtins_core_test.js! Only abort needs tests.

**BEFORE WRITING ANY TESTS:**
- Read: https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-abort
- Test in `nix repl` to verify exact behavior

**Required nix repl tests:**
```bash
nix repl
nix-repl> builtins.abort "error message"
  # error: evaluation aborted with the following error message: 'error message'
```

**Untested (1 actually):**
- abort (abort evaluation with message) - Read docs first!
- seq (ALREADY TESTED in builtins_core_test.js - skip)
- deepSeq (ALREADY TESTED in builtins_core_test.js - skip)

**Key edge cases:**
- abort: Empty message, long message, special characters

**Minimum tests required (5+ total):**
- 1 basic usage test
- 3 edge case tests (empty string, newlines, special chars)
- 1 error case verification

**Time estimate:** 30 minutes - 1 hour (only 1 function × 5 tests)

Run: `deno test --allow-all main/tests/builtins_control_comprehensive_test.js`

### Task 8: JSON/Conversion (1 function, 30min-1 hour) - OPTIONAL
**File**: `main/tests/builtins_conversion_test.js` (DOES NOT EXIST - must create)

**BEFORE WRITING ANY TESTS:**
- Read: https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-fromJSON
- Test in `nix repl` to verify exact behavior

**Required nix repl tests:**
```bash
nix repl
nix-repl> builtins.fromJSON "{\"a\":1,\"b\":2}"
  # => {a=1; b=2;}
nix-repl> builtins.fromJSON "[1,2,3]"
  # => [1 2 3]
nix-repl> builtins.fromJSON "null"
  # => null
```

**Untested (1):**
- fromJSON (parse JSON string to Nix value) - Read docs first!

**Key edge cases:**
- Empty objects {}, empty arrays []
- Nested structures
- Special values: null, true, false
- Large integers (should become BigInt)
- Unicode strings
- Invalid JSON (should throw)

**Minimum tests required (10+ total):**
- 1 basic usage test
- 6 edge case tests (null, bool, int, float, array, object)
- 3 error cases (invalid JSON, malformed strings)

**Time estimate:** 30 minutes - 1 hour (1 function × 10 tests)

Run: `deno test --allow-all main/tests/builtins_conversion_test.js`

### Task 9: Advanced Functions (6 functions, 3-5 hours) - OPTIONAL
**File**: `main/tests/builtins_advanced_test.js` (DOES NOT EXIST - must create)

**NOTE:** Several functions are ALREADY TESTED:
- functionArgs (TESTED in nixpkgs_lib_files_test.js)
- parseFlakeRef, flakeRefToString (TESTED in nixpkgs_lib_files_test.js)
- langVersion, nixVersion (constants, no tests needed)

**BEFORE WRITING ANY TESTS:**
- Read: https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-zipAttrsWith
- Test in `nix repl` to verify exact behavior

**Required nix repl tests:**
```bash
nix repl
nix-repl> builtins.zipAttrsWith (name: values: values) [{a=1;} {a=2; b=3;}]
  # => {a=[1 2]; b=[3];}
nix-repl> f = x: y: x + y
nix-repl> builtins.functionArgs f
  # => {x=false; y=false;} (no defaults)
```

**Untested (1 actually):**
- zipAttrsWith (merge attrsets with custom combine function) - Read docs first!
- functionArgs (ALREADY TESTED - skip)
- parseFlakeRef (ALREADY TESTED - skip)
- flakeRefToString (ALREADY TESTED - skip)
- langVersion (constant, skip)
- nixVersion (constant, skip)
- break (debugging, may not be implemented)

**Key edge cases:**
- zipAttrsWith: Empty list, single attrset, missing keys in some sets
- Values appear in order they're encountered

**Minimum tests required (10+ total):**
- 1 basic usage test
- 5 edge case tests (empty, single, missing keys, nested values)
- 3 error cases (wrong types, invalid functions)

**Time estimate:** 1-2 hours (1 function × 10 tests)

Run: `deno test --allow-all main/tests/builtins_advanced_test.js`

## Path to 80% Coverage (CORRECTED Session 36)

**Current coverage: 40/109 = 37%**
**Target coverage: 87/109 = 80%**
**Need to test: 47 more functions**

**Phase 1 (CRITICAL - START HERE):**
- Task 0: Type checking (10 functions, 3-4 hours) → 46% coverage
- Task 1: List operations (10 functions, 5-7 hours) → 55% coverage
- Task 2: Attrset operations (6 functions, 3-5 hours) → 61% coverage
- **Subtotal: 26 functions, 11-16 hours** → 61% coverage

**Phase 2 (HIGH PRIORITY - REACH 80%):**
- Task 3: String operations (5 functions, 3-4 hours) → 66% coverage
- Task 4: Math & bitwise (8 functions, 3-4 hours) → 73% coverage
- Task 5: Path/file (11 functions, 4-6 hours) → 83% coverage
- **Subtotal: 24 functions, 10-14 hours** → 83% coverage ✅ **TARGET REACHED**

**Phase 3 (OPTIONAL - 90%+ coverage):**
- Task 6: Hashing/context (9 functions, 4-5 hours) → 91% coverage
- Task 7: Control flow (1 function, 0.5-1 hour) → 92% coverage
- Task 8: Conversion (1 function, 0.5-1 hour) → 93% coverage
- Task 9: Advanced (1 function, 1-2 hours) → 94% coverage
- **Subtotal: 12 functions, 6-9 hours** → 94% coverage

**TOTAL TO 80%: Tasks 0-5 = 50 functions, 21-30 hours remaining**
**TOTAL TO 90%+: Tasks 0-9 = 62 functions, 27-39 hours remaining**

## Next Immediate Action (Session 36)

**START HERE - Create type checking tests:**

1. **Create test file**: `main/tests/builtins_type_checking_test.js`
2. **Read Nix docs**: https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-isNull
3. **Test in nix repl**:
   ```bash
   nix repl
   nix-repl> builtins.isNull null       # true
   nix-repl> builtins.isNull false      # false
   nix-repl> builtins.isBool true       # true
   nix-repl> builtins.isInt 1           # true
   nix-repl> builtins.isFloat 1.5       # true
   nix-repl> builtins.isString "hello"  # true
   nix-repl> builtins.isList [1 2 3]    # true
   nix-repl> builtins.isPath /tmp       # true
   nix-repl> builtins.isAttrs {a=1;}    # true
   nix-repl> builtins.typeOf null       # "null"
   ```
4. **Write 50+ tests**: 10 functions × 5 tests each minimum
5. **Run tests**: `deno test --allow-all main/tests/builtins_type_checking_test.js`
6. **Verify all pass**: Should reach 46% coverage

**After Task 0 completes, move to Task 1 (List Operations)**

## Test File Template

```javascript
import { assertEquals, assertThrows } from "https://deno.land/std@0.210.0/assert/mod.ts"
import { builtins } from "../runtime.js"

Deno.test("builtins.FUNCTION_NAME - basic usage", () => {
    const result = builtins.FUNCTION_NAME(arg)
    assertEquals(result, expected)
})

Deno.test("builtins.FUNCTION_NAME - edge case", () => {
    const result = builtins.FUNCTION_NAME(edgeArg)
    assertEquals(result, expectedEdge)
})

Deno.test("builtins.FUNCTION_NAME - error case", () => {
    assertThrows(
        () => builtins.FUNCTION_NAME(badArg),
        Error,
        "expected error message"
    )
})
```

## Quick Reference: Test File Contents

**Task 0 - builtins_type_checking_test.js (50+ tests):**
- isNull, isBool, isInt, isFloat, isString, isList, isPath, isAttrs, isFunction, typeOf
- Test each with correct type (returns true) and wrong types (returns false)
- Test typeOf returns correct string for all Nix types

**Task 1 - builtins_lists_comprehensive_test.js (70+ tests):**
- map, filter, all, any, elem, elemAt, partition, sort, genList, concatLists
- Test lazyMap proxy behavior (index access)
- Test empty lists, single elements, nested lists
- Test predicates, comparators, generators

**Task 2 - builtins_attrs_comprehensive_test.js (50+ tests):**
- getAttr, attrNames, attrValues, catAttrs, genericClosure, getEnv
- Test attrNames returns sorted keys
- Test attrValues returns values in key-sorted order
- Test genericClosure with circular references
- Test missing attributes throw errors

**Task 3 - builtins_strings_comprehensive_test.js (30+ tests):**
- split, splitVersion, baseNameOf, dirOf, toXML
- Test POSIX ERE regex in split
- Test path edge cases (root, trailing slashes)
- Test XML conversion for nested structures

**Task 4 - builtins_math_comprehensive_test.js (30+ tests):**
- sub, mul, ceil, floor, bitAnd, bitOr, bitXor, toString
- Test BigInt vs float handling
- Test bitwise operations with negatives
- Test toString for all Nix types

**Task 5 - builtins_paths_comprehensive_test.js (40+ tests):**
- pathExists, readFile, readDir, readFileType, findFile, toFile, storePath, toPath, storeDir, nixPath, placeholder
- Test file I/O operations
- Test store path operations
- Test permission errors, missing files

**Task 6-9 (Optional):**
- Hashing, context, control flow, conversion, advanced functions
- Only needed for 90%+ coverage

## Running Tests

```bash
# All tests
deno test --allow-all

# Specific test file
deno test --allow-all main/tests/builtins_type_checking_test.js
deno test --allow-all main/tests/builtins_lists_comprehensive_test.js

# Pattern matching
deno test --allow-all --filter="isNull"
deno test --allow-all --filter="map"

# Check coverage (count passing tests)
deno test --allow-all 2>&1 | grep "passed"
```

## What Remains AFTER Runtime Testing (DO NOT START UNTIL 80% COVERAGE)

### Network Fetchers (NOT STARTED - 16-22 days remaining)

**Missing implementations:**
1. **fetchMercurial** (2-3 days)
   - Read: https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-fetchMercurial
   - Search: "nix fetchMercurial examples"
   - Implementation plan needed

2. **fetchClosure** (5-7 days)
   - Read: https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-fetchClosure
   - Search: "nix fetchClosure binary cache"
   - Very complex - break into subtasks

3. **getFlake** (5-7 days)
   - Read: https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-getFlake
   - Search: "nix getFlake implementation"
   - Very complex - break into subtasks

4. **fetchTree edge cases** (4-6 hours)
   - type='path', type='indirect'
   - Read fetchTree docs thoroughly

### Translator Edge Cases (NOT STARTED - 2-3 days remaining)
- Nested destructuring with @
- String escape sequences verification
- Path literal edge cases
- Operator precedence verification

### nixpkgs.lib Testing (NOT STARTED - 4-6 days remaining)
- 31 of 41 files untested (76% untested)
- High-value targets: lists.nix, attrsets.nix, options.nix

**DO NOT START ANY OF THE ABOVE UNTIL TASKS 1-5 ARE COMPLETE (80% COVERAGE)**
