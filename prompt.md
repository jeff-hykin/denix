# FOCUS: Runtime Testing (38.5% → 80% Coverage)

## CRITICAL STATUS

**Runtime**: 109/109 implemented ✅ | 42/109 tested (38.5%) ❌ UNACCEPTABLE
**Translator**: 87/87 tests passing ✅ PRODUCTION READY
**Derivations**: 12+ tests passing ✅ WORKING
**Import System**: 49 tests passing ✅ WORKING
**Fetch System**: 97 tests passing ✅ WORKING

**YOUR MISSION**: Create 6 test files for 55 untested builtins (24-33 hours)

---

## IMMEDIATE ACTION REQUIRED

### Task 1: Type Checking Tests (10 functions, 3-4 hours) 🔥 START HERE
**File**: `main/tests/builtins_type_checking_test.js` (DOES NOT EXIST)

**Untested Functions** (ALL have ZERO tests):
- `isNull` (line 180) - Test null, non-null
- `isBool` (line 181) - Test true, false, non-bool
- `isInt` (line 182) - Test BigInt, Number, string
- `isFloat` (line 183) - Test float, int, string
- `isPath` (line 184) - Test Path instance, string, other
- `isString` (line 185) - Test string, InterpolatedString, non-string
- `isList` (line 187) - Test array, non-array
- `isAttrs` (line 188) - Test object, null, array, primitive
- `isFunction` (line 189) - Test function, non-function
- `typeOf` (line 190) - Test all types ("int", "bool", "string", "list", "set", "lambda", "float", "null", "path")

**Why Critical**: Used EVERYWHERE in Nix code, must be bulletproof.

**Test Requirements** (minimum 50 tests, 5 per function):
```bash
# Test in nix repl first:
nix repl
> builtins.isNull null        # true
> builtins.isNull 5            # false
> builtins.typeOf 5            # "int"
> builtins.typeOf 5.0          # "float"
> builtins.typeOf "hi"         # "string"
> builtins.typeOf []           # "list"
> builtins.typeOf {}           # "set"
> builtins.typeOf (x: x)       # "lambda"
```

**Run**: `./test.sh types` or `deno test --allow-all main/tests/builtins_type_checking_test.js`

---

### Task 2: List Operations (12 functions, 6-8 hours) 🔥 CRITICAL
**File**: `main/tests/builtins_lists_comprehensive_test.js` (DOES NOT EXIST)

**Untested Functions** (ZERO dedicated tests):
- `map` (line 527-545) - lazyMap proxy, lazy evaluation
- `filter` (line 548) - predicate function
- `all` (line 588) - empty list → true
- `any` (line 597) - empty list → false
- `elem` (line 606) - type equality (1 ≠ "1")
- `elemAt` (line 577) - out of bounds error
- `partition` (line 552-570) - lazy eval, cached getters
- `sort` (line 612) - comparator, stability
- `genList` (line 628) - generator function
- `concatLists` (line 559) - nested lists
- `zipAttrsWith` (line 686) - merge function
- `foldl'` (line 615) - strict evaluation

**Why Critical**: map, filter are most-used list functions in all Nix code.

**Test Requirements** (minimum 70 tests, 6 per function):
```bash
# Test in nix repl:
nix repl
> builtins.map (x: x * 2) [1 2 3]           # [2 4 6]
> builtins.filter (x: x > 2) [1 2 3 4]      # [3 4]
> builtins.all (x: x > 0) [1 2 3]           # true
> builtins.any (x: x > 5) [1 2 3]           # false
> builtins.elem 2 [1 2 3]                   # true
> builtins.elemAt [1 2 3] 1                 # 2
> builtins.elemAt [1 2 3] 10                # error!
> builtins.partition (x: x > 2) [1 2 3 4]   # { right = [3 4]; wrong = [1 2]; }
> builtins.sort (a: b: a < b) [3 1 2]       # [1 2 3]
> builtins.genList (x: x * 2) 5             # [0 2 4 6 8]
> builtins.concatLists [[1 2] [3 4]]        # [1 2 3 4]
```

**Critical Edge Cases**:
- `map`: Verify lazyMap proxy doesn't eagerly evaluate
- `elemAt`: Out of bounds MUST throw error
- `partition`: Verify lazy evaluation with cached getters
- `foldl'`: Must be strict (evaluate immediately)

**Run**: `./test.sh lists` or `deno test --allow-all main/tests/builtins_lists_comprehensive_test.js`

---

### Task 3: Attrset Operations (7 functions, 4-6 hours) 🔥 CRITICAL
**File**: `main/tests/builtins_attrs_comprehensive_test.js` (DOES NOT EXIST)

**Untested Functions**:
- `getAttr` (line 830) - ZERO tests, critical function
- `attrNames` (line 820) - ZERO tests, MUST return sorted list
- `attrValues` (line 825) - ZERO tests
- `catAttrs` (line 838) - ZERO tests
- `genericClosure` (line 849) - ZERO tests, complex logic
- `hasAttr` - only tested in hasattr_test.js (operator tests)
- `genAttrs` (line 843) - ZERO tests

**Why Critical**: Core attribute set operations, used constantly.

**Test Requirements** (minimum 50 tests, 7-8 per function):
```bash
# Test in nix repl:
nix repl
> builtins.getAttr "x" {x=1; y=2;}          # 1
> builtins.getAttr "z" {x=1; y=2;}          # error!
> builtins.attrNames {z=3; a=1; m=2;}       # ["a" "m" "z"] (sorted!)
> builtins.attrValues {z=3; a=1; m=2;}      # [1 2 3] (matches attrNames order)
> builtins.hasAttr "x" {x=1; y=2;}          # true
> builtins.catAttrs "x" [{x=1;} {x=2; y=3;} {y=4;}]  # [1 2]
> builtins.genAttrs ["a" "b"] (name: name + "1")      # {a="a1"; b="b1";}
```

**Critical Edge Cases**:
- `attrNames`: MUST return alphabetically sorted list
- `getAttr`: Missing attribute MUST throw error
- `genericClosure`: Handle cycles, use 'key' for uniqueness
- `hasAttr`: Only own properties, not prototype chain

**Run**: `./test.sh attrs` or `deno test --allow-all main/tests/builtins_attrs_comprehensive_test.js`

---

### Task 4: String Operations (8 functions, 4-5 hours)
**File**: `main/tests/builtins_strings_comprehensive_test.js` (DOES NOT EXIST)

**Untested Functions**:
- `split` (line 361) - regex, capture groups
- `splitVersion` (line 368) - version parsing
- `baseNameOf` (line 957) - path basename
- `dirOf` (line 965) - path dirname
- `toString` (line 317) - complex type conversion
- `match` - regex matching (used in tests but no dedicated tests)
- `concatStringsSep` (line 437) - 1 test only
- `replaceStrings` (line 451) - 1 test only

**Test Requirements** (minimum 50 tests, 6-8 per function):
```bash
# Test in nix repl:
nix repl
> builtins.split "(a+)" "xaayaaz"           # ["x" ["aa"] "y" ["aa"] "z"]
> builtins.splitVersion "1.2.3-rc1"         # ["1" "2" "3" "rc1"]
> builtins.baseNameOf "/foo/bar/baz.txt"    # "baz.txt"
> builtins.dirOf "/foo/bar/baz.txt"         # "/foo/bar"
> builtins.toString 123                     # "123"
> builtins.match "([0-9]+)" "abc123def"     # ["123"]
> builtins.concatStringsSep ", " ["a" "b"]  # "a, b"
> builtins.replaceStrings ["a"] ["b"] "aaa" # "bbb"
```

**Run**: `./test.sh strings` or `deno test --allow-all main/tests/builtins_strings_comprehensive_test.js`

---

### Task 5: Math & Bitwise (8 functions, 3-4 hours)
**File**: `main/tests/builtins_math_comprehensive_test.js` (DOES NOT EXIST)

**Untested Functions** (ALL have ZERO tests):
- `sub` (line 222) - BigInt/Float subtraction
- `mul` (line 230) - BigInt/Float multiplication
- `lessThan` (line 211) - comparison
- `ceil` (line 239) - ceiling function
- `floor` (line 244) - floor function
- `bitAnd` (line 249) - bitwise AND
- `bitOr` (line 257) - bitwise OR
- `bitXor` (line 265) - bitwise XOR

**Test Requirements** (minimum 45 tests, 5-6 per function):
```bash
# Test in nix repl:
nix repl
> builtins.sub 10 3                         # 7
> builtins.mul 5 3                          # 15
> builtins.lessThan 3 5                     # true
> builtins.ceil 1.5                         # 2
> builtins.floor 1.5                        # 1
> builtins.bitAnd 5 3                       # 1 (101 & 011 = 001)
> builtins.bitOr 5 3                        # 7 (101 | 011 = 111)
> builtins.bitXor 5 3                       # 6 (101 ^ 011 = 110)
```

**Run**: `./test.sh math` or `deno test --allow-all main/tests/builtins_math_comprehensive_test.js`

---

### Task 6: Path/File Operations (10 functions, 4-6 hours)
**File**: `main/tests/builtins_paths_comprehensive_test.js` (DOES NOT EXIST)

**Untested Functions** (ALL have ZERO tests):
- `pathExists` (line 1306)
- `readFile` (line 1310)
- `readDir` (line 1324)
- `readFileType` (line 1341)
- `findFile` (line 1350)
- `toFile` (line 1432)
- `storePath` (line 1459)
- `storeDir` (line 1454)
- `nixPath` (line 1463)
- `placeholder` (line 1477)

**Test Requirements** (minimum 55 tests, 5-6 per function):
```bash
# Test in nix repl:
nix repl
> builtins.pathExists "/tmp"                # true
> builtins.readFile "/etc/hosts"            # file contents
> builtins.readDir "/tmp"                   # [{ name="file"; type="regular"; }]
> builtins.readFileType "/tmp"              # "directory"
> builtins.storeDir                         # "/nix/store"
```

**Run**: `./test.sh paths` or `deno test --allow-all main/tests/builtins_paths_comprehensive_test.js`

---

## TESTING PROCESS (MANDATORY)

### Before Writing ANY Test:
1. **Read Nix 2.18 docs**: https://nix.dev/manual/nix/2.18/language/builtins
2. **Test in nix repl**: Verify exact behavior with edge cases
3. **Find examples**: https://noogle.dev or GitHub nixpkgs
4. **Document expected outputs**: Write comments with nix repl results

### Test File Template:
```javascript
import { assertEquals, assertThrows } from "jsr:@std/assert";
import { builtins } from "../runtime.js";

// Test normal case
Deno.test("isNull - returns true for null", () => {
    assertEquals(builtins.isNull(null), true);
});

// Test edge case
Deno.test("isNull - returns false for 0", () => {
    assertEquals(builtins.isNull(0), false);
});

// Test error case (if applicable)
Deno.test("getAttr - throws on missing attribute", () => {
    assertThrows(
        () => builtins.getAttr("missing", {}),
        Error,
        "attribute 'missing' missing"
    );
});
```

### Quality Requirements:
- **Minimum 5-8 tests per function**
- **Cover normal cases, edge cases, error cases**
- **Use actual nix repl output as expected values**
- **Test type coercion (BigInt vs Float)**
- **Test null/undefined handling**
- **Test empty collections ([], {})**

---

## SUCCESS CRITERIA

**Target**: 80% coverage = 87/109 builtins tested (need 45 more)
**Stretch**: 89% coverage = 97/109 builtins tested (need 55 more)

**Definition of "tested"**:
- ✅ Minimum 5 tests per function
- ✅ Normal case covered
- ✅ Edge cases covered
- ✅ Error cases covered (if applicable)
- ✅ All tests passing

**When you're done**:
- All 6 test files created
- All tests passing
- Coverage > 80%
- All bugs discovered and fixed

---

## WHAT NOT TO DO

❌ **Don't implement new features** - Runtime is 100% feature complete for Nix 2.18
❌ **Don't refactor working code** - Translator is production ready
❌ **Don't optimize performance** - It's already fast (1-2 second test suite)
❌ **Don't add documentation** - Focus on tests only
❌ **Don't clean up code** - Already done (removed 3 unused functions)
❌ **Don't work on translator** - Wait until runtime is 80% tested
❌ **Don't work on nixpkgs tests** - Wait until runtime is 80% tested

---

## CURRENT FILE STATUS

### Test Files That Exist ✅
1. `builtins_core_test.js` - Core builtins (seq, deepSeq, abort, etc.)
2. `builtins_fetch*.js` (6 files) - Network fetchers (97 tests)
3. `builtins_path_test.js` - Path builtin
4. `builtins_tojson_path_test.js` - JSON serialization
5. `translator_test.js` - Translator (87 tests)
6. `import_*.js` (5 files) - Import system (49 tests)
7. `string_interpolation_test.js` - String handling
8. `path_interpolation_test.js` - Path handling
9. `hasattr_test.js` - Attribute access (hasAttr operator only)
10. `operators.js` - Operator tests (~20 operators)
11. `fromtoml_test.js` - TOML parsing
12. `fetcher_test.js` - HTTP fetcher
13. `tar_test.js` - Tarball extraction
14. `nar_hash_test.js` - NAR hashing
15. `store_manager_test.js` - Store management
16. `nixpkgs_trivial_test.js` - 20 nixpkgs functions
17. `nixpkgs_lib_files_test.js` - Full lib files
18. `derivation/*.js` (3 files) - Derivation system (12+ tests)

**Total**: 25 standard test files + 3 derivation files = 28 files

### Test Files Needed ❌
1. `builtins_type_checking_test.js` - 10 functions, 3-4h 🔥
2. `builtins_lists_comprehensive_test.js` - 12 functions, 6-8h 🔥
3. `builtins_attrs_comprehensive_test.js` - 7 functions, 4-6h 🔥
4. `builtins_strings_comprehensive_test.js` - 8 functions, 4-5h
5. `builtins_math_comprehensive_test.js` - 8 functions, 3-4h
6. `builtins_paths_comprehensive_test.js` - 10 functions, 4-6h

**Total needed**: 6 files, 55 functions, 24-33 hours

---

## COMPLETE UNTESTED BUILTIN LIST (67 Functions)

### Type Checking (10) - Task 1
- `isNull` (line 180)
- `isBool` (line 181)
- `isInt` (line 182)
- `isFloat` (line 183)
- `isPath` (line 184)
- `isString` (line 185)
- `isList` (line 187)
- `isAttrs` (line 188)
- `isFunction` (line 189)
- `typeOf` (line 190)

### List Operations (12) - Task 2
- `map` (line 527)
- `filter` (line 548)
- `all` (line 588)
- `any` (line 597)
- `elem` (line 606)
- `elemAt` (line 577)
- `partition` (line 552)
- `sort` (line 612)
- `genList` (line 628)
- `concatLists` (line 559)
- `zipAttrsWith` (line 686)
- `foldl'` (line 615)

### Attrset Operations (7) - Task 3
- `getAttr` (line 830)
- `attrNames` (line 820)
- `attrValues` (line 825)
- `catAttrs` (line 838)
- `genericClosure` (line 849)
- `hasAttr` (partially tested)
- `genAttrs` (line 843)

### String Operations (8) - Task 4
- `split` (line 361)
- `splitVersion` (line 368)
- `baseNameOf` (line 957)
- `dirOf` (line 965)
- `toString` (line 317)
- `match` (partially tested)
- `concatStringsSep` (line 437)
- `replaceStrings` (line 451)

### Math & Bitwise (8) - Task 5
- `sub` (line 222)
- `mul` (line 230)
- `lessThan` (line 211)
- `ceil` (line 239)
- `floor` (line 244)
- `bitAnd` (line 249)
- `bitOr` (line 257)
- `bitXor` (line 265)

### Path/File Operations (10) - Task 6
- `pathExists` (line 1306)
- `readFile` (line 1310)
- `readDir` (line 1324)
- `readFileType` (line 1341)
- `findFile` (line 1350)
- `toFile` (line 1432)
- `storePath` (line 1459)
- `storeDir` (line 1454)
- `nixPath` (line 1463)
- `placeholder` (line 1477)

### Additional Untested (12) - Lower Priority
- `compareVersions` (line 726)
- `parseDrvName` (line 735)
- `hashString` (line 1379)
- `hashFile` (line 1389)
- `toXML` (line 1408)
- `fromJSON` (line 1413)
- `toJSON` (line 1419)
- `addErrorContext` (line 976)
- `unsafeGetAttrPos` (line 990)
- `unsafeDiscardStringContext` (line 999)
- `getContext` (line 1009)
- `appendContext` (line 1019)

**Total Untested**: 67 functions (61.5% of runtime)

---

## TIME ESTIMATES

**To 80% coverage (Tasks 1-5)**: 20-27 hours (5 files, 45 functions)
**To 89% coverage (Tasks 1-6)**: 24-33 hours (6 files, 55 functions)
**To 91% coverage (All untested)**: 35-45 hours (all 67 functions)

**Recommended**: Focus on Tasks 1-6 (89% coverage) = 24-33 hours

---

## TEST RUNNER COMMANDS

```bash
# Run all tests
./test.sh

# Run specific task tests
./test.sh types       # Task 1 (when file exists)
./test.sh lists       # Task 2 (when file exists)
./test.sh attrs       # Task 3 (when file exists)
./test.sh strings     # Task 4 (when file exists)
./test.sh math        # Task 5 (when file exists)
./test.sh paths       # Task 6 (when file exists)

# Run existing test groups
./test.sh core        # Core builtins
./test.sh translator  # Translator
./test.sh derivation  # Derivation system
./test.sh import      # Import system
./test.sh infra       # Infrastructure (fetch, tar, nar, store)
./test.sh integration # nixpkgs integration

# Run custom filter
./test.sh <pattern>   # Match test name
```

---

## REMEMBER

1. **Test first, fix bugs second** - Untested code has bugs
2. **Use nix repl** - Verify behavior before writing tests
3. **Minimum 5 tests per function** - Normal + edge + error cases
4. **Break down large tasks** - One function at a time if needed
5. **No blockers exist** - Research → implement → test → fix
6. **Runtime is 100% feature complete** - Only testing remains

**START WITH TASK 1** (Type Checking, 3-4 hours) 🔥
