# Session: Import System Design
**Date**: 2026-02-05 (Session 5)
**Focus**: Design and plan for implementing `builtins.import` and `builtins.scopedImport`

## Objective
Enable the translator to handle complete nixpkgs.lib files by implementing the import system.

## Current Situation

### What Works ✅
- All 87 translator tests passing
- All 120+ runtime tests passing
- Can translate and run individual pure Nix functions
- Successfully tested against 20 functions from nixpkgs trivial.nix

### Current Blocker 🚧
Cannot test complete nixpkgs.lib files because they all use `import`:

```nix
# strings.nix (line 11)
asciiTable = import ./ascii-table.nix;

# All major lib files have similar dependencies
```

## Import System Requirements

### 1. Core Functionality
`builtins.import` must:
- Load and parse .nix files from filesystem
- Evaluate the loaded code in an isolated scope
- Return the resulting value
- Handle both relative and absolute paths
- Support importing:
  - `.nix` files (Nix expressions)
  - `.json` files (parsed as Nix attrsets)
  - Directories with `default.nix`

### 2. Key Technical Challenges

#### A. File Path Resolution
```javascript
// Relative to current file
import ./sibling.nix
import ../parent/file.nix

// Absolute paths
import /absolute/path/file.nix

// Directories
import ./some-dir  // loads ./some-dir/default.nix

// NIX_PATH search paths
import <nixpkgs>  // searches NIX_PATH (already have builtins.findFile)
```

#### B. Caching/Memoization
- Same file imported multiple times should return cached result
- Cache must be per-evaluation context
- Cache key: canonical absolute path

```javascript
// Pseudocode
const importCache = new Map()

function import(path) {
    const absPath = resolvePath(path)
    if (importCache.has(absPath)) {
        return importCache.get(absPath)
    }
    const result = evaluateFile(absPath)
    importCache.set(absPath, result)
    return result
}
```

#### C. Circular Dependency Detection
```nix
# a.nix
let b = import ./b.nix; in { inherit b; }

# b.nix
let a = import ./a.nix; in { inherit a; }  # Circular!
```

Need to detect and throw meaningful error:
```javascript
const importStack = []

function import(path) {
    if (importStack.includes(path)) {
        throw new Error(`Circular import detected: ${importStack.join(' -> ')} -> ${path}`)
    }
    importStack.push(path)
    try {
        // ... import logic
    } finally {
        importStack.pop()
    }
}
```

#### D. Scope Management
Imported files should:
- Have access to `builtins`
- NOT have access to importing file's local scope (unless using scopedImport)
- Be evaluated in their own directory context for relative imports

```javascript
// Current file: /foo/bar/main.nix
import ./helper.nix

// helper.nix should be able to do:
import ./sibling.nix  // resolves to /foo/bar/sibling.nix
```

### 3. Implementation Components

#### Component A: Path Resolution (CRITICAL)
**File**: `tools/import_resolver.js`
**Complexity**: Medium
**Time Estimate**: 2-3 days

```javascript
export function resolveImportPath(fromFile, importPath) {
    // Handle absolute paths
    if (importPath.startsWith('/')) {
        return importPath
    }

    // Handle relative paths
    if (importPath.startsWith('./') || importPath.startsWith('../')) {
        const fromDir = path.dirname(fromFile)
        return path.resolve(fromDir, importPath)
    }

    // Handle directory imports (append /default.nix)
    // Handle .nix extension inference
    // ...
}
```

#### Component B: Import Cache (EASY)
**File**: `main/import_cache.js`
**Complexity**: Low
**Time Estimate**: 1 day

```javascript
export class ImportCache {
    constructor() {
        this.cache = new Map()
        this.importStack = []
    }

    get(path) { return this.cache.get(path) }
    set(path, value) { this.cache.set(path, value) }
    has(path) { return this.cache.has(path) }

    pushStack(path) {
        if (this.importStack.includes(path)) {
            throw new NixError(`Circular import: ${this.formatStack(path)}`)
        }
        this.importStack.push(path)
    }

    popStack() { this.importStack.pop() }

    formatStack(newPath) {
        return [...this.importStack, newPath].join(' -> ')
    }
}
```

#### Component C: File Loader (MEDIUM)
**File**: `main/import_loader.js`
**Complexity**: Medium
**Time Estimate**: 2-3 days

Needs to:
- Read file from disk
- Detect file type (.nix vs .json vs directory)
- Parse .nix files using existing parser
- Parse .json files with BigInt support (already have this)
- Handle default.nix for directories
- Integrate with translator to convert Nix → JS
- Execute the generated JS in isolated scope

```javascript
export async function loadAndEvaluate(filepath, runtime) {
    // Read file
    const content = await Deno.readTextFile(filepath)

    // Handle .json
    if (filepath.endsWith('.json')) {
        return runtime.builtins.fromJSON(content)
    }

    // Handle .nix
    const jsCode = convertToJs(content)

    // Create isolated scope with builtins
    const evalScope = {
        builtins: runtime.builtins,
        // ... other runtime objects
    }

    // Evaluate in isolated context
    const result = new Function('runtime', 'builtins', 'operators', jsCode)(
        runtime,
        runtime.builtins,
        runtime.operators
    )

    return result
}
```

#### Component D: Runtime Integration (MEDIUM)
**File**: `main/runtime.js`
**Complexity**: Medium
**Time Estimate**: 2-3 days

Add to runtime:
```javascript
import { ImportCache } from "./import_cache.js"
import { resolveImportPath } from "../tools/import_resolver.js"
import { loadAndEvaluate } from "./import_loader.js"

export const createRuntime = () => {
    const runtime = {
        // ... existing runtime
        importCache: new ImportCache(),
        currentFile: null,  // Track current file for relative imports
    }

    const builtins = {
        // ... existing builtins

        import: (path) => {
            // Resolve path relative to current file
            const absPath = resolveImportPath(runtime.currentFile, path)

            // Check cache
            if (runtime.importCache.has(absPath)) {
                return runtime.importCache.get(absPath)
            }

            // Circular detection
            runtime.importCache.pushStack(absPath)

            try {
                // Save current file context
                const prevFile = runtime.currentFile
                runtime.currentFile = absPath

                // Load and evaluate
                const result = loadAndEvaluate(absPath, runtime)

                // Cache result
                runtime.importCache.set(absPath, result)

                return result
            } finally {
                runtime.currentFile = prevFile
                runtime.importCache.popStack()
            }
        },

        scopedImport: (scope) => (path) => {
            // Same as import but with custom scope
            // ... implementation
        },
    }

    return { runtime, builtins, operators }
}
```

### 4. Integration with Translator

The translator (main.js) needs minimal changes:
- When generating code, inject current file path into runtime context
- No other changes needed - import calls translate like any other builtin

```javascript
// Generated code includes:
runtime.currentFile = "/path/to/current/file.nix"
```

## Implementation Plan

### Phase 1: Path Resolution (Week 1)
- [ ] Create `tools/import_resolver.js`
- [ ] Implement absolute path handling
- [ ] Implement relative path handling
- [ ] Handle directory imports (default.nix)
- [ ] Handle .nix extension inference
- [ ] Test path resolution thoroughly

### Phase 2: Import Infrastructure (Week 1-2)
- [ ] Create `main/import_cache.js`
- [ ] Implement cache with circular detection
- [ ] Add comprehensive tests

### Phase 3: File Loading (Week 2)
- [ ] Create `main/import_loader.js`
- [ ] Implement .nix file loading
- [ ] Implement .json file loading
- [ ] Handle directory detection
- [ ] Integrate with translator
- [ ] Test evaluation isolation

### Phase 4: Runtime Integration (Week 2-3)
- [ ] Add import cache to runtime
- [ ] Implement `builtins.import`
- [ ] Implement `builtins.scopedImport`
- [ ] Add current file tracking
- [ ] Handle scope isolation properly

### Phase 5: Testing & Validation (Week 3)
- [ ] Create import test suite
- [ ] Test simple imports
- [ ] Test circular dependencies
- [ ] Test relative paths
- [ ] Test directory imports
- [ ] Test with actual nixpkgs.lib files

### Phase 6: nixpkgs.lib Integration (Week 3-4)
- [ ] Test loading strings.nix
- [ ] Test loading lists.nix
- [ ] Test loading attrsets.nix
- [ ] Test loading default.nix (main entry point)
- [ ] Create comprehensive nixpkgs.lib test suite

## Time Estimate

**Total**: 3-4 weeks of focused work

**Breakdown**:
- Path resolution: 2-3 days
- Cache infrastructure: 1 day
- File loading: 2-3 days
- Runtime integration: 2-3 days
- Testing: 5-7 days
- nixpkgs.lib validation: 3-5 days

## Alternative Approach: Manual Extraction

Instead of implementing full import system, continue extracting pure functions:
- **Pros**: Faster, validates translator immediately
- **Cons**: Manual work, doesn't enable full nixpkgs.lib usage
- **Time**: 1-2 days per major lib file

This could be done in parallel with import system development.

## Recommendation

**Parallel approach**:
1. Start import system implementation (long-term goal)
2. Continue extracting pure functions for immediate validation
3. Use extracted functions to guide import system requirements

## Next Immediate Steps

1. Create `tools/import_resolver.js` with path resolution
2. Add comprehensive path resolution tests
3. Create `main/import_cache.js` with caching and circular detection
4. Extract more functions from strings.nix and lists.nix while developing import system

---

## Notes for Future Implementation

- Consider using Deno's permission system for file access
- May need to handle Nix path type (./path/to/file) specially
- NIX_PATH environment variable needs proper parsing
- Store paths (<nixpkgs>) already partially handled by builtins.findFile
- Consider making import async (currently Nix import is synchronous)
