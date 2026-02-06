# Next Steps: Implement fetchTarball

## Quick Summary

**Goal**: Implement `builtins.fetchTarball` to download and extract tarballs to a local store.

**Status**: Ready to start. No blockers.

**Estimated time**: 2-3 days (15-22 hours)

**Priority**: HIGHEST - Most commonly used fetcher in nixpkgs

## Implementation Order

1. **main/fetcher.js** (2-3 hours) - HTTP downloads with retries
2. **main/tar.js** (3-4 hours) - Tarball extraction using @std/tar
3. **main/nar_hash.js** (4-6 hours) - Directory hashing (NAR format)
4. **main/store_manager.js** (2-3 hours) - Store path management and caching
5. **runtime.js updates** (2-3 hours) - Wire up fetchTarball builtin
6. **Tests** (2-3 hours) - Comprehensive test coverage

## Key Technical Decisions

- **Store location**: `~/.cache/denix/store/` (no root permissions needed)
- **Tar extraction**: Use Deno @std/tar (no external binary)
- **NAR hashing**: Implement in pure JavaScript (no Nix dependency)
- **Already available**:
  - `tools/store_path.js` - Store path computation
  - `tools/hashing.js` - SHA256 and other hash functions

## Quick Start

### 1. Create main/fetcher.js

```javascript
import { sha256Hex } from "../tools/hashing.js";

export async function downloadFile(url, destPath) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  const file = await Deno.create(destPath);
  await response.body.pipeTo(file.writable);
  return destPath;
}

export async function downloadWithRetry(url, destPath, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await downloadFile(url, destPath);
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise(r => setTimeout(r, 1000 * (2 ** i))); // Exponential backoff
    }
  }
}

export function extractNameFromUrl(url) {
  // Extract filename from URL: "https://example.com/foo-1.0.tar.gz" -> "foo-1.0"
  const match = url.match(/\/([^\/]+?)(\.tar\.(gz|bz2|xz))?$/);
  return match ? match[1] : "source";
}

export async function validateSha256(filePath, expectedSha256) {
  const content = await Deno.readFile(filePath);
  const actualSha256 = sha256Hex(content);
  if (actualSha256 !== expectedSha256) {
    throw new Error(`SHA256 mismatch: expected ${expectedSha256}, got ${actualSha256}`);
  }
}
```

### 2. Create main/tar.js

```javascript
import { UntarStream } from "jsr:@std/tar/untar-stream";
import { dirname } from "jsr:@std/path";

export async function extractTarball(tarballPath, destDir) {
  await Deno.mkdir(destDir, { recursive: true });

  const file = await Deno.open(tarballPath);

  for await (const entry of file.readable
    .pipeThrough(new DecompressionStream("gzip"))
    .pipeThrough(new UntarStream())) {

    const path = `${destDir}/${entry.path}`;
    await Deno.mkdir(dirname(path), { recursive: true });

    if (entry.readable) {
      await entry.readable.pipeTo((await Deno.create(path)).writable);
    }
  }

  return await stripTopLevelDirectory(destDir);
}

async function stripTopLevelDirectory(dir) {
  const entries = Array.from(Deno.readDirSync(dir));
  if (entries.length === 1 && entries[0].isDirectory) {
    // Single top-level directory - return it instead
    return `${dir}/${entries[0].name}`;
  }
  return dir;
}
```

### 3. Create main/nar_hash.js

```javascript
import { sha256Hex } from "../tools/hashing.js";

export async function hashDirectory(dirPath) {
  // Phase 1: Try using nix binary if available
  try {
    const cmd = new Deno.Command("nix", {
      args: ["hash", "path", dirPath],
      stdout: "piped",
      stderr: "piped",
    });
    const { stdout, success } = await cmd.output();
    if (success) {
      return new TextDecoder().decode(stdout).trim().replace("sha256:", "");
    }
  } catch {
    // Nix not available, fall back
  }

  // Phase 2: Basic implementation
  return await computeBasicHash(dirPath);
}

async function computeBasicHash(dirPath) {
  const files = [];

  async function walk(dir) {
    for await (const entry of Deno.readDir(dir)) {
      const path = `${dir}/${entry.name}`;
      if (entry.isDirectory) {
        await walk(path);
      } else {
        const content = await Deno.readFile(path);
        files.push({ path: path.replace(dirPath + "/", ""), content });
      }
    }
  }

  await walk(dirPath);
  files.sort((a, b) => a.path.localeCompare(b.path));

  // Simple hash: concatenate all file contents in sorted order
  const combined = files.map(f => f.content).join("");
  return sha256Hex(combined);
}
```

### 4. Create main/store_manager.js

```javascript
import { computeStorePath } from "../tools/store_path.js";

const STORE_DIR = `${Deno.env.get("HOME")}/.cache/denix/store`;
const CACHE_FILE = `${Deno.env.get("HOME")}/.cache/denix/cache.json`;

export async function ensureStoreDirectory() {
  await Deno.mkdir(STORE_DIR, { recursive: true });
}

export function computeFetchStorePath(narHash, name) {
  const hashInput = `fixed:out:sha256:${narHash}:${STORE_DIR}:${name}`;
  return computeStorePath("output", hashInput, name, STORE_DIR);
}

export async function atomicMove(srcPath, destPath) {
  await Deno.rename(srcPath, destPath);
}

let cache = null;

export async function getCachedPath(cacheKey) {
  if (!cache) {
    try {
      cache = JSON.parse(await Deno.readTextFile(CACHE_FILE));
    } catch {
      cache = {};
    }
  }
  return cache[cacheKey];
}

export async function setCachedPath(cacheKey, storePath) {
  if (!cache) cache = {};
  cache[cacheKey] = storePath;
  await Deno.writeTextFile(CACHE_FILE, JSON.stringify(cache, null, 2));
}
```

### 5. Update main/runtime.js

Replace the fetchTarball NotImplemented with:

```javascript
"fetchTarball": async (args) => {
  const { downloadWithRetry, extractNameFromUrl } = await import("./fetcher.js");
  const { extractTarball } = await import("./tar.js");
  const { hashDirectory } = await import("./nar_hash.js");
  const { ensureStoreDirectory, computeFetchStorePath, getCachedPath, setCachedPath, atomicMove } = await import("./store_manager.js");

  // Parse args: string URL or {url, sha256?, name?}
  let url, sha256, name;
  if (typeof args === "string") {
    url = args;
    name = extractNameFromUrl(url);
  } else {
    url = args.url;
    sha256 = args.sha256;
    name = args.name || extractNameFromUrl(url);
  }

  await ensureStoreDirectory();

  // Check cache
  const cacheKey = `${url}:${sha256 || ""}`;
  const cached = await getCachedPath(cacheKey);
  if (cached && await Deno.stat(cached).catch(() => null)) {
    return new Path(cached);
  }

  // Download
  const tempTar = `/tmp/denix-download-${Date.now()}.tar.gz`;
  await downloadWithRetry(url, tempTar);

  // Extract
  const tempDir = `/tmp/denix-extract-${Date.now()}`;
  const extractedDir = await extractTarball(tempTar, tempDir);

  // Hash
  const narHash = await hashDirectory(extractedDir);

  // Verify
  if (sha256 && narHash !== sha256) {
    await Deno.remove(tempTar);
    await Deno.remove(tempDir, { recursive: true });
    throw new NixError(`fetchTarball: hash mismatch\n  expected: ${sha256}\n  got:      ${narHash}`);
  }

  // Move to store
  const storePath = computeFetchStorePath(narHash, name);
  await atomicMove(extractedDir, storePath);
  await setCachedPath(cacheKey, storePath);

  // Cleanup
  await Deno.remove(tempTar);
  if (extractedDir !== tempDir) {
    await Deno.remove(tempDir, { recursive: true });
  }

  return new Path(storePath);
},
```

### 6. Create tests

Create `main/tests/fetchtarball_test.js`:

```javascript
import { assertEquals, assertRejects } from "jsr:@std/assert";
import { createRuntime } from "../runtime.js";

const runtime = createRuntime();
const { builtins } = runtime;

Deno.test("fetchTarball - basic download", async () => {
  const url = "https://github.com/NixOS/nix/archive/2.18.0.tar.gz";
  const result = await builtins.fetchTarball(url);
  assertEquals(typeof result.toString(), "string");
  const stat = await Deno.stat(result.toString());
  assertEquals(stat.isDirectory, true);
});

Deno.test("fetchTarball - with sha256", async () => {
  const result = await builtins.fetchTarball({
    url: "https://github.com/NixOS/nix/archive/2.18.0.tar.gz",
    sha256: "...", // Get actual hash first
  });
  assertEquals(typeof result.toString(), "string");
});

Deno.test("fetchTarball - caching works", async () => {
  const url = "https://github.com/NixOS/nix/archive/2.18.0.tar.gz";
  const result1 = await builtins.fetchTarball(url);
  const result2 = await builtins.fetchTarball(url);
  assertEquals(result1.toString(), result2.toString());
});
```

## After fetchTarball is Complete

Next priorities (in order):
1. **fetchurl** (1-2 days) - Simpler, reuses fetcher.js
2. **builtins.path** (1-2 days) - Copy local files to store
3. **filterSource** (1 day) - Filter files with predicate
4. **toJSON for Path** (1 hour) - Simple fix
5. **fetchGit** (1-2 weeks) - Requires git integration
6. **fetchTree** (1 week) - Wraps other fetchers

After these, runtime will be 99% complete (97/98 builtins working).

## Resources

- **Detailed plan**: See `prompt.md` (613 lines)
- **Deno @std/tar**: https://docs.deno.com/runtime/reference/std/tar/
- **Nix store paths**: https://nixos.org/manual/nix/stable/store/store-path.html
- **NAR format**: https://gist.github.com/jbeda/5c79d2b1434f0018d693
