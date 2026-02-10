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
- 69 builtins have ZERO tests (63% of runtime)
- **Target: 80% coverage = 47 more functions need tests**
- **Estimated: 18-26 hours of work remaining**

**Critical untested functions:**
- `map`, `filter`, `all`, `any` - Core list operations
- `getAttr`, `attrNames`, `attrValues` - Core attrset operations

## Work Process (MANDATORY FOR EVERY BUILTIN)

**NEVER skip these steps:**
1. **Read Nix documentation**: https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-FUNCTION_NAME
2. **Search for examples**: Use Google/noogle.dev to find real-world usage
3. **Test in `nix repl`**: Verify exact behavior with edge cases
4. **Write tests**: Match Nix behavior exactly, including error messages
5. **Document findings**: If behavior differs from docs, note it in test comments

## Test Task Priority


### ⚡ Task 1: List Operations (10 functions, 5-7 hours) - START HERE
**File**: `main/tests/builtins_lists_comprehensive_test.js`

**BEFORE WRITING ANY TESTS:**
- Read: https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-map
- Read: https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-filter
- Search noogle.dev for each function's real-world usage
- Test each function in `nix repl` with edge cases

**Untested (10):**
- map (CRITICAL - lazyMap proxy) - Read docs first!
- filter (CRITICAL) - Read docs first!
- all, any (predicates) - Read docs first!
- elem, elemAt - Read docs first!
- partition, sort - Read docs first!
- genList, concatLists - Read docs first!

**Key edge cases:**
- Empty lists []
- Single element [1]
- Nested [[1,2],[3,4]]
- lazyMap index access
- partition lazy eval

Run: `./test.sh lists`

### ⚡ Task 2: Attrset Operations (6 functions, 3-5 hours)
**File**: `main/tests/builtins_attrs_comprehensive_test.js`

**BEFORE WRITING ANY TESTS:**
- Read: https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-getAttr
- Read docs for attrNames, attrValues, catAttrs, genericClosure, getEnv
- Test each in `nix repl` to verify exact behavior and error messages

**Untested (6):**
- getAttr (CRITICAL) - Read docs first!
- attrNames, attrValues (CRITICAL) - Read docs first!
- catAttrs - Read docs first!
- genericClosure - Read docs first! (Complex - may need subtasks)
- getEnv - Read docs first!

**Key edge cases:**
- Missing attributes
- null/undefined values
- Nested access
- Empty attrsets {}
- Environment variables

Run: `./test.sh attrs`

### Task 3: String Operations (5 functions, 3-4 hours)
**File**: `main/tests/builtins_strings_comprehensive_test.js`

**Untested (5):**
- split (POSIX ERE regex)
- splitVersion
- baseNameOf, dirOf
- toXML

Run: `./test.sh strings`

### Task 4: Math & Bitwise (8 functions, 3-4 hours)
**File**: `main/tests/builtins_math_comprehensive_test.js`

**Untested (8):**
- sub, mul
- ceil, floor
- bitAnd, bitOr, bitXor
- toString

Run: `./test.sh math`

### Task 5: Path/File Operations (11 functions, 4-6 hours)
**File**: `main/tests/builtins_paths_comprehensive_test.js`

**Untested (11):**
- pathExists, readFile, readDir, readFileType
- findFile, toFile, storePath, toPath
- storeDir, nixPath, placeholder

Run: `./test.sh paths`

### Task 6: Hashing & Context (9 functions, 4-5 hours)
**File**: `main/tests/builtins_hashing_context_test.js`

**Untested (9):**
- hashFile, hashString
- getContext, hasContext, unsafeDiscardStringContext
- appendContext, unsafeDiscardOutputDependency
- addErrorContext, outputOf

### Task 7: Control Flow (3 functions, 1-2 hours)
**File**: `main/tests/builtins_control_comprehensive_test.js`

**Untested (3):**
- abort
- seq (strict evaluation)
- deepSeq

### Task 8: JSON/Conversion (1 function, 30min-1 hour)
**File**: `main/tests/builtins_conversion_test.js`

**Untested (1):**
- fromJSON

### Task 9: Advanced Functions (6 functions, 3-5 hours)
**File**: `main/tests/builtins_advanced_test.js`

**Untested (6):**
- functionArgs
- zipAttrsWith
- parseFlakeRef, flakeRefToString
- langVersion, nixVersion

## Path to 80% Coverage

**Phase 1 (CRITICAL):** Tasks 1-2 (16 functions, 8-12 hours) → 56% coverage
**Phase 2 (HIGH):** Tasks 3-5 (24 functions, 10-14 hours) → 80% coverage
**Phase 3 (OPTIONAL):** Tasks 6-9 (19 functions, 8-13 hours) → 95% coverage

**Total to 80%: Tasks 1-5 = 40 functions, 18-26 hours remaining**

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

## Running Tests

```bash
# All tests
./test.sh

# Specific category
./test.sh lists
./test.sh attrs
./test.sh strings
./test.sh math
./test.sh paths

# All runtime tests
./test.sh runtime

# Pattern matching
deno test --allow-all --filter="map"
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
