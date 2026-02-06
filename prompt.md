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
- **ONLY FOCUS ON**: Implementing the 8 remaining runtime builtins (NOT 9!)
- **Next Priority**: Implement builtins.fetchurl (see section below)

---

## Remaining 8 Builtins (NOT IMPLEMENTED)

### 1. builtins.fetchurl (NEXT PRIORITY - 1-2 days)
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

## Summary: What to Implement (Priority Order)

**QUICK WIN (Do First - 1 hour total):**
1. builtins.toJSON for Path (runtime.js:344) - 1 hour

**HIGH PRIORITY (Core fetchers - 3-5 days):**
2. builtins.fetchurl (runtime.js:748) - 1-2 days
3. builtins.path (runtime.js:995) - 1-2 days
4. builtins.filterSource (runtime.js:1351) - 1 day (depends on #3)

**MEDIUM PRIORITY (Git integration - 1-2 weeks):**
5. builtins.fetchGit (runtime.js:820) - 1-2 weeks

**LOW PRIORITY (Advanced/Experimental):**
6. builtins.fetchTree (runtime.js:826) - depends on #2,#3,#5
7. builtins.fetchMercurial (runtime.js:823) - rarely used
8. builtins.fetchClosure (runtime.js:829) - very complex
9. builtins.getFlake (runtime.js:1240) - defer indefinitely

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
- `main/fetcher.js` - HTTP download with retry (154 lines) ✅
- `main/tar.js` - Tarball extraction (168 lines) ✅
- `main/nar_hash.js` - NAR hashing (244 lines) ✅
- `main/store_manager.js` - Store management (193 lines) ✅
- `tools/store_path.js` - Store path computation ✅
- `tools/hashing.js` - SHA256 and other hashes ✅
- `jsr:@std/tar@0.1.10` - Deno standard library ✅
- `DecompressionStream` - Web APIs ✅

---

## Implementation Notes

### For builtins.fetchurl
See main/fetcher.js for downloadWithRetry() function.
See main/store_manager.js for getCachedPath(), setCachedPath(), atomicMove(), exists().
See tools/store_path.js for computeFetchStorePath().

### For builtins.path
See main/nar_hash.js for hashDirectory() function.
See main/store_manager.js for store operations.
Need to implement recursive directory copy with optional filter.

### For builtins.filterSource
This is just a thin wrapper around builtins.path.
Implement after builtins.path is complete.

### For builtins.toJSON (Path support)
This is trivial - just add Path instance check in toJSON function.
Can be done in 5 minutes.
