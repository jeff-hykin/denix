# Denix Architecture

## Directory Structure

```
denix/
├── translator.js         # Nix → JS translator (58KB)
├── main/
│   ├── runtime.js        # 102 builtins + operators (125KB) ⚠️
│   ├── import_cache.js   # Import caching & circular detection
│   ├── import_loader.js  # Nix file loading
│   ├── fetcher.js        # HTTP downloads
│   ├── tar.js           # Tarball extraction
│   ├── nar_hash.js      # NAR directory hashing
│   ├── store_manager.js # Store path management
│   ├── registry.js      # Flake registry resolution
│   └── errors.js        # Error types
├── tools/
│   ├── hashing.js       # SHA256/MD5/SHA1/SHA512 (wrapper)
│   ├── sha1.js          # SHA-1 implementation (20KB)
│   ├── sha_helpers.js   # SHA-512/256 implementation (35KB)
│   ├── md5.js           # MD5 implementation (14KB)
│   ├── store_path.js    # Store path computation
│   ├── import_resolver.js # Path resolution
│   ├── json_parse.js    # JSON with BigInt support
│   ├── lazy_array.js    # Proxy-based lazy arrays
│   └── parsing.js       # Tree-sitter wrapper
└── test.sh              # Smart test runner
```

## Core Components

### 1. Translator (translator.js)
- Converts Nix AST to JavaScript code
- Uses tree-sitter-nix for parsing
- Main function: `convertToJs(nixCode) → jsCode`
- Size: 58KB (1,264 lines)

### 2. Runtime (main/runtime.js) ⚠️
- Implements all 102 Nix builtins
- Exports: `builtins`, `operators`, `createRuntime()`
- Size: **125KB (2,824 lines)** - LARGEST FILE
- Contains: InterpolatedString, Path classes
- All builtins are curried: `builtins.substring(5)(3)(str)`

**Organizational Issue**: Single monolithic file with no logical grouping of builtins.

### 3. Import System
- **import_cache.js**: Caching + circular detection
- **import_loader.js**: File loading + evaluation
- **import_resolver.js**: Path resolution (tools/)
- Works with both .nix and .json files

### 4. Fetch System
- **fetcher.js**: HTTP downloads with retry logic
- **tar.js**: Tarball extraction (uses @std/tar)
- **nar_hash.js**: NAR directory hashing
- **store_manager.js**: Store path management + caching
- Store location: `~/.cache/denix/store/`

### 5. Hashing (tools/)
- **hashing.js**: Unified interface (sha256Hex, md5Hex, etc.)
- **sha1.js**: SHA-1 implementation (20KB)
- **sha_helpers.js**: SHA-512/256 implementation (35KB)
- **md5.js**: MD5 implementation (14KB)

**Note**: These are bundled third-party hash implementations. Could use Deno's crypto stdlib instead.

## Design Patterns

### Scope Management
- Nix variables → `nixScope["varName"]`
- Function closures use `Object.create(parentScope)` to preserve lazy getters
- **CRITICAL**: Never use spread operator for scope copying (loses getters)

### Type System
- Nix integers → JavaScript BigInt
- Nix floats → JavaScript number
- Nix strings → String or InterpolatedString class
- Nix paths → Path class (extends InterpolatedString)

### Lazy Evaluation
- Recursive attribute sets use getters for lazy evaluation
- `lazy_array.js` provides proxy-based lazy mapping
- InterpolatedString evaluates on first `toString()` call

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

**Note**: Path subclass only sets `isPath = true`. Uses inheritance to share toString() logic.

## Key Simplifications Made

1. **Removed empty Interpolater base class** - Path now extends InterpolatedString directly
2. **Reordered typeOf checks** - Path checked before InterpolatedString to avoid false positives

## Performance Considerations

### Bottlenecks
1. **runtime.js size**: 125KB - slow to parse/load
2. **All builtins curried**: Extra function call overhead
3. **Proxy-based lazy arrays**: Overhead for all array operations
4. **Three separate hash implementations**: ~70KB of hash code

### Optimization Opportunities
1. Split runtime.js into logical modules (type checking, lists, strings, etc.)
2. Make currying optional - let translator handle it
3. Consider Deno's crypto stdlib instead of bundled hash implementations
4. Use generators instead of proxies for lazy evaluation

## Test Structure

- 40 test files, 538+ tests total
- Naming: `builtins_*_test.js` for builtin tests
- Categories: type checking, lists, strings, math, fetchers, etc.
- All tests use Deno.test() format (except nixpkgs_trivial_test.js)

## Dependencies

All dependencies via URL imports:
- `tree-sitter-nix` (via esm.sh) - Nix parser
- `@deno/std` - Standard library
- `https://deno.land/x/good` - zip utility
- `https://deno.land/x/quickr` - FileSystem utility

**No npm/package.json** - pure Deno project.

## Future Architecture Improvements

### Priority 1: Split runtime.js
Current: Single 125KB file with all 102 builtins
Proposed:
```javascript
// runtime.js (main file)
export * from "./builtins/type_checking.js"
export * from "./builtins/lists.js"
export * from "./builtins/strings.js"
// ... etc

// builtins/type_checking.js
export const createTypeCheckingBuiltins = () => ({
  isInt, isBool, isString, typeOf, ...
})
```

Benefits:
- Faster loading (only load what's needed)
- Easier navigation
- Better organization
- Logical grouping

### Priority 2: Consolidate Hashing
Current: 3 separate hash implementations (70KB total)
Proposed: Use Deno's built-in crypto.subtle

### Priority 3: Reconsider Currying
Current: All builtins curried
Proposed: Accept multiple arguments, let translator curry if needed

Benefits:
- More natural JavaScript
- Easier debugging
- Less function call overhead
