# Task: Implement Remaining Nix Runtime Features

## MISSION STATEMENT
Your job is to focus ONLY on what is NOT implemented and NOT working. Report ONLY what remains to be done. Never report accomplishments or achievements. You are a senior developer - there are no blockers, only smaller tasks to break down.

## CRITICAL INSTRUCTIONS - READ FIRST AND FOLLOW EXACTLY

### Work Priority Rules (STRICT ENFORCEMENT)
1. **DO NOT WORK ON NIX-LIB TESTS** - Runtime must be 100% complete first
2. **DO NOT WORK ON TRANSLATOR** - It is already complete and working (87/87 tests passing)
3. **ONLY FOCUS ON**: Implementing the 5 remaining runtime builtins (network fetchers and store functions)
4. **FINISH NETWORK FETCHERS AND STORE FUNCTIONS** before doing anything else

### Documentation Requirements (MANDATORY)
- **ALWAYS READ NIX DOCUMENTATION FIRST**: Before implementing ANY builtin, you MUST read https://noogle.dev/f/builtins/<function_name>
- **BASE IMPLEMENTATION ON NIX BEHAVIOR**: Your implementation must match official Nix 2.18 behavior exactly
- **VERIFY AGAINST DOCUMENTATION**: Test your implementation against the documented behavior at https://noogle.dev
- **DO NOT GUESS**: If unclear about behavior, read the documentation again or search for examples

### Dependency Management
- **NPM MODULES ALLOWED**: You can use npm modules via https://esm.sh/NPM_MODULE_NAME URLs
- **TEST ESM.SH FIRST**: Not all npm modules work through esm.sh - test before committing to a module
- **PREFER DENO STDLIB**: Use Deno standard library (jsr:@std/*) when possible over npm modules

### Reporting Rules (STRICT)
- ❌ **NEVER** report what you accomplished or completed
- ❌ **NEVER** include checkboxes (✅) or completion statements
- ❌ **NEVER** describe past work or achievements
- ✅ **ONLY** report remaining tasks and what is NOT working
- ✅ **ONLY** keep unimplemented features in this document
- ✅ **ALWAYS** add implementation details to each task

---

## BEFORE YOU START - MANDATORY CHECKLIST

Before implementing ANY builtin function, you MUST:

1. ✅ **READ THE DOCUMENTATION**: Go to https://noogle.dev/f/builtins/<function_name> and read it completely
2. ✅ **UNDERSTAND THE BEHAVIOR**: Study the examples and expected behavior in the documentation
3. ✅ **CHECK EXISTING INFRASTRUCTURE**: Review what tools already exist (fetcher.js, store_manager.js, nar_hash.js, etc.)
4. ✅ **BREAK DOWN THE TASK**: Split implementation into 1-2 hour chunks
5. ✅ **TEST AS YOU GO**: Write tests before or alongside implementation (TDD recommended)

**NEVER START CODING WITHOUT READING THE DOCUMENTATION FIRST!**

The documentation at https://noogle.dev shows:
- Exact function signatures
- All parameters (required and optional)
- Expected return types
- Example usage
- Edge case behavior

Your implementation MUST match the documented behavior exactly.

---

## Remaining Work Status - 5 Builtins to Implement

| Builtin | Status | Priority | Estimated Time | Documentation |
|---------|--------|----------|----------------|---------------|
| **fetchGit** | NOT IMPLEMENTED | HIGH | 1-2 weeks | https://noogle.dev/f/builtins/fetchGit |
| **fetchTree** | NOT IMPLEMENTED | MEDIUM | 1 week | https://noogle.dev/f/builtins/fetchTree |
| **fetchMercurial** | NOT IMPLEMENTED | LOW | 1 week | https://noogle.dev/f/builtins/fetchMercurial |
| **fetchClosure** | NOT IMPLEMENTED | VERY LOW | TBD | https://noogle.dev/f/builtins/fetchClosure |
| **getFlake** | NOT IMPLEMENTED | DEFER | TBD | https://noogle.dev/f/builtins/getFlake |

**Current Status**: 93/98 builtins implemented. 5 remaining (all network/store/flake functions)

---

## START HERE - Next Task

**IMMEDIATE TASK: Implement builtins.fetchGit**

**STEP 0 - MANDATORY**: Read https://noogle.dev/f/builtins/fetchGit completely before starting

Location: main/runtime.js (search for fetchGit - currently throws NotImplemented)
Goal: Clone Git repositories and copy to store with metadata

Why this is critical:
- Most important remaining fetcher
- Used extensively in Flakes, nixpkgs overlays, private repos, pinned dependencies
- Blocks fetchTree implementation (which depends on this)

Implementation Requirements (break into smaller tasks):
1. **Git binary validation** (30 min)
   - Check if git is installed: `Deno.Command("which", ["git"])`
   - Throw clear error if not found

2. **Argument parsing** (1 hour)
   - Parse {url, ref?, rev?, submodules=false, shallow=false, allRefs=false}
   - Validate required fields (url)
   - Set defaults for optional fields

3. **Clone operation** (2 hours)
   - Create temp directory (Deno.makeTempDir)
   - Execute git clone with appropriate flags:
     - Use `--depth 1` if shallow=true
     - Use `--recurse-submodules` if submodules=true
     - Use `--branch <ref>` if ref provided
   - Handle git errors (network failures, auth failures, invalid refs)

4. **Checkout specific revision** (1 hour)
   - If rev provided: `git checkout <rev>`
   - Verify checkout succeeded

5. **Extract commit metadata** (2 hours)
   - Get rev: `git rev-parse HEAD`
   - Get shortRev: `git rev-parse --short HEAD`
   - Get revCount: `git rev-list --count HEAD`
   - Get lastModified: `git log -1 --format=%ct` (Unix timestamp)
   - Parse output from each command

6. **Clean and hash** (1 hour)
   - Remove .git directory (for determinism)
   - Use existing NAR hash: `await hashDirectory(clonePath)` from main/nar_hash.js

7. **Store path management** (1 hour)
   - Compute store path: `computeFetchStorePath(narHash, name)` from tools/store_path.js
   - Use existing caching: `getCachedPath(cacheKey)` from main/store_manager.js
   - Move to store: `atomicMove(tempPath, storePath)` from main/store_manager.js

8. **Return attrset** (30 min)
   - Build attrset with: {outPath, rev, shortRev, revCount, lastModified, narHash, submodules}
   - Ensure all fields match Nix documentation

9. **Testing** (3 hours)
   - Create main/tests/builtins_fetchgit_test.js
   - Test: basic clone (public repo)
   - Test: clone with specific rev
   - Test: clone with ref (branch)
   - Test: shallow clone
   - Test: submodules
   - Test: error handling (invalid URL, missing repo)
   - Test: caching behavior

Total Estimated Time: 12-15 hours over 2-3 days

---

## What is NOT Implemented (5 items total)

### 1. builtins.fetchGit - NOT IMPLEMENTED (HIGH PRIORITY)

**DOCUMENTATION**: https://noogle.dev/f/builtins/fetchGit (READ THIS FIRST!)

Location: main/runtime.js (search for fetchGit)
Current State: Throws NotImplemented error

What needs to be done:
1. Validate git binary exists using Deno.Command
2. Parse and validate input: {url, ref?, rev?, submodules=false, shallow=false, allRefs=false}
3. Clone repository to temp directory with appropriate flags (--depth 1, --recurse-submodules, --branch)
4. Checkout specific revision if provided
5. Extract metadata: rev, shortRev, revCount (git rev-list --count), lastModified (git log -1 --format=%ct)
6. Remove .git directory for determinism
7. Hash with NAR using existing main/nar_hash.js
8. Compute store path using existing tools/store_path.js
9. Move to store using existing main/store_manager.js
10. Return attrset: {outPath, rev, shortRev, revCount, lastModified, narHash, submodules}

Challenges to solve:
- Git command execution and error handling (network failures, invalid refs, auth failures)
- Parsing git command output correctly
- Handling different git versions and output formats
- Proper temp directory cleanup on errors

Testing checklist (create main/tests/builtins_fetchgit_test.js):
- [ ] Clone public repository (basic)
- [ ] Clone with specific rev
- [ ] Clone with ref (branch name)
- [ ] Shallow clone (depth=1)
- [ ] Clone with submodules
- [ ] Error: invalid URL
- [ ] Error: missing repository
- [ ] Caching: same URL fetched twice uses cache

### 2. builtins.fetchTree - NOT IMPLEMENTED (MEDIUM PRIORITY)

**DOCUMENTATION**: https://noogle.dev/f/builtins/fetchTree (READ THIS FIRST!)

Location: main/runtime.js (search for fetchTree)
Current State: Throws NotImplemented error

**DEPENDENCY**: Requires fetchGit to be implemented first (blocks this task)

What needs to be done:
1. Parse input: URL string OR {url, type?}
2. Detect type from URL scheme if not provided:
   - git+https://, git://, ssh:// → "git"
   - https://.../archive.tar.gz → "tarball"
   - https://.../file.zip → "file"
   - github:owner/repo → "github" (special handling)
3. Normalize URL for detected type
4. Delegate to appropriate fetcher:
   - type=tarball → call builtins.fetchTarball
   - type=git → call builtins.fetchGit
   - type=file → call builtins.fetchurl
5. Return unified attrset format

Challenges to solve:
- URL scheme detection (regex patterns for each type)
- GitHub shorthand syntax parsing (github:owner/repo → https://github.com/owner/repo)
- Unified error handling across different fetchers
- Return format normalization (different fetchers return different fields)

Testing checklist (create main/tests/builtins_fetchtree_test.js):
- [ ] Detect and fetch git repository
- [ ] Detect and fetch tarball
- [ ] Detect and fetch single file
- [ ] GitHub shorthand (github:owner/repo)
- [ ] Explicit type parameter overrides detection
- [ ] Error: unrecognized URL scheme
- [ ] Error: type mismatch (URL doesn't match specified type)

### 3. builtins.fetchMercurial - NOT IMPLEMENTED (LOW PRIORITY)

**DOCUMENTATION**: https://noogle.dev/f/builtins/fetchMercurial (READ THIS FIRST!)

Location: main/runtime.js (search for fetchMercurial)
Current State: Throws NotImplemented error

**NOTE**: Rarely used in modern Nix code. Implement only after fetchGit and fetchTree are complete.

What needs to be done:
1. Validate mercurial binary exists (check `hg` command)
2. Parse input: {url, rev?, revCount?}
3. Clone repository using `hg clone`
4. Checkout specific revision if provided
5. Extract metadata: rev, revCount
6. Remove .hg directory for determinism
7. Hash with NAR using existing main/nar_hash.js
8. Compute store path and move to store (same as fetchGit)
9. Return attrset: {outPath, rev, revCount}

Implementation note: Very similar to fetchGit but uses `hg` commands instead of `git` commands

Challenges to solve:
- Mercurial binary may not be installed (less common than git)
- Different command syntax from git
- Error handling for hg-specific failures

Testing checklist (create main/tests/builtins_fetchmercurial_test.js):
- [ ] Clone public mercurial repository
- [ ] Clone with specific revision
- [ ] Error: mercurial not installed
- [ ] Error: invalid repository URL
- [ ] Caching behavior

### 4. builtins.fetchClosure - NOT IMPLEMENTED (VERY LOW PRIORITY - DEFER)

**DOCUMENTATION**: https://noogle.dev/f/builtins/fetchClosure (READ THIS FIRST!)

Location: main/runtime.js (search for fetchClosure)
Current State: Throws NotImplemented error

**WARNING**: Extremely complex experimental feature. Implement LAST after all other fetchers work.

What needs to be done:
1. Parse input: {fromPath, toPath?, fromStore?}
2. Implement binary cache protocol:
   - Fetch .narinfo file from cache
   - Parse narinfo (NAR hash, size, references, signatures)
   - Verify signatures (cryptographic verification)
   - Download NAR file from cache
3. Decompress and extract NAR
4. Verify hash matches narinfo
5. Move to store at correct path
6. Handle content-addressed vs input-addressed paths
7. Resolve closure (recursive dependencies)

Challenges to solve:
- Binary cache protocol implementation (complex HTTP interactions)
- NAR format parsing and extraction
- Signature verification (cryptographic operations)
- Closure resolution (recursive dependency fetching)
- Content-addressed path handling
- Cache URL configuration and selection

This requires:
- Full binary cache client implementation
- NAR format support (beyond just hashing)
- Signature verification infrastructure
- Potentially recursive fetching of dependencies

**RECOMMENDATION**: Skip this unless absolutely needed. It's experimental and rarely used.

### 5. builtins.getFlake - NOT IMPLEMENTED (DEFER INDEFINITELY)

**DOCUMENTATION**: https://noogle.dev/f/builtins/getFlake (READ THIS FIRST!)

Location: main/runtime.js (search for getFlake)
Current State: Throws NotImplemented error

**WARNING**: Extremely complex feature requiring full flake system. Not needed for basic Nix evaluation. Defer indefinitely.

What would need to be done (if we ever implement this):
1. Parse flake reference (URL or path)
2. Fetch flake source using appropriate fetcher
3. Read and parse flake.lock (lockfile version 7 format)
4. Resolve all inputs recursively (flake dependencies)
5. Evaluate flake.nix in correct scope
6. Extract outputs attrset
7. Handle flake metadata (description, nixConfig, etc.)
8. Implement flake registry lookup
9. Handle indirect flake references

Challenges to solve:
- Full flake system implementation (extremely complex)
- Lockfile parsing and version handling
- Recursive input resolution (dependency graph)
- Flake evaluation scope setup
- Registry lookup and caching
- Indirect reference handling
- Compatibility with different flake schema versions

This requires:
- Complete understanding of flake system (hundreds of pages of documentation)
- All other fetchers working (fetchGit, fetchTree, etc.)
- Lockfile parser implementation
- Flake evaluation context
- Registry client

**RECOMMENDATION**: Do not implement unless absolutely necessary. Basic Nix evaluation works without this.

---

## Implementation Priority Order (FOLLOW THIS EXACTLY)

### TASK 1: fetchGit (HIGH PRIORITY - START HERE)
- **Documentation**: https://noogle.dev/f/builtins/fetchGit (READ BEFORE CODING!)
- **Location**: main/runtime.js (search for fetchGit)
- **Estimated Time**: 12-15 hours over 2-3 days
- **Blocks**: fetchTree (cannot implement until this is done)
- **Impact**: Critical for flakes, nixpkgs, and most modern Nix code

### TASK 2: fetchTree (MEDIUM PRIORITY - AFTER fetchGit)
- **Documentation**: https://noogle.dev/f/builtins/fetchTree (READ BEFORE CODING!)
- **Location**: main/runtime.js (search for fetchTree)
- **Estimated Time**: 6-8 hours over 1-2 days
- **Requires**: fetchGit must be complete first
- **Impact**: Unified fetcher interface (experimental but useful)

### TASK 3: fetchMercurial (LOW PRIORITY - RARELY USED)
- **Documentation**: https://noogle.dev/f/builtins/fetchMercurial (READ BEFORE CODING!)
- **Location**: main/runtime.js (search for fetchMercurial)
- **Estimated Time**: 8-10 hours over 1-2 days
- **Impact**: Low - rarely used in modern Nix

### TASK 4: fetchClosure (VERY LOW PRIORITY - DEFER)
- **Documentation**: https://noogle.dev/f/builtins/fetchClosure (READ BEFORE CODING!)
- **Location**: main/runtime.js (search for fetchClosure)
- **Estimated Time**: 40+ hours (very complex)
- **Impact**: Experimental feature, not critical
- **Recommendation**: Skip unless specifically needed

### TASK 5: getFlake (DEFER INDEFINITELY)
- **Documentation**: https://noogle.dev/f/builtins/getFlake (READ BEFORE CODING!)
- **Location**: main/runtime.js (search for getFlake)
- **Estimated Time**: 80+ hours (extremely complex)
- **Impact**: Not needed for basic Nix evaluation
- **Recommendation**: Do not implement

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

### Using NPM Modules (IMPORTANT)
- ✅ **Allowed**: You CAN use npm modules through https://esm.sh/NPM_MODULE_NAME
- ⚠️ **Warning**: Not all npm modules work through esm.sh (Node-specific APIs may fail)
- ✅ **Best Practice**: Always test the module import first before writing code that depends on it
- ✅ **Prefer**: Deno standard library (jsr:@std/*) when possible over npm modules
- ✅ **Alternative**: Check if Deno has built-in APIs (like crypto, fetch, etc.)

Example usage:
```javascript
// This might work:
import someLib from "https://esm.sh/some-package@1.0.0";

// But test it first! Try importing it and calling basic functions
// before committing to using it in your implementation
```

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

Implementation is complete ONLY when ALL of these are true:

1. ✅ **Documentation verified**: You have read https://noogle.dev/f/builtins/<function_name> and confirmed behavior matches
2. ✅ **All test cases pass**: Every test in the test file passes
3. ✅ **No NotImplemented errors**: Function doesn't throw NotImplemented
4. ✅ **Edge cases handled**: Null, undefined, empty, invalid inputs all handled
5. ✅ **Error messages clear**: Errors tell user what went wrong and how to fix it
6. ✅ **Behavior matches Nix**: Test against real Nix if possible

Implementation is NOT complete if:
- ❌ Tests are skipped, commented out, or marked with .only
- ❌ Known bugs exist (even if "minor")
- ❌ Error handling is missing or generic
- ❌ Behavior doesn't match official Nix documentation
- ❌ You haven't verified against https://noogle.dev documentation
- ❌ You're guessing at behavior instead of reading documentation

**RULE**: If you can't verify behavior matches Nix documentation at https://noogle.dev, the implementation is NOT complete.
