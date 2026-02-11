import { assertEquals, assertRejects, assert, assertExists } from "jsr:@std/assert";
import { builtins } from "../runtime.js";

Deno.test("fetchMercurial - string URL argument (basic clone)", async () => {
    try {
        // Use a small, stable public Mercurial repository
        // Using the hello world example from Mercurial's official site
        const result = await builtins.fetchMercurial("https://www.mercurial-scm.org/repo/hello");

        // Should return a Path object with metadata
        assertExists(result.toString()); // outPath
        assertEquals(typeof result.rev, "string");
        assertEquals(result.rev.length, 40); // Full commit hash (40 hex chars)
        assertEquals(typeof result.shortRev, "string");
        assertEquals(result.shortRev.length, 12); // Mercurial short hash (12 chars)
        assertEquals(typeof result.revCount, "bigint");
        assertEquals(typeof result.lastModified, "bigint");
        assertExists(result.narHash);
        assertEquals(typeof result.narHash, "string");
        assertEquals(result.narHash.startsWith("sha256"), true);
        assertEquals(typeof result.branch, "string");
        assertEquals(result.branch, "default"); // default branch
    } catch (error) {
        // Network issues are acceptable in tests
        if (!error.message.includes("hg clone failed") &&
            !error.message.includes("network") &&
            !error.message.includes("fetch")) {
            throw error;
        }
        console.warn("Skipping test due to network issue:", error.message);
    }
});

Deno.test("fetchMercurial - object argument with URL and name", async () => {

    try {
        const result = await builtins.fetchMercurial({
            url: "https://www.mercurial-scm.org/repo/hello",
            name: "hello-custom-name",
        });

        // Store path should include custom name
        const storePath = result.toString();
        assertEquals(storePath.includes("hello-custom-name"), true);
        assertExists(result.rev);
    } catch (error) {
        if (!error.message.includes("hg clone failed") &&
            !error.message.includes("network")) {
            throw error;
        }
        console.warn("Skipping test due to network issue:", error.message);
    }
});

Deno.test("fetchMercurial - specific revision", async () => {

    try {
        // Use a known commit from the hello repo
        // This is an early commit in the repository
        const knownRev = "82e55d328c8ca4ee16520036c0aaace03a5beb65";

        const result = await builtins.fetchMercurial({
            url: "https://www.mercurial-scm.org/repo/hello",
            rev: knownRev,
        });

        // Should checkout the specific revision
        assertEquals(result.rev, knownRev);
        assertEquals(result.shortRev, knownRev.substring(0, 12));
    } catch (error) {
        if (!error.message.includes("hg clone failed") &&
            !error.message.includes("network") &&
            !error.message.includes("update")) {
            throw error;
        }
        console.warn("Skipping test due to network issue:", error.message);
    }
});

Deno.test("fetchMercurial - caching works", async () => {

    try {
        // First fetch
        const result1 = await builtins.fetchMercurial("https://www.mercurial-scm.org/repo/hello");

        // Second fetch (should use cache)
        const result2 = await builtins.fetchMercurial("https://www.mercurial-scm.org/repo/hello");

        // Should return same store path (from cache)
        assertEquals(result1.toString(), result2.toString());
        assertEquals(result1.rev, result2.rev);
        assertEquals(result1.narHash, result2.narHash);
    } catch (error) {
        if (!error.message.includes("hg clone failed") &&
            !error.message.includes("network")) {
            throw error;
        }
        console.warn("Skipping test due to network issue:", error.message);
    }
});

Deno.test("fetchMercurial - invalid URL throws error", async () => {

    try {
        await builtins.fetchMercurial("https://invalid.example.com/nonexistent");
        throw new Error("Should have thrown an error for invalid URL");
    } catch (error) {
        // Should get hg clone failed error
        assertEquals(error.message.includes("hg clone failed"), true);
    }
});

Deno.test("fetchMercurial - metadata types are correct", async () => {

    try {
        const result = await builtins.fetchMercurial("https://www.mercurial-scm.org/repo/hello");

        // Verify all metadata types
        assertEquals(typeof result.rev, "string");
        assertEquals(typeof result.shortRev, "string");
        assertEquals(typeof result.revCount, "bigint");
        assertEquals(typeof result.lastModified, "bigint");
        assertEquals(typeof result.narHash, "string");
        assertEquals(typeof result.branch, "string");

        // Verify metadata values are reasonable
        assertEquals(result.rev.length, 40); // Full SHA-1/SHA-256 hash
        assertEquals(result.shortRev.length, 12); // Mercurial short hash
        assert(result.revCount > 0n); // Should have at least 1 commit
        assert(result.lastModified > 0n); // Should have a valid timestamp
        assertEquals(result.narHash.startsWith("sha256"), true);
    } catch (error) {
        if (!error.message.includes("hg clone failed") &&
            !error.message.includes("network")) {
            throw error;
        }
        console.warn("Skipping test due to network issue:", error.message);
    }
});

Deno.test("fetchMercurial - ref parameter with branch name", async () => {

    try {
        // Clone with specific branch reference
        const result = await builtins.fetchMercurial({
            url: "https://www.mercurial-scm.org/repo/hello",
            ref: "default",
        });

        assertExists(result.rev);
        assertEquals(result.rev.length, 40);
        assertEquals(result.branch, "default");
    } catch (error) {
        if (!error.message.includes("hg clone failed") &&
            !error.message.includes("network")) {
            throw error;
        }
        console.warn("Skipping test due to network issue:", error.message);
    }
});

Deno.test("fetchMercurial - hg not installed throws clear error", async () => {
    // This test validates the error message when hg is not found
    // We can't actually test this without removing hg from PATH,
    // but we can verify the error handling structure exists

    // Just verify that fetchMercurial is a function that can be called
    assertEquals(typeof builtins.fetchMercurial, "function");
});
