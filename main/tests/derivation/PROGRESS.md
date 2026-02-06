# Derivation Implementation Progress

## Completed

### Infrastructure ✅
- [x] Created test harness (`test_harness.js`) for comparing Nix and JS outputs
- [x] Created basic test suite (`001_basic_tests.js`) with 10 tests
- [x] Implemented implementation plan (`IMPLEMENTATION_PLAN.md`)
- [x] Created store path utilities (`tools/store_path.js`)

### Implementation ✅
- [x] Basic derivation function structure
- [x] Required attribute validation (name, system, builder)
- [x] Optional attributes (args, outputs)
- [x] Environment variable conversion:
  - [x] Strings → strings
  - [x] Numbers/BigInts → strings
  - [x] Booleans → "1" or ""
  - [x] null → ""
  - [x] Lists → space-separated strings
  - [x] Derivations → outPath
- [x] Derivation return value structure:
  - [x] type = "derivation"
  - [x] name, system, builder, args, outputs
  - [x] outputName (default output)
  - [x] drvPath, outPath
  - [x] Individual output properties (out, dev, etc.)
  - [x] all (array of all outputs)
  - [x] drvAttrs (original attributes)
  - [x] toString/toPrimitive coercion to outPath

## In Progress

### Store Path Computation 🚧
Current issue: Hash algorithm doesn't exactly match Nix

**What's implemented:**
- Basic ATerm serialization format
- SHA-256 hashing
- Nix base-32 encoding
- Output path computation from derivation hash

**What needs fixing:**
- Hash mismatch indicates subtle differences in:
  - Serialization format (whitespace, ordering, escaping?)
  - Hash input string format
  - Base-32 encoding implementation

**Next steps:**
1. Study Nix source code for exact serialization format
2. Verify base-32 encoding matches Nix's algorithm
3. Debug hash computation step-by-step
4. Compare intermediate values with Nix

## Blocked

### Testing 🚫
Cannot run full integration tests due to prex WASM initialization issue in runtime.js.

**Workarounds:**
- Create standalone test files without full runtime import
- Test individual components (store_path.js works standalone)
- Test derivation logic separately from main runtime

## Test Results

### Store Path Tests
```
Current output:  /nix/store/0lxj84jlr98czpd0xrmvbz1q5cnh5hpq-test.drv
Expected output: /nix/store/y1s2fiq89v2h9vkb38w508ir20dwv6v2-test.drv
Status: ❌ MISMATCH
```

```
Current output:  /nix/store/4pz4z9gg8i89pvjkh98bhp7y3sl4fpzb-test
Expected output: /nix/store/d62izaahds46siwr2b7k7q3gan6vw4p0-test
Status: ❌ MISMATCH
```

### Basic Tests
Status: Not yet run (blocked by prex issue and hash mismatch)

## Next Actions

1. **Priority 1: Fix hash computation**
   - Research exact Nix serialization format
   - Implement bit-exact base-32 encoding
   - Verify against known test cases

2. **Priority 2: Create standalone tests**
   - Work around prex issue with standalone derivation tests
   - Test each component independently

3. **Priority 3: Incremental testing**
   - Start with tests that don't require exact hash matching
   - Test structure and attribute handling
   - Test environment variable conversion
   - Add hash-dependent tests later

## Resources

- [Nix Derivations Manual](https://nix.dev/manual/nix/2.18/language/derivations.html)
- [Store Path Specification](https://nix.dev/manual/nix/2.22/protocols/store-path)
- [Nix Source: derivations.cc](https://github.com/NixOS/nix/blob/master/src/libstore/derivations.cc)
- [Nix Source: store-api.cc](https://github.com/NixOS/nix/blob/master/src/libstore/store-api.cc)
