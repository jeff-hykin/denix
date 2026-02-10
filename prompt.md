# Denix Development Guide

**Last Updated:** 2026-02-10

---

## 🚨 CRITICAL RULES - READ THIS FIRST

**Your job is to focus on what is NOT implemented and NOT working. Only report what remains to be done. Do not report accomplishments. You are a senior level developer - there is no such thing as a blocker. Break down large tasks into smaller tasks.**

**BEFORE executing what is below, filter out any achievements. Only keep remaining/unsolved tasks in this document. Add detail to each task if needed.**

### WORK ORDER (MUST FOLLOW THIS SEQUENCE):
1. **Runtime functions FIRST** - Finish network fetchers and store functions in runtime.js
2. **Translator edge cases SECOND** - Only after runtime is fully tested
3. **nixpkgs.lib tests THIRD** - Only after translator is fully implemented

**DO NOT work on nix-lib tests until the translator is fully implemented.**
**DO NOT work on the translator until the runtime is fully tested.**

### IMPLEMENTATION REQUIREMENTS:
- **ALWAYS read Nix documentation while implementing:** https://nix.dev/manual/nix/2.28/language/builtins.html
- **ALWAYS test in `nix repl` BEFORE writing code** - match exact behavior, not what you think it should do
- **ALWAYS search the internet for documentation** (noogle.dev, GitHub, Nix source code)
- **Use npm modules ONLY through esm.sh:** `https://esm.sh/NPM_MODULE_NAME` (unreliable, prefer Deno std)
- **Break down tasks:** If a plan is missing for how to implement remaining things, figure out intermediate steps and make them a priority

---

## 📊 Current Status - What's NOT Done

**Runtime:** 35/109 builtins untested (32.1% NOT tested)
**Translator:** Edge cases not verified
**nixpkgs.lib:** 31/41 files NOT tested

**Immediate Goal:** Test 14 more builtins to reach 80% coverage (3-5 hours)

---

## ⚡ Priority 1: Test Coverage (DO THIS NEXT)

### Goal: 80% Coverage (Need 14 more tests, 3-5 hours)

**Quick Wins (30 minutes):**
- [ ] `lessThan` (line 211) - Simple comparison
- [ ] `mul` (line 233) - Simple multiplication

*Edit:* `main/tests/builtins_math_bitwise_test.js`

**File Operations (2-3 hours):**
- [ ] `pathExists` (line 1422)
- [ ] `readFile` (line 1397)
- [ ] `readDir` (line 1614)
- [ ] `readFileType` (line 1474)
- [ ] `findFile` (line 1631)
- [ ] `getEnv` (line 1396)

*Create:* `main/tests/builtins_file_ops_test.js`

**Conversion & Control (1-2 hours):**
- [ ] `toPath` (line 359)
- [ ] `toXML` (line 381)
- [ ] `fromJSON` (line 418)
- [ ] `abort` (line 1392)
- [ ] `getAttr` (line 640)
- [ ] `splitVersion` (line 531)

*Create:* `main/tests/builtins_misc_test.js`

### Medium Priority (21 untested, defer until 80%+ coverage)

- Context ops (5): getContext, hasContext, appendContext, addErrorContext, unsafeDiscardStringContext
- Store ops (4): storePath, toFile, placeholder, outputOf
- Hashing (2): hashString, hashFile
- Derivations (3): derivationStrict, unsafeDiscardOutputDependency, unsafeGetAttrPos
- Control flow (3): break, traceVerbose, genericClosure
- Fetchers (2): fetchMercurial, fetchClosure
- Advanced (2): getFlake, nixPath

---

## 📝 How to Write Tests

### Step 1: Test in nix repl

```bash
$ nix repl
nix-repl> builtins.lessThan 3 5
true
nix-repl> builtins.lessThan 5 3
false
nix-repl> builtins.pathExists "/tmp"
true
```

### Step 2: Write Deno Test

```javascript
import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { builtins } from "../runtime.js"

Deno.test("lessThan - basic comparison", () => {
    assertEquals(builtins.lessThan(3n, 5n), true)
    assertEquals(builtins.lessThan(5n, 3n), false)
    assertEquals(builtins.lessThan(3n, 3n), false)
})

Deno.test("pathExists - existing path", () => {
    assertEquals(builtins.pathExists("/tmp"), true)
})

Deno.test("pathExists - non-existing path", () => {
    assertEquals(builtins.pathExists("/nonexistent-123456"), false)
})
```

### Step 3: Run Tests

```bash
# Run specific test file
deno test --allow-all main/tests/builtins_file_ops_test.js

# Run all tests
./test.sh

# Run category
./test.sh math       # Math/bitwise tests
./test.sh attrs      # Attrset tests
./test.sh strings    # String tests
./test.sh derivation # Derivation tests
```

---

## 🏗️ Priority 2: Derivation Edge Cases (1-2 hours)

**INCOMPLETE** - Only basic derivations tested, edge cases NOT verified.

**BEFORE STARTING:** Read https://nix.dev/manual/nix/2.28/language/derivations.html

**Remaining edge cases NOT tested:**
- [ ] Multiple outputs (out, dev, doc) - Test in `nix repl` first
- [ ] Input derivations (buildInputs) - Verify behavior with dependencies
- [ ] Environment variable propagation - Check what gets passed through
- [ ] Content-addressed derivations - Research CA derivations first
- [ ] Fixed-output derivations - Test with fixed hashes

**Action required:**
1. Read derivation documentation thoroughly (30 min)
2. Test each edge case in `nix repl` to understand expected behavior (30 min)
3. Add tests to `main/tests/derivation/001_basic_tests.js` (1-2 hours)
4. Fix any bugs discovered (estimate after testing)

---

## 🔧 Priority 3: Optional Runtime Features (16-22 days)

**BEFORE STARTING:** Read documentation links below for each builtin.

### Task 3.1: fetchMercurial (2-3 days)

**NOT IMPLEMENTED** - Only needed for Mercurial repositories.

**Documentation:**
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-fetchMercurial
- Test in `nix repl`: `builtins.fetchMercurial { url = "https://..."; rev = "..."; }`

**Subtasks:**
1. Research Mercurial fetch protocol (1-2 hours)
2. Find npm module or implement HTTP clone (4-6 hours)
3. Implement revision checkout logic (4-6 hours)
4. Add store path computation (2-3 hours)
5. Write comprehensive tests (3-4 hours)

### Task 3.2: fetchClosure (5-7 days)

**NOT IMPLEMENTED** - Binary cache support, very complex.

**Documentation:**
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-fetchClosure
- Read about Nix binary caches: https://nix.dev/manual/nix/2.28/command-ref/new-cli/nix3-copy.html

**Subtasks:**
1. Research Nix binary cache protocol (1-2 days)
2. Implement NAR download from cache (1-2 days)
3. Implement signature verification (1-2 days)
4. Add cache path resolution (1 day)
5. Write comprehensive tests (1 day)

### Task 3.3: getFlake (5-7 days)

**NOT IMPLEMENTED** - Full flake system, very complex.

**Documentation:**
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-getFlake
- Flakes reference: https://nix.dev/manual/nix/2.28/command-ref/new-cli/nix3-flake.html

**Subtasks:**
1. Research flake lock file format (1 day)
2. Implement flake input resolution (2-3 days)
3. Add flake output schema validation (1-2 days)
4. Handle flake dependencies (1-2 days)
5. Write comprehensive tests (1 day)

### Task 3.4: fetchTree edge cases (4-6 hours)

**PARTIALLY IMPLEMENTED** - Missing type='mercurial', type='path', type='indirect'

**Documentation:**
- https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-fetchTree

**Subtasks:**
1. Implement type='path' (local path fetching) - 1-2 hours
2. Implement type='indirect' (flake reference) - 2-3 hours
3. Implement type='mercurial' (if needed) - 1 hour
4. Add tests for edge cases - 1 hour

---

## 🔍 Priority 4: Translator Edge Cases (2-3 days)

**INCOMPLETE** - Advanced language features NOT fully verified.

**BEFORE STARTING:** Work order rule - do NOT start this until runtime is 80%+ tested.

### Task 4.1: Advanced Pattern Matching (NOT verified)

**Missing test coverage:**
- [ ] Nested @ patterns: `outer@{ inner@{ x, y }, z }`
- [ ] Ellipsis with defaults: `{ x ? 1, ... }@args`
- [ ] Complex destructuring: `{ a ? b.c.d, ... }`

**Action:** Test in `nix repl`, add tests to translator_test.js

### Task 4.2: String Escape Sequences (NOT verified)

**Missing verification:**
- [ ] All escape sequences work: `\n`, `\t`, `\r`, `\\`, `\"`
- [ ] Unicode escapes (if Nix supports them)
- [ ] Multi-line string indentation rules

**Action:** Read Nix string documentation, create comprehensive test suite

### Task 4.3: Path Literal Edge Cases (PARTIALLY implemented)

**Known issues:**
- [ ] `<nixpkgs>` only partially works (line 149 in main.js)
- [ ] Search path resolution NOT fully implemented
- [ ] Relative vs absolute path edge cases

**Action:** Research NIX_PATH behavior, implement properly

### Task 4.4: Operator Precedence (NOT verified)

**Missing verification:**
- [ ] Complex expressions: `a + b * c / d`
- [ ] Mixed comparison: `a < b && c > d`
- [ ] Negation precedence: `!a && b` vs `!(a && b)`

**Action:** Create operator precedence test matrix

### Task 4.5: Additional Language Features (NOT verified)

**Missing test coverage:**
- [ ] Multi-line strings: `'' ... ''`
- [ ] URI literals: `http://example.com`
- [ ] Inherit edge cases: `inherit (x) a b c;`
- [ ] With expression edge cases
- [ ] Ancient let syntax: `let { body = ...; }`

**Action:** Test each feature in `nix repl`, add translator tests

---

## 📚 Priority 5: nixpkgs.lib Testing (4-6 days)

**INCOMPLETE** - Only 10/41 files tested (24% coverage).

**BEFORE STARTING:** Work order rule - do NOT start this until translator is fully verified.

**31 files NOT tested:**
- High value: lists.nix, attrsets.nix, options.nix, modules.nix
- Utilities: meta.nix, debug.nix, filesystem.nix, cli.nix
- Systems: parse.nix, inspect.nix, doubles.nix (+ 6 more)
- Complex: derivations.nix, types.nix, tests.nix (+ 15 more)

**Action:**
1. Start with high-value files (lists, attrsets, options)
2. Test 1 file at a time, fix bugs discovered
3. Goal: 50%+ coverage (20/41 files)

---

## 📁 Codebase Structure

```
denix/
├── main.js                 # Nix → JS translator (1,264 lines)
├── main/
│   ├── runtime.js          # 109 builtins (2,323 lines)
│   ├── fetcher.js          # HTTP downloads
│   ├── tar.js              # Tarball extraction
│   ├── nar_hash.js         # NAR hashing
│   ├── store_manager.js    # Store path management
│   ├── import_cache.js     # Import caching
│   ├── import_loader.js    # File loading
│   └── tests/              # 30 test files (4,000+ lines)
├── tools/
│   ├── hashing.js          # Hash functions
│   ├── store_path.js       # Store path computation
│   ├── import_resolver.js  # Path resolution
│   └── ... (hash implementations)
└── nixpkgs.lib/            # Test data (git submodule)
```

**Test organization (30 files):**
- Builtin tests (13): Core, types, lists, math, attrsets, strings, etc.
- Import tests (5): Resolver, cache, loader, integration, e2e
- Translator tests (4): Translator, hasattr, string/path interpolation
- Infrastructure tests (4): Fetcher, tar, nar_hash, store_manager
- Integration tests (2): nixpkgs trivial, nixpkgs lib files
- Derivation tests (2): Basic tests, standalone tests

---

## 🧪 Test Runner Shortcuts

```bash
./test.sh                # All tests (413 tests)
./test.sh types          # Type checking tests
./test.sh lists          # List operation tests
./test.sh math           # Math/bitwise tests
./test.sh attrs          # Attrset tests
./test.sh strings        # String tests
./test.sh paths          # Path/file tests
./test.sh derivation     # Derivation tests
./test.sh import         # Import system tests
./test.sh translator     # Translator tests
./test.sh integration    # nixpkgs integration tests
./test.sh <pattern>      # Custom filter
```

---

## 📚 Documentation Resources

**Official Nix docs:**
- Builtins: https://nix.dev/manual/nix/2.28/language/builtins.html
- Language: https://nix.dev/manual/nix/2.28/language/
- Derivations: https://nix.dev/manual/nix/2.28/language/derivations.html

**Additional resources:**
- noogle.dev - Searchable Nix function reference
- GitHub nixpkgs - Real-world usage examples
- Nix source code - https://github.com/NixOS/nix/blob/master/src/libexpr/primops.cc

---

## 🚀 Quick Start - Your First Task

**REMEMBER:** Focus only on what's NOT done. No achievements, no blocker excuses.

### Step 0: Verify current state
```bash
git clone <repo>
cd denix
./test.sh  # Verify tests pass
```

### Step 1: Pick ONLY from Priority 1 (Runtime Testing)
**DO NOT** work on Priority 2+ until Priority 1 is complete.
Start with the 2 quick wins: `lessThan` and `mul` (30 minutes).

### Step 2: Read documentation FIRST
```bash
# Open in browser:
# https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-lessThan
```
Read the ENTIRE documentation page for your function. Do not guess behavior.

### Step 3: Test in nix repl (10+ examples)
```bash
nix repl
nix-repl> builtins.lessThan 3 5
true
nix-repl> builtins.lessThan 5 3
false
nix-repl> builtins.lessThan 3 3
false
nix-repl> builtins.lessThan 3.0 5
true
nix-repl> builtins.lessThan "a" "b"
# Test edge cases!
```

### Step 4: Write test matching EXACT nix repl behavior
```javascript
Deno.test("lessThan - basic comparison", () => {
    assertEquals(builtins.lessThan(3n, 5n), true)
    // Add 10+ test cases
})
```

### Step 5: Run test and fix bugs
```bash
deno test --allow-all main/tests/builtins_math_bitwise_test.js
```

**IF TEST FAILS:** Fix runtime.js implementation (never change test to match buggy code)

### Step 6: Update prompt.md
Remove the completed task from Priority 1 checklist. No achievement reporting.

---

## 🎓 Design Patterns

### BigInt vs Number
- Nix integers → JavaScript BigInt (for correct division: `1/2 ≠ 1.0/2`)
- Nix floats → JavaScript number
- All operators handle both types

### Scope Management
- Variables: `nixScope["varName"]` (avoids keyword conflicts)
- Function closures: Use `Object.create(parentScope)` NOT spread operator
- Lazy evaluation: Use getters for recursive attrsets

### String Interpolation
- Plain strings → JavaScript strings
- Interpolated → `InterpolatedString` class (lazy eval)
- Paths → `Path` class (extends `InterpolatedString`)

---

## 🔍 Troubleshooting

**Test fails but nix repl shows different output?**
- Your test is correct, the implementation is wrong
- Fix runtime.js to match nix repl behavior
- NEVER change test to match buggy implementation

**Import error?**
- esm.sh is unreliable - prefer Deno std library (@std/*)
- Only use npm modules through esm.sh: `https://esm.sh/NPM_MODULE_NAME`
- Check if Deno std has equivalent functionality first

**Store path mismatch?**
- Read Nix documentation on store path computation
- Check tools/store_path.js serialization format
- Verify NAR hash computation in main/nar_hash.js
- Test in nix repl to see expected output

**Scope issues?**
- Use Object.create() not spread operator for function closures
- Check runtime.scopeStack management
- Review design patterns section in this doc

**"I'm blocked" or "This is too complex":**
- You are NOT blocked. Break down the task into smaller steps.
- If task seems large, create subtasks and tackle them one at a time.
- Read documentation, search the internet, look at Nix source code.
- No excuses - senior developers find solutions.

---

---

## 📖 Required Reading Before Implementation

**CRITICAL:** Always consult Nix documentation while implementing. Do not guess behavior.

**Primary sources:**
- Official builtins reference: https://nix.dev/manual/nix/2.28/language/builtins.html
- Language reference: https://nix.dev/manual/nix/2.28/language/
- Derivations guide: https://nix.dev/manual/nix/2.28/language/derivations.html

**Secondary sources:**
- noogle.dev - Searchable function reference with examples
- GitHub nixpkgs - Real-world usage patterns
- Nix source code: https://github.com/NixOS/nix/blob/master/src/libexpr/primops.cc

**Example workflow:**
1. Read builtin documentation page for function you're implementing
2. Test actual behavior in `nix repl` with 5-10 examples
3. Check Nix source code if behavior is unclear
4. Search GitHub for real-world usage examples
5. THEN write your implementation matching observed behavior
