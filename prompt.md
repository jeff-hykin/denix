# Denix Development Instructions
**Last Updated:** 2026-02-10

---

## 🚨 MANDATORY INSTRUCTIONS - READ FIRST

You are tasked with faithfully creating a nix runtime in JavaScript. A system that both translates nix code to JavaScript and has a runtime.js that implements the nix builtins and operators faithfully.

**Your job is to focus on writing code and implementing what is NOT implemented and NOT working. Report what remains to be done. You are a senior level developer, no task is blocked for you because you can always delegate your task to other agents by calling `cld <clear focused actionable task description>`.**

### CRITICAL RULES:
1. **NEVER report achievements** - Only report what remains to be done
2. **NEVER add checkboxes (✅) or celebration emojis** to this file
3. **ALWAYS focus on what is missing, broken, or untested**
4. **Break down large tasks** into smaller actionable tasks
5. **Delegate to agents** when you need help - use `cld <task description>`
6. **Read Nix documentation** before implementing: https://nix.dev/manual/nix/2.18/language/builtins
7. **Use npm modules ONLY through esm.sh**: `https://esm.sh/NPM_MODULE_NAME` (doesn't always work)

---

## YOUR CURRENT TASK

**Agent, your job is to specifically implement comprehensive test coverage for the 20 remaining untested builtins, no matter how hard or large of a task it is.**

### 20 UNTESTED BUILTINS REQUIRING TESTS:

#### Context Operations (4 functions):
- `addErrorContext` - Add error context to thrown exceptions
- `appendContext` - Append string context metadata
- `hasContext` - Check if string has context metadata
- `unsafeDiscardStringContext` - Remove string context

#### Store Operations (5 functions):
- `storeDir` - Return the store directory path
- `storePath` - Validate and return store paths
- `toFile` - Write content to store and return path
- `placeholder` - Generate derivation output placeholder
- `outputOf` - Reference derivation output paths

#### Hashing Operations (2 functions):
- `hashString` - Hash a string with specified algorithm
- `hashFile` - Hash a file with specified algorithm

#### Derivation Operations (3 functions):
- `derivationStrict` - Strict version of derivation
- `unsafeDiscardOutputDependency` - Remove output dependencies
- `unsafeGetAttrPos` - Get source position of attribute

#### Control Flow (4 functions):
- `break` - Debug breakpoint (if supported)
- `traceVerbose` - Conditional tracing
- `genericClosure` - Generic graph closure computation

#### Fetchers (2 functions):
- `fetchClosure` - Fetch from binary cache (COMPLEX)
- `getFlake` - Load and evaluate flakes (VERY COMPLEX)

#### Advanced (1 function):
- `nixPath` - Get NIX_PATH search path

---

## IMPLEMENTATION PROCESS

For each untested builtin:

### Step 1: Research (MANDATORY)
1. Read official Nix documentation: https://nix.dev/manual/nix/2.18/language/builtins
2. Test behavior in `nix repl` with edge cases
3. Find examples in nixpkgs repository
4. Document expected behavior

### Step 2: Verify Implementation
1. Check `main/runtime.js` for the function implementation
2. Verify it matches Nix behavior
3. Fix any bugs found during verification

### Step 3: Create Comprehensive Tests
1. Create test file: `main/tests/builtins_<category>_test.js`
2. Write minimum 5-10 tests per function covering:
   - Basic functionality
   - Edge cases (null, undefined, empty)
   - Error conditions
   - Integration with other builtins
3. Use `Deno.test()` format, NOT console.log
4. Verify all tests pass: `deno test main/tests/builtins_<category>_test.js`

### Step 4: Document
Update this file with remaining untested functions (if any)

---

## TEST FILE TEMPLATE

```javascript
// main/tests/builtins_<category>_test.js
import { assertEquals, assertThrows } from "https://deno.land/std@0.220.1/assert/mod.ts"
import runtime from "../runtime.js"

const builtins = runtime.builtins

Deno.test("builtin_name - basic functionality", () => {
    const result = builtins.builtin_name(/* args */)
    assertEquals(result, /* expected */)
})

Deno.test("builtin_name - edge case: empty input", () => {
    const result = builtins.builtin_name(/* empty */)
    assertEquals(result, /* expected */)
})

Deno.test("builtin_name - error: invalid input", () => {
    assertThrows(
        () => builtins.builtin_name(/* invalid */),
        Error,
        "expected error message"
    )
})
```

---

## AFTER TESTING IS COMPLETE

Once all 20 builtins have comprehensive tests, move to:

### Next Priority 1: Expand nixpkgs.lib Testing (5-8 hours)
Test these high-value nixpkgs.lib files:
- `lists.nix` - List manipulation functions
- `attrsets.nix` - Attribute set operations
- `options.nix` - NixOS module system options

Goal: Increase nixpkgs.lib coverage from 29% (12/41 files) to 50%+ (20/41 files)

### Next Priority 2: Translator Edge Cases (2-3 hours)
- Advanced pattern matching (nested @, ellipsis in functions)
- String escape sequences verification
- Path literal edge cases
- Operator precedence verification
- Multi-line string handling

### Next Priority 3: Optional Advanced Builtins (16-22 days total)
Only implement if specifically requested:
- `fetchMercurial` (2-3 days) - Rarely used
- `fetchClosure` (5-7 days) - Binary cache support, VERY COMPLEX
- `getFlake` (5-7 days) - Full flake system, VERY COMPLEX
- `fetchTree` edge cases (4-6 hours) - type='path', type='indirect'

---

## WHAT IS ALREADY WORKING (DO NOT MODIFY UNLESS BROKEN)

- 102 function builtins implemented in `main/runtime.js`
- 82/102 builtins have tests (80.4% coverage)
- 87 translator tests passing in `main.js`
- Import system fully functional (`builtins.import`, `builtins.scopedImport`)
- Derivation system with basic tests
- All network fetchers (git, tarball, url, tree, path, filterSource, mercurial)
- Store path computation (`tools/store_path.js`)
- Hashing utilities (`tools/hashing.js`)
- Type checking functions (all 10 tested)

---

## USEFUL COMMANDS

```bash
# Run all tests
deno test --allow-all

# Run specific test file
deno test --allow-all main/tests/builtins_<category>_test.js

# Test Nix behavior in repl
nix repl
> builtins.functionName args

# Translate Nix to JS
deno run --allow-all main.js examples/test.nix

# Check test coverage
grep -r "Deno.test.*builtin_name" main/tests/
```

---

## REMEMBER

1. **Focus on what's NOT done** - Remove any achievements from this file
2. **No task is blocked** - Break it down or delegate with `cld`
3. **Test in nix repl first** - Understand expected behavior before testing
4. **Use esm.sh for npm** - `https://esm.sh/package-name` (unreliable, use cautiously)
5. **Write comprehensive tests** - 5-10 tests minimum per function
6. **Update this file** - Keep it focused on remaining work only
