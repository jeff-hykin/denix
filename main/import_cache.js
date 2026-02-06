/**
 * Import cache with circular dependency detection
 *
 * Handles:
 * - Caching imported file results
 * - Circular import detection
 * - Import stack tracking for error messages
 */

export class ImportCache {
    constructor() {
        this.cache = new Map()
        this.importStack = []
    }

    /**
     * Get cached import result
     * @param {string} path - Absolute path to file
     * @returns {any|undefined} - Cached result or undefined
     */
    get(path) {
        return this.cache.get(path)
    }

    /**
     * Cache an import result
     * @param {string} path - Absolute path to file
     * @param {any} value - Result to cache
     */
    set(path, value) {
        this.cache.set(path, value)
    }

    /**
     * Check if import is cached
     * @param {string} path - Absolute path to file
     * @returns {boolean}
     */
    has(path) {
        return this.cache.has(path)
    }

    /**
     * Push a file onto the import stack
     * @param {string} path - Absolute path to file
     * @throws {Error} if circular import detected
     */
    pushStack(path) {
        if (this.importStack.includes(path)) {
            throw new Error(`Circular import detected: ${this.formatStack(path)}`)
        }
        this.importStack.push(path)
    }

    /**
     * Pop the most recent import from the stack
     */
    popStack() {
        this.importStack.pop()
    }

    /**
     * Format the import stack for error messages
     * @param {string} newPath - New path being imported
     * @returns {string} - Formatted stack trace
     */
    formatStack(newPath) {
        return [...this.importStack, newPath].join(' -> ')
    }

    /**
     * Get current import stack (for debugging)
     * @returns {string[]}
     */
    getStack() {
        return [...this.importStack]
    }

    /**
     * Clear all cached imports and reset stack
     * (Useful for testing)
     */
    clear() {
        this.cache.clear()
        this.importStack = []
    }

    /**
     * Get the current file being imported (top of stack)
     * @returns {string|null}
     */
    getCurrentFile() {
        return this.importStack[this.importStack.length - 1] || null
    }
}
