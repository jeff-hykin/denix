## Package Repo
- Find default.nix values for packages in nixpkgs
- Bundle them into a single file
- Detect/guess their inputs/dependencies
    - Attempt to use other flakes as inputs rather than nixpkgs
    - Attempt to pin versions of inputs
- Create a flake for them

## Foundation
- Done: find/make a standalone `lib`
- hard: find/make a standalone `mkDerivation`
- create a minimal `stdenv` package flake