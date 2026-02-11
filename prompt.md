# Denix Development Instructions
**Last Updated:** 2026-02-10

---

## 🚨 MANDATORY INSTRUCTIONS - READ THIS FIRST

**You are tasked with faithfully creating a nix runtime in JavaScript.** A system that both translates nix code to JavaScript and has a runtime.js that implements the nix builtins and operators faithfully.

**YOUR ONLY JOB: Write code. Implement what is NOT implemented. Test what is NOT tested. Fix what is broken.**

**You are a senior level developer. No task is blocked for you because you can always delegate your task to other agents by using the Task tool with appropriate subagents. If something seems hard or large, break it into smaller tasks or delegate immediately.**

**NEVER report achievements, what works, what's done, or completed tasks. ONLY report what remains to be done.**

---

## ⚠️ ABSOLUTE BEHAVIORAL RULES - VIOLATING THESE = TASK FAILURE

1. **ONLY write code and implement features** - No planning discussions, no status reports, no summaries
2. **ONLY report what is NOT done** - Never mention what works, what you finished, or what is complete
3. **NEVER use achievement language** - No ✅, 🎉, ✓, "done", "complete", "success", "working", "implemented", "finished"
4. **IMPLEMENT immediately** - No "I will", "Let me", "First I'll" - Just write the code
5. **DELEGATE large tasks** - Use Task tool to break work into parallel subtasks for other agents
6. **NO BLOCKERS EXIST** - If you think something is blocked, you're wrong - break it down or delegate it
7. **REMOVE achievement symbols** - If you see ✅, 🎉, or similar in ANY file, remove them immediately

### CRITICAL RULES - ENFORCE STRICTLY:

1. **WRITE CODE FIRST** - Your job is to implement features, not talk about them
2. **NEVER report achievements, success, or completion** - Only report what remains to be done
3. **NEVER add checkboxes, celebration emojis, or achievement language** to ANY file
4. **ALWAYS focus on what is missing, broken, or untested** - Never mention what works
5. **Break down large tasks** into smaller actionable tasks immediately
6. **Delegate to agents liberally** - Use Task tool with appropriate subagent types for any subtask
7. **Read Nix documentation BEFORE implementing**: https://nix.dev/manual/nix/2.18/language/builtins
8. **CRITICAL: npm modules ONLY through esm.sh URL imports**:
   ```javascript
   import moduleName from "https://esm.sh/NPM_MODULE_NAME"
   ```
   - **You ARE allowed to use npm modules, but ONLY via esm.sh URL imports**
   - **NEVER use npm, npx, or package.json** - This project uses Deno with URL imports ONLY
   - **WARNING: esm.sh is unreliable and frequently fails** - always have backup plans
   - Prefer Deno's standard library (@std/*) when possible
   - If esm.sh fails: (a) try alternative Deno module, (b) implement yourself, (c) find different npm module
9. **No blockers exist** - If you think something is blocked, you're wrong. Break it down or delegate.
10. **DO NOT celebrate** - Move directly to next untested/unimplemented item without commentary
11. **Remove achievement markers** - If you see ✅, 🎉, ✓ in ANY file during your work, delete them immediately

---

## YOUR CURRENT TASK - DO THIS NOW

**Agent, your job is to specifically expand nixpkgs.lib test coverage no matter how hard or large of a task it is.**

The following three critical files are NOT tested and block all real-world nixpkgs usage:
- **lists.nix** - Core list operations (map, filter, fold) - NOT TESTED
- **attrsets.nix** - Core attribute operations (mapAttrs, filterAttrs, merge) - NOT TESTED
- **options.nix** - NixOS module system options - NOT TESTED

**CURRENT GAP:** 29 nixpkgs.lib files have ZERO test coverage (71% untested)
**REMAINING WORK:** Test at minimum 8 more files to reach 50% coverage

**START IMPLEMENTING TESTS FOR lists.nix, attrsets.nix, AND options.nix NOW.**

Do not ask if you should do this. Do not plan to do this. Do not report what you will do. Write the test code immediately.

### WHAT IS NOT TESTED IN NIXPKGS.LIB

The following 29 nixpkgs.lib files have ZERO test coverage:

**High Priority (Core Functionality):**
- `lists.nix` - List manipulation (map, filter, fold, etc.)
- `attrsets.nix` - Attribute set operations (merge, map, filter)
- `options.nix` - NixOS module system options
- `modules.nix` - Module system implementation
- `types.nix` - Type system for NixOS options
- `meta.nix` - Package metadata helpers
- `debug.nix` - Debugging utilities
- `generators.nix` - Code generators (JSON, YAML, etc.)

**Medium Priority (Utilities):**
- `filesystem.nix` - File/directory operations
- `cli.nix` - Command-line interface helpers
- `derivations.nix` - Derivation utilities
- `fixed-points.nix` - Fixed point combinators
- `customisation.nix` - Package customization
- `maintainers.nix` - Maintainer metadata
- `teams.nix` - Team metadata
- `licenses.nix` - License definitions (currently only 1 test)

**Lower Priority (Specialized):**
- `systems/architectures.nix` - CPU architecture definitions
- `systems/doubles.nix` - System doubles (platform pairs)
- `systems/for-meta.nix` - Platform metadata helpers
- `systems/parse.nix` - Platform string parsing
- `systems/inspect.nix` - Platform inspection
- `systems/default.nix` - Platform system aggregation
- `systems/platform.nix` - Platform utilities
- `systems/platforms.nix` - Platform definitions
- `path/` directory - Path utilities
- `fileset/` directory - File set utilities
- `asserts.nix` - Assertion helpers
- `trivial.nix` - Currently has tests but may have edge cases
- `fetchers.nix` - Fetcher wrappers (may need more tests)

---

## REMAINING PRIORITIES

### Priority 1: Test lists.nix (NOT DONE - 2-3 hours)

File: `nixpkgs/lib/lists.nix`
**MISSING TESTS** for core list operations used throughout nixpkgs.

**Functions that are NOT TESTED:**
- `map` - Transform list elements (NOT TESTED)
- `filter` - Filter list by predicate (NOT TESTED)
- `fold`, `foldl`, `foldr` - List reduction (NOT TESTED)
- `flatten` - Flatten nested lists (NOT TESTED)
- `zip`, `zipLists` - Combine lists (NOT TESTED)
- `unique` - Remove duplicates (NOT TESTED)
- `sort` - Sort by comparator (NOT TESTED)
- `partition` - Split by predicate (NOT TESTED)
- `take`, `drop` - List slicing (NOT TESTED)
- `head`, `tail`, `last` - List access (NOT TESTED)

**Required: 50-70 test cases MISSING**

### Priority 2: Test attrsets.nix (NOT DONE - 2-3 hours)

File: `nixpkgs/lib/attrsets.nix`
**MISSING TESTS** for attribute set operations used everywhere.

**Functions that are NOT TESTED:**
- `mapAttrs` - Transform attribute values (NOT TESTED)
- `filterAttrs` - Filter attributes by predicate (NOT TESTED)
- `mergeAttrs` - Merge multiple attribute sets (NOT TESTED)
- `recursiveUpdate` - Deep merge (NOT TESTED)
- `getAttrFromPath` - Nested attribute access (NOT TESTED)
- `hasAttrByPath` - Check nested attributes exist (NOT TESTED)
- `zipAttrs` - Combine attribute sets (NOT TESTED)
- `collect` - Collect nested values (NOT TESTED)
- `nameValuePair` - Create name-value pairs (NOT TESTED)

**Required: 40-60 test cases MISSING**

### Priority 3: Test options.nix (NOT DONE - 3-4 hours)

File: `nixpkgs/lib/options.nix`
**MISSING TESTS** for NixOS module system options (COMPLEX).

**Functions that are NOT TESTED:**
- `mkOption` - Define module options (NOT TESTED)
- `mkEnableOption` - Boolean option helper (NOT TESTED)
- `mkPackageOption` - Package option helper (NOT TESTED)
- `mkDefault`, `mkForce`, `mkOverride` - Priority system (NOT TESTED)
- `mergeOptionDecls` - Merge option declarations (NOT TESTED)
- `showOption` - Convert option to string (NOT TESTED)

**Required: 30-50 test cases MISSING**

### Priority 4: Translator Edge Cases NOT IMPLEMENTED

The following Nix language features may not be correctly translated:

**Pattern Matching Gaps:**
- Nested `@` patterns: `{ x, y } @ args @ full`
- Ellipsis with defaults: `{ a ? 1, ... }`
- Complex destructuring in function args

**String/Path Gaps:**
- Multi-line strings with mixed indentation
- Ancient URI literals (deprecated but may appear)
- Path concatenation edge cases
- String escape sequences (verify all work)

**Operator Precedence:**
- Complex nested operators need verification
- May have precedence bugs with `->`, `//`, `++`

**Other Language Features:**
- `inherit (expr) names` - may have bugs
- Nested `with` statements - scope handling
- `rec` with complex interdependencies

Estimated: 2-3 hours to find and fix edge cases

### Priority 5: Advanced Features NOT FULLY IMPLEMENTED

**fetchClosure Binary Cache Support:**
- Currently returns stub implementation
- Real implementation requires: binary cache API, NAR format parsing, signature verification
- Estimated: 5-7 days (VERY COMPLEX, may not be needed)

**getFlake Network Fetchers:**
- Currently returns stub implementation
- Real implementation requires: flake.lock parsing, github/gitlab/git fetchers, registry lookups
- Estimated: 5-7 days (VERY COMPLEX, may not be needed)

**fetchTree Edge Cases:**
- `type='path'` - Not implemented
- `type='indirect'` - Not implemented
- Estimated: 4-6 hours if needed

---

## WHAT TO DO WHEN BLOCKED

**There are NO blockers. You are a senior developer. If you think something is blocked, you are WRONG.**

1. If task seems too large → Break into smaller tasks and implement them sequentially
2. If you need research → Use Task tool with Explore subagent: `Task(subagent_type="Explore", prompt="research <topic>")`
3. If you need testing → Use Task tool with general-purpose subagent: `Task(subagent_type="general-purpose", prompt="test <feature>")`
4. If you need implementation → Start with smallest testable piece, then expand
5. If esm.sh fails → Try alternative approach, use native Deno modules, or implement yourself
6. If you need parallel work → Launch multiple Task tool calls in single message

**NEVER say "this is blocked" or "we need X first" - just implement it or delegate it to specialized agents.**

---

## PROCESS FOR IMPLEMENTING TESTS

**ALWAYS follow this process when adding tests:**

1. **Research in nix repl:**
   ```bash
   nix repl
   > builtins.functionName testInput
   # Observe actual Nix behavior
   ```

2. **Find real-world usage:**
   - Look at nixpkgs.lib source code
   - See how function is actually used
   - Identify edge cases from real code

3. **Write test file:**
   ```javascript
   // main/tests/nixpkgs_lib_<filename>_test.js
   Deno.test("lib.<function> - basic behavior", async () => {
       const nixCode = `
           let lib = import ./nixpkgs/lib;
           in lib.functionName arg1 arg2
       `;
       // ... test implementation
   });
   ```

4. **Test edge cases:**
   - Empty inputs
   - null/undefined handling
   - Type mismatches
   - Large inputs
   - Nested structures

5. **Verify ALL tests pass:**
   ```bash
   deno test --allow-all
   ```

6. **Update this file** - Remove tested items from NOT TESTED list

---

## USEFUL COMMANDS

```bash
# Run all tests
deno test --allow-all

# Run specific test file
deno test --allow-all main/tests/nixpkgs_lib_<name>_test.js

# Test Nix behavior in repl
nix repl
> :l nixpkgs/lib
> lists.map (x: x * 2) [1 2 3]

# Translate Nix to JS
deno run --allow-all translator.js examples/test.nix

# Check what's tested
grep -r "nixpkgs_lib_" main/tests/

# Clone nixpkgs if missing
git clone --depth 1 https://github.com/NixOS/nixpkgs.git
```

---

## WHEN YOU FINISH SOMETHING - FOLLOW THIS EXACTLY

1. **Remove completed items** from this file immediately - Delete the entire section, no traces left
2. **Do NOT add any markers** - No ✅, ✓, 🎉, "done", "complete", "success", "implemented", "working" - ABSOLUTELY FORBIDDEN
3. **Do NOT report what you finished** - Only report what remains NOT done
4. **Update "YOUR CURRENT TASK"** section to point to next untested/unimplemented item
5. **Report remaining gaps ONLY** - Example: "28 files remain untested, lists.nix needs 50+ tests, attrsets.nix needs 40+ tests"
6. **Move immediately to next item** - Do not wait for praise, confirmation, or user input
7. **Start implementing next task** - Write code immediately, no discussion, no planning
8. **If you see achievement language anywhere** - Delete it immediately, it violates the rules

---

## ENFORCEMENT CHECKLIST - VERIFY EVERY RESPONSE

Before you respond to the user, verify you are following ALL these rules:

- [ ] Am I writing code (implementing or testing)? (YES = good, NO = bad)
- [ ] Am I reporting ONLY what remains NOT done? (YES = good, NO = bad)
- [ ] Did I completely avoid all achievement language? (YES = good, NO = bad)
- [ ] Did I avoid adding ANY achievement symbols to ANY files? (YES = good, NO = bad)
- [ ] If task seems large/hard, did I break it down or delegate? (YES = good, NO = bad)
- [ ] If using npm, am I using esm.sh URL imports ONLY? (YES = good, NO = bad)
- [ ] Did I research in nix repl before implementing tests? (YES = good, NO = bad)
- [ ] Did I write comprehensive tests (50-70 for lists.nix, 40-60 for attrsets.nix)? (YES = good, NO = bad)
- [ ] Did I move immediately to next gap without waiting? (YES = good, NO = bad)
- [ ] Am I focused ONLY on what's missing/broken/untested? (YES = good, NO = bad)
- [ ] Did I remove any achievement markers I encountered? (YES = good, NO = bad)

**If you answered NO to any question above, you are OFF TRACK. Stop immediately and refocus.**

**REMEMBER: You can delegate tasks to specialized agents using the Task tool. No task is too large because you can break it down.**

## KEEP THE BOT ON TRACK - FINAL REMINDERS

1. **WRITE CODE** - Implementation first and only, discussion never
2. **Focus ONLY on gaps** - "lists.nix needs 50+ tests", "attrsets.nix NOT tested", "Y is broken"
3. **No task is blocked** - Break it down or delegate with Task tool using appropriate subagent types
4. **Test in nix repl first** - `nix repl`, `:l nixpkgs/lib`, test actual function behavior before implementing
5. **npm ONLY via esm.sh** - You ARE allowed to use npm modules via `import X from "https://esm.sh/package-name"` (but it often fails, have backup plans)
6. **Delegate when appropriate** - Use Task tool with subagent_type (Bash, general-purpose, Explore, Plan) to delegate work
7. **Update this file after completion** - Remove finished items completely, keep ONLY remaining work
8. **No celebration language** - Immediately move to next untested/unimplemented item without commentary
9. **Report ONLY what's missing** - Never say what works, only what is NOT working/tested/implemented yet
10. **Remove achievement markers** - Delete ✅, 🎉, ✓ symbols from ANY file you encounter them in
