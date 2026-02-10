# YOUR JOB: Focus on What is NOT Working

**YOU ARE A SENIOR LEVEL DEVELOPER - THERE IS NO SUCH THING AS A BLOCKER.**

Break down large tasks into smaller tasks. Only report what remains to be done. Do NOT report achievements or completed work.

---

## CRITICAL WORK ORDER (MUST FOLLOW THIS SEQUENCE)

1. **RUNTIME TESTING FIRST** - Test all 62 untested builtins in `main/runtime.js`
2. **THEN Translator improvements** - Only after runtime is 80%+ tested
3. **THEN nixpkgs.lib testing** - Only after translator is complete

**DO NOT work on translator or nix-lib tests until runtime testing is complete.**

---

## MANDATORY IMPLEMENTATION PROCESS

**ALWAYS read documentation WHILE implementing:**

1. **Read Nix official docs**: https://nix.dev/manual/nix/2.18/language/builtins.html
2. **Test behavior in `nix repl`** to understand expected output
3. **Search for more documentation**: Use web search for examples and edge cases
4. **Read source code**: Check nixpkgs or Nix source if behavior is unclear
5. **THEN implement/test** based on actual Nix behavior

**Example workflow for builtins.fetchClosure:**
```bash
# 1. Read docs
open https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-fetchClosure

# 2. Test in nix repl
nix repl
> builtins.fetchClosure { fromStore = "..."; fromPath = "..."; }

# 3. Search for examples
# (web search: "nix fetchClosure example")

# 4. Implement based on observed behavior
```

---

## NPM MODULES

You CAN use npm modules, but ONLY through `https://esm.sh/NPM_MODULE_NAME`

**WARNING:** esm.sh is often unreliable. Be prepared for it to not work.

Example:
```javascript
import tar from "https://esm.sh/tar@7.0.0"  // May or may not work
```

---

## CURRENT TASK: Runtime Testing (37% → 80%)

**Status:** 40/109 builtins tested. Need 47 more tests to reach 80% (87 total).

### Untested Builtins Requiring Tests (62 remaining)

Create test files in `main/tests/` testing each function against `nix repl` behavior.

#### Priority 1: Type Checking (10 functions, 3-4 hours)
**File needed:** `main/tests/builtins_type_checking_test.js` (DOES NOT EXIST)

Functions: isNull, isBool, isInt, isFloat, isString, isList, isPath, isAttrs, isFunction, typeOf

**Test process:**
```bash
# 1. Test in nix repl
nix repl
> builtins.isNull null          # true
> builtins.isNull 0              # false
> builtins.isInt 42              # true
> builtins.isInt 42.0            # false
> builtins.typeOf null           # "null"
> builtins.typeOf []             # "list"

# 2. Write Deno tests
import { assertEquals } from "https://deno.land/std@0.210.0/assert/mod.ts"
import { builtins } from "../runtime.js"

Deno.test("builtins.isNull - null returns true", () => {
    assertEquals(builtins.isNull(null), true)
})

Deno.test("builtins.isNull - zero returns false", () => {
    assertEquals(builtins.isNull(0), false)
})

# 3. Run tests
deno test --allow-all main/tests/builtins_type_checking_test.js

# 4. Fix any bugs found
```

**Minimum tests needed:** 50+ (each function × 5 test cases)

**Edge cases to test:**
- null vs undefined vs 0 vs false vs ""
- BigInt vs Number (42n vs 42)
- Float detection (42.0 vs 42)
- Empty lists/attrsets
- Functions (anonymous, named, curried)
- Paths (absolute, relative, interpolated)
- typeOf for all 8 types

---

#### Priority 2: List Operations (10 functions, 5-7 hours)
**File needed:** `main/tests/builtins_lists_comprehensive_test.js` (DOES NOT EXIST)

Functions: map, filter, all, any, elem, elemAt, partition, sort, genList, concatLists

**CRITICAL:** `map` uses lazyMap proxy - test laziness!

**Test process:**
```bash
# 1. Test in nix repl
nix repl
> builtins.map (x: x * 2) [1 2 3]           # [2 4 6]
> builtins.filter (x: x > 2) [1 2 3 4]      # [3 4]
> builtins.all (x: x > 0) [1 2 3]           # true
> builtins.any (x: x > 10) [1 2 3]          # false
> builtins.elem 2 [1 2 3]                   # true
> builtins.elemAt [1 2 3] 1                 # 2
> builtins.partition (x: x > 2) [1 2 3 4]   # { right = [3 4]; wrong = [1 2]; }
> builtins.sort (a: b: a < b) [3 1 2]       # [1 2 3]
> builtins.genList (x: x * x) 5             # [0 1 4 9 16]
> builtins.concatLists [[1 2] [3 4]]        # [1 2 3 4]
```

**Minimum tests needed:** 70+ tests

**Edge cases:**
- Empty lists
- Single element lists
- Functions with side effects (should NOT be called for map until accessed)
- null/undefined in lists
- Nested lists
- Large lists (performance)
- sort with equal elements
- partition with all true/all false
- genList with n=0
- concatLists with empty sublists

---

#### Priority 3: Attrset Operations (6 functions, 3-5 hours)
**File needed:** `main/tests/builtins_attrs_comprehensive_test.js` (DOES NOT EXIST)

Functions: getAttr, attrNames, attrValues, catAttrs, genericClosure, getEnv

**CRITICAL:** `attrNames` must return SORTED keys!

**Test process:**
```bash
# 1. Test in nix repl
nix repl
> builtins.getAttr "a" {a=1; b=2;}                # 1
> builtins.attrNames {z=1; a=2; m=3;}             # ["a" "m" "z"]  (SORTED!)
> builtins.attrValues {a=1; b=2;}                 # [1 2]
> builtins.catAttrs "x" [{x=1;} {y=2;} {x=3;}]    # [1 3]
> builtins.genericClosure {
    startSet = [{key="a"; val=1;}];
    operator = x: [];
  }                                                # [{key="a"; val=1;}]
> builtins.getEnv "HOME"                          # "/home/user"
```

**Minimum tests needed:** 50+ tests

**Edge cases:**
- Missing attributes (should error)
- attrNames with numeric keys, special chars, unicode
- attrValues order (matches attrNames order)
- catAttrs with missing attrs in some objects
- genericClosure cycles, empty startSet, complex operator
- getEnv with undefined variable

---

#### Priority 4: String Operations (5 functions, 3-4 hours)
**File needed:** `main/tests/builtins_strings_comprehensive_test.js` (DOES NOT EXIST)

Functions: split, splitVersion, baseNameOf, dirOf, toXML

**Test process:**
```bash
# 1. Test in nix repl
nix repl
> builtins.split "([a-z]+)" "foo123bar"         # ["" ["foo"] "123" ["bar"] ""]
> builtins.splitVersion "1.2.3-beta"            # ["1" "2" "3" "beta"]
> builtins.baseNameOf "/foo/bar/baz.txt"        # "baz.txt"
> builtins.baseNameOf "/foo/bar/"               # "bar"
> builtins.dirOf "/foo/bar/baz"                 # "/foo/bar"
> builtins.toXML {a=1; b="hello";}              # "<?xml ...>"
```

**Minimum tests needed:** 30+ tests

**Edge cases:**
- split with no captures, multiple captures, empty matches
- splitVersion with no version separators
- baseNameOf/dirOf with ".", "..", "/", no slashes
- toXML with nested structures, special chars, null/bool

---

#### Priority 5: Math & Bitwise (8 functions, 3-4 hours)
**File needed:** `main/tests/builtins_math_comprehensive_test.js` (DOES NOT EXIST)

Functions: sub, mul, ceil, floor, bitAnd, bitOr, bitXor, toString

**CRITICAL:** BigInt vs Number handling!

**Test process:**
```bash
# 1. Test in nix repl
nix repl
> builtins.sub 10 3                     # 7
> builtins.mul 6 7                      # 42
> builtins.ceil 3.2                     # 4
> builtins.floor 3.8                    # 3
> builtins.bitAnd 12 10                 # 8  (0b1100 & 0b1010)
> builtins.bitOr 12 10                  # 14 (0b1100 | 0b1010)
> builtins.bitXor 12 10                 # 6  (0b1100 ^ 0b1010)
> builtins.toString 42                  # "42"
> builtins.toString {outPath="/nix/store/...";}  # "/nix/store/..."
```

**Minimum tests needed:** 30+ tests

**Edge cases:**
- BigInt arithmetic (42n)
- Float arithmetic (42.0)
- Mixed BigInt and Float
- Negative numbers
- Zero
- Division by zero (should error)
- toString with paths, derivations, lists, attrsets

---

#### Priority 6: Path/File Operations (11 functions, 4-6 hours)
**File needed:** `main/tests/builtins_paths_comprehensive_test.js` (DOES NOT EXIST)

Functions: pathExists, readFile, readDir, readFileType, findFile, toFile, storePath, toPath, storeDir, nixPath, placeholder

**Test process:**
```bash
# 1. Test in nix repl
nix repl
> builtins.pathExists /etc/hosts              # true
> builtins.readFile /etc/hostname             # "myhostname\n"
> builtins.readDir /etc                       # {hosts = "regular"; ...}
> builtins.readFileType /etc/hosts            # "regular"
> builtins.findFile [] "test"                 # error: file 'test' not found
> builtins.toFile "foo.txt" "contents"        # "/nix/store/...-foo.txt"
> builtins.toPath /home/user                  # /home/user
> builtins.storeDir                           # "/nix/store"
> builtins.nixPath                            # [...]
> builtins.placeholder "out"                  # "/1rz4g4znpzjwh1xymhjpm42vipw92pr73vdgl6xs1hycac8kf2n9"
```

**Minimum tests needed:** 40+ tests

**Edge cases:**
- pathExists with missing files, directories, symlinks
- readFile with binary files, empty files, large files
- readDir with empty directories, no permissions
- readFileType with symlinks, directories, special files
- findFile with empty path, multiple matches
- toFile with empty content, special chars in name/content
- storePath with relative paths
- nixPath empty or with custom paths

---

## AFTER 80% Runtime Testing: Remaining Work

### Optional Builtins (NOT required, implement if needed)

#### fetchMercurial (2-3 days)
- Read: https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-fetchMercurial
- Similar to fetchGit but uses `hg` command
- Requires Mercurial installed
- Implementation plan:
  1. Check if `hg` command exists
  2. Clone to temp directory
  3. Compute NAR hash
  4. Move to store
  5. Cache by (url, rev)

#### fetchClosure (5-7 days, VERY COMPLEX)
- Read: https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-fetchClosure
- Downloads pre-built closures from binary caches
- Requires:
  1. Binary cache protocol implementation
  2. NAR parsing
  3. Signature verification
  4. Closure copying
- This is OPTIONAL - most users don't need it

#### getFlake (5-7 days, VERY COMPLEX)
- Read: https://nix.dev/manual/nix/2.18/command-ref/new-cli/nix3-flake.html
- Full flake evaluation system
- Requires:
  1. Flake lock file parsing
  2. Dependency resolution
  3. Input fetching
  4. Schema validation
- This is OPTIONAL - experimental feature

#### fetchTree edge cases (4-6 hours)
- type='mercurial' (requires hg)
- type='path' (local directory)
- type='indirect' (flake registry lookup)

### Translator Edge Cases (2-3 days)

Only work on this AFTER runtime testing is complete.

1. **Pattern matching edge cases**
   - Nested @ patterns
   - Ellipsis with defaults
   - Multiple levels of destructuring

2. **String escape sequences**
   - Verify all escapes work (\n, \t, \r, \\, \", \${)
   - Multi-line strings ('' '')

3. **Path literal edge cases**
   - <nixpkgs> resolution (partially implemented)
   - Relative paths in interpolations

4. **Operator precedence**
   - Verify all operator combinations

### nixpkgs.lib Testing (4-6 days)

Only work on this AFTER translator is complete.

**Already tested (15 files):**
- ascii-table.nix, strings.nix, minfeatures.nix
- source-types.nix, versions.nix, kernel.nix
- flakes.nix, flake-version-info.nix
- systems/flake-systems.nix, systems/supported.nix
- (5 more)

**Remaining (19 files):**
- lists.nix (HIGH VALUE)
- attrsets.nix (HIGH VALUE)
- options.nix (HIGH VALUE)
- meta.nix, debug.nix, generators.nix
- licenses.nix, trivial.nix
- modules.nix, types.nix
- filesystem.nix, derivations.nix
- And 7 more systems/*.nix files

---

## Running Tests

```bash
# All tests
deno test --allow-all

# Specific test file
deno test --allow-all main/tests/builtins_type_checking_test.js

# Watch mode
deno test --allow-all --watch
```

---

## References

- **Nix 2.18 Builtins**: https://nix.dev/manual/nix/2.18/language/builtins.html
- **Noogle (search engine)**: https://noogle.dev
- **Nix source code**: https://github.com/NixOS/nix
- **nixpkgs lib source**: https://github.com/NixOS/nixpkgs/tree/master/lib

---

## REMEMBER

1. **ALWAYS read Nix docs BEFORE implementing/testing**
2. **ALWAYS test in `nix repl` to verify expected behavior**
3. **Focus on what is NOT working** - don't report achievements
4. **Follow work order**: Runtime testing → Translator → nixpkgs.lib
5. **Break down large tasks** - you're a senior dev, no blockers exist
