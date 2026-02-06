# Task: Implement a translator from Nix to JavaScript

Your job is to focus on what is NOT implemented and NOT working. Only report what remains to be done. Do not report what you accomplished. You are a senior level developer, there is no such thing as a blocker. Break down large tasks into smaller tasks.

## Current Status (2026-02-06)

**System State**:
- Translator: 87/87 tests passing - PRODUCTION READY ✅
- Runtime: 61/98 Nix 2.18 builtins working, 170+ tests passing ✅
- Import system: Fully functional (builtins.import + builtins.scopedImport) ✅
- Examples: 7 translation examples with documentation ✅
- Tests: All 73 tests passing (when run with --allow-all flag) ✅

**File Testing Progress**:
- 12/32 core nixpkgs.lib files tested (37.5%)
- Goal: Reach 50%+ coverage before moving to store/fetcher work

## Current Tasks Overview

1. **Priority 1**: Test more nixpkgs.lib files (1-2 weeks) - NEXT PRIORITY
2. **Priority 2**: Store Path System (1-2 weeks)
3. **Priority 3**: Network Fetchers (3-5 weeks)

---

## Priority 1: nixpkgs.lib Testing (NEXT PRIORITY)

**Goal**: Validate translator against real-world nixpkgs code
**Current**: 12/32 core lib files tested (37.5%)
**Target**: 20/32 files (62%) before moving to Priority 2

### Files Already Tested (12 files)

1. ✅ ascii-table.nix - 98 ASCII character code mappings
2. ✅ strings.nix - String manipulation (imports ascii-table.nix)
3. ✅ minfeatures.nix - Nix version feature detection
4. ✅ source-types.nix - Source type definitions
5. ✅ versions.nix - Version parsing (major/minor/patch)
6. ✅ kernel.nix - Linux kernel config helpers
7. ✅ flakes.nix - Re-exports builtins.parseFlakeRef/flakeRefToString
8. ✅ flake-version-info.nix - Lib overlay with version metadata
9. ✅ systems/flake-systems.nix - List of 10 supported platforms
10. ✅ systems/supported.nix - Platform tiers (tier1/tier2/tier3/hydra)
11. ✅ licenses.nix - 289 license definitions (Session 20)
12. ✅ fetchers.nix - Hash normalization utilities

### Next Files to Test (20 remaining)

**Immediate priorities** (standalone, minimal dependencies):

1. [ ] **systems/parse.nix** (1-2 hours)
   - Platform string parser: "x86_64-linux" → {cpu, vendor, kernel, abi}
   - Large complex attrset with types, predicates, parsers
   - Test: Parse common platforms, verify structure

2. [ ] **systems/inspect.nix** (30 min)
   - Platform inspection predicates (isLinux, isDarwin, isAarch64)
   - Depends on parse.nix
   - Test: Predicate functions return correct values

3. [ ] **systems/doubles.nix** (15 min)
   - Simple list of valid platform strings
   - Test: Verify it's a list, check common platforms exist

4. [ ] **systems/default.nix** (30 min)
   - Aggregates parse + inspect + doubles
   - Test: Verify re-exports work correctly

5. [ ] **meta.nix** (1 hour)
   - Package metadata utilities (availableOn, platformMatch, licenseAllowed)
   - Test: Platform matching, license checking functions

6. [ ] **debug.nix** (30 min)
   - Debugging utilities (traceIf, traceVal, traceSeq)
   - Wraps builtins.trace with conditional variants
   - Test: Conditional tracing, pass-through values

7. [ ] **generators.nix** (1-2 hours)
   - JSON/YAML/INI generators (toPretty, toYAML, toINI)
   - May need lib.strings functions
   - Test: Format generation for each type

8. [ ] **cli.nix** (1 hour)
   - CLI argument parsers (toGNUCommandLine)
   - Converts attrsets to command-line arguments
   - Test: {verbose=true; file="x.txt"} → ["--verbose" "--file" "x.txt"]

9. [ ] **derivations.nix** (1 hour)
   - Derivation helpers (lazyDerivation)
   - Should work (builtins.derivation fully implemented)
   - Test: Helper functions wrap derivation correctly

10. [ ] **filesystem.nix** (1 hour)
    - Filesystem utilities
    - Test: Path operations, validation

**Complex files** (need full lib context):

11. [ ] **fixed-points.nix** (2-3 hours)
    - lib.fix, lib.extends, lib.composeManyExtensions
    - Y combinator for recursion
    - Needs lib.trivial.id, lib.trivial.const
    - Test: fix, extends with simple functions

12. [ ] **trivial.nix** (1-2 hours)
    - Core utilities (id, const, pipe, flip, and, or, etc.)
    - 20 functions already tested standalone
    - Need to test in full lib context with imports
    - Test: All 20+ functions in context

13. [ ] **lists.nix** (2-3 hours)
    - List operations (fold, filter, map, etc.)
    - Heavy lib.trivial usage
    - Test: head, tail, map, filter, foldl, foldr, concat

14. [ ] **attrsets.nix** (2-3 hours)
    - Attrset operations (mapAttrs, filterAttrs, etc.)
    - Needs lib.trivial and lib.lists
    - Test: mapAttrs, filterAttrs, catAttrs, genAttrs

15. [ ] **asserts.nix** (1 hour)
    - Assertion helpers
    - Uses lib.trivial functions
    - Test: assertMsg, assertOneOf

16. [ ] **path/** directory (3-4 hours)
    - path/append.nix, path/has-prefix.nix, etc.
    - 5+ files for path manipulation
    - Test: Path operations, validation

**Blocked by infrastructure** (Priority 3):

17. [ ] **sources.nix** - Needs fetch* builtins
18. [ ] **customisation.nix** - Needs full derivation system

**Very complex** (multi-week projects):

19. [ ] **modules.nix** - NixOS module system (1000+ lines)
20. [ ] **types.nix** - NixOS type system (500+ lines)

### Implementation Strategy

**Phase 1** (2-3 days): Test systems/*.nix files (4 files)
- systems/parse.nix, systems/inspect.nix, systems/doubles.nix, systems/default.nix
- Gets us to 16/32 files (50%)

**Phase 2** (2-3 days): Test utility files (6 files)
- meta.nix, debug.nix, generators.nix, cli.nix, derivations.nix, filesystem.nix
- Gets us to 22/32 files (69%)

**Phase 3** (deferred): Complex files requiring full lib context
- fixed-points, trivial, lists, attrsets, asserts, path/*
- Requires building lib aggregator or mocking lib dependencies

---

## Priority 2: Store Path System

**Time**: 1-2 weeks
**Dependencies**: None (can start anytime)
**Blocks**: Network fetchers (Priority 3)

### Tasks

1. [ ] **Research Phase** (2-3 days)
   - Study NAR (Nix Archive) format specification
   - Understand fixed-output derivation store path formula
   - Review tools/store_path.js for reusable code
   - Read: https://nixos.org/manual/nix/stable/protocols/store-path.html

2. [ ] **Create helpers/store.js** (2-3 days)
   - Implement fixed-output store path computation
   - Implement file integrity verification (SHA256)
   - Implement atomic file operations (temp + move)
   - Create store path registry (in-memory Map)
   - Handle fallback to ~/.cache/denix/store

3. [ ] **Testing** (1-2 days)
   - Create main/tests/store_test.js
   - Test path computation matches Nix
   - Test hash verification (success/failure)
   - Test atomic operations
   - Test store directory creation/fallback

4. [ ] **Documentation** (1 day)
   - Document store path algorithm
   - Document fallback behavior
   - Add usage examples

### Key Implementation Notes

**Fixed-output store path formula**:
```
Fingerprint: "fixed:out:<hashAlgo>:<hash>:/nix/store:<name>"
Store path: /nix/store/<base32(truncate(sha256(fingerprint)))>-<name>
```

**Reusable from tools/store_path.js**:
- nixBase32Encode() - base32 encoding
- sha256Hex() - SHA256 hashing
- makeStorePathHash() - hash truncation

**Directory fallback**:
- Try /nix/store first (if writable)
- Fall back to ~/.cache/denix/store
- Document which path is used

---

## Priority 3: Network Fetchers

**Time**: 3-5 weeks
**Dependencies**: Store Path System (Priority 2)
**Blocks**: sources.nix testing

### 3.1 fetchurl Implementation (1-2 weeks)

**Tasks**:

1. [ ] **Create helpers/fetch.js** (2-3 days)
   - Implement HTTP/HTTPS fetch with error handling
   - Add retry logic with exponential backoff (3 retries: 1s, 2s, 4s)
   - Stream download to temp file (don't load into memory)
   - Handle redirects (use fetch with redirect: "follow")

2. [ ] **Integrate with store system** (1-2 days)
   - Verify SHA256 hash of downloaded file
   - Move verified file to /nix/store with computed path
   - Return store path as Path object

3. [ ] **Handle parameters** (1 day)
   - url (required) - URL to download
   - sha256 (required) - Expected hash
   - name (optional) - Store path name
   - executable (optional) - Make file executable

4. [ ] **Testing** (2-3 days)
   - Create main/tests/fetchurl_test.js
   - Test downloading small file
   - Test hash verification (correct/wrong hash)
   - Test retry logic (mock network failures)
   - Test redirect following
   - Test timeout handling

5. [ ] **Documentation** (1 day)
   - Document usage and limitations
   - Add examples

### 3.2 fetchTarball Implementation (2-3 weeks)

**Tasks**:

1. [ ] **Research tar extraction** (2-3 days)
   - Evaluate options:
     - Option 1: Deno standard library @std/archive
     - Option 2: deno.land/x/compress
     - Option 3: ESM.sh npm packages (tar-stream, tar-fs)
     - Option 4 (RECOMMENDED): Shell out to tar CLI
   - Choose and test extraction approach

2. [ ] **Research NAR hashing** (2-3 days)
   - Study NAR format specification
   - Decide on approach:
     - Approach A (RECOMMENDED): Shell out to `nix hash path`
     - Approach B: Implement full NAR serializer (multi-week project)
   - Start with Approach A for MVP

3. [ ] **Implement tarball extraction** (2-3 days)
   - Download tarball (reuse fetchurl logic)
   - Extract to temporary directory
   - Handle formats: .tar.gz, .tar.bz2, .tar.xz, .tar

4. [ ] **Implement directory hashing** (3-5 days)
   - Compute hash of extracted directory (not tarball!)
   - Use NAR-compatible algorithm (or shell out to nix)
   - Verify hash matches expected

5. [ ] **Store extracted content** (1-2 days)
   - Compute store path from hash + name
   - Move extracted directory to /nix/store
   - Clean up temp files

6. [ ] **Testing** (2-3 days)
   - Create main/tests/fetchtarball_test.js
   - Test .tar.gz extraction
   - Test directory hash computation
   - Test hash verification
   - Test cleanup of temp files

7. [ ] **Documentation** (1 day)
   - Document hash computation algorithm
   - Document supported formats
   - Add examples

### 3.3 Other Fetch Functions (Future)

After fetchurl and fetchTarball work:

- [ ] **fetchGit** - Clone git repo (use git CLI)
- [ ] **fetchMercurial** - Clone hg repo (use hg CLI)
- [ ] **fetchTree** - Generic fetcher
- [ ] **fetchClosure** - Binary cache downloads (very complex)

---

## Priority 4: Performance & Optimization (Deferred)

**Time**: Weeks to months
**When**: After Priority 1-3 complete

### Tasks

1. [ ] Profile translator performance on large files
2. [ ] Optimize recursive scope traversal
3. [ ] Cache parsed ASTs to avoid re-parsing
4. [ ] Add lazy evaluation optimizations for large attribute sets
5. [ ] Benchmark against native Nix evaluation
6. [ ] Document performance characteristics

---

## Priority 5: Documentation (Deferred)

**Time**: 1-2 weeks
**When**: After major features complete

### Tasks

1. [ ] Document translator limitations (LIMITATIONS.md)
2. [ ] Create ARCHITECTURE.md explaining system design
3. [ ] Add inline comments for complex translation logic
4. [ ] Document scope management strategy (SCOPES.md)
5. [ ] Create troubleshooting guide (TROUBLESHOOTING.md)
6. [ ] Add performance tuning guide (PERFORMANCE.md)

---

## Common Pitfalls to Avoid

1. **BigInt vs Number**: Always use `42n` (BigInt) for Nix integers, not `42` (number)
2. **Scope inheritance**: Use `Object.create(parent)`, NOT `{...parent}` (loses getters)
3. **Test counts**: Use ranges ("170+ tests"), not exact numbers that go stale
4. **Store paths**: Use Nix's exact algorithm (base32, fingerprint, truncation)
5. **NAR hashing**: Either implement full serializer OR shell out to `nix hash path`
6. **Error messages**: Include context (file, expected, actual) for debugging
7. **Test isolation**: Each test independent, use fresh temp dirs
8. **Documentation drift**: Update docs (README, prompt.md, MEMORY.md) with code
9. **Premature optimization**: Get basic functionality working first, then optimize

---

## Next Actions (Right Now)

**Immediate tasks** (1-2 days):

1. [ ] Test systems/parse.nix (1-2 hours)
   - Add test to main/tests/nixpkgs_lib_files_test.js
   - Parse common platform strings
   - Verify attrset structure

2. [ ] Test systems/inspect.nix (30 min)
   - Test isLinux, isDarwin, isAarch64 predicates
   - Verify depends on parse.nix correctly

3. [ ] Test systems/doubles.nix (15 min)
   - Verify it's a list
   - Check common platforms exist

4. [ ] Test systems/default.nix (30 min)
   - Verify re-exports from parse/inspect/doubles

**Goal**: Get from 12 → 16 files tested (50%) in one focused session

**After that**: Continue with meta.nix, debug.nix, generators.nix (Priority 1, Phase 2)

**OR**: Start store path research (Priority 2) if prefer infrastructure work
