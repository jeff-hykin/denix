import { assertEquals, assertRejects } from "jsr:@std/assert";
import { downloadFile, downloadWithRetry, extractNameFromUrl, validateSha256 } from "../fetcher.js";
import { sha256Hex } from "../../tools/hashing.js";

Deno.test("Fetcher - downloadFile from httpbin.org", async () => {
    const tempDir = await Deno.makeTempDir();
    const destPath = `${tempDir}/test.bin`;

    try {
        // Download 1024 random bytes
        const result = await downloadFile("https://httpbin.org/bytes/1024", destPath);

        assertEquals(result, destPath);

        // Verify file exists and has correct size
        const stat = await Deno.stat(destPath);
        assertEquals(stat.size, 1024);
    } finally {
        await Deno.remove(tempDir, { recursive: true });
    }
});

Deno.test("Fetcher - downloadFile handles 404", async () => {
    const tempDir = await Deno.makeTempDir();
    const destPath = `${tempDir}/test.bin`;

    try {
        await assertRejects(
            async () => await downloadFile("https://httpbin.org/status/404", destPath),
            Error,
            "HTTP 404"
        );
    } finally {
        await Deno.remove(tempDir, { recursive: true });
    }
});

Deno.test("Fetcher - downloadFile handles 500", async () => {
    const tempDir = await Deno.makeTempDir();
    const destPath = `${tempDir}/test.bin`;

    try {
        await assertRejects(
            async () => await downloadFile("https://httpbin.org/status/500", destPath),
            Error,
            "HTTP 500"
        );
    } finally {
        await Deno.remove(tempDir, { recursive: true });
    }
});

Deno.test("Fetcher - validateSha256 with correct hash", async () => {
    const tempDir = await Deno.makeTempDir();
    const filePath = `${tempDir}/test.txt`;

    try {
        // Create a test file with known content
        const content = "Hello, World!";
        await Deno.writeTextFile(filePath, content);

        // Compute the actual hash
        const actualHash = sha256Hex(content);

        // Validate with correct hash (should not throw)
        await validateSha256(filePath, actualHash);
    } finally {
        await Deno.remove(tempDir, { recursive: true });
    }
});

Deno.test("Fetcher - validateSha256 with wrong hash throws", async () => {
    const tempDir = await Deno.makeTempDir();
    const filePath = `${tempDir}/test.txt`;

    try {
        await Deno.writeTextFile(filePath, "Hello, World!");

        const wrongHash = "0000000000000000000000000000000000000000000000000000000000000000";

        await assertRejects(
            async () => await validateSha256(filePath, wrongHash),
            Error,
            "SHA256 mismatch"
        );
    } finally {
        await Deno.remove(tempDir, { recursive: true });
    }
});

Deno.test("Fetcher - extractNameFromUrl from GitHub archive", () => {
    const url = "https://github.com/NixOS/nixpkgs/archive/23.11.tar.gz";
    const name = extractNameFromUrl(url);
    assertEquals(name, "23.11");
});

Deno.test("Fetcher - extractNameFromUrl from simple tarball", () => {
    const url = "https://example.com/foo-1.2.3.tar.gz";
    const name = extractNameFromUrl(url);
    assertEquals(name, "foo-1.2.3");
});

Deno.test("Fetcher - extractNameFromUrl from .tgz", () => {
    const url = "https://example.com/bar-2.0.tgz";
    const name = extractNameFromUrl(url);
    assertEquals(name, "bar-2.0");
});

Deno.test("Fetcher - extractNameFromUrl from .tar.bz2", () => {
    const url = "https://example.com/baz-3.5.tar.bz2";
    const name = extractNameFromUrl(url);
    assertEquals(name, "baz-3.5");
});

Deno.test("Fetcher - extractNameFromUrl fallback for root URL", () => {
    const url = "https://example.com/";
    const name = extractNameFromUrl(url);
    assertEquals(name, "source");
});

Deno.test("Fetcher - downloadWithRetry succeeds on first attempt", async () => {
    const tempDir = await Deno.makeTempDir();
    const destPath = `${tempDir}/test.bin`;

    try {
        const result = await downloadWithRetry("https://httpbin.org/bytes/512", destPath, 3);

        assertEquals(result, destPath);

        const stat = await Deno.stat(destPath);
        assertEquals(stat.size, 512);
    } finally {
        await Deno.remove(tempDir, { recursive: true });
    }
});

Deno.test("Fetcher - downloadWithRetry doesn't retry 404", async () => {
    const tempDir = await Deno.makeTempDir();
    const destPath = `${tempDir}/test.bin`;

    try {
        // Should fail immediately without retries
        await assertRejects(
            async () => await downloadWithRetry("https://httpbin.org/status/404", destPath, 3),
            Error,
            "HTTP 404"
        );
    } finally {
        await Deno.remove(tempDir, { recursive: true });
    }
});

Deno.test("Fetcher - downloadWithRetry retries on 500", async () => {
    const tempDir = await Deno.makeTempDir();
    const destPath = `${tempDir}/test.bin`;

    try {
        // Should retry multiple times and eventually fail
        await assertRejects(
            async () => await downloadWithRetry("https://httpbin.org/status/500", destPath, 2),
            Error,
            "after 3 attempts"
        );
    } finally {
        await Deno.remove(tempDir, { recursive: true });
    }
});
