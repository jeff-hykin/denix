/**
 * HTTP fetcher module for downloading files
 * Used by fetchTarball, fetchurl, and other network-based builtins
 */

/**
 * Download a file from URL to destPath with streaming (doesn't load into memory)
 * @param {string} url - URL to download from
 * @param {string} destPath - Destination file path
 * @returns {Promise<string>} - Returns destPath on success
 */
async function downloadFile(url, destPath) {
    const response = await fetch(url);

    if (!response.ok) {
        // Cancel the response body to prevent leaks
        if (response.body) {
            await response.body.cancel();
        }
        throw new Error(`Failed to download ${url}: HTTP ${response.status} ${response.statusText}`);
    }

    if (!response.body) {
        throw new Error(`No response body from ${url}`);
    }

    // Stream response to file (doesn't load into memory)
    const file = await Deno.open(destPath, { write: true, create: true, truncate: true });
    try {
        await response.body.pipeTo(file.writable);
    } catch (error) {
        // Clean up on error
        try {
            await Deno.remove(destPath);
        } catch {}
        throw error;
    }

    return destPath;
}

/**
 * Download with retry logic and exponential backoff
 * @param {string} url - URL to download from
 * @param {string} destPath - Destination file path
 * @param {number} retries - Number of retry attempts (default: 3)
 * @returns {Promise<string>} - Returns destPath on success
 */
export async function downloadWithRetry(url, destPath, retries = 3) {
    let lastError;

    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            return await downloadFile(url, destPath);
        } catch (error) {
            lastError = error;

            // Don't retry on 404 or 403 (permanent errors)
            if (error.message.includes("HTTP 404") || error.message.includes("HTTP 403")) {
                throw error;
            }

            // If this was the last attempt, throw
            if (attempt === retries) {
                break;
            }

            // Exponential backoff: 1s, 2s, 4s
            const delayMs = Math.pow(2, attempt) * 1000;
            console.error(`Download attempt ${attempt + 1} failed, retrying in ${delayMs}ms...`);
            await new Promise(resolve => setTimeout(resolve, delayMs));
        }
    }

    throw new Error(`Failed to download ${url} after ${retries + 1} attempts: ${lastError.message}`);
}

/**
 * Extract a meaningful name from a URL
 * Examples:
 *   https://github.com/NixOS/nixpkgs/archive/23.11.tar.gz -> nixpkgs-23.11
 *   https://example.com/foo-1.2.3.tar.gz -> foo-1.2.3
 * @param {string} url - URL to extract name from
 * @returns {string} - Extracted name
 */
export function extractNameFromUrl(url) {
    try {
        const urlObj = new URL(url);
        const pathname = urlObj.pathname;

        // Get the last segment of the path
        const segments = pathname.split('/').filter(s => s.length > 0);
        if (segments.length === 0) {
            return 'source';
        }

        let filename = segments[segments.length - 1];

        // Remove common archive extensions
        filename = filename
            .replace(/\.tar\.gz$/, '')
            .replace(/\.tar\.bz2$/, '')
            .replace(/\.tar\.xz$/, '')
            .replace(/\.tar$/, '')
            .replace(/\.tgz$/, '')
            .replace(/\.zip$/, '');

        // If the filename is still empty, use a default
        if (filename.length === 0) {
            return 'source';
        }

        return filename;
    } catch (error) {
        // If URL parsing fails, return a safe default
        return 'source';
    }
}

/**
 * Compute SHA256 hash of a file
 * @param {string} filePath - Path to file to hash
 * @returns {Promise<string>} - SHA256 hash (without "sha256:" prefix)
 */
async function computeFileSha256(filePath) {
    const { sha256Hex } = await import("../tools/hashing.js");

    const fileData = await Deno.readFile(filePath);
    return sha256Hex(fileData);
}

/**
 * Validate that a file matches the expected SHA256 hash
 * @param {string} filePath - Path to file to validate
 * @param {string} expectedSha256 - Expected SHA256 hash (without "sha256:" prefix)
 * @returns {Promise<boolean>} - Returns true if valid, throws if invalid
 */
export async function validateSha256(filePath, expectedSha256) {
    const actualHash = await computeFileSha256(filePath);

    // Remove "sha256:" prefix if present in either hash
    const normalizedExpected = expectedSha256.replace(/^sha256:/, '');
    const normalizedActual = actualHash.replace(/^sha256:/, '');

    if (normalizedActual !== normalizedExpected) {
        throw new Error(
            `SHA256 mismatch for ${filePath}:\n` +
            `  Expected: ${normalizedExpected}\n` +
            `  Actual:   ${normalizedActual}`
        );
    }

    return true;
}

// Export internal function for testing
export { downloadFile }
