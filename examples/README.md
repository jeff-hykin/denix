# Denix Examples

This directory contains Nix → JavaScript translation examples demonstrating how Denix converts Nix expressions to runnable JavaScript.

## Overview

Denix translates Nix expressions to JavaScript that runs on Deno. Each example shows:
1. **Input Nix code** (.nix file) - Original Nix expression
2. **Output JavaScript** (.js file) - Generated JavaScript code with detailed comments

## Quick Start

### Translate Nix to JavaScript

```bash
# Translate a single file
deno run --allow-read main.js examples/01_basics/literals.nix > output.js

# Translate and run
deno run --allow-read main.js examples/01_basics/literals.nix | deno run --allow-read -
```

### Verify All Examples

```bash
# Run automated verification
deno run --allow-read examples/verify_examples.js
```

## Key Translation Patterns

### 1. Integer → BigInt

Nix integers become JavaScript BigInt to ensure correct integer division:

```nix
# Nix
42
1 / 2  # Result: 0 (integer division truncates)
```

```javascript
// JavaScript
42n
1n / 2n  // Result: 0n (BigInt division truncates)
```

**Why BigInt?** In Nix, `1 / 2 = 0` (integer division). With JavaScript numbers, `1 / 2 = 0.5` (wrong!). BigInt preserves integer semantics.

### 2. Float → Number

Nix floats become JavaScript numbers:

```nix
# Nix
3.14
1.0 / 2.0  # Result: 0.5 (float division)
```

```javascript
// JavaScript
3.14
1.0 / 2.0  // Result: 0.5
```

### 3. Variable Access → Scope Lookup

Variables are accessed via `nixScope` object to avoid JavaScript keyword conflicts and handle dashes:

```nix
# Nix
let x = 42; in x
```

```javascript
// JavaScript
(() => {
  const nixScope = Object.create(parentScope);
  nixScope["x"] = 42n;
  return nixScope["x"];
})()
```

**Why `nixScope["x"]`?** Handles Nix variables with dashes like `my-var` and avoids conflicts with JS keywords like `class`, `function`.

### 4. Recursive Sets → Getters

Recursive attribute sets use getters for lazy evaluation:

```nix
# Nix
rec { a = 1; b = a + 1; }
```

```javascript
// JavaScript
(() => {
  const nixScope = Object.create(parentScope);
  const obj = {};
  Object.defineProperties(obj, {
    "a": { get: () => 1n, enumerable: true },
    "b": { get: () => operators.add(obj["a"])(1n), enumerable: true }
  });
  return obj;
})()
```

**Why getters?** Prevents evaluation order issues. `b` can reference `a` even though `a` is defined later.

### 5. Function Closures → Object.create()

Functions capture parent scope using `Object.create()` to preserve getters:

```nix
# Nix
let x = 1; in (y: x + y)
```

```javascript
// JavaScript
(() => {
  const nixScope = Object.create(parentScope);
  nixScope["x"] = 1n;
  return (function(arg) {
    const newScope = Object.create(nixScope);  // ✅ Preserves getters
    // NOT: {...nixScope}  // ❌ Loses getters!
    newScope["y"] = arg;
    return operators.add(newScope["x"])(newScope["y"]);
  });
})()
```

**Why `Object.create()`?** Spread operator `{...nixScope}` copies properties but loses getters. `Object.create()` preserves getters via prototype chain.

### 6. String Interpolation → InterpolatedString Class

Interpolated strings become `InterpolatedString` objects for lazy evaluation:

```nix
# Nix
let name = "world"; in "Hello ${name}!"
```

```javascript
// JavaScript
(() => {
  const nixScope = Object.create(parentScope);
  nixScope["name"] = "world";
  return new InterpolatedString(["Hello ", "!"], [nixScope["name"]]);
})()
```

**Why `InterpolatedString`?** Defers evaluation until `toString()` is called, matching Nix's lazy semantics.

## Common Gotchas

### 1. BigInt Division

```javascript
// JavaScript behavior
1n / 2n  // ✅ 0n (correct - integer division truncates)
1 / 2    // ❌ 0.5 (wrong for Nix integer semantics!)
```

### 2. Scope Must Be Captured

```javascript
// ❌ Wrong - loses parent scope
const newScope = { y: arg };

// ✅ Right - preserves parent scope via prototype
const newScope = Object.create(parentScope);
newScope["y"] = arg;
```

### 3. Getters Are Lost by Spread

```javascript
// ❌ Wrong - spread operator loses getters
const newScope = {...parentScope};

// ✅ Right - Object.create preserves getters
const newScope = Object.create(parentScope);
```

## Current Limitations

- **No network fetchers**: `fetchurl`, `fetchTarball`, `fetchGit` not implemented
- **No physical store**: `path`, `filterSource` require /nix/store
- **Import system**: Works only with local .nix and .json files (no network)
- **IFD limitations**: Import-from-derivation not supported

## Example Structure

```
examples/
├── 01_basics/           # Literals, operators, functions
├── 02_intermediate/     # Let expressions, rec sets, interpolation
├── 03_nixpkgs_patterns/ # Real-world patterns from nixpkgs.lib
└── 04_advanced/         # Imports, fixed points, overlays
```

## Running Examples

Each example can be translated and executed:

```bash
# Example 1: Literals
cd /Users/jeffhykin/repos/denix
deno run --allow-read main.js examples/01_basics/literals.nix

# Example 2: Run the generated JavaScript
deno run --allow-read main.js examples/01_basics/literals.nix > /tmp/output.js
deno run --allow-read /tmp/output.js

# Example 3: Translate and execute in one step
deno run --allow-read main.js examples/01_basics/literals.nix | deno run --allow-read -
```
