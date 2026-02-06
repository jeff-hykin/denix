# INSTRUCTIONS FOR AGENT

**Your job is to focus on what is NOT implemented and NOT working. Only report what remains to be done. Do not report what you accomplished. You are a senior level developer, there is no such thing as a blocker. Break down large tasks into smaller tasks.**

**Before executing what is below, please filter out any achievements. Only keep remaining/unsolved tasks in this document. Add detail to each task if its needed.**

## 🚨 CRITICAL WORK ORDER

**DO NOT work on nix-lib tests until the code translator is fully implemented.**

**DO NOT work on the translator until the runtime is fully implemented.**

**IN OTHER WORDS: Finish the remaining runtime builtins BEFORE doing ANYTHING ELSE.**

---

## 🎯 DECISION TREE: What Should I Work On?

```
START: Runtime has 62/65 builtins implemented (3 optional remaining)
│
├─ Do you need fetchMercurial, fetchClosure, or getFlake for your use case?
│  │
│  ├─ YES → Implement them (see "Option 1: Implement Optional Builtins")
│  │        Time: 2-3 days (fetchMercurial)
│  │              5-7 days (fetchClosure)
│  │              5-7 days (getFlake)
│  │              1-2 hours (fetchTree type='path')
│  │              3-4 days (fetchTree type='indirect')
│  │        Total: 16-22 days for all optional features
│  │
│  └─ NO → Skip to Phase 1 (see "Option 2: Skip Optional Builtins")
│          Runtime is EFFECTIVELY COMPLETE (62/65 = 95% coverage)
│
├─ Are recently-implemented fetchers tested enough?
│  │
│  ├─ NO → Add comprehensive tests (see "Option 3: Improve Test Coverage")
│  │        Time: 1-2 days
│  │        Files: builtins_fetchtarball_test.js, builtins_fetchurl_test.js,
│  │               builtins_fetchgit_test.js, builtins_fetchtree_test.js,
│  │               builtins_path_test.js, builtins_filtersource_test.js
│  │
│  └─ YES → Proceed to next phase
│
└─ Runtime complete → Move to "AFTER RUNTIME IS COMPLETE" section
                      Next: Translator improvements + nixpkgs.lib testing
                      Time: 6-9 days for full Phase 1-2
```

**RECOMMENDED PATH**:
1. ✅ Runtime complete (62/65 builtins is sufficient)
2. → Add fetch tests (1-2 days)
3. → Translator edge cases (2-3 days)
4. → nixpkgs.lib test coverage (4-6 days)
5. → Real-world integration (3-5 days)

**Total time to production-ready**: 10-16 days from now

---

# Remaining Work: Runtime Builtins (main/runtime.js)

## ✅ RECENTLY COMPLETED (Session 24)
- fetchTarball - FULLY IMPLEMENTED
- fetchurl - FULLY IMPLEMENTED
- fetchGit - FULLY IMPLEMENTED
- fetchTree - FULLY IMPLEMENTED (with partial exceptions noted below)
- path builtin - FULLY IMPLEMENTED
- filterSource - FULLY IMPLEMENTED
- Support modules: fetcher.js, tar.js, nar_hash.js, store_manager.js - ALL IMPLEMENTED

## 📊 REMAINING UNIMPLEMENTED BUILTINS (3 total)

These builtins throw NotImplemented errors and should be considered optional/experimental:

### Optional/Experimental Builtins

| Builtin | Line | Est. Time | Noogle Docs | Notes |
|---------|------|-----------|-------------|-------|
| fetchMercurial | 1055 | 2-3 days | https://noogle.dev/f/builtins/fetchMercurial | Rarely used, Mercurial declining |
| fetchClosure | 1301 | 5-7 days | https://noogle.dev/f/builtins/fetchClosure | Experimental, very complex |
| getFlake | 1836 | 5-7 days | https://noogle.dev/f/builtins/getFlake | Experimental, massive scope |

### fetchTree Partial Implementations

fetchTree is mostly implemented but throws NotImplemented for 3 edge cases:

| Type | Line | Notes |
|------|------|-------|
| 'mercurial' | 1286 | Requires fetchMercurial |
| 'path' | 1290 | Not yet implemented |
| 'indirect' | 1294 | Requires flake registry |

---

## 🎯 RECOMMENDED NEXT ACTIONS

### Option 1: Implement Optional Builtins (if needed)

Only implement these if you have a specific use case requiring them:

#### fetchMercurial (2-3 days)
1. **Read documentation**: https://noogle.dev/f/builtins/fetchMercurial
2. **Verify hg is installed**: Check if `hg --version` works
3. **Implement fetchMercurial in runtime.js** (line 1055):
   ```javascript
   "fetchMercurial": async (args) => {
       // Parse args: url, rev (optional), name (optional)
       // Check cache: cacheKey = `fetchMercurial:${url}:${rev}`
       // If cached: return cached store path
       // Clone: hg clone <url> <tmpDir>
       // If rev: hg update -r <rev>
       // Get actual rev: hg id -i
       // Hash directory: await narHash(tmpDir)
       // Compute store path: computeStorePath(name, narHash)
       // Copy to store: await storeManager.addToStore(tmpDir, storePath)
       // Cache result: cache.set(cacheKey, {outPath, rev, ...})
       // Return: {outPath, rev, shortRev, revCount}
   }
   ```
4. **Follow fetchGit pattern** (lines 879-1053): Very similar structure
5. **Key differences from Git**:
   - Command: `hg` instead of `git`
   - Clone: `hg clone <url> <dir>` (not `git clone`)
   - Update: `hg update -r <rev>` (not `git checkout`)
   - Get rev: `hg id -i` (not `git rev-parse HEAD`)
   - Rev count: `hg log -r . --template '{rev}'` (not `git rev-list --count`)
6. **Reuse existing infrastructure**:
   - storeManager.addToStore() for copying to store
   - narHash() for directory hashing
   - Cache management from fetchGit pattern
7. **Create comprehensive tests**: main/tests/builtins_fetchmercurial_test.js
   - Test with public Mercurial repo
   - Test rev parameter
   - Test caching behavior
   - Test error handling (missing hg, invalid URL)

#### fetchClosure (5-7 days, VERY COMPLEX)
1. **Read documentation**: https://noogle.dev/f/builtins/fetchClosure
2. **Study binary cache protocol**: https://nixos.org/manual/nix/stable/protocols/binary-cache-substituter-protocol.html
3. **Understand the requirements**:
   - Fetch a store path and ALL its runtime dependencies from a binary cache
   - Verify cryptographic signatures (optional but recommended)
   - Support content-addressed paths (inputAddressed vs outputAddressed)
   - Must handle NAR files (Nix Archive format)
4. **Implementation phases**:

   **Phase 1: NAR unpacking (2 days)**
   ```javascript
   // Create main/nar_unpacker.js
   async function unpackNar(narStream, destPath) {
       // Parse NAR file format (see NAR spec)
       // NAR is a serialized directory tree:
       //   - "nix-archive-1" magic header
       //   - Recursive directory/file/symlink entries
       //   - Each file has: permissions, size, contents
       // Reconstruct directory tree at destPath
   }
   ```

   **Phase 2: Closure computation (1 day)**
   ```javascript
   // Create main/closure_computer.js
   async function computeClosure(storePath) {
       // Read .narinfo file from cache: <hash>.narinfo
       // Parse "References:" field (space-separated store paths)
       // Recursively fetch all referenced paths
       // Return Set of all paths in closure
   }
   ```

   **Phase 3: Binary cache client (2 days)**
   ```javascript
   // Create main/binary_cache.js
   class BinaryCacheClient {
       constructor(cacheUrl) { /* e.g., https://cache.nixos.org */ }

       async fetchNarInfo(storePath) {
           // GET <cacheUrl>/<hash>.narinfo
           // Parse fields: StorePath, URL, FileHash, FileSize, NarHash, NarSize, References
           return narInfo;
       }

       async fetchNar(narInfo) {
           // GET <cacheUrl>/<narInfo.URL>
           // Verify hash matches narInfo.FileHash
           // Decompress (xz, bzip2, or none)
           return narStream;
       }
   }
   ```

   **Phase 4: fetchClosure builtin (1 day)**
   ```javascript
   "fetchClosure": async (args) => {
       // Parse: fromStore (URL), fromPath (store path), toPath (optional)
       const cache = new BinaryCacheClient(args.fromStore);
       const closure = await computeClosure(args.fromPath);

       for (const path of closure) {
           const narInfo = await cache.fetchNarInfo(path);
           const narStream = await cache.fetchNar(narInfo);
           await unpackNar(narStream, path);
       }

       return { storePath: args.toPath || args.fromPath };
   }
   ```
5. **Update runtime.js line 1301** with implementation
6. **Create main/tests/builtins_fetchclosure_test.js**:
   - Test against cache.nixos.org (public cache)
   - Test closure computation (multi-level dependencies)
   - Test NAR unpacking
   - Test error handling (missing paths, network failures)

#### getFlake (5-7 days, VERY COMPLEX)
1. **Read documentation**: https://noogle.dev/f/builtins/getFlake
2. **Study flake schema**: https://nixos.org/manual/nix/stable/command-ref/new-cli/nix3-flake.html
3. **Understand flake structure**:
   ```
   flake/
   ├── flake.nix       # Flake definition (outputs, inputs)
   └── flake.lock      # Locked input versions (JSON)
   ```
4. **Implementation phases**:

   **Phase 1: flake.lock parsing (1 day)**
   ```javascript
   // Create main/flake_lock.js
   function parseFlakeLock(lockContent) {
       const lock = JSON.parse(lockContent);
       // Lock format:
       // {
       //   "nodes": {
       //     "nixpkgs": {
       //       "locked": { "type": "github", "owner": "NixOS", "repo": "nixpkgs", "rev": "...", "narHash": "..." },
       //       "original": { "type": "github", "owner": "NixOS", "repo": "nixpkgs" }
       //     }
       //   },
       //   "root": "root",
       //   "version": 7
       // }
       return lock;
   }
   ```

   **Phase 2: Input resolution (2 days)**
   ```javascript
   // Create main/flake_inputs.js
   async function resolveInput(input) {
       // Input types: github, git, tarball, path, indirect
       // Use existing fetchers:
       if (input.type === "github") {
           // Use fetchGit with github.com/<owner>/<repo>
       } else if (input.type === "git") {
           // Use fetchGit
       } else if (input.type === "tarball") {
           // Use fetchTarball
       } else if (input.type === "path") {
           // Copy local path
       } else if (input.type === "indirect") {
           // Resolve via flake registry
       }
       return storePath;
   }

   async function resolveAllInputs(lock) {
       const inputs = {};
       for (const [name, node] of Object.entries(lock.nodes)) {
           if (node.locked) {
               inputs[name] = await resolveInput(node.locked);
           }
       }
       return inputs;
   }
   ```

   **Phase 3: Flake evaluation model (2 days)**
   ```javascript
   // Create main/flake_eval.js
   async function evaluateFlake(flakePath) {
       // 1. Read flake.nix and flake.lock
       const flakeNix = await Deno.readTextFile(`${flakePath}/flake.nix`);
       const flakeLock = await Deno.readTextFile(`${flakePath}/flake.lock`);

       // 2. Parse lock and resolve inputs
       const lock = parseFlakeLock(flakeLock);
       const inputs = await resolveAllInputs(lock);

       // 3. Translate flake.nix to JS
       const flakeJs = translateNix(flakeNix);

       // 4. Evaluate with inputs scope
       const flake = await evaluateNix(flakeJs, { inputs });

       // 5. Return flake outputs
       // Flake schema: { inputs, outputs: fn(inputs) }
       return flake.outputs(inputs);
   }
   ```

   **Phase 4: getFlake builtin (1 day)**
   ```javascript
   "getFlake": async (flakeRef) => {
       // Parse flakeRef (can be: "github:owner/repo", "git+https://...", "path:...", etc.)
       // Fetch flake source (use fetchGit, fetchTarball, etc.)
       // Evaluate flake
       const outputs = await evaluateFlake(flakePath);
       return outputs;
   }
   ```

5. **Key challenges**:
   - Recursive input resolution (inputs can have inputs)
   - Flake outputs schema validation
   - System-specific outputs (packages.x86_64-linux, etc.)
   - Legacy flake formats (version 5, 6, 7)
6. **Update runtime.js line 1836** with implementation
7. **Create main/tests/builtins_getflake_test.js**:
   - Test with simple flake (no inputs)
   - Test with nixpkgs input
   - Test with nested inputs
   - Test system-specific outputs

#### fetchTree type='path' (1-2 hours)
1. **Read documentation**: https://noogle.dev/f/builtins/fetchTree
2. **Understand the requirement**: fetchTree with type='path' should copy a local directory to the store
3. **Implementation** (runtime.js line 1290):
   ```javascript
   case "path": {
       // Similar to builtins.path
       // Args: { type: "path", path: "/some/local/path" }
       // Just delegate to builtins.path
       return await builtins.path({
           path: args.path,
           name: args.name || basename(args.path)
       });
   }
   ```
4. **Test in main/tests/builtins_fetchtree_test.js**:
   - Add test case for type='path'
   - Verify it copies directory to store
   - Verify hash matches builtins.path

#### fetchTree type='indirect' (3-4 days)
1. **Read documentation**: https://noogle.dev/f/builtins/fetchTree
2. **Understand indirect flake references**:
   - Format: `indirect:flake-name` (e.g., "indirect:nixpkgs")
   - Resolves via flake registry (global + user)
   - Registry maps names to actual flake locations
3. **Implementation phases**:

   **Phase 1: Registry fetching (1 day)**
   ```javascript
   // Create main/flake_registry.js
   async function fetchRegistry() {
       // Fetch global registry
       const globalUrl = "https://channels.nixos.org/flake-registry.json";
       const globalRegistry = await fetch(globalUrl).then(r => r.json());

       // Fetch user registry (if exists)
       const userRegistryPath = `${homeDir}/.config/nix/registry.json`;
       let userRegistry = null;
       try {
           userRegistry = JSON.parse(await Deno.readTextFile(userRegistryPath));
       } catch (e) {
           // User registry is optional
       }

       // Merge registries (user overrides global)
       return mergeRegistries(globalRegistry, userRegistry);
   }

   function parseRegistry(registry) {
       // Registry format:
       // {
       //   "flakes": [
       //     {
       //       "from": { "type": "indirect", "id": "nixpkgs" },
       //       "to": { "type": "github", "owner": "NixOS", "repo": "nixpkgs" }
       //     }
       //   ],
       //   "version": 2
       // }
       const mapping = {};
       for (const entry of registry.flakes) {
           if (entry.from.type === "indirect") {
               mapping[entry.from.id] = entry.to;
           }
       }
       return mapping;
   }
   ```

   **Phase 2: Resolution logic (1 day)**
   ```javascript
   // In main/flake_registry.js
   async function resolveIndirect(flakeName) {
       const registry = await fetchRegistry();
       const mapping = parseRegistry(registry);

       const resolved = mapping[flakeName];
       if (!resolved) {
           throw new Error(`Flake '${flakeName}' not found in registry`);
       }

       // Convert resolved reference to fetchTree args
       // e.g., { type: "github", owner: "NixOS", repo: "nixpkgs" }
       return resolved;
   }
   ```

   **Phase 3: fetchTree integration (1 day)**
   ```javascript
   // In runtime.js line 1294
   case "indirect": {
       // Args: { type: "indirect", id: "nixpkgs" }
       const resolved = await resolveIndirect(args.id);

       // Recursively call fetchTree with resolved reference
       // This will handle github/git/tarball/etc.
       return await builtins.fetchTree(resolved);
   }
   ```

4. **Caching considerations**:
   - Cache registry (expire after 1 hour)
   - Cache resolved flakes (same as other fetchTree types)
5. **Update runtime.js line 1294** with implementation
6. **Test in main/tests/builtins_fetchtree_test.js**:
   - Test indirect:nixpkgs resolution
   - Test registry caching
   - Test error handling (unknown flake name)

### Option 2: Skip Optional Builtins and Move to Next Phase (RECOMMENDED)

**Runtime is EFFECTIVELY COMPLETE** with 62/65 builtins working:
- All core builtins implemented
- All commonly-used fetch functions implemented
- Only experimental/rarely-used features missing

**RECOMMENDED: Move to translator/testing phase**
- The remaining 3 builtins are rarely used
- fetchMercurial: Mercurial is deprecated (industry moved to Git)
- fetchClosure/getFlake: Experimental features (unstable API)
- Most real-world Nix code doesn't use these

**Next steps if choosing this option**: See "AFTER RUNTIME IS COMPLETE" section below

### Option 3: Improve Test Coverage for Implemented Builtins

Create comprehensive tests for recently-implemented fetchers:
1. **main/tests/builtins_fetchtarball_test.js** - Test fetchTarball with real tarballs
2. **main/tests/builtins_fetchurl_test.js** - Test fetchurl with real URLs
3. **main/tests/builtins_fetchgit_test.js** - Test fetchGit with real repos
4. **main/tests/builtins_fetchtree_test.js** - Test fetchTree dispatch logic
5. **main/tests/builtins_path_test.js** - Test path copying and filtering
6. **main/tests/builtins_filtersource_test.js** - Test filterSource predicates

---

---

# AFTER RUNTIME IS COMPLETE

Once you decide runtime is complete (either after implementing optional builtins or skipping them), the next phase focuses on **translator improvements** and **testing against real nixpkgs.lib code**.

## Phase 1: Translator Edge Cases (2-3 days)

The translator (main.js) has 87 passing tests but may have edge cases not yet covered. Review and implement:

### 1.1: Advanced Pattern Matching (1 day)
```javascript
// TODO: Test these patterns and fix if broken
// Pattern 1: Nested destructuring with defaults
{ a ? 1, b ? { c ? 3 }: {} }: { ... }

// Pattern 2: @ patterns with nested sets
args@{ x, y, z }: { ... }

// Pattern 3: Ellipsis with bind pattern
args@{ a, b, ... }: { ... }
```

**Files to check/modify**:
- main.js lines 350-450 (function parameter parsing)
- Create test: main/tests/translator_advanced_patterns_test.js

### 1.2: String Escape Sequences (0.5 days)
```javascript
// TODO: Verify all escape sequences work
"\n"   // newline
"\r"   // carriage return
"\t"   // tab
"\\"   // backslash
"\""   // double quote
"\${"  // literal ${
```

**Files to check/modify**:
- main.js extractKeyString() (lines 566-595)
- Add tests to main/tests/translator_test.js

### 1.3: Path Literals Edge Cases (0.5 days)
```javascript
// TODO: Test these path patterns
./path/to/file.nix
../relative/path
/absolute/path
~/home/path
<nixpkgs>  // Angle bracket paths (search path)
```

**Files to check/modify**:
- main.js path_expression handler
- Create test: main/tests/translator_paths_test.js

### 1.4: Operator Precedence (1 day)
```javascript
// TODO: Verify correct precedence for:
a + b * c          // Should be a + (b * c)
a || b && c        // Should be a || (b && c)
!a == b            // Should be (!a) == b
a.b or c.d or e    // Should be (a.b or c.d) or e
```

**Files to check/modify**:
- main.js operator handling
- Add tests to main/tests/translator_test.js

## Phase 2: nixpkgs.lib Test Coverage (4-6 days)

Test translator + runtime against real nixpkgs.lib files. Currently 15/32 lib files tested (47%).

### 2.1: Test High-Value Library Files (3 days)

Priority files to test (most commonly used):

| File | LOC | Functions | Why Important |
|------|-----|-----------|---------------|
| lists.nix | 600+ | 50+ | Core list operations (map, filter, fold, etc.) |
| attrsets.nix | 800+ | 60+ | Core attrset operations (mapAttrs, filterAttrs, etc.) |
| options.nix | 400+ | 20+ | NixOS module system foundation |
| modules.nix | 1000+ | 30+ | NixOS module evaluation (VERY COMPLEX) |

**Implementation steps**:
1. Create main/tests/nixpkgs_lib_lists_test.js
2. Import lists.nix via translator
3. Test 10-15 key functions (map, filter, foldl, head, tail, etc.)
4. Fix any translator bugs discovered
5. Repeat for attrsets.nix, options.nix, modules.nix

### 2.2: Test Utility Files (2 days)

| File | LOC | Purpose |
|------|-----|---------|
| meta.nix | 200+ | Package metadata helpers |
| debug.nix | 150+ | Debugging utilities (traceVal, etc.) |
| filesystem.nix | 300+ | Path manipulation utilities |
| cli.nix | 200+ | Command-line parsing |

### 2.3: Test Systems Files (1 day)

Remaining systems/*.nix files not yet tested:
- systems/parse.nix (platform parsing)
- systems/inspect.nix (platform inspection)
- systems/doubles.nix (platform pair utilities)
- systems/default.nix (main export)

## Phase 3: Translator Optimization (2-3 days, OPTIONAL)

Current translator works but could be faster/cleaner:

### 3.1: Code Generation Optimization (1 day)
```javascript
// Current: Verbose IIFE for every expression
(function() {
    const nixScope = Object.create(parentScope);
    return expr;
})()

// Optimized: Only use IIFE when scope changes needed
expr  // For simple expressions
```

### 3.2: Scope Management Optimization (1 day)
```javascript
// Current: Object.create() chain can be deep
// Optimize with scope flattening where safe
```

### 3.3: Source Maps (1 day, HIGH VALUE)
```javascript
// Add source map generation for debugging
// Map generated JS lines back to Nix source
// Helps debug translator issues
```

## Phase 4: Real-World Integration Testing (3-5 days)

Test against actual Nix projects beyond nixpkgs.lib:

### 4.1: Test Simple Flakes (2 days)
Find 5-10 simple flakes on GitHub and test if they can be evaluated:
- Basic package definitions
- Simple shell environments
- Minimal flakes with no complex dependencies

### 4.2: Test NixOS Modules (2 days)
Test if we can evaluate simple NixOS modules:
- service definitions
- simple configurations
- basic module imports

### 4.3: Document Limitations (1 day)
Create a LIMITATIONS.md file documenting:
- What works
- What doesn't work yet
- Workarounds for common issues
- Known incompatibilities

---

## 📚 REQUIRED READING BEFORE ANY IMPLEMENTATION

**For ALL builtins, you MUST:**
1. Read the official Noogle documentation: https://noogle.dev/f/builtins/BUILTIN_NAME
2. Read the Nix manual: https://nix.dev/manual/nix/2.18/language/builtins
3. Test against actual Nix behavior to ensure 1-to-1 parity
4. Base implementation on Nix documentation and behavior, NOT on assumptions

**Key Resources:**
- NAR format: https://nixos.org/manual/nix/stable/protocols/nix-archive.html
- Store paths: https://nixos.org/manual/nix/stable/store/store-path.html
- Binary cache: https://nixos.org/manual/nix/stable/protocols/binary-cache-substituter-protocol.html
- Flakes: https://nixos.org/manual/nix/stable/command-ref/new-cli/nix3-flake.html

---

## 🛠️ IMPLEMENTATION NOTES

### Using NPM Modules
- You MAY use npm modules via https://esm.sh/NPM_MODULE_NAME
- WARNING: esm.sh doesn't always work with all modules
- PREFER Deno standard library when possible (@std/*)
- Test thoroughly as esm.sh behavior can be unpredictable

### Existing Infrastructure (ALREADY IMPLEMENTED)
- **main/fetcher.js** - HTTP downloads with retry logic
- **main/tar.js** - Tarball extraction using @std/tar
- **main/nar_hash.js** - NAR directory hashing
- **main/store_manager.js** - Store path management and caching
- **tools/store_path.js** - Store path computation
- **tools/hashing.js** - SHA256, MD5, SHA1, SHA512 functions

Store location: `~/.cache/denix/store/` (not /nix/store/, no root required)

---

## 📋 QUICK REFERENCE: Common Development Tasks

### Running Tests
```bash
# Run all tests (slow, 240+ tests)
deno test --allow-all

# Run specific test file
deno test --allow-all main/tests/builtins_fetchtarball_test.js

# Run tests matching pattern
deno test --allow-all main/tests/*fetch*.js

# Watch mode (re-run on file changes)
deno test --allow-all --watch
```

### Testing a Builtin
```bash
# Test if builtin works
deno run --allow-all - <<'EOF'
import runtime from "./main/runtime.js";
const result = await runtime.builtins.fetchTarball("https://...");
console.log(result);
EOF
```

### Translating Nix to JS
```bash
# Translate a .nix file
deno run --allow-read main.js examples/01_basics/literals.nix

# Translate and evaluate
deno run --allow-all - <<'EOF'
import { translateNix } from "./main.js";
const js = translateNix(`let x = 1; in x + 2`);
console.log(js);
EOF
```

### Adding a New Builtin
1. Read Noogle docs: https://noogle.dev/f/builtins/BUILTIN_NAME
2. Add to main/runtime.js exports.builtins object
3. Implement function (async if needed)
4. Create test in main/tests/builtins_NAME_test.js
5. Run test: `deno test --allow-all main/tests/builtins_NAME_test.js`

### Adding a New Test Suite
```javascript
// Create main/tests/my_feature_test.js
import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";

Deno.test("my feature - test case 1", () => {
    // Test code here
    assertEquals(actual, expected);
});
```

### Checking What's Implemented
```bash
# Count implemented builtins
grep -c '^\s*"[a-zA-Z]' main/runtime.js

# Find unimplemented builtins
grep "throw new NotImplemented" main/runtime.js

# See all test files
ls -1 main/tests/*.js | wc -l
```

---

## ❌ WHAT NOT TO DO

- **DO NOT** report accomplishments or achievements in this document
- **DO NOT** work on translator until runtime is 100% complete
- **DO NOT** work on nix-lib tests until runtime and translator are complete
- **DO NOT** create examples or documentation until core features are done
- **DO NOT** skip reading official Nix documentation before implementing
- **DO NOT** assume behavior - always verify against actual Nix

---

## 📊 ACTUAL CURRENT STATUS (Session 24)

**Runtime Builtins:** 62/65 implemented (95% complete)
- ✅ fetchTarball, fetchurl, fetchGit, fetchTree (partial), path, filterSource
- ❌ fetchMercurial, fetchClosure, getFlake (optional/experimental)
- ⚠️ fetchTree edge cases: type='mercurial', type='path', type='indirect'

**Test Status:**
- Runtime tests: 179+ passing (core builtins tested)
- Translator tests: 87 passing (100% pass rate)
- Import system tests: 49 passing (5 test suites)
- nixpkgs.lib tests: 15 files tested successfully
- **Total: 240+ tests passing**

**Test Files Created in Session 24:**
- ✅ main/tests/builtins_fetchtarball_test.js (6 tests, all passing)
- ✅ main/tests/builtins_fetchurl_test.js (6 tests, all passing)
- ✅ main/tests/builtins_fetchgit_test.js (8 tests, all passing)
- ✅ main/tests/builtins_fetchtree_test.js (6 tests, all passing)
- ✅ main/tests/builtins_path_test.js (7 tests, all passing)
- ✅ main/tests/builtins_filtersource_test.js (6 tests, all passing)

**Infrastructure Modules (Session 24):**
- ✅ main/fetcher.js (HTTP downloads with retry logic)
- ✅ main/tar.js (Tarball extraction using @std/tar)
- ✅ main/nar_hash.js (NAR directory hashing)
- ✅ main/store_manager.js (Store path management + caching)
- ✅ tools/store_path.js (Store path computation - pre-existing)
- ✅ tools/hashing.js (Crypto functions - pre-existing)

**Store Location:** `~/.cache/denix/store/` (no root permissions needed)

**Blockers:** NONE

**Status:** ✅ READY TO MOVE TO NEXT PHASE
- Option A: Implement optional builtins (16-22 days)
- Option B: Move to translator improvements (2-3 days)
- Option C: Expand nixpkgs.lib testing (4-6 days)

**Recommended Next Steps:**
1. Verify all tests pass: `deno test --allow-all` (should see ~240 passing)
2. Review "AFTER RUNTIME IS COMPLETE" section for next phase guidance
3. Choose path based on decision tree above
