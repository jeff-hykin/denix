# Task: Implement a translator from Nix to JavaScript

Your job is to focus on what is NOT implemented and NOT working. Only report what remains to be done. Do not report what you accomplished. You are a senior level developer, there is no such thing as a blocker. Break down large tasks into smaller tasks.

Before executing what is below, please filter out any achievements. Only keep remaining/unsolved tasks in this document. Add detail to each task if its needed.

## Current Tasks Overview

1. **Builtins** - Implement network fetchers (fetchurl, fetchTarball) in `main/runtime.js`
2. **Examples** - Create `./examples/` directory with nix → js translation examples
3. **Testing** - Continue testing nixpkgs.lib files

## 1. Builtins: Network Fetchers Implementation

**IMMEDIATE TASK**: Implement fetchurl and fetchTarball using JavaScript fetch APIs

### 1.1 Foundation - Store Path System

Before implementing fetchers, need /nix/store path computation and management.

**Research needed**:
- [ ] Study Nix's NAR (Nix Archive) format for directory hashing
- [ ] Understand fixed-output derivation store path formula
- [ ] Review existing tools/store_path.js for derivation paths (may be reusable)

**Tasks**:
- [ ] Create `helpers/store.js` module
- [ ] Implement store path computation for fixed-output derivations
  - Formula: `/nix/store/<hash>-<name>` where hash = base32(truncate(sha256(fingerprint)))
  - Fingerprint format for fixed-output: `fixed:out:<hashAlgo>:<hash>:/nix/store/<name>`
  - See: https://nixos.org/manual/nix/stable/protocols/store-path.html
  - Note: tools/store_path.js already has base32 encoding and hash truncation
- [ ] Implement file integrity verification (SHA256 hash checking)
  - Use Deno's crypto API: `await crypto.subtle.digest("SHA-256", data)`
  - Convert to hex for comparison with provided hash
- [ ] Create /nix/store directory if needed (with proper permissions)
  - Check if writable, fallback to ~/.cache/denix/store if not
  - Document the fallback behavior
- [ ] Implement atomic file operations (write to temp, then move)
  - Use Deno.makeTempFile() for temp files
  - Use Deno.rename() for atomic move
- [ ] Add store path registry (map hash → path)
  - Simple in-memory Map is sufficient for now
  - Could persist to ~/.cache/denix/store-db.json for reuse across runs

**Code structure**:
```javascript
// helpers/store.js
export class NixStore {
    constructor(storeDir = '/nix/store') { }

    // Compute store path for fixed-output derivation
    computePath(name, outputHash, outputHashAlgo = 'sha256') { }

    // Add file to store (atomic operation)
    addPath(sourcePath, storePath) { }

    // Verify file integrity
    verifyHash(path, expectedHash, algo = 'sha256') { }

    // Check if path exists in store
    pathExists(storePath) { }
}
```

### 1.2 fetchurl Implementation

Fetch single file via HTTP/HTTPS and add to /nix/store.

**Nix signature**:
```nix
fetchurl {
  url = "https://example.com/file.tar.gz";
  sha256 = "abc123...";  # Expected hash
  name = "file.tar.gz";   # Optional, derived from URL if not provided
}
```

**Tasks**:
- [ ] Create `helpers/fetch.js` module with retry logic
- [ ] Implement basic HTTP fetch with error handling
  - Use native `fetch()` API (available in Deno)
  - Handle common status codes: 200 (success), 3xx (redirect), 4xx/5xx (error)
  - Throw descriptive errors for non-200 responses
- [ ] Add retry logic with exponential backoff (3 retries max)
  - Wait times: 1s, 2s, 4s between retries
  - Only retry on network errors or 5xx server errors
  - Don't retry on 4xx client errors
- [ ] Handle redirects (follow up to 10 redirects)
  - Native fetch() handles this automatically with `redirect: "follow"`
  - Just set the option and validate final URL is expected
- [ ] Stream download to temp file (don't load into memory)
  - Use `response.body` as ReadableStream
  - Use `Deno.open()` with write mode for temp file
  - Pipe chunks: `for await (const chunk of response.body) { await file.write(chunk) }`
- [ ] Verify SHA256 hash of downloaded file
  - Read file in chunks and update hash incrementally
  - Use `crypto.subtle.digest()` or hash stream
- [ ] Move verified file to /nix/store with computed path
  - Compute store path using helpers/store.js
  - Use Deno.rename() for atomic move
- [ ] Return store path as Path object
- [ ] Handle these parameters:
  - `url` (required) - URL to download
  - `sha256` (required) - Expected hash (can be in any format: hex, base32, base64)
  - `name` (optional) - Name for store path (default: extract from URL basename)
  - `executable` (optional) - Make file executable (chmod +x via Deno.chmod)

**Implementation plan**:
```javascript
// helpers/fetch.js
export async function fetchFile(url, options = {}) {
    const {
        expectedHash,
        hashAlgo = 'sha256',
        name = urlToName(url),
        retries = 3,
        timeout = 300000  // 5 minutes
    } = options;

    // 1. Download to temp file with retry logic
    // 2. Compute hash of downloaded file
    // 3. Verify hash matches expectedHash
    // 4. Compute store path
    // 5. Move to store
    // 6. Return store path
}
```

**In runtime.js**:
```javascript
fetchurl: async (args) => {
    const url = requireString(args.url);
    const sha256 = requireString(args.sha256);
    const name = args.name ? requireString(args.name) : undefined;

    const storePath = await fetchFile(url, {
        expectedHash: sha256,
        hashAlgo: 'sha256',
        name
    });

    return new Path(storePath);
}
```

**Testing**:
- [ ] Create `main/tests/fetchurl_test.js`
- [ ] Test downloading small file from test server
- [ ] Test hash verification (correct hash passes, wrong hash fails)
- [ ] Test retry logic (mock network failures)
- [ ] Test redirect following
- [ ] Test timeout handling

### 1.3 fetchTarball Implementation

Download tarball and extract to /nix/store.

**Nix signature**:
```nix
fetchTarball {
  url = "https://example.com/archive.tar.gz";
  sha256 = "abc123...";  # Hash of extracted content, not tarball
  name = "source";
}
```

**Research needed**:
- [ ] Find tar extraction library for Deno
  - Check: https://esm.sh/@std/tar (if exists)
  - Check: https://deno.land/x/compress for tar.gz support
  - Check: https://esm.sh/tar-stream or https://esm.sh/tar-fs
  - Fallback: shell out to `tar` command via Deno.Command
- [ ] Understand NAR (Nix Archive) hashing algorithm
  - Directory hashes must be computed in deterministic order
  - Format: hash(sort(files).map(f => hash(name + type + content)))
  - See: https://nixos.org/manual/nix/stable/protocols/store-path.html#store-path-hash

**Tasks**:
- [ ] Find and test tar extraction library (check esm.sh for tar.js or similar)
  - Preferred: pure JS library from esm.sh
  - Fallback: Use `tar` CLI via `Deno.Command` (most reliable)
- [ ] Implement tarball download (reuse fetchFile logic from fetchurl)
- [ ] Extract to temporary directory
  - Use Deno.makeTempDir() for extraction directory
  - Ensure cleanup even if extraction fails (try/finally)
- [ ] Compute hash of extracted directory tree (not tarball itself!)
  - **CRITICAL**: Hash must match Nix's NAR algorithm
  - Sort entries by path name (deterministic order)
  - Hash format: recursive hash of (path, type, content) tuples
  - May need to implement NAR serialization format
- [ ] Verify hash matches expected
  - Compare computed hash with provided sha256
  - Throw clear error on mismatch with both hashes shown
- [ ] Move extracted content to /nix/store
  - Compute store path from hash + name
  - Use atomic directory move (Deno.rename)
- [ ] Handle these formats:
  - .tar.gz (gzip compression) - priority
  - .tar.bz2 (bzip2 compression)
  - .tar.xz (xz compression)
  - .tar (uncompressed)
  - .zip (bonus, different archive format)
  - Auto-detect format from file extension or magic bytes

**Implementation plan**:
```javascript
// helpers/tarball.js
import { extract } from 'tar-library-url'  // Find on esm.sh

export async function fetchTarball(url, options = {}) {
    const { expectedHash, name = 'source' } = options;

    // 1. Download tarball to temp file
    // 2. Create temp extraction directory
    // 3. Extract tarball
    // 4. Compute hash of extracted tree (recursive)
    // 5. Verify hash
    // 6. Compute store path
    // 7. Move extracted content to store
    // 8. Clean up temp files
    // 9. Return store path
}

function computeDirectoryHash(dir) {
    // Recursively hash all files in directory
    // Order must be deterministic (sorted by path)
    // Hash format matches Nix's NAR hashing
}
```

**In runtime.js**:
```javascript
fetchTarball: async (args) => {
    const url = requireString(args.url);
    const sha256 = requireString(args.sha256);
    const name = args.name ? requireString(args.name) : 'source';

    const storePath = await fetchTarball(url, {
        expectedHash: sha256,
        name
    });

    return new Path(storePath);
}
```

**Testing**:
- [ ] Create `main/tests/fetchtarball_test.js`
- [ ] Test .tar.gz extraction
- [ ] Test directory hash computation
- [ ] Test hash verification
- [ ] Test cleanup of temp files

### 1.4 Other Fetch Functions (Future)

After fetchurl and fetchTarball work, assess these:

- **fetchGit** - Clone git repo (use git CLI via Deno.Command)
- **fetchMercurial** - Clone hg repo (use hg CLI)
- **fetchTree** - Generic fetcher (delegates to others)
- **fetchClosure** - Binary cache downloads (complex, multi-week)

## 2. Examples Directory

**IMMEDIATE TASK**: Create examples showing nix → js translation

### Structure Needed

```
examples/
├── README.md (how to use examples)
├── 01_basics/
│   ├── literals.nix (integers, floats, strings, bools, null)
│   ├── literals.js (translated version with comments)
│   ├── operators.nix (arithmetic, comparison, logical)
│   ├── operators.js (showing BigInt handling)
│   └── functions.nix (simple function definitions)
├── 02_intermediate/
│   ├── let_expressions.nix (variable bindings)
│   ├── let_expressions.js (scope management)
│   ├── rec_attrsets.nix (recursive attribute sets)
│   ├── rec_attrsets.js (showing getter-based lazy eval)
│   └── string_interpolation.nix (${} syntax)
├── 03_nixpkgs_patterns/
│   ├── pipe.nix (from lib.trivial - function composition)
│   ├── pipe.js (curried functions)
│   ├── list_operations.nix (map, filter, fold)
│   └── attrset_operations.nix (mapAttrs, filterAttrs)
├── 04_advanced/
│   ├── fixed_point.nix (lib.fix usage)
│   ├── fixed_point.js (showing Y combinator)
│   ├── overlays.nix (extends pattern)
│   └── imports.nix (builtins.import usage)
└── verify_examples.js (automated verification script)
```

### Tasks

- [ ] Create examples/ directory structure
- [ ] Create examples/README.md with:
  - Project overview (what is this translator?)
  - How to run translator: `deno run --allow-read main.js <file.nix>`
  - How to verify examples: `deno run --allow-read examples/verify_examples.js`
  - Explanation of key translation patterns:
    - Nix int → JavaScript BigInt (42 → 42n)
    - Nix float → JavaScript number (1.5 → 1.5)
    - Variable access → nixScope["varName"]
    - Recursive sets → Object getters for lazy evaluation
    - Function closures → Object.create() for scope inheritance
  - Common gotchas and limitations
- [ ] Extract 10-15 example pairs from existing tests:
  - literals.nix: from translator_test.js basic tests
  - operators.nix: from translator_test.js operator tests
  - let_expressions.nix: from translator_test.js let tests
  - rec_attrsets.nix: from translator_test.js rec tests
  - string_interpolation.nix: from string_interpolation_test.js
  - pipe.nix: from nixpkgs_trivial_test.js
  - list_operations.nix: from nixpkgs_simple_test.js
  - imports.nix: from import_e2e_test.js
- [ ] Add detailed comments explaining tricky translations:
  - Why BigInt vs number
  - How scope stacking works
  - How lazy evaluation is achieved
  - How string interpolation becomes InterpolatedString class
- [ ] Create verify_examples.js script:
  - Iterate through all .nix files
  - Run translator on each
  - Compare output to corresponding .js file
  - Report any mismatches or errors
  - Exit with code 0 if all match, 1 otherwise
- [ ] Add examples section to main README.md:
  - Link to examples/ directory
  - Show one simple example inline (e.g., let expression)
  - Encourage users to explore examples/ for more

## 3. nixpkgs.lib Testing

**Current**: 15/34 lib files tested (44%)

### Files Successfully Tested ✅
- ascii-table.nix
- strings.nix (with imports)
- minfeatures.nix
- source-types.nix
- versions.nix
- kernel.nix
- flakes.nix
- flake-version-info.nix
- systems/flake-systems.nix
- systems/supported.nix
- fetchers.nix
- systems/parse.nix (inferred from tests)
- systems/inspect.nix (inferred from tests)
- systems/default.nix (inferred from tests)
- systems/doubles.nix (inferred from tests)

### Remaining Files to Test (19 files)

**Easy wins** (can test standalone, priority order):
1. [ ] **debug.nix** - debugging utilities (lib.traceIf, lib.traceVal, etc.)
   - Likely just wraps builtins.trace
   - Test: validate traceIf conditional, traceVal returns value
2. [ ] **generators.nix** - JSON/YAML/INI generators
   - Uses builtins.toJSON heavily
   - Test: toPretty, toYAML, toINI, toKeyValue output formats
3. [ ] **licenses.nix** - license metadata (SPDX IDs, descriptions)
   - Large attribute set of license definitions
   - Test: spot-check mit, gpl3, bsd3 licenses have correct fields
4. [ ] **options.nix** - NixOS option type definitions
   - May be complex, depends on types.nix
   - Test: mkOption, mkEnableOption, mkPackageOption
5. [ ] **cli.nix** - CLI argument parsing utilities
   - Test: toGNUCommandLine, toGNUCommandLineShell
6. [ ] **derivations.nix** - derivation helper functions
   - May use builtins.derivation heavily
   - Test: lazyDerivation wrapper

**Need lib context** (circular dependencies with lib.trivial/lib.lists/etc):
- [ ] **fixed-points.nix** - lib.fix, lib.extends, lib.composeManyExtensions
  - Needs lib.trivial.id, lib.trivial.const
  - Complex: Y combinator for recursion
  - Test: fix f, extends f g
- [ ] **trivial.nix** - core utilities (20 functions already tested standalone!)
  - Already validated: id, const, pipe, flip, and, or, etc.
  - Need to test in full lib context with imports
  - Test: import trivial.nix and validate all 20+ functions
- [ ] **lists.nix** - list operations (fold, filter, map, etc.)
  - Heavy lib.trivial usage (pipe, id, etc.)
  - Test: head, tail, map, filter, foldl, foldr, length, concat
- [ ] **attrsets.nix** - attrset operations (mapAttrs, filterAttrs, etc.)
  - Needs lib.trivial and lib.lists
  - Test: mapAttrs, filterAttrs, catAttrs, genAttrs, getAttrs
- [ ] **asserts.nix** - assertion helpers
  - Uses lib.trivial functions
  - Test: assertMsg, assertOneOf
- [ ] **path/** - path manipulation utilities (5+ files)
  - path/append.nix, path/has-prefix.nix, etc.
  - Test: path operations, validation

**Blocked by infrastructure**:
- [ ] **sources.nix** - source fetching wrappers
  - Needs fetch* builtins (fetchurl, fetchTarball, fetchGit)
  - Wrapper functions around builtins
  - Can test once Priority 4 (fetchers) is complete
- [ ] **customisation.nix** - package customization (override, overrideDerivation)
  - Needs full derivation system
  - Complex: deals with __functor and package metadata
  - Test: makeOverridable, callPackageWith

**Very complex** (multi-week projects):
- [ ] **modules.nix** - NixOS module system
  - Massive: 1000+ lines, eval system, option merging
  - Needs types.nix, asserts.nix, lists.nix, attrsets.nix
  - Test: evalModules, mkIf, mkMerge, mkOverride
- [ ] **types.nix** - NixOS type system
  - Large: 500+ lines, type checking, coercion
  - Fundamental to module system
  - Test: types.str, types.int, types.bool, types.listOf, types.attrsOf

## 4. Performance & Optimization

### Tasks Remaining

- [ ] Profile translator performance on large files
  - Test file: full nixpkgs.lib/attrsets.nix (~1500 lines)
  - Measure: parse time, translation time, evaluation time
  - Tools: `console.time()`, Deno's `--allow-hrtime` flag
  - Identify bottlenecks in AST traversal
- [ ] Optimize recursive scope traversal
  - Current: prototype chain lookup (Object.create)
  - Issue: Deep prototype chains slow down property access
  - Solution options:
    1. Flatten scope periodically (copy to new object)
    2. Cache common lookups (e.g., builtins)
    3. Use Map instead of object for scope
  - Benchmark: measure lookup time for 100-level deep scopes
- [ ] Cache parsed ASTs to avoid re-parsing imported files
  - Current: import_cache.js caches evaluation results
  - Issue: Still re-parses same file if imported from different contexts
  - Solution: Add AST cache in import_loader.js
  - Key: absolute file path → parsed tree-sitter AST
  - Benefit: Significant speedup for files with many imports
- [ ] Add lazy evaluation optimizations for large attribute sets
  - Current: All getters created upfront for rec sets
  - Issue: Creating 1000+ getters for large sets is slow
  - Solution: Proxy-based lazy getter creation
  - Use: `new Proxy(target, { get(target, key) { ... } })`
  - Benefit: Only create getters as accessed
- [ ] Benchmark against native Nix evaluation
  - Test cases: 10 files from nixpkgs.lib
  - Measure: evaluation time for each
  - Compare: `nix-instantiate --eval` vs `deno run main.js`
  - Expected: JS will be slower (no optimizations yet)
  - Document: acceptable performance targets (e.g., within 10x of native)
- [ ] Document performance characteristics and limitations
  - Write PERFORMANCE.md with:
    - Known bottlenecks (scope traversal, large rec sets)
    - Optimization strategies (caching, lazy eval)
    - Benchmark results vs native Nix
    - Recommendations for users (avoid deep nesting, use non-rec when possible)

## 5. Documentation

### Tasks Remaining

- [ ] Document all translator limitations (what Nix features aren't supported)
  - Create LIMITATIONS.md with:
    - Unsupported Nix features (if any)
    - Semantic differences from Nix (if any)
    - Known edge cases
    - Workarounds for common issues
  - Review translator code for TODOs/FIXMEs
  - Test edge cases that might not work
- [ ] Create ARCHITECTURE.md explaining system design
  - System overview diagram (Nix → Parser → Translator → JS → Runtime)
  - Components:
    - tree-sitter parser (external, via main.js)
    - Translator (main.js): AST → JS code generator
    - Runtime (main/runtime.js): builtins, operators, classes
    - Import system: resolver → cache → loader → import
  - Data flow: how Nix code becomes runnable JS
  - Key design decisions:
    - Why BigInt for integers
    - Why InterpolatedString class
    - Why Object.create for scopes
    - Why getters for recursive sets
  - Extension points: how to add new builtins
- [ ] Add inline comments for complex translation logic
  - Target locations in main.js:
    - select_expression handler (attrpath traversal)
    - recursive_attrset_expression (getter creation)
    - function_expression (closure capture)
    - interpolation (InterpolatedString)
    - operator precedence handling
  - Each comment should explain WHY, not WHAT
  - Example: "Using Object.create to preserve parent getters (spread would lose them)"
- [ ] Document scope management strategy (Object.create vs spread)
  - Create SCOPES.md with:
    - Problem: Need to access parent scope in nested contexts
    - Solution 1: Spread operator `{...parent}` - doesn't preserve getters
    - Solution 2: Object.create(parent) - preserves getters via prototype
    - Why it matters: recursive sets use getters for lazy eval
    - Code examples showing both approaches
    - When to use each (hint: almost always Object.create)
- [ ] Create troubleshooting guide for common translation errors
  - TROUBLESHOOTING.md with common errors:
    - "Cannot read property of undefined" → scope issue
    - "Maximum call stack exceeded" → infinite recursion in rec set
    - "TypeError: X is not a function" → wrong arity, check currying
    - "has no method toString" → not an InterpolatedString
  - For each error:
    - What it means
    - Common causes
    - How to fix
    - Example Nix code that triggers it
- [ ] Add performance tuning guide
  - Covered in PERFORMANCE.md (see section 4)
  - Link from main README.md

## 6. Maintenance & Infrastructure

### Tasks Remaining

- [ ] Update README.md to reflect current state
  - Current README shows outdated counts (59 builtins vs 61, 67 tests vs 87)
  - Remove reference to non-existent STATUS.md
  - Update test counts to current numbers
  - Add mention of import system implementation
- [ ] Fix broken badge links in README.md
  - STATUS.md badge link is broken (file doesn't exist)
  - Consider creating STATUS.md or removing badge
- [ ] Add CI/CD pipeline (optional but recommended)
  - Create .github/workflows/test.yml
  - Run: `deno test --allow-all main/tests/`
  - Run on: push, pull_request
  - Badge: show test status in README
- [ ] Clean up old session documentation files
  - Several SESSION_*.md files in root directory
  - Move to docs/ subdirectory or archive
  - Keep MEMORY.md reference current
- [ ] Create contributor guide (CONTRIBUTING.md)
  - How to add a new builtin
  - How to add a translator feature
  - How to write tests
  - Code style guidelines

## Summary of Work Remaining

**Priority 0 - Quick Wins** (30 minutes):
1. **CRITICAL**: Update README.md with current accurate numbers
   - Line 14: Change "59 fully functional" → "61 fully functional"
   - Line 15: Change "120+ runtime tests" → "170+ runtime tests"
   - Line 16: Change "67 translator tests" → "87 translator tests"
   - Line 20: Add "✅ **Import system fully working** - builtins.import and builtins.scopedImport"
   - Line 74: Remove "Import/eval (2): import, scopedImport (requires Nix parser)" - THESE ARE IMPLEMENTED!
   - Line 127-148: Update test tables with current counts (73 test suites passing in deno test output)
2. Fix or remove broken STATUS.md badge link (line 5)
   - STATUS.md file does not exist
   - Either create it or remove the badge reference
   - Multiple references to STATUS.md throughout README need fixing

**Priority 1 - Examples & Documentation** (2-3 days):
1. Create examples/ directory structure
2. Extract 10-15 example pairs from existing tests
3. Write examples/README.md explaining translation patterns
4. Create verify_examples.js automated verification script
5. Update main README.md with examples section

**Priority 2 - More nixpkgs.lib Testing** (4-6 days):
1. Test debug.nix (debugging utilities - simple)
2. Test generators.nix (JSON/YAML generation - medium)
3. Test licenses.nix (license metadata - simple, large dataset)
4. Test cli.nix (CLI utilities - medium)
5. Test options.nix (option definitions - may be complex)
6. Attempt derivations.nix (derivation helpers - may need more derivation support)

**Priority 3 - Store Path System** (1-2 weeks):
1. Research NAR hashing algorithm and fixed-output store paths
2. Study existing tools/store_path.js for reusable code
3. Implement helpers/store.js with path computation
4. Add file integrity verification (hash checking)
5. Implement fallback store directory (~/.cache/denix/store)
6. Create test suite for store operations
7. Document store path implementation

**Priority 4 - Network Fetchers** (3-5 weeks):
1. **fetchurl implementation** (1-2 weeks)
   - Implement helpers/fetch.js with retry logic
   - Integrate with helpers/store.js
   - Add comprehensive tests (success, failure, retry, hash mismatch)
   - Document usage and limitations
2. **fetchTarball implementation** (2-3 weeks)
   - Research and select tar extraction library
   - Implement NAR-compatible directory hashing
   - Implement helpers/tarball.js
   - Test with various compression formats
   - Document hash computation algorithm
3. **Integration testing**
   - Test sources.nix from nixpkgs.lib
   - Create realistic examples (fetch nixpkgs tarball)
   - Document real-world usage

**Priority 5 - Advanced Features** (deferred, multi-month):
- fetchGit implementation (needs git CLI integration + smart caching)
- fetchClosure (binary cache protocol, very complex)
- Full lib context testing (trivial.nix, lists.nix, attrsets.nix with imports)
- Module system testing (modules.nix, types.nix - very complex)
- Performance profiling and optimization
- ARCHITECTURE.md and comprehensive documentation

## Suggested First Steps (Right Now)

1. **Update README.md** (15 minutes)
   - Fix test counts: 87 translator tests, 170+ runtime tests
   - Fix builtin count: 61/98 implemented
   - Mention import system is fully working
   - Remove STATUS.md badge or create the file

2. **Create examples/ directory** (2-3 days)
   - This is highly visible and immediately useful
   - Helps users understand how to use the translator
   - Extracts value from existing tests
   - Low risk, high reward

3. **Test 2-3 more nixpkgs.lib files** (1-2 days)
   - Build momentum on testing
   - Start with easy ones: debug.nix, licenses.nix
   - Validates translator robustness

4. **Research store path system** (2-3 days)
   - Read Nix manual on store paths
   - Study tools/store_path.js for reusable code
   - Understand NAR format
   - Write design document for helpers/store.js
   - This unblocks Priority 4 (fetchers)
