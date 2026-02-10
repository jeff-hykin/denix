# Denix Development Guide

**Last Updated:** 2026-02-10

---

## 🚨 CRITICAL RULES - READ THIS FIRST

**Your job is to focus on what is NOT implemented and NOT working. Only report what remains to be done. Do not report accomplishments. You are a senior level developer - there is no such thing as a blocker. Break down large tasks into smaller tasks.**

**BEFORE executing what is below, filter out any achievements. Only keep remaining/unsolved tasks in this document. Add detail to each task if needed.**

### WORK ORDER (MUST FOLLOW THIS SEQUENCE):
1. **Runtime functions FIRST** - Finish network fetchers and store functions in runtime.js
2. **Translator edge cases SECOND** - Only after runtime is fully tested
3. **nixpkgs.lib tests THIRD** - Only after translator is fully implemented

**DO NOT work on nix-lib tests until the translator is fully implemented.**
**DO NOT work on the translator until the runtime is fully tested.**

### IMPLEMENTATION REQUIREMENTS:
- **ALWAYS read Nix documentation while implementing:** https://nix.dev/manual/nix/2.28/language/builtins.html
- **ALWAYS test in `nix repl` BEFORE writing code** - match exact behavior, not what you think it should do
- **ALWAYS search the internet for documentation** (noogle.dev, GitHub, Nix source code)
- **Use npm modules ONLY through esm.sh:** `https://esm.sh/NPM_MODULE_NAME` (unreliable, prefer Deno std)
- **Break down tasks:** If a plan is missing for how to implement remaining things, figure out intermediate steps and make them a priority

---

## 📊 Current Status - What's NOT Done

**Runtime:** 35/109 builtins UNTESTED (32.1% NOT tested)
- 14 high-priority functions needed for 80% coverage
- 21 medium-priority functions for 90% coverage

**Translator:** Edge cases NOT verified
- Pattern matching: Nested @, ellipsis with defaults NOT tested
- String escapes: Unicode escapes NOT verified
- Path literals: <nixpkgs> only partially works
- Operator precedence: NOT comprehensively tested
- Multi-line strings, URI literals: NOT verified

**nixpkgs.lib:** 31/41 files NOT tested (24% coverage)
- High-value files NOT tested: lists.nix, attrsets.nix, options.nix
- Only 10 simple files currently tested

**Immediate Next Task:** Add 2 math tests (lessThan, mul) - 30 minutes

---

## ⚡ Priority 1: Test Coverage (DO THIS NEXT)

### Goal: 80% Coverage (Need 14 more tests, 3-5 hours)

**Quick Wins (30 minutes):**
- [ ] `lessThan` (line 211) - Test with integers, floats, strings
- [ ] `mul` (line 233) - Test int*int, int*float, float*float, edge cases

*Edit:* `main/tests/builtins_math_bitwise_test.js` - Add to END of existing file

**Required test cases for lessThan:**
```javascript
// Test in nix repl first:
// builtins.lessThan 3 5        → true
// builtins.lessThan 5 3        → false
// builtins.lessThan 3 3        → false
// builtins.lessThan 3.0 5      → true
// builtins.lessThan "a" "b"    → true (lexicographic)
// builtins.lessThan "b" "a"    → false

Deno.test("lessThan - integer comparison", () => {
    assertEquals(builtins.lessThan(3n)(5n), true)
    assertEquals(builtins.lessThan(5n)(3n), false)
    assertEquals(builtins.lessThan(3n)(3n), false)
})

Deno.test("lessThan - mixed int and float", () => {
    assertEquals(builtins.lessThan(3n)(5.0), true)
    assertEquals(builtins.lessThan(3.0)(5n), true)
})

Deno.test("lessThan - string comparison", () => {
    assertEquals(builtins.lessThan("a")("b"), true)
    assertEquals(builtins.lessThan("b")("a"), false)
    assertEquals(builtins.lessThan("hello")("world"), true)
})
```

**Required test cases for mul:**
```javascript
// Test in nix repl first:
// builtins.mul 3 5         → 15
// builtins.mul 3 5.0       → 15.0
// builtins.mul 3.5 2       → 7.0
// builtins.mul 3.5 2.0     → 7.0
// builtins.mul 0 999       → 0
// builtins.mul (-2) 3      → -6

Deno.test("mul - integer multiplication", () => {
    assertEquals(builtins.mul(3n)(5n), 15n)
    assertEquals(builtins.mul(0n)(999n), 0n)
    assertEquals(builtins.mul(-2n)(3n), -6n)
})

Deno.test("mul - float multiplication", () => {
    assertEquals(builtins.mul(3.5)(2.0), 7.0)
    assertEquals(builtins.mul(0.5)(4.0), 2.0)
})

Deno.test("mul - mixed int and float", () => {
    assertEquals(builtins.mul(3n)(5.0), 15.0)
    assertEquals(builtins.mul(3.5)(2n), 7.0)
})
```

---

**File Operations (2-3 hours):**

*Create:* `main/tests/builtins_file_ops_test.js` - New file with these tests:

### 1. pathExists (line 1422) - 30 minutes
```javascript
// Test in nix repl first:
// builtins.pathExists "/tmp"              → true
// builtins.pathExists "/nonexistent"      → false
// builtins.pathExists ./.                 → true
// builtins.pathExists ./fake-dir          → false

import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { builtins } from "../runtime.js"
import { Path } from "../runtime.js"

Deno.test("pathExists - existing directory", () => {
    assertEquals(builtins.pathExists("/tmp"), true)
})

Deno.test("pathExists - non-existing path", () => {
    assertEquals(builtins.pathExists("/this-should-not-exist-12345"), false)
})

Deno.test("pathExists - existing file", () => {
    // Create temp file for testing
    const tempFile = Deno.makeTempFileSync()
    try {
        assertEquals(builtins.pathExists(tempFile), true)
    } finally {
        Deno.removeSync(tempFile)
    }
})

Deno.test("pathExists - with Path object", () => {
    const pathObj = new Path(["/tmp"], [])
    assertEquals(builtins.pathExists(pathObj), true)
})
```

### 2. readFile (line 1397) - 30 minutes
```javascript
// Test in nix repl first:
// builtins.readFile ./test.txt   → "contents of file"
// Watch out for: UTF-8 encoding, newlines, binary rejection

Deno.test("readFile - simple text file", () => {
    const tempFile = Deno.makeTempFileSync()
    Deno.writeTextFileSync(tempFile, "hello world")
    try {
        assertEquals(builtins.readFile(tempFile), "hello world")
    } finally {
        Deno.removeSync(tempFile)
    }
})

Deno.test("readFile - with newlines", () => {
    const tempFile = Deno.makeTempFileSync()
    Deno.writeTextFileSync(tempFile, "line1\nline2\nline3")
    try {
        assertEquals(builtins.readFile(tempFile), "line1\nline2\nline3")
    } finally {
        Deno.removeSync(tempFile)
    }
})

Deno.test("readFile - empty file", () => {
    const tempFile = Deno.makeTempFileSync()
    try {
        assertEquals(builtins.readFile(tempFile), "")
    } finally {
        Deno.removeSync(tempFile)
    }
})
```

### 3. readDir (line 1614) - 30 minutes
```javascript
// Test in nix repl first:
// builtins.readDir ./some-dir
// → { "file1.txt" = "regular"; "subdir" = "directory"; "link" = "symlink"; }

Deno.test("readDir - directory with files", () => {
    const tempDir = Deno.makeTempDirSync()
    try {
        // Create test files
        Deno.writeTextFileSync(`${tempDir}/file1.txt`, "test")
        Deno.writeTextFileSync(`${tempDir}/file2.txt`, "test")
        Deno.mkdirSync(`${tempDir}/subdir`)

        const result = builtins.readDir(tempDir)
        assertEquals(result["file1.txt"], "regular")
        assertEquals(result["file2.txt"], "regular")
        assertEquals(result["subdir"], "directory")
    } finally {
        Deno.removeSync(tempDir, { recursive: true })
    }
})

Deno.test("readDir - empty directory", () => {
    const tempDir = Deno.makeTempDirSync()
    try {
        const result = builtins.readDir(tempDir)
        assertEquals(result, {})
    } finally {
        Deno.removeSync(tempDir)
    }
})
```

### 4. readFileType (line 1474) - 20 minutes
```javascript
// Test in nix repl first:
// builtins.readFileType ./file.txt    → "regular"
// builtins.readFileType ./dir         → "directory"
// builtins.readFileType ./symlink     → "symlink"

Deno.test("readFileType - regular file", () => {
    const tempFile = Deno.makeTempFileSync()
    try {
        assertEquals(builtins.readFileType(tempFile), "regular")
    } finally {
        Deno.removeSync(tempFile)
    }
})

Deno.test("readFileType - directory", () => {
    const tempDir = Deno.makeTempDirSync()
    try {
        assertEquals(builtins.readFileType(tempDir), "directory")
    } finally {
        Deno.removeSync(tempDir)
    }
})

Deno.test("readFileType - symlink", () => {
    const tempDir = Deno.makeTempDirSync()
    const tempFile = `${tempDir}/file.txt`
    const symlinkPath = `${tempDir}/link`

    try {
        Deno.writeTextFileSync(tempFile, "test")
        Deno.symlinkSync(tempFile, symlinkPath)
        assertEquals(builtins.readFileType(symlinkPath), "symlink")
    } finally {
        Deno.removeSync(tempDir, { recursive: true })
    }
})
```

### 5. findFile (line 1631) - 30 minutes
```javascript
// Test in nix repl first:
// builtins.findFile [{ path = "/usr/bin"; prefix = ""; }] "ls"  → "/usr/bin/ls"
// Watch out for: NIX_PATH logic, prefix handling

Deno.test("findFile - finds file in search path", () => {
    const tempDir = Deno.makeTempDirSync()
    const testFile = `${tempDir}/test.txt`
    Deno.writeTextFileSync(testFile, "found")

    try {
        const searchPath = [{ path: tempDir, prefix: "" }]
        const result = builtins.findFile(searchPath)("test.txt")
        assertEquals(result, testFile)
    } finally {
        Deno.removeSync(tempDir, { recursive: true })
    }
})

Deno.test("findFile - with prefix", () => {
    const tempDir = Deno.makeTempDirSync()
    const subDir = `${tempDir}/subdir`
    Deno.mkdirSync(subDir)
    const testFile = `${subDir}/test.txt`
    Deno.writeTextFileSync(testFile, "found")

    try {
        const searchPath = [{ path: tempDir, prefix: "subdir" }]
        const result = builtins.findFile(searchPath)("test.txt")
        assertEquals(result, testFile)
    } finally {
        Deno.removeSync(tempDir, { recursive: true })
    }
})
```

### 6. getEnv (line 1396) - 10 minutes
```javascript
// Test in nix repl first:
// builtins.getEnv "HOME"           → "/Users/username"
// builtins.getEnv "NONEXISTENT"    → ""

Deno.test("getEnv - existing variable", () => {
    // Set test environment variable
    Deno.env.set("TEST_VAR_12345", "test_value")
    try {
        assertEquals(builtins.getEnv("TEST_VAR_12345"), "test_value")
    } finally {
        Deno.env.delete("TEST_VAR_12345")
    }
})

Deno.test("getEnv - non-existing variable", () => {
    assertEquals(builtins.getEnv("THIS_VAR_SHOULD_NOT_EXIST_98765"), "")
})

Deno.test("getEnv - PATH exists", () => {
    const path = builtins.getEnv("PATH")
    // PATH should exist and be non-empty
    assertEquals(typeof path, "string")
    assertEquals(path.length > 0, true)
})
```

---

**Conversion & Control (1-2 hours):**

*Create:* `main/tests/builtins_misc_test.js` - New file with these tests:

### 1. toPath (line 359) - 15 minutes
```javascript
// Test in nix repl first:
// builtins.toPath "hello"          → ERROR (relative paths not allowed)
// builtins.toPath "/tmp/foo"       → /tmp/foo
// builtins.toPath "/nix/store/..." → /nix/store/...

import { assertEquals, assertThrows } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { builtins } from "../runtime.js"
import { Path } from "../runtime.js"

Deno.test("toPath - absolute path string", () => {
    const result = builtins.toPath("/tmp/test")
    assertEquals(result instanceof Path, true)
    assertEquals(result.toString(), "/tmp/test")
})

Deno.test("toPath - rejects relative path", () => {
    assertThrows(
        () => builtins.toPath("relative/path"),
        Error,
        "not an absolute path"
    )
})

Deno.test("toPath - store path", () => {
    const storePath = "/nix/store/abc123-test"
    const result = builtins.toPath(storePath)
    assertEquals(result.toString(), storePath)
})
```

### 2. toXML (line 381) - 30 minutes
```javascript
// Test in nix repl first:
// builtins.toXML 123               → "<int value=\"123\" />"
// builtins.toXML "hello"           → "<string value=\"hello\" />"
// builtins.toXML { a = 1; }        → "<attrs><attr name=\"a\"><int value=\"1\" /></attr></attrs>"
// builtins.toXML [ 1 2 3 ]         → "<list><int value=\"1\" /><int value=\"2\" /><int value=\"3\" /></list>"

Deno.test("toXML - integer", () => {
    assertEquals(builtins.toXML(123n), '<int value="123" />')
})

Deno.test("toXML - float", () => {
    assertEquals(builtins.toXML(3.14), '<float value="3.14" />')
})

Deno.test("toXML - string", () => {
    assertEquals(builtins.toXML("hello"), '<string value="hello" />')
})

Deno.test("toXML - boolean", () => {
    assertEquals(builtins.toXML(true), '<bool value="true" />')
    assertEquals(builtins.toXML(false), '<bool value="false" />')
})

Deno.test("toXML - null", () => {
    assertEquals(builtins.toXML(null), '<null />')
})

Deno.test("toXML - simple attrset", () => {
    const xml = builtins.toXML({ a: 1n, b: "hello" })
    // Check it contains the expected attributes
    assertEquals(xml.includes('<attrs>'), true)
    assertEquals(xml.includes('name="a"'), true)
    assertEquals(xml.includes('name="b"'), true)
})

Deno.test("toXML - list", () => {
    const xml = builtins.toXML([1n, 2n, 3n])
    assertEquals(xml.includes('<list>'), true)
    assertEquals(xml.includes('value="1"'), true)
    assertEquals(xml.includes('value="2"'), true)
    assertEquals(xml.includes('value="3"'), true)
})
```

### 3. fromJSON (line 418) - 20 minutes
```javascript
// Test in nix repl first:
// builtins.fromJSON "123"              → 123
// builtins.fromJSON "\"hello\""        → "hello"
// builtins.fromJSON "{\"a\":1}"        → { a = 1; }
// builtins.fromJSON "[1,2,3]"          → [ 1 2 3 ]

Deno.test("fromJSON - integer", () => {
    assertEquals(builtins.fromJSON("123"), 123n)
})

Deno.test("fromJSON - float", () => {
    assertEquals(builtins.fromJSON("3.14"), 3.14)
})

Deno.test("fromJSON - string", () => {
    assertEquals(builtins.fromJSON('"hello"'), "hello")
})

Deno.test("fromJSON - boolean", () => {
    assertEquals(builtins.fromJSON("true"), true)
    assertEquals(builtins.fromJSON("false"), false)
})

Deno.test("fromJSON - null", () => {
    assertEquals(builtins.fromJSON("null"), null)
})

Deno.test("fromJSON - object", () => {
    const result = builtins.fromJSON('{"a":1,"b":"hello"}')
    assertEquals(result.a, 1n)
    assertEquals(result.b, "hello")
})

Deno.test("fromJSON - array", () => {
    const result = builtins.fromJSON('[1,2,3]')
    assertEquals(result, [1n, 2n, 3n])
})
```

### 4. abort (line 1392) - 10 minutes
```javascript
// Test in nix repl first:
// builtins.abort "error message"   → ERROR: evaluation aborted with the following error message: 'error message'

Deno.test("abort - throws error with message", () => {
    assertThrows(
        () => builtins.abort("test error"),
        Error,
        "test error"
    )
})

Deno.test("abort - throws on any message", () => {
    assertThrows(
        () => builtins.abort("custom abort message"),
        Error,
        "custom abort message"
    )
})
```

### 5. getAttr (line 640) - 15 minutes
```javascript
// Test in nix repl first:
// builtins.getAttr "a" { a = 1; b = 2; }     → 1
// builtins.getAttr "x" { a = 1; }            → ERROR: attribute 'x' missing

Deno.test("getAttr - existing attribute", () => {
    const obj = { a: 1n, b: "hello", c: true }
    assertEquals(builtins.getAttr("a")(obj), 1n)
    assertEquals(builtins.getAttr("b")(obj), "hello")
    assertEquals(builtins.getAttr("c")(obj), true)
})

Deno.test("getAttr - missing attribute throws", () => {
    const obj = { a: 1n }
    assertThrows(
        () => builtins.getAttr("missing")(obj),
        Error,
        "attribute 'missing' missing"
    )
})

Deno.test("getAttr - nested objects", () => {
    const obj = { nested: { value: 42n } }
    const nested = builtins.getAttr("nested")(obj)
    assertEquals(nested.value, 42n)
})
```

### 6. splitVersion (line 531) - 20 minutes
```javascript
// Test in nix repl first:
// builtins.splitVersion "1.2.3"        → [ "1" "2" "3" ]
// builtins.splitVersion "1.2.3a"       → [ "1" "2" "3a" ]
// builtins.splitVersion "v1.2-beta"    → [ "v1" "2" "beta" ]

Deno.test("splitVersion - simple version", () => {
    assertEquals(builtins.splitVersion("1.2.3"), ["1", "2", "3"])
})

Deno.test("splitVersion - with letters", () => {
    assertEquals(builtins.splitVersion("1.2.3a"), ["1", "2", "3a"])
})

Deno.test("splitVersion - complex version", () => {
    // Test actual Nix behavior
    const result = builtins.splitVersion("2.18.0pre20221109")
    // Should split on dots and component boundaries
    assertEquals(Array.isArray(result), true)
    assertEquals(result.length > 0, true)
})

Deno.test("splitVersion - with dash", () => {
    const result = builtins.splitVersion("1.2-beta")
    assertEquals(Array.isArray(result), true)
})
```

### Medium Priority (21 untested, defer until 80%+ coverage)

- Context ops (5): getContext, hasContext, appendContext, addErrorContext, unsafeDiscardStringContext
- Store ops (4): storePath, toFile, placeholder, outputOf
- Hashing (2): hashString, hashFile
- Derivations (3): derivationStrict, unsafeDiscardOutputDependency, unsafeGetAttrPos
- Control flow (3): break, traceVerbose, genericClosure
- Fetchers (2): fetchMercurial, fetchClosure
- Advanced (2): getFlake, nixPath

---

## 📝 How to Write Tests

### Step 1: Test in nix repl

```bash
$ nix repl
nix-repl> builtins.lessThan 3 5
true
nix-repl> builtins.lessThan 5 3
false
nix-repl> builtins.pathExists "/tmp"
true
```

### Step 2: Write Deno Test

```javascript
import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { builtins } from "../runtime.js"

Deno.test("lessThan - basic comparison", () => {
    assertEquals(builtins.lessThan(3n, 5n), true)
    assertEquals(builtins.lessThan(5n, 3n), false)
    assertEquals(builtins.lessThan(3n, 3n), false)
})

Deno.test("pathExists - existing path", () => {
    assertEquals(builtins.pathExists("/tmp"), true)
})

Deno.test("pathExists - non-existing path", () => {
    assertEquals(builtins.pathExists("/nonexistent-123456"), false)
})
```

### Step 3: Run Tests

```bash
# Run specific test file
deno test --allow-all main/tests/builtins_file_ops_test.js

# Run all tests
./test.sh

# Run category
./test.sh math       # Math/bitwise tests
./test.sh attrs      # Attrset tests
./test.sh strings    # String tests
./test.sh derivation # Derivation tests
```

---

## 🏗️ Priority 2: Derivation Edge Cases (1-2 hours)

**INCOMPLETE** - Only 12 basic derivation tests exist. Edge cases NOT verified.

**BEFORE STARTING:**
1. Read https://nix.dev/manual/nix/2.28/language/derivations.html (30 min)
2. Test each feature in `nix repl` with actual derivations (30 min)
3. DO NOT start until Priority 1 is 80%+ complete

**Specific edge cases NOT tested:**

### Multiple outputs NOT tested
```nix
# Test in nix repl:
nix-repl> derivation { name = "multi"; system = "x86_64-linux"; builder = "/bin/sh"; outputs = [ "out" "dev" "doc" ]; }
# Should create 3 output paths
```
- [ ] Multiple output names in `outputs` list
- [ ] Accessing different outputs (drv.out, drv.dev, drv.doc)
- [ ] Environment variables for each output

### Input derivations NOT tested
```nix
# Test in nix repl:
nix-repl> let dep = derivation { ... }; in derivation { buildInputs = [ dep ]; ... }
```
- [ ] Passing derivations as buildInputs
- [ ] Dependency resolution
- [ ] Transitive dependencies

### Environment variable propagation NOT tested
- [ ] Which env vars get passed to builder
- [ ] Custom env vars via derivation attrs
- [ ] System-level env vars

### Content-addressed derivations NOT tested
```nix
# Research CA derivations first - may not be in Nix 2.18
```
- [ ] __contentAddressed = true
- [ ] Fixed-output derivations with hash
- [ ] outputHashMode, outputHashAlgo

### Fixed-output derivations NOT tested
```nix
nix-repl> derivation {
  outputHash = "sha256-...";
  outputHashMode = "flat";
  ...
}
```
- [ ] outputHash attribute
- [ ] outputHashMode (flat, recursive)
- [ ] Hash verification logic

**Where to add tests:**
- Edit: `main/tests/derivation/001_basic_tests.js`
- Or create: `main/tests/derivation/002_edge_cases_test.js`

---

## 🔧 Priority 3: Optional Runtime Features (16-22 days)

**SKIP THIS** unless you specifically need Mercurial/binary cache/flake support.
Most Nix code does NOT use these features.

**DO NOT START** until Priority 1 is 80%+ and Priority 2 is complete.

### Task 3.1: fetchMercurial NOT IMPLEMENTED (2-3 days)

**What's missing:** No Mercurial repository support at all.

**Why skip:** Very few projects use Mercurial (git is dominant).

**If you must implement:**
1. Read docs: https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-fetchMercurial
2. Test in `nix repl` with real Mercurial repo
3. Research Mercurial HTTP protocol (1-2 hours)
4. Find Deno Mercurial library or implement from scratch (4-6 hours)
5. Implement revision checkout (4-6 hours)
6. Add store path computation (2-3 hours)
7. Write tests matching nix repl behavior (3-4 hours)

### Task 3.2: fetchClosure NOT IMPLEMENTED (5-7 days)

**What's missing:** No binary cache support at all.

**Why skip:** Extremely complex, requires understanding Nix cache protocol, NAR format, signature verification.

**If you must implement:**
1. Read docs: https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-fetchClosure
2. Study Nix binary cache protocol: https://nix.dev/manual/nix/2.28/command-ref/new-cli/nix3-copy.html
3. Research NAR binary format (1-2 days)
4. Implement cache.nixos.org HTTP API (1-2 days)
5. Implement signature verification (1-2 days)
6. Add path resolution and substitution (1 day)
7. Write comprehensive tests (1 day)

**Challenges:**
- NAR binary format parsing
- Ed25519 signature verification
- Cache substitution logic
- Path validity checking

### Task 3.3: getFlake NOT IMPLEMENTED (5-7 days)

**What's missing:** No flake support at all.

**Why skip:** Very complex, most Nix code doesn't use flakes yet.

**If you must implement:**
1. Read docs: https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-getFlake
2. Study flake.lock format: https://nix.dev/manual/nix/2.28/command-ref/new-cli/nix3-flake.html
3. Research flake input types (1 day)
4. Implement input resolution (github, gitlab, path, etc.) (2-3 days)
5. Implement flake.lock parsing and validation (1-2 days)
6. Add flake output schema checking (1-2 days)
7. Handle transitive dependencies (1 day)
8. Write comprehensive tests (1 day)

**Challenges:**
- Lock file format evolution
- Input source resolution (many types)
- Output schema validation
- Dependency graph handling

### Task 3.4: fetchTree edge cases PARTIALLY DONE (4-6 hours)

**What's missing:** type='mercurial', type='path', type='indirect' NOT implemented.

**What works:** type='git', type='tarball', type='file' already work.

**Missing implementations:**

#### type='path' NOT implemented (1-2 hours)
```nix
# Test in nix repl:
nix-repl> builtins.fetchTree { type = "path"; path = ./some-dir; }
```
- [ ] Local path copying to store
- [ ] Hash computation for directories
- [ ] Filtering logic

#### type='indirect' NOT implemented (2-3 hours)
```nix
# Test in nix repl:
nix-repl> builtins.fetchTree { type = "indirect"; id = "nixpkgs"; }
```
- [ ] Flake registry lookup
- [ ] Indirect reference resolution
- [ ] Requires partial flake system

#### type='mercurial' NOT implemented (1 hour)
```nix
# Test in nix repl:
nix-repl> builtins.fetchTree { type = "mercurial"; url = "..."; rev = "..."; }
```
- [ ] Mercurial repository cloning
- [ ] Same as fetchMercurial but different API

---

## 🔍 Priority 4: Translator Edge Cases (2-3 days)

**INCOMPLETE** - Advanced language features NOT verified with tests.

**DO NOT START** until runtime is 80%+ tested (Priority 1 complete).

### Task 4.1: Advanced Pattern Matching NOT VERIFIED (6-8 hours)

**What's missing:** Complex destructuring patterns NOT tested in translator.

**Test these in nix repl first:**
```nix
# Nested @ patterns
nix-repl> (outer@{ inner@{ x, y }, z }: outer) { inner = { x = 1; y = 2; }; z = 3; }
{ inner = { x = 1; y = 2; }; z = 3; }

# Ellipsis with defaults
nix-repl> ({ x ? 1, ... }@args: args) { y = 2; z = 3; }
{ x = 1; y = 2; z = 3; }

# Complex defaults
nix-repl> ({ a ? b.c.d, b }: a) { b = { c = { d = 42; }; }; }
42
```

**Add tests to:** `main/tests/translator_test.js`
- [ ] Nested @ pattern binding
- [ ] @ pattern with ellipsis
- [ ] Default values referencing other parameters
- [ ] Multiple levels of nesting

### Task 4.2: String Escape Sequences NOT VERIFIED (2-3 hours)

**What's missing:** Escape sequence handling NOT comprehensively tested.

**Test these in nix repl first:**
```nix
nix-repl> "hello\nworld"
"hello\nworld"

nix-repl> "tab\there"
"tab\there"

nix-repl> "quote\"inside"
"quote\"inside"

nix-repl> "backslash\\"
"backslash\\"

nix-repl> ''
  multi-line
    with indentation
  preserved
''
# Should strip common leading whitespace
```

**Add tests to:** `main/tests/translator_test.js` or create `string_escape_test.js`
- [ ] All basic escapes: `\n`, `\t`, `\r`, `\\`, `\"`
- [ ] Dollar sign escape: `\${not_interpolated}`
- [ ] Multi-line string indentation stripping
- [ ] Multi-line string escape rules: `''${...}` and `'''`
- [ ] Unicode escapes (check if Nix supports them)

### Task 4.3: Path Literal Edge Cases PARTIALLY BROKEN (4-6 hours)

**What's broken:** `<nixpkgs>` search path only partially works (line 149 in main.js).

**Test these in nix repl first:**
```nix
nix-repl> <nixpkgs>
/nix/var/nix/profiles/per-user/root/channels/nixpkgs

nix-repl> <nixpkgs/lib>
/nix/var/nix/profiles/per-user/root/channels/nixpkgs/lib

nix-repl> ./relative/path
/current/directory/relative/path

nix-repl> /absolute/path
/absolute/path
```

**What needs fixing:**
- [ ] `<nixpkgs>` search path resolution reads NIX_PATH
- [ ] `<nixpkgs/subdir>` nested search paths
- [ ] Search path with prefixes: `prefix=/path`
- [ ] Relative path resolution from import context
- [ ] Store path literals: `/nix/store/...`

**Files to modify:**
- `main.js` line 149 (search_path handling)
- Create: `tools/nix_path_resolver.js` (NIX_PATH parsing)

### Task 4.4: Operator Precedence NOT VERIFIED (3-4 hours)

**What's missing:** Complex expressions NOT tested for correct precedence.

**Test these in nix repl first:**
```nix
nix-repl> 1 + 2 * 3
7

nix-repl> 1 + 2 * 3 / 2
4

nix-repl> true && false || true
true

nix-repl> !false && true
true

nix-repl> 1 < 2 && 3 < 4
true

nix-repl> 1 == 1 && 2 == 2
true
```

**Create:** `main/tests/operator_precedence_test.js`
- [ ] Arithmetic: `+`, `-`, `*`, `/` precedence
- [ ] Comparison: `<`, `>`, `==`, `!=` precedence
- [ ] Logical: `&&`, `||`, `!` precedence
- [ ] Mixed operators: `1 + 2 < 3 && 4 > 5 || 6 == 6`
- [ ] Parentheses override: `(1 + 2) * 3` vs `1 + 2 * 3`
- [ ] Unary operators: `!a && b`, `-a + b`, `!-a`

### Task 4.5: Additional Language Features NOT VERIFIED (4-6 hours)

**What's missing:** Several language features have NO dedicated tests.

**Multi-line strings (indented strings) - NOT verified:**
```nix
nix-repl> ''
  hello
    world
  end
''
"hello\n  world\nend\n"
# Common indentation should be stripped
```

**URI literals - NOT verified:**
```nix
nix-repl> http://example.com
"http://example.com"

nix-repl> https://github.com/user/repo
"https://github.com/user/repo"
```

**Inherit edge cases - NOT verified:**
```nix
nix-repl> let x = { a = 1; b = 2; }; in { inherit (x) a b; c = 3; }
{ a = 1; b = 2; c = 3; }

nix-repl> let a = 1; b = 2; in { inherit a b; }
{ a = 1; b = 2; }
```

**With expression edge cases - NOT verified:**
```nix
nix-repl> with { a = 1; b = 2; }; a + b
3

nix-repl> with { a = 1; }; with { b = 2; }; a + b
3
```

**Ancient let syntax - NOT verified:**
```nix
nix-repl> let { x = 1; y = 2; body = x + y; }
3
# Old Nix syntax, may not need to support
```

**Add tests to:** `main/tests/translator_test.js` or create specialized test files
- [ ] Multi-line string indentation rules (10+ tests)
- [ ] URI literal parsing (5+ tests)
- [ ] Inherit from expression (5+ tests)
- [ ] Inherit without source (5+ tests)
- [ ] Nested with expressions (5+ tests)
- [ ] With expression shadowing (3+ tests)
- [ ] Ancient let (check if needed, 3+ tests)

---

## 📚 Priority 5: nixpkgs.lib Testing (4-6 days)

**INCOMPLETE** - Only 10/41 files tested (24% coverage).

**DO NOT START** until translator edge cases are verified (Priority 4 complete).

**10 files ALREADY tested (leave these alone):**
- ✅ ascii-table.nix (98 ASCII mappings)
- ✅ strings.nix (string utilities with import)
- ✅ minfeatures.nix (Nix version features)
- ✅ source-types.nix (source type definitions)
- ✅ versions.nix (version parsing)
- ✅ kernel.nix (Linux kernel helpers)
- ✅ flakes.nix (flake builtins re-export)
- ✅ flake-version-info.nix (version metadata)
- ✅ systems/flake-systems.nix (platform list)
- ✅ systems/supported.nix (platform tiers)

**31 files NOT tested - Prioritized by value:**

### High-Value Files (MUST TEST, 2-3 days)
1. **lists.nix** (1-2 hours) - Core list operations
   - Functions: fold, imap, reverseList, sort, groupBy, etc.
   - Test 10-15 key functions with actual usage

2. **attrsets.nix** (1-2 hours) - Core attrset operations
   - Functions: mapAttrs', recursiveUpdate, optionalAttrs, etc.
   - Test 10-15 key functions

3. **options.nix** (2-3 hours) - NixOS module options
   - Complex merging logic
   - Type checking
   - May reveal translator bugs

4. **modules.nix** (2-3 hours) - NixOS module system
   - Very complex
   - High chance of finding bugs
   - Tests real-world Nix usage

### Utility Files (USEFUL, 1-2 days)
5. **meta.nix** (30 min) - Package metadata helpers
6. **debug.nix** (30 min) - Debug utilities
7. **generators.nix** (1 hour) - Code generation (toINI, toYAML, etc.)
8. **cli.nix** (30 min) - CLI helpers
9. **filesystem.nix** (1 hour) - File system utilities
10. **licenses.nix** (30 min) - License definitions
11. **maintainers.nix** (30 min) - Maintainer definitions

### Systems Files (SIMPLE, 1 day)
12. **systems/parse.nix** (1 hour) - Platform string parsing
13. **systems/inspect.nix** (30 min) - Platform inspection
14. **systems/doubles.nix** (30 min) - Platform doubles
15. **systems/default.nix** (30 min) - Systems aggregator
16. **systems/examples.nix** (20 min) - Example platforms
17. **systems/platforms.nix** (1 hour) - Platform definitions
18. **systems/architectures.nix** (30 min) - Architecture info

### Complex Files (HARD, 2-3 days)
19. **derivations.nix** (2-3 hours) - Derivation helpers
20. **types.nix** (2-3 hours) - Type system
21. **tests.nix** (1-2 hours) - Test infrastructure
22. **customisation.nix** (1-2 hours) - Override/overrideAttrs
23. **fixed-points.nix** (1-2 hours) - Fix-point combinators
24. **asserts.nix** (1 hour) - Assertion helpers

### Specialized Files (DEFER, 2-3 days)
25. **fetchers.nix** - Network fetchers (may need more runtime work)
26. **trivial.nix** - Already tested in nixpkgs_trivial_test.js
27. **path/** - Path type system (Nix 2.4+)
28. **fileset/** - File set library (Nix 2.4+)
29. **gvariant.nix** - GNOME GVariant support
30. **sand.nix** - Unknown/undocumented
31. **sources.nix** - Source handling

**How to test each file:**
1. Read the file to understand what it exports
2. Pick 5-10 representative functions
3. Test in nix repl to understand behavior
4. Add tests to `main/tests/nixpkgs_lib_files_test.js`
5. Fix any translator bugs discovered

**Goal:** Test 20/41 files (50% coverage) to validate translator works on real-world code.

---

## 📁 Codebase Structure

```
denix/
├── main.js                 # Nix → JS translator (1,264 lines)
├── main/
│   ├── runtime.js          # 109 builtins (2,323 lines)
│   ├── fetcher.js          # HTTP downloads
│   ├── tar.js              # Tarball extraction
│   ├── nar_hash.js         # NAR hashing
│   ├── store_manager.js    # Store path management
│   ├── import_cache.js     # Import caching
│   ├── import_loader.js    # File loading
│   └── tests/              # 30 test files (4,000+ lines)
├── tools/
│   ├── hashing.js          # Hash functions
│   ├── store_path.js       # Store path computation
│   ├── import_resolver.js  # Path resolution
│   └── ... (hash implementations)
└── nixpkgs.lib/            # Test data (git submodule)
```

**Test organization (30 files):**
- Builtin tests (13): Core, types, lists, math, attrsets, strings, etc.
- Import tests (5): Resolver, cache, loader, integration, e2e
- Translator tests (4): Translator, hasattr, string/path interpolation
- Infrastructure tests (4): Fetcher, tar, nar_hash, store_manager
- Integration tests (2): nixpkgs trivial, nixpkgs lib files
- Derivation tests (2): Basic tests, standalone tests

---

## 🧪 Test Runner Shortcuts

```bash
./test.sh                # All tests (413 tests)
./test.sh types          # Type checking tests
./test.sh lists          # List operation tests
./test.sh math           # Math/bitwise tests
./test.sh attrs          # Attrset tests
./test.sh strings        # String tests
./test.sh paths          # Path/file tests
./test.sh derivation     # Derivation tests
./test.sh import         # Import system tests
./test.sh translator     # Translator tests
./test.sh integration    # nixpkgs integration tests
./test.sh <pattern>      # Custom filter
```

---

## 📚 Documentation Resources

**Official Nix docs:**
- Builtins: https://nix.dev/manual/nix/2.28/language/builtins.html
- Language: https://nix.dev/manual/nix/2.28/language/
- Derivations: https://nix.dev/manual/nix/2.28/language/derivations.html

**Additional resources:**
- noogle.dev - Searchable Nix function reference
- GitHub nixpkgs - Real-world usage examples
- Nix source code - https://github.com/NixOS/nix/blob/master/src/libexpr/primops.cc

---

## 🚀 IMMEDIATE NEXT ACTION - DO THIS FIRST

**Current task:** Add 2 math tests (lessThan, mul) - 30 minutes

**File to edit:** `main/tests/builtins_math_bitwise_test.js` (add to END of file)

**What to do:**
1. Test in nix repl:
   ```bash
   nix repl
   nix-repl> builtins.lessThan 3 5        # → true
   nix-repl> builtins.mul 3 5             # → 15
   ```

2. Add tests from Priority 1 section above (copy the test code)

3. Run tests:
   ```bash
   deno test --allow-all main/tests/builtins_math_bitwise_test.js
   ```

4. Fix runtime.js if tests fail (NEVER change tests to match bugs)

5. Update this file:
   - [ ] Remove lessThan from Priority 1 checklist
   - [ ] Remove mul from Priority 1 checklist
   - [ ] Update this section to point to next task (file operations)

**After this:** Create `main/tests/builtins_file_ops_test.js` (2-3 hours)

---

## 🚀 General Process - How To Do Any Task

**REMEMBER:** Focus only on what's NOT done. No achievements, no blocker excuses.

### Step 0: Verify current state
```bash
git clone <repo>
cd denix
./test.sh  # Verify tests pass
```

### Step 1: Pick ONLY from Priority 1 (Runtime Testing)
**DO NOT** work on Priority 2+ until Priority 1 is complete.
Start with the 2 quick wins: `lessThan` and `mul` (30 minutes).

### Step 2: Read documentation FIRST
```bash
# Open in browser:
# https://nix.dev/manual/nix/2.28/language/builtins.html#builtins-lessThan
```
Read the ENTIRE documentation page for your function. Do not guess behavior.

### Step 3: Test in nix repl (10+ examples)
```bash
nix repl
nix-repl> builtins.lessThan 3 5
true
nix-repl> builtins.lessThan 5 3
false
nix-repl> builtins.lessThan 3 3
false
nix-repl> builtins.lessThan 3.0 5
true
nix-repl> builtins.lessThan "a" "b"
# Test edge cases!
```

### Step 4: Write test matching EXACT nix repl behavior
```javascript
Deno.test("lessThan - basic comparison", () => {
    assertEquals(builtins.lessThan(3n, 5n), true)
    // Add 10+ test cases
})
```

### Step 5: Run test and fix bugs
```bash
deno test --allow-all main/tests/builtins_math_bitwise_test.js
```

**IF TEST FAILS:** Fix runtime.js implementation (never change test to match buggy code)

### Step 6: Update prompt.md
Remove the completed task from Priority 1 checklist. No achievement reporting.

---

## 🎓 Design Patterns

### BigInt vs Number
- Nix integers → JavaScript BigInt (for correct division: `1/2 ≠ 1.0/2`)
- Nix floats → JavaScript number
- All operators handle both types

### Scope Management
- Variables: `nixScope["varName"]` (avoids keyword conflicts)
- Function closures: Use `Object.create(parentScope)` NOT spread operator
- Lazy evaluation: Use getters for recursive attrsets

### String Interpolation
- Plain strings → JavaScript strings
- Interpolated → `InterpolatedString` class (lazy eval)
- Paths → `Path` class (extends `InterpolatedString`)

---

## 🔍 Troubleshooting

**Test fails but nix repl shows different output?**
- Your test is correct, the implementation is wrong
- Fix runtime.js to match nix repl behavior
- NEVER change test to match buggy implementation

**Import error?**
- esm.sh is unreliable - prefer Deno std library (@std/*)
- Only use npm modules through esm.sh: `https://esm.sh/NPM_MODULE_NAME`
- Check if Deno std has equivalent functionality first

**Store path mismatch?**
- Read Nix documentation on store path computation
- Check tools/store_path.js serialization format
- Verify NAR hash computation in main/nar_hash.js
- Test in nix repl to see expected output

**Scope issues?**
- Use Object.create() not spread operator for function closures
- Check runtime.scopeStack management
- Review design patterns section in this doc

**"I'm blocked" or "This is too complex":**
- You are NOT blocked. Break down the task into smaller steps.
- If task seems large, create subtasks and tackle them one at a time.
- Read documentation, search the internet, look at Nix source code.
- No excuses - senior developers find solutions.

---

---

## 📖 Required Reading Before Implementation

**CRITICAL:** Always consult Nix documentation while implementing. Do not guess behavior.

**Primary sources:**
- Official builtins reference: https://nix.dev/manual/nix/2.28/language/builtins.html
- Language reference: https://nix.dev/manual/nix/2.28/language/
- Derivations guide: https://nix.dev/manual/nix/2.28/language/derivations.html

**Secondary sources:**
- noogle.dev - Searchable function reference with examples
- GitHub nixpkgs - Real-world usage patterns
- Nix source code: https://github.com/NixOS/nix/blob/master/src/libexpr/primops.cc

**Example workflow:**
1. Read builtin documentation page for function you're implementing
2. Test actual behavior in `nix repl` with 5-10 examples
3. Check Nix source code if behavior is unclear
4. Search GitHub for real-world usage examples
5. THEN write your implementation matching observed behavior
