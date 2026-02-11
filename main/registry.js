/**
 * Flake Registry Support
 *
 * Implements flake registry lookup to resolve indirect flake references
 * like "nixpkgs" to full URLs like "github:NixOS/nixpkgs"
 *
 * Registry locations (in order of precedence):
 * 1. User registry: ~/.config/nix/registry.json
 * 2. System registry: /etc/nix/registry.json
 * 3. Global registry: https://channels.nixos.org/flake-registry.json
 */

import { FileSystem } from "https://deno.land/x/quickr@0.6.51/main/file_system.js"

const GLOBAL_REGISTRY_URL = "https://channels.nixos.org/flake-registry.json"
const USER_REGISTRY_PATH = `${Deno.env.get("HOME") || "~"}/.config/nix/registry.json`
const SYSTEM_REGISTRY_PATH = "/etc/nix/registry.json"

// Cache for registry data
let registryCache = null
let registryCacheTime = null
const CACHE_TTL = 3600000 // 1 hour in milliseconds

/**
 * Fetch and parse a registry file
 * @param {string} path - Path to registry file
 * @returns {object|null} - Parsed registry or null if not found
 */
async function loadRegistryFile(path) {
    try {
        const content = await Deno.readTextFile(path)
        return JSON.parse(content)
    } catch (error) {
        // File doesn't exist or can't be read
        return null
    }
}

/**
 * Fetch the global registry from the internet
 * @returns {object|null} - Parsed registry or null if fetch fails
 */
async function fetchGlobalRegistry() {
    try {
        const response = await fetch(GLOBAL_REGISTRY_URL, {
            headers: {
                'User-Agent': 'Denix/1.0',
            },
        })

        if (!response.ok) {
            console.warn(`Failed to fetch global registry: HTTP ${response.status}`)
            return null
        }

        const text = await response.text()
        return JSON.parse(text)
    } catch (error) {
        console.warn(`Failed to fetch global registry: ${error.message}`)
        return null
    }
}

/**
 * Load flake registry from all available sources
 * Tries in order: user registry, system registry, global registry
 * @returns {object} - Combined registry
 */
export async function loadRegistry() {
    // Check cache first
    const now = Date.now()
    if (registryCache && registryCacheTime && (now - registryCacheTime) < CACHE_TTL) {
        return registryCache
    }

    // Initialize empty registry
    const combinedRegistry = {
        version: 2,
        flakes: []
    }

    // Try loading registries in order of precedence
    const userRegistry = await loadRegistryFile(USER_REGISTRY_PATH)
    const systemRegistry = await loadRegistryFile(SYSTEM_REGISTRY_PATH)
    const globalRegistry = await fetchGlobalRegistry()

    // Combine registries (user overrides system overrides global)
    // We build a map to handle overrides properly
    const flakeMap = new Map()

    // Add global entries first (lowest priority)
    if (globalRegistry && globalRegistry.flakes) {
        for (const entry of globalRegistry.flakes) {
            if (entry.from && entry.from.id) {
                flakeMap.set(entry.from.id, entry)
            }
        }
    }

    // Add system entries (override global)
    if (systemRegistry && systemRegistry.flakes) {
        for (const entry of systemRegistry.flakes) {
            if (entry.from && entry.from.id) {
                flakeMap.set(entry.from.id, entry)
            }
        }
    }

    // Add user entries (highest priority)
    if (userRegistry && userRegistry.flakes) {
        for (const entry of userRegistry.flakes) {
            if (entry.from && entry.from.id) {
                flakeMap.set(entry.from.id, entry)
            }
        }
    }

    // Convert map back to array
    combinedRegistry.flakes = Array.from(flakeMap.values())

    // Cache the result
    registryCache = combinedRegistry
    registryCacheTime = now

    return combinedRegistry
}

/**
 * Look up a flake in the registry
 * @param {string} flakeId - The indirect flake identifier (e.g., "nixpkgs")
 * @returns {object|null} - The "to" reference or null if not found
 */
export async function lookupFlake(flakeId) {
    const registry = await loadRegistry()

    // Find the flake entry
    for (const entry of registry.flakes) {
        if (entry.from && entry.from.type === "indirect" && entry.from.id === flakeId) {
            return entry.to
        }
    }

    return null
}

/**
 * Resolve an indirect flake reference to a concrete reference
 * @param {string} flakeId - The indirect flake identifier
 * @returns {string|null} - The resolved flake reference string or null if not found
 */
export async function resolveIndirectReference(flakeId) {
    const target = await lookupFlake(flakeId)

    if (!target) {
        return null
    }

    // Convert the target to a flake reference string
    switch (target.type) {
        case "github":
            // github:owner/repo[/ref]
            let ref = `github:${target.owner}/${target.repo}`
            if (target.ref) {
                ref += `/${target.ref}`
            }
            return ref

        case "gitlab":
            // gitlab:owner/repo[/ref]
            let gitlabRef = `gitlab:${target.owner}/${target.repo}`
            if (target.ref) {
                gitlabRef += `/${target.ref}`
            }
            return gitlabRef

        case "git":
            // git+url
            return `git+${target.url}`

        case "path":
            // path or path:path
            return target.path.startsWith("/") ? target.path : `path:${target.path}`

        case "tarball":
            // Just the URL
            return target.url

        default:
            console.warn(`Unknown registry target type: ${target.type}`)
            return null
    }
}

/**
 * Clear the registry cache (useful for testing)
 */
export function clearRegistryCache() {
    registryCache = null
    registryCacheTime = null
}

/**
 * Get registry statistics
 * @returns {object} - Registry info
 */
export async function getRegistryInfo() {
    const registry = await loadRegistry()

    return {
        version: registry.version,
        entryCount: registry.flakes.length,
        cacheAge: registryCacheTime ? Date.now() - registryCacheTime : null,
        sampleEntries: registry.flakes.slice(0, 5).map(e => e.from.id),
    }
}
