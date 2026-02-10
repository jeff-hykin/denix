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
**Status:** ⚠️ 97/97 implemented, 40/97 tested (41%)

Implements all Nix 2.18 builtins:
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
- `hashing.js` - SHA256, MD5, SHA1, SHA512
- `store_path.js` - Nix store path computation
- `import_resolver.js` - Path resolution for imports
- `parsing.js` - Nix parser wrapper
- `analysis.js` - Scope stack management
- `lazy_array.js` - Lazy list evaluation (lazyMap)
- `json_parse.js` - JSON with BigInt support
- `generic.js` - Type conversion helpers

### 5. Testing (main/tests/ - 27 files)

**Test Categories:**
1. Runtime builtins (10 files) - Test individual builtins
2. Translator (4 files) - Test Nix → JS translation
3. Derivations (2 files) - Test derivation system
4. Import system (5 files) - Test import/scopedImport
5. Infrastructure (4 files) - Test fetcher, tar, NAR, store
6. Integration (2 files) - Test against nixpkgs.lib

**Test Runner:** `./test.sh` with category support

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

### Current Coverage
- 240+ tests passing
- Runtime: 40/97 builtins tested (41%)
- Translator: 100% (87/87 tests)
- Integration: Working (nixpkgs.lib files tested)

### Target Coverage
- Runtime: 80%+ (77/97 builtins)
- Focus: Type checking, list ops, attrset ops

### Test Methodology
1. Read Nix 2.18 docs
2. Test in nix repl (verify behavior)
3. Write tests (normal + edge cases)
4. Fix bugs (untested code has bugs)
5. Verify (match nix repl exactly)

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
│   ├── store_path.js            # Store path computation
│   ├── import_resolver.js       # Path resolution
│   ├── parsing.js               # Parser wrapper
│   ├── analysis.js              # Scope tracking
│   ├── lazy_array.js            # Lazy lists
│   ├── json_parse.js            # JSON + BigInt
│   └── generic.js               # Utilities
├── nixpkgs.lib/                 # Test data (git submodule)
├── test.sh                      # Test runner
├── prompt.md                    # Development guide
├── README.md                    # Project overview
└── TESTING.md                   # Testing guide
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

## Development Priority (Architecture-Driven)

**CRITICAL PRIORITY:** Test most-used builtins first
1. List operations: map, filter, all, any (CRITICAL - used everywhere)
2. Attrset operations: getAttr, attrNames, attrValues (CRITICAL)
3. Then: 80% coverage target (47 more tests needed)

**WHY:** These functions are used in every Nix file. Testing them ensures the runtime works for real-world code.

**SKIP:** Derivation edge cases (basic functionality works), translator improvements (100% tested), optional features (fetchMercurial, getFlake).

See [prompt.md](prompt.md) for detailed test plans.

## Performance Notes

- Lazy evaluation minimizes computation
- lazyMap proxy for efficient list operations
- Import caching reduces file I/O
- Store caching reduces network requests

## Future Considerations

**If expanding beyond Nix 2.18:**
1. Add `warn` builtin (Nix 2.24+)
2. Add `convertHash` builtin (Nix 2.25+)
3. Implement optional fetchers
4. Add flake system support

**Current recommendation:** Focus on testing, not new features.
