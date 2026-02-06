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
| **toJSON (Path)** | NOT IMPLEMENTED | IMMEDIATE | 30 minutes | https://noogle.dev/f/builtins/toJSON |
| **fetchurl** | NOT IMPLEMENTED | HIGH | 1-2 days | https://noogle.dev/f/builtins/fetchurl |
| **path** | NOT IMPLEMENTED | HIGH | 1-2 days | https://noogle.dev/f/builtins/path |
| **filterSource** | NOT IMPLEMENTED | MEDIUM | 1 day | https://noogle.dev/f/builtins/filterSource |
| **fetchGit** | NOT IMPLEMENTED | MEDIUM | 1-2 weeks | https://noogle.dev/f/builtins/fetchGit |
| **fetchTree** | NOT IMPLEMENTED | LOW | 1 week | https://noogle.dev/f/builtins/fetchTree |
| **fetchMercurial** | NOT IMPLEMENTED | LOW | 1 week | https://noogle.dev/f/builtins/fetchMercurial |
| **fetchClosure** | NOT IMPLEMENTED | VERY LOW | TBD | https://noogle.dev/f/builtins/fetchClosure |
| **getFlake** | NOT IMPLEMENTED | DEFER | TBD | https://noogle.dev/f/builtins/getFlake |

**9 builtins remaining to implement** (8 network/store + 1 toJSON fix)

---

## START HERE - Next Task

**Implement: toJSON support for Path objects (QUICK WIN - 30 minutes)**

**READ FIRST**: https://noogle.dev/f/builtins/toJSON

Location: main/runtime.js:344
Current: Throws NotImplemented error when toJSON receives a Path
Goal: Convert Path to string and return JSON

Steps:
1. Read documentation: https://noogle.dev/f/builtins/toJSON
2. Understand how Nix handles Path objects in toJSON
3. Open main/runtime.js
4. Find line 344 (inside toJSON function)
5. Replace the NotImplemented throw with:
   ```javascript
   if (value instanceof Path) {
       return JSON.stringify(value.toString())
   }
   ```
6. Create test file: main/tests/builtins_tojson_path_test.js
7. Test that builtins.toJSON(builtins.fetchTarball("...")) works
8. Verify behavior matches Nix 2.18 documentation

Why this first: It's trivial (5 minutes of code) and unblocks testing other fetchers.

**After toJSON is done, implement builtins.fetchurl (see section below)**

---

## What is NOT Implemented (9 items total)

### 1. builtins.fetchurl (NEXT PRIORITY - 1-2 days)

**READ FIRST**: https://noogle.dev/f/builtins/fetchurl

Location: runtime.js:748
Status: NOT IMPLEMENTED (throws NotImplemented error)
Requirements:
- Parse arguments: url (string or {url, sha256?, name?})
- Reuse main/fetcher.js for download (downloadWithRetry function)
- Reuse main/store_manager.js for store operations
- No extraction needed (single file)
- Verify SHA256 of downloaded file directly
- Move file to store at computed store path
- Return Path object pointing to store path

Implementation steps:
1. Parse url argument (support both string and object formats)
2. Extract name from URL or use provided name
3. Check cache first (getCachedPath)
4. If not cached: downloadWithRetry to temp location
5. Verify sha256 if provided
6. Compute store path using computeFetchStorePath
7. Move file to store using atomicMove
8. Update cache using setCachedPath
9. Return new Path(storePath)

Test requirements:
- String URL argument
- Object argument with URL
- Object argument with URL + sha256
- Object argument with URL + name
- Caching works (second call uses cache)
- SHA256 validation (mismatch throws error)
- Invalid URL throws error

### 2. builtins.path (1-2 days)

**READ FIRST**: https://noogle.dev/f/builtins/path

Location: runtime.js:995
Status: NOT IMPLEMENTED (throws NotImplemented error)
Requirements:
- Parse params: {path, name?, filter?, recursive=true, sha256?}
- Copy local path to temp dir (apply filter if provided)
- Hash directory with NAR (using main/nar_hash.js)
- Verify sha256 if provided (throw if mismatch)
- Compute store path
- Move to store using atomicMove
- Return Path object

Implementation steps:
1. Parse args object: requireAttrs(args, ["path"])
2. Get source path (convert to string)
3. Determine name (from args.name or basename of path)
4. Copy files to temp directory
   - If filter provided: call filter(path, type) for each entry
   - If recursive=false: only top-level files
5. Hash temp directory using hashDirectory (NAR format)
6. If sha256 provided: verify match
7. Compute store path using hash
8. Move temp dir to store
9. Return new Path(storePath)

Test requirements:
- Copy single file
- Copy directory (recursive=true)
- Copy with filter function
- Verify sha256 match
- Verify sha256 mismatch throws error
- Custom name parameter

### 3. builtins.filterSource (1 day)

**READ FIRST**: https://noogle.dev/f/builtins/filterSource

Location: runtime.js:1351
Status: NOT IMPLEMENTED (throws NotImplemented error)
Requirements:
- Takes filter function and path
- Delegates to builtins.path with filter parameter
- Return result from path

Implementation steps:
1. Parse args: filter (function), path (string or Path)
2. Call builtins.path({path, filter, recursive: true})
3. Return result

This is simple - just a wrapper around builtins.path.
Implement AFTER builtins.path is complete.

Test requirements:
- Filter out specific files by name
- Filter by file type (regular/directory/symlink)
- Result is same as builtins.path with filter

### 4. builtins.toJSON for Path (QUICK WIN - 1 hour)
Location: runtime.js:344
Status: NOT IMPLEMENTED (throws NotImplemented error in toJSON function)
Requirements:
- Check if value is Path instance
- Convert Path to string (path.toString())
- Return JSON.stringify(pathString)

Implementation steps:
1. In toJSON function (around line 344), add check: `if (value instanceof Path)`
2. Convert to string: `const pathStr = value.toString()`
3. Return JSON.stringify(pathStr)

This is trivial. The Path class already has toString().
Can be implemented in 5 minutes.

Test requirements:
- builtins.toJSON(builtins.fetchTarball("...")) returns JSON string
- String contains /nix/store path

### 5. builtins.fetchGit (COMPLEX - 1-2 weeks)

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

### 6. builtins.fetchTree (EXPERIMENTAL - 1 week)

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

### 7. builtins.fetchMercurial (LOW PRIORITY)

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

### 8. builtins.fetchClosure (VERY LOW PRIORITY - DON'T IMPLEMENT YET)

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

### 9. builtins.getFlake (DEFER - NOT CRITICAL)

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

**IMMEDIATE (Do First - 1 hour total):**
1. builtins.toJSON for Path (runtime.js:344) - 30 minutes - https://noogle.dev/f/builtins/toJSON

**HIGH PRIORITY (Core fetchers - 3-5 days):**
2. builtins.fetchurl (runtime.js:748) - 1-2 days - https://noogle.dev/f/builtins/fetchurl
3. builtins.path (runtime.js:995) - 1-2 days - https://noogle.dev/f/builtins/path
4. builtins.filterSource (runtime.js:1351) - 1 day (depends on #3) - https://noogle.dev/f/builtins/filterSource

**MEDIUM PRIORITY (Git integration - 1-2 weeks):**
5. builtins.fetchGit (runtime.js:820) - 1-2 weeks - https://noogle.dev/f/builtins/fetchGit

**LOW PRIORITY (Advanced/Experimental):**
6. builtins.fetchTree (runtime.js:826) - depends on #2,#3,#5 - https://noogle.dev/f/builtins/fetchTree
7. builtins.fetchMercurial (runtime.js:823) - rarely used - https://noogle.dev/f/builtins/fetchMercurial
8. builtins.fetchClosure (runtime.js:829) - very complex - https://noogle.dev/f/builtins/fetchClosure
9. builtins.getFlake (runtime.js:1240) - defer indefinitely - https://noogle.dev/f/builtins/getFlake

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

### For builtins.fetchurl (AFTER toJSON is done)

**READ DOCUMENTATION FIRST**: https://noogle.dev/f/builtins/fetchurl

**This should be nearly identical to fetchTarball, but simpler!**

Copy the pattern from fetchTarball (lines 750-818), but:
1. **Remove extraction step** - no extractTarball() call needed
2. **Hash the file directly** - use sha256() on file bytes instead of NAR hash
3. **Simpler validation** - compare file hash directly (no NAR format)
4. **Same structure otherwise**:
   - Parse args (string or {url, sha256?, name?})
   - Check cache with getCachedPath()
   - Download with downloadWithRetry()
   - Validate sha256 if provided
   - Compute store path
   - atomicMove to store
   - setCachedPath for caching
   - Return new Path(storePath)

Key differences from fetchTarball:
- fetchTarball: downloads → extracts → NAR hash → store
- fetchurl: downloads → file hash → store

Code template:
```javascript
"fetchurl": async (args) => {
    // 1. Parse args (same as fetchTarball)
    let url, sha256, name;
    if (typeof args === "string" || args instanceof InterpolatedString) {
        url = requireString(args);
        name = extractNameFromUrl(url);
    } else {
        url = requireString(args["url"]);
        sha256 = args["sha256"] ? requireString(args["sha256"]) : null;
        name = args["name"] ? requireString(args["name"]) : extractNameFromUrl(url);
    }

    await ensureStoreDirectory();

    // 2. Check cache (same as fetchTarball)
    const cacheKey = `${url}:${sha256 || ""}`;
    const cached = await getCachedPath(cacheKey);
    if (cached && await exists(cached)) {
        return new Path(cached);
    }

    // 3. Download file (same as fetchTarball)
    const tempFile = `${await Deno.makeTempDir()}/download`;
    await downloadWithRetry(url, tempFile);

    // 4. Validate SHA256 if provided (same as fetchTarball)
    if (sha256) {
        const { validateSha256 } = await import("./fetcher.js");
        await validateSha256(tempFile, sha256);
    }

    // 5. Compute hash of file (DIFFERENT - use file hash not NAR)
    const fileBytes = await Deno.readFile(tempFile);
    const fileHash = "sha256:" + sha256Hex(fileBytes);

    // 6. Compute store path (same as fetchTarball)
    const storePath = computeFetchStorePath(fileHash, name);

    // 7. Move to store (DIFFERENT - move file not directory)
    await Deno.mkdir(storePath, { recursive: true }); // Create parent
    await atomicMove(tempFile, storePath + "/" + name); // Move into dir

    // 8. Cache and return (same as fetchTarball)
    await setCachedPath(cacheKey, storePath);
    return new Path(storePath);
}
```

See main/fetcher.js for downloadWithRetry() function.
See main/store_manager.js for getCachedPath(), setCachedPath(), atomicMove(), exists().
See tools/store_path.js for computeFetchStorePath().

### For builtins.path

**READ DOCUMENTATION FIRST**: https://noogle.dev/f/builtins/path

**Pattern: Copy local files to store with optional filtering**

This is similar to fetchTarball, but source is local filesystem instead of network.

Required steps:
1. **Parse args** - {path, name?, filter?, recursive=true, sha256?}
2. **Create temp directory** for filtered/copied files
3. **Copy files with filtering**:
   - Walk directory tree (use Deno.readDir recursively)
   - For each file/dir: call filter(path, type) if provided
   - Types: "regular", "directory", "symlink"
   - Skip if filter returns false
   - Copy if filter returns true or no filter
4. **Hash with NAR** - use hashDirectory() from nar_hash.js
5. **Validate sha256** if provided - compare with NAR hash
6. **Compute store path** - use computeFetchStorePath()
7. **Move to store** - use atomicMove()
8. **Return Path object**

Code template:
```javascript
"path": async (args) => {
    // 1. Parse args
    requireAttrSet(args);
    const sourcePath = requireString(args["path"]);
    const name = args["name"] ? requireString(args["name"]) : basename(sourcePath);
    const filter = args["filter"] || null; // Optional predicate function
    const recursive = args["recursive"] !== false; // Default true
    const expectedSha256 = args["sha256"] ? requireString(args["sha256"]) : null;

    await ensureStoreDirectory();

    // 2. Create temp directory
    const tempDir = await Deno.makeTempDir();

    // 3. Copy with filtering
    async function copyFiltered(src, dest) {
        const stat = await Deno.stat(src);
        const type = stat.isFile ? "regular" : stat.isDirectory ? "directory" : "symlink";

        // Apply filter if provided
        if (filter && !filter(src)(type)) {
            return; // Skip this file
        }

        if (stat.isFile) {
            await Deno.copyFile(src, dest);
            // Preserve executable bit
            if (stat.mode & 0o111) {
                await Deno.chmod(dest, 0o755);
            }
        } else if (stat.isDirectory) {
            await Deno.mkdir(dest, { recursive: true });
            if (recursive) {
                for await (const entry of Deno.readDir(src)) {
                    await copyFiltered(
                        `${src}/${entry.name}`,
                        `${dest}/${entry.name}`
                    );
                }
            }
        } else if (stat.isSymlink) {
            const target = await Deno.readLink(src);
            await Deno.symlink(target, dest);
        }
    }

    await copyFiltered(sourcePath, `${tempDir}/${name}`);

    // 4. Hash with NAR
    const narHash = await hashDirectory(`${tempDir}/${name}`);

    // 5. Validate sha256 if provided
    if (expectedSha256) {
        const normalized = narHash.replace(/^sha256[:-]/, '');
        const expectedNormalized = expectedSha256.replace(/^sha256[:-]/, '');
        if (normalized !== expectedNormalized) {
            throw new Error(
                `Hash mismatch for ${sourcePath}:\n` +
                `  Expected: ${expectedNormalized}\n` +
                `  Actual:   ${normalized}`
            );
        }
    }

    // 6. Compute store path
    const storePath = computeFetchStorePath(narHash, name);

    // 7. Move to store
    await atomicMove(`${tempDir}/${name}`, storePath);

    // 8. Return Path
    return new Path(storePath);
}
```

Helper function needed:
```javascript
function basename(path) {
    return path.split('/').filter(x => x).pop() || '';
}
```

See main/nar_hash.js for hashDirectory() function.
See main/store_manager.js for store operations.
See tools/store_path.js for computeFetchStorePath().

### For builtins.filterSource
This is just a thin wrapper around builtins.path.
Implement after builtins.path is complete.

### For builtins.toJSON (Path support)
This is trivial - just add Path instance check in toJSON function.
Can be done in 5 minutes.

Code to add around line 344:
```javascript
if (value instanceof Path) {
    return JSON.stringify(value.toString());
}
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
