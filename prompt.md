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

# Current Priority: Runtime Testing (37% → 80%)

**Status:** 40/96 builtins tested. Need 47 more to reach 80% (77 total).

**What's NOT done:** 56 builtins have zero tests

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

**Functions (9):** isNull, isBool, isInt, isFloat, isString, isList, isPath, isAttrs, typeOf

**Minimum:** 45 tests (5 per function)

**Key edge cases:**
- null vs undefined vs 0 vs false vs ""
- BigInt vs Number (42n vs 42.0)
- Empty lists/attrsets
- typeOf for all 8 types

### Task 2: List Operations (3-4 hours) ⚡ CRITICAL
**File:** `main/tests/builtins_lists_comprehensive_test.js` (DOES NOT EXIST)

**Functions (6):** elem, elemAt, partition, sort, genList, concatLists

**Note:** map, filter, all, any already tested in library code but need dedicated edge case tests

**Minimum:** 36 tests (6 per function)

**Key edge cases:**
- Empty lists
- Out of bounds indices
- Stable sort behavior
- Lazy evaluation with map

### Task 3: Attrset Operations (2-3 hours)
**File:** `main/tests/builtins_attrs_comprehensive_test.js` (DOES NOT EXIST)

**Functions (3):** getAttr, catAttrs, genericClosure

**Note:** hasAttr fully tested. attrNames/attrValues tested in library but need sort order verification

**Minimum:** 18 tests (6 per function)

**Key edge cases:**
- Missing attributes (should error)
- attrNames MUST return sorted keys
- genericClosure with cycles

### Task 4: String Operations (2-3 hours)
**File:** `main/tests/builtins_strings_comprehensive_test.js` (DOES NOT EXIST)

**Functions (4):** split, splitVersion, baseNameOf, dirOf

**Minimum:** 24 tests (6 per function)

**Key edge cases:**
- split with no captures, multiple captures
- splitVersion with no separators
- baseNameOf/dirOf with ".", "..", "/"

### Task 5: Math & Bitwise (2-3 hours)
**File:** `main/tests/builtins_math_comprehensive_test.js` (DOES NOT EXIST)

**Functions (7):** sub, mul, ceil, floor, bitAnd, bitOr, bitXor

**Minimum:** 35 tests (5 per function)

**Key edge cases:**
- BigInt arithmetic (42n)
- Float arithmetic (42.0)
- Mixed BigInt and Float
- Negative numbers, zero

### Task 6: Path/File Operations (4-6 hours)
**File:** `main/tests/builtins_paths_comprehensive_test.js` (DOES NOT EXIST)

**Functions (11):** pathExists, readFile, readDir, readFileType, findFile, toFile, storePath, toPath, storeDir, nixPath, placeholder

**Minimum:** 55 tests (5 per function)

**Key edge cases:**
- Missing files
- Empty files
- Symlinks
- Permissions errors

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

**Tasks 1-5:** 29 functions, 14-17 hours → 72% coverage (close to 80%)
**Task 6:** 11 functions, 4-6 hours → 80%+ coverage

**Total:** 21-30 hours of focused testing work

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

## IMMEDIATE NEXT STEP

**Create `main/tests/builtins_type_checking_test.js`** (3-4 hours)
- Test in nix repl first: `builtins.isInt 42`, `builtins.isInt 42.0`, etc.
- 45+ tests covering all 9 type functions
- Focus on edge cases: null, undefined, 0, false, "", BigInt vs Number
