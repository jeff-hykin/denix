# Remaining Work - Denix Runtime

**Last Updated:** 2026-02-06

## Executive Summary

**Current Status:** 93/98 builtins implemented (95% complete)

**Remaining Tasks:** 5 builtins throw NotImplemented errors

**High Priority:** 1 builtin (fetchGit)

**Medium Priority:** 1 builtin (fetchTree)

**Low Priority / Skip:** 3 builtins (fetchMercurial, fetchClosure, getFlake)

## Test Status

- **146 tests passing** across 33 test suites
- **All core functionality working**
- No broken or skipped tests

## Infrastructure Status

All required infrastructure modules exist and are functional:

- ✅ `main/fetcher.js` - HTTP downloads with retry logic
- ✅ `main/tar.js` - Tarball extraction using Deno @std/tar
- ✅ `main/nar_hash.js` - Directory hashing (NAR format)
- ✅ `main/store_manager.js` - Store path management and caching
- ✅ `tools/store_path.js` - Store path computation
- ✅ `tools/hashing.js` - SHA256 and other hash functions

## Unimplemented Builtins

### 1. builtins.fetchGit (HIGH PRIORITY)

**Status:** NOT IMPLEMENTED
**Location:** main/runtime.js line 879
**Priority:** 🔴 HIGH
**Time Estimate:** 14-16 hours over 2-3 days
**Documentation:** https://noogle.dev/f/builtins/fetchGit

**Why This Matters:**
- Required for git dependencies in Nix projects
- Critical for Flakes support
- Used extensively in nixpkgs development
- Blocks fetchTree implementation

**What It Does:**
Clones Git repositories and copies them to the store with metadata (commit hash, revision count, last modified timestamp).

**Input Parameters:**
- url (string, required): Git repository URL
- name (string, optional): Store directory name
- rev (string, optional): Git revision/commit hash
- ref (string, optional): Branch/tag name (default: "HEAD")
- submodules (boolean, optional): Checkout submodules (default: false)
- shallow (boolean, optional): Use shallow clone (default: false)
- allRefs (boolean, optional): Fetch all refs (default: false)

**Return Value:**
Attribute set with: outPath, rev, shortRev, revCount, lastModified, narHash, submodules

**Implementation Plan:**
See prompt.md "START HERE - Next Task" section for detailed 10-phase implementation plan.

**Key Challenges:**
1. Git command execution with proper error handling
2. Parsing git command outputs (commit hashes, timestamps, etc.)
3. Ref name normalization (auto-prefix "refs/heads/")
4. Local directory handling (git ls-files filtering)
5. Cache key construction (URL + ref + rev)

**Required Testing:**
- 13 test cases covering URL variants, caching, errors, metadata extraction
- Test against real public repos
- Verify output matches Nix exactly

---

### 2. builtins.fetchTree (MEDIUM PRIORITY)

**Status:** NOT IMPLEMENTED
**Location:** main/runtime.js line 885
**Priority:** 🟡 MEDIUM
**Time Estimate:** 6-8 hours over 1-2 days
**Documentation:** https://noogle.dev/f/builtins/fetchTree
**Dependency:** Requires fetchGit to be implemented first

**Why This Matters:**
- Experimental unified fetcher interface
- Not critical for basic Nix evaluation
- Provides convenience wrapper around other fetchers

**What It Does:**
Generic interface for fetching from different source types (git, tarball, file). Detects source type from URL and delegates to appropriate fetcher.

**URL Scheme Detection:**
- git+https://, git://, git+ssh:// → type="git"
- https://.../file.tar.gz → type="tarball"
- https://.../file → type="file"
- github:owner/repo → type="github" (shorthand)

**Implementation Plan:**
1. Parse input (URL string or attrset)
2. Detect type from URL scheme if not provided
3. Normalize URL for detected type
4. Delegate to appropriate fetcher:
   - type="git" → builtins.fetchGit
   - type="tarball" → builtins.fetchTarball
   - type="file" → builtins.fetchurl
   - type="github" → transform to git URL and call fetchGit
5. Return unified output format

**Key Challenges:**
- URL scheme regex patterns for each type
- GitHub shorthand parsing: github:owner/repo → https://github.com/owner/repo.git
- Return format normalization (different fetchers have different outputs)

---

### 3. builtins.fetchMercurial (LOW PRIORITY)

**Status:** NOT IMPLEMENTED
**Location:** main/runtime.js line 882
**Priority:** 🟢 LOW
**Time Estimate:** 8-10 hours over 1-2 days
**Note:** Rarely used in modern Nix code

**Why Skip This:**
- Legacy feature (replaced by fetchTree in modern Nix)
- Mercurial is rarely used compared to Git
- Requires `hg` binary to be installed (uncommon)
- No nixpkgs code depends on this

**What It Does:**
Clone Mercurial repository and copy to store with metadata (similar to fetchGit but for hg).

**Recommendation:** Skip unless specifically requested by user.

---

### 4. builtins.fetchClosure (DEFER)

**Status:** NOT IMPLEMENTED
**Location:** main/runtime.js line 888
**Priority:** ⚪ VERY LOW (Experimental)
**Time Estimate:** 40+ hours (very complex, multi-week project)

**Why Defer This:**
- Experimental feature (requires `fetch-closure` feature flag)
- Extremely complex implementation (binary cache protocol, signature verification)
- Rarely used outside of NixOS infrastructure
- Blocks nothing important

**What It Does:**
Fetch store path closures from binary caches with signature verification.

**Implementation Requirements:**
1. Binary cache protocol (HTTP client for .narinfo files)
2. Signature verification (Ed25519 cryptographic operations)
3. NAR download and extraction (full deserialization, not just hashing)
4. Closure resolution (recursive dependency fetching)
5. Content-addressed path handling

**Recommendation:** Do not implement unless explicitly required by user.

---

### 5. builtins.getFlake (DO NOT IMPLEMENT)

**Status:** NOT IMPLEMENTED
**Location:** main/runtime.js line 1423
**Priority:** ⚫ SKIP (Experimental, massive scope)
**Time Estimate:** 80-120+ hours (multi-month project)

**Why Skip This:**
- Experimental feature (requires `flakes` experimental feature flag)
- Massive complexity (flake system, lockfiles, registry, evaluation)
- Basic Nix evaluation works fine without this
- Would require months of development effort

**What It Does:**
Fetch and evaluate complete flakes with their inputs and outputs.

**What Would Be Required:**
1. Flake reference parsing (github:, path:, git+https:, etc.)
2. Flake fetching (uses other fetchers)
3. Lockfile parsing (flake.lock version 7 format)
4. Recursive input resolution
5. Flake evaluation with correct scope
6. Metadata handling
7. Registry client

**Recommendation:** Never implement. Flakes are experimental and this would be months of work for minimal benefit.

---

## Next Steps

### Immediate Priority (This Week)

**Implement builtins.fetchGit**
- Read documentation: https://noogle.dev/f/builtins/fetchGit
- Follow 10-phase implementation plan in prompt.md
- Create comprehensive test suite
- Verify against real git repositories

### After fetchGit (Optional)

**Implement builtins.fetchTree** (only if requested)
- Read documentation: https://noogle.dev/f/builtins/fetchTree
- Implement URL scheme detection
- Delegate to appropriate fetchers
- Test with various URL types

### Long Term (Skip Unless Requested)

- fetchMercurial: Only if user has Mercurial repositories
- fetchClosure: Only if user needs binary cache operations
- getFlake: Never implement (too complex, experimental)

## Success Criteria

**After fetchGit is implemented:**
- Runtime will be 94/98 builtins = 96% complete
- All common Nix use cases will work
- Git dependencies and flakes will be supported

**After fetchTree is implemented (optional):**
- Runtime will be 95/98 builtins = 97% complete
- Unified fetcher interface available

**Final State:**
- 3 builtins will remain unimplemented (fetchMercurial, fetchClosure, getFlake)
- All 3 are experimental, legacy, or extremely complex
- None are required for typical Nix evaluation
- Runtime is effectively complete for practical use

## Resources

- **Detailed Implementation Plan:** See prompt.md (933 lines)
- **Quick Start Guide:** See NEXT_STEPS.md (316 lines)
- **Project Overview:** See README.md
- **Memory/Session History:** See ~/.claude/projects/-Users-jeffhykin-repos-denix/memory/MEMORY.md
- **Official Nix Documentation:** https://nix.dev/manual/nix/2.18/language/builtins
- **Builtin Reference:** https://noogle.dev
