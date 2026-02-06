# Task: Implement a translator from Nix to JavaScript

Your job is to focus on what is NOT implemented and NOT working. Only report what remains to be done. Do not report what you accomplished. You are a senior level developer, there is no such thing as a blocker. Break down large tasks into smaller tasks.

## Current Status (2026-02-06)

**System State**:
- ✅ Translator: 87/87 tests passing - PRODUCTION READY
- ✅ Runtime: 61/98 Nix 2.18 builtins implemented, 170+ tests passing
- ✅ Import system: Fully functional (builtins.import + builtins.scopedImport)
- ❌ **9 builtins NOT implemented**: fetchurl, fetchTarball, fetchGit, fetchMercurial, fetchTree, fetchClosure, path, getFlake, filterSource

**Test Status**: All 73 tests passing

**Current Priority**: Implement fetch* builtins (network downloaders) starting with fetchTarball

---

## Priority 1: Implement fetchTarball (HIGHEST PRIORITY)

**Goal**: Get `builtins.fetchTarball` working in ANY form (MVP approach)
**Time Estimate**: 3-5 days for basic working version
**Status**: Currently throws NotImplemented error

### Task Breakdown

#### 1.1 Research & Design (1-2 hours)

**Sub-tasks**:

- [ ] Read Nix manual for fetchTarball specification
  - URL: https://nixos.org/manual/nix/stable/language/builtins.html#builtins-fetchTarball
  - Parameters: url (string), sha256 (optional string), name (optional string)
  - Return value: Path to extracted directory in /nix/store

- [ ] Understand NAR hashing for directories
  - fetchTarball hashes the EXTRACTED directory, not the tarball file
  - Hash must match Nix's NAR format (Nix Archive)
  - Options:
    - **Option A (RECOMMENDED)**: Shell out to `nix hash path <dir>` (requires nix installed)
    - **Option B**: Implement NAR serialization (multi-week project, defer)

- [ ] Choose tarball extraction approach
  - **Option 1 (RECOMMENDED)**: Shell out to `tar` command (universal, reliable)
  - Option 2: Use Deno stdlib or third-party library (more complex, dependencies)

**Decision Matrix**:
```
For MVP (Phase 1):
- Extract: Use tar command (all Unix systems have it)
- Hash: Use nix hash command (assume Nix installed for now)
- Store: Use /nix/store if writable, else ~/.cache/denix/store

For Future (Phase 2):
- Add fallback extraction without tar dependency
- Add pure JS NAR hashing (no nix dependency)
```

#### 1.2 Implement Store Path Computation (2-3 hours)

**Sub-tasks**:

- [ ] Create `helpers/store.js` with store path utilities
  - `computeFixedOutputPath(hash, name)` - compute /nix/store/xxx-name path
  - `ensureStoreDirectory()` - create /nix/store or fallback to ~/.cache/denix/store
  - `atomicMove(srcPath, destPath)` - atomic file operations (temp + rename)

- [ ] Implement fixed-output derivation store path formula
  ```javascript
  // Fingerprint: "fixed:out:sha256:<hash>:/nix/store:<name>"
  // Store path: /nix/store/<base32(truncate(sha256(fingerprint)))>-<name>
  ```

- [ ] Reuse code from `tools/store_path.js`:
  - `nixBase32Encode()` - base32 encoding
  - `sha256Hex()` - SHA256 hashing
  - `makeStorePathHash()` - hash truncation

- [ ] Test store path computation matches Nix
  - Create test case with known hash + name
  - Compare output with `nix store make-content-addressed` result

#### 1.3 Implement Tarball Download (1-2 hours)

**Sub-tasks**:

- [ ] Create `helpers/fetch.js` with HTTP download utilities
  - `downloadFile(url, destPath)` - download to temp file with streaming
  - Add progress logging (optional, stderr)
  - Handle redirects (fetch with `redirect: "follow"`)
  - Add basic error handling (network errors, 404, etc.)

- [ ] Implement retry logic with exponential backoff
  - 3 retries: wait 1s, 2s, 4s between attempts
  - Only retry on network errors (not 404)
  - Log retry attempts to stderr

- [ ] Test download with real URLs
  - Test: Small tarball (< 1MB)
  - Test: Redirect following (e.g., GitHub release redirects)
  - Test: Error handling (invalid URL, 404)

#### 1.4 Implement Tarball Extraction (1-2 hours)

**Sub-tasks**:

- [ ] Implement extraction using `tar` command
  - Create temp directory for extraction
  - Run: `tar -xf <tarball> -C <temp-dir>`
  - Handle tar output format (strip-components if needed)
  - Handle different formats: .tar.gz, .tar.bz2, .tar.xz

- [ ] Add extraction validation
  - Verify extraction succeeded (exit code 0)
  - Verify directory is not empty
  - Handle edge cases (single file, nested dirs)

- [ ] Test extraction with sample tarballs
  - Test: .tar.gz extraction
  - Test: Single file vs directory structure
  - Test: Nested directory handling

#### 1.5 Implement Directory Hashing (2-3 hours)

**Sub-tasks**:

- [ ] Implement directory hashing using `nix hash` command
  - Run: `nix hash path <extracted-dir>`
  - Parse output: "sha256:..." or hex string
  - Handle different Nix versions (2.x vs 3.x output formats)

- [ ] Add hash verification
  - Compare computed hash with expected sha256 parameter
  - Throw error if mismatch (with both hashes in error message)
  - If no sha256 provided, use computed hash (impure mode)

- [ ] Test directory hashing
  - Create known directory structure
  - Verify hash matches Nix's computation
  - Test: Empty dir, single file, nested structure

#### 1.6 Integrate into builtins.fetchTarball (1-2 hours)

**Sub-tasks**:

- [ ] Update `main/runtime.js` builtins.fetchTarball implementation
  - Remove `throw new NotImplemented` line
  - Parse parameters: url (required), sha256 (optional), name (optional)
  - Call download → extract → hash → verify → move to store
  - Return Path object pointing to final store path

- [ ] Add parameter validation
  - Require url parameter
  - Optional sha256 (if provided, verify; if not, compute and warn)
  - Optional name (default: derive from URL, e.g., "source")

- [ ] Add error handling
  - Network errors: clear message with URL
  - Extraction errors: show tar output
  - Hash mismatch: show expected vs actual
  - Store errors: permission issues, disk space

#### 1.7 Create Tests (2-3 hours)

**Sub-tasks**:

- [ ] Create `main/tests/fetchtarball_test.js`
  - Test: Download small tarball from GitHub
  - Test: Verify extracted directory exists
  - Test: Hash verification (correct hash passes)
  - Test: Hash mismatch throws error
  - Test: Cleanup temp files

- [ ] Create integration tests with translator
  - Test: `builtins.fetchTarball { url = "..."; sha256 = "..."; }` works
  - Test: Nix code → JS → fetchTarball → Path result
  - Test: Re-running uses cache (doesn't re-download)

- [ ] Add manual testing documentation
  - Document how to test with real nixpkgs tarball
  - Document expected behavior and outputs
  - Add troubleshooting section

---

## Priority 2: Implement Other Fetch Builtins (Future)

After fetchTarball works, implement in order:

### 2.1 fetchurl (1-2 days)
- Simpler than fetchTarball (no extraction needed)
- Download file → verify hash → move to store
- Reuse helpers/fetch.js and helpers/store.js

### 2.2 fetchGit (1-2 weeks)
- Shell out to `git clone` command
- Handle refs, revs, shallow clones
- Directory hashing (same as fetchTarball)

### 2.3 fetchTree (1 week)
- Generic fetcher wrapping others
- Detect type from URL (git, tarball, file)

### 2.4 fetchMercurial, fetchClosure (Future)
- Low priority (rare usage)
- fetchClosure needs binary cache support

---

## Priority 3: Implement Other Missing Builtins (Future)

### 3.1 builtins.path (1-2 days)
- Copy path to store with computed hash
- Handle filters, recursive copies
- Directory hashing (same as fetchTarball)

### 3.2 builtins.filterSource (1-2 days)
- Filter files before copying to store
- Uses builtins.path internally

### 3.3 builtins.getFlake (Multi-week)
- Full flake evaluation system
- Requires lock files, input resolution
- Very complex, defer until much later

---

## Implementation Strategy

**Phase 1 (This Week)**: Get fetchTarball working with MVP approach
- Use tar command for extraction
- Use nix hash command for directory hashing
- Basic error handling
- Get 1-2 working test cases

**Phase 2 (Next Week)**: Improve robustness
- Add comprehensive tests
- Better error messages
- Handle edge cases
- Add caching to avoid re-downloads

**Phase 3 (Future)**: Remove external dependencies
- Implement pure JS tar extraction (optional)
- Implement pure JS NAR hashing (optional)
- Add binary cache support (very complex)

---

## Common Pitfalls to Avoid

1. **Don't hash the tarball** - fetchTarball hashes the EXTRACTED directory, not the .tar.gz file
2. **Store path must match Nix exactly** - Use the exact formula: `fixed:out:sha256:<hash>:/nix/store:<name>`
3. **Handle extraction with strip-components** - Many tarballs have top-level directory
4. **Atomic operations** - Download to temp, verify, then move to final location
5. **Clean up on failure** - Remove temp files even when errors occur
6. **Security**: Verify hashes before using downloaded content
7. **Permissions**: Handle /nix/store write failures gracefully (fallback to user cache)
8. **Path objects**: Return Path class instances, not plain strings

---

## Next Immediate Action

**Start with Section 1.1 (Research & Design)**: Read Nix manual, make design decisions, document choices in this file.

Then proceed sequentially through sections 1.2 → 1.3 → 1.4 → 1.5 → 1.6 → 1.7.

**Expected timeline**: 3-5 days for fully working fetchTarball with tests.
