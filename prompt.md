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

**Tasks**:
- [ ] Create `helpers/store.js` module
- [ ] Implement store path computation for fixed-output derivations
  - Formula: `/nix/store/<hash>-<name>` where hash = truncated SHA256 of derivation
  - See: https://nixos.org/manual/nix/stable/protocols/store-path.html
- [ ] Implement file integrity verification (SHA256 hash checking)
- [ ] Create /nix/store directory if needed (with proper permissions)
- [ ] Implement atomic file operations (write to temp, then move)
- [ ] Add store path registry (map hash → path)

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
- [ ] Add retry logic with exponential backoff (3 retries max)
- [ ] Handle redirects (follow up to 10 redirects)
- [ ] Stream download to temp file (don't load into memory)
- [ ] Verify SHA256 hash of downloaded file
- [ ] Move verified file to /nix/store with computed path
- [ ] Return store path
- [ ] Handle these parameters:
  - `url` (required) - URL to download
  - `sha256` (required) - Expected hash
  - `name` (optional) - Name for store path
  - `executable` (optional) - Make file executable

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

**Tasks**:
- [ ] Find tar extraction library (check esm.sh for tar.js or similar)
- [ ] Implement tarball download (reuse fetchFile logic)
- [ ] Extract to temporary directory
- [ ] Compute hash of extracted directory tree (not tarball itself!)
- [ ] Verify hash matches expected
- [ ] Move extracted content to /nix/store
- [ ] Handle these formats:
  - .tar.gz
  - .tar.bz2
  - .tar.xz
  - .tar (uncompressed)
  - .zip (bonus)

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
│   ├── literals.nix
│   ├── literals.js
│   ├── operators.nix
│   ├── operators.js
│   └── functions.nix
├── 02_intermediate/
│   ├── let_expressions.nix
│   ├── let_expressions.js
│   ├── rec_attrsets.nix
│   └── string_interpolation.nix
├── 03_nixpkgs_patterns/
│   ├── pipe.nix (from lib.trivial)
│   ├── pipe.js
│   ├── list_operations.nix
│   └── attrset_operations.nix
└── 04_advanced/
    ├── fixed_point.nix (lib.fix usage)
    └── overlays.nix (extends pattern)
```

### Tasks

- [ ] Create examples/ directory
- [ ] Create examples/README.md with:
  - How to run translator
  - How to verify examples
  - Explanation of translation patterns
- [ ] Add 10-15 example pairs extracted from tests
- [ ] Add comments explaining tricky translations
- [ ] Create script to verify all examples translate correctly
- [ ] Add examples to main README.md

## 3. nixpkgs.lib Testing

**Current**: 11/34 lib files tested (32%)

### Remaining Files to Test

**Easy wins** (can test standalone):
- [ ] debug.nix - debugging utilities
- [ ] generators.nix - JSON/YAML generators
- [ ] derivations.nix - derivation helpers
- [ ] licenses.nix - license data
- [ ] cli.nix - CLI utilities

**Need lib context** (circular dependencies):
- [ ] fixed-points.nix - lib.fix, lib.extends
- [ ] trivial.nix - core utilities
- [ ] lists.nix - list operations
- [ ] attrsets.nix - attrset operations
- [ ] asserts.nix - assertions

**Complex/deferred**:
- modules.nix - module system (very complex)
- types.nix - type system (very complex)
- sources.nix - needs fetch* builtins

## Summary of Immediate Tasks

**Week 1-2**:
1. Implement store path system (helpers/store.js)
2. Implement fetchurl (helpers/fetch.js + runtime.js)
3. Create examples directory with 5-10 examples
4. Test fetchurl thoroughly

**Week 3-4**:
1. Find and integrate tar extraction library
2. Implement fetchTarball (helpers/tarball.js + runtime.js)
3. Add more examples (total 10-15)
4. Test fetchTarball thoroughly
5. Test 3-5 more nixpkgs.lib files

**After that**:
- Reassess what's needed in runtime.js
- Consider fetchGit implementation
- Continue nixpkgs.lib testing
- Performance optimization
