# Task: Implement Remaining Nix Runtime Features

Your job is to focus on what is NOT implemented and NOT working. Only report what remains to be done. Do not report what you accomplished. You are a senior level developer, there is no such thing as a blocker. Break down large tasks into smaller tasks.
Before executing what is below, please filter out any achievements. Only keep remaining/unsolved tasks in this document. Add detail to each task if its needed.

INSTRUCTIONS:
- Do not work on nix-lib tests until the code translator is fully implemented.
- Do not work on the translator until the runtime is fully implemented.
- (in other words finish the network fetchers and store functions in runtime.js before doing ANYTHING ELSE)

## CRITICAL INSTRUCTIONS - READ FIRST
- **DO NOT WORK ON NIX-LIB TESTS** until runtime is complete
- **DO NOT WORK ON TRANSLATOR** - it is already complete and working
- **ONLY FOCUS ON**: Implementing the remaining runtime builtins and features
- **ALWAYS CONSULT NIX DOCUMENTATION**: Before implementing any builtin, read the official Nix documentation at https://noogle.dev/f/builtins/<function_name> to understand the exact behavior and semantics
- **NPM MODULES**: You are allowed to use npm modules, but ONLY through https://esm.sh/NPM_MODULE_NAME URLs (note: esm.sh doesn't always work with all modules, so test first)

---

## Remaining Work Status

| Builtin | Status | Priority | Estimated Time | Documentation |
|---------|--------|----------|----------------|---------------|
| **toJSON (Path)** | ✅ IMPLEMENTED | - | - | https://noogle.dev/f/builtins/toJSON |
| **fetchurl** | ✅ IMPLEMENTED | - | - | https://noogle.dev/f/builtins/fetchurl |
| **path** | ✅ IMPLEMENTED | - | - | https://noogle.dev/f/builtins/path |
| **filterSource** | ✅ IMPLEMENTED | - | - | https://noogle.dev/f/builtins/filterSource |
| **fetchGit** | NOT IMPLEMENTED | HIGH | 1-2 weeks | https://noogle.dev/f/builtins/fetchGit |
| **fetchTree** | NOT IMPLEMENTED | MEDIUM | 1 week | https://noogle.dev/f/builtins/fetchTree |
| **fetchMercurial** | NOT IMPLEMENTED | LOW | 1 week | https://noogle.dev/f/builtins/fetchMercurial |
| **fetchClosure** | NOT IMPLEMENTED | VERY LOW | TBD | https://noogle.dev/f/builtins/fetchClosure |
| **getFlake** | NOT IMPLEMENTED | DEFER | TBD | https://noogle.dev/f/builtins/getFlake |

**5 builtins remaining to implement** (5 network/store/flake functions)

### Recently Completed (Session 24)
- ✅ **toJSON for Path objects** (runtime.js:300-348) - FULLY IMPLEMENTED
  - Handles store paths directly (from fetchTarball, fetchurl, etc.)
  - Copies local filesystem paths to store using builtins.path
  - Made toJSON async to support path copying
  - Fixed recursive toJSON calls to await properly
  - Created comprehensive test suite (main/tests/builtins_tojson_path_test.js) - 3 tests, all passing

- ✅ **fetchurl** (runtime.js:748-804) - FULLY IMPLEMENTED
  - Downloads single files from URLs
  - Supports both string URL and {url, sha256?, name?} object formats
  - SHA256 validation with clear mismatch errors
  - Caching system (same URL = cache hit)
  - Name extraction from URLs
  - Reuses fetcher.js and store_manager.js infrastructure
  - Created comprehensive test suite (main/tests/builtins_fetchurl_test.js) - 7 tests, all passing
  - Integration with toJSON verified

- ✅ **builtins.path** (runtime.js:1053-1168) - FULLY IMPLEMENTED
  - Copies local filesystem paths to Nix store
  - Supports all parameters: path (required), name, filter, recursive, sha256
  - Filter function with signature: (path) => (type) => boolean
  - Types: "regular", "directory", "symlink", "unknown"
  - NAR hashing for directories
  - SHA256 validation support
  - Preserves executable bits on files
  - Handles symlinks correctly
  - Created comprehensive test suite (main/tests/builtins_path_test.js) - 8 tests, all passing

- ✅ **builtins.filterSource** (runtime.js:1533-1540) - FULLY IMPLEMENTED
  - Thin wrapper around builtins.path with filter parameter
  - Curried function: filter -> path -> storePath
  - Filter signature: (path) => (type) => boolean
  - Created comprehensive test suite (main/tests/builtins_filtersource_test.js) - 6 tests, all passing
  - Verified integration with toJSON

**Total Progress**: 65/98 builtins implemented (66.3%)

---

## START HERE - Next Task

**Implement: builtins.fetchGit (HIGH PRIORITY - 1-2 weeks)**

**READ FIRST**: https://noogle.dev/f/builtins/fetchGit

Location: main/runtime.js:819
Current: Throws NotImplemented error
Goal: Clone Git repositories and copy to store with metadata

This is the most important remaining fetcher. It's used extensively in:
- Flakes (flake inputs)
- Nixpkgs overlays
- Private repository fetching
- Pinned dependencies

Implementation requires:
1. Git binary integration (Deno.Command)
2. Parsing complex argument structure
3. Handling refs, revs, shallow clones, submodules
4. Extracting commit metadata (shortRev, revCount, lastModified)
5. NAR hashing after .git removal
6. Store path computation and caching

Estimated effort: 1-2 weeks (most complex remaining builtin)

---

## What is NOT Implemented (5 items total)

### 1. builtins.fetchGit (HIGH PRIORITY - 1-2 weeks)

**READ FIRST**: https://noogle.dev/f/builtins/fetchGit

Location: runtime.js:820
Status: NOT IMPLEMENTED (throws NotImplemented error)
Requirements:
- Shell out to `git clone` using Deno.Command
- Parse params: {url, ref?, rev?, submodules=false, shallow=false, allRefs=false}
- Clone to temp directory
- Checkout specific rev/ref if provided
- Remove .git directory (for determinism)
- Hash directory with NAR
- Move to store
- Return attrset with {outPath, rev, shortRev, revCount, lastModified, narHash, etc.}

Implementation steps:
1. Parse args object
2. Validate git is installed (check with `which git`)
3. Create temp directory
4. Execute git clone with appropriate flags
   - Use shallow clone if shallow=true
   - Use --recurse-submodules if submodules=true
5. If rev provided: git checkout <rev>
6. Get commit info: rev, shortRev, revCount, lastModified
7. Remove .git directory
8. Hash with NAR
9. Compute store path
10. Move to store
11. Return attrset with metadata

This is complex because it requires:
- Git binary integration
- Error handling for git failures
- Parsing git output
- Handling network issues

Test requirements:
- Clone public repo
- Clone with specific rev
- Clone with ref (branch)
- Shallow clone
- Submodules
- Error handling for invalid URL

### 2. builtins.fetchTree (EXPERIMENTAL - 1 week)

**READ FIRST**: https://noogle.dev/f/builtins/fetchTree

Location: runtime.js:826
Status: NOT IMPLEMENTED (throws NotImplemented error)
Requirements:
- Parse URL and detect type (git, tarball, file, github, etc.)
- Parse type parameter if provided
- Delegate to appropriate fetcher:
  - type=tarball → builtins.fetchTarball
  - type=git → builtins.fetchGit
  - type=file → builtins.fetchurl
- Return unified attrset format

Implementation steps:
1. Parse args (URL or {url, type?})
2. Detect type from URL scheme:
   - git+https://, git://, ssh:// → git
   - https://.../archive.tar.gz → tarball
   - https://.../file → file
   - github:owner/repo → github (special handling)
3. Normalize URL for each type
4. Call appropriate fetcher
5. Return result in unified format

This requires all other fetchers to be implemented first.
LOW PRIORITY - experimental Nix feature.

### 3. builtins.fetchMercurial (LOW PRIORITY)

**READ FIRST**: https://noogle.dev/f/builtins/fetchMercurial

Location: runtime.js:823
Status: NOT IMPLEMENTED (throws NotImplemented error)
Requirements:
- Shell out to `hg clone` using Deno.Command
- Similar implementation to fetchGit
- Parse params: {url, rev?, revCount?}
- Clone to temp dir
- Remove .hg directory
- Hash with NAR
- Move to store
- Return attrset

Implementation: Nearly identical to fetchGit, but using `hg` instead of `git`.
Requires Mercurial binary installed.
LOW PRIORITY - rarely used in modern Nix code.

### 4. builtins.fetchClosure (VERY LOW PRIORITY - DON'T IMPLEMENT YET)

**READ FIRST**: https://noogle.dev/f/builtins/fetchClosure

Location: runtime.js:829
Status: NOT IMPLEMENTED (throws NotImplemented error)
Requirements:
- Download closure from binary cache
- Parse fromPath and toPath
- Verify signatures
- Implement binary cache protocol (complex!)
- Move to store

This is VERY COMPLEX and EXPERIMENTAL.
Requires full binary cache support (narinfo parsing, NAR downloading, signature verification).
Should be LAST priority after all other fetchers work.

### 5. builtins.getFlake (DEFER - NOT CRITICAL)

**READ FIRST**: https://noogle.dev/f/builtins/getFlake

Location: runtime.js:1240
Status: NOT IMPLEMENTED (throws NotImplemented error)
Requirements:
- Parse flake reference
- Fetch flake source
- Parse flake.lock
- Resolve inputs recursively
- Evaluate flake.nix
- Return outputs

This is EXTREMELY COMPLEX.
Requires full flake system implementation.
NOT needed for basic Nix evaluation.
DEFER until all basic fetchers work.

---

## Implementation Priority Order

**HIGH PRIORITY (Git integration - 1-2 weeks):**
1. builtins.fetchGit (runtime.js:819) - 1-2 weeks - https://noogle.dev/f/builtins/fetchGit

**MEDIUM PRIORITY (Advanced fetchers):**
2. builtins.fetchTree (runtime.js:826) - depends on fetchGit - https://noogle.dev/f/builtins/fetchTree

**LOW PRIORITY (Rarely used):**
3. builtins.fetchMercurial (runtime.js:822) - rarely used - https://noogle.dev/f/builtins/fetchMercurial

**VERY LOW PRIORITY (Defer):**
4. builtins.fetchClosure (runtime.js:828) - very complex experimental feature - https://noogle.dev/f/builtins/fetchClosure
5. builtins.getFlake (runtime.js:1240) - defer indefinitely - https://noogle.dev/f/builtins/getFlake

---

## Technical Reference

### NAR Format (Nix Archive)
Deterministic archive format for hashing directories:
1. Sort all entries alphabetically at each level
2. Serialize recursively: type + name + (executable? size? contents? target?)
3. SHA256 hash of serialization

### Store Path for Fixed-Output Derivations
```
hash_input = "fixed:out:sha256:<nar-hash>:<store-dir>:<name>"
store_path = <store-dir>/<base32(sha256(hash_input))>-<name>
```

Use tools/store_path.js which already implements this.

### Caching Strategy
- Cache key: `${url}:${sha256 || ""}`
- Cache file: `~/.cache/denix/cache.json` maps keys to store paths
- Check sequence: store exists? → cache hit? → download

### Available Infrastructure (Reuse These!)
- `main/fetcher.js` - HTTP download with retry (already exists)
  - `downloadWithRetry(url, destPath)` - async download with 3 retries
  - `validateSha256(filePath, expectedHash)` - verify SHA256
  - `extractNameFromUrl(url)` - extract filename from URL
- `main/tar.js` - Tarball extraction (already exists)
  - `extractTarball(tarPath, destDir)` - extract .tar.gz to directory
- `main/nar_hash.js` - NAR hashing (already exists)
  - `hashDirectory(dirPath)` - compute NAR hash of directory
- `main/store_manager.js` - Store management (already exists)
  - `getCachedPath(cacheKey)` - check if URL cached
  - `setCachedPath(cacheKey, storePath)` - save to cache
  - `atomicMove(srcPath, destPath)` - atomic move to store
  - `exists(path)` - check if path exists
  - `ensureStoreDirectory()` - create store dir if needed
- `tools/store_path.js` - Store path computation (already exists)
  - `computeFetchStorePath(narHash, name)` - compute store path from hash
- `tools/hashing.js` - SHA256 and other hashes (already exists)
  - `sha256Hex(data)`, `sha256(data)` - SHA256 hashing
- External dependencies:
  - `jsr:@std/tar@0.1.10` - Deno standard library (for tarball extraction)
  - `DecompressionStream` - Web API for gzip (built into Deno)
  - npm modules can be used via `https://esm.sh/NPM_MODULE_NAME` (test first, not all modules work)

---

## Implementation Notes

### Completed Implementation Notes

The following have been fully implemented and tested:
- ✅ **builtins.toJSON (Path support)** - Handles both store paths and local paths
- ✅ **builtins.fetchurl** - Downloads single files from URLs
- ✅ **builtins.path** - Copies local filesystem paths to store with filtering
- ✅ **builtins.filterSource** - Wrapper around builtins.path with filter parameter

See Session 24 completion notes above for implementation details.

---

## Known Edge Cases & Future Considerations

### Hash Format Normalization
- Nix accepts multiple formats: "sha256:abc...", "sha256-abc...", "abc..."
- Always normalize before comparing: `hash.replace(/^sha256[:-]/, '')`
- Store paths always use format: "sha256:abc..."

### Store Path Structure
- For fetched files: `/nix/store/<hash>-<name>/<filename>`
- For fetched tarballs: `/nix/store/<hash>-<name>/` (directory)
- The hash is derived from NAR hash of contents, not source URL

### Caching Behavior
- Cache key includes URL AND sha256: `${url}:${sha256 || ""}`
- Same URL with different sha256 = different cache entry
- Same URL without sha256 = separate cache entry from one with sha256
- Cache is persistent across runs (stored in ~/.cache/denix/cache.json)

### Error Handling Patterns
- Network errors: Retry 3 times with exponential backoff (already in downloadWithRetry)
- Hash mismatches: Throw immediately with clear message showing expected vs actual
- Missing files: Let Deno.stat throw naturally (don't catch)
- Invalid URLs: Let fetch throw naturally (don't prevalidate)

### Filter Function Interface (for builtins.path)
- Signature: `(path: string) => (type: string) => boolean`
- Curried function (Nix style)
- Types: "regular", "directory", "symlink"
- Return true to include, false to exclude
- Called for EVERY file/directory in tree (even if recursive=false)

### Performance Considerations
- Use atomicMove instead of copy+delete (faster, atomic)
- Hash large files in chunks (already handled by sha256Hex)
- Don't load entire files into memory if avoidable
- Use streaming for tarball extraction (already in tar.js)

### Platform Differences
- Executable bit: Preserve mode & 0o111 on copy
- Symlinks: Use Deno.readLink/Deno.symlink (works on Unix, limited on Windows)
- Path separators: Always use forward slash internally (Nix convention)
- Store location: ~/.cache/denix/store/ (user-writable, no root needed)

---

## Testing Strategy for New Implementations

### Test File Naming Convention
- `main/tests/builtins_<name>_test.js` - for builtin tests
- Example: `builtins_fetchurl_test.js`, `builtins_path_test.js`

### Required Test Cases (Minimum)
For each builtin, test AT LEAST:
1. **Happy path** - basic functionality works
2. **Argument variants** - string vs object, optional params
3. **Error cases** - invalid input throws appropriate error
4. **Edge cases** - empty input, special characters, etc.
5. **Caching** - if applicable, verify cache hit/miss behavior
6. **Integration** - works with other builtins (e.g., toJSON(fetchurl(...)))

### Test Structure Pattern
```javascript
Deno.test("builtin_name - description", async () => {
    const result = await builtins.builtin_name(args);
    assertEquals(result, expected);
});
```

### Running Tests
```bash
# Run all tests
deno test --allow-all

# Run specific test file
deno test --allow-all main/tests/builtins_fetchurl_test.js

# Watch mode (auto-rerun on changes)
deno test --allow-all --watch
```

### Test Coverage Goals
- Aim for 100% of code paths tested
- Every error condition should have a test
- Every argument variant should have a test
- Integration with related builtins should be tested

### When to Mark Implementation Complete
Implementation is complete when:
1. All test cases pass
2. No NotImplemented errors thrown
3. Behavior matches Nix 2.18 documentation (verify at https://noogle.dev)
4. Edge cases handled correctly
5. Error messages are clear and helpful

Implementation is NOT complete if:
- Tests are skipped or commented out
- Known bugs exist
- Error handling is missing
- Behavior doesn't match official Nix documentation
- You haven't read the documentation at https://noogle.dev first
