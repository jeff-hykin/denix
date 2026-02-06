/**
 * Store manager module
 * Manages the Denix store directory and caching
 */

import { computeStorePath } from "../tools/store_path.js";

// Store directory in user's home directory (no root permissions needed)
const HOME = Deno.env.get("HOME") || Deno.env.get("USERPROFILE") || "/tmp";
export const STORE_DIR = `${HOME}/.cache/denix/store`;
const CACHE_FILE = `${HOME}/.cache/denix/cache.json`;
const LOCK_DIR = `${HOME}/.cache/denix/locks`;

/**
 * Ensure store directory exists
 * @returns {Promise<void>}
 */
export async function ensureStoreDirectory() {
    await Deno.mkdir(STORE_DIR, { recursive: true });
    await Deno.mkdir(LOCK_DIR, { recursive: true });
}

/**
 * Compute store path for a fixed-output derivation (like fetchTarball)
 * @param {string} narHash - NAR hash with or without "sha256:" prefix
 * @param {string} name - Name for the store path
 * @returns {string} - Full store path
 */
export function computeFetchStorePath(narHash, name) {
    // Remove prefix if present
    const hashValue = narHash.replace(/^sha256[:-]/, '');

    // Use tools/store_path.js to compute the store path
    // For fixed-output derivations, the hash input is:
    // "fixed:out:sha256:<hash>:<store-dir>:<name>"
    const hashInput = `fixed:out:sha256:${hashValue}:${STORE_DIR}:${name}`;

    const storePath = computeStorePath(
        "source", // type parameter (not actually used for our case)
        hashInput,
        name,
        STORE_DIR
    );

    return storePath;
}

/**
 * Atomically move a file or directory to destination
 * Uses Deno.rename() which is atomic on most filesystems
 * @param {string} srcPath - Source path
 * @param {string} destPath - Destination path
 * @returns {Promise<void>}
 */
export async function atomicMove(srcPath, destPath) {
    // Ensure parent directory exists
    const parentDir = destPath.substring(0, destPath.lastIndexOf('/'));
    if (parentDir) {
        await Deno.mkdir(parentDir, { recursive: true });
    }

    // Remove destination if it already exists (for idempotency)
    try {
        await Deno.remove(destPath, { recursive: true });
    } catch {
        // Doesn't exist, that's fine
    }

    // Atomic rename
    await Deno.rename(srcPath, destPath);
}

/**
 * Load the cache file
 * @returns {Promise<Object>} - Cache object mapping keys to store paths
 */
async function loadCache() {
    try {
        const cacheText = await Deno.readTextFile(CACHE_FILE);
        return JSON.parse(cacheText);
    } catch {
        // Cache file doesn't exist or is invalid
        return {};
    }
}

/**
 * Save the cache file
 * @param {Object} cache - Cache object to save
 * @returns {Promise<void>}
 */
async function saveCache(cache) {
    const parentDir = CACHE_FILE.substring(0, CACHE_FILE.lastIndexOf('/'));
    await Deno.mkdir(parentDir, { recursive: true });
    await Deno.writeTextFile(CACHE_FILE, JSON.stringify(cache, null, 2));
}

/**
 * Get cached store path for a given key
 * @param {string} cacheKey - Cache key (e.g., "https://example.com/foo.tar.gz:sha256:abc")
 * @returns {Promise<string|null>} - Store path if cached and exists, null otherwise
 */
export async function getCachedPath(cacheKey) {
    const cache = await loadCache();
    const storePath = cache[cacheKey];

    if (!storePath) {
        return null;
    }

    // Verify the path actually exists
    try {
        await Deno.stat(storePath);
        return storePath;
    } catch {
        // Path doesn't exist, remove from cache
        delete cache[cacheKey];
        await saveCache(cache);
        return null;
    }
}

/**
 * Set cached store path for a given key
 * @param {string} cacheKey - Cache key
 * @param {string} storePath - Store path to cache
 * @returns {Promise<void>}
 */
export async function setCachedPath(cacheKey, storePath) {
    const cache = await loadCache();
    cache[cacheKey] = storePath;
    await saveCache(cache);
}

/**
 * Acquire an exclusive lock and run a function
 * Prevents concurrent access to the same resource
 * @param {string} lockName - Name of the lock (will be used as filename)
 * @param {Function} fn - Async function to run while holding the lock
 * @returns {Promise<any>} - Result of fn
 */
export async function withLock(lockName, fn) {
    await ensureStoreDirectory(); // Ensures LOCK_DIR exists

    const lockPath = `${LOCK_DIR}/${lockName}.lock`;

    // Create lock file
    const lockFile = await Deno.open(lockPath, {
        create: true,
        write: true,
        read: true,
    });

    try {
        // Acquire exclusive lock (blocks until available)
        await lockFile.lock(true); // true = exclusive lock

        // Run the function while holding the lock
        return await fn();
    } finally {
        // Release lock and close file
        try {
            await lockFile.unlock();
        } catch {
            // Already unlocked
        }
        try {
            lockFile.close();
        } catch {
            // Already closed
        }
        // Clean up lock file
        try {
            await Deno.remove(lockPath);
        } catch {
            // File might be in use by another process
        }
    }
}

/**
 * Check if a path exists in the store
 * @param {string} storePath - Store path to check
 * @returns {Promise<boolean>} - True if exists
 */
export async function exists(storePath) {
    try {
        await Deno.stat(storePath);
        return true;
    } catch {
        return false;
    }
}
