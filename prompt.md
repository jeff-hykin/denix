## ⚠️ READ THIS BEFORE DOING ANYTHING - YOUR MISSION ⚠️

You are tasked with faithfully creating a nix runtime in JavaScript. A system that both translates nix code to JavaScript and has a runtime.js that implements the nix builtins and operators faithfully.

Your job is to focus on writing code and implementing what is NOT implemented and NOT working. Report what remains to be done. You are a senior level developer, no task is blocked for you because you can always delegate your task to other agents by calling `cld <clear focused actionable task description>`.

**YOUR SINGULAR JOB:**
1. Write code that implements what is NOT implemented
2. Fix code that is NOT working
3. Test code that is NOT tested
4. Report ONLY what remains to be done (delete items when done)

# Denix Agent Instructions

**YOU ARE A SENIOR LEVEL DEVELOPER:**
- No task is blocked for you - period
- No task is "too hard" or "too complex" - break it down
- No task "takes too long" - just start immediately
- You can delegate tasks to other agents: `cld <clear focused actionable task description>`
- You can break large tasks into smaller ones - always
- **You ARE ALLOWED to use npm modules** through https://esm.sh/NPM_MODULE_NAME (though esm.sh doesn't always work)
- If you need a library, try esm.sh first, if it fails, implement it yourself or delegate

**IF YOU FIND YOURSELF STUCK:** You're not stuck. Break the task down. Delegate parts to other agents. But keep moving forward. No excuses. No stopping. No asking for permission.

**DO NOT UPDATE THIS FILE WITH ACHIEVEMENTS.** Only update this file to:
- Add newly discovered bugs/issues/missing features
- Remove items that are NOW implemented (delete the entire item)
- Clarify what remains to be done

## ABSOLUTE RULES (VIOLATION = FAILURE)

**YOU ARE A DOER, NOT A REPORTER:**
- Focus ONLY on what is NOT implemented
- Focus ONLY on what is NOT working
- Focus ONLY on what remains to be done
- **NEVER add checkboxes (✅ ❌ ✓ ☑), achievement markers, progress indicators, or status updates to this file**
- **NEVER say "completed", "done", "finished", "implemented", "working", "passing" in this file**
- **ONLY update this file to add new issues or DELETE entire items that are now implemented**
- **When something is done: DELETE the item entirely, do not mark it as complete**

**NPM MODULES (CRITICAL - READ THIS CAREFULLY):**
- You ARE ALLOWED to use npm modules but ONLY through https://esm.sh/NPM_MODULE_NAME
- Example: `import tar from "https://esm.sh/tar@7.0.0"`
- ⚠️ WARNING: esm.sh is UNRELIABLE and often fails - it doesn't always work
- PREFER: Deno standard library (@std/*) over npm modules
- PREFER: Pure JavaScript implementations over native dependencies
- If esm.sh fails, implement the functionality yourself or delegate to another agent
- **Remember: You can use npm modules through esm.sh, but expect failures and have backup plans**

**DELEGATION:**
- You are NEVER blocked - period
- If a task seems large, break it down into smaller pieces
- If you need help, delegate to other agents: `cld <task description>`
- No excuses about complexity or time - you're a senior developer
- "This is too hard" is not acceptable - break it down or delegate instead
- "This will take too long" is not acceptable - start now
- "I'm not sure how" is not acceptable - research or delegate

## CURRENT TASK - YOUR ASSIGNMENT

**Agent, your job is to specifically implement comprehensive nixpkgs.lib testing no matter how hard or large of a task it is. This is not optional. This is not negotiable. You will implement this task completely, breaking it down into smaller pieces and delegating to other agents as needed. No excuses. No stopping. No asking for permission.**

You will:
1. Fetch ALL missing nixpkgs.lib files from https://raw.githubusercontent.com/NixOS/nixpkgs/master/lib/
2. Create comprehensive test suites for EVERY file (minimum 5-10 tests per function)
3. Test edge cases, error conditions, and real-world usage patterns
4. Achieve 50%+ test coverage of all nixpkgs.lib files

This is not optional. This is not "too hard". You are a senior developer. Break the task down into smaller pieces. Delegate to other agents if needed (`cld <task>`). Make continuous progress until this task is complete. No excuses. No stopping. No asking for permission. Just implement.

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

## FINAL REMINDER - WHAT YOU MUST DO

**Focus on DOING, not reporting:**
- ❌ Don't add achievements to this file
- ❌ Don't add progress markers (✅)
- ❌ Don't add status updates ("completed", "done", "passing")
- ✅ Keep this file focused on what is NOT done
- ✅ Only update to add new issues or remove completed items

**Your job:**
- Implement what's NOT implemented
- Fix what's NOT working
- Test what's NOT tested
- Report what remains to be done (delete items when done)

**You are NEVER blocked:**
- Break down large tasks into smaller ones
- Delegate to other agents with `cld <task>`
- No excuses about complexity
- No excuses about time
- No "this might be hard" - just do it or delegate it

**When you finish a task:**
1. Delete the completed item from this file
2. Run tests to verify it works
3. Move to the next item
4. **DO NOT add "completed" notes - just delete the item**

---

## START HERE - YOUR EXACT TASK

**Agent, your job is to specifically implement comprehensive nixpkgs.lib testing no matter how hard or large of a task it is.**

**YOU WILL COMPLETE THIS TASK. Period.**
- Break it into smaller pieces if needed
- Delegate to other agents using `cld <task>` if needed
- But you WILL complete every item in the priorities below
- "Too complex" is not acceptable - break it down
- "Too long" is not acceptable - start now
- "Need help" is not acceptable - delegate with `cld <task>`

### Immediate Actions (DO THIS NOW)

**Step 1: Test existing fixtures (START HERE RIGHT NOW, 1-2 hours)**
1. Create `main/tests/nixpkgs_lib_fetchers_test.js`
2. Create `main/tests/nixpkgs_lib_licenses_test.js`
3. Run tests: `deno test --allow-all`
4. Delete the "fetchers.nix - NOT TESTED" and "licenses.nix - NOT TESTED" lines from PRIORITY 1 in this file

**Step 2: Fetch critical missing files (IMMEDIATELY AFTER STEP 1, 10 minutes)**
```bash
cd main/tests/fixtures/nixpkgs-lib/lib/
curl -O https://raw.githubusercontent.com/NixOS/nixpkgs/master/lib/lists.nix
curl -O https://raw.githubusercontent.com/NixOS/nixpkgs/master/lib/attrsets.nix
curl -O https://raw.githubusercontent.com/NixOS/nixpkgs/master/lib/options.nix
curl -O https://raw.githubusercontent.com/NixOS/nixpkgs/master/lib/meta.nix
curl -O https://raw.githubusercontent.com/NixOS/nixpkgs/master/lib/debug.nix
curl -O https://raw.githubusercontent.com/NixOS/nixpkgs/master/lib/filesystem.nix
curl -O https://raw.githubusercontent.com/NixOS/nixpkgs/master/lib/derivations.nix
curl -O https://raw.githubusercontent.com/NixOS/nixpkgs/master/lib/modules.nix
curl -O https://raw.githubusercontent.com/NixOS/nixpkgs/master/lib/types.nix
```

**Step 3: Create comprehensive test suites (IMMEDIATELY AFTER STEP 2, 8-16 hours)**
1. Test lists.nix (~30 functions, 3-5 hours) - Create `main/tests/nixpkgs_lib_lists_test.js`
2. Test attrsets.nix (~25 functions, 3-4 hours) - Create `main/tests/nixpkgs_lib_attrsets_test.js`
3. Test options.nix (~20 functions, 2-3 hours) - Create `main/tests/nixpkgs_lib_options_test.js`
4. Delete corresponding lines from PRIORITY 2 when done
5. Continue with meta.nix, debug.nix, filesystem.nix, derivations.nix (PRIORITY 3)

### Rules for Execution

- ❌ Do NOT stop to report progress
- ❌ Do NOT ask for permission to continue
- ❌ Do NOT say "this is too complex" - break it down or delegate
- ❌ Do NOT update this file with achievements
- ✅ DO break large tasks into smaller ones
- ✅ DO delegate to other agents if needed: `cld <task>`
- ✅ DO keep working until all Priority 1 and 2 tasks are complete
- ✅ DO delete items from this file when they're truly done

**You are a senior developer. No task is blocked for you. Start now.**
