# Task: Implement a translator from Nix to JavaScript

Your job is to focus on what is NOT implemented and NOT working. Only report what remains to be done. Do not report what you accomplished. You are a senior level developer, there is no such thing as a blocker. Break down large tasks into smaller tasks.

## What Needs to Be Done

### Current State
- **10 builtins NOT implemented** (throw NotImplemented errors):
  1. `builtins.toJSON` - partial (works for most types, fails on Path type)
  2. `builtins.fetchurl` - not started
  3. `builtins.fetchTarball` - not started
  4. `builtins.fetchGit` - not started
  5. `builtins.fetchMercurial` - not started
  6. `builtins.fetchTree` - not started
  7. `builtins.fetchClosure` - not started
  8. `builtins.path` - not started
  9. `builtins.getFlake` - not started
  10. `builtins.filterSource` - not started

### Priority Order (Most Important First)

#### 1. Implement fetchTarball (HIGHEST PRIORITY)
**Why**: Most commonly used fetcher in nixpkgs. Needed for real-world Nix code.
**Effort**: 2-3 days
**Blockers**: None - hashing and store path utilities already exist

**What needs to be done**:
- [ ] Create `main/fetcher.js` for HTTP downloads
  - downloadFile(url, destPath) - use Deno.fetch() with streaming
  - Handle redirects automatically (fetch follows by default)
  - Handle network errors, 404s, timeouts
  - Return downloaded file path
  - Add retry logic (3 attempts with exponential backoff)
- [ ] Create `main/tar.js` for extraction
  - extractTarball(tarballPath, destDir) - use @std/tar UntarStream
  - Use DecompressionStream("gzip") for .tar.gz files
  - Handle .tar, .tar.gz, .tar.bz2, .tar.xz formats
  - Auto-detect and strip top-level directory if single directory in tarball
  - Return extracted directory path
- [ ] Create `main/nar_hash.js` for directory hashing
  - hashDirectory(dirPath) - compute NAR hash without `nix` binary
  - Walk directory tree in sorted order
  - Hash file contents and metadata (executable bit, symlinks)
  - Return sha256 hex string
  - Make NAR format compatible with Nix for verification
- [ ] Create `main/store_manager.js` for store operations
  - ensureStoreDirectory() - create ~/.cache/denix/store (don't need /nix/store permissions)
  - computeFetchPath(url, sha256, name) - generate store path for fetched content
  - Use existing tools/store_path.js utilities for path computation
  - atomicMove(srcPath, destPath) - safe operations (temp + rename)
  - lockFile(path) - prevent concurrent operations
  - getCachedPath(key) - check if already fetched
- [ ] Implement builtins.fetchTarball in runtime.js
  - Parse parameters: string URL or {url, sha256?, name?}
  - Extract name from URL if not provided (e.g., "nixpkgs-23.11" from GitHub archive)
  - Check cache first (based on URL + sha256)
  - Download → extract → hash → verify sha256 if provided → move to store
  - Return Path object pointing to final store path
  - Add error handling for each step with clear messages
  - Clean up temp files on error
- [ ] Create tests in `main/tests/fetchtarball_test.js`
  - Test: Download small tarball from public URL (< 1MB)
  - Test: Hash verification passes with correct sha256
  - Test: Hash mismatch throws descriptive error
  - Test: Caching works (same URL doesn't re-download)
  - Test: Cleanup temp files on error
  - Test: Strip top-level directory correctly
  - Test: Handle network errors gracefully

**Key decisions made**:
- Store location: ~/.cache/denix/store (no need for root permissions)
- Hash verification: Implement NAR hashing in JavaScript (no Nix dependency)
- Extraction: Use Deno @std/tar (no external tar binary needed)
- Already have: tools/store_path.js for path computation
- Already have: tools/hashing.js for SHA256

#### 2. Implement fetchurl
**Why**: Simpler than fetchTarball, commonly used for single files
**Effort**: 1-2 days
**Blockers**: None - can reuse helpers/fetch.js and helpers/store.js from fetchTarball

**What needs to be done**:
- [ ] Implement builtins.fetchurl in runtime.js
  - Reuse helpers/fetch.js for download
  - Compute store path for single file
  - Verify sha256 hash of downloaded file
  - Move to store atomically
  - Return Path object
- [ ] Add tests for fetchurl
  - Test: Download single file
  - Test: Hash verification
  - Test: Error handling

#### 3. Implement path
**Why**: Needed for copying local files to store
**Effort**: 1-2 days
**Blockers**: Need helpers/nar_hash.js and helpers/store.js (created in step 1)

**What needs to be done**:
- [ ] Implement builtins.path in runtime.js
  - Parse parameters: path (required), name (optional), filter (optional), recursive (default true), sha256 (optional)
  - Copy path to temp directory (apply filter if provided)
  - Hash directory with NAR
  - Verify sha256 if provided
  - Move to store
  - Return Path object
- [ ] Add tests for path builtin
  - Test: Copy single file to store
  - Test: Copy directory recursively
  - Test: Apply filter function
  - Test: Verify hash

#### 4. Implement filterSource
**Why**: Needed for advanced source filtering
**Effort**: 1 day
**Blockers**: Needs builtins.path (step 3)

**What needs to be done**:
- [ ] Implement builtins.filterSource in runtime.js
  - Takes filter function and path
  - Calls builtins.path with filter parameter
  - Return result from path
- [ ] Add tests for filterSource

#### 5. Implement fetchGit
**Why**: Common for git dependencies
**Effort**: 1-2 weeks
**Blockers**: Need helpers/store.js from step 1

**What needs to be done**:
- [ ] Create `helpers/git.js` for git operations
  - cloneRepo(url, ref, rev, shallow) - shell out to `git clone`
  - Handle refs, revs, branches, tags
  - Handle shallow clones (--depth 1)
  - Remove .git directory after clone
- [ ] Implement builtins.fetchGit in runtime.js
  - Parse parameters: url, ref, rev, submodules, shallow, allRefs
  - Clone repo to temp directory
  - Hash directory with NAR
  - Move to store
  - Return attribute set with outPath, rev, shortRev, etc.
- [ ] Add tests for fetchGit
  - Test: Clone public repo by branch
  - Test: Clone by specific revision
  - Test: Shallow clone
  - Test: Error handling (invalid repo, network error)

#### 6. Implement fetchTree
**Why**: Generic fetcher wrapping others
**Effort**: 1 week
**Blockers**: Needs fetchTarball, fetchGit (steps 1 and 5)

**What needs to be done**:
- [ ] Implement builtins.fetchTree in runtime.js
  - Detect type from URL scheme or type parameter
  - Delegate to fetchTarball, fetchGit, or fetchurl
  - Return unified attribute set
- [ ] Add tests for fetchTree

#### 7. Implement toJSON for Path type
**Why**: Complete toJSON implementation
**Effort**: 1-2 hours
**Blockers**: None

**What needs to be done**:
- [ ] Fix toJSON in runtime.js (line ~338)
  - Convert Path to string representation
  - Handle store paths correctly
  - Return JSON-encoded string
- [ ] Add test for toJSON with Path

#### 8. Implement fetchMercurial (LOW PRIORITY)
**Why**: Rarely used (Mercurial is less common than Git)
**Effort**: 1 week
**Blockers**: Need helpers/store.js from step 1

**What needs to be done**:
- [ ] Create `helpers/hg.js` for Mercurial operations
- [ ] Implement builtins.fetchMercurial in runtime.js
- [ ] Add tests

#### 9. Implement fetchClosure (VERY LOW PRIORITY)
**Why**: Experimental feature, requires binary cache support
**Effort**: Multi-week (needs binary cache system)
**Blockers**: Need binary cache client implementation

**What needs to be done**:
- [ ] Research Nix binary cache protocol
- [ ] Implement binary cache client
- [ ] Implement builtins.fetchClosure
- [ ] Add tests

#### 10. Implement getFlake (VERY LOW PRIORITY)
**Why**: Flakes are complex, full evaluation system needed
**Effort**: Multi-week to multi-month
**Blockers**: Need flake lock file parsing, input resolution, evaluation

**What needs to be done**:
- [ ] Research flake.lock format
- [ ] Implement input resolution
- [ ] Implement flake evaluation
- [ ] Add flake output schema validation
- [ ] Add tests

---

## Recommended Sequence

Start here:
1. **Day 1-3**: Implement fetchTarball (priority 1) - Creates fetcher, tar, NAR hash, and store manager modules
2. **Day 4**: Implement fetchurl (priority 2) - Reuses fetcher and store manager
3. **Day 5-6**: Implement path (priority 3) - Uses NAR hashing from day 1
4. **Day 7**: Implement filterSource (priority 4) - Uses path from day 6
5. **Day 7**: Implement toJSON for Path (priority 7) - Quick 1-hour fix
6. **Week 2-3**: Implement fetchGit (priority 5) - Major feature requiring git integration
7. **Week 3-4**: Implement fetchTree (priority 6) - Wraps fetchTarball, fetchGit, fetchurl
8. **Future**: fetchMercurial, fetchClosure, getFlake (priorities 8-10) - As needed

After completing priorities 1-7, the runtime will have 97/98 Nix 2.18 builtins working (99% complete).
Only 3 advanced builtins will remain: fetchMercurial, fetchClosure, getFlake.

---

## Technical Implementation Details

### NAR (Nix Archive) Format Hashing

NAR is a deterministic archive format used by Nix. To hash a directory:

1. **Sort entries**: Walk directory tree, sort entries alphabetically at each level
2. **Serialize metadata**: For each entry, serialize:
   - Type: "regular", "directory", "symlink"
   - If regular file:
     - Executable bit (yes/no)
     - Size (bytes)
     - Contents (raw bytes)
   - If symlink:
     - Target path
   - If directory:
     - Recursively process entries
3. **Hash the serialization**: SHA256 of the serialized byte stream

Reference implementation approach:
```javascript
// Simplified NAR serialization
function serializeNAR(path) {
  const stats = Deno.statSync(path);
  if (stats.isFile) {
    return serializeFile(path, stats);
  } else if (stats.isDirectory) {
    return serializeDirectory(path);
  } else if (stats.isSymlink) {
    return serializeSymlink(path);
  }
}

function serializeDirectory(dirPath) {
  const entries = Array.from(Deno.readDirSync(dirPath))
    .sort((a, b) => a.name.localeCompare(b.name));

  let result = "directory(";
  for (const entry of entries) {
    result += `entry(name=${entry.name}, ${serializeNAR(join(dirPath, entry.name))})`;
  }
  result += ")";
  return result;
}
```

For our implementation, we can use a simpler approach initially:
1. Use `nix hash path` if Nix is installed (easy validation)
2. Otherwise, implement basic NAR hashing in pure JavaScript
3. Add tests comparing our hashes with Nix's hashes

### Store Path Computation for Fetchers

Fixed-output derivations (like fetchTarball) use a different store path format:

```
hash_input = "fixed:out:sha256:<content-hash>:<file-store-path>"
store_path = /nix/store/<base32(sha256(hash_input))>-<name>
```

Steps:
1. Download and extract tarball to temp directory
2. Compute NAR hash of extracted contents
3. Compute store path using fixed-output derivation formula
4. Move contents to final store path
5. Return Path object with store path

### Caching Strategy

To avoid re-downloading:

1. **Cache key**: `${url}:${sha256 || ""}`
2. **Cache location**: `~/.cache/denix/downloads/<hash>.tar.gz`
3. **Store location**: `~/.cache/denix/store/<store-path-hash>-<name>/`
4. **Check sequence**:
   - Is store path already populated? → Return it
   - Is download cached? → Extract from cache
   - Otherwise → Download, cache, extract

### File Locking

Prevent concurrent downloads of same URL:

```javascript
async function withLock(lockPath, fn) {
  const lockFile = await Deno.open(lockPath, { create: true, write: true });
  try {
    await lockFile.lock(true); // Exclusive lock
    return await fn();
  } finally {
    await lockFile.unlock();
    lockFile.close();
  }
}
```

---

## Current Test Status

All 73 test suites passing:
- Translator tests ✅
- Nixpkgs lib tests ✅
- Runtime tests ✅
- Import system tests ✅

**Total**: 73 passing, 0 failing

No blockers exist. Ready to start implementing fetchTarball.

---

## Module Implementation Checklist

### Module 1: main/fetcher.js (Download logic)

```javascript
// Core exports needed:
export async function downloadFile(url, destPath, options = {})
export async function downloadWithRetry(url, destPath, retries = 3)
export function extractNameFromUrl(url)
export async function validateSha256(filePath, expectedSha256)
```

**Implementation notes**:
- Use `Deno.fetch()` for HTTP/HTTPS requests
- Stream response to file (don't load entire file into memory)
- Follow redirects automatically
- Retry on network errors with exponential backoff (1s, 2s, 4s)
- Throw descriptive errors for 404, 403, timeout
- Support progress callbacks for large downloads (optional)

**Tests needed**:
- Download from public URL (e.g., https://httpbin.org/bytes/1024)
- SHA256 validation (correct hash passes, wrong hash fails)
- Network error handling (use httpbin.org/status/500)
- Retry logic (mock fetch to fail twice then succeed)

### Module 2: main/tar.js (Extraction logic)

```javascript
// Core exports needed:
export async function extractTarball(tarballPath, destDir)
export async function detectTarballFormat(filePath)
export async function stripTopLevelDirectory(extractDir)
```

**Implementation notes**:
- Use `@std/tar` UntarStream from Deno standard library
- For .tar.gz: pipe through `new DecompressionStream("gzip")`
- For .tar.bz2: pipe through `new DecompressionStream("deflate")` (if supported)
- Auto-detect format from file extension
- After extraction, check if all contents in single top-level directory → strip it
- Preserve executable bit on extracted files

**Tests needed**:
- Extract simple .tar.gz (create test fixture)
- Strip top-level directory correctly
- Preserve file permissions
- Handle nested directories
- Handle symlinks in tarball

### Module 3: main/nar_hash.js (NAR hashing)

```javascript
// Core exports needed:
export async function hashDirectory(dirPath)
export async function computeNARHash(path)
export async function serializeNAR(path)
```

**Implementation notes**:
- Walk directory tree recursively
- Sort entries alphabetically at each level
- For files: hash (path, size, executable-bit, contents)
- For directories: hash (path, entries)
- For symlinks: hash (path, target)
- Use SHA256 from tools/hashing.js
- Return hash in format: "sha256:abc123..."

**Alternative approach (Phase 1)**:
- Shell out to `nix hash path <dir>` if Nix is installed
- Fall back to basic implementation if Nix not found
- Add TODO to implement full NAR serialization

**Tests needed**:
- Hash simple directory with few files
- Verify hash is deterministic (same directory → same hash)
- Compare with `nix hash path` output (if Nix available)
- Handle empty directories
- Handle symlinks

### Module 4: main/store_manager.js (Store operations)

```javascript
// Core exports needed:
export async function ensureStoreDirectory()
export function computeFetchStorePath(narHash, name)
export async function atomicMove(srcPath, destPath)
export async function getCachedPath(cacheKey)
export async function setCachedPath(cacheKey, storePath)
export async function withLock(lockPath, fn)
```

**Implementation notes**:
- Store directory: `~/.cache/denix/store/`
- Cache index: `~/.cache/denix/cache.json` (maps cache keys to store paths)
- Use Deno.rename() for atomic moves
- Use Deno.FsFile.lock() for file locking
- Compute store paths using tools/store_path.js
- Format: `fixed:out:sha256:<nar-hash>:/nix/store:<name>`

**Tests needed**:
- Create store directory if missing
- Compute store paths correctly
- Atomic move operation
- Cache lookup works
- Locking prevents concurrent operations

### Module 5: Runtime integration (main/runtime.js)

```javascript
// In builtins object:
"fetchTarball": async (args) => {
  // 1. Parse args (string URL or {url, sha256?, name?})
  // 2. Generate cache key
  // 3. Check if already in store → return Path
  // 4. Check if download cached → extract from cache
  // 5. Otherwise: download → extract → hash → verify → move to store
  // 6. Return Path object pointing to store path
}
```

**Implementation notes**:
- Must be async (returns Promise)
- Parse both `fetchTarball "url"` and `fetchTarball { url = "..."; sha256 = "..."; }`
- Extract name from URL if not provided
- If sha256 provided, verify it matches computed hash
- Clean up temp files on error
- Return Path object (not string)

**Tests needed**:
- Fetch small tarball (< 1MB)
- Verify caching works (second call instant)
- SHA256 verification
- Error handling (bad URL, bad hash, bad tarball)
- Both argument formats (string and attrset)

---

## Quick Start Implementation Guide

### Step 1: Start with main/fetcher.js (2-3 hours)

Create the download logic first. This is the simplest module.

```javascript
import { sha256Hex } from "../tools/hashing.js";

export async function downloadFile(url, destPath, options = {}) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const file = await Deno.create(destPath);
  await response.body.pipeTo(file.writable);
  return destPath;
}

// Add: downloadWithRetry, extractNameFromUrl, validateSha256
```

### Step 2: Implement main/tar.js (3-4 hours)

Use Deno standard library for extraction.

```javascript
import { UntarStream } from "jsr:@std/tar/untar-stream";

export async function extractTarball(tarballPath, destDir) {
  const file = await Deno.open(tarballPath);

  for await (const entry of file.readable
    .pipeThrough(new DecompressionStream("gzip"))
    .pipeThrough(new UntarStream())) {

    const path = `${destDir}/${entry.path}`;
    await Deno.mkdir(dirname(path), { recursive: true });
    await entry.readable?.pipeTo((await Deno.create(path)).writable);
  }

  // Add: stripTopLevelDirectory logic
}
```

### Step 3: Implement main/nar_hash.js (4-6 hours)

Start with simple approach.

```javascript
export async function hashDirectory(dirPath) {
  // Phase 1: Try using Nix
  try {
    const cmd = new Deno.Command("nix", {
      args: ["hash", "path", dirPath],
      stdout: "piped",
    });
    const { stdout } = await cmd.output();
    return new TextDecoder().decode(stdout).trim();
  } catch {
    // Phase 2: Fall back to basic implementation
    return computeBasicHash(dirPath);
  }
}

async function computeBasicHash(dirPath) {
  // Walk directory, collect all file hashes in sorted order
  // Compute final hash
}
```

### Step 4: Implement main/store_manager.js (2-3 hours)

Manage store paths and caching.

```javascript
import { computeStorePath } from "../tools/store_path.js";

const STORE_DIR = `${Deno.env.get("HOME")}/.cache/denix/store`;
const CACHE_FILE = `${Deno.env.get("HOME")}/.cache/denix/cache.json`;

export async function ensureStoreDirectory() {
  await Deno.mkdir(STORE_DIR, { recursive: true });
}

export function computeFetchStorePath(narHash, name) {
  const hashInput = `fixed:out:sha256:${narHash}:${STORE_DIR}:${name}`;
  return computeStorePath("output", hashInput, name, STORE_DIR);
}
```

### Step 5: Wire up runtime.js (2-3 hours)

Connect all modules together.

```javascript
import { downloadWithRetry, extractNameFromUrl, validateSha256 } from "./fetcher.js";
import { extractTarball } from "./tar.js";
import { hashDirectory } from "./nar_hash.js";
import { ensureStoreDirectory, computeFetchStorePath, getCachedPath, setCachedPath } from "./store_manager.js";

"fetchTarball": async (args) => {
  // Parse args
  const { url, sha256, name } = parseArgs(args);

  // Check cache
  const cached = await getCachedPath(`${url}:${sha256 || ""}`);
  if (cached) return new Path(cached);

  // Download → extract → hash → verify → store
  const tempTar = await downloadWithRetry(url, "/tmp/download.tar.gz");
  const tempDir = await extractTarball(tempTar, "/tmp/extracted");
  const narHash = await hashDirectory(tempDir);

  if (sha256 && narHash !== sha256) {
    throw new Error(`Hash mismatch: expected ${sha256}, got ${narHash}`);
  }

  const storePath = computeFetchStorePath(narHash, name);
  await atomicMove(tempDir, storePath);
  await setCachedPath(`${url}:${sha256 || ""}`, storePath);

  return new Path(storePath);
}
```

### Step 6: Write tests (2-3 hours)

Create comprehensive test suite.

```javascript
Deno.test("fetchTarball - download and extract", async () => {
  const result = await builtins.fetchTarball("https://example.com/test.tar.gz");
  assert(result instanceof Path);
  assert(await Deno.stat(result.toString()));
});
```

**Total estimated time**: 15-22 hours = 2-3 days
