# Denix Architecture

## Mission

Translate Nix expressions to JavaScript with 1-to-1 parity for Nix 2.18 builtins.

## Core Components

### 1. Translator (main.js - 1,278 lines)
**Status:** ✅ Complete (87/87 tests passing)

Converts Nix AST to JavaScript code:
- Uses tree-sitter-nix parser
- Handles scope management (nixScope stack)
- Preserves lazy evaluation semantics
- Outputs executable JavaScript

### 2. Runtime (main/runtime.js - 2,314 lines)

Implements all 109 Nix 2.18 builtins:
- Type checking: isNull, isAttrs, typeOf, etc.
- List operations: map, filter, fold, etc.
- Attrset operations: mapAttrs, hasAttr, etc.
- String operations: split, match, replaceStrings
- Math operations: add, sub, mul, div, bitwise
- Derivations: derivation, storePath
- Fetchers: fetchGit, fetchTarball, fetchurl
- Import system: import, scopedImport
- Control flow: throw, trace, seq, tryEval

### 3. Support Modules (main/)

**Import System:**
- `import_cache.js` - Caching and circular detection
- `import_loader.js` - File loading (Nix and JSON)

**Network/Storage:**
- `fetcher.js` - HTTP downloads with retry logic
- `tar.js` - Tarball extraction (uses @std/tar)
- `nar_hash.js` - NAR directory hashing
- `store_manager.js` - ~/.cache/denix/store/ management

**Utilities:**
- `errors.js` - Custom error types

### 4. Tools (tools/)

**Core Utilities:**
- `hashing.js` - SHA256, MD5, SHA1, SHA512, MD5 implementation
- `sha1.js` - SHA1 implementation
- `sha_helpers.js` - SHA helper utilities
- `store_path.js` - Nix store path computation
- `import_resolver.js` - Path resolution for imports
- `parsing.js` - Nix parser wrapper
- `lazy_array.js` - Lazy list evaluation (lazyMap)
- `json_parse.js` - JSON with BigInt support
- `generic.js` - Type conversion helpers

### 5. Testing (main/tests/ - 33 files)

**Test Categories:**
1. Runtime builtins - Test individual builtins
2. Translator - Test Nix → JS translation
3. Derivations - Test derivation system
4. Import system - Test import/scopedImport
5. Infrastructure - Test fetcher, tar, NAR, store
6. Integration - Test against nixpkgs.lib

**Test Runner:** `./test.sh` with category support

Run all tests: `./test.sh`
Run specific category: `./test.sh derivation`, `./test.sh math`, etc.

## Key Design Decisions

### 1. BigInt for Integers
Nix integers → JavaScript BigInt

**Why:** Correct integer division semantics
- Nix: `1 / 2` → `0` (integer division)
- JS without BigInt: `1 / 2` → `0.5` (float division)
- JS with BigInt: `1n / 2n` → `0n` ✓

All operators handle both BigInt (int) and Number (float).

### 2. Object.create() for Scopes
Function closures use `Object.create(parentScope)` not `{...parentScope}`

**Why:** Preserves lazy evaluation getters
- Spread operator `{...obj}` copies properties (loses getters)
- Object.create() maintains prototype chain (preserves getters)
- Critical for recursive attribute sets

### 3. Lazy Evaluation
Lists, strings, and recursive attrsets are lazy:
- `map` returns lazyMap proxy (computes on access)
- `partition` uses cached getters (compute once)
- Recursive attrsets use Object.defineProperty getters

### 4. No Root Permissions
Store path: `~/.cache/denix/store/` not `/nix/store/`

**Why:** No sudo required, works on any system

### 5. URL Imports Only
Zero npm/jsr dependencies, only URL imports

**Why:**
- Deno-first design
- esm.sh available for npm packages (with fallback plans)
- Simpler dependency management

### 6. String Interpolation Classes
Custom classes for lazy string evaluation:
- `InterpolatedString` - For `"${expr}"` strings
- `Path` - Extends InterpolatedString for path literals

### 7. Scope Management
Variables stored in `nixScope` object:
- Avoids JS keyword conflicts (`let`, `with`, etc.)
- Handles Nix identifiers with dashes
- Stack-based for nested scopes

## Testing Strategy

### Test Methodology
1. Read Nix documentation for the builtin
2. Test in `nix repl` to understand exact behavior
3. Write 5-10 tests per function (normal + edge cases)
4. Compare JS output against nix repl output
5. Fix any bugs discovered

## File Organization

```
denix/
├── main.js                      # Translator entry point
├── main/
│   ├── runtime.js               # Builtins + operators
│   ├── import_cache.js          # Import caching
│   ├── import_loader.js         # File loading
│   ├── fetcher.js               # HTTP downloads
│   ├── tar.js                   # Tarball extraction
│   ├── nar_hash.js              # NAR hashing
│   ├── store_manager.js         # Store management
│   ├── errors.js                # Error types
│   └── tests/                   # All tests (27 files)
├── tools/
│   ├── hashing.js               # Hash functions
│   ├── sha1.js                  # SHA1 implementation
│   ├── sha_helpers.js           # SHA helper utilities
│   ├── md5.js                   # MD5 implementation
│   ├── store_path.js            # Store path computation
│   ├── import_resolver.js       # Path resolution
│   ├── parsing.js               # Parser wrapper
│   ├── lazy_array.js            # Lazy lists
│   ├── json_parse.js            # JSON + BigInt
│   └── generic.js               # Utilities
├── nixpkgs.lib/                 # Test data (git submodule)
├── test.sh                      # Test runner
├── prompt.md                    # Current priorities
├── README.md                    # Project overview
└── ARCHITECTURE.md              # This file
```

## Not Part of Core

- `.claude/` - Claude logs (gitignored)

## Dependencies

**Runtime:**
- Deno standard library (@std/assert, @std/tar, etc.)
- tree-sitter-nix (via esm.sh) - Nix parser

**No npm/jsr direct imports allowed.**

## Known Limitations

**Optional features not implemented:**
- `fetchMercurial` - Rarely used
- `fetchClosure` - Binary cache (complex)
- `getFlake` - Full flake system (complex)
- `fetchTree` type='mercurial|path|indirect' - Edge cases

**These are documented as optional in Nix 2.18 and rarely used in practice.**

## Current Status

See [README.md](README.md) for implementation status.
See [prompt.md](prompt.md) for development priorities and next tasks.

## Performance Notes

- Lazy evaluation minimizes computation
- lazyMap proxy for efficient list operations
- Import caching reduces file I/O
- Store caching reduces network requests

## Future Considerations

**If expanding beyond Nix 2.18:**
- Add `warn` builtin (Nix 2.24+)
- Add `convertHash` builtin (Nix 2.25+)
- Implement optional fetchers (fetchMercurial, fetchClosure, getFlake)
- Add flake system support
