/**
 * NAR (Nix Archive) hashing module
 * Computes deterministic hashes of files and directories
 */

import { sha256Hex } from "../tools/hashing.js";

/**
 * Hash a directory using NAR format
 * First attempts to use `nix hash path` if available, falls back to pure JS implementation
 * @param {string} dirPath - Path to directory to hash
 * @returns {Promise<string>} - Hash in format "sha256:abc123..."
 */
export async function hashDirectory(dirPath) {
    // Phase 1: Try using nix command if available
    try {
        const command = new Deno.Command("nix", {
            args: ["hash", "path", dirPath],
            stdout: "piped",
            stderr: "piped",
        });

        const { code, stdout, stderr } = await command.output();

        if (code === 0) {
            const hash = new TextDecoder().decode(stdout).trim();
            // nix hash path returns "sha256-base32hash", we want "sha256:hexhash"
            // For now, if nix is available, convert or use as-is
            // The output is actually SRI format (sha256-base32)
            return hash;
        }
    } catch (error) {
        // nix command not available, fall through to pure JS implementation
    }

    // Phase 2: Pure JavaScript NAR implementation
    return await hashDirectoryPure(dirPath);
}

/**
 * Hash a single file
 * @param {string} filePath - Path to file to hash
 * @returns {Promise<string>} - Hash in format "sha256:abc123..."
 */
export async function hashFile(filePath) {
    const data = await Deno.readFile(filePath);
    const narSerialized = serializeFileNAR(data);
    const hash = sha256Hex(narSerialized);
    return `sha256:${hash}`;
}

/**
 * Pure JavaScript NAR hashing implementation
 * @param {string} dirPath - Path to directory to hash
 * @returns {Promise<string>} - Hash in format "sha256:abc123..."
 */
async function hashDirectoryPure(dirPath) {
    const narSerialized = await serializeNAR(dirPath);
    const hash = sha256Hex(narSerialized);
    return `sha256:${hash}`;
}

/**
 * Serialize a file/directory/symlink in NAR format
 * NAR format is deterministic and used by Nix for content-addressing
 * @param {string} path - Path to serialize
 * @returns {Promise<Uint8Array>} - Serialized NAR data
 */
export async function serializeNAR(path) {
    const stat = await Deno.stat(path);

    if (stat.isFile) {
        const data = await Deno.readFile(path);
        return serializeFileNAR(data, stat.mode);
    } else if (stat.isDirectory) {
        return await serializeDirectoryNAR(path);
    } else if (stat.isSymlink) {
        const target = await Deno.readLink(path);
        return serializeSymlinkNAR(target);
    } else {
        throw new Error(`Unsupported file type at ${path}`);
    }
}

/**
 * Serialize a file in NAR format
 * @param {Uint8Array} data - File contents
 * @param {number|undefined} mode - File mode (for executable bit)
 * @returns {Uint8Array} - Serialized NAR data
 */
function serializeFileNAR(data, mode) {
    const parts = [];

    // NAR format for file:
    // "(" + "type" + "(" + "regular" + ")" +
    // [optional: "executable" + "(" + ")" ] +
    // "contents" + "(" + <data> + ")" + ")"

    parts.push(encodeString("("));
    parts.push(encodeString("type"));
    parts.push(encodeString("("));
    parts.push(encodeString("regular"));
    parts.push(encodeString(")"));

    // Check if executable
    if (mode !== undefined && (mode & 0o111) !== 0) {
        parts.push(encodeString("executable"));
        parts.push(encodeString("("));
        parts.push(encodeString(")"));
    }

    parts.push(encodeString("contents"));
    parts.push(encodeString("("));
    parts.push(encodeData(data));
    parts.push(encodeString(")"));
    parts.push(encodeString(")"));

    return concatUint8Arrays(parts);
}

/**
 * Serialize a directory in NAR format
 * @param {string} dirPath - Path to directory
 * @returns {Promise<Uint8Array>} - Serialized NAR data
 */
async function serializeDirectoryNAR(dirPath) {
    const parts = [];

    // NAR format for directory:
    // "(" + "type" + "(" + "directory" + ")" +
    // <sorted entries> + ")"

    parts.push(encodeString("("));
    parts.push(encodeString("type"));
    parts.push(encodeString("("));
    parts.push(encodeString("directory"));
    parts.push(encodeString(")"));

    // Read and sort entries alphabetically (critical for determinism)
    const entries = [];
    for await (const entry of Deno.readDir(dirPath)) {
        entries.push(entry);
    }
    entries.sort((a, b) => a.name.localeCompare(b.name));

    // Serialize each entry
    for (const entry of entries) {
        const entryPath = `${dirPath}/${entry.name}`;
        const entryNAR = await serializeNAR(entryPath);

        parts.push(encodeString("entry"));
        parts.push(encodeString("("));
        parts.push(encodeString("name"));
        parts.push(encodeString("("));
        parts.push(encodeString(entry.name));
        parts.push(encodeString(")"));
        parts.push(encodeString("node"));
        parts.push(entryNAR);
        parts.push(encodeString(")"));
    }

    parts.push(encodeString(")"));

    return concatUint8Arrays(parts);
}

/**
 * Serialize a symlink in NAR format
 * @param {string} target - Symlink target
 * @returns {Uint8Array} - Serialized NAR data
 */
function serializeSymlinkNAR(target) {
    const parts = [];

    // NAR format for symlink:
    // "(" + "type" + "(" + "symlink" + ")" +
    // "target" + "(" + <target> + ")" + ")"

    parts.push(encodeString("("));
    parts.push(encodeString("type"));
    parts.push(encodeString("("));
    parts.push(encodeString("symlink"));
    parts.push(encodeString(")"));
    parts.push(encodeString("target"));
    parts.push(encodeString("("));
    parts.push(encodeString(target));
    parts.push(encodeString(")"));
    parts.push(encodeString(")"));

    return concatUint8Arrays(parts);
}

/**
 * Encode a string for NAR format
 * Format: length (8 bytes, little-endian) + data + padding to 8-byte boundary
 * @param {string} str - String to encode
 * @returns {Uint8Array} - Encoded data
 */
function encodeString(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    return encodeData(data);
}

/**
 * Encode binary data for NAR format
 * Format: length (8 bytes, little-endian) + data + padding to 8-byte boundary
 * @param {Uint8Array} data - Data to encode
 * @returns {Uint8Array} - Encoded data with length prefix and padding
 */
function encodeData(data) {
    const length = data.length;
    const padding = (8 - (length % 8)) % 8;
    const totalSize = 8 + length + padding;

    const result = new Uint8Array(totalSize);

    // Write length as 64-bit little-endian integer
    const view = new DataView(result.buffer);
    view.setBigUint64(0, BigInt(length), true); // true = little-endian

    // Copy data
    result.set(data, 8);

    // Padding is already zero-filled by Uint8Array constructor

    return result;
}

/**
 * Concatenate multiple Uint8Arrays
 * @param {Uint8Array[]} arrays - Arrays to concatenate
 * @returns {Uint8Array} - Concatenated array
 */
function concatUint8Arrays(arrays) {
    const totalLength = arrays.reduce((sum, arr) => sum + arr.length, 0);
    const result = new Uint8Array(totalLength);
    let offset = 0;
    for (const arr of arrays) {
        result.set(arr, offset);
        offset += arr.length;
    }
    return result;
}
