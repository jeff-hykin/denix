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

**ALL 102 FUNCTION BUILTINS NOW HAVE COMPREHENSIVE TESTS!**

Runtime test coverage: 102/102 builtins tested (100%)
Total runtime tests: 659+ tests across 40 test files

### RUNTIME TESTING: COMPLETE

All previously untested builtins now have comprehensive test coverage:

Test files created (Session 43):
- `main/tests/builtins_context_test.js` - 32 tests (context operations)
- `main/tests/builtins_hashing_test.js` - 30 tests (hashString, hashFile)
- `main/tests/builtins_store_test.js` - 39 tests (store operations)
- `main/tests/builtins_control_flow_standalone_test.js` - 22 tests (break, traceVerbose, genericClosure)
- `main/tests/builtins_derivation_ops_test.js` - 22 tests (derivation operations)
- `main/tests/builtins_nixpath_test.js` - 10 tests (nixPath)
- `main/tests/builtins_advanced_fetchers_test.js` - 34 tests (fetchClosure, getFlake)

Bug fixes during testing:
- Fixed `nixPath` implementation to correctly parse paths containing `=` characters

---

## NEXT PRIORITIES

### Priority 1: Expand nixpkgs.lib Testing (RECOMMENDED, 5-8 hours)

Test these high-value nixpkgs.lib files:
- `lists.nix` - List manipulation functions
- `attrsets.nix` - Attribute set operations
- `options.nix` - NixOS module system options

Goal: Increase nixpkgs.lib coverage from 29% (12/41 files) to 50%+ (20/41 files)

### Priority 2: Translator Edge Cases (2-3 hours)
- Advanced pattern matching (nested @, ellipsis in functions)
- String escape sequences verification
- Path literal edge cases
- Operator precedence verification
- Multi-line string handling

### Priority 3: Optional Advanced Features (only if requested)
- Complete binary cache support for `fetchClosure` (5-7 days, VERY COMPLEX)
- Implement network fetchers for `getFlake` (github:, gitlab:, git:, etc.) - partially done
- `fetchTree` edge cases (4-6 hours) - type='path', type='indirect'

---

## WHAT IS ALREADY WORKING (DO NOT MODIFY UNLESS BROKEN)

- 102 function builtins implemented in `main/runtime.js`
- 82/102 builtins have tests (80.4% coverage)
- 87 translator tests passing in `translator.js`
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
deno run --allow-all translator.js examples/test.nix

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
