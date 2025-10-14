## Package Repo
- DONE: Tool that converts an attribute to a flake
- DONE: replace meta with data from static.json
- Get a list of executables for the package (start with darwin, then include linux)
- Try to automatically get the package source (either local file or tarball or git or github)
- Have an updater script that writes the static.json file
- Attempt to use other flakes as inputs rather than nixpkgs
    - Try swapping lib (delete lib as input)
    - Match package attr names just from function call
    - convert to flake input relative path or github

## Foundation
- Done: find/make a standalone `lib`
- hard: find/make a standalone `mkDerivation`
- create a minimal `stdenv` package flake