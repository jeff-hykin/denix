# Denix Development Instructions
**Last Updated:** 2026-02-10

---

## 🚨 MANDATORY INSTRUCTIONS - READ FIRST

You are tasked with faithfully creating a nix runtime in JavaScript. A system that both translates nix code to JavaScript and has a runtime.js that implements the nix builtins and operators faithfully.

**Your job is to focus on writing code and implementing what is NOT implemented and NOT working. Report what remains to be done. You are a senior level developer, no task is blocked for you because you can always delegate your task to other agents by calling `cld <clear focused actionable task description>`.**

### CRITICAL RULES:
1. **NEVER report achievements** - Only report what remains to be done
2. **NEVER add checkboxes or celebration emojis** to this file
3. **ALWAYS focus on what is missing, broken, or untested**
4. **Break down large tasks** into smaller actionable tasks
5. **Delegate to agents** when you need help - use `cld <task description>`
6. **Read Nix documentation** before implementing: https://nix.dev/manual/nix/2.18/language/builtins
7. **Use npm modules ONLY through esm.sh**: `https://esm.sh/NPM_MODULE_NAME` (doesn't always work)
8. **No blockers exist** - If you think something is too hard, break it into smaller pieces or delegate

---

## YOUR CURRENT TASK

**Agent, your job is to specifically expand nixpkgs.lib test coverage no matter how hard or large of a task it is.**

Current nixpkgs.lib coverage: 12/41 files (29%)
Target: 20/41 files (50%+)

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

### Priority 1: Test lists.nix (2-3 hours)

File: `nixpkgs/lib/lists.nix`
Missing tests for core list operations used throughout nixpkgs.

Functions that need tests:
- `map` - Transform list elements
- `filter` - Filter list by predicate
- `fold`, `foldl`, `foldr` - List reduction
- `flatten` - Flatten nested lists
- `zip`, `zipLists` - Combine lists
- `unique` - Remove duplicates
- `sort` - Sort by comparator
- `partition` - Split by predicate
- `take`, `drop` - List slicing
- `head`, `tail`, `last` - List access

Estimated: 50-70 test cases needed

### Priority 2: Test attrsets.nix (2-3 hours)

File: `nixpkgs/lib/attrsets.nix`
Missing tests for attribute set operations used everywhere.

Functions that need tests:
- `mapAttrs` - Transform attribute values
- `filterAttrs` - Filter attributes by predicate
- `mergeAttrs` - Merge multiple attribute sets
- `recursiveUpdate` - Deep merge
- `getAttrFromPath` - Nested attribute access
- `hasAttrByPath` - Check nested attributes exist
- `zipAttrs` - Combine attribute sets
- `collect` - Collect nested values
- `nameValuePair` - Create name-value pairs

Estimated: 40-60 test cases needed

### Priority 3: Test options.nix (3-4 hours)

File: `nixpkgs/lib/options.nix`
Missing tests for NixOS module system options (COMPLEX).

Functions that need tests:
- `mkOption` - Define module options
- `mkEnableOption` - Boolean option helper
- `mkPackageOption` - Package option helper
- `mkDefault`, `mkForce`, `mkOverride` - Priority system
- `mergeOptionDecls` - Merge option declarations
- `showOption` - Convert option to string

Estimated: 30-50 test cases needed

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

## WHEN YOU COMPLETE A PRIORITY

1. **Remove completed items** from this file
2. **Do NOT add checkboxes or achievements**
3. **Update "YOUR CURRENT TASK"** to next priority
4. **Report what remains** - e.g., "29 files remain untested"

---

## REMEMBER

1. **Focus only on what's NOT done**
2. **No task is blocked** - Break it down or delegate with `cld`
3. **Test in nix repl first** - Understand expected behavior
4. **Use esm.sh for npm** - `https://esm.sh/package-name` (unreliable)
5. **Write comprehensive tests** - 5-10 tests minimum per function
6. **Always delegate when stuck** - `cld "implement X"` or `cld "research Y"`
7. **Update this file** - Keep it current with remaining work only
