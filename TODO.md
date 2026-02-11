# Denix - What's NOT Done

**Last Updated:** 2026-02-11

## Current Priority: Expand nixpkgs.lib Test Coverage

### Available Test Fixtures (12 files)

Only these nixpkgs.lib files are currently available as test fixtures:

**Already tested (10 files):**
- `ascii-table.nix` - ASCII character mappings
- `strings.nix` - String manipulation functions
- `minfeatures.nix` - Nix version feature detection
- `source-types.nix` - Source type definitions
- `versions.nix` - Version parsing utilities
- `kernel.nix` - Linux kernel config helpers
- `flakes.nix` - Flake builtin re-exports
- `flake-version-info.nix` - Version metadata overlay
- `systems/flake-systems.nix` - Platform list
- `systems/supported.nix` - Platform tiers

**Not yet tested (2 files):**
- `fetchers.nix` - Fetcher utilities
- `licenses.nix` - License definitions

**Location:** `main/tests/fixtures/nixpkgs-lib/lib/`

### To Expand Testing: Fetch More nixpkgs.lib Files

The fixtures directory only has 12 of 40+ nixpkgs.lib files. To test more:

**High-priority files to fetch:**
- `lists.nix` (~30 functions) - map, filter, fold, flatten, unique, sort, etc.
- `attrsets.nix` (~25 functions) - mapAttrs, filterAttrs, mergeAttrs, etc.
- `options.nix` (~20 functions) - mkOption, mkEnableOption, mkDefault, etc.
- `modules.nix` - Module system
- `types.nix` - Type system
- `meta.nix` - Package metadata
- `debug.nix` - Debugging utilities

**How to add more fixtures:**
```bash
# Clone nixpkgs.lib
cd main/tests/fixtures/
curl -O https://raw.githubusercontent.com/NixOS/nixpkgs/master/lib/lists.nix
curl -O https://raw.githubusercontent.com/NixOS/nixpkgs/master/lib/attrsets.nix
# etc...
```

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
