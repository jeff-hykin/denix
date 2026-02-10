# nixpkgs.lib Test Fixtures

This directory contains a minimal subset of nixpkgs.lib files used for integration testing.

## Contents

Only the files **actually used by tests** are included here (12 files total):

```
lib/
├── ascii-table.nix          # ASCII character mappings
├── fetchers.nix             # Fetch helpers
├── flake-version-info.nix   # Version metadata
├── flakes.nix               # Flake re-exports
├── kernel.nix               # Kernel config helpers
├── licenses.nix             # License definitions
├── minfeatures.nix          # Nix version features
├── source-types.nix         # Source type definitions
├── strings.nix              # String manipulation (imports ascii-table.nix)
├── versions.nix             # Version parsing
└── systems/
    ├── flake-systems.nix    # Platform list
    └── supported.nix        # Platform tiers
```

## Full nixpkgs.lib

To test against the complete nixpkgs.lib (32+ files):

```bash
cd denix
git clone https://github.com/NixOS/nixpkgs --depth=1 --branch=master
mv nixpkgs/lib nixpkgs.lib
rm -rf nixpkgs
```

Then update `main/tests/nixpkgs_lib_files_test.js` line 16:
```javascript
const nixpkgsLibPath = resolve(Deno.cwd(), "nixpkgs.lib")
```

## Why minimal fixtures?

The full nixpkgs.lib directory is **13MB** (32 files + subdirectories + git history).
Since only 12 files are used in tests, we include just those to keep the repo lean.
