# Denix Architecture

Simple Nix → JavaScript translator with runtime builtins. No npm, pure Deno.

## Directory Structure

```
denix/
├── translator.js         # Nix → JS translator (58KB, 1264 lines)
├── main/
│   ├── runtime.js        # 102 builtins + operators + errors (125KB, 2828 lines) ⚠️
│   ├── import_cache.js   # Import caching & circular detection
│   ├── import_loader.js  # Nix file loading
│   ├── fetcher.js        # HTTP downloads
│   ├── tar.js           # Tarball extraction
│   ├── nar_hash.js      # NAR directory hashing
│   ├── store_manager.js # Store path management
│   └── registry.js      # Flake registry resolution
├── tools/
│   ├── hashing.js       # SHA256/MD5/SHA1/SHA512 wrapper
│   ├── sha1.js          # SHA-1 implementation (456 lines)
│   ├── sha_helpers.js   # SHA-512/256 implementation (859 lines)
│   ├── md5.js           # MD5 implementation (276 lines)
│   ├── store_path.js    # Store path computation
│   └── import_resolver.js # Path resolution
└── test.sh              # Smart test runner
```

## Core Components

### Translator (translator.js)
Converts Nix AST → JavaScript code. Uses tree-sitter-nix for parsing.

### Runtime (main/runtime.js) ⚠️ NEEDS SPLITTING
**Problem**: Single monolithic 2,882-line file with all 102 builtins mixed together.
- Exports: `builtins` (102 functions), `operators`, `createRuntime()`
- Contains: InterpolatedString, Path classes, NixError, NotImplemented
- All builtins manually curried: `builtins.substring(5)(3)(str)`

### Import System
- `import_cache.js` - Caching + circular detection
- `import_loader.js` - File loading + evaluation
- `import_resolver.js` - Path resolution (in tools/)

### Fetch System
- `fetcher.js` - HTTP downloads with retry logic
- `tar.js` - Tarball extraction (@std/tar)
- `nar_hash.js` - NAR directory hashing
- `store_manager.js` - Store path management + caching
- Store: `~/.cache/denix/store/`

### Hashing (tools/) ⚠️ COULD USE DENO CRYPTO
**Problem**: 1,591 lines of bundled third-party hash code (70KB).
- `sha1.js` - 456 lines
- `sha_helpers.js` - 859 lines
- `md5.js` - 276 lines
- `hashing.js` - Wrapper (189 lines)

**Alternative**: Deno's `crypto.subtle` API (built-in, faster, smaller).

## Design Patterns

### Scope Management
- Nix variables → `nixScope["varName"]` (avoids JS keyword conflicts)
- Function closures use `Object.create(parentScope)` to preserve lazy getters
- **CRITICAL**: Never use spread operator `{...scope}` - loses getters

### Type System
- Nix ints → JavaScript BigInt (for correct integer division)
- Nix floats → JavaScript number
- Nix strings → String or InterpolatedString
- Nix paths → Path class (extends InterpolatedString)

### Lazy Evaluation
- Recursive attribute sets use getters
- Proxy-based lazy arrays (inlined in runtime.js)
- InterpolatedString evaluates on first `toString()`

## Class Hierarchy

```javascript
InterpolatedString {
  strings: string[]
  getters: function[]
  cached: string | null
  isPath: boolean = false
  toString() → string
}

Path extends InterpolatedString {
  isPath: boolean = true
}
```

## Performance Bottlenecks

1. **runtime.js size**: 129KB (2,882 lines) - slow to parse/load
2. **All builtins curried**: Extra function call overhead
3. **Proxy-based lazy arrays**: Overhead on all array ops
4. **Bundled hash implementations**: ~70KB (1,591 lines)

## Dependencies

All via URL imports (no npm):
- `tree-sitter-nix` (esm.sh) - Parser
- `@deno/std` - Standard library
- `deno.land/x/good` - zip utility
- `deno.land/x/quickr` - FileSystem utility

## Simplification Opportunities

### 1. Split runtime.js (HIGH PRIORITY)
**Current**: Single 2,882-line file
**Proposed**:
```
main/builtins/
  ├── type_checking.js  (isInt, isBool, typeOf...)
  ├── lists.js          (map, filter, fold...)
  ├── strings.js        (split, concat, substring...)
  ├── attrsets.js       (mapAttrs, filterAttrs...)
  ├── math.js           (add, sub, bitAnd...)
  ├── fetch.js          (fetchGit, fetchTarball...)
  └── derivations.js    (derivation, toPath...)
```

**Benefits**: Faster loading, better navigation, logical grouping
**Effort**: Medium (4-6 hours)

### 2. Use Deno Crypto (MEDIUM PRIORITY)
**Current**: 1,591 lines of custom hash code
**Proposed**: Use `crypto.subtle` API

```javascript
// Current:
import { sha256Hex } from "./tools/hashing.js"

// Proposed:
const sha256Hex = async (data) => {
  const msgUint8 = new TextEncoder().encode(data)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8)
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}
```

**Benefits**: Remove ~70KB, faster (native), battle-tested
**Effort**: Medium (2-3 hours)
**Note**: Some Nix-specific hashing may require custom code

### 3. Reconsider Currying (LOW PRIORITY)
**Current**: All builtins manually curried
**Proposed**: Normal multi-arg functions, let translator curry

**Benefits**: More natural JS, easier debugging, less overhead
**Effort**: High (6-8 hours) - requires translator changes

### 4. Merge store_path.js + store_manager.js (LOW PRIORITY)
Related functions split across two files - could merge.
**Effort**: Low (1 hour)

## What NOT to Change

1. **Import system architecture** - Well-designed
2. **Fetch system** - Clean, modular
3. **Scope management pattern** - Object.create() is correct
4. **BigInt for integers** - Required for Nix semantics
5. **URL imports** - Maintains Deno philosophy
