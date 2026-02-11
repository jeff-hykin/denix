# CRITICAL: READ THIS FIRST

You are tasked with faithfully creating a nix runtime in JavaScript. A system that both translates nix code to JavaScript and has a runtime.js that implements the nix builtins and operators faithfully.

Your job is to focus on writing code and implementing what is NOT implemented and NOT working. Report what remains to be done. You are a senior level developer, no task is blocked for you because you can always delegate your task to other agents by calling `cld <clear focused actionable task description>`.

**IMPORTANT**: You are allowed to use npm modules but only if they are done through https://esm.sh/NPM_MODULE_NAME (which doesn't always work - be prepared for failures).

---

## What is NOT Implemented / NOT Working

### Priority 0: nixpkgs.lib Testing - CRITICAL GAP (71% of lib files UNTESTED)

**Agent, your job is to specifically implement comprehensive tests for nixpkgs.lib files no matter how hard or large of a task it is.**

According to MEMORY.md, there are 18 lib files in fixtures, but only 12 have test coverage (29%). The following critical files have ZERO tests:

- **lists.nix** - NOT TESTED (~30 functions: map, filter, fold, flatten, unique, sort, partition, zip, take, drop, head, tail, last, etc.)
- **attrsets.nix** - NOT TESTED (~25 functions: mapAttrs, filterAttrs, mergeAttrs, recursiveUpdate, getAttrFromPath, hasAttrByPath, zipAttrs, collect, etc.)
- **options.nix** - NOT TESTED (~20 functions: mkOption, mkEnableOption, mkDefault, mkForce, mkOverride, mergeOptionDecls, etc.)

**What you need to do:**
1. Read each .nix file in `main/tests/fixtures/nixpkgs-lib/lib/`
2. Extract all function definitions
3. Create comprehensive test files following the pattern in `main/tests/nixpkgs_lib_files_test.js`
4. Aim for ~150+ test cases total for these 3 critical files
5. Verify each function works identically to real Nix

**Time estimate**: 4-6 days of work

---

### Priority 1: Translator Edge Cases - MAY HAVE BUGS

**Agent, your job is to specifically implement tests and fixes for all translator edge cases no matter how hard or large of a task it is.**

The following Nix language features are NOT fully tested and may have bugs:

1. **Nested `@` patterns** - NOT TESTED
   - Example: `{ a, b } @ args @ full: ...`
   - Need tests with multiple levels of pattern binding

2. **Ellipsis with defaults** - NOT TESTED
   - Example: `{ a ? 1, b ? 2, ... }: ...`
   - Need tests combining default values with ellipsis

3. **Multi-line strings with mixed indentation** - NOT TESTED
   - Example: Strings with tabs + spaces, varying indent levels
   - Need tests for indented string literal edge cases

4. **Ancient URI literals** - NOT TESTED
   - Example: `http://example.com` (deprecated syntax)
   - Need tests or explicit rejection with error message

5. **Path concatenation edge cases** - NOT TESTED
   - Example: `/. + "/foo"`, `./. + ./bar`
   - Need tests for all path operation combinations

6. **Complex operator precedence** - NOT TESTED
   - Example: `a + b * c or d && e || f`
   - Need comprehensive operator precedence tests

7. **`inherit (expr) names`** - NOT FULLY TESTED
   - Example: `inherit (pkgs) lib stdenv;`
   - Need tests with complex expressions

8. **Nested `with` statements** - NOT FULLY TESTED
   - Example: `with a; with b; expr`
   - Need tests for scope shadowing behavior

9. **`rec` with complex interdependencies** - NOT FULLY TESTED
   - Example: `rec { a = b + 1; b = c + 1; c = 1; }`
   - Need tests for forward references and circular detection

**What you need to do:**
1. Create test files for each category
2. Reference Nix documentation for exact behavior
3. Test against real `nix repl` to verify correctness
4. Fix any translator bugs discovered
5. Ensure 100% parity with Nix 2.18+ behavior

**Time estimate**: 2-3 days of work

---

### Priority 2: Advanced Fetcher Features - NOT FULLY IMPLEMENTED

**Agent, your job is to specifically implement the following builtins no matter how hard or large of a task it is.**

The following builtins return stubs and need full implementation:

#### 2.1: fetchClosure - NOT IMPLEMENTED

Current state: Returns stub object
What's needed: Full binary cache support

**Requirements:**
- Binary cache API client (cache.nixos.org)
- NAR (Nix Archive) format parser
- Signature verification for store paths
- Store path validation
- Content-addressed store path computation

**Time estimate**: 5-7 days (VERY COMPLEX)

#### 2.2: getFlake - NOT IMPLEMENTED

Current state: Returns stub object
What's needed: Full flake system support

**Requirements:**
- flake.lock parser
- GitHub/GitLab/Git fetchers
- Flake registry lookup
- Flake schema validation
- Input resolution
- Output schema handling

**Time estimate**: 5-7 days (VERY COMPLEX)

#### 2.3: fetchTree type='path' - NOT IMPLEMENTED

Current state: Not handled in switch statement
What's needed: Local path copying with store path creation

**Requirements:**
- Copy local path to store
- Compute NAR hash
- Generate store path
- Handle filters/exclusions

**Time estimate**: 4-6 hours

#### 2.4: fetchTree type='indirect' - NOT IMPLEMENTED

Current state: Not handled in switch statement
What's needed: Flake registry resolution

**Requirements:**
- Parse indirect flake references
- Resolve via flake registry
- Convert to direct fetchTree call

**Time estimate**: 4-6 hours

---

## Current State (For Reference Only)

According to MEMORY.md Session 43:
- Runtime: 102/102 builtins tested (100% test coverage)
- Translator: 87/87 tests passing
- Import system: Fully functional
- Derivation system: Working
- Store path computation: Working
- Fetchers: fetchTarball, fetchurl, fetchGit, fetchTree (partial) implemented

**DO NOT report these achievements. Focus ONLY on what remains unimplemented above.**

---

## How to Work Effectively

1. **Break down large tasks** - Don't try to implement everything at once
2. **Delegate when appropriate** - Use `cld <task>` to spawn agents for research/exploration
3. **Read documentation FIRST** - Check nix.dev and noogle.dev before implementing
4. **Test in `nix repl`** - Verify expected behavior before implementing
5. **Create tests BEFORE fixing** - Write failing tests, then make them pass
6. **Use esm.sh for npm packages** - But be prepared for it to fail
7. **No task is blocked** - You can always find a way forward

---

## Work Priority Order (MUST FOLLOW)

1. **Priority 0**: Expand nixpkgs.lib testing (lists.nix, attrsets.nix, options.nix)
2. **Priority 1**: Test and fix translator edge cases
3. **Priority 2**: Implement advanced fetcher features (fetchClosure, getFlake, fetchTree edge cases)

Start with Priority 0. Only move to the next priority when the current one is complete.

---

## Reminder

**Your job**: Implement what is NOT done. Report what remains to be done. Write code, fix bugs, create tests.

**Not your job**: Report achievements, celebrate completeness, say things are "working well".

Focus on the gaps. Close the gaps. Move forward.
