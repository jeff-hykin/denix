# Remaining Work: Git Fetchers & Advanced Features

## 🛑 MANDATORY RULES - READ THIS FIRST 🛑

**Your job is to focus on what is NOT implemented and NOT working. Only report what remains to be done. Do not report what you accomplished. You are a senior level developer, there is no such thing as a blocker. Break down large tasks into smaller tasks.**

**Before executing what is below, please filter out any achievements. Only keep remaining/unsolved tasks in this document. Add detail to each task if its needed.**

## 🚫 ABSOLUTE WORK ORDER - NO EXCEPTIONS 🚫

**INSTRUCTIONS:**
1. **DO NOT work on nix-lib tests** until the code translator is fully implemented
2. **DO NOT work on the translator** until the runtime is fully implemented
3. **IN OTHER WORDS**: Finish the git fetchers and advanced features in runtime.js BEFORE doing ANYTHING ELSE

**RIGHT NOW YOU ARE IN PHASE 1: RUNTIME IMPLEMENTATION**
- Focus ONLY on implementing missing builtins in main/runtime.js
- Do NOT touch main.js (translator)
- Do NOT write nix-lib tests
- Do NOT work on documentation or examples

## 📊 WHAT REMAINS TO IMPLEMENT

**5 builtins throw NotImplemented errors in main/runtime.js:**
1. **fetchGit** - NOT IMPLEMENTED (HIGH PRIORITY - START HERE)
2. **fetchTree** - NOT IMPLEMENTED (MEDIUM PRIORITY - requires fetchGit first)
3. **fetchMercurial** - NOT IMPLEMENTED (LOW PRIORITY - rarely used)
4. **fetchClosure** - NOT IMPLEMENTED (DEFER - very complex)
5. **getFlake** - NOT IMPLEMENTED (SKIP - massive undertaking)

**WHAT IS ALREADY IMPLEMENTED:**
- ✅ **fetchurl** - FULLY IMPLEMENTED with 7 passing tests
- ✅ **fetchTarball** - FULLY IMPLEMENTED with 6 passing tests
- ✅ **Infrastructure modules** - All 4 support modules complete (fetcher.js, tar.js, nar_hash.js, store_manager.js)

**YOUR IMMEDIATE TASK:** Implement builtins.fetchGit (14-16 hours)

## 📊 CURRENT STATUS SUMMARY

**Network Fetchers (7 total):**
- ✅ fetchurl - COMPLETE (7 tests passing)
- ✅ fetchTarball - COMPLETE (6 tests passing)
- ❌ fetchGit - NOT IMPLEMENTED (HIGH PRIORITY)
- ❌ fetchTree - NOT IMPLEMENTED (MEDIUM PRIORITY, needs fetchGit)
- ❌ fetchMercurial - NOT IMPLEMENTED (LOW PRIORITY)
- ❌ fetchClosure - NOT IMPLEMENTED (DEFER - very complex)
- ❌ getFlake - NOT IMPLEMENTED (SKIP - massive undertaking)

**Infrastructure (6 modules):**
- ✅ main/fetcher.js - COMPLETE (155 lines)
- ✅ main/tar.js - COMPLETE (169 lines)
- ✅ main/nar_hash.js - COMPLETE (245 lines)
- ✅ main/store_manager.js - COMPLETE (194 lines)
- ✅ tools/store_path.js - COMPLETE (pre-existing)
- ✅ tools/hashing.js - COMPLETE (pre-existing)

**What This Means:**
- 2/7 fetchers complete (29%)
- ALL infrastructure complete (100%)
- fetchGit can reuse ALL existing infrastructure
- Estimated time to complete fetchGit: 14-16 hours

## 🎯 IMPLEMENTATION PRIORITIES

**PHASE 1: Runtime Builtins (CURRENT PHASE - DO THIS NOW)**

### ✅ COMPLETED:
- **fetchurl** - Lines 750-809 in runtime.js - 7 passing tests
- **fetchTarball** - Lines 810-878 in runtime.js - 6 passing tests
- **Infrastructure** - fetcher.js, tar.js, nar_hash.js, store_manager.js all complete

### Task 1: fetchGit (HIGH PRIORITY - START HERE)
- **Location**: main/runtime.js line 879
- **Status**: NOT IMPLEMENTED - throws NotImplemented error
- **Time**: 14-16 hours over 2-3 days
- **Blocks**: fetchTree cannot be implemented without this
- **Dependencies**: Git binary must be installed

### Task 2: fetchTree (MEDIUM PRIORITY - AFTER fetchGit)
- **Location**: main/runtime.js line 886
- **Status**: NOT IMPLEMENTED - throws NotImplemented error
- **Time**: 6-8 hours over 1-2 days
- **Requires**: fetchGit MUST be complete first
- **Note**: Experimental feature, wraps other fetchers

### Task 3: fetchMercurial (LOW PRIORITY - OPTIONAL)
- **Location**: main/runtime.js line 883
- **Status**: NOT IMPLEMENTED - throws NotImplemented error
- **Time**: 8-10 hours
- **Notes**: Rarely used, can skip
- **Dependencies**: Mercurial (hg) binary must be installed

### Task 4: fetchClosure (DEFER)
- **Location**: main/runtime.js line 889
- **Status**: NOT IMPLEMENTED - throws NotImplemented error
- **Time**: 40+ hours (very complex)
- **Notes**: Do not implement unless explicitly required
- **Complexity**: Requires binary cache protocol, signature verification, NAR deserialization

### Task 5: getFlake (SKIP)
- **Location**: main/runtime.js line 1424
- **Status**: NOT IMPLEMENTED - throws NotImplemented error
- **Time**: 80-120+ hours
- **Notes**: Experimental, massive scope - do not implement
- **Complexity**: Requires full flake system, lockfile parsing, recursive input resolution

**PHASE 2: Translator Features (DO NOT START YET)**
- Wait until ALL Phase 1 tasks are complete
- No translator work allowed while runtime has unimplemented builtins

**PHASE 3: Nix-lib Tests (DO NOT START YET)**
- Wait until BOTH Phase 1 AND Phase 2 are complete
- No nix-lib testing while runtime or translator are incomplete

---

## 🚨 CRITICAL RULES - ENFORCE THESE STRICTLY 🚨

**These rules override everything else in this document:**

1. **NO ACHIEVEMENTS**: Never report what you accomplished. Remove any completed items from this document.
2. **NO CHECKBOXES**: Never add ✅ marks. Only track what is NOT done.
3. **NO BLOCKERS**: You are a senior developer. Break down hard tasks into smaller tasks.
4. **DOCUMENTATION FIRST**: Always read https://noogle.dev/f/builtins/<function_name> BEFORE writing ANY code.
5. **BASE ON NIX BEHAVIOR**: Implementations must match official Nix 2.18 documentation exactly.

## 📚 MANDATORY: READ DOCUMENTATION BEFORE CODING 📚

**⚠️ CRITICAL: Before implementing ANY builtin, you MUST:**

1. **Visit documentation**: Go to https://noogle.dev/f/builtins/<function_name>
2. **Read completely**: Study EVERY example, parameter, return value, and edge case
3. **Take notes**: Write down what you learned from the documentation
4. **Verify understanding**: Can you list all parameters and their defaults?
5. **Check Nix manual**: https://nix.dev/manual/nix/2.18/language/builtins for additional context

**DO NOT GUESS BEHAVIOR - READ THE DOCS!**
- Guessing wastes hours debugging incorrect implementations
- Reading docs takes 10 minutes and prevents hours of rework
- Your implementation MUST match https://noogle.dev documentation exactly

**Example for fetchGit:**
1. Read: https://noogle.dev/f/builtins/fetchGit
2. Read: https://nix.dev/manual/nix/2.18/language/builtins (fetchGit section)
3. Note all parameters: url, name, rev, ref, submodules, shallow, allRefs
4. Note all defaults: name=basename, ref="HEAD", submodules=false, etc.
5. Study return structure: {outPath, rev, shortRev, revCount, lastModified, narHash, submodules}
6. THEN start coding


## 🎯 YOUR CURRENT TASK: Implement fetchGit

**START HERE - Do this before anything else:**

### Step 0: Read Documentation (MANDATORY - 15 minutes)
1. Go to https://noogle.dev/f/builtins/fetchGit
2. Read the ENTIRE page (every word, every example)
3. Go to https://nix.dev/manual/nix/2.18/language/builtins
4. Read the fetchGit section completely
5. Write down what you learned before coding

**Do NOT proceed to Step 1 until you have read and understood the official documentation.**

### Step 1: Implement Argument Parsing (1 hour)
- Location: main/runtime.js line 879
- Accept URL string OR attribute set
- Parse and validate all parameters (url, name, rev, ref, submodules, shallow, allRefs)
- Apply default values per Nix documentation

### Step 2: Validate Git Binary (30 minutes)
- Check if git is installed
- Throw clear error if not found

### Step 3: Implement Caching (30 minutes)
- Build cache key from URL + ref + rev
- Check if already cached
- Return cached result if exists

### Step 4: Clone Repository (3 hours)
- Create temp directory
- Execute git clone with appropriate flags
- Handle errors (network, auth, invalid URL)

### Step 5: Checkout Revision (1 hour)
- Checkout specific revision if provided
- Verify checkout succeeded

### Step 6: Extract Metadata (2 hours)
- Get rev (git rev-parse HEAD)
- Get shortRev (git rev-parse --short HEAD)
- Get revCount (git rev-list --count HEAD)
- Get lastModified (git log -1 --format=%ct HEAD)

### Step 7: Clean Working Directory (30 minutes)
- Remove .git directory
- Result should be clean directory with only repo contents

### Step 8: Hash and Store (1.5 hours)
- Compute NAR hash using nar_hash.js
- Compute store path using store_path.js
- Move to store using store_manager.js
- Save to cache

### Step 9: Build Result (30 minutes)
- Return attribute set matching Nix structure
- Include: outPath, rev, shortRev, revCount, lastModified, narHash, submodules

### Step 10: Write Tests (4 hours)
- Create main/tests/builtins_fetchgit_test.js
- Test basic clone, specific revision, branch reference
- Test caching, errors, edge cases
- Verify output matches Nix behavior

**Total Time: 14-16 hours over 2-3 days**

## 🔧 NPM MODULE USAGE (ALLOWED)

**You CAN use npm modules through esm.sh:**

```javascript
// Import npm modules via esm.sh (this is allowed):
import pkg from "https://esm.sh/package-name@1.0.0";
```

**Guidelines:**
- ⚠️ Test the import first (not all npm modules work through esm.sh)
- ✅ Prefer Deno standard library (jsr:@std/*) when available
- ✅ Check Deno built-in APIs (crypto, fetch, etc.) before using npm
- ⚠️ Node-specific APIs may not work through esm.sh


## 📋 UNIMPLEMENTED BUILTINS (5 total)

| Builtin | Status | Priority | Est. Time | Documentation Link | Blocks |
|---------|--------|----------|-----------|-------------------|--------|
| **fetchGit** | NOT IMPL | 🔴 HIGH | 14-16 hrs | https://noogle.dev/f/builtins/fetchGit | fetchTree |
| **fetchTree** | NOT IMPL | 🟡 MEDIUM | 6-8 hrs | https://noogle.dev/f/builtins/fetchTree | (experimental) |
| **fetchMercurial** | NOT IMPL | 🟢 LOW | 8-10 hrs | https://noogle.dev/f/builtins/fetchMercurial | (rarely used) |
| **fetchClosure** | NOT IMPL | ⚪ DEFER | 40+ hrs | https://noogle.dev/f/builtins/fetchClosure | (experimental) |
| **getFlake** | NOT IMPL | ⚫ SKIP | 80+ hrs | https://noogle.dev/f/builtins/getFlake | (months of work) |

---

## 🔧 DETAILED IMPLEMENTATION PLAN: fetchGit

**Location**: main/runtime.js line 879 (search for "fetchGit")
**Documentation**:
- https://noogle.dev/f/builtins/fetchGit
- https://nix.dev/manual/nix/2.18/language/builtins (fetchGit section)

**⚠️ READ DOCUMENTATION BEFORE CODING (15 minutes required)**

**Implementation Strategy**: Follow the same pattern as fetchTarball/fetchurl:
1. Argument parsing (string or object)
2. Cache check (getCachedPath)
3. Download/clone to temp directory
4. Extract metadata
5. Compute NAR hash (hashDirectory)
6. Move to store (atomicMove)
7. Save to cache (setCachedPath)
8. Return Path object

### Phase 0: Study fetchTarball Implementation (30 min)
**BEFORE CODING, READ THE EXISTING fetchTarball CODE (lines 810-878 in runtime.js)**

The pattern to follow:
```javascript
"fetchGit": async (args) => {
    // 1. Parse arguments (string or {url, name?, rev?, ref?, ...})
    let url, name, rev, ref, submodules, shallow, allRefs;
    if (typeof args === "string" || args instanceof InterpolatedString) {
        url = requireString(args);
        name = extractNameFromUrl(url); // From fetcher.js
    } else {
        url = requireString(args["url"]);
        name = args["name"] ? requireString(args["name"]) : extractNameFromUrl(url);
        // ... extract other params ...
    }

    // 2. Ensure store directory exists
    await ensureStoreDirectory(); // From store_manager.js

    // 3. Check cache
    const cacheKey = `fetchgit:${url}:${ref}:${rev || ""}`;
    const cached = await getCachedPath(cacheKey); // From store_manager.js
    if (cached && await exists(cached)) { // exists from store_manager.js
        return new Path(cached);
    }

    // 4. Clone to temp directory
    const tempDir = await Deno.makeTempDir();
    // ... git clone commands ...

    // 5. Extract metadata (rev, shortRev, revCount, lastModified)
    // ... git commands ...

    // 6. Remove .git directory for determinism
    await Deno.remove(`${tempDir}/.git`, {recursive: true});

    // 7. Compute NAR hash
    const narHash = await hashDirectory(tempDir); // From nar_hash.js

    // 8. Compute store path
    const storePath = computeFetchStorePath(narHash, name); // From store_manager.js

    // 9. Move to store
    await atomicMove(tempDir, storePath); // From store_manager.js

    // 10. Cache the result
    await setCachedPath(cacheKey, storePath); // From store_manager.js

    // 11. Return Path object with metadata as properties
    const result = new Path(storePath);
    result.rev = rev;
    result.shortRev = shortRev;
    result.revCount = revCount;
    result.lastModified = lastModified;
    result.narHash = narHash;
    result.submodules = submodules;
    return result;
}
```

### Phase 1: Argument Parsing (1 hour)
- Accept URL string OR attribute set (same as fetchTarball)
- Required: url (string)
- Optional with defaults:
  - name (default: basename of url using extractNameFromUrl)
  - rev (default: null, means tip of ref)
  - ref (default: "HEAD")
  - submodules (default: false)
  - shallow (default: false)
  - allRefs (default: false)
- Validate url is non-empty string

**CRITICAL: Ref Normalization**

Nix auto-prefixes branch names with "refs/heads/" unless they already start with "refs/":
```javascript
// Normalize ref parameter
let normalizedRef = ref;
if (ref && ref !== "HEAD" && !ref.startsWith("refs/")) {
    normalizedRef = `refs/heads/${ref}`;
}
// Examples:
//   "main" → "refs/heads/main"
//   "v1.0" → "refs/heads/v1.0"
//   "refs/tags/v1.0" → "refs/tags/v1.0" (unchanged)
//   "HEAD" → "HEAD" (unchanged)
```

**Argument Parsing Example:**
```javascript
let url, name, rev, ref, submodules, shallow, allRefs;
if (typeof args === "string" || args instanceof InterpolatedString) {
    url = requireString(args);
    name = extractNameFromUrl(url);
    rev = null;
    ref = "HEAD";
    submodules = false;
    shallow = false;
    allRefs = false;
} else {
    url = requireString(args["url"]);
    name = args["name"] ? requireString(args["name"]) : extractNameFromUrl(url);
    rev = args["rev"] ? requireString(args["rev"]) : null;
    ref = args["ref"] ? requireString(args["ref"]) : "HEAD";
    submodules = args["submodules"] === true;
    shallow = args["shallow"] === true;
    allRefs = args["allRefs"] === true;
}
```

### Phase 2: Git Binary Validation (30 min)
- Check if git is installed: `new Deno.Command("git", {args: ["--version"]})`
- Throw clear error if not found: "builtins.fetchGit requires git binary to be installed"

### Phase 3: Cache Check (30 min)
- Build cache key: `fetchgit:${url}:${ref}:${rev || "tip"}`
- Check existing cache: `getCachedPath(cacheKey)` from store_manager.js
- If cached AND store path exists → return cached result
- Otherwise proceed with fetch

### Phase 4: Clone Repository (3 hours)
**Use Deno.Command API (same as tar.js uses):**

```javascript
// Create temp directory
const tempDir = await Deno.makeTempDir();

// Build git clone command
const args = ["clone"];
if (shallow) args.push("--depth", "1");
if (submodules) args.push("--recurse-submodules");
if (ref && ref !== "HEAD") args.push("--branch", normalizedRef);
args.push(url, tempDir);

// Execute git clone
const command = new Deno.Command("git", {
    args: args,
    stdout: "piped",
    stderr: "piped",
});

const { code, stdout, stderr } = await command.output();

if (code !== 0) {
    const errorText = new TextDecoder().decode(stderr);
    // Clean up temp directory
    try { await Deno.remove(tempDir, {recursive: true}); } catch {}
    throw new Error(`git clone failed: ${errorText}`);
}

// If allRefs=true, fetch all refs
if (allRefs) {
    const fetchCmd = new Deno.Command("git", {
        args: ["-C", tempDir, "fetch", "--all"],
        stdout: "piped",
        stderr: "piped",
    });
    await fetchCmd.output(); // Ignore errors on fetch --all
}
```

**Error Handling:**
- Network failures: Let git error naturally, wrap in Error
- Invalid URLs: git will fail with clear error
- Auth failures: git will prompt or fail (no special handling needed)
- Clean up temp directory on ANY error

### Phase 5: Checkout Revision (1 hour)
- If rev specified: `git checkout <rev>`
- If rev not specified: already at tip of ref from clone
- Verify checkout succeeded (exit code 0)

### Phase 6: Extract Metadata (2 hours)
**Extract git metadata using Deno.Command:**

```javascript
// Helper function to run git command and get output
async function gitOutput(dir, args) {
    const cmd = new Deno.Command("git", {
        args: ["-C", dir, ...args],
        stdout: "piped",
        stderr: "piped",
    });
    const { code, stdout } = await cmd.output();
    if (code !== 0) {
        throw new Error(`git ${args.join(" ")} failed`);
    }
    return new TextDecoder().decode(stdout).trim();
}

// Get full commit hash
const fullRev = await gitOutput(tempDir, ["rev-parse", "HEAD"]);
// Returns: "abc123def456..." (40 characters)

// Get short commit hash
const shortRev = await gitOutput(tempDir, ["rev-parse", "--short", "HEAD"]);
// Returns: "abc1234" (7 characters)

// Get commit count
const revCountStr = await gitOutput(tempDir, ["rev-list", "--count", "HEAD"]);
const revCount = BigInt(revCountStr); // Use BigInt for large repos
// Returns: BigInt(1234)

// Get last modified timestamp
const lastModifiedStr = await gitOutput(tempDir, ["log", "-1", "--format=%ct", "HEAD"]);
const lastModified = BigInt(lastModifiedStr); // Unix timestamp
// Returns: BigInt(1706745600)
```

**Important:**
- All outputs need `.trim()` to remove newlines
- revCount and lastModified should be BigInt (Nix uses integers, could be large)
- Commands use `-C <dir>` to run in the temp directory

### Phase 7: Clean Working Directory (30 min)
**Remove .git directory for determinism:**
```javascript
// Remove .git directory
await Deno.remove(`${tempDir}/.git`, {recursive: true});
```

**Note about local directories:**
- If URL is a local path (starts with "/" or "."), Nix uses `git ls-files` to filter
- For network URLs, just remove .git directory (all files are already from the repo)
- **For MVP: Skip git ls-files filtering** (add later if needed)
- All cloned repos from network URLs are already clean

**Result:** Clean directory with only repository contents, no .git directory

### Phase 8: Hash and Store (1.5 hours)
- Compute NAR hash: `await hashDirectory(clonePath)` from nar_hash.js
- Compute store path: `computeFetchStorePath(narHash, name)` from store_path.js
- Move to store: `await atomicMove(tempPath, storePath)` from store_manager.js
- Save to cache: `setCachedPath(cacheKey, storePath, metadata)`

### Phase 9: Build Result (30 min)
**CRITICAL DIFFERENCE FROM fetchTarball:**

fetchGit returns a **Path object with extra properties**, NOT a plain object:
```javascript
const result = new Path(storePath);
result.rev = fullRev;           // "abc123..." (40 chars)
result.shortRev = shortRev;     // "abc1234" (7 chars)
result.revCount = BigInt(count); // BigInt for large repos
result.lastModified = BigInt(timestamp); // Unix timestamp as BigInt
result.narHash = narHash;       // "sha256:..."
result.submodules = submodules; // boolean
return result;
```

The Path object:
- toString() returns outPath (store path)
- Can be used like a path: `"${result}/some-file"`
- Extra properties accessible: `result.rev`, `result.shortRev`, etc.

**Test the return value structure:**
```javascript
const result = await builtins.fetchGit("https://github.com/...");
assertEquals(typeof result.toString(), "string"); // outPath
assertEquals(result.rev.length, 40); // Full commit hash
assertEquals(result.shortRev.length, 7); // Short hash
assertEquals(typeof result.revCount, "bigint"); // BigInt
assertEquals(typeof result.lastModified, "bigint"); // BigInt
assertEquals(result.narHash.startsWith("sha256:"), true);
```

### Phase 10: Testing (4 hours)
Create main/tests/builtins_fetchgit_test.js with these required test cases:

**Model after builtins_fetchtarball_test.js structure!**

```javascript
import { assertEquals, assertExists } from "jsr:@std/assert";
import { builtins } from "../runtime.js";

// Test 1: String URL argument (basic clone)
Deno.test("fetchGit - string URL argument", async () => {
    const result = await builtins.fetchGit("https://github.com/NixOS/nix.git");
    assertExists(result.toString()); // outPath
    assertEquals(result.rev.length, 40); // Full commit hash
    assertEquals(result.shortRev.length, 7); // Short hash
    assertEquals(typeof result.revCount, "bigint");
    assertEquals(typeof result.lastModified, "bigint");
    assertExists(result.narHash);
});

// Test 2: Object argument with URL
Deno.test("fetchGit - object argument with URL", async () => {
    const result = await builtins.fetchGit({
        url: "https://github.com/NixOS/nix.git",
        name: "nix-source",
    });
    assertEquals(result.toString().includes("nix-source"), true);
});

// Test 3: Specific revision
Deno.test("fetchGit - specific revision", async () => {
    const result = await builtins.fetchGit({
        url: "https://github.com/NixOS/nix.git",
        rev: "abc123...", // Use a real commit hash
    });
    assertEquals(result.rev, "abc123...");
});

// Test 4: Branch reference with auto-prefixing
Deno.test("fetchGit - branch reference", async () => {
    const result = await builtins.fetchGit({
        url: "https://github.com/NixOS/nix.git",
        ref: "master", // Should become refs/heads/master
    });
    assertExists(result.rev);
});

// Test 5: Caching works
Deno.test("fetchGit - caching works", async () => {
    const result1 = await builtins.fetchGit("https://github.com/NixOS/nix.git");
    const result2 = await builtins.fetchGit("https://github.com/NixOS/nix.git");
    assertEquals(result1.toString(), result2.toString()); // Same store path
    assertEquals(result1.rev, result2.rev); // Same metadata
});

// Test 6: Invalid URL throws error
Deno.test("fetchGit - invalid URL throws error", async () => {
    try {
        await builtins.fetchGit("https://invalid.example.com/nonexistent.git");
        throw new Error("Should have thrown");
    } catch (error) {
        assertEquals(error.message.includes("git clone failed"), true);
    }
});

// Test 7: Metadata types are correct
Deno.test("fetchGit - metadata types", async () => {
    const result = await builtins.fetchGit("https://github.com/NixOS/nix.git");
    assertEquals(typeof result.rev, "string");
    assertEquals(typeof result.shortRev, "string");
    assertEquals(typeof result.revCount, "bigint");
    assertEquals(typeof result.lastModified, "bigint");
    assertEquals(typeof result.narHash, "string");
    assertEquals(typeof result.submodules, "boolean");
});
```

**Use a small, stable test repository:**
- Don't use large repos (nixpkgs is too big)
- Use a repo with known commit hashes for testing specific revisions
- Consider creating a tiny test repo for predictable results

**Total Estimated Time**: 14-16 hours over 2-3 days

---

## 📋 DETAILED BREAKDOWN: Remaining Implementations

### 1. builtins.fetchGit - NOT IMPLEMENTED (HIGH PRIORITY - START HERE)

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


---

## 📦 Available Infrastructure (✅ ALL COMPLETE - Ready to Use)

**All infrastructure modules are fully implemented and tested:**

### main/fetcher.js (155 lines) - HTTP Downloads
- ✅ `downloadFile(url, destPath)` - Streaming download (doesn't load into memory)
- ✅ `downloadWithRetry(url, destPath, retries=3)` - Download with exponential backoff
- ✅ `extractNameFromUrl(url)` - Extract meaningful name from URL
- ✅ `validateSha256(filePath, expectedSha256)` - Validate file hash

### main/tar.js (169 lines) - Tarball Extraction
- ✅ `extractTarball(tarballPath, destDir)` - Extract .tar/.tar.gz/.tar.bz2/.tar.xz
- ✅ `stripTopLevelDirectory(extractDir)` - Strip single top-level directory
- ✅ `detectFormat(filePath)` - Detect archive format from extension
- ✅ Uses Deno @std/tar for .tar.gz, falls back to `tar` command for bzip2/xz

### main/nar_hash.js (245 lines) - Directory Hashing
- ✅ `hashDirectory(dirPath)` - Compute NAR hash (tries `nix hash path`, falls back to pure JS)
- ✅ `hashFile(filePath)` - Hash single file
- ✅ `serializeNAR(path)` - Serialize file/directory/symlink in NAR format
- ✅ Pure JavaScript NAR implementation (no Nix dependency)

### main/store_manager.js (194 lines) - Store Management
- ✅ `ensureStoreDirectory()` - Create store directory
- ✅ `computeFetchStorePath(narHash, name)` - Compute store path for fixed-output derivations
- ✅ `atomicMove(srcPath, destPath)` - Atomic rename to store
- ✅ `getCachedPath(cacheKey)` - Check cache (returns null if not cached)
- ✅ `setCachedPath(cacheKey, storePath)` - Save to cache (persistent JSON file)
- ✅ `withLock(lockName, fn)` - Exclusive file locking
- ✅ `exists(storePath)` - Check if path exists in store

### tools/store_path.js (Already existed)
- ✅ `computeStorePath(type, hashInput, name, storeDir)` - Compute Nix store paths

### tools/hashing.js (Already existed)
- ✅ `sha256Hex(data)` - SHA256 hash function
- ✅ Other hash functions as needed

**These modules power fetchurl and fetchTarball. Reuse them for fetchGit!**

## 🔍 Known Edge Cases to Handle

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

## 🧪 Testing Requirements

**Create test file**: `main/tests/builtins_<name>_test.js`

**Required test cases (minimum):**
1. Happy path - basic functionality
2. Argument variants - string vs object, optional params
3. Error cases - invalid input
4. Edge cases - empty input, special characters
5. Caching - cache hit/miss behavior (if applicable)
6. Integration - works with other builtins

**Run tests:**
```bash
deno test --allow-all                                    # all tests
deno test --allow-all main/tests/builtins_fetchgit_test.js  # specific file
```

## ✅ Definition of Done (When is Implementation Complete?)

**An implementation is NOT complete until:**
1. Documentation verified - behavior matches https://noogle.dev exactly
2. All tests pass - no skips, no .only, no known bugs
3. No NotImplemented errors remain
4. Edge cases handled - null, undefined, empty, invalid inputs
5. Error messages clear and actionable
6. Behavior matches real Nix (test against actual Nix if possible)

**RED FLAGS - NOT complete if:**
- ❌ You haven't read https://noogle.dev documentation
- ❌ Tests are skipped or commented out
- ❌ Known bugs exist (even if "minor")
- ❌ Error handling is missing
- ❌ Guessing behavior instead of reading docs

## 🎯 FINAL REMINDERS

**WORK ORDER (STRICT):**
1. Runtime (main/runtime.js) - Finish ALL fetchers/store functions FIRST
2. Translator (main.js) - ONLY after runtime complete
3. Nix-lib tests - ONLY after runtime AND translator complete

**YOU ARE IN PHASE 1: RUNTIME IMPLEMENTATION**
- Do NOT touch translator (main.js)
- Do NOT write nix-lib tests
- Do NOT work on docs/examples

**YOUR TASK:** Implement builtins.fetchGit

**BEFORE CODING:**
1. Read https://noogle.dev/f/builtins/fetchGit (entire page)
2. Read https://nix.dev/manual/nix/2.18/language/builtins (fetchGit section)
3. Write down what you learned
4. THEN start coding

**REMEMBER:**
- You are a senior developer - no blockers, only tasks to break down
- Break large tasks into 1-2 hour chunks
- Test as you go (TDD approach)
- Base implementation on Nix documentation, not guesses
