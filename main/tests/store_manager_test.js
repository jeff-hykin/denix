import { assertEquals, assert } from "jsr:@std/assert";
import {
    ensureStoreDirectory,
    computeFetchStorePath,
    atomicMove,
    getCachedPath,
    setCachedPath,
    withLock,
    exists,
    STORE_DIR,
} from "../store_manager.js";

Deno.test("StoreManager - ensureStoreDirectory creates directories", async () => {
    // Just verify it doesn't throw
    await ensureStoreDirectory();

    // Verify directories exist
    const storeStat = await Deno.stat(STORE_DIR);
    assert(storeStat.isDirectory);
});

Deno.test("StoreManager - computeFetchStorePath generates valid paths", () => {
    const narHash = "sha256:1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef";
    const name = "test-package";

    const storePath = computeFetchStorePath(narHash, name);

    // Should be under STORE_DIR
    assert(storePath.startsWith(STORE_DIR));

    // Should end with the name
    assert(storePath.endsWith(`-${name}`));
});

Deno.test("StoreManager - computeFetchStorePath handles different hash formats", () => {
    const name = "test";

    const path1 = computeFetchStorePath("sha256:abc123", name);
    const path2 = computeFetchStorePath("sha256-abc123", name);
    const path3 = computeFetchStorePath("abc123", name);

    // All should produce valid paths
    assert(path1.includes(STORE_DIR));
    assert(path2.includes(STORE_DIR));
    assert(path3.includes(STORE_DIR));
});

Deno.test("StoreManager - atomicMove moves files", async () => {
    const tempDir = await Deno.makeTempDir();

    try {
        const srcPath = `${tempDir}/source.txt`;
        const destPath = `${tempDir}/dest.txt`;

        await Deno.writeTextFile(srcPath, "test content");

        await atomicMove(srcPath, destPath);

        // Source should not exist
        let srcExists = true;
        try {
            await Deno.stat(srcPath);
        } catch {
            srcExists = false;
        }
        assertEquals(srcExists, false);

        // Destination should exist with correct content
        const content = await Deno.readTextFile(destPath);
        assertEquals(content, "test content");
    } finally {
        await Deno.remove(tempDir, { recursive: true });
    }
});

Deno.test("StoreManager - atomicMove moves directories", async () => {
    const tempDir = await Deno.makeTempDir();

    try {
        const srcPath = `${tempDir}/source_dir`;
        const destPath = `${tempDir}/dest_dir`;

        await Deno.mkdir(srcPath);
        await Deno.writeTextFile(`${srcPath}/file.txt`, "test content");

        await atomicMove(srcPath, destPath);

        // Source should not exist
        let srcExists = true;
        try {
            await Deno.stat(srcPath);
        } catch {
            srcExists = false;
        }
        assertEquals(srcExists, false);

        // Destination should exist with correct content
        const content = await Deno.readTextFile(`${destPath}/file.txt`);
        assertEquals(content, "test content");
    } finally {
        await Deno.remove(tempDir, { recursive: true });
    }
});

Deno.test("StoreManager - getCachedPath returns null for missing key", async () => {
    const result = await getCachedPath("nonexistent-key-12345");
    assertEquals(result, null);
});

Deno.test("StoreManager - setCachedPath and getCachedPath work together", async () => {
    const tempDir = await Deno.makeTempDir();

    try {
        const testKey = `test-key-${Date.now()}`;
        const testPath = `${tempDir}/test-path`;

        // Create the path so it exists
        await Deno.mkdir(testPath);

        // Set cache
        await setCachedPath(testKey, testPath);

        // Get cache
        const result = await getCachedPath(testKey);
        assertEquals(result, testPath);
    } finally {
        await Deno.remove(tempDir, { recursive: true });
    }
});

Deno.test("StoreManager - getCachedPath returns null if path doesn't exist", async () => {
    const testKey = `test-key-${Date.now()}`;
    const testPath = "/nonexistent/path/12345";

    // Set cache with nonexistent path
    await setCachedPath(testKey, testPath);

    // Get cache should return null and clean up cache
    const result = await getCachedPath(testKey);
    assertEquals(result, null);
});

Deno.test("StoreManager - withLock runs function", async () => {
    let executed = false;

    await withLock("test-lock", async () => {
        executed = true;
    });

    assertEquals(executed, true);
});

Deno.test("StoreManager - withLock returns function result", async () => {
    const result = await withLock("test-lock-2", async () => {
        return "success";
    });

    assertEquals(result, "success");
});

Deno.test("StoreManager - withLock handles errors", async () => {
    let errorCaught = false;

    try {
        await withLock("test-lock-3", async () => {
            throw new Error("Test error");
        });
    } catch (error) {
        errorCaught = true;
        assertEquals(error.message, "Test error");
    }

    assert(errorCaught);
});

Deno.test("StoreManager - exists returns true for existing path", async () => {
    const tempDir = await Deno.makeTempDir();

    try {
        const result = await exists(tempDir);
        assertEquals(result, true);
    } finally {
        await Deno.remove(tempDir, { recursive: true });
    }
});

Deno.test("StoreManager - exists returns false for missing path", async () => {
    const result = await exists("/nonexistent/path/12345");
    assertEquals(result, false);
});
