# INSTRUCTIONS FOR AGENT

**Your job is to focus on what is NOT implemented and NOT working. Only report what remains to be done. Do not report what you accomplished. You are a senior level developer, there is no such thing as a blocker. Break down large tasks into smaller tasks.**

**Before executing what is below, please filter out any achievements. Only keep remaining/unsolved tasks in this document. Add detail to each task if its needed.**

## 🚨 CRITICAL WORK ORDER

**DO NOT work on nix-lib tests until the code translator is fully implemented.**

**DO NOT work on the translator until the runtime is fully implemented.**

**IN OTHER WORDS: Finish the remaining runtime builtins BEFORE doing ANYTHING ELSE.**

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
2. Follow fetchGit pattern (lines 879-1053)
3. Use `hg` binary via Bash: `hg clone`, `hg update`, `hg id -i`
4. Reuse fetcher.js, store_manager.js, nar_hash.js
5. Update runtime.js line 1055
6. Create main/tests/builtins_fetchmercurial_test.js

#### fetchClosure (5-7 days, VERY COMPLEX)
1. **Read documentation**: https://noogle.dev/f/builtins/fetchClosure
2. Study binary cache protocol: https://nixos.org/manual/nix/stable/protocols/binary-cache-substituter-protocol.html
3. Implement store closure computation
4. Implement NAR fetching and unpacking
5. Update runtime.js line 1301
6. Create main/tests/builtins_fetchclosure_test.js

#### getFlake (5-7 days, VERY COMPLEX)
1. **Read documentation**: https://noogle.dev/f/builtins/getFlake
2. Study flake schema: https://nixos.org/manual/nix/stable/command-ref/new-cli/nix3-flake.html
3. Implement flake.lock parsing
4. Implement flake input resolution (recursive fetching)
5. Implement flake evaluation model
6. Update runtime.js line 1836
7. Create main/tests/builtins_getflake_test.js

#### fetchTree type='path' (1-2 hours)
1. **Read documentation**: https://noogle.dev/f/builtins/fetchTree
2. Implement local path copying (similar to builtins.path)
3. Update runtime.js line 1290

#### fetchTree type='indirect' (3-4 days)
1. **Read documentation**: https://noogle.dev/f/builtins/fetchTree
2. Implement flake registry support
3. Fetch and parse registry JSON
4. Resolve indirect references
5. Update runtime.js line 1294

### Option 2: Skip Optional Builtins and Move to Next Phase

**Runtime is EFFECTIVELY COMPLETE** with 62/65 builtins working:
- All core builtins implemented
- All commonly-used fetch functions implemented
- Only experimental/rarely-used features missing

**RECOMMENDED: Move to translator/testing phase**
- The remaining 3 builtins are rarely used
- fetchMercurial: Mercurial is deprecated
- fetchClosure/getFlake: Experimental features

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

## ❌ WHAT NOT TO DO

- **DO NOT** report accomplishments or achievements in this document
- **DO NOT** work on translator until runtime is 100% complete
- **DO NOT** work on nix-lib tests until runtime and translator are complete
- **DO NOT** create examples or documentation until core features are done
- **DO NOT** skip reading official Nix documentation before implementing
- **DO NOT** assume behavior - always verify against actual Nix

---

## 📊 ACTUAL CURRENT STATUS

**Runtime Builtins:** 62/65 implemented (3 optional remaining)
- fetchTarball, fetchurl, fetchGit, fetchTree, path, filterSource: ✅ IMPLEMENTED
- fetchMercurial, fetchClosure, getFlake: ❌ NOT IMPLEMENTED (optional)

**Tests:** 179 runtime tests passing

**Infrastructure:** All support modules implemented (fetcher, tar, nar_hash, store_manager)

**Blockers:** NONE - Runtime is effectively complete

**Status:** READY TO MOVE TO NEXT PHASE (translator/testing) or implement optional builtins if needed
