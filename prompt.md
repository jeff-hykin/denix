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
- **ONLY FOCUS ON**: Implementing the 10 missing runtime builtins (fetchers + store)
- **Start with**: Step 1 below (main/fetcher.js)

## Quick Status
- ✅ 61/98 builtins implemented (62%)
- ✅ All 73 test suites passing
- ✅ Translator complete (DO NOT MODIFY)
- ✅ Import system complete (DO NOT MODIFY)
- ✅ Infrastructure ready: tools/store_path.js, tools/hashing.js
- ❌ **10 builtins remain - YOUR ONLY TASK**

---

## Immediate Next Steps - DO THESE IN ORDER

### STEP 1: Create main/fetcher.js (2-3 hours)
File to create: `main/fetcher.js`

Functions needed:
- `downloadFile(url, destPath)` - Use Deno.fetch() with streaming to file
- `downloadWithRetry(url, destPath, retries=3)` - Retry with exponential backoff (1s, 2s, 4s)
- `extractNameFromUrl(url)` - Parse name from URL (e.g., "nixpkgs-23.11" from GitHub archive)
- `validateSha256(filePath, expectedSha256)` - Import from tools/hashing.js and validate

Implementation requirements:
- Stream response to file (don't load into memory)
- Follow redirects automatically (fetch does this)
- Throw descriptive errors for 404, 403, timeout, network errors
- Return downloaded file path on success

Tests to write in `main/tests/fetcher_test.js`:
- [ ] Download from https://httpbin.org/bytes/1024
- [ ] SHA256 validation (correct hash passes, wrong hash throws)
- [ ] Network error handling (httpbin.org/status/500)
- [ ] Retry logic (mock fetch to fail twice then succeed)
- [ ] extractNameFromUrl extracts name correctly

---

### STEP 2: Create main/tar.js (3-4 hours)
File to create: `main/tar.js`

Functions needed:
- `extractTarball(tarballPath, destDir)` - Extract tarball to directory
- `detectFormat(filePath)` - Detect .tar, .tar.gz, .tar.bz2, .tar.xz from extension
- `stripTopLevelDirectory(extractDir)` - If all files in single subdir, move them up

Implementation requirements:
- Use `import { UntarStream } from "https://deno.land/std@0.224.0/tar/untar-stream.ts"`
- For .tar.gz: `file.readable.pipeThrough(new DecompressionStream("gzip")).pipeThrough(new UntarStream())`
- Preserve executable bit on extracted files
- Auto-detect if tarball has single top-level directory → strip it
- Return final extracted directory path

Tests to write in `main/tests/tar_test.js`:
- [ ] Create test tarball fixture (use Deno.Command to run tar)
- [ ] Extract .tar.gz successfully
- [ ] Strip top-level directory correctly
- [ ] Preserve file permissions
- [ ] Handle nested directories

---

### STEP 3: Create main/nar_hash.js (4-6 hours)
File to create: `main/nar_hash.js`

Functions needed:
- `hashDirectory(dirPath)` - Compute NAR hash of directory
- `serializeNAR(path)` - Serialize file/dir/symlink in NAR format
- `hashFile(filePath)` - Hash single file

Implementation approach (2 phases):
**Phase 1 (quick)**: Try `nix hash path <dir>` using Deno.Command, fall back to Phase 2 if Nix not installed
**Phase 2 (complete)**: Implement NAR serialization in pure JS:
1. Walk directory tree recursively
2. Sort entries alphabetically at each level
3. For files: serialize (type, executable-bit, size, contents)
4. For directories: serialize (type, sorted entries)
5. For symlinks: serialize (type, target)
6. Hash the serialization with SHA256 from tools/hashing.js

Return format: `"sha256:abc123..."` (with prefix)

Tests to write in `main/tests/nar_hash_test.js`:
- [ ] Hash simple directory with few files
- [ ] Verify determinism (same dir → same hash)
- [ ] Compare with `nix hash path` output if available
- [ ] Handle empty directories
- [ ] Handle symlinks

---

### STEP 4: Create main/store_manager.js (2-3 hours)
File to create: `main/store_manager.js`

Constants:
- `STORE_DIR = ~/.cache/denix/store` (use Deno.env.get("HOME"))
- `CACHE_FILE = ~/.cache/denix/cache.json`

Functions needed:
- `ensureStoreDirectory()` - Create store dir if missing
- `computeFetchStorePath(narHash, name)` - Use tools/store_path.js to compute path
  - Format: `fixed:out:sha256:<narHash>:${STORE_DIR}:${name}`
- `atomicMove(srcPath, destPath)` - Use Deno.rename() for atomic move
- `getCachedPath(cacheKey)` - Check cache.json for existing store path
- `setCachedPath(cacheKey, storePath)` - Save to cache.json
- `withLock(lockPath, fn)` - Acquire exclusive lock, run fn, release
  - Use `Deno.open(lockPath, {create: true}).lock(true)` and unlock in finally

Cache format (cache.json):
```json
{
  "https://example.com/foo.tar.gz:sha256:abc": "/path/to/store/xyz-foo",
  ...
}
```

Tests to write in `main/tests/store_manager_test.js`:
- [ ] ensureStoreDirectory creates dir
- [ ] computeFetchStorePath generates valid paths
- [ ] atomicMove works
- [ ] getCachedPath/setCachedPath work
- [ ] withLock prevents concurrent access

---

### STEP 5: Implement builtins.fetchTarball in runtime.js (2-3 hours)
File to modify: `main/runtime.js` line 745

Replace the NotImplemented error with:
```javascript
"fetchTarball": async (args) => {
  // 1. Parse args: string URL or {url, sha256?, name?}
  let url, sha256, name;
  if (typeof args === "string" || args instanceof InterpolatedString) {
    url = requireString(args);
    name = extractNameFromUrl(url);
  } else {
    url = requireString(args["url"]);
    sha256 = args["sha256"] ? requireString(args["sha256"]) : null;
    name = args["name"] ? requireString(args["name"]) : extractNameFromUrl(url);
  }

  // 2. Check cache
  const cacheKey = `${url}:${sha256 || ""}`;
  const cached = await getCachedPath(cacheKey);
  if (cached && await exists(cached)) {
    return new Path(cached);
  }

  // 3. Download
  const tempTar = `${Deno.makeTempDirSync()}/download.tar.gz`;
  await downloadWithRetry(url, tempTar);

  // 4. Extract
  const tempDir = `${Deno.makeTempDirSync()}/extracted`;
  await extractTarball(tempTar, tempDir);

  // 5. Hash
  const narHash = await hashDirectory(tempDir);

  // 6. Verify sha256 if provided
  if (sha256 && !narHash.endsWith(sha256)) {
    throw new Error(`Hash mismatch: expected ${sha256}, got ${narHash}`);
  }

  // 7. Move to store
  const storePath = computeFetchStorePath(narHash, name);
  await atomicMove(tempDir, storePath);
  await setCachedPath(cacheKey, storePath);

  // 8. Return Path object
  return new Path(storePath);
}
```

Add imports at top of runtime.js:
```javascript
import { downloadWithRetry, extractNameFromUrl } from "./fetcher.js";
import { extractTarball } from "./tar.js";
import { hashDirectory } from "./nar_hash.js";
import { ensureStoreDirectory, computeFetchStorePath, getCachedPath, setCachedPath, atomicMove } from "./store_manager.js";
```

Tests to write in `main/tests/builtins_fetchtarball_test.js`:
- [ ] Fetch small tarball from public URL
- [ ] Verify caching (second call instant)
- [ ] SHA256 verification with correct hash
- [ ] SHA256 mismatch throws error
- [ ] Invalid URL throws descriptive error
- [ ] Both arg formats work (string and object)

---

## After fetchTarball - Remaining 9 Builtins

### 6. builtins.fetchurl (1-2 days)
Location: runtime.js:742
Requirements:
- Reuse main/fetcher.js for download
- Reuse main/store_manager.js for store operations
- No extraction needed (single file)
- Verify SHA256 of file directly
- Return Path object

### 7. builtins.path (1-2 days)
Location: runtime.js:923
Requirements:
- Parse params: path, name?, filter?, recursive=true, sha256?
- Copy local path to temp dir (apply filter if provided)
- Hash with NAR
- Verify sha256 if provided
- Move to store
- Return Path object

### 8. builtins.filterSource (1 day)
Location: runtime.js:1279
Requirements:
- Takes filter function and path
- Delegates to builtins.path with filter parameter
- Return result from path

### 9. builtins.toJSON for Path (1 hour)
Location: runtime.js:338
Requirements:
- Convert Path to string representation
- Return JSON-encoded string

### 10. builtins.fetchGit (1-2 weeks)
Location: runtime.js:748
Requirements:
- Shell out to `git clone` using Deno.Command
- Parse params: url, ref, rev, submodules?, shallow?
- Clone to temp dir
- Remove .git directory
- Hash with NAR
- Move to store
- Return attrset with {outPath, rev, shortRev, etc.}

### 11. builtins.fetchTree (1 week)
Location: runtime.js:754
Requirements:
- Detect type from URL scheme or type param
- Delegate to fetchTarball, fetchGit, or fetchurl
- Return unified attrset

### 12. builtins.fetchMercurial (LOW PRIORITY)
Location: runtime.js:751
Requirements: Shell out to `hg clone`, similar to fetchGit

### 13. builtins.fetchClosure (VERY LOW PRIORITY)
Location: runtime.js:757
Requirements: Needs binary cache protocol implementation

### 14. builtins.getFlake (VERY LOW PRIORITY)
Location: runtime.js:1168
Requirements: Needs flake.lock parsing and input resolution

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

### Dependencies Already Available
- `tools/store_path.js` - Store path computation ✅
- `tools/hashing.js` - SHA256 and other hashes ✅
- `@std/tar` from Deno standard library ✅
- `DecompressionStream` from Web APIs ✅

---

## Current Test Status
All 73 test suites passing:
- 87 translator tests ✅
- 170+ runtime tests ✅
- 49 import system tests ✅
- 15+ nixpkgs lib tests ✅

No blockers. Ready to start Step 1 (main/fetcher.js).
