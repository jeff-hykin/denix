# Remaining Work: Implement fetchGit and optionally fetchTree

## 📊 QUICK STATUS

**Runtime:** 93/98 builtins implemented (95% complete)
**Tests:** 146 tests passing across 33 test suites
**Infrastructure:** All modules exist (fetcher.js, tar.js, nar_hash.js, store_manager.js)

**WHAT REMAINS:**
- 5 builtins throw NotImplemented errors
- 1 is high priority (fetchGit)
- 1 is medium priority (fetchTree - requires fetchGit first)
- 3 should be skipped (fetchMercurial, fetchClosure, getFlake)

**YOUR TASK:** Implement builtins.fetchGit (14-16 hours)

---

## 🛑 STOP! READ THIS BEFORE DOING ANYTHING 🛑

**CURRENT STATE: 93/98 builtins implemented (95% complete)**

**REMAINING WORK:**
- 5 builtins still throw NotImplemented errors
- All 5 are advanced fetchers or experimental features
- None are required for basic Nix evaluation

**MANDATORY WORK ORDER - IMPLEMENT IN THIS SEQUENCE:**

1. **fetchGit** (HIGH PRIORITY) - Most important remaining fetcher
   - Required for: Flakes, git dependencies, nixpkgs development
   - Estimated: 14-16 hours over 2-3 days
   - Status: NOT IMPLEMENTED

2. **fetchTree** (MEDIUM PRIORITY) - Experimental unified fetcher
   - Required for: Generic source fetching (rarely used)
   - Depends on: fetchGit must be implemented first
   - Estimated: 6-8 hours over 1-2 days
   - Status: NOT IMPLEMENTED

3. **fetchMercurial** (LOW PRIORITY) - Legacy Mercurial support
   - Required for: Mercurial repositories (very rare)
   - Estimated: 8-10 hours over 1-2 days
   - Status: NOT IMPLEMENTED

4. **fetchClosure** (DEFER) - Binary cache fetcher
   - Required for: Binary cache operations (experimental)
   - Estimated: 40+ hours (very complex)
   - Status: NOT IMPLEMENTED

5. **getFlake** (DO NOT IMPLEMENT) - Full flake system
   - Required for: Complete flake evaluation (massive undertaking)
   - Estimated: 80-120+ hours (months of work)
   - Status: NOT IMPLEMENTED

**ABSOLUTE RULES FOR THIS DOCUMENT:**
- ❌ NEVER add checkboxes (✅) showing completed work
- ❌ NEVER report achievements ("we implemented X")
- ❌ NEVER say something is "done" or "complete"
- ✅ ONLY list what is NOT implemented yet
- ✅ ONLY list what NEEDS to be done
- ✅ Remove any achievement language immediately

**YOUR CURRENT TASK:**
Implement fetchGit. This is the only high-priority task remaining.

---

## ⚠️ CRITICAL: READ THIS FIRST - MISSION STATEMENT ⚠️

**Your job is to focus on what is NOT implemented and NOT working. Only report what remains to be done. NEVER report what you accomplished. You are a senior level developer, there is no such thing as a blocker. Break down large tasks into smaller tasks.**

**Before executing what is below, filter out any achievements from this document. Only keep remaining/unsolved tasks. Add detail to each task if needed.**

**ABSOLUTE RULES - NO EXCEPTIONS:**
- ❌ NEVER add completion checkboxes (✅) to this document
- ❌ NEVER report completed work or achievements
- ❌ NEVER say "we implemented X" or "completed Y"
- ✅ ONLY report what is NOT working, NOT implemented, or NEEDS to be done
- ✅ ALWAYS remove any achievement-oriented content immediately
- ✅ ALWAYS base implementations on official Nix documentation at https://noogle.dev
- ✅ YOU ARE A SENIOR DEVELOPER - There is no such thing as a "blocker", only tasks to break down further

## 🚫 WORK PRIORITY ORDER 🚫

**Phase 1: High Priority (Required)**
1. Implement builtins.fetchGit
   - Time estimate: 14-16 hours over 2-3 days
   - Status: NOT IMPLEMENTED
   - Blocking: fetchTree cannot be implemented until this is done
   - Location: main/runtime.js line 879

**Phase 2: Medium Priority (Optional)**
2. Implement builtins.fetchTree
   - Time estimate: 6-8 hours over 1-2 days
   - Status: NOT IMPLEMENTED
   - Requires: fetchGit must be implemented first
   - Location: main/runtime.js line 885
   - Note: Experimental feature, not critical for basic Nix

**Phase 3: Low Priority (Skip Unless Requested)**
3. fetchMercurial - Rarely used legacy Mercurial support (8-10 hours)
4. fetchClosure - Experimental binary cache feature (40+ hours, very complex)
5. getFlake - Complete flake system (80-120+ hours, massive undertaking)

**CURRENT BLOCKERS TO RESOLVE (in order):**
- ❌ fetchGit NOT implemented in runtime.js (BLOCKING everything else)
- ❌ fetchTree NOT implemented in runtime.js (BLOCKED by fetchGit)
- ❌ 3 other experimental fetchers NOT implemented (lower priority)

**WHAT THIS MEANS FOR YOU:**
- Your ONLY job right now is implementing fetchGit
- Do NOT work on translator features
- Do NOT work on nix-lib tests
- Do NOT work on documentation or examples
- FOCUS: Implement fetchGit, then fetchTree, then move on

**After implementing fetchGit and fetchTree, the runtime will be 95/98 = 97% complete.**

## 📚 DOCUMENTATION REQUIREMENTS - MANDATORY 📚

**🚨 STOP! BEFORE implementing ANY builtin function, you MUST: 🚨**

1. **READ NIX DOCUMENTATION FIRST**: Visit https://noogle.dev/f/builtins/<function_name>
   - Read the entire page carefully
   - Study ALL examples provided
   - Note ALL parameters (required and optional)
   - Note expected return types and structure
   - Note edge cases and error behavior
   - **WRITE DOWN what you learned** from the docs before coding

2. **BASE IMPLEMENTATION ON NIX BEHAVIOR**: Match official Nix 2.18 behavior exactly
   - Your implementation MUST match what's documented at https://noogle.dev
   - Test against the examples shown in documentation
   - Verify parameter names match exactly
   - Verify return structure matches exactly
   - Verify error messages match Nix behavior

3. **DO NOT GUESS**: If unclear, read documentation again or search for more examples
   - Never assume behavior based on your intuition
   - Never copy from memory or prior experience
   - Always verify against https://noogle.dev
   - When in doubt, read the docs again!
   - Still confused? Read Nix source code: https://github.com/NixOS/nix

4. **VERIFY YOUR IMPLEMENTATION**: After coding, check against docs again
   - Does your function signature match the docs?
   - Do your parameter names match?
   - Does your return structure match?
   - Do your error messages match Nix behavior?
   - Have you tested all examples from the docs?

**CRITICAL**: Implementations based on guesswork instead of documentation will be REJECTED and must be REWRITTEN. Read https://noogle.dev/f/builtins/<function_name> FIRST!

**COMMON MISTAKE**: Starting to code immediately without reading documentation. DON'T DO THIS! Reading docs takes 10 minutes. Rewriting incorrect implementations takes hours.

## Remaining Work Summary

**Runtime Status: 93/98 builtins implemented**

**5 builtins remain unimplemented:**
1. fetchGit - NOT IMPLEMENTED (required for git dependencies, flakes)
2. fetchTree - NOT IMPLEMENTED (requires fetchGit first, experimental)
3. fetchMercurial - NOT IMPLEMENTED (legacy, rarely used)
4. fetchClosure - NOT IMPLEMENTED (experimental, very complex)
5. getFlake - NOT IMPLEMENTED (experimental, massive scope)

**Infrastructure Status:**
- fetcher.js - EXISTS (HTTP downloads with retry)
- tar.js - EXISTS (tarball extraction)
- nar_hash.js - EXISTS (directory hashing)
- store_manager.js - EXISTS (store path management)

**Current Priority:**
- Implement fetchGit (14-16 hours)
- All other tasks are lower priority or should be skipped

## 🔧 NPM MODULE USAGE - YOU ARE ALLOWED TO USE NPM 🔧

**YES, YOU CAN USE NPM MODULES!** Import them through esm.sh:

- ✅ **ALLOWED**: You can use npm modules through `https://esm.sh/NPM_MODULE_NAME@VERSION`
- ✅ **HOW TO USE**: Just import: `import pkg from "https://esm.sh/package-name@1.0.0"`
- ⚠️ **WARNING**: Not all npm modules work through esm.sh (Node-specific APIs may fail)
- ✅ **TEST FIRST**: Always test the import works before writing code that depends on it
- ✅ **PREFER DENO FIRST**: Use Deno standard library (jsr:@std/*) when possible
- ✅ **CHECK BUILT-INS**: Check if Deno has built-in APIs (crypto, fetch, etc.) before using npm

Example:
```javascript
// You ARE allowed to do this:
import simpleGit from "https://esm.sh/simple-git@3.20.0";
import tar from "https://esm.sh/tar@6.2.0";

// Test the import works, then use it in your code
```

**Remember**: esm.sh is a valid way to use npm packages in Deno. Don't avoid npm if it helps solve the problem!

## 🚫 REPORTING RULES - NO ACHIEVEMENTS ALLOWED 🚫

- ❌ **NEVER** report what you accomplished or completed
- ❌ **NEVER** include completion checkboxes (✅)
- ❌ **NEVER** describe past work or achievements
- ❌ **NEVER** say "we implemented X"
- ✅ **ONLY** report remaining tasks and what is NOT working
- ✅ **ONLY** keep unimplemented features in this document
- ✅ **ALWAYS** add implementation details to each remaining task

---

## ⚠️ BEFORE YOU START - MANDATORY CHECKLIST ⚠️

Before implementing ANY builtin function, you MUST complete these steps:

1. **READ THE DOCUMENTATION**: Go to https://noogle.dev/f/builtins/<function_name> and read it completely
2. **UNDERSTAND THE BEHAVIOR**: Study the examples and expected behavior in the documentation
3. **CHECK EXISTING INFRASTRUCTURE**: Review what tools already exist (fetcher.js, store_manager.js, nar_hash.js, etc.)
4. **BREAK DOWN THE TASK**: Split implementation into 1-2 hour chunks
5. **TEST AS YOU GO**: Write tests before or alongside implementation (TDD recommended)

**NEVER START CODING WITHOUT READING THE DOCUMENTATION FIRST!**

The documentation at https://noogle.dev shows:
- Exact function signatures
- All parameters (required and optional)
- Expected return types
- Example usage
- Edge case behavior

**Your implementation MUST match the documented behavior exactly. Read the docs first!**

---

## 📊 REMAINING WORK - 5 BUILTINS NOT IMPLEMENTED 📊

**Current Status: 93/98 builtins implemented (95% complete)**

| Builtin | Status | Priority | Est. Time | Documentation Link | Blocks |
|---------|--------|----------|-----------|-------------------|--------|
| **fetchGit** | NOT IMPL | 🔴 HIGH | 14-16 hrs | https://noogle.dev/f/builtins/fetchGit | fetchTree |
| **fetchTree** | NOT IMPL | 🟡 MEDIUM | 6-8 hrs | https://noogle.dev/f/builtins/fetchTree | (experimental) |
| **fetchMercurial** | NOT IMPL | 🟢 LOW | 8-10 hrs | https://noogle.dev/f/builtins/fetchMercurial | (rarely used) |
| **fetchClosure** | NOT IMPL | ⚪ DEFER | 40+ hrs | https://noogle.dev/f/builtins/fetchClosure | (experimental) |
| **getFlake** | NOT IMPL | ⚫ SKIP | 80+ hrs | https://noogle.dev/f/builtins/getFlake | (months of work) |

**What remains to be done:**
- 5 builtins throw NotImplemented errors (listed above)
- fetchGit is the only high-priority task remaining
- fetchTree depends on fetchGit being implemented first
- The other 3 are low-priority or should be skipped entirely

---

## START HERE - Next Task

**IMMEDIATE TASK: Implement builtins.fetchGit**

**⚠️ STEP 0 - MANDATORY - READ DOCUMENTATION FIRST ⚠️**:

**BEFORE YOU WRITE A SINGLE LINE OF CODE:**
1. Go to https://noogle.dev/f/builtins/fetchGit
2. Read the ENTIRE page carefully (every word, every example)
3. Write down what you learned about:
   - Required parameters
   - Optional parameters and their defaults
   - Return value structure
   - Error behavior
   - Example usage patterns
4. Go to https://nix.dev/manual/nix/2.18/language/builtins and read the fetchGit section
5. Compare both sources to ensure you understand completely

**DO NOT PROCEED until you have read and understood the official documentation.**

Your implementation MUST match the documented behavior EXACTLY. Guessing leads to bugs that waste hours fixing later. Reading docs takes 10 minutes and prevents hours of debugging.

**TEST YOUR UNDERSTANDING:**
Before coding, ask yourself:
- Can I list all parameters and their defaults?
- Do I know exactly what the return value looks like?
- Do I understand how error cases are handled?
- Have I seen all the examples in the docs?

If you can't answer "yes" to all of these, read the documentation again!

Location: main/runtime.js (search for fetchGit - currently throws NotImplemented)
Goal: Clone Git repositories and copy to store with metadata

Why this is critical:
- Most important remaining fetcher
- Used extensively in Flakes, nixpkgs overlays, private repos, pinned dependencies
- Blocks fetchTree implementation (which depends on this)

Implementation Requirements (MUST match official Nix 2.18 documentation at https://noogle.dev/f/builtins/fetchGit):

**Official Documentation**: https://nix.dev/manual/nix/2.18/language/builtins (see fetchGit section)

### Phase 1: Argument Parsing (1 hour)
- Accept URL string OR attribute set
- Required: url (string)
- Optional with defaults:
  - name (default: basename of url)
  - rev (default: tip of ref)
  - ref (default: "HEAD", auto-prefix "refs/heads/" unless starts with "refs/")
  - submodules (default: false)
  - shallow (default: false)
  - allRefs (default: false)
- Validate url is non-empty string

### Phase 2: Git Binary Validation (30 min)
- Check if git is installed: `new Deno.Command("git", {args: ["--version"]})`
- Throw clear error if not found: "builtins.fetchGit requires git binary to be installed"

### Phase 3: Cache Check (30 min)
- Build cache key: `fetchgit:${url}:${ref}:${rev || "tip"}`
- Check existing cache: `getCachedPath(cacheKey)` from store_manager.js
- If cached AND store path exists → return cached result
- Otherwise proceed with fetch

### Phase 4: Clone Repository (3 hours)
- Create temp directory: `Deno.makeTempDir()`
- Build git clone command with flags:
  ```
  git clone [--depth 1 if shallow] [--recurse-submodules if submodules]
            [--branch <ref> if ref provided] <url> <tempDir>
  ```
- If allRefs=true: fetch all refs with `git fetch --all`
- Handle errors: network failures, invalid URLs, auth failures
- Parse stderr/stdout for error messages

### Phase 5: Checkout Revision (1 hour)
- If rev specified: `git checkout <rev>`
- If rev not specified: already at tip of ref from clone
- Verify checkout succeeded (exit code 0)

### Phase 6: Extract Metadata (2 hours)
- Get final rev: `git rev-parse HEAD` → string (40 char hex)
- Get shortRev: `git rev-parse --short HEAD` → string (7 char hex)
- Get revCount: `git rev-list --count HEAD` → integer
- Get lastModified: `git log -1 --format=%ct HEAD` → unix timestamp
- Parse command outputs (trim whitespace, convert to correct types)

### Phase 7: Clean Working Directory (30 min)
- Remove .git directory for determinism: `Deno.remove(path + "/.git", {recursive: true})`
- Apply git ls-files if local directory (filter to tracked files only)
- Result should be clean directory with only repository contents

### Phase 8: Hash and Store (1.5 hours)
- Compute NAR hash: `await hashDirectory(clonePath)` from nar_hash.js
- Compute store path: `computeFetchStorePath(narHash, name)` from store_path.js
- Move to store: `await atomicMove(tempPath, storePath)` from store_manager.js
- Save to cache: `setCachedPath(cacheKey, storePath, metadata)`

### Phase 9: Build Result (30 min)
- Return attribute set with:
  - outPath: store path string
  - rev: commit hash (40 char)
  - shortRev: short commit hash (7 char)
  - revCount: integer commit count
  - lastModified: integer unix timestamp
  - narHash: "sha256:..." string
  - submodules: boolean (echo input parameter)
- Match exact Nix output structure

### Phase 10: Testing (4 hours)
Create main/tests/builtins_fetchgit_test.js with these required test cases:
- Basic clone: public HTTPS repo with no options
- String URL shorthand: `fetchGit "https://..."`
- Specific revision: clone with rev parameter
- Branch reference: clone with ref parameter
- Ref auto-prefixing: "main" → "refs/heads/main"
- Shallow clone: verify --depth 1 used
- Submodules: verify submodules checked out
- Cache hit: same fetch twice uses cache
- Local directory: ./some-path handling
- Error: git not installed
- Error: invalid URL
- Error: nonexistent repository
- Error: invalid revision

**Total Estimated Time**: 14-16 hours over 2-3 days

---

## What is NOT Implemented (5 items total)

### 1. builtins.fetchGit - NOT IMPLEMENTED (HIGH PRIORITY)

**OFFICIAL DOCUMENTATION**: https://nix.dev/manual/nix/2.18/language/builtins (fetchGit section)

Location: main/runtime.js line 879 (search for "fetchGit")
Current State: Throws NotImplemented error

**What it does**: Clones Git repositories and copies them to the Nix store with metadata (commit hash, revision count, etc.)

**Input Parameters** (official Nix 2.18 spec):
- url (string, required): Git repository URL
- name (string, optional): Store directory name (default: basename of URL)
- rev (string, optional): Git revision/commit hash (default: tip of ref)
- ref (string, optional): Branch/tag name (default: "HEAD", auto-prefixed with "refs/heads/")
- submodules (boolean, optional): Checkout submodules (default: false)
- shallow (boolean, optional): Use shallow clone (default: false)
- allRefs (boolean, optional): Fetch all refs (default: false)

**Return Value**: Attribute set with:
- outPath: Store path string
- rev: Full commit hash (40 chars)
- shortRev: Short commit hash (7 chars)
- revCount: Integer commit count
- lastModified: Unix timestamp of commit
- narHash: SHA256 hash of directory contents
- submodules: Boolean echoing input

**Implementation Plan**: See START HERE section above for detailed 10-phase breakdown

**Key Implementation Challenges**:
1. Git command execution with proper error handling
2. Parsing git command outputs (commit hashes, timestamps, etc.)
3. Ref name normalization (auto-prefix "refs/heads/")
4. Local directory handling (git ls-files filtering)
5. Cache key construction (URL + ref + rev)

**Testing Requirements**:
- 13 test cases covering URL variants, caching, errors, metadata extraction
- Test against real public repos (e.g., NixOS/nix, small test repos)
- Verify output matches Nix exactly (same outPath, same metadata)

### 2. builtins.fetchTree - NOT IMPLEMENTED (MEDIUM PRIORITY - EXPERIMENTAL)

**DOCUMENTATION**:
- Noogle: https://noogle.dev/f/builtins/fetchTree
- Nix Manual (2.25+): https://nix.dev/manual/nix/2.25/language/builtins
- GitHub Issue: https://github.com/NixOS/nix/issues/9249 (poor documentation acknowledged)

Location: main/runtime.js line 885 (search for "fetchTree")
Current State: Throws NotImplemented error

**Status**: Experimental feature (requires `fetch-tree` feature flag in real Nix)
**Purpose**: Generic interface for fetching from different source types (git, tarball, file)

**DEPENDENCY**: Requires fetchGit to be implemented first

**What it does**: Unified fetcher that detects source type from URL and delegates to appropriate fetcher (fetchGit, fetchTarball, fetchurl). Idempotent and cacheable.

**Input Parameters**:
- URL string OR attribute set {url, type?}
- Supported types: "git", "tarball", "file", "github"
- Type auto-detected from URL scheme if not provided

**URL Scheme Detection**:
- git+https://, git://, git+ssh:// → type="git"
- https://.../file.tar.gz → type="tarball"
- https://.../file → type="file"
- github:owner/repo → type="github" (shorthand)

**Implementation Plan**:
1. Parse input (URL string or attrset)
2. Detect type from URL scheme if not provided
3. Normalize URL for detected type
4. Delegate to appropriate fetcher:
   - type="git" → builtins.fetchGit
   - type="tarball" → builtins.fetchTarball
   - type="file" → builtins.fetchurl
   - type="github" → transform to git URL and call fetchGit
5. Return unified output format

**Key Challenges**:
- URL scheme regex patterns for each type
- GitHub shorthand parsing: github:owner/repo → https://github.com/owner/repo.git
- Return format normalization (different fetchers have different outputs)

**Estimated Time**: 6-8 hours (mostly URL parsing and delegation logic)

### 3. builtins.fetchMercurial - NOT IMPLEMENTED (LOW PRIORITY - LEGACY)

**DOCUMENTATION**:
- Release notes: https://nix.dev/manual/nix/2.18/release-notes/rl-2.0 (mentions fetchMercurial)
- nixpkgs fetchers: https://github.com/NixOS/nixpkgs/blob/master/doc/build-helpers/fetchers.chapter.md

Location: main/runtime.js line 882 (search for "fetchMercurial")
Current State: Throws NotImplemented error

**Status**: Legacy builtin (rarely used, replaced by fetchTree)
**Purpose**: Fetch from Mercurial (hg) repositories

**NOTE**: Very rarely used in modern Nix code. fetchGit is far more common. Consider low priority or skip entirely unless specifically needed.

**What it does**: Clone Mercurial repository and copy to store with metadata (similar to fetchGit but for hg)

**Input Parameters** (based on release notes):
- url (string, required): Mercurial repository URL
- rev (string, optional): Mercurial revision/changeset ID
- hash (string, optional): Expected hash for verification

**Return Value**: Attribute set with:
- outPath: Store path
- rev: Changeset ID
- revCount: Number of revisions

**Implementation Plan** (similar to fetchGit):
1. Validate `hg` binary exists
2. Parse input: {url, rev?, hash?}
3. Clone: `hg clone <url> <tempDir>`
4. Checkout: `hg update -r <rev>` if rev provided
5. Extract metadata: `hg id -i` (rev), `hg log -r . -T {rev}` (revCount)
6. Remove .hg directory for determinism
7. Hash with NAR, compute store path, move to store
8. Return attrset

**Key Differences from fetchGit**:
- Uses `hg` instead of `git` commands
- Mercurial changesets instead of commit hashes
- Less common binary (may not be installed)

**Estimated Time**: 8-10 hours (similar to fetchGit implementation)

### 4. builtins.fetchClosure - NOT IMPLEMENTED (VERY LOW PRIORITY - EXPERIMENTAL)

**OFFICIAL DOCUMENTATION**: https://nix.dev/manual/nix/2.18/language/builtins (fetchClosure section)

Location: main/runtime.js line 888 (search for "fetchClosure")
Current State: Throws NotImplemented error

**Status**: Experimental feature (requires `fetch-closure` feature flag)
**Purpose**: Fetch store path closures from binary caches with signature verification

**WARNING**: Extremely complex. Defer until all other fetchers are working.

**What it does**: Downloads store paths from binary caches (cache.nixos.org) and adds them to the local store with cryptographic verification.

**Three Usage Modes**:
1. **Content-addressed path** (preferred): {fromStore, fromPath}
   - No signature verification needed
   - More reproducible
2. **Rewrite to content-addressed**: {fromStore, fromPath, toPath}
   - Converts input-addressed to content-addressed
   - Use `nix store make-content-addressed` to find toPath
3. **Input-addressed** (least preferred): {fromStore, fromPath, inputAddressed=true}
   - Requires trusted-public-keys configuration
   - Less secure/reproducible

**Implementation Requirements**:
1. **Binary cache protocol** (HTTP client for .narinfo files)
   - Fetch .narinfo from fromStore: `GET <fromStore>/<hash>.narinfo`
   - Parse narinfo format (key:value pairs)
   - Extract: StorePath, URL, Compression, FileHash, FileSize, NarHash, NarSize, References, Sig
2. **Signature verification** (cryptographic operations)
   - Parse public keys from Nix config
   - Verify Ed25519 signatures
   - Require trusted-public-keys for input-addressed paths
3. **NAR download and extraction**
   - Download NAR file from cache: `GET <fromStore>/<nar-url>`
   - Decompress (xz, bzip2, gzip)
   - Extract NAR format (beyond just hashing - full deserialization)
   - Verify hash matches narinfo
4. **Closure resolution** (recursive dependencies)
   - Parse References field from narinfo
   - Recursively fetch all referenced paths
   - Build complete closure graph
5. **Content-addressed path handling**
   - Compute content addresses for rewriting
   - Handle both input-addressed and content-addressed stores

**Key Challenges**:
- Binary cache protocol (complex, underdocumented)
- NAR format deserialization (not just hashing)
- Ed25519 signature verification
- Recursive closure fetching
- Content-addressed vs input-addressed logic

**Estimated Time**: 40+ hours (very complex, multi-week project)

**RECOMMENDATION**: Skip unless absolutely necessary. Rarely used, experimental, and blocks nothing important.

### 5. builtins.getFlake - NOT IMPLEMENTED (DEFER INDEFINITELY - EXPERIMENTAL)

**OFFICIAL DOCUMENTATION**: https://nix.dev/manual/nix/2.18/language/builtins (getFlake section)

Location: main/runtime.js line 1423 (search for "getFlake")
Current State: Throws NotImplemented error

**Status**: Experimental feature (requires `flakes` experimental feature flag)
**Purpose**: Fetch and evaluate complete flakes with their inputs and outputs

**WARNING**: Extremely complex. Requires full flake system. Do not implement unless absolutely necessary.

**What it does**: Takes a flake reference string (e.g., "github:NixOS/nixpkgs/nixos-23.05"), fetches the flake, resolves all its inputs recursively, evaluates flake.nix, and returns the outputs attribute set.

**Input**: Flake reference string
- Format: "type:owner/repo/rev" or path
- Examples: "github:edolstra/dwarffs", "nix/55bc52401966fbffa", "./my-flake"
- Must be "locked" (include rev/hash) unless --impure evaluation

**Return Value**: Attribute set with flake outputs (packages, apps, lib, etc.) plus metadata

**What Would Be Required** (if ever implemented):
1. **Flake reference parsing**
   - Parse flake URLs: github:owner/repo, path:./local, git+https://...
   - Handle direct and indirect references
   - Registry lookup for indirect references
2. **Flake fetching**
   - Use fetchGit, fetchTree, etc. to fetch source
   - Handle locked vs unlocked references
3. **Lockfile parsing** (flake.lock)
   - Parse lockfile version 7 format (JSON)
   - Extract input revisions and hashes
   - Build dependency graph
4. **Recursive input resolution**
   - Recursively fetch and evaluate all input flakes
   - Build inputs attrset
   - Handle circular dependencies
5. **Flake evaluation**
   - Evaluate flake.nix with correct scope
   - Provide inputs as function arguments
   - Extract outputs attrset
6. **Metadata handling**
   - description, nixConfig, etc.
7. **Registry client**
   - Lookup indirect flake references
   - Cache registry data

**Dependencies**: ALL other fetchers must work first
- fetchGit (required)
- fetchTree (required)
- fetchTarball (required)

**Estimated Time**: 80-120+ hours (multi-month project)

**RECOMMENDATION**: Do not implement. Basic Nix evaluation works fine without this. Flakes are experimental and add massive complexity for minimal benefit in this context.

---

## 🎯 IMPLEMENTATION ORDER 🎯

**Priority 1: fetchGit** (14-16 hours) - IMPLEMENT THIS
- Location: main/runtime.js line 879
- Documentation: https://noogle.dev/f/builtins/fetchGit
- Blocks: fetchTree cannot be implemented without this
- Impact: Required for git dependencies and flakes

**Priority 2: fetchTree** (6-8 hours) - OPTIONAL
- Location: main/runtime.js line 885
- Documentation: https://noogle.dev/f/builtins/fetchTree
- Requires: fetchGit must be implemented first
- Impact: Experimental unified fetcher (convenience feature)

**Priority 3: Skip These** - Only implement if explicitly requested
- fetchMercurial: Legacy Mercurial support (rarely used)
- fetchClosure: Binary cache operations (experimental, complex)
- getFlake: Complete flake system (months of work, experimental)

**Target State: 94-95/98 builtins (96-97% complete)**

---

## TASK 1: fetchGit (HIGH PRIORITY - START HERE)
- **Documentation**: https://nix.dev/manual/nix/2.18/language/builtins (fetchGit section)
- **Location**: main/runtime.js line ~1050 (search for fetchGit)
- **Estimated Time**: 14-16 hours over 2-3 days
- **Blocks**: fetchTree (cannot implement until this is done)
- **Impact**: Critical for flakes, nixpkgs, and most modern Nix code
- **Detailed Plan**: See "START HERE - Next Task" section above

## TASK 2: fetchTree (MEDIUM PRIORITY - AFTER fetchGit)
- **Documentation**: https://noogle.dev/f/builtins/fetchTree + https://nix.dev/manual/nix/2.25/language/builtins
- **Location**: main/runtime.js line ~1053 (search for fetchTree)
- **Estimated Time**: 6-8 hours over 1-2 days
- **Requires**: fetchGit must be complete first
- **Impact**: Unified fetcher interface (experimental but useful)

## TASK 3: fetchMercurial (LOW PRIORITY - OPTIONAL)
- **Documentation**: https://nix.dev/manual/nix/2.18/release-notes/rl-2.0 + nixpkgs docs
- **Location**: main/runtime.js line ~1054 (search for fetchMercurial)
- **Estimated Time**: 8-10 hours over 1-2 days
- **Impact**: Low - rarely used in modern Nix
- **Recommendation**: Skip unless specifically requested

## TASK 4: fetchClosure (DEFER)
- **Documentation**: https://nix.dev/manual/nix/2.18/language/builtins (fetchClosure section)
- **Location**: main/runtime.js line ~1056 (search for fetchClosure)
- **Estimated Time**: 40+ hours (very complex)
- **Impact**: Experimental feature, not critical
- **Recommendation**: Do not implement unless explicitly required

## TASK 5: getFlake (DO NOT IMPLEMENT)
- **Documentation**: https://nix.dev/manual/nix/2.18/language/builtins (getFlake section)
- **Location**: main/runtime.js line ~1182 (search for getFlake)
- **Estimated Time**: 80-120+ hours (months of work)
- **Impact**: Not needed for basic Nix evaluation
- **Recommendation**: Do not implement - flakes are experimental and add massive complexity

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

### ⚠️ WHEN IS AN IMPLEMENTATION COMPLETE? ⚠️

An implementation is NOT complete until ALL of these requirements are met:

1. **Documentation verified**: Read https://noogle.dev/f/builtins/<function_name> and confirm behavior matches exactly
2. **All test cases pass**: Every test in the test file passes without skips or .only
3. **No NotImplemented errors**: Function doesn't throw NotImplemented
4. **Edge cases handled**: Null, undefined, empty, invalid inputs all handled properly
5. **Error messages clear**: Errors tell user what went wrong and how to fix it
6. **Behavior matches Nix**: Test against real Nix if possible

**RED FLAGS - Implementation is NOT complete if:**
- ❌ Tests are skipped, commented out, or marked with .only
- ❌ Known bugs exist (even if "minor")
- ❌ Error handling is missing or generic
- ❌ Behavior doesn't match official Nix documentation
- ❌ You haven't verified against https://noogle.dev documentation
- ❌ You're guessing at behavior instead of reading documentation

**CRITICAL RULE**: If you can't verify behavior matches Nix documentation at https://noogle.dev, the implementation is NOT complete. Read the docs first!

---

## 🔍 VERIFICATION CHECKLIST - REQUIRED FOR EACH BUILTIN 🔍

After implementing each builtin, you MUST verify ALL of these items:

### 1. Documentation Verification (MANDATORY FIRST STEP)
MUST complete before writing ANY code:
- Read official Nix 2.18 manual for the builtin at https://noogle.dev
- Confirm all parameters match documentation
- Confirm all default values match documentation
- Confirm return value structure matches documentation
- Confirm edge case behavior matches documentation

### 2. Test Coverage Verification (REQUIRED)
Must create and verify:
- Comprehensive test file (main/tests/builtins_<name>_test.js)
- All test cases passing
- Tested happy path (basic usage)
- Tested all parameter variants
- Tested error cases (invalid input)
- Tested edge cases (empty, null, special characters)
- Tested caching behavior (if applicable)
- Tested integration with other builtins

### 3. Real-World Verification (REQUIRED)
Test against actual public repositories (for fetchers):
- Verify output matches actual Nix (same store paths, same metadata)
- Test with both HTTPS and SSH URLs (for git fetchers)
- Test with local paths (for git fetchers)

### 4. Code Quality Verification (REQUIRED)
Ensure these requirements are met:
- No NotImplemented errors remain
- Error messages are clear and actionable
- Code follows existing patterns in runtime.js
- No hardcoded paths or assumptions
- Proper temp directory cleanup on errors
- No memory leaks (streams closed, temp files removed)

### 5. Integration Verification (REQUIRED)
Run these verification steps:
- Run full test suite: `deno test --allow-all`
- All existing tests still pass
- No regressions in other builtins
- Works correctly with builtins.import
- Works correctly with toJSON

**CRITICAL**: An implementation is incomplete until all 5 categories above are verified. Partial implementations are not acceptable.

---

## 🎯 FINAL REMINDERS - READ BEFORE STARTING 🎯

**⚠️ CRITICAL WORK ORDER - FOLLOW THIS SEQUENCE ⚠️**

You MUST work in this exact order:
1. **Runtime (main/runtime.js)** - Implement ALL network fetchers and store functions FIRST
2. **Translator (main.js)** - ONLY after runtime is 100% complete
3. **Nix-lib tests** - ONLY after both runtime AND translator are 100% complete

**RIGHT NOW**: You are in Phase 1 (Runtime). Do NOT work on translator or nix-lib tests.

**YOUR CURRENT TASK**: Implement builtins.fetchGit

**DOCUMENTATION REQUIREMENTS** (MANDATORY):
1. **READ DOCUMENTATION FIRST**: Go to https://noogle.dev/f/builtins/fetchGit and read the ENTIRE page
2. **UNDERSTAND THE BEHAVIOR**: Study all examples and parameters in the documentation
3. **BASE YOUR IMPLEMENTATION ON THE DOCS**: Your code MUST match what's documented at https://noogle.dev
4. **DO NOT GUESS**: If unclear about behavior, read the documentation again (guessing wastes hours)
5. **TEST AGAINST EXAMPLES**: Use the examples from https://noogle.dev in your tests
6. **VERIFY BEHAVIOR**: Your implementation must match Nix behavior exactly

**REPORTING RULES** (MANDATORY):
- ❌ NEVER report what you accomplished or completed
- ❌ NEVER add checkboxes (✅) for completed work
- ❌ NEVER say "we implemented X" or "completed Y"
- ✅ ONLY report what is NOT working or NOT implemented
- ✅ ONLY report remaining tasks and blockers
- ✅ Remove achievement language from this document immediately

**TASK BREAKDOWN RULES** (MANDATORY):
- You are a senior developer - there are NO blockers, only tasks to break down further
- Split large tasks into 1-2 hour chunks
- If something seems hard, break it into smaller pieces
- Write tests alongside implementation (TDD approach)
- Test frequently (after each small piece)

**NPM USAGE** (ALLOWED):
- ✅ You CAN use npm modules through https://esm.sh/package-name@version
- ⚠️ Test the import first (not all npm modules work through esm.sh)
- ✅ Prefer Deno standard library (jsr:@std/*) when available

**START HERE**: Implement builtins.fetchGit (see detailed plan above)

**REMEMBER**: Read https://noogle.dev/f/builtins/fetchGit BEFORE writing ANY code!
