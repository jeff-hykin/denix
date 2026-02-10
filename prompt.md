# Denix Development Priorities

## ⚠️ CRITICAL INSTRUCTIONS - READ FIRST

**Your job is to focus on what is NOT implemented and NOT working. Only report what remains to be done. Do not report what you accomplished. You are a senior level developer, there is no such thing as a blocker. Break down large tasks into smaller tasks.**

**WORK ORDER (MUST FOLLOW THIS SEQUENCE):**
1. **Runtime (main/runtime.js)** - Finish network fetchers and store functions FIRST
2. **Translator (main.js)** - Only work on this AFTER runtime is 100% complete
3. **Nix-lib tests** - Only work on these AFTER translator is fully implemented

**IMPLEMENTATION REQUIREMENTS:**
- **ALWAYS read documentation while implementing** - Check https://nix.dev/manual/nix/2.28/language/builtins.html for each builtin
- **Search the internet** for additional documentation and examples (e.g., "nix fetchClosure example")
- **Test in nix repl** before implementing to understand exact behavior
- **Use npm modules ONLY via https://esm.sh/NPM_MODULE_NAME** (doesn't always work, be prepared for alternatives)
- **Break down complex tasks** - If a task seems large, decompose it into 2-4 hour chunks
- **No blockers exist** - If stuck, try a different approach or ask for clarification

**BEFORE STARTING ANY TASK:**
1. Read the relevant Nix documentation
2. Test the builtin in `nix repl` to understand its behavior
3. Search for real-world usage examples
4. Understand the implementation requirements
5. Plan the implementation steps

**IF IMPLEMENTATION PLAN IS MISSING:**
- If a task lacks detailed steps, **create intermediate steps FIRST**
- Break down the task into 2-4 hour chunks
- Document dependencies and prerequisites
- Add the plan to this file under a new priority section
- Example: If "implement fetchClosure" has no plan, research it, break it down into phases (parse input → validate → fetch from cache → verify signatures → copy to store), estimate each phase, then add as Priority sections

---

## Quick Reference - 53 Untested Builtins

**High Priority (26 functions - Tasks 1-4):**
- Math/Bitwise (8): sub, mul, lessThan, ceil, floor, bitAnd, bitOr, bitXor
- Attrset (5): getAttr, attrNames, attrValues, catAttrs, genericClosure
- String (7): split, match, concatStringsSep, splitVersion, baseNameOf, dirOf, toString
- Path/File (8): pathExists, readFile, readDir, readFileType, findFile, toFile, toPath (+ baseNameOf duplicate)

**Medium Priority (14 functions):**
- Hash: hashString, hashFile, hashPath (3)
- Context: getContext, hasContext, appendContext, unsafeDiscardStringContext (4)
- Advanced attrset: functionArgs, zipAttrsWith (2)
- Advanced list: partition, groupBy (2) - groupBy IS tested, partition not
- Lazy eval: addErrorContext, abort (2)
- Flakes: parseFlakeRef, flakeRefToString (1 - both already tested in e2e)

**Lower Priority (13 functions):**
- Store: storePath, isStorePath, outputOf (3) - may not be needed
- Fetch optional: fetchMercurial, fetchClosure, getFlake (3) - NOT IMPLEMENTED
- Advanced: scopedImport, exec, placeholder (3) - scopedImport already tested
- Other: currentSystem, currentTime, unsafeGetAttrPos, break (4)

**Already Tested (56 functions):**
- Type checking: isAttrs, isBool, isFloat, isList, isInt, isNull, isFunction, isString, isPath (9)
- Core: add, div, trace, throw, seq, deepSeq, tryEval, abort, mapAttrs, removeAttrs, etc. (12)
- Lists: map, filter, length, head, tail, elem, all, any, foldl, foldr, etc. (13)
- Strings: substring, stringLength, replaceStrings, toUpper, toLower, etc. (4)
- Attrset basics: hasAttr, mapAttrs, removeAttrs, listToAttrs, intersectAttrs (5)
- Imports: import, scopedImport (2)
- Fetch: fetchGit, fetchTarball, fetchurl, fetchTree, path, filterSource (6)
- Derivations: derivation, derivationStrict (2)
- JSON/TOML: toJSON, fromJSON, fromTOML (3)

---

## 🔴 PRIORITY 0: FIX DERIVATION BUGS (1-2h) - DO THIS FIRST

**STATUS:** 9 out of 10 derivation tests FAILING

**Test Command:**
```bash
deno run --allow-all main/tests/derivation/001_basic_tests.js
```

### Bug 1 - Store Path Hash (Tests 001-008 failing)

**Root cause:** Output names must be in `env` object with empty strings BEFORE computing hash (Nix includes them in serialization). Currently the code adds them to `env` AFTER computing the hash (line 1774).

**Location:** `main/runtime.js` lines 1754-1775

**Fix:** Add these 3 lines BEFORE line 1755 (before creating drvStructure):
```javascript
// Add empty output placeholders to env BEFORE computing hash (Nix behavior)
for (const outputName of outputNames) {
    env[outputName] = ""
}
```

**Explanation:** When Nix computes the derivation hash, it includes the output names in the `env` attribute with empty string values. We currently compute the hash WITHOUT these entries, then add them AFTER. This causes hash mismatch.

### Bug 2 - toJSON Crash (Test 009 failing)

**Root cause:** When `toJSON` encounters a derivation object, it hits the "function" case first (because derivations have callable properties) and throws an error. The derivation check happens AFTER in the "object" case.

**Location:** `main/runtime.js` lines 308-320

**Current code:**
```javascript
case "function":
    throw new NixError(`error: cannot convert a function to JSON`)
case "object":
    // ... later checks for derivation.type === "derivation"
```

**Fix:** Move derivation check to BEFORE function case (lines 306-309):
```javascript
case "bigint":
    return JSON.stringify(`${value}`-0)
// Check for derivation BEFORE checking function
case "object":
    if (value != null && value.type === "derivation") {
        return JSON.stringify(value.outPath)
    }
    // Fall through to next check
case "function":
    throw new NixError(`error: cannot convert a function to JSON`)
case "object":  // Continue with other object checks
    if (value == null) {
```

**Alternative simpler fix:** Just add derivation check at start of function case:
```javascript
case "function":
    // Derivations may appear as functions but should serialize to outPath
    if (value && typeof value === "object" && value.type === "derivation") {
        return JSON.stringify(value.outPath)
    }
    throw new NixError(`error: cannot convert a function to JSON`)
```

**Expected Result:** All 10/10 tests passing

**Time estimate:** 30-60 minutes (fix + verify all tests pass)

---

## PRIORITY 1: TEST MATH/BITWISE OPERATIONS (3-4h)

**File:** Create `main/tests/builtins_math_bitwise_test.js`

**Status:** ZERO tests exist for these 8 functions

**Functions to test (8 total):**
1. `sub` (line 218) - Subtraction: `builtins.sub 10 3` → 7
2. `mul` (line 232) - Multiplication: `builtins.mul 2.5 4` → 10.0
3. `lessThan` (line 246) - Comparison: `builtins.lessThan 5 10` → true
4. `ceil` (line 689) - Round up: `builtins.ceil 3.2` → 4
5. `floor` (line 698) - Round down: `builtins.floor 3.8` → 3
6. `bitAnd` (line 707) - Bitwise AND: `builtins.bitAnd 5 3` → 1
7. `bitOr` (line 712) - Bitwise OR: `builtins.bitOr 4 2` → 6
8. `bitXor` (line 717) - Bitwise XOR: `builtins.bitXor 5 3` → 6

**Test requirements (50-80 tests total, 5-10 per function):**
- **sub/mul**: BigInt + BigInt → BigInt, Float + Float → Float, Mixed → Float
- **lessThan**: Both types, equals case, negative numbers
- **ceil/floor**: Positive, negative, already integer, very large/small
- **bitAnd/bitOr/bitXor**: Basic ops, identity (x & 0 = 0), zero cases, negative numbers

**Validation commands (run in `nix repl`):**
```bash
nix repl
> builtins.sub 10 3              # 7
> builtins.sub 10.5 3.2          # 7.3
> builtins.mul 3 4               # 12
> builtins.mul 2.5 4             # 10.0
> builtins.lessThan 5 10         # true
> builtins.lessThan 10 10        # false
> builtins.ceil 3.2              # 4
> builtins.ceil (-3.2)           # -3
> builtins.floor 3.8             # 3
> builtins.floor (-3.8)          # -4
> builtins.bitAnd 5 3            # 1 (binary: 101 & 011 = 001)
> builtins.bitOr 4 2             # 6 (binary: 100 | 010 = 110)
> builtins.bitXor 5 3            # 6 (binary: 101 ^ 011 = 110)
> builtins.bitAnd 15 0           # 0
```

**Test file template:**
```javascript
import { assertEquals, assertThrows } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { builtins } from "../runtime.js"

// ============================================================================
// Arithmetic Operations
// ============================================================================

Deno.test("sub - integers", () => {
    assertEquals(builtins.sub(10n, 3n), 7n)
    assertEquals(builtins.sub(0n, 5n), -5n)
})

Deno.test("sub - floats", () => {
    assertEquals(builtins.sub(10.5, 3.2), 7.3)
})

Deno.test("mul - integers", () => {
    assertEquals(builtins.mul(3n, 4n), 12n)
    assertEquals(builtins.mul(-2n, 5n), -10n)
})

Deno.test("mul - floats", () => {
    assertEquals(builtins.mul(2.5, 4), 10.0)
})

Deno.test("lessThan - integers", () => {
    assertEquals(builtins.lessThan(5n, 10n), true)
    assertEquals(builtins.lessThan(10n, 10n), false)
    assertEquals(builtins.lessThan(15n, 10n), false)
})

// ============================================================================
// Rounding Operations
// ============================================================================

Deno.test("ceil - positive", () => {
    assertEquals(builtins.ceil(3.2), 4)
    assertEquals(builtins.ceil(3.0), 3)
})

Deno.test("ceil - negative", () => {
    assertEquals(builtins.ceil(-3.2), -3)
    assertEquals(builtins.ceil(-3.8), -3)
})

Deno.test("floor - positive", () => {
    assertEquals(builtins.floor(3.8), 3)
    assertEquals(builtins.floor(3.0), 3)
})

Deno.test("floor - negative", () => {
    assertEquals(builtins.floor(-3.2), -4)
    assertEquals(builtins.floor(-3.8), -4)
})

// ============================================================================
// Bitwise Operations
// ============================================================================

Deno.test("bitAnd - basic operations", () => {
    assertEquals(builtins.bitAnd(5n, 3n), 1n)  // 101 & 011 = 001
    assertEquals(builtins.bitAnd(15n, 0n), 0n) // anything & 0 = 0
})

Deno.test("bitOr - basic operations", () => {
    assertEquals(builtins.bitOr(4n, 2n), 6n)   // 100 | 010 = 110
    assertEquals(builtins.bitOr(5n, 0n), 5n)   // anything | 0 = anything
})

Deno.test("bitXor - basic operations", () => {
    assertEquals(builtins.bitXor(5n, 3n), 6n)  // 101 ^ 011 = 110
    assertEquals(builtins.bitXor(5n, 5n), 0n)  // x ^ x = 0
})
```

**Time estimate:** 3-4 hours (write tests + fix any bugs found)

---

## PRIORITY 2: TEST ATTRSET OPERATIONS (2-3h)

**File:** Create `main/tests/builtins_attrset_ops_test.js`

**Status:** ZERO tests exist for these 5 critical functions (mapAttrs, removeAttrs, listToAttrs, intersectAttrs ARE tested)

**Functions to test (5 total):**
1. `getAttr` (line 806) - Get attribute value by name string
2. `attrNames` (line 827) - Get sorted list of attribute names
3. `attrValues` (line 832) - Get list of values (in sorted key order)
4. `catAttrs` (line 837) - Extract same attribute from list of attrsets
5. `genericClosure` (line 847) - Compute transitive closure (COMPLEX!)

**Test requirements (40-50 tests total):**
- **getAttr**: Basic, missing key (error), nested attrsets, null value
- **attrNames**: Empty, single, multiple (verify sorting), special chars in keys
- **attrValues**: Empty, verify order matches sorted keys, mixed types
- **catAttrs**: Empty list, some missing attr, all missing, nested attrsets
- **genericClosure**: Basic graph, circular refs, complex dependencies (10+ tests)

**Validation commands (run in `nix repl`):**
```bash
nix repl
> builtins.getAttr "x" { x = 1; y = 2; }         # 1
> builtins.getAttr "z" { x = 1; }                # error: attribute 'z' missing
> builtins.attrNames { c = 3; a = 1; b = 2; }    # ["a" "b" "c"] (sorted!)
> builtins.attrNames {}                          # []
> builtins.attrValues { c = 3; a = 1; b = 2; }   # [1 2 3] (sorted by key)
> builtins.catAttrs "x" [{x=1;} {y=2;} {x=3;}]   # [1 3] (skips missing)
> builtins.catAttrs "z" [{x=1;} {y=2;}]          # [] (all missing)

# genericClosure example - dependency graph
> builtins.genericClosure {
    startSet = [{ key = "a"; deps = ["b" "c"]; }];
    operator = item: map (dep: { key = dep; deps = []; }) item.deps;
  }
# Returns all reachable nodes: [{ key="a"; deps=["b" "c"]; } { key="b"; deps=[]; } { key="c"; deps=[]; }]
```

**Test file template:**
```javascript
import { assertEquals, assertThrows } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { builtins } from "../runtime.js"
import { NixError } from "../errors.js"

// ============================================================================
// Attribute Access
// ============================================================================

Deno.test("getAttr - basic access", () => {
    const obj = { x: 1, y: 2 }
    assertEquals(builtins.getAttr("x", obj), 1)
    assertEquals(builtins.getAttr("y", obj), 2)
})

Deno.test("getAttr - missing attribute throws", () => {
    const obj = { x: 1 }
    assertThrows(
        () => builtins.getAttr("z", obj),
        NixError,
        "attribute 'z' missing"
    )
})

// ============================================================================
// Attribute Introspection
// ============================================================================

Deno.test("attrNames - sorted keys", () => {
    const obj = { c: 3, a: 1, b: 2 }
    assertEquals(builtins.attrNames(obj), ["a", "b", "c"])
})

Deno.test("attrNames - empty object", () => {
    assertEquals(builtins.attrNames({}), [])
})

Deno.test("attrValues - values in sorted key order", () => {
    const obj = { c: 3, a: 1, b: 2 }
    assertEquals(builtins.attrValues(obj), [1, 2, 3])  // sorted by key name
})

// ============================================================================
// List Processing
// ============================================================================

Deno.test("catAttrs - extract from multiple objects", () => {
    const list = [
        { x: 1, y: 10 },
        { y: 20 },          // no x
        { x: 3, y: 30 }
    ]
    assertEquals(builtins.catAttrs("x", list), [1, 3])  // skips missing
})

Deno.test("catAttrs - all missing returns empty", () => {
    const list = [{ a: 1 }, { b: 2 }]
    assertEquals(builtins.catAttrs("x", list), [])
})

// ============================================================================
// Generic Closure - Transitive Dependencies
// ============================================================================

Deno.test("genericClosure - simple graph", () => {
    const result = builtins.genericClosure({
        startSet: [{ key: "a", value: 1 }],
        operator: (item) => []  // no dependencies
    })
    assertEquals(result.length, 1)
    assertEquals(result[0].key, "a")
})

Deno.test("genericClosure - with dependencies", () => {
    const result = builtins.genericClosure({
        startSet: [{ key: "a", deps: ["b", "c"] }],
        operator: (item) => (item.deps || []).map(d => ({ key: d, deps: [] }))
    })
    assertEquals(result.length, 3)
    const keys = result.map(x => x.key).sort()
    assertEquals(keys, ["a", "b", "c"])
})

Deno.test("genericClosure - handles cycles", () => {
    // Should not infinite loop on circular dependencies
    const result = builtins.genericClosure({
        startSet: [{ key: "a", next: "b" }],
        operator: (item) => {
            if (item.next === "b") return [{ key: "b", next: "a" }]  // cycle!
            if (item.next === "a") return [{ key: "a", next: "b" }]
            return []
        }
    })
    // Should deduplicate by key
    assertEquals(result.length, 2)
    const keys = result.map(x => x.key).sort()
    assertEquals(keys, ["a", "b"])
})
```

**Time estimate:** 2-3 hours (genericClosure is complex, may need debugging)

---

## PRIORITY 3: TEST STRING OPERATIONS (3-4h)

**File:** Create `main/tests/builtins_string_ops_test.js`

**Status:** ZERO dedicated tests (concatStringsSep used in integration tests but not unit tested)

**Functions to test (7 total):**
1. `split` (line 400) - Split string by regex pattern
2. `match` (line 376) - Match regex and return capture groups
3. `concatStringsSep` (line 437) - Join strings with separator
4. `splitVersion` (line 2010) - Split version string into components
5. `baseNameOf` (line 1312) - Extract basename from path
6. `dirOf` (line 1321) - Extract directory from path
7. `toString` (line 261) - Convert any value to string

**Test requirements (50-70 tests total):**
- **split**: Simple split, regex with captures, empty string, no matches, multiple matches
- **match**: Full match, partial, multiple groups, non-matching, null result
- **concatStringsSep**: Empty list, single item, multiple items, empty strings
- **splitVersion**: Simple (1.2.3), complex (1.2.3-alpha4.pre), edge cases
- **baseNameOf**: Absolute path, relative, no slashes, trailing slash, root
- **dirOf**: Similar edge cases as baseNameOf
- **toString**: All types (int, float, bool, null, list, attrset, path, derivation)

**Validation commands (run in `nix repl`):**
```bash
nix repl
# split - Returns list alternating non-matching and matching parts
> builtins.split "\\." "a.b.c"
# ["a" ["." ] "b" ["." ] "c"] (separator is in sublist!)

# match - Returns list of capture groups (or null if no match)
> builtins.match "(.*)@(.*)" "foo@bar"       # ["foo" "bar"]
> builtins.match "(.*)@(.*)" "no-at-sign"    # null

# concatStringsSep - Simple join
> builtins.concatStringsSep "," ["a" "b"]    # "a,b"
> builtins.concatStringsSep "" ["a" "b"]     # "ab"

# splitVersion - Split on dots and non-numeric boundaries
> builtins.splitVersion "1.2.3"              # ["1" "2" "3"]
> builtins.splitVersion "1.2.3-alpha"        # ["1" "2" "3" "alpha"]
> builtins.splitVersion "2024.1.pre123"      # ["2024" "1" "pre123"]

# baseNameOf - Extract filename
> builtins.baseNameOf "/path/to/file.txt"    # "file.txt"
> builtins.baseNameOf "/path/to/dir/"        # "dir"
> builtins.baseNameOf "file.txt"             # "file.txt"
> builtins.baseNameOf "/"                    # ""

# dirOf - Extract directory
> builtins.dirOf "/path/to/file.txt"         # "/path/to"
> builtins.dirOf "/path"                     # "/"
> builtins.dirOf "/"                         # "/"
> builtins.dirOf "file.txt"                  # "."

# toString - Convert various types
> builtins.toString 123                      # "123"
> builtins.toString true                     # "1"
> builtins.toString false                    # ""  (empty string!)
> builtins.toString null                     # ""  (empty string!)
> builtins.toString [1 2 3]                  # "1 2 3" (space-separated)
> builtins.toString /some/path               # "/some/path"
```

**Test file template:**
```javascript
import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { builtins } from "../runtime.js"
import { Path } from "../classes.js"

// ============================================================================
// Regex Operations
// ============================================================================

Deno.test("split - simple delimiter", () => {
    const result = builtins.split("\\.", "a.b.c")
    // Nix format: non-match, [match], non-match, [match], non-match
    assertEquals(result.length, 5)
    assertEquals(result[0], "a")
    assertEquals(result[1], ["." ])  // captured groups in sublist
    assertEquals(result[2], "b")
    assertEquals(result[3], ["." ])
    assertEquals(result[4], "c")
})

Deno.test("split - no matches", () => {
    const result = builtins.split("\\.", "abc")
    assertEquals(result, ["abc"])  // no split, just original string
})

Deno.test("match - successful match", () => {
    const result = builtins.match("(.*)@(.*)", "foo@bar")
    assertEquals(result, ["foo", "bar"])
})

Deno.test("match - no match returns null", () => {
    const result = builtins.match("(.*)@(.*)", "no-at-sign")
    assertEquals(result, null)
})

// ============================================================================
// String Joining
// ============================================================================

Deno.test("concatStringsSep - basic join", () => {
    assertEquals(builtins.concatStringsSep(",", ["a", "b", "c"]), "a,b,c")
})

Deno.test("concatStringsSep - empty separator", () => {
    assertEquals(builtins.concatStringsSep("", ["a", "b"]), "ab")
})

Deno.test("concatStringsSep - empty list", () => {
    assertEquals(builtins.concatStringsSep(",", []), "")
})

// ============================================================================
// Version Parsing
// ============================================================================

Deno.test("splitVersion - simple version", () => {
    assertEquals(builtins.splitVersion("1.2.3"), ["1", "2", "3"])
})

Deno.test("splitVersion - with prerelease", () => {
    const result = builtins.splitVersion("1.2.3-alpha")
    // Should split on dots and at letter/number boundaries
    assertEquals(result, ["1", "2", "3", "alpha"])
})

// ============================================================================
// Path Manipulation
// ============================================================================

Deno.test("baseNameOf - absolute path", () => {
    assertEquals(builtins.baseNameOf("/path/to/file.txt"), "file.txt")
})

Deno.test("baseNameOf - relative path", () => {
    assertEquals(builtins.baseNameOf("dir/file.txt"), "file.txt")
})

Deno.test("baseNameOf - no directory", () => {
    assertEquals(builtins.baseNameOf("file.txt"), "file.txt")
})

Deno.test("baseNameOf - root", () => {
    assertEquals(builtins.baseNameOf("/"), "")
})

Deno.test("dirOf - absolute path", () => {
    assertEquals(builtins.dirOf("/path/to/file"), "/path/to")
})

Deno.test("dirOf - single level", () => {
    assertEquals(builtins.dirOf("/path"), "/")
})

Deno.test("dirOf - relative", () => {
    assertEquals(builtins.dirOf("dir/file"), "dir")
})

Deno.test("dirOf - no directory", () => {
    assertEquals(builtins.dirOf("file"), ".")
})

// ============================================================================
// Type Conversion
// ============================================================================

Deno.test("toString - numbers", () => {
    assertEquals(builtins.toString(123n), "123")
    assertEquals(builtins.toString(45.6), "45.6")
})

Deno.test("toString - booleans", () => {
    assertEquals(builtins.toString(true), "1")
    assertEquals(builtins.toString(false), "")  // empty string!
})

Deno.test("toString - null", () => {
    assertEquals(builtins.toString(null), "")  // empty string!
})

Deno.test("toString - list (space-separated)", () => {
    assertEquals(builtins.toString([1n, 2n, 3n]), "1 2 3")
})

Deno.test("toString - path", () => {
    const path = new Path("/some/path")
    assertEquals(builtins.toString(path), "/some/path")
})
```

**Important quirks to test:**
- `split` returns list with captures in sublists: `["a", ["."], "b"]` not `["a", "b"]`
- `toString(false)` and `toString(null)` return `""` not `"false"`/`"null"`
- `toString` on lists is space-separated: `[1 2 3]` → `"1 2 3"`
- `splitVersion` handles both dots and letter/number boundaries

**Time estimate:** 3-4 hours

---

## PRIORITY 4: TEST PATH/FILE OPERATIONS (4-5h)

**File:** Create `main/tests/builtins_path_file_ops_test.js`

**Status:** ZERO tests exist for these 8 functions

**Setup required:** Create test fixtures first:
```bash
mkdir -p main/tests/fixtures/pathops_test/subdir
echo "test content" > main/tests/fixtures/pathops_test/file.txt
echo "line1" > main/tests/fixtures/pathops_test/multiline.txt
echo "line2" >> main/tests/fixtures/pathops_test/multiline.txt
ln -s file.txt main/tests/fixtures/pathops_test/symlink.txt 2>/dev/null || true
```

**Functions to test (8 total):**
1. `pathExists` (line 1297) - Check if path exists (file, dir, symlink)
2. `readFile` (line 1330) - Read entire file contents as string
3. `readDir` (line 1344) - List directory entries with types
4. `readFileType` (line 1359) - Get file type (regular/directory/symlink/unknown)
5. `findFile` (line 1394) - Search for file in search path
6. `toFile` (line 1525) - Write file to Nix store and return path
7. `toPath` (line 1537) - Convert string to Path object
8. `baseNameOf` (line 1312) - Extract filename (already in string ops, may skip)

**Test requirements (60-80 tests total):**
- **pathExists**: File exists, doesn't exist, directory, symlink, parent dir missing
- **readFile**: Small file, empty file, multiline, missing file (error), binary file
- **readDir**: Empty dir, with files, with subdirs, symlinks, missing dir (error)
- **readFileType**: Regular file, directory, symlink, missing (error)
- **findFile**: Found in search path, not found, multiple paths, relative/absolute
- **toFile**: Simple content, multiline, special chars, verify store path format
- **toPath**: String to Path, already Path (idempotent), invalid paths

**Validation commands (run in `nix repl`):**
```bash
nix repl
# pathExists - Check existence
> builtins.pathExists ./README.md          # true
> builtins.pathExists ./missing.txt        # false
> builtins.pathExists ./.                  # true (directory)

# readFile - Read contents
> builtins.readFile ./README.md            # (entire file contents as string)
> builtins.readFile ./missing.txt          # error: file not found

# readDir - List directory
> builtins.readDir ./.
# { "main" = "directory"; "README.md" = "regular"; "test.sh" = "regular"; ... }

# readFileType - Get type
> builtins.readFileType ./README.md        # "regular"
> builtins.readFileType ./.                # "directory"
> builtins.readFileType /path/to/symlink   # "symlink"

# findFile - Search in path list
> builtins.findFile [{ path = ./.; prefix = ""; }] "README.md"
# /full/path/to/README.md

# toFile - Create file in store
> builtins.toFile "test.txt" "hello world"
# "/nix/store/abc123...-test.txt" (returns store path)

# toPath - Convert to path
> builtins.toPath "/some/path"             # /some/path (as Path object)
> builtins.toPath ./relative               # /full/path/relative
```

**Test file template:**
```javascript
import { assertEquals, assertThrows } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { builtins } from "../runtime.js"
import { NixError } from "../errors.js"
import { Path } from "../classes.js"

const FIXTURES = "./main/tests/fixtures/pathops_test"

// ============================================================================
// Path Existence
// ============================================================================

Deno.test("pathExists - file exists", () => {
    const path = `${FIXTURES}/file.txt`
    assertEquals(builtins.pathExists(path), true)
})

Deno.test("pathExists - file missing", () => {
    assertEquals(builtins.pathExists(`${FIXTURES}/missing.txt`), false)
})

Deno.test("pathExists - directory", () => {
    assertEquals(builtins.pathExists(FIXTURES), true)
})

// ============================================================================
// File Reading
// ============================================================================

Deno.test("readFile - basic file", () => {
    const content = builtins.readFile(`${FIXTURES}/file.txt`)
    assertEquals(content, "test content\n")
})

Deno.test("readFile - multiline", () => {
    const content = builtins.readFile(`${FIXTURES}/multiline.txt`)
    assertEquals(content, "line1\nline2\n")
})

Deno.test("readFile - missing file throws", () => {
    assertThrows(
        () => builtins.readFile(`${FIXTURES}/missing.txt`),
        Error  // May be NixError or Deno's file error
    )
})

// ============================================================================
// Directory Reading
// ============================================================================

Deno.test("readDir - list entries", () => {
    const entries = builtins.readDir(FIXTURES)

    // Should have our test files
    assertEquals(entries["file.txt"], "regular")
    assertEquals(entries["multiline.txt"], "regular")
    assertEquals(entries["subdir"], "directory")
})

Deno.test("readDir - empty directory", () => {
    const entries = builtins.readDir(`${FIXTURES}/subdir`)
    assertEquals(Object.keys(entries).length, 0)
})

Deno.test("readDir - missing directory throws", () => {
    assertThrows(
        () => builtins.readDir(`${FIXTURES}/missing_dir`),
        Error
    )
})

// ============================================================================
// File Type Detection
// ============================================================================

Deno.test("readFileType - regular file", () => {
    assertEquals(builtins.readFileType(`${FIXTURES}/file.txt`), "regular")
})

Deno.test("readFileType - directory", () => {
    assertEquals(builtins.readFileType(FIXTURES), "directory")
})

Deno.test("readFileType - symlink", () => {
    // Skip if symlink creation failed
    try {
        const type = builtins.readFileType(`${FIXTURES}/symlink.txt`)
        assertEquals(type, "symlink")
    } catch (e) {
        // Symlink may not exist on all platforms
        console.log("Skipping symlink test:", e.message)
    }
})

Deno.test("readFileType - missing throws", () => {
    assertThrows(
        () => builtins.readFileType(`${FIXTURES}/missing.txt`),
        Error
    )
})

// ============================================================================
// File Search
// ============================================================================

Deno.test("findFile - finds in search path", () => {
    const searchPath = [{ path: "./main/tests/fixtures", prefix: "" }]
    const result = builtins.findFile(searchPath, "pathops_test/file.txt")

    // Should return an absolute path
    assert(result.includes("file.txt"))
    assertEquals(builtins.pathExists(result), true)
})

Deno.test("findFile - not found throws", () => {
    const searchPath = [{ path: "./main/tests/fixtures", prefix: "" }]
    assertThrows(
        () => builtins.findFile(searchPath, "missing_file.txt"),
        NixError,
        "not found"
    )
})

// ============================================================================
// Store File Creation
// ============================================================================

Deno.test("toFile - creates file in store", () => {
    const path = builtins.toFile("test-file.txt", "hello world")

    // Should return a store path string
    assert(path.startsWith("/nix/store/") || path.includes(".cache/denix/store/"))
    assert(path.endsWith("-test-file.txt"))

    // File should exist and have correct content
    assertEquals(builtins.pathExists(path), true)
    assertEquals(builtins.readFile(path), "hello world")
})

Deno.test("toFile - multiline content", () => {
    const content = "line 1\nline 2\nline 3"
    const path = builtins.toFile("multiline.txt", content)

    assertEquals(builtins.readFile(path), content)
})

// ============================================================================
// Path Conversion
// ============================================================================

Deno.test("toPath - converts string", () => {
    const result = builtins.toPath("/some/path")
    assert(result instanceof Path)
    assertEquals(result.toString(), "/some/path")
})

Deno.test("toPath - handles Path object", () => {
    const path = new Path("/already/path")
    const result = builtins.toPath(path)
    assert(result instanceof Path)
    assertEquals(result.toString(), "/already/path")
})
```

**Important notes:**
- Use relative paths from project root (tests run from repo root)
- Create fixtures in `main/tests/fixtures/pathops_test/` subdirectory
- Handle platform differences (symlinks may not work on Windows)
- `readDir` returns object `{ "filename": "type", ... }` not array
- `toFile` writes to `~/.cache/denix/store/` not `/nix/store/`
- File operations should throw errors (not return null) on missing files

**Time estimate:** 4-5 hours (includes fixture setup + potential bug fixes)

---

## Test Runner Commands

```bash
# Run all tests
./test.sh

# Run derivation tests (Priority 0)
deno run --allow-all main/tests/derivation/001_basic_tests.js

# Run specific categories
./test.sh math          # Math operations (after creating file)
./test.sh attrs         # Attrset operations (after creating file)
./test.sh strings       # String operations (after creating file)
./test.sh paths         # Path/file operations (after creating file)

# Run all runtime tests
./test.sh runtime
```

---

## Documentation References

- **Nix Builtins:** https://nix.dev/manual/nix/2.28/language/builtins.html
- **Architecture:** See ARCHITECTURE.md
- **Current Status:** See CODEBASE_STATUS.md
- **Testing Guide:** See README.md

---

## Already Tested - DO NOT Re-test

**56/109 builtins already have tests (see test files for details):**

**Type Checking (10):** `builtins_type_checking_test.js`
- isAttrs, isBool, isFloat, isList, isInt, isNull, isFunction, isString, isPath, typeOf

**List Operations (13):** `builtins_lists_comprehensive_test.js` + `builtins_core_test.js`
- map, filter, length, head, tail, elem, elemAt, all, any, foldl, foldr, concatLists, concatMap, groupBy

**Core Operations (12):** `builtins_core_test.js` + others
- add, div, trace, throw, seq, deepSeq, tryEval, parseDrvName, compareVersions, substring, mapAttrs, removeAttrs, listToAttrs, intersectAttrs

**String Operations (4):** Various integration tests
- substring, stringLength, replaceStrings (import_e2e_test.js), concatStringsSep (used but not unit tested)

**Attrset Operations (5):** `builtins_core_test.js` + `hasattr_test.js`
- hasAttr, mapAttrs, removeAttrs, listToAttrs, intersectAttrs

**Import System (2):** `import_integration_test.js` + `import_e2e_test.js`
- import, scopedImport

**Fetch Operations (6):** `builtins_fetch*_test.js` files
- fetchGit, fetchTarball, fetchurl, fetchTree, path, filterSource

**Derivations (2):** `derivation/` tests (mostly failing - bugs exist!)
- derivation, derivationStrict

**Data Formats (3):** `fromtoml_test.js` + `builtins_tojson_path_test.js`
- toJSON, fromJSON, fromTOML

**DO NOT create tests for these - they already exist!**

---

## Summary - What Remains

**Current state:**
- ✅ 56/109 builtins tested (51.4% coverage)
- ⚠️ 53/109 builtins untested (48.6%)
- 🐛 9/10 derivation tests failing (2 bugs blocking)

**Work order:**

### PRIORITY 0: Fix Bugs (1-2h) ← START HERE
1. **Derivation store path bug** - Add empty output placeholders to `env` before hash (30 min)
2. **toJSON derivation crash** - Move derivation check before function case (30 min)

### PRIORITY 1-4: Add Tests (12-16h total)
3. **Math/bitwise** - 8 functions, 50-80 tests (3-4h)
4. **Attrset ops** - 5 functions, 40-50 tests (2-3h)
5. **String ops** - 7 functions, 50-70 tests (3-4h)
6. **Path/file ops** - 8 functions, 60-80 tests (4-5h)

**Total time: 13-18 hours**
**Result: 84/109 builtins tested (77% coverage)**

**To reach 80% (87/109):** Add 3 more functions from remaining 25 untested (1-2h additional)

---

## Rules

**What NOT to do:**
- Do NOT refactor working code
- Do NOT reorganize file structure
- Do NOT add features beyond documented tasks
- Do NOT report achievements or completed work
- Do NOT skip reading documentation before implementing
- Do NOT work on translator before runtime is complete
- Do NOT work on nix-lib tests before translator is complete

**What TO do:**
- DO fix bugs immediately when discovered
- DO write 5-10 tests per function
- DO validate against nix repl behavior before implementing
- DO read https://nix.dev/manual/nix/2.28/language/builtins.html for each builtin
- DO search for real-world examples and documentation
- DO break down large tasks into smaller chunks
- DO report only what remains to be done
