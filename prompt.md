# Task: Implement a translator from Nix to JavaScript

Your job is to focus on what is NOT implemented and NOT working. Only report what remains to be done. Do not report what you accomplished. You are a senior level developer, there is no such thing as a blocker. Break down large tasks into smaller tasks.

## Current Tasks Overview

1. **Testing** - Continue testing nixpkgs.lib files (1 week) - NEXT PRIORITY
2. **Store System** - Implement store path infrastructure (1-2 weeks)
3. **Builtins** - Implement network fetchers (fetchurl, fetchTarball) in `main/runtime.js` (3-5 weeks)

---

## 1. nixpkgs.lib Testing (Priority 1 - NEXT PRIORITY)

**Time**: 1 week

**Remaining**: 19/34 lib files need testing

### Files Already Tested (15 files)
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
- systems/parse.nix
- systems/inspect.nix
- systems/default.nix
- systems/doubles.nix

### Files Needing Tests (19 files)

**Easy wins** (can test standalone, priority order):

1. [ ] **debug.nix** - debugging utilities (lib.traceIf, lib.traceVal, etc.)
   - Location: `nixpkgs-lib/lib/debug.nix`
   - Likely just wraps builtins.trace
   - Test approach:
     - Import debug.nix
     - Call traceIf with true condition (should trace)
     - Call traceIf with false condition (should not trace)
     - Call traceVal with a value (should return that value)
     - Validate traceSeq, traceValSeqN work correctly
   - Expected functions: traceIf, traceVal, traceSeq, traceValSeq, traceValSeqN, traceShowVal, etc.

2. [ ] **generators.nix** - JSON/YAML/INI generators
   - Location: `nixpkgs-lib/lib/generators.nix`
   - Uses builtins.toJSON heavily, may need string manipulation
   - Test approach:
     - Import generators.nix
     - Test toPretty: converts attrset to pretty-printed format
     - Test toYAML: converts attrset to YAML string
     - Test toINI: converts attrset to INI format
     - Test toKeyValue: converts attrset to KEY=VALUE pairs
   - Expected functions: toPretty, toYAML, toINI, toKeyValue, toDhall, etc.
   - **Likely blocker**: May use lib.strings functions heavily

3. [ ] **licenses.nix** - license metadata (SPDX IDs, descriptions)
   - Location: `nixpkgs-lib/lib/licenses.nix`
   - Large attribute set of ~200 license definitions
   - Test approach:
     - Import licenses.nix
     - Spot-check 5-10 common licenses (mit, gpl3, bsd3, apache20, mpl20)
     - Validate each has: spdxId, fullName, url, free (boolean)
     - Validate deprecated field exists for deprecated licenses
   - Expected structure: `{ mit = { spdxId = "MIT"; fullName = "MIT License"; url = "..."; free = true; }; ... }`
   - **Very simple**: Just a giant attrset, should work immediately

4. [ ] **cli.nix** - CLI argument parsing utilities
   - Location: `nixpkgs-lib/lib/cli.nix`
   - Converts attrsets to command-line arguments
   - Test approach:
     - Import cli.nix
     - Test toGNUCommandLine: {verbose=true; file="x.txt";} → ["--verbose" "--file" "x.txt"]
     - Test toGNUCommandLineShell: same but shell-escaped
     - Validate flag formatting (--flag vs -f)
     - Validate boolean flags (true → include, false → omit)
   - Expected functions: toGNUCommandLine, toGNUCommandLineShell
   - **May need**: lib.strings, lib.lists functions

5. [ ] **options.nix** - NixOS option type definitions
   - Location: `nixpkgs-lib/lib/options.nix`
   - Creates option definitions for NixOS modules
   - **WARNING**: May be complex, likely depends on types.nix
   - Test approach:
     - Import options.nix (may fail if needs types.nix)
     - Test mkOption: creates option with type, default, description
     - Test mkEnableOption: creates boolean option with description
     - Test mkPackageOption: creates package option with default
   - Expected functions: mkOption, mkEnableOption, mkPackageOption, mkPackageOptionMD, etc.
   - **Likely blocker**: Circular dependency with types.nix, may need to skip

6. [ ] **derivations.nix** - derivation helper functions
   - Location: `nixpkgs-lib/lib/derivations.nix`
   - Wraps builtins.derivation with helper functions
   - Test approach:
     - Import derivations.nix
     - Test lazyDerivation: wraps derivation with lazy evaluation
     - Validate it returns attrset with name, type, etc.
   - Expected functions: lazyDerivation, optionalDrvAttr, etc.
   - **Should work**: builtins.derivation is fully implemented

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
  - Can test once Priority 3 (fetchers) is complete

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

---

## 2. Store Path System (Priority 2)

**Time**: 1-2 weeks

Before implementing fetchers, need /nix/store path computation and management.

### 2.1 Research Needed

- [ ] Study Nix's NAR (Nix Archive) format for directory hashing
  - Read: https://nixos.org/manual/nix/stable/protocols/nix-archive
  - NAR is a deterministic archive format for directories
  - Entries must be sorted by path name
  - Format: recursive structure of (path, type, content) tuples
  - Hash = SHA256(NAR serialization of directory tree)

- [ ] Understand fixed-output derivation store path formula
  - Read: https://nixos.org/manual/nix/stable/protocols/store-path.html#store-path-hash
  - Regular derivation: hash of ATerm representation (already implemented!)
  - Fixed-output derivation: hash of content + hash algo + hash value
  - Fingerprint format: `fixed:out:<hashAlgo>:<hash>:<storeDir>:<name>`
  - Example: `fixed:out:sha256:abc123...:/nix/store:source`
  - Store path = `/nix/store/<hash>-<name>` where hash = base32(sha256(fingerprint))

- [ ] Review existing tools/store_path.js for derivation paths (may be reusable)
  - Already implements: base32 encoding, hash truncation, ATerm serialization
  - **Reusable**: nixBase32Encode(), sha256Hex(), makeStorePathHash()
  - **Need to add**: Fixed-output derivation path computation
  - **Current code** handles derivation outputs (which use "output" method)
  - **Need**: Content-addressed path computation (which uses "fixed" method)

### 2.2 Implementation Tasks

- [ ] Create `helpers/store.js` module

- [ ] Implement store path computation for fixed-output derivations
  - Formula: `/nix/store/<hash>-<name>` where hash = base32(truncate(sha256(fingerprint)))
  - Fingerprint format for fixed-output: `fixed:out:<hashAlgo>:<hash>:/nix/store:<name>`
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

---

## 3. Network Fetchers Implementation (Priority 3)

**Time**: 3-5 weeks

### 3.1 fetchurl Implementation (1-2 weeks)

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

**Testing**:
- [ ] Create `main/tests/fetchurl_test.js`
- [ ] Test downloading small file from test server
- [ ] Test hash verification (correct hash passes, wrong hash fails)
- [ ] Test retry logic (mock network failures)
- [ ] Test redirect following
- [ ] Test timeout handling

### 3.2 fetchTarball Implementation (2-3 weeks)

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
  - **Option 1**: Deno's standard library `@std/archive` (check if exists)
  - **Option 2**: `deno.land/x/compress` - gzip/deflate support
  - **Option 3**: ESM.sh npm packages (tar-stream, tar-fs, tar)
  - **Option 4 (RECOMMENDED)**: Shell out to `tar` command via Deno.Command
    - Most reliable, handles all formats (.tar.gz, .tar.bz2, .tar.xz)
    - Requires tar binary on system (universally available on Unix)
    - Command: `tar -xaf archive.tar.gz -C /extract/dir` (auto-detect compression)

- [ ] Understand NAR (Nix Archive) hashing algorithm
  - **CRITICAL**: This is complex and must match Nix exactly
  - NAR format is a canonical serialization of file trees
  - Directory hashes must be computed in deterministic order (sorted paths)
  - Format specification: https://nixos.org/manual/nix/stable/protocols/nix-archive
  - **Complexity**: Need to implement NAR serializer or find existing library
  - **Alternative**: Use Nix CLI to compute NAR hash: `nix hash path /path/to/dir`
    - This is a valid approach for now - shell out to `nix` command
    - Later can implement pure JS NAR serializer

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

**Testing**:
- [ ] Create `main/tests/fetchtarball_test.js`
- [ ] Test .tar.gz extraction
- [ ] Test directory hash computation
- [ ] Test hash verification
- [ ] Test cleanup of temp files

### 3.3 NAR Hashing: Alternative Approaches

**If pure JS NAR implementation is too complex** (likely!), use one of these approaches:

**Approach A: Shell out to Nix CLI** (RECOMMENDED for MVP)
```javascript
// Compute NAR hash using Nix CLI
async function computeNarHash(dirPath) {
    const cmd = new Deno.Command('nix', {
        args: ['hash', 'path', '--type', 'sha256', '--base32', dirPath],
        stdout: 'piped'
    });
    const { stdout } = await cmd.output();
    return new TextDecoder().decode(stdout).trim();
}
```
- **Pros**: 100% accurate, matches Nix exactly
- **Cons**: Requires Nix installed on system
- **Acceptable tradeoff**: This is a Nix runtime, users likely have Nix installed

**Approach B: Implement full NAR serializer** (HARD, multi-week project)
- Study Nix source code: `src/libutil/archive.cc`
- Implement exact NAR format serialization
- Test against hundreds of real-world cases
- **Verdict**: Only do this if building production-grade fetchTarball

**RECOMMENDATION**: Start with Approach A (shell out to Nix CLI) for MVP.

### 3.4 Other Fetch Functions (Future)

After fetchurl and fetchTarball work, assess these:

- **fetchGit** - Clone git repo (use git CLI via Deno.Command)
- **fetchMercurial** - Clone hg repo (use hg CLI)
- **fetchTree** - Generic fetcher (delegates to others)
- **fetchClosure** - Binary cache downloads (complex, multi-week)

---

## 4. Performance & Optimization (Priority 4 - Deferred)

**Time**: Weeks to months

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

---

## 5. Documentation (Priority 5 - Deferred)

**Time**: 1-2 weeks

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

---

## Common Pitfalls to Avoid

When implementing the above tasks, watch out for these common mistakes:

### 1. BigInt vs Number Confusion
- **WRONG**: `42 + 2` → `44` (JavaScript number)
- **RIGHT**: `42n + 2n` → `44n` (JavaScript BigInt)
- **Impact**: Integer division breaks (`1/2` should be `0`, not `0.5`)
- **Fix**: Always use `n` suffix for Nix integers in examples

### 2. Scope Spread Loses Getters
- **WRONG**: `const nixScope = {...parentScope}` (loses recursive set getters!)
- **RIGHT**: `const nixScope = Object.create(parentScope)` (preserves getters via prototype)
- **Impact**: Recursive attribute sets break (infinite loops or undefined values)
- **Fix**: Always use Object.create() for scope inheritance in examples

### 3. Test Counts Get Stale Fast
- **WRONG**: Hardcode test counts in README (will be outdated within days)
- **RIGHT**: Use dynamic counts or ranges ("170+ tests" instead of "173 tests")
- **Impact**: README shows wrong information, looks unmaintained
- **Fix**: Update all test counts in README.md when adding new tests

### 4. Store Path Compatibility
- **WRONG**: Use simple hash of file contents for store paths
- **RIGHT**: Use Nix's exact store path algorithm (base32, fingerprint, truncation)
- **Impact**: Store paths won't match Nix's paths, breaks interoperability
- **Fix**: Study tools/store_path.js, use existing base32Encode and hash functions

### 5. NAR Hashing Complexity
- **WRONG**: Assume directory hashing is simple (just hash all files)
- **RIGHT**: NAR format has specific serialization rules (entry ordering, metadata)
- **Impact**: fetchTarball hashes won't match Nix's hashes
- **Fix**: Either implement full NAR serializer OR shell out to `nix hash path` command

### 6. Error Messages Matter
- **WRONG**: `throw new Error("Hash mismatch")`
- **RIGHT**: `throw new Error("Hash mismatch for ${url}\n  Expected: ${expected}\n  Got: ${actual}")`
- **Impact**: Users can't debug issues without detailed error messages
- **Fix**: Always include context in errors (what file, what expected, what got)

### 7. Test Isolation
- **WRONG**: Tests that depend on previous tests' side effects
- **RIGHT**: Each test is independent and can run in any order
- **Impact**: Flaky tests, hard to debug failures
- **Fix**: Use fresh Deno.makeTempDir() for each test, clean up in finally block

### 8. Documentation Drift
- **WRONG**: Write code, forget to update docs
- **RIGHT**: Update docs (README, prompt.md, MEMORY.md) as part of each task
- **Impact**: Docs show old features, confuse users and future developers
- **Fix**: Include doc updates in each task's definition

### 9. Premature Optimization
- **WRONG**: Spend weeks optimizing NAR serializer before basic fetchTarball works
- **RIGHT**: Get basic functionality working (even if slow), then optimize
- **Impact**: Wasted time on optimization before validating the approach
- **Fix**: MVP first (shell out to Nix CLI), optimize later (pure JS implementation)

---

## Summary of Work Remaining

**Priority 1 - More nixpkgs.lib Testing** (4-6 days):
1. Test debug.nix (debugging utilities - simple)
2. Test generators.nix (JSON/YAML generation - medium)
3. Test licenses.nix (license metadata - simple, large dataset)
4. Test cli.nix (CLI utilities - medium)
5. Test options.nix (option definitions - may be complex)
6. Attempt derivations.nix (derivation helpers - may need more derivation support)

**Priority 2 - Store Path System** (1-2 weeks):
1. Research NAR hashing algorithm and fixed-output store paths
2. Study existing tools/store_path.js for reusable code
3. Implement helpers/store.js with path computation
4. Add file integrity verification (hash checking)
5. Implement fallback store directory (~/.cache/denix/store)
6. Create test suite for store operations
7. Document store path implementation

**Priority 3 - Network Fetchers** (3-5 weeks):
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

**Priority 4 - Advanced Features** (deferred, multi-month):
- fetchGit implementation (needs git CLI integration + smart caching)
- fetchClosure (binary cache protocol, very complex)
- Full lib context testing (trivial.nix, lists.nix, attrsets.nix with imports)
- Module system testing (modules.nix, types.nix - very complex)
- Performance profiling and optimization
- ARCHITECTURE.md and comprehensive documentation

---

## Suggested First Steps (Right Now)

1. **Test 2-3 more nixpkgs.lib files** (1-2 days) - HIGHEST PRIORITY
   - Build momentum on testing
   - Start with easy ones: debug.nix, licenses.nix, cli.nix
   - Validates translator robustness
   - Increases test coverage

2. **Research store path system** (2-3 days)
   - Read Nix manual on store paths
   - Study tools/store_path.js for reusable code
   - Understand NAR format
   - Write design document for helpers/store.js
   - This unblocks Priority 3 (fetchers)
