# ⚠️ CRITICAL RULES - READ FIRST ⚠️

**Your job is to focus on what is NOT implemented and NOT working. Only report what remains to be done. NEVER report accomplishments, achievements, or what you've done. You are a senior level developer - there are no blockers, only tasks to break down.**

**Before ANY work, read this entire document and filter out achievements. Only keep remaining unsolved tasks.**

---

## 🚨 ABSOLUTE WORK ORDER - MUST FOLLOW

**RULE 1: DO NOT work on nix-lib tests until the code translator is fully implemented.**

**RULE 2: DO NOT work on the translator until the runtime is fully implemented.**

**RULE 3: Finish ALL network fetchers and store functions in runtime.js BEFORE doing ANYTHING ELSE.**

**RULE 4: NEVER add checkmarks (✅), completion statements, or achievement reporting to this file.**

**RULE 5: Break down ANY task that seems blocked into smaller concrete steps.**

---

## 📋 IMMEDIATE NEXT TASK

**Awaiting user instruction on which path to take:**

- **Option A (16-22 days)**: Implement remaining optional builtins
  - fetchMercurial (2-3 days)
  - fetchClosure (5-7 days)
  - getFlake (5-7 days)
  - fetchTree type='indirect' (3-4 days)

- **Option B (2-3 days)**: Translator edge case verification
  - Advanced pattern matching
  - String escape sequences
  - Path literal edge cases
  - Operator precedence
  - Additional language features

**DO NOT choose a path yourself. Wait for user instruction.**

## 📚 MANDATORY IMPLEMENTATION PROCESS

**BEFORE writing ANY code for a builtin:**

1. **READ NOOGLE FIRST (REQUIRED)**: https://noogle.dev/f/builtins/BUILTIN_NAME
   - Study the function signature
   - Note all parameters and their types
   - Understand return type and behavior
   - Read ALL examples provided

2. **READ NIX MANUAL SECOND**: https://nix.dev/manual/nix/2.18/language/builtins
   - Verify behavior against official documentation
   - Check for edge cases and special handling
   - Note any warnings or caveats

3. **VERIFY WITH ACTUAL NIX**: Test expected behavior
   - Run example code in real Nix interpreter
   - Document actual output
   - Test edge cases

4. **THEN IMPLEMENT**: Base implementation on documentation (NOT assumptions)

5. **TEST THOROUGHLY**: Create comprehensive test file with:
   - Basic functionality tests
   - Edge case tests
   - Error handling tests
   - Comparison with actual Nix behavior

**npm Modules via esm.sh:**
- Allowed: https://esm.sh/NPM_MODULE_NAME
- Warning: esm.sh is unreliable - test imports before using
- Preferred: Use Deno standard library (@std/*) when possible

**Example: Implementing builtins.fetchTarball**
```
Step 1: Read https://noogle.dev/f/builtins/fetchTarball
Step 2: Note signature: fetchTarball(string | { url, sha256?, name? })
Step 3: Test in Nix: nix-repl> builtins.fetchTarball "https://..."
Step 4: Implement based on observed behavior
Step 5: Create main/tests/builtins_fetchtarball_test.js
```

---

## 🎯 REMAINING RUNTIME WORK

**What is NOT implemented in runtime (main/runtime.js):**

### Incomplete: fetchTree builtin
- Missing type='mercurial' handler (line 1286) - OPTIONAL (requires fetchMercurial)
- Missing type='indirect' handler (line 1294) - OPTIONAL (requires flake registry)

### Not Implemented: 3 Optional Builtins
- fetchMercurial (line 1055) - Throws NotImplemented
- fetchClosure (line 1301) - Throws NotImplemented
- getFlake (line 1836) - Throws NotImplemented

**Runtime is 95% complete. Only optional/experimental features remain.**

---

## 🎯 REMAINING TRANSLATOR WORK (DO NOT START YET)

**Edge cases that need verification (may or may not work):**

1. Nested destructuring patterns with @ and defaults
2. All string escape sequences (\n, \r, \t, \\, \", \${)
3. Path literal edge cases (./path, ../path, /abs, ~/, <nixpkgs>)
4. Operator precedence in complex expressions
5. Multi-line indented strings
6. URI literals (http://..., https://...)
7. Inherit expressions in all contexts

**See Phase 1 section (line ~500) for detailed tasks**

---

## 🎯 REMAINING TESTING WORK (DO NOT START YET)

**nixpkgs.lib files not yet tested (31 remaining):**

High priority: lists.nix, attrsets.nix, options.nix, modules.nix, meta.nix, debug.nix

See Phase 2 section (line ~620) for full list and priorities

---

# TASK DETAILS: Runtime Implementation

## Builtins That Throw NotImplemented (3 remaining)

| Builtin | Line | Est. Time | Noogle Docs | Priority |
|---------|------|-----------|-------------|----------|
| fetchMercurial | 1055 | 2-3 days | https://noogle.dev/f/builtins/fetchMercurial | LOW (Mercurial rarely used) |
| fetchClosure | 1301 | 5-7 days | https://noogle.dev/f/builtins/fetchClosure | LOW (Experimental feature) |
| getFlake | 1836 | 5-7 days | https://noogle.dev/f/builtins/getFlake | LOW (Experimental feature) |

### fetchTree Partial Implementation

fetchTree throws NotImplemented for 2 edge cases:

| Type | Line | Notes | Priority |
|------|------|-------|----------|
| 'mercurial' | 1286 | Requires fetchMercurial | LOW |
| 'indirect' | 1294 | Requires flake registry (3-4 days) | LOW |

---

## 🛠️ IMPLEMENTATION GUIDE

### Task 1: Implement fetchMercurial (2-3 days)

**MANDATORY BEFORE CODING:**
1. Read https://noogle.dev/f/builtins/fetchMercurial
2. Study all parameters: url, rev, name, allRefs
3. Understand return type structure
4. Test behavior in real Nix with examples
5. Compare with fetchGit to understand differences

Steps:
1. Verify hg is installed: Check if `hg --version` works
2. Implement fetchMercurial in runtime.js (line 1055):
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
3. Follow fetchGit pattern (lines 879-1053): Very similar structure
4. Key differences from Git:
   - Command: `hg` instead of `git`
   - Clone: `hg clone <url> <dir>` (not `git clone`)
   - Update: `hg update -r <rev>` (not `git checkout`)
   - Get rev: `hg id -i` (not `git rev-parse HEAD`)
   - Rev count: `hg log -r . --template '{rev}'` (not `git rev-list --count`)
5. Reuse existing infrastructure:
   - storeManager.addToStore() for copying to store
   - narHash() for directory hashing
   - Cache management from fetchGit pattern
6. Create comprehensive tests: main/tests/builtins_fetchmercurial_test.js
   - Test with public Mercurial repo
   - Test rev parameter
   - Test caching behavior
   - Test error handling (missing hg, invalid URL)

### Task 2: Implement fetchClosure (5-7 days)

**MANDATORY BEFORE CODING:**
1. Read https://noogle.dev/f/builtins/fetchClosure
2. Read binary cache protocol: https://nixos.org/manual/nix/stable/protocols/binary-cache-substituter-protocol.html
3. Study NAR format: https://nixos.org/manual/nix/stable/protocols/nix-archive.html
4. Test fetchClosure in real Nix with cache.nixos.org
5. Understand inputAddressed vs outputAddressed paths
6. Study .narinfo file format and fields

Requirements:
   - Fetch a store path and ALL its runtime dependencies from a binary cache
   - Verify cryptographic signatures (optional but recommended)
   - Support content-addressed paths (inputAddressed vs outputAddressed)
   - Must handle NAR files (Nix Archive format)
Implementation phases:

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
Final steps:
1. Update runtime.js line 1301 with implementation
2. Create main/tests/builtins_fetchclosure_test.js:
   - Test against cache.nixos.org (public cache)
   - Test closure computation (multi-level dependencies)
   - Test NAR unpacking
   - Test error handling (missing paths, network failures)

### Task 3: Implement getFlake (5-7 days - LOW PRIORITY, VERY COMPLEX)

**MANDATORY BEFORE CODING:**
1. Read https://noogle.dev/f/builtins/getFlake
2. Read flake manual: https://nixos.org/manual/nix/stable/command-ref/new-cli/nix3-flake.html
3. Study flake.nix structure (inputs, outputs function)
4. Study flake.lock format (version 7, nodes structure)
5. Test getFlake in real Nix with example flakes
6. Understand flakeRef syntax (github:, git+https:, path:, etc.)
7. Study input resolution and lock file generation

Flake structure:
   ```
   flake/
   ├── flake.nix       # Flake definition (outputs, inputs)
   └── flake.lock      # Locked input versions (JSON)
   ```
Implementation phases:

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

Key challenges:
   - Recursive input resolution (inputs can have inputs)
   - Flake outputs schema validation
   - System-specific outputs (packages.x86_64-linux, etc.)
   - Legacy flake formats (version 5, 6, 7)
Final steps:
1. Update runtime.js line 1836 with implementation
2. Create main/tests/builtins_getflake_test.js:
   - Test with simple flake (no inputs)
   - Test with nixpkgs input
   - Test with nested inputs
   - Test system-specific outputs

### Task 4: Implement fetchTree type='indirect' (3-4 days - LOW PRIORITY)

**MANDATORY BEFORE CODING:**
1. Read https://noogle.dev/f/builtins/fetchTree
2. Study indirect flake references in Nix manual
3. Read flake registry format: https://channels.nixos.org/flake-registry.json
4. Test indirect references in real Nix (indirect:nixpkgs)
5. Understand registry merging (global + user)

Indirect flake references:
   - Format: `indirect:flake-name` (e.g., "indirect:nixpkgs")
   - Resolves via flake registry (global + user)
   - Registry maps names to actual flake locations
Implementation phases:

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

Caching considerations:
   - Cache registry (expire after 1 hour)
   - Cache resolved flakes (same as other fetchTree types)
Final steps:
1. Update runtime.js line 1294 with implementation
2. Test in main/tests/builtins_fetchtree_test.js:
   - Test indirect:nixpkgs resolution
   - Test registry caching
   - Test error handling (unknown flake name)

---

## ⚠️ DECISION POINT

After completing Task 1 (fetchTree type='path'), you have two options:

**Option A: Continue with remaining builtins (Tasks 2-5)**
- Total time: 16-22 days
- Only do this if you have a specific need for fetchMercurial, fetchClosure, or getFlake
- These are rarely-used experimental features

**Option B: Move to translator phase (RECOMMENDED)**
- See "AFTER RUNTIME IS COMPLETE" section below
- Focus on translator edge cases and nixpkgs.lib testing
- Runtime is effectively complete for most use cases

---

---

# AFTER RUNTIME IS COMPLETE (DO NOT START UNTIL INSTRUCTED)

**DO NOT work on this section until you have completed fetchTree type='path' AND received explicit instruction to move to translator phase.**

The next phase focuses on **translator improvements** and **testing against real nixpkgs.lib code**.

## Phase 1: Translator Edge Cases (2-3 days)

The translator (main.js) has 87 passing tests but may have edge cases not yet covered. This phase focuses on **verification and testing** rather than new features.

**Approach for this phase:**
1. Create comprehensive test cases for each edge case
2. Run tests to see if they pass or fail
3. Only fix if tests reveal actual bugs
4. Document any limitations discovered

Review and implement:

### 1.1: Advanced Pattern Matching (1 day)
```javascript
// TODO: Test these patterns and fix if broken
// Pattern 1: Nested destructuring with defaults
{ a ? 1, b ? { c ? 3 }: {} }: { ... }

// Pattern 2: @ patterns with nested sets (BASIC @ TESTED, need nested)
args@{ x, y, z }: { ... }
args@{ a, b@{ c, d } }: { ... }  // Nested @ pattern

// Pattern 3: Ellipsis with bind pattern
args@{ a, b, ... }: { ... }

// Pattern 4: Mix of all features
args@{ a ? 1, b ? { c ? 2, d ? 3 }@inner: { c = 4, d = 5 }, ... }: { ... }
```

**Current status:**
- Basic @ syntax tested (main/tests/translator_test.js line ~40)
- Simple default values tested
- Need to verify complex nesting and combinations

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
<nixpkgs>  // Angle bracket paths (search path) - PARTIALLY IMPLEMENTED
```

**Known issue (line 149 in main.js):**
- `<nixpkgs>` should translate to `builtins.findFile(builtins.nixPath, "nixpkgs")`
- Currently phase4_standalone_test.js has basic tests for search paths
- Need comprehensive tests for all angle bracket path patterns

**Files to check/modify**:
- main.js path_expression handler (search for "path_expression")
- main.js line 149 (Design TODO comment)
- Expand tests in main/tests/translator_paths_test.js or phase4_standalone_test.js

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

### 1.5: Additional Language Features to Verify (0.5 days)
```javascript
// TODO: Verify these work correctly

// Multi-line strings (indented strings)
''
  Line 1
  Line 2
''

// String antiquotation edge cases
"${1 + 2}"  // Number to string
"${null}"   // Null to string
"${false}"  // Bool to string

// List concatenation operator
[1 2] ++ [3 4]

// Attrset merge operator
{ a = 1; } // { b = 2; }

// Attrset update operator (//=)
let x = { a = 1; }; in x // { a = 2; b = 3; }

// Implication operator (->)
true -> false  // Should be: !true || false

// URI literals
http://example.com
https://example.com/path

// Inherit expressions in various contexts
let a = 1; in { inherit a; }
{ inherit (x) y z; }
let inherit (x) y z; in y
```

**Files to check/modify**:
- main.js string handling (indented strings)
- main.js operator implementations
- Add tests to main/tests/translator_test.js

## Phase 2: nixpkgs.lib Test Coverage (4-6 days)

Test translator + runtime against real nixpkgs.lib files. Currently 10 lib files tested out of 41 total files (24%).

**Files tested so far:**
- ascii-table.nix, strings.nix, minfeatures.nix, source-types.nix, versions.nix
- kernel.nix, flakes.nix, flake-version-info.nix, licenses.nix, fetchers.nix
- systems/flake-systems.nix, systems/supported.nix

**Remaining files (31 untested):**
- Main lib: asserts.nix, attrsets.nix, cli.nix, customisation.nix, debug.nix, default.nix, deprecated.nix, derivations.nix, filesystem.nix, fixed-points.nix, flake.nix, generators.nix, gvariant.nix, lists.nix, meta.nix, modules.nix, options.nix, sources.nix, strings-with-deps.nix, trivial.nix, types.nix, zip-int-bits.nix (22 files)
- Systems: architectures.nix, default.nix, doubles.nix, examples.nix, inspect.nix, parse.nix, platforms.nix (7 files)

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

## 📚 KEY RESOURCES

- NAR format: https://nixos.org/manual/nix/stable/protocols/nix-archive.html
- Store paths: https://nixos.org/manual/nix/stable/store/store-path.html
- Binary cache: https://nixos.org/manual/nix/stable/protocols/binary-cache-substituter-protocol.html
- Flakes: https://nixos.org/manual/nix/stable/command-ref/new-cli/nix3-flake.html
- Nix manual builtins: https://nix.dev/manual/nix/2.18/language/builtins

---

## 🛠️ EXISTING INFRASTRUCTURE YOU CAN USE

These modules already exist and can be reused:
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

## Additional Testing Needs

Beyond the main phases above, these areas may need additional testing:

### Runtime Builtin Edge Cases (1-2 days)
```javascript
// TODO: Test edge cases for implemented builtins

// builtins.match - complex regex patterns
builtins.match "^([a-z]+)-([0-9]+)$" "foo-123"
builtins.match "(?P<name>...)" "..."  // Named groups

// builtins.split - edge cases
builtins.split "(a)" ""        // Empty string
builtins.split "" "abc"        // Empty pattern
builtins.split "()" "abc"      // Empty capture group

// builtins.replaceStrings - multiple replacements
builtins.replaceStrings ["a" "b"] ["x" "y"] "aabbaa"

// builtins.toJSON - complex nested structures
builtins.toJSON { a = [ 1 2 { b = "c"; } ]; }

// builtins.fromJSON - invalid JSON handling
builtins.fromJSON "invalid json"

// builtins.hashString - all hash types
builtins.hashString "md5" "test"
builtins.hashString "sha1" "test"
builtins.hashString "sha256" "test"
builtins.hashString "sha512" "test"

// builtins.compareVersions - complex version strings
builtins.compareVersions "1.2.3-pre" "1.2.3"
builtins.compareVersions "1.2.3.4" "1.2.3"
```

**Files to check**:
- main/runtime.js (all builtin implementations)
- Create main/tests/builtins_edge_cases_test.js

### Import System Edge Cases (0.5 days)
```javascript
// TODO: Test these import patterns

// Circular imports with different entry points
// File A imports B, B imports A
// Entry 1: import A
// Entry 2: import B
// Should both work without errors

// Import caching across scopes
builtins.scopedImport { x = 1; } ./file.nix
builtins.scopedImport { x = 2; } ./file.nix
// Should these return same or different results?

// Import with relative paths from different locations
// File /a/b.nix imports ./c.nix
// File /d/e.nix imports ../a/c.nix
// Should resolve to same file and use cache

// JSON import with invalid JSON
builtins.import ./invalid.json  // Should throw clear error
```

**Files to check**:
- main/import_loader.js
- main/import_cache.js
- Add tests to main/tests/import_integration_test.js

---

## ❌ WHAT NOT TO DO (VIOLATIONS WILL BE REJECTED)

- **NEVER** report accomplishments, achievements, or completions in this document
- **NEVER** add checkmarks (✅), status updates, or progress reports to this file
- **NEVER** work on translator before runtime is complete
- **NEVER** work on nix-lib tests before translator is complete
- **NEVER** skip reading documentation before coding (Noogle + Nix manual REQUIRED)
- **NEVER** assume behavior - always verify with actual Nix first
- **NEVER** implement based on guesses - only implement based on documented behavior
- **NEVER** skip testing against real Nix behavior
- **NEVER** claim a task is "blocked" - break it down into smaller tasks instead

---

## 📖 DOCUMENTATION REQUIREMENTS (READ WHILE WORKING)

**For EVERY implementation task, you MUST have documentation open:**

1. **Noogle** (https://noogle.dev) - Primary reference for builtin behavior
2. **Nix Manual** (https://nix.dev/manual/nix/2.18/) - Official language specification
3. **Nix Protocols** (when relevant) - Binary cache, NAR format, etc.

**While implementing builtins.fetchTarball, you should have open:**
- https://noogle.dev/f/builtins/fetchTarball
- https://nix.dev/manual/nix/2.18/language/builtins.html#builtins-fetchTarball
- Real Nix terminal for testing actual behavior

**While implementing fetchClosure, you should have open:**
- https://noogle.dev/f/builtins/fetchClosure
- https://nixos.org/manual/nix/stable/protocols/binary-cache-substituter-protocol.html
- https://nixos.org/manual/nix/stable/protocols/nix-archive.html
- Example .narinfo files from cache.nixos.org

**Citation requirement:** When implementing, add comments citing documentation:
```javascript
// Implementation based on https://noogle.dev/f/builtins/fetchTarball
// Behavior: Downloads tarball, extracts to store, returns path
"fetchTarball": async (args) => {
    // ...
}
```
