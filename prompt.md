# CRITICAL INSTRUCTIONS - READ FIRST

**Your job is to focus on what is NOT implemented and NOT working.**
- Only report what remains to be done
- Do NOT report achievements or what you accomplished
- You are a senior level developer - there is no such thing as a blocker
- Break down large tasks into smaller tasks
- Filter out any checkboxes (✅) or achievement language

## MANDATORY WORK ORDER (DO NOT DEVIATE)

1. **RUNTIME FIRST** - Finish all network fetchers and store functions in runtime.js
2. **TRANSLATOR SECOND** - Only after runtime is 100% complete
3. **NIX-LIB TESTS LAST** - Only after translator is fully implemented

**Currently on:** Step 1 (Runtime Testing)

## IMPLEMENTATION RULES

### Before Writing ANY Code
1. **Read the Nix documentation:** https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-FUNCTION_NAME
2. **Test in `nix repl`:** Try edge cases, understand exact behavior
3. **Search for examples:** Look at nixpkgs source, Nix source code, or Noogle
4. **Plan intermediate steps:** Break 5-hour tasks into 1-hour chunks

### While Implementing
- **npm modules allowed:** Only through `https://esm.sh/NPM_MODULE_NAME` (unreliable, prefer Deno std)
- **No guessing:** If uncertain about behavior, research and verify
- **No blockers:** If stuck, break down further or try different approach
- **One thing at a time:** Finish current test file before starting next

### Missing Implementation Plan?
If you don't have clear steps for a task:
1. Research the builtin documentation
2. Create a breakdown with time estimates
3. Add the breakdown to this file as a new section
4. Get it reviewed before starting work

---

# Current Priority: Runtime Testing (40% → 80%)

**Status:** 42/102 function builtins tested (40%). Need 40 more to reach 80% (82 total).

**What's NOT done:** 60 builtins have zero or insufficient tests

**Critical Gap:** Type checking has ZERO dedicated tests (0/10 functions)

---

## What's NOT Implemented in Runtime

The following builtins are referenced but have gaps or need testing:

### Network Fetchers (Partially Complete)
- `fetchTarball` - Implemented but edge cases untested
- `fetchurl` - Implemented but edge cases untested
- `fetchGit` - Implemented but edge cases untested
- `fetchTree` - Partial (missing type='path', type='indirect')
- `fetchMercurial` - NOT implemented (optional)
- `fetchClosure` - NOT implemented (optional, very complex)

### Store Functions (Partially Complete)
- `storePath` - Implemented but untested
- `toFile` - Implemented but untested
- `toPath` - Implemented but untested
- `storeDir` - Implemented but untested
- `placeholder` - Implemented but untested

### Testing Strategy
Since network/store functions are implemented but untested, we're focusing on **testing existing implementations** first. This validates the code works before adding optional features.

**After testing reaches 80%, we can:**
1. Add optional builtins (fetchMercurial, fetchClosure)
2. Add fetchTree edge cases
3. Move to translator improvements

---

## Next 6 Test Files to Create

Create these test files in order. Each tests untested builtins against `nix repl` behavior.

### Task 1: Type Checking (3-4 hours) ⚡ START HERE
**File:** `main/tests/builtins_type_checking_test.js` (DOES NOT EXIST)

**Functions (10):** isNull, isBool, isInt, isFloat, isString, isList, isPath, isAttrs, isFunction, typeOf

**Minimum:** 50 tests (5 per function)

**Test in nix repl first:**
```nix
builtins.isNull null        # true
builtins.isNull 0           # false
builtins.isInt 42           # true
builtins.isInt 42.0         # false
builtins.isFloat 42.0       # true
builtins.isFloat 42         # false
builtins.isBool true        # true
builtins.isBool 1           # false
builtins.isString "hi"      # true
builtins.isString 42        # false
builtins.isList []          # true
builtins.isList {}          # false
builtins.isAttrs {}         # true
builtins.isAttrs []         # false
builtins.isPath ./foo       # true
builtins.isPath "/foo"      # false (string!)
builtins.isFunction (x: x)  # true
builtins.isFunction 42      # false
builtins.typeOf null        # "null"
builtins.typeOf true        # "bool"
builtins.typeOf 42          # "int"
builtins.typeOf 42.0        # "float"
builtins.typeOf "hi"        # "string"
builtins.typeOf []          # "list"
builtins.typeOf {}          # "set"
builtins.typeOf (x: x)      # "lambda"
builtins.typeOf ./foo       # "path"
```

**Key edge cases:**
- null vs 0 vs false vs "" (all different types!)
- BigInt (42n) vs Float (42.0) - CRITICAL: Nix distinguishes these
- Empty lists [] vs empty attrsets {}
- String "/foo" vs Path ./foo
- typeOf must return exactly "int"/"float"/"string"/"list"/"set"/"lambda"/"path"/"null"/"bool"

### Task 2: List Operations (5-7 hours) ⚡ CRITICAL
**File:** `main/tests/builtins_lists_comprehensive_test.js` (DOES NOT EXIST)

**Functions (8):** map, elem, elemAt, partition, sort, genList, concatLists, zipAttrsWith

**Note:** map is lazy (uses lazyMap proxy) - needs comprehensive testing with side effects
**Note:** filter, all, any, head, tail already tested but map/sort/partition need dedicated tests

**Minimum:** 48 tests (6 per function)

**Test in nix repl first:**
```nix
builtins.map (x: x * 2) [1 2 3]           # [2 4 6]
builtins.map (x: x * 2) []                # []
builtins.elem 2 [1 2 3]                   # true
builtins.elem 5 [1 2 3]                   # false
builtins.elemAt [10 20 30] 0              # 10
builtins.elemAt [10 20 30] 2              # 30
builtins.elemAt [10 20 30] 5              # ERROR: list index out of bounds
builtins.partition (x: x > 2) [1 2 3 4]   # { right = [3 4]; wrong = [1 2]; }
builtins.sort (a: b: a < b) [3 1 2]       # [1 2 3]
builtins.sort (a: b: a > b) [3 1 2]       # [3 2 1]
builtins.genList (x: x * x) 5             # [0 1 4 9 16]
builtins.concatLists [[1 2] [3 4] [5]]    # [1 2 3 4 5]
builtins.concatLists []                   # []
builtins.zipAttrsWith (name: values: builtins.toString values) [{a=1;} {a=2; b=3;}]
  # { a = "1 2"; b = "3"; }
```

**Key edge cases:**
- map laziness: Map should NOT evaluate elements until accessed
- elemAt out of bounds must error
- partition with empty list: `{ right = []; wrong = []; }`
- sort stability: Equal elements keep original order
- sort with < vs ≤: Must use strictly-less comparator
- genList with n=0: Returns []
- concatLists with nested empty lists: [[]] → []
- zipAttrsWith with conflicting keys: Values become lists

### Task 3: Attrset Operations (3-5 hours)
**File:** `main/tests/builtins_attrs_comprehensive_test.js` (DOES NOT EXIST)

**Functions (5):** getAttr, attrNames, attrValues, catAttrs, genericClosure

**Note:** hasAttr fully tested (100%). mapAttrs, removeAttrs, listToAttrs tested (100%)
**CRITICAL:** attrNames MUST return keys in sorted order (Nix requirement)

**Minimum:** 30 tests (6 per function)

**Test in nix repl first:**
```nix
builtins.getAttr "foo" {foo=1; bar=2;}           # 1
builtins.getAttr "missing" {foo=1;}              # ERROR: attribute 'missing' missing
builtins.attrNames {z=1; a=2; m=3;}              # ["a" "m" "z"] - SORTED!
builtins.attrNames {}                            # []
builtins.attrValues {z=1; a=2; m=3;}             # [2 3 1] - sorted by key order
builtins.catAttrs "x" [{x=1; y=2;} {x=3;} {y=4;}]  # [1 3]
builtins.genericClosure {
  startSet = [{key=1; value="a";}];
  operator = x: if x.key < 3 then [{key=x.key+1; value=x.value+"x";}] else [];
}  # [{key=1; value="a";} {key=2; value="ax";} {key=3; value="axx";}]
```

**Key edge cases:**
- getAttr with missing key MUST throw error
- attrNames MUST return keys in SORTED order (alphabetical)
- attrValues MUST return values in SORTED KEY order (not insertion order!)
- catAttrs with missing attributes: Skips those attrsets
- genericClosure with cycles: Uses "key" attribute to detect duplicates
- genericClosure with empty startSet: Returns []

### Task 4: String Operations (3-4 hours)
**File:** `main/tests/builtins_strings_comprehensive_test.js` (DOES NOT EXIST)

**Functions (6):** concatStringsSep, split, splitVersion, baseNameOf, dirOf, toString

**Note:** substring, stringLength, match, replaceStrings already tested (100%)

**Minimum:** 36 tests (6 per function)

**Test in nix repl first:**
```nix
builtins.concatStringsSep ", " ["a" "b" "c"]     # "a, b, c"
builtins.concatStringsSep "" ["a" "b"]           # "ab"
builtins.split "([0-9]+)" "foo123bar456"         # ["foo" ["123"] "bar" ["456"] ""]
builtins.split "x" "axbxc"                       # ["a" [] "b" [] "c"]
builtins.splitVersion "1.2.3-beta"               # ["1" "2" "3" "beta"]
builtins.splitVersion "hello"                    # ["hello"]
builtins.baseNameOf "/foo/bar/baz.txt"           # "baz.txt"
builtins.baseNameOf "/foo/bar/"                  # "bar"
builtins.baseNameOf "/"                          # ""
builtins.dirOf "/foo/bar/baz.txt"                # "/foo/bar"
builtins.dirOf "/foo"                            # "/"
builtins.dirOf "/"                               # "/"
builtins.toString 42                             # "42"
builtins.toString 42.5                           # "42.5"
builtins.toString true                           # "1"
builtins.toString false                          # "0"
builtins.toString null                           # ""
builtins.toString [1 2 3]                        # "1 2 3"
```

**Key edge cases:**
- split returns alternating strings and capture groups: ["str" ["capture"] "str" ...]
- split with no captures: ["str" [] "str" [] "str"]
- split ending on separator: Adds empty string at end
- splitVersion splits on "." and "-": "1.2-beta" → ["1" "2" "beta"]
- baseNameOf with trailing slash: "/foo/bar/" → "bar"
- baseNameOf root: "/" → ""
- dirOf with single component: "/foo" → "/"
- dirOf root: "/" → "/" (stays root)
- toString lists: Space-separated recursively flattened
- toString attrsets: ERROR "cannot coerce set to string"

### Task 5: Math & Bitwise (3-4 hours)
**File:** `main/tests/builtins_math_comprehensive_test.js` (DOES NOT EXIST)

**Functions (8):** sub, mul, lessThan, ceil, floor, bitAnd, bitOr, bitXor

**Note:** add, div already tested (100%)

**Minimum:** 40 tests (5 per function)

**Test in nix repl first:**
```nix
builtins.sub 10 3                    # 7
builtins.sub 10.5 3.2                # 7.3
builtins.sub 10.5 3                  # 7.5 (mixed int/float → float)
builtins.mul 6 7                     # 42
builtins.mul 2.5 4.0                 # 10.0
builtins.lessThan 5 10               # true
builtins.lessThan 10 5               # false
builtins.lessThan 5 5                # false
builtins.ceil 3.2                    # 4
builtins.ceil 3.9                    # 4
builtins.ceil (-3.2)                 # -3
builtins.ceil 5                      # 5 (int unchanged)
builtins.floor 3.2                   # 3
builtins.floor 3.9                   # 3
builtins.floor (-3.2)                # -4
builtins.bitAnd 12 10                # 8  (1100 & 1010 = 1000)
builtins.bitOr 12 10                 # 14 (1100 | 1010 = 1110)
builtins.bitXor 12 10                # 6  (1100 ^ 1010 = 0110)
```

**Key edge cases:**
- sub/mul with BigInt: 42 - 10 returns BigInt (32n)
- sub/mul with Float: 42.0 - 10.0 returns Float (32.0)
- sub/mul mixed: 42 - 10.0 returns Float (32.0) - coerces to float!
- lessThan works on ints, floats, strings: "abc" < "def" → true
- ceil/floor on BigInt: Returns input unchanged (already integer)
- ceil/floor on negative: ceil(-3.2) → -3 (toward zero), floor(-3.2) → -4 (away from zero)
- bitwise operations require BigInt: bitAnd 12.5 10 → ERROR
- bitwise with negative numbers: Uses two's complement

### Task 6: Path/File Operations (4-6 hours)
**File:** `main/tests/builtins_paths_comprehensive_test.js` (DOES NOT EXIST)

**Functions (10):** pathExists, readFile, readDir, readFileType, findFile, toFile, storePath, storeDir, nixPath, placeholder

**Note:** path, toPath, filterSource already tested (100%)

**Minimum:** 50 tests (5 per function)

**Test in nix repl first:**
```nix
builtins.pathExists ./foo.txt                    # true/false
builtins.pathExists /nonexistent                 # false
builtins.readFile ./test.txt                     # "file contents"
builtins.readDir ./mydir                         # { "file.txt" = "regular"; "subdir" = "directory"; }
builtins.readFileType ./foo.txt                  # "regular" | "directory" | "symlink" | "unknown"
builtins.findFile [{path=./.; prefix="";}] "nixpkgs"  # Search path for "nixpkgs"
builtins.toFile "foo.txt" "contents"             # "/nix/store/abc...def-foo.txt"
builtins.storePath "/nix/store/abc...def-foo"    # Validates store path
builtins.storeDir                                # "/nix/store" (constant)
builtins.nixPath                                 # [{path="/nix/var/..."; prefix="nixpkgs";}]
builtins.placeholder "out"                       # "/1rz4g4z...0000-out" (derivation placeholder)
```

**Key edge cases:**
- pathExists with relative path: Resolved relative to current file
- pathExists with symlink: Returns true if target exists
- readFile with binary data: May fail or return garbled text
- readFile with missing file: ERROR
- readDir with file (not directory): ERROR
- readDir returns types: "regular", "directory", "symlink", "unknown"
- readFileType with missing file: ERROR or "unknown"?
- findFile with empty search path: Returns error
- toFile creates store path with hash of contents
- storePath validates path is in /nix/store/ format
- placeholder generates deterministic hash for output name

---

## Test Process

1. **Test in nix repl first** - Understand expected behavior
2. **Write Deno.test()** - Match Nix behavior exactly
3. **Run tests:** `deno test --allow-all <file>`
4. **Fix bugs** discovered in runtime.js

## Run Tests

```bash
# All tests
deno test --allow-all

# Specific category
./test.sh types      # Task 1
./test.sh lists      # Task 2
./test.sh attrs      # Task 3
./test.sh strings    # Task 4
./test.sh math       # Task 5
./test.sh paths      # Task 6

# Specific file
deno test --allow-all main/tests/<filename>.js
```

---

## Time to 80% Coverage

**Current:** 42/102 tested (41%)
**Target:** 82/102 tested (80%)
**Need:** 40 more builtins tested

**Tasks 1-5:** 37 functions, 17-22 hours → 77% coverage
**Task 6:** 10 functions, 4-6 hours → 86% coverage

**Total:** 21-28 hours of focused testing work to reach 80%+

---

## Additional Untested Builtins (Beyond Tasks 1-6)

### Control Flow (2 builtins, 1 hour)
- abort, traceVerbose, addErrorContext
- **Note:** throw, trace, seq, deepSeq, tryEval, break already tested

### String Context (5 builtins, 2-3 hours)
- getContext, hasContext, appendContext, unsafeDiscardStringContext, hashString
- **Note:** These are advanced features for tracking derivation dependencies

### Advanced Operations (4 builtins, 2-3 hours)
- getEnv, unsafeGetAttrPos, unsafeDiscardOutputDependency, outputOf

### Derivations (1 builtin, 1 hour)
- derivationStrict (identical to derivation but needs test to verify)

---

## References

- **Nix 2.18 Builtins:** https://nix.dev/manual/nix/2.18/language/builtins.html
- **Noogle (search):** https://noogle.dev
- **Nix source:** https://github.com/NixOS/nix

---

## After 80% Testing (Future Work)

### Optional Builtins (Not required, implement only if needed)
- fetchMercurial (2-3 days)
- fetchClosure (5-7 days, VERY COMPLEX)
- getFlake (5-7 days, VERY COMPLEX)

### Translator Edge Cases (2-3 days)
- Advanced pattern matching
- String escape sequences
- Path literal edge cases

### nixpkgs.lib Testing (4-6 days)
- Test high-value files: lists.nix, attrsets.nix, options.nix
- Goal: 50%+ coverage of nixpkgs.lib

---

## CRITICAL REMINDERS - READ BEFORE EVERY TASK

### Documentation-Driven Development
1. **ALWAYS read Nix docs FIRST:** https://nix.dev/manual/nix/2.18/language/builtins.html
2. **Search for the specific builtin** you're implementing (e.g., builtins.fetchClosure)
3. **Test in `nix repl` before writing code** - Understand exact behavior with edge cases
4. **Look at Nix source code** if docs are unclear: https://github.com/NixOS/nix
5. **Use Noogle for examples:** https://noogle.dev

### npm Modules (Use Sparingly)
- **Allowed via esm.sh only:** `import foo from "https://esm.sh/foo@1.2.3"`
- **Warning:** esm.sh doesn't always work, prefer Deno standard library
- **Test before committing:** Some npm modules have WASM or native dependencies that fail

### Your Role
- **Senior developer:** No such thing as "blocked" - break down tasks into smaller steps
- **Focus on gaps:** Only report what's NOT working, never achievements
- **Research first:** Don't guess behavior, verify with documentation

---

## Quick Reference: What Each Test File Tests

| Test File | Builtins Tested | Status |
|-----------|-----------------|--------|
| builtins_core_test.js | groupBy, mapAttrs, removeAttrs, listToAttrs, intersectAttrs, concatMap, trace, throw, seq, deepSeq, tryEval, parseDrvName, compareVersions | ✅ Passing |
| builtins_type_checking_test.js | isNull, isBool, isInt, isFloat, isString, isList, isPath, isAttrs, isFunction, typeOf | ❌ DOES NOT EXIST |
| builtins_lists_comprehensive_test.js | map, elem, elemAt, partition, sort, genList, concatLists, zipAttrsWith | ❌ DOES NOT EXIST |
| builtins_attrs_comprehensive_test.js | getAttr, attrNames, attrValues, catAttrs, genericClosure | ❌ DOES NOT EXIST |
| builtins_strings_comprehensive_test.js | concatStringsSep, split, splitVersion, baseNameOf, dirOf, toString | ❌ DOES NOT EXIST |
| builtins_math_comprehensive_test.js | sub, mul, lessThan, ceil, floor, bitAnd, bitOr, bitXor | ❌ DOES NOT EXIST |
| builtins_paths_comprehensive_test.js | pathExists, readFile, readDir, readFileType, findFile, toFile, storePath, storeDir, nixPath, placeholder | ❌ DOES NOT EXIST |

---

## IMMEDIATE NEXT STEP

**Create `main/tests/builtins_type_checking_test.js`** (3-4 hours)
- Test in nix repl first: `builtins.isInt 42`, `builtins.isInt 42.0`, etc.
- 50+ tests covering all 10 type functions
- Focus on edge cases: null, undefined, 0, false, "", BigInt vs Number

**Process:**
1. Open `nix repl` in terminal
2. Test each function with various inputs (see Task 1 examples below)
3. Note exact behavior (return values, error messages)
4. Create Deno test file matching Nix behavior
5. Run: `deno test --allow-all main/tests/builtins_type_checking_test.js`
6. Fix any bugs discovered in runtime.js
7. Verify all tests pass
