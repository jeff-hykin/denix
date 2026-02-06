import { assertEquals, assert } from "jsr:@std/assert";
import { extractTarball, detectFormat, stripTopLevelDirectory } from "../tar.js";

// Helper to create a test tarball
async function createTestTarball(tempDir, hasTopLevelDir = true) {
    const contentDir = `${tempDir}/content`;
    await Deno.mkdir(contentDir, { recursive: true });

    if (hasTopLevelDir) {
        // Create structure: content/myproject/file1.txt, content/myproject/subdir/file2.txt
        const projectDir = `${contentDir}/myproject`;
        await Deno.mkdir(`${projectDir}/subdir`, { recursive: true });
        await Deno.writeTextFile(`${projectDir}/file1.txt`, "Hello");
        await Deno.writeTextFile(`${projectDir}/subdir/file2.txt`, "World");

        // Make file1.txt executable
        await Deno.chmod(`${projectDir}/file1.txt`, 0o755);
    } else {
        // Create structure without top-level dir
        await Deno.mkdir(`${contentDir}/subdir`, { recursive: true });
        await Deno.writeTextFile(`${contentDir}/file1.txt`, "Hello");
        await Deno.writeTextFile(`${contentDir}/subdir/file2.txt`, "World");
    }

    // Create tarball using system tar
    const tarPath = `${tempDir}/test.tar.gz`;
    const command = new Deno.Command("tar", {
        args: ["-czf", tarPath, "-C", contentDir, "."],
        stdout: "piped",
        stderr: "piped",
    });

    const { code, stderr } = await command.output();
    if (code !== 0) {
        const errorText = new TextDecoder().decode(stderr);
        throw new Error(`tar creation failed: ${errorText}`);
    }

    return tarPath;
}

Deno.test("Tar - detectFormat .tar.gz", () => {
    assertEquals(detectFormat("file.tar.gz"), "gzip");
});

Deno.test("Tar - detectFormat .tgz", () => {
    assertEquals(detectFormat("file.tgz"), "gzip");
});

Deno.test("Tar - detectFormat .tar.bz2", () => {
    assertEquals(detectFormat("file.tar.bz2"), "bzip2");
});

Deno.test("Tar - detectFormat .tar.xz", () => {
    assertEquals(detectFormat("file.tar.xz"), "xz");
});

Deno.test("Tar - detectFormat .tar", () => {
    assertEquals(detectFormat("file.tar"), "tar");
});

Deno.test("Tar - extractTarball with top-level directory stripping", async () => {
    const tempDir = await Deno.makeTempDir();

    try {
        const tarPath = await createTestTarball(tempDir, true);
        const extractDir = `${tempDir}/extract`;

        const finalDir = await extractTarball(tarPath, extractDir);

        assertEquals(finalDir, extractDir);

        // After stripping, files should be at: extract/file1.txt, extract/subdir/file2.txt
        const file1 = await Deno.readTextFile(`${extractDir}/file1.txt`);
        assertEquals(file1, "Hello");

        const file2 = await Deno.readTextFile(`${extractDir}/subdir/file2.txt`);
        assertEquals(file2, "World");

        // Check that file1.txt is executable
        const stat = await Deno.stat(`${extractDir}/file1.txt`);
        assert((stat.mode & 0o111) !== 0, "file1.txt should be executable");
    } finally {
        await Deno.remove(tempDir, { recursive: true });
    }
});

Deno.test("Tar - extractTarball without top-level directory", async () => {
    const tempDir = await Deno.makeTempDir();

    try {
        const tarPath = await createTestTarball(tempDir, false);
        const extractDir = `${tempDir}/extract`;

        const finalDir = await extractTarball(tarPath, extractDir);

        assertEquals(finalDir, extractDir);

        // Files should be at: extract/file1.txt, extract/subdir/file2.txt
        const file1 = await Deno.readTextFile(`${extractDir}/file1.txt`);
        assertEquals(file1, "Hello");

        const file2 = await Deno.readTextFile(`${extractDir}/subdir/file2.txt`);
        assertEquals(file2, "World");
    } finally {
        await Deno.remove(tempDir, { recursive: true });
    }
});

Deno.test("Tar - stripTopLevelDirectory with single dir", async () => {
    const tempDir = await Deno.makeTempDir();

    try {
        // Create structure: tempDir/onlydir/file.txt
        const onlyDir = `${tempDir}/onlydir`;
        await Deno.mkdir(onlyDir);
        await Deno.writeTextFile(`${onlyDir}/file.txt`, "content");

        const result = await stripTopLevelDirectory(tempDir);
        assertEquals(result, tempDir);

        // After stripping, file should be at tempDir/file.txt
        const content = await Deno.readTextFile(`${tempDir}/file.txt`);
        assertEquals(content, "content");
    } finally {
        await Deno.remove(tempDir, { recursive: true });
    }
});

Deno.test("Tar - stripTopLevelDirectory with multiple entries (no stripping)", async () => {
    const tempDir = await Deno.makeTempDir();

    try {
        // Create structure: tempDir/file1.txt, tempDir/file2.txt
        await Deno.writeTextFile(`${tempDir}/file1.txt`, "content1");
        await Deno.writeTextFile(`${tempDir}/file2.txt`, "content2");

        const result = await stripTopLevelDirectory(tempDir);
        assertEquals(result, tempDir);

        // Files should still be at tempDir/file1.txt, tempDir/file2.txt
        const content1 = await Deno.readTextFile(`${tempDir}/file1.txt`);
        assertEquals(content1, "content1");

        const content2 = await Deno.readTextFile(`${tempDir}/file2.txt`);
        assertEquals(content2, "content2");
    } finally {
        await Deno.remove(tempDir, { recursive: true });
    }
});
