# Denix Architecture

## Overview
Denix translates Nix expressions to JavaScript and provides a runtime for executing them.

## Project Structure

```
denix/
├── main.js                 # Nix → JS translator (1278 lines)
├── main/
│   ├── runtime.js          # Nix builtins runtime (2314 lines)
│   ├── import_cache.js     # Import caching system
│   ├── import_loader.js    # File loading for imports
│   ├── fetcher.js          # HTTP downloads
│   ├── tar.js              # Tarball extraction
│   ├── nar_hash.js         # NAR directory hashing
│   ├── store_manager.js    # Store path management
│   ├── errors.js           # Error types
│   └── tests/              # Test suite (166 test files)
├── tools/
│   ├── import_resolver.js  # Path resolution
│   ├── store_path.js       # Store path computation
│   ├── hashing.js          # Hash utilities (SHA256, MD5, SHA1, SHA512)
│   ├── parsing.js          # Parsing utilities
│   └── json_parse.js       # JSON parsing
├── nixpkgs.lib/            # Test data (nixpkgs.lib files for validation)
├── run/                    # Development automation (optional, not core project)
├── test.sh                 # Simple test runner
└── README.md               # Project overview
```

## Core Components

### 1. Translator (main.js)
Converts Nix AST to JavaScript code.

**Key responsibilities:**
- Parse Nix expressions (using tree-sitter-nix)
- Generate JavaScript that uses runtime.js
- Handle scope management (let, with, rec)
- Preserve lazy evaluation semantics

**Status:** 100% complete (87/87 tests passing)

### 2. Runtime (main/runtime.js)
Provides Nix builtins and operators in JavaScript.

**Key responsibilities:**
- Implement 65 Nix builtins (62/65 complete)
- Provide operators (arithmetic, comparison, logical)
- Handle special types (InterpolatedString, Path, Derivation)
- Manage scope stack and lazy evaluation

**Status:** 95% complete (62/65 builtins, 3 optional remain)

### 3. Import System
Files: import_cache.js, import_loader.js, import_resolver.js

**Key responsibilities:**
- Resolve import paths (relative, absolute, directory)
- Cache imported files
- Detect circular imports
- Load .nix and .json files

**Status:** 100% complete (49 tests passing)

### 4. Derivation System
Files: runtime.js (derivation builtin), store_manager.js, store_path.js

**Key responsibilities:**
- Compute store paths (using NAR hashing)
- Serialize derivations (.drv format)
- Manage store cache (~/.cache/denix/store/)

**Status:** 100% complete (12 tests passing)

### 5. Network Fetchers
Files: fetcher.js, tar.js, nar_hash.js

**Key responsibilities:**
- Download files (fetchurl, fetchTarball)
- Clone git repositories (fetchGit)
- Extract tarballs
- Compute NAR hashes for directories

**Status:** 100% complete (39 tests passing)

## Testing

### Test Organization
All tests in `main/tests/`:
- **translator_test.js** - Core translator (41 tests)
- **nixpkgs_trivial_test.js** - nixpkgs.lib patterns (20 tests)
- **nixpkgs_lib_files_test.js** - Full lib files (10 files)
- **derivation/** - Derivation system (12 tests)
- **import_*_test.js** - Import system (49 tests)
- **builtins_*_test.js** - Individual builtins
- Other feature tests

### Running Tests
```bash
./test.sh              # All tests (166 suites)
./test.sh derivation   # Filter by keyword
deno test --allow-all  # Direct deno test
```

### Test Strategy
All tests compare JavaScript output with actual Nix behavior:
1. Run same expression in Nix (via `nix eval`)
2. Run in JavaScript runtime
3. Compare JSON-serialized results
4. Assert deep equality

## Key Design Decisions

### 1. BigInt for Integers
Nix integers → JavaScript BigInt (not Number)
- Reason: Correct integer division (1/2 = 0, not 0.5)
- All operators handle both BigInt and Number

### 2. Object.create() for Scopes
Use `Object.create(parentScope)` NOT `{...parentScope}`
- Reason: Preserves getters for lazy evaluation
- Critical for rec attrsets and closures

### 3. Lazy Evaluation via Getters
Recursive attribute sets use Object.defineProperty with getters
- Reason: Nix is lazy by default
- Only evaluate when accessed

### 4. InterpolatedString Class
String interpolation creates InterpolatedString objects
- Reason: Lazy evaluation of interpolated parts
- Coerces to string when needed

### 5. Store in ~/.cache/
Use ~/.cache/denix/store/ instead of /nix/store
- Reason: No root permissions needed
- Still computes identical store paths

## Data Flow

### Translation Flow
```
Nix source → tree-sitter AST → JavaScript code → Execution
```

### Import Flow
```
import path → resolve → check cache → load file → translate → evaluate → cache result
```

### Derivation Flow
```
derivation attrs → serialize → compute NAR hash → generate store path → return derivation object
```

### Fetch Flow
```
fetch request → download → extract (if tarball) → compute NAR hash → copy to store → return path
```

## Dependencies

### Runtime Dependencies
- Deno standard library (via URL imports)
- tree-sitter-nix (Nix parser, via esm.sh)
- @std/assert (testing only)

### Zero npm/jsr
All dependencies via URL imports:
- Deno std: https://deno.land/std/
- npm via esm.sh: https://esm.sh/PACKAGE

## Performance

### Optimizations
1. Import caching - Files loaded once per session
2. Store caching - Downloaded files cached in ~/.cache/
3. Lazy evaluation - Only compute values when accessed

### Known Limitations
1. No parallel evaluation (JavaScript is single-threaded)
2. No incremental builds (full evaluation each time)
3. Store not garbage-collected (manual cleanup needed)

## Future Work

### High Priority
1. Derivation edge case tests (multiple outputs, passthru, meta)
2. Expand nixpkgs.lib test coverage (10/41 → 21/41)

### Low Priority (Optional)
1. fetchMercurial builtin (rarely used)
2. fetchClosure builtin (experimental)
3. getFlake builtin (experimental)
4. Translator edge case tests (nested patterns, escapes)

## Contributing

### Adding a Builtin
1. Implement in `main/runtime.js` under `builtins` object
2. Add tests in `main/tests/builtins_NAME_test.js`
3. Compare behavior with `nix repl`
4. Handle currying if needed (use `curry()` helper)

### Adding a Test
1. Create `main/tests/NAME_test.js`
2. Use Deno.test() for test cases
3. Compare JS runtime output with Nix
4. Use `assertEquals()` from @std/assert

### Debugging
1. Check `nix repl` for expected behavior
2. Add console.log() in runtime.js
3. Run single test: `./test.sh testname`
4. Check translator output in main.js
