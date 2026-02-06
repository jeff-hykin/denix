/**
 * Tarball extraction module
 * Handles .tar, .tar.gz, .tar.bz2, .tar.xz formats
 */

import { UntarStream } from "jsr:@std/tar@0.1.10/untar-stream";

/**
 * Detect archive format from file extension
 * @param {string} filePath - Path to archive file
 * @returns {string} - Format: "tar", "gzip", "bzip2", or "xz"
 */
export function detectFormat(filePath) {
    if (filePath.endsWith('.tar.gz') || filePath.endsWith('.tgz')) {
        return 'gzip';
    } else if (filePath.endsWith('.tar.bz2') || filePath.endsWith('.tbz2')) {
        return 'bzip2';
    } else if (filePath.endsWith('.tar.xz') || filePath.endsWith('.txz')) {
        return 'xz';
    } else if (filePath.endsWith('.tar')) {
        return 'tar';
    }
    // Default to gzip as most common
    return 'gzip';
}

/**
 * Extract tarball to destination directory
 * @param {string} tarballPath - Path to tarball file
 * @param {string} destDir - Destination directory
 * @returns {Promise<string>} - Returns final extracted directory path (may strip top-level dir)
 */
export async function extractTarball(tarballPath, destDir) {
    // Ensure destination directory exists
    await Deno.mkdir(destDir, { recursive: true });

    const format = detectFormat(tarballPath);
    const file = await Deno.open(tarballPath, { read: true });

    try {
        let stream = file.readable;

        // Decompress if needed
        if (format === 'gzip') {
            stream = stream.pipeThrough(new DecompressionStream("gzip"));
        } else if (format === 'bzip2') {
            // Deno doesn't have built-in bzip2, need to shell out
            file.close();
            await extractWithTarCommand(tarballPath, destDir);
            return await stripTopLevelDirectory(destDir);
        } else if (format === 'xz') {
            // Deno doesn't have built-in xz, need to shell out
            file.close();
            await extractWithTarCommand(tarballPath, destDir);
            return await stripTopLevelDirectory(destDir);
        }

        // Extract tar entries
        const untarStream = stream.pipeThrough(new UntarStream());

        for await (const entry of untarStream) {
            const fullPath = `${destDir}/${entry.path}`;
            const typeflag = entry.header?.typeflag;

            // typeflag values: "0" or "\0" = file, "5" = directory, "2" = symlink
            if (typeflag === "5") {
                // Directory
                await Deno.mkdir(fullPath, { recursive: true });
                // Consume the readable stream if it exists (even for directories)
                if (entry.readable) {
                    await entry.readable.cancel();
                }
            } else if (typeflag === "0" || typeflag === "\0" || typeflag === "") {
                // Regular file
                // Ensure parent directory exists
                const parentDir = fullPath.substring(0, fullPath.lastIndexOf('/'));
                if (parentDir) {
                    await Deno.mkdir(parentDir, { recursive: true });
                }

                // Write file
                if (entry.readable) {
                    const outFile = await Deno.open(fullPath, { write: true, create: true, truncate: true });
                    await entry.readable.pipeTo(outFile.writable);

                    // Preserve executable bit if present
                    const mode = entry.header?.mode;
                    if (mode !== undefined && (mode & 0o111) !== 0) {
                        await Deno.chmod(fullPath, 0o755);
                    }
                } else {
                    // Empty file
                    await Deno.writeFile(fullPath, new Uint8Array(0));
                }
            } else if (typeflag === "2") {
                // Symlink
                const target = entry.header?.linkname || "";
                await Deno.symlink(target, fullPath);
                // Consume the readable stream if it exists
                if (entry.readable) {
                    await entry.readable.cancel();
                }
            } else {
                // Unknown type - consume the readable to prevent hanging
                if (entry.readable) {
                    await entry.readable.cancel();
                }
            }
        }
    } finally {
        try {
            file.close();
        } catch {
            // Already closed
        }
    }

    return await stripTopLevelDirectory(destDir);
}

/**
 * Extract tarball using system tar command (fallback for bzip2/xz)
 * @param {string} tarballPath - Path to tarball file
 * @param {string} destDir - Destination directory
 */
async function extractWithTarCommand(tarballPath, destDir) {
    const command = new Deno.Command("tar", {
        args: ["-xf", tarballPath, "-C", destDir],
        stdout: "piped",
        stderr: "piped",
    });

    const { code, stderr } = await command.output();

    if (code !== 0) {
        const errorText = new TextDecoder().decode(stderr);
        throw new Error(`tar extraction failed: ${errorText}`);
    }
}

/**
 * If all files are in a single top-level directory, strip it
 * @param {string} extractDir - Directory containing extracted files
 * @returns {Promise<string>} - Final directory path
 */
export async function stripTopLevelDirectory(extractDir) {
    const entries = [];
    for await (const entry of Deno.readDir(extractDir)) {
        entries.push(entry);
    }

    // If there's exactly one entry and it's a directory, move its contents up
    if (entries.length === 1 && entries[0].isDirectory) {
        const singleDir = `${extractDir}/${entries[0].name}`;
        const tempDir = `${extractDir}_temp`;

        // Move the single directory to temp location
        await Deno.rename(singleDir, tempDir);

        // Remove the now-empty extract directory
        await Deno.remove(extractDir);

        // Rename temp directory to final name
        await Deno.rename(tempDir, extractDir);
    }

    return extractDir;
}
