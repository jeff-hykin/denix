## ⚠️ YOUR MISSION - READ THIS FIRST ⚠️

**YOU ARE TASKED WITH FAITHFULLY CREATING A NIX RUNTIME IN JAVASCRIPT.**

A system that both translates nix code to JavaScript and has a runtime.js that implements the nix builtins and operators faithfully.

**YOUR JOB IS TO FOCUS ON WRITING CODE AND IMPLEMENTING WHAT IS NOT IMPLEMENTED AND NOT WORKING.**

Report what remains to be done. You are a senior level developer - no task is blocked for you because you can always delegate your task to other agents by calling the Task tool with appropriate subagent_type.

**AGENT, YOUR JOB IS TO SPECIFICALLY IMPLEMENT COMPREHENSIVE NIXPKGS.LIB TESTING NO MATTER HOW HARD OR LARGE OF A TASK IT IS.**

This is your singular assignment. You are NOT allowed to skip this. You are NOT allowed to say it's too hard. Break down the task, delegate to multiple agents in parallel, and implement until completion.

**YOUR SINGULAR FOCUS:**
Write code and implement what is NOT implemented and NOT working. Report what remains to be done.

**WHAT "NOT" MEANS:**
- NOT implemented = feature does not exist, must write code to create it
- NOT working = feature exists but has bugs, must fix the code
- NOT tested = feature exists but lacks tests, must write tests
- NOT done = any of the above, you must implement immediately

**YOU ARE A SENIOR LEVEL DEVELOPER:**
- No task is blocked for you - EVER
- No task is too hard - break it down or delegate to specialized agents using the Task tool
- No task takes too long - start immediately, work in parallel
- You MUST delegate complex tasks to other agents using the Task tool with appropriate subagent_type:
  - Use subagent_type="general-purpose" for most tasks
  - Use subagent_type="Explore" for deep codebase analysis
  - Use subagent_type="Bash" for git operations and shell commands
  - Example delegation: "Fetch lists.nix from nixpkgs master branch and create comprehensive test suite with 30+ tests covering map, filter, fold, flatten, unique, sort, partition, and all other list functions"
  - Use delegation LIBERALLY - delegate research, testing, implementation, anything that can be parallelized
  - Multiple agents can work in parallel - launch 3-5 agents simultaneously for different files
  - Large tasks require parallelization through delegation
- You can use npm modules but ONLY through https://esm.sh/NPM_MODULE_NAME
  - Example: `import someLib from "https://esm.sh/some-lib@1.0.0"`
  - WARNING: esm.sh is unreliable and often fails - it does NOT always work
  - Always have a backup plan (use Deno @std/* or implement yourself)
  - If esm.sh fails, immediately switch to Deno @std/* or implement yourself
- You can implement anything yourself

**IF YOU SEE A LARGE OR HARD TASK:**
Break it down into smaller pieces OR delegate to specialized agents. No excuses.

**YOUR THREE COMMANDMENTS:**
1. Write code that implements what is NOT implemented
2. Fix code that is NOT working
3. Test code that is NOT tested

**🚨 ABSOLUTE RULES FOR THIS FILE 🚨**
- **NEVER** add achievements, completions, success stories, or progress updates
- **NEVER** use checkboxes (✅ ❌ ☑ ✓ ✔), progress markers, or completion indicators
- **NEVER** use words like "completed", "done", "finished", "implemented", "working", "passing", "fixed", "resolved", "achieved", "success", "successfully", "verified", "confirmed"
- **ONLY** write about what is NOT done, NOT working, NOT implemented, NOT tested
- **When something is done:** DELETE the entire item from this file immediately - no exceptions
- **If you find checkboxes or achievements:** DELETE those items immediately - they violate the core purpose of this file
- **If you see phrases like "was X, now Y" or "improved from X to Y":** DELETE them - this is achievement reporting
- **If you see historical notes or session summaries:** Those belong in MEMORY.md, NOT here - DELETE them
- **If you see lists of test counts or coverage percentages that imply completion:** DELETE them - focus on what is NOT tested

**WHY THESE RULES EXIST:**
This file is a TODO list, not a progress report. Achievements go in MEMORY.md or git commits, NEVER here.

**IF YOU ARE TEMPTED TO:**
- Add a checkbox → DELETE items that are done instead
- Report progress → DELETE items that are done instead
- Celebrate success → DELETE items that are done and move on
- Write session summaries → Those go in MEMORY.md, NOT here - focus on implementing
- Ask "what should I do next?" → Read the WORK ORDER section and implement the next thing immediately
- Say a task is "too large" → Break it down or delegate using the Task tool immediately
- Say you need "permission" → You don't. You're senior level. Just implement it immediately.
- Say something is "blocked" → Nothing is blocked. Find another way or delegate immediately.
- Say "esm.sh doesn't work" → Switch to Deno @std/* or implement yourself immediately.
- Ask if you should proceed → Just proceed immediately. You're senior level.
- Report what you plan to do → Just do it immediately. No planning messages.
- Explain why something is important → Just implement it immediately. No explanations needed.

**🚨 ENFORCEMENT RULES 🚨**
- When you open this file and see checkboxes (✅ ❌ etc): DELETE those items immediately without comment
- When you open this file and see achievement language: DELETE those items immediately without comment
- When you finish implementing something: DELETE that item from this file immediately without announcing it
- Your job is to SHRINK this file by implementing features, NOT grow it with reports
- When you see phrases describing past work or improvements: DELETE them immediately without comment
- When you see comparisons to previous states: DELETE them immediately without comment
- This file should ONLY contain: "X is NOT done" or "Y is NOT implemented" or "Z is NOT tested"
- DO NOT announce deletions, DO NOT explain why you deleted something, just DELETE and move on
- DO NOT report what you're about to do, just DO IT and delete the item when done
- DO NOT ask for confirmation before deleting achievement language - just DELETE IT

**REMEMBER:** You can and MUST delegate to other specialized agents using the Task tool. Use it for:
- Parallel work on multiple test files (launch 3-5 agents in ONE message)
- Research tasks (finding documentation, examples)
- Complex implementations you want to offload
- ANY task that can be done in parallel
- Large tasks that you want to break down (delegate the subtask)
- When you need to focus on multiple things simultaneously

**DELEGATION IS MANDATORY FOR LARGE TASKS:**
- DO NOT work sequentially on lists.nix, then attrsets.nix, then options.nix
- INSTEAD: Launch 3 agents in parallel (one message, three Task tool calls)
- DO NOT say "I'll start with X" - just launch all agents immediately
- DO NOT explain your delegation strategy - just delegate
- DO NOT report what agents are working on - they will report back when done

# What is NOT Done

## 🎯 AGENT, YOUR JOB IS TO SPECIFICALLY IMPLEMENT COMPREHENSIVE NIXPKGS.LIB TESTING NO MATTER HOW HARD OR LARGE OF A TASK IT IS.

**THIS IS YOUR SINGULAR ASSIGNMENT:**

Comprehensive test coverage for nixpkgs.lib files is NOT done. Critical files like lists.nix, attrsets.nix, and options.nix are NOT tested. This task is LARGE and COMPLEX - exactly the kind of task you are REQUIRED to excel at as a senior developer.

**WHAT IS NOT IMPLEMENTED RIGHT NOW:**
1. Most nixpkgs.lib files are NOT tested (lists.nix, attrsets.nix, options.nix, and many others)
2. Edge case testing for translator features is NOT done
3. Advanced fetcher features are NOT fully implemented

**YOUR APPROACH MUST BE:**
- Delegate to multiple agents in parallel using the Task tool
- Launch 3-5 agents simultaneously for different test files
- Use subagent_type="general-purpose" for most testing tasks
- Break the large task into smaller parallel tasks
- Do NOT work sequentially - work in PARALLEL

**HOW TO IMPLEMENT THIS LARGE TASK (REQUIRED APPROACH):**
- Launch 3-5 parallel agents immediately using multiple Task tool invocations in a single message
- Each agent handles a different file or feature
- Example parallel delegation (all in ONE message):
  - Agent 1: "Fetch lists.nix from nixpkgs master and create comprehensive test suite with 30+ tests"
  - Agent 2: "Fetch attrsets.nix from nixpkgs master and create comprehensive test suite with 25+ tests"
  - Agent 3: "Fetch options.nix from nixpkgs master and create comprehensive test suite with 20+ tests"
  - Agent 4: "Create comprehensive test suite for fetchers.nix in fixtures directory"
  - Agent 5: "Create comprehensive test suite for licenses.nix in fixtures directory"
- Use npm modules ONLY through https://esm.sh/NPM_MODULE_NAME
  - WARNING: esm.sh is unreliable and often fails - it does NOT always work
  - If esm.sh fails: immediately switch to Deno @std/* or implement yourself
  - Never report esm.sh failures as blockers - just use alternatives immediately
- No excuses about complexity, time, or difficulty - just implement
- Start immediately and work continuously until items are deleted from this file
- DO NOT work sequentially - ALWAYS work in parallel by launching multiple agents

**YOUR IMPLEMENTATION PHILOSOPHY:**
- Never ask for permission - just implement immediately
- Never report achievements - just delete completed items from this file silently
- Never say tasks are blocked - find another way or delegate immediately
- Never say tasks are too large - break them down or delegate to parallel agents immediately
- Never stop until all items are deleted from this file
- Never announce what you're about to do - just do it
- Never explain your actions - just implement and delete when done
- Launch multiple agents in parallel in a SINGLE message - this is faster than sequential work

**IMPLEMENT IN PARALLEL. DELETE COMPLETED ITEMS SILENTLY. REPEAT.**

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

**PRIORITY 1: Test existing fixtures (START HERE)**
- fetchers.nix - NOT TESTED (fixtures/nixpkgs-lib/lib/fetchers.nix exists, test file does NOT exist)
- licenses.nix - NOT TESTED (fixtures/nixpkgs-lib/lib/licenses.nix exists, test file does NOT exist)

What to implement: Create main/tests/nixpkgs_lib_fetchers_test.js and main/tests/nixpkgs_lib_licenses_test.js with comprehensive test coverage (minimum 10 tests per file). Run `deno test --allow-all`, fix any bugs, then DELETE these lines.

**PRIORITY 2: Fetch and test critical files (DO NEXT)**
- lists.nix - NOT FETCHED, NOT TESTED (~30 functions: map, filter, fold, flatten, unique, sort, etc.)
- attrsets.nix - NOT FETCHED, NOT TESTED (~25 functions: mapAttrs, filterAttrs, mergeAttrs, etc.)
- options.nix - NOT FETCHED, NOT TESTED (~20 functions: mkOption, mkEnableOption, mkDefault, etc.)

What to implement: Use Bash to curl files from https://raw.githubusercontent.com/NixOS/nixpkgs/master/lib/, create test files with 5-10 tests per function, fix bugs, DELETE these lines.

**PRIORITY 3: Fetch and test utility files (DO AFTER PRIORITY 2)**
- meta.nix - NOT FETCHED, NOT TESTED (metadata utility functions)
- debug.nix - NOT FETCHED, NOT TESTED (debugging helpers)
- filesystem.nix - NOT FETCHED, NOT TESTED (filesystem operations)
- derivations.nix - NOT FETCHED, NOT TESTED (derivation utilities)

What to implement: Use Bash to curl files from nixpkgs master, create comprehensive test files, fix bugs, DELETE these lines.

**PRIORITY 4: Test translator edge cases (ONLY AFTER PRIORITIES 1-3)**
- Nested `@` patterns - NOT TESTED (translator feature exists but NOT tested)
- Ellipsis with defaults `{ a ? 1, ... }` - NOT TESTED (translator feature exists but NOT tested)
- Multi-line strings with mixed indentation - NOT TESTED (translator feature exists but NOT tested)
- Complex operator precedence - NOT TESTED (translator feature exists but NOT tested)

What to implement: Create main/tests/translator_edge_cases_test.js with comprehensive edge case tests, fix translator bugs, DELETE these lines.

**PRIORITY 5: Implement advanced features (ONLY if user explicitly requests)**
- fetchClosure - PARTIAL IMPLEMENTATION (binary cache API NOT implemented, NAR parsing NOT implemented, signature verification NOT implemented)
- getFlake - PARTIAL IMPLEMENTATION (flake.lock parsing NOT implemented, registry lookups NOT implemented)
- fetchTree edge cases - NOT IMPLEMENTED (type='path' NOT implemented, type='indirect' NOT implemented)

What to implement: IGNORE these unless user specifically requests. Focus on Priorities 1-4 instead.


---

## What to Implement Right Now

**START IMMEDIATELY - Launch ALL these agents in parallel in ONE message:**

Launch 5 agents simultaneously using the Task tool (all in ONE message):

**Agent 1:** "Create comprehensive test suite for fetchers.nix in main/tests/fixtures/nixpkgs-lib/lib/ directory with minimum 10 test cases. Create file main/tests/nixpkgs_lib_fetchers_test.js. Test all fetcher utility functions."

**Agent 2:** "Create comprehensive test suite for licenses.nix in main/tests/fixtures/nixpkgs-lib/lib/ directory with minimum 10 test cases. Create file main/tests/nixpkgs_lib_licenses_test.js. Test license metadata functions."

**Agent 3:** "Fetch lists.nix from https://raw.githubusercontent.com/NixOS/nixpkgs/master/lib/lists.nix to main/tests/fixtures/nixpkgs-lib/lib/ directory, then create comprehensive test suite main/tests/nixpkgs_lib_lists_test.js with 30+ test cases covering map, filter, fold, flatten, unique, sort, partition, and all list functions."

**Agent 4:** "Fetch attrsets.nix from https://raw.githubusercontent.com/NixOS/nixpkgs/master/lib/attrsets.nix to main/tests/fixtures/nixpkgs-lib/lib/ directory, then create comprehensive test suite main/tests/nixpkgs_lib_attrsets_test.js with 25+ test cases covering mapAttrs, filterAttrs, mergeAttrs, recursiveUpdate, and all attrset functions."

**Agent 5:** "Fetch options.nix from https://raw.githubusercontent.com/NixOS/nixpkgs/master/lib/options.nix to main/tests/fixtures/nixpkgs-lib/lib/ directory, then create comprehensive test suite main/tests/nixpkgs_lib_options_test.js with 20+ test cases covering mkOption, mkEnableOption, mkDefault, mkForce, and all option functions."

**DO NOT:**
- Work sequentially
- Explain what you're doing
- Ask for permission
- Report progress
- Announce your plan

**JUST DO:**
- Launch all 5 agents in ONE message NOW
- Delete items from PRIORITY 1 and 2 when agents complete
- Launch more agents for PRIORITY 3 items after these complete
