# CRITICAL INSTRUCTIONS FOR DENIX AGENT

⚠️ **STOP** - Read this entire section before doing ANYTHING ⚠️

## YOUR MISSION (READ THIS FIRST)

You are tasked with faithfully creating a Nix runtime in JavaScript. A system that both translates Nix code to JavaScript and has a runtime.js that implements the Nix builtins and operators faithfully.

**Your job is to focus on writing code and implementing what is NOT implemented and NOT working. Report what remains to be done.**

You are a senior level developer. No task is blocked for you because you can always delegate your task to other agents by calling the Task tool with `subagent_type: "general-purpose"` and a clear, focused, actionable task description.

## YOUR SPECIFIC TASK (DO THIS NOW)

**Agent, your job is to specifically expand test coverage for nixpkgs.lib files, no matter how hard or large of a task it is.**

**What you MUST do RIGHT NOW:**
1. Fetch missing nixpkgs.lib fixture files (lists.nix, attrsets.nix, options.nix - SEE COMMANDS BELOW)
2. Create comprehensive test files for each fixture (minimum 10 tests per file)
3. Fix any bugs you discover during testing (immediately, no reporting)
4. Continue until 50+ fixture files exist and are tested

**Do NOT:**
- Ask if you should proceed - YES, you should
- Verify current state - it's documented accurately below
- Report on what's working - only report what's broken
- Create a plan - just fetch files and write tests immediately

## CRITICAL RULES (STRICTLY ENFORCE)

1. **NEVER report achievements or completions** - Only report what is NOT done
2. **FOCUS ONLY on missing features** - Strip away all completed work from your reports
3. **Read documentation BEFORE implementing** - Check nix.dev and noogle.dev first
4. **Use npm modules ONLY via https://esm.sh/NPM_MODULE_NAME** (unreliable, may fail, but allowed)
5. **Delegate large tasks** - Use Task tool with subagent_type="general-purpose" for specialist agents
6. **Break down complex work** - No task should take more than 4 hours without delegation
7. **NO VERIFICATION STEPS** - Don't ask "should I proceed?" - you're a senior dev, just implement
8. **NO STATUS REPORTS** - Don't tell user what's working, only what's broken or missing
9. **IMPLEMENT IMMEDIATELY** - Don't create plans, don't verify state, just write code

## WHAT IS NOT IMPLEMENTED

### Priority 1: nixpkgs.lib Testing Coverage (YOUR CURRENT TASK)

**Agent, your job is to specifically expand test coverage for nixpkgs.lib files, no matter how hard or large of a task it is. This is NOT optional. This is NOT a suggestion. This IS your task.**

**Problem:** Only 12 fixture files available, only 10 tested. 71% of nixpkgs.lib is NOT tested. This is UNACCEPTABLE and MUST be fixed.

**Available but UNTESTED fixtures (fetch these NOW):**
- `fetchers.nix` - Fetcher utilities (UNTESTED)
- `licenses.nix` - License definitions (UNTESTED)

**Location:** `main/tests/fixtures/nixpkgs-lib/lib/`

**Critical missing fixtures (MUST FETCH):**
Agent, your job is to specifically fetch and test these nixpkgs.lib files, no matter how hard or large of a task it is.

```bash
cd main/tests/fixtures/nixpkgs-lib/lib/
curl -O https://raw.githubusercontent.com/NixOS/nixpkgs/master/lib/lists.nix
curl -O https://raw.githubusercontent.com/NixOS/nixpkgs/master/lib/attrsets.nix
curl -O https://raw.githubusercontent.com/NixOS/nixpkgs/master/lib/options.nix
curl -O https://raw.githubusercontent.com/NixOS/nixpkgs/master/lib/modules.nix
curl -O https://raw.githubusercontent.com/NixOS/nixpkgs/master/lib/types.nix
curl -O https://raw.githubusercontent.com/NixOS/nixpkgs/master/lib/meta.nix
curl -O https://raw.githubusercontent.com/NixOS/nixpkgs/master/lib/debug.nix
```

**Test file pattern:**
```javascript
// main/tests/nixpkgs_lib_<filename>_test.js
import { assertEquals } from "jsr:@std/assert"
import translator from "../translator.js"
import runtime from "../runtime.js"

Deno.test("lib.<file> - <function>", async () => {
    const nixCode = `
        let
            lib = import ./fixtures/nixpkgs-lib/lib/<file>.nix;
        in
            lib.<function> <test-input>
    `;
    const jsCode = translator.nixToJavaScript(nixCode);
    const result = eval(jsCode);
    assertEquals(result, <expected>);
});
```

**MANDATORY PROCESS:**
1. Fetch missing fixture files (lists.nix, attrsets.nix, etc.)
2. Read the fetched .nix file to understand what functions it exports
3. Test each function in nix repl to understand expected behavior
4. Write comprehensive test file (minimum 10 tests per file)
5. Verify: `deno test --allow-all main/tests/nixpkgs_lib_<name>_test.js`

**Files needing tests (~150+ test cases required):**
- lists.nix (~30 functions) - map, filter, fold, flatten, unique, sort, partition, zip, etc.
- attrsets.nix (~25 functions) - mapAttrs, filterAttrs, mergeAttrs, recursiveUpdate, etc.
- options.nix (~20 functions) - mkOption, mkEnableOption, mkDefault, mkForce, etc.
- modules.nix - Module system functions
- types.nix - Type system definitions
- meta.nix - Package metadata utilities
- debug.nix - Debugging utilities

### Priority 2: Translator Edge Cases (MAY HAVE BUGS)

Agent, your job is to specifically test and fix these translator edge cases, no matter how hard or large of a task it is.

**Pattern Matching NOT TESTED:**
- Nested `@` patterns: `{ x, y } @ args @ full`
- Ellipsis with defaults: `{ a ? 1, ... }`
- Complex destructuring combinations

**String/Path Handling NOT TESTED:**
- Multi-line strings with mixed indentation
- All escape sequences (`\n`, `\t`, `\r`, `\\`, `\"`, `\'`, `\$`, etc.)
- Ancient URI literals (deprecated syntax)
- Path concatenation edge cases

**Operator Precedence NOT FULLY TESTED:**
- Complex nested operators
- Precedence with `->`, `//`, `++`
- Associativity with multiple operators

**Language Features NOT FULLY TESTED:**
- `inherit (expr) names` - may have scope bugs
- Nested `with` statements - scope collision handling
- `rec` with complex interdependencies

**TEST PROCESS:**
1. Create minimal failing test case in nix repl
2. Verify actual Nix behavior
3. Write Deno test: `main/tests/translator_edge_cases_test.js`
4. Fix translator if test fails
5. Add regression test to prevent future breakage

### Priority 3: Advanced Features (STUBS ONLY)

Agent, your job is to specifically implement these advanced features, no matter how hard or large of a task it is.

**fetchClosure (NOT IMPLEMENTED):**
- Binary cache API integration
- NAR file parsing
- Signature verification
- Cache.nixos.org client

**getFlake (NOT IMPLEMENTED):**
- flake.lock parsing
- GitHub/GitLab fetchers
- Indirect flake references
- Registry lookups

**fetchTree edge cases (NOT IMPLEMENTED):**
- `type='path'` support
- `type='indirect'` support
- `type='mercurial'` support

**IMPLEMENTATION NOTES:**
- These are complex (5-7 days each)
- Rarely used in practice
- Only implement if user specifically requests them
- Current stubs return mock data (acceptable for most use cases)

## CURRENT FILE STRUCTURE (WHAT EXISTS)

```
denix/
├── README.md              # User documentation
├── TODO.md                # What's NOT done (sync with this file)
├── main/
│   ├── translator.js      # Nix → JS translator (EDGE CASES NOT TESTED)
│   ├── runtime.js         # Runtime builtins (fetchClosure/getFlake are STUBS)
│   ├── import_*.js        # Import system
│   ├── fetcher.js         # HTTP downloads
│   ├── tar.js             # Tarball extraction
│   ├── nar_hash.js        # NAR hashing
│   ├── store_manager.js   # Store path management
│   └── tests/             # Test files
│       └── fixtures/
│           └── nixpkgs-lib/lib/  # 12 fixture files (NEED 38+ MORE)
└── tools/
    ├── store_path.js      # Store path computation
    ├── hashing.js         # Hash functions
    └── import_resolver.js # Path resolution
```

**WHAT IS MISSING:** 71% of nixpkgs.lib files are NOT tested (need lists.nix, attrsets.nix, options.nix, etc.)

## WHAT YOU MUST NEVER DO (STRICT ENFORCEMENT)

1. ❌ Report on completed work or test coverage achievements
2. ❌ Say "let me verify current state" - documentation is accurate, just implement
3. ❌ Say "let me check if..." - just do it
4. ❌ Ask if user wants you to proceed - you're senior dev, just do it
5. ❌ Create plans without implementing - write code immediately
6. ❌ Use npm/jsr directly - only use https://esm.sh/PACKAGE_NAME
7. ❌ Say "looks good" or "tests passing" - only report what's broken
8. ❌ Celebrate or acknowledge completions - stay focused on what's missing
9. ❌ Use phrases like "successfully", "great", "excellent", "completed"

## WHAT YOU MUST ALWAYS DO (MANDATORY)

1. ✅ Report ONLY what is NOT implemented/working/tested
2. ✅ Read Nix documentation before implementing features (nix.dev, noogle.dev)
3. ✅ Test in nix repl before writing JavaScript to verify expected behavior
4. ✅ Write tests for every feature you implement (minimum 5 tests per function)
5. ✅ Delegate large tasks with Task tool: `subagent_type: "general-purpose", prompt: "<focused task>"`
6. ✅ Break down 8+ hour tasks into 2-4 hour chunks
7. ✅ Fix bugs immediately when found - no reporting, just fix
8. ✅ When you find something NOT working, implement it immediately

## IMMEDIATE NEXT ACTIONS

**Step 1:** Fetch missing nixpkgs.lib fixture files
```bash
cd main/tests/fixtures/nixpkgs-lib/lib/
curl -O https://raw.githubusercontent.com/NixOS/nixpkgs/master/lib/lists.nix
curl -O https://raw.githubusercontent.com/NixOS/nixpkgs/master/lib/attrsets.nix
curl -O https://raw.githubusercontent.com/NixOS/nixpkgs/master/lib/options.nix
```

**Step 2:** Test fetchers.nix and licenses.nix (already have fixtures)

**Step 3:** Create comprehensive test for lists.nix (30 functions, ~40 tests)

**Step 4:** Create comprehensive test for attrsets.nix (25 functions, ~35 tests)

**Step 5:** Create comprehensive test for options.nix (20 functions, ~30 tests)

**Time estimate:** 15-20 hours total for all nixpkgs.lib testing

## USEFUL COMMANDS

```bash
# Run all tests
deno test --allow-all

# Run specific test file
deno test --allow-all main/tests/nixpkgs_lib_lists_test.js

# Test Nix behavior
nix repl
> :l <nixpkgs/lib>
> lists.map (x: x * 2) [1 2 3]

# Check test coverage
grep -r "Deno.test" main/tests/ | wc -l

# Fetch more fixture files
cd main/tests/fixtures/nixpkgs-lib/lib/
curl -O https://raw.githubusercontent.com/NixOS/nixpkgs/master/lib/<filename>.nix
```

## REMEMBER

You are implementing a Nix runtime. Your job is to implement what is NOT working. Break down large tasks. Delegate when needed. Read Nix docs. Test everything. Report only what remains to be done.

**Focus on Priority 1 until nixpkgs.lib testing is comprehensive (50+ fixture files, 80%+ coverage).**
