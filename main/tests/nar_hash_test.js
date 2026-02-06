import { assertEquals } from "jsr:@std/assert";
import { hashDirectory, hashFile, serializeNAR } from "../nar_hash.js";
import { sha256Hex } from "../../tools/hashing.js";

Deno.test("NAR - hashFile simple text file", async () => {
    const tempDir = await Deno.makeTempDir();

    try {
        const filePath = `${tempDir}/test.txt`;
        await Deno.writeTextFile(filePath, "Hello, World!");

        const hash = await hashFile(filePath);

        // Verify it's a valid hash format
        assertEquals(hash.startsWith("sha256:"), true);
        assertEquals(hash.length, 71); // "sha256:" (7) + 64 hex chars
    } finally {
        await Deno.remove(tempDir, { recursive: true });
    }
});

Deno.test("NAR - hashDirectory simple directory", async () => {
    const tempDir = await Deno.makeTempDir();

    try {
        await Deno.writeTextFile(`${tempDir}/file1.txt`, "Content 1");
        await Deno.writeTextFile(`${tempDir}/file2.txt`, "Content 2");

        const hash = await hashDirectory(tempDir);

        // Verify it's a valid hash format (could be sha256: or sha256-)
        assertEquals(hash.startsWith("sha256"), true);
    } finally {
        await Deno.remove(tempDir, { recursive: true });
    }
});

Deno.test("NAR - hashDirectory with nested directories", async () => {
    const tempDir = await Deno.makeTempDir();

    try {
        await Deno.mkdir(`${tempDir}/subdir`);
        await Deno.writeTextFile(`${tempDir}/file1.txt`, "Content 1");
        await Deno.writeTextFile(`${tempDir}/subdir/file2.txt`, "Content 2");

        const hash = await hashDirectory(tempDir);

        // Verify it's a valid hash format
        assertEquals(hash.startsWith("sha256"), true);
    } finally {
        await Deno.remove(tempDir, { recursive: true });
    }
});

Deno.test("NAR - determinism: same directory produces same hash", async () => {
    const tempDir1 = await Deno.makeTempDir();
    const tempDir2 = await Deno.makeTempDir();

    try {
        // Create identical directory structures
        await Deno.writeTextFile(`${tempDir1}/file1.txt`, "Content A");
        await Deno.writeTextFile(`${tempDir1}/file2.txt`, "Content B");

        await Deno.writeTextFile(`${tempDir2}/file1.txt`, "Content A");
        await Deno.writeTextFile(`${tempDir2}/file2.txt`, "Content B");

        const hash1 = await hashDirectory(tempDir1);
        const hash2 = await hashDirectory(tempDir2);

        // Both should produce the same hash
        assertEquals(hash1, hash2);
    } finally {
        await Deno.remove(tempDir1, { recursive: true });
        await Deno.remove(tempDir2, { recursive: true });
    }
});

Deno.test("NAR - empty directory", async () => {
    const tempDir = await Deno.makeTempDir();

    try {
        const hash = await hashDirectory(tempDir);

        // Verify it's a valid hash format
        assertEquals(hash.startsWith("sha256"), true);
    } finally {
        await Deno.remove(tempDir, { recursive: true });
    }
});

Deno.test("NAR - symlink handling", async () => {
    const tempDir = await Deno.makeTempDir();

    try {
        await Deno.writeTextFile(`${tempDir}/target.txt`, "Target content");
        await Deno.symlink(`${tempDir}/target.txt`, `${tempDir}/link.txt`);

        const hash = await hashDirectory(tempDir);

        // Verify it's a valid hash format
        assertEquals(hash.startsWith("sha256"), true);
    } finally {
        await Deno.remove(tempDir, { recursive: true });
    }
});

Deno.test("NAR - serializeNAR produces deterministic output", async () => {
    const tempDir = await Deno.makeTempDir();

    try {
        await Deno.writeTextFile(`${tempDir}/file.txt`, "Test content");

        const nar1 = await serializeNAR(`${tempDir}/file.txt`);
        const nar2 = await serializeNAR(`${tempDir}/file.txt`);

        // Should produce identical serialization
        assertEquals(nar1.length, nar2.length);
        assertEquals(sha256Hex(nar1), sha256Hex(nar2));
    } finally {
        await Deno.remove(tempDir, { recursive: true });
    }
});

Deno.test("NAR - file order independence (sorted alphabetically)", async () => {
    const tempDir1 = await Deno.makeTempDir();
    const tempDir2 = await Deno.makeTempDir();

    try {
        // Create files in different order
        await Deno.writeTextFile(`${tempDir1}/zebra.txt`, "Z");
        await Deno.writeTextFile(`${tempDir1}/alpha.txt`, "A");
        await Deno.writeTextFile(`${tempDir1}/beta.txt`, "B");

        await Deno.writeTextFile(`${tempDir2}/alpha.txt`, "A");
        await Deno.writeTextFile(`${tempDir2}/zebra.txt`, "Z");
        await Deno.writeTextFile(`${tempDir2}/beta.txt`, "B");

        const hash1 = await hashDirectory(tempDir1);
        const hash2 = await hashDirectory(tempDir2);

        // Should produce the same hash regardless of creation order
        assertEquals(hash1, hash2);
    } finally {
        await Deno.remove(tempDir1, { recursive: true });
        await Deno.remove(tempDir2, { recursive: true });
    }
});
