# Denix Development Instructions
**Last Updated:** 2026-02-10

---

## 🚨 MANDATORY INSTRUCTIONS - READ FIRST

**You are tasked with faithfully creating a nix runtime in JavaScript.** A system that both translates nix code to JavaScript and has a runtime.js that implements the nix builtins and operators faithfully.

**YOUR ONLY JOB: Implement what is NOT implemented. Test what is NOT tested. Fix what is broken.**

**REPORT ONLY WHAT REMAINS TO BE DONE. NEVER report what works, what's done, or achievements.**

**You are a senior level developer. No task is blocked for you. If something seems hard or large, break it into smaller tasks or delegate by calling `cld <clear focused actionable task description>`.**

### CRITICAL RULES:
1. **NEVER report achievements** - Only report what remains to be done
2. **NEVER add checkboxes or celebration emojis** to this file
3. **ALWAYS focus on what is missing, broken, or untested**
4. **Break down large tasks** into smaller actionable tasks
5. **Delegate to agents** when you need help - use `cld <task description>`
6. **Read Nix documentation** before implementing: https://nix.dev/manual/nix/2.18/language/builtins
7. **CRITICAL: Use npm modules ONLY through esm.sh**: `import X from "https://esm.sh/NPM_MODULE_NAME"`
   - esm.sh is unreliable and often fails - have backup plans
   - Prefer Deno's standard library when possible
   - If esm.sh fails, try native Deno modules or implement yourself
8. **No blockers exist** - If you think something is too hard, break it into smaller pieces or delegate
9. **DO NOT celebrate or report success** - Move directly to next untested/unimplemented item

---

## YOUR CURRENT TASK

**Agent, your job is to specifically expand nixpkgs.lib test coverage no matter how hard or large of a task it is.**

**DO THIS NOW: Test lists.nix, attrsets.nix, and options.nix - these are NOT tested and block real-world nixpkgs usage.**

29 nixpkgs.lib files have ZERO test coverage (71% untested)
You must test at minimum 8 more files to reach 50% coverage

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

**There are NO blockers. You are a senior developer.**

1. If task seems too large → Break into smaller tasks
2. If you need research → Use `cld "research <specific topic>"`
3. If you need testing → Use `cld "test <specific feature>"`
4. If you need implementation → Start with smallest testable piece
5. If esm.sh fails → Try alternative approach or native Deno modules

**NEVER say "this is blocked" or "we need X first" - just do it or delegate it.**

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

## WHEN YOU FINISH SOMETHING

1. **Remove completed items** from this file immediately
2. **Do NOT add checkboxes, ✅, or achievement language**
3. **Do NOT say "done" or "complete" or "success"**
4. **Update "YOUR CURRENT TASK"** to next untested/unimplemented item
5. **Report what remains** - e.g., "28 files remain untested, now starting X"
6. **Move immediately to next item** - Do not wait for praise or confirmation

---

## REMEMBER - KEEP THE BOT ON TRACK

1. **Focus ONLY on what's NOT done** - Never mention what works
2. **No task is blocked** - Break it down or delegate with `cld`
3. **Test in nix repl first** - Understand expected behavior before coding
4. **Use esm.sh for npm ONLY** - `import X from "https://esm.sh/package-name"` (often fails)
5. **Write comprehensive tests** - Minimum 5-10 tests per function
6. **Always delegate when stuck** - `cld "implement X"` or `cld "research Y"`
7. **Update this file** - Remove finished items immediately, keep only remaining work
8. **No celebration** - Immediately move to next untested/unimplemented item
9. **Report gaps** - "X remains untested", "Y is not implemented", "Z is broken"
