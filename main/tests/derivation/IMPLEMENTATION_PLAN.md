# Derivation Implementation Plan

## Overview
Implementing `builtins.derivation` based on the Nix specification from [Nix 2.18 Documentation](https://nix.dev/manual/nix/2.18/language/derivations.html) and [Store Path Specification](https://nix.dev/manual/nix/2.22/protocols/store-path).

## Phase 1: Basic Structure (Tests 001-010)
- [x] Create test infrastructure with Nix/JS comparison
- [ ] Implement basic derivation return value structure
  - `name`, `system`, `builder`, `outputName`
  - `outPath`, `drvPath` (with placeholder hashes initially)
  - `type = "derivation"`
  - `out` (alias for outPath)
  - `all`, `drvAttrs` attributes
- [ ] Handle required attributes validation
- [ ] Handle optional `args` attribute
- [ ] Handle optional `outputs` attribute (default ["out"])

## Phase 2: Environment Variables (Tests 011-020)
- [ ] Convert string attributes to env vars
- [ ] Convert number attributes to env vars
- [ ] Convert boolean attributes (true → "1", false → "")
- [ ] Convert null attributes (null → "")
- [ ] Convert list attributes (space-separated)
- [ ] Handle reserved attributes (don't pass to env)

## Phase 3: Store Path Computation (Tests 021-040)
- [ ] Implement .drv file format generation
  - `Derive(outputs, inputDrvs, inputSrcs, platform, builder, args, env)`
- [ ] Implement store path hash computation
  - Create serialization string
  - SHA-256 hash
  - Truncate to 160 bits
  - Base-32 encoding
- [ ] Compute drvPath from .drv contents
- [ ] Compute outPath from derivation attributes

## Phase 4: Advanced Features (Tests 041-060)
- [ ] Handle path attributes (copy to store)
- [ ] Handle derivation dependencies
  - Build input derivations first
  - Use their output paths in env
- [ ] Handle multiple outputs
- [ ] Handle `passAsFile` for large env vars

## Phase 5: Integration (Tests 061-080)
- [ ] Integrate with toJSON (should return outPath)
- [ ] Implement proper string context tracking
- [ ] Handle recursive derivation dependencies
- [ ] Full .drv file writing to store

## Store Path Hash Algorithm

Based on [Nix Pills Store Paths](https://nixos.org/guides/nix-pills/18-nix-store-paths) and [Store Path Spec](https://nix.dev/manual/nix/2.22/protocols/store-path):

```
For output paths:
1. Create string: "output:out:sha256:<hash-of-drv>:/nix/store:<name>"
2. Compute SHA-256 hash
3. Truncate to 160 bits (20 bytes)
4. Encode in base-32 using Nix alphabet: "0123456789abcdfghijklmnpqrsvwxyz"
5. Result: /nix/store/<hash>-<name>

For drv paths:
1. Serialize derivation to ATerm format
2. Compute SHA-256 of serialization
3. Same truncation and encoding
4. Result: /nix/store/<hash>-<name>.drv
```

## .drv File Format (ATerm)

```
Derive(
  [("outputName", "outputPath", "hashAlgo", "hash"), ...],  // outputs
  [("/nix/store/path.drv", ["output1", "output2"]), ...],   // inputDrvs
  ["/nix/store/source", ...],                                // inputSrcs
  "system",                                                  // platform
  "builder",                                                 // builder
  ["arg1", "arg2", ...],                                    // args
  [("envVar", "value"), ...]                                // env
)
```

## Test Strategy

Each test file covers 10 tests of similar complexity:
- `001_basic_tests.js` (001-010): Minimal derivations, basic attributes
- `002_env_vars.js` (011-020): Environment variable conversion
- `003_store_paths.js` (021-030): Store path computation basics
- `004_hash_computation.js` (031-040): Proper hash algorithm
- `005_dependencies.js` (041-050): Derivation dependencies
- `006_multiple_outputs.js` (051-060): Multiple output handling
- `007_advanced.js` (061-070): Path copying, complex cases
- `008_integration.js` (071-080): Full integration tests

## References
- [Nix Derivations Manual](https://nix.dev/manual/nix/2.18/language/derivations.html)
- [Store Path Specification](https://nix.dev/manual/nix/2.22/protocols/store-path)
- [Nix Pills - Store Paths](https://nixos.org/guides/nix-pills/18-nix-store-paths)
- [NixOS Discourse - Hash Calculation](https://discourse.nixos.org/t/how-to-calculate-hash-of-derivation-for-store-path-drv/5300)
