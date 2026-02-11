# CRITICAL INSTRUCTIONS FOR AGENT

You are tasked with faithfully creating a nix runtime in JavaScript. A system that both translates nix code to JavaScript and has a runtime.js that implements the nix builtins and operators faithfully.

Your job is to focus on writing code and implementing what is NOT implemented and NOT working. Report what remains to be done. You are a senior level developer, no task is blocked for you because you can always delegate your task to other agents by calling `cld <clear focused actionable task description>`.

**IMPORTANT:** You are allowed to use npm modules but only if they are done through `https://esm.sh/NPM_MODULE_NAME` (which doesn't always work, so test before committing to this approach).

---

# Agent, your job is to specifically implement nixpkgs.lib testing coverage no matter how hard or large of a task it is.

## WHAT IS NOT DONE - YOUR PRIMARY FOCUS

### Critical Gap: 71% of nixpkgs.lib Files Have ZERO Tests

**STATUS:** 18 out of 18+ core library files exist but are NOT TESTED. These files contain ~150+ functions that are completely untested.

#### Priority 1: Core Files NEED Tests (3 files, ~75 functions)

Agent, you MUST test these files. They are critical for all real-world nixpkgs usage:

1. **lists.nix** (~30 functions NOT TESTED)
   - Functions: map, filter, fold, foldl, foldr, flatten, unique, sort, sortOn, partition, zip, zipLists, zipListsWith, zipAttrs, take, drop, head, tail, last, init, length, count, range, replicate, singleton, reverseList, concatMap, concatLists, imap0, imap1, etc.
   - Location: `main/tests/fixtures/nixpkgs-lib/lib/lists.nix`
   - Agent task: Create `main/tests/nixpkgs_lib_lists_test.js` with 50+ test cases

2. **attrsets.nix** (~25 functions NOT TESTED)
   - Functions: mapAttrs, mapAttrs', filterAttrs, filterAttrsRecursive, foldAttrs, collect, mergeAttrs, recursiveUpdate, recursiveUpdateUntil, getAttrFromPath, hasAttrByPath, setAttrByPath, attrByPath, zipAttrs, zipAttrsWith, nameValuePair, listToAttrs, attrsToList, catAttrs, getAttrs, removeAttrs, intersectAttrs, etc.
   - Location: `main/tests/fixtures/nixpkgs-lib/lib/attrsets.nix`
   - Agent task: Create `main/tests/nixpkgs_lib_attrsets_test.js` with 40+ test cases

3. **options.nix** (~20 functions NOT TESTED)
   - Functions: mkOption, mkEnableOption, mkPackageOption, mkDefault, mkForce, mkOverride, mkOptionDefault, mkIf, mkMerge, mkBefore, mkAfter, mkOrder, mergeOptionDecls, mergeDefinitions, etc.
   - Location: `main/tests/fixtures/nixpkgs-lib/lib/options.nix`
   - Agent task: Create `main/tests/nixpkgs_lib_options_test.js` with 30+ test cases

#### Priority 2: Utility Files NEED Tests (15+ files)

Agent, after completing Priority 1, you MUST test these utility files:

- `modules.nix` - Module system implementation (NOT TESTED)
- `types.nix` - Type system for NixOS options (NOT TESTED)
- `meta.nix` - Package metadata helpers (NOT TESTED)
- `debug.nix` - Debugging utilities (NOT TESTED)
- `generators.nix` - Code generators (NOT TESTED)
- `filesystem.nix` - File/directory operations (NOT TESTED)
- `cli.nix` - Command-line interface helpers (NOT TESTED)
- `derivations.nix` - Derivation utilities (NOT TESTED)
- `fixed-points.nix` - Fixed point combinators (NOT TESTED)
- `customisation.nix` - Package customization (NOT TESTED)
- `maintainers.nix` - Maintainer metadata (NOT TESTED)
- `teams.nix` - Team metadata (NOT TESTED)
- `asserts.nix` - Assertion helpers (NOT TESTED)

#### Priority 3: Systems Files NEED Tests (8 files)

Agent, you MUST test these platform-related files:

- `systems/architectures.nix` - CPU architectures (NOT TESTED)
- `systems/doubles.nix` - System doubles (NOT TESTED)
- `systems/for-meta.nix` - Platform metadata (NOT TESTED)
- `systems/parse.nix` - Platform string parsing (NOT TESTED)
- `systems/inspect.nix` - Platform inspection (NOT TESTED)
- `systems/default.nix` - Platform aggregation (NOT TESTED)
- `systems/platform.nix` - Platform utilities (NOT TESTED)
- `systems/platforms.nix` - Platform definitions (NOT TESTED)

#### Priority 4: Advanced Modules (2 directories)

Agent, you MUST test these directory modules:

- `path/` directory - Path utilities (NOT TESTED)
- `fileset/` directory - File set utilities (NOT TESTED)

---

## Translator Edge Cases NOT TESTED

Agent, you MUST verify these translator features work correctly:

### Pattern Matching Gaps
- Nested `@` patterns: `{ x, y } @ args @ full` (NOT TESTED)
- Ellipsis with defaults: `{ a ? 1, ... }` (NOT TESTED)
- Complex destructuring in function arguments (NOT TESTED)

### String/Path Gaps
- Multi-line strings with mixed indentation (NOT TESTED)
- Ancient URI literals (deprecated but may appear in old code) (NOT TESTED)
- Path concatenation edge cases (NOT TESTED)
- All string escape sequences (NOT FULLY TESTED)

### Operator Precedence
- Complex nested operators (NOT TESTED)
- Precedence with `->`, `//`, `++` (NOT TESTED)

### Other Language Features
- `inherit (expr) names` - may have bugs (NOT FULLY TESTED)
- Nested `with` statements - scope handling (NOT FULLY TESTED)
- `rec` with complex interdependencies (NOT FULLY TESTED)

---

## Advanced Features NOT FULLY IMPLEMENTED

Agent, these features return stubs and MUST be fully implemented:

### fetchClosure (NOT IMPLEMENTED)
- Current state: Returns stub
- What's needed:
  - Binary cache API integration
  - NAR parsing implementation
  - Signature verification
  - Store path validation

### getFlake (NOT IMPLEMENTED)
- Current state: Returns stub
- What's needed:
  - flake.lock parsing
  - github/gitlab/git fetchers
  - Flake registry lookups
  - Input resolution

### fetchTree Edge Cases (NOT IMPLEMENTED)
- `type='path'` - NOT IMPLEMENTED
- `type='indirect'` - NOT IMPLEMENTED

---

## YOUR IMPLEMENTATION PROCESS

Agent, follow this process for EVERY function you test:

### Step 1: Research in nix repl
```bash
nix repl
> builtins.functionName testInput
# Observe the output
```

### Step 2: Find real-world usage
- Look in nixpkgs.lib source files
- Find actual usage patterns
- Identify edge cases

### Step 3: Write comprehensive test file
```javascript
// main/tests/nixpkgs_lib_<filename>_test.js
import { assertEquals } from "https://deno.land/std@0.198.0/assert/mod.ts"
import { translate } from "../main.js"
import * as runtime from "../runtime.js"

Deno.test("lib.<function> - basic behavior", async () => {
    const nixCode = `
        let lib = import ./tests/fixtures/nixpkgs-lib/lib/default.nix;
        in lib.<function> <arguments>
    `;

    const jsCode = translate(nixCode)
    const result = new Function('runtime', 'return ' + jsCode)(runtime)

    assertEquals(result, expectedValue)
});

// Add 5-10 tests per function minimum
```

### Step 4: Test edge cases
- Empty inputs ([], {}, "", null)
- Type mismatches
- Large inputs
- Nested structures
- Error conditions

### Step 5: Verify
```bash
deno test --allow-all main/tests/nixpkgs_lib_<name>_test.js
```

---

## USEFUL COMMANDS

```bash
# Run all tests
deno test --allow-all

# Run specific test file
deno test --allow-all main/tests/nixpkgs_lib_<name>_test.js

# Test Nix behavior in repl
nix repl
> :l <nixpkgs/lib>
> lists.map (x: x * 2) [1 2 3]

# Check which files are already tested
ls main/tests/nixpkgs_lib_*_test.js

# Count untested functions
grep -E "^  [a-zA-Z]+ =" main/tests/fixtures/nixpkgs-lib/lib/lists.nix | wc -l
```

---

## CURRENT WORKING DIRECTORY STRUCTURE

```
denix/
├── main/
│   ├── runtime.js           # Runtime builtins implementation
│   ├── main.js              # Nix → JavaScript translator
│   ├── import_cache.js      # Import caching system
│   ├── import_loader.js     # File loading system
│   └── tests/
│       ├── fixtures/
│       │   └── nixpkgs-lib/
│       │       └── lib/     # 18+ .nix files HERE to test
│       ├── nixpkgs_lib_*_test.js  # Your test files go here
│       └── ...other tests...
├── tools/
│   ├── import_resolver.js   # Path resolution
│   ├── store_path.js        # Store path computation
│   └── hashing.js           # Hash functions
└── TODO.md                  # This file lists what's NOT done
```

---

## KEY FILES YOU NEED TO UNDERSTAND

- **main/runtime.js** - All Nix builtins are implemented here (102/102 functions at 100% coverage)
- **main/main.js** - Translator from Nix AST to JavaScript (87/87 tests passing)
- **main/tests/fixtures/nixpkgs-lib/lib/*.nix** - The files you MUST test (18+ files, mostly UNTESTED)

---

## REMINDER: NO TASK IS BLOCKED

Agent, you are a senior developer. If you encounter ANY obstacle:

1. Break the task into smaller pieces
2. Delegate subtasks to other agents using `cld <task>`
3. Research using nix repl and nixpkgs source
4. Ask for clarification if requirements are unclear

**There are NO blockers. Every task can be completed or delegated.**

---

## SUCCESS CRITERIA

Agent, you have succeeded when:

1. ALL 3 Priority 1 files have comprehensive test coverage (lists.nix, attrsets.nix, options.nix)
2. At least 50% of Priority 2 utility files have test coverage
3. All translator edge cases have been tested and verified working
4. Any bugs discovered during testing have been fixed

**CURRENT STATUS:** 71% of nixpkgs.lib files are UNTESTED. Your job is to fix this.

**GO IMPLEMENT TESTS NOW.**
