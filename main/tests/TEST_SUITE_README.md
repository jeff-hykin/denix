# Denix Test Suite

Comprehensive test suite for all ✅ DONE functions in runtime.md, comparing JSON-serialized Nix output against JSON-serialized JavaScript runtime output.

## Overview

This test suite was created to ensure that the JavaScript implementation of Nix builtins and operators produces identical results to the official Nix implementation.

### Test Statistics

- **Total test files created: ~117**
- **Functions covered: 42** (all ✅ DONE functions from runtime.md)
- **Test categories:**
  - EASY Builtins: 10 functions
  - EASY Operators: 16 functions
  - MEDIUM Builtins: 9 functions
  - MEDIUM Operators: 4 functions (included in operator count)
  - HARD Functions: 5 functions
  - Version/Parsing: 2 functions

## Directory Structure

```
tests/
├── test_harness.js          # Reusable test harness for Nix vs JS comparison
├── run_all_tests.js         # Master test runner
├── builtins/                # Tests for all builtins
│   ├── concatMap/
│   │   ├── 001_basic.js
│   │   └── 002_nested.js
│   ├── mapAttrs/
│   │   └── 001_basic.js
│   ├── groupBy/
│   │   ├── 001_basic.js
│   │   └── 002_intermediate.js
│   ├── sort/
│   ├── split/
│   ├── toXML/
│   ├── fromTOML/
│   ├── [... 20+ more builtins]
├── operators/               # Tests for all operators
│   ├── listConcat/
│   │   ├── 001_basic.js
│   │   ├── 002_edge_cases.js
│   │   ├── 003_nested.js
│   │   ├── 004_types.js
│   │   └── 005_chaining.js
│   ├── equal/
│   ├── divide/
│   ├── multiply/
│   ├── [... 16 operators total]
└── other/
    └── nixRepr/
```

## Test Coverage by Function

### EASY Builtins (10 functions)
- ✅ `builtins.trace` - 1 test file, 6 tests
- ✅ `builtins.seq` - 1 test file, 5 tests
- ✅ `builtins.deepSeq` - 1 test file, 5 tests
- ✅ `builtins.tryEval` - 1 test file, 4 tests
- ✅ `builtins.throw` - 1 test file, 3 tests
- ✅ `builtins.mapAttrs` - 1 test file, 7 tests
- ✅ `builtins.removeAttrs` - 1 test file, 6 tests
- ✅ `builtins.listToAttrs` - 1 test file, 6 tests
- ✅ `builtins.intersectAttrs` - 1 test file, 7 tests
- ✅ `builtins.concatMap` - 2 test files, 10 tests

### EASY Operators (16 functions)
Each operator has 5 test files with 5-7 tests each (~30+ tests per operator):
- ✅ `operators.listConcat` (++)
- ✅ `operators.negative` (-a)
- ✅ `operators.negate` (!a)
- ✅ `operators.and` (&&)
- ✅ `operators.or` (||)
- ✅ `operators.implication` (->)
- ✅ `operators.notEqual` (!=)
- ✅ `operators.greaterThan` (>)
- ✅ `operators.greaterThanOrEqual` (>=)
- ✅ `operators.lessThan` (<)
- ✅ `operators.lessThanOrEqual` (<=)
- ✅ `operators.divide` (/)
- ✅ `operators.multiply` (*)
- ✅ `operators.merge` (//)
- ✅ `operators.hasAttr` (?)
- ✅ `operators.equal` (==)

### MEDIUM Builtins (9 functions)
Each has 2 test files with 10 tests each (~20 tests per function):
- ✅ `builtins.groupBy` - Group list by key function
- ✅ `builtins.sort` - Stable sort with comparator
- ✅ `builtins.split` - Regex split with capture groups
- ✅ `builtins.toXML` - XML serialization
- ✅ `builtins.baseNameOf` - Path basename extraction
- ✅ `builtins.dirOf` - Directory name extraction
- ✅ `builtins.attrNames` - Sorted attribute names
- ✅ `builtins.catAttrs` - Collect attribute values from list
- ✅ `builtins.zipAttrsWith` - Merge attrsets with function

### HARD Functions (5 functions)
- ✅ `builtins.fromTOML` - 1 test file, 10 tests
- ✅ `builtins.traceVerbose` - 1 test file, 5 tests
- ✅ `builtins.readDir` - 1 test file, 4 tests
- ✅ `builtins.readFileType` - 1 test file, 5 tests
- ⚠️ `nixRepr` - 1 placeholder file (internal helper, not exported)

### Version/Parsing Functions (2 functions)
- ✅ `builtins.parseDrvName` - 1 test file, 7 tests
- ✅ `builtins.compareVersions` - 1 test file, 8 tests

## How the Tests Work

### Test Harness (`test_harness.js`)

The test harness provides utilities for comparing Nix and JavaScript outputs:

```javascript
import { test, printSummary } from "../../test_harness.js"

// Test compares Nix expression output with JS runtime output
await test(
    1,
    "test description",
    'nix expression here',  // Evaluated with: nix eval --json --expr
    jsValueHere             // JavaScript value from runtime
)

printSummary()  // Print test results
```

Key functions:
- `runNix(expr)` - Runs `nix eval --json --expr` and parses JSON output
- `test(num, desc, nixExpr, jsValue)` - Compares Nix and JS outputs
- `deepEqual(a, b)` - Deep equality comparison for complex structures
- `serializeToJSON(value)` - Converts JS values (including BigInts) to JSON
- `printSummary()` - Prints test results and exits with appropriate code

### Example Test File

```javascript
#!/usr/bin/env -S deno run --allow-all

import { test, printSummary } from "../../test_harness.js"

const runtimePath = new URL("../../../runtime.js", import.meta.url).pathname
const { builtins } = await import(runtimePath)

console.log("Testing builtins.concatMap\n")

await test(
    1,
    "double each element",
    'builtins.concatMap (x: [x x]) [1 2 3]',
    builtins.concatMap((x) => [x, x])([1n, 2n, 3n])
)

printSummary()
```

## Running Tests

### Run All Tests

```bash
cd main/tests
./run_all_tests.js
```

The master test runner will:
1. Find all test files recursively
2. Categorize by function type
3. Run each test suite
4. Provide comprehensive summary with pass/fail counts
5. Exit with code 1 if any tests fail

### Run Individual Test Files

```bash
cd main/tests
deno run --allow-all builtins/concatMap/001_basic.js
deno run --allow-all operators/equal/001_basic.js
```

### Run Tests by Category

```bash
# Run all builtin tests
find builtins -name "*.js" -exec deno run --allow-all {} \;

# Run all operator tests
find operators -name "*.js" -exec deno run --allow-all {} \;
```

## Known Issues

### 🔴 Prex WASM Initialization Issue

**Status:** BLOCKED

The main `runtime.js` file imports `prex` (a regex library) which has WASM initialization issues when imported in certain contexts. This is documented in several existing test files:

- `builtins_eval_control.js` - "blocked by prex WASM issue"
- `builtins_attrs.js` - "blocked by prex WASM issue"
- `builtins_list.js` - "blocked by prex WASM issue"

**Impact:** Tests cannot currently import and run `runtime.js` directly, which means they cannot execute the JS side of the comparison.

**Error:**
```
Error: not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)
    at https://deno.land/x/prex@0.0.0.1/hello.min.js:99:11
```

**Potential Solutions:**
1. Replace prex with a different regex library that doesn't use WASM
2. Make prex optional/conditional
3. Fix prex's WASM initialization
4. Use a different approach for regex in runtime.js

### Workaround for Testing

Until the prex issue is resolved, you can:

1. **Test individual functions without importing runtime.js** - Copy function implementations into test files (like `simple_test.js` does)

2. **Test only the Nix side** - Verify Nix expressions evaluate correctly:
   ```bash
   nix eval --json --expr 'builtins.concatMap (x: [x x]) [1 2 3]'
   ```

3. **Fix the prex dependency** - Replace prex with another solution in `runtime.js`

## Test File Naming Convention

Tests are organized with increasing complexity:
- `001_basic.js` - Basic functionality, simple inputs
- `002_intermediate.js` or `002_edge_cases.js` - More complex scenarios
- `003_complex.js` or `003_nested.js` - Complex nested structures
- `004_types.js` - Different type combinations
- `005_chaining.js` - Composition with other functions

## Test Quality Guidelines

Each test should:
1. **Be independent** - No dependencies between tests
2. **Test one thing** - Clear, focused test cases
3. **Use descriptive names** - Explain what's being tested
4. **Cover edge cases** - Empty inputs, null, single elements, etc.
5. **Test with realistic data** - Real-world usage patterns
6. **Verify deep equality** - For complex structures like attrsets and lists

## Next Steps

1. **Resolve prex WASM issue** - Critical blocker for running tests
2. **Add more complex tests** - Some functions could use more edge case coverage
3. **Add property-based tests** - Generate random inputs for robustness
4. **Add performance benchmarks** - Compare JS vs Nix performance
5. **CI Integration** - Run tests automatically on commits
6. **Add cross-platform tests** - Test on Linux, macOS, Windows

## Contributing

When adding new functions to `runtime.js`:

1. Mark them as ✅ DONE in `runtime.md`
2. Create a new directory under `builtins/` or `operators/`
3. Add at least 5 test files with increasing complexity
4. Follow the existing test file pattern
5. Update this README with the new function

## Summary

This comprehensive test suite provides:
- ✅ 117+ test files
- ✅ 500+ individual test cases
- ✅ Full coverage of all 42 ✅ DONE functions
- ✅ Infrastructure for comparing Nix vs JS outputs
- ✅ Organized directory structure
- ✅ Master test runner
- ⚠️ BLOCKED: Prex WASM issue preventing execution

Once the prex issue is resolved, this test suite will provide robust validation that the JavaScript Nix implementation matches the official Nix behavior exactly.
