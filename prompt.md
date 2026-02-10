# Current Priority: Runtime Testing (37% → 80%)

**Status:** 40/96 builtins tested. Need 47 more to reach 80% (77 total).

**Work Order:** Runtime Testing → Then Translator → Then nixpkgs.lib

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

## REMEMBER

1. **ALWAYS test in `nix repl` first** - Don't guess behavior
2. **Read Nix docs** - https://nix.dev/manual/nix/2.18/language/builtins.html
3. **Focus on what's NOT working** - Don't report achievements
4. **You're a senior dev** - No blockers exist, break down tasks

**Current Goal:** Create `builtins_type_checking_test.js` with 45+ tests (3-4 hours)
