# Denix Development Priorities
**Last Updated:** 2026-02-10

---

## 🚨 CRITICAL RULES - READ FIRST

**Your job is to focus on what is NOT implemented and NOT working. Only report what remains to be done. Do not report what you accomplished. You are a senior level developer, there is no such thing as a blocker. Break down large tasks into smaller tasks.**

**Before executing what is below, please filter out any achievements. Only keep remaining/unsolved tasks in this document. Add detail to each task if its needed.**

### WORK ORDER (MUST FOLLOW THIS SEQUENCE):
1. **Runtime first** - Finish ALL network fetchers and store functions in runtime.js
2. **Translator second** - Only after runtime is 100% complete
3. **nix-lib tests last** - Only after translator is fully implemented

**Do not skip ahead. Do not work out of order.**

### IMPLEMENTATION REQUIREMENTS:

**Always read documentation while implementing:**
1. Start with official Nix docs: https://nix.dev/manual/nix/2.28/language/builtins.html
2. Search for examples: https://noogle.dev/
3. Test behavior in `nix repl` before writing code
4. Search the internet for implementation details and edge cases
5. Read related Nix source code if behavior is unclear

**External dependencies:**
- You may use npm modules ONLY through https://esm.sh/NPM_MODULE_NAME
- Warning: esm.sh is unreliable, prefer standard library or manual implementation
- Document all external dependencies and why they're needed

**If a plan is missing for how to implement the remaining things, then figure out intermediate steps and make them a priority.**

---

## 🎯 Current Focus: Runtime Store System NOT IMPLEMENTED

**Status:** Network fetchers and store functions NOT WORKING
**Goal:** Implement ALL store-related builtins before touching translator
**Work Remaining:** ~16-22 days of implementation work

---

## ⚡ Priority 1: Implement Missing Store System Builtins

### UNIMPLEMENTED: fetchMercurial (2-3 days)

**Documentation:** https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-fetchMercurial

**What it does:** Fetches a Mercurial repository from a URL

**Implementation steps:**
1. Read Nix docs thoroughly to understand all parameters
2. Test in `nix repl` to understand exact behavior
3. Research Mercurial protocol and available npm/deno libraries
4. Check if https://esm.sh/mercurial or similar exists
5. May need to shell out to `hg` command if no library available
6. Implement caching similar to fetchGit
7. Handle authentication, branches, revisions
8. Compute store paths correctly
9. Write comprehensive tests

**Parameters to support:**
- url (required)
- rev (optional)
- name (optional)
- (Check docs for complete list)

**Blockers/Questions:**
- Do you need Mercurial support? This is rarely used.
- Consider skipping if not needed by your project

---

### UNIMPLEMENTED: fetchClosure (5-7 days, VERY COMPLEX)

**Documentation:** https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-fetchClosure

**What it does:** Fetches a pre-built store path from a binary cache

**Implementation steps:**
1. Read Nix docs AND Nix source code (this is complex)
2. Research NAR format for binary caches
3. Research cache.nixos.org API
4. Understand narinfo format
5. Implement binary cache client
6. Handle compression (xz, bzip2, etc.)
7. Verify signatures (requires Nix crypto)
8. Import into store with correct permissions
9. Handle dependencies recursively
10. Write comprehensive tests

**Required knowledge:**
- Binary cache protocol
- NAR file format
- Nix store internals
- Signature verification

**This is the most complex builtin. Consider if you actually need it.**

---

### UNIMPLEMENTED: getFlake (5-7 days, VERY COMPLEX)

**Documentation:** https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-getFlake

**What it does:** Evaluates and returns a flake's outputs

**Implementation steps:**
1. Read flake specification: https://nixos.wiki/wiki/Flakes
2. Understand flake.lock format
3. Research flake registry
4. Implement flake resolution
5. Parse flake.nix
6. Evaluate flake outputs
7. Handle flake inputs recursively
8. Implement lock file generation
9. Handle flake references (github:, path:, etc.)
10. Write comprehensive tests

**Required knowledge:**
- Flake system architecture
- Flake lock file format
- Flake reference schemes
- Recursive flake evaluation

**This requires deep Nix knowledge. Consider if you need full flake support.**

---

### PARTIALLY IMPLEMENTED: fetchTree type='path' (4-6 hours)

**Current status:** fetchTree works for type='git', type='tarball', type='file'

**Not implemented:** type='path', type='indirect', type='mercurial'

**Documentation:** Search for "fetchTree" examples and edge cases

**Implementation steps:**
1. Read Nix source code for fetchTree type='path' behavior
2. Test in `nix repl` with various path inputs
3. Understand how it differs from `path` builtin
4. Implement type='path' handler
5. Implement type='indirect' (uses flake registry)
6. Write tests for each type
7. Document behavior differences

---

## ⚠️ Priority 2: Missing Store Operations (NOT IMPLEMENTED)

### UNIMPLEMENTED: storePath (1-2 days)

**Documentation:** https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-storePath

**What it does:** Registers a path as a Nix store path

**Implementation steps:**
1. Read Nix docs and test behavior in `nix repl`
2. Understand when/why storePath is needed vs regular paths
3. Implement store path validation
4. Add to store manager cache
5. Handle path canonicalization
6. Write tests

---

### UNIMPLEMENTED: toFile (1-2 days)

**Documentation:** https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-toFile

**What it does:** Writes content to a file in the Nix store

**Implementation steps:**
1. Read Nix docs and test in `nix repl`
2. Understand how store path is computed for content
3. Implement content hashing
4. Write file to store
5. Return store path
6. Handle text references to other store paths
7. Write tests

---

### UNIMPLEMENTED: placeholder (1-2 days)

**Documentation:** https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-placeholder

**What it does:** Returns a placeholder string for derivation outputs

**Implementation steps:**
1. Read Nix docs and derivation documentation
2. Test in `nix repl` to see exact format
3. Research how placeholders are used in build scripts
4. Implement placeholder format matching Nix exactly
5. Write tests

---

### UNIMPLEMENTED: outputOf (1-2 days)

**Documentation:** https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-outputOf

**What it does:** Gets the store path of a derivation output

**Implementation steps:**
1. Read Nix docs thoroughly
2. Test behavior in `nix repl`
3. Understand relationship with derivations
4. Implement output path resolution
5. Handle multiple outputs (out, dev, doc, etc.)
6. Write tests

---

## ⚠️ Priority 3: Missing Hashing Functions (NOT IMPLEMENTED)

### UNIMPLEMENTED: hashString (1-2 days)

**Documentation:** https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-hashString

**What it does:** Hashes a string using specified algorithm

**Implementation steps:**
1. Read Nix docs for supported hash types
2. Test in `nix repl` with different algorithms
3. Verify against existing tools/hashing.js implementation
4. Ensure output format matches Nix exactly (base16/base32/base64)
5. Support all hash types: md5, sha1, sha256, sha512
6. Write tests

---

### UNIMPLEMENTED: hashFile (1-2 days)

**Documentation:** https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-hashFile

**What it does:** Hashes a file using specified algorithm

**Implementation steps:**
1. Read Nix docs for supported hash types
2. Test in `nix repl` with test files
3. Implement file reading + hashing
4. Ensure output format matches Nix exactly
5. Support all hash types
6. Write tests

---

## ⚠️ Priority 4: Missing Context Operations (NOT IMPLEMENTED)

**These are advanced features for string context tracking:**

### UNIMPLEMENTED: getContext, hasContext, appendContext, addErrorContext, unsafeDiscardStringContext

**Documentation:** https://nix.dev/manual/nix/2.28/language/string-context.html

**Implementation strategy:**
1. Read string context documentation thoroughly
2. Understand when/why string context is needed
3. Research Nix source code implementation
4. Consider if you actually need these (rarely used)
5. If needed, implement context tracking system
6. Write comprehensive tests

**Time estimate:** 3-5 days for full context system

---

## ⚠️ Priority 5: Missing Control Flow (NOT IMPLEMENTED)

### UNIMPLEMENTED: break (low priority)

**Documentation:** https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-break

**What it does:** Enters debugger (only works with nix --debugger)

**Implementation:** Probably skip this, it's for Nix debugger integration

---

### UNIMPLEMENTED: traceVerbose (30 min)

**Documentation:** https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-traceVerbose

**What it does:** Like trace but only with --trace-verbose flag

**Implementation:** Check if verbose flag is set, conditionally trace

---

### UNIMPLEMENTED: genericClosure (2-3 days)

**Documentation:** https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-genericClosure

**What it does:** Computes transitive closure of a relation

**Implementation steps:**
1. Read Nix docs carefully - this is complex
2. Test extensively in `nix repl`
3. Understand startSet and operator parameters
4. Implement graph traversal algorithm
5. Handle cycles correctly
6. Write comprehensive tests

---

## 🛠️ Implementation Process (FOLLOW THIS EVERY TIME)

### Before Writing Any Code:

1. **Read Nix documentation thoroughly:**
   - Primary: https://nix.dev/manual/nix/2.28/language/builtins.html
   - Search examples: https://noogle.dev/
   - Search for blog posts and tutorials about the specific builtin
   - Read related Nix source code if behavior is unclear

2. **Test extensively in `nix repl`:**
   ```bash
   nix repl
   nix-repl> builtins.fetchMercurial { url = "..."; }
   nix-repl> # Try different parameters
   nix-repl> # Try edge cases
   nix-repl> # Document exact behavior
   ```

3. **Research implementation details:**
   - Search for "Nix [builtin name] implementation"
   - Look for GitHub issues discussing the builtin
   - Check Nixpkgs for real-world usage examples
   - Understand all parameters and edge cases

4. **Plan implementation steps:**
   - Break down into smallest possible tasks
   - Identify dependencies and prerequisites
   - List external libraries needed (if any)
   - Estimate time for each sub-task

5. **Implement incrementally:**
   - Start with simplest case
   - Add complexity gradually
   - Test after each addition
   - Compare behavior with `nix repl` continuously

6. **Write comprehensive tests:**
   ```javascript
   Deno.test("functionName - basic case", () => {
       // Test normal operation
   })

   Deno.test("functionName - edge cases", () => {
       // Test nulls, empty, zeros, etc.
   })

   Deno.test("functionName - error cases", () => {
       // Test invalid inputs
   })
   ```

### Implementation Pattern:
```javascript
// 1. Read docs: https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-NAME
// 2. Test in nix repl to understand exact behavior
// 3. Research any external dependencies needed
// 4. Implement with error handling
// 5. Write tests matching Nix behavior exactly

export const functionName = (param1, param2) => {
    // Validate inputs
    if (typeof param1 !== "expected") {
        throw new Error("Invalid parameter")
    }

    // Implement core logic
    const result = /* ... */

    // Return matching Nix format exactly
    return result
}
```

---

## 🧪 Running Tests

**Run all tests:**
```bash
./test.sh
# or
deno test --allow-all
```

**Run specific test file:**
```bash
deno test --allow-all main/tests/builtins_math_bitwise_test.js
```

**Check for issues:**
```bash
deno check main.js
deno check main/runtime.js
```

---

## 📁 What Still Needs Work

```
denix/
├── main/
│   ├── runtime.js             # MISSING: ~8-10 builtins not implemented
│   │                          # fetchMercurial, fetchClosure, getFlake
│   │                          # storePath, toFile, placeholder, outputOf
│   │                          # hashString, hashFile, context operations
│   │                          # genericClosure, traceVerbose
│   │
│   ├── store_manager.js       # INCOMPLETE: Needs storePath, toFile support
│   │
│   └── fetcher.js             # INCOMPLETE: Needs fetchMercurial, fetchClosure
```

**Runtime is NOT complete. Do not work on translator until these are implemented.**

---

## ⚠️ Current Blockers

### Critical: Store System Not Implemented
- `storePath` - Not implemented
- `toFile` - Not implemented
- `placeholder` - Not implemented
- `outputOf` - Not implemented

### Critical: Hashing Functions Not Implemented
- `hashString` - Not implemented
- `hashFile` - Not implemented

### Critical: Advanced Fetchers Not Implemented
- `fetchMercurial` - Not implemented
- `fetchClosure` - Not implemented (very complex)
- `getFlake` - Not implemented (very complex)

### Medium: Context Operations Not Implemented
- `getContext`, `hasContext`, `appendContext` - Not implemented
- `addErrorContext`, `unsafeDiscardStringContext` - Not implemented

### Low: Minor Functions Not Implemented
- `genericClosure` - Not implemented
- `traceVerbose` - Not implemented
- `break` - Not needed (debugger only)

---

## 🎯 Immediate Next Steps

**You MUST work on these in order:**

1. **Decide priority:** Which unimplemented builtins do you actually need?
   - If you need store operations: Start with storePath, toFile, placeholder, outputOf
   - If you need hashing: Start with hashString, hashFile
   - If you need Mercurial: Start with fetchMercurial
   - If you need binary caches: Start with fetchClosure (very complex, 5-7 days)
   - If you need flakes: Start with getFlake (very complex, 5-7 days)

2. **For each unimplemented builtin:**
   - Read Nix docs: https://nix.dev/manual/nix/2.28/language/builtins.html
   - Test extensively in `nix repl`
   - Research implementation details
   - Break down into sub-tasks
   - Implement incrementally
   - Write comprehensive tests

3. **Only after runtime is 100% complete:**
   - Work on translator edge cases
   - Add nixpkgs.lib integration tests

**Total estimated time to complete runtime: 16-22 days**

- Store operations: 4-8 days
- Hashing: 2-4 days
- Fetchers: 7-10 days (fetchClosure and getFlake are very complex)
- Context operations: 3-5 days
- Control flow: 2-3 days

**Do not proceed to translator work until runtime is complete.**
