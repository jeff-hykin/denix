# Denix - What's NOT Done

**Last Updated:** 2026-02-11

## Current Priority: Test nixpkgs.lib Files

### Critical Gap: 3 Core Files Need Tests (~75 functions)

These block all real-world nixpkgs usage:

- **lists.nix** - ~30 functions need tests (map, filter, fold, flatten, unique, sort, partition, zip, take, drop, head, tail, last, etc.)
- **attrsets.nix** - ~25 functions need tests (mapAttrs, filterAttrs, mergeAttrs, recursiveUpdate, getAttrFromPath, hasAttrByPath, zipAttrs, collect, etc.)
- **options.nix** - ~20 functions need tests (mkOption, mkEnableOption, mkDefault, mkForce, mkOverride, mergeOptionDecls, etc.)

**Files exist at:** `main/tests/fixtures/nixpkgs-lib/lib/*.nix`

### Other lib Files Needing Tests (18 files)

- `modules.nix` - Module system implementation
- `types.nix` - Type system for NixOS options
- `meta.nix` - Package metadata helpers
- `debug.nix` - Debugging utilities
- `generators.nix` - Code generators
- `filesystem.nix` - File/directory operations
- `cli.nix` - Command-line interface helpers
- `derivations.nix` - Derivation utilities
- `fixed-points.nix` - Fixed point combinators
- `customisation.nix` - Package customization
- `maintainers.nix` - Maintainer metadata
- `teams.nix` - Team metadata
- `systems/architectures.nix` - CPU architectures
- `systems/doubles.nix` - System doubles
- `systems/for-meta.nix` - Platform metadata
- `systems/parse.nix` - Platform string parsing
- `systems/inspect.nix` - Platform inspection
- `systems/default.nix` - Platform aggregation
- `systems/platform.nix` - Platform utilities
- `systems/platforms.nix` - Platform definitions
- `path/` directory - Path utilities
- `fileset/` directory - File set utilities
- `asserts.nix` - Assertion helpers

## Translator Edge Cases Not Tested

**Pattern Matching Gaps:**
- Nested `@` patterns: `{ x, y } @ args @ full`
- Ellipsis with defaults: `{ a ? 1, ... }`
- Complex destructuring in function args

**String/Path Gaps:**
- Multi-line strings with mixed indentation
- Ancient URI literals (deprecated but may appear)
- Path concatenation edge cases
- All string escape sequences

**Operator Precedence:**
- Complex nested operators
- Precedence with `->`, `//`, `++`

**Other Language Features:**
- `inherit (expr) names` - may have bugs
- Nested `with` statements - scope handling
- `rec` with complex interdependencies

## Advanced Features Partial Implementation

**fetchClosure:**
- Returns stub
- Needs: binary cache API, NAR parsing, signature verification

**getFlake:**
- Returns stub
- Needs: flake.lock parsing, github/gitlab/git fetchers, registry lookups

**fetchTree:**
- `type='path'` - not implemented
- `type='indirect'` - not implemented

## Test Process

1. **Research in nix repl:**
   ```bash
   nix repl
   > builtins.functionName testInput
   ```

2. **Find real-world usage in nixpkgs.lib source**

3. **Write test file:**
   ```javascript
   // main/tests/nixpkgs_lib_<filename>_test.js
   Deno.test("lib.<function> - behavior", async () => {
       const nixCode = `...`;
       // test implementation
   });
   ```

4. **Test edge cases:** empty inputs, null, type mismatches, large inputs, nested structures

5. **Verify:** `deno test --allow-all`

## Useful Commands

```bash
# Run all tests
deno test --allow-all

# Run specific test
deno test --allow-all main/tests/nixpkgs_lib_<name>_test.js

# Test Nix behavior
nix repl
> :l <nixpkgs/lib>
> lists.map (x: x * 2) [1 2 3]

# Check tested files
grep -r "nixpkgs_lib_" main/tests/
```
