# Import System - User Guide

## Overview

Denix now has a fully functional import system that implements `builtins.import` and `builtins.scopedImport`! This enables loading external Nix files, making it possible to test complete nixpkgs.lib files and other multi-file Nix projects.

## Features

### ✅ Supported Import Types

1. **Nix Files (.nix)**
   ```nix
   import ./helper.nix
   ```

2. **JSON Files (.json)**
   ```nix
   import ./data.json
   ```

3. **Directory Imports**
   ```nix
   import ./mylib  # loads ./mylib/default.nix
   ```

4. **Relative Paths**
   ```nix
   import ./sibling.nix
   import ../parent/file.nix
   import ./subdir/nested.nix
   ```

5. **Absolute Paths**
   ```nix
   import /absolute/path/to/file.nix
   ```

### ✅ Extension Inference

Files without extensions are automatically checked for `.nix`:
```nix
import ./helper  # loads ./helper.nix if it exists
```

### ✅ Import Caching

Imported files are cached automatically. If the same file is imported multiple times, the cached result is returned:

```nix
let
  # First import - evaluates file
  math1 = import ./lib/math.nix;

  # Second import - returns cached result
  math2 = import ./lib/math.nix;
in
# math1 and math2 are the same cached value
```

### ✅ Circular Import Detection

Circular imports are detected and reported with clear error messages:

```nix
# a.nix
import ./b.nix

# b.nix
import ./a.nix

# Error: Circular import detected:
#   /path/to/a.nix -> /path/to/b.nix -> /path/to/a.nix
```

### ✅ Nested Imports

Files can import other files which themselves import more files:

```nix
# main.nix
let lib = import ./lib.nix;
in lib.myFunction 42

# lib.nix
let helpers = import ./helpers.nix;
in {
  myFunction = x: helpers.add x 10;
}

# helpers.nix
{
  add = a: b: a + b;
}
```

## Usage Examples

### Basic Import

```nix
# constants.nix
{
  version = "1.0.0";
  port = 8080;
}

# main.nix
let
  constants = import ./constants.nix;
in
"Server version ${constants.version} on port ${builtins.toString constants.port}"
```

### Importing Functions

```nix
# math.nix
{
  add = x: y: x + y;
  multiply = x: y: x * y;
  square = x: x * x;
}

# main.nix
let
  math = import ./math.nix;
in
{
  result1 = math.add 10 20;        # 30
  result2 = math.multiply 5 6;     # 30
  result3 = math.square 7;         # 49
}
```

### Importing JSON

```nix
# data.json
{
  "users": 100,
  "items": 250,
  "active": true
}

# main.nix
let
  data = import ./data.json;
in
{
  total = data.users + data.items;  # 350
  status = if data.active then "online" else "offline";
}
```

### Directory Imports

```nix
# mylib/default.nix
{
  version = "2.0";
  functions = import ./functions.nix;
}

# mylib/functions.nix
{
  greet = name: "Hello, ${name}!";
}

# main.nix
let
  lib = import ./mylib;  # loads ./mylib/default.nix
in
lib.functions.greet "World"  # "Hello, World!"
```

### Scoped Import (Advanced)

`builtins.scopedImport` allows you to override builtins in the imported file:

```nix
let
  customScope = {
    # Override toString to add prefix
    toString = x: "custom: " + builtins.toString x;
  };

  result = builtins.scopedImport customScope ./file.nix;
in
result
```

**Note**: `scopedImport` does NOT use caching - each call evaluates fresh.

## Implementation Details

### Architecture

The import system consists of 4 components:

1. **Path Resolution** (`tools/import_resolver.js`)
   - Resolves relative and absolute paths
   - Handles directory imports and extension inference

2. **Import Cache** (`main/import_cache.js`)
   - Caches import results
   - Detects circular imports
   - Tracks import stack for error messages

3. **File Loader** (`main/import_loader.js`)
   - Loads and parses .nix files
   - Loads and parses .json files
   - Integrates with translator

4. **Runtime Integration** (`main/runtime.js`)
   - Implements `builtins.import`
   - Implements `builtins.scopedImport`
   - Manages current file context

### How It Works

1. **Path Resolution**: Convert relative path to absolute path
2. **Cache Check**: Check if file has been imported before
3. **Circular Detection**: Check if file is currently being imported
4. **Load File**: Read file contents from disk
5. **Translate**: Convert Nix code to JavaScript (for .nix files)
6. **Evaluate**: Execute generated JavaScript in isolated scope
7. **Cache Result**: Store result for future imports
8. **Return**: Return the evaluated value

### Current File Tracking

The import system tracks the "current file" to resolve relative imports correctly:

```nix
# /projects/myapp/main.nix
let helper = import ./lib/helper.nix;
in helper.doSomething

# When evaluating, runtime.currentFile = "/projects/myapp/main.nix"
# So "./lib/helper.nix" resolves to "/projects/myapp/lib/helper.nix"
```

## Testing

The import system has comprehensive test coverage:

```bash
# Run all import tests
deno test --allow-all main/tests/import_*.js

# Test suites:
# - import_resolver_test.js: Path resolution (16 tests)
# - import_cache_test.js: Caching & circular detection (12 tests)
# - import_loader_test.js: File loading (7 tests)
# - import_integration_test.js: builtins.import (8 tests)
# - import_e2e_test.js: Full translator integration (6 tests)
```

**Total**: 49 tests, all passing ✅

## Limitations

### Not Supported (Yet)

1. **Angle Bracket Imports**: `<nixpkgs>` syntax
   - Use `builtins.findFile` instead
   - Example: `builtins.findFile nixPath "nixpkgs"`

2. **Store Paths**: Imports from `/nix/store/`
   - Requires full store implementation
   - Planned for future work

3. **Remote URLs**: `import (fetchurl "...")`
   - Requires network layer
   - Planned for future work

### Workarounds

For now, you can work around these limitations:

- Use relative or absolute local paths
- Pre-download files before importing
- Use JSON for data files

## Performance

The import system is optimized for performance:

- **Caching**: Files are only evaluated once
- **Lazy Evaluation**: Only imports when needed
- **Synchronous**: No async overhead (matches Nix behavior)

## Future Enhancements

Planned improvements:

1. **Async Import**: Optional async variant for large files
2. **Import Hooks**: Custom pre/post-import processing
3. **Source Maps**: Better error messages with source locations
4. **Hot Reload**: Development mode with file watching

## Contributing

The import system is fully implemented and tested! If you find bugs or have suggestions:

1. Check existing test files for examples
2. Add test cases for new scenarios
3. Submit issues or PRs

## Learn More

- **Design Document**: See `SESSION_2026_02_05_IMPORT_DESIGN.md` for architecture
- **Implementation**: See `SESSION_2026_02_05_IMPORT_COMPLETE.md` for details
- **Source Code**:
  - `tools/import_resolver.js` - Path resolution
  - `main/import_cache.js` - Import caching
  - `main/import_loader.js` - File loading
  - `main/runtime.js` - Runtime integration

---

**Status**: ✅ Production Ready

Last Updated: 2026-02-05
