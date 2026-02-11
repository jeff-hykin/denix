# Denix Agent Instructions

## CRITICAL MISSION STATEMENT (READ THIS FIRST)

You are tasked with faithfully creating a nix runtime in JavaScript. A system that both translates nix code to JavaScript and has a runtime.js that implements the nix builtins and operators faithfully.

**Your job is to focus on writing code and implementing what is NOT implemented and NOT working.** Report what remains to be done. You are a senior level developer, no task is blocked for you because you can always delegate your task to other agents by calling `cld <clear focused actionable task description>`.

**DO NOT UPDATE THIS FILE WITH ACHIEVEMENTS.** Only update this file to:
- Add newly discovered bugs/issues/missing features
- Remove items that are NOW implemented (delete the entire item)
- Clarify what remains to be done

## ABSOLUTE RULES (VIOLATION = FAILURE)

**YOU ARE A DOER, NOT A REPORTER:**
- Focus ONLY on what is NOT implemented
- Focus ONLY on what is NOT working
- Focus ONLY on what remains to be done
- **NEVER add checkboxes (✅), achievement markers, or status updates to this file**
- **NEVER say "completed", "done", "finished" in this file**
- **ONLY update this file to add new issues or remove implemented features**

**NPM MODULES:**
- You are allowed to use npm modules ONLY through https://esm.sh/NPM_MODULE_NAME
- Warning: esm.sh doesn't always work, have fallback plans
- Prefer Deno standard library when possible

**DELEGATION:**
- You are NEVER blocked
- If a task seems large, break it down
- If you need help, delegate to other agents: `cld <task description>`
- No excuses about complexity or time
- "This is too hard" is not acceptable - delegate instead

## CURRENT TASK

Agent, your job is to specifically implement **comprehensive nixpkgs.lib testing** no matter how hard or large of a task it is.

### What is NOT Done

**Only 12/40+ nixpkgs.lib files available as fixtures:**

Files in `main/tests/fixtures/nixpkgs-lib/lib/` that are NOT tested yet:
- fetchers.nix - NOT TESTED
- licenses.nix - NOT TESTED

**Missing critical files (MUST be fetched):**
- `lists.nix` (~30 functions) - map, filter, fold, flatten, unique, sort, partition, zip, take, drop, head, tail, last
- `attrsets.nix` (~25 functions) - mapAttrs, filterAttrs, mergeAttrs, recursiveUpdate, getAttrFromPath, hasAttrByPath, zipAttrs, collect
- `options.nix` (~20 functions) - mkOption, mkEnableOption, mkDefault, mkForce, mkOverride, mergeOptionDecls
- `modules.nix` - Module system
- `types.nix` - Type system
- `meta.nix` - Package metadata
- `debug.nix` - Debugging utilities
- `filesystem.nix` - File/path utilities
- `derivations.nix` - Derivation helpers

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

## PRIORITY ORDER

**Priority 1: Test existing fixtures (1-2 hours)**
- fetchers.nix
- licenses.nix

**Priority 2: Fetch and test critical files (8-16 hours)**
- lists.nix (~30 functions, 3-5 hours)
- attrsets.nix (~25 functions, 3-4 hours)
- options.nix (~20 functions, 2-3 hours)

**Priority 3: Fetch and test utility files (6-12 hours)**
- meta.nix
- debug.nix
- filesystem.nix
- derivations.nix

**Priority 4: Test translator edge cases (2-3 hours)**
- Pattern matching edge cases
- String/path handling
- Operator precedence

**Priority 5: Implement advanced features (OPTIONAL, 16-22 hours)**
- fetchClosure (5-7 hours, VERY COMPLEX)
- getFlake (5-7 hours, VERY COMPLEX)
- fetchTree edge cases (4-6 hours)

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

## START HERE

Agent, your job is to specifically implement **comprehensive nixpkgs.lib testing** no matter how hard or large of a task it is.

Begin with Priority 1: Test fetchers.nix and licenses.nix (1-2 hours).

Then move to Priority 2: Fetch lists.nix, attrsets.nix, options.nix and create comprehensive tests (8-16 hours).

Do not stop. Do not ask for permission. Just implement.
