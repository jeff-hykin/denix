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

## 🔴 PRIORITY 0: FIX DERIVATION BUGS (2-3h) - DO THIS FIRST

**STATUS:** 9 out of 10 derivation tests FAILING

**Test Command:**
```bash
deno run --allow-all main/tests/derivation/001_basic_tests.js
```

### Bug 1 - Store Path Hash (Tests 001-008 failing)

**Location:** `main/runtime.js` line ~1755

**Fix:** Add BEFORE creating drvStructure:
```javascript
// Add empty output placeholders to env BEFORE computing hash
for (const outputName of outputNames) {
    env[outputName] = ""
}
```

### Bug 2 - toJSON Crash (Test 009 failing)

**Location:** `main/runtime.js` line ~308-320

**Fix:** Move derivation check BEFORE function check:
```javascript
case "function":
    // Check if it's a derivation BEFORE throwing
    if (typeof value === "object" && value?.type === "derivation") {
        return JSON.stringify(value.outPath)
    }
    throw new NixError(`error: cannot convert a function to JSON`)
```

**Expected Result:** All 10/10 tests passing

---

## PRIORITY 1: TEST MATH OPERATIONS (3-4h)

**File:** Create `main/tests/builtins_math_test.js`

**Functions to test (8 total):**
1. `sub` (line 218) - Subtraction
2. `mul` (line 232) - Multiplication
3. `lessThan` (line 246) - Comparison
4. `ceil` (line 689) - Round up
5. `floor` (line 698) - Round down
6. `bitAnd` (line 707) - Bitwise AND
7. `bitOr` (line 712) - Bitwise OR
8. `bitXor` (line 717) - Bitwise XOR

**Test each function (5-10 tests each):**
- Normal cases (positive, negative)
- BigInt vs Float handling
- Edge cases (zero, large numbers)
- Type errors

**Validation in nix repl:**
```bash
nix repl
> builtins.sub 10 3        # 7
> builtins.mul 2.5 4       # 10.0
> builtins.lessThan 5 10   # true
> builtins.ceil 3.2        # 4
> builtins.floor 3.8       # 3
> builtins.bitAnd 5 3      # 1
```

**Test file template:**
```javascript
import { assertEquals } from "jsr:@std/assert";
import { builtins } from "../runtime.js";

Deno.test("sub - basic subtraction", () => {
    assertEquals(builtins.sub(10n, 3n), 7n);
    assertEquals(builtins.sub(10, 3.5), 6.5);
});
```

---

## PRIORITY 2: TEST ATTRSET OPERATIONS (2-3h)

**File:** Create `main/tests/builtins_attrs_ops_test.js`

**Functions to test (5 total):**
1. `getAttr` (line 806) - Get attribute by name
2. `attrNames` (line 827) - Get sorted attribute names
3. `attrValues` (line 832) - Get values in order
4. `catAttrs` (line 837) - Extract attribute from list
5. `genericClosure` (line 847) - Transitive closure

**Validation:**
```bash
nix repl
> builtins.getAttr "x" { x = 1; y = 2; }         # 1
> builtins.attrNames { c = 3; a = 1; b = 2; }    # ["a" "b" "c"]
> builtins.catAttrs "x" [{x=1;} {y=2;} {x=3;}]   # [1 3]
```

---

## PRIORITY 3: TEST STRING OPERATIONS (3-4h)

**File:** Create `main/tests/builtins_strings_ops_test.js`

**Functions to test (7 total):**
1. `split` (line 400) - Split by regex
2. `match` (line 376) - Match regex with captures
3. `concatStringsSep` (line 437) - Join with separator
4. `splitVersion` (line 2010) - Split version string
5. `baseNameOf` (line 1312) - Extract filename
6. `dirOf` (line 1321) - Extract directory
7. `toString` (line 261) - Convert to string

**Validation:**
```bash
nix repl
> builtins.split "\\." "a.b.c"               # ["a" "" "b" "" "c"]
> builtins.match "(.*)@(.*)" "foo@bar"       # ["foo" "bar"]
> builtins.concatStringsSep "," ["a" "b"]    # "a,b"
> builtins.splitVersion "1.2.3-alpha"        # ["1" "2" "3" "alpha"]
> builtins.baseNameOf "/path/to/file.txt"    # "file.txt"
```

---

## PRIORITY 4: TEST PATH/FILE OPERATIONS (4-5h)

**File:** Create `main/tests/builtins_paths_ops_test.js`

**Setup:** Create test fixtures first:
```bash
mkdir -p main/tests/fixtures/path_test_dir
echo "test content" > main/tests/fixtures/path_test_file.txt
```

**Functions to test (8 total):**
1. `pathExists` (line 1297) - Check if path exists
2. `readFile` (line 1330) - Read file contents
3. `readDir` (line 1344) - Read directory
4. `readFileType` (line 1359) - Get file type
5. `findFile` (line 1394) - Search for file
6. `toFile` (line 1525) - Create file in store
7. `toPath` (line 1537) - Convert to path type
8. `baseNameOf` (line 1312) - Extract filename

**Validation:**
```bash
nix repl
> builtins.pathExists ./README.md          # true
> builtins.readFile ./README.md            # (file contents)
> builtins.readDir ./.                     # { "main" = "directory"; ... }
> builtins.readFileType ./README.md        # "regular"
```

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

**56/109 builtins already have tests:**
- Type checking: 10 functions
- Core operations: 12 functions
- List operations: 13 functions
- Attrset basics: 5 functions
- String basics: 4 functions
- Import/eval: 2 functions
- Fetch operations: 6 functions
- Derivations: 2 functions

---

## Summary - What Remains

1. **Fix 2 derivation bugs** (2-3h) ← DO THIS FIRST
2. **Create 4 test files** (12-16h):
   - Math operations (8 functions, 3-4h)
   - Attrset operations (5 functions, 2-3h)
   - String operations (7 functions, 3-4h)
   - Path operations (8 functions, 4-5h)

**Total estimated time:** 14-19 hours
**Result:** 87/109 builtins tested (80% coverage)

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
