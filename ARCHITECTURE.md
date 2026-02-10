# Denix Architecture

## Core Mission
Translate Nix expressions to JavaScript with 1-to-1 parity for Nix 2.18 builtins.

## Project Structure

```
denix/
├── main.js                 # Nix → JavaScript translator
├── main/
│   ├── runtime.js          # 97 Nix builtins + operators
│   ├── import_cache.js     # Import caching
│   ├── import_loader.js    # File loading
│   ├── fetcher.js          # HTTP downloads
│   ├── tar.js              # Tarball extraction
│   ├── nar_hash.js         # NAR hashing
│   ├── store_manager.js    # Store management
│   └── tests/              # All tests (27 files)
├── tools/
│   ├── hashing.js          # SHA256, MD5, SHA1, SHA512
│   ├── store_path.js       # Store path computation
│   └── import_resolver.js  # Path resolution
├── nixpkgs.lib/            # Test data only
├── test.sh                 # Test runner
└── prompt.md               # Development priorities
```

## Components

### 1. Translator (main.js)
**Status:** ✅ 100% complete (87/87 tests passing)
- Converts Nix AST → JavaScript
- Handles scope management
- Preserves lazy evaluation

### 2. Runtime (main/runtime.js)
**Status:** ⚠️ 100% implemented, 26% tested
- 97 Nix 2.18 builtins implemented
- Only 28/97 tested
- **3 critical bugs just fixed** (concatLists, isAttrs, head)

### 3. Testing
**Status:** 27 test files, ~240 tests passing
- Test categories: runtime, translator, derivation, import, infra, integration
- Run: `./test.sh` or `./test.sh <category>`

## Key Design Decisions

1. **BigInt for integers** - Correct division behavior (1/2 = 0)
2. **Object.create() for scopes** - Preserves lazy getters
3. **~/.cache/denix/store/** - No root permissions needed
4. **URL imports only** - No npm/jsr dependencies

## Critical Priority

**Runtime testing is THE priority:**
- 69/97 builtins untested (74%)
- Bug discovery rate: 100% (3 bugs in 3 tested functions)
- Estimated 20-30 more bugs in untested code

**Do NOT work on translator or nixpkgs.lib until runtime is 80%+ tested.**

## Testing Strategy

All tests compare JS output with Nix behavior:
1. Test in `nix repl` to get expected output
2. Test in JavaScript runtime
3. Assert deep equality

## Dependencies

- Deno standard library (URL imports)
- tree-sitter-nix (via esm.sh)
- @std/assert (testing)
