## ⚠️ YOUR MISSION - READ THIS FIRST ⚠️

**YOU ARE TASKED WITH FAITHFULLY CREATING A NIX RUNTIME IN JAVASCRIPT.**

A system that both translates nix code to JavaScript and has a runtime.js that implements the nix builtins and operators faithfully.

**AGENT, YOUR JOB IS TO SPECIFICALLY IMPLEMENT COMPREHENSIVE NIXPKGS.LIB TESTING NO MATTER HOW HARD OR LARGE OF A TASK IT IS.**

**YOUR SINGULAR FOCUS:**
Write code and implement what is NOT implemented and NOT working. Report what remains to be done.

**YOU ARE A SENIOR LEVEL DEVELOPER:**
- No task is blocked for you - EVER
- No task is too hard - break it down or delegate to specialized agents using the Task tool
- No task takes too long - start immediately, work in parallel
- You can delegate complex tasks to other agents by calling `cld <clear focused actionable task description>`
  - Example: `cld "fetch lists.nix from nixpkgs and create comprehensive test suite with 30+ tests"`
  - Use this LIBERALLY - delegate research, testing, implementation, anything
  - Multiple agents can work in parallel - use them!
- You can use npm modules ONLY through https://esm.sh/NPM_MODULE_NAME
  - Example: `import someLib from "https://esm.sh/some-lib@1.0.0"`
  - WARNING: esm.sh is unreliable and often fails
  - Always have a backup plan (use Deno @std/* or implement yourself)
- You can implement anything yourself - you're senior level

**IF YOU SEE A LARGE OR HARD TASK:**
Break it down into smaller pieces OR delegate to specialized agents. No excuses. Large tasks are YOUR SPECIALTY.

**YOUR THREE COMMANDMENTS:**
1. Write code that implements what is NOT implemented
2. Fix code that is NOT working
3. Test code that is NOT tested

**🚨 ABSOLUTE RULES FOR THIS FILE 🚨**
- **NEVER** add achievements, completions, success stories, or progress updates
- **NEVER** use checkboxes (✅ ❌ ☑ ✓ ✔), progress markers, or completion indicators
- **NEVER** use words like "completed", "done", "finished", "implemented", "working", "passing", "fixed", "resolved", "achieved", "success"
- **ONLY** write about what is NOT done, NOT working, NOT implemented, NOT tested
- **When something is done:** DELETE the entire item from this file immediately
- **If you find checkboxes or achievements:** DELETE those items immediately - they violate the core purpose of this file

**WHY THESE RULES EXIST:**
This file is a TODO list, not a progress report. Achievements go in MEMORY.md or git commits, not here.

**IF YOU ARE TEMPTED TO:**
- Add a checkbox → DELETE items that are done instead
- Report progress → DELETE items that are done instead
- Celebrate success → DELETE items that are done and move on
- Ask "what should I do next?" → Read the WORK ORDER section and do the next thing
- Say a task is "too large" → Break it down or delegate using the Task tool
- Say you need "permission" → You don't. You're senior level. Just do it.
- Say something is "blocked" → Nothing is blocked. Find another way or delegate.

**REMEMBER:** You can delegate to other specialized agents using the Task tool. Use it for:
- Parallel work on multiple test files
- Research tasks (finding documentation, examples)
- Complex implementations you want to offload

# What is NOT Done

## 🎯 AGENT, YOUR JOB IS TO SPECIFICALLY IMPLEMENT COMPREHENSIVE NIXPKGS.LIB TESTING NO MATTER HOW HARD OR LARGE OF A TASK IT IS.

**THIS IS YOUR SINGULAR ASSIGNMENT:**

You must create comprehensive test coverage for nixpkgs.lib files. This is NOT optional. This is NOT negotiable. This task is LARGE and COMPLEX - exactly the kind of task a senior developer excels at.

**WHAT YOU MUST IMPLEMENT RIGHT NOW:**
1. Fetch ALL missing nixpkgs.lib files from https://raw.githubusercontent.com/NixOS/nixpkgs/master/lib/
2. Create comprehensive test suites for EVERY file (minimum 5-10 tests per function)
3. Test edge cases, error conditions, and real-world usage patterns
4. Achieve 50%+ test coverage of all nixpkgs.lib files (at minimum)
5. Fix ANY bugs discovered during testing

**HOW TO HANDLE THIS LARGE TASK:**
- Break it down into smaller sub-tasks
- Work on multiple files in PARALLEL using multiple agents
- Delegate to specialized agents: `cld "fetch and test lists.nix with 30+ test cases"`
- Delegate research: `cld "research how nixpkgs.lib.attrsets functions work in nix repl"`
- Delegate implementation: `cld "create comprehensive test suite for options.nix"`
- Use esm.sh for npm modules ONLY (always have Deno @std/* backups because esm.sh fails frequently)
- No excuses about complexity, time, or difficulty
- Start immediately and work continuously until complete

**YOUR PHILOSOPHY:**
- Never ask for permission - just implement
- Never report achievements - just delete completed items from this file
- Never say tasks are blocked - find another way or delegate
- Never say tasks are too large - break them down or delegate
- Never stop until all items are deleted from this file

**JUST IMPLEMENT. NO STOPPING. NO ASKING FOR PERMISSION. NO REPORTING ACHIEVEMENTS.**

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

## WORK ORDER (FOLLOW THIS SEQUENCE - NO SKIPPING)

**🚨 CRITICAL RULE: Work on priorities in order. Do NOT skip ahead. Do NOT ask permission to move to next priority. Just delete items as you finish them. 🚨**

**PRIORITY 1: Test existing fixtures (START HERE - 1-2 hours total)**
- fetchers.nix - NOT TESTED (fixtures/nixpkgs-lib/lib/fetchers.nix exists, create test file)
- licenses.nix - NOT TESTED (fixtures/nixpkgs-lib/lib/licenses.nix exists, create test file)

Instructions: Create test files, run `deno test --allow-all`, fix any bugs found, then DELETE these lines.

**PRIORITY 2: Fetch and test critical files (DO NEXT - 8-16 hours total)**
- lists.nix - NOT FETCHED, NOT TESTED (~30 functions: map, filter, fold, flatten, unique, sort, etc.)
- attrsets.nix - NOT FETCHED, NOT TESTED (~25 functions: mapAttrs, filterAttrs, mergeAttrs, etc.)
- options.nix - NOT FETCHED, NOT TESTED (~20 functions: mkOption, mkEnableOption, mkDefault, etc.)

Instructions: Fetch from nixpkgs master, create comprehensive tests (5-10 per function), fix bugs, DELETE these lines.

**PRIORITY 3: Fetch and test utility files (DO AFTER PRIORITY 2 - 6-12 hours total)**
- meta.nix - NOT FETCHED, NOT TESTED (metadata utility functions)
- debug.nix - NOT FETCHED, NOT TESTED (debugging helpers)
- filesystem.nix - NOT FETCHED, NOT TESTED (filesystem operations)
- derivations.nix - NOT FETCHED, NOT TESTED (derivation utilities)

Instructions: Fetch from nixpkgs master, create comprehensive tests, fix bugs, DELETE these lines.

**PRIORITY 4: Test translator edge cases (ONLY AFTER PRIORITIES 1-3 - 2-3 hours total)**
- Nested `@` patterns - NOT TESTED (create translator test cases)
- Ellipsis with defaults `{ a ? 1, ... }` - NOT TESTED (create translator test cases)
- Multi-line strings with mixed indentation - NOT TESTED (create translator test cases)
- Complex operator precedence - NOT TESTED (create translator test cases)

Instructions: Create translator test files with edge cases, fix translator bugs, DELETE these lines.

**PRIORITY 5: Implement advanced features (OPTIONAL - only if user explicitly requests)**
- fetchClosure - PARTIAL IMPLEMENTATION (needs binary cache API, NAR parsing, signatures)
- getFlake - PARTIAL IMPLEMENTATION (needs flake.lock parsing, registry lookups)
- fetchTree edge cases - NOT IMPLEMENTED (type='path', type='indirect')

Instructions: Only work on these if user specifically asks. Otherwise IGNORE and focus on Priorities 1-4.


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
