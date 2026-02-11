# Denix Architecture

## Overview

Denix is a Nix-to-JavaScript translator with full runtime implementation of Nix builtins.

**Last Review**: 2026-02-11

## Directory Structure

```
denix/
├── main/                    # Core implementation
│   ├── translator.js        # Nix→JS translation (1,288 lines)
│   ├── runtime.js           # Nix builtins (2,882 lines)
│   ├── import_cache.js      # Import caching (95 lines)
│   ├── import_loader.js     # File loading (113 lines)
│   ├── fetcher.js           # HTTP downloads (157 lines)
│   ├── tar.js               # Tarball extraction (171 lines)
│   ├── registry.js          # Flake registry (193 lines)
│   ├── nar_hash.js          # NAR hashing (244 lines)
│   ├── store_manager.js     # Store paths (148 lines)
│   └── tests/               # 40 test files (538+ tests)
├── tools/                   # Utility modules
│   ├── hashing.js           # Crypto facade (167 lines)
│   ├── sha1.js              # SHA1 impl (456 lines)
│   ├── sha_helpers.js       # SHA512 impl (859 lines)
│   ├── md5.js               # MD5 impl (276 lines)
│   ├── store_path.js        # Store computation (160 lines)
│   └── import_resolver.js   # Path resolution (119 lines)
├── README.md                # User documentation
├── TODO.md                  # Development priorities
└── prompt.md                # Agent instructions
```

## Design Principles

### 1. Clear Module Boundaries
- Each file has single clear purpose
- No circular dependencies
- 8/9 main modules < 250 lines

### 2. Appropriate Abstraction
- Tools separated from main logic
- Crypto algorithms isolated for auditing
- Test isolation preferred over DRY

### 3. Minimal Dependencies
- Only 2 external deps: quickr/FileSystem, good/zip
- Deno standard library for tests
- No npm bloat

### 4. Test Coverage
- 40 test files organized by category
- 538+ tests passing
- Integration tests for real-world scenarios

## Architecture Decisions

### Why runtime.js is Large (2,882 lines)

**Decision**: Keep as monolith, don't split

**Reasons**:
- Well-organized internally (classes → helpers → builtins → operators)
- Functionally complete (102/102 Nix 2.18 builtins)
- Splitting is high-risk, low-reward
- Editor folding makes it navigable
- No actual maintenance issues

**When to reconsider**: If file reaches 5,000+ lines or multiple contributors report issues

### Why Crypto Algorithms Are Separate Files

**Decision**: Keep sha1.js, md5.js, sha_helpers.js separate

**Reasons**:
- Independent implementations for security auditing
- Easy to replace/upgrade individual algorithms
- Clear licensing per algorithm
- No code duplication

### Why FileSystem from quickr

**Decision**: Keep external dependency

**Reasons**:
- Reliable cross-platform path operations
- Used 24 times throughout runtime.js
- Replacing with Deno.std: high cost, no benefit
- Minimal dependency (single import)

## Code Quality Metrics

- Zero circular dependencies
- Zero dead code
- Minimal duplication (test helpers intentionally isolated)
- Clear naming
- Comprehensive test coverage

## Current State

See TODO.md for current development priorities and what remains to be done.
