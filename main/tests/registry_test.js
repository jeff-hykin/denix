import { assertEquals, assertExists, assert } from "jsr:@std/assert";
import {
    loadRegistry,
    lookupFlake,
    resolveIndirectReference,
} from "../registry.js";

Deno.test("registry - load registry from global source", async () => {
    try {
        const registry = await loadRegistry();

        // Verify registry structure
        assertEquals(registry.version, 2);
        assertExists(registry.flakes);
        assert(Array.isArray(registry.flakes));
        assert(registry.flakes.length > 0);

        // Verify flake entries have proper structure
        const firstFlake = registry.flakes[0];
        assertExists(firstFlake.from);
        assertExists(firstFlake.to);
        assertEquals(firstFlake.from.type, "indirect");
        assertExists(firstFlake.from.id);
    } catch (error) {
        // Network failures are acceptable in tests
        if (error.message.includes("fetch") || error.message.includes("network")) {
            console.warn("Skipping test due to network issue:", error.message);
        } else {
            throw error;
        }
    }
});

Deno.test("registry - lookup nixpkgs flake", async () => {
    try {

        const target = await lookupFlake("nixpkgs");

        // nixpkgs should resolve to NixOS/nixpkgs on GitHub
        assertExists(target);
        assertEquals(target.type, "github");
        assertEquals(target.owner, "NixOS");
        assertEquals(target.repo, "nixpkgs");
    } catch (error) {
        if (error.message.includes("fetch") || error.message.includes("network")) {
            console.warn("Skipping test due to network issue:", error.message);
        } else {
            throw error;
        }
    }
});

Deno.test("registry - lookup home-manager flake", async () => {
    try {

        const target = await lookupFlake("home-manager");

        // home-manager should resolve to nix-community/home-manager
        assertExists(target);
        assertEquals(target.type, "github");
        assertEquals(target.owner, "nix-community");
        assertEquals(target.repo, "home-manager");
    } catch (error) {
        if (error.message.includes("fetch") || error.message.includes("network")) {
            console.warn("Skipping test due to network issue:", error.message);
        } else {
            throw error;
        }
    }
});

Deno.test("registry - lookup non-existent flake returns null", async () => {
    try {

        const target = await lookupFlake("this-flake-definitely-does-not-exist-12345");

        // Should return null for non-existent flakes
        assertEquals(target, null);
    } catch (error) {
        if (error.message.includes("fetch") || error.message.includes("network")) {
            console.warn("Skipping test due to network issue:", error.message);
        } else {
            throw error;
        }
    }
});

Deno.test("registry - resolve nixpkgs to github URL", async () => {
    try {

        const resolved = await resolveIndirectReference("nixpkgs");

        // Should resolve to github:NixOS/nixpkgs format
        assertExists(resolved);
        assert(resolved.startsWith("github:NixOS/nixpkgs"));
    } catch (error) {
        if (error.message.includes("fetch") || error.message.includes("network")) {
            console.warn("Skipping test due to network issue:", error.message);
        } else {
            throw error;
        }
    }
});

Deno.test("registry - resolve flake-utils to github URL", async () => {
    try {

        const resolved = await resolveIndirectReference("flake-utils");

        // Should resolve to github:numtide/flake-utils
        assertExists(resolved);
        assert(resolved.startsWith("github:numtide/flake-utils"));
    } catch (error) {
        if (error.message.includes("fetch") || error.message.includes("network")) {
            console.warn("Skipping test due to network issue:", error.message);
        } else {
            throw error;
        }
    }
});

Deno.test("registry - cache works correctly", async () => {
    try {
        // First load
        const start1 = Date.now();
        const registry1 = await loadRegistry();
        const time1 = Date.now() - start1;

        // Second load (should be cached)
        const start2 = Date.now();
        const registry2 = await loadRegistry();
        const time2 = Date.now() - start2;

        // Cached load should be faster (< 10ms typically)
        assert(time2 < time1 / 2 || time2 < 10, `Cached load should be faster: ${time2}ms vs ${time1}ms`);

        // Should return same data
        assertEquals(registry1.version, registry2.version);
        assertEquals(registry1.flakes.length, registry2.flakes.length);
    } catch (error) {
        if (error.message.includes("fetch") || error.message.includes("network")) {
            console.warn("Skipping test due to network issue:", error.message);
        } else {
            throw error;
        }
    }
});

Deno.test("registry - resolve returns null for non-existent flake", async () => {
    try {

        const resolved = await resolveIndirectReference("absolutely-non-existent-flake-xyz");

        // Should return null
        assertEquals(resolved, null);
    } catch (error) {
        if (error.message.includes("fetch") || error.message.includes("network")) {
            console.warn("Skipping test due to network issue:", error.message);
        } else {
            throw error;
        }
    }
});

Deno.test("registry - handles different target types correctly", async () => {
    try {

        // Get all flakes to see different types
        const registry = await loadRegistry();

        // Check that we can handle different target types
        const seenTypes = new Set();
        for (const entry of registry.flakes.slice(0, 20)) {
            seenTypes.add(entry.to.type);
        }

        // Should have at least github type (most common)
        assert(seenTypes.has("github"));

        console.log("Registry target types seen:", Array.from(seenTypes));
    } catch (error) {
        if (error.message.includes("fetch") || error.message.includes("network")) {
            console.warn("Skipping test due to network issue:", error.message);
        } else {
            throw error;
        }
    }
});
