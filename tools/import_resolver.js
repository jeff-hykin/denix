/**
 * Path resolution for Nix import statements
 *
 * Handles:
 * - Absolute paths: /path/to/file.nix
 * - Relative paths: ./file.nix, ../parent/file.nix
 * - Directory imports: ./dir loads ./dir/default.nix
 * - Extension inference: ./file loads ./file.nix if it exists
 */

import { basename, dirname, join, resolve, isAbsolute } from "https://deno.land/std@0.224.0/path/mod.ts"

/**
 * Get file info synchronously
 */
function getFileInfo(path) {
    try {
        const stat = Deno.statSync(path)
        return stat
    } catch {
        return null
    }
}

/**
 * Resolve an import path relative to a source file
 *
 * @param {string} fromFile - Absolute path of file doing the import
 * @param {string} importPath - Path being imported (relative or absolute)
 * @returns {string} - Absolute path to the file to import
 */
export function resolveImportPath(fromFile, importPath) {
    // Convert Path class to string if needed
    if (importPath?.constructor?.name === 'Path') {
        importPath = importPath.toString()
    }

    // Handle absolute paths
    if (isAbsolute(importPath)) {
        return canonicalizePath(importPath)
    }

    // Handle relative paths
    const fromDir = dirname(fromFile)
    const resolved = resolve(fromDir, importPath)
    return canonicalizePath(resolved)
}

/**
 * Canonicalize a path by:
 * 1. Resolving it to absolute
 * 2. Checking if it's a directory → append /default.nix
 * 3. Checking if it needs .nix extension
 *
 * @param {string} path - Path to canonicalize
 * @returns {string} - Canonical absolute path
 */
export function canonicalizePath(path) {
    const info = getFileInfo(path)

    // If path exists as-is and is a file, return it
    if (info?.isFile) {
        return path
    }

    // If path exists as a directory, look for default.nix
    if (info?.isDirectory) {
        const defaultNix = join(path, "default.nix")
        const defaultInfo = getFileInfo(defaultNix)
        if (defaultInfo?.isFile) {
            return defaultNix
        }
        throw new Error(`Directory import failed: ${path}/default.nix does not exist`)
    }

    // If path doesn't exist, try adding .nix extension
    if (!path.endsWith('.nix') && !path.endsWith('.json')) {
        const withNix = path + '.nix'
        const withNixInfo = getFileInfo(withNix)
        if (withNixInfo?.isFile) {
            return withNix
        }
    }

    // If nothing works, return original path (will fail later with better error)
    return path
}

/**
 * Determine the type of file to import
 *
 * @param {string} path - Absolute path to file
 * @returns {'nix'|'json'|'unknown'}
 */
export function getImportType(path) {
    if (path.endsWith('.json')) {
        return 'json'
    }
    if (path.endsWith('.nix')) {
        return 'nix'
    }
    return 'unknown'
}

/**
 * Validate that a path exists and is readable
 *
 * @param {string} path - Path to validate
 * @throws {Error} if path doesn't exist or isn't readable
 */
export function validateImportPath(path) {
    const info = getFileInfo(path)
    if (!info) {
        throw new Error(`Import path does not exist: ${path}`)
    }
    if (!info.isFile) {
        throw new Error(`Import path is not a file: ${path}`)
    }
}
