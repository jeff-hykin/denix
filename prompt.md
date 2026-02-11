## ⚠️ YOUR MISSION - READ THIS FIRST ⚠️

You are tasked with faithfully creating a nix runtime in JavaScript. A system that both translates nix code to JavaScript and has a runtime.js that implements the nix builtins and operators faithfully.

**Your job is to focus on writing code and implementing what is NOT implemented and NOT working.** Report what remains to be done. You are a senior level developer, no task is blocked for you because you can always delegate your task to other agents by calling `cld <clear focused actionable task description>`.

**YOU ARE A SENIOR LEVEL DEVELOPER:**
- No task is blocked for you - EVER
- No task is too hard - break it down or delegate with `cld <task>`
- No task takes too long - start now, work in parallel
- You can use npm modules through https://esm.sh/NPM_MODULE_NAME (but esm.sh often fails, so have backups)
- You can delegate to other agents: `cld <clear focused actionable task description>`
- You can implement anything yourself - you're senior level

**NPM MODULES - YOU ARE ALLOWED TO USE THEM:**
```javascript
import someLib from "https://esm.sh/some-lib@1.0.0"
```
However, esm.sh is unreliable and often fails. Always have a backup plan (use Deno @std/* or implement yourself).

**YOUR SINGULAR JOB:**
1. Write code that implements what is NOT implemented
2. Fix code that is NOT working
3. Test code that is NOT tested
4. DELETE items from this file when done (no marking, no celebrating)

**🚨 RULES FOR THIS FILE 🚨**
- **NEVER** add achievements, completions, or success stories
- **NEVER** use checkboxes or progress markers
- **NEVER** use words like "completed", "done", "finished", "implemented", "working", "passing", "fixed", "resolved", "achieved"
- **ONLY** write about what is NOT done, NOT working, NOT implemented
- **When something is done:** DELETE the entire item from this file
- **If you find checkboxes:** DELETE those items immediately

# What is NOT Done

## Agent, your job is to specifically implement comprehensive nixpkgs.lib testing no matter how hard or large of a task it is.

**WHAT YOU MUST DO:**
1. Fetch ALL missing nixpkgs.lib files from https://raw.githubusercontent.com/NixOS/nixpkgs/master/lib/
2. Create comprehensive test suites for EVERY file (minimum 5-10 tests per function)
3. Test edge cases, error conditions, and real-world usage patterns
4. Achieve 50%+ test coverage of all nixpkgs.lib files

**YOU ARE A SENIOR DEVELOPER:**
- Break tasks down into smaller pieces
- Delegate to other agents: `cld <task>`
- Use esm.sh for npm modules (but have backups)
- No excuses about complexity or time

**Just implement. No stopping. No asking for permission.**

### What is NOT Done (DELETE ITEMS AS YOU COMPLETE THEM)

**Files in fixtures but NOT TESTED:**
- fetchers.nix - NOT TESTED (in fixtures, no excuse not to test)
- licenses.nix - NOT TESTED (in fixtures, no excuse not to test)

**CRITICAL FILES MISSING (fetch these NOW):**
- `lists.nix` (~30 functions) - NOT FETCHED, NOT TESTED
- `attrsets.nix` (~25 functions) - NOT FETCHED, NOT TESTED
- `options.nix` (~20 functions) - NOT FETCHED, NOT TESTED
- `modules.nix` - NOT FETCHED, NOT TESTED
- `types.nix` - NOT FETCHED, NOT TESTED
- `meta.nix` - NOT FETCHED, NOT TESTED
- `debug.nix` - NOT FETCHED, NOT TESTED
- `filesystem.nix` - NOT FETCHED, NOT TESTED
- `derivations.nix` - NOT FETCHED, NOT TESTED

**Why these matter:** These are the MOST USED nixpkgs.lib functions. Without testing them, the translator cannot be trusted with real Nix code.

### How to Fetch Missing Files

```bash
cd main/tests/fixtures/nixpkgs-lib/lib/
curl -O https://raw.githubusercontent.com/NixOS/nixpkgs/master/lib/lists.nix
curl -O https://raw.githubusercontent.com/NixOS/nixpkgs/master/lib/attrsets.nix
curl -O https://raw.githubusercontent.com/NixOS/nixpkgs/master/lib/options.nix
# etc...
```

### How to Create Tests

1. **Research the file in nix repl:**
   ```bash
   nix repl
   > :l <nixpkgs/lib>
   > lists.map (x: x * 2) [1 2 3]
   ```

2. **Create test file:**
   ```javascript
   // main/tests/nixpkgs_lib_<filename>_test.js
   import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
   import translate from "../translator.js"
   import { builtins } from "../runtime.js"

   Deno.test("lib.<function> - behavior", async () => {
       const nixCode = `
           let
               lib = import ./tests/fixtures/nixpkgs-lib/lib/<filename>.nix { inherit (builtins) ... };
           in
               lib.someFunction testInput
       `;
       const jsCode = translate(nixCode);
       const result = new Function('builtins', 'return ' + jsCode)(builtins);
       assertEquals(result, expectedValue);
   });
   ```

3. **Test edge cases:**
   - Empty inputs ([], {}, "", null)
   - Type mismatches
   - Large inputs
   - Nested structures
   - Error conditions

4. **Verify:** `deno test --allow-all`

## TRANSLATOR EDGE CASES NOT TESTED

**Pattern Matching Gaps:**
- Nested `@` patterns: `{ x, y } @ args @ full` - NOT TESTED
- Ellipsis with defaults: `{ a ? 1, ... }` - NOT TESTED
- Complex destructuring in function args - NOT FULLY TESTED

**String/Path Gaps:**
- Multi-line strings with mixed indentation - NOT TESTED
- Ancient URI literals (deprecated but may appear) - NOT TESTED
- Path concatenation edge cases - NOT TESTED
- All string escape sequences - NOT FULLY VERIFIED

**Operator Precedence:**
- Complex nested operators - NOT FULLY TESTED
- Precedence with `->`, `//`, `++` - NOT FULLY TESTED

**Other Language Features:**
- `inherit (expr) names` - NOT FULLY TESTED
- Nested `with` statements - scope handling NOT FULLY TESTED
- `rec` with complex interdependencies - NOT FULLY TESTED

## ADVANCED FEATURES PARTIAL IMPLEMENTATIONS

**fetchClosure (main/runtime.js):**
- Currently returns stub
- NOT IMPLEMENTED: binary cache API, NAR parsing, signature verification

**getFlake (main/runtime.js):**
- Currently returns stub
- NOT IMPLEMENTED: flake.lock parsing, github/gitlab/git fetchers, registry lookups

**fetchTree edge cases (main/runtime.js):**
- `type='path'` - NOT IMPLEMENTED
- `type='indirect'` - NOT IMPLEMENTED

## TEST PROCESS

1. Research in nix repl (understand expected behavior)
2. Find real-world usage in nixpkgs.lib source
3. Write test file with multiple test cases
4. Test edge cases (empty, null, type mismatches, large inputs, nested structures)
5. Verify all tests pass: `deno test --allow-all`

## USEFUL COMMANDS

```bash
# Run all tests
deno test --allow-all
./test.sh

# Run specific test
deno test --allow-all main/tests/nixpkgs_lib_<name>_test.js
./test.sh <pattern>

# Test Nix behavior
nix repl
> :l <nixpkgs/lib>
> lists.map (x: x * 2) [1 2 3]

# Check tested files
grep -r "nixpkgs_lib_" main/tests/

# Fetch nixpkgs.lib files
cd main/tests/fixtures/nixpkgs-lib/lib/
curl -O https://raw.githubusercontent.com/NixOS/nixpkgs/master/lib/<filename>.nix
```

## WORK ORDER (DO NOT SKIP STEPS)

**PRIORITY 1: Test existing fixtures (DO THIS FIRST, 1-2 hours)**
- fetchers.nix - NOT TESTED
- licenses.nix - NOT TESTED
(Delete these lines when tests are created and passing)

**PRIORITY 2: Fetch and test critical files (DO NEXT, 8-16 hours)**
- lists.nix - NOT FETCHED, NOT TESTED (~30 functions, 3-5 hours)
- attrsets.nix - NOT FETCHED, NOT TESTED (~25 functions, 3-4 hours)
- options.nix - NOT FETCHED, NOT TESTED (~20 functions, 2-3 hours)
(Delete these lines when files are fetched, tests are created, and tests pass)

**PRIORITY 3: Fetch and test utility files (DO AFTER PRIORITY 2, 6-12 hours)**
- meta.nix - NOT FETCHED, NOT TESTED
- debug.nix - NOT FETCHED, NOT TESTED
- filesystem.nix - NOT FETCHED, NOT TESTED
- derivations.nix - NOT FETCHED, NOT TESTED
(Delete these lines when files are fetched, tests are created, and tests pass)

**PRIORITY 4: Test translator edge cases (ONLY AFTER PRIORITIES 1-3, 2-3 hours)**
- Pattern matching edge cases - NOT TESTED
- String/path handling - NOT TESTED
- Operator precedence - NOT TESTED
(Delete these lines when tests are created and passing)

**PRIORITY 5: Implement advanced features (OPTIONAL - only if user requests)**
- fetchClosure - PARTIAL IMPLEMENTATION (5-7 hours)
- getFlake - PARTIAL IMPLEMENTATION (5-7 hours)
- fetchTree edge cases - NOT IMPLEMENTED (4-6 hours)
(These are low priority, only implement if explicitly requested)


---

## Immediate Actions

**Step 1: Test existing fixtures**
1. Create `main/tests/nixpkgs_lib_fetchers_test.js`
2. Create `main/tests/nixpkgs_lib_licenses_test.js`
3. Run tests: `deno test --allow-all`
4. Delete the completed items from PRIORITY 1

**Step 2: Fetch critical missing files**
```bash
cd main/tests/fixtures/nixpkgs-lib/lib/
curl -O https://raw.githubusercontent.com/NixOS/nixpkgs/master/lib/lists.nix
curl -O https://raw.githubusercontent.com/NixOS/nixpkgs/master/lib/attrsets.nix
curl -O https://raw.githubusercontent.com/NixOS/nixpkgs/master/lib/options.nix
curl -O https://raw.githubusercontent.com/NixOS/nixpkgs/master/lib/meta.nix
curl -O https://raw.githubusercontent.com/NixOS/nixpkgs/master/lib/debug.nix
curl -O https://raw.githubusercontent.com/NixOS/nixpkgs/master/lib/filesystem.nix
curl -O https://raw.githubusercontent.com/NixOS/nixpkgs/master/lib/derivations.nix
```

**Step 3: Create comprehensive test suites**
1. Test lists.nix - Create `main/tests/nixpkgs_lib_lists_test.js`
2. Test attrsets.nix - Create `main/tests/nixpkgs_lib_attrsets_test.js`
3. Test options.nix - Create `main/tests/nixpkgs_lib_options_test.js`
4. Delete corresponding lines from priorities when done

**RULES:**
- Delete items from this file when done (no marking)
- Break large tasks into smaller ones
- Delegate with `cld <task>` if needed
- No excuses about complexity or time
